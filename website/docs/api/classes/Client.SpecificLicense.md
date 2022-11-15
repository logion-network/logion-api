[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / SpecificLicense

# Class: SpecificLicense

[Client](../modules/Client.md).SpecificLicense

A Terms and Conditions element defining a specific license,
where details are stored "as is".

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

Constructs a new Specific license.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | the ID of the defining LOC. |
| `details` | `string` | details of the license, stored "as is". |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/SpecificLicense.ts:16](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L16)

## Accessors

### details

• `get` **details**(): `string`

The serialized details.

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/SpecificLicense.ts:24](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L24)

___

### parameters

• `get` **parameters**(): `P`

Provides the parameters.

#### Returns

`P`

the parameters.

#### Inherited from

AbstractTermsAndConditionsElement.parameters

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:58](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L58)

___

### tcLocId

• `get` **tcLocId**(): [`UUID`](Node_API.UUID.md)

The id of the LOC enabling the usage of this T&C.

#### Returns

[`UUID`](Node_API.UUID.md)

#### Inherited from

AbstractTermsAndConditionsElement.tcLocId

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:50](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L50)

___

### type

• `get` **type**(): [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

The type of this T&C element.

#### Returns

[`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

#### Inherited from

AbstractTermsAndConditionsElement.type

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L46)

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

[packages/client/src/license/SpecificLicense.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/SpecificLicense.ts#L20)
