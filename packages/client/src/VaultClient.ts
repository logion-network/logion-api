import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory.js";
import { aggregateArrays, MultiSourceHttpClient, initMultiSourceHttpClientState } from "./Http.js";
import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types.js";
import { newBackendError } from "./Error.js";

export type VaultTransferRequestStatus = "ACCEPTED" | "PENDING" | "REJECTED" | "CANCELLED" | "REJECTED_CANCELLED";

export interface VaultTransferRequestDecision {
    decisionOn: string;
    rejectReason?: string;
}

export interface VaultTransferRequest {
    id: string;
    createdOn: string;
    origin: string;
    destination: string;
    amount: string;
    block: string;
    index: number;
    decision?: VaultTransferRequestDecision;
    status: VaultTransferRequestStatus;
    legalOfficerAddress: string;
    requesterIdentity: UserIdentity;
    requesterPostalAddress: PostalAddress;
}

export interface CreateVaultTransferRequest {
    origin: string;
    destination: string;
    legalOfficerAddress: string;
    amount: string;
    block: string;
    index: number;
}

export interface FetchVaultTransferRequest {
    statuses?: VaultTransferRequestStatus[];
    requesterAddress?: string;
}

export interface FetchAllResult {
    pendingVaultTransferRequests: VaultTransferRequest[];
    cancelledVaultTransferRequests: VaultTransferRequest[];
    rejectedVaultTransferRequests: VaultTransferRequest[];
    acceptedVaultTransferRequests: VaultTransferRequest[];
}

export class VaultClient {

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        isLegalOfficer: boolean,
        isRecovery: boolean,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.isLegalOfficer = params.isLegalOfficer;
        this.isRecovery = params.isRecovery;
    }

    private networkState: NetworkState<LegalOfficerEndpoint>;

    private axiosFactory: AxiosFactory;

    private currentAddress: string;

    private isLegalOfficer: boolean;

    private isRecovery: boolean;

    private token: string;

    async fetchAll(legalOfficers?: LegalOfficer[]): Promise<FetchAllResult> {
        const initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers);

        const vaultTransferRequestsMultiClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );
        let vaultSpecificationFragment: FetchVaultTransferRequest;
        if(this.isLegalOfficer) {
            vaultSpecificationFragment = {
                statuses: []
            }
        } else {
            vaultSpecificationFragment = {
                requesterAddress: this.currentAddress,
                statuses: []
            }
        }

        const allRequests = aggregateArrays(await vaultTransferRequestsMultiClient.fetch((axios, endpoint) => this.getVaultTransferRequests(axios, endpoint.legalOfficer, {
            ...vaultSpecificationFragment,
            statuses: [ "PENDING", "CANCELLED", "REJECTED_CANCELLED", "REJECTED", "ACCEPTED" ]
        }))).sort(requestSort);

        let pendingVaultTransferRequests = this.filterByStatuses(allRequests, [ "PENDING" ]);
        let cancelledVaultTransferRequests = this.filterByStatuses(allRequests, [ "CANCELLED", "REJECTED_CANCELLED" ]);
        let rejectedVaultTransferRequests = this.filterByStatuses(allRequests, [ "REJECTED" ]);
        let acceptedVaultTransferRequests = this.filterByStatuses(allRequests, [ "ACCEPTED" ]);

        if(legalOfficers === undefined) {
            const newState = vaultTransferRequestsMultiClient.getState();
            this.networkState.update({
                nodesUp: newState.nodesUp,
                nodesDown: newState.nodesDown
            });
        }

        if(this.isRecovery) {
            pendingVaultTransferRequests = pendingVaultTransferRequests.filter(request => request.origin !== this.currentAddress);
            cancelledVaultTransferRequests = cancelledVaultTransferRequests.filter(request => request.origin !== this.currentAddress);
            rejectedVaultTransferRequests = rejectedVaultTransferRequests.filter(request => request.origin !== this.currentAddress);
            acceptedVaultTransferRequests = acceptedVaultTransferRequests.filter(request => request.origin !== this.currentAddress);
        } else {
            pendingVaultTransferRequests = pendingVaultTransferRequests.filter(request => request.origin === this.currentAddress);
            cancelledVaultTransferRequests = cancelledVaultTransferRequests.filter(request => request.origin === this.currentAddress);
            rejectedVaultTransferRequests = rejectedVaultTransferRequests.filter(request => request.origin === this.currentAddress);
            acceptedVaultTransferRequests = acceptedVaultTransferRequests.filter(request => request.origin === this.currentAddress);
        }

        return {
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
            acceptedVaultTransferRequests,
        };
    }

    private async getVaultTransferRequests(axios: AxiosInstance, legalOfficerAddress: string, fetch: FetchVaultTransferRequest): Promise<VaultTransferRequest[]> {
        try {
            const requests = (await axios.put("/api/vault-transfer-request", fetch)
                .then(response => response.data.requests)) as VaultTransferRequest[];
            return requests.map(request => ({
                ...request,
                legalOfficerAddress,
            }));
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private filterByStatuses(requests: VaultTransferRequest[], statuses: VaultTransferRequestStatus[]): VaultTransferRequest[] {
        return requests.filter(request => statuses.includes(request.status));
    }

    async createVaultTransferRequest(
        legalOfficer: LegalOfficer,
        params: CreateVaultTransferRequest,
    ): Promise<VaultTransferRequest> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        try {
            const response = await axios.post('/api/vault-transfer-request', params);
            return {
                ...response.data,
                legalOfficerAddress: legalOfficer.account.address,
            };
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        try {
            return await axios.post(`/api/vault-transfer-request/${request.id}/cancel`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async acceptVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        try {
            return await axios.post(`/api/vault-transfer-request/${request.id}/accept`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async rejectVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        rejectReason: string
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        try {
            return await axios.post(`/api/vault-transfer-request/${request.id}/reject`, { rejectReason });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async resubmitVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        try {
            return await axios.post(`/api/vault-transfer-request/${request.id}/resubmit`);
        } catch(e) {
            throw newBackendError(e);
        }
    }
}

export function requestSort(a: VaultTransferRequest, b: VaultTransferRequest) {
    return b.createdOn.localeCompare(a.createdOn);
}
