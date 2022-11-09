import { TermsAndConditionsElement as ChainTermsAndConditionsElement, UUID } from "@logion/node-api";
import { LogionClassification } from "./LogionClassification";
import { TermsAndConditionsElement } from "./TermsAndConditions";
import { SpecificLicense } from "./SpecificLicense";
import { CreativeCommons } from "./CreativeCommons";

/**
 * Creates a new Terms and Conditions, based on given type.
 * @param termsAndConditions the Terms and Conditions elements, as stored on the chain.
 * @return an array of terms and conditions element
 * @group TermsAndConditions
 */
export function newTermsAndConditions(termsAndConditions: ChainTermsAndConditionsElement[]): TermsAndConditionsElement[] {
    return termsAndConditions.map(tc => newTermsAndConditionsElement(tc.tcType, tc.tcLocId, tc.details));
}

/**
 * Creates a new Terms and Conditions, based on given type.
 * @param type the Terms and Conditions type.
 * @param licenseLocId the ID the defining LOC.
 * @param details the details, as stored on the blockchain.
 * @return the new terms and conditions element
 * @group TermsAndConditions
 */
export function newTermsAndConditionsElement(type: string, licenseLocId: UUID, details: string): TermsAndConditionsElement {
    if (type === 'logion_classification') {
        return LogionClassification.fromDetails(licenseLocId, details, false);
    } else if (type === 'CC4.0') {
        return CreativeCommons.fromDetails(licenseLocId, details);
    } else {
        return SpecificLicense.fromDetails(licenseLocId, details);
    }
}
