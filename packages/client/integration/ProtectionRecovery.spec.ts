import { buildApi } from '@logion/node-api';
import { Keyring } from '@polkadot/api';
import { UUID } from '@logion/node-api/dist/UUID';

import { LogionClient } from '../src/';
import { AxiosFactory } from '../src/AxiosFactory';
import { AcceptedProtection, ActiveProtection, NoProtection } from '../src/Recovery';
import { LogionClientConfig } from '../src/SharedClient';
import { KeyringSigner, FullSigner, Signer } from '../src/Signer';
import { LegalOfficer } from '../src/Types';

import { ALICE, BOB } from '../test/Utils';
import { ProtectionRequest } from '../src/RecoveryClient';

describe("Recovery SDK", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    it("enables protection", async () => {
        const config = {
            directoryEndpoint: "http://localhost:8090",
            rpcEndpoints: [ 'ws://localhost:9944', 'ws://localhost:9945' ]
        };
        const client = await LogionClient.create(config);
        const signer = buildSigner();

        await initRequesterBalance(config, signer);

        const authenticatedClient = await client.authenticate([ REQUESTER_ADDRESS ], signer);

        const legalOfficers = await client.getLegalOfficers();
        const alice = legalOfficers.find(legalOfficer => legalOfficer.address === ALICE.address)!;
        const bob = legalOfficers.find(legalOfficer => legalOfficer.address === BOB.address)!;

        const noProtection = await authenticatedClient.protectionState() as NoProtection;
        const pending = await noProtection.requestProtection({
            legalOfficer1: alice,
            legalOfficer2: bob,
            userIdentity: {
                email: "john.doe@invalid.domain",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "+1234",
            },
            postalAddress: {
                city: "",
                country: "",
                line1: "",
                line2: "",
                postalCode: "",
            }
        });

        await acceptRequest(config, client, signer, alice);
        await acceptRequest(config, client, signer, bob);

        const accepted = (await pending.refresh()) as AcceptedProtection;
        let activate = await accepted.activate(signer);

        expect(activate).toBeInstanceOf(ActiveProtection);
    });
});

function buildSigner(): FullSigner {
    const keyring = new Keyring({ type: 'sr25519' });
    keyring.addFromUri(REQUESTER_SECRET_SEED);
    keyring.addFromUri(ALICE_SECRET_SEED);
    keyring.addFromUri(BOB_SECRET_SEED);
    return new KeyringSigner(keyring);
}

const REQUESTER_ADDRESS = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";
const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";
const ALICE_SECRET_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
const BOB_SECRET_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";

async function initRequesterBalance(config: LogionClientConfig, signer: Signer): Promise<void> {
    await transferTokens(config, signer, ALICE.address, REQUESTER_ADDRESS, 1000000000);
}

async function acceptRequest(
    config: LogionClientConfig,
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
) {
    const legalOfficerAddress = legalOfficer.address;
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer);

    const response = await axios.put("/api/protection-request", {});
    const request: ProtectionRequest = response.data.requests[0];

    const identityLocId = await createAndCloseIdentityLoc(
        config,
        signer,
        legalOfficerAddress,
        request.requesterAddress
    );

    await axios.post(`/api/protection-request/${request.id}/accept`, {
        locId: identityLocId.toString()
    });
}

async function buildLegalOfficerAxios(
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
) {
    const authenticatedClient = await client.authenticate([ legalOfficer.address ], signer);
    const token = authenticatedClient.tokens.get(legalOfficer.address)!;
    const axiosFactory = new AxiosFactory();
    return axiosFactory.buildAxiosInstance(legalOfficer.node, token.value);
}

async function createAndCloseIdentityLoc(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficerAddress: string,
    requesterAddress: string
): Promise<UUID> {
    const api = await buildApi(config.rpcEndpoints);
    const identityLocId = new UUID();
    await signer.signAndSend({
        signerId: legalOfficerAddress,
        submittable: api.tx.logionLoc.createPolkadotIdentityLoc(identityLocId.toDecimalString(), requesterAddress)
    });
    await signer.signAndSend({
        signerId: legalOfficerAddress,
        submittable: api.tx.logionLoc.close(identityLocId.toDecimalString())
    });
    return identityLocId;
}

async function transferTokens(config: LogionClientConfig, signer: Signer, source: string, destination: string, amount: number) {
    const api = await buildApi(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: source,
        submittable: api.tx.balances.transfer(destination, amount)
    });
}
