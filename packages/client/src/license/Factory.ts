import { TermsAndConditionsElement as ChainTermsAndConditionsElement, UUID } from "@logion/node-api";
import { LogionClassification } from "./LogionClassification";
import { TermsAndConditionsElement } from "./TermsAndConditions";
import { SpecificLicense } from "./SpecificLicense";

export function newTermsAndConditions(termsAndConditions: ChainTermsAndConditionsElement[]): TermsAndConditionsElement[] {
    return termsAndConditions.map(tc => newTermsAndConditionsElement(tc.tcType, tc.tcLocId, tc.details));
}

export function newTermsAndConditionsElement(type: string, licenseLocId: UUID, details: string): TermsAndConditionsElement {
    if (type === 'logion_classification') {
        return LogionClassification.fromDetails(licenseLocId, details, false);
    } else {
        return SpecificLicense.fromDetails(licenseLocId, details);
    }
}
