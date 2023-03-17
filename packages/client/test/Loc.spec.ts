import { LogionNodeApi, UUID } from "@logion/node-api";
import { PalletLogionLocVerifiedIssuer } from '@polkadot/types/lookup';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { It, Mock, Times } from "moq.ts";

import {
    AccountTokens,
    HashOrContent,
    LegalOfficer,
    MimeType,
    ClosedCollectionLoc,
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
    ItemFileWithContent,
    LocRequest,
    Signer,
    SignParameters,
    SpecificLicense,
    LogionClassification,
    CreativeCommons,
    EditableRequest,
    LogionClient,
    SharedState,
    FormDataLike,
    LegalOfficerClass
} from "../src/index.js";
import {
    ALICE,
    BOB,
    CHARLIE,
    buildTestAuthenticatedSharedSate,
    LOGION_CLIENT_CONFIG,
    mockCodecWithToString,
    mockEmptyOption,
    mockOption,
    REQUESTER,
    SUCCESSFUL_SUBMISSION
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
    ISSUER
} from "./LocUtils.js";

describe("LocsState", () => {

    it("getInitialLocsState - not VTP", async () => testGetInitialState(false));
    it("getInitialLocsState - VTP", async () => testGetInitialState(true));

    it("checks that user has valid identity", async() => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());

        expect(locs.hasValidIdentityLoc(ALICE)).toBeFalse();
        expect(locs.hasValidIdentityLoc(BOB)).toBeTrue();
        expect(locs.hasValidIdentityLoc(CHARLIE)).toBeFalse();

        expect(locs.legalOfficersWithValidIdentityLoc.length).toEqual(1);
        expect(locs.legalOfficersWithValidIdentityLoc[0]).toBeInstanceOf(LegalOfficerClass);
        expect(locs.legalOfficersWithValidIdentityLoc[0].address).toEqual(BOB.address);
    })

    it("detects that user is not a verified third party", async() => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());
        expect(locs.isVerifiedThirdParty).toBeFalse();
    })

    it("detects that user is a verified third party", async() => {
        const sharedState = await buildSharedState(true);
        const locs = await LocsState.getInitialLocsState(sharedState, client.object());
        expect(locs.isVerifiedThirdParty).toBeTrue();
    })
});

async function testGetInitialState(isVerifiedThirdParty: boolean) {
    const sharedState = await buildSharedState(isVerifiedThirdParty);
    const locs = await LocsState.getInitialLocsState(sharedState, client.object());

    if(isVerifiedThirdParty) {
        expect(locs.openVerifiedThirdPartyLocs["Transaction"].length).toBe(1);
        expect(locs.closedVerifiedThirdPartyLocs["Transaction"].length).toBe(1);
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

    it("submits", async () => {
        const draft = await getDraftRequest();
        let newState = await draft.submit();

        expect(newState).toBeInstanceOf(PendingRequest);
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
});

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
});

