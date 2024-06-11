import {
    TypesRecoveryConfig,
    UUID,
    ValidAccountId,
    Fees as FeesClass,
} from "@logion/node-api";
import {
    FetchAllResult,
    LegalOfficerDecision,
    AccountRecoveryRequest,
    ProtectionRequestStatus,
    AccountRecoveryClient,
    LoRecoveryClient,
} from "./AccountRecoveryClient.js";

import { authenticatedCurrentAccount, getDefinedCurrentAccount, getLegalOfficer, SharedState } from "./SharedClient.js";
import { LegalOfficerClass, LegalOfficer, PostalAddress, UserIdentity } from "./Types.js";
import { BalanceState, getBalanceState } from "./Balance.js";
import { VaultState } from "./Vault.js";
import { PollingParameters, waitFor } from "./Polling.js";
import { State } from "./State.js";
import { BlockchainSubmission, BasicBlockchainSubmission } from "./Signer.js";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { requireDefined } from "./assertions.js";

export type ProtectionState =
    NoProtection
    | PendingRecovery
    | ActiveProtection
    | AcceptedRecovery
    | ActiveRecovery
    | ClaimedRecovery
    | UnavailableProtection
    | RejectedRecovery;

export interface RecoverySharedState extends SharedState {
    pendingProtectionRequests: ActionableRequest[];
    acceptedProtectionRequests: ActionableRequest[];
    rejectedProtectionRequests: ActionableRequest[];
    cancelledProtectionRequests: ActionableRequest[];
    allRequests: ActionableRequest[];
    recoveryConfig?: TypesRecoveryConfig;
    recoveredAccount?: ValidAccountId;
    selectedLegalOfficers: LegalOfficerClass[];
}

export interface ProtectionParams {
    legalOfficer1: LegalOfficerClass,
    legalOfficer2: LegalOfficerClass,
    requesterIdentityLoc1: UUID,
    requesterIdentityLoc2: UUID,
}

export interface RecoveryParams extends ProtectionParams {
    recoveredAccount: ValidAccountId;
}

interface ActionableRequest extends AccountRecoveryRequest {
    loRecoveryClient?: LoRecoveryClient;
}

function toActionableProtectionRequest(protectionRequest: AccountRecoveryRequest, sharedState: SharedState): ActionableRequest {
    const legalOfficer = getLegalOfficer(sharedState, ValidAccountId.polkadot(protectionRequest.legalOfficerAddress));
    const loRecoveryClient = newLoRecoveryClient(sharedState, legalOfficer);
    if (protectionRequest.status === 'ACTIVATED' || protectionRequest.status.includes("CANCELLED")) {
        return protectionRequest;
    } else {
        return {
            ...protectionRequest,
            loRecoveryClient,
        };
    }
}

