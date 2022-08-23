# Protection

## Protection Request

### Choose legal officers

```typescript
const legalOfficers: LegalOfficer[] = authenticatedClient.getLegalOfficers();

const alice = legalOfficers[0];
const bob = legalOfficers[1];
```

### Request a protection

```typescript
const noProtection = await authenticatedClient.protectionState() as NoProtection;
const pending = await noProtection.requestProtection({
    legalOfficer1: alice,
    legalOfficer2: bob,
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
    postalAddress: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postalCode: "",
    }
});
```

### Activate the protection

You must first wait for both Legal Officers acceptance, and then activate the protection:

```typescript
const accepted = (await pending.refresh()) as AcceptedProtection;

accepted.activate(signer);
```

## Vault
Operations require an activated protection (see above [Protection Request](#protection-request))

### Transfer from vault

```typescript
let activeProtection = (await authenticatedClient.protectionState()) as ActiveProtection;

let vaultState = await activeProtection.vaultState();
const vaultAddress = vaultState.vaultAddress;
vaultState = await vaultState.createVaultTransferRequest({
    legalOfficer: alice,
    amount: new PrefixedNumber("1", NONE),
    destination: REQUESTER_ADDRESS,
    signer
});
const pendingRequest = vaultState.pendingVaultTransferRequests[0];
```

### Transfer to vault

A transfer to the vault is similar to any other [transfer](balance-transactions#transfer-an-amount-to-another-account).
Simply use `vaultState.vaultAddress` as destination.

### Check vault balance

You must fist wait for one Legal Officer acceptance, and then see the effect of the transfer on the vault balance:

```typescript
vaultState = await vaultState.refresh();

const balance = vaultState.balances[0];
console.log("Balance :%s", `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`)
```

## Recovery

### Request a recovery

Recovery must be requested to the **same Legal Officers** who accepted to protect the lost account (in this case, Alice and Bob).

```typescript
const NEW_ADDRESS = "5GsxAu1XexDATCbDJbWxKSow4gdC6epkajZr7Ht8Ci9VZabV";

const authenticatedClient = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
}).authenticate([ NEW_ADDRESS ], signer);

const noProtection = await authenticatedClient.protectionState() as NoProtection;
const pending = await noProtection.requestRecovery({
    recoveredAddress: REQUESTER_ADDRESS,
    signer,
    legalOfficer1: alice,
    legalOfficer2: bob,
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
    postalAddress: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postalCode: "",
    }
});

```

### Activate the new protection

You must first wait for LO's acceptance and vouching, and then activate the new protection:

```typescript
const accepted = (await pending.refresh()) as AcceptedProtection;

let pendingRecovery = await accepted.activate(signer) as PendingRecovery;
```

### Claim the recovery

```typescript
pendingRecovery = await pendingRecovery.waitForFullyReady();
const claimed = await pendingRecovery.claimRecovery(signer);
```

### Recover the lost balance

```typescript
const recoveredBalance = await claimed.recoveredBalanceState();
await recoveredBalance.transfer({
    signer,
    destination: NEW_ADDRESS,
    amount: recoveredBalance.balances[0].available,
});
```

:::info
The destination may be any address, not necessarily the new account address.
:::

### Recover the lost vault

As for any transfer from a vault, you must for one LO's approval.

```typescript
const newVault = await claimed.vaultState();
let recoveredVault = await claimed.recoveredVaultState();
recoveredVault = await recoveredVault.createVaultTransferRequest({
    legalOfficer: alice,
    amount: recoveredVault.balances[0].available,
    destination: newVault.vaultAddress,
    signer,
});

// ... Wait for LO's acceptance ...
newVault = await newVault.refresh();

// Check Vault balance
const newBalance = newVault.balances[0];
console.log("Balance :%s", `${newBalance.balance.coefficient.toInteger()}.${newBalance.balance.coefficient.toFixedPrecisionDecimals(2)}${newBalance.balance.prefix.symbol}`);
```

:::info
The destination may be any address, not necessarily the new vault address.
:::
