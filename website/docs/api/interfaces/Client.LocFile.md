[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocFile

# Interface: LocFile

[Client](../modules/Client.md).LocFile

Blockchain File, extended with private attributes and timestamp.

## Hierarchy

- [`File`](Node_API.File.md)

- `Partial`<[`AddedOn`](Client.AddedOn.md)\>

  ↳ **`LocFile`**

  ↳↳ [`MergedFile`](Client.MergedFile.md)

## Table of contents

### Properties

- [addedOn](Client.LocFile.md#addedon)
- [hash](Client.LocFile.md#hash)
- [name](Client.LocFile.md#name)
- [nature](Client.LocFile.md#nature)
- [submitter](Client.LocFile.md#submitter)

## Properties

### addedOn

• `Optional` **addedOn**: `string`

#### Inherited from

Partial.addedOn

#### Defined in

[packages/client/src/LocClient.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L36)

___

### hash

• **hash**: `string`

#### Inherited from

[File](Node_API.File.md).[hash](Node_API.File.md#hash)

#### Defined in

packages/node-api/dist/Types.d.ts:8

___

### name

• **name**: `string`

#### Defined in

[packages/client/src/LocClient.ts:47](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L47)

___

### nature

• **nature**: `string`

#### Inherited from

[File](Node_API.File.md).[nature](Node_API.File.md#nature)

#### Defined in

packages/node-api/dist/Types.d.ts:9

___

### submitter

• **submitter**: `string`

#### Inherited from

[File](Node_API.File.md).[submitter](Node_API.File.md#submitter)

#### Defined in

packages/node-api/dist/Types.d.ts:10
