import { UUID } from "@logion/node-api";
import { LogionClassification } from "../../src";

describe("LogionClassification", () => {

    const classificationLocId: UUID = new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4")

    it("has correct details", () => {
        const logionClassification = new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PRIV", "PER-PUB" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "2022-09-23"
        });
        expect(logionClassification.details).toEqual('{"transferredRights":["PER-PRIV","PER-PUB"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionClassification.transferredRights.length).toEqual(2);
        expect(logionClassification.transferredRights[0].code).toEqual("PER-PRIV");
        expect(logionClassification.transferredRights[1].code).toEqual("PER-PUB");
        expect(logionClassification.transferredRights[0].shortDescription).toEqual("PERSONAL, PRIVATE USE ONLY");
        expect(logionClassification.transferredRights[1].shortDescription).toEqual("PERSONAL, PRIVATE, AND PUBLIC USE");
        expect(logionClassification.tcLocId.toString()).toEqual(classificationLocId.toString());
        expect(logionClassification.type).toEqual('logion_classification');
    })

    it("instantiates from empty details", () => {
        const logionClassification = LogionClassification.fromDetails(classificationLocId, '{}');
        expect(logionClassification.transferredRights.length).toEqual(0);
        expect(logionClassification.expiration).toBeUndefined();
        expect(logionClassification.regionalLimit).toBeUndefined();
    })

    it("instantiates from full details", () => {
        const logionClassification = LogionClassification.fromDetails(classificationLocId, '{"transferredRights":["COM-NOMOD"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionClassification.transferredRights.length).toEqual(1);
        expect(logionClassification.transferredRights[0].code).toEqual("COM-NOMOD");
        expect(logionClassification.transferredRights[0].shortDescription).toEqual("COMMERCIAL USE WITHOUT MODIFICATION");
        expect(logionClassification.expiration).toEqual("2022-09-23");
        expect(logionClassification.regionalLimit).toContain("BE");
        expect(logionClassification.regionalLimit).toContain("FR");
        expect(logionClassification.regionalLimit).toContain("US");
    })

    it("fails on incorrect date", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "EX", "WW" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "Invalid!"
        })).toThrowError("Invalid date")
    })
})
