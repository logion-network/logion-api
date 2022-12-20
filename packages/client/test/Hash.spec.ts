import { HashOrContent } from "../src/index.js";

describe("HashOrContent", () => {

    const TEST_HASH = "0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

    const INVALID_HASH_TOO_SHORT = "0xabc";

    const INVALID_HASH_TOO_LONG = "0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08abc";

    const INVALID_HASH_NO_PREFIX = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

    const INVALID_HASH_NOT_HEXA = "0x9g86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

    it("detects invalid hash (too short)", () => {
        expect(() => HashOrContent.fromHash(INVALID_HASH_TOO_SHORT)).toThrow();
    });

    it("detects invalid hash (too long)", () => {
        expect(() => HashOrContent.fromHash(INVALID_HASH_TOO_LONG)).toThrow();
    });

    it("detects invalid hash (no prefix)", () => {
        expect(() => HashOrContent.fromHash(INVALID_HASH_NO_PREFIX)).toThrow();
    });

    it("detects invalid hash (not hexa)", () => {
        expect(() => HashOrContent.fromHash(INVALID_HASH_NOT_HEXA)).toThrow();
    });

    it("does not need finalize with hash", () => {
        const hash = HashOrContent.fromHash(TEST_HASH);
        expect(hash.hasContent).toBe(false);
        expect(hash.contentHash).toBe(TEST_HASH);
        expect(() => hash.content).toThrow();
        expect(() => hash.size).toThrow();
    });

    it("finalizes from Buffer", async () => {
        const content = await HashOrContent.fromContentFinalized(Buffer.from("test"));
        expect(content.contentHash).toBe(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("finalizes from path", async () => {
        const content = await HashOrContent.fromContentFinalized("test/file.txt");
        expect(content.contentHash).toBe(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("finalizes with matching hash and content", async () => {
        const content = new HashOrContent({ hash: TEST_HASH, content: Buffer.from("test") });
        await content.finalize();
        expect(content.contentHash).toBe(TEST_HASH);
        expect(content.hasContent).toBe(true);
        expect(content.size).toBe(4n);
    });

    it("does not finalize with mismatching hash and content", async () => {
        const content = new HashOrContent({ hash: TEST_HASH, content: Buffer.from("test2") });
        await expectAsync(content.finalize()).toBeRejected();
    });
});
