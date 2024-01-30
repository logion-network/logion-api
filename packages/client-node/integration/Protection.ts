import { buildApiClass, UUID, ValidAccountId } from '@logion/node-api';

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
    ProtectionRequest,
    PendingRequest,
    AcceptedRequest,
    OpenLoc,
    waitFor
} from '@logion/client';
import { initRequesterBalance, State, TEST_LOGION_CLIENT_CONFIG } from "./Utils.js";
import { ClosedLoc } from "@logion/client/dist/Loc";
import { LegalOfficerClass } from "@logion/client/dist/Types";

interface IdentityLocs {
    alice: UUID,
    bob: UUID,
}

export async function requestValidIdentity(state: State): Promise<IdentityLocs> {
    const { alice, aliceAccount, bob, bobAccount } = state
    const idByAlice = await createsIdentityLoc(state, alice, aliceAccount);
    const idByBob = await createsIdentityLoc(state, bob, bobAccount);
    return { alice: idByAlice.data().id, bob: idByBob.data().id }
}

export async function enablesProtection(state: State, identityLocs: IdentityLocs) {
    const activate = await enableProtection(state, identityLocs);
    expect(activate).toBeInstanceOf(ActiveProtection);
}

export async function requestsProtectionAndCancel(state: State, identityLocs: IdentityLocs) {
    const cancelled = await requestProtectionAndCancel(state, identityLocs);
    expect(cancelled).toBeInstanceOf(NoProtection);
}

async function requestProtectionAndCancel(state: State, identityLocs: IdentityLocs): Promise<NoProtection> {
    const { client, signer, alice, aliceAccount, bob, bobAccount, requesterAccount } = state;

    const pending = await requestProtection(state, identityLocs);

    console.log("LO's - Alice and Bob Rejecting")
    await rejectRequest(client, signer, bob, bobAccount, requesterAccount.address, "Your protection request is not complete");
    await rejectRequest(client, signer, alice, aliceAccount, requesterAccount.address, "Some info is missing");

    const maybeRejected = await pending.refresh();
    if (maybeRejected instanceof RejectedProtection) {
        return maybeRejected.cancel();
    } else {
        throw new Error("Unexpected state, aborting");
    }
}

async function requestProtection(state: State, identityLocs: IdentityLocs): Promise<PendingProtection> {
    const { client, alice, bob, requesterAccount } = state;

    const authenticatedClient = client.withCurrentAddress(requesterAccount);

    console.log("Requesting protection")
    const current = await authenticatedClient.protectionState();
    expect(current).toBeInstanceOf(NoProtection);

    if (current instanceof NoProtection) {
        return await current.requestProtection({
            legalOfficer1: authenticatedClient.getLegalOfficer(alice.address),
            legalOfficer2: authenticatedClient.getLegalOfficer(bob.address),
            requesterIdentityLoc1: identityLocs.alice,
            requesterIdentityLoc2: identityLocs.bob,
        });
    } else {
        throw new Error("Unexpected state, aborting");
    }
}

async function createsIdentityLoc(state: State, legalOfficer: LegalOfficerClass, legalOfficerAccount: ValidAccountId): Promise<ClosedLoc> {
    const { client, signer, requesterAccount } = state;
    console.log("Setting balance of %s", requesterAccount.address)
    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, requesterAccount.address);

    const authenticatedClient = client.withCurrentAddress(requesterAccount);
    const locsState = await authenticatedClient.locsState();

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficerAddress: legalOfficer.address,
        description: "Identity LOC",
        draft: false,
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            city: "",
            country: "",
            line1: "",
            line2: "",
            postalCode: "",
        }
    });

    const identityLocId = pendingRequest.data().id;

    // LLO Accepts
    const lloClient = state.client.withCurrentAddress(legalOfficerAccount);
    let lloLocs = await lloClient.locsState({ spec: { ownerAddress: legalOfficerAccount.address, locTypes: ["Identity"], statuses: ["REVIEW_PENDING"] } });
    const lloPending = lloLocs.findById(identityLocId) as PendingRequest;
    const lloAccepted = await lloPending.legalOfficer.accept();

    // User Opens
    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    await acceptedIdentityLoc.open({ signer, autoPublish: false });

    // LLO Closes
    let lloOpen = await lloAccepted.refresh() as OpenLoc;
    lloOpen = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : lloOpen.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    return await lloOpen.legalOfficer.close({ signer, autoAck: false }) as ClosedLoc;
}

