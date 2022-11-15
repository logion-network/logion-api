[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / State

# Class: State

[Client](../modules/Client.md).State

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- **`State`**

  ↳ [`BalanceState`](Client.BalanceState.md)

  ↳ [`LocsState`](Client.LocsState.md)

  ↳ [`LocRequestState`](Client.LocRequestState.md)

  ↳ [`NoProtection`](Client.NoProtection.md)

  ↳ [`UnavailableProtection`](Client.UnavailableProtection.md)

  ↳ [`PendingProtection`](Client.PendingProtection.md)

  ↳ [`RejectedRecovery`](Client.RejectedRecovery.md)

  ↳ [`AcceptedProtection`](Client.AcceptedProtection.md)

  ↳ [`ActiveProtection`](Client.ActiveProtection.md)

  ↳ [`PendingRecovery`](Client.PendingRecovery.md)

  ↳ [`ClaimedRecovery`](Client.ClaimedRecovery.md)

  ↳ [`VaultState`](Client.VaultState.md)

## Table of contents

### Constructors

- [constructor](Client.State.md#constructor)

### Accessors

- [discarded](Client.State.md#discarded)

### Methods

- [discard](Client.State.md#discard)
- [discardOnSuccess](Client.State.md#discardonsuccess)
- [ensureCurrent](Client.State.md#ensurecurrent)
- [syncDiscardOnSuccess](Client.State.md#syncdiscardonsuccess)

## Constructors

### constructor

• **new State**()

#### Defined in

[packages/client/src/State.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L13)

## Accessors

### discarded

• `get` **discarded**(): `boolean`

**`Description`**

True if this state was discarded

#### Returns

`boolean`

#### Defined in

[packages/client/src/State.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L22)

## Methods

### discard

▸ `Protected` **discard**(): `void`

**`Description`**

Discards current state. One must discard the state only
if the state transition was successfully executed. It may be safer to
use `discardOnSuccess`.

#### Returns

`void`

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

#### Defined in

[packages/client/src/State.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L30)

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

#### Defined in

[packages/client/src/State.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L66)
