import { UUID } from "@logion/node-api";
import { CreativeCommons, CreativeCommonsCode } from "../../src/index.js";

describe("CreativeCommons", () => {

    const ccLocId: UUID = new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4")

    it("succeeds to provide deed url", () => {

        const expectedDeedUrls: Record<CreativeCommonsCode, string> = {
            "BY": "https://creativecommons.org/licenses/by/4.0/deed.fr",
            "BY-SA": "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
            "BY-ND": "https://creativecommons.org/licenses/by-nd/4.0/deed.fr",
            "BY-NC": "https://creativecommons.org/licenses/by-nc/4.0/deed.fr",
            "BY-NC-SA": "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr",
            "BY-NC-ND": "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr",
        }

        for (let key in expectedDeedUrls) {
            const code: CreativeCommonsCode = key as CreativeCommonsCode;
            const creativeCommons = new CreativeCommons(ccLocId, code);
            expect(creativeCommons.deedUrl("fr")).toEqual(expectedDeedUrls[code]);
        }
    });

    it("fails to build from invalid parameters", () => {
        expect(() => CreativeCommons.fromDetails(ccLocId, "ABC"))
            .toThrowError("Invalid parameters: ABC. Valid values are: BY,BY-SA,BY-NC,BY-NC-SA,BY-ND,BY-NC-ND.")
    })
})
