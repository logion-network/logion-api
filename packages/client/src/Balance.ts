import { Transaction, TransactionClient } from "./TransactionClient";
import { PrefixedNumber } from "@logion/node-api/dist/numbers";
import { CoinBalance, transferSubmittable, getBalances } from "@logion/node-api/dist/Balances";
import { Signer } from "./Signer";
import { AuthenticatedSharedState } from "./SharedClient";

export interface TransferParam {
    destination: string
    amount: PrefixedNumber
}

export async function getBalanceState(sharedState: AuthenticatedSharedState): Promise<BalanceState> {
    const client = newTransactionClient(sharedState);
    const transactions = await client.fetchTransactions();
    const balances = await getBalances({ api: sharedState.nodeApi, accountId: sharedState.currentAddress! });
    return new BalanceState(balances, transactions, sharedState);
}

function newTransactionClient(sharedState: AuthenticatedSharedState): TransactionClient {
    return new TransactionClient({
        axiosFactory: sharedState.axiosFactory,
        currentAddress: sharedState.currentAddress!,
        networkState: sharedState.networkState,
    })
}

export class BalanceState {

    constructor(balances: CoinBalance[], transactions: Transaction[], sharedState: AuthenticatedSharedState) {
        this.balances = balances;
        this.transactions = transactions;
        this.sharedState = sharedState;
    }

    readonly balances: CoinBalance[];
    readonly transactions: Transaction[];
    private readonly sharedState: AuthenticatedSharedState;

    async transfer(signer: Signer, params: TransferParam): Promise<BalanceState> {
        await signer.signAndSend({
            signerId: this.sharedState.currentAddress!,
            submittable: transferSubmittable({
                api: this.sharedState.nodeApi,
                ...params,
            })
        })
        return this.refresh();
    }

    async refresh(): Promise<BalanceState> {
        return getBalanceState(this.sharedState);
    }
}
