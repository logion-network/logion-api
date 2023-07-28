import { LogionNodeApiClass, UUID, FeesEstimator, Hash } from "@logion/node-api";
import { AxiosInstance, AxiosResponse } from "axios";
import { It, Mock } from "moq.ts";
import { HexString } from "@polkadot/util/types";

import {
    AccountTokens,
    CollectionItem,
    FetchParameters,
    LocData,
    PublicLocClient,
    SharedState,
    PublicApi,
    PublicLoc,
    HashString,
} from "../src/index.js";
import {
    ALICE,
    buildSimpleNodeApi,
    buildTestAuthenticatedSharedSate,
    ItIsUuid,
    LEGAL_OFFICERS,
    LOGION_CLIENT_CONFIG,
    REQUESTER
} from "./Utils.js";
import { TestConfigFactory } from "./TestConfigFactory.js";
import {
    buildCollectionItem,
    buildOffchainCollectionItem,
    EXISTING_FILE,
    EXISTING_ITEM_ID,
    ITEM_DESCRIPTION,
    EXISTING_ITEM_FILE,
    EXISTING_ITEM_FILE_HASH,
    mockGetLegalOfficerCase,
    mockLocBatchFactory,
    buildLocAndRequest
} from "./LocUtils.js";

describe("PublicApi", () => {

    it("finds LOC", async () => {
        const sharedState = await buildSharedState();
        const publicApi = new PublicApi({ sharedState });

        const publicLoc = await publicApi.findLocById({ locId: new UUID(LOC.request.id) });

        expect(publicLoc).toBeDefined();
        expect(publicLoc).toBeInstanceOf(PublicLoc);
    });

    it("finds collection item", async () => {
        const sharedState = await buildSharedState();
        const publicApi = new PublicApi({ sharedState });

        const item = await publicApi.findCollectionLocItemById({ locId: new UUID(LOC.request.id), itemId: EXISTING_ITEM_ID });

        expect(item).toBeDefined();
        expect(item).toBeInstanceOf(CollectionItem);
    });

    it("provides fees estimator", async () => {
        const sharedState = await buildSharedState();
        const publicApi = new PublicApi({ sharedState });

        const estimator = publicApi.fees;

        expect(estimator).toBeDefined();
    });
});

describe("PublicLoc", () => {

    it("finds file on check", async () => {
        const data = new Mock<LocData>();
        data.setup(instance => instance.files).returns([ {
            ...EXISTING_FILE,
            hash: Hash.fromHex(EXISTING_FILE.hash as HexString),
            published: true,
            size: BigInt(EXISTING_FILE.size),
            submitter: REQUESTER
        } ]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        const publicLoc = new PublicLoc({
            data: data.object(),
            client: client.object(),
        });

        const result = await publicLoc.checkHash(Hash.fromHex(EXISTING_FILE.hash as HexString));

        expect(result.file).toBeDefined();
    });

    it("finds item on check", async () => {
        const locId = new UUID(LOC.request.id);

        const data = new Mock<LocData>();
        data.setup(instance => instance.id).returns(locId);
        data.setup(instance => instance.locType).returns("Collection");
        data.setup(instance => instance.files).returns([]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        client.setup(instance => instance.getCollectionItem(It.Is<{ itemId: Hash } & FetchParameters>(args =>
            args.itemId.equalTo(EXISTING_ITEM_ID)
            && args.locId.toString() === locId.toString()
        ))).returnsAsync({
            addedOn: OFFCHAIN_COLLECTION_ITEM.addedOn,
            description: HashString.fromValue(ITEM_DESCRIPTION),
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
        const locId = new UUID(LOC.request.id);

        const data = new Mock<LocData>();
        data.setup(instance => instance.id).returns(locId);
        data.setup(instance => instance.locType).returns("Collection");
        data.setup(instance => instance.files).returns([]);
        data.setup(instance => instance.metadata).returns([]);

        const client = new Mock<PublicLocClient>();
        client.setup(instance => instance.getCollectionItem(It.Is<{ itemId: Hash } & FetchParameters>(args =>
            args.itemId.equalTo(EXISTING_ITEM_ID)
            && args.locId.toString() === locId.toString()
        ))).returnsAsync({
            addedOn: OFFCHAIN_COLLECTION_ITEM.addedOn,
            description: HashString.fromValue(ITEM_DESCRIPTION),
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

const LOC = buildLocAndRequest(ALICE.address, "CLOSED", "Collection");

const COLLECTION_ITEM = buildCollectionItem();
const OFFCHAIN_COLLECTION_ITEM = buildOffchainCollectionItem(LOC.request.id);

let aliceAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApiClass>;

async function buildSharedState(): Promise<SharedState> {
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultNetworkState();
            factory.setupDefaultFormDataFactory();
            factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            const axiosFactoryMock = factory.setupAxiosFactoryMock();

            aliceAxiosMock = new Mock<AxiosInstance>();
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ LOC.request.id }/public`)).returnsAsync({
                data: LOC.request
            } as AxiosResponse);
            aliceAxiosMock.setup(instance => instance.get(`/api/collection/${ LOC.request.id }/items/${ EXISTING_ITEM_ID.toHex() }`)).returnsAsync({
                data: OFFCHAIN_COLLECTION_ITEM
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(ALICE.node, undefined))
                .returns(aliceAxiosMock.object());

            nodeApiMock = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            nodeApiMock.setup(instance => instance.queries.getLegalOfficerCase).returns(mockGetLegalOfficerCase([LOC]));
            nodeApiMock.setup(instance => instance.batch.locs).returns(mockLocBatchFactory([LOC]));

            nodeApiMock.setup(instance => instance.queries.getCollectionItem(ItIsUuid(new UUID(LOC.request.id)), EXISTING_ITEM_ID))
                .returnsAsync(COLLECTION_ITEM);

            const feesEstimator = new Mock<FeesEstimator>();
            nodeApiMock.setup(instance => instance.fees).returns(feesEstimator.object());
        },
        undefined,
        LEGAL_OFFICERS,
        new AccountTokens(buildSimpleNodeApi(), {}),
    );
}
