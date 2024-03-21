import { ApiPromise } from "@polkadot/api";
import { LogionNodeApiClass } from "../src/index.js";
import { mockParaRuntimeVersion, mockRuntimeVersionUnexpectedSpecName, mockRuntimeVersionUnexpectedSpecVersion, mockSoloRuntimeVersion } from "./Util.js";

describe("LogionNodeApiClass", () => {

    it("detects solo chain", () => {
        const polkadot = {
            runtimeVersion: mockSoloRuntimeVersion(),
        } as unknown as ApiPromise;
        const api = new LogionNodeApiClass(polkadot);
        expect(api.chainType).toBe("Solo");
    });

    it("detects para chain", () => {
        const polkadot = {
            runtimeVersion: mockParaRuntimeVersion(),
        } as unknown as ApiPromise;
        const api = new LogionNodeApiClass(polkadot);
        expect(api.chainType).toBe("Para");
    });

    it("throws with unexpected spec name", () => {
        const polkadot = {
            runtimeVersion: mockRuntimeVersionUnexpectedSpecName(),
        } as unknown as ApiPromise;
        expect(() => new LogionNodeApiClass(polkadot)).toThrowError("Unexpected chain 'not-logion'");
    });

    it("throws with unexpected spec version", () => {
        const polkadot = {
            runtimeVersion: mockRuntimeVersionUnexpectedSpecVersion(),
        } as unknown as ApiPromise;
        expect(() => new LogionNodeApiClass(polkadot)).toThrowError("Unsupported runtime version '42'");
    });
});
