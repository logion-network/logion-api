import { CoinBalance, Vault, Lgnt, ValidAccountId, Fees as FeesClass } from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { authenticatedCurrentAccount, getDefinedCurrentAccount, SharedState } from "./SharedClient.js";
import { BlockchainSubmission } from "./Signer.js";
import { LegalOfficer } from "./Types.js";
import { requestSort, VaultClient, VaultTransferRequest } from "./VaultClient.js";
import { TransactionClient } from "./TransactionClient.js";
import { State } from "./State.js";
import { toTransaction, Transaction } from "./Balance.js";
import { requireDefined } from "./assertions.js";

export interface VaultSharedState extends SharedState {
    client: VaultClient,
    pendingVaultTransferRequests: VaultTransferRequest[],
    cancelledVaultTransferRequests: VaultTransferRequest[],
    rejectedVaultTransferRequests: VaultTransferRequest[],
    acceptedVaultTransferRequests: VaultTransferRequest[],
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAccount?: ValidAccountId,
    balances: CoinBalance[],
    transactions: Transaction[],
    vault: Vault,
}

export type VaultStateCreationParameters = SharedState & {
    selectedLegalOfficers: LegalOfficer[],
    isRecovery: boolean,
    recoveredAccount?: ValidAccountId,
};

export interface RequestVaultTransferParams {
    legalOfficer: LegalOfficer,
    amount: Lgnt,
    destination: ValidAccountId,
}

export interface UpdateVaultTransferParams {
    legalOfficer: LegalOfficer,
    request: VaultTransferRequest,
}

export class VaultState extends State {

    static async create(sharedState: VaultStateCreationParameters): Promise<VaultState> {
        const { currentAccount, token } = authenticatedCurrentAccount(sharedState);
        const client = new VaultClient({
            axiosFactory: sharedState.axiosFactory,
            networkState: sharedState.networkState,
            currentAddress: currentAccount.address,
            token: token.value,
            isLegalOfficer: sharedState.legalOfficers.find(legalOfficer => legalOfficer.account.equals(currentAccount)) !== undefined,
            isRecovery: sharedState.isRecovery,
        });
        const result = await client.fetchAll(sharedState.selectedLegalOfficers);

        const vault = VaultState.getVault(sharedState);
        const vaultAccount = vault.account;
        const transactionClient = VaultState.newTransactionClient(vaultAccount, sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await sharedState.nodeApi.queries.getCoinBalances(vaultAccount);

        return new VaultState({
            ...sharedState,
            ...result,
            transactions: transactions.map(transaction => toTransaction(transaction, vaultAccount)),
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
            if(!sharedState.recoveredAccount) {
                throw new Error("No recovered address defined");
            }
            return new Vault(
                sharedState.nodeApi.polkadot,
                VaultState.getDefinedRecoveredAddress(sharedState),
                sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.account),
            );
        } else {
            const { currentAccount } = authenticatedCurrentAccount(sharedState);
            return new Vault(
                sharedState.nodeApi.polkadot,
                currentAccount,
                sharedState.selectedLegalOfficers.map(legalOfficer => legalOfficer.account),
            );
        }
    }

    private static getDefinedRecoveredAddress(sharedState: VaultStateCreationParameters): ValidAccountId {
        if(!sharedState.recoveredAccount) {
            throw new Error("No recovered address defined");
        }
        return sharedState.recoveredAccount;
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

    async createVaultTransferRequest(params: BlockchainSubmission<RequestVaultTransferParams>): Promise<VaultState> {
        return this.discardOnSuccess<VaultState>(current => current._createVaultTransferRequest(params));
    }

    private async _createVaultTransferRequest(params: BlockchainSubmission<RequestVaultTransferParams>): Promise<VaultState> {
        const { signer, callback, payload } = params;
        const { amount, destination, legalOfficer } = payload;

        const signerId = getDefinedCurrentAccount(this.sharedState);

        const submittable = await this.createVaultTransferRequestSubmittable(payload);

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

    async estimateFeesCreateVaultTransferRequest(params: RequestVaultTransferParams): Promise<FeesClass> {
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable: await this.createVaultTransferRequestSubmittable(params),
        });
    }

    private async createVaultTransferRequestSubmittable(params: RequestVaultTransferParams): Promise<SubmittableExtrinsic> {
        if(this.sharedState.isRecovery) {
            return await this.recoveryTransferSubmittable(params);
        } else {
            return await this.regularTransferSubmittable(params);
        }
    }

    private async recoveryTransferSubmittable(params: RequestVaultTransferParams): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        const transfer = await this.sharedState.vault.tx.transferFromVault({
            amount,
            destination,
        });
        return this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
            this.sharedState.recoveredAccount?.address || "",
            transfer
        );
    }

    private regularTransferSubmittable(params: RequestVaultTransferParams): Promise<SubmittableExtrinsic> {
        const { destination, amount } = params;
        return this.sharedState.vault.tx.transferFromVault({
            amount,
            destination,
        });
    }

    async cancelVaultTransferRequest(params: BlockchainSubmission<UpdateVaultTransferParams>): Promise<VaultState> {
        return this.discardOnSuccess<VaultState>(current => current._cancelVaultTransferRequest(params));
    }

    private async _cancelVaultTransferRequest(params: BlockchainSubmission<UpdateVaultTransferParams>): Promise<VaultState> {
        const { signer, callback, payload } = params;
        const { legalOfficer, request } = payload;
        const signerId = getDefinedCurrentAccount(this.sharedState);

        const submittable = this.cancelVaultTransferRequestSubmittable(payload);
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

    async estimateFeesCancelVaultTransferRequest(params: UpdateVaultTransferParams): Promise<FeesClass> {
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable: this.cancelVaultTransferRequestSubmittable(params),
        });
    }

    private cancelVaultTransferRequestSubmittable(params: UpdateVaultTransferParams): SubmittableExtrinsic {
        const { request } = params;
        const amount = Lgnt.fromCanonical(BigInt(request.amount));
        if(this.sharedState.isRecovery) {
            const call = this.sharedState.vault.tx.cancelVaultTransfer({
                destination: ValidAccountId.polkadot(request.destination),
                amount,
                block: BigInt(request.block),
                index: request.index,
            });
            return  this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                request.origin,
                call
            );
        } else {
            return  this.sharedState.vault.tx.cancelVaultTransfer({
                destination: ValidAccountId.polkadot(request.destination),
                amount,
                block: BigInt(request.block),
                index: request.index,
            });
        }
    }

    async resubmitVaultTransferRequest(params: UpdateVaultTransferParams): Promise<VaultState> {
        return this.discardOnSuccess<VaultState>(current => current._resubmitVaultTransferRequest(params));
    }

    private async _resubmitVaultTransferRequest(params: UpdateVaultTransferParams): Promise<VaultState> {
        const { request, legalOfficer } = params;
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
        const transactionClient = VaultState.newTransactionClient(this.vaultAccount, this.sharedState);
        const transactions = await transactionClient.fetchTransactions();
        const balances = await this.sharedState.nodeApi.queries.getCoinBalances(this.vaultAccount);
        return new VaultState({
            ...this.sharedState,
            ...result,
            transactions: transactions.map(transaction => toTransaction(transaction, this.vaultAccount)),
            balances,
        });
    }

    get vaultAccount(): ValidAccountId {
        return this.sharedState.vault.account;
    }

    get transactions(): Transaction[] {
        return this.sharedState.transactions;
    }

    get balances(): CoinBalance[] {
        return this.sharedState.balances;
    }
}
