[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / SpecificLicense

# Class: SpecificLicense

[Client](../modules/Client.md).SpecificLicense

## Hierarchy

- [`AbstractTermsAndConditionsElement`](Client.AbstractTermsAndConditionsElement.md)<`string`\>

  ↳ **`SpecificLicense`**

## Table of contents

### Constructors

- [constructor](Client.SpecificLicense.md#constructor)

### Accessors

- [details](Client.SpecificLicense.md#details)
- [parameters](Client.SpecificLicense.md#parameters)
- [tcLocId](Client.SpecificLicense.md#tclocid)
- [type](Client.SpecificLicense.md#type)

### Methods

- [fromDetails](Client.SpecificLicense.md#fromdetails)

## Constructors

### constructor

• **new SpecificLicense**(`licenseLocId`, `details`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) |
| `details` | `string` |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/SpecificLicense.ts:6](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L6)

## Accessors

### details

• `get` **details**(): `string`

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/SpecificLicense.ts:14](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L14)

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

### fromDetails

▸ `Static` **fromDetails**(`licenseLocId`, `details`): [`SpecificLicense`](Client.SpecificLicense.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) |
| `details` | `string` |

#### Returns

[`SpecificLicense`](Client.SpecificLicense.md)

#### Defined in

[packages/client/src/license/SpecificLicense.ts:10](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L10)
