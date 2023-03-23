import { LogionNodeApi, getProxy, getRecoveryConfig, RecoveryConfig } from "@logion/node-api";
import { AxiosInstance } from "axios";

import { AxiosFactory } from "./AxiosFactory.js";
import { aggregateArrays, MultiSourceHttpClient, initMultiSourceHttpClientState } from "./Http.js";
import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types.js";

export interface LegalOfficerDecision {
    rejectReason: string | null,
    decisionOn: string | null,
    locId?: string | null,
}

export type ProtectionRequestStatus =
    "PENDING"
    | "REJECTED"
    | "ACCEPTED"
    | "ACTIVATED"
    | 'CANCELLED'
    | 'REJECTED_CANCELLED'
    | 'ACCEPTED_CANCELLED';

export interface ProtectionRequest {
    id: string,
    requesterAddress: string,
    decision: LegalOfficerDecision,
    userIdentity: UserIdentity,
    userPostalAddress: PostalAddress,
    createdOn: string,
    isRecovery: boolean,
    addressToRecover: string | null,
    status: ProtectionRequestStatus,
    legalOfficerAddress: string,
    otherLegalOfficerAddress: string,
}

export type ProtectionRequestKind = 'RECOVERY' | 'PROTECTION_ONLY' | 'ANY';

export interface FetchProtectionRequestSpecification {
    requesterAddress?: string,
    kind: ProtectionRequestKind,
    statuses?: ProtectionRequestStatus[],
}

export interface CreateProtectionRequest {
    requesterAddress: string,
    userIdentity: UserIdentity,
    userPostalAddress: PostalAddress,
    isRecovery: boolean,
    addressToRecover: string,
    legalOfficerAddress: string,
    otherLegalOfficerAddress: string,
}

export interface FetchAllResult {
    pendingProtectionRequests: ProtectionRequest[];
    acceptedProtectionRequests: ProtectionRequest[];
    rejectedProtectionRequests: ProtectionRequest[];
    cancelledProtectionRequests: ProtectionRequest[];
    recoveryConfig: RecoveryConfig | undefined;
    recoveredAddress: string | undefined;
}

export interface UserActionParameters {
    id: string,
}

export interface UpdateParameters {
    otherLegalOfficer: LegalOfficer
}

export class RecoveryClient {

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        nodeApi: LogionNodeApi,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;

    private readonly axiosFactory: AxiosFactory;

    private readonly currentAddress: string;

    private readonly token: string;

    private readonly nodeApi: LogionNodeApi;

    async fetchAll(legalOfficers?: LegalOfficer[]): Promise<FetchAllResult> {
        const initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers);

        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );
        const allRequests = aggregateArrays(await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAddress,
            statuses: [ "PENDING", "ACCEPTED", "ACTIVATED", "REJECTED", "CANCELLED", "REJECTED_CANCELLED", "ACCEPTED_CANCELLED" ],
            kind: "ANY",
        })));

        const pendingProtectionRequests = this.filterByStatuses(allRequests, [ "PENDING" ]);
        const acceptedProtectionRequests = this.filterByStatuses(allRequests, [ "ACCEPTED", "ACTIVATED" ]);
        const rejectedProtectionRequests = this.filterByStatuses(allRequests, [ "REJECTED" ]);
        const cancelledProtectionRequests = this.filterByStatuses(allRequests, [ "CANCELLED", "REJECTED_CANCELLED", "ACCEPTED_CANCELLED" ]);

        if (legalOfficers === undefined) {
            const newState = multiClient.getState();
            this.networkState.update({
                nodesUp: newState.nodesUp,
                nodesDown: newState.nodesDown
            });
        }

        const api = this.nodeApi;
        const recoveryConfig = await getRecoveryConfig({
            api,
            accountId: this.currentAddress
        });

        const recoveredAddress = await getProxy({
            api,
            currentAddress: this.currentAddress
        });

        return {
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            cancelledProtectionRequests,
            recoveryConfig,
            recoveredAddress
        };
    }

    private async fetchProtectionRequests(
        axios: AxiosInstance,
        specification: FetchProtectionRequestSpecification
    ): Promise<ProtectionRequest[]> {
        const response = await axios.put("/api/protection-request", specification);
        return response.data.requests;
    }

    private filterByStatuses(requests: ProtectionRequest[], statuses: ProtectionRequestStatus[]): ProtectionRequest[] {
        return requests.filter(request => statuses.includes(request.status));
    }

    async fetchAccepted(legalOfficers: LegalOfficer[]): Promise<ProtectionRequest[]> {
        const initialState = {
            nodesUp: legalOfficers.map(legalOfficer => ({
                url: legalOfficer.node,
                legalOfficer: legalOfficer.address
            })),
            nodesDown: [],
        };
        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );
        const result = await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAddress,
            statuses: [ "ACCEPTED", "ACTIVATED" ],
            kind: "ANY",
        }));
        return aggregateArrays(result);
    }
}

export class LoRecoveryClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        token: string,
        legalOfficer: LegalOfficer,
    }) {
        this.axiosFactory = params.axiosFactory;
        this.token = params.token;
        this.legalOfficer = params.legalOfficer;
    }

    private readonly axiosFactory: AxiosFactory;
    private readonly token: string;
    private readonly legalOfficer: LegalOfficer;

    async createProtectionRequest(request: CreateProtectionRequest): Promise<ProtectionRequest> {
        const response = await this.backend().post("/api/protection-request", request);
        return response.data;
    }

    async resubmit(params: UserActionParameters): Promise<void> {
        const { id } = params;
        return this.backend().post(`/api/protection-request/${ id }/resubmit`)
    }

    async cancel(params: UserActionParameters): Promise<void> {
        const { id } = params;
        return this.backend().post(`/api/protection-request/${ id }/cancel`)
    }

    async update(params: UserActionParameters & UpdateParameters): Promise<void> {
        const { id, otherLegalOfficer } = params;
        return this.backend().put(`/api/protection-request/${ id }/update`, {
            otherLegalOfficerAddress: otherLegalOfficer.address
        })
    }

    private backend(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.legalOfficer.node, this.token);
    }

}
