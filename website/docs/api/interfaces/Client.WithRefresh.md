[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / WithRefresh

# Interface: WithRefresh<T\>

[Client](../modules/Client.md).WithRefresh

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ProtectionState`](../modules/Client.md#protectionstate) |

## Implemented by

- [`ActiveProtection`](../classes/Client.ActiveProtection.md)
- [`PendingRecovery`](../classes/Client.PendingRecovery.md)

## Table of contents

### Methods

- [refresh](Client.WithRefresh.md#refresh)

## Methods

### refresh

▸ **refresh**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[packages/client/src/Recovery.ts:650](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L650)
