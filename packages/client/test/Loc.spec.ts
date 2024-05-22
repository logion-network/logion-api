import { Fees, Hash, LogionNodeApiClass, UUID, VerifiedIssuerType } from "@logion/node-api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { AxiosInstance, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { It, Mock, Times } from "moq.ts";

import {
    AccountTokens,
    HashOrContent,
    LegalOfficer,
    ClosedCollectionLoc,
    ClosedIdentityLoc,
    ClosedLoc,
    LocData,
    LocRequestState,
    LocsState,
    OpenLoc,
    PendingRequest,
    RejectedRequest,
    VoidedCollectionLoc,
    VoidedLoc,
    AddMetadataParams,
    FetchLocRequestSpecification,
    FetchParameters,
    LocRequest,
    Signer,
    SignParameters,
    SpecificLicense,
    LogionClassificationParameters,
    CreativeCommonsCode,
    EditableRequest,
    LogionClient,
    SharedState,
    LegalOfficerClass,
    FileUploader,
    FileUploadParameters,
    LegalOfficerOpenRequestCommands,
    AuthenticatedLocClient,
    MergedMetadataItem,
    MergedFile,
    MergedLink,
    HashString,
    AddSecretParams,
    Secret,
} from "../src/index.js";
import {
    ALICE,
    BOB,
    CHARLIE,
    buildTestAuthenticatedSharedSate,
    LOGION_CLIENT_CONFIG,
    REQUESTER,
    SUCCESSFUL_SUBMISSION,
    buildSimpleNodeApi,
    ItIsUuid,
    mockCodecWithToString,
    MOCK_FILE,
    mockEmptyOption,
} from "./Utils.js";
import { TestConfigFactory } from "./TestConfigFactory.js";
import {
    buildCollectionItem,
    buildLocRequest,
    buildOffchainCollectionItem,
    EXISTING_FILE_HASH,
    EXISTING_ITEM_ID,
    ITEM_DESCRIPTION,
    mockVoidInfo,
    buildLocAndRequest,
    ISSUER,
    mockLocBatchFactory,
    mockGetLegalOfficerCase,
    EXISTING_LINK_TARGET,
    ITEM_DESCRIPTION_2,
    EXISTING_SECRET_NAME,
    EXISTING_SECRET_VALUE,
} from "./LocUtils.js";

describe("LocsState", () => {

    it("getInitialLocsState - not verified issuer", async () => testGetInitialState(false));
    it("getInitialLocsState - verified issuer", async () => testGetInitialState(true));

    it("checks that user has valid identity", async() => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());

        expect(locs.hasValidIdentityLoc(ALICE)).toBeFalse();
        expect(locs.hasValidIdentityLoc(BOB)).toBeTrue();
        expect(locs.hasValidIdentityLoc(CHARLIE)).toBeFalse();

        expect(locs.legalOfficersWithValidIdentityLoc.length).toEqual(1);
        expect(locs.legalOfficersWithValidIdentityLoc[0]).toBeInstanceOf(LegalOfficerClass);
        expect(locs.legalOfficersWithValidIdentityLoc[0].account).toEqual(BOB.account);
    })

    it("checks that user has non-void identity", async() => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());

        expect(locs.hasNonVoidIdentityLoc(ALICE)).toBeFalse();
        expect(locs.hasNonVoidIdentityLoc(BOB)).toBeTrue();
        expect(locs.hasNonVoidIdentityLoc(CHARLIE)).toBeFalse();

        expect(locs.legalOfficersWithNonVoidIdentityLoc.length).toEqual(1);
        expect(locs.legalOfficersWithNonVoidIdentityLoc[0]).toBeInstanceOf(LegalOfficerClass);
        expect(locs.legalOfficersWithNonVoidIdentityLoc[0].account).toEqual(BOB.account);
    })

    it("detects that user is not a verified issuer", async() => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());
        expect(locs.isVerifiedIssuer).toBeFalse();
    })

    it("detects that user is a verified issuer", async() => {
        const sharedState = await buildSharedState(true);
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());
        expect(locs.isVerifiedIssuer).toBeTrue();
    })
});

async function testGetInitialState(isVerifiedIssuer: boolean) {
    const sharedState = await buildSharedState(isVerifiedIssuer);
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());

    if(isVerifiedIssuer) {
        expect(locs.openVerifiedIssuerLocs["Transaction"].length).toBe(1);
        expect(locs.closedVerifiedIssuerLocs["Transaction"].length).toBe(1);
    } else {
        expect(locs.pendingRequests.Transaction.length).toBe(1);
        const requestedLoc = locs.pendingRequests.Transaction[0];
        expect(requestedLoc).toBeInstanceOf(PendingRequest);
        expect(requestedLoc.locId).toEqual(new UUID(BOB_REQUESTED_TRANSACTION_LOC_REQUEST.id));

        expect(locs.openLocs.Transaction.length).toBe(2);
        const openLoc = locs.openLocs.Transaction[0];
        expect(openLoc).toBeInstanceOf(OpenLoc);
        expect(openLoc.locId).toEqual(new UUID(ALICE_OPEN_TRANSACTION_LOC.request.id));

        expect(locs.closedLocs.Transaction.length).toBe(1);
        const closedTransactionLoc = locs.closedLocs.Transaction[0];
        expect(closedTransactionLoc).toBeInstanceOf(ClosedLoc);
        expect(closedTransactionLoc.locId).toEqual(new UUID(ALICE_CLOSED_TRANSACTION_LOC.request.id));

        expect(locs.closedLocs.Collection.length).toBe(1);
        const closedCollectionLoc = locs.closedLocs.Collection[0];
        expect(closedCollectionLoc).toBeInstanceOf(ClosedCollectionLoc);
        expect(closedCollectionLoc.locId).toEqual(new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id));
    }
}

