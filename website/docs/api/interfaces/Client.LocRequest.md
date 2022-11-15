[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocRequest

# Interface: LocRequest

[Client](../modules/Client.md).LocRequest

## Table of contents

### Properties

- [closedOn](Client.LocRequest.md#closedon)
- [company](Client.LocRequest.md#company)
- [createdOn](Client.LocRequest.md#createdon)
- [decisionOn](Client.LocRequest.md#decisionon)
- [description](Client.LocRequest.md#description)
- [files](Client.LocRequest.md#files)
- [id](Client.LocRequest.md#id)
- [identityLoc](Client.LocRequest.md#identityloc)
- [links](Client.LocRequest.md#links)
- [locType](Client.LocRequest.md#loctype)
- [metadata](Client.LocRequest.md#metadata)
- [ownerAddress](Client.LocRequest.md#owneraddress)
- [rejectReason](Client.LocRequest.md#rejectreason)
- [requesterAddress](Client.LocRequest.md#requesteraddress)
- [requesterIdentityLoc](Client.LocRequest.md#requesteridentityloc)
- [seal](Client.LocRequest.md#seal)
- [status](Client.LocRequest.md#status)
- [userIdentity](Client.LocRequest.md#useridentity)
- [userPostalAddress](Client.LocRequest.md#userpostaladdress)
- [verifiedThirdParty](Client.LocRequest.md#verifiedthirdparty)
- [voidInfo](Client.LocRequest.md#voidinfo)

## Properties

### closedOn

• `Optional` **closedOn**: `string`

#### Defined in

[packages/client/src/LocClient.ts:86](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L86)

___

### company

• `Optional` **company**: `string`

#### Defined in

[packages/client/src/LocClient.ts:92](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L92)

___

### createdOn

• **createdOn**: `string`

#### Defined in

[packages/client/src/LocClient.ts:78](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L78)

___

### decisionOn

• `Optional` **decisionOn**: `string`

#### Defined in

[packages/client/src/LocClient.ts:79](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L79)

___

### description

• **description**: `string`

#### Defined in

[packages/client/src/LocClient.ts:76](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L76)

___

### files

• **files**: [`LocFile`](Client.LocFile.md)[]

#### Defined in

[packages/client/src/LocClient.ts:87](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L87)

___

### id

• **id**: `string`

#### Defined in

[packages/client/src/LocClient.ts:80](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L80)

___

### identityLoc

• `Optional` **identityLoc**: `string`

#### Defined in

[packages/client/src/LocClient.ts:83](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L83)

___

### links

• **links**: [`LocLink`](Client.LocLink.md)[]

#### Defined in

[packages/client/src/LocClient.ts:89](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L89)

___

### locType

• **locType**: [`LocType`](../modules/Node_API.md#loctype)

#### Defined in

[packages/client/src/LocClient.ts:77](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L77)

___

### metadata

• **metadata**: [`LocMetadataItem`](Client.LocMetadataItem.md)[]

#### Defined in

[packages/client/src/LocClient.ts:88](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L88)

___

### ownerAddress

• **ownerAddress**: `string`

#### Defined in

[packages/client/src/LocClient.ts:73](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L73)

___

### rejectReason

• `Optional` **rejectReason**: `string`

#### Defined in

[packages/client/src/LocClient.ts:82](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L82)

___

### requesterAddress

• `Optional` **requesterAddress**: ``null`` \| `string`

#### Defined in

[packages/client/src/LocClient.ts:74](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L74)

___

### requesterIdentityLoc

• `Optional` **requesterIdentityLoc**: ``null`` \| `string`

#### Defined in

[packages/client/src/LocClient.ts:75](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L75)

___

### seal

• `Optional` **seal**: `string`

#### Defined in

[packages/client/src/LocClient.ts:91](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L91)

___

### status

• **status**: [`LocRequestStatus`](../modules/Client.md#locrequeststatus)

#### Defined in

[packages/client/src/LocClient.ts:81](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L81)

___

### userIdentity

• `Optional` **userIdentity**: [`UserIdentity`](Client.UserIdentity.md)

#### Defined in

[packages/client/src/LocClient.ts:84](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L84)

___

### userPostalAddress

• `Optional` **userPostalAddress**: [`PostalAddress`](Client.PostalAddress.md)

#### Defined in

[packages/client/src/LocClient.ts:85](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L85)

___

### verifiedThirdParty

• **verifiedThirdParty**: `boolean`

#### Defined in

[packages/client/src/LocClient.ts:93](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L93)

___

### voidInfo

• `Optional` **voidInfo**: [`LocRequestVoidInfo`](Client.LocRequestVoidInfo.md)

#### Defined in

[packages/client/src/LocClient.ts:90](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L90)
