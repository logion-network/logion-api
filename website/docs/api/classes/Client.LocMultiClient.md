[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocMultiClient

# Class: LocMultiClient

[Client](../modules/Client.md).LocMultiClient

## Table of contents

### Constructors

- [constructor](Client.LocMultiClient.md#constructor)

### Methods

- [fetchAll](Client.LocMultiClient.md#fetchall)
- [getLoc](Client.LocMultiClient.md#getloc)
- [newLocClient](Client.LocMultiClient.md#newlocclient)
- [getLoc](Client.LocMultiClient.md#getloc-1)
- [newLocMultiClient](Client.LocMultiClient.md#newlocmulticlient)

## Constructors

### constructor

• **new LocMultiClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.componentFactory` | [`ComponentFactory`](../interfaces/Client.ComponentFactory.md) |
| `params.currentAddress` | `string` |
| `params.networkState` | [`NetworkState`](Client.NetworkState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\> |
| `params.nodeApi` | `ApiPromise` |
| `params.token` | `string` |

#### Defined in

[packages/client/src/LocClient.ts:235](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L235)

## Methods

### fetchAll

▸ **fetchAll**(`params?`): `Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`FetchAllLocsParams`](../interfaces/Client.FetchAllLocsParams.md) |

#### Returns

`Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)[]\>

#### Defined in

[packages/client/src/LocClient.ts:274](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L274)

___

### getLoc

▸ **getLoc**(`parameters`): `Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Defined in

[packages/client/src/LocClient.ts:298](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L298)

___

### newLocClient

▸ **newLocClient**(`legalOfficer`): [`AuthenticatedLocClient`](Client.AuthenticatedLocClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

[`AuthenticatedLocClient`](Client.AuthenticatedLocClient.md)

#### Defined in

[packages/client/src/LocClient.ts:263](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L263)

___

### getLoc

▸ `Static` **getLoc**(`params`): `Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetLegalOfficerCaseParameters`](../interfaces/Node_API.GetLegalOfficerCaseParameters.md) |

#### Returns

`Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Defined in

[packages/client/src/LocClient.ts:305](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L305)

___

### newLocMultiClient

▸ `Static` **newLocMultiClient**(`sharedState`): [`LocMultiClient`](Client.LocMultiClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Returns

[`LocMultiClient`](Client.LocMultiClient.md)

#### Defined in

[packages/client/src/LocClient.ts:223](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L223)
