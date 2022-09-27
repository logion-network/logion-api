import { UUID } from "@logion/node-api";

export type LicenseType = "Logion" | "Specific";

export interface License {
    type: LicenseType,
    licenseLocId: UUID,
    details: string
}

export abstract class AbstractLicense<P> implements License {

    private readonly _type: LicenseType;
    private readonly _licenseLocId: UUID;
    private readonly _parameters: P;

    protected constructor(type: LicenseType, licenseLocId: UUID, parameters: P) {
        this._type = type;
        this._licenseLocId = licenseLocId;
        this._parameters = parameters;
    }

    get type(): LicenseType {
        return this._type
    }

    get licenseLocId(): UUID {
        return this._licenseLocId;
    }

    get parameters(): P {
        return this._parameters;
    }

    abstract get details(): string;
}

