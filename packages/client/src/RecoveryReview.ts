import {
    BackendRecoveryRequest,
    RecoveryReviewClient,
    RecoveryInfo,
    RejectRecoveryParameters
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

export class ReviewedRecoveryRequest extends RecoveryRequest {
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

export class RecoveryRequests {

    readonly requests: RecoveryRequest[];

    constructor(recoveryRequests: RecoveryRequest[]) {
        this.requests = recoveryRequests;
    }

    get pendingRequests(): PendingRecoveryRequest[] {
        return this.requests.filter(request => request instanceof PendingRecoveryRequest) as PendingRecoveryRequest[];
    }

    get reviewedRequests(): ReviewedRecoveryRequest[] {
        return this.requests.filter(request => request instanceof ReviewedRecoveryRequest);
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

    async fetchRecoveryRequests(): Promise<RecoveryRequests> {
        const requests = await this.client.fetchRecoveryRequests();
        return new RecoveryRequests(requests.map(request => this.toRecoveryRequest(request)));
    }

    private toRecoveryRequest(request: BackendRecoveryRequest): RecoveryRequest {
        if (request.status === "PENDING") {
            return new PendingRecoveryRequest(request, this.client);
        } else {
            return new ReviewedRecoveryRequest(request, this.client);
        }
    }
}
