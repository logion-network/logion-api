[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / CreativeCommons

# Class: CreativeCommons

[Client](../modules/Client.md).CreativeCommons

## Hierarchy

- [`AbstractTermsAndConditionsElement`](Client.AbstractTermsAndConditionsElement.md)<[`CreativeCommonsCode`](../modules/Client.md#creativecommonscode)\>

  ↳ **`CreativeCommons`**

## Table of contents

### Constructors

- [constructor](Client.CreativeCommons.md#constructor)

### Accessors

- [details](Client.CreativeCommons.md#details)
- [parameters](Client.CreativeCommons.md#parameters)
- [tcLocId](Client.CreativeCommons.md#tclocid)
- [type](Client.CreativeCommons.md#type)

### Methods

- [deedUrl](Client.CreativeCommons.md#deedurl)
- [fromDetails](Client.CreativeCommons.md#fromdetails)

## Constructors

### constructor

• **new CreativeCommons**(`licenseLocId`, `parameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) |
| `parameters` | ``"BY"`` \| ``"BY-SA"`` \| ``"BY-NC"`` \| ``"BY-NC-SA"`` \| ``"BY-ND"`` \| ``"BY-NC-ND"`` |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/CreativeCommons.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L10)

## Accessors

### details

• `get` **details**(): `string`

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/CreativeCommons.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L25)

___

### parameters

• `get` **parameters**(): `P`

#### Returns

`P`

#### Inherited from

AbstractTermsAndConditionsElement.parameters

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L31)

___

### tcLocId

• `get` **tcLocId**(): [`UUID`](Node_API.UUID.md)

#### Returns

[`UUID`](Node_API.UUID.md)

#### Inherited from

AbstractTermsAndConditionsElement.tcLocId

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L27)

___

### type

• `get` **type**(): [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Returns

[`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Inherited from

AbstractTermsAndConditionsElement.type

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:23](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L23)

## Methods

### deedUrl

▸ **deedUrl**(`language?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `language` | [`Language`](../modules/Client.md#language) | `'en'` |

#### Returns

`string`

#### Defined in

[packages/client/src/license/CreativeCommons.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L17)

___

### fromDetails

▸ `Static` **fromDetails**(`licenseLocId`, `details`): [`CreativeCommons`](Client.CreativeCommons.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) |
| `details` | `string` |

#### Returns

[`CreativeCommons`](Client.CreativeCommons.md)

#### Defined in

[packages/client/src/license/CreativeCommons.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L21)
