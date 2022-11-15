[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / DirectoryClient

# Class: DirectoryClient

[Client](../modules/Client.md).DirectoryClient

## Table of contents

### Constructors

- [constructor](Client.DirectoryClient.md#constructor)

### Methods

- [createOrUpdate](Client.DirectoryClient.md#createorupdate)
- [getLegalOfficers](Client.DirectoryClient.md#getlegalofficers)

## Constructors

### constructor

• **new DirectoryClient**(`directoryEndpoint`, `axiosFactory`, `token?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `directoryEndpoint` | `string` |
| `axiosFactory` | [`AxiosFactory`](Client.AxiosFactory.md) |
| `token?` | `string` |

#### Defined in

[packages/client/src/DirectoryClient.ts:7](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DirectoryClient.ts#L7)

## Methods

### createOrUpdate

▸ **createOrUpdate**(`legalOfficer`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `legalOfficer` | [`LegalOfficer`](../interfaces/Client.LegalOfficer.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/client/src/DirectoryClient.ts:26](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DirectoryClient.ts#L26)

___

### getLegalOfficers

▸ **getLegalOfficers**(): `Promise`<[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]\>

#### Returns

`Promise`<[`LegalOfficer`](../interfaces/Client.LegalOfficer.md)[]\>

#### Defined in

[packages/client/src/DirectoryClient.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/client/src/DirectoryClient.ts#L16)
