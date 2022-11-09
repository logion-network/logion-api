[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AbstractTermsAndConditionsElement

# Class: AbstractTermsAndConditionsElement<P\>

[Client](../modules/Client.md).AbstractTermsAndConditionsElement

Provides a re-usable base implementation of [TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).

## Type parameters

| Name | Description |
| :------ | :------ |
| `P` | Type of Terms&Conditions parameters. |

## Hierarchy

- **`AbstractTermsAndConditionsElement`**

  ↳ [`LogionClassification`](Client.LogionClassification.md)

  ↳ [`SpecificLicense`](Client.SpecificLicense.md)

  ↳ [`CreativeCommons`](Client.CreativeCommons.md)

## Implements

- [`TermsAndConditionsElement`](../interfaces/Client.TermsAndConditionsElement.md)

## Table of contents

### Constructors

- [constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

### Accessors

- [details](Client.AbstractTermsAndConditionsElement.md#details)
- [parameters](Client.AbstractTermsAndConditionsElement.md#parameters)
- [tcLocId](Client.AbstractTermsAndConditionsElement.md#tclocid)
- [type](Client.AbstractTermsAndConditionsElement.md#type)

## Constructors

### constructor

• `Protected` **new AbstractTermsAndConditionsElement**<`P`\>(`type`, `licenseLocId`, `parameters`)

#### Type parameters

| Name |
| :------ |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype) |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) |
| `parameters` | `P` |

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:40](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L40)

## Accessors

### details

• `Abstract` `get` **details**(): `string`

The serialized details.

#### Returns

`string`

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[details](../interfaces/Client.TermsAndConditionsElement.md#details)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:62](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L62)

___

### parameters

• `get` **parameters**(): `P`

Provides the parameters.

#### Returns

`P`

the parameters.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:58](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L58)

___

### tcLocId

• `get` **tcLocId**(): [`UUID`](Node_API.UUID.md)

The id of the LOC enabling the usage of this T&C.

#### Returns

[`UUID`](Node_API.UUID.md)

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[tcLocId](../interfaces/Client.TermsAndConditionsElement.md#tclocid)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:50](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L50)

___

### type

• `get` **type**(): [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

The type of this T&C element.

#### Returns

[`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[type](../interfaces/Client.TermsAndConditionsElement.md#type)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L46)
