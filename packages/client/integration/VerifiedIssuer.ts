import {
    ClosedLoc,
    EditableRequest,
    HashOrContent,
    AcceptedRequest,
    PendingRequest, OpenLoc
} from "../src/index.js";
import { State, ISSUER_ADDRESS, initRequesterBalance, TEST_LOGION_CLIENT_CONFIG } from "./Utils.js";
import { hashString } from "../src/Hash.js";

export async function verifiedIssuer(state: State) {
    const { alice, aliceAccount, issuerAccount, newAccount, signer } = state;

    const issuerClient = state.client.withCurrentAddress(issuerAccount);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, ISSUER_ADDRESS);
    let issuerLocsState = await issuerClient.locsState();
    const pendingRequest = await issuerLocsState.requestIdentityLoc({
        legalOfficer: issuerClient.getLegalOfficer(alice.address),
        description: "This is a verified issuer Identity LOC",
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
    const issuerIdentityLocId = pendingRequest.data().id;

    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: aliceAccount.address, locTypes: ["Identity"], statuses: ["REVIEW_PENDING"] } });
    const alicePending = aliceLocs.findById(issuerIdentityLocId) as PendingRequest;
    const aliceAccepted = await alicePending.legalOfficer.accept();

    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    await acceptedIdentityLoc.open({ signer });

    const aliceOpen = await aliceAccepted.refresh() as OpenLoc;
    let aliceClosed = await aliceOpen.legalOfficer.close({ signer }) as ClosedLoc;
    aliceClosed = await aliceClosed.legalOfficer.nominateIssuer({ signer });

    const userClient = state.client.withCurrentAddress(newAccount);
    let userLocsState = await userClient.locsState();
    let pendingLocRequest = await userLocsState.requestTransactionLoc({
        legalOfficer: userClient.getLegalOfficer(alice.address),
        description: "Some LOC with verified issuer",
        draft: false,
    }) as PendingRequest;
    const transactionLocId = pendingLocRequest.data().id;

    aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: aliceAccount.address, locTypes: ["Transaction"], statuses: ["REVIEW_PENDING"] } });
    const alicePendingTransation = aliceLocs.findById(transactionLocId) as PendingRequest;
    const aliceAcceptedTransaction = await alicePendingTransation.legalOfficer.accept() as AcceptedRequest;

    let acceptedLoc = await pendingLocRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.open({ signer });

    let aliceOpenTransaction = await aliceAcceptedTransaction.refresh() as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.legalOfficer.selectIssuer({
        issuer: ISSUER_ADDRESS,
        signer,
    });
    openLoc = await openLoc.refresh() as OpenLoc;
    expect(openLoc.data().issuers.length).toBe(1);
    expect(openLoc.data().issuers[0].identityLocId).toBe(issuerIdentityLocId.toString());
    expect(openLoc.data().issuers[0].selected).toBe(true);

    issuerLocsState = await issuerClient.locsState();
    expect(issuerLocsState.openVerifiedIssuerLocs["Transaction"].length).toBe(1);
    let issuerLoc = issuerLocsState.findById(transactionLocId);

    let openIssuerLoc = await issuerLoc.refresh() as EditableRequest;
    const dataName = "Verified issuer data name";
    openIssuerLoc = await openIssuerLoc.addMetadata({
        name: dataName,
        value: "Verified issuer data value"
    });
    openIssuerLoc = await openIssuerLoc.deleteMetadata({ nameHash: hashString(dataName) });

    const file = HashOrContent.fromContent(Buffer.from("test"));
    openIssuerLoc = await openIssuerLoc.addFile({
        fileName: "test.txt",
        nature: "Some file nature",
        file,
    });
    openIssuerLoc = await openIssuerLoc.deleteFile({ hash: file.contentHash });

    aliceOpenTransaction = await aliceOpenTransaction.refresh() as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.legalOfficer.unselectIssuer({
        issuer: ISSUER_ADDRESS,
        signer
    });

    userLocsState = await userClient.locsState();
    const userLoc = userLocsState.findById(transactionLocId);
    expect(userLoc.data().issuers.length).toBe(0);
}
