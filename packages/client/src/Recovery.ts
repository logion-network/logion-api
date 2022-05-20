import {
    claimRecovery,
    createRecovery,
    getActiveRecovery,
    initiateRecovery,
    RecoveryConfig
} from "@logion/node-api/dist/Recovery";
import { FetchAllResult, LegalOfficerDecision, ProtectionRequest, ProtectionRequestStatus, RecoveryClient } from "./RecoveryClient";

import { SharedState } from "./SharedClient";
import { SignCallback, Signer } from "./Signer";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types";
import { BalanceState, getBalanceState } from "./Balance";
import { VaultState } from "./Vault";
import { Duration } from "luxon";
import { PollingParameters, waitFor } from "./Polling";

export type ProtectionState = NoProtection | PendingProtection | AcceptedProtection | ActiveProtection | PendingRecovery | ClaimedRecovery | UnavailableProtection;

export interface RecoverySharedState extends SharedState {
    pendingProtectionRequests: ProtectionRequest[];
    acceptedProtectionRequests: ProtectionRequest[];
    rejectedProtectionRequests: ProtectionRequest[];
    allRequests: ProtectionRequest[];
    recoveryConfig?: RecoveryConfig;
    recoveredAddress?: string;
    selectedLegalOfficers: LegalOfficer[];
}

export function getInitialState(data: FetchAllResult, sharedState: SharedState): ProtectionState {
    const {
        pendingProtectionRequests,
        acceptedProtectionRequests,
        rejectedProtectionRequests,
        recoveryConfig,
        recoveredAddress
    } = data;

    const numberOfRequests = pendingProtectionRequests.length + acceptedProtectionRequests.length + rejectedProtectionRequests.length;
    const isUnavailable = numberOfRequests === 1 || (recoveryConfig !== undefined && numberOfRequests < 2);
    const allRequests = pendingProtectionRequests.concat(acceptedProtectionRequests).concat(rejectedProtectionRequests);

    if(isUnavailable) {
        let selectedLegalOfficers: LegalOfficer[] = [];
        if(recoveryConfig !== undefined) {
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address));
        } else if(allRequests.length > 0) {
            const selectedLegalOfficersAddresses = [ allRequests[0].legalOfficerAddress, allRequests[0].otherLegalOfficerAddress ];
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => selectedLegalOfficersAddresses.includes(legalOfficer.address));
        }
        return new UnavailableProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers,
        });
    } else if(recoveryConfig !== undefined && recoveredAddress === undefined && !data.acceptedProtectionRequests[0].isRecovery) {
        return new ActiveProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address)),
        });
    } else if(recoveryConfig !== undefined && recoveredAddress === undefined && data.acceptedProtectionRequests[0].isRecovery) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[1].legalOfficerAddress)!;
        return new PendingRecovery({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if(recoveryConfig !== undefined && recoveredAddress !== undefined) {
        return new ClaimedRecovery({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address)),
        });
    } else if(data.acceptedProtectionRequests.length === 2) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[1].legalOfficerAddress)!;
        return new AcceptedProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if(pendingProtectionRequests.length === 2) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.pendingProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.pendingProtectionRequests[1].legalOfficerAddress)!;
        return new PendingProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if(pendingProtectionRequests.length === 1 && acceptedProtectionRequests.length === 1) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === pendingProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === acceptedProtectionRequests[0].legalOfficerAddress)!;
        return new PendingProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            allRequests,
            recoveryConfig,
            recoveredAddress,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else {
        return new NoProtection({ ...sharedState });
    }
}

export class NoProtection {

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedState;

    async requestProtection(params: {
        legalOfficer1: LegalOfficer,
        legalOfficer2: LegalOfficer,
        userIdentity: UserIdentity,
        postalAddress: PostalAddress,
    }): Promise<PendingProtection> {
        return this.requestProtectionOrRecovery({ ...params });
    }

    private async requestProtectionOrRecovery(params: {
        legalOfficer1: LegalOfficer,
        legalOfficer2: LegalOfficer,
        userIdentity: UserIdentity,
        postalAddress: PostalAddress,
        recoveredAddress?: string,
    }): Promise<PendingProtection> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const protection1 = await recoveryClient.createProtectionRequest(params.legalOfficer1, {
            requesterAddress: this.sharedState.currentAddress!,
            otherLegalOfficerAddress: params.legalOfficer2.address,
            userIdentity: params.userIdentity,
            userPostalAddress: params.postalAddress,
            isRecovery: params.recoveredAddress !== undefined,
            addressToRecover: params.recoveredAddress || "",
        });
        const protection2 = await recoveryClient.createProtectionRequest(params.legalOfficer2, {
            requesterAddress: this.sharedState.currentAddress!,
            otherLegalOfficerAddress: params.legalOfficer1.address,
            userIdentity: params.userIdentity,
            userPostalAddress: params.postalAddress,
            isRecovery: params.recoveredAddress !== undefined,
            addressToRecover: params.recoveredAddress || "",
        });

