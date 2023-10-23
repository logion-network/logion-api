import { Hash } from "@logion/node-api";
import { generatePSP34TokenItemId } from "../src/index.js";

describe("PSP34", () => {

    it("generates expected item ID", () => {
        const itemId = generatePSP34TokenItemId("", { type: "U64", value: "0" });
        expect(itemId.toHex()).toBe("0xfd8e45608baccf004189a794eee8947ad095dd561e0981fcae90309fac5cf8fe");
    });

    it("generates expected item ID", () => {
        const itemId = generatePSP34TokenItemId("202210131727", { type: "Bytes", value: "abcd" });
        expect(itemId.toHex()).toBe(Hash.of("202210131727:Bytes(0x88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589)").toHex());
    });

})



