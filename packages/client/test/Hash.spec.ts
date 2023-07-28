import { Hash } from "@logion/node-api";
import { HashOrContent, HashString } from "../src/index.js";

describe("HashOrContent", () => {

    const TEST_HASH = Hash.fromHex("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");

    it("does not need finalize with hash", () => {
        const hash = HashOrContent.fromHash(TEST_HASH);
        expect(hash.hasContent).toBe(false);
        expect(hash.contentHash).toEqual(TEST_HASH);
        expect(() => hash.content).toThrow();
        expect(() => hash.size).toThrow();
    });

    it("finalizes from Buffer", async () => {
        const content = await HashOrContent.fromContentFinalized(Buffer.from("test"));
        expect(content.contentHash).toEqual(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("finalizes from path", async () => {
        const content = await HashOrContent.fromContentFinalized("test/file.txt");
        expect(content.contentHash).toEqual(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("finalizes with matching hash and content", async () => {
        const content = new HashOrContent({ hash: TEST_HASH, content: Buffer.from("test") });
        await content.finalize();
        expect(content.contentHash).toEqual(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("does not finalize with mismatching hash and content", async () => {
        const content = new HashOrContent({ hash: TEST_HASH, content: Buffer.from("test2") });
        await expectAsync(content.finalize()).toBeRejected();
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
