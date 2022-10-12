import { MimeType } from "../src";

describe("MimeType", () => {

    it("fails creating unknown MIME type", () => {
        expect(() => MimeType.from("unknown/mime-type")).toThrow();
    });

    it("creates known MIME type without charset", () => testValidMimeType("text/plain"));
    it("creates known MIME type with charset", () => testValidMimeType("text/plain;charset=utf-8"));

    it("returns expected list of extensions for MIME type without charset", () => {
        const type = MimeType.from("text/plain");
        expect(type.extensions).toContain("txt");
    });

    it("returns expected list of extensions for MIME type without charset", () => {
        const type = MimeType.from("text/plain;charset=utf-8");
        expect(type.extensions).toContain("txt");
    });

    it("returns expected main extension for TXT", () => testMainExtension("text/plain", "txt"));
    it("returns expected main extension for PDF", () => testMainExtension("application/pdf", "pdf"));
    it("returns expected main extension for JPG", () => testMainExtension("image/jpeg", "jpeg"));
    it("returns expected main extension for PNG", () => testMainExtension("image/png", "png"));
    it("returns expected main extension for GIF", () => testMainExtension("image/gif", "gif"));
});

function testValidMimeType(mimeType: string) {
    const type = MimeType.from(mimeType);
    expect(type.mimeType).toBe(mimeType);
}

function testMainExtension(mime: string, extension: string) {
    const type = MimeType.from(mime);
    expect(type.extensions[0]).toBe(extension);
}
