import { Hash } from "@logion/node-api";
import { HashOrContent, HashString } from "../src/index.js";
import { MOCK_FILE, MOCK_FILE_HASH } from "./Utils.js";

describe("HashOrContent", () => {

    it("does not need finalize with hash", () => {
        const hash = HashOrContent.fromHash(MOCK_FILE_HASH);
        expect(hash.hasContent).toBe(false);
        expect(hash.contentHash).toEqual(MOCK_FILE_HASH);
        expect(() => hash.content).toThrow();
        expect(() => hash.size).toThrow();
    });

    it("finalizes from file", async () => {
        const content = await HashOrContent.fromContentFinalized(MOCK_FILE);
        expect(content.contentHash).toEqual(MOCK_FILE_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("finalizes with matching hash and content", async () => {
        const content = new HashOrContent({ hash: MOCK_FILE_HASH, content: MOCK_FILE });
        await content.finalize();
        expect(content.contentHash).toEqual(MOCK_FILE_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("does not finalize with mismatching hash and content", async () => {
        const content = new HashOrContent({ hash: WRONG_HASH, content: MOCK_FILE });
        await expectAsync(content.finalize()).toBeRejected();
    });
});

const WRONG_HASH = Hash.fromHex("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a09");

describe("HashString", () => {

    it("produces valid instance given value only", () => {
        const givenValue = "test";
        const hashString = HashString.fromValue(givenValue);
        expect(hashString.isValidValue()).toBe(true);
        expect(hashString.value).toBe(givenValue);
        expect(hashString.validValue()).toBe(givenValue);
    });

    it("is invalid with undefined value", () => {
        const hashString = new HashString(Hash.of("test"));
        expect(hashString.isValidValue()).toBe(false);
        expect(hashString.value).toBeUndefined();
        expect(() => hashString.validValue()).toThrowError();
    });

    it("is invalid with wrong value or hash", () => {
        const hashString = new HashString(Hash.of("test"), "test2");
        expect(hashString.isValidValue()).toBe(false);
        expect(hashString.value).toBe("test2");
        expect(() => hashString.validValue()).toThrowError();
    });
});
