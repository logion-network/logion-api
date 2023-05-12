import { ClosedCollectionLoc, HashOrContent, hashString, ItemFileWithContent, LocRequestState, MimeType } from "../src/index.js";
import { initRequesterBalance, LegalOfficerWorker, NEW_ADDRESS, State, TEST_LOGION_CLIENT_CONFIG, ISSUER_ADDRESS } from "./Utils.js";

export async function tokensRecords(state: State) {
    const { alice, newAccount, vtpAccount } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

    const userClient = state.client.withCurrentAddress(newAccount);
    let collectionLoc: LocRequestState = await (await userClient.locsState()).requestCollectionLoc({
        legalOfficer: userClient.getLegalOfficer(alice.address),
        description: "Some LOC with records",
        draft: false,
    });
    const collectionLocId = collectionLoc.locId;
    await legalOfficer.openCollectionLoc(collectionLocId, NEW_ADDRESS, false);
    await legalOfficer.selectVtp(collectionLocId, ISSUER_ADDRESS, true);
    await legalOfficer.closeLoc(collectionLocId);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, ISSUER_ADDRESS);

    const vtpClient = state.client.withCurrentAddress(vtpAccount);
    let closedcollectionLoc = (await vtpClient.locsState()).findById(collectionLocId) as ClosedCollectionLoc;

    const recordId = hashString("record-id");
    const recordDescription = "Some tokens record";
    closedcollectionLoc = await closedcollectionLoc.addTokensRecord({
        recordId,
        description: recordDescription,
        files: [
            new ItemFileWithContent({
                name: "report.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
            })
        ],
        signer: state.signer,
    });

    const record = await closedcollectionLoc.getTokensRecord({ recordId });
    expect(record?.id).toBe(recordId);
    expect(record?.description).toBe(recordDescription);
    expect(record?.files.length).toBe(1);

    const records = await closedcollectionLoc.getTokensRecords();
    expect(records.length).toBe(1);
}