        return new PendingProtection({
            ...this.sharedState,
            pendingProtectionRequests: [
                protection1,
                protection2,
            ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            allRequests: [
                protection1,
                protection2,
            ],
            selectedLegalOfficers: [ params.legalOfficer1, params.legalOfficer2 ],
        });
    }

    async requestRecovery(params: {
        legalOfficer1: LegalOfficer,
        legalOfficer2: LegalOfficer,
        userIdentity: UserIdentity,
        postalAddress: PostalAddress,
        recoveredAddress: string,
        signer: Signer,
        callback?: SignCallback,
    }): Promise<PendingProtection> {
        const activeRecovery = await getActiveRecovery({
            api: this.sharedState.nodeApi,
            sourceAccount: params.recoveredAddress,
            destinationAccount: this.sharedState.currentAddress!,
        });
        if(activeRecovery === undefined) {
            await params.signer.signAndSend({
                signerId: this.sharedState.currentAddress!,
                submittable: initiateRecovery({
                    api: this.sharedState.nodeApi,
                    addressToRecover: params.recoveredAddress,
                }),
                callback: params.callback,
            });
        }
        return this.requestProtectionOrRecovery({ ...params });
    }

    get protectionParameters(): ProtectionParameters {
        throw new Error("No protection parameters available");
    }
}

function newRecoveryClient(sharedState: SharedState): RecoveryClient {
    return new RecoveryClient({
        axiosFactory: sharedState.axiosFactory,
        currentAddress: sharedState.currentAddress!,
        networkState: sharedState.networkState,
        token: sharedState.tokens.get(sharedState.currentAddress!)!.value,
        nodeApi: sharedState.nodeApi,
    });
}

export interface LegalOfficerProtectionState {

    readonly legalOfficer: LegalOfficer;

    readonly status: ProtectionRequestStatus;

    readonly decision: LegalOfficerDecision;
}

export interface ProtectionParameters {

    readonly states: LegalOfficerProtectionState[];

    readonly userIdentity: UserIdentity;

    readonly postalAddress: PostalAddress;

    readonly recoveredAddress: string | undefined;

    readonly isRecovery: boolean;

    readonly isActive: boolean;

    readonly isClaimed: boolean;
}

export interface WithProtectionParameters {

    get protectionParameters(): ProtectionParameters;
}

function buildProtectionParameters(sharedState: RecoverySharedState): ProtectionParameters {
    let request1 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[0].address)!;
    let request2 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[1].address)!;
    const isRecovery = sharedState.allRequests[0].isRecovery;
    return {
        states: [
            buildProtectionState(sharedState.selectedLegalOfficers[0], request1),
            buildProtectionState(sharedState.selectedLegalOfficers[1], request2),
        ],
        postalAddress: request1.userPostalAddress,
        userIdentity: request1.userIdentity,
        recoveredAddress: request1.addressToRecover || undefined,
        isRecovery,
        isActive: sharedState.recoveryConfig !== undefined,
        isClaimed: sharedState.recoveredAddress !== undefined,
    };
}

function buildProtectionState(legalOfficer: LegalOfficer, request: ProtectionRequest): LegalOfficerProtectionState {
    return {
        legalOfficer,
        status: request.status,
        decision: request.decision,
    };
}

export class UnavailableProtection implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        throw new Error("Protection is temporarily unavailable");
    }

    get isRecovery(): boolean {
        return this.sharedState.recoveredAddress !== undefined
            || (this.sharedState.allRequests.length > 0 && this.sharedState.allRequests[0].isRecovery);
    }

    get isActivated(): boolean {
        return this.sharedState.recoveryConfig !== undefined;
    }
}

export class PendingProtection implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    async refresh(): Promise<PendingProtection | AcceptedProtection> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const data = await recoveryClient.fetchAll(this.sharedState.legalOfficers);
        const state = getInitialState(data, this.sharedState);
        if(state instanceof PendingProtection || state instanceof AcceptedProtection) {
            return state;
        } else {
            throw new Error("Unexpected state " + state.constructor.name);
        }
    }

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }
}

