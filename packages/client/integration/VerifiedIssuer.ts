import {
    ClosedLoc,
    EditableRequest,
    HashOrContent,
    AcceptedRequest,
    PendingRequest, OpenLoc
} from "../src/index.js";
import { LegalOfficerWorker, State, ISSUER_ADDRESS, initRequesterBalance, TEST_LOGION_CLIENT_CONFIG } from "./Utils.js";
import { hashString } from "../src/Hash.js";

export async function verifiedIssuer(state: State) {
    const { alice, issuerAccount, newAccount, signer } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

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
    await legalOfficer.acceptLoc(pendingRequest.locId);

    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    const openIdentityLoc = await acceptedIdentityLoc.open({ signer });

    await legalOfficer.closeLoc(pendingRequest.locId);
    const closedIdentityLoc = await openIdentityLoc.refresh() as ClosedLoc;

    await legalOfficer.nominateVerifiedIssuer(ISSUER_ADDRESS, closedIdentityLoc.locId);

    const userClient = state.client.withCurrentAddress(newAccount);
    let userLocsState = await userClient.locsState();
    let pendingLocRequest = await userLocsState.requestTransactionLoc({
        legalOfficer: userClient.getLegalOfficer(alice.address),
        description: "Some LOC with verified issuer",
        draft: false,
    }) as PendingRequest;
    const locId = pendingLocRequest.locId;
    await legalOfficer.acceptLoc(locId);

    let acceptedLoc = await pendingLocRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.open({ signer });

    await legalOfficer.selectIssuer(locId, ISSUER_ADDRESS);
    openLoc = await openLoc.refresh() as OpenLoc;
    expect(openLoc.data().issuers.length).toBe(1);
    expect(openLoc.data().issuers[0].identityLocId).toBe(closedIdentityLoc.locId.toString());
    expect(openLoc.data().issuers[0].selected).toBe(true);

    issuerLocsState = await issuerClient.locsState();
    expect(issuerLocsState.openVerifiedIssuerLocs["Transaction"].length).toBe(1);
    let issuerLoc = issuerLocsState.findById(locId);

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

    await legalOfficer.unselectIssuer(locId, ISSUER_ADDRESS);
    userLocsState = await (await userClient.locsState()).refresh();
    const userLoc = await userLocsState.findById(locId);
    expect(userLoc.data().issuers.length).toBe(0);
}
