import {
    buildCancelVaultTransferCall,
    buildVaultTransferCall,
    cancelVaultTransfer,
    getVaultAddress,
    requestVaultTransfer,
    PrefixedNumber,
    LGNT_SMALLEST_UNIT,
    asRecovered,
    CoinBalance,
    getBalances,
} from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { authenticatedCurrentAddress, getDefinedCurrentAddress, SharedState } from "./SharedClient";
import { SignCallback, Signer } from "./Signer";
import { LegalOfficer } from "./Types";
import { requestSort, VaultClient, VaultTransferRequest } from "./VaultClient";
import { Transaction, TransactionClient } from "./TransactionClient";
import { State } from "./State";

export interface VaultSharedState extends SharedState {
    client: VaultClient,
    pendingVaultTransferRequests: VaultTransferRequest[],
    cancelledVaultTransferRequests: VaultTransferRequest[],
    rejectedVaultTransferRequests: VaultTransferRequest[],
    acceptedVaultTransferRequests: VaultTransferRequest[],
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAddress?: string,
    balances: CoinBalance[],
    transactions: Transaction[],
}

export type VaultStateCreationParameters = SharedState & {
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAddress?: string,
};

export class VaultState extends State {

    static async create(sharedState: VaultStateCreationParameters): Promise<VaultState> {
        const { currentAddress, token } = authenticatedCurrentAddress(sharedState);
        const client = new VaultClient({
            axiosFactory: sharedState.axiosFactory,
            networkState: sharedState.networkState,
            currentAddress,
            token: token.value,
            isLegalOfficer: sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === currentAddress) !== undefined,
            isRecovery: sharedState.isRecovery,
        });
        const result = await client.fetchAll(sharedState.selectedLegalOfficers);

        const vaultAddress = VaultState.getVaultAddress(sharedState);
        const transactionClient = VaultState.newTransactionClient(vaultAddress, sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await getBalances({ api: sharedState.nodeApi, accountId: vaultAddress });

        return new VaultState({
            ...sharedState,
            ...result,
            transactions,
            balances,
            client,
        });
    }

    private static newTransactionClient(vaultAddress: string, sharedState: VaultStateCreationParameters): TransactionClient {
        return new TransactionClient({
            axiosFactory: sharedState.axiosFactory,
            currentAddress: vaultAddress,
            networkState: sharedState.networkState,
        })
    }

