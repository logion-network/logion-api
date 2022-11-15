[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocLink

# Interface: LocLink

[Client](../modules/Client.md).LocLink

Blockchain MetadataItem, extended with timestamp.

## Hierarchy

- [`Link`](Node_API.Link.md)

- [`AddedOn`](Client.AddedOn.md)

  ↳ **`LocLink`**

  ↳↳ [`MergedLink`](Client.MergedLink.md)

## Table of contents

### Properties

- [addedOn](Client.LocLink.md#addedon)
- [id](Client.LocLink.md#id)
- [nature](Client.LocLink.md#nature)
- [target](Client.LocLink.md#target)

## Properties

### addedOn

• **addedOn**: `string`

#### Inherited from

[AddedOn](Client.AddedOn.md).[addedOn](Client.AddedOn.md#addedon)

#### Defined in

[packages/client/src/LocClient.ts:36](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L36)

___

### id

• **id**: [`UUID`](../classes/Node_API.UUID.md)

#### Inherited from

[Link](Node_API.Link.md).[id](Node_API.Link.md#id)

#### Defined in

packages/node-api/dist/Types.d.ts:13

___

### nature

• **nature**: `string`

#### Inherited from

[Link](Node_API.Link.md).[nature](Node_API.Link.md#nature)

#### Defined in

packages/node-api/dist/Types.d.ts:14

___

### target

• **target**: `string`

#### Defined in

[packages/client/src/LocClient.ts:60](https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L60)
