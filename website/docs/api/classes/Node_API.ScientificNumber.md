[API](../API.md) / [Modules](../modules.md) / [Node API](../modules/Node_API.md) / ScientificNumber

# Class: ScientificNumber

[Node API](../modules/Node_API.md).ScientificNumber

## Table of contents

### Constructors

- [constructor](Node_API.ScientificNumber.md#constructor)

### Accessors

- [coefficient](Node_API.ScientificNumber.md#coefficient)
- [normalized](Node_API.ScientificNumber.md#normalized)
- [tenExponent](Node_API.ScientificNumber.md#tenexponent)

### Methods

- [convertTo](Node_API.ScientificNumber.md#convertto)
- [divideBy](Node_API.ScientificNumber.md#divideby)
- [limitDecimalDigits](Node_API.ScientificNumber.md#limitdecimaldigits)
- [limitIntegerDigits](Node_API.ScientificNumber.md#limitintegerdigits)
- [negate](Node_API.ScientificNumber.md#negate)
- [optimizeScale](Node_API.ScientificNumber.md#optimizescale)
- [toNumber](Node_API.ScientificNumber.md#tonumber)

## Constructors

### constructor

• **new ScientificNumber**(`coefficient`, `tenExponent`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coefficient` | `string` \| [`NormalizedNumber`](Node_API.NormalizedNumber.md) |
| `tenExponent` | `number` |

#### Defined in

[packages/node-api/src/numbers.ts:146](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L146)

## Accessors

### coefficient

• `get` **coefficient**(): [`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Returns

[`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:235](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L235)

___

### normalized

• `get` **normalized**(): [`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Returns

[`NormalizedNumber`](Node_API.NormalizedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:201](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L201)

___

### tenExponent

• `get` **tenExponent**(): `number`

#### Returns

`number`

#### Defined in

[packages/node-api/src/numbers.ts:205](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L205)

## Methods

### convertTo

▸ **convertTo**(`newTenExponent`): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newTenExponent` | `number` |

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:155](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L155)

___

### divideBy

▸ **divideBy**(`other`): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ScientificNumber`](Node_API.ScientificNumber.md) |

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:239](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L239)

___

### limitDecimalDigits

▸ **limitDecimalDigits**(`decimalPart`, `relevantDecimalPart`): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPart` | `string` |
| `relevantDecimalPart` | `string` |

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:230](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L230)

___

### limitIntegerDigits

▸ **limitIntegerDigits**(`integerPart`, `maxDigits`): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `integerPart` | `string` |
| `maxDigits` | `number` |

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:225](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L225)

___

### negate

▸ **negate**(): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:256](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L256)

___

### optimizeScale

▸ **optimizeScale**(`maxDigits`): [`ScientificNumber`](Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDigits` | `number` |

#### Returns

[`ScientificNumber`](Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:209](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L209)

___

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Defined in

[packages/node-api/src/numbers.ts:251](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L251)