async function enableProtection(state: State, identityLocs: IdentityLocs): Promise<ActiveProtection | PendingRecovery | undefined> {
    const { client, signer, alice, aliceAccount, bob, bobAccount, charlie, charlieAccount, requesterAccount } = state;
    const requester = requesterAccount.address;
    const pending = await requestProtection(state, identityLocs);

    console.log("LO's - Bob Rejecting")
    await rejectRequest(client, signer, bob, bobAccount, requester, "I dont speak your language");

    console.log("User changing LO: Charlie instead of Bob");
    const rejected = (await pending.refresh()) as RejectedProtection;
    const pendingAgain = await rejected.changeLegalOfficer(bob, charlie);

    console.log("LO's - Alice Rejecting")
    await rejectRequest(client, signer, alice, aliceAccount, requester, "Some info is missing");

    console.log("User resubmitting to Alice");
    const rejectedAgain = (await pendingAgain.refresh()) as RejectedProtection;
    const stillPending = await rejectedAgain.resubmit(alice);

    console.log("LO's - Accepting")
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, alice, aliceAccount, requester);
    await acceptRequest(TEST_LOGION_CLIENT_CONFIG, client, signer, charlie, charlieAccount, requester);

    const accepted = (await stillPending.refresh()) as AcceptedProtection;
    console.log("Activating")
    return accepted.activate({ signer });
}

export async function rejectRequest(
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    legalOfficerAccount: ValidAccountId,
    requesterAddress: string,
    reason: string,
) {
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer, legalOfficerAccount);

    const response = await axios.put("/api/protection-request", {
        legalOfficerAddress: legalOfficer.address,
        statuses: [ "PENDING" ],
        requesterAddress
    });
    const request: ProtectionRequest = response.data.requests[0];

    await axios.post(`/api/protection-request/${ request.id }/reject`, {
        reason
    });
}

export async function acceptRequest(
    config: LogionClientConfig,
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    legalOfficerAccount: ValidAccountId,
    requesterAddress: string,
) {
    const legalOfficerAddress = legalOfficer.address;
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer, legalOfficerAccount);

    const response = await axios.put("/api/protection-request", {
        legalOfficerAddress: legalOfficer.address,
        statuses: [ "PENDING" ],
        requesterAddress
    });
    const request: ProtectionRequest = response.data.requests[0];

    const identityLocId = await createAndCloseIdentityLoc(
        config,
        signer,
        legalOfficerAddress,
        request.requesterAddress
    );

    await axios.post(`/api/protection-request/${ request.id }/accept`, {
        locId: identityLocId.toString()
    });
}

async function buildLegalOfficerAxios(
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    legalOfficerAccount: ValidAccountId,
) {
    const authenticatedClient = await client.authenticate([ legalOfficerAccount ], signer);
    const token = authenticatedClient.tokens.get(legalOfficerAccount)!;
    const axiosFactory = new AxiosFactory();
    return axiosFactory.buildAxiosInstance(legalOfficer.node, token.value);
}

async function createAndCloseIdentityLoc(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficerAddress: string,
    requesterAddress: string
): Promise<UUID> {
    const api = await buildApiClass(config.rpcEndpoints);
    const identityLocId = new UUID();
    await signer.signAndSend({
        signerId: requesterAddress,
        submittable: api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
            api.adapters.toLocId(identityLocId),
            legalOfficerAddress,
            api.fees.getDefaultLegalFee({ locType: "Identity" }).canonical,
            {
                metadata: [],
                files: [],
                links: [],
            }
        )
    });
    await signer.signAndSend({
        signerId: legalOfficerAddress,
        submittable: api.polkadot.tx.logionLoc.close(api.adapters.toLocId(identityLocId), null, false)
    });
    return identityLocId;
}
