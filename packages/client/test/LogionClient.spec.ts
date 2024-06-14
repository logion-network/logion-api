import { DateTime } from 'luxon';
import { It, Mock, Times } from 'moq.ts';
import { TestConfigFactory } from './TestConfigFactory.js';
import {
    AuthenticationClient,
    LogionClient,
    RawSigner,
    LegalOfficer
} from '../src/index.js';
import {
    ALICE,
    BOB,
    buildAliceAndBobTokens,
    buildAliceTokens,
    buildAuthenticatedSharedStateUsingTestConfig,
    buildTestAuthenticatedSharedSate,
    buildTestConfig,
    LOGION_CLIENT_CONFIG,
    buildSimpleNodeApi,
} from './Utils.js';
import { Hash, LogionNodeApiClass } from '@logion/node-api';

describe("LogionClient", () => {

    it("provides legal officers", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock();
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers)));
        });
        const client = await LogionClient.create(config);

        const legalOfficers = client.legalOfficers;

        expect(legalOfficers.length).toBe(1);
        expect(legalOfficers[0].account).toEqual(ALICE.account);
    });

    it("uses tokens", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        let api: Mock<LogionNodeApiClass>;
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            api = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock();
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers)));
            testConfigFactory.setupAuthenticatedDirectoryClientMock(token);
        });
        const client = await LogionClient.create(config);

        const tokens = buildAliceTokens(api!.object(), DateTime.now().plus({hours: 1}));

        const authenticatedClient = client.useTokens(tokens);

        expect(authenticatedClient.tokens).toBe(tokens);
    });

    it("authenticates", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        const addresses = [ ALICE.account ];
        const signer = new Mock<RawSigner>();
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);

            const directoryClient = testConfigFactory.setupDirectoryClientMock();
            const legalOfficerClasses = testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers);
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(legalOfficerClasses));

            const authenticationClient = testConfigFactory.setupAuthenticationClientMock(clientLegalOfficers);
            authenticationClient.setup(instance => instance.authenticate(addresses, signer.object()))
                .returns(Promise.resolve(tokens));

            testConfigFactory.setupAuthenticatedDirectoryClientMock(token);
        });
        const client = await LogionClient.create(config);

        const authenticatedClient = await client.authenticate(addresses, signer.object());

        expect(authenticatedClient.tokens).toEqual(jasmine.objectContaining({
            ...tokens
        }));
    });

    it("refreshes tokens", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        let authenticationClient: Mock<AuthenticationClient>;
        const alice = ALICE.account;
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({minutes: 10}));
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(tokens.get(alice)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        }, alice, legalOfficers, tokens);
        const client = new LogionClient({ ...sharedState });

        await client.refreshTokens(DateTime.now(), {minutes: 15});

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Once());
    });

    it("skips token refresh if earliest above threshold", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const alice = ALICE.account;
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));
        let authenticationClient: Mock<AuthenticationClient>;
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(tokens.get(alice)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        }, alice, legalOfficers, tokens);
        const client = new LogionClient({ ...sharedState });

        await client.refreshTokens(DateTime.now(), {minutes: 30});

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Never());
    });

    it("changes current address", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceAndBobTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));
        const testConfigFactory = new TestConfigFactory();

        testConfigFactory.setupDefaultAxiosInstanceFactory();
        testConfigFactory.setupDefaultNetworkState();
        const api = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        const alice = ALICE.account;
        testConfigFactory.setupAuthenticatedDirectoryClientMock(tokens.get(alice)!.value);
        const bob = BOB.account;
        testConfigFactory.setupAuthenticatedDirectoryClientMock(tokens.get(bob)!.value);

        const config = testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
        const sharedState = await buildAuthenticatedSharedStateUsingTestConfig(config, alice, legalOfficers, tokens);
        const aliceClient = new LogionClient({ ...sharedState });

        const bobClient = aliceClient.withCurrentAccount(bob);

        expect(bobClient.currentAccount).toBe(bob);
        testConfigFactory.verifyComponentFactory(instance => instance.buildDirectoryClient(api.object(), It.IsAny(), tokens.get(bob)!.value));
    });

    it("logs out", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));

        const alice = ALICE.account;
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(tokens.get(alice)!.value);
            testConfigFactory.setupAuthenticationClientMock(legalOfficers);
        }, alice, legalOfficers, tokens);
        const authenticatedClient = new LogionClient({ ...sharedState });

        const client = authenticatedClient.logout();

        expect(client).toBeDefined();
    });
});
