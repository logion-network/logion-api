[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / ComponentFactory

# Interface: ComponentFactory

[Client](../modules/Client.md).ComponentFactory

## Table of contents

### Properties

- [buildAuthenticationClient](Client.ComponentFactory.md#buildauthenticationclient)
- [buildAxiosFactory](Client.ComponentFactory.md#buildaxiosfactory)
- [buildDirectoryClient](Client.ComponentFactory.md#builddirectoryclient)
- [buildFormData](Client.ComponentFactory.md#buildformdata)

### Methods

- [buildNetworkState](Client.ComponentFactory.md#buildnetworkstate)
- [buildNodeApi](Client.ComponentFactory.md#buildnodeapi)

## Properties

### buildAuthenticationClient

• **buildAuthenticationClient**: (`directoryEndpoint`: `string`, `legalOfficers`: [`LegalOfficer`](Client.LegalOfficer.md)[], `axiosFactory`: [`AxiosFactory`](../classes/Client.AxiosFactory.md)) => [`AuthenticationClient`](../classes/Client.AuthenticationClient.md)

#### Type declaration

▸ (`directoryEndpoint`, `legalOfficers`, `axiosFactory`): [`AuthenticationClient`](../classes/Client.AuthenticationClient.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `directoryEndpoint` | `string` |
| `legalOfficers` | [`LegalOfficer`](Client.LegalOfficer.md)[] |
| `axiosFactory` | [`AxiosFactory`](../classes/Client.AxiosFactory.md) |

##### Returns

[`AuthenticationClient`](../classes/Client.AuthenticationClient.md)

#### Defined in

[packages/client/src/ComponentFactory.ts:18](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L18)

___

### buildAxiosFactory

• **buildAxiosFactory**: () => [`AxiosFactory`](../classes/Client.AxiosFactory.md)

#### Type declaration

▸ (): [`AxiosFactory`](../classes/Client.AxiosFactory.md)

##### Returns

[`AxiosFactory`](../classes/Client.AxiosFactory.md)

#### Defined in

[packages/client/src/ComponentFactory.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L16)

___

### buildDirectoryClient

• **buildDirectoryClient**: (`directoryEndpoint`: `string`, `axiosFactory`: [`AxiosFactory`](../classes/Client.AxiosFactory.md), `token?`: `string`) => [`DirectoryClient`](../classes/Client.DirectoryClient.md)

#### Type declaration

▸ (`directoryEndpoint`, `axiosFactory`, `token?`): [`DirectoryClient`](../classes/Client.DirectoryClient.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `directoryEndpoint` | `string` |
| `axiosFactory` | [`AxiosFactory`](../classes/Client.AxiosFactory.md) |
| `token?` | `string` |

##### Returns

[`DirectoryClient`](../classes/Client.DirectoryClient.md)

#### Defined in

[packages/client/src/ComponentFactory.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L17)

___

### buildFormData

• **buildFormData**: () => [`FormDataLike`](Client.FormDataLike.md)

#### Type declaration

▸ (): [`FormDataLike`](Client.FormDataLike.md)

##### Returns

[`FormDataLike`](Client.FormDataLike.md)

#### Defined in

[packages/client/src/ComponentFactory.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L21)

## Methods

### buildNetworkState

▸ **buildNetworkState**(`nodesUp`, `nodesDown`): [`NetworkState`](../classes/Client.NetworkState.md)<[`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodesUp` | [`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)[] |
| `nodesDown` | [`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)[] |

#### Returns

[`NetworkState`](../classes/Client.NetworkState.md)<[`LegalOfficerEndpoint`](Client.LegalOfficerEndpoint.md)\>

#### Defined in

[packages/client/src/ComponentFactory.ts:19](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L19)

___

### buildNodeApi

▸ **buildNodeApi**(`rpcEndpoints`): `Promise`<`ApiPromise`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcEndpoints` | `string`[] |

#### Returns

`Promise`<`ApiPromise`\>

#### Defined in

[packages/client/src/ComponentFactory.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/client/src/ComponentFactory.ts#L20)
