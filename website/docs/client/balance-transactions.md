---
sidebar_position: 2
description: How to access to the balance and do transactions.
---

# Balance and Transactions

## State

:::note
An [authenticated client](authentication.md) is necessary for all balance-related operations.
:::
The global state of the balances can be obtained (and later on, refreshed) with:

```typescript
const balanceState = await authenticatedClient.balanceState();
const refreshedState = await balanceState.refresh();
```

:::caution
`transfer` and `refresh` do return a new state.
Always use the most recent state, and discard the former state.
In the example above, the var `balanceState` must not be used any more as soon as `refreshedState` is available.
:::

## Balance

You can get the current balance with:

```typescript
const balance = balanceState.balances[0];
console.log(
    "Balance :%s",
    `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`
);
```

## Transactions on the balance

You can get a list of transactions on the balance with:

```typescript
const transactions = balanceState.transactions;
console.log("First transaction destination: %s", transactions[0].destination)
```

## Transfer {#transfer}

You can transfer any amount (must be less than or equal to the balance, taking transaction fees into account)
to another account:

```typescript
import { PrefixedNumber, KILO } from "@logion/node-api";

balanceState =  balanceState.transfer({
    signer,
    amount: new PrefixedNumber("2", KILO),
    destination: ALICE.address
});
```
