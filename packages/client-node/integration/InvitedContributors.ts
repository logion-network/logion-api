import { Hash, Lgnt } from "@logion/node-api";
import {
    ClosedLoc,
    HashOrContent,
    AcceptedRequest,
    PendingRequest, OpenLoc, MimeType, waitFor
} from "@logion/client";
import {
    State,
    initRequesterBalance,
    TEST_LOGION_CLIENT_CONFIG,
    INVITED_CONTRIBUTOR_ADDRESS
} from "./Utils.js";
import { NodeFile } from "../src/index.js";
import { InvitedContributorLoc } from "@logion/client/dist/InvitedContributor.js";

export async function invitedContributors(state: State) {
    const { alice, aliceAccount, invitedContributorAccount, newAccount, signer } = state;

    const invitedContributorClient = state.client.withCurrentAddress(invitedContributorAccount);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, INVITED_CONTRIBUTOR_ADDRESS);
    let invitedContributorLocsState = await invitedContributorClient.locsState();
    const pendingRequest = await invitedContributorLocsState.requestIdentityLoc({
        legalOfficerAddress: alice.address,
        description: "This is an invited contributor Identity LOC",
        userIdentity: {
            email: "john.doe.trusted@invalid.domain",
            firstName: "John",
            lastName: "Trusted",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            line1: "Peace Street",
            line2: "2nd floor",
            postalCode: "10000",
            city: "MyCity",
            country: "Wonderland"
        },
        draft: false,
    });
    const invitedContributorIdentityLocId = pendingRequest.data().id;

    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: aliceAccount.address, locTypes: ["Identity"], statuses: ["REVIEW_PENDING"] } });
    const alicePending = aliceLocs.findById(invitedContributorIdentityLocId) as PendingRequest;
    const aliceAccepted = await alicePending.legalOfficer.accept();

    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    await acceptedIdentityLoc.open({ signer, autoPublish: false });

    let aliceOpen = await aliceAccepted.refresh() as OpenLoc;
    aliceOpen = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpen.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceOpen.legalOfficer.close({ signer, autoAck: false }) as ClosedLoc;

    const requesterClient = state.client.withCurrentAddress(newAccount);
    let userLocsState = await requesterClient.locsState();
    let pendingLocRequest = await userLocsState.requestCollectionLoc({
        legalOfficerAddress: alice.address,
        description: "Some LOC with invited contributor",
        draft: false,
        legalFee: Lgnt.zero(),
        collectionItemFee: Lgnt.zero(),
        tokensRecordFee: Lgnt.zero(),
        valueFee: Lgnt.fromCanonical(100n),
    }) as PendingRequest;
    const collectionLocId = pendingLocRequest.data().id;

    aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: aliceAccount.address, locTypes: ["Collection"], statuses: ["REVIEW_PENDING"] } });
    const alicePendingCollection = aliceLocs.findById(collectionLocId) as PendingRequest;
    await alicePendingCollection.legalOfficer.accept();

    let acceptedLoc = await pendingLocRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.openCollection({
        signer,
        autoPublish: false,
        collectionCanUpload: false,
        collectionMaxSize: 100,
    });

    let locWithInvitedContributor = await openLoc.setInvitedContributor({
        signer,
        payload: {
            invitedContributor: INVITED_CONTRIBUTOR_ADDRESS,
            selected: true,
        }
    });

    expect(locWithInvitedContributor.data().invitedContributors.length).toBe(1);
    expect(locWithInvitedContributor.data().invitedContributors[0].address).toBe(INVITED_CONTRIBUTOR_ADDRESS);
    expect(locWithInvitedContributor.data().invitedContributors[0].type).toBe("Polkadot");

    const aliceOpenLoc = await alicePendingCollection.refresh() as OpenLoc;
    await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });

    // Contribute tokens records with dedicated API
    const api = invitedContributorClient.invitedContributor;
    let loc = await api.findContributedLocById({ locId: collectionLocId }) as InvitedContributorLoc;
    expect(loc).toBeDefined();
    const recordId = Hash.of("record-id");
    const recordDescription = "Some tokens record";
    await loc!.addTokensRecord({
        payload: {
            recordId,
            description: recordDescription,
            files: [
                HashOrContent.fromContent(new NodeFile("integration/test.txt", "report.txt", MimeType.from("text/plain"))),
            ],
        },
        signer: state.signer,
    });

    const publicApi = invitedContributorClient.public;
    const records = await publicApi.getTokensRecords({
        locId: collectionLocId,
        jwtToken: invitedContributorClient.tokens.get()
    })

    expect(records.length).toBe(1);
    expect(records[0].id).toEqual(recordId);
    expect(records[0].description.validValue()).toBe(recordDescription);
    expect(records[0].files.length).toBe(1);
}
