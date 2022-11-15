[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / PublicApi

# Class: PublicApi

[Client](../modules/Client.md).PublicApi

## Table of contents

### Constructors

- [constructor](Client.PublicApi.md#constructor)

### Methods

- [findCollectionLocItemById](Client.PublicApi.md#findcollectionlocitembyid)
- [findLocById](Client.PublicApi.md#findlocbyid)

## Constructors

### constructor

• **new PublicApi**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Defined in

[packages/client/src/Public.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L10)

## Methods

### findCollectionLocItemById

▸ **findCollectionLocItemById**(`params`): `Promise`<`undefined` \| [`CollectionItem`](Client.CollectionItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.itemId` | `string` |
| `params.locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

`Promise`<`undefined` \| [`CollectionItem`](Client.CollectionItem.md)\>

#### Defined in

[packages/client/src/Public.ts:53](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L53)

___

### findLocById

▸ **findLocById**(`params`): `Promise`<`undefined` \| [`PublicLoc`](Client.PublicLoc.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`undefined` \| [`PublicLoc`](Client.PublicLoc.md)\>

#### Defined in

[packages/client/src/Public.ts:18](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L18)
