[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / UpdatableReSubmittableRequest

# Class: UpdatableReSubmittableRequest

[Client](../modules/Client.md).UpdatableReSubmittableRequest

## Hierarchy

- [`UpdatableRequest`](Client.UpdatableRequest.md)

  ↳ **`UpdatableReSubmittableRequest`**

## Table of contents

### Constructors

- [constructor](Client.UpdatableReSubmittableRequest.md#constructor)

### Properties

- [addressToRecover](Client.UpdatableReSubmittableRequest.md#addresstorecover)
- [createdOn](Client.UpdatableReSubmittableRequest.md#createdon)
- [decision](Client.UpdatableReSubmittableRequest.md#decision)
- [id](Client.UpdatableReSubmittableRequest.md#id)
- [isRecovery](Client.UpdatableReSubmittableRequest.md#isrecovery)
- [legalOfficerAddress](Client.UpdatableReSubmittableRequest.md#legalofficeraddress)
- [loRecoveryClient](Client.UpdatableReSubmittableRequest.md#lorecoveryclient)
- [otherLegalOfficerAddress](Client.UpdatableReSubmittableRequest.md#otherlegalofficeraddress)
- [requesterAddress](Client.UpdatableReSubmittableRequest.md#requesteraddress)
- [status](Client.UpdatableReSubmittableRequest.md#status)
- [userIdentity](Client.UpdatableReSubmittableRequest.md#useridentity)
- [userPostalAddress](Client.UpdatableReSubmittableRequest.md#userpostaladdress)

### Methods

- [cancel](Client.UpdatableReSubmittableRequest.md#cancel)
- [resubmit](Client.UpdatableReSubmittableRequest.md#resubmit)
- [update](Client.UpdatableReSubmittableRequest.md#update)

## Constructors

### constructor

• **new UpdatableReSubmittableRequest**(`protectionRequest`, `loRecoveryClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `protectionRequest` | [`ProtectionRequest`](../interfaces/Client.ProtectionRequest.md) |
| `loRecoveryClient` | [`LoRecoveryClient`](Client.LoRecoveryClient.md) |

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[constructor](Client.UpdatableRequest.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:431](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L431)

## Properties

### addressToRecover

• `Readonly` **addressToRecover**: ``null`` \| `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[addressToRecover](Client.UpdatableRequest.md#addresstorecover)

#### Defined in

[packages/client/src/Recovery.ts:453](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L453)

___

### createdOn

• `Readonly` **createdOn**: `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[createdOn](Client.UpdatableRequest.md#createdon)

#### Defined in

[packages/client/src/Recovery.ts:451](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L451)

___

### decision

• `Readonly` **decision**: [`LegalOfficerDecision`](../interfaces/Client.LegalOfficerDecision.md)

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[decision](Client.UpdatableRequest.md#decision)

#### Defined in

[packages/client/src/Recovery.ts:448](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L448)

___

### id

• `Readonly` **id**: `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[id](Client.UpdatableRequest.md#id)

#### Defined in

[packages/client/src/Recovery.ts:446](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L446)

___

### isRecovery

• `Readonly` **isRecovery**: `boolean`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[isRecovery](Client.UpdatableRequest.md#isrecovery)

#### Defined in

[packages/client/src/Recovery.ts:452](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L452)

___

### legalOfficerAddress

• `Readonly` **legalOfficerAddress**: `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[legalOfficerAddress](Client.UpdatableRequest.md#legalofficeraddress)

#### Defined in

[packages/client/src/Recovery.ts:455](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L455)

___

### loRecoveryClient

• `Protected` `Readonly` **loRecoveryClient**: [`LoRecoveryClient`](Client.LoRecoveryClient.md)

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[loRecoveryClient](Client.UpdatableRequest.md#lorecoveryclient)

#### Defined in

[packages/client/src/Recovery.ts:458](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L458)

___

### otherLegalOfficerAddress

• `Readonly` **otherLegalOfficerAddress**: `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[otherLegalOfficerAddress](Client.UpdatableRequest.md#otherlegalofficeraddress)

#### Defined in

[packages/client/src/Recovery.ts:456](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L456)

___

### requesterAddress

• `Readonly` **requesterAddress**: `string`

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[requesterAddress](Client.UpdatableRequest.md#requesteraddress)

#### Defined in

[packages/client/src/Recovery.ts:447](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L447)

___

### status

• `Readonly` **status**: [`ProtectionRequestStatus`](../modules/Client.md#protectionrequeststatus)

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[status](Client.UpdatableRequest.md#status)

#### Defined in

[packages/client/src/Recovery.ts:454](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L454)

___

### userIdentity

• `Readonly` **userIdentity**: [`UserIdentity`](../interfaces/Client.UserIdentity.md)

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[userIdentity](Client.UpdatableRequest.md#useridentity)

#### Defined in

[packages/client/src/Recovery.ts:449](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L449)

___

### userPostalAddress

• `Readonly` **userPostalAddress**: [`PostalAddress`](../interfaces/Client.PostalAddress.md)

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[userPostalAddress](Client.UpdatableRequest.md#userpostaladdress)

#### Defined in

[packages/client/src/Recovery.ts:450](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L450)

## Methods

### cancel

▸ **cancel**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[cancel](Client.UpdatableRequest.md#cancel)

#### Defined in

[packages/client/src/Recovery.ts:463](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L463)

___

### resubmit

▸ **resubmit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/Recovery.ts:491](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L491)

___

### update

▸ **update**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`UpdateParameters`](../interfaces/Client.UpdateParameters.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[UpdatableRequest](Client.UpdatableRequest.md).[update](Client.UpdatableRequest.md#update)

#### Defined in

[packages/client/src/Recovery.ts:472](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L472)
