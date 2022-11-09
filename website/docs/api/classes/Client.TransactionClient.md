[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / TransactionClient

# Class: TransactionClient

[Client](../modules/Client.md).TransactionClient

## Table of contents

### Constructors

- [constructor](Client.TransactionClient.md#constructor)

### Methods

- [fetchTransactions](Client.TransactionClient.md#fetchtransactions)

## Constructors

### constructor

• **new TransactionClient**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `params.currentAddress` | `string` |
| `params.networkState` | [`NetworkState`](Client.NetworkState.md)<[`LegalOfficerEndpoint`](../interfaces/Client.LegalOfficerEndpoint.md)\> |

#### Defined in

[packages/client/src/TransactionClient.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/client/src/TransactionClient.ts#L43)

## Methods

### fetchTransactions

▸ **fetchTransactions**(): `Promise`<[`Transaction`](../interfaces/Client.Transaction.md)[]\>

#### Returns

`Promise`<[`Transaction`](../interfaces/Client.Transaction.md)[]\>

#### Defined in

[packages/client/src/TransactionClient.ts:59](https://github.com/logion-network/logion-api/blob/main/packages/client/src/TransactionClient.ts#L59)
