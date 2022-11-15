[API](../API.md) / [Modules](../modules.md) / Client

# Module: Client

## Table of contents

### Enumerations

- [CheckResultType](../enums/Client.CheckResultType.md)

### TermsAndConditions

- [AbstractTermsAndConditionsElement](../classes/Client.AbstractTermsAndConditionsElement.md)
- [CreativeCommons](../classes/Client.CreativeCommons.md)
- [LogionClassification](../classes/Client.LogionClassification.md)
- [SpecificLicense](../classes/Client.SpecificLicense.md)
- [LogionLicenseParameters](../interfaces/Client.LogionLicenseParameters.md)
- [TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md)
- [LogionTransferredRight](Client.md#logiontransferredright)
- [LogionTransferredRightCode](Client.md#logiontransferredrightcode)
- [LogionTransferredRightDescription](Client.md#logiontransferredrightdescription)
- [TermsAndConditionsElementType](Client.md#termsandconditionselementtype)
- [logionLicenseItems](Client.md#logionlicenseitems)
- [newTermsAndConditions](Client.md#newtermsandconditions)
- [newTermsAndConditionsElement](Client.md#newtermsandconditionselement)

### Classes

- [AcceptedProtection](../classes/Client.AcceptedProtection.md)
- [AccountTokens](../classes/Client.AccountTokens.md)
- [ActiveProtection](../classes/Client.ActiveProtection.md)
- [AnySourceHttpClient](../classes/Client.AnySourceHttpClient.md)
- [AuthenticatedLocClient](../classes/Client.AuthenticatedLocClient.md)
- [AuthenticationClient](../classes/Client.AuthenticationClient.md)
- [AxiosFactory](../classes/Client.AxiosFactory.md)
- [BalanceState](../classes/Client.BalanceState.md)
- [BaseSigner](../classes/Client.BaseSigner.md)
- [CancellableRequest](../classes/Client.CancellableRequest.md)
- [ClaimedRecovery](../classes/Client.ClaimedRecovery.md)
- [ClosedCollectionLoc](../classes/Client.ClosedCollectionLoc.md)
- [ClosedLoc](../classes/Client.ClosedLoc.md)
- [CollectionItem](../classes/Client.CollectionItem.md)
- [DefaultSignAndSendStrategy](../classes/Client.DefaultSignAndSendStrategy.md)
- [DirectoryClient](../classes/Client.DirectoryClient.md)
- [DraftRequest](../classes/Client.DraftRequest.md)
- [EditableRequest](../classes/Client.EditableRequest.md)
- [HashOrContent](../classes/Client.HashOrContent.md)
- [ItemFileWithContent](../classes/Client.ItemFileWithContent.md)
- [KeyringSigner](../classes/Client.KeyringSigner.md)
- [LoRecoveryClient](../classes/Client.LoRecoveryClient.md)
- [LocClient](../classes/Client.LocClient.md)
- [LocMultiClient](../classes/Client.LocMultiClient.md)
- [LocRequestState](../classes/Client.LocRequestState.md)
- [LocsState](../classes/Client.LocsState.md)
- [LogionClient](../classes/Client.LogionClient.md)
- [MimeType](../classes/Client.MimeType.md)
- [MultiSourceHttpClient](../classes/Client.MultiSourceHttpClient.md)
- [NetworkState](../classes/Client.NetworkState.md)
- [NoProtection](../classes/Client.NoProtection.md)
- [OpenLoc](../classes/Client.OpenLoc.md)
- [PendingProtection](../classes/Client.PendingProtection.md)
- [PendingRecovery](../classes/Client.PendingRecovery.md)
- [PendingRequest](../classes/Client.PendingRequest.md)
- [PublicApi](../classes/Client.PublicApi.md)
- [PublicLoc](../classes/Client.PublicLoc.md)
- [PublicLocClient](../classes/Client.PublicLocClient.md)
- [ReSubmittableRequest](../classes/Client.ReSubmittableRequest.md)
- [RejectedProtection](../classes/Client.RejectedProtection.md)
- [RejectedRecovery](../classes/Client.RejectedRecovery.md)
- [RejectedRequest](../classes/Client.RejectedRequest.md)
- [State](../classes/Client.State.md)
- [TransactionClient](../classes/Client.TransactionClient.md)
- [UnavailableProtection](../classes/Client.UnavailableProtection.md)
- [UpdatableReSubmittableRequest](../classes/Client.UpdatableReSubmittableRequest.md)
- [UpdatableRequest](../classes/Client.UpdatableRequest.md)
- [VaultClient](../classes/Client.VaultClient.md)
- [VaultState](../classes/Client.VaultState.md)
- [VoidedCollectionLoc](../classes/Client.VoidedCollectionLoc.md)
- [VoidedLoc](../classes/Client.VoidedLoc.md)

### Interfaces

- [AddCollectionItemParams](../interfaces/Client.AddCollectionItemParams.md)
- [AddFileParams](../interfaces/Client.AddFileParams.md)
- [AddMetadataParams](../interfaces/Client.AddMetadataParams.md)
- [AddedOn](../interfaces/Client.AddedOn.md)
- [BalanceSharedState](../interfaces/Client.BalanceSharedState.md)
- [CheckCertifiedCopyResult](../interfaces/Client.CheckCertifiedCopyResult.md)
- [CheckHashResult](../interfaces/Client.CheckHashResult.md)
- [ComponentFactory](../interfaces/Client.ComponentFactory.md)
- [CreateLocRequest](../interfaces/Client.CreateLocRequest.md)
- [CreateLocRequestParams](../interfaces/Client.CreateLocRequestParams.md)
- [CreateProtectionRequest](../interfaces/Client.CreateProtectionRequest.md)
- [CreateSofRequest](../interfaces/Client.CreateSofRequest.md)
- [CreateSofRequestParams](../interfaces/Client.CreateSofRequestParams.md)
- [CreateVaultTransferRequest](../interfaces/Client.CreateVaultTransferRequest.md)
- [DeleteFileParams](../interfaces/Client.DeleteFileParams.md)
- [DeleteMetadataParams](../interfaces/Client.DeleteMetadataParams.md)
- [Endpoint](../interfaces/Client.Endpoint.md)
- [FetchAllLocsParams](../interfaces/Client.FetchAllLocsParams.md)
- [FetchAllResult](../interfaces/Client.FetchAllResult.md)
- [FetchLocRequestSpecification](../interfaces/Client.FetchLocRequestSpecification.md)
- [FetchParameters](../interfaces/Client.FetchParameters.md)
- [FetchVaultTransferRequest](../interfaces/Client.FetchVaultTransferRequest.md)
- [FormDataLike](../interfaces/Client.FormDataLike.md)
- [GetDeliveriesRequest](../interfaces/Client.GetDeliveriesRequest.md)
- [HashAndSize](../interfaces/Client.HashAndSize.md)
- [ISubmittableResult](../interfaces/Client.ISubmittableResult.md)
- [ItemDeliveries](../interfaces/Client.ItemDeliveries.md)
- [ItemDelivery](../interfaces/Client.ItemDelivery.md)
- [ItemDeliveryMatch](../interfaces/Client.ItemDeliveryMatch.md)
- [ItemTokenWithRestrictedType](../interfaces/Client.ItemTokenWithRestrictedType.md)
- [LegalOfficer](../interfaces/Client.LegalOfficer.md)
- [LegalOfficerDecision](../interfaces/Client.LegalOfficerDecision.md)
- [LegalOfficerEndpoint](../interfaces/Client.LegalOfficerEndpoint.md)
- [LegalOfficerPostalAddress](../interfaces/Client.LegalOfficerPostalAddress.md)
- [LegalOfficerProtectionState](../interfaces/Client.LegalOfficerProtectionState.md)
- [LocCollectionItem](../interfaces/Client.LocCollectionItem.md)
- [LocData](../interfaces/Client.LocData.md)
- [LocFile](../interfaces/Client.LocFile.md)
- [LocLink](../interfaces/Client.LocLink.md)
- [LocMetadataItem](../interfaces/Client.LocMetadataItem.md)
- [LocRequest](../interfaces/Client.LocRequest.md)
- [LocRequestVoidInfo](../interfaces/Client.LocRequestVoidInfo.md)
- [LocSharedState](../interfaces/Client.LocSharedState.md)
- [LogionClientConfig](../interfaces/Client.LogionClientConfig.md)
- [MergedFile](../interfaces/Client.MergedFile.md)
- [MergedLink](../interfaces/Client.MergedLink.md)
- [MergedMetadataItem](../interfaces/Client.MergedMetadataItem.md)
- [MultiSourceHttpClientState](../interfaces/Client.MultiSourceHttpClientState.md)
- [OffchainCollectionItem](../interfaces/Client.OffchainCollectionItem.md)
- [PollingParameters](../interfaces/Client.PollingParameters.md)
- [PostalAddress](../interfaces/Client.PostalAddress.md)
- [ProtectionParameters](../interfaces/Client.ProtectionParameters.md)
- [ProtectionRequest](../interfaces/Client.ProtectionRequest.md)
- [Published](../interfaces/Client.Published.md)
- [RawSigner](../interfaces/Client.RawSigner.md)
- [RecoverySharedState](../interfaces/Client.RecoverySharedState.md)
- [SharedState](../interfaces/Client.SharedState.md)
- [SignAndSendStrategy](../interfaces/Client.SignAndSendStrategy.md)
- [SignParameters](../interfaces/Client.SignParameters.md)
- [SignRawParameters](../interfaces/Client.SignRawParameters.md)
- [Signer](../interfaces/Client.Signer.md)
- [SuccessfulSubmission](../interfaces/Client.SuccessfulSubmission.md)
- [Token](../interfaces/Client.Token.md)
- [TokenValidationResult](../interfaces/Client.TokenValidationResult.md)
- [Transaction](../interfaces/Client.Transaction.md)
- [TransactionError](../interfaces/Client.TransactionError.md)
- [TransactionsSet](../interfaces/Client.TransactionsSet.md)
- [TransferParam](../interfaces/Client.TransferParam.md)
- [TypedSignature](../interfaces/Client.TypedSignature.md)
- [UpdateParameters](../interfaces/Client.UpdateParameters.md)
- [UploadCollectionItemFileParams](../interfaces/Client.UploadCollectionItemFileParams.md)
- [UploadableCollectionItem](../interfaces/Client.UploadableCollectionItem.md)
- [UploadableItemFile](../interfaces/Client.UploadableItemFile.md)
- [UserActionParameters](../interfaces/Client.UserActionParameters.md)
- [UserIdentity](../interfaces/Client.UserIdentity.md)
- [VaultSharedState](../interfaces/Client.VaultSharedState.md)
- [VaultTransferRequest](../interfaces/Client.VaultTransferRequest.md)
- [VaultTransferRequestDecision](../interfaces/Client.VaultTransferRequestDecision.md)
- [WaitForParameters](../interfaces/Client.WaitForParameters.md)
- [WithActiveProtection](../interfaces/Client.WithActiveProtection.md)
- [WithProtectionParameters](../interfaces/Client.WithProtectionParameters.md)
- [WithRefresh](../interfaces/Client.WithRefresh.md)

### Type Aliases

- [AnyLocState](Client.md#anylocstate)
- [CreativeCommonsCode](Client.md#creativecommonscode)
- [FileLike](Client.md#filelike)
- [FullSigner](Client.md#fullsigner)
- [Language](Client.md#language)
- [LocRequestStatus](Client.md#locrequeststatus)
- [MultiResponse](Client.md#multiresponse)
- [OffchainLocState](Client.md#offchainlocstate)
- [OnchainLocState](Client.md#onchainlocstate)
- [ProtectionRequestStatus](Client.md#protectionrequeststatus)
- [ProtectionState](Client.md#protectionstate)
- [Query](Client.md#query)
- [SignAndSendFunction](Client.md#signandsendfunction)
- [SignCallback](Client.md#signcallback)
- [SignatureType](Client.md#signaturetype)
- [TokenType](Client.md#tokentype)
- [TransferDirection](Client.md#transferdirection)
- [VaultStateCreationParameters](Client.md#vaultstatecreationparameters)
- [VaultTransferRequestStatus](Client.md#vaulttransferrequeststatus)

### Variables

- [DEFAULT\_POLLING\_PARAMETERS](Client.md#default_polling_parameters)
- [DefaultComponentFactory](Client.md#defaultcomponentfactory)
- [ISO\_DATETIME\_PATTERN](Client.md#iso_datetime_pattern)
- [values](Client.md#values)

### Functions

- [aggregateArrays](Client.md#aggregatearrays)
- [allUp](Client.md#allup)
- [authenticatedCurrentAddress](Client.md#authenticatedcurrentaddress)
- [fromIsoString](Client.md#fromisostring)
- [generateEthereumTokenItemId](Client.md#generateethereumtokenitemid)
- [getBalanceState](Client.md#getbalancestate)
- [getCollectionItem](Client.md#getcollectionitem)
- [getDefinedCurrentAddress](Client.md#getdefinedcurrentaddress)
- [getInitialState](Client.md#getinitialstate)
- [getLegalOfficer](Client.md#getlegalofficer)
- [hashAttributes](Client.md#hashattributes)
- [hashBlob](Client.md#hashblob)
- [hashBuffer](Client.md#hashbuffer)
- [hashStream](Client.md#hashstream)
- [hashString](Client.md#hashstring)
- [initMultiSourceHttpClientState](Client.md#initmultisourcehttpclientstate)
- [isErcToken](Client.md#iserctoken)
- [isSingularKusamaId](Client.md#issingularkusamaid)
- [isTokenType](Client.md#istokentype)
- [isValidMime](Client.md#isvalidmime)
- [requestSort](Client.md#requestsort)
- [toIsoString](Client.md#toisostring)
- [validHash](Client.md#validhash)
- [validateToken](Client.md#validatetoken)
- [waitFor](Client.md#waitfor)

## TermsAndConditions

• `Abstract` **AbstractTermsAndConditionsElement**<`P`\>: `Object`

Provides a re-usable base implementation of [TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `P` | Type of Terms&Conditions parameters. |

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:34](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L34)

• **CreativeCommons**: `Object`

Provides Terms and Conditions under
the [Creative Commons Attribution License 4.0](https://creativecommons.org/about/cclicenses/)

#### Defined in

[packages/client/src/license/CreativeCommons.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L13)

• **LogionClassification**: `Object`

Provides a Logion Classification.

#### Defined in

[packages/client/src/license/LogionClassification.ts:266](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L266)

• **SpecificLicense**: `Object`

A Terms and Conditions element defining a specific license,
where details are stored "as is".

#### Defined in

[packages/client/src/license/SpecificLicense.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L9)

• **LogionLicenseParameters**: `Object`

Defines the parameters of a Logion Classification.

#### Defined in

[packages/client/src/license/LogionClassification.ts:245](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L245)

• **TermsAndConditionsElement**: `Object`

Common contract to all Terms and Conditions elements.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L13)

### LogionTransferredRight

Ƭ **LogionTransferredRight**: { `code`: [`LogionTransferredRightCode`](Client.md#logiontransferredrightcode)  } & [`LogionTransferredRightDescription`](Client.md#logiontransferredrightdescription)

A transferred right code associated with description in one language.

#### Defined in

[packages/client/src/license/LogionClassification.ts:42](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L42)

___

### LogionTransferredRightCode

Ƭ **LogionTransferredRightCode**: ``"PER-PRIV"`` \| ``"PER-PUB"`` \| ``"COM-NOMOD"`` \| ``"COM-MOD"`` \| ``"EX"`` \| ``"NOEX"`` \| ``"WW"`` \| ``"REG"`` \| ``"NOTIME"`` \| ``"TIME"``

List of available code to describe transferred rights.

#### Defined in

[packages/client/src/license/LogionClassification.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L11)

___

### LogionTransferredRightDescription

Ƭ **LogionTransferredRightDescription**: `Object`

Describes a transferred right.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | Long description |
| `shortDescription` | `string` | Short description |

#### Defined in

[packages/client/src/license/LogionClassification.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L27)

___

### TermsAndConditionsElementType

Ƭ **TermsAndConditionsElementType**: ``"logion_classification"`` \| ``"specific_license"`` \| ``"CC4.0"``

Defines available Terms&Conditions types.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:7](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L7)

___

### logionLicenseItems

• `Const` **logionLicenseItems**: `Record`<[`LogionTransferredRightCode`](Client.md#logiontransferredrightcode), `Record`<[`Language`](Client.md#language), [`LogionTransferredRightDescription`](Client.md#logiontransferredrightdescription)\>\>

The dictionary of available transferred rights, with description in both `fr` and `en`.

#### Defined in

[packages/client/src/license/LogionClassification.ts:48](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L48)

___

### newTermsAndConditions

▸ **newTermsAndConditions**(`termsAndConditions`): [`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)[]

Creates a new Terms and Conditions, based on given type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `termsAndConditions` | [`TermsAndConditionsElement`](../interfaces/Node_API.TermsAndConditionsElement.md)[] | the Terms and Conditions elements, as stored on the chain. |

#### Returns

[`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)[]

an array of terms and conditions element

#### Defined in

[packages/client/src/license/Factory.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/Factory.ts#L13)

___

### newTermsAndConditionsElement

▸ **newTermsAndConditionsElement**(`type`, `licenseLocId`, `details`): [`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)

Creates a new Terms and Conditions, based on given type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the Terms and Conditions type. |
| `licenseLocId` | [`UUID`](../classes/Node_API.UUID.md) | the ID the defining LOC. |
| `details` | `string` | the details, as stored on the blockchain. |

#### Returns

[`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)

the new terms and conditions element

#### Defined in

[packages/client/src/license/Factory.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/Factory.ts#L25)

## Type Aliases

### AnyLocState

Ƭ **AnyLocState**: [`OffchainLocState`](Client.md#offchainlocstate) \| [`OnchainLocState`](Client.md#onchainlocstate)

#### Defined in

[packages/client/src/Loc.ts:299](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L299)

___

### CreativeCommonsCode

Ƭ **CreativeCommonsCode**: typeof [`values`](Client.md#values) extends `Set`<infer T\> ? `T` : `never`

#### Defined in

[packages/client/src/license/CreativeCommons.ts:6](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L6)

___

### FileLike

Ƭ **FileLike**: `File` \| `Blob` \| `Buffer` \| `string`

#### Defined in

[packages/client/src/ComponentFactory.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L13)

___

### FullSigner

Ƭ **FullSigner**: [`RawSigner`](../interfaces/Client.RawSigner.md) & [`Signer`](../interfaces/Client.Signer.md)

#### Defined in

[packages/client/src/Signer.ts:51](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L51)

___

### Language

Ƭ **Language**: ``"en"`` \| ``"fr"``

#### Defined in

[packages/client/src/Types.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Types.ts#L30)

___

### LocRequestStatus

Ƭ **LocRequestStatus**: ``"DRAFT"`` \| ``"OPEN"`` \| ``"REQUESTED"`` \| ``"REJECTED"`` \| ``"CLOSED"``

#### Defined in

[packages/client/src/LocClient.ts:96](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L96)

___

### MultiResponse

Ƭ **MultiResponse**<`R`\>: `Record`<`string`, `R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Defined in

[packages/client/src/Http.ts:18](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L18)

___

### OffchainLocState

Ƭ **OffchainLocState**: [`DraftRequest`](../classes/Client.DraftRequest.md) \| [`PendingRequest`](../classes/Client.PendingRequest.md) \| [`RejectedRequest`](../classes/Client.RejectedRequest.md)

#### Defined in

[packages/client/src/Loc.ts:301](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L301)

___

### OnchainLocState

Ƭ **OnchainLocState**: [`OpenLoc`](../classes/Client.OpenLoc.md) \| [`ClosedLoc`](../classes/Client.ClosedLoc.md) \| [`ClosedCollectionLoc`](../classes/Client.ClosedCollectionLoc.md) \| [`VoidedLoc`](../classes/Client.VoidedLoc.md) \| [`VoidedCollectionLoc`](../classes/Client.VoidedCollectionLoc.md)

#### Defined in

[packages/client/src/Loc.ts:303](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L303)

___

### ProtectionRequestStatus

Ƭ **ProtectionRequestStatus**: ``"PENDING"`` \| ``"REJECTED"`` \| ``"ACCEPTED"`` \| ``"ACTIVATED"`` \| ``"CANCELLED"`` \| ``"REJECTED_CANCELLED"`` \| ``"ACCEPTED_CANCELLED"``

#### Defined in

[packages/client/src/RecoveryClient.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L16)

___

### ProtectionState

Ƭ **ProtectionState**: [`NoProtection`](../classes/Client.NoProtection.md) \| [`PendingProtection`](../classes/Client.PendingProtection.md) \| [`AcceptedProtection`](../classes/Client.AcceptedProtection.md) \| [`ActiveProtection`](../classes/Client.ActiveProtection.md) \| [`PendingRecovery`](../classes/Client.PendingRecovery.md) \| [`ClaimedRecovery`](../classes/Client.ClaimedRecovery.md) \| [`UnavailableProtection`](../classes/Client.UnavailableProtection.md) \| [`RejectedProtection`](../classes/Client.RejectedProtection.md) \| [`RejectedRecovery`](../classes/Client.RejectedRecovery.md)

#### Defined in

[packages/client/src/Recovery.ts:28](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L28)

___

### Query

Ƭ **Query**<`E`, `R`\>: (`axios`: `AxiosInstance`, `endpoint`: `E`) => `Promise`<`R`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `R` |

#### Type declaration

▸ (`axios`, `endpoint`): `Promise`<`R`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `axios` | `AxiosInstance` |
| `endpoint` | `E` |

##### Returns

`Promise`<`R`\>

#### Defined in

[packages/client/src/Http.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L32)

___

### SignAndSendFunction

Ƭ **SignAndSendFunction**: (`statusCallback`: (`result`: [`ISubmittableResult`](../interfaces/Client.ISubmittableResult.md)) => `void`) => `Promise`<() => `void`\>

#### Type declaration

▸ (`statusCallback`): `Promise`<() => `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `statusCallback` | (`result`: [`ISubmittableResult`](../interfaces/Client.ISubmittableResult.md)) => `void` |

##### Returns

`Promise`<() => `void`\>

#### Defined in

[packages/client/src/Signer.ts:53](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L53)

___

### SignCallback

Ƭ **SignCallback**: (`result`: [`ISubmittableResult`](../interfaces/Client.ISubmittableResult.md)) => `void`

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`ISubmittableResult`](../interfaces/Client.ISubmittableResult.md) |

##### Returns

`void`

#### Defined in

[packages/client/src/Signer.ts:33](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L33)

___

### SignatureType

Ƭ **SignatureType**: ``"POLKADOT"`` \| ``"ETHEREUM"`` \| ``"CROSSMINT_ETHEREUM"``

#### Defined in

[packages/client/src/Signer.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L21)

___

### TokenType

Ƭ **TokenType**: ``"ethereum_erc721"`` \| ``"ethereum_erc1155"`` \| ``"goerli_erc721"`` \| ``"goerli_erc1155"`` \| ``"singular_kusama"`` \| ``"owner"``

#### Defined in

[packages/client/src/Token.ts:8](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Token.ts#L8)

___

### TransferDirection

Ƭ **TransferDirection**: ``"Sent"`` \| ``"Received"`` \| ``"None"``

#### Defined in

[packages/client/src/TransactionClient.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/client/src/TransactionClient.ts#L11)

___

### VaultStateCreationParameters

Ƭ **VaultStateCreationParameters**: [`SharedState`](../interfaces/Client.SharedState.md) & { `isRecovery`: `boolean` ; `recoveredAddress?`: `string` ; `selectedLegalOfficers`: [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]  }

#### Defined in

[packages/client/src/Vault.ts:35](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L35)

___

### VaultTransferRequestStatus

Ƭ **VaultTransferRequestStatus**: ``"ACCEPTED"`` \| ``"PENDING"`` \| ``"REJECTED"`` \| ``"CANCELLED"`` \| ``"REJECTED_CANCELLED"``

#### Defined in

[packages/client/src/VaultClient.ts:8](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L8)

## Variables

### DEFAULT\_POLLING\_PARAMETERS

• `Const` **DEFAULT\_POLLING\_PARAMETERS**: [`PollingParameters`](../interfaces/Client.PollingParameters.md)

#### Defined in

[packages/client/src/Polling.ts:14](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Polling.ts#L14)

___

### DefaultComponentFactory

• `Const` **DefaultComponentFactory**: [`ComponentFactory`](../interfaces/Client.ComponentFactory.md)

#### Defined in

[packages/client/src/ComponentFactory.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L24)

___

### ISO\_DATETIME\_PATTERN

• `Const` **ISO\_DATETIME\_PATTERN**: `RegExp`

#### Defined in

[packages/client/src/DateTimeUtil.ts:12](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DateTimeUtil.ts#L12)

___

### values

• `Const` **values**: `Set`<``"BY"`` \| ``"BY-SA"`` \| ``"BY-NC"`` \| ``"BY-NC-SA"`` \| ``"BY-ND"`` \| ``"BY-NC-ND"``\>

#### Defined in

[packages/client/src/license/CreativeCommons.ts:5](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L5)

## Functions

### aggregateArrays

▸ **aggregateArrays**<`E`\>(`response`): `E`[]

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`MultiResponse`](Client.md#multiresponse)<`E`[]\> |

#### Returns

`E`[]

#### Defined in

[packages/client/src/Http.ts:140](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L140)

___

### allUp

▸ **allUp**<`E`\>(`endpoints`): [`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoints` | `E`[] |

#### Returns

[`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<`E`\>

#### Defined in

[packages/client/src/Http.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L25)

___

### authenticatedCurrentAddress

▸ **authenticatedCurrentAddress**(`sharedState`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `currentAddress` | `string` |
| `token` | [`Token`](../interfaces/Client.Token.md) |

#### Defined in

[packages/client/src/SharedClient.ts:39](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L39)

___

### fromIsoString

▸ **fromIsoString**(`isoString`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isoString` | `string` |

#### Returns

`DateTime`

#### Defined in

[packages/client/src/DateTimeUtil.ts:14](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DateTimeUtil.ts#L14)

___

### generateEthereumTokenItemId

▸ **generateEthereumTokenItemId**(`nonce`, `tokenId`): `string`

This is a rewrite of the function `getItemId` implemented by Logion Smart Contract:
https://github.com/logion-network/logion-solidity/blob/main/contracts/Logion.sol

#### Parameters

| Name | Type |
| :------ | :------ |
| `nonce` | `string` |
| `tokenId` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Ethereum.ts:7](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Ethereum.ts#L7)

___

### getBalanceState

▸ **getBalanceState**(`sharedState`): `Promise`<[`BalanceState`](../classes/Client.BalanceState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) & { `isRecovery`: `boolean` ; `recoveredAddress?`: `string`  } |

#### Returns

`Promise`<[`BalanceState`](../classes/Client.BalanceState.md)\>

#### Defined in

[packages/client/src/Balance.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L30)

___

### getCollectionItem

▸ **getCollectionItem**(`parameters`): `Promise`<[`CollectionItem`](../classes/Client.CollectionItem.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.itemId` | `string` |
| `parameters.locClient` | [`LocClient`](../classes/Client.LocClient.md) |
| `parameters.locId` | [`UUID`](../classes/Node_API.UUID.md) |

#### Returns

`Promise`<[`CollectionItem`](../classes/Client.CollectionItem.md) \| `undefined`\>

#### Defined in

[packages/client/src/Loc.ts:674](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L674)

___

### getDefinedCurrentAddress

▸ **getDefinedCurrentAddress**(`sharedState`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Returns

`string`

#### Defined in

[packages/client/src/SharedClient.ts:51](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L51)

___

### getInitialState

▸ **getInitialState**(`data`, `pSharedState`): [`ProtectionState`](Client.md#protectionstate)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`FetchAllResult`](../interfaces/Client.FetchAllResult.md) |
| `pSharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Returns

[`ProtectionState`](Client.md#protectionstate)

#### Defined in

[packages/client/src/Recovery.ts:69](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L69)

___

### getLegalOfficer

▸ **getLegalOfficer**(`sharedState`, `address`): [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |
| `address` | `string` |

#### Returns

[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)

#### Defined in

[packages/client/src/SharedClient.ts:35](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L35)

___

### hashAttributes

▸ **hashAttributes**(`attributes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `any`[] |

#### Returns

`string`

#### Defined in

[packages/client/src/Signer.ts:188](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L188)

___

### hashBlob

▸ **hashBlob**(`file`): `Promise`<[`HashAndSize`](../interfaces/Client.HashAndSize.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `Blob` |

#### Returns

`Promise`<[`HashAndSize`](../interfaces/Client.HashAndSize.md)\>

#### Defined in

[packages/client/src/Hash.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L20)

___

### hashBuffer

▸ **hashBuffer**(`buffer`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`string`

#### Defined in

[packages/client/src/Hash.ts:37](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L37)

___

### hashStream

▸ **hashStream**(`stream`): `Promise`<[`HashAndSize`](../interfaces/Client.HashAndSize.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `ReadableStream` |

#### Returns

`Promise`<[`HashAndSize`](../interfaces/Client.HashAndSize.md)\>

#### Defined in

[packages/client/src/Hash.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L43)

___

### hashString

▸ **hashString**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Hash.ts:4](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L4)

___

### initMultiSourceHttpClientState

▸ **initMultiSourceHttpClientState**(`networkState`, `legalOfficers?`): [`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkState` | [`NetworkState`](../classes/Client.NetworkState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\> |
| `legalOfficers?` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[] |

#### Returns

[`MultiSourceHttpClientState`](../interfaces/Client.MultiSourceHttpClientState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\>

#### Defined in

[packages/client/src/Http.ts:78](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Http.ts#L78)

___

### isErcToken

▸ **isErcToken**(`type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TokenType`](Client.md#tokentype) |

#### Returns

`boolean`

#### Defined in

[packages/client/src/Token.ts:100](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Token.ts#L100)

___

### isSingularKusamaId

▸ **isSingularKusamaId**(`tokenId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/Token.ts:106](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Token.ts#L106)

___

### isTokenType

▸ **isTokenType**(`type`): type is TokenType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

type is TokenType

#### Defined in

[packages/client/src/Token.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Token.ts#L17)

___

### isValidMime

▸ **isValidMime**(`mimeType`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mimeType` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/Mime.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Mime.ts#L31)

___

### requestSort

▸ **requestSort**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |
| `b` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |

#### Returns

`number`

#### Defined in

[packages/client/src/VaultClient.ts:206](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L206)

___

### toIsoString

▸ **toIsoString**(`moment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moment` | `DateTime` |

#### Returns

`string`

#### Defined in

[packages/client/src/DateTimeUtil.ts:3](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DateTimeUtil.ts#L3)

___

### validHash

▸ **validHash**(`hash`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/client/src/Hash.ts:59](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Hash.ts#L59)

___

### validateToken

▸ **validateToken**(`itemToken`): [`TokenValidationResult`](../interfaces/Client.TokenValidationResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemToken` | [`ItemTokenWithRestrictedType`](../interfaces/Client.ItemTokenWithRestrictedType.md) |

#### Returns

[`TokenValidationResult`](../interfaces/Client.TokenValidationResult.md)

#### Defined in

[packages/client/src/Token.ts:33](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Token.ts#L33)

___

### waitFor

▸ **waitFor**<`T`\>(`params`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`WaitForParameters`](../interfaces/Client.WaitForParameters.md)<`T`\> |

#### Returns

`Promise`<`T`\>

#### Defined in

[packages/client/src/Polling.ts:19](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Polling.ts#L19)
