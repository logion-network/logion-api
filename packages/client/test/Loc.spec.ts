import "@logion/node-api/dist/interfaces/types-lookup";

import { LogionNodeApi, UUID } from "@logion/node-api";
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
    TermsAndConditionsElement
} from "../src";
import { SharedState } from "../src/SharedClient";
import {
    ALICE,
    BOB,
    buildTestAuthenticatedSharedSate,
    LOGION_CLIENT_CONFIG,
    mockEmptyOption,
    REQUESTER,
    SUCCESSFULL_SUBMISSION
} from "./Utils";
import { TestConfigFactory } from "./TestConfigFactory";
import { FormDataLike } from "../src/ComponentFactory";
import {
    buildCollectionItem,
    buildLoc,
    buildLocRequest,
    buildOffchainCollectionItem,
    EXISTING_FILE_HASH,
    EXISTING_ITEM_ID,
    ITEM_DESCRIPTION,
    mockVoidInfo
} from "./LocUtils";

describe("LocsState", () => {

    it("getInitialLocsState", async () => {
        const sharedState = await buildSharedState();
        const locs = await LocsState.getInitialLocsState(sharedState);

        expect(locs.pendingRequests.Transaction.length).toBe(1);
        const requestedLoc = locs.pendingRequests.Transaction[0];
        expect(requestedLoc).toBeInstanceOf(PendingRequest);
        expect(requestedLoc.locId).toEqual(new UUID(BOB_REQUESTED_TRANSACTION_LOC_REQUEST.id));

        expect(locs.openLocs.Transaction.length).toBe(2);
        const openLoc = locs.openLocs.Transaction[0];
        expect(openLoc).toBeInstanceOf(OpenLoc);
        expect(openLoc.locId).toEqual(new UUID(ALICE_OPEN_TRANSACTION_LOC_REQUEST.id));

        expect(locs.closedLocs.Transaction.length).toBe(1);
        const closedTransactionLoc = locs.closedLocs.Transaction[0];
        expect(closedTransactionLoc).toBeInstanceOf(ClosedLoc);
        expect(closedTransactionLoc.locId).toEqual(new UUID(ALICE_CLOSED_TRANSACTION_LOC_REQUEST.id));

        expect(locs.closedLocs.Collection.length).toBe(1);
        const closedCollectionLoc = locs.closedLocs.Collection[0];
        expect(closedCollectionLoc).toBeInstanceOf(ClosedCollectionLoc);
        expect(closedCollectionLoc.locId).toEqual(new UUID(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id));
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

    it("adds metadata", async () => {
        const openLoc = await getOpenLoc();

        let newState = await openLoc.addMetadata({
            name: "Test",
            value: "Test Value"
        });

        expect(newState).toBeInstanceOf(OpenLoc);
        aliceAxiosMock.verify(instance => instance.post(
                `/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/metadata`,
                It.Is<AddMetadataParams & FetchParameters>((params: any) => params.name === "Test" && params.value === "Test Value")),
            Times.Once(),
        );
    });

    it("adds file", async () => {
        const openLoc = await getOpenLoc();

        let newState = await openLoc.addFile({
            file: Buffer.from("test"),
            fileName: "test.txt",
            nature: "Some nature",
        });

        expect(newState.state).toBeInstanceOf(OpenLoc);
        aliceAxiosMock.verify(instance => instance.post(
                `/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/files`,
                It.IsAny(),
                It.Is((options: AxiosRequestConfig<FormDataLike>) => options.headers !== undefined && options.headers["Content-Type"] === "multipart/form-data")
            ),
            Times.Once(),
        );
    });

    it("deletes metadata", async () => {
        const openLoc = await getOpenLoc();

        let newState = await openLoc.deleteMetadata({
            name: "Test",
        });

        expect(newState).toBeInstanceOf(OpenLoc);
        aliceAxiosMock.verify(instance => instance.delete(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/metadata/Test`), Times.Once());
    });

    it("deletes file", async () => {
        const openLoc = await getOpenLoc();

        let newState = await openLoc.deleteFile({
            hash: "0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c",
        });

        expect(newState).toBeInstanceOf(OpenLoc);
        aliceAxiosMock.verify(instance => instance.delete(
            `/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/files/0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c`
        ), Times.Once());
    });

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
        expectDataToMatch(data, ALICE_OPEN_TRANSACTION_LOC_REQUEST);
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
        expectDataToMatch(data, ALICE_CLOSED_TRANSACTION_LOC_REQUEST);
    });
});

describe("ClosedCollectionLoc", () => {

    it("adds collection item", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFULL_SUBMISSION);
        await closedLoc.addCollectionItem({
            itemId: ITEM_ID,
            itemDescription: ITEM_DESCRIPTION,
            signer: signer.object(),
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addCollectionItem(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
    });

    it("adds licensed collection item", async () => {
        const closedLoc = await getClosedCollectionLoc();

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params => params.signerId === REQUESTER))).returnsAsync(SUCCESSFULL_SUBMISSION);
        await closedLoc.addCollectionItem({
            itemId: ITEM_ID,
            itemDescription: ITEM_DESCRIPTION,
            signer: signer.object(),
            termsAndConditions: TERMS_AND_CONDITIONS
        });
        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
        nodeApiMock.verify(instance => instance.tx.logionLoc.addCollectionItemWithTermsAndConditions(It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
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
                `/api/collection/${ ALICE_CLOSED_COLLECTION_LOC_REQUEST.id }/${ ITEM_ID }/files`,
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
        expectDataToMatch(data, ALICE_CLOSED_COLLECTION_LOC_REQUEST);
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
        expectDataToMatch(data, BOB_VOID_TRANSACTION_LOC_REQUEST);
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
        expectDataToMatch(data, BOB_VOID_COLLECTION_LOC_REQUEST);
    });
});

const legalOfficers: LegalOfficer[] = [ ALICE, BOB ];

const ITEM_ID = "0x186bf67f32bb45187a1c50286dbd9adf8751874831aeba2a66760a74a9c898cc";

const ALICE_OPEN_TRANSACTION_LOC_REQUEST = buildLocRequest(ALICE.address, "OPEN", "Transaction");
const ALICE_OPEN_TRANSACTION_LOC = buildLoc(ALICE.address, "OPEN", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC_REQUEST = buildLocRequest(ALICE.address, "CLOSED", "Transaction");
const ALICE_CLOSED_TRANSACTION_LOC = buildLoc(ALICE.address, "CLOSED", "Transaction");
const ALICE_CLOSED_COLLECTION_LOC_REQUEST = buildLocRequest(ALICE.address, "CLOSED", "Collection");
const ALICE_CLOSED_COLLECTION_LOC = buildLoc(ALICE.address, "CLOSED", "Collection");
const ALICE_REQUESTED_SOF = buildLoc(ALICE.address, "REQUESTED", "Transaction");
const ALICE_REJECTED_TRANSACTION_LOC_REQUEST = buildLocRequest(ALICE.address, "REJECTED", "Transaction");

const BOB_REQUESTED_TRANSACTION_LOC_REQUEST = buildLocRequest(BOB.address, "REQUESTED", "Transaction");
const BOB_OPEN_TRANSACTION_LOC_REQUEST = buildLocRequest(BOB.address, "OPEN", "Transaction");
const BOB_OPEN_TRANSACTION_LOC = buildLoc(BOB.address, "OPEN", "Transaction");
const BOB_VOID_TRANSACTION_LOC_REQUEST = buildLocRequest(BOB.address, "CLOSED", "Transaction");
const BOB_VOID_TRANSACTION_LOC = buildLoc(BOB.address, "CLOSED", "Transaction", mockVoidInfo());
const BOB_VOID_COLLECTION_LOC_REQUEST = buildLocRequest(BOB.address, "CLOSED", "Collection", true);
const BOB_VOID_COLLECTION_LOC = buildLoc(BOB.address, "CLOSED", "Collection", mockVoidInfo());

const COLLECTION_ITEM = buildCollectionItem();
const OFFCHAIN_COLLECTION_ITEM = buildOffchainCollectionItem(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id);
const TERMS_AND_CONDITIONS: TermsAndConditionsElement[] = [{
    type: 'specific_license',
    tcLocId: new UUID("61ccd87f-765c-4ab0-bd91-af68887515d4"),
    details: ""
}];

let aliceAxiosMock: Mock<AxiosInstance>;
let bobAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApi>;

async function buildSharedState(): Promise<SharedState> {
    const currentAddress = REQUESTER;
    const token = "some-token";
    const tokens = new AccountTokens({
        [REQUESTER]: {
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
                ALICE_OPEN_TRANSACTION_LOC_REQUEST,
                ALICE_CLOSED_TRANSACTION_LOC_REQUEST,
                ALICE_CLOSED_COLLECTION_LOC_REQUEST,
                ALICE_REJECTED_TRANSACTION_LOC_REQUEST,
            ];
            aliceAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER)))
                .returnsAsync({
                    data: {
                        requests: aliceRequests
                    }
                } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/metadata`, It.IsAny()))
                .returnsAsync({} as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }/files`, It.IsAny(), It.IsAny()))
                .returnsAsync({
                    data: {
                        hash: "0x7bae16861c48edb6376401922729c4e3faaa5e203615b3ba6814ba4e85fb434c"
                    }
                } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ ALICE_OPEN_TRANSACTION_LOC_REQUEST.id }`)).returnsAsync({
                data: ALICE_OPEN_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ ALICE_CLOSED_TRANSACTION_LOC_REQUEST.id }`)).returnsAsync({
                data: ALICE_CLOSED_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ ALICE_CLOSED_COLLECTION_LOC_REQUEST.id }`)).returnsAsync({
                data: ALICE_CLOSED_COLLECTION_LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ ALICE_REJECTED_TRANSACTION_LOC_REQUEST.id }`)).returnsAsync({
                data: ALICE_REJECTED_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.delete(It.IsAny())).returnsAsync({
                data: ALICE_OPEN_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.post(`/api/loc-request/sof`, It.IsAny())).returnsAsync({
                data: ALICE_REQUESTED_SOF
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/collection/${ ALICE_CLOSED_COLLECTION_LOC_REQUEST.id }/${ EXISTING_ITEM_ID }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(ALICE.node, token))
                .returns(aliceAxiosMock.object());

            bobAxiosMock = new Mock<AxiosInstance>();
            const bobRequests: LocRequest[] = [
                BOB_REQUESTED_TRANSACTION_LOC_REQUEST,
                BOB_OPEN_TRANSACTION_LOC_REQUEST,
                BOB_VOID_TRANSACTION_LOC_REQUEST,
                BOB_VOID_COLLECTION_LOC_REQUEST,
            ];
            bobAxiosMock.setup(instance => instance.put("/api/loc-request", It.Is<FetchLocRequestSpecification>(params => params.requesterAddress === REQUESTER)))
                .returnsAsync({
                    data: {
                        requests: bobRequests
                    }
                } as AxiosResponse);
            bobAxiosMock.setup(instance => instance.get(`/api/loc-request/${ BOB_REQUESTED_TRANSACTION_LOC_REQUEST.id }`)).returnsAsync({
                data: BOB_REQUESTED_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            bobAxiosMock.setup(instance => instance.get(`/api/loc-request/${ BOB_VOID_TRANSACTION_LOC_REQUEST.id }`)).returnsAsync({
                data: BOB_VOID_TRANSACTION_LOC_REQUEST
            } as AxiosResponse);
            bobAxiosMock.setup(instance => instance.get(`/api/loc-request/${ BOB_VOID_COLLECTION_LOC_REQUEST.id }`)).returnsAsync({
                data: BOB_VOID_COLLECTION_LOC_REQUEST
            } as AxiosResponse);
            bobAxiosMock.setup(instance => instance.get(`/api/collection/${ BOB_VOID_COLLECTION_LOC_REQUEST.id }/${ EXISTING_ITEM_ID }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(BOB.node, token))
                .returns(bobAxiosMock.object());

            nodeApiMock = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(ALICE_OPEN_TRANSACTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(ALICE_OPEN_TRANSACTION_LOC);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(ALICE_CLOSED_TRANSACTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(ALICE_CLOSED_TRANSACTION_LOC);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(ALICE_CLOSED_COLLECTION_LOC);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(BOB_OPEN_TRANSACTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(BOB_OPEN_TRANSACTION_LOC);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(BOB_VOID_TRANSACTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(BOB_VOID_TRANSACTION_LOC);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(BOB_VOID_COLLECTION_LOC_REQUEST.id).toHexString()))
                .returnsAsync(BOB_VOID_COLLECTION_LOC);

            const addCollectionItemExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.tx.logionLoc.addCollectionItem(
                new UUID(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id).toDecimalString(),
                ITEM_ID,
                ITEM_DESCRIPTION,
                [],
                null,
                false
            )).returns(addCollectionItemExtrinsic.object());

            const addCollectionItemWithTermsAndConditionsExtrinsic = new Mock<SubmittableExtrinsic>();
            nodeApiMock.setup(instance => instance.tx.logionLoc.addCollectionItemWithTermsAndConditions(
                new UUID(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id).toDecimalString(),
                ITEM_ID,
                ITEM_DESCRIPTION,
                [],
                null,
                false,
                TERMS_AND_CONDITIONS,
            )).returns(addCollectionItemWithTermsAndConditionsExtrinsic.object());

            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(
                It.Is<UUID>(locId => locId.toString() !== ALICE_CLOSED_COLLECTION_LOC_REQUEST.id),
                It.Is<string>(itemId => itemId !== EXISTING_ITEM_ID
                )))
                .returnsAsync(mockEmptyOption());
            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(new UUID(ALICE_CLOSED_COLLECTION_LOC_REQUEST.id).toHexString(), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);
            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(new UUID(BOB_VOID_COLLECTION_LOC_REQUEST.id).toHexString(), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);
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

async function getPendingRequest() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.pendingRequests.Transaction[0];
}

async function getRejectedRequest() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.rejectedRequests.Transaction[0];
}

async function getOpenLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.openLocs.Transaction[0];
}

async function testCheckFileHash(state: LocRequestState) {
    const result = await state.checkHash(EXISTING_FILE_HASH);
    expect(result.file).toBeDefined();
}

async function getClosedTransactionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.closedLocs.Transaction[0] as ClosedLoc;
}

async function getClosedCollectionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.closedLocs.Collection[0] as ClosedCollectionLoc;
}

async function getVoidedTransactionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
    return locs.voidedLocs.Transaction[0] as VoidedLoc;
}

async function getVoidedCollectionLoc() {
    const sharedState = await buildSharedState();
    const locs = await LocsState.getInitialLocsState(sharedState);
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