describe("DraftRequest", () => {

    it("adds metadata", async () => testAddMetadata(await getDraftRequest()));
    it("adds file", async () => testAddFile(await getDraftRequest()));
    it("deletes metadata", async () => testDeleteMetadata(await getDraftRequest()));
    it("deletes file", async () => testDeleteFile(await getDraftRequest()));
    it("adds link", async () => testAddLink(await getDraftRequest()));
    it("deletes link", async () => testDeleteLink(await getDraftRequest()));

    it("submits", async () => {
        const draft = await getDraftRequest();
        await draft.submit();
        aliceAxiosMock.verify(instance => instance.post(`/api/loc-request/${ draft.locId }/submit`), Times.Once());
    });

    it("cancels", async () => {
        const draft = await getDraftRequest();
        await draft.cancel();
        aliceAxiosMock.verify(instance => instance.post(`/api/loc-request/${ draft.locId }/cancel`), Times.Once());
    });
});

describe("PendingRequest", () => {

    it("refreshes", async () => {
        const pendingRequest = await getPendingRequest();
        const refreshed = await pendingRequest.refresh();
        expect(refreshed).toBeInstanceOf(PendingRequest);
    });

    it("exposes expected data", async () => {
        const pendingRequest = await getPendingRequest();
        const data = pendingRequest.data();
        expectDataToMatch(data, BOB_REQUESTED_TRANSACTION_LOC_REQUEST);
    });
});

describe("RejectedRequest", () => {

    it("refreshes", async () => {
        const rejectedRequest = await getRejectedRequest();
        const refreshed = await rejectedRequest.refresh();
        expect(refreshed).toBeInstanceOf(RejectedRequest);
    });

    it("exposes expected data", async () => {
        const rejectedRequest = await getRejectedRequest();
        const data = rejectedRequest.data();
        expectDataToMatch(data, ALICE_REJECTED_TRANSACTION_LOC_REQUEST);
    });
});

describe("OpenLoc", () => {

    it("adds metadata", async () => testAddMetadata(await getOpenLoc()));
    it("adds file", async () => testAddFile(await getOpenLoc()));
    it("deletes metadata", async () => testDeleteMetadata(await getOpenLoc()));
    it("deletes file", async () => testDeleteFile(await getOpenLoc()));
    it("adds link", async () => testAddLink(await getOpenLoc()));
    it("deletes link", async () => testDeleteLink(await getOpenLoc()));

    it("requests Statement of Facts (SoF)", async () => {
        const openLoc = await getOpenLoc();

        let sofState = await openLoc.requestSof();

        expect(sofState).toBeInstanceOf(PendingRequest);
        verifySoFRequested(aliceAxiosMock, openLoc.locId);
    });

    it("checks file hash", async () => {
        const openLoc = await getOpenLoc();
        await testCheckFileHash(openLoc);
    });

    it("refreshes", async () => {
        const openLoc = await getOpenLoc();
        const refreshed = await openLoc.refresh();
        expect(refreshed).toBeInstanceOf(OpenLoc);
    });

    it("exposes expected data", async () => {
        const openLoc = await getOpenLoc();
        const data = openLoc.data();
        expectDataToMatch(data, ALICE_OPEN_TRANSACTION_LOC.request);
    });

    xit("publishes link", async () => {
        const openLoc = await getOpenLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.publishLink({
            payload: {
                target: EXISTING_LINK_TARGET,
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addLink(It.IsAny(), It.IsAny()), Times.Exactly(2));
    });

    it("can be closed", async () => testClose(false));
    it("can be closed with auto-ack", async () => testClose(true));

    it("can be voided", async () => {
        const openLoc = await getOpenLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because",
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoid(It.IsAny()), Times.Once());
    });

    it("can be voided and replaced", async () => {
        const openLoc = await getOpenLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because",
                replacer: new UUID(),
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoidAndReplace(It.IsAny(), It.IsAny()), Times.Once());
    });

    it("selects issuer", async () => testSelectIssuer(await getOpenLoc()));
    it("unselects issuer", async () => testUnselectIssuer(await getOpenLoc()));
});

async function testClose(autoAck: boolean) {
    const openLoc = await getOpenLoc();
    const signer = new Mock<Signer>();
    signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

    await openLoc.legalOfficer.close({
        signer: signer.object(),
        payload: {
            autoAck,
        }
    });

    signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
    nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.close(It.IsAny(), null, autoAck), Times.Once());
}

describe("ClosedLoc", () => {

    it("requests Statement of Facts (SoF)", async () => {
        const closedLoc = await getClosedTransactionLoc();

        let sofState = await closedLoc.requestSof();

        expect(sofState).toBeInstanceOf(PendingRequest);
        verifySoFRequested(aliceAxiosMock, closedLoc.locId);
    });

    it("checks file hash", async () => {
        const closedLoc = await getClosedTransactionLoc();
        await testCheckFileHash(closedLoc);
    });

    it("refreshes", async () => {
        const closedLoc = await getClosedTransactionLoc();
        const refreshed = await closedLoc.refresh();
        expect(refreshed).toBeInstanceOf(ClosedLoc);
    });

    it("exposes expected data", async () => {
        const closedLoc = await getClosedTransactionLoc();
        const data = closedLoc.data();
        expectDataToMatch(data, ALICE_CLOSED_TRANSACTION_LOC.request);
    });

    it("can be voided", async () => {
        const openLoc = await getClosedTransactionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because"
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoid(It.IsAny()), Times.Once());
    });

    it("can be voided and replaced", async () => {
        const openLoc = await getClosedTransactionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because",
                replacer: new UUID(),
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoidAndReplace(It.IsAny(), It.IsAny()), Times.Once());
    });
});

