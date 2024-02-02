import { Lgnt, UUID, ValidAccountId, buildApiClass } from "@logion/node-api";

import {
    AcceptedProtection,
    FullSigner,
    LegalOfficer,
    LogionClient,
    NoProtection,
    PendingRecovery,
    PendingProtection,
    RejectedRecovery,
    LogionClientConfig,
    ClaimedRecovery,
    ProtectionRequest,
    AxiosFactory,
} from "@logion/client";
import { IdentityLocs } from "./Protection.js";
import { aliceAcceptsTransfer } from "./Vault.js";
import { initRequesterBalance, NEW_ADDRESS, REQUESTER_ADDRESS, State } from "./Utils.js";

export async function requestRecoveryAndCancel(state: State, identityLocs: IdentityLocs) {
    const { client, signer, alice, aliceAccount, charlie, charlieAccount } = state;

    const pending = await requestRecovery(state, identityLocs) as PendingProtection;

    console.log("LO's - Alice and Charlie Rejecting")
    await rejectRequest(client, signer, charlie, charlieAccount, NEW_ADDRESS, "Your protection request is not complete");
    await rejectRequest(client, signer, alice, aliceAccount, NEW_ADDRESS, "Some info is missing");

    const rejected = await pending.refresh() as RejectedRecovery;

    const cancelled = await rejected.cancel();
    expect(cancelled).toBeInstanceOf(NoProtection);
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

export async function requestRecoveryWithResubmit(state: State, identityLocs: IdentityLocs) {
    const { client, signer, alice, aliceAccount, charlie, charlieAccount } = state;

    const requested = await requestRecovery(state, identityLocs);

    console.log("LO's - Alice Rejecting")
    await rejectRequest(client, signer, alice, aliceAccount, NEW_ADDRESS, "for some reason");

    console.log("User resubmitting to Alice");
    const rejected = await requested.refresh() as RejectedRecovery;
    const pending = await rejected.resubmit(alice);

    console.log("LO's - Accepting and vouching")
    await acceptRequestAndVouch(client.config, client, signer, alice, aliceAccount, REQUESTER_ADDRESS, NEW_ADDRESS);
    await acceptRequestAndVouch(client.config, client, signer, charlie, charlieAccount, REQUESTER_ADDRESS, NEW_ADDRESS);

    console.log("Activating")
    const accepted = await pending.refresh() as AcceptedProtection;
    let pendingRecovery = await accepted.activate({ signer }) as PendingRecovery;
    pendingRecovery = await pendingRecovery.waitForFullyReady();

    console.log("Claiming")
    await pendingRecovery.claimRecovery({ signer });
}

export async function recoverLostVault(state: State) {
    const { signer, alice } = state;

    const claimed = await getClaimedRecovery(state);

    console.log("Transfer from recovered vault")
    const newVault = await claimed.vaultState();
    let recoveredVault = await claimed.recoveredVaultState();
    recoveredVault = await recoveredVault.createVaultTransferRequest({
        legalOfficer: alice,
        amount: Lgnt.fromCanonicalPrefixedNumber(recoveredVault.balances[0].available),
        destination: newVault.vaultAddress,
        signer,
    });
    const pendingRequest = recoveredVault.pendingVaultTransferRequests[0];

    console.log("Alice accepts transfer from recovered vault")
    await aliceAcceptsTransfer(state, pendingRequest, claimed);
}

async function getClaimedRecovery(state: State) {
    const { client, newAccount } = state;
    const authenticatedClient = client.withCurrentAddress(newAccount);
    const accepted = await authenticatedClient.protectionState() as ClaimedRecovery;
    expect(accepted).toBeInstanceOf(ClaimedRecovery);
    return accepted;
}

export async function recoverLostAccount(state: State) {
    const { signer } = state;

    const claimed = await getClaimedRecovery(state);

    console.log("Transfer from recovered account")
    const recoveredBalance = await claimed.recoveredBalanceState();
    await recoveredBalance.transferAll({
        signer,
        destination: NEW_ADDRESS,
        keepAlive: false,
    });
}

async function requestRecovery(state: State, identityLocs: IdentityLocs): Promise<PendingProtection> {
    const { client, signer, alice, charlie, newAccount } = state;

    await initRequesterBalance(client.config, signer, NEW_ADDRESS);

    const authenticatedClient = client.withCurrentAddress(newAccount);

    const current = await authenticatedClient.protectionState();
    expect(current).toBeInstanceOf(NoProtection);
    if(current instanceof NoProtection) {
        console.log("Requesting recovery")
        return await current.requestRecovery({
            payload: {
                recoveredAddress: REQUESTER_ADDRESS,
                legalOfficer1: authenticatedClient.getLegalOfficer(alice.address),
                legalOfficer2: authenticatedClient.getLegalOfficer(charlie.address),
                requesterIdentityLoc1: identityLocs.alice,
                requesterIdentityLoc2: identityLocs.charlie,
            },
            signer,
        });
    } else {
        throw new Error("Unexpected state, aborting");
    }
}

async function acceptRequestAndVouch(
    config: LogionClientConfig,
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    legalOfficerAccount: ValidAccountId,
    lostAddress: string,
    requesterAddress: string,
) {
    await acceptRequest(config, client, signer, legalOfficer, legalOfficerAccount, requesterAddress)
    await vouchRecovery(config, signer, legalOfficer, lostAddress, requesterAddress)
}

async function vouchRecovery(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficerAddress: LegalOfficer,
    lost: string,
    rescuer: string,
): Promise<void> {
    const api = await buildApiClass(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: legalOfficerAddress.address,
        submittable: api.polkadot.tx.recovery.vouchRecovery(lost, rescuer)
    })
}
