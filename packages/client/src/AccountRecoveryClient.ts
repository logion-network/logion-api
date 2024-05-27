import { LogionNodeApiClass, TypesRecoveryConfig, ValidAccountId } from "@logion/node-api";
import { AxiosInstance } from "axios";

import { AxiosFactory } from "./AxiosFactory.js";
import { aggregateArrays, MultiSourceHttpClient, initMultiSourceHttpClientState } from "./Http.js";
import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types.js";
import { newBackendError } from "./Error.js";

export interface LegalOfficerDecision {
    rejectReason: string | null,
    decisionOn: string | null,
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
    requesterIdentityLoc: string,
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
    requesterIdentityLoc: string,
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
    recoveryConfig: TypesRecoveryConfig | undefined;
    recoveredAccount: ValidAccountId | undefined;
}

export interface UserActionParameters {
    id: string,
}

export interface UpdateParameters {
    otherLegalOfficer: LegalOfficer
}

export class AccountRecoveryClient {

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAccount: ValidAccountId,
        token: string,
        nodeApi: LogionNodeApiClass,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAccount = params.currentAccount;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;

    private readonly axiosFactory: AxiosFactory;

    private readonly currentAccount: ValidAccountId;

    private readonly token: string;

    private readonly nodeApi: LogionNodeApiClass;

    async fetchAll(legalOfficers?: LegalOfficer[]): Promise<FetchAllResult> {
        const initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers);

        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );
        const allRequests = aggregateArrays(await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAccount.address,
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

        const recoveryConfig = await this.nodeApi.queries.getRecoveryConfig(this.currentAccount);
        const recoveredAccount = await this.nodeApi.queries.getProxy(this.currentAccount);

        return {
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            cancelledProtectionRequests,
            recoveryConfig,
            recoveredAccount,
        };
    }

    private async fetchProtectionRequests(
        axios: AxiosInstance,
        specification: FetchProtectionRequestSpecification
    ): Promise<ProtectionRequest[]> {
        try {
            const response = await axios.put("/api/protection-request", specification);
            return response.data.requests;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private filterByStatuses(requests: ProtectionRequest[], statuses: ProtectionRequestStatus[]): ProtectionRequest[] {
        return requests.filter(request => statuses.includes(request.status));
    }

    async fetchAccepted(legalOfficers: LegalOfficer[]): Promise<ProtectionRequest[]> {
        const initialState = {
            nodesUp: legalOfficers.map(legalOfficer => ({
                url: legalOfficer.node,
                legalOfficer: legalOfficer.account.address
            })),
            nodesDown: [],
        };
        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );
        const result = await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAccount.address,
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
        try {
            const response = await this.backend().post("/api/protection-request", request);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private backend(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.legalOfficer.node, this.token);
    }

    async resubmit(params: UserActionParameters): Promise<void> {
        const { id } = params;
        try {
            return this.backend().post(`/api/protection-request/${ id }/resubmit`)
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async cancel(params: UserActionParameters): Promise<void> {
        const { id } = params;
        try {
            return this.backend().post(`/api/protection-request/${ id }/cancel`)
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async update(params: UserActionParameters & UpdateParameters): Promise<void> {
        const { id, otherLegalOfficer } = params;
        try {
            return this.backend().put(`/api/protection-request/${ id }/update`, {
                otherLegalOfficerAddress: otherLegalOfficer.account.address
            })
        } catch(e) {
            throw newBackendError(e);
        }
    }
}
