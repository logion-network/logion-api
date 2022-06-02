import { AxiosInstance } from "axios";
import { LogionNodeApi } from "node-api/dist";
import { getProxy, getRecoveryConfig, RecoveryConfig } from "@logion/node-api/dist/Recovery";
import { AxiosFactory } from "./AxiosFactory";
import { aggregateArrays, MultiResponse, MultiSourceHttpClient, initMultiSourceHttpClientState } from "./Http";
import { NetworkState } from "./NetworkState";
import { LegalOfficerEndpoint } from "./SharedClient";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types";

export interface LegalOfficerDecision {
    rejectReason: string | null,
    decisionOn: string | null,
    locId?: string | null,
}

export type ProtectionRequestStatus = "PENDING" | "REJECTED" | "ACCEPTED" | "ACTIVATED";

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
    otherLegalOfficerAddress: string,
}

export interface FetchAllResult {
    pendingProtectionRequests: ProtectionRequest[];
    acceptedProtectionRequests: ProtectionRequest[];
    rejectedProtectionRequests: ProtectionRequest[];
    recoveryConfig: RecoveryConfig | undefined;
    recoveredAddress: string | undefined;
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
        let initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers)

        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint, ProtectionRequest[]>(
            initialState,
            this.axiosFactory,
            this.token
        );
        let result: MultiResponse<ProtectionRequest[]>;

        result = await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAddress,
            statuses: [ "PENDING" ],
            kind: "ANY",
        }));
        const pendingProtectionRequests = aggregateArrays(result);

        result = await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAddress,
            statuses: [ "ACCEPTED", "ACTIVATED" ],
            kind: "ANY",
        }));
        const acceptedProtectionRequests = aggregateArrays(result);

        result = await multiClient.fetch(axios => this.fetchProtectionRequests(axios, {
            requesterAddress: this.currentAddress,
            statuses: [ "REJECTED" ],
            kind: "ANY",
        }));
        const rejectedProtectionRequests = aggregateArrays(result);

        if(legalOfficers === undefined) {
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

    async createProtectionRequest(
        legalOfficer: LegalOfficer,
        request: CreateProtectionRequest
    ): Promise<ProtectionRequest> {
        const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
        const response = await axios.post("/api/protection-request", request);
        return response.data;
    }

    async fetchAccepted(legalOfficers: LegalOfficer[]): Promise<ProtectionRequest[]> {
        const initialState = {
            nodesUp: legalOfficers.map(legalOfficer => ({
                url: legalOfficer.node,
                legalOfficer: legalOfficer.address
            })),
            nodesDown: [],
        };
        const multiClient = new MultiSourceHttpClient<LegalOfficerEndpoint, ProtectionRequest[]>(
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
