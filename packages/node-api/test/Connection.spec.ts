import { ApiPromise } from "@polkadot/api";
import { LogionNodeApiClass } from "../src/index.js";
import { mockConsts, mockParaConsts, mockParaRuntimeVersion, mockRuntimeVersionUnexpectedSpecName, mockRuntimeVersionUnexpectedSpecVersion, mockSoloRuntimeVersion } from "./Util.js";

describe("LogionNodeApiClass", () => {

    it("detects para chain", () => {
        const polkadot = {
            runtimeVersion: mockParaRuntimeVersion(),
            consts: mockParaConsts(),
        } as unknown as ApiPromise;
        const api = new LogionNodeApiClass(polkadot);
        expect(api.chainType).toBe("Para");
    });

    it("fails connecting to para chain with wrong SS58 prefix", () => {
        const polkadot = {
            runtimeVersion: mockParaRuntimeVersion(),
            consts: mockConsts(42),
        } as unknown as ApiPromise;
        expect(() => new LogionNodeApiClass(polkadot)).toThrowError("Chain Prefix 42 differs from public constant SS58_PREFIX = 2021");
    });

    it("fails connecting to solo chain", () => {
        const polkadot = {
            runtimeVersion: mockSoloRuntimeVersion(),
        } as unknown as ApiPromise;
        expect(() => new LogionNodeApiClass(polkadot)).toThrowError("This version of the SDK does not have support for chain type Solo");
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
