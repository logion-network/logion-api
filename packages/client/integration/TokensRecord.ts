import { ClosedCollectionLoc, HashOrContent, hashString, ItemFileWithContent, LocRequestState, MimeType, PendingRequest } from "../src/index.js";
import { initRequesterBalance, LegalOfficerWorker, State, TEST_LOGION_CLIENT_CONFIG, ISSUER_ADDRESS } from "./Utils.js";

export async function tokensRecords(state: State) {
    const { client, alice, aliceAccount, newAccount, issuerAccount, signer } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

    const userClient = state.client.withCurrentAddress(newAccount);
    let collectionLoc: LocRequestState = await (await userClient.locsState()).requestCollectionLoc({
        legalOfficer: userClient.getLegalOfficer(alice.address),
        description: "Some LOC with records",
        draft: false,
    });
    const collectionLocId = collectionLoc.locId;
    const aliceClient = client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, locTypes: ["Collection"], statuses: ["REQUESTED"] } });
    let alicePendingRequest = aliceLocs.findById(collectionLocId) as PendingRequest;
    let aliceOpenLoc = await alicePendingRequest.legalOfficer.acceptCollection({ collectionMaxSize: 100, collectionCanUpload: true, signer });
    await legalOfficer.selectIssuer(collectionLocId, ISSUER_ADDRESS, true);
    await aliceOpenLoc.legalOfficer.close({ signer });

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, ISSUER_ADDRESS);

    const issuerClient = state.client.withCurrentAddress(issuerAccount);
    let closedcollectionLoc = (await issuerClient.locsState()).findById(collectionLocId) as ClosedCollectionLoc;

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
