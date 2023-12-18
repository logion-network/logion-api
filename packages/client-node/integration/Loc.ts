import { UUID, Hash } from "@logion/node-api";
import {
    HashOrContent,
    MimeType,
    LocRequestStatus,
    OpenLoc,
    PendingRequest,
    LocData,
    ClosedCollectionLoc,
    ItemTokenWithRestrictedType,
    DraftRequest,
    RejectedRequest,
    ClosedLoc,
    waitFor,
    OnchainLocState,
    AcceptedRequest,
    HashString,
    BalanceState,
} from "@logion/client";

import {
    State,
    TEST_LOGION_CLIENT_CONFIG,
    findWithLegalOfficerClient,
    initRequesterBalance,
    updateConfig
} from "./Utils.js";
import { NodeFile } from "../src/index.js";

export async function requestTransactionLoc(state: State, linkTarget: UUID): Promise<UUID> {
    const { alice, aliceAccount, newAccount, signer } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    // Create DRAFT LOC
    let draftRequest = await locsState.requestTransactionLoc({
        legalOfficerAddress: alice.address,
        description: "This is a Transaction LOC",
        draft: true,
    }) as DraftRequest;

    expect(draftRequest).toBeInstanceOf(DraftRequest);

    locsState = draftRequest.locsState();
    checkData(locsState.draftRequests["Transaction"][0].data(), "DRAFT");
    checkData(draftRequest.data(), "DRAFT");
    expect(draftRequest.data().fees.legalFee).toBeUndefined();

    // Add Metadata
    const metadataName = "Some name";
    const nameHash = Hash.of(metadataName);
    draftRequest = await draftRequest.addMetadata({
        name: metadataName,
        value: "Some invalid value"
    }) as DraftRequest;
    expect(draftRequest.data().metadata[0].name.validValue()).toBe(metadataName);
    expect(draftRequest.data().metadata[0].value.validValue()).toBe("Some invalid value");
    expect(draftRequest.data().metadata[0].addedOn).toBeUndefined();
    expect(draftRequest.data().metadata[0].status).toBe("DRAFT");

    // Add Link
    const nature = "Some nature";
    draftRequest = await draftRequest.addLink({
        target: linkTarget,
        nature,
    }) as DraftRequest;
    expect(draftRequest.data().links[0].target.toString()).toEqual(linkTarget.toString());
    expect(draftRequest.data().links[0].nature.validValue()).toBe(nature);
    expect(draftRequest.data().links[0].addedOn).toBeUndefined();
    expect(draftRequest.data().links[0].status).toBe("DRAFT");

    // Submit LOC
    let pendingRequest = await draftRequest.submit();
    expect(pendingRequest).toBeInstanceOf(PendingRequest);
    locsState = pendingRequest.locsState();
    expect(locsState.draftRequests['Transaction'].length).toBe(0);
    checkData(locsState.pendingRequests["Transaction"][0].data(), "REVIEW_PENDING");
    checkData(pendingRequest.data(), "REVIEW_PENDING");
    expect(pendingRequest.data().metadata[0].status).toBe("REVIEW_PENDING");

    // Rework rejected LOC
    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, statuses: [ "REVIEW_PENDING", "OPEN" ], locTypes: [ "Transaction" ] } });
    let alicePendingLoc = aliceLocs.findById(pendingRequest.data().id) as PendingRequest;
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewMetadata({ nameHash, decision: "REJECT", rejectReason: "Invalid value" });
    let aliceRejectedLoc = await alicePendingLoc.legalOfficer.reject("Because.") as RejectedRequest;
    let rejectedRequest = await pendingRequest.refresh() as RejectedRequest;
    expect(rejectedRequest).toBeInstanceOf(RejectedRequest);
    expect(rejectedRequest.data().metadata[0].status).toBe("REVIEW_REJECTED");
    expect(rejectedRequest.data().links[0].status).toBe("REVIEW_PENDING");

    draftRequest = await rejectedRequest.rework();
    expect(draftRequest).toBeInstanceOf(DraftRequest);
    expect(draftRequest.data().metadata[0].status).toBe("REVIEW_REJECTED");
    expect(draftRequest.data().links[0].status).toBe("REVIEW_PENDING");
    draftRequest = await draftRequest.deleteMetadata({ nameHash }) as DraftRequest;
    draftRequest = await draftRequest.addMetadata({
        name: metadataName,
        value: "Some value"
    }) as DraftRequest;
    pendingRequest = await draftRequest.submit();
    expect(pendingRequest.data().metadata[0].status).toBe("REVIEW_PENDING");

    alicePendingLoc = await aliceRejectedLoc.refresh() as PendingRequest;
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewMetadata({ nameHash, decision: "ACCEPT" });
    expect(alicePendingLoc.data().metadata[0].status).toBe("REVIEW_ACCEPTED");
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewLink({ target: linkTarget, decision: "ACCEPT" });
    expect(alicePendingLoc.data().links[0].status).toBe("REVIEW_ACCEPTED");
    let aliceAcceptedLoc = await alicePendingLoc.legalOfficer.accept({ signer }) as AcceptedRequest;
    let acceptedLoc = await pendingRequest.refresh() as AcceptedRequest;
    expect(acceptedLoc).toBeInstanceOf(AcceptedRequest);
    locsState = acceptedLoc.locsState();
    checkData(locsState.acceptedRequests["Transaction"][0].data(), "REVIEW_ACCEPTED");

    let openLoc = await acceptedLoc.open({ signer, autoPublish: false });
    expect(openLoc).toBeInstanceOf(OpenLoc);

    locsState = openLoc.locsState();
    checkData(locsState.openLocs["Transaction"][0].data(), "OPEN");
    checkData(openLoc.data(), "OPEN");

    // Add file to open LOC
    openLoc = await openLoc.addFile({
        nature: "Some file nature",
        file: HashOrContent.fromContent(new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))),
    }) as OpenLoc;
    const hash = openLoc.data().files[0].hash;
    expect(hash.toHex()).toBe("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
    expect(openLoc.data().files[0].name).toBe("test.txt");
    expect(openLoc.data().files[0].hash).toEqual(hash);
    expect(openLoc.data().files[0].nature.validValue()).toBe("Some file nature");
    expect(openLoc.data().files[0].addedOn).toBeUndefined();
    expect(openLoc.data().files[0].status).toBe("DRAFT");

    const checkResult = await openLoc.checkHash(hash);
    expect(checkResult.file).toBeDefined();
    expect(checkResult.metadataItem).not.toBeDefined();
    expect(checkResult.collectionItem).not.toBeDefined();

    openLoc = await openLoc.requestFileReview({ hash }) as OpenLoc;
    expect(openLoc.data().files[0].status).toBe("REVIEW_PENDING");

    let aliceOpenLoc = await aliceAcceptedLoc.refresh() as OpenLoc;
    aliceOpenLoc = await aliceOpenLoc.legalOfficer.reviewFile({ hash, decision: "ACCEPT" }) as OpenLoc;
    expect(aliceOpenLoc.data().files[0].status).toBe("REVIEW_ACCEPTED");
    await waitFor<OnchainLocState>({
        producer: async state => state ? await state.refresh() : aliceOpenLoc,
        predicate: state => state.data().files[0].reviewedOn !== undefined,
    });

    openLoc = await openLoc.refresh() as OpenLoc;
    openLoc = await openLoc.publishFile({ hash, signer });
    expect(openLoc.data().files[0].status).toBe("PUBLISHED");

    aliceOpenLoc = await aliceOpenLoc.refresh() as OpenLoc;
    aliceOpenLoc = await aliceOpenLoc.legalOfficer.acknowledgeFile({
        hash,
        signer,
    }) as OpenLoc;
    expect(aliceOpenLoc.data().files[0].status).toBe("ACKNOWLEDGED");

    // Continue with metadata
    openLoc = await openLoc.refresh() as OpenLoc;
    openLoc = await openLoc.publishMetadata({ nameHash, signer });
    expect(openLoc.data().metadata[0].status).toBe("PUBLISHED");
    aliceOpenLoc = await aliceOpenLoc.refresh() as OpenLoc;
    aliceOpenLoc = await aliceOpenLoc.legalOfficer.acknowledgeMetadata({
        nameHash,
        signer,
    }) as OpenLoc;
    expect(aliceOpenLoc.data().metadata[0].status).toBe("ACKNOWLEDGED");

    // Continue with Link
    openLoc = await openLoc.refresh() as OpenLoc;
    openLoc = await openLoc.publishLink({ target: linkTarget, signer });
    expect(openLoc.data().links[0].status).toBe("PUBLISHED");
    aliceOpenLoc = await aliceOpenLoc.refresh() as OpenLoc;
    aliceOpenLoc = await aliceOpenLoc.legalOfficer.acknowledgeLink({
        target: linkTarget,
        signer,
    }) as OpenLoc;
    expect(aliceOpenLoc.data().links[0].status).toBe("ACKNOWLEDGED");

    // Close LOC
    aliceOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    const closedLoc = await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });
    expect(closedLoc).toBeInstanceOf(ClosedLoc);

    return closedLoc.locId;
}