    private static getVaultAddress(sharedState: VaultStateCreationParameters): string {
        if(sharedState.isRecovery) {
            if(!sharedState.recoveredAddress) {
                throw new Error("No recovered address defined");
            }
            return getVaultAddress(
                VaultState.getDefinedRecoveredAddress(sharedState),
                sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address)
            );
        } else {
            const { currentAddress } = authenticatedCurrentAddress(sharedState);
            return getVaultAddress(currentAddress, sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address));
        }
    }

    private static getDefinedRecoveredAddress(sharedState: VaultStateCreationParameters): string {
        if(!sharedState.recoveredAddress) {
            throw new Error("No recovered address defined");
        }
        return sharedState.recoveredAddress;
    }

    constructor(state: VaultSharedState) {
        super();
        this.sharedState = state;
    }

    private sharedState: VaultSharedState;

    get pendingVaultTransferRequests() {
        this.ensureCurrent();
        return this.sharedState.pendingVaultTransferRequests;
    }

    get cancelledVaultTransferRequests() {
        this.ensureCurrent();
        return this.sharedState.cancelledVaultTransferRequests;
    }

    get rejectedVaultTransferRequests() {
        this.ensureCurrent();
        return this.sharedState.rejectedVaultTransferRequests;
    }

    get acceptedVaultTransferRequests() {
        this.ensureCurrent();
        return this.sharedState.acceptedVaultTransferRequests;
    }

    get vaultTransferRequestsHistory() {
        return this.sharedState.acceptedVaultTransferRequests
            .concat(this.sharedState.rejectedVaultTransferRequests)
            .concat(this.sharedState.cancelledVaultTransferRequests)
            .sort(requestSort);
    }

    async createVaultTransferRequest(params: {
        legalOfficer: LegalOfficer,
        amount: PrefixedNumber,
        destination: string,
        signer: Signer,
        callback?: SignCallback,
    }): Promise<VaultState> {
        return this.discardOnSuccess(() => this._createVaultTransferRequest(params));
    }

    private async _createVaultTransferRequest(params: {
        legalOfficer: LegalOfficer,
        amount: PrefixedNumber,
        destination: string,
        signer: Signer,
        callback?: SignCallback,
    }): Promise<VaultState> {
        const { amount, destination, signer, callback, legalOfficer } = params;

        const currentAddress = getDefinedCurrentAddress(this.sharedState);
        const signerId = currentAddress;

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            submittable = await this.recoveryTransferSubmittable({ amount, destination });
        } else {
            submittable = await this.regularTransferSubmittable({ amount, destination });
        }

        const successfulSubmission = await signer.signAndSend({
            signerId,
            submittable,
            callback,
        });

        let origin: string;
        if(this.sharedState.isRecovery) {
            origin = VaultState.getDefinedRecoveredAddress(this.sharedState);
        } else {
            origin = signerId;
        }
        const blockHeader = await this.sharedState.nodeApi.rpc.chain.getHeader(successfulSubmission.block);
        const newPendingRequest = await this.sharedState.client.createVaultTransferRequest(legalOfficer, {
            origin,
            destination,
            block: blockHeader.number.toString(),
            index: successfulSubmission.index,
            amount: amount.convertTo(LGNT_SMALLEST_UNIT).coefficient.unnormalize().toString(),
        });

        const pendingVaultTransferRequests = this.sharedState.pendingVaultTransferRequests.concat([ newPendingRequest ]).sort(requestSort);

        return new VaultState({
            ...this.sharedState,
            pendingVaultTransferRequests,
        });
    }

    private async recoveryTransferSubmittable(params: {
        destination: string,
        amount: PrefixedNumber,
    }): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        const call = await buildVaultTransferCall({
            api: this.sharedState.nodeApi,
            requesterAddress: VaultState.getDefinedRecoveredAddress(this.sharedState),
            destination,
            legalOfficers: this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address),
            amount: amount,
        });
        return asRecovered({
            api: this.sharedState.nodeApi,
            recoveredAccountId: this.sharedState.recoveredAddress || "",
            call
        });
    }

    private regularTransferSubmittable(params: {
        destination: string,
        amount: PrefixedNumber,
    }): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        return requestVaultTransfer({
            signerId: getDefinedCurrentAddress(this.sharedState),
            api: this.sharedState.nodeApi,
            amount,
            destination,
            legalOfficers: this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address),
        });
    }

    async cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        signer: Signer,
        callback?: SignCallback,
    ): Promise<VaultState> {
        return this.discardOnSuccess(() => this._cancelVaultTransferRequest(legalOfficer, request, signer, callback));
    }

    private async _cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        signer: Signer,
        callback?: SignCallback,
    ): Promise<VaultState> {
        const signerId = getDefinedCurrentAddress(this.sharedState);
        const amount = new PrefixedNumber(request.amount, LGNT_SMALLEST_UNIT);

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            const call = buildCancelVaultTransferCall({
                api: this.sharedState.nodeApi,
                block: BigInt(request.block),
                index: request.index,
                legalOfficers: this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address),
                destination: request.destination,
                amount,
            });
            submittable = asRecovered({
                api: this.sharedState.nodeApi,
                recoveredAccountId: request.origin,
                call
            });
        } else {
            submittable = cancelVaultTransfer({
                api: this.sharedState.nodeApi,
                destination: request.destination,
                amount,
                block: BigInt(request.block),
                index: request.index,
                legalOfficers: this.sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.address),
            });
        }

        await signer.signAndSend({
            signerId,
            submittable,
            callback,
        });

        await this.sharedState.client.cancelVaultTransferRequest(legalOfficer, request);

        const cancelledRequest: VaultTransferRequest = {
            ...request,
            status: request.status === "PENDING" ? "CANCELLED" : "REJECTED_CANCELLED",
        };

        let pendingVaultTransferRequests = this.sharedState.pendingVaultTransferRequests;
        if(request.status === "PENDING") {
            pendingVaultTransferRequests = pendingVaultTransferRequests.filter(pendingRequest => request.id !== pendingRequest.id);
        }

        const cancelledVaultTransferRequests = this.sharedState.cancelledVaultTransferRequests.concat([ cancelledRequest ]).sort(requestSort);

        let rejectedVaultTransferRequests = this.sharedState.rejectedVaultTransferRequests;
        if(request.status === "REJECTED") {
            rejectedVaultTransferRequests = rejectedVaultTransferRequests.filter(rejectedRequest => request.id !== rejectedRequest.id);
        }

        return new VaultState({
            ...this.sharedState,
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
        });
    }

    async resubmitVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<VaultState> {
        return this.discardOnSuccess(() => this._resubmitVaultTransferRequest(legalOfficer, request));
    }

    private async _resubmitVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
    ): Promise<VaultState> {
        await this.sharedState.client.resubmitVaultTransferRequest(legalOfficer, request);

        const resubmittedRequest: VaultTransferRequest = {
            ...request,
            status: "PENDING",
        };

        const pendingVaultTransferRequests = this.sharedState.pendingVaultTransferRequests.concat([ resubmittedRequest ]).sort(requestSort);

        let rejectedVaultTransferRequests = this.sharedState.rejectedVaultTransferRequests;
        if(request.status === "REJECTED") {
            rejectedVaultTransferRequests = rejectedVaultTransferRequests.filter(rejectedRequest => request.id !== rejectedRequest.id);
        }

        return new VaultState({
            ...this.sharedState,
            pendingVaultTransferRequests,
            rejectedVaultTransferRequests,
        });
    }

    async refresh(): Promise<VaultState> {
        return this.discardOnSuccess(() => this._refresh());
    }

    private async _refresh(): Promise<VaultState> {
        const result = await this.sharedState.client.fetchAll(this.sharedState.legalOfficers);
        const transactionClient = VaultState.newTransactionClient(this.vaultAddress, this.sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await getBalances({ api: this.sharedState.nodeApi, accountId: this.vaultAddress });
        return new VaultState({
            ...this.sharedState,
            ...result,
            transactions,
            balances,
        });
    }

    get vaultAddress(): string {
        this.ensureCurrent();
        return VaultState.getVaultAddress(this.sharedState);
    }

    get transactions(): Transaction[] {
        this.ensureCurrent();
        return this.sharedState.transactions;
    }

    get balances(): CoinBalance[] {
        this.ensureCurrent();
        return this.sharedState.balances;
    }
}
