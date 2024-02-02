import {
    TypesRecoveryConfig,
    UUID,
} from "@logion/node-api";
import {
    FetchAllResult,
    LegalOfficerDecision,
    ProtectionRequest,
    ProtectionRequestStatus,
    RecoveryClient,
    LoRecoveryClient,
    UpdateParameters
} from "./RecoveryClient.js";

import { authenticatedCurrentAddress, getDefinedCurrentAddress, getLegalOfficer, SharedState } from "./SharedClient.js";
import { LegalOfficerClass, LegalOfficer, PostalAddress, UserIdentity } from "./Types.js";
import { BalanceState, getBalanceState } from "./Balance.js";
import { VaultState } from "./Vault.js";
import { PollingParameters, waitFor } from "./Polling.js";
import { State } from "./State.js";
import { BlockchainSubmission, BlockchainSubmissionParams } from "./Signer.js";

export type ProtectionState =
    NoProtection
    | PendingProtection
    | AcceptedProtection
    | ActiveProtection
    | PendingRecovery
    | ClaimedRecovery
    | UnavailableProtection
    | RejectedRecovery;

export interface RecoverySharedState extends SharedState {
    pendingProtectionRequests: ProtectionRequest[];
    acceptedProtectionRequests: ProtectionRequest[];
    rejectedProtectionRequests: ProtectionRequest[];
    cancelledProtectionRequests: ProtectionRequest[];
    allRequests: ProtectionRequest[];
    recoveryConfig?: TypesRecoveryConfig;
    recoveredAddress?: string;
    selectedLegalOfficers: LegalOfficerClass[];
}

export interface ProtectionParams {
    legalOfficer1: LegalOfficerClass,
    legalOfficer2: LegalOfficerClass,
    requesterIdentityLoc1: UUID,
    requesterIdentityLoc2: UUID,
}

export interface ProtectionOrRecoveryParams extends ProtectionParams {
    recoveredAddress?: string
}

export interface RecoveryParams extends ProtectionParams {
    recoveredAddress: string
}

function toActionableProtectionRequest(protectionRequest: ProtectionRequest, sharedState: SharedState): ProtectionRequest {
    const legalOfficer = getLegalOfficer(sharedState, protectionRequest.legalOfficerAddress);
    const loRecoveryClient = newLoRecoveryClient(sharedState, legalOfficer);
    if (protectionRequest.status === 'ACTIVATED' || protectionRequest.status.includes("CANCELLED")) {
        return protectionRequest;
    }
    if (protectionRequest.status === 'REJECTED') {
        if (protectionRequest.isRecovery) {
            return new ReSubmittableRequest(protectionRequest, loRecoveryClient);
        } else {
            return new UpdatableReSubmittableRequest(protectionRequest, loRecoveryClient);
        }
    }
    if (!protectionRequest.isRecovery) {
        return new UpdatableRequest(protectionRequest, loRecoveryClient);
    }
    return new CancellableRequest(protectionRequest, loRecoveryClient);
}

