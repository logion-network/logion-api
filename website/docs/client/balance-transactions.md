---
sidebar_position: 2
---

# Balance and Transactions

## Get the current balance

```typescript
let balanceState = await authenticatedClient.balanceState();
const balance = balanceState.balances[0];
console.log(
    "Balance :%s",
    `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`
);
```

## List all transactions

```typescript
const transactions = balanceState.transactions;
console.log("First transaction destination: %s", transactions[0].destination)
```

## Transfer an amount to another account

```typescript
import { KILO } from "@logion/node-api";

balanceState =  balanceState.transfer({
    signer,
    amount: new PrefixedNumber("2", KILO),
    destination: ALICE.address
});
```
