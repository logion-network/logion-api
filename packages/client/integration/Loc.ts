import { UUID } from "@logion/node-api";
import {
    HashOrContent,
    hashString,
    ItemFileWithContent,
    MimeType,
    LocRequestStatus,
    OpenLoc,
    PendingRequest,
    LocData,
    ClosedCollectionLoc,
    ItemTokenWithRestrictedType,
    LogionClassification,
    CreativeCommons,
    DraftRequest,
    RejectedRequest
} from "../src/index.js";

import { State, TEST_LOGION_CLIENT_CONFIG, initRequesterBalance, LegalOfficerWorker } from "./Utils.js";

export async function requestTransactionLoc(state: State) {
    const { alice, newAccount } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    let draftRequest = await locsState.requestTransactionLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is a Transaction LOC",
        draft: true,
    }) as DraftRequest;

    expect(draftRequest).toBeInstanceOf(DraftRequest);

    locsState = draftRequest.locsState();
    checkData(locsState.draftRequests["Transaction"][0].data(), "DRAFT");
    checkData(draftRequest.data(), "DRAFT");

    draftRequest = await draftRequest.addMetadata({
        name: "Some name",
        value: "Some value"
    }) as DraftRequest;
    expect(draftRequest.data().metadata[0].name).toBe("Some name");
    expect(draftRequest.data().metadata[0].value).toBe("Some value");
    expect(draftRequest.data().metadata[0].addedOn).toBeUndefined();

    let pendingRequest = await draftRequest.submit();
    expect(pendingRequest).toBeInstanceOf(PendingRequest);
    locsState = pendingRequest.locsState();
    expect(locsState.draftRequests['Transaction'].length).toBe(0);
    checkData(locsState.pendingRequests["Transaction"][0].data(), "REQUESTED");
    checkData(pendingRequest.data(), "REQUESTED");

    await legalOfficer.rejectPendingLoc(pendingRequest.locId);
    let rejectedRequest = await pendingRequest.refresh() as RejectedRequest;
    expect(rejectedRequest).toBeInstanceOf(RejectedRequest);
    draftRequest = await rejectedRequest.rework();
    expect(draftRequest).toBeInstanceOf(DraftRequest);
    pendingRequest = await draftRequest.submit();

    await legalOfficer.openTransactionLoc(pendingRequest.locId, newAccount.address);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    expect(openLoc).toBeInstanceOf(OpenLoc)

    locsState = openLoc.locsState();
    checkData(locsState.openLocs["Transaction"][0].data(), "OPEN");
    checkData(openLoc.data(), "OPEN");

    openLoc = await openLoc.addFile({
        fileName: "test.txt",
        nature: "Some file nature",
        file: HashOrContent.fromContent(Buffer.from("test")),
    }) as OpenLoc;
    const hash = openLoc.data().files[0].hash;
    expect(hash).toBe("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
    expect(openLoc.data().files[0].name).toBe("test.txt");
    expect(openLoc.data().files[0].hash).toBe(hash);
    expect(openLoc.data().files[0].nature).toBe("Some file nature");
    expect(openLoc.data().files[0].addedOn).toBeUndefined();

    const checkResult = await openLoc.checkHash(hash);
    expect(checkResult.file).toBeDefined();
    expect(checkResult.metadataItem).not.toBeDefined();
    expect(checkResult.collectionItem).not.toBeDefined();
}

function checkData(data: LocData, locRequestStatus: LocRequestStatus) {
    expect(data.userIdentity?.phoneNumber).toEqual("+1234");
    expect(data.description).toEqual("This is a Transaction LOC");
    expect(data.status).toEqual(locRequestStatus);
}

export async function collectionLoc(state: State) {

    const { alice, newAccount } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, newAccount.address);

    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is a Collection LOC",
        draft: false,
    });

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Collection"][0].data().status).toBe("REQUESTED");

    const locId = pendingRequest.locId;
    await legalOfficer.openCollectionLoc(locId, newAccount.address, false);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    await legalOfficer.closeLoc(locId);

    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;
    expect(closedLoc).toBeInstanceOf(ClosedCollectionLoc);

    const itemId = hashString("first-collection-item");
    const itemDescription = "First collection item";
    closedLoc = await closedLoc.addCollectionItem({
        itemId,
        itemDescription,
        signer: state.signer
    });

    const item = await closedLoc.getCollectionItem({ itemId });
    expect(item!.id).toBe(itemId);
    expect(item!.description).toBe(itemDescription);
    expect(item!.termsAndConditions.length).toEqual(0);

    const publicApi = state.client.public;
    const publicLoc = await publicApi.findLocById({ locId });
    expect(publicLoc).toBeDefined();

    const checkResult = await publicLoc?.checkHash(itemId);
    expect(checkResult?.collectionItem).toBeDefined();
    expect(checkResult?.file).not.toBeDefined();
    expect(checkResult?.metadataItem).not.toBeDefined();
}

