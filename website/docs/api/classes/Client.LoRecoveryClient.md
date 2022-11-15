[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LoRecoveryClient

# Class: LoRecoveryClient

[Client](../modules/Client.md).LoRecoveryClient

## Table of contents

### Constructors

- [constructor](Client.LoRecoveryClient.md#constructor)

### Methods

- [cancel](Client.LoRecoveryClient.md#cancel)
- [createProtectionRequest](Client.LoRecoveryClient.md#createprotectionrequest)
- [resubmit](Client.LoRecoveryClient.md#resubmit)
- [update](Client.LoRecoveryClient.md#update)

## Constructors

### constructor

• **new LoRecoveryClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.token` | `string` |

#### Defined in

[packages/client/src/RecoveryClient.ts:198](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L198)

## Methods

### cancel

▸ **cancel**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`UserActionParameters`](../interfaces/Client.UserActionParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/RecoveryClient.ts:222](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L222)

___

### createProtectionRequest

▸ **createProtectionRequest**(`request`): `Promise`<[`ProtectionRequest`](../interfaces/Client.ProtectionRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CreateProtectionRequest`](../interfaces/Client.CreateProtectionRequest.md) |

#### Returns

`Promise`<[`ProtectionRequest`](../interfaces/Client.ProtectionRequest.md)\>

#### Defined in

[packages/client/src/RecoveryClient.ts:212](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L212)

___

### resubmit

▸ **resubmit**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`UserActionParameters`](../interfaces/Client.UserActionParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/RecoveryClient.ts:217](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L217)

___

### update

▸ **update**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`UserActionParameters`](../interfaces/Client.UserActionParameters.md) & [`UpdateParameters`](../interfaces/Client.UpdateParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/RecoveryClient.ts:227](https://github.com/logion-network/logion-api/blob/main/packages/client/src/RecoveryClient.ts#L227)
