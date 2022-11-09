[API](../API.md) / [Modules](../modules.md) / Node API

# Module: Node API

## Table of contents

### Classes

- [ChainTime](../classes/Node_API.ChainTime.md)
- [NormalizedNumber](../classes/Node_API.NormalizedNumber.md)
- [PrefixedNumber](../classes/Node_API.PrefixedNumber.md)
- [ScientificNumber](../classes/Node_API.ScientificNumber.md)
- [UUID](../classes/Node_API.UUID.md)

### Interfaces

- [AccountData](../interfaces/Node_API.AccountData.md)
- [AddCollectionItemParameters](../interfaces/Node_API.AddCollectionItemParameters.md)
- [AddFileParameters](../interfaces/Node_API.AddFileParameters.md)
- [AddLinkParameters](../interfaces/Node_API.AddLinkParameters.md)
- [AddMetadataParameters](../interfaces/Node_API.AddMetadataParameters.md)
- [BuildRequestVaultTransferParameters](../interfaces/Node_API.BuildRequestVaultTransferParameters.md)
- [BuildTransferCallParameters](../interfaces/Node_API.BuildTransferCallParameters.md)
- [CancelVaultTransferParameters](../interfaces/Node_API.CancelVaultTransferParameters.md)
- [ClaimRecoveryParameters](../interfaces/Node_API.ClaimRecoveryParameters.md)
- [CloseLocParameters](../interfaces/Node_API.CloseLocParameters.md)
- [Coin](../interfaces/Node_API.Coin.md)
- [CoinBalance](../interfaces/Node_API.CoinBalance.md)
- [CollectionItem](../interfaces/Node_API.CollectionItem.md)
- [CollectionLocCreationParameters](../interfaces/Node_API.CollectionLocCreationParameters.md)
- [ErrorMetadata](../interfaces/Node_API.ErrorMetadata.md)
- [File](../interfaces/Node_API.File.md)
- [GetAccountDataParameters](../interfaces/Node_API.GetAccountDataParameters.md)
- [GetActiveRecoveryParameters](../interfaces/Node_API.GetActiveRecoveryParameters.md)
- [GetCollectionItemParameters](../interfaces/Node_API.GetCollectionItemParameters.md)
- [GetCollectionSizeParameters](../interfaces/Node_API.GetCollectionSizeParameters.md)
- [GetLegalOfficerCaseParameters](../interfaces/Node_API.GetLegalOfficerCaseParameters.md)
- [GetLegalOfficerCasesParameters](../interfaces/Node_API.GetLegalOfficerCasesParameters.md)
- [GetProxyParameters](../interfaces/Node_API.GetProxyParameters.md)
- [GetRecoveryConfigParameters](../interfaces/Node_API.GetRecoveryConfigParameters.md)
- [InitiateRecoveryParameters](../interfaces/Node_API.InitiateRecoveryParameters.md)
- [ItemFile](../interfaces/Node_API.ItemFile.md)
- [ItemToken](../interfaces/Node_API.ItemToken.md)
- [LegalOfficerCase](../interfaces/Node_API.LegalOfficerCase.md)
- [Link](../interfaces/Node_API.Link.md)
- [LogionIdentityLocCreationParameters](../interfaces/Node_API.LogionIdentityLocCreationParameters.md)
- [LogionTransactionLocCreationParameters](../interfaces/Node_API.LogionTransactionLocCreationParameters.md)
- [MetadataItem](../interfaces/Node_API.MetadataItem.md)
- [PolkadotIdentityLocCreationParameters](../interfaces/Node_API.PolkadotIdentityLocCreationParameters.md)
- [PolkadotTransactionLocCreationParameters](../interfaces/Node_API.PolkadotTransactionLocCreationParameters.md)
- [RecoveryCreationParameters](../interfaces/Node_API.RecoveryCreationParameters.md)
- [RequestVaultTransferParameters](../interfaces/Node_API.RequestVaultTransferParameters.md)
- [SignAndSendAsRecoveredParameters](../interfaces/Node_API.SignAndSendAsRecoveredParameters.md)
- [TermsAndConditionsElement](../interfaces/Node_API.TermsAndConditionsElement.md)
- [UnitPrefix](../interfaces/Node_API.UnitPrefix.md)
- [VaultTransferApprovalParameters](../interfaces/Node_API.VaultTransferApprovalParameters.md)
- [VoidInfo](../interfaces/Node_API.VoidInfo.md)
- [VoidLocParameters](../interfaces/Node_API.VoidLocParameters.md)
- [VouchRecoveryParameters](../interfaces/Node_API.VouchRecoveryParameters.md)

