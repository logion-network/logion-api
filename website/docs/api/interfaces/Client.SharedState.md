[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / SharedState

# Interface: SharedState

[Client](../modules/Client.md).SharedState

## Hierarchy

- **`SharedState`**

  ↳ [`BalanceSharedState`](Client.BalanceSharedState.md)

  ↳ [`LocSharedState`](Client.LocSharedState.md)

  ↳ [`RecoverySharedState`](Client.RecoverySharedState.md)

  ↳ [`VaultSharedState`](Client.VaultSharedState.md)

## Table of contents

### Properties

- [allLegalOfficers](Client.SharedState.md#alllegalofficers)
- [axiosFactory](Client.SharedState.md#axiosfactory)
- [componentFactory](Client.SharedState.md#componentfactory)
- [config](Client.SharedState.md#config)
- [currentAddress](Client.SharedState.md#currentaddress)
- [directoryClient](Client.SharedState.md#directoryclient)
- [legalOfficers](Client.SharedState.md#legalofficers)
- [networkState](Client.SharedState.md#networkstate)
- [nodeApi](Client.SharedState.md#nodeapi)
- [tokens](Client.SharedState.md#tokens)

## Properties

### allLegalOfficers

• **allLegalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/SharedClient.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L30)

___

### axiosFactory

• **axiosFactory**: [`AxiosFactory`](../classes/Client.AxiosFactory.md)

#### Defined in

[packages/client/src/SharedClient.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L25)

___

### componentFactory

• **componentFactory**: [`ComponentFactory`](Client.ComponentFactory.md)

#### Defined in

[packages/client/src/SharedClient.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L24)

___

### config

• **config**: [`LogionClientConfig`](Client.LogionClientConfig.md)

#### Defined in

[packages/client/src/SharedClient.ts:23](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L23)

___

### currentAddress

• `Optional` **currentAddress**: `string`

#### Defined in

[packages/client/src/SharedClient.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L32)

___

### directoryClient

• **directoryClient**: [`DirectoryClient`](../classes/Client.DirectoryClient.md)

#### Defined in

[packages/client/src/SharedClient.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L26)

___

### legalOfficers

• **legalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/SharedClient.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L29)

___

### networkState

• **networkState**: [`NetworkState`](../classes/Client.NetworkState.md)<[`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)\>

#### Defined in

[packages/client/src/SharedClient.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L27)

___

### nodeApi

• **nodeApi**: `ApiPromise`

#### Defined in

[packages/client/src/SharedClient.ts:28](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L28)

___

### tokens

• **tokens**: [`AccountTokens`](../classes/Client.AccountTokens.md)

#### Defined in

[packages/client/src/SharedClient.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31)
