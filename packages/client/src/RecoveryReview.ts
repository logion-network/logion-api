import {
    BackendRecoveryRequest,
    RecoveryReviewClient,
    RecoveryInfo, RejectRecoveryParameters
} from "./RecoveryReviewClient.js";
import { SharedState } from "./SharedClient.js";
import { requireDefined } from "./assertions.js";

export abstract class RecoveryRequest {

    constructor(data: BackendRecoveryRequest, client: RecoveryReviewClient) {
        this.data = data;
        this.client = client;
    }

    readonly data: BackendRecoveryRequest;
    protected readonly client: RecoveryReviewClient;
}

export class NonPendingRecoveryRequest extends RecoveryRequest {
}

export class PendingRecoveryRequest extends RecoveryRequest {

    async accept(): Promise<void> {
        const { id, type } = this.data;
        return await this.client.acceptRecoveryRequest({ id, type });
    }

    async reject(params: RejectRecoveryParameters): Promise<void> {
        const { id, type } = this.data;
        const { rejectReason } = params;
        return await this.client.rejectRecoveryRequest({ id, type, rejectReason });
    }

    async fetchRecoveryInfo(): Promise<RecoveryInfo> {
        const { id, type } = this.data;
        return await this.client.fetchRecoveryInfo({ id, type });
    }
}

export class RecoveryReviewApi {

    private readonly client: RecoveryReviewClient;

    constructor(params: { sharedState: SharedState }) {
        const { sharedState } = params;
        const legalOfficer = requireDefined(
            sharedState.legalOfficers.find(lo => lo.account.equals(sharedState.currentAccount)),
            () => Error("Recovery Review is for Legal Officers only"),
        )
        this.client = new RecoveryReviewClient(legalOfficer);
    }

    async fetchPendingRecoveryRequests(): Promise<PendingRecoveryRequest[]> {
        const requests = await this.client.fetchRecoveryRequests();
        return requests.filter(request => request.status === "PENDING")
            .map(request => new PendingRecoveryRequest(request, this.client));
    }

    async fetchRecoveryRequestsHistory(): Promise<NonPendingRecoveryRequest[]> {
        const requests = await this.client.fetchRecoveryRequests();
        return requests.filter(request => request.status !== "PENDING")
            .map(request => new NonPendingRecoveryRequest(request, this.client));
    }
}
