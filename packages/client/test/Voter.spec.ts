import { LogionNodeApi, UUID } from "@logion/node-api";
import { AxiosInstance, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { Mock } from "moq.ts";
import {
    AccountTokens,
    SharedState,
    VoterApi,
    LogionClient,
    ReadOnlyLocState,
} from "../src/index.js";
import {
    ALICE,
    buildTestAuthenticatedSharedSate,
    LEGAL_OFFICERS,
    LOGION_CLIENT_CONFIG,
} from "./Utils.js";
import { TestConfigFactory } from "./TestConfigFactory.js";
import {
    buildLoc,
    buildLocRequest,
} from "./LocUtils.js";

describe("VoterApi", () => {

    it("finds LOC", async () => {
        const sharedState = await buildSharedState();
        const logionClient = new LogionClient(sharedState).useTokens(tokens).withCurrentAddress(ALICE.address);
        const voterApi = new VoterApi({ sharedState, logionClient });

        const readOnlyState = await voterApi.findLocById(new UUID(LOC_REQUEST.id));

        expect(readOnlyState).toBeDefined();
        expect(readOnlyState).toBeInstanceOf(ReadOnlyLocState);
    });
});

const LOC_REQUEST = buildLocRequest(ALICE.address, "CLOSED", "Identity");
const LOC = buildLoc(ALICE.address, "CLOSED", "Identity");

let aliceAxiosMock: Mock<AxiosInstance>;
let nodeApiMock: Mock<LogionNodeApi>;

const currentAddress = ALICE.address;
const token = "some-token";
const tokens = new AccountTokens({
    [ALICE.address]: {
        value: token,
        expirationDateTime: DateTime.now().plus({ hours: 1 })
    }
});

async function buildSharedState(): Promise<SharedState> {
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultNetworkState();
            factory.setupDefaultFormDataFactory();
            factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

            const axiosFactoryMock = factory.setupAxiosFactoryMock();

            aliceAxiosMock = new Mock<AxiosInstance>();
            aliceAxiosMock.setup(instance => instance.get(`/api/loc-request/${ LOC_REQUEST.id }`)).returnsAsync({
                data: LOC_REQUEST
            } as AxiosResponse);
            axiosFactoryMock.setup(instance => instance.buildAxiosInstance(ALICE.node, token))
                .returns(aliceAxiosMock.object());

            nodeApiMock = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            nodeApiMock.setup(instance => instance.query.logionLoc.locMap(new UUID(LOC_REQUEST.id).toHexString()))
                .returnsAsync(LOC);
        },
        currentAddress,
        LEGAL_OFFICERS,
        tokens,
    );
}
