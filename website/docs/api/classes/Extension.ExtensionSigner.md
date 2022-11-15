[API](../API.md) / [Modules](../modules.md) / [Extension](../modules/Extension.md) / ExtensionSigner

# Class: ExtensionSigner

[Extension](../modules/Extension.md).ExtensionSigner

## Hierarchy

- [`BaseSigner`](Client.BaseSigner.md)

  ↳ **`ExtensionSigner`**

## Table of contents

### Constructors

- [constructor](Extension.ExtensionSigner.md#constructor)

### Methods

- [buildAttributes](Extension.ExtensionSigner.md#buildattributes)
- [buildMessage](Extension.ExtensionSigner.md#buildmessage)
- [buildSignAndSendFunction](Extension.ExtensionSigner.md#buildsignandsendfunction)
- [signAndSend](Extension.ExtensionSigner.md#signandsend)
- [signRaw](Extension.ExtensionSigner.md#signraw)
- [signToHex](Extension.ExtensionSigner.md#signtohex)

## Constructors

### constructor

• **new ExtensionSigner**(`signAndSendStrategy?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signAndSendStrategy?` | [`SignAndSendStrategy`](../interfaces/Client.SignAndSendStrategy.md) |

#### Overrides

[BaseSigner](Client.BaseSigner.md).[constructor](Client.BaseSigner.md#constructor)

#### Defined in

[packages/extension/src/ExtensionSigner.ts:7](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/ExtensionSigner.ts#L7)

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

packages/client/dist/Signer.d.ts:47

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

packages/client/dist/Signer.d.ts:46

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

[packages/extension/src/ExtensionSigner.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/ExtensionSigner.ts#L25)

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

packages/client/dist/Signer.d.ts:48

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

packages/client/dist/Signer.d.ts:44

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

[packages/extension/src/ExtensionSigner.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/ExtensionSigner.ts#L11)