export async function openTransactionLocWithAutoPublish(state: State, linkTarget: UUID) {
    const { alice, aliceAccount, newAccount, signer } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    // Create DRAFT LOC
    let draftRequest = await locsState.requestTransactionLoc({
        legalOfficerAddress: alice.address,
        description: "This is a Transaction LOC",
        draft: true,
    }) as DraftRequest;

    expect(draftRequest).toBeInstanceOf(DraftRequest);

    locsState = draftRequest.locsState();
    checkData(locsState.draftRequests["Transaction"][0].data(), "DRAFT");
    checkData(draftRequest.data(), "DRAFT");
    expect(draftRequest.data().fees.legalFee).toBeUndefined();

    // Add Metadata
    const metadataName = "Some name";
    const nameHash = Hash.of(metadataName);
    draftRequest = await draftRequest.addMetadata({
        name: metadataName,
        value: "Some invalid value"
    }) as DraftRequest;
    expect(draftRequest.data().metadata[0].name.validValue()).toBe(metadataName);
    expect(draftRequest.data().metadata[0].value.validValue()).toBe("Some invalid value");
    expect(draftRequest.data().metadata[0].addedOn).toBeUndefined();
    expect(draftRequest.data().metadata[0].status).toBe("DRAFT");

    // Add Links
    const nature = "Some nature";
    draftRequest = await draftRequest.addLink({
        target: linkTarget,
        nature,
    }) as DraftRequest;
    expect(draftRequest.data().links[0].addedOn).toBeUndefined();
    expect(draftRequest.data().links[0].status).toBe("DRAFT");

    // Add files
    draftRequest = await draftRequest.addFile({
        nature: "Some file nature",
        file: HashOrContent.fromContent(new NodeFile("integration/test0.txt", "test.txt", MimeType.from("text/plain"))),
    }) as DraftRequest;
    const hash0 = draftRequest.data().files[0].hash;
    draftRequest = await draftRequest.addFile({
        nature: "Some file nature",
        file: HashOrContent.fromContent(new NodeFile("integration/test123.txt", "test.txt", MimeType.from("text/plain"))),
    }) as DraftRequest;
    const hash1 = draftRequest.data().files[1].hash;

    // Submit LOC
    let pendingRequest = await draftRequest.submit();
    expect(pendingRequest).toBeInstanceOf(PendingRequest);

    // Alice accepts all items
    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, statuses: [ "REVIEW_PENDING", "OPEN" ], locTypes: [ "Transaction" ] } });
    let alicePendingLoc = aliceLocs.findById(pendingRequest.data().id) as PendingRequest;
    // metadata
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewMetadata({ nameHash, decision: "ACCEPT" });
    expect(alicePendingLoc.data().metadata[0].status).toBe("REVIEW_ACCEPTED");
    // links
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewLink({ target: linkTarget, decision: "ACCEPT" });
    expect(alicePendingLoc.data().links[0].status).toBe("REVIEW_ACCEPTED");
    // files
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewFile({ hash: hash0, decision: "ACCEPT" });
    expect(alicePendingLoc.data().files[0].status).toBe("REVIEW_ACCEPTED");
    alicePendingLoc = await alicePendingLoc.legalOfficer.reviewFile({ hash: hash1, decision: "ACCEPT" });
    expect(alicePendingLoc.data().files[1].status).toBe("REVIEW_ACCEPTED");

    await alicePendingLoc.legalOfficer.accept({ signer });

    let acceptedLoc = await pendingRequest.refresh() as AcceptedRequest;

    const fees = await acceptedLoc.estimateFeesOpen({ autoPublish: true });
    expect(fees.storageFee).toEqual(1200000000000n);

    let openLoc = await acceptedLoc.open({ signer, autoPublish: true });
    expect(openLoc).toBeInstanceOf(OpenLoc);

    expect(openLoc.data().metadata[0].status).toBe("PUBLISHED");
    expect(openLoc.data().links[0].status).toBe("PUBLISHED");
    expect(openLoc.data().files[0].status).toBe("PUBLISHED");
    expect(openLoc.data().files[1].status).toBe("PUBLISHED");

    locsState = openLoc.locsState();
    checkData(locsState.openLocs["Transaction"][0].data(), "OPEN");
    checkData(openLoc.data(), "OPEN");
}

