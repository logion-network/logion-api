[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / WaitForParameters

# Interface: WaitForParameters<T\>

[Client](../modules/Client.md).WaitForParameters

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [pollingParameters](Client.WaitForParameters.md#pollingparameters)
- [predicate](Client.WaitForParameters.md#predicate)
- [producer](Client.WaitForParameters.md#producer)

## Properties

### pollingParameters

• `Optional` `Readonly` **pollingParameters**: [`PollingParameters`](Client.PollingParameters.md)

#### Defined in

[packages/client/src/Polling.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Polling.ts#L9)

___

### predicate

• `Readonly` **predicate**: (`value`: `T`) => `boolean`

#### Type declaration

▸ (`value`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`boolean`

#### Defined in

[packages/client/src/Polling.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Polling.ts#L11)

___

### producer

• `Readonly` **producer**: (`previousValue?`: `T`) => `Promise`<`T`\>

#### Type declaration

▸ (`previousValue?`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `previousValue?` | `T` |

##### Returns

`Promise`<`T`\>

#### Defined in

[packages/client/src/Polling.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Polling.ts#L10)
