[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LogionClassification

# Class: LogionClassification

[Client](../modules/Client.md).LogionClassification

## Hierarchy

- [`AbstractTermsAndConditionsElement`](Client.AbstractTermsAndConditionsElement.md)<[`LogionLicenseParameters`](../interfaces/Client.LogionLicenseParameters.md)\>

  ↳ **`LogionClassification`**

## Table of contents

### Constructors

- [constructor](Client.LogionClassification.md#constructor)

### Accessors

- [details](Client.LogionClassification.md#details)
- [expiration](Client.LogionClassification.md#expiration)
- [parameters](Client.LogionClassification.md#parameters)
- [regionalLimit](Client.LogionClassification.md#regionallimit)
- [tcLocId](Client.LogionClassification.md#tclocid)
- [type](Client.LogionClassification.md#type)

### Methods

- [checkValidity](Client.LogionClassification.md#checkvalidity)
- [transferredRights](Client.LogionClassification.md#transferredrights)
- [fromDetails](Client.LogionClassification.md#fromdetails)

## Constructors

### constructor

• **new LogionClassification**(`licenseLocId`, `parameters`, `checkValidity?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | `undefined` |
| `parameters` | [`LogionLicenseParameters`](../interfaces/Client.LogionLicenseParameters.md) | `undefined` |
| `checkValidity` | `boolean` | `true` |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/LogionClassification.ts:229](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L229)

## Accessors

### details

• `get` **details**(): `string`

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/LogionClassification.ts:248](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L248)

___

### expiration

• `get` **expiration**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/client/src/license/LogionClassification.ts:244](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L244)

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

### regionalLimit

• `get` **regionalLimit**(): `undefined` \| (``"AD"`` \| ``"AE"`` \| ``"AF"`` \| ``"AG"`` \| ``"AI"`` \| ``"AL"`` \| ``"AM"`` \| ``"AO"`` \| ``"AQ"`` \| ``"AR"`` \| ``"AS"`` \| ``"AT"`` \| ``"AU"`` \| ``"AW"`` \| ``"AX"`` \| ``"AZ"`` \| ``"BA"`` \| ``"BB"`` \| ``"BD"`` \| ``"BE"`` \| ``"BF"`` \| ``"BG"`` \| ``"BH"`` \| ``"BI"`` \| ``"BJ"`` \| ``"BL"`` \| ``"BM"`` \| ``"BN"`` \| ``"BO"`` \| ``"BQ"`` \| ``"BR"`` \| ``"BS"`` \| ``"BT"`` \| ``"BV"`` \| ``"BW"`` \| ``"BY"`` \| ``"BZ"`` \| ``"CA"`` \| ``"CC"`` \| ``"CD"`` \| ``"CF"`` \| ``"CG"`` \| ``"CH"`` \| ``"CI"`` \| ``"CK"`` \| ``"CL"`` \| ``"CM"`` \| ``"CN"`` \| ``"CO"`` \| ``"CR"`` \| ``"CU"`` \| ``"CV"`` \| ``"CW"`` \| ``"CX"`` \| ``"CY"`` \| ``"CZ"`` \| ``"DE"`` \| ``"DJ"`` \| ``"DK"`` \| ``"DM"`` \| ``"DO"`` \| ``"DZ"`` \| ``"EC"`` \| ``"EE"`` \| ``"EG"`` \| ``"EH"`` \| ``"ER"`` \| ``"ES"`` \| ``"ET"`` \| ``"FI"`` \| ``"FJ"`` \| ``"FK"`` \| ``"FM"`` \| ``"FO"`` \| ``"FR"`` \| ``"GA"`` \| ``"GB"`` \| ``"GD"`` \| ``"GE"`` \| ``"GF"`` \| ``"GG"`` \| ``"GH"`` \| ``"GI"`` \| ``"GL"`` \| ``"GM"`` \| ``"GN"`` \| ``"GP"`` \| ``"GQ"`` \| ``"GR"`` \| ``"GS"`` \| ``"GT"`` \| ``"GU"`` \| ``"GW"`` \| ``"GY"`` \| ``"HK"`` \| ``"HM"`` \| ``"HN"`` \| ``"HR"`` \| ``"HT"`` \| ``"HU"`` \| ``"ID"`` \| ``"IE"`` \| ``"IL"`` \| ``"IM"`` \| ``"IN"`` \| ``"IO"`` \| ``"IQ"`` \| ``"IR"`` \| ``"IS"`` \| ``"IT"`` \| ``"JE"`` \| ``"JM"`` \| ``"JO"`` \| ``"JP"`` \| ``"KE"`` \| ``"KG"`` \| ``"KH"`` \| ``"KI"`` \| ``"KM"`` \| ``"KN"`` \| ``"KP"`` \| ``"KR"`` \| ``"KW"`` \| ``"KY"`` \| ``"KZ"`` \| ``"LA"`` \| ``"LB"`` \| ``"LC"`` \| ``"LI"`` \| ``"LK"`` \| ``"LR"`` \| ``"LS"`` \| ``"LT"`` \| ``"LU"`` \| ``"LV"`` \| ``"LY"`` \| ``"MA"`` \| ``"MC"`` \| ``"MD"`` \| ``"ME"`` \| ``"MF"`` \| ``"MG"`` \| ``"MH"`` \| ``"MK"`` \| ``"ML"`` \| ``"MM"`` \| ``"MN"`` \| ``"MO"`` \| ``"MP"`` \| ``"MQ"`` \| ``"MR"`` \| ``"MS"`` \| ``"MT"`` \| ``"MU"`` \| ``"MV"`` \| ``"MW"`` \| ``"MX"`` \| ``"MY"`` \| ``"MZ"`` \| ``"NA"`` \| ``"NC"`` \| ``"NE"`` \| ``"NF"`` \| ``"NG"`` \| ``"NI"`` \| ``"NL"`` \| ``"NO"`` \| ``"NP"`` \| ``"NR"`` \| ``"NU"`` \| ``"NZ"`` \| ``"OM"`` \| ``"PA"`` \| ``"PE"`` \| ``"PF"`` \| ``"PG"`` \| ``"PH"`` \| ``"PK"`` \| ``"PL"`` \| ``"PM"`` \| ``"PN"`` \| ``"PR"`` \| ``"PS"`` \| ``"PT"`` \| ``"PW"`` \| ``"PY"`` \| ``"QA"`` \| ``"RE"`` \| ``"RO"`` \| ``"RS"`` \| ``"RU"`` \| ``"RW"`` \| ``"SA"`` \| ``"SB"`` \| ``"SC"`` \| ``"SD"`` \| ``"SE"`` \| ``"SG"`` \| ``"SH"`` \| ``"SI"`` \| ``"SJ"`` \| ``"SK"`` \| ``"SL"`` \| ``"SM"`` \| ``"SN"`` \| ``"SO"`` \| ``"SR"`` \| ``"SS"`` \| ``"ST"`` \| ``"SV"`` \| ``"SX"`` \| ``"SY"`` \| ``"SZ"`` \| ``"TC"`` \| ``"TD"`` \| ``"TF"`` \| ``"TG"`` \| ``"TH"`` \| ``"TJ"`` \| ``"TK"`` \| ``"TL"`` \| ``"TM"`` \| ``"TN"`` \| ``"TO"`` \| ``"TR"`` \| ``"TT"`` \| ``"TV"`` \| ``"TW"`` \| ``"TZ"`` \| ``"UA"`` \| ``"UG"`` \| ``"UM"`` \| ``"US"`` \| ``"UY"`` \| ``"UZ"`` \| ``"VA"`` \| ``"VC"`` \| ``"VE"`` \| ``"VG"`` \| ``"VI"`` \| ``"VN"`` \| ``"VU"`` \| ``"WF"`` \| ``"WS"`` \| ``"XK"`` \| ``"YE"`` \| ``"YT"`` \| ``"ZA"`` \| ``"ZM"`` \| ``"ZW"``)[]

#### Returns

`undefined` \| (``"AD"`` \| ``"AE"`` \| ``"AF"`` \| ``"AG"`` \| ``"AI"`` \| ``"AL"`` \| ``"AM"`` \| ``"AO"`` \| ``"AQ"`` \| ``"AR"`` \| ``"AS"`` \| ``"AT"`` \| ``"AU"`` \| ``"AW"`` \| ``"AX"`` \| ``"AZ"`` \| ``"BA"`` \| ``"BB"`` \| ``"BD"`` \| ``"BE"`` \| ``"BF"`` \| ``"BG"`` \| ``"BH"`` \| ``"BI"`` \| ``"BJ"`` \| ``"BL"`` \| ``"BM"`` \| ``"BN"`` \| ``"BO"`` \| ``"BQ"`` \| ``"BR"`` \| ``"BS"`` \| ``"BT"`` \| ``"BV"`` \| ``"BW"`` \| ``"BY"`` \| ``"BZ"`` \| ``"CA"`` \| ``"CC"`` \| ``"CD"`` \| ``"CF"`` \| ``"CG"`` \| ``"CH"`` \| ``"CI"`` \| ``"CK"`` \| ``"CL"`` \| ``"CM"`` \| ``"CN"`` \| ``"CO"`` \| ``"CR"`` \| ``"CU"`` \| ``"CV"`` \| ``"CW"`` \| ``"CX"`` \| ``"CY"`` \| ``"CZ"`` \| ``"DE"`` \| ``"DJ"`` \| ``"DK"`` \| ``"DM"`` \| ``"DO"`` \| ``"DZ"`` \| ``"EC"`` \| ``"EE"`` \| ``"EG"`` \| ``"EH"`` \| ``"ER"`` \| ``"ES"`` \| ``"ET"`` \| ``"FI"`` \| ``"FJ"`` \| ``"FK"`` \| ``"FM"`` \| ``"FO"`` \| ``"FR"`` \| ``"GA"`` \| ``"GB"`` \| ``"GD"`` \| ``"GE"`` \| ``"GF"`` \| ``"GG"`` \| ``"GH"`` \| ``"GI"`` \| ``"GL"`` \| ``"GM"`` \| ``"GN"`` \| ``"GP"`` \| ``"GQ"`` \| ``"GR"`` \| ``"GS"`` \| ``"GT"`` \| ``"GU"`` \| ``"GW"`` \| ``"GY"`` \| ``"HK"`` \| ``"HM"`` \| ``"HN"`` \| ``"HR"`` \| ``"HT"`` \| ``"HU"`` \| ``"ID"`` \| ``"IE"`` \| ``"IL"`` \| ``"IM"`` \| ``"IN"`` \| ``"IO"`` \| ``"IQ"`` \| ``"IR"`` \| ``"IS"`` \| ``"IT"`` \| ``"JE"`` \| ``"JM"`` \| ``"JO"`` \| ``"JP"`` \| ``"KE"`` \| ``"KG"`` \| ``"KH"`` \| ``"KI"`` \| ``"KM"`` \| ``"KN"`` \| ``"KP"`` \| ``"KR"`` \| ``"KW"`` \| ``"KY"`` \| ``"KZ"`` \| ``"LA"`` \| ``"LB"`` \| ``"LC"`` \| ``"LI"`` \| ``"LK"`` \| ``"LR"`` \| ``"LS"`` \| ``"LT"`` \| ``"LU"`` \| ``"LV"`` \| ``"LY"`` \| ``"MA"`` \| ``"MC"`` \| ``"MD"`` \| ``"ME"`` \| ``"MF"`` \| ``"MG"`` \| ``"MH"`` \| ``"MK"`` \| ``"ML"`` \| ``"MM"`` \| ``"MN"`` \| ``"MO"`` \| ``"MP"`` \| ``"MQ"`` \| ``"MR"`` \| ``"MS"`` \| ``"MT"`` \| ``"MU"`` \| ``"MV"`` \| ``"MW"`` \| ``"MX"`` \| ``"MY"`` \| ``"MZ"`` \| ``"NA"`` \| ``"NC"`` \| ``"NE"`` \| ``"NF"`` \| ``"NG"`` \| ``"NI"`` \| ``"NL"`` \| ``"NO"`` \| ``"NP"`` \| ``"NR"`` \| ``"NU"`` \| ``"NZ"`` \| ``"OM"`` \| ``"PA"`` \| ``"PE"`` \| ``"PF"`` \| ``"PG"`` \| ``"PH"`` \| ``"PK"`` \| ``"PL"`` \| ``"PM"`` \| ``"PN"`` \| ``"PR"`` \| ``"PS"`` \| ``"PT"`` \| ``"PW"`` \| ``"PY"`` \| ``"QA"`` \| ``"RE"`` \| ``"RO"`` \| ``"RS"`` \| ``"RU"`` \| ``"RW"`` \| ``"SA"`` \| ``"SB"`` \| ``"SC"`` \| ``"SD"`` \| ``"SE"`` \| ``"SG"`` \| ``"SH"`` \| ``"SI"`` \| ``"SJ"`` \| ``"SK"`` \| ``"SL"`` \| ``"SM"`` \| ``"SN"`` \| ``"SO"`` \| ``"SR"`` \| ``"SS"`` \| ``"ST"`` \| ``"SV"`` \| ``"SX"`` \| ``"SY"`` \| ``"SZ"`` \| ``"TC"`` \| ``"TD"`` \| ``"TF"`` \| ``"TG"`` \| ``"TH"`` \| ``"TJ"`` \| ``"TK"`` \| ``"TL"`` \| ``"TM"`` \| ``"TN"`` \| ``"TO"`` \| ``"TR"`` \| ``"TT"`` \| ``"TV"`` \| ``"TW"`` \| ``"TZ"`` \| ``"UA"`` \| ``"UG"`` \| ``"UM"`` \| ``"US"`` \| ``"UY"`` \| ``"UZ"`` \| ``"VA"`` \| ``"VC"`` \| ``"VE"`` \| ``"VG"`` \| ``"VI"`` \| ``"VN"`` \| ``"VU"`` \| ``"WF"`` \| ``"WS"`` \| ``"XK"`` \| ``"YE"`` \| ``"YT"`` \| ``"ZA"`` \| ``"ZM"`` \| ``"ZW"``)[]

#### Defined in

[packages/client/src/license/LogionClassification.ts:240](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L240)

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

### checkValidity

▸ **checkValidity**(): `void`

#### Returns

`void`

#### Defined in

[packages/client/src/license/LogionClassification.ts:252](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L252)

___

### transferredRights

▸ **transferredRights**(`lang?`): [`LogionTransferredRight`](../modules/Client.md#logiontransferredright)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `lang` | [`Language`](../modules/Client.md#language) | `'en'` |

#### Returns

[`LogionTransferredRight`](../modules/Client.md#logiontransferredright)[]

#### Defined in

[packages/client/src/license/LogionClassification.ts:236](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L236)

___

### fromDetails

▸ `Static` **fromDetails**(`licenseLocId`, `details`, `checkValidity?`): [`LogionClassification`](Client.LogionClassification.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | `undefined` |
| `details` | `string` | `undefined` |
| `checkValidity` | `boolean` | `true` |

#### Returns

[`LogionClassification`](Client.LogionClassification.md)

#### Defined in

[packages/client/src/license/LogionClassification.ts:277](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L277)
