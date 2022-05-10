import { claimRecovery, createRecovery, getActiveRecovery, initiateRecovery } from "@logion/node-api/dist/Recovery";
import { FetchAllResult, ProtectionRequest, RecoveryClient } from "./RecoveryClient";

import { AuthenticatedSharedState } from "./SharedClient";
import { Signer } from "./Signer";
import { LegalOfficer, PostalAddress, UserIdentity } from "./Types";

export type ProtectionState = NoProtection | PendingProtection | AcceptedProtection | ActiveProtection | PendingRecovery | ClaimedRecovery;

export interface RecoverySharedState extends AuthenticatedSharedState {
    pendingProtectionRequests: ProtectionRequest[];
    acceptedProtectionRequests: ProtectionRequest[];
    rejectedProtectionRequests: ProtectionRequest[];
    recoveredAddress?: string;
}

export interface SharedStateWithLegalOfficers extends RecoverySharedState {
    legalOfficer1: LegalOfficer;
    legalOfficer2: LegalOfficer;
}

export function getInitialState(data: FetchAllResult, sharedState: AuthenticatedSharedState): ProtectionState {
    const {
        pendingProtectionRequests,
        acceptedProtectionRequests,
        rejectedProtectionRequests,
        recoveryConfig,
        recoveredAddress
    } = data;

    if(recoveryConfig !== undefined && recoveredAddress === undefined) {
        return new ActiveProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1: sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === recoveryConfig.legalOfficers[0])!,
            legalOfficer2: sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === recoveryConfig.legalOfficers[1])!,
        });
    } else if(recoveryConfig !== undefined && recoveredAddress !== undefined) {
        return new ClaimedRecovery({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1: sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === recoveryConfig.legalOfficers[0])!,
            legalOfficer2: sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === recoveryConfig.legalOfficers[1])!,
        });
    } else if(data.acceptedProtectionRequests.length === 2 && !data.acceptedProtectionRequests[0].isRecovery) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[1].legalOfficerAddress)!;
        return new AcceptedProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1,
            legalOfficer2,
        });
    } else if(data.acceptedProtectionRequests.length === 2 && data.acceptedProtectionRequests[0].isRecovery) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.acceptedProtectionRequests[1].legalOfficerAddress)!;
        return new PendingRecovery({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1,
            legalOfficer2,
        });
    } else if(pendingProtectionRequests.length === 2) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.pendingProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === data.pendingProtectionRequests[1].legalOfficerAddress)!;
        return new PendingProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1,
            legalOfficer2,
        });
    } else if(pendingProtectionRequests.length === 1 && acceptedProtectionRequests.length === 1) {
        const legalOfficer1 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === pendingProtectionRequests[0].legalOfficerAddress)!;
        const legalOfficer2 = sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === acceptedProtectionRequests[0].legalOfficerAddress)!;
        return new PendingProtection({
            ...sharedState,
            pendingProtectionRequests,
            acceptedProtectionRequests,
            rejectedProtectionRequests,
            recoveredAddress,
            legalOfficer1,
            legalOfficer2,
        });
    } else {
        return new NoProtection({ ...sharedState });
    }
}

export class NoProtection {

    constructor(sharedState: AuthenticatedSharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: AuthenticatedSharedState;

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
            requesterAddress: this.sharedState.currentAddress,
            otherLegalOfficerAddress: params.legalOfficer2.address,
            userIdentity: params.userIdentity,
            userPostalAddress: params.postalAddress,
            isRecovery: params.recoveredAddress !== undefined,
            addressToRecover: params.recoveredAddress || "",
        });
        const protection2 = await recoveryClient.createProtectionRequest(params.legalOfficer2, {
            requesterAddress: this.sharedState.currentAddress,
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
            recoveredAddress: params.recoveredAddress,
            legalOfficer1: params.legalOfficer1,
            legalOfficer2: params.legalOfficer2,
        });
    }

    async requestRecovery(params: {
        legalOfficer1: LegalOfficer,
        legalOfficer2: LegalOfficer,
        userIdentity: UserIdentity,
        postalAddress: PostalAddress,
        recoveredAddress: string,
        signer: Signer,
    }): Promise<PendingProtection> {
        const activeRecovery = await getActiveRecovery({
            api: this.sharedState.nodeApi,
            sourceAccount: params.recoveredAddress,
            destinationAccount: this.sharedState.currentAddress,
        });
        if(activeRecovery === undefined) {
            await params.signer.signAndSend({
                signerId: this.sharedState.currentAddress,
                submittable: initiateRecovery({
                    api: this.sharedState.nodeApi,
                    addressToRecover: params.recoveredAddress,
                })
            });
        }
        return this.requestProtectionOrRecovery({ ...params });
    }
}

