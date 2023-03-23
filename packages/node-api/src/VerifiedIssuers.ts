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

export async function getLegalOfficerVerifiedIssuers(api: LogionNodeApi, legalOfficerAddress: string): Promise<VerifiedIssuer[]> {
    const issuers = await getLegalOfficersVerifiedIssuers(api, [legalOfficerAddress]);
    return issuers[legalOfficerAddress];
}

export async function getLegalOfficersVerifiedIssuers(api: LogionNodeApi, legalOfficerAddresses: string[]): Promise<Record<string, VerifiedIssuer[]>> {
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
