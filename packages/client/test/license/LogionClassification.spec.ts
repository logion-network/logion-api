import { UUID } from "@logion/node-api";
import { LogionClassification } from "../../src/index.js";

const classificationLocId: UUID = new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4")

describe("LogionClassification", () => {

    it("has correct details", () => {
        const logionClassification = new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PRIV", "REG", "TIME" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "2022-09-23"
        });
        expect(logionClassification.details).toEqual('{"transferredRights":["PER-PRIV","REG","TIME"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionClassification.transferredRights().length).toEqual(3);
        expect(logionClassification.transferredRights()[0].code).toEqual("PER-PRIV");
        expect(logionClassification.transferredRights()[1].code).toEqual("REG");
        expect(logionClassification.transferredRights()[2].code).toEqual("TIME");
        expect(logionClassification.transferredRights()[0].shortDescription).toEqual("PERSONAL, PRIVATE USE ONLY");
        expect(logionClassification.transferredRights()[1].shortDescription).toEqual("COUNTRY-SPECIFIC OR REGIONAL USE");
        expect(logionClassification.transferredRights()[2].shortDescription).toEqual("FOR A LIMITED PERIOD OF TIME");
        expect(logionClassification.tcLocId.toString()).toEqual(classificationLocId.toString());
        expect(logionClassification.type).toEqual('logion_classification');
    })

    it("has correct details in french", () => {
        const logionClassification = new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PRIV", "REG", "TIME" ],
            regionalLimit: [ "BE", "FR", "US" ],
            expiration: "2022-09-23"
        });
        expect(logionClassification.details).toEqual('{"transferredRights":["PER-PRIV","REG","TIME"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionClassification.transferredRights('fr').length).toEqual(3);
        expect(logionClassification.transferredRights('fr')[0].code).toEqual("PER-PRIV");
        expect(logionClassification.transferredRights('fr')[1].code).toEqual("REG");
        expect(logionClassification.transferredRights('fr')[2].code).toEqual("TIME");
        expect(logionClassification.transferredRights('fr')[0].shortDescription).toEqual("USAGE PERSONNEL PRIVE");
        expect(logionClassification.transferredRights('fr')[1].shortDescription).toEqual("USAGE PAR PAYS/REGION");
        expect(logionClassification.transferredRights('fr')[2].shortDescription).toEqual("POUR UNE DUREE DETERMINEE");
        expect(logionClassification.tcLocId.toString()).toEqual(classificationLocId.toString());
        expect(logionClassification.type).toEqual('logion_classification');
    })

    it("fails on incorrect date", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PUB", "TIME" ],
            expiration: "Invalid!"
        })).toThrowError("Invalid date")
    })

    it("fails on inconsistent data", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PUB" ],
            regionalLimit: [ "BE" ],
            expiration: "2022-09-23"
        })).toThrowError("Transferred right TIME must be set if and only if expiration is set; Transferred right REG must be set if and only if a regional limit is set");
    })

    it("fails on mutually exclusive codes", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PUB", "EX", "NOEX", "WW", "REG", "NOTIME", "TIME" ],
            regionalLimit: [ "BE" ],
            expiration: "2022-09-23"
        })).toThrowError("Transferred rights are mutually exclusive: EX and NOEX; Transferred rights are mutually exclusive: REG and WW; Transferred rights are mutually exclusive: TIME and NOTIME");
    })

    it("fails when missing core codes", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "EX" ],
        })).toThrowError("Transferred rights must contain at least 1 code(s) from PER-PRIV,PER-PUB,COM-NOMOD,COM-MOD");
    })

    it("fails when missing core codes", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "PER-PRIV", "PER-PUB" ],
        })).toThrowError("Transferred rights must contain at most 1 code(s) from PER-PRIV,PER-PUB,COM-NOMOD,COM-MOD");
    })

    it("fails when missing core codes", () => {
        expect(() => new LogionClassification(classificationLocId, {
            transferredRights: [ "COM-MOD" ],
        })).toThrowError("When using COM-NOMOD or COM-MOD: Transferred rights must contain at least 1 code(s) from REG,WW; Transferred rights must contain at least 1 code(s) from TIME,NOTIME");
    })

})

describe("LogionClassification instantiated from details", () => {

    it("instantiates from full details in french", () => {
        const logionClassification = LogionClassification.fromDetails(classificationLocId, '{"transferredRights":["PER-PRIV","REG","TIME"],"regionalLimit":["BE","FR","US"],"expiration":"2022-09-23"}');
        expect(logionClassification.transferredRights('fr').length).toEqual(3);
        expect(logionClassification.transferredRights('fr')[0].code).toEqual("PER-PRIV");
        expect(logionClassification.transferredRights('fr')[1].code).toEqual("REG");
        expect(logionClassification.transferredRights('fr')[2].code).toEqual("TIME");
        expect(logionClassification.transferredRights('fr')[0].shortDescription).toEqual("USAGE PERSONNEL PRIVE");
        expect(logionClassification.transferredRights('fr')[1].shortDescription).toEqual("USAGE PAR PAYS/REGION");
        expect(logionClassification.transferredRights('fr')[2].shortDescription).toEqual("POUR UNE DUREE DETERMINEE");
        expect(logionClassification.tcLocId.toString()).toEqual(classificationLocId.toString());
        expect(logionClassification.type).toEqual('logion_classification');
    })

    it("fails to instantiate from empty details", () => {
        expect(() => LogionClassification.fromDetails(classificationLocId, '{}')).toThrow();
    })


    it("fails on invalid parameters", () => {
        expect(() => LogionClassification.fromDetails(classificationLocId, '["PER-PUB"]'))
            .toThrowError('Details do not contain a valid JSON. Expecting something like { "transferredRights": ["PER-PUB"] }');
    })

    it("fails on non-json parameters", () => {
        expect(() => LogionClassification.fromDetails(classificationLocId, 'BLA'))
            .toThrowError(/Unexpected token/);
    })

    it("fails on unknown code", () => {
        expect(() => LogionClassification.fromDetails(classificationLocId, '{ "transferredRights": [ "PER-PUB", "UNKNOWN-001", "UNKNOWN-002" ] }'))
            .toThrowError("Unknown code(s): UNKNOWN-001,UNKNOWN-002");
    })

    it("fails on unknown country code", () => {
        expect(() => LogionClassification.fromDetails(classificationLocId, '{ "transferredRights": [ "PER-PUB", "REG" ], "regionalLimit": ["BE", "NOWHERE", "SomeWhereElse"] }'))
            .toThrowError("Unknown Country code(s): NOWHERE,SomeWhereElse");
    })
})
