import { LogionNodeApi } from "./Connection.js";
import { getLegalOfficerCase } from "./LogionLoc.js";
import { LegalOfficerCase } from "./Types.js";
import { UUID } from "./UUID.js";

export interface VerifiedIssuer {
    address: string;
    identityLocId: UUID;
}

export async function getVerifiedIssuers(
    api: LogionNodeApi,
    locId: UUID,
    locs?: Record<string, LegalOfficerCase>,
    availableVerifiedIssuers?: Record<string, VerifiedIssuer[]>,
): Promise<VerifiedIssuer[]> {
    const loc = locs ? locs[locId.toDecimalString()] : await getLegalOfficerCase({
        api,
        locId,
    });
    if(!loc) {
        throw new Error("LOC not found");
    }
    const owner = loc.owner;
    const entries = await api.query.logionLoc.verifiedIssuersByLocMap.entries(locId.toDecimalString());
    const verifiedIssuers: VerifiedIssuer[] = [];
    for(const entry of entries) {
        const verifiedIssuerAddress = entry[0].args[1].toString();

        let verifiedIssuer: VerifiedIssuer | undefined;
        if(availableVerifiedIssuers && owner in availableVerifiedIssuers) {
            verifiedIssuer = availableVerifiedIssuers[owner].find(issuer => issuer.address === verifiedIssuerAddress);
        } else {
            const issuerOption = await api.query.logionLoc.verifiedIssuersMap(owner, verifiedIssuerAddress);
            const identityLocId = UUID.fromDecimalStringOrThrow(issuerOption.unwrap().identityLoc.toString());
            verifiedIssuer = {
                address: verifiedIssuerAddress,
                identityLocId,
            };
        }
        if(verifiedIssuer) {
            verifiedIssuers.push(verifiedIssuer);
        }
    }
    return verifiedIssuers;
}

export async function getVerifiedIssuersBatch(
    api: LogionNodeApi,
    locIds: UUID[],
    locs: Record<string, LegalOfficerCase>,
    availableVerifiedIssuers: Record<string, VerifiedIssuer[]>,
): Promise<Record<string, VerifiedIssuer[]>> {
    const potentialIssuers = Object.values(availableVerifiedIssuers).flatMap(issuer => issuer).map(issuer => issuer.address);
    if(potentialIssuers.length === 0) {
        const map: Record<string, VerifiedIssuer[]> = {};
        locIds.forEach(id => {
            map[id.toDecimalString()] = [];
        });
        return map;
    }

    const keys: [string, string][] = [];
    locIds.forEach(id => {
        potentialIssuers.forEach(issuer => {
            keys.push([ id.toDecimalString(), issuer ]);
        });
    });

    const entries = await api.query.logionLoc.verifiedIssuersByLocMap.multi(keys);
    const map: Record<string, VerifiedIssuer[]> = {};
    for(let i = 0; i < keys.length; ++i) {
        const locId = keys[i][0];
        const verifiedIssuers: VerifiedIssuer[] = map[locId] ||= [];
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

export async function getLegalOfficerVerifiedIssuers(api: LogionNodeApi, legalOfficerAddress: string): Promise<VerifiedIssuer[]> {
    const issuers = await getLegalOfficerVerifiedIssuersBatch(api, [legalOfficerAddress]);
    return issuers[legalOfficerAddress];
}

export async function getLegalOfficerVerifiedIssuersBatch(api: LogionNodeApi, legalOfficerAddresses: string[]): Promise<Record<string, VerifiedIssuer[]>> {
    const map: Record<string, VerifiedIssuer[]> = {};
    for(const legalOfficerAddress of legalOfficerAddresses) {
        if(!(legalOfficerAddress in map)) {
            const mapEntry: VerifiedIssuer[] = [];
            map[legalOfficerAddress] = mapEntry;

            const entries = await api.query.logionLoc.verifiedIssuersMap.entries(legalOfficerAddress);
            for(const entry of entries) {
                const address = entry[0].args[1].toString();
                const issuerOption = entry[1];
                const identityLocId = UUID.fromDecimalStringOrThrow(issuerOption.unwrap().identityLoc.toString());

                mapEntry.push({
                    address,
                    identityLocId,
                });
            }
        }
    }
    return map;
}
