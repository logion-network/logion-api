import { LogionNodeApi } from "./Connection";
import { getLegalOfficerCase } from "./LogionLoc";
import { UUID } from "./UUID";

export interface VerifiedIssuer {
    address: string;
    identityLocId: UUID;
}

export async function getVerifiedIssuers(api: LogionNodeApi, locId: UUID): Promise<VerifiedIssuer[]> {
    const loc = await getLegalOfficerCase({
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
        const verifiedIssuer = (await api.query.logionLoc.verifiedIssuersMap(owner, verifiedIssuerAddress)).unwrap();
        verifiedIssuers.push({
            address: verifiedIssuerAddress,
            identityLocId: UUID.fromDecimalStringOrThrow(verifiedIssuer.identityLoc.toString()),
        });
    }
    return verifiedIssuers;
}

export async function getLegalOfficerVerifiedIssuers(api: LogionNodeApi, legalOfficerAddress: string): Promise<VerifiedIssuer[]> {
    const entries = await api.query.logionLoc.verifiedIssuersMap.entries(legalOfficerAddress);
    const verifiedIssuers: VerifiedIssuer[] = [];
    for(const entry of entries) {
        const verifiedIssuerAddress = entry[0].args[1].toString();
        const verifiedIssuer = (await api.query.logionLoc.verifiedIssuersMap(legalOfficerAddress, verifiedIssuerAddress)).unwrap();
        verifiedIssuers.push({
            address: verifiedIssuerAddress,
            identityLocId: UUID.fromDecimalStringOrThrow(verifiedIssuer.identityLoc.toString()),
        });
    }
    return verifiedIssuers;
}
