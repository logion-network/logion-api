[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / CollectionItem

# Class: CollectionItem

[Client](../modules/Client.md).CollectionItem

## Implements

- [`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md)

## Table of contents

### Constructors

- [constructor](Client.CollectionItem.md#constructor)

### Accessors

- [addedOn](Client.CollectionItem.md#addedon)
- [creativeCommons](Client.CollectionItem.md#creativecommons)
- [description](Client.CollectionItem.md#description)
- [files](Client.CollectionItem.md#files)
- [id](Client.CollectionItem.md#id)
- [locId](Client.CollectionItem.md#locid)
- [logionClassification](Client.CollectionItem.md#logionclassification)
- [restrictedDelivery](Client.CollectionItem.md#restricteddelivery)
- [specificLicenses](Client.CollectionItem.md#specificlicenses)
- [termsAndConditions](Client.CollectionItem.md#termsandconditions)
- [token](Client.CollectionItem.md#token)

### Methods

- [checkCertifiedCopy](Client.CollectionItem.md#checkcertifiedcopy)
- [checkHash](Client.CollectionItem.md#checkhash)
- [getItemFile](Client.CollectionItem.md#getitemfile)

## Constructors

### constructor

• **new CollectionItem**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.clientItem` | [`UploadableCollectionItem`](../interfaces/Client.UploadableCollectionItem.md) |
| `args.locClient` | [`LocClient`](Client.LocClient.md) |
| `args.locId` | [`UUID`](Node_API.UUID.md) |

#### Defined in

[packages/client/src/CollectionItem.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L10)

## Accessors

### addedOn

• `get` **addedOn**(): `string`

#### Returns

`string`

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[addedOn](../interfaces/Client.UploadableCollectionItem.md#addedon)

#### Defined in

[packages/client/src/CollectionItem.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L66)

___

### creativeCommons

• `get` **creativeCommons**(): `undefined` \| [`CreativeCommons`](Client.CreativeCommons.md)

#### Returns

`undefined` \| [`CreativeCommons`](Client.CreativeCommons.md)

#### Defined in

[packages/client/src/CollectionItem.ts:94](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L94)

___

### description

• `get` **description**(): `string`

#### Returns

`string`

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[description](../interfaces/Client.UploadableCollectionItem.md#description)

#### Defined in

[packages/client/src/CollectionItem.ts:62](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L62)

___

### files

• `get` **files**(): [`UploadableItemFile`](../interfaces/Client.UploadableItemFile.md)[]

#### Returns

[`UploadableItemFile`](../interfaces/Client.UploadableItemFile.md)[]

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[files](../interfaces/Client.UploadableCollectionItem.md#files)

#### Defined in

[packages/client/src/CollectionItem.ts:70](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L70)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[id](../interfaces/Client.UploadableCollectionItem.md#id)

#### Defined in

[packages/client/src/CollectionItem.ts:58](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L58)

___

### locId

• `get` **locId**(): [`UUID`](Node_API.UUID.md)

#### Returns

[`UUID`](Node_API.UUID.md)

#### Defined in

[packages/client/src/CollectionItem.ts:54](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L54)

___

### logionClassification

• `get` **logionClassification**(): `undefined` \| [`LogionClassification`](Client.LogionClassification.md)

#### Returns

`undefined` \| [`LogionClassification`](Client.LogionClassification.md)

#### Defined in

[packages/client/src/CollectionItem.ts:86](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L86)

___

### restrictedDelivery

• `get` **restrictedDelivery**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[restrictedDelivery](../interfaces/Client.UploadableCollectionItem.md#restricteddelivery)

#### Defined in

[packages/client/src/CollectionItem.ts:78](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L78)

___

### specificLicenses

• `get` **specificLicenses**(): [`SpecificLicense`](Client.SpecificLicense.md)[]

#### Returns

[`SpecificLicense`](Client.SpecificLicense.md)[]

#### Defined in

[packages/client/src/CollectionItem.ts:90](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L90)

___

### termsAndConditions

• `get` **termsAndConditions**(): [`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)[]

#### Returns

[`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)[]

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[termsAndConditions](../interfaces/Client.UploadableCollectionItem.md#termsandconditions)

#### Defined in

[packages/client/src/CollectionItem.ts:82](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L82)

___

### token

• `get` **token**(): `undefined` \| [`ItemTokenWithRestrictedType`](../interfaces/Client.ItemTokenWithRestrictedType.md)

#### Returns

`undefined` \| [`ItemTokenWithRestrictedType`](../interfaces/Client.ItemTokenWithRestrictedType.md)

#### Implementation of

[UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md).[token](../interfaces/Client.UploadableCollectionItem.md#token)

#### Defined in

[packages/client/src/CollectionItem.ts:74](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L74)

## Methods

### checkCertifiedCopy

▸ **checkCertifiedCopy**(`hash`): `Promise`<[`CheckCertifiedCopyResult`](../interfaces/Client.CheckCertifiedCopyResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`Promise`<[`CheckCertifiedCopyResult`](../interfaces/Client.CheckCertifiedCopyResult.md)\>

#### Defined in

[packages/client/src/CollectionItem.ts:108](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L108)

___

### checkHash

▸ **checkHash**(`hash`): [`CheckHashResult`](../interfaces/Client.CheckHashResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)

#### Defined in

[packages/client/src/CollectionItem.ts:102](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L102)

___

### getItemFile

▸ **getItemFile**(`hash`): `undefined` \| [`UploadableItemFile`](../interfaces/Client.UploadableItemFile.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`undefined` \| [`UploadableItemFile`](../interfaces/Client.UploadableItemFile.md)

#### Defined in

[packages/client/src/CollectionItem.ts:98](https://github.com/logion-network/logion-api/blob/main/packages/client/src/CollectionItem.ts#L98)
