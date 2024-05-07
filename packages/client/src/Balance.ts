import {
    Lgnt,
    TypesAccountData,
    ValidAccountId,
    Fees as FeesClass,
} from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { BackendTransaction, TransactionClient, TransactionError, TransactionType } from "./TransactionClient.js";
import { SharedState } from "./SharedClient.js";
import { State } from "./State.js";
import { BlockchainSubmission } from "./Signer.js";
import { requireDefined } from "./assertions.js";
import { Fees } from "./Fees.js";

export interface TransferParam {
    destination: ValidAccountId;
    amount: Lgnt;
}

export interface BalanceSharedState extends SharedState {
    readonly balance: TypesAccountData;
    readonly transactions: Transaction[];
    readonly isRecovery: boolean;
    readonly recoveredAccount?: ValidAccountId;
}

export interface Transaction {
    id: string;
    from: ValidAccountId;
    to?: ValidAccountId;
    pallet: string;
    method: string;
    transferValue: string;
    tip: string;
    fees: Fees;
    reserved: string;
    total: string;
    createdOn: string;
    type: TransactionType;
    transferDirection: TransferDirection;
    successful: boolean;
    error?: TransactionError;
}

export type TransferDirection = "Sent" | "Received" | "None";

export function toTransaction(transaction: BackendTransaction, account: ValidAccountId): Transaction {
    const from = ValidAccountId.polkadot(transaction.from);
    const to = transaction.to ? ValidAccountId.polkadot(transaction.to) : undefined;
    const transferDirection: TransferDirection =
        !(transaction.pallet === "balances" && transaction.method.startsWith("transfer")) ?
            'None' :
            from.equals(account) ?
                'Sent' :
                'Received'

    return {
        ...transaction,
        from,
        to,
        transferDirection
    };
}

export async function getBalanceState(sharedState: SharedState & { isRecovery: boolean, recoveredAccount?: ValidAccountId }): Promise<BalanceState> {
    let targetAccount: ValidAccountId;
    if(sharedState.isRecovery) {
        targetAccount = requireDefined(sharedState.recoveredAccount);
    } else {
        targetAccount = requireDefined(sharedState.currentAccount);
    }
    const client = newTransactionClient(targetAccount, sharedState);
    const transactions = await client.fetchTransactions();
    const balance = await sharedState.nodeApi.queries.getAccountData(targetAccount);
    return new BalanceState({
        ...sharedState,
        transactions: transactions.map(transaction => toTransaction(transaction, targetAccount)),
        balance,
    });
}

function newTransactionClient(currentAccount: ValidAccountId, sharedState: SharedState): TransactionClient {
    return new TransactionClient({
        axiosFactory: sharedState.axiosFactory,
        networkState: sharedState.networkState,
        currentAccount,
    })
}

export interface TransferAllParam {
    destination: string;
    keepAlive: boolean;
}

export class BalanceState extends State {

    constructor(state: BalanceSharedState) {
        super();
        this.sharedState = state;
    }

    private sharedState: BalanceSharedState;

    get transactions(): Transaction[] {
        return this.sharedState.transactions;
    }

    get balance(): TypesAccountData {
        return this.sharedState.balance;
    }

    async transfer(params: BlockchainSubmission<TransferParam>): Promise<BalanceState> {
        return this.discardOnSuccess<BalanceState>(current => current._transfer(params));
    }

    private async _transfer(params: BlockchainSubmission<TransferParam>): Promise<BalanceState> {
        const { signer, callback, payload } = params;
        const canonicalAmount = payload.amount.canonical;

        const submittable = this.transferSubmittable(payload);
        if(this.sharedState.isRecovery) {
            const recoveredAccount = requireDefined(this.sharedState.recoveredAccount);
            await this.ensureFundsForFees(submittable);
            const recoveredAccountData = await this.sharedState.nodeApi.queries.getAccountData(recoveredAccount);
            const transferable = recoveredAccountData.available.canonical;
            if(transferable < canonicalAmount) {
                throw new Error("Insufficient balance");
            }
        } else {
            const fees = await this.ensureFundsForFees(submittable);
            const available = this.balance.available.canonical;
            const transferable = available - fees;
            if(transferable < canonicalAmount) {
                throw new Error("Insufficient balance");
            }
        }

        await signer.signAndSend({
            signerId: requireDefined(this.sharedState.currentAccount),
            submittable,
            callback,
        })

        return this._refresh();
    }

    async estimateFeesTransfer(params: TransferParam): Promise<FeesClass> {
        const submittable = this.transferSubmittable(params);
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private transferSubmittable(params: TransferParam): SubmittableExtrinsic {
        const { destination, amount } = params;

        const canonicalAmount = amount.canonical;
        if (this.sharedState.isRecovery) {
            const recoveredAccount = requireDefined(this.sharedState.recoveredAccount);
            return this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                recoveredAccount.address,
                this.sharedState.nodeApi.polkadot.tx.balances.transferKeepAlive(
                    destination.address,
                    canonicalAmount,
                ),
            );
        } else {
            return this.sharedState.nodeApi.polkadot.tx.balances.transferKeepAlive(
                destination.address,
                canonicalAmount,
            );
        }
    }

    private async ensureFundsForFees(submittable: SubmittableExtrinsic): Promise<bigint> {
        const fees = await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
        const available = this.balance.available.canonical;
        if(available < fees.totalFee.canonical) {
            throw new Error("Not enough funds available to pay fees");
        }
        return fees.totalFee.canonical;
    }

    private async _refresh(): Promise<BalanceState> {
        return getBalanceState(this.sharedState);
    }

    async refresh(): Promise<BalanceState> {
        return this.discardOnSuccess<BalanceState>(current => current._refresh());
    }

    async transferAll(params: BlockchainSubmission<TransferAllParam>): Promise<BalanceState> {
        return this.discardOnSuccess<BalanceState>(current => current._transferAll(params));
    }

    private async _transferAll(params: BlockchainSubmission<TransferAllParam>): Promise<BalanceState> {
        const { signer, callback, payload } = params;
        const submittable = this.transferAllSubmittable(payload);
        await signer.signAndSend({
            signerId: requireDefined(this.sharedState.currentAccount),
            submittable,
            callback,
        });
        return this._refresh();
    }

    async estimateFeesTransferAll(params: TransferAllParam): Promise<FeesClass> {
        const submittable = this.transferAllSubmittable(params);
        return await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
    }

    private transferAllSubmittable(params: TransferAllParam): SubmittableExtrinsic {
        const { destination, keepAlive } = params;
        if(this.sharedState.isRecovery) {
            return this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                this.sharedState.recoveredAccount?.address || "",
                this.sharedState.nodeApi.polkadot.tx.balances.transferAll(
                    destination,
                    keepAlive,
                ),
            );
        } else {
            return  this.sharedState.nodeApi.polkadot.tx.balances.transferAll(
                destination,
                keepAlive,
            );
        }

    }
}
