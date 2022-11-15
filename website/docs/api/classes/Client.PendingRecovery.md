[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / PendingRecovery

# Class: PendingRecovery

[Client](../modules/Client.md).PendingRecovery

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`PendingRecovery`**

## Implements

- [`WithProtectionParameters`](../interfaces/Client.WithProtectionParameters.md)
- [`WithActiveProtection`](../interfaces/Client.WithActiveProtection.md)<[`PendingRecovery`](Client.PendingRecovery.md)\>
- [`WithRefresh`](../interfaces/Client.WithRefresh.md)<[`PendingRecovery`](Client.PendingRecovery.md)\>

## Table of contents

### Constructors

- [constructor](Client.PendingRecovery.md#constructor)

### Accessors

- [discarded](Client.PendingRecovery.md#discarded)
- [protectionParameters](Client.PendingRecovery.md#protectionparameters)

### Methods

- [claimRecovery](Client.PendingRecovery.md#claimrecovery)
- [discard](Client.PendingRecovery.md#discard)
- [discardOnSuccess](Client.PendingRecovery.md#discardonsuccess)
- [ensureCurrent](Client.PendingRecovery.md#ensurecurrent)
- [isFullyReady](Client.PendingRecovery.md#isfullyready)
- [refresh](Client.PendingRecovery.md#refresh)
- [syncDiscardOnSuccess](Client.PendingRecovery.md#syncdiscardonsuccess)
- [vaultState](Client.PendingRecovery.md#vaultstate)
- [waitForFullyReady](Client.PendingRecovery.md#waitforfullyready)

## Constructors

### constructor

• **new PendingRecovery**(`sharedState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`RecoverySharedState`](../interfaces/Client.RecoverySharedState.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:727](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L727)

## Accessors

### discarded

• `get` **discarded**(): `boolean`

**`Description`**

True if this state was discarded

#### Returns

`boolean`

#### Inherited from

State.discarded

#### Defined in

[packages/client/src/State.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L22)

___

### protectionParameters

• `get` **protectionParameters**(): [`ProtectionParameters`](../interfaces/Client.ProtectionParameters.md)

#### Returns

[`ProtectionParameters`](../interfaces/Client.ProtectionParameters.md)

#### Implementation of

WithProtectionParameters.protectionParameters

#### Defined in

[packages/client/src/Recovery.ts:760](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L760)

## Methods

### claimRecovery

▸ **claimRecovery**(`signer`, `callback?`): `Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | [`Signer`](../interfaces/Client.Signer.md) |
| `callback?` | [`SignCallback`](../modules/Client.md#signcallback) |

#### Returns

`Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Defined in

[packages/client/src/Recovery.ts:734](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L734)

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

[State](Client.State.md).[discard](Client.State.md#discard)

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

[State](Client.State.md).[discardOnSuccess](Client.State.md#discardonsuccess)

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

[State](Client.State.md).[ensureCurrent](Client.State.md#ensurecurrent)

#### Defined in

[packages/client/src/State.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L30)

___

### isFullyReady

▸ **isFullyReady**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[WithActiveProtection](../interfaces/Client.WithActiveProtection.md).[isFullyReady](../interfaces/Client.WithActiveProtection.md#isfullyready)

#### Defined in

[packages/client/src/Recovery.ts:765](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L765)

___

### refresh

▸ **refresh**(): `Promise`<[`PendingRecovery`](Client.PendingRecovery.md)\>

#### Returns

`Promise`<[`PendingRecovery`](Client.PendingRecovery.md)\>

#### Implementation of

[WithRefresh](../interfaces/Client.WithRefresh.md).[refresh](../interfaces/Client.WithRefresh.md#refresh)

#### Defined in

[packages/client/src/Recovery.ts:775](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L775)

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

[State](Client.State.md).[syncDiscardOnSuccess](Client.State.md#syncdiscardonsuccess)

#### Defined in

[packages/client/src/State.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L66)

___

### vaultState

▸ **vaultState**(): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Recovery.ts:770](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L770)

___

### waitForFullyReady

▸ **waitForFullyReady**(`pollingParameters?`): `Promise`<[`PendingRecovery`](Client.PendingRecovery.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pollingParameters?` | [`PollingParameters`](../interfaces/Client.PollingParameters.md) |

#### Returns

`Promise`<[`PendingRecovery`](Client.PendingRecovery.md)\>

#### Implementation of

[WithActiveProtection](../interfaces/Client.WithActiveProtection.md).[waitForFullyReady](../interfaces/Client.WithActiveProtection.md#waitforfullyready)

#### Defined in

[packages/client/src/Recovery.ts:779](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L779)
