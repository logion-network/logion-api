[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / TermsAndConditionsElement

# Interface: TermsAndConditionsElement

[Client](../modules/Client.md).TermsAndConditionsElement

Common contract to all Terms and Conditions elements.

## Implemented by

- [`AbstractTermsAndConditionsElement`](../classes/Client.AbstractTermsAndConditionsElement.md)

## Table of contents

### Properties

- [details](Client.TermsAndConditionsElement.md#details)
- [tcLocId](Client.TermsAndConditionsElement.md#tclocid)
- [type](Client.TermsAndConditionsElement.md#type)

## Properties

### details

• `Readonly` **details**: `string`

The serialized details.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:25](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L25)

___

### tcLocId

• `Readonly` **tcLocId**: [`UUID`](../classes/Node_API.UUID.md)

The id of the LOC enabling the usage of this T&C.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:21](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L21)

___

### type

• `Readonly` **type**: [`TermsAndConditionsElementType`](../modules/Client.md#termsandconditionselementtype)

The type of this T&C element.

#### Defined in

[packages/client/src/license/TermsAndConditions.ts:17](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/TermsAndConditions.ts#L17)
