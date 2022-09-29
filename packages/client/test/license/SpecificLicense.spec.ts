import { UUID } from "@logion/node-api";
import { SpecificLicense } from "../../src";

describe("SpecificLicense", () => {

    const licenseLocId: UUID = new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4")
    const details = "some details.";

    it("has correct details", () => {
        const license = new SpecificLicense(licenseLocId, details);
        expect(license.tcLocId).toEqual(licenseLocId);
        expect(license.details).toEqual(details);
        expect(license.parameters).toEqual(details);
    })

    it("instantiates from details", () => {
        const license = SpecificLicense.fromDetails(licenseLocId, details);
        expect(license.tcLocId).toEqual(licenseLocId);
        expect(license.details).toEqual(details);
        expect(license.parameters).toEqual(details);
    })
})