function checkData(data: LocData, locRequestStatus: LocRequestStatus) {
    expect(data.userIdentity?.phoneNumber).toEqual("+1234");
    expect(data.description).toEqual("This is a Transaction LOC");
    expect(data.status).toEqual(locRequestStatus);
}

export async function transactionLocWithCustomLegalFee(state: State) {
    const { alice, aliceAccount, newAccount, signer } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    let draftRequest = await locsState.requestTransactionLoc({
        legalOfficerAddress: alice.address,
        description: "This is a Transaction LOC",
        draft: true,
        legalFee: 0n,
    }) as DraftRequest;

    expect(draftRequest).toBeInstanceOf(DraftRequest);
    expect(draftRequest.data().fees.legalFee).toBe(0n);

    // Open LOC
    let pendingRequest = await draftRequest.submit();
    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, statuses: [ "REVIEW_PENDING", "OPEN" ], locTypes: [ "Transaction" ] } });
    let alicePendingLoc = aliceLocs.findById(pendingRequest.data().id) as PendingRequest;
    await alicePendingLoc.legalOfficer.accept({ signer }) as AcceptedRequest;
    let acceptedLoc = await pendingRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.open({ signer, autoPublish: false });

    expect(openLoc.data().fees.legalFee).toBe(0n);
}

