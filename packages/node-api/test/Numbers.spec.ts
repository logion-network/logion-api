import { Numbers } from '../src/index.js';

describe("Numbers", () => {

    it("NormalizedNumber toInteger", () => {
        const number = new Numbers.NormalizedNumber("42.5678");
        expect(number.toInteger()).toBe("42");
    });
    
    it("negative NormalizedNumber toInteger", () => {
        const number = new Numbers.NormalizedNumber("-42.5678");
        expect(number.toInteger()).toBe("-42");
    });
    
    it("NormalizedNumber toFixedPrecision", () => {
        const number = new Numbers.NormalizedNumber("42.5678");
        expect(number.toFixedPrecision(2)).toBe("42.56");
    });
    
    it("negative NormalizedNumber toFixedPrecision", () => {
        const number = new Numbers.NormalizedNumber("-42.5678");
        expect(number.toFixedPrecision(2)).toBe("-42.56");
    });
    
    it("NormalizedNumber toFixedPrecisionDecimals", () => {
        const number = new Numbers.NormalizedNumber("42.5678");
        expect(number.toFixedPrecisionDecimals(2)).toBe("56");
    });
    
    it("negative NormalizedNumber toFixedPrecisionDecimals", () => {
        const number = new Numbers.NormalizedNumber("-42.5678");
        expect(number.toFixedPrecisionDecimals(2)).toBe("56");
    });
    
    it("forPrefix none", () => {
        const result = new Numbers.PrefixedNumber("42000", Numbers.NONE).convertTo(Numbers.NONE);
        expect(result.coefficient.toString()).toBe("42000.");
    });
    
    it("forPrefix negative none", () => {
        const result = new Numbers.PrefixedNumber("-42000", Numbers.NONE).convertTo(Numbers.NONE);
        expect(result.coefficient.toString()).toBe("-42000.");
    });
    
    it("forPrefix milli", () => {
        const result = new Numbers.PrefixedNumber("42000", Numbers.NONE).convertTo(Numbers.MILLI);
        expect(result.coefficient.toString()).toBe("42000000.");
    });
    
    it("forPrefix negative milli", () => {
        const result = new Numbers.PrefixedNumber("-42000", Numbers.NONE).convertTo(Numbers.MILLI);
        expect(result.coefficient.toString()).toBe("-42000000.");
    });
    
    it("forPrefix kilo", () => {
        const result = new Numbers.PrefixedNumber("42000", Numbers.NONE).convertTo(Numbers.KILO);
        expect(result.coefficient.toString()).toBe("42.");
    });
    
    it("forPrefix negative kilo", () => {
        const result = new Numbers.PrefixedNumber("-42000", Numbers.NONE).convertTo(Numbers.KILO);
        expect(result.coefficient.toString()).toBe("-42.");
    });
    
    it("convertPrefix kilo milli", () => {
        const prefixed = new Numbers.PrefixedNumber("42", Numbers.KILO);
        const result = prefixed.convertTo(Numbers.MILLI);
        expect(result.coefficient.toString()).toBe('42000000.');
        expect(result.prefix).toBe(Numbers.MILLI);
    });
    
    it("convertPrefix negative kilo milli", () => {
        const prefixed = new Numbers.PrefixedNumber("-42", Numbers.KILO);
        const result = prefixed.convertTo(Numbers.MILLI);
        expect(result.coefficient.toString()).toBe('-42000000.');
        expect(result.prefix).toBe(Numbers.MILLI);
    });
    
    it("convertPrefix milli kilo", () => {
        const prefixed = new Numbers.PrefixedNumber("42000000", Numbers.MILLI);
        const result = prefixed.convertTo(Numbers.KILO);
        expect(result.coefficient.toString()).toBe('42.');
        expect(result.prefix).toBe(Numbers.KILO);
    });
    
    it("convertPrefix negative milli kilo", () => {
        const prefixed = new Numbers.PrefixedNumber("-42000000", Numbers.MILLI);
        const result = prefixed.convertTo(Numbers.KILO);
        expect(result.coefficient.toString()).toBe('-42.');
        expect(result.prefix).toBe(Numbers.KILO);
    });
    
    it("convertPrefix positive atto none resulting < 1", () => {
        const prefixed = new Numbers.PrefixedNumber("2368112210000000", Numbers.ATTO);
        expect(prefixed.coefficient.toString()).toBe("2368112210000000.");
        const converted = prefixed.convertTo(Numbers.NONE);
        expect(converted.prefix.symbol).toBe("");
        expect(converted.prefix.tenExponent).toBe(0);
        expect(converted.coefficient.toString()).toBe(".00236811221");
    })
    
    it("optimizeScale large", () => {
        const prefixed = new Numbers.ScientificNumber("42000000", 0);
        const result = prefixed.optimizeScale(3);
        expect(result.normalized.toString()).toBe('420.');
        expect(result.tenExponent).toBe(5);
    });
    
    it("optimizeScale large negative", () => {
        const prefixed = new Numbers.ScientificNumber("-42000000", 0);
        const result = prefixed.optimizeScale(3);
        expect(result.normalized.toString()).toBe('-420.');
        expect(result.tenExponent).toBe(5);
    });
    
    it("optimizeScale small", () => {
        const prefixed = new Numbers.ScientificNumber("0.00042", 0);
        const result = prefixed.optimizeScale(3);
        expect(result.normalized.toString()).toBe('4.2');
        expect(result.tenExponent).toBe(-4);
    });
    
    it("optimizeScale small negative", () => {
        const prefixed = new Numbers.ScientificNumber("-0.00042", 0);
        const result = prefixed.optimizeScale(3);
        expect(result.normalized.toString()).toBe('-4.2');
        expect(result.tenExponent).toBe(-4);
    });
    
    it("optimizeScale large prefixed", () => {
        const prefixed = new Numbers.PrefixedNumber("42000000", Numbers.NONE);
        const result = prefixed.optimizeScale(3);
        expect(result.coefficient.toString()).toBe('42.');
        expect(result.prefix).toBe(Numbers.MEGA);
    });
    
    it("optimizeScale negative large prefixed", () => {
        const prefixed = new Numbers.PrefixedNumber("-42000000", Numbers.NONE);
        const result = prefixed.optimizeScale(3);
        expect(result.coefficient.toString()).toBe('-42.');
        expect(result.prefix).toBe(Numbers.MEGA);
    });
    
    it("optimizeScale small prefixed", () => {
        const prefixed = new Numbers.PrefixedNumber("0.00042", Numbers.NONE);
        const result = prefixed.optimizeScale(3);
        expect(result.coefficient.toString()).toBe('.42');
        expect(result.prefix).toBe(Numbers.MILLI);
    });
    
    it("optimizeScale small negative prefixed", () => {
        const prefixed = new Numbers.PrefixedNumber("-0.00042", Numbers.NONE);
        const result = prefixed.optimizeScale(3);
        expect(result.coefficient.toString()).toBe('-.42');
        expect(result.prefix).toBe(Numbers.MILLI);
    });
    
    it("optimizeScale if already optimal", () => {
        const scientific = new Numbers.ScientificNumber("110.0000999374998932", -2);
        const optimized = scientific.optimizeScale(3);
        expect(optimized.coefficient.toString()).toBe("110.0000999374998932");
        expect(optimized.tenExponent).toBe(-2);
    });
    
    it("optimizeScale if zero", () => {
        const scientific = new Numbers.ScientificNumber("0", -18);
        const optimized = scientific.optimizeScale(3);
        expect(optimized.coefficient.toString()).toBe(".");
        expect(optimized.tenExponent).toBe(-18);
    })
    
    it("divide", () => {
        const a = new Numbers.ScientificNumber("50.00", 0);
        const b = new Numbers.ScientificNumber("1.00", 2);
        const result = a.divideBy(b);
        expect(result.toNumber()).toBe(0.5);
    });
    
    it("divide negative", () => {
        const a = new Numbers.ScientificNumber("-50.00", 0);
        const b = new Numbers.ScientificNumber("1.00", 2);
        const result = a.divideBy(b);
        expect(result.toNumber()).toBe(-0.5);
    });
    
    it("negate negative NormalizedNumber", () => {
        const a = new Numbers.NormalizedNumber("-50.00");
        const result = a.negate();
        expect(result.toNumber()).toBe(50);
    });
    
    it("negate positive NormalizedNumber", () => {
        const a = new Numbers.NormalizedNumber("50.00");
        const result = a.negate();
        expect(result.toNumber()).toBe(-50);
    });
    
    it("negate negative PrefixedNumber", () => {
        const a = new Numbers.PrefixedNumber("-50.00", Numbers.NONE);
        const result = a.negate();
        expect(result.toNumber()).toBe(50);
    });
    
    it("negate positive PrefixedNumber", () => {
        const a = new Numbers.PrefixedNumber("50.00", Numbers.NONE);
        const result = a.negate();
        expect(result.toNumber()).toBe(-50);
    });
    
    it("negated zero remains zero", () => {
        const a = new Numbers.PrefixedNumber("0", Numbers.ATTO);
        const result = a.negate();
        expect(result.isNegative()).toBe(false);
    });
    
    it("convert PICO to ATTO", () => {
        const result = new Numbers.PrefixedNumber("125.000155", Numbers.PICO).convertTo(Numbers.ATTO)
        expect(result.coefficient.toString()).toBe("125000155.");
    });
    
    it("convert MILLI to ATTO", () => {
        const result = new Numbers.PrefixedNumber("369", Numbers.MILLI).convertTo(Numbers.ATTO)
        expect(result.coefficient.toString()).toBe("369000000000000000.");
    });
    
    it("subtract PICO", () => {
        const left = new Numbers.PrefixedNumber("369.0", Numbers.MILLI)
        const right = new Numbers.PrefixedNumber("125.000155", Numbers.PICO)
        const result = left.subtract(right);
        expect(result.coefficient.toNumber()).toBe(368.999999874999845)
    })
    
    it("subtract ATTO", () => {
        const left = new Numbers.PrefixedNumber("369.0", Numbers.MILLI)
        const right = new Numbers.PrefixedNumber("125000155", Numbers.ATTO)
        const result = left.subtract(right);
        expect(result.coefficient.toNumber()).toBe(368.999999874999845)
    })
    
    it("convertToPrefixed finds exact prefix", () => {
        const scientific = new Numbers.ScientificNumber("110.0000099", -6);
        const prefixed = Numbers.convertToPrefixed(scientific);
        expect(prefixed.coefficient.toString()).toBe("110.0000099");
        expect(prefixed.prefix.symbol).toBe("µ");
    })
    
    it("convertToPrefixed takes smalles if non-exact", () => {
        const scientific = new Numbers.ScientificNumber("1100.000099", -7);
        const prefixed = Numbers.convertToPrefixed(scientific);
        expect(prefixed.coefficient.toString()).toBe("110.0000099");
        expect(prefixed.prefix.symbol).toBe("µ");
    })
    
    it("convertToPrefixed limits to largest prefix", () => {
        const scientific = new Numbers.ScientificNumber("1", 19);
        const prefixed = Numbers.convertToPrefixed(scientific);
        expect(prefixed.coefficient.toString()).toBe("10.");
        expect(prefixed.prefix.symbol).toBe("E");
    })
    
    it("convertToPrefixed finds atto with smaller", () => {
        const scientific = new Numbers.ScientificNumber("420", -19);
        const prefixed = Numbers.convertToPrefixed(scientific);
        expect(prefixed.coefficient.toString()).toBe("42.");
        expect(prefixed.prefix.symbol).toBe("a");
    })
    
    it("toNumber of zero", () => {
        const zero = new Numbers.NormalizedNumber("0.00");
        expect(zero.toNumber()).toBe(0);
    }) 
});
