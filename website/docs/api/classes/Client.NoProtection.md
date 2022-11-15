[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / NoProtection

# Class: NoProtection

[Client](../modules/Client.md).NoProtection

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`NoProtection`**

## Table of contents

### Constructors

- [constructor](Client.NoProtection.md#constructor)

### Accessors

- [discarded](Client.NoProtection.md#discarded)
- [protectionParameters](Client.NoProtection.md#protectionparameters)

### Methods

- [discard](Client.NoProtection.md#discard)
- [discardOnSuccess](Client.NoProtection.md#discardonsuccess)
- [ensureCurrent](Client.NoProtection.md#ensurecurrent)
- [refresh](Client.NoProtection.md#refresh)
- [requestProtection](Client.NoProtection.md#requestprotection)
- [requestRecovery](Client.NoProtection.md#requestrecovery)
- [syncDiscardOnSuccess](Client.NoProtection.md#syncdiscardonsuccess)

## Constructors

### constructor

• **new NoProtection**(`sharedState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Recovery.ts:164](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L164)

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

#### Defined in

[packages/client/src/Recovery.ts:287](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L287)

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

▸ **refresh**(): `Promise`<[`NoProtection`](Client.NoProtection.md)\>

#### Returns

`Promise`<[`NoProtection`](Client.NoProtection.md)\>

#### Defined in

[packages/client/src/Recovery.ts:171](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L171)

___

### requestProtection

▸ **requestProtection**(`params`): `Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.legalOfficer1` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.legalOfficer2` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.postalAddress` | [`PostalAddress`](../interfaces/Client.PostalAddress.md) |
| `params.userIdentity` | [`UserIdentity`](../interfaces/Client.UserIdentity.md) |

#### Returns

`Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Defined in

[packages/client/src/Recovery.ts:186](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L186)

___

### requestRecovery

▸ **requestRecovery**(`params`): `Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.callback?` | [`SignCallback`](../modules/Client.md#signcallback) |
| `params.legalOfficer1` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.legalOfficer2` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.postalAddress` | [`PostalAddress`](../interfaces/Client.PostalAddress.md) |
| `params.recoveredAddress` | `string` |
| `params.signer` | [`Signer`](../interfaces/Client.Signer.md) |
| `params.userIdentity` | [`UserIdentity`](../interfaces/Client.UserIdentity.md) |

#### Returns

`Promise`<[`PendingProtection`](Client.PendingProtection.md)\>

#### Defined in

[packages/client/src/Recovery.ts:248](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L248)

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
