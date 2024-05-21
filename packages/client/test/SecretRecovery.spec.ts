import { LogionClient, LegalOfficerClass, PostalAddress, UserIdentity, } from "../src/index.js";
import { buildTestConfig, LOGION_CLIENT_CONFIG, ALICE } from "./Utils.js";
import { buildLocAndRequest } from "./LocUtils.js";
import { UUID } from "@logion/node-api";
import { Mock, It, Times } from "moq.ts";
import { AxiosInstance, AxiosResponse } from "axios";

describe("SecretRecovery", () => {

    it("requests a Secret recovery", async () => {

        const identityLoc = buildLocAndRequest(ALICE.account, "CLOSED", "Identity");
        const locId = new UUID(identityLoc.request.id);
        const axios = new Mock<AxiosInstance>();

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultNetworkState();
            const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
            axiosFactory.setup(instance => instance.buildAxiosInstance(It.IsAny<string>(), It.IsAny()))
                .returns(axios.object());
            setupBackend(axios, locId);
            const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([
                new LegalOfficerClass({
                    legalOfficer: ALICE,
                    axiosFactory: axiosFactory.object(),
                })
            ]));

            nodeApi.setup(instance => instance.queries.getLegalOfficerCase(locId))
                .returns(Promise.resolve(identityLoc.loc));
        })

        const client = await LogionClient.create(config);
        await client.secretRecovery.createSecretRecoveryRequest({
            requesterIdentityLocId: locId,
            secretName: "secret-name",
            challenge: "my-personal-challenge",
            userIdentity: {} as UserIdentity,
            userPostalAddress: {} as PostalAddress,
        })
        axios.verify(instance => instance.post("/api/secret-recovery", It.IsAny()), Times.Once());
    })
})

function setupBackend(axios: Mock<AxiosInstance>, locId: UUID) {
    const response = new Mock<AxiosResponse<any>>();
    axios.setup(instance => instance.post("/api/secret-recovery", It.Is<{ requesterIdentityLocId: string, secretName: string, challenge: string }>(body =>
        body.requesterIdentityLocId === locId.toString() &&
        body.secretName === "secret-name" &&
        body.challenge === "my-personal-challenge",
    )))
        .returns(Promise.resolve(response.object()))
}

