import { UUID, Adapters, Hash, Lgnt, ValidAccountId } from "../src/index.js";
import { setup, signAndSend, signAndSendBatch } from "./Util.js";

export async function verifiedIssuers() {
    const { api, alice, issuer, requester } = await setup();

    const issuerIdentityLocId = new UUID();
    const collectionLocId = new UUID();
    await signAndSend(alice,
        api.polkadot.tx.balances.transferAllowDeath(issuer.address, Lgnt.from(200).canonical),
    );
    await signAndSend(issuer,
        api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
            issuerIdentityLocId.toDecimalString(),
            alice.address,
            10,
            api.adapters.emptyPalletLogionLocItemsParams(),
        ),
    );
    await signAndSendBatch(alice, [
        api.polkadot.tx.logionLoc.close(
            issuerIdentityLocId.toDecimalString(),
            null,
            false,
        ),
        api.polkadot.tx.logionLoc.nominateIssuer(issuer.address, issuerIdentityLocId.toDecimalString()),
    ]);
    await signAndSend(requester,
        api.polkadot.tx.logionLoc.createCollectionLoc(
            collectionLocId.toDecimalString(),
            alice.address,
            null,
            200,
            true,
            0,
            0,
            0,
            0,
            api.adapters.emptyPalletLogionLocItemsParams(),
        ),
    );

    await signAndSendBatch(alice, [
        api.polkadot.tx.logionLoc.setIssuerSelection(collectionLocId.toDecimalString(), issuer.address, true),
        // Metadata by owner
        api.polkadot.tx.logionLoc.addMetadata(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocMetadataItem({
            name: Hash.of("TestOwner"),
            value: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(alice.address, "Polkadot"),
        })),

        // File by owner
        api.polkadot.tx.logionLoc.addFile(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocFile({
            hash: Hash.of("TestOwner"),
            nature: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(alice.address, "Polkadot"),
            size: 9n,
        })),
    ]);

    await signAndSendBatch(requester, [
        // Metadata by requester
        api.polkadot.tx.logionLoc.addMetadata(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocMetadataItem({
            name: Hash.of("TestRequester"),
            value: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(requester.address, "Polkadot"),
        })),

        // File by requester
        api.polkadot.tx.logionLoc.addFile(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocFile({
            hash: Hash.of("TestRequester"),
            nature: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(requester.address, "Polkadot"),
            size: 13n,
        })),

        // Metadata by issuer
        api.polkadot.tx.logionLoc.addMetadata(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocMetadataItem({
            name: Hash.of("TestIssuer"),
            value: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(issuer.address, "Polkadot"),
        })),

        // File by issuer
        api.polkadot.tx.logionLoc.addFile(collectionLocId.toDecimalString(), api.adapters.toPalletLogionLocFile({
            hash: Hash.of("TestIssuer"),
            nature: Hash.of("Test"),
            submitter: api.queries.getValidAccountId(issuer.address, "Polkadot"),
            size: 10n,
        })),
    ]);

    await signAndSendBatch(issuer, [
        api.polkadot.tx.logionLoc.acknowledgeMetadata(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestIssuer"))),
        api.polkadot.tx.logionLoc.acknowledgeFile(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestIssuer"))),
    ]);

    await signAndSendBatch(alice, [
        api.polkadot.tx.logionLoc.acknowledgeMetadata(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestRequester"))),
        api.polkadot.tx.logionLoc.acknowledgeMetadata(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestIssuer"))),
        api.polkadot.tx.logionLoc.acknowledgeFile(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestRequester"))),
        api.polkadot.tx.logionLoc.acknowledgeFile(collectionLocId.toDecimalString(), api.adapters.toH256(Hash.of("TestIssuer"))),
        api.polkadot.tx.logionLoc.close(
            collectionLocId.toDecimalString(),
            null,
            false,
        ),
    ]);

    expect((await api.polkadot.query.logionLoc.verifiedIssuersMap(alice.address, issuer.address)).isSome).toBe(true);
    expect((await api.queries.getLegalOfficerVerifiedIssuers(ValidAccountId.polkadot(alice.address))).length).toBe(1);

    const batch = api.batch.locs([ collectionLocId ]);

    const collectionVerifiedIssuers = await batch.getLocsVerifiedIssuers();
    expect(collectionVerifiedIssuers[collectionLocId.toDecimalString()].length).toBe(1);
    expect(collectionVerifiedIssuers[collectionLocId.toDecimalString()][0].account.address).toBe(issuer.address);
    expect(collectionVerifiedIssuers[collectionLocId.toDecimalString()][0].identityLocId.toString()).toBe(issuerIdentityLocId.toString());

    const recordId = "0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9";
    const recordDescription = Hash.of("Some description");
    const recordFileName = Hash.of("File name");
    const recordFileContentType = Hash.of("text/plain");
    const recordFileSize = "5";
    const recordFileHash = Hash.fromHex("0x7d6fd7774f0d87624da6dcf16d0d3d104c3191e771fbe2f39c86aed4b2bf1a0f");
    await signAndSend(issuer, api.polkadot.tx.logionLoc.addTokensRecord(
        api.adapters.toLocId(collectionLocId),
        recordId,
        recordDescription.bytes,
        api.adapters.newTokensRecordFileVec([
            {
                name: recordFileName,
                contentType: recordFileContentType,
                size: recordFileSize,
                hash: recordFileHash,
            }
        ]),
        false,
    ));

    const record = Adapters.toTokensRecord((await api.polkadot.query.logionLoc.tokensRecordsMap(collectionLocId.toDecimalString(), recordId)).unwrap());
    expect(record.description).toEqual(recordDescription);
    expect(record.files.length).toBe(1);
    expect(record.files[0].name).toEqual(recordFileName);
    expect(record.files[0].contentType).toEqual(recordFileContentType);
    expect(record.files[0].size).toBe(recordFileSize);
    expect(record.files[0].hash).toEqual(recordFileHash);
}
