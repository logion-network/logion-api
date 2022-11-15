[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / PublicLoc

# Class: PublicLoc

[Client](../modules/Client.md).PublicLoc

## Table of contents

### Constructors

- [constructor](Client.PublicLoc.md#constructor)

### Accessors

- [data](Client.PublicLoc.md#data)

### Methods

- [checkHash](Client.PublicLoc.md#checkhash)
- [isLogionDataLoc](Client.PublicLoc.md#islogiondataloc)
- [isLogionIdentityLoc](Client.PublicLoc.md#islogionidentityloc)

## Constructors

### constructor

• **new PublicLoc**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`PublicLocClient`](Client.PublicLocClient.md) |
| `args.data` | [`LocData`](../interfaces/Client.LocData.md) |

#### Defined in

[packages/client/src/Public.ts:70](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L70)

## Accessors

### data

• `get` **data**(): [`LocData`](../interfaces/Client.LocData.md)

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Defined in

[packages/client/src/Public.ts:82](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L82)

## Methods

### checkHash

▸ **checkHash**(`hash`, `itemId?`): `Promise`<[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `itemId?` | `string` |

#### Returns

`Promise`<[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)\>

#### Defined in

[packages/client/src/Public.ts:86](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L86)

___

### isLogionDataLoc

▸ **isLogionDataLoc**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/client/src/Public.ts:116](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L116)

___

### isLogionIdentityLoc

▸ **isLogionIdentityLoc**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/client/src/Public.ts:112](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Public.ts#L112)
