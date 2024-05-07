import { Numbers, Lgnt, TypesAccountData } from "@logion/node-api";
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
        payload: {
            amount: Lgnt.from(5000n),
            destination: requesterAccount,
        },
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
        payload: {
            amount: Lgnt.from(2000n),
            destination: alice.account,
        }
    });
    checkBalance(userState, "2.99k");

    // Alice checks her balance.
    aliceState = await aliceState.refresh();
    checkBalanceDelta(aliceState, "2.00k", aliceSnapshot);
}

export function checkBalance(balanceState: BalanceState, expectedValue: string) {
    const balance = balanceState.balance;
    checkCoinBalance(balance, expectedValue);
}

export function takeSnapshot(balanceState: BalanceState): TypesAccountData {
    return balanceState.balance;
}

export function checkBalanceDelta(current: BalanceState, expectedDelta: string, previous: TypesAccountData) {
    checkCoinBalanceDelta(takeSnapshot(current), expectedDelta, previous);
}

export function checkCoinBalanceDelta(current: TypesAccountData, expectedDelta: string, previous: TypesAccountData) {
    const delta: TypesAccountData = {
        available: current.available.substract(previous.available),
        reserved: current.reserved.substract(previous.reserved),
        total: current.total.substract(previous.total),
    }
    checkCoinBalance(delta, expectedDelta);
}

export function checkCoinBalance(balance: TypesAccountData, expectedValue: string) {
    const formatted = formatBalance(balance);
    expect(expectedValue).toEqual(formatted)
}

export function formatBalance(balance: TypesAccountData): string {
    const total = balance.total.toPrefixedNumber().optimizeScale(3);
    return `${total.coefficient.toInteger()}.${total.coefficient.toFixedPrecisionDecimals(2)}${total.prefix.symbol}`;
}

export async function transferAndCannotPayFees(state: State) {
    const { client, signer, requesterAccount, alice } = state;

    const requesterClient = client.withCurrentAccount(requesterAccount)
    let balanceState = await requesterClient.balanceState();

    await expectAsync(balanceState.transfer({
        signer,
        payload: {
            amount: Lgnt.from(1n),
            destination: alice.account,
        }
    })).toBeRejectedWithError("Not enough funds available to pay fees");
}

export async function transferWithInsufficientFunds(state: State) {
    const { client, signer, alice, requesterAccount } = state;

    // Alice transfers to user.
    const aliceClient = client.withCurrentAccount(alice.account)
    let aliceState = await aliceClient.balanceState();

    await expectAsync(aliceState.transfer({
        signer,
        payload: {
            amount: aliceState.balance.available.add(Lgnt.from(1)),
            destination: requesterAccount,
        }
    })).toBeRejectedWithError("Insufficient balance");
}
