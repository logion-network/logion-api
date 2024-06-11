import { ValidAccountId, LogionNodeApiClass } from "@logion/node-api";

import {
    AcceptedRecovery,
    FullSigner,
    LegalOfficer,
    LogionClient,
    NoProtection,
    PendingRecovery,
    RejectedRecovery,
    LogionClientConfig,
    ActiveRecovery,
    ClaimedRecovery,
} from "@logion/client";
import { IdentityLocs } from "./Protection.js";
import { aliceAcceptsTransfer } from "./Vault.js";
import { initAccountBalance, NEW_ADDRESS, REQUESTER_ADDRESS, State } from "./Utils.js";
import debugLog = jasmine.debugLog;

export async function requestRecoveryAndCancel(state: State, identityLocs: IdentityLocs) {
    const { client, alice, charlie } = state;

    const pending = await requestRecovery(state, identityLocs) as PendingRecovery;

    debugLog("LO's - Alice and Charlie Rejecting")
    await rejectRequest(client, charlie, "Your protection request is not complete");
    await rejectRequest(client, alice, "Some info is missing");

    const rejected = await pending.refresh() as RejectedRecovery;

    const cancelled = await rejected.cancel();
    expect(cancelled).toBeInstanceOf(NoProtection);
}

export async function rejectRequest(
    client: LogionClient,
    legalOfficer: LegalOfficer,
    reason: string,
) {
    const legalOfficerClient = client.withCurrentAccount(legalOfficer.account);
    const requests = await legalOfficerClient.recoveryReview.fetchRecoveryRequests();
    await requests.pendingRequests[0].reject({ rejectReason: reason });
}

export async function acceptRequest(
    client: LogionClient,
    legalOfficer: LegalOfficer,
) {
    const legalOfficerClient = client.withCurrentAccount(legalOfficer.account);
    const requests = await legalOfficerClient.recoveryReview.fetchRecoveryRequests();
    await requests.pendingRequests[0].accept();
}

export async function requestRecoveryAndProceed(state: State, identityLocs: IdentityLocs) {
    const { client, signer, alice, charlie, newAccount } = state;

    const pending = await requestRecovery(state, identityLocs);

    debugLog("LO's - Accepting and vouching")
    await acceptRequestAndVouch(client.config, client, signer, alice, REQUESTER_ADDRESS, newAccount);
    await acceptRequestAndVouch(client.config, client, signer, charlie, REQUESTER_ADDRESS, newAccount);

    debugLog("Activating")
    const accepted = await pending.refresh() as AcceptedRecovery;
    let pendingRecovery = await accepted.activate({ signer }) as ActiveRecovery;
    pendingRecovery = await pendingRecovery.waitForFullyReady();

    debugLog("Claiming")
    await pendingRecovery.claimRecovery({ signer });
}

export async function recoverLostVault(state: State) {
    const { signer, alice } = state;

    const claimed = await getClaimedRecovery(state);

    debugLog("Transfer from recovered vault")
    const newVault = await claimed.vaultState();
    let recoveredVault = await claimed.recoveredVaultState();
    recoveredVault = await recoveredVault.createVaultTransferRequest({
        payload: {
            legalOfficer: alice,
            amount: recoveredVault.balance.available,
            destination: newVault.vaultAccount,
        },
        signer,
    });
    const pendingRequest = recoveredVault.pendingVaultTransferRequests[0];

    debugLog("Alice accepts transfer from recovered vault")
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

    debugLog("Transfer from recovered account")
    const recoveredBalance = await claimed.recoveredBalanceState();
    await recoveredBalance.transferAll({
        signer,
        payload: {
            destination: NEW_ADDRESS,
            keepAlive: false,
        }
    });
}

async function requestRecovery(state: State, identityLocs: IdentityLocs): Promise<PendingRecovery> {
    const { client, signer, alice, charlie, newAccount, requesterAccount } = state;

    await initAccountBalance(state, newAccount);

    const authenticatedClient = client.withCurrentAccount(newAccount);

    const current = await authenticatedClient.protectionState();
    expect(current).toBeInstanceOf(NoProtection);
    if(current instanceof NoProtection) {
        debugLog("Requesting recovery")
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
    await acceptRequest(client, legalOfficer);
    await vouchRecovery(config, signer, legalOfficer, lostAddress, requesterAddress);
}

async function vouchRecovery(
    config: LogionClientConfig,
    signer: FullSigner,
    legalOfficer: LegalOfficer,
    lost: string,
    rescuer: ValidAccountId,
): Promise<void> {
    const api = await LogionNodeApiClass.connect(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: legalOfficer.account,
        submittable: api.polkadot.tx.recovery.vouchRecovery(lost, rescuer.address)
    })
}
