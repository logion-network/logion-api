[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / VaultClient

# Class: VaultClient

[Client](../modules/Client.md).VaultClient

## Table of contents

### Constructors

- [constructor](Client.VaultClient.md#constructor)

### Methods

- [acceptVaultTransferRequest](Client.VaultClient.md#acceptvaulttransferrequest)
- [cancelVaultTransferRequest](Client.VaultClient.md#cancelvaulttransferrequest)
- [createVaultTransferRequest](Client.VaultClient.md#createvaulttransferrequest)
- [fetchAll](Client.VaultClient.md#fetchall)
- [rejectVaultTransferRequest](Client.VaultClient.md#rejectvaulttransferrequest)
- [resubmitVaultTransferRequest](Client.VaultClient.md#resubmitvaulttransferrequest)

## Constructors

### constructor

• **new VaultClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.currentAddress` | `string` |
| `params.isLegalOfficer` | `boolean` |
| `params.isRecovery` | `boolean` |
| `params.networkState` | [`NetworkState`](Client.NetworkState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\> |
| `params.token` | `string` |

#### Defined in

[packages/client/src/VaultClient.ts:52](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L52)

## Methods

### acceptVaultTransferRequest

▸ **acceptVaultTransferRequest**(`legalOfficer`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/VaultClient.ts:180](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L180)

___

### cancelVaultTransferRequest

▸ **cancelVaultTransferRequest**(`legalOfficer`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/VaultClient.ts:172](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L172)

___

### createVaultTransferRequest

▸ **createVaultTransferRequest**(`legalOfficer`, `params`): `Promise`<[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params` | [`CreateVaultTransferRequest`](../interfaces/Client.CreateVaultTransferRequest.md) |

#### Returns

`Promise`<[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)\>

#### Defined in

[packages/client/src/VaultClient.ts:160](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L160)

___

### fetchAll

▸ **fetchAll**(`legalOfficers?`): `Promise`<[`FetchAllResult`](../interfaces/Client.FetchAllResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficers?` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[] |

#### Returns

`Promise`<[`FetchAllResult`](../interfaces/Client.FetchAllResult.md)\>

#### Defined in

[packages/client/src/VaultClient.ts:80](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L80)

___

### rejectVaultTransferRequest

▸ **rejectVaultTransferRequest**(`legalOfficer`, `request`, `rejectReason`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |
| `rejectReason` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/VaultClient.ts:188](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L188)

___

### resubmitVaultTransferRequest

▸ **resubmitVaultTransferRequest**(`legalOfficer`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/VaultClient.ts:197](https://github.com/logion-network/logion-api/blob/main/packages/client/src/VaultClient.ts#L197)
