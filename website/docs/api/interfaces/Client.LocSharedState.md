[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LocSharedState

# Interface: LocSharedState

[Client](../modules/Client.md).LocSharedState

## Hierarchy

- [`SharedState`](Client.SharedState.md)

  ↳ **`LocSharedState`**

## Table of contents

### Properties

- [allLegalOfficers](Client.LocSharedState.md#alllegalofficers)
- [axiosFactory](Client.LocSharedState.md#axiosfactory)
- [client](Client.LocSharedState.md#client)
- [componentFactory](Client.LocSharedState.md#componentfactory)
- [config](Client.LocSharedState.md#config)
- [currentAddress](Client.LocSharedState.md#currentaddress)
- [directoryClient](Client.LocSharedState.md#directoryclient)
- [legalOfficer](Client.LocSharedState.md#legalofficer)
- [legalOfficers](Client.LocSharedState.md#legalofficers)
- [locsState](Client.LocSharedState.md#locsstate)
- [networkState](Client.LocSharedState.md#networkstate)
- [nodeApi](Client.LocSharedState.md#nodeapi)
- [tokens](Client.LocSharedState.md#tokens)

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

### client

• **client**: [`AuthenticatedLocClient`](../classes/Client.AuthenticatedLocClient.md)

#### Defined in

[packages/client/src/Loc.ts:258](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L258)

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

### legalOfficer

• **legalOfficer**: [`LegalOfficer`](Client.LegalOfficer.md)

#### Defined in

[packages/client/src/Loc.ts:257](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L257)

___

### legalOfficers

• **legalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Inherited from

[SharedState](Client.SharedState.md).[legalOfficers](Client.SharedState.md#legalofficers)

#### Defined in

[packages/client/src/SharedClient.ts:29](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L29)

___

### locsState

• **locsState**: [`LocsState`](../classes/Client.LocsState.md)

#### Defined in

[packages/client/src/Loc.ts:259](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L259)

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

### tokens

• **tokens**: [`AccountTokens`](../classes/Client.AccountTokens.md)

#### Inherited from

[SharedState](Client.SharedState.md).[tokens](Client.SharedState.md#tokens)

#### Defined in

[packages/client/src/SharedClient.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31)
