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

[packages/client/src/LocClient.ts:123](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L123)

## Accessors

### contentType

• `get` **contentType**(): [`MimeType`](Client.MimeType.md)

#### Returns

[`MimeType`](Client.MimeType.md)

#### Defined in

[packages/client/src/LocClient.ts:160](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L160)

___

### hashOrContent

• `get` **hashOrContent**(): [`HashOrContent`](Client.HashOrContent.md)

#### Returns

[`HashOrContent`](Client.HashOrContent.md)

#### Defined in

[packages/client/src/LocClient.ts:171](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L171)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/client/src/LocClient.ts:156](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L156)

___

### size

• `get` **size**(): `bigint`

#### Returns

`bigint`

#### Defined in

[packages/client/src/LocClient.ts:164](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L164)

## Methods

### finalize

▸ **finalize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:144](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L144)