export function getInitialState(data: FetchAllResult, pSharedState: SharedState): ProtectionState {
    const { recoveryConfig, recoveredAddress } = data;
    const toActionableRequest = (request: ProtectionRequest) => toActionableProtectionRequest(request, pSharedState)
    const pendingProtectionRequests = data.pendingProtectionRequests.map(toActionableRequest);
    const acceptedProtectionRequests = data.acceptedProtectionRequests.map(toActionableRequest);
    const rejectedProtectionRequests = data.rejectedProtectionRequests.map(toActionableRequest);
    const cancelledProtectionRequests = data.cancelledProtectionRequests.map(toActionableRequest);

    const numberOfRequests = pendingProtectionRequests.length + acceptedProtectionRequests.length + rejectedProtectionRequests.length;
    const allRequests = pendingProtectionRequests.concat(acceptedProtectionRequests).concat(rejectedProtectionRequests);

    const sharedState: RecoverySharedState = {
        ...pSharedState,
        pendingProtectionRequests,
        acceptedProtectionRequests,
        rejectedProtectionRequests,
        cancelledProtectionRequests,
        allRequests,
        recoveryConfig,
        recoveredAddress,
        selectedLegalOfficers: []
    };

    if(recoveryConfig === undefined && recoveredAddress === undefined && numberOfRequests === 0) {
        return new NoProtection({ ...sharedState });
    } else if (recoveryConfig !== undefined && recoveredAddress === undefined && numberOfRequests === 0) {
        return new ActiveProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address)),
        });
    } else if (recoveryConfig !== undefined && recoveredAddress !== undefined) {
        return new ClaimedRecovery({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address)),
        });
    } else if (recoveryConfig !== undefined && recoveredAddress === undefined && data.acceptedProtectionRequests.length > 0 && data.acceptedProtectionRequests[0].isRecovery) {
        const legalOfficer1 = getLegalOfficer(sharedState, data.acceptedProtectionRequests[0].legalOfficerAddress);
        const legalOfficer2 = getLegalOfficer(sharedState, data.acceptedProtectionRequests[1].legalOfficerAddress);
        return new PendingRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAddress === undefined && data.acceptedProtectionRequests.length === 2) {
        const legalOfficer1 = getLegalOfficer(sharedState, data.acceptedProtectionRequests[0].legalOfficerAddress);
        const legalOfficer2 = getLegalOfficer(sharedState, data.acceptedProtectionRequests[1].legalOfficerAddress);
        return new AcceptedProtection({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAddress === undefined && pendingProtectionRequests.length === 2) {
        const legalOfficer1 = getLegalOfficer(sharedState, data.pendingProtectionRequests[0].legalOfficerAddress);
        const legalOfficer2 = getLegalOfficer(sharedState, data.pendingProtectionRequests[1].legalOfficerAddress);
        return new PendingProtection({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAddress === undefined && pendingProtectionRequests.length === 1 && acceptedProtectionRequests.length === 1) {
        const legalOfficer1 = getLegalOfficer(sharedState, pendingProtectionRequests[0].legalOfficerAddress);
        const legalOfficer2 = getLegalOfficer(sharedState, acceptedProtectionRequests[0].legalOfficerAddress);
        return new PendingProtection({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAddress === undefined && rejectedProtectionRequests.length > 0) {
        const legalOfficer1 = getLegalOfficer(sharedState, rejectedProtectionRequests[0].legalOfficerAddress);
        const legalOfficer2 = getLegalOfficer(sharedState, rejectedProtectionRequests[0].otherLegalOfficerAddress);
        return new RejectedRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else {
        let selectedLegalOfficers: LegalOfficerClass[] = [];
        if (recoveryConfig !== undefined) {
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => recoveryConfig.legalOfficers.includes(legalOfficer.address));
        } else if (allRequests.length > 0) {
            const selectedLegalOfficersAddresses = [ allRequests[0].legalOfficerAddress, allRequests[0].otherLegalOfficerAddress ];
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => selectedLegalOfficersAddresses.includes(legalOfficer.address));
        }
        return new UnavailableProtection({
            ...sharedState,
            selectedLegalOfficers,
        });
    }
}

export class NoProtection extends State {

    constructor(sharedState: SharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: SharedState;

    async refresh(): Promise<NoProtection> {
        return this.discardOnSuccess<NoProtection>(current => current._refresh());
    }

    private async _refresh(): Promise<NoProtection> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const data = await recoveryClient.fetchAll(this.sharedState.legalOfficers);
        const state = getInitialState(data, this.sharedState);
        if (state instanceof NoProtection) {
            return state;
        } else {
            throw new Error("Unexpected state " + state.constructor.name);
        }
    }

    async activateProtection(params: BlockchainSubmission<ProtectionParams>): Promise<ActiveProtection> {
        return this.discardOnSuccess<NoProtection, ActiveProtection>(current => current._activateProtection(params));
    }

    private async _activateProtection(params: BlockchainSubmission<ProtectionParams>): Promise<ActiveProtection> {
        const { signer, callback } = params
        const sortedLegalOfficers = [ params.payload.legalOfficer1.address, params.payload.legalOfficer2.address ].sort();
        await signer.signAndSend({
            signerId: getDefinedCurrentAddress(this.sharedState).address,
            submittable: this.sharedState.nodeApi.polkadot.tx.verifiedRecovery.createRecovery(
                sortedLegalOfficers,
            ),
            callback
        });

        const newSharedState: RecoverySharedState = {
            ...this.sharedState,
            selectedLegalOfficers: [
                params.payload.legalOfficer1,
                params.payload.legalOfficer2,
            ],
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [],
            recoveryConfig: {
                legalOfficers: sortedLegalOfficers
            }
        };

        return new ActiveProtection(newSharedState);
    }

    async requestRecovery(params: BlockchainSubmission<RecoveryParams>): Promise<PendingProtection> {
        const { payload } = params;
        const currentAddress = getDefinedCurrentAddress(this.sharedState);
        const activeRecovery = await this.sharedState.nodeApi.queries.getActiveRecovery(
            payload.recoveredAddress,
            currentAddress.address,
        );
        if (activeRecovery === undefined) {
            const recoveryConfig = await this.sharedState.nodeApi.queries.getRecoveryConfig(payload.recoveredAddress);
            if (recoveryConfig &&
                recoveryConfig.legalOfficers.includes(payload.legalOfficer1.address) &&
                recoveryConfig.legalOfficers.includes(payload.legalOfficer2.address)
            ) {
                await params.signer.signAndSend({
                    signerId: currentAddress.address,
                    submittable: this.sharedState.nodeApi.polkadot.tx.recovery.initiateRecovery(payload.recoveredAddress),
                    callback: params.callback,
                });
            } else {
                throw Error("Unable to find a valid Recovery config.");
            }
        }
        return this.requestProtectionOrRecoveryAndDiscard(params.payload);
    }

    private async requestProtectionOrRecoveryAndDiscard(params: ProtectionOrRecoveryParams): Promise<PendingProtection> {
        return this.discardOnSuccess<NoProtection, PendingProtection>(current => current.requestProtectionOrRecovery(params));
    }

    private async requestProtectionOrRecovery(params: ProtectionOrRecoveryParams): Promise<PendingProtection> {
        const loRecoveryClient1 = newLoRecoveryClient(this.sharedState, params.legalOfficer1);
        const protection1 = await loRecoveryClient1.createProtectionRequest({
            requesterIdentityLoc: params.requesterIdentityLoc1.toString(),
            legalOfficerAddress: params.legalOfficer1.address,
            otherLegalOfficerAddress: params.legalOfficer2.address,
            isRecovery: params.recoveredAddress !== undefined,
            addressToRecover: params.recoveredAddress || "",
        });
        const loRecoveryClient2 = newLoRecoveryClient(this.sharedState, params.legalOfficer2);
        const protection2 = await loRecoveryClient2.createProtectionRequest({
            requesterIdentityLoc: params.requesterIdentityLoc2.toString(),
            legalOfficerAddress: params.legalOfficer2.address,
            otherLegalOfficerAddress: params.legalOfficer1.address,
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
            cancelledProtectionRequests: [],
            allRequests: [
                protection1,
                protection2,
            ],
            selectedLegalOfficers: [ params.legalOfficer1, params.legalOfficer2 ],
        });
    }

    get protectionParameters(): ProtectionParameters {
        throw new Error("No protection parameters available");
    }
}

function newRecoveryClient(sharedState: SharedState): RecoveryClient {
    const { currentAddress, token } = authenticatedCurrentAddress(sharedState);
    return new RecoveryClient({
        axiosFactory: sharedState.axiosFactory,
        currentAddress: currentAddress.address,
        networkState: sharedState.networkState,
        token: token.value,
        nodeApi: sharedState.nodeApi,
    });
}

function newLoRecoveryClient(sharedState: SharedState, legalOfficer: LegalOfficer): LoRecoveryClient {
    const { token } = authenticatedCurrentAddress(sharedState);
    return new LoRecoveryClient({
        axiosFactory: sharedState.axiosFactory,
        token: token.value,
        legalOfficer,
    });
}

export interface LegalOfficerProtectionState {

    readonly id: string;

    readonly legalOfficer: LegalOfficerClass;

    readonly identityLoc: UUID;

    readonly status: ProtectionRequestStatus;

    readonly decision: LegalOfficerDecision;
}

export interface ProtectionParameters {

    readonly legalOfficers: LegalOfficerClass[];

    readonly states: LegalOfficerProtectionState[];

    readonly userIdentity?: UserIdentity; // Only defined on recovery

    readonly postalAddress?: PostalAddress; // Only defined on recovery

    readonly recoveredAddress: string | undefined;

    readonly isRecovery: boolean;

    readonly isActive: boolean;

    readonly isClaimed: boolean;
}

export interface WithProtectionParameters {

    get protectionParameters(): ProtectionParameters;
}

function buildProtectionParameters(sharedState: RecoverySharedState): ProtectionParameters {
    const isRecovery = sharedState.recoveredAddress !== undefined || sharedState.allRequests.length > 0 && sharedState.allRequests[0].isRecovery;
    const request1 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[0].address);
    const request2 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[1].address);
    const states: LegalOfficerProtectionState[] = [];
    if(request1 !== undefined) {
        states.push(buildProtectionState(sharedState.selectedLegalOfficers[0], request1));
    }
    if(request2 !== undefined) {
        states.push(buildProtectionState(sharedState.selectedLegalOfficers[1], request2));
    }
    return {
        legalOfficers: sharedState.selectedLegalOfficers,
        states,
        postalAddress: request1?.userPostalAddress,
        userIdentity: request1?.userIdentity,
        recoveredAddress: request1?.addressToRecover || undefined,
        isRecovery,
        isActive: sharedState.recoveryConfig !== undefined,
        isClaimed: sharedState.recoveredAddress !== undefined,
    };
}

function buildProtectionState(legalOfficer: LegalOfficerClass, request: ProtectionRequest): LegalOfficerProtectionState {
    return {
        id: request.id,
        legalOfficer,
        status: request.status,
        decision: request.decision,
        identityLoc: new UUID(request.requesterIdentityLoc),
    };
}

export class UnavailableProtection extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
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

export class PendingProtection extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async refresh(): Promise<PendingProtection | AcceptedProtection | RejectedRecovery> {
        return this.discardOnSuccess<PendingProtection, PendingProtection | AcceptedProtection | RejectedRecovery>(current => current._refresh());
    }

    private async _refresh(): Promise<PendingProtection | AcceptedProtection | RejectedRecovery> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const data = await recoveryClient.fetchAll(this.sharedState.legalOfficers);
        const state = getInitialState(data, this.sharedState);
        if (
            state instanceof PendingProtection ||
            state instanceof AcceptedProtection ||
            state instanceof RejectedRecovery) {
            return state;
        } else {
            throw new Error("Unexpected state " + state.constructor.name);
        }
    }

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }
}

