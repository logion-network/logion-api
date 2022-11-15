[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / WithActiveProtection

# Interface: WithActiveProtection<T\>

[Client](../modules/Client.md).WithActiveProtection

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ProtectionState`](../modules/Client.md#protectionstate) |

## Implemented by

- [`ActiveProtection`](../classes/Client.ActiveProtection.md)
- [`PendingRecovery`](../classes/Client.PendingRecovery.md)

## Table of contents

### Methods

- [isFullyReady](Client.WithActiveProtection.md#isfullyready)
- [refresh](Client.WithActiveProtection.md#refresh)
- [waitForFullyReady](Client.WithActiveProtection.md#waitforfullyready)

## Methods

### isFullyReady

▸ **isFullyReady**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/client/src/Recovery.ts:641](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L641)

___

### refresh

▸ **refresh**(): `Promise`<[`WithActiveProtection`](Client.WithActiveProtection.md)<`T`\>\>

#### Returns

`Promise`<[`WithActiveProtection`](Client.WithActiveProtection.md)<`T`\>\>

#### Defined in

[packages/client/src/Recovery.ts:643](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L643)

___

### waitForFullyReady

▸ **waitForFullyReady**(`pollingParameters?`): `Promise`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pollingParameters?` | [`PollingParameters`](Client.PollingParameters.md) |

#### Returns

`Promise`<`T`\>

#### Defined in

[packages/client/src/Recovery.ts:645](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L645)
