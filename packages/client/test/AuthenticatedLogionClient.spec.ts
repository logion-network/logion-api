import { DateTime } from "luxon";
import { It, Mock, Times } from "moq.ts";

import { ALICE, BOB, buildAliceAndBobTokens, buildAliceTokens, buildSharedStateUsingTestConfig, buildTestSharedSate, DIRECTORY_ENDPOINT, LOGION_CLIENT_CONFIG } from "./Utils";
import { AuthenticatedLogionClient } from "../src/AuthenticatedLogionClient";
import { AuthenticationClient } from "../src/AuthenticationClient";
import { LegalOfficer } from "../src/Types";
import { TestConfigFactory } from "./TestConfigFactory";

describe("AuthenticatedLogionClient", () => {

    it("refreshes tokens", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        let authenticationClient: Mock<AuthenticationClient>;
        const sharedState = await buildTestSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        });
        const client = new AuthenticatedLogionClient({
            sharedState,
            tokens,
            currentAddress: ALICE.address,
            legalOfficers,
        });

        await client.refreshTokens();

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Once());
    });

    it("changes current address", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceAndBobTokens(DateTime.now().plus({hours: 1}));
        const testConfigFactory = new TestConfigFactory();

        testConfigFactory.setupDefaultAxiosInstanceFactory();
        testConfigFactory.setupDefaultNetworkState();
        testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
        testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(BOB.address)!.value);
        testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);

        const config = testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
        const sharedState = await buildSharedStateUsingTestConfig(config);
        const aliceClient = new AuthenticatedLogionClient({
            sharedState,
            tokens,
            currentAddress: ALICE.address,
            legalOfficers,
        });

        const bobClient = aliceClient.withCurrentAddress(BOB.address);

        expect(bobClient.currentAddress).toBe(BOB.address);
        testConfigFactory.verifyComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(BOB.address)!.value));
    });

    it("logs out", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));

        const sharedState = await buildTestSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
            testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
        });
        const authenticatedClient = new AuthenticatedLogionClient({
            sharedState,
            tokens,
            currentAddress: ALICE.address,
            legalOfficers,
        });

        const client = authenticatedClient.logout();

        expect(client).toBeDefined();
    });
});