class ProtectionRequestImpl implements ProtectionRequest {

    constructor(protectionRequest: ProtectionRequest, loRecoveryClient: LoRecoveryClient) {
        this.id = protectionRequest.id;
        this.requesterAddress = protectionRequest.requesterAddress;
        this.requesterIdentityLoc = protectionRequest.requesterIdentityLoc;
        this.decision = protectionRequest.decision;
        this.userIdentity = protectionRequest.userIdentity;
        this.userPostalAddress = protectionRequest.userPostalAddress;
        this.createdOn = protectionRequest.createdOn;
        this.isRecovery = protectionRequest.isRecovery;
        this.addressToRecover = protectionRequest.addressToRecover;
        this.status = protectionRequest.status;
        this.legalOfficerAddress = protectionRequest.legalOfficerAddress;
        this.otherLegalOfficerAddress = protectionRequest.otherLegalOfficerAddress;
        this.loRecoveryClient = loRecoveryClient;
    }

    readonly id: string;
    readonly requesterAddress: string;
    readonly requesterIdentityLoc: string;
    readonly decision: LegalOfficerDecision;
    readonly userIdentity: UserIdentity;
    readonly userPostalAddress: PostalAddress;
    readonly createdOn: string;
    readonly isRecovery: boolean;
    readonly addressToRecover: string | null;
    readonly status: ProtectionRequestStatus;
    readonly legalOfficerAddress: string;
    readonly otherLegalOfficerAddress: string;

