import { getVerifiedIssuers, getLegalOfficerVerifiedIssuers, newTokensRecordFiles, nLgnt, toUnwrappedTokensRecord, UUID, getLegalOfficersVerifiedIssuers } from "../src/index.js";
import { ALICE, DAVE, ISSUER, REQUESTER, setup, signAndSend, signAndSendBatch } from "./Util.js";

export async function verifiedIssuers() {
    const { api, alice, issuer } = await setup();

    const issuerIdentityLocId = new UUID();
    const collectionLocId = new UUID();
    await signAndSendBatch(alice, [
        api.tx.balances.transfer(ISSUER, nLgnt("1")),
        api.tx.logionLoc.createPolkadotIdentityLoc(issuerIdentityLocId.toDecimalString(), ISSUER),
        api.tx.logionLoc.close(issuerIdentityLocId.toDecimalString()),
        api.tx.logionLoc.nominateIssuer(ISSUER, issuerIdentityLocId.toDecimalString()),
        api.tx.logionLoc.createCollectionLoc(collectionLocId.toDecimalString(), REQUESTER, null, 200, true),
        api.tx.logionLoc.setIssuerSelection(collectionLocId.toDecimalString(), ISSUER, true),
        api.tx.logionLoc.addMetadata(collectionLocId.toDecimalString(), {
            name: "Test",
            value: "Test",
            submitter: ISSUER,
        }),
        api.tx.logionLoc.close(collectionLocId.toDecimalString()),
    ]);

    expect((await api.query.logionLoc.verifiedIssuersMap(ALICE, ISSUER)).isSome).toBe(true);

    const aliceVerifiedIssuers = await getLegalOfficerVerifiedIssuers(api, ALICE);
    expect(aliceVerifiedIssuers.length).toBe(1);
    expect(aliceVerifiedIssuers[0].address).toBe(ISSUER);
    expect(aliceVerifiedIssuers[0].identityLocId.toString()).toBe(issuerIdentityLocId.toString());

    const aliceAndDaveVerifiedIssuers = await getLegalOfficersVerifiedIssuers(api, [ ALICE, DAVE ]);
    expect(ALICE in aliceAndDaveVerifiedIssuers).toBe(true);
    expect(DAVE in aliceAndDaveVerifiedIssuers).toBe(true);
    expect(aliceAndDaveVerifiedIssuers[ALICE].length).toBe(1);
    expect(aliceAndDaveVerifiedIssuers[DAVE].length).toBe(0);

    const collectionVerifiedIssuers = await getVerifiedIssuers(api, collectionLocId);
    expect(collectionVerifiedIssuers.length).toBe(1);
    expect(collectionVerifiedIssuers[0].address).toBe(ISSUER);
    expect(collectionVerifiedIssuers[0].identityLocId.toString()).toBe(issuerIdentityLocId.toString());

    const recordId = "0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9";
    const recordDescription = "Some description";
    const recordFileName = "File name";
    const recordFileContentType = "text/plain";
    const recordFileSize = "5";
    const recordFileHash = "0x7d6fd7774f0d87624da6dcf16d0d3d104c3191e771fbe2f39c86aed4b2bf1a0f";
    await signAndSend(issuer, api.tx.logionLoc.addTokensRecord(
        collectionLocId.toDecimalString(),
        recordId,
        recordDescription,
        newTokensRecordFiles(api, [
            {
                name: recordFileName,
                contentType: recordFileContentType,
                size: recordFileSize,
                hash: recordFileHash,
            }
        ]),
    ));

    const record = await toUnwrappedTokensRecord(api.query.logionLoc.tokensRecordsMap(collectionLocId.toDecimalString(), recordId));
    expect(record.description).toBe(recordDescription);
    expect(record.files.length).toBe(1);
    expect(record.files[0].name).toBe(recordFileName);
    expect(record.files[0].contentType).toBe(recordFileContentType);
    expect(record.files[0].size).toBe(recordFileSize);
    expect(record.files[0].hash).toBe(recordFileHash);
}
