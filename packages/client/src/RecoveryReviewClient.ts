import { UserIdentity, PostalAddress, LegalOfficerClass } from "./Types.js";
import { ProtectionRequestStatus } from "./AccountRecoveryClient.js";
import { AxiosInstance } from "axios";
import { newBackendError } from "./Error.js";

export type RecoveryRequestType = "ACCOUNT" | "SECRET";

export type RecoveryRequestStatus = ProtectionRequestStatus;

export interface BackendRecoveryRequest {
    userIdentity: UserIdentity;
    userPostalAddress: PostalAddress;
    createdOn: string;
    status: RecoveryRequestStatus;
    type: RecoveryRequestType;
    id: string;
    rejectReason: string;
}

export interface RecoveryInfo {
    type: RecoveryRequestType;
    identity1?: {
        userIdentity: UserIdentity;
        userPostalAddress: PostalAddress;
    },
    identity2: {
        userIdentity: UserIdentity;
        userPostalAddress: PostalAddress;
    },
    accountRecovery?: {
        address1: string;
        address2: string;
    },
}

export interface RecoveryBackendParameters {
    id: string,
    type: RecoveryRequestType,
}

export interface RejectRecoveryParameters {
    rejectReason: string;
}

export interface RejectRecoveryBackendParameters extends RecoveryBackendParameters, RejectRecoveryParameters {
}


export class RecoveryReviewClient {

    private readonly legalOfficer: LegalOfficerClass;

    constructor(legalOfficer: LegalOfficerClass) {
        this.legalOfficer = legalOfficer;
    }

    async fetchRecoveryRequests(): Promise<BackendRecoveryRequest[]> {
        try {
            const response = await this.backend().put(`/api/recovery-requests`);
            return response.data.requests;
        } catch (e) {
            throw newBackendError(e);
        }
    }

    async fetchRecoveryInfo(params: RecoveryBackendParameters): Promise<RecoveryInfo> {
        const { type, id } = params;
        if (type === "ACCOUNT") {
            try {
                const response = await this.backend().put(`/api/protection-request/${ id }/recovery-info`);
                return response.data;
            } catch (e) {
                throw newBackendError(e);
            }
        } else if (type === "SECRET") {
            try {
                const response = await this.backend().put(`/api/secret-recovery/${ id }/recovery-info`);
                return response.data;
            } catch (e) {
                throw newBackendError(e);
            }
        } else {
            throw new Error(`Unsupported recovery type ${ type }`);
        }
    }

    async acceptRecoveryRequest(params: RecoveryBackendParameters): Promise<void> {
        try {
            const { type, id } = params;
            if (type === "ACCOUNT") {
                await this.backend().post(`/api/protection-request/${ id }/accept`);
            } else {
                await this.backend().post(`/api/secret-recovery/${ id }/accept`);
            }
        } catch (e) {
            throw newBackendError(e);
        }
    }

    async rejectRecoveryRequest(params: RejectRecoveryBackendParameters): Promise<void> {
        try {
            const { type, id, rejectReason } = params;
            if (type === "ACCOUNT") {
                await this.backend().post(`/api/protection-request/${ id }/reject`, {
                    rejectReason,
                });
            } else {
                await this.backend().post(`/api/secret-recovery/${ id }/reject`, {
                    rejectReason,
                });
            }
        } catch (e) {
            throw newBackendError(e);
        }
    }

    backend(): AxiosInstance {
        return this.legalOfficer.buildAxiosToNode();
    }

}