    protected readonly loRecoveryClient: LoRecoveryClient;
}

export class CancellableRequest extends ProtectionRequestImpl {

    cancel(): Promise<void> {
        return this.loRecoveryClient.cancel({
            id: this.id
        })
    }
}

export class UpdatableRequest extends CancellableRequest {

    update(parameters: UpdateParameters): Promise<void> {
        return this.loRecoveryClient.update({
            id: this.id,
            ...parameters
        })
    }
}

export class ReSubmittableRequest extends CancellableRequest {

    resubmit(): Promise<void> {
        return this.loRecoveryClient.resubmit({
            id: this.id
        })
    }
}

export class UpdatableReSubmittableRequest extends UpdatableRequest {

    resubmit(): Promise<void> {
        return this.loRecoveryClient.resubmit({
            id: this.id
        })
    }
}

export class RejectedRecovery extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    protected readonly sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    async cancel(): Promise<NoProtection> {
        return this.discardOnSuccess<RejectedRecovery, NoProtection>(current => current._cancel());
    }

    private async _cancel(): Promise<NoProtection> {
        return Promise.all(this.sharedState.allRequests.map(request => {
            if (request instanceof CancellableRequest) {
                return request.cancel();
            } else {
                return Promise.reject("Request cannot be cancelled.")
            }
        })).then(() => {
            return new NoProtection(this.sharedState).refresh();
        })
    }

    async resubmit(currentLegalOfficer: LegalOfficer): Promise<PendingProtection> {
        return this.discardOnSuccess<RejectedRecovery, PendingProtection>(current => current._resubmit(currentLegalOfficer));
    }

    private async _resubmit(currentLegalOfficer: LegalOfficer): Promise<PendingProtection> {
        const request = this.sharedState.allRequests.find(request => request.legalOfficerAddress === currentLegalOfficer.address);
        if (request && (request instanceof ReSubmittableRequest || request instanceof UpdatableReSubmittableRequest)) {
            await request.resubmit();
            return await new PendingProtection(this.sharedState).refresh() as PendingProtection;
        }
        throw new Error("Unable to find the request to resubmit")
    }
}

