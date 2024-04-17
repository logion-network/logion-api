import { ValidAccountId, AnyAccountId } from "../src/index.js";

describe("ValidAccountId (Bech32)", () => {

    const address1 = "erd1sqcp77ll8v8j6vgs5m0h2xxkz5wv26pfj2vyyls52cz6hdumkmjq0jr93a";
    const address2 = "ERD1SQCP77LL8V8J6VGS5M0H2XXKZ5WV26PFJ2VYYLS52CZ6HDUMKMJQ0JR93A";

    it("is valid and not case-sensitive", () => {
        const account1 = ValidAccountId.bech32(address1);
        const account2 = ValidAccountId.bech32(address2);

        expect(account1.equals(account1)).toBeTrue();
        expect(account1.equals(account2)).toBeTrue();

        expect(account2.equals(account1)).toBeTrue();
        expect(account2.equals(account2)).toBeTrue();
    })

    it("guesses from unknown", () => {
        expect(ValidAccountId.fromUnknown(address1)?.type).toEqual("Bech32");
        expect(ValidAccountId.fromUnknown(address2)?.type).toEqual("Bech32");
    })
})

describe("ValidAccountId (Ethereum)", () => {

    const address1 = "0x6ef154673a6379b2CDEDeD6aF1c0d705c3c8272a";
    const address2 = "0x6ef154673a6379b2cdeded6af1c0d705c3c8272a";
    const address3 = "0x6EF154673A6379B2CDEDED6AF1C0D705C3C8272A";

    it("is valid and not case-sensitive", () => {
        const account1 = ValidAccountId.ethereum(address1);
        const account2 = ValidAccountId.ethereum(address2);
        const account3 = ValidAccountId.ethereum(address3);

        expect(account1.equals(account1)).toBeTrue();
        expect(account1.equals(account2)).toBeTrue();
        expect(account1.equals(account3)).toBeTrue();

        expect(account2.equals(account1)).toBeTrue();
        expect(account2.equals(account2)).toBeTrue();
        expect(account2.equals(account3)).toBeTrue();

        expect(account3.equals(account1)).toBeTrue();
        expect(account3.equals(account2)).toBeTrue();
        expect(account3.equals(account3)).toBeTrue();
    })

    it("guesses from unknown", () => {
        expect(ValidAccountId.fromUnknown(address1)?.type).toEqual("Ethereum");
        expect(ValidAccountId.fromUnknown(address2)?.type).toEqual("Ethereum");
    })
})

describe("ValidAccountId (Polkadot)", () => {

    const address42 = "5HYf6QFkYpso8FdX9WALCmRTcga7YSmuFS5qqaJtFF7m4RPr";
    const address2021 = "vQxmTQGRHbTsBdDhVLqsksX7c44K8DjVokJUi8ZK58z88tDBx";

    function getAccount(address: string): ValidAccountId {
        const account = ValidAccountId.polkadot(address);
        expect(account.type).toEqual("Polkadot");
        expect(account.address).toEqual(address2021);
        expect(account.getAddress(42)).toEqual(address42);
        expect(account.getAddress(2021)).toEqual(address2021);
        return account;
    }

    it("is similar when created from differently prefixed addresses", () => {
        const account1 = getAccount(address42);
        const account2 = getAccount(address2021);
        expect(account1.equals(account2)).toBeTrue();
        expect(account2.equals(account1)).toBeTrue();
    })

    it("is different otherwise", () => {

        const anotherAddress42 = "5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS9WvBNzyJ9q7gtwtG";
        const anotherAddress2021 = "vQxanie8kdmBrdYoH7GAHXb8RWi8J3hyLePK3fyyV3a84iNXA";

        const account1 = new AnyAccountId(address42, "Polkadot").toValidAccountId();

        const account2 = new AnyAccountId(anotherAddress42, "Polkadot").toValidAccountId();
        expect(account1.equals(account2)).toBeFalse();
        expect(account2.equals(account1)).toBeFalse();

        const account3 = new AnyAccountId(anotherAddress2021, "Polkadot").toValidAccountId();
        expect(account1.equals(account3)).toBeFalse();
        expect(account3.equals(account1)).toBeFalse();
    })

    it("does not validate an invalid account", () => {
        expect(new AnyAccountId("BLA", "Polkadot").validate())
            .toEqual("Wrong Polkadot address BLA: Invalid decoded address")
        expect(new AnyAccountId("INVALID", "Polkadot").validate())
            .toEqual('Wrong Polkadot address INVALID: Invalid base58 character "I" (0x49) at index 0')
        const invalid = "5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS8888888888888888";
        expect(new AnyAccountId(invalid, "Polkadot").validate())
            .toEqual("Wrong Polkadot address 5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS8888888888888888: Invalid decoded address")
    })

    it("guesses from unknown", () => {
        expect(ValidAccountId.fromUnknown(address42)?.type).toEqual("Polkadot");
        expect(ValidAccountId.fromUnknown(address2021)?.type).toEqual("Polkadot");
    })
})

describe("ValidAccountId: fromUnknown()", () => {

    it("returns undefined", () => {
        expect(ValidAccountId.fromUnknown("BLA")).toBeUndefined();
        expect(ValidAccountId.fromUnknown("INVALID")).toBeUndefined();
        expect(ValidAccountId.fromUnknown("0x0000")).toBeUndefined();
    });
})

