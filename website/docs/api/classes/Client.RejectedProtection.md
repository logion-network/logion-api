[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / RejectedProtection

# Class: RejectedProtection

[Client](../modules/Client.md).RejectedProtection

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`RejectedRecovery`](Client.RejectedRecovery.md)

  ↳ **`RejectedProtection`**

## Table of contents

### Constructors

- [constructor](Client.RejectedProtection.md#constructor)

### Properties

- [sharedState](Client.RejectedProtection.md#sharedstate)

### Accessors

- [discarded](Client.RejectedProtection.md#discarded)
- [protectionParameters](Client.RejectedProtection.md#protectionparameters)

### Methods

- [cancel](Client.RejectedProtection.md#cancel)
- [changeLegalOfficer](Client.RejectedProtection.md#changelegalofficer)
- [discard](Client.RejectedProtection.md#discard)
- [discardOnSuccess](Client.RejectedProtection.md#discardonsuccess)
- [ensureCurrent](Client.RejectedProtection.md#ensurecurrent)
- [resubmit](Client.RejectedProtection.md#resubmit)
- [syncDiscardOnSuccess](Client.RejectedProtection.md#syncdiscardonsuccess)

## Constructors

### constructor

• **new RejectedProtection**(`sharedState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`RecoverySharedState`](../interfaces/Client.RecoverySharedState.md) |

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[constructor](Client.RejectedRecovery.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:500](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L500)

## Properties

### sharedState

• `Protected` `Readonly` **sharedState**: [`RecoverySharedState`](../interfaces/Client.RecoverySharedState.md)

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[sharedState](Client.RejectedRecovery.md#sharedstate)

#### Defined in

[packages/client/src/Recovery.ts:505](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L505)

## Accessors

### discarded

• `get` **discarded**(): `boolean`

**`Description`**

True if this state was discarded

#### Returns

`boolean`

#### Inherited from

RejectedRecovery.discarded

#### Defined in

[packages/client/src/State.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L22)

___

### protectionParameters

• `get` **protectionParameters**(): [`ProtectionParameters`](../interfaces/Client.ProtectionParameters.md)

#### Returns

[`ProtectionParameters`](../interfaces/Client.ProtectionParameters.md)

#### Inherited from

RejectedRecovery.protectionParameters

#### Defined in

[packages/client/src/Recovery.ts:507](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L507)

## Methods

### cancel

▸ **cancel**(): `Promise`<[`NoProtection`](Client.NoProtection.md)\>

#### Returns

`Promise`<[`NoProtection`](Client.NoProtection.md)\>

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[cancel](Client.RejectedRecovery.md#cancel)

#### Defined in

[packages/client/src/Recovery.ts:512](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L512)

___

### changeLegalOfficer

▸ **changeLegalOfficer**(`currentLegalOfficer`, `newLegalOfficer`): `Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentLegalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `newLegalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

`Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Defined in

[packages/client/src/Recovery.ts:546](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L546)

___

### discard

▸ `Protected` **discard**(): `void`

**`Description`**

Discards current state. One must discard the state only
if the state transition was successfully executed. It may be safer to
use `discardOnSuccess`.

#### Returns

`void`

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[discard](Client.RejectedRecovery.md#discard)

#### Defined in

[packages/client/src/State.ts:41](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L41)

___

### discardOnSuccess

▸ `Protected` **discardOnSuccess**<`T`\>(`action`): `Promise`<`T`\>

**`Descripiton`**

Discards current state only if given state transition logic
executed successfully (i.e. without throwing an error).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`State`](Client.State.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | () => `Promise`<`T`\> | The state transition logic producing next state |

#### Returns

`Promise`<`T`\>

Next state if state transition logic execution did not throw

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[discardOnSuccess](Client.RejectedRecovery.md#discardonsuccess)

#### Defined in

[packages/client/src/State.ts:52](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L52)

___

### ensureCurrent

▸ `Protected` **ensureCurrent**(): `void`

**`Description`**

Throws an error if this state was discarded.
This should be called by all public methods of client class.

#### Returns

`void`

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[ensureCurrent](Client.RejectedRecovery.md#ensurecurrent)

#### Defined in

[packages/client/src/State.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L30)

___

### resubmit

▸ **resubmit**(`currentLegalOfficer`): `Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentLegalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

`Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[resubmit](Client.RejectedRecovery.md#resubmit)

#### Defined in

[packages/client/src/Recovery.ts:528](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L528)

___

### syncDiscardOnSuccess

▸ `Protected` **syncDiscardOnSuccess**<`T`\>(`action`): `T`

**`Descripiton`**

Same as `discardOnSuccess` but with a synchronous action.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`State`](Client.State.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | () => `T` | The state transition logic producing next state |

#### Returns

`T`

Next state if state transition logic execution did not throw

#### Inherited from

[RejectedRecovery](Client.RejectedRecovery.md).[syncDiscardOnSuccess](Client.RejectedRecovery.md#syncdiscardonsuccess)

#### Defined in

[packages/client/src/State.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L66)
