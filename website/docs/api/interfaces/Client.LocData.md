[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocData

# Interface: LocData

[Client](../modules/Client.md).LocData

## Table of contents

### Properties

- [closed](Client.LocData.md#closed)
- [closedOn](Client.LocData.md#closedon)
- [collectionCanUpload](Client.LocData.md#collectioncanupload)
- [collectionLastBlockSubmission](Client.LocData.md#collectionlastblocksubmission)
- [collectionMaxSize](Client.LocData.md#collectionmaxsize)
- [company](Client.LocData.md#company)
- [createdOn](Client.LocData.md#createdon)
- [decisionOn](Client.LocData.md#decisionon)
- [description](Client.LocData.md#description)
- [files](Client.LocData.md#files)
- [id](Client.LocData.md#id)
- [identityLocId](Client.LocData.md#identitylocid)
- [links](Client.LocData.md#links)
- [locType](Client.LocData.md#loctype)
- [metadata](Client.LocData.md#metadata)
- [ownerAddress](Client.LocData.md#owneraddress)
- [rejectReason](Client.LocData.md#rejectreason)
- [replacerOf](Client.LocData.md#replacerof)
- [requesterAddress](Client.LocData.md#requesteraddress)
- [requesterLocId](Client.LocData.md#requesterlocid)
- [seal](Client.LocData.md#seal)
- [status](Client.LocData.md#status)
- [userIdentity](Client.LocData.md#useridentity)
- [userPostalAddress](Client.LocData.md#userpostaladdress)
- [verifiedThirdParty](Client.LocData.md#verifiedthirdparty)
- [voidInfo](Client.LocData.md#voidinfo)

## Properties

### closed

• **closed**: `boolean`

#### Defined in

[packages/client/src/Loc.ts:35](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L35)

___

### closedOn

• `Optional` **closedOn**: `string`

#### Defined in

[packages/client/src/Loc.ts:38](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L38)

___

### collectionCanUpload

• `Optional` **collectionCanUpload**: `boolean`

#### Defined in

[packages/client/src/Loc.ts:48](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L48)

___

### collectionLastBlockSubmission

• `Optional` **collectionLastBlockSubmission**: `bigint`

#### Defined in

[packages/client/src/Loc.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L46)

___

### collectionMaxSize

• `Optional` **collectionMaxSize**: `number`

#### Defined in

[packages/client/src/Loc.ts:47](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L47)

___

### company

• `Optional` **company**: `string`

#### Defined in

[packages/client/src/Loc.ts:53](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L53)

___

### createdOn

• **createdOn**: `string`

#### Defined in

[packages/client/src/Loc.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L36)

___

### decisionOn

• `Optional` **decisionOn**: `string`

#### Defined in

[packages/client/src/Loc.ts:37](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L37)

___

### description

• **description**: `string`

#### Defined in

[packages/client/src/Loc.ts:33](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L33)

___

### files

• **files**: [`MergedFile`](Client.MergedFile.md)[]

#### Defined in

[packages/client/src/Loc.ts:49](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L49)

___

### id

• **id**: [`UUID`](../classes/Node_API.UUID.md)

#### Defined in

[packages/client/src/Loc.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L29)

___

### identityLocId

• `Optional` **identityLocId**: [`UUID`](../classes/Node_API.UUID.md)

#### Defined in

[packages/client/src/Loc.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L43)

___

### links

• **links**: [`MergedLink`](Client.MergedLink.md)[]

#### Defined in

[packages/client/src/Loc.ts:51](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L51)

___

### locType

• **locType**: [`LocType`](../modules/Node_API.md#loctype)

#### Defined in

[packages/client/src/Loc.ts:34](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L34)

___

### metadata

• **metadata**: [`MergedMetadataItem`](Client.MergedMetadataItem.md)[]

#### Defined in

[packages/client/src/Loc.ts:50](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L50)

___

### ownerAddress

• **ownerAddress**: `string`

#### Defined in

[packages/client/src/Loc.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L30)

___

### rejectReason

• `Optional` **rejectReason**: `string`

#### Defined in

[packages/client/src/Loc.ts:42](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L42)

___

### replacerOf

• `Optional` **replacerOf**: [`UUID`](../classes/Node_API.UUID.md)

#### Defined in

[packages/client/src/Loc.ts:41](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L41)

___

### requesterAddress

• `Optional` **requesterAddress**: `string`

#### Defined in

[packages/client/src/Loc.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L31)

___

### requesterLocId

• `Optional` **requesterLocId**: [`UUID`](../classes/Node_API.UUID.md)

#### Defined in

[packages/client/src/Loc.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L32)

___

### seal

• `Optional` **seal**: `string`

#### Defined in

[packages/client/src/Loc.ts:52](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L52)

___

### status

• **status**: [`LocRequestStatus`](../modules/Client.md#locrequeststatus)

#### Defined in

[packages/client/src/Loc.ts:39](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L39)

___

### userIdentity

• `Optional` **userIdentity**: [`UserIdentity`](Client.UserIdentity.md)

#### Defined in

[packages/client/src/Loc.ts:44](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L44)

___

### userPostalAddress

• `Optional` **userPostalAddress**: [`PostalAddress`](Client.PostalAddress.md)

#### Defined in

[packages/client/src/Loc.ts:45](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L45)

___

### verifiedThirdParty

• **verifiedThirdParty**: `boolean`

#### Defined in

[packages/client/src/Loc.ts:54](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L54)

___

### voidInfo

• `Optional` **voidInfo**: [`LocRequestVoidInfo`](Client.LocRequestVoidInfo.md) & [`VoidInfo`](Node_API.VoidInfo.md)

#### Defined in

[packages/client/src/Loc.ts:40](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L40)
