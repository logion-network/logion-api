import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory";
import { aggregateArrays, MultiSourceHttpClient, initMultiSourceHttpClientState } from "./Http";
import { NetworkState } from "./NetworkState";
import { LegalOfficerEndpoint } from "./SharedClient";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types";

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

        const vaultTransferRequestsMultiClient = new MultiSourceHttpClient<LegalOfficerEndpoint, VaultTransferRequest[]>(
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
        const vaultTransferRequestsResult = await vaultTransferRequestsMultiClient.fetch((axios, endpoint) => this.getVaultTransferRequests(axios, endpoint.legalOfficer, {
            ...vaultSpecificationFragment,
            statuses: [ "PENDING" ]
        }));
        let pendingVaultTransferRequests = aggregateArrays(vaultTransferRequestsResult).sort(requestSort);

        const cancelledVaultTransferRequestsResult = await vaultTransferRequestsMultiClient.fetch((axios, endpoint) => this.getVaultTransferRequests(axios, endpoint.legalOfficer, {
            ...vaultSpecificationFragment,
            statuses: [ "CANCELLED", "REJECTED_CANCELLED" ]
        }));
        let cancelledVaultTransferRequests = aggregateArrays(cancelledVaultTransferRequestsResult).sort(requestSort);

        const rejectedVaultTransferRequestsResult = await vaultTransferRequestsMultiClient.fetch((axios, endpoint) => this.getVaultTransferRequests(axios, endpoint.legalOfficer, {
            ...vaultSpecificationFragment,
            statuses: [ "REJECTED" ]
        }));
        let rejectedVaultTransferRequests = aggregateArrays(rejectedVaultTransferRequestsResult).sort(requestSort);

        const acceptedVaultTransferRequestsResult = await vaultTransferRequestsMultiClient.fetch((axios, endpoint) => this.getVaultTransferRequests(axios, endpoint.legalOfficer, {
            ...vaultSpecificationFragment,
            statuses: [ "ACCEPTED" ]
        }));
        let acceptedVaultTransferRequests = aggregateArrays(acceptedVaultTransferRequestsResult).sort(requestSort);

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
        const requests = (await axios.put("/api/vault-transfer-request", fetch)
            .then(response => response.data.requests)) as VaultTransferRequest[];
        return requests.map(request => ({
            ...request,
            legalOfficerAddress,
        }));
    }

    async createVaultTransferRequest(
        legalOfficer: LegalOfficer,
        params: CreateVaultTransferRequest,
    ): Promise<VaultTransferRequest> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        const response = await axios.post('/api/vault-transfer-request', params);
        return {
            ...response.data,
            legalOfficerAddress: legalOfficer.address,
        };
    }

    async cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        return await axios.post(`/api/vault-transfer-request/${request.id}/cancel`);
    }

    async acceptVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        return await axios.post(`/api/vault-transfer-request/${request.id}/accept`);
    }

    async rejectVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        rejectReason: string
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        return await axios.post(`/api/vault-transfer-request/${request.id}/reject`, { rejectReason });
    }

    async resubmitVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<void> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        return await axios.post(`/api/vault-transfer-request/${request.id}/resubmit`);
    }
}

export function requestSort(a: VaultTransferRequest, b: VaultTransferRequest) {
    return b.createdOn.localeCompare(a.createdOn);
}
