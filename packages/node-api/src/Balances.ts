import { ApiPromise } from '@polkadot/api';
import { Call } from "@polkadot/types/interfaces";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import * as Numbers from './numbers.js';
import * as Currency from './Currency.js';
import { LogionNodeApiClass } from './Connection.js';
import { TypesAccountData } from "./Types.js";
import { Coin, CoinBalance, Queries } from "./Queries.js";

export const LGNT_SMALLEST_UNIT = Currency.LGNT_SMALLEST_UNIT;
export const SYMBOL = Currency.SYMBOL;

export interface GetAccountDataParameters {
    api: ApiPromise,
    accountId: string,
}

export interface AccountData extends TypesAccountData {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use api.queries.getAccountData(accountId)
 */
export async function getAccountData(parameters: GetAccountDataParameters): Promise<AccountData> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getAccountData(parameters.accountId);
}

/**
 * @deprecated use api.queries.getCoinBalances(accountId)
 */
export async function getBalances(parameters: GetAccountDataParameters): Promise<CoinBalance[]> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getCoinBalances(parameters.accountId);
}

/**
 * @deprecated
 */
export function scientificLogBalance(tokens: string): Numbers.ScientificNumber {
    return Currency.toPrefixedNumberAmount(BigInt(tokens)).scientificNumber.optimizeScale(3);
}

/**
 * @deprecated
 */
export function prefixedLogBalance(tokens: string): Numbers.PrefixedNumber {
    const scientific = scientificLogBalance(tokens);
    return Numbers.convertToPrefixed(scientific);
}

/**
 * @deprecated use Queries.getCoint(coinId)
 */
export function getCoin(coinId: string): Coin {
    return Queries.getCoin(coinId);
}

export interface BuildTransferCallParameters {
    api: ApiPromise;
    destination: string;
    amount: Numbers.PrefixedNumber;
}

/**
 * @deprecated use logionApi.polkadot.tx.balances.transfer(...)
 */
export function transferSubmittable(parameters: BuildTransferCallParameters): SubmittableExtrinsic {
    const {
        api,
        destination,
        amount
    } = parameters;
    const logionApi = new LogionNodeApiClass(api);
    return logionApi.polkadot.tx.balances.transfer(destination, Currency.toCanonicalAmount(amount));
}

/**
 * @deprecated use logionApi.adapters.toCall(submittable)
 */
export function buildTransferCall(parameters: BuildTransferCallParameters): Call {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const submittable = logionApi.polkadot.tx.balances.transfer(parameters.destination, Currency.toCanonicalAmount(parameters.amount));
    return logionApi.adapters.toCall(submittable);
}

/**
 * @deprecated use logionApi.fees.estimateWithoutStorage({ origin, submittable })
 */
export async function estimateFee(parameters: BuildTransferCallParameters): Promise<Numbers.PrefixedNumber> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const submittable = logionApi.polkadot.tx.balances.transfer(parameters.destination, Currency.toCanonicalAmount(parameters.amount));
    const fees = await logionApi.fees.estimateWithoutStorage({ origin: parameters.destination, submittable });
    return Currency.toPrefixedNumberAmount(fees.inclusionFee);
}

/**
 * @deprecated use Currency.toCanonicalAmount(Currency.nLgnt(BigInt(amount))).toString()
 */
export function nLgnt(amount: string): string {
    return Currency.toCanonicalAmount(Currency.nLgnt(BigInt(amount))).toString();
}
