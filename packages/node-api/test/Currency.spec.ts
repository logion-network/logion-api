import { Numbers, Lgnt, LgntFormatter } from "../src/index.js";
import { PrefixedNumber } from "../src/numbers.js";

describe("Lgnt", () => {

    it("builds with fromCanonical", () => {
        const canonical = 10n;
        const lgnt = Lgnt.fromCanonical(canonical);
        expect(lgnt.canonical).toBe(canonical);
    });

    it("builds with fromCanonicalPrefixedNumber", () => {
        const canonical = new Numbers.PrefixedNumber("1", Numbers.FEMTO);
        const lgnt = Lgnt.fromCanonicalPrefixedNumber(canonical);
        expect(lgnt.canonical).toBe(1000n);
    });

    it("builds with from", () => {
        const lgnt = Lgnt.from(1n);
        expect(lgnt.canonical).toBe(10n ** BigInt(Lgnt.DECIMALS));
    });

    it("builds with fromPrefixedNumber", () => {
        const lgnt = Lgnt.fromPrefixedNumber(new PrefixedNumber("1", Numbers.NONE));
        expect(lgnt.canonical).toBe(10n ** BigInt(Lgnt.DECIMALS));
    });

    it("provides canonical prefixed number", () => {
        const lgnt = Lgnt.from(1n);
        const prefixed = lgnt.toCanonicalPrefixedNumber();
        expect(prefixed.coefficient.toInteger()).toBe((10n ** BigInt(Lgnt.DECIMALS)).toString());
        expect(prefixed.prefix.tenExponent).toBe(Lgnt.SMALLEST_UNIT_PREFIX.tenExponent);
    });

    it("provides prefixed number", () => {
        const lgnt = Lgnt.from(1000n);
        const prefixed = lgnt.toPrefixedNumber(Numbers.KILO);
        expect(prefixed.coefficient.unnormalize()).toBe("1");
        expect(prefixed.prefix.tenExponent).toBe(Numbers.KILO.tenExponent);
    });

    it("adds", () => {
        const lgnt = Lgnt.fromCanonical(1n).add(Lgnt.fromCanonical(2n));
        expect(lgnt.canonical).toBe(3n);
    });

    it("substracts", () => {
        const lgnt = Lgnt.fromCanonical(3n).substract(Lgnt.fromCanonical(2n));
        expect(lgnt.canonical).toBe(1n);
    });

    it("multiplies", () => {
        const lgnt = Lgnt.fromCanonical(3n).multiply(2n);
        expect(lgnt.canonical).toBe(6n);
    });

    it("divides", () => {
        const lgnt = Lgnt.fromCanonical(4n).divide(2n);
        expect(lgnt.canonical).toBe(2n);
    });

    it("divides with loss", () => {
        const lgnt = Lgnt.fromCanonical(3n).divide(2n);
        expect(lgnt.canonical).toBe(1n);
    });

    it("negates", () => {
        const lgnt = Lgnt.fromCanonical(3n).negate();
        expect(lgnt.canonical).toBe(-3n);
    });

    it("is checked negative", () => {
        const lgnt = Lgnt.fromCanonical(3n);
        expect(lgnt.isNegative()).toBeFalse();
        expect(lgnt.negate().isNegative()).toBeTrue();
    });

    it("provides integer part", () => {
        const lgnt = Lgnt.from(1000n);
        expect(lgnt.integerPart(Numbers.KILO)).toBe(1n);
    });

    it("provides decimal part string", () => {
        const lgnt = Lgnt.from(10);
        expect(lgnt.decimalPartString(2, Numbers.KILO)).toBe("01");
    });

    it("provides decimal part", () => {
        const lgnt = Lgnt.from(10);
        expect(lgnt.decimalPart(2, Numbers.KILO)).toBe(1n);
    });

    it("convert to fiat", () => {
        const lgnt = Lgnt.from(20);
        expect(lgnt.convertToFiat(20)).toBe(1);
    });

    it("builds from fiat", () => {
        const lgnt = Lgnt.fromFiat(1, 20);
        expect(lgnt).toEqual(Lgnt.from(20));
    });

    it("has equality", () => {
        const lgnt1 = Lgnt.from(3);
        const lgnt2 = Lgnt.from(4);
        const lgnt3 = Lgnt.from(3);
        expect(lgnt1.equalTo(lgnt2)).toBe(false);
        expect(lgnt1.equalTo(lgnt3)).toBe(true);
    });

    it("compares", () => {
        const lgnt1 = Lgnt.from(3);
        const lgnt2 = Lgnt.from(4);
        const lgnt3 = Lgnt.from(3);
        expect(lgnt1.compareTo(lgnt2)).toBeLessThan(0);
        expect(lgnt2.compareTo(lgnt1)).toBeGreaterThan(0);
        expect(lgnt1.compareTo(lgnt3)).toBe(0);
    });

    it("has toString", () => {
        const lgnt = Lgnt.fromCanonical(20n);
        expect(lgnt.toString()).toBe("20");
    });
});

describe("LgntFormatter", () => {

    it("formats an amount", () => {
        const amount = Lgnt.from("2256.243");
        const formatter = new LgntFormatter(2, Numbers.KILO);
        expect(formatter.format(amount)).toBe("2.25 k");
    });
});
