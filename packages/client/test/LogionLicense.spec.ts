import { UUID } from "@logion/node-api";
import { LogionLicense, logionLicenseItems } from "../src";

describe("LogionLicense", () => {

    const licenseLocId: UUID = new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4")

    it("has correct details", () => {
        const logionLicense = new LogionLicense(licenseLocId, {
            transferredRights: [ "A", "B" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "2022-09-23"
        });
        expect(logionLicense.details).toEqual('{"transferredRights":["A","B"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionLicense.transferredRights.length).toEqual(2);
        expect(logionLicense.transferredRights).toContain(logionLicenseItems.A);
        expect(logionLicense.transferredRights).toContain(logionLicenseItems.B);
        expect(logionLicense.transferredRights[0].shortDescription).toEqual("PERSONAL, PRIVATE USE ONLY");
        expect(logionLicense.transferredRights[1].shortDescription).toEqual("PERSONAL, PRIVATE, AND PUBLIC USE");
    })

    it("instantiates from empty details", () => {
        const logionLicense = LogionLicense.fromDetails(licenseLocId, '{}');
        expect(logionLicense.transferredRights.length).toEqual(0);
        expect(logionLicense.expiration).toBeUndefined();
        expect(logionLicense.regionalLimit.length).toEqual(0);
    })

    it("instantiates from full details", () => {
        const logionLicense = LogionLicense.fromDetails(licenseLocId, '{"transferredRights":["C"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionLicense.transferredRights.length).toEqual(1);
        expect(logionLicense.transferredRights).toContain(logionLicenseItems.C);
        expect(logionLicense.transferredRights[0].shortDescription).toEqual("COMMERCIAL USE BUT WITHOUT MODIFICATION");
        expect(logionLicense.expiration).toEqual("2022-09-23");
        expect(logionLicense.regionalLimit).toContain("BE");
        expect(logionLicense.regionalLimit).toContain("FR");
        expect(logionLicense.regionalLimit).toContain("US");
    })

    it("fails on incorrect date", () => {
        expect(() => new LogionLicense(licenseLocId, {
            transferredRights: [ "A", "B" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "Invalid!"
        })).toThrowError("Invalid date")
    })
})
