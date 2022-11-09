[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocMetadataItem

# Interface: LocMetadataItem

[Client](../modules/Client.md).LocMetadataItem

Blockchain MetadataItem, extended with timestamp.

## Hierarchy

- [`MetadataItem`](Node_API.MetadataItem.md)

- `Partial`<[`AddedOn`](Client.AddedOn.md)\>

  ↳ **`LocMetadataItem`**

  ↳↳ [`MergedMetadataItem`](Client.MergedMetadataItem.md)

## Table of contents

### Properties

- [addedOn](Client.LocMetadataItem.md#addedon)
- [name](Client.LocMetadataItem.md#name)
- [submitter](Client.LocMetadataItem.md#submitter)
- [value](Client.LocMetadataItem.md#value)

## Properties

### addedOn

• `Optional` **addedOn**: `string`

#### Inherited from

Partial.addedOn

#### Defined in

[packages/client/src/LocClient.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L36)

___

### name

• **name**: `string`

#### Inherited from

[MetadataItem](Node_API.MetadataItem.md).[name](Node_API.MetadataItem.md#name)

#### Defined in

packages/node-api/dist/Types.d.ts:3

___

### submitter

• **submitter**: `string`

#### Inherited from

[MetadataItem](Node_API.MetadataItem.md).[submitter](Node_API.MetadataItem.md#submitter)

#### Defined in

packages/node-api/dist/Types.d.ts:5

___

### value

• **value**: `string`

#### Inherited from

[MetadataItem](Node_API.MetadataItem.md).[value](Node_API.MetadataItem.md#value)

#### Defined in

packages/node-api/dist/Types.d.ts:4
