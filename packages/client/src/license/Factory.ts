import { TermsAndConditionsElement as ChainTermsAndConditionsElement, UUID } from "@logion/node-api";
import { LogionClassification } from "./LogionClassification.js";
import { TermsAndConditionsElement } from "./TermsAndConditions.js";
import { SpecificLicense } from "./SpecificLicense.js";
import { CreativeCommons } from "./CreativeCommons.js";
import { HashString } from "../Hash.js";

export interface OffchainTermsAndConditionsElement {
    type?: string;
    details?: string;
}

export class MergedTermsAndConditionsElement {

    constructor(params: { type: HashString, tcLocId: UUID, details: HashString }) {
        this.type = params.type;
        this.tcLocId = params.tcLocId;
        this.details = params.details;
    }

    readonly type: HashString;
    readonly details: HashString;
    readonly tcLocId: UUID;

    toTermsAndConditionsElement(): TermsAndConditionsElement {
        const type = this.type.validValue();
        const details = this.details.validValue();
        const licenseLocId = this.tcLocId;
        if (type === 'logion_classification') {
            return LogionClassification.fromDetails(licenseLocId, details, false);
        } else if (type === 'CC4.0') {
            return CreativeCommons.fromDetails(licenseLocId, details);
        } else {
            return SpecificLicense.fromDetails(licenseLocId, details);
        }
    }
}

/**
 * Creates a new Terms and Conditions, based on given type.
 * @param termsAndConditions the Terms and Conditions elements, as stored on the chain.
 * @return an array of terms and conditions element
 * @group TermsAndConditions
 */
export function newTermsAndConditions(onchainTCs: ChainTermsAndConditionsElement[], offchainTCs: OffchainTermsAndConditionsElement[]): MergedTermsAndConditionsElement[] {
    const newTCs: MergedTermsAndConditionsElement[] = [];
    for(let i = 0; i < onchainTCs.length; ++i) {
        const oneOnchainTC = onchainTCs[i];
        const oneOffchainTC = offchainTCs[i];
        newTCs.push(new MergedTermsAndConditionsElement({
            type: new HashString(oneOnchainTC.tcType, oneOffchainTC.type),
            tcLocId: oneOnchainTC.tcLocId,
            details: new HashString(oneOnchainTC.details, oneOffchainTC.details),
        }));
    }
    return newTCs;
}
