import { UUID } from "@logion/node-api";
import { LogionLicense } from "./LogionLicense";
import { License } from "./License";
import { SpecificLicense } from "./SpecificLicense";

export function newLicense(type: string, licenseLocId: UUID, details: string): License {
    if (type === 'Logion') {
        return LogionLicense.fromDetails(licenseLocId, details);
    } else {
        return SpecificLicense.fromDetails(licenseLocId, details);
    }
}
