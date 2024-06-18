import { LogionClient, LegalOfficerClass, PostalAddress, UserIdentity, } from "../src/index.js";
import { buildTestConfig, LOGION_CLIENT_CONFIG, ALICE } from "./Utils.js";
import { buildLocAndRequest } from "./LocUtils.js";
import { UUID } from "@logion/node-api";
import { Mock, It, Times } from "moq.ts";
import { AxiosInstance, AxiosResponse } from "axios";

describe("SecretRecovery", () => {

    it("requests a Secret recovery", async () => {
        const { axios, config, locId } = configure();
        setupBackendForCreation(axios, locId);
        const client = await LogionClient.create(config);

        const id = await client.secretRecovery.createSecretRecoveryRequest({
            requesterIdentityLocId: locId,
            secretName: "secret-name",
            challenge: CHALLENGE,
            userIdentity: {} as UserIdentity,
            userPostalAddress: {} as PostalAddress,
        })

        expect(id).toBe(REQUEST_ID);
    })

    it("downloads a Secret value", async () => {
        const { axios, config, locId } = configure();
        setupBackendForDownload(axios, REQUEST_ID);
        const client = await LogionClient.create(config);

        const requestId = REQUEST_ID;
        const value = await client.secretRecovery.downloadSecret({
            requesterIdentityLocId: locId,
            requestId,
            challenge: CHALLENGE,
        });

        expect(value).toBe(SECRET_VALUE);
    })
})

function configure() {
    const identityLoc = buildLocAndRequest(ALICE.account, "CLOSED", "Identity");
    const locId = new UUID(identityLoc.request.id);

    const axios = new Mock<AxiosInstance>();
    const config = buildTestConfig(testConfigFactory => {
        testConfigFactory.setupDefaultNetworkState();
        const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
        axiosFactory.setup(instance => instance.buildAxiosInstance(It.IsAny<string>(), It.IsAny()))
            .returns(axios.object());
        const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        const legalOfficerClient = testConfigFactory.setupLegalOfficerClientMock();

        legalOfficerClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([
            new LegalOfficerClass({
                legalOfficer: ALICE,
                axiosFactory: axiosFactory.object(),
            })
        ]));

        nodeApi.setup(instance => instance.queries.getLegalOfficerCase(locId))
            .returns(Promise.resolve(identityLoc.loc));
    });
    return {
        config,
        locId,
        axios,
    };
}

function setupBackendForCreation(axios: Mock<AxiosInstance>, locId: UUID) {
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns({ id: REQUEST_ID });
    axios.setup(instance => instance.post("/api/secret-recovery", It.Is<{ requesterIdentityLocId: string, secretName: string, challenge: string }>(body =>
        body.requesterIdentityLocId === locId.toString() &&
        body.secretName === "secret-name" &&
        body.challenge === CHALLENGE,
    )))
        .returns(Promise.resolve(response.object()))
}

const CHALLENGE = "my-personal-challenge";

function setupBackendForDownload(axios: Mock<AxiosInstance>, requestId: string) {
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns({ value: SECRET_VALUE });
    axios.setup(instance => instance.put(`/api/secret-recovery/${ requestId }/download-secret`, It.Is<{ challenge: string }>(body =>
        body.challenge === "my-personal-challenge"
    )))
        .returns(Promise.resolve(response.object()))
}

const REQUEST_ID = "1f67ebed-0519-4bb3-80ab-60e4f5c6437e";
const SECRET_VALUE = "Secret value";