### Type Aliases

- [ActiveRecovery](Node_API.md#activerecovery)
- [IdentityLocType](Node_API.md#identityloctype)
- [LocType](Node_API.md#loctype)
- [LogionNodeApi](Node_API.md#logionnodeapi)
- [RecoveryConfig](Node_API.md#recoveryconfig)

### Variables

- [ATTO](Node_API.md#atto)
- [EXA](Node_API.md#exa)
- [FEMTO](Node_API.md#femto)
- [GIGA](Node_API.md#giga)
- [KILO](Node_API.md#kilo)
- [LGNT\_SMALLEST\_UNIT](Node_API.md#lgnt_smallest_unit)
- [MEGA](Node_API.md#mega)
- [MICRO](Node_API.md#micro)
- [MILLI](Node_API.md#milli)
- [NANO](Node_API.md#nano)
- [NONE](Node_API.md#none)
- [PETA](Node_API.md#peta)
- [PICO](Node_API.md#pico)
- [SYMBOL](Node_API.md#symbol)
- [TERA](Node_API.md#tera)

### Functions

- [addCollectionItem](Node_API.md#addcollectionitem)
- [addFile](Node_API.md#addfile)
- [addLink](Node_API.md#addlink)
- [addMetadata](Node_API.md#addmetadata)
- [amount](Node_API.md#amount)
- [approveVaultTransfer](Node_API.md#approvevaulttransfer)
- [asRecovered](Node_API.md#asrecovered)
- [balance](Node_API.md#balance)
- [buildApi](Node_API.md#buildapi)
- [buildCancelVaultTransferCall](Node_API.md#buildcancelvaulttransfercall)
- [buildErrorMessage](Node_API.md#builderrormessage)
- [buildErrorMetadata](Node_API.md#builderrormetadata)
- [buildTransferCall](Node_API.md#buildtransfercall)
- [buildVaultTransferCall](Node_API.md#buildvaulttransfercall)
- [cancelVaultTransfer](Node_API.md#cancelvaulttransfer)
- [claimRecovery](Node_API.md#claimrecovery)
- [closeLoc](Node_API.md#closeloc)
- [convertToPrefixed](Node_API.md#converttoprefixed)
- [createCollectionLoc](Node_API.md#createcollectionloc)
- [createLogionIdentityLoc](Node_API.md#createlogionidentityloc)
- [createLogionTransactionLoc](Node_API.md#createlogiontransactionloc)
- [createPolkadotIdentityLoc](Node_API.md#createpolkadotidentityloc)
- [createPolkadotTransactionLoc](Node_API.md#createpolkadottransactionloc)
- [createRecovery](Node_API.md#createrecovery)
- [estimateFee](Node_API.md#estimatefee)
- [fromHex](Node_API.md#fromhex)
- [getAccountData](Node_API.md#getaccountdata)
- [getActiveRecovery](Node_API.md#getactiverecovery)
- [getBalances](Node_API.md#getbalances)
- [getCoin](Node_API.md#getcoin)
- [getCollectionItem](Node_API.md#getcollectionitem)
- [getCollectionItems](Node_API.md#getcollectionitems)
- [getCollectionSize](Node_API.md#getcollectionsize)
- [getLegalOfficerCase](Node_API.md#getlegalofficercase)
- [getLegalOfficerCases](Node_API.md#getlegalofficercases)
- [getLegalOfficerCasesMap](Node_API.md#getlegalofficercasesmap)
- [getProxy](Node_API.md#getproxy)
- [getRecoveryConfig](Node_API.md#getrecoveryconfig)
- [getVaultAddress](Node_API.md#getvaultaddress)
- [initiateRecovery](Node_API.md#initiaterecovery)
- [isLogionDataLoc](Node_API.md#islogiondataloc)
- [isLogionIdentityLoc](Node_API.md#islogionidentityloc)
- [isValidAccountId](Node_API.md#isvalidaccountid)
- [prefixedLogBalance](Node_API.md#prefixedlogbalance)
- [requestVaultTransfer](Node_API.md#requestvaulttransfer)
- [scientificLogBalance](Node_API.md#scientificlogbalance)
- [toDecimalString](Node_API.md#todecimalstring)
- [toHex](Node_API.md#tohex)
- [transferSubmittable](Node_API.md#transfersubmittable)
- [voidLoc](Node_API.md#voidloc)
- [vouchRecovery](Node_API.md#vouchrecovery)

## Type Aliases

### ActiveRecovery

Ƭ **ActiveRecovery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `legalOfficers` | `string`[] |

#### Defined in

[packages/node-api/src/Recovery.ts:62](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L62)

___

### IdentityLocType

Ƭ **IdentityLocType**: ``"Polkadot"`` \| ``"Logion"``

#### Defined in

[packages/node-api/src/Types.ts:39](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Types.ts#L39)

___

### LocType

Ƭ **LocType**: ``"Transaction"`` \| ``"Collection"`` \| ``"Identity"``

#### Defined in

[packages/node-api/src/Types.ts:37](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Types.ts#L37)

___

### LogionNodeApi

Ƭ **LogionNodeApi**: `ApiPromise`

#### Defined in

[packages/node-api/src/Connection.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Connection.ts#L9)

___

### RecoveryConfig

Ƭ **RecoveryConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `legalOfficers` | `string`[] |

#### Defined in

[packages/node-api/src/Recovery.ts:38](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L38)

## Variables

### ATTO

• `Const` **ATTO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:375](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L375)

___

### EXA

• `Const` **EXA**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:320](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L320)

___

### FEMTO

• `Const` **FEMTO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:370](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L370)

___

### GIGA

• `Const` **GIGA**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:335](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L335)

___

### KILO

• `Const` **KILO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:345](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L345)

___

### LGNT\_SMALLEST\_UNIT

• `Const` **LGNT\_SMALLEST\_UNIT**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md) = `ATTO`

#### Defined in

[packages/node-api/src/Balances.ts:8](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L8)

___

### MEGA

• `Const` **MEGA**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:340](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L340)

___

### MICRO

• `Const` **MICRO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:355](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L355)

___

### MILLI

• `Const` **MILLI**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:350](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L350)

___

### NANO

• `Const` **NANO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:360](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L360)

___

### NONE

• `Const` **NONE**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:261](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L261)

___

### PETA

• `Const` **PETA**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:325](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L325)

___

### PICO

• `Const` **PICO**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:365](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L365)

___

### SYMBOL

• `Const` **SYMBOL**: ``"LGNT"``

#### Defined in

[packages/node-api/src/Balances.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L9)

___

### TERA

• `Const` **TERA**: [`UnitPrefix`](../interfaces/Node_API.UnitPrefix.md)

#### Defined in

[packages/node-api/src/numbers.ts:330](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L330)

## Functions

### addCollectionItem

▸ **addCollectionItem**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddCollectionItemParameters`](../interfaces/Node_API.AddCollectionItemParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:399](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L399)

___

### addFile

▸ **addFile**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddFileParameters`](../interfaces/Node_API.AddFileParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:226](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L226)

___

### addLink

▸ **addLink**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddLinkParameters`](../interfaces/Node_API.AddLinkParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:269](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L269)

___

### addMetadata

▸ **addMetadata**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddMetadataParameters`](../interfaces/Node_API.AddMetadataParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:110](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L110)

___

### amount

▸ **amount**(`balance`, `decimals`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `balance` | `string` |
| `decimals` | `number` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:3](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L3)

___

### approveVaultTransfer

▸ **approveVaultTransfer**(`parameters`): `Promise`<`SubmittableExtrinsic`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`VaultTransferApprovalParameters`](../interfaces/Node_API.VaultTransferApprovalParameters.md) |

#### Returns

`Promise`<`SubmittableExtrinsic`\>

#### Defined in

[packages/node-api/src/Vault.ts:94](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L94)

___

### asRecovered

▸ **asRecovered**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignAndSendAsRecoveredParameters`](../interfaces/Node_API.SignAndSendAsRecoveredParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Recovery.ts:134](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L134)

___

### balance

▸ **balance**(`amount`, `decimals`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `decimals` | `number` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/numbers.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L9)

___

### buildApi

▸ **buildApi**(`endpoint`): `Promise`<[`LogionNodeApi`](Node_API.md#logionnodeapi)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` \| `string`[] |

#### Returns

`Promise`<[`LogionNodeApi`](Node_API.md#logionnodeapi)\>

#### Defined in

[packages/node-api/src/Connection.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Connection.ts#L11)

___

### buildCancelVaultTransferCall

▸ **buildCancelVaultTransferCall**(`parameters`): `Call`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`CancelVaultTransferParameters`](../interfaces/Node_API.CancelVaultTransferParameters.md) |

#### Returns

`Call`

#### Defined in

[packages/node-api/src/Vault.ts:134](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L134)

___

### buildErrorMessage

▸ **buildErrorMessage**(`registry`, `dispatchError`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `Registry` |
| `dispatchError` | `DispatchError` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/Error.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Error.ts#L46)

___

### buildErrorMetadata

▸ **buildErrorMetadata**(`registry`, `dispatchError`): [`ErrorMetadata`](../interfaces/Node_API.ErrorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `Registry` |
| `dispatchError` | `DispatchError` |

#### Returns

[`ErrorMetadata`](../interfaces/Node_API.ErrorMetadata.md)

#### Defined in

[packages/node-api/src/Error.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Error.ts#L10)

___

### buildTransferCall

▸ **buildTransferCall**(`parameters`): `Call`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`BuildTransferCallParameters`](../interfaces/Node_API.BuildTransferCallParameters.md) |

#### Returns

`Call`

#### Defined in

[packages/node-api/src/Balances.ts:134](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L134)

___

### buildVaultTransferCall

▸ **buildVaultTransferCall**(`parameters`): `Promise`<`Call`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`BuildRequestVaultTransferParameters`](../interfaces/Node_API.BuildRequestVaultTransferParameters.md) & { `requesterAddress`: `string`  } |

#### Returns

`Promise`<`Call`\>

#### Defined in

[packages/node-api/src/Vault.ts:54](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L54)

___

### cancelVaultTransfer

▸ **cancelVaultTransfer**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`CancelVaultTransferParameters`](../interfaces/Node_API.CancelVaultTransferParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Vault.ts:138](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L138)

___

### claimRecovery

▸ **claimRecovery**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`ClaimRecoveryParameters`](../interfaces/Node_API.ClaimRecoveryParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Recovery.ts:119](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L119)

___

### closeLoc

▸ **closeLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`CloseLocParameters`](../interfaces/Node_API.CloseLocParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:248](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L248)

___

### convertToPrefixed

▸ **convertToPrefixed**(`num`): [`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`ScientificNumber`](../classes/Node_API.ScientificNumber.md) |

#### Returns

[`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/numbers.ts:428](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L428)

___

### createCollectionLoc

▸ **createCollectionLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`CollectionLocCreationParameters`](../interfaces/Node_API.CollectionLocCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:91](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L91)

___

### createLogionIdentityLoc

▸ **createLogionIdentityLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`LogionIdentityLocCreationParameters`](../interfaces/Node_API.LogionIdentityLocCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L25)

___

### createLogionTransactionLoc

▸ **createLogionTransactionLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`LogionTransactionLocCreationParameters`](../interfaces/Node_API.LogionTransactionLocCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:40](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L40)

___

### createPolkadotIdentityLoc

▸ **createPolkadotIdentityLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`PolkadotIdentityLocCreationParameters`](../interfaces/Node_API.PolkadotIdentityLocCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:56](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L56)

___

### createPolkadotTransactionLoc

▸ **createPolkadotTransactionLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`PolkadotTransactionLocCreationParameters`](../interfaces/Node_API.PolkadotTransactionLocCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:72](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L72)

___

### createRecovery

▸ **createRecovery**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`RecoveryCreationParameters`](../interfaces/Node_API.RecoveryCreationParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Recovery.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L10)

___

### estimateFee

▸ **estimateFee**(`parameters`): `Promise`<[`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`BuildTransferCallParameters`](../interfaces/Node_API.BuildTransferCallParameters.md) |

#### Returns

`Promise`<[`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)\>

#### Defined in

[packages/node-api/src/Balances.ts:138](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L138)

___

### fromHex

▸ **fromHex**(`hex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/Codec.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Codec.ts#L11)

___

### getAccountData

▸ **getAccountData**(`parameters`): `Promise`<[`AccountData`](../interfaces/Node_API.AccountData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetAccountDataParameters`](../interfaces/Node_API.GetAccountDataParameters.md) |

#### Returns

`Promise`<[`AccountData`](../interfaces/Node_API.AccountData.md)\>

#### Defined in

[packages/node-api/src/Balances.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L24)

___

### getActiveRecovery

▸ **getActiveRecovery**(`parameters`): `Promise`<[`ActiveRecovery`](Node_API.md#activerecovery) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetActiveRecoveryParameters`](../interfaces/Node_API.GetActiveRecoveryParameters.md) |

#### Returns

`Promise`<[`ActiveRecovery`](Node_API.md#activerecovery) \| `undefined`\>

#### Defined in

[packages/node-api/src/Recovery.ts:48](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L48)

___

### getBalances

▸ **getBalances**(`parameters`): `Promise`<[`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetAccountDataParameters`](../interfaces/Node_API.GetAccountDataParameters.md) |

#### Returns

`Promise`<[`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]\>

#### Defined in

[packages/node-api/src/Balances.ts:53](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L53)

___

### getCoin

▸ **getCoin**(`coinId`): [`Coin`](../interfaces/Node_API.Coin.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coinId` | `string` |

#### Returns

[`Coin`](../interfaces/Node_API.Coin.md)

#### Defined in

[packages/node-api/src/Balances.ts:97](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L97)

___

### getCollectionItem

▸ **getCollectionItem**(`parameters`): `Promise`<[`CollectionItem`](../interfaces/Node_API.CollectionItem.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetCollectionItemParameters`](../interfaces/Node_API.GetCollectionItemParameters.md) |

#### Returns

`Promise`<[`CollectionItem`](../interfaces/Node_API.CollectionItem.md) \| `undefined`\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:309](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L309)

___

### getCollectionItems

▸ **getCollectionItems**(`parameters`): `Promise`<[`CollectionItem`](../interfaces/Node_API.CollectionItem.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.api` | `ApiPromise` |
| `parameters.locId` | [`UUID`](../classes/Node_API.UUID.md) |

#### Returns

`Promise`<[`CollectionItem`](../interfaces/Node_API.CollectionItem.md)[]\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:355](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L355)

___

### getCollectionSize

▸ **getCollectionSize**(`parameters`): `Promise`<`number` \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetCollectionSizeParameters`](../interfaces/Node_API.GetCollectionSizeParameters.md) |

#### Returns

`Promise`<`number` \| `undefined`\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:372](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L372)

___

### getLegalOfficerCase

▸ **getLegalOfficerCase**(`parameters`): `Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetLegalOfficerCaseParameters`](../interfaces/Node_API.GetLegalOfficerCaseParameters.md) |

#### Returns

`Promise`<[`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) \| `undefined`\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:129](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L129)

___

### getLegalOfficerCases

▸ **getLegalOfficerCases**(`parameters`): `Promise`<([`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) \| `undefined`)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetLegalOfficerCasesParameters`](../interfaces/Node_API.GetLegalOfficerCasesParameters.md) |

#### Returns

`Promise`<([`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) \| `undefined`)[]\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:182](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L182)

___

### getLegalOfficerCasesMap

▸ **getLegalOfficerCasesMap**(`parameters`): `Promise`<`Record`<`string`, [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetLegalOfficerCasesParameters`](../interfaces/Node_API.GetLegalOfficerCasesParameters.md) |

#### Returns

`Promise`<`Record`<`string`, [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)\>\>

#### Defined in

[packages/node-api/src/LogionLoc.ts:203](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L203)

___

### getProxy

▸ **getProxy**(`parameters`): `Promise`<`string` \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetProxyParameters`](../interfaces/Node_API.GetProxyParameters.md) |

#### Returns

`Promise`<`string` \| `undefined`\>

#### Defined in

[packages/node-api/src/Recovery.ts:101](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L101)

___

### getRecoveryConfig

▸ **getRecoveryConfig**(`parameters`): `Promise`<[`RecoveryConfig`](Node_API.md#recoveryconfig) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`GetRecoveryConfigParameters`](../interfaces/Node_API.GetRecoveryConfigParameters.md) |

#### Returns

`Promise`<[`RecoveryConfig`](Node_API.md#recoveryconfig) \| `undefined`\>

#### Defined in

[packages/node-api/src/Recovery.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L25)

___

### getVaultAddress

▸ **getVaultAddress**(`requesterAddress`, `legalOfficers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `requesterAddress` | `string` |
| `legalOfficers` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/node-api/src/Vault.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L13)

___

### initiateRecovery

▸ **initiateRecovery**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`InitiateRecoveryParameters`](../interfaces/Node_API.InitiateRecoveryParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Recovery.ts:71](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L71)

___

### isLogionDataLoc

▸ **isLogionDataLoc**(`loc`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loc` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/Types.ts:76](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Types.ts#L76)

___

### isLogionIdentityLoc

▸ **isLogionIdentityLoc**(`loc`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loc` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/Types.ts:72](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Types.ts#L72)

___

### isValidAccountId

▸ **isValidAccountId**(`api`, `accountId?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `accountId?` | ``null`` \| `string` |

#### Returns

`boolean`

#### Defined in

[packages/node-api/src/Accounts.ts:3](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Accounts.ts#L3)

___

### prefixedLogBalance

▸ **prefixedLogBalance**(`tokens`): [`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `string` |

#### Returns

[`PrefixedNumber`](../classes/Node_API.PrefixedNumber.md)

#### Defined in

[packages/node-api/src/Balances.ts:80](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L80)

___

### requestVaultTransfer

▸ **requestVaultTransfer**(`parameters`): `Promise`<`SubmittableExtrinsic`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`RequestVaultTransferParameters`](../interfaces/Node_API.RequestVaultTransferParameters.md) |

#### Returns

`Promise`<`SubmittableExtrinsic`\>

#### Defined in

[packages/node-api/src/Vault.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Vault.ts#L29)

___

### scientificLogBalance

▸ **scientificLogBalance**(`tokens`): [`ScientificNumber`](../classes/Node_API.ScientificNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `string` |

#### Returns

[`ScientificNumber`](../classes/Node_API.ScientificNumber.md)

#### Defined in

[packages/node-api/src/Balances.ts:76](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L76)

___

### toDecimalString

▸ **toDecimalString**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/UUID.ts:57](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/UUID.ts#L57)

___

### toHex

▸ **toHex**(`source`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`string`

#### Defined in

[packages/node-api/src/Codec.ts:1](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Codec.ts#L1)

___

### transferSubmittable

▸ **transferSubmittable**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`BuildTransferCallParameters`](../interfaces/Node_API.BuildTransferCallParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Balances.ts:125](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Balances.ts#L125)

___

### voidLoc

▸ **voidLoc**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`VoidLocParameters`](../interfaces/Node_API.VoidLocParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/LogionLoc.ts:289](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/LogionLoc.ts#L289)

___

### vouchRecovery

▸ **vouchRecovery**(`parameters`): `SubmittableExtrinsic`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`VouchRecoveryParameters`](../interfaces/Node_API.VouchRecoveryParameters.md) |

#### Returns

`SubmittableExtrinsic`

#### Defined in

[packages/node-api/src/Recovery.ts:86](https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Recovery.ts#L86)
