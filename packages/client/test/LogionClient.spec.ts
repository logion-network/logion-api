import { DateTime } from 'luxon';
import { It, Mock } from 'moq.ts';
import { AuthenticationClient } from '../src/AuthenticationClient';

import { DirectoryClient } from '../src/DirectoryClient';
import { LogionClient } from '../src/LogionClient';
import { RawSigner } from '../src/Signer';
import { LegalOfficer } from '../src/Types';
import { ALICE, buildAliceTokens, buildTestConfig, DIRECTORY_ENDPOINT } from './Utils';


describe("LogionClient", () => {

    it("provides legal officers", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();

            const directoryClient = new Mock<DirectoryClient>();
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny()))
                .returns(directoryClient.object());
        });
        const client = LogionClient.create(config);

        const legalOfficers = await client.getLegalOfficers();

        expect(legalOfficers).toBe(clientLegalOfficers);
    });

    it("uses tokens", async () => {
        const clientLegalOfficers: LegalOfficer[] = [ ALICE ];
        const authenticatedDirectoryClient = new Mock<DirectoryClient>();
        const token = 'token';
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();

            const directoryClient = new Mock<DirectoryClient>();
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny()))
                .returns(directoryClient.object());

            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), token))
                .returns(authenticatedDirectoryClient.object());
        });
        const client = LogionClient.create(config);

        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));

        const authenticatedClient = await client.useTokens(tokens);

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

            const directoryClient = new Mock<DirectoryClient>();
            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve(clientLegalOfficers));
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny()))
                .returns(directoryClient.object());

            const authenticationClient = new Mock<AuthenticationClient>();
            authenticationClient.setup(instance => instance.authenticate(addresses, signer.object()))
                .returns(Promise.resolve(tokens));
            testConfigFactory.setupComponentFactory(instance => instance.buildAuthenticationClient(DIRECTORY_ENDPOINT, clientLegalOfficers, It.IsAny()))
                .returns(authenticationClient.object());
            const authenticatedDirectoryClient = new Mock<DirectoryClient>();
            testConfigFactory.setupComponentFactory(instance => instance.buildDirectoryClient(DIRECTORY_ENDPOINT, It.IsAny(), token))
                .returns(authenticatedDirectoryClient.object());
        });
        const client = LogionClient.create(config);

        const authenticatedClient = await client.authenticate(addresses, signer.object());

        expect(authenticatedClient.tokens).toBe(tokens);
    });
});
