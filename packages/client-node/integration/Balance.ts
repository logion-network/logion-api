import { Numbers, CoinBalance, Lgnt } from "@logion/node-api";
import { BalanceState, waitFor } from "@logion/client";

import { State } from "./Utils.js";

export async function transfers(state: State) {
    const { client, signer, alice, requesterAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAccount(alice.account)
    let aliceState = await aliceClient.balanceState();

    let aliceSnapshot = takeSnapshot(aliceState);
    expect(aliceState.transactions.length).toBe(0);
    aliceState = await aliceState.transfer({
        signer,
        amount: Lgnt.from(5000n),
        destination: requesterAccount,
    });
    checkBalanceDelta(aliceState, "-4.99k", aliceSnapshot);
    aliceState = await waitFor({
        producer: async state => state ? await state.refresh() : aliceState,
        predicate: state => {
            if (state.transactions.length > 0) {
                const transaction = state.transactions[0];
                return transaction.pallet === "balances" && transaction.method === "transferKeepAlive"
            } else {
                return false;
            }
        }
    });
    expect(aliceState.transactions[0].fees.inclusion).toBeGreaterThan(0);
    expect(aliceState.transactions[0].fees.storage).toBeUndefined();
    expect(aliceState.transactions[0].transferValue).toBe(Lgnt.fromPrefixedNumber(new Numbers.PrefixedNumber("5", Numbers.KILO)).toString());

    // User transfers to Alice.
    const userClient = client.withCurrentAccount(requesterAccount)
    let userState = await userClient.balanceState();

    aliceSnapshot = takeSnapshot(await aliceState.refresh());

    checkBalance(userState, "5.00k");
    userState = await userState.transfer({
        signer,
        amount: Lgnt.from(2000n),
        destination: alice.account,
    });
    checkBalance(userState, "2.99k");

    // Alice checks her balance.
    aliceState = await aliceState.refresh();
    checkBalanceDelta(aliceState, "2.00k", aliceSnapshot);
}

export function checkBalance(balanceState: BalanceState, expectedValue: string) {
    const balance = balanceState.balances[0];
    checkCoinBalance(balance, expectedValue);
}

export function takeSnapshot(balanceState: BalanceState): CoinBalance {
    return balanceState.balances[0];
}

export function checkBalanceDelta(current: BalanceState, expectedDelta: string, previous: CoinBalance) {
    checkCoinBalanceDelta(takeSnapshot(current), expectedDelta, previous);
}

export function checkCoinBalanceDelta(current: CoinBalance, expectedDelta: string, previous: CoinBalance) {
    expect(current.coin).toEqual(previous.coin);
    const delta: CoinBalance = {
        coin: current.coin,
        available: current.available.subtract(previous.available),
        reserved: current.reserved.subtract(previous.reserved),
        total: current.total.subtract(previous.total),
        level: current.level - previous.level,
    }
    checkCoinBalance(delta, expectedDelta);
}

export function checkCoinBalance(balance: CoinBalance, expectedValue: string) {
    const formatted = formatBalance(balance);
    expect(expectedValue).toEqual(formatted)
}

export function formatBalance(balance: CoinBalance): string {
    return `${balance.total.coefficient.toInteger()}.${balance.total.coefficient.toFixedPrecisionDecimals(2)}${balance.total.prefix.symbol}`;
}

export async function transferAndCannotPayFees(state: State) {
    const { client, signer, requesterAccount, alice } = state;

    const requesterClient = client.withCurrentAccount(requesterAccount)
    let balanceState = await requesterClient.balanceState();

    await expectAsync(balanceState.transfer({
        signer,
        amount: Lgnt.from(1n),
        destination: alice.account,
    })).toBeRejectedWithError("Not enough funds available to pay fees");
}

export async function transferWithInsufficientFunds(state: State) {
    const { client, signer, alice, requesterAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAccount(alice.account)
    let aliceState = await aliceClient.balanceState();

    await expectAsync(aliceState.transfer({
        signer,
        amount: Lgnt.fromCanonicalPrefixedNumber(aliceState.balances[0].available).add(Lgnt.from(1)),
        destination: requesterAccount,
    })).toBeRejectedWithError("Insufficient balance");
}
