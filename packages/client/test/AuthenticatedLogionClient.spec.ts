import { DateTime } from "luxon";
import { It, Mock, Times } from "moq.ts";

import { ALICE, BOB, buildAliceAndBobTokens, buildAliceTokens, buildSharedStateUsingTestConfig, buildTestSharedSate, DIRECTORY_ENDPOINT, LOGION_CLIENT_CONFIG } from "./Utils";
import { AuthenticatedLogionClient } from "../src/AuthenticatedLogionClient";
import { AuthenticationClient } from "../src/AuthenticationClient";
import { LegalOfficer } from "../src/Types";
import { DirectoryClient } from "../src/DirectoryClient";
import { TestConfigFactory } from "./TestConfigFactory";

describe("AuthenticatedLogionClient", () => {

    it("refreshes tokens", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        const authenticationClient = new Mock<AuthenticationClient>();
        const sharedState = buildTestSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();

            const authenticatedDirectoryClient = new Mock<DirectoryClient>();
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(ALICE.address)!.value))
                .returns(authenticatedDirectoryClient.object());

            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
            testConfigFactory.setupComponentFactory(instance => instance.buildAuthenticationClient(DIRECTORY_ENDPOINT, legalOfficers, It.IsAny()))
                .returns(authenticationClient.object());
        });
        const client = new AuthenticatedLogionClient({
            sharedState,
            tokens,
            currentAddress: ALICE.address,
            legalOfficers,
        });

        await client.refreshTokens();

        authenticationClient.verify(instance => instance.refresh(tokens), Times.Once());
    });

    it("changes current address", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceAndBobTokens(DateTime.now().plus({hours: 1}));
        const testConfigFactory = new TestConfigFactory();

        testConfigFactory.setupDefaultAxiosInstanceFactory();

        const authenticatedDirectoryClient = new Mock<DirectoryClient>();
        testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(ALICE.address)!.value))
            .returns(authenticatedDirectoryClient.object());
        testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(BOB.address)!.value))
            .returns(authenticatedDirectoryClient.object());

        const config = testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
        const sharedState = buildSharedStateUsingTestConfig(config);
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

    it("logs out", () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        const authenticationClient = new Mock<AuthenticationClient>();
        const sharedState = buildTestSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();

            const authenticatedDirectoryClient = new Mock<DirectoryClient>();
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(ALICE.address)!.value))
                .returns(authenticatedDirectoryClient.object());

            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
            testConfigFactory.setupComponentFactory(instance => instance.buildAuthenticationClient(DIRECTORY_ENDPOINT, legalOfficers, It.IsAny()))
                .returns(authenticationClient.object());
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
