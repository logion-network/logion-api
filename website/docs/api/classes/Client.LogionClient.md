[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LogionClient

# Class: LogionClient

[Client](../modules/Client.md).LogionClient

## Table of contents

### Constructors

- [constructor](Client.LogionClient.md#constructor)

### Accessors

- [allLegalOfficers](Client.LogionClient.md#alllegalofficers)
- [config](Client.LogionClient.md#config)
- [currentAddress](Client.LogionClient.md#currentaddress)
- [directoryClient](Client.LogionClient.md#directoryclient)
- [legalOfficers](Client.LogionClient.md#legalofficers)
- [nodeApi](Client.LogionClient.md#nodeapi)
- [public](Client.LogionClient.md#public)
- [tokens](Client.LogionClient.md#tokens)

### Methods

- [authenticate](Client.LogionClient.md#authenticate)
- [balanceState](Client.LogionClient.md#balancestate)
- [buildAxios](Client.LogionClient.md#buildaxios)
- [disconnect](Client.LogionClient.md#disconnect)
- [isLegalOfficer](Client.LogionClient.md#islegalofficer)
- [isProtected](Client.LogionClient.md#isprotected)
- [isRegisteredLegalOfficer](Client.LogionClient.md#isregisteredlegalofficer)
- [isTokenValid](Client.LogionClient.md#istokenvalid)
- [isValidAddress](Client.LogionClient.md#isvalidaddress)
- [locsState](Client.LogionClient.md#locsstate)
- [logout](Client.LogionClient.md#logout)
- [protectionState](Client.LogionClient.md#protectionstate)
- [refreshTokens](Client.LogionClient.md#refreshtokens)
- [useTokens](Client.LogionClient.md#usetokens)
- [withCurrentAddress](Client.LogionClient.md#withcurrentaddress)
- [create](Client.LogionClient.md#create)

## Constructors

### constructor

• **new LogionClient**(`sharedState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Defined in

[packages/client/src/LogionClient.ts:47](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L47)

## Accessors

### allLegalOfficers

• `get` **allLegalOfficers**(): [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Returns

[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/LogionClient.ts:76](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L76)

___

### config

• `get` **config**(): [`LogionClientConfig`](../interfaces/Client.LogionClientConfig.md)

#### Returns

[`LogionClientConfig`](../interfaces/Client.LogionClientConfig.md)

#### Defined in

[packages/client/src/LogionClient.ts:56](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L56)

___

### currentAddress

• `get` **currentAddress**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/client/src/LogionClient.ts:60](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L60)

___

### directoryClient

• `get` **directoryClient**(): [`DirectoryClient`](Client.DirectoryClient.md)

#### Returns

[`DirectoryClient`](Client.DirectoryClient.md)

#### Defined in

[packages/client/src/LogionClient.ts:68](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L68)

___

### legalOfficers

• `get` **legalOfficers**(): [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Returns

[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/LogionClient.ts:72](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L72)

___

### nodeApi

• `get` **nodeApi**(): `ApiPromise`

#### Returns

`ApiPromise`

#### Defined in

[packages/client/src/LogionClient.ts:80](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L80)

___

### public

• `get` **public**(): [`PublicApi`](Client.PublicApi.md)

#### Returns

[`PublicApi`](Client.PublicApi.md)

#### Defined in

[packages/client/src/LogionClient.ts:252](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L252)

___

### tokens

• `get` **tokens**(): [`AccountTokens`](Client.AccountTokens.md)

#### Returns

[`AccountTokens`](Client.AccountTokens.md)

#### Defined in

[packages/client/src/LogionClient.ts:64](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L64)

## Methods

### authenticate

▸ **authenticate**(`addresses`, `signer`): `Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addresses` | `string`[] |
| `signer` | [`RawSigner`](../interfaces/Client.RawSigner.md) |

#### Returns

`Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Defined in

[packages/client/src/LogionClient.ts:186](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L186)

___

### balanceState

▸ **balanceState**(): `Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Returns

`Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Defined in

[packages/client/src/LogionClient.ts:223](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L223)

___

### buildAxios

▸ **buildAxios**(`legalOfficer`): `AxiosInstance`

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

`AxiosInstance`

#### Defined in

[packages/client/src/LogionClient.ts:215](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L215)

___

### disconnect

▸ **disconnect**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LogionClient.ts:257](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L257)

___

### isLegalOfficer

▸ **isLegalOfficer**(`address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/LogionClient.ts:204](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L204)

___

### isProtected

▸ **isProtected**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/client/src/LogionClient.ts:234](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L234)

___

### isRegisteredLegalOfficer

▸ **isRegisteredLegalOfficer**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/client/src/LogionClient.ts:209](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L209)

___

### isTokenValid

▸ **isTokenValid**(`now`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `now` | `DateTime` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/LogionClient.ts:182](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L182)

___

### isValidAddress

▸ **isValidAddress**(`address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/LogionClient.ts:243](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L243)

___

### locsState

▸ **locsState**(`params?`): `Promise`<[`LocsState`](Client.LocsState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`FetchAllLocsParams`](../interfaces/Client.FetchAllLocsParams.md) |

#### Returns

`Promise`<[`LocsState`](Client.LocsState.md)\>

#### Defined in

[packages/client/src/LogionClient.ts:247](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L247)

___

### logout

▸ **logout**(): [`LogionClient`](Client.LogionClient.md)

#### Returns

[`LogionClient`](Client.LogionClient.md)

#### Defined in

[packages/client/src/LogionClient.ts:146](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L146)

___

### protectionState

▸ **protectionState**(): `Promise`<[`ProtectionState`](../modules/Client.md#protectionstate)\>

#### Returns

`Promise`<[`ProtectionState`](../modules/Client.md#protectionstate)\>

#### Defined in

[packages/client/src/LogionClient.ts:168](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L168)

___

### refreshTokens

▸ **refreshTokens**(`now`, `threshold?`): `Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `now` | `DateTime` |
| `threshold?` | `DurationLike` |

#### Returns

`Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Defined in

[packages/client/src/LogionClient.ts:98](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L98)

___

### useTokens

▸ **useTokens**(`tokens`): [`LogionClient`](Client.LogionClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | [`AccountTokens`](Client.AccountTokens.md) |

#### Returns

[`LogionClient`](Client.LogionClient.md)

#### Defined in

[packages/client/src/LogionClient.ts:84](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L84)

___

### withCurrentAddress

▸ **withCurrentAddress**(`currentAddress?`): [`LogionClient`](Client.LogionClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentAddress?` | `string` |

#### Returns

[`LogionClient`](Client.LogionClient.md)

#### Defined in

[packages/client/src/LogionClient.ts:124](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L124)

___

### create

▸ `Static` **create**(`config`): `Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LogionClientConfig`](../interfaces/Client.LogionClientConfig.md) |

#### Returns

`Promise`<[`LogionClient`](Client.LogionClient.md)\>

#### Defined in

[packages/client/src/LogionClient.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L21)
