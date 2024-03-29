import { Numbers, CoinBalance, Lgnt } from "@logion/node-api";
import { BalanceState, waitFor } from "@logion/client";

import { State, REQUESTER_ADDRESS } from "./Utils.js";
import { ALICE } from "./Utils.js";

export async function transfers(state: State) {
    const { client, signer, aliceAccount, requesterAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAddress(aliceAccount)
    let aliceState = await aliceClient.balanceState();

    checkBalance(aliceState, "99.99k");
    expect(aliceState.transactions.length).toBe(0);
    aliceState = await aliceState.transfer({
        signer,
        amount: Lgnt.from(5000n),
        destination: REQUESTER_ADDRESS
    });
    checkBalance(aliceState, "94.99k");
    aliceState = await waitFor({
        producer: async state => state ? await state.refresh() : aliceState,
        predicate: state => state.transactions.length === 2,
    });
    expect(aliceState.transactions[0].fees.inclusion).toBeGreaterThan(0);
    expect(aliceState.transactions[0].fees.storage).toBeUndefined();
    expect(aliceState.transactions[0].transferValue).toBe(Lgnt.fromPrefixedNumber(new Numbers.PrefixedNumber("5", Numbers.KILO)).toString());

    // User transfers to Alice.
    const userClient = client.withCurrentAddress(requesterAccount)
    let userState = await userClient.balanceState();

    checkBalance(userState, "5.00k");
    userState = await userState.transfer({
        signer,
        amount: Lgnt.from(2000n),
        destination: ALICE
    });
    checkBalance(userState, "2.99k");

    // TODO: the balance of a LO is not stable as it increases with block rewards
    //       this integration test should be rewritten with regular users.
    //
    // Alice checks her balance.
    // aliceState = await aliceState.refresh();
    // checkBalance(aliceState, "97.00k"); // is sometimes 96.99k depending on block reward.
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
    return `${balance.total.coefficient.toInteger()}.${balance.total.coefficient.toFixedPrecisionDecimals(2)}${balance.total.prefix.symbol}`;
}

export async function transferAndCannotPayFees(state: State) {
    const { client, signer, requesterAccount } = state;

    const requesterClient = client.withCurrentAddress(requesterAccount)
    let balanceState = await requesterClient.balanceState();

    await expectAsync(balanceState.transfer({
        signer,
        amount: Lgnt.from(1n),
        destination: ALICE,
    })).toBeRejectedWithError("Not enough funds available to pay fees");
}

export async function transferWithInsufficientFunds(state: State) {
    const { client, signer, aliceAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAddress(aliceAccount)
    let aliceState = await aliceClient.balanceState();

    await expectAsync(aliceState.transfer({
        signer,
        amount: Lgnt.fromCanonicalPrefixedNumber(aliceState.balances[0].available).add(Lgnt.from(1)),
        destination: REQUESTER_ADDRESS
    })).toBeRejectedWithError("Insufficient balance");
}
