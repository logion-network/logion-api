import { Hash as Digest } from 'fast-sha256';
import { Hash } from "../src/Hash.js";
import { stringToU8a } from '@polkadot/util';

describe("Hash", () => {

    it("hashes string", () => {
        const hash = Hash.of(TEST_STRING);
        expect(hash.toHex()).toBe(EXPECTED_HEX);
        expect(hash.bytes).toEqual(EXPECTED_BYTES);
    });

    it("can be built from hex string", () => {
        const hash = Hash.fromHex(EXPECTED_HEX);
        expect(hash.bytes).toEqual(EXPECTED_BYTES);
    });

    it("can be built from digest and finishes it", () => {
        const digest = new Digest();
        const bytes = stringToU8a(TEST_STRING);
        digest.update(bytes);
        const hash = Hash.fromDigest(digest);
        expect(hash.bytes).toEqual(EXPECTED_BYTES);
        expect(digest.finished).toBe(true);
    });

    it("fails from invalid hex string", () => {
        expect(() => Hash.fromHex("0x1xyz")).toThrowError("Invalid hex string, must start with '0x' followed by 64 hexadecimal digits");
    });

    it("fails with invalid length", () => {
        expect(() => new Hash(new Uint8Array([1, 2, 3]))).toThrowError("Array must be 32 bytes long, got 3");
    });

    it("detects valid hex hash", () => {
        expect(Hash.isValidHexHash(EXPECTED_HEX)).toBe(true);
    });

    it("detects valid array", () => {
        expect(Hash.isValidBytes(EXPECTED_BYTES)).toBe(true);
    });

    it("detects invalid hex hash", () => {
        expect(Hash.isValidHexHash("0x1xyz")).toBe(false);
    });

    it("detects invalid array", () => {
        expect(Hash.isValidBytes(new Uint8Array([1, 2, 3]))).toBe(false);
    });
});

const TEST_STRING = "test";
const EXPECTED_HEX = "0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
const EXPECTED_BYTES = new Uint8Array([
    159, 134, 208, 129, 136,  76, 125, 101,
    154,  47, 234, 160, 197,  90, 208,  21,
    163, 191,  79,  27,  43,  11, 130,  44,
    209,  93, 108,  21, 176, 240,  10,   8
]);
