import {
    CoinBalance,
    Vault,
    Lgnt,
    ValidAccountId,
} from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { authenticatedCurrentAddress, getDefinedCurrentAddress, SharedState } from "./SharedClient.js";
import { SignCallback, Signer } from "./Signer.js";
import { LegalOfficer } from "./Types.js";
import { requestSort, VaultClient, VaultTransferRequest } from "./VaultClient.js";
import { Transaction, TransactionClient } from "./TransactionClient.js";
import { State } from "./State.js";

export interface VaultSharedState extends SharedState {
    client: VaultClient,
    pendingVaultTransferRequests: VaultTransferRequest[],
    cancelledVaultTransferRequests: VaultTransferRequest[],
    rejectedVaultTransferRequests: VaultTransferRequest[],
    acceptedVaultTransferRequests: VaultTransferRequest[],
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAddress?: ValidAccountId,
    balances: CoinBalance[],
    transactions: Transaction[],
    vault: Vault,
}

export type VaultStateCreationParameters = SharedState & {
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAddress?: ValidAccountId,
};

export class VaultState extends State {

    static async create(sharedState: VaultStateCreationParameters): Promise<VaultState> {
        const { currentAddress, token } = authenticatedCurrentAddress(sharedState);
        const client = new VaultClient({
            axiosFactory: sharedState.axiosFactory,
            networkState: sharedState.networkState,
            currentAddress: currentAddress.address,
            token: token.value,
            isLegalOfficer: sharedState.legalOfficers.find(legalOfficer => legalOfficer.account.equals(currentAddress)) !== undefined,
            isRecovery: sharedState.isRecovery,
        });
        const result = await client.fetchAll(sharedState.selectedLegalOfficers);

        const vault = VaultState.getVault(sharedState);
        const vaultAddress = vault.account;
        const transactionClient = VaultState.newTransactionClient(vaultAddress, sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await sharedState.nodeApi.queries.getCoinBalances(vaultAddress);

        return new VaultState({
            ...sharedState,
            ...result,
            transactions,
            balances,
            client,
            vault,
        });
    }

    private static newTransactionClient(vaultAddress: ValidAccountId, sharedState: VaultStateCreationParameters): TransactionClient {
        return new TransactionClient({
            axiosFactory: sharedState.axiosFactory,
            currentAccount: vaultAddress,
            networkState: sharedState.networkState,
        })
    }

    private static getVault(sharedState: VaultStateCreationParameters): Vault {
        if(sharedState.isRecovery) {
            if(!sharedState.recoveredAddress) {
                throw new Error("No recovered address defined");
            }
            return new Vault(
                sharedState.nodeApi.polkadot,
                VaultState.getDefinedRecoveredAddress(sharedState),
                sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.account),
            );
        } else {
            const { currentAddress } = authenticatedCurrentAddress(sharedState);
            return new Vault(
                sharedState.nodeApi.polkadot,
                currentAddress,
                sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.account),
            );
        }
    }

    private static getDefinedRecoveredAddress(sharedState: VaultStateCreationParameters): ValidAccountId {
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
        return this.sharedState.pendingVaultTransferRequests;
    }

    get cancelledVaultTransferRequests() {
        return this.sharedState.cancelledVaultTransferRequests;
    }

    get rejectedVaultTransferRequests() {
        return this.sharedState.rejectedVaultTransferRequests;
    }

    get acceptedVaultTransferRequests() {
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
        amount: Lgnt,
        destination: ValidAccountId,
        signer: Signer,
        callback?: SignCallback,
    }): Promise<VaultState> {
        return this.discardOnSuccess<VaultState>(current => current._createVaultTransferRequest(params));
    }

    private async _createVaultTransferRequest(params: {
        legalOfficer: LegalOfficer,
        amount: Lgnt,
        destination: ValidAccountId,
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

        let origin: ValidAccountId;
        if(this.sharedState.isRecovery) {
            origin = VaultState.getDefinedRecoveredAddress(this.sharedState);
        } else {
            origin = signerId;
        }
        const blockHeader = await this.sharedState.nodeApi.polkadot.rpc.chain.getHeader(successfulSubmission.block);
        const newPendingRequest = await this.sharedState.client.createVaultTransferRequest(legalOfficer, {
            origin: origin.address,
            destination: destination.address,
            legalOfficerAddress: legalOfficer.account.address,
            block: blockHeader.number.toString(),
            index: successfulSubmission.index,
            amount: amount.canonical.toString(),
        });

        const pendingVaultTransferRequests = this.sharedState.pendingVaultTransferRequests.concat([ newPendingRequest ]).sort(requestSort);

        return new VaultState({
            ...this.sharedState,
            pendingVaultTransferRequests,
        });
    }

    private async recoveryTransferSubmittable(params: {
        destination: ValidAccountId,
        amount: Lgnt,
    }): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        const transfer = await this.sharedState.vault.tx.transferFromVault({
            amount,
            destination,
        });
        return this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
            this.sharedState.recoveredAddress?.address || "",
            transfer
        );
    }

    private regularTransferSubmittable(params: {
        destination: ValidAccountId,
        amount: Lgnt,
    }): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        return this.sharedState.vault.tx.transferFromVault({
            amount,
            destination,
        });
    }

    async cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        signer: Signer,
        callback?: SignCallback,
    ): Promise<VaultState> {
        return this.discardOnSuccess<VaultState>(current => current._cancelVaultTransferRequest(legalOfficer, request, signer, callback));
    }

    private async _cancelVaultTransferRequest(
        legalOfficer: LegalOfficer,
        request: VaultTransferRequest,
        signer: Signer,
        callback?: SignCallback,
    ): Promise<VaultState> {
        const signerId = getDefinedCurrentAddress(this.sharedState);
        const amount = Lgnt.fromCanonical(BigInt(request.amount));

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            const call = this.sharedState.vault.tx.cancelVaultTransfer({
                destination: ValidAccountId.polkadot(request.destination),
                amount,
                block: BigInt(request.block),
                index: request.index,
            });
            submittable = this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                request.origin,
                call
            );
        } else {
            submittable = this.sharedState.vault.tx.cancelVaultTransfer({
                destination: ValidAccountId.polkadot(request.destination),
                amount,
                block: BigInt(request.block),
                index: request.index,
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
        return this.discardOnSuccess<VaultState>(current => current._resubmitVaultTransferRequest(legalOfficer, request));
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
        return this.discardOnSuccess<VaultState>(current => current._refresh());
    }

    private async _refresh(): Promise<VaultState> {
        const result = await this.sharedState.client.fetchAll(this.sharedState.legalOfficers);
        const transactionClient = VaultState.newTransactionClient(this.vaultAddress, this.sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await this.sharedState.nodeApi.queries.getCoinBalances(this.vaultAddress);
        return new VaultState({
            ...this.sharedState,
            ...result,
            transactions,
            balances,
        });
    }

    get vaultAddress(): ValidAccountId {
        return this.sharedState.vault.account;
    }

    get transactions(): Transaction[] {
        return this.sharedState.transactions;
    }

    get balances(): CoinBalance[] {
        return this.sharedState.balances;
    }
}
