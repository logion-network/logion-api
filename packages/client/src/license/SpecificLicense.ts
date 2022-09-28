import { UUID } from "@logion/node-api";
import { AbstractTermsAndConditionsElement } from "./TermsAndConditions";

export class SpecificLicense extends AbstractTermsAndConditionsElement<string> {

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
