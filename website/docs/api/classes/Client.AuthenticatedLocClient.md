[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AuthenticatedLocClient

# Class: AuthenticatedLocClient

[Client](../modules/Client.md).AuthenticatedLocClient

## Hierarchy

- [`LocClient`](Client.LocClient.md)

  ↳ **`AuthenticatedLocClient`**

## Table of contents

### Constructors

- [constructor](Client.AuthenticatedLocClient.md#constructor)

### Properties

- [axiosFactory](Client.AuthenticatedLocClient.md#axiosfactory)
- [legalOfficer](Client.AuthenticatedLocClient.md#legalofficer)
- [nodeApi](Client.AuthenticatedLocClient.md#nodeapi)

### Methods

- [addCollectionItem](Client.AuthenticatedLocClient.md#addcollectionitem)
- [addFile](Client.AuthenticatedLocClient.md#addfile)
- [addMetadata](Client.AuthenticatedLocClient.md#addmetadata)
- [backend](Client.AuthenticatedLocClient.md#backend)
- [cancel](Client.AuthenticatedLocClient.md#cancel)
- [createLocRequest](Client.AuthenticatedLocClient.md#createlocrequest)
- [createSofRequest](Client.AuthenticatedLocClient.md#createsofrequest)
- [deleteFile](Client.AuthenticatedLocClient.md#deletefile)
- [deleteMetadata](Client.AuthenticatedLocClient.md#deletemetadata)
- [getCollectionItem](Client.AuthenticatedLocClient.md#getcollectionitem)
- [getCollectionItems](Client.AuthenticatedLocClient.md#getcollectionitems)
- [getCollectionSize](Client.AuthenticatedLocClient.md#getcollectionsize)
- [getDeliveries](Client.AuthenticatedLocClient.md#getdeliveries)
- [getLoc](Client.AuthenticatedLocClient.md#getloc)
- [getLocRequest](Client.AuthenticatedLocClient.md#getlocrequest)
- [rework](Client.AuthenticatedLocClient.md#rework)
- [submit](Client.AuthenticatedLocClient.md#submit)
- [uploadItemFile](Client.AuthenticatedLocClient.md#uploaditemfile)

## Constructors

### constructor

• **new AuthenticatedLocClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.componentFactory` | [`ComponentFactory`](../interfaces/Client.ComponentFactory.md) |
| `params.currentAddress` | `string` |
| `params.legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.nodeApi` | `ApiPromise` |
| `params.token` | `string` |

#### Overrides

[LocClient](Client.LocClient.md).[constructor](Client.LocClient.md#constructor)

#### Defined in

[packages/client/src/LocClient.ts:476](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L476)

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

### addCollectionItem

▸ **addCollectionItem**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddCollectionItemParams`](../interfaces/Client.AddCollectionItemParams.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:557](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L557)

___

### addFile

▸ **addFile**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddFileParams`](../interfaces/Client.AddFileParams.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:532](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L532)

___

### addMetadata

▸ **addMetadata**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddMetadataParams`](../interfaces/Client.AddMetadataParams.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:522](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L522)

___

### backend

▸ **backend**(): `AxiosInstance`

#### Returns

`AxiosInstance`

#### Overrides

[LocClient](Client.LocClient.md).[backend](Client.LocClient.md#backend)

#### Defined in

[packages/client/src/LocClient.ts:553](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L553)

___

### cancel

▸ **cancel**(`locId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:682](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L682)

___

### createLocRequest

▸ **createLocRequest**(`request`): `Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CreateLocRequest`](../interfaces/Client.CreateLocRequest.md) |

#### Returns

`Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Defined in

[packages/client/src/LocClient.ts:498](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L498)

___

### createSofRequest

▸ **createSofRequest**(`request`): `Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CreateSofRequest`](../interfaces/Client.CreateSofRequest.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<[`LocRequest`](../interfaces/Client.LocRequest.md)\>

#### Defined in

[packages/client/src/LocClient.ts:507](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L507)

___

### deleteFile

▸ **deleteFile**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`DeleteFileParams`](../interfaces/Client.DeleteFileParams.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:548](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L548)

___

### deleteMetadata

▸ **deleteMetadata**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`DeleteMetadataParams`](../interfaces/Client.DeleteMetadataParams.md) & [`FetchParameters`](../interfaces/Client.FetchParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:527](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L527)

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

[packages/client/src/LocClient.ts:672](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L672)

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

[packages/client/src/LocClient.ts:516](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L516)

___

### rework

▸ **rework**(`locId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:686](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L686)

___

### submit

▸ **submit**(`locId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:678](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L678)

___

### uploadItemFile

▸ **uploadItemFile**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.file` | [`ItemFileWithContent`](Client.ItemFileWithContent.md) |
| `parameters.itemId` | `string` |
| `parameters.locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/LocClient.ts:642](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L642)
