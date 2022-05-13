import { buildApi } from '@logion/node-api';
import { UUID } from '@logion/node-api/dist/UUID';

import { LogionClient } from '../src/';
import { AxiosFactory } from '../src/AxiosFactory';
import { AcceptedProtection, ActiveProtection, NoProtection, PendingRecovery } from '../src/Recovery';
import { LogionClientConfig } from '../src/SharedClient';
import { FullSigner, Signer } from '../src/Signer';
import { LegalOfficer } from '../src/Types';

import { ALICE, BOB } from '../test/Utils';
import { ProtectionRequest } from '../src/RecoveryClient';
import { PrefixedNumber, ATTO } from "@logion/node-api/dist/numbers";
import { ALICE_SECRET_SEED, BOB_SECRET_SEED, buildSigner, TEST_LOGION_CLIENT_CONFIG } from "./Utils";

describe("Recovery SDK", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    let signer: FullSigner;
    let client: LogionClient;
    let alice: LegalOfficer
    let bob: LegalOfficer;
    const config = TEST_LOGION_CLIENT_CONFIG

    beforeAll(async () => {
        client = await LogionClient.create(config);
        signer = buildSigner([
            REQUESTER_SECRET_SEED,
            LOST_SECRET_SEED,
            NEW_SECRET_SEED,
            ALICE_SECRET_SEED,
            BOB_SECRET_SEED,
        ]);
        const legalOfficers = client.getLegalOfficers();
        alice = legalOfficers.find(legalOfficer => legalOfficer.address === ALICE.address)!;
        bob = legalOfficers.find(legalOfficer => legalOfficer.address === BOB.address)!;
    })

    it("enables protection", async () => {

        const activate = await enableProtection(REQUESTER_ADDRESS)
        expect(activate).toBeInstanceOf(ActiveProtection);
    });

    async function enableProtection(requester: string): Promise<ActiveProtection | PendingRecovery> {

        console.log("Setting balance of %s", requester)
        await initRequesterBalance(config, signer, requester);

        const authenticatedClient = await client.authenticate([ requester ], signer);

        console.log("Requesting protection")
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

        console.log("LO's - Accepting")
        await acceptRequest(config, client, signer, alice, requester);
        await acceptRequest(config, client, signer, bob, requester);

        const accepted = (await pending.refresh()) as AcceptedProtection;
        console.log("Activating")
        return accepted.activate(signer);
    }

    it("recovers a lost account", async () => {

        // Given that user had previously protected it's (now lost) account
        await enableProtection(LOST_ADDRESS)
        await initRequesterBalance(config, signer, NEW_ADDRESS);

        const authenticatedClient = await client.authenticate([ NEW_ADDRESS ], signer);

        const noProtection = await authenticatedClient.protectionState() as NoProtection;

        console.log("Requesting recovery")
        const pending = await noProtection.requestRecovery({
            recoveredAddress: LOST_ADDRESS,
            signer,
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

        console.log("LO's - Accepting and vouching")
        await acceptRequestAndVouch(config, client, signer, alice, LOST_ADDRESS, NEW_ADDRESS);
        await acceptRequestAndVouch(config, client, signer, bob, LOST_ADDRESS, NEW_ADDRESS);

        const accepted = (await pending.refresh()) as AcceptedProtection;

        console.log("Activating")
        const pendingRecovery = await accepted.activate(signer) as PendingRecovery;

        console.log("Claiming")
        const claimed = await pendingRecovery.claimRecovery(signer);
        await claimed.transferRecoveredAccount(signer, {
            destination: NEW_ADDRESS,
            amount: new PrefixedNumber("800000000", ATTO)
        })
    })
});

const REQUESTER_ADDRESS = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";
const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";
const LOST_ADDRESS = "5Dq1HJYRo78vHbragE38iQEcxjJNcB5zSQfEhn8ECYHnQk7W";
const LOST_SECRET_SEED = "session crane fabric person monitor enrich speak motor snap floor face harvest"
const NEW_ADDRESS = "5FWP7ha7wBpRomanrgCFuV8c7gBTsyexzWZR42umqGv8Rpx4";
const NEW_SECRET_SEED = "inquiry nose frog devote demand main front caution excess bridge mom voice";

async function initRequesterBalance(config: LogionClientConfig, signer: Signer, requester: string): Promise<void> {
    await transferTokens(config, signer, ALICE.address, requester, 1000000000);
}

async function acceptRequest(
    config: LogionClientConfig,
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    requesterAddress: string,
) {
    const legalOfficerAddress = legalOfficer.address;
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer);

    const response = await axios.put("/api/protection-request", { requesterAddress });
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

async function acceptRequestAndVouch(
    config: LogionClientConfig,
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    lostAddress: string,
    requesterAddress: string,
) {
    await acceptRequest(config, client, signer, legalOfficer, requesterAddress)
    await vouchRecovery(config, signer, legalOfficer, lostAddress, requesterAddress)
}

async function vouchRecovery(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficerAddress: LegalOfficer,
    lost: string,
    rescuer: string,
): Promise<void> {
    const api = await buildApi(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: legalOfficerAddress.address,
        submittable: api.tx.recovery.vouchRecovery(lost, rescuer)
    })
}
