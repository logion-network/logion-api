import { Hash } from "@logion/node-api";
import {
    ClosedCollectionLoc,
    HashOrContent,
    ItemFileWithContent,
    LocRequestState,
    MimeType,
    PendingRequest,
    AcceptedRequest, OpenLoc
} from "@logion/client";
import { initRequesterBalance, State, TEST_LOGION_CLIENT_CONFIG, ISSUER_ADDRESS } from "./Utils.js";
import { NodeFile } from "../src/index.js";

export async function tokensRecords(state: State) {
    const { client, alice, aliceAccount, newAccount, issuerAccount, signer } = state;

    const userClient = state.client.withCurrentAddress(newAccount);
    const tokensRecordFee = 50n;
    let collectionLoc: LocRequestState = await (await userClient.locsState()).requestCollectionLoc({
        legalOfficerAddress: alice.address,
        description: "Some LOC with records",
        draft: false,
        valueFee: 100n,
        collectionItemFee: 50n,
        tokensRecordFee,
    });
    const collectionLocId = collectionLoc.locId;
    const aliceClient = client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, locTypes: ["Collection"], statuses: ["REVIEW_PENDING"] } });
    let alicePendingRequest = aliceLocs.findById(collectionLocId) as PendingRequest;
    let aliceAcceptedLoc = await alicePendingRequest.legalOfficer.accept();

    let acceptedLoc = await collectionLoc.refresh() as AcceptedRequest;
    await acceptedLoc.openCollection({ collectionMaxSize: 100, collectionCanUpload: true, signer, autoPublish: false });
    let aliceOpenLoc = await aliceAcceptedLoc.refresh() as OpenLoc;

    aliceOpenLoc = await aliceOpenLoc.legalOfficer.selectIssuer({ issuer: ISSUER_ADDRESS, signer });
    await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, ISSUER_ADDRESS);

    const issuerClient = state.client.withCurrentAddress(issuerAccount);
    let closedCollectionLoc = (await issuerClient.locsState()).findById(collectionLocId) as ClosedCollectionLoc;

    const recordId = Hash.of("record-id");
    const recordDescription = "Some tokens record";
    const estimatedFees = await closedCollectionLoc.estimateFeesAddTokensRecord({
        recordId,
        description: recordDescription,
        files: [
            new ItemFileWithContent({
                name: "report.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(new NodeFile("integration/test.txt")),
            })
        ],
    });
    expect(estimatedFees.tokensRecordFee).toBe(tokensRecordFee);
    closedCollectionLoc = await closedCollectionLoc.addTokensRecord({
        recordId,
        description: recordDescription,
        files: [
            new ItemFileWithContent({
                name: "report.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(new NodeFile("integration/test.txt")),
            })
        ],
        signer: state.signer,
    });

    const record = await closedCollectionLoc.getTokensRecord({ recordId });
    expect(record?.id).toEqual(recordId);
    expect(record?.description.validValue()).toBe(recordDescription);
    expect(record?.files.length).toBe(1);

    const records = await closedCollectionLoc.getTokensRecords();
    expect(records.length).toBe(1);
}
