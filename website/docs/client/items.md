---
sidebar_position: 5
description: How to manage collection items.
---

# Collection Items

A Collection Item may link tokens issued on some blockchain (see [below](#collection-with-restricted-delivery) for a list of supported chains)
to a closed Collection LOC. This way, the tokens are bound to some verified documentation
(e.g. the legal framework).

When creating a Collection LOC, the collection parameters tell if it supports file upload or not.

## State

:::note
A [closed Collection LOC](loc.md#collection-loc) is required.
:::

## Collection WITHOUT upload support 

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

## Collection WITH upload support 

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

## Terms and Conditions

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
