[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / BalanceState

# Class: BalanceState

[Client](../modules/Client.md).BalanceState

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`BalanceState`**

## Table of contents

### Constructors

- [constructor](Client.BalanceState.md#constructor)

### Accessors

- [balances](Client.BalanceState.md#balances)
- [discarded](Client.BalanceState.md#discarded)
- [transactions](Client.BalanceState.md#transactions)

### Methods

- [discard](Client.BalanceState.md#discard)
- [discardOnSuccess](Client.BalanceState.md#discardonsuccess)
- [ensureCurrent](Client.BalanceState.md#ensurecurrent)
- [refresh](Client.BalanceState.md#refresh)
- [syncDiscardOnSuccess](Client.BalanceState.md#syncdiscardonsuccess)
- [transfer](Client.BalanceState.md#transfer)

## Constructors

### constructor

• **new BalanceState**(`state`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`BalanceSharedState`](../interfaces/Client.BalanceSharedState.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Balance.ts:57](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L57)

## Accessors

### balances

• `get` **balances**(): [`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]

#### Returns

[`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]

#### Defined in

[packages/client/src/Balance.ts:69](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L69)

___

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

### transactions

• `get` **transactions**(): [`Transaction`](../interfaces/Client.Transaction.md)[]

#### Returns

[`Transaction`](../interfaces/Client.Transaction.md)[]

#### Defined in

[packages/client/src/Balance.ts:64](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L64)

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

### refresh

▸ **refresh**(): `Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Returns

`Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Defined in

[packages/client/src/Balance.ts:113](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L113)

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

### transfer

▸ **transfer**(`params`): `Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TransferParam`](../interfaces/Client.TransferParam.md) |

#### Returns

`Promise`<[`BalanceState`](Client.BalanceState.md)\>

#### Defined in

[packages/client/src/Balance.ts:74](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L74)
