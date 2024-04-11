import { AxiosInstance } from "axios";

import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { AxiosFactory } from "./AxiosFactory.js";
import { AnySourceHttpClient, Endpoint } from "./Http.js";
import { Fees } from "./Fees.js";
import { ValidAccountId } from "@logion/node-api";

interface FetchTransactionsSpecification {
    address: string,
}

export type TransferDirection = "Sent" | "Received" | "None"

// Must remain in sync with type in https://github.com/logion-network/logion-backend-ts/blob/main/src/logion/controllers/components.ts
export type TransactionType = "EXTRINSIC"
    | "VAULT_OUT"
    | "LEGAL_FEE"
    | "STORAGE_FEE"
    | "CERTIFICATE_FEE"
    | "OTHER_FEES"
    | "VALUE_FEE"
    | "RESERVE"
    | "COLLECTION_ITEM_FEE"
    | "TOKENS_RECORD_FEE"
;

export interface Transaction {
    id: string,
    from: string,
    to: string,
    pallet: string,
    method: string,
    transferValue: string,
    tip: string,
    fees: Fees,
    reserved: string,
    total: string,
    createdOn: string,
    type: TransactionType,
    transferDirection: TransferDirection,
    successful: boolean,
    error?: TransactionError,
}

export interface TransactionError {
    section: string,
    name: string,
    details: string
}

export interface TransactionsSet {
    transactions: Transaction[],
}

export class TransactionClient {

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAccount: ValidAccountId,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAccount = params.currentAccount;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;

    private readonly axiosFactory: AxiosFactory;

    private readonly currentAccount: ValidAccountId;

    async fetchTransactions(): Promise<Transaction []> {
        const anyClient = new AnySourceHttpClient<Endpoint, TransactionsSet>(this.networkState, this.axiosFactory);
        const transactionsSet = await anyClient.fetch(axios => this.getTransactions(axios, {
            address: this.currentAccount.address,
        }));
        return transactionsSet ? transactionsSet.transactions : []
    }

    private async getTransactions(
        axios: AxiosInstance,
        request: FetchTransactionsSpecification
    ): Promise<TransactionsSet> {
        const response = await axios.put("/api/transaction", request);
        return {
            transactions: response.data.transactions.map((transaction: Transaction) => this.enrichTransaction(transaction, request.address))
        };
    }

    private enrichTransaction(transaction: Transaction, address: string): Transaction {

        const transferDirection: TransferDirection =
            !(transaction.pallet === "balances" && transaction.method.startsWith("transfer")) ?
                'None' :
                transaction.from === address ?
                    'Sent' :
                    'Received'

        return {
            ...transaction,
            transferDirection
        }
    }
}
