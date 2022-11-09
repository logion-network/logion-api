[API](../API.md) / [Modules](../modules.md) / [Node API](../modules/Node_API.md) / NormalizedNumber

# Class: NormalizedNumber

[Node API](../modules/Node_API.md).NormalizedNumber

## Table of contents

### Constructors

- [constructor](Node_API.NormalizedNumber.md#constructor)

### Methods

- [isNegative](Node_API.NormalizedNumber.md#isnegative)
- [isZero](Node_API.NormalizedNumber.md#iszero)
- [negate](Node_API.NormalizedNumber.md#negate)
- [split](Node_API.NormalizedNumber.md#split)
- [toFixedPrecision](Node_API.NormalizedNumber.md#tofixedprecision)
- [toFixedPrecisionDecimals](Node_API.NormalizedNumber.md#tofixedprecisiondecimals)
- [toInteger](Node_API.NormalizedNumber.md#tointeger)
- [toNumber](Node_API.NormalizedNumber.md#tonumber)
- [toString](Node_API.NormalizedNumber.md#tostring)
- [unnormalize](Node_API.NormalizedNumber.md#unnormalize)
- [zeroStripLeft](Node_API.NormalizedNumber.md#zerostripleft)
- [zeroStripRight](Node_API.NormalizedNumber.md#zerostripright)

## Constructors

### constructor

• **new NormalizedNumber**(`num`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `string` |

#### Defined in

[packages/node-api/src/numbers.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L21)

## Methods

### isNegative

▸ **isNegative**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/numbers.ts:137](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L137)

___

### isZero

▸ **isZero**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/numbers.ts:121](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L121)

___

### negate

▸ **negate**(): [`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Returns

[`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:125](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L125)

___

### split

▸ **split**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `decimalPart` | `string` |
| `integerPart` | `string` |
| `negative` | `boolean` |

#### Defined in

[packages/node-api/src/numbers.ts:77](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L77)

___

### toFixedPrecision

▸ **toFixedPrecision**(`decimals`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimals` | `number` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:109](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L109)

___

### toFixedPrecisionDecimals

▸ **toFixedPrecisionDecimals**(`decimals`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimals` | `number` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:113](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L113)

___

### toInteger

▸ **toInteger**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:97](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L97)

___

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Defined in

[packages/node-api/src/numbers.ts:117](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L117)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:73](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L73)

___

### unnormalize

▸ **unnormalize**(): `string`

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:85](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L85)

___

### zeroStripLeft

▸ `Static` **zeroStripLeft**(`num`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `string` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:61](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L61)

___

### zeroStripRight

▸ `Static` **zeroStripRight**(`num`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `string` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:69](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L69)
