[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ReSubmittableRequest

# Class: ReSubmittableRequest

[Client](../modules/Client.md).ReSubmittableRequest

## Hierarchy

- [`CancellableRequest`](Client.CancellableRequest.md)

  ↳ **`ReSubmittableRequest`**

## Table of contents

### Constructors

- [constructor](Client.ReSubmittableRequest.md#constructor)

### Properties

- [addressToRecover](Client.ReSubmittableRequest.md#addresstorecover)
- [createdOn](Client.ReSubmittableRequest.md#createdon)
- [decision](Client.ReSubmittableRequest.md#decision)
- [id](Client.ReSubmittableRequest.md#id)
- [isRecovery](Client.ReSubmittableRequest.md#isrecovery)
- [legalOfficerAddress](Client.ReSubmittableRequest.md#legalofficeraddress)
- [loRecoveryClient](Client.ReSubmittableRequest.md#lorecoveryclient)
- [otherLegalOfficerAddress](Client.ReSubmittableRequest.md#otherlegalofficeraddress)
- [requesterAddress](Client.ReSubmittableRequest.md#requesteraddress)
- [status](Client.ReSubmittableRequest.md#status)
- [userIdentity](Client.ReSubmittableRequest.md#useridentity)
- [userPostalAddress](Client.ReSubmittableRequest.md#userpostaladdress)

### Methods

- [cancel](Client.ReSubmittableRequest.md#cancel)
- [resubmit](Client.ReSubmittableRequest.md#resubmit)

## Constructors

### constructor

• **new ReSubmittableRequest**(`protectionRequest`, `loRecoveryClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `protectionRequest` | [`ProtectionRequest`](../interfaces/Client.ProtectionRequest.md) |
| `loRecoveryClient` | [`LoRecoveryClient`](Client.LoRecoveryClient.md) |

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[constructor](Client.CancellableRequest.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:431](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L431)

## Properties

### addressToRecover

• `Readonly` **addressToRecover**: ``null`` \| `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[addressToRecover](Client.CancellableRequest.md#addresstorecover)

#### Defined in

[packages/client/src/Recovery.ts:453](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L453)

___

### createdOn

• `Readonly` **createdOn**: `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[createdOn](Client.CancellableRequest.md#createdon)

#### Defined in

[packages/client/src/Recovery.ts:451](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L451)

___

### decision

• `Readonly` **decision**: [`LegalOfficerDecision`](../interfaces/Client.LegalOfficerDecision.md)

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[decision](Client.CancellableRequest.md#decision)

#### Defined in

[packages/client/src/Recovery.ts:448](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L448)

___

### id

• `Readonly` **id**: `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[id](Client.CancellableRequest.md#id)

#### Defined in

[packages/client/src/Recovery.ts:446](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L446)

___

### isRecovery

• `Readonly` **isRecovery**: `boolean`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[isRecovery](Client.CancellableRequest.md#isrecovery)

#### Defined in

[packages/client/src/Recovery.ts:452](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L452)

___

### legalOfficerAddress

• `Readonly` **legalOfficerAddress**: `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[legalOfficerAddress](Client.CancellableRequest.md#legalofficeraddress)

#### Defined in

[packages/client/src/Recovery.ts:455](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L455)

___

### loRecoveryClient

• `Protected` `Readonly` **loRecoveryClient**: [`LoRecoveryClient`](Client.LoRecoveryClient.md)

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[loRecoveryClient](Client.CancellableRequest.md#lorecoveryclient)

#### Defined in

[packages/client/src/Recovery.ts:458](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L458)

___

### otherLegalOfficerAddress

• `Readonly` **otherLegalOfficerAddress**: `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[otherLegalOfficerAddress](Client.CancellableRequest.md#otherlegalofficeraddress)

#### Defined in

[packages/client/src/Recovery.ts:456](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L456)

___

### requesterAddress

• `Readonly` **requesterAddress**: `string`

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[requesterAddress](Client.CancellableRequest.md#requesteraddress)

#### Defined in

[packages/client/src/Recovery.ts:447](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L447)

___

### status

• `Readonly` **status**: [`ProtectionRequestStatus`](../modules/Client.md#protectionrequeststatus)

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[status](Client.CancellableRequest.md#status)

#### Defined in

[packages/client/src/Recovery.ts:454](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L454)

___

### userIdentity

• `Readonly` **userIdentity**: [`UserIdentity`](../interfaces/Client.UserIdentity.md)

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[userIdentity](Client.CancellableRequest.md#useridentity)

#### Defined in

[packages/client/src/Recovery.ts:449](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L449)

___

### userPostalAddress

• `Readonly` **userPostalAddress**: [`PostalAddress`](../interfaces/Client.PostalAddress.md)

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[userPostalAddress](Client.CancellableRequest.md#userpostaladdress)

#### Defined in

[packages/client/src/Recovery.ts:450](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L450)

## Methods

### cancel

▸ **cancel**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[CancellableRequest](Client.CancellableRequest.md).[cancel](Client.CancellableRequest.md#cancel)

#### Defined in

[packages/client/src/Recovery.ts:463](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L463)

___

### resubmit

▸ **resubmit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/Recovery.ts:482](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L482)
