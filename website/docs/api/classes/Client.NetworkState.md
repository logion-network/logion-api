[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / NetworkState

# Class: NetworkState<E\>

[Client](../modules/Client.md).NetworkState

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |

## Table of contents

### Constructors

- [constructor](Client.NetworkState.md#constructor)

### Accessors

- [nodesDown](Client.NetworkState.md#nodesdown)
- [nodesUp](Client.NetworkState.md#nodesup)

### Methods

- [update](Client.NetworkState.md#update)
- [allUp](Client.NetworkState.md#allup)

## Constructors

### constructor

• **new NetworkState**<`E`\>(`nodesUp`, `nodesDown`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodesUp` | `E`[] |
| `nodesDown` | `E`[] |

#### Defined in

[packages/client/src/NetworkState.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/client/src/NetworkState.ts#L9)

## Accessors

### nodesDown

• `get` **nodesDown**(): `E`[]

#### Returns

`E`[]

#### Defined in

[packages/client/src/NetworkState.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/client/src/NetworkState.ts#L22)

___

### nodesUp

• `get` **nodesUp**(): `E`[]

#### Returns

`E`[]

#### Defined in

[packages/client/src/NetworkState.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/client/src/NetworkState.ts#L16)

## Methods

### update

▸ **update**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.nodesDown` | `E`[] |
| `params.nodesUp` | `E`[] |

#### Returns

`void`

#### Defined in

[packages/client/src/NetworkState.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/NetworkState.ts#L26)

___

### allUp

▸ `Static` **allUp**<`E`\>(`nodesUp`): [`NetworkState`](Client.NetworkState.md)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Endpoint`](../interfaces/Client.Endpoint.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodesUp` | `E`[] |

#### Returns

[`NetworkState`](Client.NetworkState.md)<`E`\>

#### Defined in

[packages/client/src/NetworkState.ts:5](https://github.com/logion-network/logion-api/blob/main/packages/client/src/NetworkState.ts#L5)
