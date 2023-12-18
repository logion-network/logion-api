import * as Numbers from "./numbers.js";

/**
 * Represents an amount of LGNT. The smallest possible amount of LGNT
 * is equal to `10 ^ Lgnt.SMALLEST_UNIT_PREFIX.tenExponent`. An amount
 * of LGNT has at most `Lgnt.DECIMALS`
 * (equal to `-Lgnt.SMALLEST_UNIT_PREFIX.tenExponent`) decimals.
 * 
 * The canonical form of an amount of LGNT is its expression as a
 * factor of `10 ^ Lgnt.SMALLEST_UNIT_PREFIX.tenExponent`. For example,
 * the canonical form of 1 LGNT is equal to `10 ^ Lgnt.DECIMALS`.
 */
export class Lgnt {

    static readonly CODE = "LGNT";

    static readonly SMALLEST_UNIT_PREFIX = Numbers.ATTO;

    static readonly DECIMALS = -Lgnt.SMALLEST_UNIT_PREFIX.tenExponent;

    /**
     * Builds an LGNT amount from its canonical form.
     * 
     * @param canonical The canonical form of an amount of LGNT
     * @returns An LGNT amount
     */
    static fromCanonical(canonical: bigint): Lgnt {
        return new Lgnt(canonical);
    }

    /**
     * Builds an LGNT amount from its canonical form
     * given as a `PrefixedNumber` instance.
     * 
     * @param canonical The canonical form of an amount of LGNT
     * @returns An LGNT amount
     */
    static fromCanonicalPrefixedNumber(prefixed: Numbers.PrefixedNumber): Lgnt {
        const canonical = prefixed.convertTo(Lgnt.SMALLEST_UNIT_PREFIX);
        return new Lgnt(BigInt(canonical.coefficient.unnormalize()));
    }

    /**
     * Builds an LGNT amount.
     * 
     * @param amount The amount
     * @returns An LGNT amount
     */
    static from(amount: bigint | number | string): Lgnt {
        const prefixed = new Numbers.PrefixedNumber(amount.toString(), Numbers.NONE);
        const canonical = prefixed.convertTo(Lgnt.SMALLEST_UNIT_PREFIX);
        return Lgnt.fromCanonicalPrefixedNumber(canonical);
    }

    /**
     * Builds an LGNT amount
     * given as a `PrefixedNumber` instance.
     * 
     * @param amount The amount
     * @returns An LGNT amount
     */
    static fromPrefixedNumber(amount: Numbers.PrefixedNumber): Lgnt {
        const canonical = amount.convertTo(Lgnt.SMALLEST_UNIT_PREFIX);
        return Lgnt.fromCanonicalPrefixedNumber(canonical);
    }

    /**
     * @returns An amount of 0 LGNT
     */
    static zero(): Lgnt {
        return Lgnt.from(0);
    }

    /**
     * Constructs an LGNT amount given its canonical form.
     * Developers should prefer the use of the static factory
     * methods provided by this class to make the code more
     * self-explanatory.
     * 
     * @param canonical The canonical form of an amount of LGNT
     */
    constructor(canonical: bigint) {
        this.canonical = canonical;
    }

    /**
     * The canonical form of this amount.
     */
    readonly canonical: bigint;

    /**
     * @returns The canonical form of this amount as a `PrefixedNumber`.
     */
    toCanonicalPrefixedNumber(): Numbers.PrefixedNumber {
        return new Numbers.PrefixedNumber(this.canonical.toString(), Lgnt.SMALLEST_UNIT_PREFIX);
    }

    /**
     * @param unit The unit to express this amount into.
     * If not provided, `Numbers.NONE` is used by default.
     * @returns This amount as a `PrefixedNumber`.
     */
    toPrefixedNumber(unit?: Numbers.UnitPrefix): Numbers.PrefixedNumber {
        const canonical = this.toCanonicalPrefixedNumber();
        if(unit) {
            return canonical.convertTo(unit);
        } else {
            return canonical.convertTo(Numbers.NONE);
        }
    }

    /**
     * Adds this amount to another.
     * 
     * @param amount Another amount
     * @returns The addition of this amount with another
     */
    add(amount: Lgnt): Lgnt {
        return new Lgnt(this.canonical + amount.canonical);
    }

