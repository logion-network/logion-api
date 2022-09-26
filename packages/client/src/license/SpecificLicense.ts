import { UUID } from "@logion/node-api";
import { AbstractLicense } from "./License";

export class SpecificLicense extends AbstractLicense<string> {

    constructor(licenseLocId: UUID, details: string) {
        super("Specific", licenseLocId, details);
    }

    static fromDetails(licenseLocId: UUID, details: string): SpecificLicense {
        return new SpecificLicense(licenseLocId, details);
    }

    get details(): string {
        return this.parameters;
    }
}
