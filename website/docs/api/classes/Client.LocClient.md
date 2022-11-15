[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocClient

# Class: LocClient

[Client](../modules/Client.md).LocClient

## Hierarchy

- **`LocClient`**

  ↳ [`PublicLocClient`](Client.PublicLocClient.md)

  ↳ [`AuthenticatedLocClient`](Client.AuthenticatedLocClient.md)

## Table of contents

### Constructors

- [constructor](Client.LocClient.md#constructor)

### Properties

- [axiosFactory](Client.LocClient.md#axiosfactory)
- [legalOfficer](Client.LocClient.md#legalofficer)
- [nodeApi](Client.LocClient.md#nodeapi)

### Methods

- [backend](Client.LocClient.md#backend)
- [getCollectionItem](Client.LocClient.md#getcollectionitem)
- [getCollectionItems](Client.LocClient.md#getcollectionitems)
- [getCollectionSize](Client.LocClient.md#getcollectionsize)
- [getDeliveries](Client.LocClient.md#getdeliveries)
- [getLoc](Client.LocClient.md#getloc)
- [getLocRequest](Client.LocClient.md#getlocrequest)

## Constructors

### constructor

• **new LocClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.nodeApi` | `ApiPromise` |

#### Defined in

[packages/client/src/LocClient.ts:351](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L351)

## Properties

### axiosFactory

• `Protected` `Readonly` **axiosFactory**: [`AxiosFactory`](Client.AxiosFactory.md)

#### Defined in

[packages/client/src/LocClient.ts:361](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L361)

___

### legalOfficer

• `Protected` `Readonly` **legalOfficer**: [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)

#### Defined in

[packages/client/src/LocClient.ts:363](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L363)

___

### nodeApi

• `Protected` `Readonly` **nodeApi**: `ApiPromise`

#### Defined in

[packages/client/src/LocClient.ts:362](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L362)

## Methods

### backend

▸ `Protected` **backend**(): `AxiosInstance`

#### Returns

`AxiosInstance`

#### Defined in

[packages/client/src/LocClient.ts:369](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L369)

___

### getCollectionItem

▸ **getCollectionItem**(`parameters`): `Promise`<`undefined` \| [`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | { `itemId`: `string`  } & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`undefined` \| [`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md)\>

#### Defined in

[packages/client/src/LocClient.ts:373](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L373)

___

### getCollectionItems

▸ **getCollectionItems**(`parameters`): `Promise`<[`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md)[]\>

#### Defined in

[packages/client/src/LocClient.ts:415](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L415)

___

### getCollectionSize

▸ **getCollectionSize**(`parameters`): `Promise`<`undefined` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`undefined` \| `number`\>

#### Defined in

[packages/client/src/LocClient.ts:447](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L447)

___

### getDeliveries

▸ `Abstract` **getDeliveries**(`parameters`): `Promise`<[`ItemDeliveries`](../interfaces/Client.ItemDeliveries.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetDeliveriesRequest`](../interfaces/Client.GetDeliveriesRequest.md) |

#### Returns

`Promise`<[`ItemDeliveries`](../interfaces/Client.ItemDeliveries.md)\>

#### Defined in

[packages/client/src/LocClient.ts:457](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L457)

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

[packages/client/src/LocClient.ts:365](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L365)

___

### getLocRequest

▸ `Abstract` **getLocRequest**(`parameters`): `Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Defined in

[packages/client/src/LocClient.ts:455](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L455)
