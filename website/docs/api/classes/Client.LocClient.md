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

[packages/client/src/LocClient.ts:350](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L350)

## Properties

### axiosFactory

• `Protected` `Readonly` **axiosFactory**: [`AxiosFactory`](Client.AxiosFactory.md)

#### Defined in

[packages/client/src/LocClient.ts:360](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L360)

___

### legalOfficer

• `Protected` `Readonly` **legalOfficer**: [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)

#### Defined in

[packages/client/src/LocClient.ts:362](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L362)

___

### nodeApi

• `Protected` `Readonly` **nodeApi**: `ApiPromise`

#### Defined in

[packages/client/src/LocClient.ts:361](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L361)

## Methods

### backend

▸ `Protected` **backend**(): `AxiosInstance`

#### Returns

`AxiosInstance`

#### Defined in

[packages/client/src/LocClient.ts:368](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L368)

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

[packages/client/src/LocClient.ts:372](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L372)

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

[packages/client/src/LocClient.ts:414](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L414)

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

[packages/client/src/LocClient.ts:446](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L446)

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

[packages/client/src/LocClient.ts:456](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L456)

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

[packages/client/src/LocClient.ts:364](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L364)

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

[packages/client/src/LocClient.ts:454](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L454)
