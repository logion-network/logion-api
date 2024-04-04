import { UUID, Adapters, Hash, Lgnt } from "../src/index.js";
import { setup, signAndSend, signAndSendBatch } from "./Util.js";

export async function invitedContributors() {
    const { api, alice, invitedContributor, requester } = await setup();

    const invitedContributorIdentityLocId = new UUID();
    const collectionLocId = new UUID();
    await signAndSend(alice,
        api.polkadot.tx.balances.transferAllowDeath(invitedContributor.address, Lgnt.from(200).canonical),
    );
    await signAndSend(invitedContributor,
        api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
            invitedContributorIdentityLocId.toDecimalString(),
            alice.address,
            0,
            api.adapters.emptyPalletLogionLocItemsParams(),
        ),
    );
    await signAndSend(alice,
        api.polkadot.tx.logionLoc.close(
            invitedContributorIdentityLocId.toDecimalString(),
            null,
            false,
        ),
    );

    expect(await api.queries.isInvitedContributorOf(invitedContributor.address, collectionLocId)).toBeFalse();

    await signAndSendBatch(requester, [
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
        api.polkadot.tx.logionLoc.setInvitedContributorSelection(
            collectionLocId.toDecimalString(),
            invitedContributor.address,
            true,
        ),
    ]);

    expect(await api.queries.isInvitedContributorOf(invitedContributor.address, collectionLocId)).toBeTrue();

    await signAndSend(alice,
        api.polkadot.tx.logionLoc.close(
            collectionLocId.toDecimalString(),
            null,
            false,
        ),
    );

    const recordId = "0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9";
    const recordDescription = Hash.of("Some description");
    const recordFileName = Hash.of("File name");
    const recordFileContentType = Hash.of("text/plain");
    const recordFileSize = "5";
    const recordFileHash = Hash.fromHex("0x7d6fd7774f0d87624da6dcf16d0d3d104c3191e771fbe2f39c86aed4b2bf1a0f");
    await signAndSend(invitedContributor, api.polkadot.tx.logionLoc.addTokensRecord(
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
    ));

    const record = Adapters.toTokensRecord((await api.polkadot.query.logionLoc.tokensRecordsMap(collectionLocId.toDecimalString(), recordId)).unwrap());
    expect(record.description).toEqual(recordDescription);
    expect(record.files.length).toBe(1);
    expect(record.files[0].name).toEqual(recordFileName);
    expect(record.files[0].contentType).toEqual(recordFileContentType);
    expect(record.files[0].size).toBe(recordFileSize);
    expect(record.files[0].hash).toEqual(recordFileHash);
}
