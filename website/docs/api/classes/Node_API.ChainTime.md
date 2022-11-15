[API](../API.md) / [Modules](../modules.md) / [Node API](../modules/Node_API.md) / ChainTime

# Class: ChainTime

[Node API](../modules/Node_API.md).ChainTime

## Table of contents

### Constructors

- [constructor](Node_API.ChainTime.md#constructor)

### Accessors

- [currentBlock](Node_API.ChainTime.md#currentblock)
- [currentTime](Node_API.ChainTime.md#currenttime)

### Methods

- [atBlock](Node_API.ChainTime.md#atblock)
- [atDate](Node_API.ChainTime.md#atdate)
- [now](Node_API.ChainTime.md#now)

## Constructors

### constructor

• **new ChainTime**(`api`, `now`, `currentBlock`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `now` | `number` |
| `currentBlock` | `bigint` |

#### Defined in

[packages/node-api/src/ChainTime.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L10)

## Accessors

### currentBlock

• `get` **currentBlock**(): `bigint`

#### Returns

`bigint`

#### Defined in

[packages/node-api/src/ChainTime.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L24)

___

### currentTime

• `get` **currentTime**(): `number`

#### Returns

`number`

#### Defined in

[packages/node-api/src/ChainTime.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L20)

## Methods

### atBlock

▸ **atBlock**(`blockNumber`): `Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `bigint` |

#### Returns

`Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Defined in

[packages/node-api/src/ChainTime.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L36)

___

### atDate

▸ **atDate**(`date`): `Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Defined in

[packages/node-api/src/ChainTime.ts:28](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L28)

___

### now

▸ `Static` **now**(`api`): `Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |

#### Returns

`Promise`<[`ChainTime`](Node_API.ChainTime.md)\>

#### Defined in

[packages/node-api/src/ChainTime.ts:5](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/ChainTime.ts#L5)