export class AcceptedProtection implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    async activate(
        signer: Signer,
        callback?: SignCallback,
    ): Promise<ActiveProtection | PendingRecovery> {
        await signer.signAndSend({
            signerId: this.sharedState.currentAddress!,
            submittable: createRecovery({
                api: this.sharedState.nodeApi,
                legalOfficers: this.sharedState.legalOfficers.map(legalOfficer => legalOfficer.address),
            }),
            callback
        });
        const newSharedState = {
            ...this.sharedState,
            recoveryConfig: {
                legalOfficers: this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address)
            }
        };
        if(this.protectionParameters.isRecovery) {
            return new PendingRecovery(newSharedState);
        } else {
            return new ActiveProtection(newSharedState);
        }
    }

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }
}

export interface WithActiveProtection<T extends ProtectionState> {

    isFullyReady(): boolean;

    refresh(): Promise<WithActiveProtection<T>>;

    waitForFullyReady(pollingParameters?: PollingParameters): Promise<T>;
}

export interface WithRefresh<T extends ProtectionState> {

    refresh(): Promise<T>;
}

export class ActiveProtection implements WithProtectionParameters, WithActiveProtection<ActiveProtection>, WithRefresh<ActiveProtection> {

    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    isFullyReady(): boolean {
        return isProtectionFullyReady(this.sharedState);
    }

    async vaultState(): Promise<VaultState> {
        return vaultState(this.sharedState);
    }

    async refresh(): Promise<ActiveProtection> {
        return refreshWithActiveProtection(this.sharedState, ActiveProtection);
    }

    async waitForFullyReady(pollingParameters?: PollingParameters): Promise<ActiveProtection> {
        return waitForProtectionFullyReady(this.sharedState, this, pollingParameters);
    }
}

function isProtectionFullyReady(sharedState: RecoverySharedState): boolean {
    return sharedState.acceptedProtectionRequests.every(request => request.status === "ACTIVATED");
}

async function vaultState(sharedState: RecoverySharedState): Promise<VaultState> {
    if(!isProtectionFullyReady(sharedState)) {
        throw new Error("Protection is not yet fully ready, please wait a couple of seconds");
    }
    return VaultState.create({
        ...sharedState,
        isRecovery: false
    });
}

async function refreshWithActiveProtection<T>(
    sharedState: RecoverySharedState,
    stateConstructor: new (sharedState: RecoverySharedState) => T
): Promise<T> {
    const recoveryClient = newRecoveryClient(sharedState);
    const acceptedProtectionRequests = await recoveryClient.fetchAccepted(sharedState.selectedLegalOfficers);
    return new stateConstructor({
        ...sharedState,
        acceptedProtectionRequests,
    });
}

async function waitForProtectionFullyReady<T extends ProtectionState, S extends WithActiveProtection<T> & WithRefresh<T>>(
    sharedState: RecoverySharedState,
    state: S,
    pollingParameters?: PollingParameters,
): Promise<S> {
    if(isProtectionFullyReady(sharedState)) {
        return state;
    } else {
        return waitFor<S>({
            predicate: newState => newState.isFullyReady(),
            producer: async () => await state.refresh() as S,
            pollingParameters,
        });
    }
}

export class PendingRecovery implements WithProtectionParameters, WithActiveProtection<PendingRecovery>, WithRefresh<PendingRecovery> {

    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    async claimRecovery(
        signer: Signer,
        callback?: SignCallback,
    ): Promise<ClaimedRecovery> {
        if(!this.isFullyReady()) {
            throw new Error("Protection is not yet fully ready, please wait a couple of seconds");
        }
        const addressToRecover = this.protectionParameters.recoveredAddress!;
        await signer.signAndSend({
            signerId: this.sharedState.currentAddress!,
            submittable: claimRecovery({
                api: this.sharedState.nodeApi,
                addressToRecover,
            }),
            callback
        });
        return new ClaimedRecovery({
            ...this.sharedState,
            recoveredAddress: addressToRecover
        });
    }

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    isFullyReady(): boolean {
        return isProtectionFullyReady(this.sharedState);
    }

    async vaultState(): Promise<VaultState> {
        return vaultState(this.sharedState);
    }

    async refresh(): Promise<PendingRecovery> {
        return refreshWithActiveProtection(this.sharedState, PendingRecovery);
    }

    async waitForFullyReady(pollingParameters?: PollingParameters): Promise<PendingRecovery> {
        return waitForProtectionFullyReady(this.sharedState, this, pollingParameters);
    }
}

export class ClaimedRecovery implements WithProtectionParameters {
    constructor(sharedState: RecoverySharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    async vaultState(): Promise<VaultState> {
        return VaultState.create({
            ...this.sharedState,
            isRecovery: false
        });
    }

    async recoveredVaultState(): Promise<VaultState> {
        return VaultState.create({
            ...this.sharedState,
            isRecovery: true
        });
    }

    async recoveredBalanceState(): Promise<BalanceState> {
        return getBalanceState({
            ...this.sharedState,
            isRecovery: true,
        });
    }
}
