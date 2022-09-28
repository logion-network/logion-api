import { UUID } from "@logion/node-api";
import { newTermsAndConditionsElement, LogionClassification, SpecificLicense } from "../../src";

describe("Factory", () => {

    it("creates a Logion Classification", () => {
        const termsAndConditionsElement = newTermsAndConditionsElement("logion_classification", new UUID(), "{}");
        expect(termsAndConditionsElement).toBeInstanceOf(LogionClassification)
    })

    it("creates a Specific License", () => {
        const termsAndConditionsElement = newTermsAndConditionsElement("specific_license", new UUID(), "");
        expect(termsAndConditionsElement).toBeInstanceOf(SpecificLicense)
    })
})
