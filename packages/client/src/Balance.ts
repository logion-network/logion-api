import {
    CoinBalance,
    Lgnt,
    ValidAccountId,
} from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Transaction, TransactionClient } from "./TransactionClient.js";
import { SharedState } from "./SharedClient.js";
import { State } from "./State.js";
import { BlockchainSubmissionParams } from "./Signer.js";
import { requireDefined } from "./assertions.js";

export interface TransferParam extends BlockchainSubmissionParams {
    destination: ValidAccountId;
    amount: Lgnt;
}

export interface BalanceSharedState extends SharedState {
    readonly balances: CoinBalance[];
    readonly transactions: Transaction[];
    readonly isRecovery: boolean;
    readonly recoveredAccount?: ValidAccountId;
}

export async function getBalanceState(sharedState: SharedState & { isRecovery: boolean, recoveredAccount?: ValidAccountId }): Promise<BalanceState> {
    let targetAccount;
    if(sharedState.isRecovery) {
        targetAccount = requireDefined(sharedState.recoveredAccount);
    } else {
        targetAccount = requireDefined(sharedState.currentAccount);
    }
    const client = newTransactionClient(targetAccount, sharedState);
    const transactions = await client.fetchTransactions();
    const balances = await sharedState.nodeApi.queries.getCoinBalances(targetAccount);
    return new BalanceState({
        ...sharedState,
        transactions,
        balances,
    });
}

function newTransactionClient(currentAccount: ValidAccountId, sharedState: SharedState): TransactionClient {
    return new TransactionClient({
        axiosFactory: sharedState.axiosFactory,
        networkState: sharedState.networkState,
        currentAccount,
    })
}

export interface TransferAllParam extends BlockchainSubmissionParams {
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

    get balances(): CoinBalance[] {
        return this.sharedState.balances;
    }

    async transfer(params: TransferParam): Promise<BalanceState> {
        return this.discardOnSuccess<BalanceState>(current => current._transfer(params));
    }

    private async _transfer(params: TransferParam): Promise<BalanceState> {
        const { signer, destination, amount, callback } = params;

        const canonicalAmount = amount.canonical;

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            const recoveredAccount = requireDefined(this.sharedState.recoveredAccount);
            submittable = this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                recoveredAccount.address,
                this.sharedState.nodeApi.polkadot.tx.balances.transferKeepAlive(
                    destination.address,
                    canonicalAmount,
                ),
            );
            await this.ensureFundsForFees(submittable);
            const recoveredAccountData = await this.sharedState.nodeApi.queries.getAccountData(recoveredAccount);
            const transferable = BigInt(recoveredAccountData.available);
            if(transferable < canonicalAmount) {
                throw new Error("Insufficient balance");
            }
        } else {
            submittable = this.sharedState.nodeApi.polkadot.tx.balances.transferKeepAlive(
                destination.address,
                canonicalAmount,
            );
            const fees = await this.ensureFundsForFees(submittable);
            const available = Lgnt.fromCanonicalPrefixedNumber(this.balances[0].available).canonical;
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

    private async ensureFundsForFees(submittable: SubmittableExtrinsic): Promise<bigint> {
        const fees = await this.sharedState.nodeApi.fees.estimateWithoutStorage({
            origin: requireDefined(this.sharedState.currentAccount),
            submittable,
        });
        const available = Lgnt.fromCanonicalPrefixedNumber(this.balances[0].available).canonical;
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

    async transferAll(params: TransferAllParam): Promise<BalanceState> {
        return this.discardOnSuccess<BalanceState>(current => current._transferAll(params));
    }

    private async _transferAll(params: TransferAllParam): Promise<BalanceState> {
        const { signer, destination, callback, keepAlive } = params;

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            submittable = this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                this.sharedState.recoveredAccount?.address || "",
                this.sharedState.nodeApi.polkadot.tx.balances.transferAll(
                    destination,
                    keepAlive,
                ),
            );
        } else {
            submittable = this.sharedState.nodeApi.polkadot.tx.balances.transferAll(
                destination,
                keepAlive,
            );
        }

        await signer.signAndSend({
            signerId: requireDefined(this.sharedState.currentAccount),
            submittable,
            callback,
        });

        return this._refresh();
    }
}
