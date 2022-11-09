[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / VoidedCollectionLoc

# Class: VoidedCollectionLoc

[Client](../modules/Client.md).VoidedCollectionLoc

## Hierarchy

- `ClosedOrVoidCollectionLoc`

  ↳ **`VoidedCollectionLoc`**

## Table of contents

### Constructors

- [constructor](Client.VoidedCollectionLoc.md#constructor)

### Properties

- [legalOfficerCase](Client.VoidedCollectionLoc.md#legalofficercase)
- [locSharedState](Client.VoidedCollectionLoc.md#locsharedstate)
- [request](Client.VoidedCollectionLoc.md#request)

### Accessors

- [discarded](Client.VoidedCollectionLoc.md#discarded)
- [locId](Client.VoidedCollectionLoc.md#locid)

### Methods

- [\_withLocs](Client.VoidedCollectionLoc.md#_withlocs)
- [checkHash](Client.VoidedCollectionLoc.md#checkhash)
- [data](Client.VoidedCollectionLoc.md#data)
- [discard](Client.VoidedCollectionLoc.md#discard)
- [discardOnSuccess](Client.VoidedCollectionLoc.md#discardonsuccess)
- [ensureCurrent](Client.VoidedCollectionLoc.md#ensurecurrent)
- [getCollectionItem](Client.VoidedCollectionLoc.md#getcollectionitem)
- [getCollectionItems](Client.VoidedCollectionLoc.md#getcollectionitems)
- [isLogionData](Client.VoidedCollectionLoc.md#islogiondata)
- [isLogionIdentity](Client.VoidedCollectionLoc.md#islogionidentity)
- [locsState](Client.VoidedCollectionLoc.md#locsstate)
- [refresh](Client.VoidedCollectionLoc.md#refresh)
- [replacerLoc](Client.VoidedCollectionLoc.md#replacerloc)
- [size](Client.VoidedCollectionLoc.md#size)
- [supersededLoc](Client.VoidedCollectionLoc.md#supersededloc)
- [syncDiscardOnSuccess](Client.VoidedCollectionLoc.md#syncdiscardonsuccess)
- [withLocs](Client.VoidedCollectionLoc.md#withlocs)
- [buildLocData](Client.VoidedCollectionLoc.md#buildlocdata)
- [checkHash](Client.VoidedCollectionLoc.md#checkhash-1)
- [createFromLoc](Client.VoidedCollectionLoc.md#createfromloc)
- [createFromRequest](Client.VoidedCollectionLoc.md#createfromrequest)

## Constructors

### constructor

• **new VoidedCollectionLoc**(`locSharedState`, `request`, `legalOfficerCase?`)

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

▸ **refresh**(): `Promise`<[`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)\>

#### Returns

`Promise`<[`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)\>

#### Overrides

ClosedOrVoidCollectionLoc.refresh

#### Defined in

[packages/client/src/Loc.ts:798](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L798)

___

### replacerLoc

▸ **replacerLoc**(): `Promise`<`undefined` \| [`OpenLoc`](Client.OpenLoc.md) \| [`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)\>

#### Returns

`Promise`<`undefined` \| [`OpenLoc`](Client.OpenLoc.md) \| [`ClosedCollectionLoc`](Client.ClosedCollectionLoc.md) \| [`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)\>

#### Defined in

[packages/client/src/Loc.ts:789](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L789)

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

### withLocs

▸ **withLocs**(`locsState`): [`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locsState` | [`LocsState`](Client.LocsState.md) |

#### Returns

[`VoidedCollectionLoc`](Client.VoidedCollectionLoc.md)

#### Overrides

ClosedOrVoidCollectionLoc.withLocs

#### Defined in

[packages/client/src/Loc.ts:802](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L802)

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
