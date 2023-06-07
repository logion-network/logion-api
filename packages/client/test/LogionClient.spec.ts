import { DateTime } from 'luxon';
import { It, Mock, Times } from 'moq.ts';
import { TestConfigFactory } from './TestConfigFactory.js';
import {
    HashOrContent,
    ItemFileWithContent,
    MimeType,
    AuthenticationClient,
    LogionClient,
    RawSigner,
    LegalOfficer
} from '../src/index.js';
import {
    ALICE,
    BOB,
    DIRECTORY_ENDPOINT,
    buildAliceAndBobTokens,
    buildAliceTokens,
    buildAuthenticatedSharedStateUsingTestConfig,
    buildTestAuthenticatedSharedSate,
    buildTestConfig,
    LOGION_CLIENT_CONFIG,
    buildValidPolkadotAccountId,
    buildSimpleNodeApi
} from './Utils.js';
import { LogionNodeApiClass } from '@logion/node-api';

describe("LogionClient", () => {

    it("provides legal officers", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers)));
        });
        const client = await LogionClient.create(config);

        const legalOfficers = client.legalOfficers;

        expect(legalOfficers.length).toBe(1);
        expect(legalOfficers[0].address).toBe(ALICE.address);
    });

    it("uses tokens", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        let api: Mock<LogionNodeApiClass>;
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            api = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers)));
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);
        });
        const client = await LogionClient.create(config);

        const tokens = buildAliceTokens(api!.object(), DateTime.now().plus({hours: 1}));

        const authenticatedClient = client.useTokens(tokens);

        expect(authenticatedClient.tokens).toBe(tokens);
    });

    it("authenticates", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const token = 'token';
        const addresses = [ buildValidPolkadotAccountId(ALICE.address)! ];
        const signer = new Mock<RawSigner>();
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);

            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
            const legalOfficerClasses = testConfigFactory.buildLegalOfficerClasses(clientLegalOfficers);
            directoryClient.setup(instance => instance.getLegalOfficers())
                .returns(Promise.resolve(legalOfficerClasses));

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
        let authenticationClient: Mock<AuthenticationClient>;
        const alice = buildValidPolkadotAccountId(ALICE.address);
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({minutes: 10}));
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(alice)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
            authenticationClient.setup(instance => instance.refresh(tokens)).returns(Promise.resolve(tokens));
        }, alice, legalOfficers, tokens);
        const client = new LogionClient({ ...sharedState });

        await client.refreshTokens(DateTime.now(), {minutes: 15});

        authenticationClient!.verify(instance => instance.refresh(tokens), Times.Once());
    });

    it("skips token refresh if earliest above threshold", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const alice = buildValidPolkadotAccountId(ALICE.address);
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));
        let authenticationClient: Mock<AuthenticationClient>;
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(alice)!.value);
            authenticationClient = testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
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
        const alice = buildValidPolkadotAccountId(ALICE.address);
        testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(alice)!.value);
        const bob = buildValidPolkadotAccountId(BOB.address);
        testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(bob)!.value);

        const config = testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
        const sharedState = await buildAuthenticatedSharedStateUsingTestConfig(config, alice, legalOfficers, tokens);
        const aliceClient = new LogionClient({ ...sharedState });

        const bobClient = aliceClient.withCurrentAddress(bob);

        expect(bobClient.currentAddress).toBe(bob);
        testConfigFactory.verifyComponentFactory(instance => instance.buildDirectoryClient(api.object(), DIRECTORY_ENDPOINT, It.IsAny(), tokens.get(bob)!.value));
    });

    it("logs out", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const tokens = buildAliceTokens(buildSimpleNodeApi(), DateTime.now().plus({hours: 1}));

        const alice = buildValidPolkadotAccountId(ALICE.address);
        const sharedState = await buildTestAuthenticatedSharedSate(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            testConfigFactory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, tokens.get(alice)!.value);
            testConfigFactory.setupAuthenticationClientMock(LOGION_CLIENT_CONFIG, legalOfficers);
        }, alice, legalOfficers, tokens);
        const authenticatedClient = new LogionClient({ ...sharedState });

        const client = authenticatedClient.logout();

        expect(client).toBeDefined();
    });
});

describe("ItemFileWithContent", () => {

    it("can be created with file size and no content", async () => {
        const item = new ItemFileWithContent({
            name: "test.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: HashOrContent.fromHash("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"),
            size: 4n,
        });
        expect(item.name).toBe("test.txt");
        expect(item.contentType.mimeType).toBe("text/plain");
        expect(item.size).toBe(4n);
        expect(item.hashOrContent).toBeDefined();
    });

    it("detects file size with content", async () => {
        const item = new ItemFileWithContent({
            name: "test.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
        });
        await item.finalize();
        expect(item.size).toBe(4n);
    });

    it("accepts file size matching content", async () => {
        const item = new ItemFileWithContent({
            name: "test.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
            size: 4n,
        });
        await item.finalize();
        expect(item.size).toBe(4n);
    });

    it("fails at finalizing with file size not matching content", async () => {
        const item = new ItemFileWithContent({
            name: "test.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: HashOrContent.fromContent(Buffer.from("test")),
            size: 5n,
        });
        await expectAsync(item.finalize()).toBeRejected();
    });

    it("cannot be created with missing file size and no content", async () => {
        expect(() => new ItemFileWithContent({
            name: "test.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: HashOrContent.fromHash("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"),
        })).toThrow();
    });
});
