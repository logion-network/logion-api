import {
    CoinBalance,
    Numbers,
    Currency,
} from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types'; 

import { Transaction, TransactionClient } from "./TransactionClient.js";
import { SignCallback, Signer } from "./Signer.js";
import { SharedState } from "./SharedClient.js";
import { State } from "./State.js";

export interface TransferParam {
    signer: Signer;
    destination: string;
    amount: Numbers.PrefixedNumber;
    callback?: SignCallback;
}

export interface BalanceSharedState extends SharedState {
    readonly balances: CoinBalance[];
    readonly transactions: Transaction[];
    readonly isRecovery: boolean;
    readonly recoveredAddress?: string;
}

export async function getBalanceState(sharedState: SharedState & { isRecovery: boolean, recoveredAddress?: string }): Promise<BalanceState> {
    let targetAddress;
    if(sharedState.isRecovery) {
        targetAddress = sharedState.recoveredAddress || "";
    } else {
        targetAddress = sharedState.currentAddress?.address || "";
    }
    const client = newTransactionClient(targetAddress, sharedState);
    const transactions = await client.fetchTransactions();
    const balances = await sharedState.nodeApi.queries.getCoinBalances(targetAddress);
    return new BalanceState({
        ...sharedState,
        transactions,
        balances,
    });
}

function newTransactionClient(currentAddress: string, sharedState: SharedState): TransactionClient {
    return new TransactionClient({
        axiosFactory: sharedState.axiosFactory,
        networkState: sharedState.networkState,
        currentAddress,
    })
}

export class BalanceState extends State {

    constructor(state: BalanceSharedState) {
        super();
        this.sharedState = state;
    }

    private sharedState: BalanceSharedState;

    get transactions(): Transaction[] {
        this.ensureCurrent();
        return this.sharedState.transactions;
    }

    get balances(): CoinBalance[] {
        this.ensureCurrent();
        return this.sharedState.balances;
    }

    async transfer(params: TransferParam): Promise<BalanceState> {
        return this.discardOnSuccess(() => this._transfer(params));
    }

    private async _transfer(params: TransferParam): Promise<BalanceState> {
        const { signer, destination, amount, callback } = params;

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            submittable =  this.sharedState.nodeApi.polkadot.tx.recovery.asRecovered(
                this.sharedState.recoveredAddress || "",
                this.sharedState.nodeApi.polkadot.tx.balances.transfer(
                    destination,
                    Currency.toCanonicalAmount(amount),
                )
            );
        } else {
            submittable = this.sharedState.nodeApi.polkadot.tx.balances.transfer(
                destination,
                Currency.toCanonicalAmount(amount),
            );
        }

        await signer.signAndSend({
            signerId: this.sharedState.currentAddress?.address || "",
            submittable,
            callback,
        })

        return this._refresh();
    }

    private async _refresh(): Promise<BalanceState> {
        return getBalanceState(this.sharedState);
    }

    async refresh(): Promise<BalanceState> {
        return this.discardOnSuccess(() => this._refresh());
    }
}