export async function collectionLoc(state: State) {

    const { alice, aliceAccount, newAccount, signer } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, newAccount.address);

    const collectionItemFee = 50n;
    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficerAddress: alice.address,
        description: "This is a Collection LOC",
        draft: false,
        valueFee: 100n,
        collectionItemFee,
        tokensRecordFee: 50n,
        legalFee: 0n,
    });
    expect(pendingRequest.data().fees.valueFee).toBe(100n);
    expect(pendingRequest.data().fees.collectionItemFee).toBe(50n);
    expect(pendingRequest.data().fees.tokensRecordFee).toBe(50n);
    expect(pendingRequest.data().fees.legalFee).toBe(0n);

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Collection"][0].data().status).toBe("REVIEW_PENDING");

    const locId = pendingRequest.locId;
    const aliceClient = client.withCurrentAddress(aliceAccount);
    let aliceLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, locTypes: ["Collection"], statuses: ["REVIEW_PENDING"] } });
    let alicePendingRequest = aliceLocs.findById(locId) as PendingRequest;
    let aliceAcceptedLoc = await alicePendingRequest.legalOfficer.accept();

    let acceptedLoc = await pendingRequest.refresh() as AcceptedRequest;
    locsState = acceptedLoc.locsState();
    expect(locsState.acceptedRequests["Collection"][0].data().status).toBe("REVIEW_ACCEPTED");

    let openLoc = await acceptedLoc.openCollection({
        collectionMaxSize: 100,
        collectionCanUpload: true,
        autoPublish: false,
        signer,
    });
    expect(openLoc.data().fees.valueFee).toBe(100n);
    expect(openLoc.data().fees.collectionItemFee).toBe(50n);
    expect(openLoc.data().fees.tokensRecordFee).toBe(50n);
    expect(openLoc.data().fees.legalFee).toBe(0n);
    let aliceOpenLoc = await aliceAcceptedLoc.refresh() as OpenLoc;

    aliceOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    let aliceClosedLoc = await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });
    expect(aliceClosedLoc).toBeInstanceOf(ClosedCollectionLoc);

    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;
    expect(closedLoc).toBeInstanceOf(ClosedCollectionLoc);

    const itemId = Hash.of("first-collection-item");
    const itemDescription = "First collection item";
    const estimatedFees = await closedLoc.estimateFeesAddCollectionItem({
        itemId,
        itemDescription,
    });
    expect(estimatedFees.collectionItemFee).toBe(collectionItemFee);
    closedLoc = await closedLoc.addCollectionItem({
        payload: {
            itemId,
            itemDescription,
        },
        signer: state.signer
    });
    await expectAsync(waitFor<BalanceState>({
        producer: balanceState => balanceState ? balanceState.refresh() : client.balanceState(),
        predicate: balanceState => balanceState.transactions.length > 0 && balanceState.transactions[0].fees.collectionItem === collectionItemFee.toString(),
    })).toBeResolved();
    await expectAsync(waitFor<BalanceState>({
        producer: balanceState => balanceState ? balanceState.refresh() : aliceClient.balanceState(),
        predicate: balanceState => balanceState.transactions.length > 0 && balanceState.transactions[0].type === "COLLECTION_ITEM_FEE",
    })).toBeResolved();

    const item = await closedLoc.getCollectionItem({ itemId });
    expect(item!.id).toBe(itemId);
    expect(item!.description.validValue()).toBe(itemDescription);
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

    const { alice, aliceAccount, newAccount, signer } = state;
    let client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, newAccount.address);

    const logionClassificationLocRequest = await locsState.requestTransactionLoc({
        legalOfficerAddress: alice.address,
        description: "This is the Logion Classification LOC",
        draft: false,
    }) as PendingRequest;

    let aliceClient = client.withCurrentAddress(aliceAccount);
    let aliceLogionClassificationLocRequest = await findWithLegalOfficerClient(aliceClient, logionClassificationLocRequest) as PendingRequest;
    const aliceLogionClassificationAcceptedRequest = await aliceLogionClassificationLocRequest.legalOfficer.accept({ signer }) as AcceptedRequest;
    const logionClassificationAcceptedRequest = await logionClassificationLocRequest.refresh() as AcceptedRequest;
    const logionClassificationOpenLoc = await logionClassificationAcceptedRequest.open({ signer, autoPublish: false });
    let aliceLogionClassificationOpenLoc = await aliceLogionClassificationAcceptedRequest.refresh() as OpenLoc;
    aliceLogionClassificationOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceLogionClassificationOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceLogionClassificationOpenLoc.legalOfficer.close({ signer, autoAck: false });

    locsState = logionClassificationOpenLoc.locsState();
    const creativeCommonsLocRequest = await locsState.requestTransactionLoc({
        legalOfficerAddress: alice.address,
        description: "This is the LOC acting usage of CreativeCommons on logion",
        draft: false,
    }) as PendingRequest;
    const aliceCreativeCommonsLocRequest = await findWithLegalOfficerClient(aliceClient, creativeCommonsLocRequest) as PendingRequest;
    const aliceCreativeCommonsAcceptedRequest = await aliceCreativeCommonsLocRequest.legalOfficer.accept({ signer }) as AcceptedRequest;
    const creativeCommonsAcceptedRequest = await creativeCommonsLocRequest.refresh() as AcceptedRequest;
    const creativeCommonsOpenLoc = await creativeCommonsAcceptedRequest.open({ signer, autoPublish: false });
    let aliceCreativeCommonsOpenLoc = await aliceCreativeCommonsAcceptedRequest.refresh() as OpenLoc;
    aliceCreativeCommonsOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceCreativeCommonsOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceCreativeCommonsOpenLoc.legalOfficer.close({ signer, autoAck: false });

    state = await updateConfig({
        logionClassificationLoc: logionClassificationOpenLoc.locId,
        creativeCommonsLoc: creativeCommonsOpenLoc.locId,
    })
    client = state.client.withCurrentAddress(newAccount);
    aliceClient = state.client.withCurrentAddress(aliceAccount);

    locsState = await client.locsState();
    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficerAddress: alice.address,
        description: "This is a Collection LOC with upload",
        draft: false,
        valueFee: 100n,
        collectionItemFee: 50n,
        tokensRecordFee: 50n,
    });

    let alicePendingRequest = await findWithLegalOfficerClient(aliceClient, pendingRequest) as PendingRequest;
    let aliceAcceptedLoc = await alicePendingRequest.legalOfficer.accept();

    let acceptedLoc = await pendingRequest.refresh() as AcceptedRequest;
    let openLoc = await acceptedLoc.openCollection({
        collectionMaxSize: 100,
        collectionCanUpload: true,
        autoPublish: false,
        signer,
    });
    let aliceOpenLoc = await aliceAcceptedLoc.refresh() as OpenLoc;
    aliceOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });
    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;

    const firstItemId = Hash.of("first-collection-item");
    const firstItemDescription = "First collection item";
    const firstFileContent = "test";
    const firstFileHash = Hash.of(firstFileContent);
    const firstItemToken: ItemTokenWithRestrictedType = {
        type: "owner",
        id: newAccount.address,
        issuance: 1n,
    };
    closedLoc = await closedLoc.addCollectionItem({
        payload: {
            itemId: firstItemId,
            itemDescription: firstItemDescription,
            itemFiles: [
                HashOrContent.fromContent(new NodeFile("integration/test.txt", "test.txt", MimeType.from("text/plain"))), // Let SDK compute hash and size
            ],
            itemToken: firstItemToken,
            restrictedDelivery: true,
            logionClassification: {
                regionalLimit: [ "BE", "FR", "LU" ],
                transferredRights: [ "PER-PRIV", "REG", "TIME" ],
                expiration: "2025-01-01",
            },
        },
        signer: state.signer,
    });

    const firstItem = await closedLoc.getCollectionItem({ itemId: firstItemId });
    expect(firstItem!.id).toBe(firstItemId);
    expect(firstItem!.description.validValue()).toBe(firstItemDescription);
    expect(firstItem!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            name: HashString.fromValue("test.txt"),
            contentType: HashString.fromValue("text/plain"),
            hash: firstFileHash,
            size: 4n,
            uploaded: true,
        })
    ]));
    expect(firstItem!.token?.toItemTokenWithRestrictedType()).toEqual(firstItemToken);
    expect(firstItem!.restrictedDelivery).toBe(true);
    expect(await firstItem!.isAuthenticatedTokenOwner()).toBe(true);

    const logionClassification = firstItem!.logionClassification!;
    expect(logionClassification.transferredRights()[0].shortDescription).toEqual("PERSONAL, PRIVATE USE ONLY")
    expect(logionClassification.expiration).toEqual("2025-01-01")
    expect(logionClassification.regionalLimit![0]).toEqual("BE")

    const secondItemId = Hash.of("second-collection-item");
    const secondItemDescription = "Second collection item";
    const secondFile = new NodeFile("integration/test2.txt", "test2.txt", MimeType.from("text/plain"));
    const secondFileHash = Hash.of("test2");
    const thirdItemId = Hash.of("third-collection-item");
    const thirdItemDescription = "Third collection item";
    const thirdFile = new NodeFile("integration/test3.txt", "test3.txt", MimeType.from("text/plain"));
    const thirdFileHash = Hash.of("test3");
    closedLoc = await closedLoc.addCollectionItems({
        payload: [
            {
                itemId: secondItemId,
                itemDescription: secondItemDescription,
                itemFiles: [
                    HashOrContent.fromDescription({
                        name: "test2.txt",
                        mimeType: MimeType.from("text/plain"),
                        hash: secondFileHash, // No content, must upload later
                        size: 5n, // No content, must provide size
                    }),
                ],
                creativeCommons: "BY-NC-SA",
            },
            {
                itemId: thirdItemId,
                itemDescription: thirdItemDescription,
                itemFiles: [
                    HashOrContent.fromDescription({
                        name: "test3.txt",
                        mimeType: MimeType.from("text/plain"),
                        hash: thirdFileHash, // No content, must upload later
                        size: 5n, // No content, must provide size
                    }),
                ],
                creativeCommons: "BY-NC-SA",
            }
        ],
        signer: state.signer,
    });

    const secondItemNoUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemNoUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: false,
        })
    ]));
    const thirdItemNoUpload = await closedLoc.getCollectionItem({ itemId: thirdItemId });
    expect(thirdItemNoUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: false,
        })
    ]));

    closedLoc = await closedLoc.uploadCollectionItemFile({
        itemId: secondItemId,
        itemFile: HashOrContent.fromContent(secondFile),
    });
    closedLoc = await closedLoc.uploadCollectionItemFile({
        itemId: thirdItemId,
        itemFile: HashOrContent.fromContent(thirdFile),
    });

    const secondItemWithUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemWithUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: true,
        })
    ]));
    const thirdItemWithUpload = await closedLoc.getCollectionItem({ itemId: thirdItemId });
    expect(thirdItemWithUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: true,
        })
    ]));

    const items = await closedLoc.getCollectionItems();
    expect(items.length).toBe(3);
    expect(items[0].files.length).toBe(1);
    expect(items[0].termsAndConditions.length).toBe(1);
    expect(items[1].files.length).toBe(1);
    expect(items[1].termsAndConditions.length).toBe(1);
    expect(items[2].files.length).toBe(1);
    expect(items[2].termsAndConditions.length).toBe(1);
}

