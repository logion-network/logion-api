[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / VaultState

# Class: VaultState

[Client](../modules/Client.md).VaultState

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`VaultState`**

## Table of contents

### Constructors

- [constructor](Client.VaultState.md#constructor)

### Accessors

- [acceptedVaultTransferRequests](Client.VaultState.md#acceptedvaulttransferrequests)
- [balances](Client.VaultState.md#balances)
- [cancelledVaultTransferRequests](Client.VaultState.md#cancelledvaulttransferrequests)
- [discarded](Client.VaultState.md#discarded)
- [pendingVaultTransferRequests](Client.VaultState.md#pendingvaulttransferrequests)
- [rejectedVaultTransferRequests](Client.VaultState.md#rejectedvaulttransferrequests)
- [transactions](Client.VaultState.md#transactions)
- [vaultAddress](Client.VaultState.md#vaultaddress)
- [vaultTransferRequestsHistory](Client.VaultState.md#vaulttransferrequestshistory)

### Methods

- [cancelVaultTransferRequest](Client.VaultState.md#cancelvaulttransferrequest)
- [createVaultTransferRequest](Client.VaultState.md#createvaulttransferrequest)
- [discard](Client.VaultState.md#discard)
- [discardOnSuccess](Client.VaultState.md#discardonsuccess)
- [ensureCurrent](Client.VaultState.md#ensurecurrent)
- [refresh](Client.VaultState.md#refresh)
- [resubmitVaultTransferRequest](Client.VaultState.md#resubmitvaulttransferrequest)
- [syncDiscardOnSuccess](Client.VaultState.md#syncdiscardonsuccess)
- [create](Client.VaultState.md#create)

## Constructors

### constructor

• **new VaultState**(`state`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VaultSharedState`](../interfaces/Client.VaultSharedState.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Vault.ts:99](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L99)

## Accessors

### acceptedVaultTransferRequests

• `get` **acceptedVaultTransferRequests**(): [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Returns

[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:121](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L121)

___

### balances

• `get` **balances**(): [`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]

#### Returns

[`CoinBalance`](../interfaces/Node_API.CoinBalance.md)[]

#### Defined in

[packages/client/src/Vault.ts:360](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L360)

___

### cancelledVaultTransferRequests

• `get` **cancelledVaultTransferRequests**(): [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Returns

[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:111](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L111)

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

### pendingVaultTransferRequests

• `get` **pendingVaultTransferRequests**(): [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Returns

[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:106](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L106)

___

### rejectedVaultTransferRequests

• `get` **rejectedVaultTransferRequests**(): [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Returns

[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:116](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L116)

___

### transactions

• `get` **transactions**(): [`Transaction`](../interfaces/Client.Transaction.md)[]

#### Returns

[`Transaction`](../interfaces/Client.Transaction.md)[]

#### Defined in

[packages/client/src/Vault.ts:355](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L355)

___

### vaultAddress

• `get` **vaultAddress**(): `string`

#### Returns

`string`

#### Defined in

[packages/client/src/Vault.ts:350](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L350)

___

### vaultTransferRequestsHistory

• `get` **vaultTransferRequestsHistory**(): [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Returns

[`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:126](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L126)

## Methods

### cancelVaultTransferRequest

▸ **cancelVaultTransferRequest**(`legalOfficer`, `request`, `signer`, `callback?`): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |
| `signer` | [`Signer`](../interfaces/Client.Signer.md) |
| `callback?` | [`SignCallback`](../modules/Client.md#signcallback) |

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Vault.ts:224](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L224)

___

### createVaultTransferRequest

▸ **createVaultTransferRequest**(`params`): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.amount` | [`PrefixedNumber`](Node_API.PrefixedNumber.md) |
| `params.callback?` | [`SignCallback`](../modules/Client.md#signcallback) |
| `params.destination` | `string` |
| `params.legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `params.signer` | [`Signer`](../interfaces/Client.Signer.md) |

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Vault.ts:133](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L133)

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

### refresh

▸ **refresh**(): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Vault.ts:333](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L333)

___

### resubmitVaultTransferRequest

▸ **resubmitVaultTransferRequest**(`legalOfficer`, `request`): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |
| `request` | [`VaultTransferRequest`](../interfaces/Client.VaultTransferRequest.md) |

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Vault.ts:301](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L301)

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

### create

▸ `Static` **create**(`sharedState`): `Promise`<[`VaultState`](Client.VaultState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`VaultStateCreationParameters`](../modules/Client.md#vaultstatecreationparameters) |

#### Returns

`Promise`<[`VaultState`](Client.VaultState.md)\>

#### Defined in

[packages/client/src/Vault.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L43)
