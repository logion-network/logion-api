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
import { initAccountBalance, NEW_ADDRESS, REQUESTER_ADDRESS, State } from "./Utils.js";

export async function requestRecoveryAndCancel(state: State, identityLocs: IdentityLocs) {
    const { client, signer, alice, charlie, newAccount } = state;

    const pending = await requestRecovery(state, identityLocs) as PendingProtection;

    console.log("LO's - Alice and Charlie Rejecting")
    await rejectRequest(client, signer, charlie, newAccount, "Your protection request is not complete");
    await rejectRequest(client, signer, alice, newAccount, "Some info is missing");

    const rejected = await pending.refresh() as RejectedRecovery;

    const cancelled = await rejected.cancel();
    expect(cancelled).toBeInstanceOf(NoProtection);
}

export async function rejectRequest(
    client: LogionClient,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    requester: ValidAccountId,
    reason: string,
) {
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer, legalOfficer.account);

    const response = await axios.put("/api/protection-request", {
        legalOfficerAddress: legalOfficer.account.address,
        statuses: [ "PENDING" ],
        requester: requester.address,
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
    requester: ValidAccountId,
) {
    const axios = await buildLegalOfficerAxios(client, signer, legalOfficer, legalOfficer.account);

    const response = await axios.put("/api/protection-request", {
        legalOfficerAddress: legalOfficer.account.address,
        statuses: [ "PENDING" ],
        requesterAddress: requester
    });
    const request: ProtectionRequest = response.data.requests[0];

    const identityLocId = await createAndCloseIdentityLoc(
        config,
        signer,
        legalOfficer.account,
        requester,
    );

    await axios.post(`/api/protection-request/${ request.id }/accept`, {
        locId: identityLocId.toString()
    });
}

async function createAndCloseIdentityLoc(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficer: ValidAccountId,
    requester: ValidAccountId
): Promise<UUID> {
    const api = await buildApiClass(config.rpcEndpoints);
    const identityLocId = new UUID();
    await signer.signAndSend({
        signerId: requester,
        submittable: api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
            api.adapters.toLocId(identityLocId),
            legalOfficer.address,
            api.fees.getDefaultLegalFee({ locType: "Identity" }).canonical,
            {
                metadata: [],
                files: [],
                links: [],
            }
        )
    });
    await signer.signAndSend({
        signerId: legalOfficer,
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
    const { client, signer, alice, charlie, newAccount } = state;

    const requested = await requestRecovery(state, identityLocs);

    console.log("LO's - Alice Rejecting")
    await rejectRequest(client, signer, alice, newAccount, "for some reason");

    console.log("User resubmitting to Alice");
    const rejected = await requested.refresh() as RejectedRecovery;
    const pending = await rejected.resubmit(alice);

    console.log("LO's - Accepting and vouching")
    await acceptRequestAndVouch(client.config, client, signer, alice, REQUESTER_ADDRESS, newAccount);
    await acceptRequestAndVouch(client.config, client, signer, charlie, REQUESTER_ADDRESS, newAccount);

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
        destination: newVault.vaultAccount,
        signer,
    });
    const pendingRequest = recoveredVault.pendingVaultTransferRequests[0];

    console.log("Alice accepts transfer from recovered vault")
    await aliceAcceptsTransfer(state, pendingRequest, claimed);
}

async function getClaimedRecovery(state: State) {
    const { client, newAccount } = state;
    const authenticatedClient = client.withCurrentAccount(newAccount);
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
    const { client, signer, alice, charlie, newAccount, requesterAccount } = state;

    await initAccountBalance(state, newAccount);

    const authenticatedClient = client.withCurrentAccount(newAccount);

    const current = await authenticatedClient.protectionState();
    expect(current).toBeInstanceOf(NoProtection);
    if(current instanceof NoProtection) {
        console.log("Requesting recovery")
        return await current.requestRecovery({
            payload: {
                recoveredAccount: requesterAccount,
                legalOfficer1: authenticatedClient.getLegalOfficer(alice.account),
                legalOfficer2: authenticatedClient.getLegalOfficer(charlie.account),
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
    lostAddress: string,
    requesterAddress: ValidAccountId,
) {
    await acceptRequest(config, client, signer, legalOfficer, requesterAddress)
    await vouchRecovery(config, signer, legalOfficer, lostAddress, requesterAddress)
}

async function vouchRecovery(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    lost: string,
    rescuer: ValidAccountId,
): Promise<void> {
    const api = await buildApiClass(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: legalOfficer.account,
        submittable: api.polkadot.tx.recovery.vouchRecovery(lost, rescuer.address)
    })
}
