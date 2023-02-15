import { ClosedLoc, EditableRequest, HashOrContent, LocRequestState } from "../src/index.js";
import { LegalOfficerWorker, NEW_ADDRESS, State, VTP_ADDRESS } from "./Utils.js";

export async function verifiedThirdParty(state: State) {
    const { alice } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

    const vtpClient = state.client.withCurrentAddress(VTP_ADDRESS);

    let vtpLocsState = await vtpClient.locsState();
    const pendingRequest = await vtpLocsState.requestIdentityLoc({
        legalOfficer: alice,
        description: "This is a VTP Identity LOC",
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
    await legalOfficer.createValidIdentityLoc(pendingRequest.locId, VTP_ADDRESS);
    const closedIdentityLoc = await pendingRequest.refresh() as ClosedLoc;

    await legalOfficer.nominateVerifiedThirdParty(VTP_ADDRESS, closedIdentityLoc.locId);

    const userClient = state.client.withCurrentAddress(NEW_ADDRESS);
    let newLoc: LocRequestState = await (await userClient.locsState()).requestTransactionLoc({
        legalOfficer: alice,
        description: "Some LOC with VTP",
        draft: false,
    });
    const locId = newLoc.locId;
    await legalOfficer.openTransactionLoc(locId, NEW_ADDRESS);
    await legalOfficer.selectVtp(locId, VTP_ADDRESS, true);
    newLoc = await newLoc.refresh();
    expect(newLoc.data().issuers.length).toBe(1);
    expect(newLoc.data().issuers[0].identityLocId).toBe(closedIdentityLoc.locId.toString());
    expect(newLoc.data().issuers[0].selected).toBe(true);

    vtpLocsState = await vtpClient.locsState();
    expect(vtpLocsState.openVerifiedThirdPartyLocs["Transaction"].length).toBe(1);
    let vtpLoc = vtpLocsState.findById(locId);

    let openVtpLoc = await vtpLoc.refresh() as EditableRequest;
    openVtpLoc = await openVtpLoc.addMetadata({
        name: "VTP data name",
        value: "VTP data value"
    });
    openVtpLoc = await openVtpLoc.deleteMetadata({ name: "VTP data name" });

    const file = HashOrContent.fromContent(Buffer.from("test"));
    openVtpLoc = await openVtpLoc.addFile({
        fileName: "test.txt",
        nature: "Some file nature",
        file,
    });
    openVtpLoc = await openVtpLoc.deleteFile({ hash: file.contentHash });

    await legalOfficer.selectVtp(newLoc.locId, VTP_ADDRESS, false);
    const userLoc = (await userClient.locsState()).findById(locId);
    expect(userLoc.data().issuers.length).toBe(1);
    expect(userLoc.data().issuers[0].identityLocId).toBe(closedIdentityLoc.locId.toString());
    expect(userLoc.data().issuers[0].selected).toBe(false);
}
