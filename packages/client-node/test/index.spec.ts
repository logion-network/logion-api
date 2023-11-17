import { Hash } from "@logion/node-api";
import { NodeFile } from "../src/index.js";
import { MimeType } from "@logion/client";

const TEST_HASH = Hash.fromHex("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");

describe("NodeFile", () => {

    it("gets hash and size", async () => {
        const file = new NodeFile("test/file.txt", "file.txt", MimeType.from("text/plain"));
        const hashSize = await file.getHashAndSize();
        expect(hashSize.hash).toEqual(TEST_HASH);
        expect(hashSize.size).toBe(4n);
    });
});
