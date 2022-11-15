[API](../API.md) / [Modules](../modules.md) / [Node API](../modules/Node_API.md) / UUID

# Class: UUID

[Node API](../modules/Node_API.md).UUID

## Table of contents

### Constructors

- [constructor](Node_API.UUID.md#constructor)

### Methods

- [toDecimalString](Node_API.UUID.md#todecimalstring)
- [toHexString](Node_API.UUID.md#tohexstring)
- [toString](Node_API.UUID.md#tostring)
- [fromAnyString](Node_API.UUID.md#fromanystring)
- [fromDecimalString](Node_API.UUID.md#fromdecimalstring)
- [fromDecimalStringOrThrow](Node_API.UUID.md#fromdecimalstringorthrow)

## Constructors

### constructor

• **new UUID**(`value?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `string` \| `number`[] |

#### Defined in

[packages/node-api/src/UUID.ts:6](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L6)

## Methods

### toDecimalString

▸ **toDecimalString**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/UUID.ts:51](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L51)

___

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/UUID.ts:47](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L47)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/UUID.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L43)

___

### fromAnyString

▸ `Static` **fromAnyString**(`value`): `undefined` \| [`UUID`](Node_API.UUID.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`undefined` \| [`UUID`](Node_API.UUID.md)

#### Defined in

[packages/node-api/src/UUID.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L17)

___

### fromDecimalString

▸ `Static` **fromDecimalString**(`value`): `undefined` \| [`UUID`](Node_API.UUID.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`undefined` \| [`UUID`](Node_API.UUID.md)

#### Defined in

[packages/node-api/src/UUID.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L25)

___

### fromDecimalStringOrThrow

▸ `Static` **fromDecimalStringOrThrow**(`value`): [`UUID`](Node_API.UUID.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`UUID`](Node_API.UUID.md)

#### Defined in

[packages/node-api/src/UUID.ts:33](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L33)
