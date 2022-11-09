[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / BaseSigner

# Class: BaseSigner

[Client](../modules/Client.md).BaseSigner

## Hierarchy

- **`BaseSigner`**

  ↳ [`KeyringSigner`](Client.KeyringSigner.md)

## Implements

- [`FullSigner`](../modules/Client.md#fullsigner)

## Table of contents

### Constructors

- [constructor](Client.BaseSigner.md#constructor)

### Methods

- [buildAttributes](Client.BaseSigner.md#buildattributes)
- [buildMessage](Client.BaseSigner.md#buildmessage)
- [buildSignAndSendFunction](Client.BaseSigner.md#buildsignandsendfunction)
- [signAndSend](Client.BaseSigner.md#signandsend)
- [signRaw](Client.BaseSigner.md#signraw)
- [signToHex](Client.BaseSigner.md#signtohex)

## Constructors

### constructor

• **new BaseSigner**(`signAndSendStrategy?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signAndSendStrategy?` | [`SignAndSendStrategy`](../interfaces/Client.SignAndSendStrategy.md) |

#### Defined in

[packages/client/src/Signer.ts:72](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L72)

## Methods

### buildAttributes

▸ **buildAttributes**(`parameters`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignRawParameters`](../interfaces/Client.SignRawParameters.md) |

#### Returns

`string`[]

#### Defined in

[packages/client/src/Signer.ts:93](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L93)

___

### buildMessage

▸ **buildMessage**(`parameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignRawParameters`](../interfaces/Client.SignRawParameters.md) |

#### Returns

`string`

#### Defined in

[packages/client/src/Signer.ts:89](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L89)

___

### buildSignAndSendFunction

▸ `Abstract` **buildSignAndSendFunction**(`parameters`): `Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignParameters`](../interfaces/Client.SignParameters.md) |

#### Returns

`Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Defined in

[packages/client/src/Signer.ts:107](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L107)

___

### signAndSend

▸ **signAndSend**(`parameters`): `Promise`<[`SuccessfulSubmission`](../interfaces/Client.SuccessfulSubmission.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignParameters`](../interfaces/Client.SignParameters.md) |

#### Returns

`Promise`<[`SuccessfulSubmission`](../interfaces/Client.SuccessfulSubmission.md)\>

#### Implementation of

FullSigner.signAndSend

#### Defined in

[packages/client/src/Signer.ts:99](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L99)

___

### signRaw

▸ **signRaw**(`parameters`): `Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignRawParameters`](../interfaces/Client.SignRawParameters.md) |

#### Returns

`Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Implementation of

FullSigner.signRaw

#### Defined in

[packages/client/src/Signer.ts:82](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L82)

___

### signToHex

▸ `Abstract` **signToHex**(`signerId`, `message`): `Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerId` | `string` |
| `message` | `string` |

#### Returns

`Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Defined in

[packages/client/src/Signer.ts:87](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L87)
