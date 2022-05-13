import { DateTime } from 'luxon';
import { It, Mock, Times } from 'moq.ts';
import { AuthenticationClient } from '../src/AuthenticationClient';

import { LogionClient } from '../src/LogionClient';
import { RawSigner } from '../src/Signer';
import { LegalOfficer } from '../src/Types';
import { TestConfigFactory } from './TestConfigFactory';
import { ALICE, BOB, DIRECTORY_ENDPOINT, buildAliceAndBobTokens, buildAliceTokens, buildAuthenticatedSharedStateUsingTestConfig, buildTestAuthenticatedSharedSate, buildTestConfig, LOGION_CLIENT_CONFIG } from './Utils';

describe("LogionClient", () => {

    it("provides legal officers", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));
        });
        const client = await LogionClient.create(config);

        const legalOfficers = client.getLegalOfficers();

        expect(legalOfficers).toBe(clientLegalOfficers);
    });

    it("uses tokens", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);
        });
        const client = await LogionClient.create(config);

        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));

        const authenticatedClient = client.useTokens(tokens);

        expect(authenticatedClient.tokens).toBe(tokens);
    });

    it("authenticates", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        const addresses = [ ALICE.address ];
        const signer = new Mock<RawSigner>();
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);

            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));

            const authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, clientLegalOfficers);
            authenticationClient.setup(instance => instance.authenticate(addresses, signer.object()))
                .returns(Promise.resolve(tokens));

                testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);
        });
        const client = await LogionClient.create(config);

        const authenticatedClient = await client.authenticate(addresses, signer.object());

        expect(authenticatedClient.tokens).toEqual(jasmine.objectContaining({
            ...tokens
        }));
    });

    it("refreshes tokens", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({minutes: 10}));
        let authenticationClient: Mock<AuthenticationClient>;
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        }, ALICE.address, legalOfficers, tokens);
        const client = new LogionClient({ ...sharedState });

        await client.refreshTokens(DateTime.now(), {minutes: 15});

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Once());
    });

    it("skips token refresh if earliest above threshold", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        let authenticationClient: Mock<AuthenticationClient>;
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        }, ALICE.address, legalOfficers, tokens);
        const client = new LogionClient({ ...sharedState });

        await client.refreshTokens(DateTime.now(), {minutes: 30});

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Never());
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
        const sharedState = await buildAuthenticatedSharedStateUsingTestConfig(config, ALICE.address, legalOfficers, tokens);
        const aliceClient = new LogionClient({ ...sharedState });

        const bobClient = aliceClient.withCurrentAddress(BOB.address);

        expect(bobClient.currentAddress).toBe(BOB.address);
        testConfigFactory.verifyComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(BOB.address)!.value));
    });

    it("logs out", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));

        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(ALICE.address)!.value);
            testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
        }, ALICE.address, legalOfficers, tokens);
        const authenticatedClient = new LogionClient({ ...sharedState });

        const client = authenticatedClient.logout();

        expect(client).toBeDefined();
    });
});
