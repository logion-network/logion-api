import { buildApi, UUID } from '@logion/node-api';

import { LogionClient } from '../src/';
import { AxiosFactory } from '../src/AxiosFactory';
import { AcceptedProtection, ActiveProtection, NoProtection, PendingRecovery } from '../src/Recovery';
import { LogionClientConfig } from '../src/SharedClient';
import { FullSigner } from '../src/Signer';
import { LegalOfficer } from '../src/Types';
import { ProtectionRequest } from '../src/RecoveryClient';
import { initRequesterBalance, REQUESTER_ADDRESS, State, TEST_LOGION_CLIENT_CONFIG } from "./Utils";

export async function enablesProtection(state: State) {
    const activate = await enableProtection(REQUESTER_ADDRESS, state);
    expect(activate).toBeInstanceOf(ActiveProtection);
}

async function enableProtection(requester: string, state: State): Promise<ActiveProtection | PendingRecovery> {
    const { client, signer, alice, bob } = state;

    console.log("Setting balance of %s", requester)
    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, requester);

    const authenticatedClient = client.withCurrentAddress(requester);

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
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, alice, requester);
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, bob, requester);

    const accepted = (await pending.refresh()) as AcceptedProtection;
    console.log("Activating")
    return accepted.activate(signer);
}

export async function acceptRequest(
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
