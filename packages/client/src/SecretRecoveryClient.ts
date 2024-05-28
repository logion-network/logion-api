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

export interface DownloadSecretRequest {
    requesterIdentityLocId: UUID;
    requestId: string;
    challenge: string;
}

export class SecretRecoveryClient {

    constructor(args: { sharedState: SharedState }) {
        this.sharedState = args.sharedState;
    }

    private sharedState: SharedState;

    async createSecretRecoveryRequest(params: CreateSecretRecoveryRequest): Promise<string> {
        const { secretName, challenge, userIdentity, userPostalAddress, requesterIdentityLocId } = params;
        const axios = await this.backend({ locId: requesterIdentityLocId });
        try {
            const response = await axios.post("/api/secret-recovery", {
                requesterIdentityLocId: requesterIdentityLocId.toString(),
                secretName,
                challenge,
                userIdentity,
                userPostalAddress,
            });
            return response.data.id;
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

    async downloadSecret(params: DownloadSecretRequest): Promise<string> {
        const { requesterIdentityLocId, requestId, challenge } = params;
        const axios = await this.backend({ locId: requesterIdentityLocId });
        try {
            const response = await axios.put(`/api/secret-recovery/${ requestId.toString() }/download-secret`, {
                challenge,
            });
            return response.data.value;
        } catch (e) {
            throw newBackendError(e);
        }
    }
}
