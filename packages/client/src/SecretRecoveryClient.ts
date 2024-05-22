import { UserIdentity, PostalAddress } from "./Types";
import { LocMultiClient, FetchParameters } from "./LocClient.js";
import { requireDefined } from "./assertions.js";
import { SharedState } from "./SharedClient.js";
import { AxiosInstance } from "axios";
import { UUID } from "@logion/node-api";
import { newBackendError } from "./Error.js";

export interface CreateSecretRecoveryRequest {
    requesterIdentityLocId: UUID;
    secretName: string;
    challenge: string;
    userIdentity: UserIdentity;
    userPostalAddress: PostalAddress;
}

export class SecretRecoveryClient {

    constructor(args: { sharedState: SharedState }) {
        this.sharedState = args.sharedState;
    }

    private sharedState: SharedState;

    async createSecretRecoveryRequest(params: CreateSecretRecoveryRequest): Promise<void> {
        const { secretName, challenge, userIdentity, userPostalAddress, requesterIdentityLocId } = params;
        const axios = await this.backend({ locId: requesterIdentityLocId });
        try {
            await axios.post("/api/secret-recovery", {
                requesterIdentityLocId: requesterIdentityLocId.toString(),
                secretName,
                challenge,
                userIdentity,
                userPostalAddress,
            });
        } catch (e) {
            throw newBackendError(e);
        }
    }

    private async backend(params: FetchParameters): Promise<AxiosInstance> {
        const loc = await LocMultiClient.getLoc({
            ...params,
            api: this.sharedState.nodeApi,
        });
        const legalOfficer = requireDefined(this.sharedState.legalOfficers.find(lo => lo.account.equals(loc.owner)));
        return legalOfficer.buildAxiosToNode();
    }
}
