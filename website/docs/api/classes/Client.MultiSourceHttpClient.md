[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / MultiSourceHttpClient

# Class: MultiSourceHttpClient<E, R\>

[Client](../modules/Client.md).MultiSourceHttpClient

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |
| `R` | `R` |

## Table of contents

### Constructors

- [constructor](Client.MultiSourceHttpClient.md#constructor)

### Methods

- [fetch](Client.MultiSourceHttpClient.md#fetch)
- [getState](Client.MultiSourceHttpClient.md#getstate)

## Constructors

### constructor

• **new MultiSourceHttpClient**<`E`, `R`\>(`initialState`, `axiosFactory`, `token?`)

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

[packages/client/src/Http.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L36)

## Methods

### fetch

▸ **fetch**(`query`): `Promise`<[`MultiResponse`](../modules/Client.md#multiresponse)<`R`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../modules/Client.md#query)<`E`, `R`\> |

#### Returns

`Promise`<[`MultiResponse`](../modules/Client.md#multiresponse)<`R`\>\>

#### Defined in

[packages/client/src/Http.ts:51](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L51)

___

### getState

▸ **getState**(): [`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Returns

[`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Defined in

[packages/client/src/Http.ts:70](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L70)
