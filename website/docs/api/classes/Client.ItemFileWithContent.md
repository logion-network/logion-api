[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ItemFileWithContent

# Class: ItemFileWithContent

[Client](../modules/Client.md).ItemFileWithContent

## Table of contents

### Constructors

- [constructor](Client.ItemFileWithContent.md#constructor)

### Accessors

- [contentType](Client.ItemFileWithContent.md#contenttype)
- [hashOrContent](Client.ItemFileWithContent.md#hashorcontent)
- [name](Client.ItemFileWithContent.md#name)
- [size](Client.ItemFileWithContent.md#size)

### Methods

- [finalize](Client.ItemFileWithContent.md#finalize)

## Constructors

### constructor

• **new ItemFileWithContent**(`parameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.contentType` | [`MimeType`](Client.MimeType.md) |
| `parameters.hashOrContent` | [`HashOrContent`](Client.HashOrContent.md) |
| `parameters.name` | `string` |
| `parameters.size?` | `bigint` |

#### Defined in

[packages/client/src/LocClient.ts:122](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L122)

## Accessors

### contentType

• `get` **contentType**(): [`MimeType`](Client.MimeType.md)

#### Returns

[`MimeType`](Client.MimeType.md)

#### Defined in

[packages/client/src/LocClient.ts:159](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L159)

___

### hashOrContent

• `get` **hashOrContent**(): [`HashOrContent`](Client.HashOrContent.md)

#### Returns

[`HashOrContent`](Client.HashOrContent.md)

#### Defined in

[packages/client/src/LocClient.ts:170](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L170)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/client/src/LocClient.ts:155](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L155)

___

### size

• `get` **size**(): `bigint`

#### Returns

`bigint`

#### Defined in

[packages/client/src/LocClient.ts:163](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L163)

## Methods

### finalize

▸ **finalize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:143](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L143)
