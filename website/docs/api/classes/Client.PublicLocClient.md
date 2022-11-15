[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / PublicLocClient

# Class: PublicLocClient

[Client](../modules/Client.md).PublicLocClient

## Hierarchy

- [`LocClient`](Client.LocClient.md)

  ↳ **`PublicLocClient`**

## Table of contents

### Constructors

- [constructor](Client.PublicLocClient.md#constructor)

### Properties

- [axiosFactory](Client.PublicLocClient.md#axiosfactory)
- [legalOfficer](Client.PublicLocClient.md#legalofficer)
- [nodeApi](Client.PublicLocClient.md#nodeapi)

### Methods

- [backend](Client.PublicLocClient.md#backend)
- [getCollectionItem](Client.PublicLocClient.md#getcollectionitem)
- [getCollectionItems](Client.PublicLocClient.md#getcollectionitems)
- [getCollectionSize](Client.PublicLocClient.md#getcollectionsize)
- [getDeliveries](Client.PublicLocClient.md#getdeliveries)
- [getLoc](Client.PublicLocClient.md#getloc)
- [getLocRequest](Client.PublicLocClient.md#getlocrequest)

## Constructors

### constructor

• **new PublicLocClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.nodeApi` | `ApiPromise` |

#### Inherited from

[LocClient](Client.LocClient.md).[constructor](Client.LocClient.md#constructor)

#### Defined in

[packages/client/src/LocClient.ts:350](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L350)

## Properties

### axiosFactory

• `Protected` `Readonly` **axiosFactory**: [`AxiosFactory`](Client.AxiosFactory.md)

#### Inherited from

[LocClient](Client.LocClient.md).[axiosFactory](Client.LocClient.md#axiosfactory)

#### Defined in

[packages/client/src/LocClient.ts:360](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L360)

___

### legalOfficer

• `Protected` `Readonly` **legalOfficer**: [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)

#### Inherited from

[LocClient](Client.LocClient.md).[legalOfficer](Client.LocClient.md#legalofficer)

#### Defined in

[packages/client/src/LocClient.ts:362](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L362)

___

### nodeApi

• `Protected` `Readonly` **nodeApi**: `ApiPromise`

#### Inherited from

[LocClient](Client.LocClient.md).[nodeApi](Client.LocClient.md#nodeapi)

#### Defined in

[packages/client/src/LocClient.ts:361](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L361)

## Methods

### backend

▸ `Protected` **backend**(): `AxiosInstance`

#### Returns

`AxiosInstance`

#### Inherited from

[LocClient](Client.LocClient.md).[backend](Client.LocClient.md#backend)

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

#### Inherited from

[LocClient](Client.LocClient.md).[getCollectionItem](Client.LocClient.md#getcollectionitem)

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

#### Inherited from

[LocClient](Client.LocClient.md).[getCollectionItems](Client.LocClient.md#getcollectionitems)

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

#### Inherited from

[LocClient](Client.LocClient.md).[getCollectionSize](Client.LocClient.md#getcollectionsize)

#### Defined in

[packages/client/src/LocClient.ts:446](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L446)

___

### getDeliveries

▸ **getDeliveries**(`parameters`): `Promise`<[`ItemDeliveries`](../interfaces/Client.ItemDeliveries.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetDeliveriesRequest`](../interfaces/Client.GetDeliveriesRequest.md) |

#### Returns

`Promise`<[`ItemDeliveries`](../interfaces/Client.ItemDeliveries.md)\>

#### Overrides

[LocClient](Client.LocClient.md).[getDeliveries](Client.LocClient.md#getdeliveries)

#### Defined in

[packages/client/src/LocClient.ts:467](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L467)

___

### getLoc

▸ **getLoc**(`parameters`): `Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>

#### Inherited from

[LocClient](Client.LocClient.md).[getLoc](Client.LocClient.md#getloc)

#### Defined in

[packages/client/src/LocClient.ts:364](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L364)

___

### getLocRequest

▸ **getLocRequest**(`parameters`): `Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Overrides

[LocClient](Client.LocClient.md).[getLocRequest](Client.LocClient.md#getlocrequest)

#### Defined in

[packages/client/src/LocClient.ts:461](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L461)
