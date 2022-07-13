import { PrefixedNumber } from "@logion/node-api";
import { asRecovered } from "@logion/node-api/dist/Recovery";
import { CoinBalance, transferSubmittable, getBalances, buildTransferCall } from "@logion/node-api/dist/Balances";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types'; 

import { Transaction, TransactionClient } from "./TransactionClient";
import { SignCallback, Signer } from "./Signer";
import { SharedState } from "./SharedClient";

export interface TransferParam {
    signer: Signer;
    destination: string;
    amount: PrefixedNumber;
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
        targetAddress = sharedState.currentAddress || "";
    }
    const client = newTransactionClient(targetAddress, sharedState);
    const transactions = await client.fetchTransactions();
    const balances = await getBalances({ api: sharedState.nodeApi, accountId: targetAddress });
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

export class BalanceState {

    constructor(state: BalanceSharedState) {
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
        const { signer, destination, amount, callback } = params;

        let submittable: SubmittableExtrinsic;
        if(this.sharedState.isRecovery) {
            submittable = asRecovered({
                api: this.sharedState.nodeApi,
                recoveredAccountId: this.sharedState.recoveredAddress || "",
                call: buildTransferCall({
                    api: this.sharedState.nodeApi,
                    destination,
                    amount,
                })
            });
        } else {
            submittable = transferSubmittable({
                api: this.sharedState.nodeApi,
                destination,
                amount,
            });
        }

        await signer.signAndSend({
            signerId: this.sharedState.currentAddress || "",
            submittable,
            callback,
        })

        return this.refresh();
    }

    async refresh(): Promise<BalanceState> {
        return getBalanceState(this.sharedState);
    }
}
