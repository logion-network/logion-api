---
sidebar_position: 4
description: How to request and access to a LOC.
---

# Legal Officer Case (LOC)

A LOC is an encrypted and decentralized digital folder containing public and private data.
Its content is reviewed and signed by a Logion Legal Officer (LLO),
an individual operating under a strict legal framework.

This section is about how to manager your LOCs.

## State

:::note
An [authenticated client](authentication.md) is necessary for all LOC operations.
:::
The global state of LOCs can be obtained (and later on, refreshed) with:

```typescript
const locsState = await client.locsState();
const refreshedState = await locsState.refresh();
```

:::caution
All user operations (`requestTransactionLoc`, `requestCollectionLoc`, etc.), as well as `refresh`, do return a new state.
Always use the most recent state, and discard the former state.
In the example above, the var `locsState` must not be used any more as soon as `refreshedState` is available.
:::

## Lifecycle

In below diagram, replace `___` by a LOC type. The process is the same for all LOC types.

![Identity Loc State](img/identity-loc-state.png)

## Identity LOC

### Request

An Identity LOC is requested this way:

```typescript
const draftRequest = await locsState.requestIdentityLoc({
    legalOfficer: alice,
    description: "This is an Identity LOC",
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
    draft: true,
    legalFee: Lgnt.from(160),
});
```

:::warning
The default legal fee for an identity
LOC is 160 LGNTs. Another value of `legalFee` should have been discussed with the LLO beforehand,
otherwise it may reject the LOC.
:::

### Add items

You may add metadata (i.e. public name-value pairs), private files and links (to other LOCs) to your LOC.

Metadata can be added to, or removed from, a draft LOC:

```typescript title="addMetadata"
draftRequest = await draftRequest.addMetadata({
    name: "Some name",
    value: "Some value"
});
```

```typescript title="deleteMetadata"
draftRequest = await draftRequest.deleteMetadata({
    name: "Some name"
});
```

### Submit

When done, the request must be submitted to the LLO for review:

```typescript
const pendingRequest = await draftRequest.submit();
```

### After review

If the LLO accepted your LOC, you can proceed and publish it:

```typescript
const acceptedRequest = await pendingRequest.refresh() as AcceptedRequest;
const openLoc = await acceptedRequest.open({ signer, autoPublish: true });
```

If you set `autoPublish` to false, you'll have to manually publish each item
manually after the call to open.

After everything has been published, just wait for the LLO to close the LOC:

```typescript
const closedLoc = await openLoc.refresh() as ClosedLoc;
```

## Transaction LOC

### Request

```typescript
const draftRequest = await locsState.requestTransactionLoc({
    legalOfficer: alice,
    description: "This is a Transaction LOC",
    draft: true,
    legalFee: Lgnt.from(2000),
});
```

:::warning
The default legal fee for a transaction
LOC is 2000 LGNTs. Another value of `legalFee` should have been discussed with the LLO beforehand,
otherwise the LLO may reject the LOC. 
:::

## Collection LOC

### Request

When requesting a Collection LOC, additional parameters have to be provided.

Note that at least one of `lastBlockSubmission` and `maxSize` have to be defined.

```typescript
const draftRequest = await locsState.requestCollectionLoc({
    legalOfficer: alice,
    description: "This is a Collection LOC",
    draft: true,
    legalFee: Lgnt.from(2000),
    valueFee: Lgnt.zero(),
    collectionItemFee: Lgnt.zero(),
    tokensRecordFee: Lgnt.zero(),
    collectionParams: {
        lastBlockSubmission: 100000n,
        maxSize: 9999,
        canUpload: true,
    }
});
```

:::warning
The default legal fee for a collection LOC is 2000 LGNTs. Another value
of `legalFee` should be discussed with the LLO beforehands,
this also applies to `valueFee`, `collectionItemFee`, `tokensRecordFee` and the collection
parameters. Otherwise the LLO may reject the LOC.
:::

After a Collection LOC was closed, it may be enriched by adding [Collection Items](./items.md) and/or [Tokens Records](./records.md).

## Direct LOC opening

In order to bypass the review process, one can directly create and publish a LOC and its
items in a single call and signature:

```typescript
const openLoc = await locsState.openIdentityLoc({
    description: "This is an Identity LOC",
    legalOfficerAddress: alice.address,
    files,
    metadata,
    links,
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
    signer
});
```

Methods `openTransactionLoc` and `openCollectionLoc` can also be used. `openCollection` will
require the additional fields (see `requestCollectionLoc`).

:::danger
You have to make sure that the LLO agrees to close the LOCs directly opened this way.
If he doesn't, he may never close or even void your LOC. In that case, you
will "lose" (i.e. there is no refund) the LGNTs paid so far for the creation of the LOC.
:::

## Queries

### Querying requests
Pending and rejected requests can be queried:

```typescript
const type: LocType = 'Transaction'; // could be 'Collection' or 'Identity'
const pendingRequests = locsState.pendingRequests[type];
const rejectedRequests = locsState.rejectedRequests[type];
```

### Querying LOCs
Similarly, LOC's can be queried according to their state:

```typescript
const type: LocType = 'Transaction'; // could be 'Collection' or 'Identity'
const openLocs = locsState.openLocs[type];
const closedLocs = locsState.closedLocs[type];
const voidedLocs = locsState.voidedLocs[type];
```

### Accessing a LOC's data

```typescript
const locData: LocData = locsState.openLocs["Identity"][0].data();
const userIdentity = locData.userIdentity; // Only set on identity LOCs
console.log("Identity of %s: %s %s %s %s", 
    locData.requesterAddress, 
    userIdentity?.firstName, 
    userIdentity?.lastName, 
    userIdentity?.email, 
    userIdentity?.phoneNumber
);
```
