[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / KeyringSigner

# Class: KeyringSigner

[Client](../modules/Client.md).KeyringSigner

## Hierarchy

- [`BaseSigner`](Client.BaseSigner.md)

  ↳ **`KeyringSigner`**

## Table of contents

### Constructors

- [constructor](Client.KeyringSigner.md#constructor)

### Methods

- [buildAttributes](Client.KeyringSigner.md#buildattributes)
- [buildMessage](Client.KeyringSigner.md#buildmessage)
- [buildSignAndSendFunction](Client.KeyringSigner.md#buildsignandsendfunction)
- [signAndSend](Client.KeyringSigner.md#signandsend)
- [signRaw](Client.KeyringSigner.md#signraw)
- [signToHex](Client.KeyringSigner.md#signtohex)

## Constructors

### constructor

• **new KeyringSigner**(`keyring`, `signAndSendStrategy?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyring` | `Keyring` |
| `signAndSendStrategy?` | [`SignAndSendStrategy`](../interfaces/Client.SignAndSendStrategy.md) |

#### Overrides

[BaseSigner](Client.BaseSigner.md).[constructor](Client.BaseSigner.md#constructor)

#### Defined in

[packages/client/src/Signer.ts:167](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L167)

## Methods

### buildAttributes

▸ **buildAttributes**(`parameters`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignRawParameters`](../interfaces/Client.SignRawParameters.md) |

#### Returns

`string`[]

#### Inherited from

[BaseSigner](Client.BaseSigner.md).[buildAttributes](Client.BaseSigner.md#buildattributes)

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

#### Inherited from

[BaseSigner](Client.BaseSigner.md).[buildMessage](Client.BaseSigner.md#buildmessage)

#### Defined in

[packages/client/src/Signer.ts:89](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L89)

___

### buildSignAndSendFunction

▸ **buildSignAndSendFunction**(`parameters`): `Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignParameters`](../interfaces/Client.SignParameters.md) |

#### Returns

`Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Overrides

[BaseSigner](Client.BaseSigner.md).[buildSignAndSendFunction](Client.BaseSigner.md#buildsignandsendfunction)

#### Defined in

[packages/client/src/Signer.ts:182](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L182)

___

### signAndSend

▸ **signAndSend**(`parameters`): `Promise`<[`SuccessfulSubmission`](../interfaces/Client.SuccessfulSubmission.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SignParameters`](../interfaces/Client.SignParameters.md) |

#### Returns

`Promise`<[`SuccessfulSubmission`](../interfaces/Client.SuccessfulSubmission.md)\>

#### Inherited from

[BaseSigner](Client.BaseSigner.md).[signAndSend](Client.BaseSigner.md#signandsend)

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

#### Inherited from

[BaseSigner](Client.BaseSigner.md).[signRaw](Client.BaseSigner.md#signraw)

#### Defined in

[packages/client/src/Signer.ts:82](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L82)

___

### signToHex

▸ **signToHex**(`signerId`, `message`): `Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerId` | `string` |
| `message` | `string` |

#### Returns

`Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Overrides

[BaseSigner](Client.BaseSigner.md).[signToHex](Client.BaseSigner.md#signtohex)

#### Defined in

[packages/client/src/Signer.ts:174](https://github.com/logion-network/logion-api/blob/main/packages/client/src/Signer.ts#L174)