export async function identityLoc(state: State) {

    const { alice, aliceAccount, newAccount, signer } = state;
    const client = state.client.withCurrentAddress(newAccount);
    let locsState = await client.locsState();

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, newAccount.address);

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficerAddress: alice.address,
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
    }) as PendingRequest;

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Identity"][0].data().status).toBe("REVIEW_PENDING");

    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    const alicePendingRequest = await findWithLegalOfficerClient(aliceClient, pendingRequest) as PendingRequest;
    const aliceAcceptedRequest = await alicePendingRequest.legalOfficer.accept({ signer }) as AcceptedRequest;
    expect(aliceAcceptedRequest.data().status).toBe("REVIEW_ACCEPTED");

    const acceptedRequest = await pendingRequest.refresh() as AcceptedRequest;
    const openLoc = await acceptedRequest.open({ signer, autoPublish: false });
    expect(openLoc.data().status).toBe("OPEN");

    let aliceOpenLoc = await aliceAcceptedRequest.refresh() as OpenLoc;
    aliceOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceOpenLoc.legalOfficer.close({ signer, autoAck: false });
}

export async function otherIdentityLoc(state: State): Promise<UUID> {
    const { alice, aliceAccount, ethereumAccount, signer } = state;

    const sponsorshipId = new UUID();
    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    await aliceClient.sponsorship.sponsor({
        sponsorshipId,
        sponsoredAccount: ethereumAccount.toOtherAccountId(),
        legalOfficer: alice,
        signer,
    });

    const client = state.client.withCurrentAddress(ethereumAccount);
    let locsState = await client.locsState();

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficerAddress: alice.address,
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
    }) as PendingRequest;

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Identity"][0].data().status).toBe("REVIEW_PENDING");

    const alicePendingRequest = await findWithLegalOfficerClient(aliceClient, pendingRequest) as PendingRequest;
    let aliceOpenRequest = await alicePendingRequest.legalOfficer.accept({ signer }) as OpenLoc;
    aliceOpenRequest = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenRequest.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    await aliceOpenRequest.legalOfficer.close({ signer, autoAck: false });

    return pendingRequest.locId;
}

export async function logionIdentityLoc(state: State) {
    const { aliceAccount, signer } = state;
    const client = state.client.withCurrentAddress(aliceAccount);
    let locsState = await client.locsState();

    let openLogionIdentityLoc = await locsState.legalOfficer.createLoc({
        description: "This is a Logion Identity LOC",
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
        locType: "Identity",
        signer,
    }) as OpenLoc;
    expect(openLogionIdentityLoc.data().status).toBe("OPEN");

    openLogionIdentityLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : openLogionIdentityLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    const closedLogionIdentityLoc = await openLogionIdentityLoc.legalOfficer.close({ signer, autoAck: false }) as ClosedLoc;
    expect(closedLogionIdentityLoc.data().status).toBe("CLOSED");

    const requesterLocId = closedLogionIdentityLoc.data().id;
    locsState = closedLogionIdentityLoc.locsState();
    const openLogionTransactionLoc = await locsState.legalOfficer.createLoc({
        description: "This is a Logion Transaction LOC",
        locType: "Transaction",
        requesterLocId,
        signer,
    }) as OpenLoc;
    expect(openLogionTransactionLoc.data().requesterLocId?.toString()).toBe(requesterLocId.toString());
}
