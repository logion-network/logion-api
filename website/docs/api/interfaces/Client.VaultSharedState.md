[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / VaultSharedState

# Interface: VaultSharedState

[Client](../modules/Client.md).VaultSharedState

## Hierarchy

- [`SharedState`](Client.SharedState.md)

  ↳ **`VaultSharedState`**

## Table of contents

### Properties

- [acceptedVaultTransferRequests](Client.VaultSharedState.md#acceptedvaulttransferrequests)
- [allLegalOfficers](Client.VaultSharedState.md#alllegalofficers)
- [axiosFactory](Client.VaultSharedState.md#axiosfactory)
- [balances](Client.VaultSharedState.md#balances)
- [cancelledVaultTransferRequests](Client.VaultSharedState.md#cancelledvaulttransferrequests)
- [client](Client.VaultSharedState.md#client)
- [componentFactory](Client.VaultSharedState.md#componentfactory)
- [config](Client.VaultSharedState.md#config)
- [currentAddress](Client.VaultSharedState.md#currentaddress)
- [directoryClient](Client.VaultSharedState.md#directoryclient)
- [isRecovery](Client.VaultSharedState.md#isrecovery)
- [legalOfficers](Client.VaultSharedState.md#legalofficers)
- [networkState](Client.VaultSharedState.md#networkstate)
- [nodeApi](Client.VaultSharedState.md#nodeapi)
- [pendingVaultTransferRequests](Client.VaultSharedState.md#pendingvaulttransferrequests)
- [recoveredAddress](Client.VaultSharedState.md#recoveredaddress)
- [rejectedVaultTransferRequests](Client.VaultSharedState.md#rejectedvaulttransferrequests)
- [selectedLegalOfficers](Client.VaultSharedState.md#selectedlegalofficers)
- [tokens](Client.VaultSharedState.md#tokens)
- [transactions](Client.VaultSharedState.md#transactions)

## Properties

### acceptedVaultTransferRequests

• **acceptedVaultTransferRequests**: [`VaultTransferRequest`](Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L27)

___

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

• **balances**: [`CoinBalance`](Node_API.CoinBalance.md)[]

#### Defined in

[packages/client/src/Vault.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L31)

___

### cancelledVaultTransferRequests

• **cancelledVaultTransferRequests**: [`VaultTransferRequest`](Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L25)

___

### client

• **client**: [`VaultClient`](../classes/Client.VaultClient.md)

#### Defined in

[packages/client/src/Vault.ts:23](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L23)

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

• **isRecovery**: `boolean`

#### Defined in

[packages/client/src/Vault.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L29)

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

### pendingVaultTransferRequests

• **pendingVaultTransferRequests**: [`VaultTransferRequest`](Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L24)

___

### recoveredAddress

• `Optional` **recoveredAddress**: `string`

#### Defined in

[packages/client/src/Vault.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L30)

___

### rejectedVaultTransferRequests

• **rejectedVaultTransferRequests**: [`VaultTransferRequest`](Client.VaultTransferRequest.md)[]

#### Defined in

[packages/client/src/Vault.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L26)

___

### selectedLegalOfficers

• **selectedLegalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/Vault.ts:28](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L28)

___

### tokens

• **tokens**: [`AccountTokens`](../classes/Client.AccountTokens.md)

#### Inherited from

[SharedState](Client.SharedState.md).[tokens](Client.SharedState.md#tokens)

#### Defined in

[packages/client/src/SharedClient.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31)

___

### transactions

• **transactions**: [`Transaction`](Client.Transaction.md)[]

#### Defined in

[packages/client/src/Vault.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L32)
