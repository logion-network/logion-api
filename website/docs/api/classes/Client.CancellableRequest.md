[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / CancellableRequest

# Class: CancellableRequest

[Client](../modules/Client.md).CancellableRequest

## Hierarchy

- `ProtectionRequestImpl`

  ↳ **`CancellableRequest`**

  ↳↳ [`UpdatableRequest`](Client.UpdatableRequest.md)

  ↳↳ [`ReSubmittableRequest`](Client.ReSubmittableRequest.md)

## Table of contents

### Constructors

- [constructor](Client.CancellableRequest.md#constructor)

### Properties

- [addressToRecover](Client.CancellableRequest.md#addresstorecover)
- [createdOn](Client.CancellableRequest.md#createdon)
- [decision](Client.CancellableRequest.md#decision)
- [id](Client.CancellableRequest.md#id)
- [isRecovery](Client.CancellableRequest.md#isrecovery)
- [legalOfficerAddress](Client.CancellableRequest.md#legalofficeraddress)
- [loRecoveryClient](Client.CancellableRequest.md#lorecoveryclient)
- [otherLegalOfficerAddress](Client.CancellableRequest.md#otherlegalofficeraddress)
- [requesterAddress](Client.CancellableRequest.md#requesteraddress)
- [status](Client.CancellableRequest.md#status)
- [userIdentity](Client.CancellableRequest.md#useridentity)
- [userPostalAddress](Client.CancellableRequest.md#userpostaladdress)

### Methods

- [cancel](Client.CancellableRequest.md#cancel)

## Constructors

### constructor

• **new CancellableRequest**(`protectionRequest`, `loRecoveryClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `protectionRequest` | [`ProtectionRequest`](../interfaces/Client.ProtectionRequest.md) |
| `loRecoveryClient` | [`LoRecoveryClient`](Client.LoRecoveryClient.md) |

#### Inherited from

ProtectionRequestImpl.constructor

#### Defined in

[packages/client/src/Recovery.ts:431](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L431)

## Properties

### addressToRecover

• `Readonly` **addressToRecover**: ``null`` \| `string`

#### Inherited from

ProtectionRequestImpl.addressToRecover

#### Defined in

[packages/client/src/Recovery.ts:453](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L453)

___

### createdOn

• `Readonly` **createdOn**: `string`

#### Inherited from

ProtectionRequestImpl.createdOn

#### Defined in

[packages/client/src/Recovery.ts:451](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L451)

___

### decision

• `Readonly` **decision**: [`LegalOfficerDecision`](../interfaces/Client.LegalOfficerDecision.md)

#### Inherited from

ProtectionRequestImpl.decision

#### Defined in

[packages/client/src/Recovery.ts:448](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L448)

___

### id

• `Readonly` **id**: `string`

#### Inherited from

ProtectionRequestImpl.id

#### Defined in

[packages/client/src/Recovery.ts:446](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L446)

___

### isRecovery

• `Readonly` **isRecovery**: `boolean`

#### Inherited from

ProtectionRequestImpl.isRecovery

#### Defined in

[packages/client/src/Recovery.ts:452](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L452)

___

### legalOfficerAddress

• `Readonly` **legalOfficerAddress**: `string`

#### Inherited from

ProtectionRequestImpl.legalOfficerAddress

#### Defined in

[packages/client/src/Recovery.ts:455](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L455)

___

### loRecoveryClient

• `Protected` `Readonly` **loRecoveryClient**: [`LoRecoveryClient`](Client.LoRecoveryClient.md)

#### Inherited from

ProtectionRequestImpl.loRecoveryClient

#### Defined in

[packages/client/src/Recovery.ts:458](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L458)

___

### otherLegalOfficerAddress

• `Readonly` **otherLegalOfficerAddress**: `string`

#### Inherited from

ProtectionRequestImpl.otherLegalOfficerAddress

#### Defined in

[packages/client/src/Recovery.ts:456](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L456)

___

### requesterAddress

• `Readonly` **requesterAddress**: `string`

#### Inherited from

ProtectionRequestImpl.requesterAddress

#### Defined in

[packages/client/src/Recovery.ts:447](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L447)

___

### status

• `Readonly` **status**: [`ProtectionRequestStatus`](../modules/Client.md#protectionrequeststatus)

#### Inherited from

ProtectionRequestImpl.status

#### Defined in

[packages/client/src/Recovery.ts:454](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L454)

___

### userIdentity

• `Readonly` **userIdentity**: [`UserIdentity`](../interfaces/Client.UserIdentity.md)

#### Inherited from

ProtectionRequestImpl.userIdentity

#### Defined in

[packages/client/src/Recovery.ts:449](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L449)

___

### userPostalAddress

• `Readonly` **userPostalAddress**: [`PostalAddress`](../interfaces/Client.PostalAddress.md)

#### Inherited from

ProtectionRequestImpl.userPostalAddress

#### Defined in

[packages/client/src/Recovery.ts:450](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L450)

## Methods

### cancel

▸ **cancel**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/Recovery.ts:463](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L463)