export async function collectionLocWithUpload(state: State) {

    const { alice, newAccount } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, newAccount.address);

    const logionClassificationLocRequest = await locsState.requestTransactionLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is the Logion Classification LOC",
        draft: false,
    });
    locsState = logionClassificationLocRequest.locsState();
    await legalOfficer.createValidTermsAndConditionsLoc(logionClassificationLocRequest.locId, newAccount.address);
    const creativeCommonsLocRequest = await locsState.requestTransactionLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is the LOC acting usage of CreativeCommons on logion",
        draft: false,
    });
    locsState = creativeCommonsLocRequest.locsState();
    await legalOfficer.createValidTermsAndConditionsLoc(creativeCommonsLocRequest.locId, newAccount.address);

    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is a Collection LOC with upload",
        draft: false,
    });

    await legalOfficer.openCollectionLoc(pendingRequest.locId, newAccount.address, true);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    await legalOfficer.closeLoc(openLoc.locId);
    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;

    const firstItemId = hashString("first-collection-item");
    const firstItemDescription = "First collection item";
    const firstFileContent = "test";
    const firstFileHash = hashString(firstFileContent);
    const firstItemToken: ItemTokenWithRestrictedType = {
        type: "owner",
        id: newAccount.address,
    };
    closedLoc = await closedLoc.addCollectionItem({
        itemId: firstItemId,
        itemDescription: firstItemDescription,
        signer: state.signer,
        itemFiles: [
            new ItemFileWithContent({
                name: "test.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent("integration/test.txt"), // Let SDK compute hash and size
            })
        ],
        itemToken: firstItemToken,
        restrictedDelivery: true,
        logionClassification: new LogionClassification(logionClassificationLocRequest.locId, {
            regionalLimit: [ "BE", "FR", "LU" ],
            transferredRights: [ "PER-PRIV", "REG", "TIME" ],
            expiration: "2025-01-01",
        }),
    });

    const firstItem = await closedLoc.getCollectionItem({ itemId: firstItemId });
    expect(firstItem!.id).toBe(firstItemId);
    expect(firstItem!.description).toBe(firstItemDescription);
    expect(firstItem!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            name: "test.txt",
            contentType: "text/plain",
            hash: firstFileHash,
            size: 4n,
            uploaded: true,
        })
    ]));
    expect(firstItem!.token).toEqual(firstItemToken);
    expect(firstItem!.restrictedDelivery).toBe(true);
    expect(await firstItem!.isAuthenticatedTokenOwner()).toBe(true);

    const logionClassification = firstItem!.logionClassification!;
    expect(logionClassification.transferredRights()[0].shortDescription).toEqual("PERSONAL, PRIVATE USE ONLY")
    expect(logionClassification.expiration).toEqual("2025-01-01")
    expect(logionClassification.regionalLimit![0]).toEqual("BE")

    const secondItemId = hashString("second-collection-item");
    const secondItemDescription = "Second collection item";
    const secondFileContent = "test2";
    const secondFileHash = hashString(secondFileContent);
    closedLoc = await closedLoc.addCollectionItem({
        itemId: secondItemId,
        itemDescription: secondItemDescription,
        signer: state.signer,
        itemFiles: [
            new ItemFileWithContent({
                name: "test2.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromHash(secondFileHash), // No content, must upload later
                size: 5n, // No content, must provide size
            })
        ],
        creativeCommons: new CreativeCommons(creativeCommonsLocRequest.locId, "BY-NC-SA")
    });

    const secondItemNoUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemNoUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: false,
        })
    ]));

    closedLoc = await closedLoc.uploadCollectionItemFile({
        itemId: secondItemId,
        itemFile: new ItemFileWithContent({
            name: "test2.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: new HashOrContent({ hash: secondFileHash, content: Buffer.from(secondFileContent) }), // Provide both hash and content to double-check
            size: 5n, // Provide size to double-check with content
        })
    });

    const secondItemWithUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemWithUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: true,
        })
    ]));

    const items = await closedLoc.getCollectionItems();
    expect(items.length).toBe(2);
}

export async function identityLoc(state: State) {

    const { alice, newAccount } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is an Identity LOC",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
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

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Identity"][0].data().status).toBe("REQUESTED");

    await legalOfficer.createValidIdentityLoc(pendingRequest.locId, newAccount.address);
}

export async function otherIdentityLoc(state: State) {
    const { alice, aliceAccount, ethereumAccount } = state;
    const legalOfficer = new LegalOfficerWorker(alice, state);

    const sponsorshipId = new UUID();
    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    await aliceClient.sponsorship.sponsor({
        sponsorshipId,
        sponsoredAccount: ethereumAccount.toOtherAccountId(),
        legalOfficer: alice,
        signer: state.signer,
    });

    const client = state.client.withCurrentAddress(ethereumAccount);
    let locsState = await client.locsState();

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficer: client.getLegalOfficer(alice.address),
        description: "This is an Identity LOC",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
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
        sponsorshipId,
    });

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Identity"][0].data().status).toBe("REQUESTED");

    await legalOfficer.createOtherIdentityLoc(pendingRequest.locId, ethereumAccount.toOtherAccountId(), sponsorshipId);
}
