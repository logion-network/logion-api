[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ISubmittableResult

# Interface: ISubmittableResult

[Client](../modules/Client.md).ISubmittableResult

## Table of contents

### Properties

- [dispatchError](Client.ISubmittableResult.md#dispatcherror)
- [dispatchInfo](Client.ISubmittableResult.md#dispatchinfo)
- [events](Client.ISubmittableResult.md#events)
- [internalError](Client.ISubmittableResult.md#internalerror)
- [isCompleted](Client.ISubmittableResult.md#iscompleted)
- [isError](Client.ISubmittableResult.md#iserror)
- [isFinalized](Client.ISubmittableResult.md#isfinalized)
- [isInBlock](Client.ISubmittableResult.md#isinblock)
- [isWarning](Client.ISubmittableResult.md#iswarning)
- [status](Client.ISubmittableResult.md#status)
- [txHash](Client.ISubmittableResult.md#txhash)
- [txIndex](Client.ISubmittableResult.md#txindex)

### Methods

- [filterRecords](Client.ISubmittableResult.md#filterrecords)
- [findRecord](Client.ISubmittableResult.md#findrecord)
- [toHuman](Client.ISubmittableResult.md#tohuman)

## Properties

### dispatchError

• `Optional` `Readonly` **dispatchError**: `DispatchError`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:10

___

### dispatchInfo

• `Optional` `Readonly` **dispatchInfo**: `DispatchInfo`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:11

___

### events

• `Readonly` **events**: `EventRecord`[]

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:12

___

### internalError

• `Optional` `Readonly` **internalError**: `Error`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:13

___

### isCompleted

• `Readonly` **isCompleted**: `boolean`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:15

___

### isError

• `Readonly` **isError**: `boolean`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:16

___

### isFinalized

• `Readonly` **isFinalized**: `boolean`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:17

___

### isInBlock

• `Readonly` **isInBlock**: `boolean`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:18

___

### isWarning

• `Readonly` **isWarning**: `boolean`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:19

___

### status

• `Readonly` **status**: `ExtrinsicStatus`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:14

___

### txHash

• `Readonly` **txHash**: `Hash`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:20

___

### txIndex

• `Optional` `Readonly` **txIndex**: `number`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:21

## Methods

### filterRecords

▸ **filterRecords**(`section`, `method`): `EventRecord`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `section` | `string` |
| `method` | `string` |

#### Returns

`EventRecord`[]

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:22

___

### findRecord

▸ **findRecord**(`section`, `method`): `undefined` \| `EventRecord`

#### Parameters

| Name | Type |
| :------ | :------ |
| `section` | `string` |
| `method` | `string` |

#### Returns

`undefined` \| `EventRecord`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:23

___

### toHuman

▸ **toHuman**(`isExtended?`): `AnyJson`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isExtended?` | `boolean` |

#### Returns

`AnyJson`

#### Defined in

node_modules/@polkadot/types/types/extrinsic.d.ts:24