function newRecoveryClient(sharedState: AuthenticatedSharedState): RecoveryClient {
    return new RecoveryClient({
        axiosFactory: sharedState.axiosFactory,
        currentAddress: sharedState.currentAddress,
        networkState: sharedState.networkState,
        token: sharedState.token.value,
        nodeApi: sharedState.nodeApi,
    });
}

export interface WithLegalOfficers {

    get legalOfficer1(): LegalOfficer;

    get legalOfficer2(): LegalOfficer;
}

export class PendingProtection implements WithLegalOfficers {

    constructor(sharedState: SharedStateWithLegalOfficers) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedStateWithLegalOfficers;

    async refresh(): Promise<PendingProtection | AcceptedProtection> {
        const recoveryClient = newRecoveryClient(this.sharedState);
        const data = await recoveryClient.fetchAll([ this.legalOfficer1, this.legalOfficer2 ]);
        const state = getInitialState(data, this.sharedState);
        if(state instanceof PendingProtection || state instanceof AcceptedProtection) {
            return state;
        } else {
            throw new Error("Unexpected state " + state.constructor.name);
        }
    }

    get recoveredAddress(): string | undefined {
        return this.sharedState.recoveredAddress;
    }

    get legalOfficer1(): LegalOfficer {
        return this.sharedState.legalOfficer1;
    }

    get legalOfficer2(): LegalOfficer {
        return this.sharedState.legalOfficer2;
    }
}

export class AcceptedProtection implements WithLegalOfficers {

    constructor(sharedState: SharedStateWithLegalOfficers) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedStateWithLegalOfficers;

    async activate(signer: Signer): Promise<ActiveProtection | PendingRecovery> {
        await signer.signAndSend({
            signerId: this.sharedState.currentAddress,
            submittable: createRecovery({
                api: this.sharedState.nodeApi,
                legalOfficers: [ this.sharedState.legalOfficer1.address, this.sharedState.legalOfficer2.address ],
            })
        });
        if(this.sharedState.recoveredAddress === undefined) {
            return new ActiveProtection(this.sharedState);
        } else {
            return new PendingRecovery(this.sharedState);
        }
    }

    get recoveredAddress(): string | undefined {
        return this.sharedState.recoveredAddress;
    }

    get legalOfficer1(): LegalOfficer {
        return this.sharedState.legalOfficer1;
    }

    get legalOfficer2(): LegalOfficer {
        return this.sharedState.legalOfficer2;
    }
}

export class ActiveProtection implements WithLegalOfficers {

    constructor(sharedState: SharedStateWithLegalOfficers) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedStateWithLegalOfficers;

    get legalOfficer1(): LegalOfficer {
        return this.sharedState.legalOfficer1;
    }

    get legalOfficer2(): LegalOfficer {
        return this.sharedState.legalOfficer2;
    }
}

export class PendingRecovery implements WithLegalOfficers {

    constructor(sharedState: SharedStateWithLegalOfficers) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedStateWithLegalOfficers;

    async claimRecovery(signer: Signer): Promise<ClaimedRecovery> {
        if(this.sharedState.recoveredAddress === undefined) {
            throw new Error("No recovery was request");
        }
        signer.signAndSend({
            signerId: this.sharedState.currentAddress,
            submittable: claimRecovery({
                api: this.sharedState.nodeApi,
                addressToRecover: this.sharedState.recoveredAddress!,
            })
        });
        return new ClaimedRecovery({ ...this.sharedState });
    }

    get recoveredAddress(): string {
        return this.sharedState.recoveredAddress!;
    }

    get legalOfficer1(): LegalOfficer {
        return this.sharedState.legalOfficer1;
    }

    get legalOfficer2(): LegalOfficer {
        return this.sharedState.legalOfficer2;
    }
}

export class ClaimedRecovery implements WithLegalOfficers {
    constructor(sharedState: SharedStateWithLegalOfficers) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedStateWithLegalOfficers;

    get recoveredAddress(): string {
        return this.sharedState.recoveredAddress!;
    }

    get legalOfficer1(): LegalOfficer {
        return this.sharedState.legalOfficer1;
    }

    get legalOfficer2(): LegalOfficer {
        return this.sharedState.legalOfficer2;
    }
}
