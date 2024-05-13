import { Hash } from "@logion/node-api";
import {
    ClosedLoc,
    HashOrContent,
    AcceptedRequest,
    PendingRequest, OpenLoc, MimeType, waitFor
} from "@logion/client";
import { State, initAccountBalance } from "./Utils.js";
import { NodeFile } from "../src/index.js";

export async function verifiedIssuer(state: State) {
    const { alice, issuerAccount, newAccount, signer } = state;

    const issuerClient = state.client.withCurrentAccount(issuerAccount);

    await initAccountBalance(state, issuerAccount);
    let issuerLocsState = await issuerClient.locsState();
    const pendingRequest = await issuerLocsState.requestIdentityLoc({
        legalOfficerAccountId: alice.account,
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

    const aliceClient = state.client.withCurrentAccount(alice.account);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.account.address, locTypes: ["Identity"], statuses: ["REVIEW_PENDING"] } });
    const alicePending = aliceLocs.findById(issuerIdentityLocId) as PendingRequest;
    const aliceAccepted = await alicePending.legalOfficer.accept();

    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    await acceptedIdentityLoc.open({ signer, payload: { autoPublish: false }});

    let aliceOpen = await aliceAccepted.refresh() as OpenLoc;
    aliceOpen = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpen.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    let aliceClosed = await aliceOpen.legalOfficer.close({ signer, payload: { autoAck: false }}) as ClosedLoc;
    aliceClosed = await aliceClosed.legalOfficer.nominateIssuer({ signer });

    await initAccountBalance(state, newAccount);
    const requesterClient = state.client.withCurrentAccount(newAccount);
    let userLocsState = await requesterClient.locsState();
    let pendingLocRequest = await userLocsState.requestTransactionLoc({
        legalOfficerAccountId: alice.account,
        description: "Some LOC with verified issuer",
        draft: false,
    }) as PendingRequest;
    const transactionLocId = pendingLocRequest.data().id;

    aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.account.address, locTypes: ["Transaction"], statuses: ["REVIEW_PENDING"] } });
    const alicePendingTransaction = aliceLocs.findById(transactionLocId) as PendingRequest;
    const aliceAcceptedTransaction = await alicePendingTransaction.legalOfficer.accept() as AcceptedRequest;

    let acceptedLoc = await pendingLocRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.open({ signer, payload: { autoPublish: false }});

    let aliceOpenTransaction = await aliceAcceptedTransaction.refresh() as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.legalOfficer.selectIssuer({
        payload: { issuer: issuerAccount },
        signer,
    });
    openLoc = await openLoc.refresh() as OpenLoc;
    expect(openLoc.data().issuers.length).toBe(1);
    expect(openLoc.data().issuers[0].identityLocId).toBe(issuerIdentityLocId.toString());
    expect(openLoc.data().issuers[0].selected).toBe(true);

    issuerLocsState = await issuerClient.locsState();
    expect(issuerLocsState.openVerifiedIssuerLocs["Transaction"].length).toBe(1);
    let issuerLoc = issuerLocsState.findById(transactionLocId);

    let openIssuerLoc = await issuerLoc.refresh() as OpenLoc;
    const dataName = "Verified issuer data name";
    const dataNameHash = Hash.of(dataName);
    openIssuerLoc = await openIssuerLoc.addMetadata({
        name: dataName,
        value: "Verified issuer data value"
    }) as OpenLoc;
    openIssuerLoc = await openIssuerLoc.deleteMetadata({ nameHash: dataNameHash }) as OpenLoc;

    const file = HashOrContent.fromContent(new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain")));
    openIssuerLoc = await openIssuerLoc.addFile({
        nature: "Some file nature",
        file,
    }) as OpenLoc;
    openIssuerLoc = await openIssuerLoc.deleteFile({ hash: file.contentHash }) as OpenLoc;

    // Full add-review-publish-ack cycle (metadata)
    openIssuerLoc = await openIssuerLoc.addMetadata({
        name: dataName,
        value: "Verified issuer data value"
    }) as OpenLoc;
    openIssuerLoc = await openIssuerLoc.requestMetadataReview({ nameHash: dataNameHash }) as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.refresh() as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.legalOfficer.reviewMetadata({
        nameHash: dataNameHash,
        decision: "ACCEPT",
    }) as OpenLoc;
    openLoc = await openLoc.refresh() as OpenLoc;
    openLoc = await openLoc.publishMetadata({ payload: { nameHash: dataNameHash }, signer });
    expect(openLoc.data().metadata[0].status).toBe("PUBLISHED");
    openIssuerLoc = await openIssuerLoc.refresh() as OpenLoc;
    openIssuerLoc = await openIssuerLoc.acknowledgeMetadata({ payload: { nameHash: dataNameHash }, signer });
    aliceOpenTransaction = await aliceOpenTransaction.refresh() as OpenLoc;
    expect(aliceOpenTransaction.data().metadata[0].status).toBe("PUBLISHED");
    aliceOpenTransaction = await aliceOpenTransaction.acknowledgeMetadata({ payload: { nameHash: dataNameHash }, signer });
    expect(aliceOpenTransaction.data().metadata[0].status).toBe("ACKNOWLEDGED");

    // Issuer unselection
    aliceOpenTransaction = await aliceOpenTransaction.refresh() as OpenLoc;
    aliceOpenTransaction = await aliceOpenTransaction.legalOfficer.unselectIssuer({
        payload: { issuer: issuerAccount },
        signer
    });

    userLocsState = await requesterClient.locsState();
    const userLoc = userLocsState.findById(transactionLocId);
    expect(userLoc.data().issuers.length).toBe(1);
    expect(userLoc.data().issuers[0].selected).toBe(false);
}
