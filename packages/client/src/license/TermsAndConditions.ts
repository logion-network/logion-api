import { UUID } from "@logion/node-api";

export type TermsAndConditionsElementType = "logion_classification" | "specific_license" | "CC4.0";

export interface TermsAndConditionsElement {
    readonly type: TermsAndConditionsElementType;
    readonly tcLocId: UUID;
    readonly details: string;
}

export abstract class AbstractTermsAndConditionsElement<P> implements TermsAndConditionsElement {

    private readonly _type: TermsAndConditionsElementType;
    private readonly _tcLocId: UUID;
    private readonly _parameters: P;

    protected constructor(type: TermsAndConditionsElementType, licenseLocId: UUID, parameters: P) {
        this._type = type;
        this._tcLocId = licenseLocId;
        this._parameters = parameters;
    }

    get type(): TermsAndConditionsElementType {
        return this._type
    }

    get tcLocId(): UUID {
        return this._tcLocId;
    }

    get parameters(): P {
        return this._parameters;
    }

    abstract get details(): string;
}

