import { UUID } from "@logion/node-api";
import { AbstractTermsAndConditionsElement } from "./TermsAndConditions.js";
import { Language } from "../Types.js";

export const values = new Set(["BY", "BY-SA", "BY-NC", "BY-NC-SA", "BY-ND", "BY-NC-ND"] as const);
export type CreativeCommonsCode = typeof values extends Set<infer T> ? T : never;

/**
 * Provides Terms and Conditions under
 * the {@link https://creativecommons.org/about/cclicenses/ Creative Commons Attribution License 4.0}
 * @group TermsAndConditions
 */
export class CreativeCommons extends AbstractTermsAndConditionsElement<CreativeCommonsCode> {

    /**
     * Constructs a new CreativeCommons.
     * @param licenseLocId the ID of the defining LOC.
     * @param parameters the code of the selected license.
     */
    constructor(licenseLocId: UUID, parameters: CreativeCommonsCode) {
        super('CC4.0', licenseLocId, parameters);
        if (!values.has(parameters)) {
            throw new Error(`Invalid parameters: ${ parameters }. Valid values are: ${ (Array.from(values)) }.`)
        }
    }

    /**
     * Provides the deed url in the requested language.
     * @param language the language
     * @return the url to the
     */
    deedUrl(language: Language = 'en'): string {
        return `https://creativecommons.org/licenses/${ this.details.toLowerCase() }/4.0/deed.${ language }`;
    }

    /**
     * Constructs a new Creative Commons, based on parameters represented as a JSON string.
     * @param licenseLocId the ID of the defining LOC.
     * @param details JSON string of the parameters
     * @return the new Creative Commons
     */
    static fromDetails(licenseLocId: UUID, details: string): CreativeCommons {
        return new CreativeCommons(licenseLocId, details as CreativeCommonsCode);
    }

    get details(): string {
        return this.parameters;
    }
}
