[API](../API.md) / [Modules](../modules.md) / [Node API](../modules/Node_API.md) / PrefixedNumber

# Class: PrefixedNumber

[Node API](../modules/Node_API.md).PrefixedNumber

## Table of contents

### Constructors

- [constructor](Node_API.PrefixedNumber.md#constructor)

### Properties

- [ZERO](Node_API.PrefixedNumber.md#zero)

### Accessors

- [coefficient](Node_API.PrefixedNumber.md#coefficient)
- [prefix](Node_API.PrefixedNumber.md#prefix)

### Methods

- [add](Node_API.PrefixedNumber.md#add)
- [convertTo](Node_API.PrefixedNumber.md#convertto)
- [isNegative](Node_API.PrefixedNumber.md#isnegative)
- [negate](Node_API.PrefixedNumber.md#negate)
- [optimizeScale](Node_API.PrefixedNumber.md#optimizescale)
- [subtract](Node_API.PrefixedNumber.md#subtract)
- [toNumber](Node_API.PrefixedNumber.md#tonumber)

## Constructors

### constructor

• **new PrefixedNumber**(`num`, `prefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `string` \| [`NormalizedNumber`](Node_API.NormalizedNumber.md) |
| `prefix` | [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md) |

#### Defined in

[packages/node-api/src/numbers.ts:272](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L272)

## Properties

### ZERO

▪ `Static` **ZERO**: [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:267](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L267)

## Accessors

### coefficient

• `get` **coefficient**(): [`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Returns

[`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:292](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L292)

___

### prefix

• `get` **prefix**(): [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Returns

[`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:282](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L282)

## Methods

### add

▸ **add**(`other`): [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`PrefixedNumber`](Node_API.PrefixedNumber.md) |

#### Returns

[`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:308](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L308)

___

### convertTo

▸ **convertTo**(`prefix`): [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md) |

#### Returns

[`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:277](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L277)

___

### isNegative

▸ **isNegative**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/numbers.ts:304](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L304)

___

### negate

▸ **negate**(): [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Returns

[`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:300](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L300)

___

### optimizeScale

▸ **optimizeScale**(`maxDigits`): [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDigits` | `number` |

#### Returns

[`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:286](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L286)

___

### subtract

▸ **subtract**(`other`): [`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`PrefixedNumber`](Node_API.PrefixedNumber.md) |

#### Returns

[`PrefixedNumber`](Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:315](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L315)

___

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Defined in

[packages/node-api/src/numbers.ts:296](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L296)
