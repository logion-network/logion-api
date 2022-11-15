[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ClaimedRecovery

# Class: ClaimedRecovery

[Client](../modules/Client.md).ClaimedRecovery

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`ClaimedRecovery`**

## Implements

- [`WithProtectionParameters`](../interfaces/Client.WithProtectionParameters.md)

## Table of contents

### Constructors

- [constructor](Client.ClaimedRecovery.md#constructor)

### Accessors

- [discarded](Client.ClaimedRecovery.md#discarded)
- [protectionParameters](Client.ClaimedRecovery.md#protectionparameters)

### Methods

- [discard](Client.ClaimedRecovery.md#discard)
- [discardOnSuccess](Client.ClaimedRecovery.md#discardonsuccess)
- [ensureCurrent](Client.ClaimedRecovery.md#ensurecurrent)
- [isFullyReady](Client.ClaimedRecovery.md#isfullyready)
- [recoveredBalanceState](Client.ClaimedRecovery.md#recoveredbalancestate)
- [recoveredVaultState](Client.ClaimedRecovery.md#recoveredvaultstate)
- [refresh](Client.ClaimedRecovery.md#refresh)
- [syncDiscardOnSuccess](Client.ClaimedRecovery.md#syncdiscardonsuccess)
- [vaultState](Client.ClaimedRecovery.md#vaultstate)
- [waitForFullyReady](Client.ClaimedRecovery.md#waitforfullyready)

## Constructors

### constructor

• **new ClaimedRecovery**(`sharedState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`RecoverySharedState`](../interfaces/Client.RecoverySharedState.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:785](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L785)

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

[packages/client/src/Recovery.ts:792](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L792)

## Methods

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

#### Defined in

[packages/client/src/Recovery.ts:797](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L797)

___

### recoveredBalanceState

▸ **recoveredBalanceState**(): `Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Returns

`Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Defined in

[packages/client/src/Recovery.ts:823](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L823)

___

### recoveredVaultState

▸ **recoveredVaultState**(): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Recovery.ts:815](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L815)

___

### refresh

▸ **refresh**(): `Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Returns

`Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Defined in

[packages/client/src/Recovery.ts:807](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L807)

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

[packages/client/src/Recovery.ts:802](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L802)

___

### waitForFullyReady

▸ **waitForFullyReady**(`pollingParameters?`): `Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pollingParameters?` | [`PollingParameters`](../interfaces/Client.PollingParameters.md) |

#### Returns

`Promise`<[`ClaimedRecovery`](Client.ClaimedRecovery.md)\>

#### Defined in

[packages/client/src/Recovery.ts:811](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L811)
