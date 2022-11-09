[API](../API.md) / [Modules](../modules.md) / [Client](../modules/Client.md) / LogionClassification

# Class: LogionClassification

[Client](../modules/Client.md).LogionClassification

Provides a Logion Classification.

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

Constructs Terms and Conditions under Logion Classification.

**`Example`**

```ts
new LogionClassification({
  transferredRights:["PER-PRIV","REG","TIME"],
  regionalLimit:["BE","FR","US"],
  expiration:"2022-09-23"})
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | `undefined` | the ID of the defining LOC. |
| `parameters` | [`LogionLicenseParameters`](../interfaces/Client.LogionLicenseParameters.md) | `undefined` | the parameters of the classification. |
| `checkValidity` | `boolean` | `true` | whether parameters must be validated or not. |

#### Overrides

[AbstractTermsAndConditionsElement](Client.AbstractTermsAndConditionsElement.md).[constructor](Client.AbstractTermsAndConditionsElement.md#constructor)

#### Defined in

[packages/client/src/license/LogionClassification.ts:283](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L283)

## Accessors

### details

• `get` **details**(): `string`

**`Example`**

The details are a JSON string of the parameters
```json
{"transferredRights":["PER-PRIV","REG","TIME"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}
```

#### Returns

`string`

#### Overrides

AbstractTermsAndConditionsElement.details

#### Defined in

[packages/client/src/license/LogionClassification.ts:321](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L321)

___

### expiration

• `get` **expiration**(): `undefined` \| `string`

Provides the expiration date, if applicable.

#### Returns

`undefined` \| `string`

the expiration date (ISO formatted), or undefined.

#### Defined in

[packages/client/src/license/LogionClassification.ts:311](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L311)

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

### regionalLimit

• `get` **regionalLimit**(): `undefined` \| (``"AD"`` \| ``"AE"`` \| ``"AF"`` \| ``"AG"`` \| ``"AI"`` \| ``"AL"`` \| ``"AM"`` \| ``"AO"`` \| ``"AQ"`` \| ``"AR"`` \| ``"AS"`` \| ``"AT"`` \| ``"AU"`` \| ``"AW"`` \| ``"AX"`` \| ``"AZ"`` \| ``"BA"`` \| ``"BB"`` \| ``"BD"`` \| ``"BE"`` \| ``"BF"`` \| ``"BG"`` \| ``"BH"`` \| ``"BI"`` \| ``"BJ"`` \| ``"BL"`` \| ``"BM"`` \| ``"BN"`` \| ``"BO"`` \| ``"BQ"`` \| ``"BR"`` \| ``"BS"`` \| ``"BT"`` \| ``"BV"`` \| ``"BW"`` \| ``"BY"`` \| ``"BZ"`` \| ``"CA"`` \| ``"CC"`` \| ``"CD"`` \| ``"CF"`` \| ``"CG"`` \| ``"CH"`` \| ``"CI"`` \| ``"CK"`` \| ``"CL"`` \| ``"CM"`` \| ``"CN"`` \| ``"CO"`` \| ``"CR"`` \| ``"CU"`` \| ``"CV"`` \| ``"CW"`` \| ``"CX"`` \| ``"CY"`` \| ``"CZ"`` \| ``"DE"`` \| ``"DJ"`` \| ``"DK"`` \| ``"DM"`` \| ``"DO"`` \| ``"DZ"`` \| ``"EC"`` \| ``"EE"`` \| ``"EG"`` \| ``"EH"`` \| ``"ER"`` \| ``"ES"`` \| ``"ET"`` \| ``"FI"`` \| ``"FJ"`` \| ``"FK"`` \| ``"FM"`` \| ``"FO"`` \| ``"FR"`` \| ``"GA"`` \| ``"GB"`` \| ``"GD"`` \| ``"GE"`` \| ``"GF"`` \| ``"GG"`` \| ``"GH"`` \| ``"GI"`` \| ``"GL"`` \| ``"GM"`` \| ``"GN"`` \| ``"GP"`` \| ``"GQ"`` \| ``"GR"`` \| ``"GS"`` \| ``"GT"`` \| ``"GU"`` \| ``"GW"`` \| ``"GY"`` \| ``"HK"`` \| ``"HM"`` \| ``"HN"`` \| ``"HR"`` \| ``"HT"`` \| ``"HU"`` \| ``"ID"`` \| ``"IE"`` \| ``"IL"`` \| ``"IM"`` \| ``"IN"`` \| ``"IO"`` \| ``"IQ"`` \| ``"IR"`` \| ``"IS"`` \| ``"IT"`` \| ``"JE"`` \| ``"JM"`` \| ``"JO"`` \| ``"JP"`` \| ``"KE"`` \| ``"KG"`` \| ``"KH"`` \| ``"KI"`` \| ``"KM"`` \| ``"KN"`` \| ``"KP"`` \| ``"KR"`` \| ``"KW"`` \| ``"KY"`` \| ``"KZ"`` \| ``"LA"`` \| ``"LB"`` \| ``"LC"`` \| ``"LI"`` \| ``"LK"`` \| ``"LR"`` \| ``"LS"`` \| ``"LT"`` \| ``"LU"`` \| ``"LV"`` \| ``"LY"`` \| ``"MA"`` \| ``"MC"`` \| ``"MD"`` \| ``"ME"`` \| ``"MF"`` \| ``"MG"`` \| ``"MH"`` \| ``"MK"`` \| ``"ML"`` \| ``"MM"`` \| ``"MN"`` \| ``"MO"`` \| ``"MP"`` \| ``"MQ"`` \| ``"MR"`` \| ``"MS"`` \| ``"MT"`` \| ``"MU"`` \| ``"MV"`` \| ``"MW"`` \| ``"MX"`` \| ``"MY"`` \| ``"MZ"`` \| ``"NA"`` \| ``"NC"`` \| ``"NE"`` \| ``"NF"`` \| ``"NG"`` \| ``"NI"`` \| ``"NL"`` \| ``"NO"`` \| ``"NP"`` \| ``"NR"`` \| ``"NU"`` \| ``"NZ"`` \| ``"OM"`` \| ``"PA"`` \| ``"PE"`` \| ``"PF"`` \| ``"PG"`` \| ``"PH"`` \| ``"PK"`` \| ``"PL"`` \| ``"PM"`` \| ``"PN"`` \| ``"PR"`` \| ``"PS"`` \| ``"PT"`` \| ``"PW"`` \| ``"PY"`` \| ``"QA"`` \| ``"RE"`` \| ``"RO"`` \| ``"RS"`` \| ``"RU"`` \| ``"RW"`` \| ``"SA"`` \| ``"SB"`` \| ``"SC"`` \| ``"SD"`` \| ``"SE"`` \| ``"SG"`` \| ``"SH"`` \| ``"SI"`` \| ``"SJ"`` \| ``"SK"`` \| ``"SL"`` \| ``"SM"`` \| ``"SN"`` \| ``"SO"`` \| ``"SR"`` \| ``"SS"`` \| ``"ST"`` \| ``"SV"`` \| ``"SX"`` \| ``"SY"`` \| ``"SZ"`` \| ``"TC"`` \| ``"TD"`` \| ``"TF"`` \| ``"TG"`` \| ``"TH"`` \| ``"TJ"`` \| ``"TK"`` \| ``"TL"`` \| ``"TM"`` \| ``"TN"`` \| ``"TO"`` \| ``"TR"`` \| ``"TT"`` \| ``"TV"`` \| ``"TW"`` \| ``"TZ"`` \| ``"UA"`` \| ``"UG"`` \| ``"UM"`` \| ``"US"`` \| ``"UY"`` \| ``"UZ"`` \| ``"VA"`` \| ``"VC"`` \| ``"VE"`` \| ``"VG"`` \| ``"VI"`` \| ``"VN"`` \| ``"VU"`` \| ``"WF"`` \| ``"WS"`` \| ``"XK"`` \| ``"YE"`` \| ``"YT"`` \| ``"ZA"`` \| ``"ZM"`` \| ``"ZW"``)[]

Provides the regional limits, if applicable.

#### Returns

`undefined` \| (``"AD"`` \| ``"AE"`` \| ``"AF"`` \| ``"AG"`` \| ``"AI"`` \| ``"AL"`` \| ``"AM"`` \| ``"AO"`` \| ``"AQ"`` \| ``"AR"`` \| ``"AS"`` \| ``"AT"`` \| ``"AU"`` \| ``"AW"`` \| ``"AX"`` \| ``"AZ"`` \| ``"BA"`` \| ``"BB"`` \| ``"BD"`` \| ``"BE"`` \| ``"BF"`` \| ``"BG"`` \| ``"BH"`` \| ``"BI"`` \| ``"BJ"`` \| ``"BL"`` \| ``"BM"`` \| ``"BN"`` \| ``"BO"`` \| ``"BQ"`` \| ``"BR"`` \| ``"BS"`` \| ``"BT"`` \| ``"BV"`` \| ``"BW"`` \| ``"BY"`` \| ``"BZ"`` \| ``"CA"`` \| ``"CC"`` \| ``"CD"`` \| ``"CF"`` \| ``"CG"`` \| ``"CH"`` \| ``"CI"`` \| ``"CK"`` \| ``"CL"`` \| ``"CM"`` \| ``"CN"`` \| ``"CO"`` \| ``"CR"`` \| ``"CU"`` \| ``"CV"`` \| ``"CW"`` \| ``"CX"`` \| ``"CY"`` \| ``"CZ"`` \| ``"DE"`` \| ``"DJ"`` \| ``"DK"`` \| ``"DM"`` \| ``"DO"`` \| ``"DZ"`` \| ``"EC"`` \| ``"EE"`` \| ``"EG"`` \| ``"EH"`` \| ``"ER"`` \| ``"ES"`` \| ``"ET"`` \| ``"FI"`` \| ``"FJ"`` \| ``"FK"`` \| ``"FM"`` \| ``"FO"`` \| ``"FR"`` \| ``"GA"`` \| ``"GB"`` \| ``"GD"`` \| ``"GE"`` \| ``"GF"`` \| ``"GG"`` \| ``"GH"`` \| ``"GI"`` \| ``"GL"`` \| ``"GM"`` \| ``"GN"`` \| ``"GP"`` \| ``"GQ"`` \| ``"GR"`` \| ``"GS"`` \| ``"GT"`` \| ``"GU"`` \| ``"GW"`` \| ``"GY"`` \| ``"HK"`` \| ``"HM"`` \| ``"HN"`` \| ``"HR"`` \| ``"HT"`` \| ``"HU"`` \| ``"ID"`` \| ``"IE"`` \| ``"IL"`` \| ``"IM"`` \| ``"IN"`` \| ``"IO"`` \| ``"IQ"`` \| ``"IR"`` \| ``"IS"`` \| ``"IT"`` \| ``"JE"`` \| ``"JM"`` \| ``"JO"`` \| ``"JP"`` \| ``"KE"`` \| ``"KG"`` \| ``"KH"`` \| ``"KI"`` \| ``"KM"`` \| ``"KN"`` \| ``"KP"`` \| ``"KR"`` \| ``"KW"`` \| ``"KY"`` \| ``"KZ"`` \| ``"LA"`` \| ``"LB"`` \| ``"LC"`` \| ``"LI"`` \| ``"LK"`` \| ``"LR"`` \| ``"LS"`` \| ``"LT"`` \| ``"LU"`` \| ``"LV"`` \| ``"LY"`` \| ``"MA"`` \| ``"MC"`` \| ``"MD"`` \| ``"ME"`` \| ``"MF"`` \| ``"MG"`` \| ``"MH"`` \| ``"MK"`` \| ``"ML"`` \| ``"MM"`` \| ``"MN"`` \| ``"MO"`` \| ``"MP"`` \| ``"MQ"`` \| ``"MR"`` \| ``"MS"`` \| ``"MT"`` \| ``"MU"`` \| ``"MV"`` \| ``"MW"`` \| ``"MX"`` \| ``"MY"`` \| ``"MZ"`` \| ``"NA"`` \| ``"NC"`` \| ``"NE"`` \| ``"NF"`` \| ``"NG"`` \| ``"NI"`` \| ``"NL"`` \| ``"NO"`` \| ``"NP"`` \| ``"NR"`` \| ``"NU"`` \| ``"NZ"`` \| ``"OM"`` \| ``"PA"`` \| ``"PE"`` \| ``"PF"`` \| ``"PG"`` \| ``"PH"`` \| ``"PK"`` \| ``"PL"`` \| ``"PM"`` \| ``"PN"`` \| ``"PR"`` \| ``"PS"`` \| ``"PT"`` \| ``"PW"`` \| ``"PY"`` \| ``"QA"`` \| ``"RE"`` \| ``"RO"`` \| ``"RS"`` \| ``"RU"`` \| ``"RW"`` \| ``"SA"`` \| ``"SB"`` \| ``"SC"`` \| ``"SD"`` \| ``"SE"`` \| ``"SG"`` \| ``"SH"`` \| ``"SI"`` \| ``"SJ"`` \| ``"SK"`` \| ``"SL"`` \| ``"SM"`` \| ``"SN"`` \| ``"SO"`` \| ``"SR"`` \| ``"SS"`` \| ``"ST"`` \| ``"SV"`` \| ``"SX"`` \| ``"SY"`` \| ``"SZ"`` \| ``"TC"`` \| ``"TD"`` \| ``"TF"`` \| ``"TG"`` \| ``"TH"`` \| ``"TJ"`` \| ``"TK"`` \| ``"TL"`` \| ``"TM"`` \| ``"TN"`` \| ``"TO"`` \| ``"TR"`` \| ``"TT"`` \| ``"TV"`` \| ``"TW"`` \| ``"TZ"`` \| ``"UA"`` \| ``"UG"`` \| ``"UM"`` \| ``"US"`` \| ``"UY"`` \| ``"UZ"`` \| ``"VA"`` \| ``"VC"`` \| ``"VE"`` \| ``"VG"`` \| ``"VI"`` \| ``"VN"`` \| ``"VU"`` \| ``"WF"`` \| ``"WS"`` \| ``"XK"`` \| ``"YE"`` \| ``"YT"`` \| ``"ZA"`` \| ``"ZM"`` \| ``"ZW"``)[]

an array of ISO country codes, or undefined.

#### Defined in

[packages/client/src/license/LogionClassification.ts:303](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L303)

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

### checkValidity

▸ **checkValidity**(): `void`

#### Returns

`void`

#### Defined in

[packages/client/src/license/LogionClassification.ts:325](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L325)

___

### transferredRights

▸ **transferredRights**(`lang?`): [`LogionTransferredRight`](../modules/Client.md#logiontransferredright)[]

Provides the transferred rights, in given language.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `lang` | [`Language`](../modules/Client.md#language) | `'en'` | the description language. |

#### Returns

[`LogionTransferredRight`](../modules/Client.md#logiontransferredright)[]

the array of transferred rights.

#### Defined in

[packages/client/src/license/LogionClassification.ts:295](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L295)

___

### fromDetails

▸ `Static` **fromDetails**(`licenseLocId`, `details`, `checkValidity?`): [`LogionClassification`](Client.LogionClassification.md)

Constructs a new Logion Classification, based on parameters represented as a JSON string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `licenseLocId` | [`UUID`](Node_API.UUID.md) | `undefined` | the ID of the defining LOC. |
| `details` | `string` | `undefined` | JSON string of the parameters |
| `checkValidity` | `boolean` | `true` | whether parameters must be validated or not. |

#### Returns

[`LogionClassification`](Client.LogionClassification.md)

the new Logion Classification.

#### Defined in

[packages/client/src/license/LogionClassification.ts:357](https://github.com/logion-network/logion-api/blob/main/packages/client/src/license/LogionClassification.ts#L357)
