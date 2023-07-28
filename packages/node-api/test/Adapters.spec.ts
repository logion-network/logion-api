import { Adapters, UUID } from "../src/index.js";

describe("Adapters", () => {

    it("toLocId", () => {
        const locId = new UUID();
        const adapted = Adapters.toLocId(locId);
        expect(adapted).toBe(locId.toHexString());
    });
});
