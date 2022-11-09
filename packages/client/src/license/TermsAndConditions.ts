import { UUID } from "@logion/node-api";

/**
 * Defines available Terms&Conditions types.
 * @group TermsAndConditions
 */
export type TermsAndConditionsElementType = "logion_classification" | "specific_license" | "CC4.0";

/**
 * Common contract to all Terms and Conditions elements.
 * @group TermsAndConditions
 */
export interface TermsAndConditionsElement {
    /**
     * The type of this T&C element.
     */
    readonly type: TermsAndConditionsElementType;
    /**
     * The id of the LOC enabling the usage of this T&C.
     */
    readonly tcLocId: UUID;
    /**
     * The serialized details.
     */
    readonly details: string;
}

/**
 * Provides a re-usable base implementation of {@link TermsAndConditionsElement}.
 *
 * @typeParam P - Type of Terms&Conditions parameters.
 * @group TermsAndConditions
 */
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

    /**
     * Provides the parameters.
     * @return the parameters.
     */
    get parameters(): P {
        return this._parameters;
    }

    abstract get details(): string;
}

