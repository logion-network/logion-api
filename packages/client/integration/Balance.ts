import { Numbers, Currency, CoinBalance } from "@logion/node-api";

import { State, REQUESTER_ADDRESS } from "./Utils.js";
import { ALICE } from "../test/Utils.js";
import { BalanceState } from "../src/Balance.js";
import { waitFor } from "../src/Polling.js";

export async function transfers(state: State) {
    const { client, signer, aliceAccount, requesterAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAddress(aliceAccount)
    let aliceState = await aliceClient.balanceState();

    checkBalance(aliceState, "99.99k");
    expect(aliceState.transactions.length).toBe(0);
    aliceState = await aliceState.transfer({
        signer,
        amount: new Numbers.PrefixedNumber("5", Numbers.KILO),
        destination: REQUESTER_ADDRESS
    });
    checkBalance(aliceState, "94.99k");
    aliceState = await waitFor({
        producer: async state => state ? await state.refresh() : aliceState,
        predicate: state => state.transactions.length === 2,
    });
    expect(aliceState.transactions[0].fees.inclusion).toBeGreaterThan(0);
    expect(aliceState.transactions[0].fees.storage).toBeUndefined();
    expect(aliceState.transactions[0].transferValue).toBe(Currency.toCanonicalAmount(new Numbers.PrefixedNumber("5", Numbers.KILO)).toString());

    // User transfers to Alice.
    const userClient = client.withCurrentAddress(requesterAccount)
    let userState = await userClient.balanceState();

    checkBalance(userState, "5.00k");
    userState = await userState.transfer({
        signer,
        amount: new Numbers.PrefixedNumber("2", Numbers.KILO),
        destination: ALICE.address
    });
    checkBalance(userState, "2.99k");

    // Alice checks her balance.
    aliceState = await aliceState.refresh();
    checkBalance(aliceState, "96.99k");
}

export function checkBalance(balanceState: BalanceState, expectedValue: string) {
    const balance = balanceState.balances[0];
    checkCoinBalance(balance, expectedValue);
}

export function checkCoinBalance(balance: CoinBalance, expectedValue: string) {
    const formatted = formatBalance(balance);
    expect(formatted).toEqual(expectedValue)
}

export function formatBalance(balance: CoinBalance): string {
    return `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`;
}

export async function transferAndCannotPayFees(state: State) {
    const { client, signer, requesterAccount } = state;

    const requesterClient = client.withCurrentAddress(requesterAccount)
    let balanceState = await requesterClient.balanceState();

    await expectAsync(balanceState.transfer({
        signer,
        amount: new Numbers.PrefixedNumber("1", Numbers.NONE),
        destination: ALICE.address,
    })).toBeRejectedWithError("Not enough funds available to pay fees");
}

export async function transferWithInsufficientFunds(state: State) {
    const { client, signer, aliceAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAddress(aliceAccount)
    let aliceState = await aliceClient.balanceState();

    await expectAsync(aliceState.transfer({
        signer,
        amount: aliceState.balances[0].available.add(new Numbers.PrefixedNumber("1", Numbers.NONE)),
        destination: REQUESTER_ADDRESS
    })).toBeRejectedWithError("Insufficient balance");
}
