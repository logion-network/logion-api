[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocsState

# Class: LocsState

[Client](../modules/Client.md).LocsState

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`State`](Client.State.md)

  ↳ **`LocsState`**

## Table of contents

### Constructors

- [constructor](Client.LocsState.md#constructor)

### Accessors

- [client](Client.LocsState.md#client)
- [closedLocs](Client.LocsState.md#closedlocs)
- [discarded](Client.LocsState.md#discarded)
- [draftRequests](Client.LocsState.md#draftrequests)
- [isVerifiedThirdParty](Client.LocsState.md#isverifiedthirdparty)
- [legalOfficersWithValidIdentityLoc](Client.LocsState.md#legalofficerswithvalididentityloc)
- [openLocs](Client.LocsState.md#openlocs)
- [pendingRequests](Client.LocsState.md#pendingrequests)
- [rejectedRequests](Client.LocsState.md#rejectedrequests)
- [voidedLocs](Client.LocsState.md#voidedlocs)

### Methods

- [discard](Client.LocsState.md#discard)
- [discardOnSuccess](Client.LocsState.md#discardonsuccess)
- [ensureCurrent](Client.LocsState.md#ensurecurrent)
- [findById](Client.LocsState.md#findbyid)
- [hasValidIdentityLoc](Client.LocsState.md#hasvalididentityloc)
- [refresh](Client.LocsState.md#refresh)
- [refreshWith](Client.LocsState.md#refreshwith)
- [refreshWithout](Client.LocsState.md#refreshwithout)
- [requestCollectionLoc](Client.LocsState.md#requestcollectionloc)
- [requestIdentityLoc](Client.LocsState.md#requestidentityloc)
- [requestLoc](Client.LocsState.md#requestloc)
- [requestTransactionLoc](Client.LocsState.md#requesttransactionloc)
- [syncDiscardOnSuccess](Client.LocsState.md#syncdiscardonsuccess)
- [getInitialLocsState](Client.LocsState.md#getinitiallocsstate)

## Constructors

### constructor

• **new LocsState**(`sharedState`, `locs`, `client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |
| `locs` | `Record`<`string`, [`LocRequestState`](Client.LocRequestState.md)\> |
| `client` | [`LogionClient`](Client.LogionClient.md) |

#### Overrides

[State](Client.State.md).[constructor](Client.State.md#constructor)

#### Defined in

[packages/client/src/Loc.ts:71](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L71)

## Accessors

### client

• `get` **client**(): [`LogionClient`](Client.LogionClient.md)

#### Returns

[`LogionClient`](Client.LogionClient.md)

#### Defined in

[packages/client/src/Loc.ts:252](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L252)

___

### closedLocs

• `get` **closedLocs**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), ([`ClosedLoc`](Client.ClosedLoc.md) \| [`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md))[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), ([`ClosedLoc`](Client.ClosedLoc.md) \| [`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md))[]\>

#### Defined in

[packages/client/src/Loc.ts:88](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L88)

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

### draftRequests

• `get` **draftRequests**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), [`DraftRequest`](Client.DraftRequest.md)[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), [`DraftRequest`](Client.DraftRequest.md)[]\>

#### Defined in

[packages/client/src/Loc.ts:78](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L78)

___

### isVerifiedThirdParty

• `get` **isVerifiedThirdParty**(): `boolean`

Tells if current user is a Verified Third Party.

#### Returns

`boolean`

True if it is, false otherwise.

#### Defined in

[packages/client/src/Loc.ts:261](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L261)

___

### legalOfficersWithValidIdentityLoc

• `get` **legalOfficersWithValidIdentityLoc**(): [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Returns

[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/Loc.ts:116](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L116)

___

### openLocs

• `get` **openLocs**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), [`OpenLoc`](Client.OpenLoc.md)[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), [`OpenLoc`](Client.OpenLoc.md)[]\>

#### Defined in

[packages/client/src/Loc.ts:83](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L83)

___

### pendingRequests

• `get` **pendingRequests**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), [`PendingRequest`](Client.PendingRequest.md)[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), [`PendingRequest`](Client.PendingRequest.md)[]\>

#### Defined in

[packages/client/src/Loc.ts:98](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L98)

___

### rejectedRequests

• `get` **rejectedRequests**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), [`RejectedRequest`](Client.RejectedRequest.md)[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), [`RejectedRequest`](Client.RejectedRequest.md)[]\>

#### Defined in

[packages/client/src/Loc.ts:103](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L103)

___

### voidedLocs

• `get` **voidedLocs**(): `Record`<[`LocType`](../modules/Node_API.md#loctype), ([`VoidedLoc`](Client.VoidedLoc.md) \| [`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md))[]\>

#### Returns

`Record`<[`LocType`](../modules/Node_API.md#loctype), ([`VoidedLoc`](Client.VoidedLoc.md) \| [`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md))[]\>

#### Defined in

[packages/client/src/Loc.ts:93](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L93)

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

### findById

▸ **findById**(`locId`): [`LocRequestState`](Client.LocRequestState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

[`LocRequestState`](Client.LocRequestState.md)

#### Defined in

[packages/client/src/Loc.ts:166](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L166)

___

### hasValidIdentityLoc

▸ **hasValidIdentityLoc**(`legalOfficer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

`boolean`

#### Defined in

[packages/client/src/Loc.ts:108](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L108)

___

### refresh

▸ **refresh**(`params?`): `Promise`<[`LocsState`](Client.LocsState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`FetchAllLocsParams`](../interfaces/Client.FetchAllLocsParams.md) |

#### Returns

`Promise`<[`LocsState`](Client.LocsState.md)\>

#### Defined in

[packages/client/src/Loc.ts:223](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L223)

___

### refreshWith

▸ **refreshWith**(`loc`): [`LocsState`](Client.LocsState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loc` | [`LocRequestState`](Client.LocRequestState.md) |

#### Returns

[`LocsState`](Client.LocsState.md)

#### Defined in

[packages/client/src/Loc.ts:136](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L136)

___

### refreshWithout

▸ **refreshWithout**(`locId`): [`LocsState`](Client.LocsState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locId` | [`UUID`](Node_API.UUID.md) |

#### Returns

[`LocsState`](Client.LocsState.md)

#### Defined in

[packages/client/src/Loc.ts:152](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L152)

___

### requestCollectionLoc

▸ **requestCollectionLoc**(`params`): `Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateLocRequestParams`](../interfaces/Client.CreateLocRequestParams.md) |

#### Returns

`Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:181](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L181)

___

### requestIdentityLoc

▸ **requestIdentityLoc**(`params`): `Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateLocRequestParams`](../interfaces/Client.CreateLocRequestParams.md) |

#### Returns

`Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:188](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L188)

___

### requestLoc

▸ **requestLoc**(`params`): `Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateLocRequestParams`](../interfaces/Client.CreateLocRequestParams.md) & { `locType`: [`LocType`](../modules/Node_API.md#loctype)  } |

#### Returns

`Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:202](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L202)

___

### requestTransactionLoc

▸ **requestTransactionLoc**(`params`): `Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateLocRequestParams`](../interfaces/Client.CreateLocRequestParams.md) |

#### Returns

`Promise`<[`DraftRequest`](Client.DraftRequest.md) \| [`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:174](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L174)

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

### getInitialLocsState

▸ `Static` **getInitialLocsState**(`sharedState`, `client`, `params?`): `Promise`<[`LocsState`](Client.LocsState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedState` | [`SharedState`](../interfaces/Client.SharedState.md) |
| `client` | [`LogionClient`](Client.LogionClient.md) |
| `params?` | [`FetchAllLocsParams`](../interfaces/Client.FetchAllLocsParams.md) |

#### Returns

`Promise`<[`LocsState`](Client.LocsState.md)\>

#### Defined in

[packages/client/src/Loc.ts:162](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L162)
