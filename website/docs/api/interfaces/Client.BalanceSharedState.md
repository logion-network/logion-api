[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / BalanceSharedState

# Interface: BalanceSharedState

[Client](../modules/Client.md).BalanceSharedState

## Hierarchy

- [`SharedState`](Client.SharedState.md)

  ↳ **`BalanceSharedState`**

## Table of contents

### Properties

- [allLegalOfficers](Client.BalanceSharedState.md#alllegalofficers)
- [axiosFactory](Client.BalanceSharedState.md#axiosfactory)
- [balances](Client.BalanceSharedState.md#balances)
- [componentFactory](Client.BalanceSharedState.md#componentfactory)
- [config](Client.BalanceSharedState.md#config)
- [currentAddress](Client.BalanceSharedState.md#currentaddress)
- [directoryClient](Client.BalanceSharedState.md#directoryclient)
- [isRecovery](Client.BalanceSharedState.md#isrecovery)
- [legalOfficers](Client.BalanceSharedState.md#legalofficers)
- [networkState](Client.BalanceSharedState.md#networkstate)
- [nodeApi](Client.BalanceSharedState.md#nodeapi)
- [recoveredAddress](Client.BalanceSharedState.md#recoveredaddress)
- [tokens](Client.BalanceSharedState.md#tokens)
- [transactions](Client.BalanceSharedState.md#transactions)

## Properties

### allLegalOfficers

• **allLegalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Inherited from

[SharedState](Client.SharedState.md).[allLegalOfficers](Client.SharedState.md#alllegalofficers)

#### Defined in

[packages/client/src/SharedClient.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L30)

___

### axiosFactory

• **axiosFactory**: [`AxiosFactory`](../classes/Client.AxiosFactory.md)

#### Inherited from

[SharedState](Client.SharedState.md).[axiosFactory](Client.SharedState.md#axiosfactory)

#### Defined in

[packages/client/src/SharedClient.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L25)

___

### balances

• `Readonly` **balances**: [`CoinBalance`](Node_API.CoinBalance.md)[]

#### Defined in

[packages/client/src/Balance.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L24)

___

### componentFactory

• **componentFactory**: [`ComponentFactory`](Client.ComponentFactory.md)

#### Inherited from

[SharedState](Client.SharedState.md).[componentFactory](Client.SharedState.md#componentfactory)

#### Defined in

[packages/client/src/SharedClient.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L24)

___

### config

• **config**: [`LogionClientConfig`](Client.LogionClientConfig.md)

#### Inherited from

[SharedState](Client.SharedState.md).[config](Client.SharedState.md#config)

#### Defined in

[packages/client/src/SharedClient.ts:23](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L23)

___

### currentAddress

• `Optional` **currentAddress**: `string`

#### Inherited from

[SharedState](Client.SharedState.md).[currentAddress](Client.SharedState.md#currentaddress)

#### Defined in

[packages/client/src/SharedClient.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L32)

___

### directoryClient

• **directoryClient**: [`DirectoryClient`](../classes/Client.DirectoryClient.md)

#### Inherited from

[SharedState](Client.SharedState.md).[directoryClient](Client.SharedState.md#directoryclient)

#### Defined in

[packages/client/src/SharedClient.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L26)

___

### isRecovery

• `Readonly` **isRecovery**: `boolean`

#### Defined in

[packages/client/src/Balance.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L26)

___

### legalOfficers

• **legalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Inherited from

[SharedState](Client.SharedState.md).[legalOfficers](Client.SharedState.md#legalofficers)

#### Defined in

[packages/client/src/SharedClient.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L29)

___

### networkState

• **networkState**: [`NetworkState`](../classes/Client.NetworkState.md)<[`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)\>

#### Inherited from

[SharedState](Client.SharedState.md).[networkState](Client.SharedState.md#networkstate)

#### Defined in

[packages/client/src/SharedClient.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L27)

___

### nodeApi

• **nodeApi**: `ApiPromise`

#### Inherited from

[SharedState](Client.SharedState.md).[nodeApi](Client.SharedState.md#nodeapi)

#### Defined in

[packages/client/src/SharedClient.ts:28](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L28)

___

### recoveredAddress

• `Optional` `Readonly` **recoveredAddress**: `string`

#### Defined in

[packages/client/src/Balance.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L27)

___

### tokens

• **tokens**: [`AccountTokens`](../classes/Client.AccountTokens.md)

#### Inherited from

[SharedState](Client.SharedState.md).[tokens](Client.SharedState.md#tokens)

#### Defined in

[packages/client/src/SharedClient.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31)

___

### transactions

• `Readonly` **transactions**: [`Transaction`](Client.Transaction.md)[]

#### Defined in

[packages/client/src/Balance.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Balance.ts#L25)
