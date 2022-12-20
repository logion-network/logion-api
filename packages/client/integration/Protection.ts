import { buildApi, UUID } from '@logion/node-api';

import {
    LogionClient,
    AxiosFactory,
    AcceptedProtection,
    ActiveProtection,
    NoProtection,
    PendingRecovery,
    RejectedProtection,
    PendingProtection,
    LogionClientConfig,
    FullSigner,
    LegalOfficer,
    ProtectionRequest
} from '../src/index.js';
import { initRequesterBalance, REQUESTER_ADDRESS, State, TEST_LOGION_CLIENT_CONFIG } from "./Utils.js";

export async function enablesProtection(state: State) {
    const activate = await enableProtection(REQUESTER_ADDRESS, state);
    expect(activate).toBeInstanceOf(ActiveProtection);
}

export async function requestsProtectionAndCancel(state: State) {
    const cancelled = await requestProtectionAndCancel(REQUESTER_ADDRESS, state)
    expect(cancelled).toBeInstanceOf(NoProtection);
}

async function requestProtectionAndCancel(requester: string, state: State): Promise<NoProtection> {
    const { client, signer, alice, bob } = state;

    const pending = await requestProtection(requester, state);

    console.log("LO's - Alice and Bob Rejecting")
    await rejectRequest(client, signer, bob, requester, "Your protection request is not complete");
    await rejectRequest(client, signer, alice, requester, "Some info is missing");

    const rejected = await pending.refresh() as RejectedProtection;

    return rejected.cancel();
}

async function requestProtection(requester: string, state: State): Promise<PendingProtection> {
    const { client, signer, alice, bob } = state;

    console.log("Setting balance of %s", requester)
    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, requester);

    const authenticatedClient = client.withCurrentAddress(requester);

    console.log("Requesting protection")
    const noProtection = await authenticatedClient.protectionState() as NoProtection;
    return await noProtection.requestProtection({
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
}

async function enableProtection(requester: string, state: State): Promise<ActiveProtection | PendingRecovery | undefined> {
    const { client, signer, alice, bob, charlie } = state;

    const pending = await requestProtection(requester, state);

    console.log("LO's - Bob Rejecting")
    await rejectRequest(client, signer, bob, requester, "I dont speak your language");

    console.log("User changing LO: Charlie instead of Bob");
    const rejected = (await pending.refresh()) as RejectedProtection;
    const pendingAgain = await rejected.changeLegalOfficer(bob, charlie);

    console.log("LO's - Alice Rejecting")
    await rejectRequest(client, signer, alice, requester, "Some info is missing");

    console.log("User resubmitting to Alice");
    const rejectedAgain = (await pendingAgain.refresh()) as RejectedProtection;
    const stillPending = await rejectedAgain.resubmit(alice);

    console.log("LO's - Accepting")
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, alice, requester);
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, charlie, requester);

    const accepted = (await stillPending.refresh()) as AcceptedProtection;
    console.log("Activating")
    return accepted.activate(signer);
}

export async function rejectRequest(
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    requesterAddress: string,
    reason: string,
) {
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer);

    const response = await axios.put("/api/protection-request",{
        legalOfficerAddress: legalOfficer.address,
        statuses: ["PENDING"],
        requesterAddress
    });
    const request: ProtectionRequest = response.data.requests[0];

    await axios.post(`/api/protection-request/${request.id}/reject`, {
        reason
    });
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

    const response = await axios.put("/api/protection-request", {
        legalOfficerAddress: legalOfficer.address,
        statuses: ["PENDING"],
        requesterAddress
    });
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
