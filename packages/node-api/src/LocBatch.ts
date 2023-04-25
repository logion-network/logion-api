import { ApiPromise } from "@polkadot/api";
import { UUID } from "./UUID.js";
import { Adapters } from "./Adapters.js";
import { LegalOfficerCase, VerifiedIssuerType } from "./Types.js";

/**
 * Batches queries on LOCs and their associated Verified Issuers. Query results are cached.
 * The object must be re-created in order to get fresh data.
 */
export class LocBatch {

    constructor(args: {
        /** Polkadot API */
        api: ApiPromise,
        /** logion adapters */
        adapters: Adapters,
        /** The IDs of the LOCs to consider */
        locIds: UUID[],
        /** DEPRECATED - a map of already fetched LOCs used to initialize the cache */
        locs?: Record<string, LegalOfficerCase>,
        /** DEPRECATED - a map of already fetched verified issuers per legal officer used to initialize the cache */
        availableVerifiedIssuers?: Record<string, VerifiedIssuerType[]>,
    }) {
        this.api = args.api;
        this.adapters = args.adapters;
        this.locIds = args.locIds;

        this.locs = args.locs;
        this.availableVerifiedIssuers = args.availableVerifiedIssuers;
    }

    private api: ApiPromise;
    private adapters: Adapters;
    private locIds: UUID[];

    async getLocsVerifiedIssuers(): Promise<Record<string, VerifiedIssuerType[]>> {
        this.locsVerifiedIssuers ||= await this.computeLocsVerifiedIssuers();
        return this.locsVerifiedIssuers;
    }

    private locsVerifiedIssuers: Record<string, VerifiedIssuerType[]> | undefined;

    private async computeLocsVerifiedIssuers(): Promise<Record<string, VerifiedIssuerType[]>> {
        const availableVerifiedIssuers = await this.getAvailableVerifiedIssuers();
        const potentialIssuers = Object.values(availableVerifiedIssuers).flatMap(issuer => issuer).map(issuer => issuer.address);
        if(potentialIssuers.length === 0) {
            const map: Record<string, VerifiedIssuerType[]> = {};
            this.locIds.forEach(id => {
                map[id.toDecimalString()] = [];
            });
            return map;
        }
    
        const keys: [string, string][] = [];
        this.locIds.forEach(id => {
            potentialIssuers.forEach(issuer => {
                keys.push([ id.toDecimalString(), issuer ]);
            });
        });
    
        const locs = await this.getLocs();
        const entries = await this.api.query.logionLoc.verifiedIssuersByLocMap.multi(keys);
        const map: Record<string, VerifiedIssuerType[]> = {};
        for(let i = 0; i < keys.length; ++i) {
            const locId = keys[i][0];
            const verifiedIssuers: VerifiedIssuerType[] = map[locId] ||= [];
            if(entries[i].isSome) {
                const verifiedIssuerAddress = keys[i][1];
                const owner = locs[locId].owner;
                const verifiedIssuer = availableVerifiedIssuers[owner].find(issuer => issuer.address === verifiedIssuerAddress);
                if(!verifiedIssuer) {
                    throw new Error("Verified issuer not found");
                }
                verifiedIssuers.push(verifiedIssuer);
            }
        }
        return map;
    }

    private async getAvailableVerifiedIssuers(): Promise<Record<string, VerifiedIssuerType[]>> {
        this.availableVerifiedIssuers ||= await this.computeAvailableVerifiedIssuersMap();
        return this.availableVerifiedIssuers;
    }

    private availableVerifiedIssuers: Record<string, VerifiedIssuerType[]> | undefined;

    private async computeAvailableVerifiedIssuersMap(): Promise<Record<string, VerifiedIssuerType[]>> {
        const locs = await this.getLocs();
        const legalOfficerAddresses = Object.values(locs).map(loc => loc.owner);

        const map: Record<string, VerifiedIssuerType[]> = {};
        for(const legalOfficerAddress of legalOfficerAddresses) {
            if(!(legalOfficerAddress in map)) {
                const mapEntry: VerifiedIssuerType[] = [];
                map[legalOfficerAddress] = mapEntry;
    
                const entries = await this.api.query.logionLoc.verifiedIssuersMap.entries(legalOfficerAddress);
                for(const entry of entries) {
                    const address = entry[0].args[1].toString();
                    const issuerOption = entry[1];
                    const identityLocId = this.adapters.fromLocId(issuerOption.unwrap().identityLoc);
    
                    mapEntry.push({
                        address,
                        identityLocId,
                    });
                }
            }
        }
        return map;
    }

    async getLocs(): Promise<Record<string, LegalOfficerCase>> {
        this.locs ||= await this.computeLocs(this.locIds);
        return this.locs;
    }

    private locs: Record<string, LegalOfficerCase> | undefined;

    private async computeLocs(locIds: UUID[]): Promise<Record<string, LegalOfficerCase>> {
        const locs = await this.computeLocsArray(locIds);
        const map: Record<string, LegalOfficerCase> = {};
        for(let i = 0; i < locs.length; ++i) {
            const loc = locs[i];
            const locId = locIds[i];
            if(loc !== undefined) {
                map[locId.toDecimalString()] = loc;
            }
        }
        return map;
    }

    private async computeLocsArray(locIds: UUID[]): Promise<(LegalOfficerCase | undefined)[]> {
        const result = await this.api.query.logionLoc.locMap.multi(locIds.map(id => id.toHexString()));
        const locs: (LegalOfficerCase | undefined)[] = [];
        for(let i = 0; i < result.length; ++i) {
            const option = result[i];
            if(option.isSome) {
                locs.push(this.adapters.fromPalletLogionLocLegalOfficerCase(option.unwrap()));
            } else {
                locs.push(undefined);
            }
        }
        return locs;
    }
}
