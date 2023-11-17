import { Hash } from "@logion/node-api";
import { HashOrContent, HashString } from "../src/index.js";
import { MOCK_FILE, MOCK_FILE_DESCRIPTION, MOCK_FILE_HASH } from "./Utils.js";

describe("HashOrContent", () => {

    it("does not need finalize with description for size", () => {
        const hash = HashOrContent.fromDescription(MOCK_FILE_DESCRIPTION);
        expect(hash.hasContent).toBe(false);
        expect(hash.contentHash).toEqual(MOCK_FILE_HASH);
        expect(() => hash.content).toThrow();
        expect(() => hash.size).not.toThrow();
    });

    it("finalizes from file", async () => {
        const content = await HashOrContent.fromContentFinalized(MOCK_FILE);
        expect(content.contentHash).toEqual(MOCK_FILE_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });
});

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