describe("ClosedCollectionLoc", () => {

    it("adds collection item", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            payload: {
                itemId: ITEM_ID,
                itemDescription: ITEM_DESCRIPTION,
            },
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("adds collection items", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItems({
            payload: [
                {
                    itemId: ITEM_ID,
                    itemDescription: ITEM_DESCRIPTION,
                },
                {
                    itemId: ITEM_ID_2,
                    itemDescription: ITEM_DESCRIPTION_2,
                } ],
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Exactly(2));
    });

    it("adds collection item with Logion Classification", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            payload: {
                itemId: ITEM_ID,
                itemDescription: ITEM_DESCRIPTION,
                logionClassification: LOGION_CLASSIFICATION,
                specificLicenses: SPECIFIC_LICENSES,
            },
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("adds collection item with Creative Commons", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            payload: {
                itemId: ITEM_ID,
                itemDescription: ITEM_DESCRIPTION,
                specificLicenses: SPECIFIC_LICENSES,
                creativeCommons: CREATIVE_COMMONS,
            },
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("fails to add collection item with both Logion Classification and Creative Commons", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await expectAsync(closedLoc.addCollectionItem({
            payload: {
                itemId: ITEM_ID,
                itemDescription: ITEM_DESCRIPTION,
                logionClassification: LOGION_CLASSIFICATION,
                specificLicenses: SPECIFIC_LICENSES,
                creativeCommons: CREATIVE_COMMONS,
            },
            signer: signer.object(),
            })).toBeRejectedWithError("Logion Classification and Creative Commons are mutually exclusive.")
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Never());
    });

    it("requests Statement of Facts (SoF)", async () => {
        const closedLoc = await getClosedCollectionLoc();

        let sofState = await closedLoc.requestSof({ itemId: ITEM_ID });

        expect(sofState).toBeInstanceOf(PendingRequest);
        verifySoFRequested(aliceAxiosMock, closedLoc.locId, ITEM_ID);
    });

    it("uploads collection item file", async () => {
        const closedLoc = await getClosedCollectionLoc();

        await closedLoc.uploadCollectionItemFile({
            itemId: ITEM_ID,
            itemFile: HashOrContent.fromContent(MOCK_FILE),
        });

        uploaderMock.verify(instance => instance.upload(It.Is<FileUploadParameters>(params =>
            params.endpoint.endsWith(`/api/collection/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/${ ITEM_ID.toHex() }/files`)
            && params.headers["Content-Type"] === "multipart/form-data"
        )),Times.Once());
    });

    it("checks file hash", async () => {
        const closedLoc = await getClosedCollectionLoc();
        await testCheckFileHash(closedLoc);
    });

    it("checks item hash", async () => {
        const closedLoc = await getClosedCollectionLoc();
        const result = await closedLoc.checkHash(EXISTING_ITEM_ID);
        expect(result.collectionItem).toBeDefined();
    });

    it("refreshes", async () => {
        const closedLoc = await getClosedCollectionLoc();
        const refreshed = await closedLoc.refresh();
        expect(refreshed).toBeInstanceOf(ClosedCollectionLoc);
    });

    it("exposes expected data", async () => {
        const closedLoc = await getClosedCollectionLoc();
        const data = closedLoc.data();
        expectDataToMatch(data, ALICE_CLOSED_COLLECTION_LOC.request);
    });

    it("adds tokens record", async () => {
        const closedLoc = await getClosedCollectionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await closedLoc.addTokensRecord({
            payload: {
                recordId: RECORD_ID,
                description: RECORD_DESCRIPTION,
                files: RECORD_FILES,
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addTokensRecord(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("uploads tokens record file", async () => {
        const closedLoc = await getClosedCollectionLoc();

        await closedLoc.uploadTokensRecordFile({
            recordId: RECORD_ID,
            file: HashOrContent.fromContent(MOCK_FILE),
        });

        uploaderMock.verify(instance => instance.upload(It.Is<FileUploadParameters>(params =>
            params.endpoint.endsWith(`/api/records/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/${ RECORD_ID.toHex() }/files`)
            && params.headers["Content-Type"] === "multipart/form-data"
        )),Times.Once());
    });

    it("adds tokens records", async () => {
        const closedLoc = await getClosedCollectionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await closedLoc.addTokensRecords({
            payload: [
                {
                    recordId: RECORD_ID,
                    description: RECORD_DESCRIPTION,
                    files: RECORD_FILES,
                },
                {
                    recordId: OTHER_RECORD_ID,
                    description: OTHER_RECORD_DESCRIPTION,
                    files: OTHER_RECORD_FILES,
                }
            ],
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.addTokensRecord(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Exactly(2));
    });

    it("can be voided", async () => {
        const openLoc = await getClosedCollectionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because",
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoid(It.IsAny()), Times.Once());
    });

    it("can be voided and replaced", async () => {
        const openLoc = await getClosedCollectionLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await openLoc.legalOfficer.voidLoc({
            payload: {
                reason: "Because",
                replacer: new UUID(),
            },
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.makeVoidAndReplace(It.IsAny(), It.IsAny()), Times.Once());
    });

    it("selects issuer", async () => testSelectIssuer(await getClosedCollectionLoc()));
    it("unselects issuer", async () => testUnselectIssuer(await getClosedCollectionLoc()));
});

describe("ClosedIdentityLoc", () => {

    it("can nominate issuer", async () => {
        const closedLoc = await getClosedIdentityLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await closedLoc.legalOfficer.nominateIssuer({
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.nominateIssuer(It.IsAny(), It.IsAny()), Times.Once());
    });

    it("can dismiss issuer", async () => {
        const closedLoc = await getClosedIdentityLoc();
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await closedLoc.legalOfficer.dismissIssuer({
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.dismissIssuer(It.IsAny()), Times.Once());
    });

    it("has secrets", async () => {
        const closedLoc = await getClosedIdentityLoc();

        const secrets = closedLoc.data().secrets;

        expect(secrets.length).toBe(1);
        expect(secrets[0].name).toBe(EXISTING_SECRET_NAME);
        expect(secrets[0].value).toBe(EXISTING_SECRET_VALUE);
    });

    it("can add secret", async () => {
        const closedLoc = await getClosedIdentityLoc();

        const newState = await closedLoc.addSecret({
            name: SECRET_NAME,
            value: SECRET_VALUE,
        });
        expect(newState).toBeInstanceOf(ClosedIdentityLoc);

        bobAxiosMock.verify(instance => instance.post(
            `/api/loc-request/${ closedLoc.locId.toString() }/secrets`,
            It.Is<AddSecretParams & FetchParameters>((params: any) => params.name === SECRET_NAME && params.value === SECRET_VALUE)),
            Times.Once(),
        );
    });

    it("can remove secret", async () => {
        const closedLoc = await getClosedIdentityLoc();

        const newState = await closedLoc.removeSecret(SECRET_NAME);
        expect(newState).toBeInstanceOf(ClosedIdentityLoc);

        bobAxiosMock.verify(instance => instance.delete(
            `/api/loc-request/${ closedLoc.locId.toString() }/secrets/${ encodeURIComponent(SECRET_NAME) }`),
            Times.Once(),
        );
    });
});

const SECRET_NAME = "Secret name";
const SECRET_VALUE = "Secret value";

describe("VoidedLoc", () => {

    it("refreshes", async () => {
        const voidedLoc = await getVoidedTransactionLoc();
        const refreshed = await voidedLoc.refresh();
        expect(refreshed).toBeInstanceOf(VoidedLoc);
    });

    it("provides replacer (none defined)", async () => {
        const voidedLoc = await getVoidedTransactionLoc();
        const refreshed = await voidedLoc.replacerLoc();
        expect(refreshed).not.toBeDefined();
    });

    it("checks file hash", async () => {
        const voidedLoc = await getVoidedTransactionLoc();
        await testCheckFileHash(voidedLoc);
    });

    it("exposes expected data", async () => {
        const voidedLoc = await getVoidedTransactionLoc();
        const data = voidedLoc.data();
        expectDataToMatch(data, BOB_VOID_TRANSACTION_LOC.request);
    });
});

describe("VoidedCollectionLoc", () => {

    it("refreshes", async () => {
        const voidedLoc = await getVoidedCollectionLoc();
        const refreshed = await voidedLoc.refresh();
        expect(refreshed).toBeInstanceOf(VoidedCollectionLoc);
    });

    it("provides replacer (none defined)", async () => {
        const voidedLoc = await getVoidedCollectionLoc();
        const refreshed = await voidedLoc.replacerLoc();
        expect(refreshed).not.toBeDefined();
    });

    it("checks file hash", async () => {
        const voidedLoc = await getVoidedCollectionLoc();
        await testCheckFileHash(voidedLoc);
    });

    it("checks item hash", async () => {
        const voidedLoc = await getVoidedCollectionLoc();
        const result = await voidedLoc.checkHash(EXISTING_ITEM_ID);
        expect(result.collectionItem).toBeDefined();
    });

    it("exposes expected data", async () => {
        const voidedLoc = await getVoidedCollectionLoc();
        const data = voidedLoc.data();
        expectDataToMatch(data, BOB_VOID_COLLECTION_LOC.request);
    });
});

describe("LegalOfficerOpenRequestCommands", () => {

    it("can auto-ack and close with all timestamps in metadata (without VI)", () => testCanAutoAckClose({
        metadata: [{
            ...metadataItem,
            ...allTimestampsRequester,
        }] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in metadata (without VI)", () => testCannotAutoAckClose({
        metadata: [{
            ...metadataItem,
            ...missingTimestampsRequester,
        }] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("can auto-ack and close with all timestamps in metadata (with VI)", () => testCanAutoAckClose({
        metadata: [{
            ...metadataItem,
            ...allTimestampsVerifiedIssuer,
        }] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in metadata (with VI)", () => testCannotAutoAckClose({
        metadata: [{
            ...metadataItem,
            ...missingTimestampsVerifiedIssuer,
        }] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("can auto-ack and close with all timestamps in file (without VI)", () => testCanAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [{
            ...file,
            ...allTimestampsRequester,
        }] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in file (without VI)", () => testCannotAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [{
            ...file,
            ...missingTimestampsRequester,
        }] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("can auto-ack and close with all timestamps in file (with VI)", () => testCanAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [{
            ...file,
            ...allTimestampsVerifiedIssuer,
        }] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in file (with VI)", () => testCannotAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [{
            ...file,
            ...missingTimestampsVerifiedIssuer,
        }] as MergedFile[],
        links: [] as MergedLink[],
    } as unknown as LocData));

    it("can auto-ack and close with all timestamps in link (without VI)", () => testCanAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [{
            ...link,
            ...allTimestampsRequester,
        }] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in link (without VI)", () => testCannotAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [{
            ...link,
            ...missingTimestampsRequester,
        }] as MergedLink[],
    } as unknown as LocData));

    it("can auto-ack and close with all timestamps in link (with VI)", () => testCanAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [{
            ...link,
            ...allTimestampsVerifiedIssuer,
        }] as MergedLink[],
    } as unknown as LocData));

    it("cannot auto-ack nor close with missing timestamps in link (with VI)", () => testCannotAutoAckClose({
        metadata: [] as MergedMetadataItem[],
        files: [] as MergedFile[],
        links: [{
            ...link,
            ...missingTimestampsVerifiedIssuer,
        }] as MergedLink[],
    } as unknown as LocData));

    const metadataItem = {
        name: HashString.fromValue("Test"),
        value: HashString.fromValue("Value"),
        published: true,
        status: "PUBLISHED",
    };

    const file = {
        hash: Hash.of("content"),
        nature: HashString.fromValue("Nature"),
        name: "test.txt",
        published: true,
        status: "PUBLISHED",
        restrictedDelivery: false,
        size: 7n,
        contentType: "text/plain",
    };

    const link = {
        target: new UUID(),
        nature: HashString.fromValue("Test"),
        published: true,
        status: "PUBLISHED",
    };

    const allTimestampsRequester = {
        acknowledgedByOwner: false,
        acknowledgedByVerifiedIssuer: false,
        addedOn: DateTime.now(),
        submitter: REQUESTER,
    };

    const allTimestampsVerifiedIssuer = {
        acknowledgedByOwner: false,
        acknowledgedByVerifiedIssuer: true,
        acknowledgedByVerifiedIssuerOn: DateTime.now(),
        addedOn: DateTime.now(),
        submitter: ISSUER,
    };

    const missingTimestampsRequester = {
        acknowledgedByOwner: true,
        acknowledgedByVerifiedIssuer: false,
        submitter: REQUESTER,
    };

    const missingTimestampsVerifiedIssuer = {
        acknowledgedByOwner: true,
        acknowledgedByOwnerOn: DateTime.now(),
        acknowledgedByVerifiedIssuer: true,
        submitter: ISSUER,
    };
});

function testCanAutoAckClose(data: LocData) {
    const commands = buildLegalOfficerOpenRequestCommands(data);
    expect(commands.canAutoAck()).toBe(true);
    expect(commands.canClose(true)).toBe(true);
    expect(commands.canClose(false)).toBe(false);
}

function testCannotAutoAckClose(data: LocData) {
    const commands = buildLegalOfficerOpenRequestCommands(data);
    expect(commands.canAutoAck()).toBe(false);
    expect(commands.canClose(true)).toBe(false);
    expect(commands.canClose(false)).toBe(false);
}

function buildLegalOfficerOpenRequestCommands(data: LocData) {
    const locId = new UUID();
    const client = new Mock<AuthenticatedLocClient>();
    const request = new Mock<OpenLoc>();
    request.setup(instance => instance.data()).returns(data);
    request.setup(instance => instance.isRequester).returns(account => account !== undefined && REQUESTER.equals(account));
    request.setup(instance => instance.isOwner()).returns(false);
    request.setup(instance => instance.isVerifiedIssuer).returns(account => account !== undefined && ISSUER.equals(account));
    return new LegalOfficerOpenRequestCommands({
        locId,
        client: client.object(),
        request: request.object(),
    });
}

const client = new Mock<LogionClient>();

const legalOfficers: LegalOfficer[] = [ ALICE, BOB, CHARLIE ];

const ITEM_ID = Hash.fromHex("0x186bf67f32bb45187a1c50286dbd9adf8751874831aeba2a66760a74a9c898cc");
const ITEM_ID_2 = Hash.fromHex("0x14c85b312b891eae5de44d1d4d5024d36cbce545e686d299624e2a71b9e14712");

const ALICE_DRAFT_TRANSACTION_LOC = buildLocAndRequest(ALICE.account, "DRAFT", "Transaction");
const ALICE_OPEN_TRANSACTION_LOC = buildLocAndRequest(ALICE.account, "OPEN", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC = buildLocAndRequest(ALICE.account, "CLOSED", "Transaction");
const ALICE_CLOSED_COLLECTION_LOC = buildLocAndRequest(ALICE.account, "CLOSED", "Collection");
const ALICE_REQUESTED_SOF_REQUEST = buildLocRequest(ALICE.account, "REVIEW_PENDING", "Transaction");
const ALICE_REJECTED_TRANSACTION_LOC_REQUEST = buildLocRequest(ALICE.account, "REVIEW_REJECTED", "Transaction");
const ALICE_CLOSED_IDENTITY_LOC_WITH_VERIFIED_ISSUER = buildLocAndRequest(ALICE.account, "CLOSED", "Identity", undefined, ISSUER);
const ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER = buildLocAndRequest(ALICE.account, "OPEN", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER = buildLocAndRequest(ALICE.account, "CLOSED", "Transaction");

const BOB_REQUESTED_TRANSACTION_LOC_REQUEST = buildLocRequest(BOB.account, "REVIEW_PENDING", "Transaction");
const BOB_OPEN_TRANSACTION_LOC = buildLocAndRequest(BOB.account, "OPEN", "Transaction");
const BOB_VOID_TRANSACTION_LOC = buildLocAndRequest(BOB.account, "CLOSED", "Transaction", mockVoidInfo());
const BOB_VOID_COLLECTION_LOC = buildLocAndRequest(BOB.account, "CLOSED", "Collection", mockVoidInfo());
const BOB_CLOSED_IDENTITY_LOC = buildLocAndRequest(BOB.account, "CLOSED", "Identity");

const CHARLIE_VOID_IDENTITY_LOC = buildLocAndRequest(CHARLIE.account, "CLOSED", "Identity", mockVoidInfo());

const ALL_LOCS = [
    ALICE_OPEN_TRANSACTION_LOC,
    ALICE_CLOSED_TRANSACTION_LOC,
    ALICE_CLOSED_COLLECTION_LOC,
    ALICE_CLOSED_IDENTITY_LOC_WITH_VERIFIED_ISSUER,
    ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER,
    ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER,
    BOB_OPEN_TRANSACTION_LOC,
    BOB_VOID_TRANSACTION_LOC,
    BOB_VOID_COLLECTION_LOC,
    BOB_CLOSED_IDENTITY_LOC,
    CHARLIE_VOID_IDENTITY_LOC
];

const COLLECTION_ITEM = buildCollectionItem();
const OFFCHAIN_COLLECTION_ITEM = buildOffchainCollectionItem(ALICE_CLOSED_COLLECTION_LOC.request.id);
const SPECIFIC_LICENSES: SpecificLicense[] = [
    new SpecificLicense(new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4"), "")
];
const LOGION_CLASSIFICATION: LogionClassificationParameters = { transferredRights: ["COM-MOD", "NOTIME", "WW"]};
const CREATIVE_COMMONS: CreativeCommonsCode = "BY-SA";

const RECORD_ID = Hash.fromHex("0x186bf67f32bb45187a1c50286dbd9adf8751874831aeba2a66760a74a9c898cc");
const RECORD_DESCRIPTION = "Some record description";
const RECORD_FILES: HashOrContent[] = [ HashOrContent.fromContent(MOCK_FILE) ];

const OTHER_RECORD_ID = Hash.fromHex("0x0c274fac19724c028d4a20a86a68930df23df80f9e8171b5b8bf733cc605c766");
const OTHER_RECORD_DESCRIPTION = "Some other record description";
const OTHER_RECORD_FILES: HashOrContent[] = [ HashOrContent.fromContent(MOCK_FILE) ];

let aliceAxiosMock: Mock<AxiosInstance>;
let bobAxiosMock: Mock<AxiosInstance>;
let charlieAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApiClass>;
let uploaderMock: Mock<FileUploader>;

async function buildSharedState(isVerifiedIssuer: boolean = false): Promise<SharedState> {
    const currentAccount = isVerifiedIssuer ? ISSUER : REQUESTER;
    const token = "some-token";
    const tokens = new AccountTokens(
        buildSimpleNodeApi(),
        {
            [currentAccount.toKey()]: {
                value: token,
                expirationDateTime: DateTime.now().plus({ hours: 1 })
            }
        }
    );
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultNetworkState();
            factory.setupFileUploaderMock();
            factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

            const axiosFactoryMock = factory.setupAxiosFactoryMock();
            uploaderMock = factory.setupFileUploaderMock();

            aliceAxiosMock = new Mock<AxiosInstance>();
            const aliceRequests: LocRequest[] = [
                ALICE_DRAFT_TRANSACTION_LOC.request,
                ALICE_OPEN_TRANSACTION_LOC.request,
                ALICE_CLOSED_TRANSACTION_LOC.request,
                ALICE_CLOSED_COLLECTION_LOC.request,
                ALICE_REJECTED_TRANSACTION_LOC_REQUEST,
            ];
            aliceAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER.address)))
                .returnsAsync({
                    data: {
                        requests: aliceRequests
                    }
                } as AxiosResponse);

            if(isVerifiedIssuer) {
                aliceAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === ISSUER.address)))
                    .returnsAsync({
                        data: {
                            requests: [ALICE_CLOSED_IDENTITY_LOC_WITH_VERIFIED_ISSUER.request]
                        }
                    } as AxiosResponse);
            }

            // Alice files and metadata
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC.request.id }/metadata`, It.IsAny()))
                .returnsAsync({} as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC.request.id }/files`, It.IsAny(), It.IsAny()))
                .returnsAsync({
                    data: {
                        hash: "0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c"
                    }
                } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_DRAFT_TRANSACTION_LOC.request.id }/metadata`, It.IsAny()))
                .returnsAsync({} as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_DRAFT_TRANSACTION_LOC.request.id }/files`, It.IsAny(), It.IsAny()))
                .returnsAsync({
                    data: {
                        hash: "0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c"
                    }
                } as AxiosResponse);
            [
                ...aliceRequests,
                ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER.request,
                ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER.request,
            ].forEach(request => {
                aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ request.id }`)).returnsAsync({
                    data: request
                } as AxiosResponse);
            });
            aliceAxiosMock.setup(instance => instance.delete(It.IsAny())).returnsAsync({
                data: ALICE_OPEN_TRANSACTION_LOC.request
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.delete(It.IsAny())).returnsAsync({
                data: ALICE_DRAFT_TRANSACTION_LOC.request
            } as AxiosResponse);

            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/sof`, It.IsAny())).returnsAsync({
                data: ALICE_REQUESTED_SOF_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/collection/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/items/${ EXISTING_ITEM_ID.toHex() }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(ALICE.node, token))
                .returns(aliceAxiosMock.object());

            bobAxiosMock = new Mock<AxiosInstance>();
            const bobRequests: LocRequest[] = [
                BOB_REQUESTED_TRANSACTION_LOC_REQUEST,
                BOB_OPEN_TRANSACTION_LOC.request,
                BOB_VOID_TRANSACTION_LOC.request,
                BOB_VOID_COLLECTION_LOC.request,
                BOB_CLOSED_IDENTITY_LOC.request,
            ];
            bobAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER.address)))
                .returnsAsync({
                    data: {
                        requests: bobRequests
                    }
                } as AxiosResponse);
            bobRequests.forEach(request => {
                bobAxiosMock.setup(instance => instance.get(`/api/loc-request/${ request.id }`)).returnsAsync({
                    data: request
                } as AxiosResponse);
            })
            bobAxiosMock.setup(instance => instance.get(`/api/collection/${ BOB_VOID_COLLECTION_LOC.request.id }/items/${ EXISTING_ITEM_ID.toHex() }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            bobAxiosMock.setup(instance => instance.post(`/api/loc-request/${ BOB_CLOSED_IDENTITY_LOC.request.id }/secrets`, It.Is<Secret>(body => body.name === SECRET_NAME && body.value === SECRET_VALUE))).returnsAsync({} as AxiosResponse);
            bobAxiosMock.setup(instance => instance.delete(`/api/loc-request/${ BOB_CLOSED_IDENTITY_LOC.request.id }/secrets/${ SECRET_NAME }`)).returnsAsync({} as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(BOB.node, token))
                .returns(bobAxiosMock.object());


            charlieAxiosMock = new Mock<AxiosInstance>();
            const charlieRequests: LocRequest[] = [
                CHARLIE_VOID_IDENTITY_LOC.request,
            ];
            charlieAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER.address)))
                .returnsAsync({
                    data: {
                        requests: charlieRequests
                    }
                } as AxiosResponse);
            charlieRequests.forEach(request => {
                charlieAxiosMock.setup(instance => instance.get(`/api/loc-request/${ request.id }`)).returnsAsync({
                    data: request
                } as AxiosResponse);
            })
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(CHARLIE.node, token))
                .returns(charlieAxiosMock.object());


            nodeApiMock = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);

            nodeApiMock.setup(instance => instance.queries.getLegalOfficerCase).returns(mockGetLegalOfficerCase(ALL_LOCS));

            let verifiedIssuer: VerifiedIssuerType | undefined;
            const verifiedIssuerAddress = ALICE_CLOSED_IDENTITY_LOC_WITH_VERIFIED_ISSUER.loc.requesterAccountId;
            if(isVerifiedIssuer) {
                verifiedIssuer = {
                    account: verifiedIssuerAddress!,
                    identityLocId: new UUID(ALICE_CLOSED_IDENTITY_LOC_WITH_VERIFIED_ISSUER.request.id),
                };
            }
            nodeApiMock.setup(instance => instance.batch.locs).returns(mockLocBatchFactory(ALL_LOCS, verifiedIssuer));
            if(verifiedIssuer) {
                nodeApiMock.setup(instance => instance.polkadot.query.logionLoc.locsByVerifiedIssuerMap.entries(ISSUER.address)).returns(Promise.resolve([
                    [
                        {
                            args: [
                                mockCodecWithToString(ISSUER.address),
                                mockCodecWithToString(ALICE.account.address),
                                mockCodecWithToString(new UUID(ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER.request.id).toDecimalString()),
                            ],
                        } as any,
                        mockCodecWithToString(""),
                    ],
                    [
                        {
                            args: [
                                mockCodecWithToString(ISSUER.address),
                                mockCodecWithToString(ALICE.account.address),
                                mockCodecWithToString(new UUID(ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VERIFIED_ISSUER.request.id).toDecimalString()),
                            ],
                        } as any,
                        mockCodecWithToString(""),
                    ]
                ]));
            }

            const addCollectionItemExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.addCollectionItem(
                new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toDecimalString(),
                It.Is<any>(param => param.toHex() === ITEM_ID.toHex()),
                ITEM_DESCRIPTION,
                [],
                null,
                false,
                It.IsAny(),
            )).returns(addCollectionItemExtrinsic.object());

            nodeApiMock.setup(instance => instance.queries.getCollectionItem(
                It.Is<UUID>(locId => locId.toString() !== ALICE_CLOSED_COLLECTION_LOC.request.id),
                It.Is<Hash>(itemId => itemId.toHex() !== EXISTING_ITEM_ID.toHex())
            ))
                .returnsAsync(undefined);
            nodeApiMock.setup(instance => instance.queries.getCollectionItem(
                ItIsUuid(new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id)),
                EXISTING_ITEM_ID
            ))
                .returnsAsync(COLLECTION_ITEM);
            nodeApiMock.setup(instance => instance.queries.getCollectionItem(ItIsUuid(new UUID(BOB_VOID_COLLECTION_LOC.request.id)), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);

            const addTokensRecordExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.addTokensRecord(
                new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toDecimalString(),
                It.Is<Hash>(itemId => itemId.toHex() !== ITEM_ID.toHex()),
                ITEM_DESCRIPTION,
                It.IsAny(),
            )).returns(addTokensRecordExtrinsic.object());

            nodeApiMock.setup(instance => instance.polkadot.query.logionLoc.invitedContributorsByLocMap.entries(It.IsAny())).returns(Promise.resolve([]))
            nodeApiMock.setup(instance => instance.polkadot.query.logionLoc.invitedContributorsByLocMap(It.IsAny(), It.IsAny())).returns(Promise.resolve(mockEmptyOption()))

            const closeExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.close(It.IsAny(), It.IsAny(), It.IsAny())).returns(closeExtrinsic.object());

            const makeVoidExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.makeVoid(It.IsAny())).returns(makeVoidExtrinsic.object());

            const makeVoidAndReplaceExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.makeVoidAndReplace(It.IsAny(), It.IsAny())).returns(makeVoidAndReplaceExtrinsic.object());

            const addLinkExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.addLink(It.IsAny(), It.IsAny())).returns(addLinkExtrinsic.object());

            const setIssuerSelectionExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.setIssuerSelection(It.IsAny(), It.IsAny(), It.IsAny())).returns(setIssuerSelectionExtrinsic.object());

            const nominateIssuerExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.nominateIssuer(It.IsAny(), It.IsAny())).returns(nominateIssuerExtrinsic.object());

            const dismissIssuerExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.polkadot.tx.logionLoc.dismissIssuer(It.IsAny())).returns(dismissIssuerExtrinsic.object());

            nodeApiMock.setup(instance => instance.fees.estimateWithoutStorage(It.IsAny())).returnsAsync(Fees.zero());
            nodeApiMock.setup(instance => instance.fees.ensureEnoughFunds(It.IsAny())).returnsAsync(undefined);
        },
        currentAccount,
        legalOfficers,
        tokens,
    );
}

function verifySoFRequested(axiosMock: Mock<AxiosInstance>, locId: UUID, itemId?: Hash) {
    axiosMock.verify(instance => instance.post(
        `/api/loc-request/sof`,
        It.Is<{ locId: string, itemId: string | undefined }>(params => params.locId === locId.toString() && params.itemId === itemId?.toHex())
    ), Times.Once());
}

async function getDraftRequest() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.draftRequests.Transaction[0];
}

async function getPendingRequest() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.pendingRequests.Transaction[0];
}

async function getRejectedRequest() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.rejectedRequests.Transaction[0];
}

async function getOpenLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.openLocs.Transaction[0];
}

async function testCheckFileHash(state: LocRequestState) {
    const result = await state.checkHash(EXISTING_FILE_HASH);
    expect(result.file).toBeDefined();
}

async function getClosedTransactionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.closedLocs.Transaction[0] as ClosedLoc;
}

async function getClosedCollectionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.closedLocs.Collection[0] as ClosedCollectionLoc;
}

async function getClosedIdentityLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.closedLocs.Identity[0] as ClosedIdentityLoc;
}

async function getVoidedTransactionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.voidedLocs.Transaction[0] as VoidedLoc;
}

async function getVoidedCollectionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());
    return locs.voidedLocs.Collection[0] as VoidedCollectionLoc;
}

function expectDataToMatch(data: LocData, request: LocRequest) {
    expect(data.id.toString()).toBe(request.id.toString());
    expect(data.ownerAccountId.address).toBe(request.ownerAddress);
    expect(data.requesterAccountId?.equals(request.requesterAddress)).toBeTrue();
    expect(data.requesterLocId?.toString()).toBe(request.requesterIdentityLoc ? request.requesterIdentityLoc : undefined);
    expect(data.description).toBe(request.description);
    expect(data.locType).toBe(request.locType);
    expect(data.createdOn).toBeDefined();
    expect(data.status).toBe(request.status);
    expect(data.voidInfo?.reason).toBe(request.voidInfo?.reason);
    expect(data.voidInfo?.voidedOn).toBe(request.voidInfo?.voidedOn);
}

async function testAddMetadata(editable: EditableRequest) {
    let newState = await editable.addMetadata({
        name: "Test",
        value: "Test Value"
    });

    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.post(
            `/api/loc-request/${ editable.locId }/metadata`,
            It.Is<AddMetadataParams & FetchParameters>((params: any) => params.name === "Test" && params.value === "Test Value")),
        Times.Once(),
    );
}

async function testAddFile(editable: EditableRequest) {
    let newState = await editable.addFile({
        file: HashOrContent.fromContent(MOCK_FILE),
        nature: "Some nature",
    });

    expect(newState).toBeInstanceOf(EditableRequest);
    uploaderMock.verify(instance => instance.upload(It.Is<FileUploadParameters>(params =>
        params.endpoint.endsWith(`/api/loc-request/${ editable.locId }/files`)
        && params.headers["Content-Type"] === "multipart/form-data"
    )), Times.Once());
}

async function testDeleteMetadata(editable: EditableRequest) {
    const nameHash = Hash.of("Test");
    let newState = await editable.deleteMetadata({
        nameHash,
    });
    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.delete(`/api/loc-request/${ editable.locId }/metadata/${ nameHash.toHex() }`), Times.Once());
}

async function testDeleteFile(editable: EditableRequest) {
    let newState = await editable.deleteFile({
        hash: Hash.fromHex("0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c"),
    });
    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.delete(
        `/api/loc-request/${ editable.locId }/files/0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c`
    ), Times.Once());
}

async function testAddLink(editable: EditableRequest) {
    const target = new UUID();
    const nature = "Some nature";

    let newState = await editable.addLink({
        target,
        nature,
    });

    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.post(
            `/api/loc-request/${ editable.locId }/links`,
            It.Is((params: any) => params.target === target.toString() && params.nature === "Some nature"),
        ),
        Times.Once(),
    );
}

async function testDeleteLink(editable: EditableRequest) {
    const target = new UUID();
    let newState = await editable.deleteLink({ target });
    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.delete(`/api/loc-request/${ editable.locId }/links/${ target.toString() }`), Times.Once());
}

async function testSelectIssuer(state: OpenLoc | ClosedCollectionLoc) {
    const signer = new Mock<Signer>();
    signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

    await state.legalOfficer.selectIssuer({
        payload: {
            issuer: ISSUER
        },
        signer: signer.object(),
    });

    signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
    nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.setIssuerSelection(It.IsAny(), ISSUER.address, true), Times.Once());
}

async function testUnselectIssuer(state: OpenLoc | ClosedCollectionLoc) {
    const signer = new Mock<Signer>();
    signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId.equals(REQUESTER)))).returnsAsync(SUCCESSFUL_SUBMISSION);

    await state.legalOfficer.unselectIssuer({
        payload: {
            issuer: ISSUER
        },
        signer: signer.object(),
    });

    signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
    nodeApiMock.verify(instance => instance.polkadot.tx.logionLoc.setIssuerSelection(It.IsAny(), ISSUER.address, false), Times.Once());
}
