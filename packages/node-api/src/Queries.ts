import { ApiPromise } from "@polkadot/api";
import { Adapters } from "./Adapters.js";
import * as Currency from "./Currency.js";
import * as Numbers from "./numbers.js";
import {
    AccountType,
    AnyAccountId,
    CollectionItem,
    LegalOfficerCase,
    TypesAccountData,
    TypesRecoveryConfig,
    ValidAccountId,
    Sponsorship,
    VerifiedIssuerType,
    LegalOfficerData,
    Region,
} from "./Types.js";
import { UUID } from "./UUID.js";
import { Hash } from "./Hash.js";

export interface Coin {
    id: string,
    symbol: string,
}

export interface CoinBalance {
    coin: Coin,
    available: Numbers.PrefixedNumber,
    reserved: Numbers.PrefixedNumber,
    total: Numbers.PrefixedNumber,
    level: number,
}

export const ARTIFICIAL_MAX_BALANCE = Currency.Lgnt.fromCanonical(100n).toCanonicalPrefixedNumber();

export class Queries {

    constructor(
        api: ApiPromise,
        adapters: Adapters,
    ) {
        this.api = api;
        this.adapters = adapters;
    }

    static async of(apiPromise: Promise<ApiPromise>): Promise<Queries> {
        const api = await apiPromise;
        return new Queries(api, new Adapters(api));
    }

    private api: ApiPromise;
    private adapters: Adapters;

    isValidAccountId(accountId?: string | null, type?: AccountType): boolean {
        if(accountId === null || accountId === undefined || accountId === '') {
            return false;
        }
        const anyAccountId = new AnyAccountId(this.api, accountId, type || "Polkadot");
        return anyAccountId.isValid();
    }

    getValidAccountId(accountId: string, type: AccountType): ValidAccountId {
        return this.adapters.getValidAccountId(accountId, type);
    }

    async getAccountData(accountId: string): Promise<TypesAccountData> {
        const accountInfo = await this.api.query.system.account(accountId);
        return this.adapters.fromFrameSystemAccountInfo(accountInfo);
    }

    async getCoinBalances(accountId: string): Promise<CoinBalance[]> {
        const accountInfo = await this.api.query.system.account(accountId);
        const data = this.adapters.fromFrameSystemAccountInfo(accountInfo);

        const logAvailable = Currency.Lgnt.fromCanonical(BigInt(data.available)).toCanonicalPrefixedNumber().optimizeScale(3);
        const logReserved = Currency.Lgnt.fromCanonical(BigInt(data.reserved)).toCanonicalPrefixedNumber().optimizeScale(3);
        const logTotal = Currency.Lgnt.fromCanonical(BigInt(data.total)).toCanonicalPrefixedNumber().optimizeScale(3);
        const logLevel = logTotal.scientificNumber.divideBy(ARTIFICIAL_MAX_BALANCE.convertTo(logTotal.prefix).scientificNumber).toNumber();

        return [
            Queries.buildCoinBalance({
                coinId: 'lgnt',
                available: logAvailable,
                reserved: logReserved,
                total: logTotal,
                level: logLevel,
            }),
            Queries.DOT_BALANCE
        ];
    }

    static readonly DOT_BALANCE = Queries.buildCoinBalance({
        coinId: 'dot',
        available: new Numbers.PrefixedNumber("0", Numbers.NONE),
        reserved: new Numbers.PrefixedNumber("0", Numbers.NONE),
        total: new Numbers.PrefixedNumber("0", Numbers.NONE),
        level: 1
    });

    private static buildCoinBalance(args: {
        coinId: string,
        available: Numbers.PrefixedNumber,
        reserved: Numbers.PrefixedNumber,
        total: Numbers.PrefixedNumber,
        level: number,
    }): CoinBalance {
        const { coinId, total, reserved, available, level } = args;
        const coin = Queries.getCoin(coinId);
        return {
            coin,
            available,
            reserved,
            total,
            level,
        }
    }

    static getCoin(coinId: string): Coin {
        if(coinId === 'dot') {
            return {
                id: 'dot',
                symbol: 'DOT',
            };
        } else if(coinId === "lgnt") {
            return {
                id: 'lgnt',
                symbol: Currency.SYMBOL,
            };
        } else {
            throw new Error(`Unsupported coin ${coinId}`);
        }
    }

    async getLegalOfficerCase(locId: UUID): Promise<LegalOfficerCase | undefined> {
        const result = await this.api.query.logionLoc.locMap(Adapters.toLocId(locId));
        if(result.isSome) {
            return this.adapters.fromPalletLogionLocLegalOfficerCase(result.unwrap());
        } else {
            return undefined;
        }
    }

    async getCollectionItem(locId: UUID, itemId: Hash): Promise<CollectionItem | undefined> {
        const result = await this.api.query.logionLoc.collectionItemsMap(
            Adapters.toLocId(locId),
            this.adapters.toH256(itemId)
        );
        if(result.isSome) {
            return Adapters.fromPalletCollectionItem(itemId, result.unwrap());
        } else {
            return undefined;
        }
    }

