[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / AbstractTermsAndConditionsElement

# Class: AbstractTermsAndConditionsElement<P\>

[Client](../modules/Client.md).AbstractTermsAndConditionsElement

## Type parameters

| Name |
| :------ |
| `P` |

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

[packages/client/src/license/TermsAndConditions.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L17)

## Accessors

### details

• `Abstract` `get` **details**(): `string`

#### Returns

`string`

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[details](../interfaces/Client.TermsAndConditionsElement.md#details)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:35](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L35)

___

### parameters

• `get` **parameters**(): `P`

#### Returns

`P`

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:31](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L31)

___

### tcLocId

• `get` **tcLocId**(): [`UUID`](Node_API.UUID.md)

#### Returns

[`UUID`](Node_API.UUID.md)

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[tcLocId](../interfaces/Client.TermsAndConditionsElement.md#tclocid)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:27](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L27)

___

### type

• `get` **type**(): [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Returns

[`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Implementation of

[TermsAndConditionsElement](../interfaces/Client.TermsAndConditionsElement.md).[type](../interfaces/Client.TermsAndConditionsElement.md#type)

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:23](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L23)
