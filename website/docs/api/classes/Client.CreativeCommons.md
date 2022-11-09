[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / CreativeCommons

# Class: CreativeCommons

[Client](../modules/Client.md).CreativeCommons

Provides Terms and Conditions under
the [Creative Commons Attribution License 4.0](https://creativecommons.org/about/cclicenses/)

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

Constructs a new CreativeCommons.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | the ID of the defining LOC. |
| `parameters` | ``"BY"`` \| ``"BY-SA"`` \| ``"BY-NC"`` \| ``"BY-NC-SA"`` \| ``"BY-ND"`` \| ``"BY-NC-ND"`` | the code of the selected license. |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/CreativeCommons.ts:20](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L20)

## Accessors

### details

• `get` **details**(): `string`

The serialized details.

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/CreativeCommons.ts:46](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L46)

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

### deedUrl

▸ **deedUrl**(`language?`): `string`

Provides the deed url in the requested language.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `language` | [`Language`](../modules/Client.md#language) | `'en'` | the language |

#### Returns

`string`

the url to the

#### Defined in

[packages/client/src/license/CreativeCommons.ts:32](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L32)

___

### fromDetails

▸ `Static` **fromDetails**(`licenseLocId`, `details`): [`CreativeCommons`](Client.CreativeCommons.md)

Constructs a new Creative Commons, based on parameters represented as a JSON string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | the ID of the defining LOC. |
| `details` | `string` | JSON string of the parameters |

#### Returns

[`CreativeCommons`](Client.CreativeCommons.md)

the new Creative Commons

#### Defined in

[packages/client/src/license/CreativeCommons.ts:42](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/CreativeCommons.ts#L42)
