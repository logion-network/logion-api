[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AccountTokens

# Class: AccountTokens

[Client](../modules/Client.md).AccountTokens

## Table of contents

### Constructors

- [constructor](Client.AccountTokens.md#constructor)

### Accessors

- [addresses](Client.AccountTokens.md#addresses)
- [length](Client.AccountTokens.md#length)

### Methods

- [cleanUp](Client.AccountTokens.md#cleanup)
- [earliestExpiration](Client.AccountTokens.md#earliestexpiration)
- [equals](Client.AccountTokens.md#equals)
- [get](Client.AccountTokens.md#get)
- [isAuthenticated](Client.AccountTokens.md#isauthenticated)
- [merge](Client.AccountTokens.md#merge)

## Constructors

### constructor

• **new AccountTokens**(`initialState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `Record`<`string`, [`Token`](../interfaces/Client.Token.md)\> |

#### Defined in

[packages/client/src/AuthenticationClient.ts:125](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L125)

## Accessors

### addresses

• `get` **addresses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[packages/client/src/AuthenticationClient.ts:143](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L143)

___

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Defined in

[packages/client/src/AuthenticationClient.ts:173](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L173)

## Methods

### cleanUp

▸ **cleanUp**(`now`): [`AccountTokens`](Client.AccountTokens.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `now` | `DateTime` |

#### Returns

[`AccountTokens`](Client.AccountTokens.md)

#### Defined in

[packages/client/src/AuthenticationClient.ts:147](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L147)

___

### earliestExpiration

▸ **earliestExpiration**(): `undefined` \| `DateTime`

#### Returns

`undefined` \| `DateTime`

#### Defined in

[packages/client/src/AuthenticationClient.ts:189](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L189)

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`AccountTokens`](Client.AccountTokens.md) |

#### Returns

`boolean`

#### Defined in

[packages/client/src/AuthenticationClient.ts:158](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L158)

___

### get

▸ **get**(`address`): `undefined` \| [`Token`](../interfaces/Client.Token.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`undefined` \| [`Token`](../interfaces/Client.Token.md)

#### Defined in

[packages/client/src/AuthenticationClient.ts:131](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L131)

___

### isAuthenticated

▸ **isAuthenticated**(`now`, `address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `now` | `DateTime` |
| `address` | `undefined` \| `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/AuthenticationClient.ts:177](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L177)

___

### merge

▸ **merge**(`tokens`): [`AccountTokens`](Client.AccountTokens.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | [`AccountTokens`](Client.AccountTokens.md) |

#### Returns

[`AccountTokens`](Client.AccountTokens.md)

#### Defined in

[packages/client/src/AuthenticationClient.ts:135](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L135)
