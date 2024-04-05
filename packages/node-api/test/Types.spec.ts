import { ValidAccountId, AnyAccountId } from "../src/index.js";
import { ApiPromise } from "@polkadot/api";
import { POLKADOT_API_CREATE_TYPE, SS58_PREFIX } from "./Util.js";

describe("ValidAccountId", () => {

    const address42 = "5HYf6QFkYpso8FdX9WALCmRTcga7YSmuFS5qqaJtFF7m4RPr";
    const address2021 = "vQxmTQGRHbTsBdDhVLqsksX7c44K8DjVokJUi8ZK58z88tDBx";

    function getAccount(address: string): ValidAccountId {
        const api = mockApi();
        const account = new AnyAccountId(api, address, "Polkadot").toValidAccountId();
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

        const api = mockApi();
        const account1 = new AnyAccountId(api, address42, "Polkadot").toValidAccountId();

        const account2 = new AnyAccountId(api, anotherAddress42, "Polkadot").toValidAccountId();
        expect(account1.equals(account2)).toBeFalse();
        expect(account2.equals(account1)).toBeFalse();

        const account3 = new AnyAccountId(api, anotherAddress2021, "Polkadot").toValidAccountId();
        expect(account1.equals(account3)).toBeFalse();
        expect(account3.equals(account1)).toBeFalse();
    })
})

function mockApi() {
    return {
        consts: {
            system: {
                ss58Prefix: {
                    toNumber: () => SS58_PREFIX
                }
            }
        },
        createType: POLKADOT_API_CREATE_TYPE,
    } as unknown as ApiPromise;
}