describe("ClosedCollectionLoc", () => {

    it("adds collection item", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            itemId: ITEM_ID,
            itemDescription: ITEM_DESCRIPTION,
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("adds collection item with Logion Classification", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            itemId: ITEM_ID,
            itemDescription: ITEM_DESCRIPTION,
            signer: signer.object(),
            logionClassification: LOGION_CLASSIFICATION,
            specificLicenses: SPECIFIC_LICENSES,
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addCollectionItemWithTermsAndConditions(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("adds collection item with Creative Commons", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFUL_SUBMISSION);
        await closedLoc.addCollectionItem({
            itemId: ITEM_ID,
            itemDescription: ITEM_DESCRIPTION,
            signer: signer.object(),
            specificLicenses: SPECIFIC_LICENSES,
            creativeCommons: CREATIVE_COMMONS,
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addCollectionItemWithTermsAndConditions(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("fails to add collection item with both Logion Classification and Creative Commons", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFUL_SUBMISSION);
        // expectAsync(closedCollectionLoc).toBeRejected("Logion Classification and Creative Commons are mutually exclusive.");
        await expectAsync(closedLoc.addCollectionItem({
                itemId: ITEM_ID,
                itemDescription: ITEM_DESCRIPTION,
                signer: signer.object(),
                logionClassification: LOGION_CLASSIFICATION,
                specificLicenses: SPECIFIC_LICENSES,
                creativeCommons: CREATIVE_COMMONS,
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
            itemFile: new ItemFileWithContent({
                name: "test.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
            }),
        });

        aliceAxiosMock.verify(instance => instance.post(
                `/api/collection/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/${ ITEM_ID }/files`,
                It.IsAny(),
                It.Is((options: AxiosRequestConfig<FormDataLike>) => options.headers !== undefined && options.headers["Content-Type"] === "multipart/form-data")
            ),
            Times.Once(),
        );
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
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFUL_SUBMISSION);

        await closedLoc.addTokensRecord({
            recordId: RECORD_ID,
            description: RECORD_DESCRIPTION,
            files: RECORD_FILES,
            signer: signer.object(),
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addTokensRecord(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("uploads tokens record file", async () => {
        const closedLoc = await getClosedCollectionLoc();

        await closedLoc.uploadTokensRecordFile({
            recordId: RECORD_ID,
            file: new ItemFileWithContent({
                name: "test.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
            }),
        });

        aliceAxiosMock.verify(instance => instance.post(
                `/api/records/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/${ RECORD_ID }/files`,
                It.IsAny(),
                It.Is((options: AxiosRequestConfig<FormDataLike>) => options.headers !== undefined && options.headers["Content-Type"] === "multipart/form-data")
            ),
            Times.Once(),
        );
    });
});

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

const client = new Mock<LogionClient>();

const legalOfficers: LegalOfficer[] = [ ALICE, BOB, CHARLIE ];

const ITEM_ID = "0x186bf67f32bb45187a1c50286dbd9adf8751874831aeba2a66760a74a9c898cc";

const ALICE_DRAFT_TRANSACTION_LOC = buildLocAndRequest(ALICE.address, "DRAFT", "Transaction");
const ALICE_OPEN_TRANSACTION_LOC = buildLocAndRequest(ALICE.address, "OPEN", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC = buildLocAndRequest(ALICE.address, "CLOSED", "Transaction");
const ALICE_CLOSED_COLLECTION_LOC = buildLocAndRequest(ALICE.address, "CLOSED", "Collection");
const ALICE_REQUESTED_SOF_REQUEST = buildLocRequest(ALICE.address, "REQUESTED", "Transaction");
const ALICE_REJECTED_TRANSACTION_LOC_REQUEST = buildLocRequest(ALICE.address, "REJECTED", "Transaction");
const ALICE_CLOSED_IDENTITY_LOC_WITH_VTP = buildLocAndRequest(ALICE.address, "CLOSED", "Identity", undefined, ISSUER);
const ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VTP = buildLocAndRequest(ALICE.address, "OPEN", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VTP = buildLocAndRequest(ALICE.address, "CLOSED", "Transaction");

const BOB_REQUESTED_TRANSACTION_LOC_REQUEST = buildLocRequest(BOB.address, "REQUESTED", "Transaction");
const BOB_OPEN_TRANSACTION_LOC = buildLocAndRequest(BOB.address, "OPEN", "Transaction");
const BOB_VOID_TRANSACTION_LOC = buildLocAndRequest(BOB.address, "CLOSED", "Transaction", mockVoidInfo());
const BOB_VOID_COLLECTION_LOC = buildLocAndRequest(BOB.address, "CLOSED", "Collection", mockVoidInfo());
const BOB_CLOSED_IDENTITY_LOC = buildLocAndRequest(BOB.address, "CLOSED", "Identity");

const CHARLIE_VOID_IDENTITY_LOC = buildLocAndRequest(CHARLIE.address, "CLOSED", "Identity", mockVoidInfo());

const COLLECTION_ITEM = buildCollectionItem();
const OFFCHAIN_COLLECTION_ITEM = buildOffchainCollectionItem(ALICE_CLOSED_COLLECTION_LOC.request.id);
const SPECIFIC_LICENSES: SpecificLicense[] = [
    new SpecificLicense(new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4"), "")
];
const LOGION_CLASSIFICATION: LogionClassification = new LogionClassification(new UUID(), { transferredRights: ["COM-MOD", "NOTIME", "WW"]});
const CREATIVE_COMMONS: CreativeCommons = new CreativeCommons(new UUID(), "BY-SA");

const RECORD_ID = "0x186bf67f32bb45187a1c50286dbd9adf8751874831aeba2a66760a74a9c898cc";
const RECORD_DESCRIPTION = "Some record description";
const RECORD_FILES: ItemFileWithContent[] = [new ItemFileWithContent({
    name: "test.txt",
    contentType: MimeType.from("text/plain"),
    hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
})];

let aliceAxiosMock: Mock<AxiosInstance>;
let bobAxiosMock: Mock<AxiosInstance>;
let charlieAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApi>;

async function buildSharedState(isVerifiedThirdParty: boolean = false): Promise<SharedState> {
    const currentAddress = isVerifiedThirdParty ? ISSUER : REQUESTER;
    const token = "some-token";
    const tokens = new AccountTokens({
        [currentAddress]: {
            value: token,
            expirationDateTime: DateTime.now().plus({ hours: 1 })
        }
    });
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultNetworkState();
            factory.setupDefaultFormDataFactory();
            factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

            const axiosFactoryMock = factory.setupAxiosFactoryMock();

            aliceAxiosMock = new Mock<AxiosInstance>();
            const aliceRequests: LocRequest[] = [
                ALICE_DRAFT_TRANSACTION_LOC.request,
                ALICE_OPEN_TRANSACTION_LOC.request,
                ALICE_CLOSED_TRANSACTION_LOC.request,
                ALICE_CLOSED_COLLECTION_LOC.request,
                ALICE_REJECTED_TRANSACTION_LOC_REQUEST,
            ];
            aliceAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER)))
                .returnsAsync({
                    data: {
                        requests: aliceRequests
                    }
                } as AxiosResponse);

            if(isVerifiedThirdParty) {
                aliceAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === ISSUER)))
                    .returnsAsync({
                        data: {
                            requests: [ALICE_CLOSED_IDENTITY_LOC_WITH_VTP.request]
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
                ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VTP.request,
                ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VTP.request,
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
            aliceAxiosMock.setup(instance => instance.get(`/api/collection/${ ALICE_CLOSED_COLLECTION_LOC.request.id }/items/${ EXISTING_ITEM_ID }`)).returnsAsync({
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
            bobAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER)))
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
            bobAxiosMock.setup(instance => instance.get(`/api/collection/${ BOB_VOID_COLLECTION_LOC.request.id }/items/${ EXISTING_ITEM_ID }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(BOB.node, token))
                .returns(bobAxiosMock.object());


            charlieAxiosMock = new Mock<AxiosInstance>();
            const charlieRequests: LocRequest[] = [
                CHARLIE_VOID_IDENTITY_LOC.request,
            ];
            charlieAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER)))
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

            [
                ALICE_OPEN_TRANSACTION_LOC,
                ALICE_CLOSED_TRANSACTION_LOC,
                ALICE_CLOSED_COLLECTION_LOC,
                ALICE_CLOSED_IDENTITY_LOC_WITH_VTP,
                ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VTP,
                ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VTP,
                BOB_OPEN_TRANSACTION_LOC,
                BOB_VOID_TRANSACTION_LOC,
                BOB_VOID_COLLECTION_LOC,
                BOB_CLOSED_IDENTITY_LOC,
                CHARLIE_VOID_IDENTITY_LOC
            ].forEach(locData => {
                nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(locData.request.id).toHexString()))
                    .returnsAsync(locData.loc);
            });

            const addCollectionItemExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.tx.logionLoc.addCollectionItem(
                new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toDecimalString(),
                ITEM_ID,
                ITEM_DESCRIPTION,
                [],
                null,
                false
            )).returns(addCollectionItemExtrinsic.object());

            const addCollectionItemWithTermsAndConditionsExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.tx.logionLoc.addCollectionItemWithTermsAndConditions(
                new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toDecimalString(),
                ITEM_ID,
                ITEM_DESCRIPTION,
                [],
                null,
                false,
                It.Is<object[]>(args => args.length === 1),
            )).returns(addCollectionItemWithTermsAndConditionsExtrinsic.object());

            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(
                It.Is<UUID>(locId => locId.toString() !== ALICE_CLOSED_COLLECTION_LOC.request.id),
                It.Is<string>(itemId => itemId !== EXISTING_ITEM_ID
                )))
                .returnsAsync(mockEmptyOption());
            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toHexString(), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);
            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(new UUID(BOB_VOID_COLLECTION_LOC.request.id).toHexString(), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);

            if(!isVerifiedThirdParty) {
                nodeApiMock.setup(instance => instance.query.logionLoc.verifiedIssuersMap(It.IsAny(), It.IsAny())).returns(Promise.resolve(mockEmptyOption<PalletLogionLocVerifiedIssuer>()));
                nodeApiMock.setup(instance => instance.query.logionLoc.verifiedIssuersByLocMap.entries(It.IsAny())).returns(Promise.resolve([]));
                nodeApiMock.setup(instance => instance.query.logionLoc.locsByVerifiedIssuerMap.entries(It.IsAny())).returns(Promise.resolve([]));
            } else {
                [
                    ...aliceRequests,
                    ...bobRequests,
                    ...charlieRequests,
                    ALICE_CLOSED_IDENTITY_LOC_WITH_VTP.request,
                ].forEach(request => {
                    if(request.id !== ALICE_CLOSED_IDENTITY_LOC_WITH_VTP.request.id) {
                        nodeApiMock.setup(instance => instance.query.logionLoc.verifiedIssuersMap(request.ownerAddress, request.requesterAddress)).returns(Promise.resolve(mockEmptyOption<PalletLogionLocVerifiedIssuer>()));
                    } else {
                        const verifiedIssuer: PalletLogionLocVerifiedIssuer = mockCodecWithToString(new UUID(ALICE_CLOSED_IDENTITY_LOC_WITH_VTP.request.id).toDecimalString());
                        nodeApiMock.setup(instance => instance.query.logionLoc.verifiedIssuersMap(request.ownerAddress, request.requesterAddress)).returns(Promise.resolve(mockOption(verifiedIssuer)));
                    }
                });

                nodeApiMock.setup(instance => instance.query.logionLoc.verifiedIssuersByLocMap.entries(It.IsAny())).returns(Promise.resolve([]));

                nodeApiMock.setup(instance => instance.query.logionLoc.locsByVerifiedIssuerMap.entries(ISSUER)).returns(Promise.resolve([
                    [
                        {
                            args: [
                                mockCodecWithToString(ISSUER),
                                mockCodecWithToString(ALICE.address),
                                mockCodecWithToString(new UUID(ALICE_OPEN_TRANSACTION_LOC_WITH_SELECTED_VTP.request.id).toDecimalString()),
                            ],
                        } as any,
                        mockCodecWithToString(""),
                    ],
                    [
                        {
                            args: [
                                mockCodecWithToString(ISSUER),
                                mockCodecWithToString(ALICE.address),
                                mockCodecWithToString(new UUID(ALICE_CLOSED_TRANSACTION_LOC_WITH_SELECTED_VTP.request.id).toDecimalString()),
                            ],
                        } as any,
                        mockCodecWithToString(""),
                    ]
                ]));
                nodeApiMock.setup(instance => instance.query.logionLoc.locsByVerifiedIssuerMap.entries(REQUESTER)).returns(Promise.resolve([]));
            }

            nodeApiMock.setup(instance => instance.createType).returns(() => ({} as any));
            const addTokensRecordExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.tx.logionLoc.addTokensRecord(
                new UUID(ALICE_CLOSED_COLLECTION_LOC.request.id).toDecimalString(),
                ITEM_ID,
                ITEM_DESCRIPTION,
                It.IsAny(),
            )).returns(addTokensRecordExtrinsic.object());
        },
        currentAddress,
        legalOfficers,
        tokens,
    );
}

function verifySoFRequested(axiosMock: Mock<AxiosInstance>, locId: UUID, itemId?: string) {
    axiosMock.verify(instance => instance.post(
        `/api/loc-request/sof`,
        It.Is<{ locId: string, itemId: string | undefined }>(params => params.locId === locId.toString() && params.itemId === itemId)
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
    expect(data.ownerAddress).toBe(request.ownerAddress);
    expect(data.requesterAddress).toBe(request.requesterAddress ? request.requesterAddress : undefined);
    expect(data.requesterLocId?.toString()).toBe(request.requesterIdentityLoc ? request.requesterIdentityLoc : undefined);
    expect(data.description).toBe(request.description);
    expect(data.locType).toBe(request.locType);
    expect(data.closed).toBe(request.status === "CLOSED");
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
        file: HashOrContent.fromContent(Buffer.from("test")),
        fileName: "test.txt",
        nature: "Some nature",
    });

    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.post(
            `/api/loc-request/${ editable.locId }/files`,
            It.IsAny(),
            It.Is((options: AxiosRequestConfig<FormDataLike>) => options.headers !== undefined && options.headers["Content-Type"] === "multipart/form-data")
        ),
        Times.Once(),
    );
}

async function testDeleteMetadata(editable: EditableRequest) {
    let newState = await editable.deleteMetadata({
        name: "Test",
    });
    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.delete(`/api/loc-request/${ editable.locId }/metadata/Test`), Times.Once());
}

async function testDeleteFile(editable: EditableRequest) {
    let newState = await editable.deleteFile({
        hash: "0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c",
    });
    expect(newState).toBeInstanceOf(EditableRequest);
    aliceAxiosMock.verify(instance => instance.delete(
        `/api/loc-request/${ editable.locId }/files/0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c`
    ), Times.Once());
}
