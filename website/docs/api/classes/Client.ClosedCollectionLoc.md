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

[packages/client/src/Loc.ts:311](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L311)

## Properties

### legalOfficerCase

• `Protected` `Optional` `Readonly` **legalOfficerCase**: [`LegalOfficerCase`](../interfaces/Node_API.LegalOfficerCase.md)

#### Inherited from

ClosedOrVoidCollectionLoc.legalOfficerCase

#### Defined in

[packages/client/src/Loc.ts:309](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L309)

___

### locSharedState

• `Protected` `Readonly` **locSharedState**: [`LocSharedState`](../interfaces/Client.LocSharedState.md)

#### Inherited from

ClosedOrVoidCollectionLoc.locSharedState

#### Defined in

[packages/client/src/Loc.ts:307](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L307)

___

### request

• `Protected` `Readonly` **request**: [`LocRequest`](../interfaces/Client.LocRequest.md)

#### Inherited from

ClosedOrVoidCollectionLoc.request

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

ClosedOrVoidCollectionLoc.\_withLocs

#### Defined in

[packages/client/src/Loc.ts:526](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L526)

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

[packages/client/src/Loc.ts:740](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L740)

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

[packages/client/src/Loc.ts:714](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L714)

___

### data

▸ **data**(): [`LocData`](../interfaces/Client.LocData.md)

#### Returns

[`LocData`](../interfaces/Client.LocData.md)

#### Inherited from

ClosedOrVoidCollectionLoc.data

#### Defined in

[packages/client/src/Loc.ts:371](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L371)

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

[packages/client/src/Loc.ts:693](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L693)

___

### getCollectionItems

▸ **getCollectionItems**(): `Promise`<[`CollectionItem`](Client.CollectionItem.md)[]\>

#### Returns

`Promise`<[`CollectionItem`](Client.CollectionItem.md)[]\>

#### Inherited from

ClosedOrVoidCollectionLoc.getCollectionItems

#### Defined in

[packages/client/src/Loc.ts:702](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L702)

___

### isLogionData

▸ **isLogionData**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ClosedOrVoidCollectionLoc.isLogionData

#### Defined in

[packages/client/src/Loc.ts:399](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L399)

___

### isLogionIdentity

▸ **isLogionIdentity**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ClosedOrVoidCollectionLoc.isLogionIdentity

#### Defined in

[packages/client/src/Loc.ts:393](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L393)

___

### locsState

▸ **locsState**(): [`LocsState`](Client.LocsState.md)

#### Returns

[`LocsState`](Client.LocsState.md)

#### Inherited from

ClosedOrVoidCollectionLoc.locsState

#### Defined in

[packages/client/src/Loc.ts:366](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L366)

___

### refresh

▸ **refresh**(): `Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<[`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Overrides

ClosedOrVoidCollectionLoc.refresh

#### Defined in

[packages/client/src/Loc.ts:770](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L770)

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

[packages/client/src/Loc.ts:766](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L766)

___

### size

▸ **size**(): `Promise`<`undefined` \| `number`\>

#### Returns

`Promise`<`undefined` \| `number`\>

#### Inherited from

ClosedOrVoidCollectionLoc.size

#### Defined in

[packages/client/src/Loc.ts:724](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L724)

___

### supersededLoc

▸ **supersededLoc**(): `Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Returns

`Promise`<`undefined` \| [`VoidedLoc`](Client.VoidedLoc.md)\>

#### Inherited from

ClosedOrVoidCollectionLoc.supersededLoc

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

[packages/client/src/Loc.ts:755](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L755)

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

[packages/client/src/Loc.ts:774](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L774)

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

ClosedOrVoidCollectionLoc.checkHash

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

ClosedOrVoidCollectionLoc.createFromLoc

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

ClosedOrVoidCollectionLoc.createFromRequest

#### Defined in

[packages/client/src/Loc.ts:322](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L322)
