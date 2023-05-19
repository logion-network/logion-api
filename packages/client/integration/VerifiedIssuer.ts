import { ClosedLoc, EditableRequest, HashOrContent, LocRequestState } from "../src/index.js";
import { LegalOfficerWorker, State, ISSUER_ADDRESS } from "./Utils.js";

export async function verifiedIssuer(state: State) {
    const { alice, issuerAccount, newAccount } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

    const issuerClient = state.client.withCurrentAddress(issuerAccount);

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
    await legalOfficer.openAndClose(pendingRequest.locId);
    const closedIdentityLoc = await pendingRequest.refresh() as ClosedLoc;

    await legalOfficer.nominateVerifiedIssuer(ISSUER_ADDRESS, closedIdentityLoc.locId);

    const userClient = state.client.withCurrentAddress(newAccount);
    let newLoc: LocRequestState = await (await userClient.locsState()).requestTransactionLoc({
        legalOfficer: userClient.getLegalOfficer(alice.address),
        description: "Some LOC with verified issuer",
        draft: false,
    });
    const locId = newLoc.locId;
    await legalOfficer.openLoc(locId);
    await legalOfficer.selectIssuer(locId, ISSUER_ADDRESS, true);
    newLoc = await newLoc.refresh();
    expect(newLoc.data().issuers.length).toBe(1);
    expect(newLoc.data().issuers[0].identityLocId).toBe(closedIdentityLoc.locId.toString());
    expect(newLoc.data().issuers[0].selected).toBe(true);

    issuerLocsState = await issuerClient.locsState();
    expect(issuerLocsState.openVerifiedIssuerLocs["Transaction"].length).toBe(1);
    let issuerLoc = issuerLocsState.findById(locId);

    let openIssuerLoc = await issuerLoc.refresh() as EditableRequest;
    openIssuerLoc = await openIssuerLoc.addMetadata({
        name: "Verified issuer data name",
        value: "Verified issuer data value"
    });
    openIssuerLoc = await openIssuerLoc.deleteMetadata({ name: "Verified issuer data name" });

    const file = HashOrContent.fromContent(Buffer.from("test"));
    openIssuerLoc = await openIssuerLoc.addFile({
        fileName: "test.txt",
        nature: "Some file nature",
        file,
    });
    openIssuerLoc = await openIssuerLoc.deleteFile({ hash: file.contentHash });

    await legalOfficer.selectIssuer(newLoc.locId, ISSUER_ADDRESS, false);
    const userLoc = (await userClient.locsState()).findById(locId);
    expect(userLoc.data().issuers.length).toBe(1);
    expect(userLoc.data().issuers[0].identityLocId).toBe(closedIdentityLoc.locId.toString());
    expect(userLoc.data().issuers[0].selected).toBe(false);
}
