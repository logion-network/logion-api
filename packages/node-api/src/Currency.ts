import * as Numbers from "./numbers.js";

export const LGNT_SMALLEST_UNIT = Numbers.ATTO;
export const SYMBOL = "LGNT";

export function toCanonicalAmount(amount: Numbers.PrefixedNumber): bigint {
    return BigInt(amount.convertTo(LGNT_SMALLEST_UNIT).coefficient.unnormalize());
}

export function toPrefixedNumberAmount(canonicalAmount: bigint): Numbers.PrefixedNumber {
    return new Numbers.PrefixedNumber(canonicalAmount.toString(), LGNT_SMALLEST_UNIT);
}

export function nLgnt(lgntAmount: bigint): Numbers.PrefixedNumber {
    return new Numbers.PrefixedNumber(lgntAmount.toString(), Numbers.NONE);
}
