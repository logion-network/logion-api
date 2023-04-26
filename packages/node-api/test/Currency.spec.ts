import { Currency, Numbers } from "../src/index.js";

describe("Currency", () => {

    it("toCanonicalAmount", () => {
        const result = Currency.toCanonicalAmount(new Numbers.PrefixedNumber("30000", Numbers.ATTO));
        expect(result.toString()).toBe("30000");
    });

    it("toPrefixedNumberAmount", () => {
        const result = Currency.toPrefixedNumberAmount(30000n);
        expect(result.coefficient.unnormalize().toString()).toBe("30000");
    });

    it("nLgnt", () => {
        const result = Currency.nLgnt(30000n);
        expect(result.coefficient.unnormalize().toString()).toBe("30000");
        expect(result.prefix).toBe(Numbers.NONE);
    });
});
