import { UUID } from "@logion/node-api";
import { AbstractTermsAndConditionsElement } from "./TermsAndConditions";
import { Language } from "../Types";

export const values = new Set(["BY", "BY-SA", "BY-NC", "BY-NC-SA", "BY-ND", "BY-NC-ND"] as const);
export type CreativeCommonsCode = typeof values extends Set<infer T> ? T : never;

export class CreativeCommons extends AbstractTermsAndConditionsElement<CreativeCommonsCode> {

    constructor(licenseLocId: UUID, parameters: CreativeCommonsCode) {
        super('CC4.0', licenseLocId, parameters);
        if (!values.has(parameters)) {
            throw new Error(`Invalid parameters: ${ parameters }. Valid values are: ${ (Array.from(values)) }.`)
        }
    }

    deedUrl(language: Language = 'en'): string {
        return `https://creativecommons.org/licenses/${ this.details.toLowerCase() }/4.0/deed.${ language }`;
    }

    static fromDetails(licenseLocId: UUID, details: string): CreativeCommons {
        return new CreativeCommons(licenseLocId, details as CreativeCommonsCode);
    }

    get details(): string {
        return this.parameters;
    }
}