    async getCollectionItems(locId: UUID): Promise<CollectionItem[]> {
        const result = await this.api.query.logionLoc.collectionItemsMap.entries(Adapters.toLocId(locId));
        return result.map(entry => Adapters.fromPalletCollectionItem(
            Hash.fromHex(entry[0].args[1].toHex()),
            entry[1].unwrap(),
        ));
    }

    async getCollectionSize(locId: UUID): Promise<number | undefined> {
        const result = await this.api.query.logionLoc.collectionSizeMap(Adapters.toLocId(locId));
        if (result.isSome) {
            return result.unwrap().toNumber();
        } else {
            return undefined;
        }
    }

    async getRecoveryConfig(accountId: string): Promise<TypesRecoveryConfig | undefined> {
        const recoveryConfig = await this.api.query.recovery.recoverable(accountId);
        if (recoveryConfig.isEmpty) {
            return undefined
        }
        return {
            legalOfficers: recoveryConfig.unwrap().friends.toArray().map(accountId => accountId.toString())
        };
    }

    async getActiveRecovery(sourceAccount: string, destinationAccount: string): Promise<TypesRecoveryConfig | undefined> {
        const activeRecovery = await this.api.query.recovery.activeRecoveries(sourceAccount, destinationAccount);
        if (activeRecovery.isEmpty) {
            return undefined
        }
        return {
            legalOfficers: activeRecovery.unwrap().friends.toArray().map(accountId => accountId.toString())
        };
    }

    async getProxy(address: string): Promise<string | undefined> {
        const proxy = await this.api.query.recovery.proxy(address);
        if (proxy.isEmpty) {
            return undefined
        }
        return proxy.unwrap().toString();
    }

    async getSponsorship(sponsorshipId: UUID): Promise<Sponsorship | undefined> {
        const result = await this.api.query.logionLoc.sponsorshipMap(this.adapters.toSponsorshipId(sponsorshipId).unwrap());
        if (result.isSome) {
            return this.adapters.toSponsorship(result.unwrap())
        } else {
            return undefined;
        }
    }

    async getLegalOfficerVerifiedIssuers(legalOfficerAddress: string): Promise<VerifiedIssuerType[]> {
        const issuers: VerifiedIssuerType[] = [];

        const entries = await this.api.query.logionLoc.verifiedIssuersMap.entries(legalOfficerAddress);
        for(const entry of entries) {
            const address = entry[0].args[1].toString();
            const issuerOption = entry[1];
            const identityLocId = UUID.fromDecimalStringOrThrow(issuerOption.unwrap().identityLoc.toString());

            issuers.push({
                address,
                identityLocId,
            });
        }

        return issuers;
    }

    async getLegalOfficerData(address: string): Promise<LegalOfficerData> {
        let onchainSettings: LegalOfficerData = {};
        const legalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet(address);
        if(legalOfficerData.isSome) {
            const someLegalOfficerData = legalOfficerData.unwrap();
            if(someLegalOfficerData.isHost) {
                const hostData = this.adapters.toHostData(someLegalOfficerData);
                onchainSettings = {
                    hostData,
                    isHost: true,
                    guests: await this.getGuestsOf(address),
                };
            } else {
                const hostAddress = someLegalOfficerData.asGuest.toString();
                const hostLegalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet(hostAddress);
                const hostData = this.adapters.toHostData(hostLegalOfficerData.unwrap());
                onchainSettings = {
                    hostData,
                    isHost: false,
                    hostAddress,
                };
            }
        }
        return onchainSettings;
    }

    private async getGuestsOf(address: string): Promise<string[]> {
        const legalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet.entries();
        return legalOfficerData
            .filter(entry => entry[1].isSome)
            .filter(entry => entry[1].unwrap().isGuest)
            .filter(entry => entry[1].unwrap().asGuest.hostId.toString() === address)
            .map(entry => entry[0].args[0].toString());
    }

    getAvailableRegions(): Region[] {
        this.availableRegions ||= this.computeAvailableRegions();
        return this.availableRegions;
    }

    private availableRegions?: Region[];

    private computeAvailableRegions(): Region[] {
        const defaultRegion = this.adapters.getDefaultLogionRuntimeRegion();
        return defaultRegion.defKeys as Region[];
    }

    getDefaultRegion(): Region {
        return this.adapters.fromLogionRuntimeRegion(this.adapters.getDefaultLogionRuntimeRegion());
    }

    async isInvitedContributorOf(address: string, locId: UUID): Promise<boolean> {
        return this.isValidAccountId(address, "Polkadot") && (await this.api.query.logionLoc.invitedContributorsByLocMap(
            locId.toDecimalString(),
            address,
        )).isSome
    }

    get ss58Prefix(): number {
        return this.api.consts.system.ss58Prefix.toNumber();
    }
}
