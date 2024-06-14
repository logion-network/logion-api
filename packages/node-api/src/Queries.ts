import { ApiPromise } from "@polkadot/api";
import { Adapters } from "./Adapters.js";
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
        const anyAccountId = new AnyAccountId(accountId, type || "Polkadot");
        return anyAccountId.isValid();
    }

    getValidAccountId(accountId: string, type: AccountType): ValidAccountId {
        return this.adapters.getValidAccountId(accountId, type);
    }

    async getAccountData(accountId: ValidAccountId): Promise<TypesAccountData> {
        const accountInfo = await this.api.query.system.account(accountId.address);
        return this.adapters.fromFrameSystemAccountInfo(accountInfo);
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

    async getRecoveryConfig(accountId: ValidAccountId): Promise<TypesRecoveryConfig | undefined> {
        const recoveryConfig = await this.api.query.recovery.recoverable(accountId.address);
        if (recoveryConfig.isEmpty) {
            return undefined
        }
        return {
            legalOfficers: recoveryConfig.unwrap().friends.toArray().map(accountId => ValidAccountId.polkadot(accountId.toString()))
        };
    }

    async getActiveRecovery(sourceAccountId: ValidAccountId, destinationAccountId: ValidAccountId): Promise<TypesRecoveryConfig | undefined> {
        const activeRecovery = await this.api.query.recovery.activeRecoveries(sourceAccountId.address, destinationAccountId.address);
        if (activeRecovery.isEmpty) {
            return undefined
        }
        return {
            legalOfficers: activeRecovery.unwrap().friends.toArray().map(accountId => ValidAccountId.polkadot(accountId.toString()))
        };
    }

    async getProxy(accountId: ValidAccountId): Promise<ValidAccountId | undefined> {
        const proxy = await this.api.query.recovery.proxy(accountId.address);
        if (proxy.isEmpty) {
            return undefined
        }
        return ValidAccountId.polkadot(proxy.unwrap().toString());
    }

    async getSponsorship(sponsorshipId: UUID): Promise<Sponsorship | undefined> {
        const result = await this.api.query.logionLoc.sponsorshipMap(this.adapters.toSponsorshipId(sponsorshipId).unwrap());
        if (result.isSome) {
            return this.adapters.toSponsorship(result.unwrap())
        } else {
            return undefined;
        }
    }

    async getLegalOfficerVerifiedIssuers(accountId: ValidAccountId): Promise<VerifiedIssuerType[]> {
        const issuers: VerifiedIssuerType[] = [];

        const entries = await this.api.query.logionLoc.verifiedIssuersMap.entries(accountId.address);
        for(const entry of entries) {
            const address = entry[0].args[1].toString();
            const issuerOption = entry[1];
            const identityLocId = UUID.fromDecimalStringOrThrow(issuerOption.unwrap().identityLoc.toString());

            issuers.push({
                account: ValidAccountId.polkadot(address),
                identityLocId,
            });
        }

        return issuers;
    }

    async getLegalOfficerData(accountId: ValidAccountId): Promise<LegalOfficerData> {
        let onchainSettings: LegalOfficerData = {};
        const legalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet(accountId.address);
        if(legalOfficerData.isSome) {
            const someLegalOfficerData = legalOfficerData.unwrap();
            if(someLegalOfficerData.isHost) {
                const hostData = this.adapters.toHostData(someLegalOfficerData);
                onchainSettings = {
                    hostData,
                    isHost: true,
                    guests: await this.getGuestsOf(accountId),
                };
            } else {
                const hostAddress = someLegalOfficerData.asGuest.hostId.toString();
                const hostLegalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet(hostAddress);
                const hostData = this.adapters.toHostData(hostLegalOfficerData.unwrap());
                onchainSettings = {
                    hostData,
                    isHost: false,
                    hostAccount: ValidAccountId.polkadot(hostAddress),
                };
            }
        }
        return onchainSettings;
    }

    private async getGuestsOf(accountId: ValidAccountId): Promise<string[]> {
        const legalOfficerData = await this.api.query.loAuthorityList.legalOfficerSet.entries();
        return legalOfficerData
            .filter(entry => entry[1].isSome)
            .filter(entry => entry[1].unwrap().isGuest)
            .filter(entry => entry[1].unwrap().asGuest.hostId.toString() === accountId.address)
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

    async isInvitedContributorOf(accountId: ValidAccountId, locId: UUID): Promise<boolean> {
        return (await this.api.query.logionLoc.invitedContributorsByLocMap(
            locId.toDecimalString(),
            accountId.address,
        )).isSome;
    }

    get ss58Prefix(): number {
        return this.api.consts.system.ss58Prefix.toNumber();
    }
}
