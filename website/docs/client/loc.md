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

## Collection Items

When creating a Collection LOC, the collection parameters tell if it supports file upload or not.

### Collection WITHOUT upload support 

Add an item to the collection:

```typescript title="Add Item"
const itemId = Hash.of("first-collection-item");
const itemDescription = "First collection item";
closedLoc = await closedLoc.addCollectionItem({
    payload: {
        itemId,
        itemDescription,
    },
    signer,
});
```

Later on, you can retrieve the item with its ID:

```typescript title="Get an Item"
const item = await closedLoc.getCollectionItem({ itemId });
```

### Collection WITH upload support 

A collection item may have attached files if the collection permits it. The files are then stored in logion's private IPFS network
ensuring their availability over time. If a controlled delivery for attached files is needed, see "Collection with restricted delivery"
below.

There are 2 possibilities when attaching files to an item:
- immediate upload of the files upon item creation or
- item creation followed by an explicit upload later on.

See the examples below.

```typescript title="Add Item and provide file content"
const itemId = Hash.of("first-collection-item");
const itemDescription = "First collection item";
closedLoc = await closedLoc.addCollectionItem({
    payload: {
        itemId,
        itemDescription,
        itemFiles: [
            HashOrContent.fromContent(
                new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))
            ), // Let SDK compute hash and size
        ],
    },
    signer,
});
```

```typescript title="Add Item and provide hash and size"
const itemId = Hash.of("first-collection-item");
const itemDescription = "First collection item";
const file = HashOrContent.fromContentFinalized(
    new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))
);
closedLoc = await closedLoc.addCollectionItem({
    payload: {
        itemId,
        itemDescription,
        itemFiles: [
            HashOrContent.fromDescription({
                name: file.name,
                hash: file.contentHash,
                size: file.size,
                mimeType: file.mimeType,
            }),
        ]
    },
    signer,
});
```

```typescript title="Upload file for an existing item"
closedLoc = await closedLoc.uploadCollectionItemFile({
    itemId,
    itemFile: file,
});
```

### Collection with restricted delivery

A collection item with restricted delivery requires a token definition i.e. the "address" of the token
which opens access to the underlying files when owned. Below an example where the underlying files
will be delivered to the owner of an ERC-721 token on Ethereum Mainnet.

```typescript title="Add Item with restricted delivery"
const itemId = generateEthereumTokenItemId("202210131750", "4391");
const itemDescription = "First collection item";
const itemToken: ItemTokenWithRestrictedType = {
    type: "ethereum_erc721",
    id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":"4391"}'
};
const file = HashOrContent.fromContent(
    new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))
);
closedLoc = await closedLoc.addCollectionItem({
    payload: {
        itemId: firstItemId,
        itemDescription: firstItemDescription,
        itemFiles: [ file ],
        itemToken,
        restrictedDelivery: true,
    },
    signer,
});
```

:::danger
In the above example, the item ID is generated using function `generateEthereumTokenItemId`. This ensures that the item ID
matches the one computed by the [Logion Smart Contract](https://github.com/logion-network/logion-solidity/blob/main/contracts/Logion.sol).
**This is very important because otherwise, the bidirectional link between the item and its token would be broken.
The nonce parameter must match the one in the Smart Contract.**

One may consider not using the Logion Smart Contract, leaving the choice of the item ID completely open, but this is not recommended.
:::

This is the list of supported token types:
- `ethereum_erc721`
- `ethereum_erc1155`
- `goerli_erc721`
- `goerli_erc1155`
- `singular_kusama`
- `polygon_erc721`
- `polygon_erc1155`
- `polygon_mumbai_erc721`
- `polygon_mumbai_erc1155`
- `ethereum_erc20`
- `goerli_erc20`
- `polygon_erc20`
- `polygon_mumbai_erc20`
- `multiversx_devnet_esdt`
- `multiversx_testnet_esdt`
- `multiversx_esdt`
- `astar_psp34`
- `astar_shiden_psp34`
- `astar_shibuya_psp34`

The format of `id` field depends on the token type:

- With types `astar_*_psp34`, `*_erc721` and `*_erc1155`, the `id` field must be a valid JSON object with 2 fields: `contract` and `id`. Both fields are strings:
    - `contract` is the address of the Smart Contract of the token.
    - `id` is the token ID as assigned by the Smart Contract.
- With types `*_erc20`, the `id` field must be a valid JSON object with a single `contract` fields:
    - `contract` is the address of the Smart Contract of the token.
- With `multiversx_*` types, `id` is a string representing the ID of an ESDT token.

### Terms and Conditions

Terms and conditions can be added to the collection item, using either the Logion classification,
a set of `SpecificLicense`s, or both.

If using a specific license, a valid closed Transaction LOC defining the license must exist
(referred as `specificLicenseLocId` in the example below).

```typescript
const itemId = Hash.of("first-collection-item");
const itemDescription = "First collection item";
const file = HashOrContent.fromContent(
    new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))
);
closedLoc = await closedLoc.addCollectionItem({
    payload: {
        itemId,
        itemDescription,
        itemFiles: [ file ],
        logionClassification: {
            regionalLimit: [ "BE", "FR", "LU" ],
            transferredRights: [ "PER-PRIV", "REG", "TIME" ],
            expiration: "2025-01-01",
        },
        specificLicenses: [
            new SpecificLicense(specificLicenseLocId, "Some details about the license"),
        ]
    },
    signer,
});
```

:::note Logion Classification
* The Logion Classification allows to define a set of `transferredRights` to define precisely the scope of the terms and conditions.
All possible transferred rights are available in the `logionLicenseItems` array.
* With the code `TIME` it is possible to limit the right in time by setting the parameter `expiration`.
* With the code `REG` it is possible to limit to some countries/regions with the parameter `regionalLimit`.
:::

## Tokens Records

A tokens record has attached files. The files are then stored in Logion's private IPFS network
ensuring their availability over time.

As for collection items, there are 2 possibilities when attaching files:
- immediate upload of the files on creation or
- creation followed by an explicit upload later on.

See the examples below.

```typescript title="Add record and provide file content"
const recordId = Hash.of("record-id");
const recordDescription = "Some tokens record";
const file = HashOrContent.fromContent(
    new NodeFile("integration/test.txt", "report.txt", MimeType.from("text/plain"))
);
closedLoc = await closedLoc.addTokensRecord({
    payload: {
        recordId,
        description: recordDescription,
        files: [ file ],
    },
    signer,
});
```

```typescript title="Add record and provide description only"
const recordId = Hash.of("record-id");
const recordDescription = "Some tokens record";
const file = HashOrContent.fromContentFinalized(
    new NodeFile("integration/test.txt", "report.txt", MimeType.from("text/plain"))
);
closedLoc = await closedLoc.addTokensRecord({
    payload: {
        recordId,
        description: recordDescription,
        files: [
            HashOrContent.fromDescription({
                name: file.name,
                hash: file.contentHash,
                size: file.size,
                mimeType: file.mimeType,
            }),
        ],
    },
    signer,
});
```

```typescript title="Upload file for an existing record"
closedLoc = await closedLoc.uploadTokensRecordFile({
    recordId,
    file,
});
```
