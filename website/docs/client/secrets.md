---
sidebar_position: 8
description: How to manage Recoverable Secrets.
---

# Recoverable Secrets

A Recoverable Secret (or Secret) is a key-value pair a user can attach to one of its closed Identity LOCs.
The Recoverable Secret may be recovered later, even if the user loses access to its keypair.
This is achieved by submitting a Secret Recovery Request which will be reviewed by a Logion Legal Officer (LLO).
If the request is accepted by the LLO, following some kind of KYC process, the user will be able to retrieve the secret’s value.

It is not recommended to use "clear-text" secret values. Even if the probability is quite low, it is never
impossible that the secret's value gets leaked. Therefore, methods like sharding or encryption should be applied
to the "master" secret in order to produce several derived secrets.

## State

:::note
A [closed Identity LOC](loc.md#identity-loc) is required to add or remove secrets.
In order to recover a secret, an unauthenticated client is enough.
:::

## Add a Recoverable Secret

```typescript
closedLoc = await closedLoc.addSecret({
    name: "Encrypted keypair",
    value: "YLS+hsOaYqPdJLoTqHCg/muhOemq2kr6weHCi+iSWoafNbynSU7gUCy+k2O6WKyQ1NwnajNupaqhdYI+9dCdPpmi/6OSj39/FuzandUFOZ5tlyH/z9kUE7Wqfl4/tR07",
});
```

A tool like [`logion-secrets`](https://github.com/logion-network/logion-tools/blob/main/packages/secrets/README.md) could be used to
generate the secret's value.

## Remove a Recoverable Secret

```typescript
closedLoc = await closedLoc.removeSecret("Encrypted keypair");
```

## Request a Secret recovery

```typescript
const recoveryRequestId = await client.secretRecovery.createSecretRecoveryRequest({
    requesterIdentityLocId: UUID.fromDecimalStringOrThrow("204903158696868944108230121110623799462"),
    secretName: "Encrypted keypair",
    challenge: "fde91ce2-bd96-4491-86b4-4dbef32b8c4e",
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
    userPostalAddress: {
        line1: "Peace Street",
        line2: "2nd floor",
        postalCode: "10000",
        city: "MyCity",
        country: "Wonderland"
    },
});
```

## Download recovered Secret's value

In order to download the secret's value, the request must first have been approved by the LLO.

```typescript
const secretValue = await client.secretRecovery.downloadSecret({
    requesterIdentityLocId: UUID.fromDecimalStringOrThrow("204903158696868944108230121110623799462"),
    challenge: "fde91ce2-bd96-4491-86b4-4dbef32b8c4e",
    requestId: "71d61cca-bed4-4801-a6e0-f976b0add839",
});
```

:::note
The `challenge` and `requesterIdentityLocId` must match the values provided when request the recovery.
The value of `requestId` is the one returned by `createSecretRecoveryRequest(...)`.
:::
