[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / DraftRequest

# Class: DraftRequest

[Client](../modules/Client.md).DraftRequest

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`EditableRequest`](Client.EditableRequest.md)

  ↳ **`DraftRequest`**

## Table of contents

### Constructors

- [constructor](Client.DraftRequest.md#constructor)

### Properties

- [legalOfficerCase](Client.DraftRequest.md#legalofficercase)
- [locSharedState](Client.DraftRequest.md#locsharedstate)
- [request](Client.DraftRequest.md#request)

### Accessors

- [discarded](Client.DraftRequest.md#discarded)
- [locId](Client.DraftRequest.md#locid)

### Methods

- [\_withLocs](Client.DraftRequest.md#_withlocs)
- [addFile](Client.DraftRequest.md#addfile)
- [addMetadata](Client.DraftRequest.md#addmetadata)
- [cancel](Client.DraftRequest.md#cancel)
- [checkHash](Client.DraftRequest.md#checkhash)
- [data](Client.DraftRequest.md#data)
- [deleteFile](Client.DraftRequest.md#deletefile)
- [deleteMetadata](Client.DraftRequest.md#deletemetadata)
- [discard](Client.DraftRequest.md#discard)
- [discardOnSuccess](Client.DraftRequest.md#discardonsuccess)
- [ensureCurrent](Client.DraftRequest.md#ensurecurrent)
- [isLogionData](Client.DraftRequest.md#islogiondata)
- [isLogionIdentity](Client.DraftRequest.md#islogionidentity)
- [locsState](Client.DraftRequest.md#locsstate)
- [refresh](Client.DraftRequest.md#refresh)
- [submit](Client.DraftRequest.md#submit)
- [supersededLoc](Client.DraftRequest.md#supersededloc)
- [syncDiscardOnSuccess](Client.DraftRequest.md#syncdiscardonsuccess)
- [veryNew](Client.DraftRequest.md#verynew)
- [withLocs](Client.DraftRequest.md#withlocs)
- [buildLocData](Client.DraftRequest.md#buildlocdata)
- [checkHash](Client.DraftRequest.md#checkhash-1)
- [createFromLoc](Client.DraftRequest.md#createfromloc)
- [createFromRequest](Client.DraftRequest.md#createfromrequest)

## Constructors

### constructor

• **new DraftRequest**(`locSharedState`, `request`, `legalOfficerCase?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locSharedState` | [`LocSharedState`](../interfaces/Client.LocSharedState.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |
| `legalOfficerCase?` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[constructor](Client.EditableRequest.md#constructor)

#### Defined in

[packages/client/src/Loc.ts:311](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L311)

## Properties

### legalOfficerCase

• `Protected` `Optional` `Readonly` **legalOfficerCase**: [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[legalOfficerCase](Client.EditableRequest.md#legalofficercase)

#### Defined in

[packages/client/src/Loc.ts:309](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L309)

___

### locSharedState

• `Protected` `Readonly` **locSharedState**: [`LocSharedState`](../interfaces/Client.LocSharedState.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[locSharedState](Client.EditableRequest.md#locsharedstate)

#### Defined in

[packages/client/src/Loc.ts:307](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L307)

___

### request

• `Protected` `Readonly` **request**: [`LocRequest`](../interfaces/Client.LocRequest.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[request](Client.EditableRequest.md#request)

#### Defined in

[packages/client/src/Loc.ts:308](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L308)

## Accessors

### discarded

• `get` **discarded**(): `boolean`

**`Description`**

True if this state was discarded

#### Returns

`boolean`

#### Inherited from

EditableRequest.discarded

#### Defined in

[packages/client/src/State.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L22)

___

### locId

• `get` **locId**(): [`UUID`](Node_API.UUID.md)

#### Returns

[`UUID`](Node_API.UUID.md)

#### Inherited from

EditableRequest.locId

#### Defined in

[packages/client/src/Loc.ts:318](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L318)

## Methods

### \_withLocs

▸ `Protected` **_withLocs**<`T`\>(`locsState`, `constructor`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`LocRequestState`](Client.LocRequestState.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `locsState` | [`LocsState`](Client.LocsState.md) |
| `constructor` | (`locSharedState`: [`LocSharedState`](../interfaces/Client.LocSharedState.md), `request`: [`LocRequest`](../interfaces/Client.LocRequest.md), `legalOfficerCase?`: [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)) => `T` |

#### Returns

`T`

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[_withLocs](Client.EditableRequest.md#_withlocs)

#### Defined in

[packages/client/src/Loc.ts:526](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L526)

___

### addFile

▸ **addFile**(`params`): `Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AddFileParams`](../interfaces/Client.AddFileParams.md) |

#### Returns

`Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[addFile](Client.EditableRequest.md#addfile)

#### Defined in

[packages/client/src/Loc.ts:545](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L545)

___

### addMetadata

▸ **addMetadata**(`params`): `Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AddMetadataParams`](../interfaces/Client.AddMetadataParams.md) |

#### Returns

`Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[addMetadata](Client.EditableRequest.md#addmetadata)

#### Defined in

[packages/client/src/Loc.ts:536](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L536)

___

### cancel

▸ **cancel**(): `Promise`<[`LocsState`](Client.LocsState.md)\>

#### Returns

`Promise`<[`LocsState`](Client.LocsState.md)\>

#### Defined in

[packages/client/src/Loc.ts:595](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L595)

___

### checkHash

▸ **checkHash**(`hash`): `Promise`<[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`Promise`<[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[checkHash](Client.EditableRequest.md#checkhash)

#### Defined in

[packages/client/src/Loc.ts:405](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L405)

___

### data

▸ **data**(): [`LocData`](../interfaces/Client.LocData.md)

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[data](Client.EditableRequest.md#data)

#### Defined in

[packages/client/src/Loc.ts:371](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L371)

___

### deleteFile

▸ **deleteFile**(`params`): `Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DeleteFileParams`](../interfaces/Client.DeleteFileParams.md) |

#### Returns

`Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[deleteFile](Client.EditableRequest.md#deletefile)

#### Defined in

[packages/client/src/Loc.ts:563](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L563)

___

### deleteMetadata

▸ **deleteMetadata**(`params`): `Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DeleteMetadataParams`](../interfaces/Client.DeleteMetadataParams.md) |

#### Returns

`Promise`<[`EditableRequest`](Client.EditableRequest.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[deleteMetadata](Client.EditableRequest.md#deletemetadata)

#### Defined in

[packages/client/src/Loc.ts:554](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L554)

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

[EditableRequest](Client.EditableRequest.md).[discard](Client.EditableRequest.md#discard)

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

[EditableRequest](Client.EditableRequest.md).[discardOnSuccess](Client.EditableRequest.md#discardonsuccess)

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

[EditableRequest](Client.EditableRequest.md).[ensureCurrent](Client.EditableRequest.md#ensurecurrent)

#### Defined in

[packages/client/src/State.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L30)

___

### isLogionData

▸ **isLogionData**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[isLogionData](Client.EditableRequest.md#islogiondata)

#### Defined in

[packages/client/src/Loc.ts:399](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L399)

___

### isLogionIdentity

▸ **isLogionIdentity**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[isLogionIdentity](Client.EditableRequest.md#islogionidentity)

#### Defined in

[packages/client/src/Loc.ts:393](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L393)

___

### locsState

▸ **locsState**(): [`LocsState`](Client.LocsState.md)

#### Returns

[`LocsState`](Client.LocsState.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[locsState](Client.EditableRequest.md#locsstate)

#### Defined in

[packages/client/src/Loc.ts:366](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L366)

___

### refresh

▸ **refresh**(): `Promise`<[`DraftRequest`](Client.DraftRequest.md)\>

#### Returns

`Promise`<[`DraftRequest`](Client.DraftRequest.md)\>

#### Overrides

[EditableRequest](Client.EditableRequest.md).[refresh](Client.EditableRequest.md#refresh)

#### Defined in

[packages/client/src/Loc.ts:580](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L580)

___

### submit

▸ **submit**(): `Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Returns

`Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:584](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L584)

___

### supersededLoc

▸ **supersededLoc**(): `Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[supersededLoc](Client.EditableRequest.md#supersededloc)

#### Defined in

[packages/client/src/Loc.ts:384](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L384)

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

[EditableRequest](Client.EditableRequest.md).[syncDiscardOnSuccess](Client.EditableRequest.md#syncdiscardonsuccess)

#### Defined in

[packages/client/src/State.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L66)

___

### veryNew

▸ **veryNew**(): [`PendingRequest`](Client.PendingRequest.md)

#### Returns

[`PendingRequest`](Client.PendingRequest.md)

#### Defined in

[packages/client/src/Loc.ts:575](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L575)

___

### withLocs

▸ **withLocs**(`locsState`): [`DraftRequest`](Client.DraftRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locsState` | [`LocsState`](Client.LocsState.md) |

#### Returns

[`DraftRequest`](Client.DraftRequest.md)

#### Overrides

[EditableRequest](Client.EditableRequest.md).[withLocs](Client.EditableRequest.md#withlocs)

#### Defined in

[packages/client/src/Loc.ts:602](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L602)

___

### buildLocData

▸ `Static` **buildLocData**(`legalOfficerCase`, `request`): [`LocData`](../interfaces/Client.LocData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficerCase` | `undefined` \| [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[buildLocData](Client.EditableRequest.md#buildlocdata)

#### Defined in

[packages/client/src/Loc.ts:376](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L376)

___

### checkHash

▸ `Static` **checkHash**(`loc`, `hash`): [`CheckHashResult`](../interfaces/Client.CheckHashResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loc` | [`LocData`](../interfaces/Client.LocData.md) |
| `hash` | `string` |

#### Returns

[`CheckHashResult`](../interfaces/Client.CheckHashResult.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[checkHash](Client.EditableRequest.md#checkhash-1)

#### Defined in

[packages/client/src/Loc.ts:410](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L410)

___

### createFromLoc

▸ `Static` **createFromLoc**(`locSharedState`, `request`, `legalOfficerCase`): `Promise`<[`OnchainLocState`](../modules/Client.md#onchainlocstate)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locSharedState` | [`LocSharedState`](../interfaces/Client.LocSharedState.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |
| `legalOfficerCase` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Returns

`Promise`<[`OnchainLocState`](../modules/Client.md#onchainlocstate)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[createFromLoc](Client.EditableRequest.md#createfromloc)

#### Defined in

[packages/client/src/Loc.ts:335](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L335)

___

### createFromRequest

▸ `Static` **createFromRequest**(`locSharedState`, `request`): `Promise`<[`AnyLocState`](../modules/Client.md#anylocstate)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `locSharedState` | [`LocSharedState`](../interfaces/Client.LocSharedState.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |

#### Returns

`Promise`<[`AnyLocState`](../modules/Client.md#anylocstate)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[createFromRequest](Client.EditableRequest.md#createfromrequest)

#### Defined in

[packages/client/src/Loc.ts:322](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L322)
