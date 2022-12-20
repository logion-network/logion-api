import { UUID } from "@logion/node-api";
import { AbstractTermsAndConditionsElement } from "./TermsAndConditions.js";

/**
 * A Terms and Conditions element defining a specific license,
 * where details are stored "as is".
 * @group TermsAndConditions
 */
export class SpecificLicense extends AbstractTermsAndConditionsElement<string> {

    /**
     * Constructs a new Specific license.
     * @param licenseLocId the ID of the defining LOC.
     * @param details details of the license, stored "as is".
     */
    constructor(licenseLocId: UUID, details: string) {
        super('specific_license', licenseLocId, details);
    }

    static fromDetails(licenseLocId: UUID, details: string): SpecificLicense {
        return new SpecificLicense(licenseLocId, details);
    }

    get details(): string {
        return this.parameters;
    }
}