export function getInitialState(data: FetchAllResult, pSharedState: SharedState): ProtectionState {
    const { recoveryConfig, recoveredAccount } = data;
    const toActionableRequest = (request: AccountRecoveryRequest) => toActionableProtectionRequest(request, pSharedState);
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
        recoveredAccount,
        selectedLegalOfficers: []
    };

    if(recoveryConfig === undefined && recoveredAccount === undefined && numberOfRequests === 0) {
        return new NoProtection({ ...sharedState });
    } else if (recoveryConfig !== undefined && recoveredAccount === undefined && numberOfRequests === 0) {
        const recoveryConfigLegalOfficers = recoveryConfig.legalOfficers.map(legalOfficer => legalOfficer.address);
        return new ActiveProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfigLegalOfficers.includes(legalOfficer.account.address)),
        });
    } else if (recoveryConfig !== undefined && recoveredAccount !== undefined) {
        const recoveryConfigLegalOfficers = recoveryConfig.legalOfficers.map(legalOfficer => legalOfficer.address);
        return new ClaimedRecovery({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficers.filter(legalOfficer => recoveryConfigLegalOfficers.includes(legalOfficer.account.address)),
        });
    } else if (recoveryConfig !== undefined && recoveredAccount === undefined && data.acceptedProtectionRequests.length > 0) {
        const legalOfficer1 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.acceptedProtectionRequests[0].legalOfficerAddress));
        const legalOfficer2 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.acceptedProtectionRequests[1].legalOfficerAddress));
        return new ActiveRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAccount === undefined && data.acceptedProtectionRequests.length === 2) {
        const legalOfficer1 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.acceptedProtectionRequests[0].legalOfficerAddress));
        const legalOfficer2 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.acceptedProtectionRequests[1].legalOfficerAddress));
        return new AcceptedRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAccount === undefined && pendingProtectionRequests.length === 2) {
        const legalOfficer1 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.pendingProtectionRequests[0].legalOfficerAddress));
        const legalOfficer2 = getLegalOfficer(sharedState, ValidAccountId.polkadot(data.pendingProtectionRequests[1].legalOfficerAddress));
        return new PendingRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAccount === undefined && pendingProtectionRequests.length === 1 && acceptedProtectionRequests.length === 1) {
        const legalOfficer1 = getLegalOfficer(sharedState, ValidAccountId.polkadot(pendingProtectionRequests[0].legalOfficerAddress));
        const legalOfficer2 = getLegalOfficer(sharedState, ValidAccountId.polkadot(acceptedProtectionRequests[0].legalOfficerAddress));
        return new PendingRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else if (recoveryConfig === undefined && recoveredAccount === undefined && rejectedProtectionRequests.length > 0) {
        const legalOfficer1 = getLegalOfficer(sharedState, ValidAccountId.polkadot(rejectedProtectionRequests[0].legalOfficerAddress));
        const legalOfficer2 = getLegalOfficer(sharedState, ValidAccountId.polkadot(rejectedProtectionRequests[0].otherLegalOfficerAddress));
        return new RejectedRecovery({
            ...sharedState,
            selectedLegalOfficers: [ legalOfficer1, legalOfficer2 ],
        });
    } else {
        let selectedLegalOfficers: LegalOfficerClass[] = [];
        if (recoveryConfig !== undefined) {
            const recoveryConfigLegalOfficers = recoveryConfig.legalOfficers.map(legalOfficer => legalOfficer.address);
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => recoveryConfigLegalOfficers.includes(legalOfficer.account.address));
        } else if (allRequests.length > 0) {
            const selectedLegalOfficersAddresses = [ allRequests[0].legalOfficerAddress, allRequests[0].otherLegalOfficerAddress ];
            selectedLegalOfficers = sharedState.legalOfficers.filter(legalOfficer => selectedLegalOfficersAddresses.includes(legalOfficer.account.address));
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
        const { signer, callback, payload } = params
        const { submittable, sortedLegalOfficers }  = this.activateProtectionSubmittable(payload);
        await signer.signAndSend({
            signerId: getDefinedCurrentAccount(this.sharedState),
            submittable,
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
                legalOfficers: sortedLegalOfficers.map(address => ValidAccountId.polkadot(address)),
            }
        };
        return new ActiveProtection(newSharedState);
    }

    async estimateFeesActivateProtection(params: ProtectionParams): Promise<FeesClass> {
        const { submittable } = this.activateProtectionSubmittable(params);
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private activateProtectionSubmittable(params: ProtectionParams): { submittable: SubmittableExtrinsic, sortedLegalOfficers: string[] } {
        const { legalOfficer1, legalOfficer2 } = params
        const sortedLegalOfficers = [ legalOfficer1.account.address, legalOfficer2.account.address ].sort();
        const submittable = this.sharedState.nodeApi.polkadot.tx.verifiedRecovery.createRecovery(
            sortedLegalOfficers,
        );
        return { submittable, sortedLegalOfficers }
    }

    async requestRecovery(params: BlockchainSubmission<RecoveryParams>): Promise<PendingRecovery> {
        const { payload } = params;
        const currentAccount = getDefinedCurrentAccount(this.sharedState);
        const activeRecovery = await this.sharedState.nodeApi.queries.getActiveRecovery(
            payload.recoveredAccount,
            currentAccount,
        );
        if (activeRecovery === undefined) {
            const recoveryConfig = await this.sharedState.nodeApi.queries.getRecoveryConfig(payload.recoveredAccount);
            const legalOfficersAddresses = recoveryConfig ? recoveryConfig.legalOfficers.map(accountId => accountId.address) : [];
            if (legalOfficersAddresses.includes(payload.legalOfficer1.account.address) &&
                legalOfficersAddresses.includes(payload.legalOfficer2.account.address)
            ) {
                await params.signer.signAndSend({
                    signerId: currentAccount,
                    submittable: this.requestRecoverySubmittable(params.payload),
                    callback: params.callback,
                });
            } else {
                throw Error("Unable to find a valid Recovery config.");
            }
        }
        return this.discardOnSuccess<NoProtection, PendingRecovery>(current => current.doRequestRecovery(params.payload));
    }

    private async doRequestRecovery(params: RecoveryParams): Promise<PendingRecovery> {
        const loRecoveryClient1 = newLoRecoveryClient(this.sharedState, params.legalOfficer1);
        const protection1 = await loRecoveryClient1.createRecoveryRequest({
            requesterIdentityLoc: params.requesterIdentityLoc1.toString(),
            legalOfficerAddress: params.legalOfficer1.account.address,
            otherLegalOfficerAddress: params.legalOfficer2.account.address,
            addressToRecover: params.recoveredAccount.address,
        });
        const loRecoveryClient2 = newLoRecoveryClient(this.sharedState, params.legalOfficer2);
        const protection2 = await loRecoveryClient2.createRecoveryRequest({
            requesterIdentityLoc: params.requesterIdentityLoc2.toString(),
            legalOfficerAddress: params.legalOfficer2.account.address,
            otherLegalOfficerAddress: params.legalOfficer1.account.address,
            addressToRecover: params.recoveredAccount.address,
        });

        return new PendingRecovery({
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

    async estimateFeesRequestRecovery(params: RecoveryParams): Promise<FeesClass> {
        const submittable = this.requestRecoverySubmittable(params);
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private requestRecoverySubmittable(params: RecoveryParams): SubmittableExtrinsic {
        const { recoveredAccount } = params;
        return this.sharedState.nodeApi.polkadot.tx.recovery.initiateRecovery(recoveredAccount.address);
    }

    get protectionParameters(): ProtectionParameters {
        throw new Error("No protection parameters available");
    }
}

function newRecoveryClient(sharedState: SharedState): AccountRecoveryClient {
    const { currentAccount, token } = authenticatedCurrentAccount(sharedState);
    return new AccountRecoveryClient({
        currentAccount,
        axiosFactory: sharedState.axiosFactory,
        networkState: sharedState.networkState,
        token: token.value,
        nodeApi: sharedState.nodeApi,
    });
}

function newLoRecoveryClient(sharedState: SharedState, legalOfficer: LegalOfficer): LoRecoveryClient {
    const { token } = authenticatedCurrentAccount(sharedState);
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

    readonly recoveredAccount: ValidAccountId | undefined;

    readonly isRecovery: boolean;

    readonly isActive: boolean;

    readonly isClaimed: boolean;
}

export interface WithProtectionParameters {

    get protectionParameters(): ProtectionParameters;
}

function buildProtectionParameters(sharedState: RecoverySharedState): ProtectionParameters {
    const isRecovery = sharedState.recoveredAccount !== undefined || sharedState.allRequests.length > 0;
    const request1 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[0].account.address);
    const request2 = sharedState.allRequests.find(request => request.legalOfficerAddress === sharedState.selectedLegalOfficers[1].account.address);
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
        recoveredAccount: request1?.addressToRecover ? ValidAccountId.polkadot(request1?.addressToRecover) : undefined,
        isRecovery,
        isActive: sharedState.recoveryConfig !== undefined,
        isClaimed: sharedState.recoveredAccount !== undefined,
    };
}

function buildProtectionState(legalOfficer: LegalOfficerClass, request: AccountRecoveryRequest): LegalOfficerProtectionState {
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
        return this.sharedState.recoveredAccount !== undefined
            || (this.sharedState.allRequests.length > 0);
    }

    get isActivated(): boolean {
        return this.sharedState.recoveryConfig !== undefined;
    }
}

export class PendingRecovery extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async refresh(): Promise<PendingRecovery | AcceptedRecovery | RejectedRecovery> {
        return this.discardOnSuccess<PendingRecovery, PendingRecovery | AcceptedRecovery | RejectedRecovery>(current => current._refresh());
    }

    private async _refresh(): Promise<PendingRecovery | AcceptedRecovery | RejectedRecovery> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const data = await recoveryClient.fetchAll(this.sharedState.legalOfficers);
        const state = getInitialState(data, this.sharedState);
        if (
            state instanceof PendingRecovery ||
            state instanceof AcceptedRecovery ||
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
            if(request.loRecoveryClient !== undefined) {
                return request.loRecoveryClient.cancel({
                    id: request.id
                });
            } else {
                throw new Error("No client in request to cancel");
            }
        })).then(() => {
            return new NoProtection(this.sharedState).refresh();
        })
    }
}

