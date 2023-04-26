import { LogionNodeApi, LogionNodeApiClass } from "./Connection.js";
import { LegalOfficerCase, VerifiedIssuerType } from "./Types.js";
import { UUID } from "./UUID.js";

/**
 * @deprecated use VerifiedIssuerType
 */
export type VerifiedIssuer = VerifiedIssuerType;

/**
 * @deprecated use (await logionApi.batch.locs([ locId ]).getLocsVerifiedIssuers())[ locId.toDecimalString() ]
 */
export async function getVerifiedIssuers(
    api: LogionNodeApi,
    locId: UUID,
    locs?: Record<string, LegalOfficerCase>,
    availableVerifiedIssuers?: Record<string, VerifiedIssuer[]>,
): Promise<VerifiedIssuer[]> {
    const logionApi = new LogionNodeApiClass(api);
    return (await logionApi.batch.locs([ locId ], locs, availableVerifiedIssuers).getLocsVerifiedIssuers())[locId.toDecimalString()];
}

/**
 * @deprecated use logionApi.batch.locs(locIds).getLocsVerifiedIssuers()
 */
export async function getVerifiedIssuersBatch(
    api: LogionNodeApi,
    locIds: UUID[],
    locs: Record<string, LegalOfficerCase>,
    availableVerifiedIssuers: Record<string, VerifiedIssuer[]>,
): Promise<Record<string, VerifiedIssuer[]>> {
    const logionApi = new LogionNodeApiClass(api);
    return logionApi.batch.locs(locIds, locs, availableVerifiedIssuers).getLocsVerifiedIssuers();
}

/**
 * @deprecated this function has no replacement
 */
export async function getLegalOfficerVerifiedIssuers(api: LogionNodeApi, legalOfficerAddress: string): Promise<VerifiedIssuer[]> {
    const issuers = await getLegalOfficerVerifiedIssuersBatch(api, [legalOfficerAddress]);
    return issuers[legalOfficerAddress];
}

/**
 * @deprecated this function has no replacement
 */
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
