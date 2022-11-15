[API](../API.md) / [Modules](../modules.md) / Extension

# Module: Extension

## Table of contents

### Classes

- [ExtensionSigner](../classes/Extension.ExtensionSigner.md)

### Type Aliases

- [InjectedAccount](Extension.md#injectedaccount)
- [InjectedAccountsConsumer](Extension.md#injectedaccountsconsumer)
- [InjectedAccountsConsumerRegister](Extension.md#injectedaccountsconsumerregister)

### Variables

- [META\_MASK\_NAME](Extension.md#meta_mask_name)

### Functions

- [allMetamaskAccounts](Extension.md#allmetamaskaccounts)
- [enableExtensions](Extension.md#enableextensions)
- [enableMetaMask](Extension.md#enablemetamask)
- [isExtensionAvailable](Extension.md#isextensionavailable)

## Type Aliases

### InjectedAccount

Ƭ **InjectedAccount**: `InjectedAccountWithMeta`

#### Defined in

[packages/extension/src/Extension.ts:9](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L9)

___

### InjectedAccountsConsumer

Ƭ **InjectedAccountsConsumer**: (`accounts`: [`InjectedAccount`](Extension.md#injectedaccount)[]) => `void`

#### Type declaration

▸ (`accounts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `accounts` | [`InjectedAccount`](Extension.md#injectedaccount)[] |

##### Returns

`void`

#### Defined in

[packages/extension/src/Extension.ts:11](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L11)

___

### InjectedAccountsConsumerRegister

Ƭ **InjectedAccountsConsumerRegister**: (`consumer`: [`InjectedAccountsConsumer`](Extension.md#injectedaccountsconsumer)) => `void`

#### Type declaration

▸ (`consumer`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `consumer` | [`InjectedAccountsConsumer`](Extension.md#injectedaccountsconsumer) |

##### Returns

`void`

#### Defined in

[packages/extension/src/Extension.ts:13](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L13)

## Variables

### META\_MASK\_NAME

• `Const` **META\_MASK\_NAME**: ``"Web3Source"``

#### Defined in

[packages/extension/src/Extension.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L20)

## Functions

### allMetamaskAccounts

▸ **allMetamaskAccounts**(): `Promise`<[`InjectedAccount`](Extension.md#injectedaccount)[]\>

#### Returns

`Promise`<[`InjectedAccount`](Extension.md#injectedaccount)[]\>

#### Defined in

[packages/extension/src/Extension.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L27)

___

### enableExtensions

▸ **enableExtensions**(`appName`): `Promise`<[`InjectedAccountsConsumerRegister`](Extension.md#injectedaccountsconsumerregister)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appName` | `string` |

#### Returns

`Promise`<[`InjectedAccountsConsumerRegister`](Extension.md#injectedaccountsconsumerregister)\>

#### Defined in

[packages/extension/src/Extension.ts:15](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L15)

___

### enableMetaMask

▸ **enableMetaMask**(`appName`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appName` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/extension/src/Extension.ts:22](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L22)

___

### isExtensionAvailable

▸ **isExtensionAvailable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/extension/src/Extension.ts:5](https://github.com/logion-network/logion-api/blob/main/packages/extension/src/Extension.ts#L5)
