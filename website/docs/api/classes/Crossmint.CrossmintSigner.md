[API](../API.md) / [Modules](../modules.md) / [Crossmint](../modules/Crossmint.md) / CrossmintSigner

# Class: CrossmintSigner

[Crossmint](../modules/Crossmint.md).CrossmintSigner

## Hierarchy

- [`BaseSigner`](Client.BaseSigner.md)

  ↳ **`CrossmintSigner`**

## Table of contents

### Constructors

- [constructor](Crossmint.CrossmintSigner.md#constructor)

### Methods

- [buildAttributes](Crossmint.CrossmintSigner.md#buildattributes)
- [buildMessage](Crossmint.CrossmintSigner.md#buildmessage)
- [buildSignAndSendFunction](Crossmint.CrossmintSigner.md#buildsignandsendfunction)
- [signAndSend](Crossmint.CrossmintSigner.md#signandsend)
- [signRaw](Crossmint.CrossmintSigner.md#signraw)
- [signToHex](Crossmint.CrossmintSigner.md#signtohex)

## Constructors

### constructor

• **new CrossmintSigner**(`crossmint`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossmint` | `CrossmintEVMWalletAdapter` |

#### Overrides

[BaseSigner](Client.BaseSigner.md).[constructor](Client.BaseSigner.md#constructor)

#### Defined in

[packages/crossmint/src/CrossmintSigner.ts:6](https://github.com/logion-network/logion-api/blob/main/packages/crossmint/src/CrossmintSigner.ts#L6)

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

▸ **buildSignAndSendFunction**(): `Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Returns

`Promise`<[`SignAndSendFunction`](../modules/Client.md#signandsendfunction)\>

#### Overrides

[BaseSigner](Client.BaseSigner.md).[buildSignAndSendFunction](Client.BaseSigner.md#buildsignandsendfunction)

#### Defined in

[packages/crossmint/src/CrossmintSigner.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/crossmint/src/CrossmintSigner.ts#L21)

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

▸ **signToHex**(`_signerId`, `message`): `Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerId` | `string` |
| `message` | `string` |

#### Returns

`Promise`<[`TypedSignature`](../interfaces/Client.TypedSignature.md)\>

#### Overrides

[BaseSigner](Client.BaseSigner.md).[signToHex](Client.BaseSigner.md#signtohex)

#### Defined in

[packages/crossmint/src/CrossmintSigner.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/crossmint/src/CrossmintSigner.ts#L16)