    /**
     * Substracts another amount from this one.
     * 
     * @param amount Another amount
     * @returns This amount minus the other
     */
    substract(amount: Lgnt): Lgnt {
        return new Lgnt(this.canonical - amount.canonical);
    }

    /**
     * Multiplies this amount by a given factor.
     * 
     * @param factor The factor
     * @returns The multiplication of this amount with given factor.
     */
    multiply(factor: bigint): Lgnt {
        return new Lgnt(this.canonical * factor);
    }

    /**
     * Divides this amount by a given divider.
     * Given the fixed precision of an amount of LGNT, this
     * operation may result in a loss of value.
     * 
     * @param divider The divider
     * @returns The division of this amount by given divider.
     */
    divide(divider: bigint): Lgnt {
        return new Lgnt(this.canonical / divider);
    }

    /**
     * The integer part of this amount expressed in given unit.
     * 
     * @param unit The unit in which to express this amount
     * @returns The integer part of this amount
     */
    integerPart(unit?: Numbers.UnitPrefix): bigint {
        const prefixed = this.toPrefixedNumber(unit);
        return BigInt(prefixed.coefficient.toInteger());
    }

    /**
     * The decimal part of this amount expressed in given unit.
     * The returned string has always a length equal to the
     * expected number of decimals. It might be zero-padded
     * on the left.
     * 
     * @param decimals The number of decimals
     * @param unit The unit in which to express this amount
     * @returns The decimal part of this amount
     */
    decimalPartString(decimals: number, unit?: Numbers.UnitPrefix): string {
        const prefixed = this.toPrefixedNumber(unit);
        return prefixed.coefficient.toFixedPrecisionDecimals(decimals);
    }

    /**
     * The decimal part of this amount expressed in given unit.
     * 
     * @param decimals The maximum number of decimals
     * @param unit The unit in which to express this amount
     * @returns The decimal part of this amount
     */
    decimalPart(decimals: number, unit?: Numbers.UnitPrefix): bigint {
        const prefixed = this.toPrefixedNumber(unit);
        return BigInt(prefixed.coefficient.toFixedPrecisionDecimals(decimals));
    }

    /**
     * Converts this amount into a fiat amount given a rate LGNT/FIAT.
     * For example, if 20 LGNTs = 1 FIAT, then the rate is 20.
     * 
     * @param rate The rate to apply
     * @returns The fiat equivalent of this LGNT amount
     */
    convertToFiat(rate: number): number {
        const amount = this.toPrefixedNumber().toNumber();
        return amount / rate;
    }
}

/**
 * A formatter for LGNT amounts. It is parametrized with the
 * number of decimals to display and the unit in which to
 * display the amounts.
 */
export class LgntFormatter {

    constructor(decimals: number, unit: Numbers.UnitPrefix) {
        this.decimals = decimals;
        this.unit = unit;
    }

    private decimals: number;

    private unit: Numbers.UnitPrefix;

    format(lgnt: Lgnt): string {
        const prefixed = lgnt.toPrefixedNumber(this.unit);
        return `${ prefixed.coefficient.toFixedPrecision(this.decimals) } ${ prefixed.prefix.symbol }`;
    }
}

/**
 * @deprecated use Lgnt.SMALLEST_UNIT_PREFIX
 */
export const LGNT_SMALLEST_UNIT = Lgnt.SMALLEST_UNIT_PREFIX;
/**
 * @deprecated use Lgnt.from(1).canonical
 */
export const LGNT: bigint = Lgnt.from(1).canonical;
/**
 * @deprecated use Lgnt.CODE
 */
export const SYMBOL = Lgnt.CODE;

/**
 * @deprecated use Lgnt.fromPrefixedNumber(amount).canonical
 */
export function toCanonicalAmount(amount: Numbers.PrefixedNumber): bigint {
    return Lgnt.fromPrefixedNumber(amount).canonical;
}

/**
 * @deprecated use Lgnt.fromCanonical(canonicalAmount).toCanonicalPrefixedNumber()
 */
export function toPrefixedNumberAmount(canonicalAmount: bigint): Numbers.PrefixedNumber {
    return Lgnt.fromCanonical(canonicalAmount).toCanonicalPrefixedNumber();
}

/**
 * @deprecated use Lgnt.from(lgntAmount).toPrefixedNumber()
 */
export function nLgnt(lgntAmount: bigint): Numbers.PrefixedNumber {
    return Lgnt.from(lgntAmount).toPrefixedNumber();
}