export class AcceptedProtection extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async activate(params: BlockchainSubmissionParams): Promise<PendingRecovery> {
        return this.discardOnSuccess<AcceptedProtection, PendingRecovery>(current => current._activate(params));
    }

    private async _activate(params: BlockchainSubmissionParams): Promise<PendingRecovery> {
        const { signer, callback } = params
        const sortedLegalOfficers = this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address).sort();
        await signer.signAndSend({
            signerId: getDefinedCurrentAddress(this.sharedState).address,
            submittable: this.sharedState.nodeApi.polkadot.tx.verifiedRecovery.createRecovery(
                sortedLegalOfficers,
            ),
            callback
        });
        const newSharedState = {
            ...this.sharedState,
            recoveryConfig: {
                legalOfficers: sortedLegalOfficers
            }
        };

        return new PendingRecovery(newSharedState);
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

export class ActiveProtection extends State implements WithProtectionParameters, WithActiveProtection<ActiveProtection>, WithRefresh<ActiveProtection> {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    isFullyReady(): boolean {
        return true;
    }

    async vaultState(): Promise<VaultState> {
        return vaultState(this.sharedState);
    }

    async refresh(): Promise<ActiveProtection> {
        return this.discardOnSuccess<ActiveProtection>(current => refreshWithActiveProtection(current.sharedState, ActiveProtection));
    }

    async waitForFullyReady(): Promise<ActiveProtection> {
        return this;
    }
}

function isProtectionFullyReady(sharedState: RecoverySharedState): boolean {
    return sharedState.acceptedProtectionRequests.every(request => request.status === "ACTIVATED");
}

async function vaultState(sharedState: RecoverySharedState): Promise<VaultState> {
    return VaultState.create({
        ...sharedState,
        isRecovery: false,
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
    if (isProtectionFullyReady(sharedState)) {
        return state;
    } else {
        return waitFor<S>({
            predicate: newState => newState.isFullyReady(),
            producer: async (previousState) => (previousState ? await previousState.refresh() : await state.refresh()) as S,
            pollingParameters,
        });
    }
}

export class PendingRecovery extends State implements WithProtectionParameters, WithActiveProtection<PendingRecovery>, WithRefresh<PendingRecovery> {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async claimRecovery(params: BlockchainSubmissionParams): Promise<ClaimedRecovery> {
        return this.discardOnSuccess<PendingRecovery, ClaimedRecovery>(current => current._claimRecovery(params));
    }

    private async _claimRecovery(params: BlockchainSubmissionParams): Promise<ClaimedRecovery> {
        const { signer, callback } = params;
        const addressToRecover = this.protectionParameters.recoveredAddress || "";
        await signer.signAndSend({
            signerId: getDefinedCurrentAddress(this.sharedState).address,
            submittable: this.sharedState.nodeApi.polkadot.tx.recovery.claimRecovery(addressToRecover),
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
        return this.discardOnSuccess<PendingRecovery>(current => refreshWithActiveProtection(current.sharedState, PendingRecovery));
    }

    async waitForFullyReady(pollingParameters?: PollingParameters): Promise<PendingRecovery> {
        return waitForProtectionFullyReady(this.sharedState, this, pollingParameters);
    }
}

export class ClaimedRecovery extends State implements WithProtectionParameters {
    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    get protectionParameters(): ProtectionParameters {
        return buildProtectionParameters(this.sharedState);
    }

    isFullyReady(): boolean {
        return isProtectionFullyReady(this.sharedState);
    }

    async vaultState(): Promise<VaultState> {
        return vaultState(this.sharedState);
    }

    async refresh(): Promise<ClaimedRecovery> {
        return this.discardOnSuccess<ClaimedRecovery>(current => refreshWithActiveProtection(current.sharedState, ClaimedRecovery));
    }

    async waitForFullyReady(pollingParameters?: PollingParameters): Promise<ClaimedRecovery> {
        return waitForProtectionFullyReady(this.sharedState, this, pollingParameters);
    }

    async recoveredVaultState(): Promise<VaultState> {
        return VaultState.create({
            ...this.sharedState,
            isRecovery: true,
        });
    }

    async recoveredBalanceState(): Promise<BalanceState> {
        return getBalanceState({
            ...this.sharedState,
            isRecovery: true,
        });
    }
}
