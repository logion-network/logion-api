[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AuthenticationClient

# Class: AuthenticationClient

[Client](../modules/Client.md).AuthenticationClient

## Table of contents

### Constructors

- [constructor](Client.AuthenticationClient.md#constructor)

### Methods

- [authenticate](Client.AuthenticationClient.md#authenticate)
- [refresh](Client.AuthenticationClient.md#refresh)

## Constructors

### constructor

• **new AuthenticationClient**(`directoryEndpoint`, `legalOfficers`, `axiosFactory`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `directoryEndpoint` | `string` |
| `legalOfficers` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[] |
| `axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |

#### Defined in

[packages/client/src/AuthenticationClient.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L20)

## Methods

### authenticate

▸ **authenticate**(`addresses`, `signer`): `Promise`<[`AccountTokens`](Client.AccountTokens.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addresses` | `string`[] |
| `signer` | [`RawSigner`](../interfaces/Client.RawSigner.md) |

#### Returns

`Promise`<[`AccountTokens`](Client.AccountTokens.md)\>

#### Defined in

[packages/client/src/AuthenticationClient.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L32)

___

### refresh

▸ **refresh**(`accountTokens`): `Promise`<[`AccountTokens`](Client.AccountTokens.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountTokens` | [`AccountTokens`](Client.AccountTokens.md) |

#### Returns

`Promise`<[`AccountTokens`](Client.AccountTokens.md)\>

#### Defined in

[packages/client/src/AuthenticationClient.ts:97](https://github.com/logion-network/logion-api/blob/main/packages/client/src/AuthenticationClient.ts#L97)
