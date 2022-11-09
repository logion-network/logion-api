[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / OpenLoc

# Class: OpenLoc

[Client](../modules/Client.md).OpenLoc

A State instance is a state in the "state machine" sense. It comes
with some behavior and state transition methods. A state transition
method returns an instance of the next state given the
executed operation, which discards current object.

This class should be extended by client class. It provides method
enabling the client class to query if it was already discarded
or not as well as methods actually discarding the state.

## Hierarchy

- [`EditableRequest`](Client.EditableRequest.md)

  ↳ **`OpenLoc`**

## Table of contents

### Constructors

- [constructor](Client.OpenLoc.md#constructor)

### Properties

- [legalOfficerCase](Client.OpenLoc.md#legalofficercase)
- [locSharedState](Client.OpenLoc.md#locsharedstate)
- [request](Client.OpenLoc.md#request)

### Accessors

- [discarded](Client.OpenLoc.md#discarded)
- [locId](Client.OpenLoc.md#locid)

### Methods

- [\_withLocs](Client.OpenLoc.md#_withlocs)
- [addFile](Client.OpenLoc.md#addfile)
- [addMetadata](Client.OpenLoc.md#addmetadata)
- [checkHash](Client.OpenLoc.md#checkhash)
- [data](Client.OpenLoc.md#data)
- [deleteFile](Client.OpenLoc.md#deletefile)
- [deleteMetadata](Client.OpenLoc.md#deletemetadata)
- [discard](Client.OpenLoc.md#discard)
- [discardOnSuccess](Client.OpenLoc.md#discardonsuccess)
- [ensureCurrent](Client.OpenLoc.md#ensurecurrent)
- [isLogionData](Client.OpenLoc.md#islogiondata)
- [isLogionIdentity](Client.OpenLoc.md#islogionidentity)
- [locsState](Client.OpenLoc.md#locsstate)
- [refresh](Client.OpenLoc.md#refresh)
- [requestSof](Client.OpenLoc.md#requestsof)
- [supersededLoc](Client.OpenLoc.md#supersededloc)
- [syncDiscardOnSuccess](Client.OpenLoc.md#syncdiscardonsuccess)
- [withLocs](Client.OpenLoc.md#withlocs)
- [buildLocData](Client.OpenLoc.md#buildlocdata)
- [checkHash](Client.OpenLoc.md#checkhash-1)
- [createFromLoc](Client.OpenLoc.md#createfromloc)
- [createFromRequest](Client.OpenLoc.md#createfromrequest)

## Constructors

### constructor

• **new OpenLoc**(`locSharedState`, `request`, `legalOfficerCase?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locSharedState` | [`LocSharedState`](../interfaces/Client.LocSharedState.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |
| `legalOfficerCase?` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[constructor](Client.EditableRequest.md#constructor)

#### Defined in

[packages/client/src/Loc.ts:294](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L294)

## Properties

### legalOfficerCase

• `Protected` `Optional` `Readonly` **legalOfficerCase**: [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[legalOfficerCase](Client.EditableRequest.md#legalofficercase)

#### Defined in

[packages/client/src/Loc.ts:292](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L292)

___

### locSharedState

• `Protected` `Readonly` **locSharedState**: [`LocSharedState`](../interfaces/Client.LocSharedState.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[locSharedState](Client.EditableRequest.md#locsharedstate)

#### Defined in

[packages/client/src/Loc.ts:290](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L290)

___

### request

• `Protected` `Readonly` **request**: [`LocRequest`](../interfaces/Client.LocRequest.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[request](Client.EditableRequest.md#request)

#### Defined in

[packages/client/src/Loc.ts:291](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L291)

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

[packages/client/src/Loc.ts:301](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L301)

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

[packages/client/src/Loc.ts:508](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L508)

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

[packages/client/src/Loc.ts:527](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L527)

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

[packages/client/src/Loc.ts:518](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L518)

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

[packages/client/src/Loc.ts:388](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L388)

___

### data

▸ **data**(): [`LocData`](../interfaces/Client.LocData.md)

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[data](Client.EditableRequest.md#data)

#### Defined in

[packages/client/src/Loc.ts:354](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L354)

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

[packages/client/src/Loc.ts:545](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L545)

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

[packages/client/src/Loc.ts:536](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L536)

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

[packages/client/src/Loc.ts:382](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L382)

___

### isLogionIdentity

▸ **isLogionIdentity**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[isLogionIdentity](Client.EditableRequest.md#islogionidentity)

#### Defined in

[packages/client/src/Loc.ts:376](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L376)

___

### locsState

▸ **locsState**(): [`LocsState`](Client.LocsState.md)

#### Returns

[`LocsState`](Client.LocsState.md)

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[locsState](Client.EditableRequest.md#locsstate)

#### Defined in

[packages/client/src/Loc.ts:349](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L349)

___

### refresh

▸ **refresh**(): `Promise`<[`OnchainLocState`](../modules/Client.md#onchainlocstate)\>

#### Returns

`Promise`<[`OnchainLocState`](../modules/Client.md#onchainlocstate)\>

#### Overrides

[EditableRequest](Client.EditableRequest.md).[refresh](Client.EditableRequest.md#refresh)

#### Defined in

[packages/client/src/Loc.ts:632](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L632)

___

### requestSof

▸ **requestSof**(): `Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Returns

`Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:628](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L628)

___

### supersededLoc

▸ **supersededLoc**(): `Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Inherited from

[EditableRequest](Client.EditableRequest.md).[supersededLoc](Client.EditableRequest.md#supersededloc)

#### Defined in

[packages/client/src/Loc.ts:367](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L367)

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

### withLocs

▸ **withLocs**(`locsState`): [`OpenLoc`](Client.OpenLoc.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locsState` | [`LocsState`](Client.LocsState.md) |

#### Returns

[`OpenLoc`](Client.OpenLoc.md)

#### Overrides

[EditableRequest](Client.EditableRequest.md).[withLocs](Client.EditableRequest.md#withlocs)

#### Defined in

[packages/client/src/Loc.ts:636](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L636)

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

[packages/client/src/Loc.ts:359](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L359)

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

[packages/client/src/Loc.ts:393](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L393)

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

[packages/client/src/Loc.ts:318](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L318)

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

[packages/client/src/Loc.ts:305](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L305)
