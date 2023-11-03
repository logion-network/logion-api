import { Hash } from "@logion/node-api";
import { Mock, PlayTimes } from "moq.ts";
import { BrowserFile } from "../src/index.js";

const TEST_HASH = Hash.fromHex("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");

describe("BrowserFile", () => {

    it("gets hash and size", async () => {
        const file = new BrowserFile(BLOB_MOCK);
        const hashSize = await file.getHashAndSize();
        expect(hashSize.hash).toEqual(TEST_HASH);
        expect(hashSize.size).toBe(4n);
    });
});

const READER_MOCK = new Mock<any>()
    .setup(instance => instance.read())
    .play(PlayTimes.Once())
    .returns({ done: true })

    .setup(instance => instance.read())
    .play(PlayTimes.Once())
    .returns({ done: false, value: Buffer.from("test") })

    .object();

const STREAM_MOCK = new Mock<any>()
    .setup(instance => instance.getReader())
    .returns(READER_MOCK)
    .object();

const BLOB_MOCK = new Mock<Blob>()
    .setup(instance => instance.stream())
    .returns(STREAM_MOCK)
    .object();
