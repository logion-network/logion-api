[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AddCollectionItemParams

# Interface: AddCollectionItemParams

[Client](../modules/Client.md).AddCollectionItemParams

## Table of contents

### Properties

- [callback](Client.AddCollectionItemParams.md#callback)
- [creativeCommons](Client.AddCollectionItemParams.md#creativecommons)
- [itemDescription](Client.AddCollectionItemParams.md#itemdescription)
- [itemFiles](Client.AddCollectionItemParams.md#itemfiles)
- [itemId](Client.AddCollectionItemParams.md#itemid)
- [itemToken](Client.AddCollectionItemParams.md#itemtoken)
- [logionClassification](Client.AddCollectionItemParams.md#logionclassification)
- [restrictedDelivery](Client.AddCollectionItemParams.md#restricteddelivery)
- [signer](Client.AddCollectionItemParams.md#signer)
- [specificLicenses](Client.AddCollectionItemParams.md#specificlicenses)

## Properties

### callback

• `Optional` **callback**: [`SignCallback`](../modules/Client.md#signcallback)

#### Defined in

[packages/client/src/LocClient.ts:185](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L185)

___

### creativeCommons

• `Optional` **creativeCommons**: [`CreativeCommons`](../classes/Client.CreativeCommons.md)

#### Defined in

[packages/client/src/LocClient.ts:183](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L183)

___

### itemDescription

• **itemDescription**: `string`

#### Defined in

[packages/client/src/LocClient.ts:177](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L177)

___

### itemFiles

• `Optional` **itemFiles**: [`ItemFileWithContent`](../classes/Client.ItemFileWithContent.md)[]

#### Defined in

[packages/client/src/LocClient.ts:178](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L178)

___

### itemId

• **itemId**: `string`

#### Defined in

[packages/client/src/LocClient.ts:176](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L176)

___

### itemToken

• `Optional` **itemToken**: [`ItemTokenWithRestrictedType`](Client.ItemTokenWithRestrictedType.md)

#### Defined in

[packages/client/src/LocClient.ts:179](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L179)

___

### logionClassification

• `Optional` **logionClassification**: [`LogionClassification`](../classes/Client.LogionClassification.md)

#### Defined in

[packages/client/src/LocClient.ts:181](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L181)

___

### restrictedDelivery

• `Optional` **restrictedDelivery**: `boolean`

#### Defined in

[packages/client/src/LocClient.ts:180](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L180)

___

### signer

• **signer**: [`Signer`](Client.Signer.md)

#### Defined in

[packages/client/src/LocClient.ts:184](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L184)

___

### specificLicenses

• `Optional` **specificLicenses**: [`SpecificLicense`](../classes/Client.SpecificLicense.md)[]

#### Defined in

[packages/client/src/LocClient.ts:182](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L182)
