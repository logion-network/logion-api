import { ValidAccountId, AnyAccountId } from "../src/index.js";

describe("ValidAccountId", () => {

    const address42 = "5HYf6QFkYpso8FdX9WALCmRTcga7YSmuFS5qqaJtFF7m4RPr";
    const address2021 = "vQxmTQGRHbTsBdDhVLqsksX7c44K8DjVokJUi8ZK58z88tDBx";

    function getAccount(address: string): ValidAccountId {
        const account = new AnyAccountId(address, "Polkadot").toValidAccountId();
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
            .toEqual("Wrong Polkadot address BLA: Error: Decoding BLA: Invalid decoded address length")
        expect(new AnyAccountId("INVALID", "Polkadot").validate())
            .toEqual('Wrong Polkadot address INVALID: Error: Decoding INVALID: Invalid base58 character "I" (0x49) at index 0')
        const invalid = "5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS8888888888888888";
        expect(new AnyAccountId(invalid, "Polkadot").validate())
            .toEqual("Wrong Polkadot address 5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS8888888888888888: Error: Decoding 5HMzQmyDb8CU8ajJuvSrrqSH5LPHNRFS8888888888888888: Invalid decoded address checksum")
    })
})
