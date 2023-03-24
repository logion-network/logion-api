import { LogionNodeApi, UUID } from "@logion/node-api";
import { AxiosInstance, AxiosResponse } from "axios";
import { It, Mock } from "moq.ts";

import {
    AccountTokens,
    CollectionItem,
    FetchParameters,
    LocData,
    PublicLocClient,
    SharedState,
    PublicApi,
    PublicLoc
} from "../src/index.js";
import {
    ALICE,
    buildTestAuthenticatedSharedSate,
    LEGAL_OFFICERS,
    LOGION_CLIENT_CONFIG,
    mockEmptyOption
} from "./Utils.js";
import { TestConfigFactory } from "./TestConfigFactory.js";
import {
    buildCollectionItem,
    buildLoc,
    buildLocRequest,
    buildOffchainCollectionItem,
    EXISTING_FILE,
    EXISTING_ITEM_ID,
    ITEM_DESCRIPTION,
    EXISTING_ITEM_FILE,
    EXISTING_ITEM_FILE_HASH
} from "./LocUtils.js";

describe("PublicApi", () => {

    it("finds LOC", async () => {
        const sharedState = await buildSharedState();
        const publicApi = new PublicApi({ sharedState });

        const publicLoc = await publicApi.findLocById({ locId: new UUID(LOC_REQUEST.id) });

        expect(publicLoc).toBeDefined();
        expect(publicLoc).toBeInstanceOf(PublicLoc);
    });

    it("finds collection item", async () => {
        const sharedState = await buildSharedState();
        const publicApi = new PublicApi({ sharedState });

        const item = await publicApi.findCollectionLocItemById({ locId: new UUID(LOC_REQUEST.id), itemId: EXISTING_ITEM_ID });

        expect(item).toBeDefined();
        expect(item).toBeInstanceOf(CollectionItem);
    });
});

describe("PublicLoc", () => {

    it("finds file on check", async () => {
        const data = new Mock<LocData>();
        data.setup(instance => instance.files).returns([ { ...EXISTING_FILE, published: true, size: BigInt(EXISTING_FILE.size) } ]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        const publicLoc = new PublicLoc({
            data: data.object(),
            client: client.object(),
        });

        const result = await publicLoc.checkHash(EXISTING_FILE.hash);

        expect(result.file).toBeDefined();
    });

    it("finds item on check", async () => {
        const locId = new UUID(LOC_REQUEST.id);

        const data = new Mock<LocData>();
        data.setup(instance => instance.id).returns(locId);
        data.setup(instance => instance.locType).returns("Collection");
        data.setup(instance => instance.files).returns([]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        client.setup(instance => instance.getCollectionItem(It.Is<{ itemId: string } & FetchParameters>(args =>
            args.itemId === EXISTING_ITEM_ID
            && args.locId.toString() === locId.toString()
        ))).returnsAsync({
            addedOn: OFFCHAIN_COLLECTION_ITEM.addedOn,
            description: ITEM_DESCRIPTION,
            files: [],
            id: EXISTING_ITEM_ID,
            restrictedDelivery: false,
            termsAndConditions: [],
        });

        const publicLoc = new PublicLoc({
            data: data.object(),
            client: client.object(),
        });

        const result = await publicLoc.checkHash(EXISTING_ITEM_ID);

        expect(result.collectionItem).toBeDefined();
    });

    it("finds item file on check", async () => {
        const locId = new UUID(LOC_REQUEST.id);

        const data = new Mock<LocData>();
        data.setup(instance => instance.id).returns(locId);
        data.setup(instance => instance.locType).returns("Collection");
        data.setup(instance => instance.files).returns([]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        client.setup(instance => instance.getCollectionItem(It.Is<{ itemId: string } & FetchParameters>(args =>
            args.itemId === EXISTING_ITEM_ID
            && args.locId.toString() === locId.toString()
        ))).returnsAsync({
            addedOn: OFFCHAIN_COLLECTION_ITEM.addedOn,
            description: ITEM_DESCRIPTION,
            files: [ EXISTING_ITEM_FILE ],
            id: EXISTING_ITEM_ID,
            restrictedDelivery: false,
            termsAndConditions: [],
        });

        const publicLoc = new PublicLoc({
            data: data.object(),
            client: client.object(),
        });

        const result = await publicLoc.checkHash(EXISTING_ITEM_FILE_HASH, EXISTING_ITEM_ID);

        expect(result.collectionItemFile).toBeDefined();
    });
});

const LOC_REQUEST = buildLocRequest(ALICE.address, "CLOSED", "Collection");
const LOC = buildLoc(ALICE.address, "CLOSED", "Collection");

const COLLECTION_ITEM = buildCollectionItem();
const OFFCHAIN_COLLECTION_ITEM = buildOffchainCollectionItem(LOC_REQUEST.id);

let aliceAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApi>;

async function buildSharedState(): Promise<SharedState> {
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultNetworkState();
            factory.setupDefaultFormDataFactory();
            factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            const axiosFactoryMock = factory.setupAxiosFactoryMock();

            aliceAxiosMock = new Mock<AxiosInstance>();
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ LOC_REQUEST.id }/public`)).returnsAsync({
                data: LOC_REQUEST
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/collection/${ LOC_REQUEST.id }/items/${ EXISTING_ITEM_ID }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(ALICE.node, undefined))
                .returns(aliceAxiosMock.object());

            nodeApiMock = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(LOC_REQUEST.id).toHexString()))
                .returnsAsync(LOC);

            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(
                It.Is<UUID>(locId => locId.toString() !== LOC_REQUEST.id),
                It.Is<string>(itemId => itemId !== EXISTING_ITEM_ID
            )))
                .returnsAsync(mockEmptyOption());
            nodeApiMock.setup(instance => instance.query.logionLoc.collectionItemsMap(new UUID(LOC_REQUEST.id).toHexString(), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);
        },
        undefined,
        LEGAL_OFFICERS,
        new AccountTokens({}),
    );
}
