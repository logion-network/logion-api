[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / RecoverySharedState

# Interface: RecoverySharedState

[Client](../modules/Client.md).RecoverySharedState

## Hierarchy

- [`SharedState`](Client.SharedState.md)

  ↳ **`RecoverySharedState`**

## Table of contents

### Properties

- [acceptedProtectionRequests](Client.RecoverySharedState.md#acceptedprotectionrequests)
- [allLegalOfficers](Client.RecoverySharedState.md#alllegalofficers)
- [allRequests](Client.RecoverySharedState.md#allrequests)
- [axiosFactory](Client.RecoverySharedState.md#axiosfactory)
- [cancelledProtectionRequests](Client.RecoverySharedState.md#cancelledprotectionrequests)
- [componentFactory](Client.RecoverySharedState.md#componentfactory)
- [config](Client.RecoverySharedState.md#config)
- [currentAddress](Client.RecoverySharedState.md#currentaddress)
- [directoryClient](Client.RecoverySharedState.md#directoryclient)
- [legalOfficers](Client.RecoverySharedState.md#legalofficers)
- [networkState](Client.RecoverySharedState.md#networkstate)
- [nodeApi](Client.RecoverySharedState.md#nodeapi)
- [pendingProtectionRequests](Client.RecoverySharedState.md#pendingprotectionrequests)
- [recoveredAddress](Client.RecoverySharedState.md#recoveredaddress)
- [recoveryConfig](Client.RecoverySharedState.md#recoveryconfig)
- [rejectedProtectionRequests](Client.RecoverySharedState.md#rejectedprotectionrequests)
- [selectedLegalOfficers](Client.RecoverySharedState.md#selectedlegalofficers)
- [tokens](Client.RecoverySharedState.md#tokens)

## Properties

### acceptedProtectionRequests

• **acceptedProtectionRequests**: [`ProtectionRequest`](Client.ProtectionRequest.md)[]

#### Defined in

[packages/client/src/Recovery.ts:41](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L41)

___

### allLegalOfficers

• **allLegalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Inherited from

[SharedState](Client.SharedState.md).[allLegalOfficers](Client.SharedState.md#alllegalofficers)

#### Defined in

[packages/client/src/SharedClient.ts:30](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L30)

___

### allRequests

• **allRequests**: [`ProtectionRequest`](Client.ProtectionRequest.md)[]

#### Defined in

[packages/client/src/Recovery.ts:44](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L44)

___

### axiosFactory

• **axiosFactory**: [`AxiosFactory`](../classes/Client.AxiosFactory.md)

#### Inherited from

[SharedState](Client.SharedState.md).[axiosFactory](Client.SharedState.md#axiosfactory)

#### Defined in

[packages/client/src/SharedClient.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L25)

___

### cancelledProtectionRequests

• **cancelledProtectionRequests**: [`ProtectionRequest`](Client.ProtectionRequest.md)[]

#### Defined in

[packages/client/src/Recovery.ts:43](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L43)

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

### pendingProtectionRequests

• **pendingProtectionRequests**: [`ProtectionRequest`](Client.ProtectionRequest.md)[]

#### Defined in

[packages/client/src/Recovery.ts:40](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L40)

___

### recoveredAddress

• `Optional` **recoveredAddress**: `string`

#### Defined in

[packages/client/src/Recovery.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L46)

___

### recoveryConfig

• `Optional` **recoveryConfig**: [`RecoveryConfig`](../modules/Node_API.md#recoveryconfig)

#### Defined in

[packages/client/src/Recovery.ts:45](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L45)

___

### rejectedProtectionRequests

• **rejectedProtectionRequests**: [`ProtectionRequest`](Client.ProtectionRequest.md)[]

#### Defined in

[packages/client/src/Recovery.ts:42](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L42)

___

### selectedLegalOfficers

• **selectedLegalOfficers**: [`LegalOfficer`](Client.LegalOfficer.md)[]

#### Defined in

[packages/client/src/Recovery.ts:47](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Recovery.ts#L47)

___

### tokens

• **tokens**: [`AccountTokens`](../classes/Client.AccountTokens.md)

#### Inherited from

[SharedState](Client.SharedState.md).[tokens](Client.SharedState.md#tokens)

#### Defined in

[packages/client/src/SharedClient.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31)
