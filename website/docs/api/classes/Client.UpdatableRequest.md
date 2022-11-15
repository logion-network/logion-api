[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / UpdatableRequest

# Class: UpdatableRequest

[Client](../modules/Client.md).UpdatableRequest

## Hierarchy

- [`CancellableRequest`](Client.CancellableRequest.md)

  ↳ **`UpdatableRequest`**

  ↳↳ [`UpdatableReSubmittableRequest`](Client.UpdatableReSubmittableRequest.md)

## Table of contents

### Constructors

- [constructor](Client.UpdatableRequest.md#constructor)

### Properties

- [addressToRecover](Client.UpdatableRequest.md#addresstorecover)
- [createdOn](Client.UpdatableRequest.md#createdon)
- [decision](Client.UpdatableRequest.md#decision)
- [id](Client.UpdatableRequest.md#id)
- [isRecovery](Client.UpdatableRequest.md#isrecovery)
- [legalOfficerAddress](Client.UpdatableRequest.md#legalofficeraddress)
- [loRecoveryClient](Client.UpdatableRequest.md#lorecoveryclient)
- [otherLegalOfficerAddress](Client.UpdatableRequest.md#otherlegalofficeraddress)
- [requesterAddress](Client.UpdatableRequest.md#requesteraddress)
- [status](Client.UpdatableRequest.md#status)
- [userIdentity](Client.UpdatableRequest.md#useridentity)
- [userPostalAddress](Client.UpdatableRequest.md#userpostaladdress)

### Methods

- [cancel](Client.UpdatableRequest.md#cancel)
- [update](Client.UpdatableRequest.md#update)

## Constructors

### constructor

• **new UpdatableRequest**(`protectionRequest`, `loRecoveryClient`)

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

### update

▸ **update**(`parameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`UpdateParameters`](../interfaces/Client.UpdateParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/Recovery.ts:472](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L472)
