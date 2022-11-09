[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / HashOrContent

# Class: HashOrContent

[Client](../modules/Client.md).HashOrContent

## Table of contents

### Constructors

- [constructor](Client.HashOrContent.md#constructor)

### Accessors

- [content](Client.HashOrContent.md#content)
- [contentHash](Client.HashOrContent.md#contenthash)
- [hasContent](Client.HashOrContent.md#hascontent)
- [size](Client.HashOrContent.md#size)

### Methods

- [finalize](Client.HashOrContent.md#finalize)
- [fromContent](Client.HashOrContent.md#fromcontent)
- [fromContentFinalized](Client.HashOrContent.md#fromcontentfinalized)
- [fromHash](Client.HashOrContent.md#fromhash)

## Constructors

### constructor

• **new HashOrContent**(`parameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.content?` | [`FileLike`](../modules/Client.md#filelike) |
| `parameters.hash?` | `string` |

#### Defined in

[packages/client/src/Hash.ts:81](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L81)

## Accessors

### content

• `get` **content**(): [`FileLike`](../modules/Client.md#filelike)

#### Returns

[`FileLike`](../modules/Client.md#filelike)

#### Defined in

[packages/client/src/Hash.ts:149](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L149)

___

### contentHash

• `get` **contentHash**(): `string`

#### Returns

`string`

#### Defined in

[packages/client/src/Hash.ts:105](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L105)

___

### hasContent

• `get` **hasContent**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/client/src/Hash.ts:101](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L101)

___

### size

• `get` **size**(): `undefined` \| `bigint`

#### Returns

`undefined` \| `bigint`

#### Defined in

[packages/client/src/Hash.ts:157](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L157)

## Methods

### finalize

▸ **finalize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/Hash.ts:116](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L116)

___

### fromContent

▸ `Static` **fromContent**(`content`): [`HashOrContent`](Client.HashOrContent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [`FileLike`](../modules/Client.md#filelike) |

#### Returns

[`HashOrContent`](Client.HashOrContent.md)

#### Defined in

[packages/client/src/Hash.ts:71](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L71)

___

### fromContentFinalized

▸ `Static` **fromContentFinalized**(`fileContent`): `Promise`<[`HashOrContent`](Client.HashOrContent.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileContent` | [`FileLike`](../modules/Client.md#filelike) |

#### Returns

`Promise`<[`HashOrContent`](Client.HashOrContent.md)\>

#### Defined in

[packages/client/src/Hash.ts:75](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L75)

___

### fromHash

▸ `Static` **fromHash**(`hash`): [`HashOrContent`](Client.HashOrContent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

[`HashOrContent`](Client.HashOrContent.md)

#### Defined in

[packages/client/src/Hash.ts:67](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L67)