export class AcceptedRecovery extends State implements WithProtectionParameters {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async activate(params: BasicBlockchainSubmission): Promise<ActiveRecovery> {
        return this.discardOnSuccess<AcceptedRecovery, ActiveRecovery>(current => current._activate(params));
    }

    private async _activate(params: BasicBlockchainSubmission): Promise<ActiveRecovery> {
        const { signer, callback } = params
        const { submittable, sortedLegalOfficers } = this.activateSubmittable();
        await signer.signAndSend({
            signerId: getDefinedCurrentAccount(this.sharedState),
            submittable,
            callback
        });
        const newSharedState = {
            ...this.sharedState,
            recoveryConfig: {
                legalOfficers: sortedLegalOfficers.map(address => ValidAccountId.polkadot(address)),
            }
        };

        return new ActiveRecovery(newSharedState);
    }

    async estimateFeesActivate(): Promise<FeesClass> {
        const { submittable } = this.activateSubmittable();
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private activateSubmittable(): { submittable: SubmittableExtrinsic, sortedLegalOfficers: string[] }  {
        const sortedLegalOfficers = this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.account.address).sort();
        const submittable = this.sharedState.nodeApi.polkadot.tx.verifiedRecovery.createRecovery(
            sortedLegalOfficers,
        );
        return { submittable, sortedLegalOfficers }
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

export class ActiveRecovery extends State implements WithProtectionParameters, WithActiveProtection<ActiveRecovery>, WithRefresh<ActiveRecovery> {

    constructor(sharedState: RecoverySharedState) {
        super();
        this.sharedState = sharedState;
    }

    private readonly sharedState: RecoverySharedState;

    async claimRecovery(params: BasicBlockchainSubmission): Promise<ClaimedRecovery> {
        return this.discardOnSuccess<ActiveRecovery, ClaimedRecovery>(current => current._claimRecovery(params));
    }

    private async _claimRecovery(params: BasicBlockchainSubmission): Promise<ClaimedRecovery> {
        const { signer, callback } = params;
        const addressToRecover = this.protectionParameters.recoveredAccount;
        await signer.signAndSend({
            signerId: getDefinedCurrentAccount(this.sharedState),
            submittable: this.claimRecoverySubmittable(),
            callback
        });
        return new ClaimedRecovery({
            ...this.sharedState,
            recoveredAccount: addressToRecover
        });
    }

    async estimateFeesClaimRecovery(): Promise<FeesClass> {
        const submittable = this.claimRecoverySubmittable();
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private claimRecoverySubmittable(): SubmittableExtrinsic {
        const addressToRecover = this.protectionParameters.recoveredAccount;
        return this.sharedState.nodeApi.polkadot.tx.recovery.claimRecovery(addressToRecover?.address || "");
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

    async refresh(): Promise<ActiveRecovery> {
        return this.discardOnSuccess<ActiveRecovery>(current => refreshWithActiveProtection(current.sharedState, ActiveRecovery));
    }

    async waitForFullyReady(pollingParameters?: PollingParameters): Promise<ActiveRecovery> {
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
