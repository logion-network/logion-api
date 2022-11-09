[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ClosedCollectionLoc

# Class: ClosedCollectionLoc

[Client](../modules/Client.md).ClosedCollectionLoc

## Hierarchy

- `ClosedOrVoidCollectionLoc`

  ↳ **`ClosedCollectionLoc`**

## Table of contents

### Constructors

- [constructor](Client.ClosedCollectionLoc.md#constructor)

### Properties

- [legalOfficerCase](Client.ClosedCollectionLoc.md#legalofficercase)
- [locSharedState](Client.ClosedCollectionLoc.md#locsharedstate)
- [request](Client.ClosedCollectionLoc.md#request)

### Accessors

- [discarded](Client.ClosedCollectionLoc.md#discarded)
- [locId](Client.ClosedCollectionLoc.md#locid)

### Methods

- [\_withLocs](Client.ClosedCollectionLoc.md#_withlocs)
- [addCollectionItem](Client.ClosedCollectionLoc.md#addcollectionitem)
- [checkHash](Client.ClosedCollectionLoc.md#checkhash)
- [data](Client.ClosedCollectionLoc.md#data)
- [discard](Client.ClosedCollectionLoc.md#discard)
- [discardOnSuccess](Client.ClosedCollectionLoc.md#discardonsuccess)
- [ensureCurrent](Client.ClosedCollectionLoc.md#ensurecurrent)
- [getCollectionItem](Client.ClosedCollectionLoc.md#getcollectionitem)
- [getCollectionItems](Client.ClosedCollectionLoc.md#getcollectionitems)
- [isLogionData](Client.ClosedCollectionLoc.md#islogiondata)
- [isLogionIdentity](Client.ClosedCollectionLoc.md#islogionidentity)
- [locsState](Client.ClosedCollectionLoc.md#locsstate)
- [refresh](Client.ClosedCollectionLoc.md#refresh)
- [requestSof](Client.ClosedCollectionLoc.md#requestsof)
- [size](Client.ClosedCollectionLoc.md#size)
- [supersededLoc](Client.ClosedCollectionLoc.md#supersededloc)
- [syncDiscardOnSuccess](Client.ClosedCollectionLoc.md#syncdiscardonsuccess)
- [uploadCollectionItemFile](Client.ClosedCollectionLoc.md#uploadcollectionitemfile)
- [withLocs](Client.ClosedCollectionLoc.md#withlocs)
- [buildLocData](Client.ClosedCollectionLoc.md#buildlocdata)
- [checkHash](Client.ClosedCollectionLoc.md#checkhash-1)
- [createFromLoc](Client.ClosedCollectionLoc.md#createfromloc)
- [createFromRequest](Client.ClosedCollectionLoc.md#createfromrequest)

## Constructors

### constructor

• **new ClosedCollectionLoc**(`locSharedState`, `request`, `legalOfficerCase?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locSharedState` | [`LocSharedState`](../interfaces/Client.LocSharedState.md) |
| `request` | [`LocRequest`](../interfaces/Client.LocRequest.md) |
| `legalOfficerCase?` | [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md) |

#### Inherited from

ClosedOrVoidCollectionLoc.constructor

#### Defined in

[packages/client/src/Loc.ts:294](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L294)

## Properties

### legalOfficerCase

• `Protected` `Optional` `Readonly` **legalOfficerCase**: [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)

#### Inherited from

ClosedOrVoidCollectionLoc.legalOfficerCase

#### Defined in

[packages/client/src/Loc.ts:292](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L292)

___

### locSharedState

• `Protected` `Readonly` **locSharedState**: [`LocSharedState`](../interfaces/Client.LocSharedState.md)

#### Inherited from

ClosedOrVoidCollectionLoc.locSharedState

#### Defined in

[packages/client/src/Loc.ts:290](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L290)

___

### request

• `Protected` `Readonly` **request**: [`LocRequest`](../interfaces/Client.LocRequest.md)

#### Inherited from

ClosedOrVoidCollectionLoc.request

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

ClosedOrVoidCollectionLoc.discarded

#### Defined in

[packages/client/src/State.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L22)

___

### locId

• `get` **locId**(): [`UUID`](Node_API.UUID.md)

#### Returns

[`UUID`](Node_API.UUID.md)

#### Inherited from

ClosedOrVoidCollectionLoc.locId

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

ClosedOrVoidCollectionLoc.\_withLocs

#### Defined in

[packages/client/src/Loc.ts:508](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L508)

___

### addCollectionItem

▸ **addCollectionItem**(`parameters`): `Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`AddCollectionItemParams`](../interfaces/Client.AddCollectionItemParams.md) |

#### Returns

`Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)\>

#### Defined in

[packages/client/src/Loc.ts:722](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L722)

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

ClosedOrVoidCollectionLoc.checkHash

#### Defined in

[packages/client/src/Loc.ts:696](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L696)

___

### data

▸ **data**(): [`LocData`](../interfaces/Client.LocData.md)

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Inherited from

ClosedOrVoidCollectionLoc.data

#### Defined in

[packages/client/src/Loc.ts:354](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L354)

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

ClosedOrVoidCollectionLoc.discard

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

ClosedOrVoidCollectionLoc.discardOnSuccess

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

ClosedOrVoidCollectionLoc.ensureCurrent

#### Defined in

[packages/client/src/State.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L30)

___

### getCollectionItem

▸ **getCollectionItem**(`parameters`): `Promise`<`undefined` \| [`CollectionItem`](Client.CollectionItem.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.itemId` | `string` |

#### Returns

`Promise`<`undefined` \| [`CollectionItem`](Client.CollectionItem.md)\>

#### Inherited from

ClosedOrVoidCollectionLoc.getCollectionItem

#### Defined in

[packages/client/src/Loc.ts:675](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L675)

___

### getCollectionItems

▸ **getCollectionItems**(): `Promise`<[`CollectionItem`](Client.CollectionItem.md)[]\>

#### Returns

`Promise`<[`CollectionItem`](Client.CollectionItem.md)[]\>

#### Inherited from

ClosedOrVoidCollectionLoc.getCollectionItems

#### Defined in

[packages/client/src/Loc.ts:684](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L684)

___

### isLogionData

▸ **isLogionData**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ClosedOrVoidCollectionLoc.isLogionData

#### Defined in

[packages/client/src/Loc.ts:382](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L382)

___

### isLogionIdentity

▸ **isLogionIdentity**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ClosedOrVoidCollectionLoc.isLogionIdentity

#### Defined in

[packages/client/src/Loc.ts:376](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L376)

___

### locsState

▸ **locsState**(): [`LocsState`](Client.LocsState.md)

#### Returns

[`LocsState`](Client.LocsState.md)

#### Inherited from

ClosedOrVoidCollectionLoc.locsState

#### Defined in

[packages/client/src/Loc.ts:349](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L349)

___

### refresh

▸ **refresh**(): `Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Overrides

ClosedOrVoidCollectionLoc.refresh

#### Defined in

[packages/client/src/Loc.ts:752](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L752)

___

### requestSof

▸ **requestSof**(`params`): `Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateSofRequestParams`](../interfaces/Client.CreateSofRequestParams.md) |

#### Returns

`Promise`<[`PendingRequest`](Client.PendingRequest.md)\>

#### Defined in

[packages/client/src/Loc.ts:748](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L748)

___

### size

▸ **size**(): `Promise`<`undefined` \| `number`\>

#### Returns

`Promise`<`undefined` \| `number`\>

#### Inherited from

ClosedOrVoidCollectionLoc.size

#### Defined in

[packages/client/src/Loc.ts:706](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L706)

___

### supersededLoc

▸ **supersededLoc**(): `Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Inherited from

ClosedOrVoidCollectionLoc.supersededLoc

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

ClosedOrVoidCollectionLoc.syncDiscardOnSuccess

#### Defined in

[packages/client/src/State.ts:66](https://github.com/logion-network/logion-api/blob/main/packages/client/src/State.ts#L66)

___

### uploadCollectionItemFile

▸ **uploadCollectionItemFile**(`parameters`): `Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`UploadCollectionItemFileParams`](../interfaces/Client.UploadCollectionItemFileParams.md) |

#### Returns

`Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)\>

#### Defined in

[packages/client/src/Loc.ts:737](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L737)

___

### withLocs

▸ **withLocs**(`locsState`): [`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locsState` | [`LocsState`](Client.LocsState.md) |

#### Returns

[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md)

#### Overrides

ClosedOrVoidCollectionLoc.withLocs

#### Defined in

[packages/client/src/Loc.ts:756](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L756)

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

ClosedOrVoidCollectionLoc.buildLocData

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

ClosedOrVoidCollectionLoc.checkHash

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

ClosedOrVoidCollectionLoc.createFromLoc

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

ClosedOrVoidCollectionLoc.createFromRequest

#### Defined in

[packages/client/src/Loc.ts:305](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L305)
