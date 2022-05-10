import { DateTime } from 'luxon';
import { Mock } from 'moq.ts';

import { LogionClient } from '../src/LogionClient';
import { RawSigner } from '../src/Signer';
import { LegalOfficer } from '../src/Types';
import { ALICE, buildAliceTokens, buildTestConfig, LOGION_CLIENT_CONFIG } from './Utils';

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

        const legalOfficers = await client.getLegalOfficers();

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

        expect(authenticatedClient.tokens).toBe(tokens);
    });
});
