[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AnySourceHttpClient

# Class: AnySourceHttpClient<E, R\>

[Client](../modules/Client.md).AnySourceHttpClient

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |
| `R` | `R` |

## Table of contents

### Constructors

- [constructor](Client.AnySourceHttpClient.md#constructor)

### Methods

- [fetch](Client.AnySourceHttpClient.md#fetch)
- [getState](Client.AnySourceHttpClient.md#getstate)

## Constructors

### constructor

• **new AnySourceHttpClient**<`E`, `R`\>(`initialState`, `axiosFactory`, `token?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | [`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\> |
| `axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `token?` | `string` |

#### Defined in

[packages/client/src/Http.ts:99](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L99)

## Methods

### fetch

▸ **fetch**(`query`): `Promise`<`undefined` \| `R`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../modules/Client.md#query)<`E`, `R`\> |

#### Returns

`Promise`<`undefined` \| `R`\>

#### Defined in

[packages/client/src/Http.ts:114](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L114)

___

### getState

▸ **getState**(): [`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Returns

[`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Defined in

[packages/client/src/Http.ts:132](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L132)
