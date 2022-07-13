import { MimeType } from "../src";

describe("MimeType", () => {

    it("fails creating unknown MIME type", () => {
        expect(() => MimeType.from("unknown/mime-type")).toThrow();
    });

    it("creates known MIME type without charset", () => {
        testValidMimeType("text/plain");
    });

    it("creates known MIME type with charset", () => {
        testValidMimeType("text/plain;charset=utf-8");
    });
});

function testValidMimeType(mimeType: string) {
    const type = MimeType.from(mimeType);
    expect(type.mimeType).toBe(mimeType);
}
