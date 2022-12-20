import { buildApi } from "@logion/node-api";

import {
    AcceptedProtection,
    FullSigner,
    LegalOfficer,
    LogionClient,
    NoProtection,
    PendingRecovery,
    PendingProtection,
    RejectedProtection,
    LogionClientConfig
} from "../src/index.js";
import { acceptRequest, rejectRequest } from "./Protection.js";
import { aliceAcceptsTransfer } from "./Vault.js";
import { initRequesterBalance, NEW_ADDRESS, REQUESTER_ADDRESS, State } from "./Utils.js";

export async function requestRecoveryAndCancel(state: State) {
    const { client, signer, alice, charlie } = state;

    const pending = await requestRecovery(state) as PendingProtection;

    console.log("LO's - Alice and Bob Rejecting")
    await rejectRequest(client, signer, charlie, NEW_ADDRESS, "Your protection request is not complete");
    await rejectRequest(client, signer, alice, NEW_ADDRESS, "Some info is missing");

    const rejected = await pending.refresh() as RejectedProtection;

    const cancelled = await rejected.cancel();
    expect(cancelled).toBeInstanceOf(NoProtection);
}

export async function recoverLostAccount(state: State) {
    const { client, signer, alice, charlie } = state;

    const requested = await requestRecovery(state);

    console.log("LO's - Alice Rejecting")
    await rejectRequest(client, signer, alice, NEW_ADDRESS, "for some reason");

    console.log("User resubmitting to Alice");
    const rejected = await requested.refresh() as RejectedProtection;
    const pending = await rejected.resubmit(alice);

    console.log("LO's - Accepting and vouching")
    await acceptRequestAndVouch(client.config, client, signer, alice, REQUESTER_ADDRESS, NEW_ADDRESS);
    await acceptRequestAndVouch(client.config, client, signer, charlie, REQUESTER_ADDRESS, NEW_ADDRESS);

    const accepted = (await pending.refresh()) as AcceptedProtection;

    console.log("Activating")
    let pendingRecovery = await accepted.activate(signer) as PendingRecovery;
    pendingRecovery = await pendingRecovery.waitForFullyReady();

    console.log("Claiming")
    const claimed = await pendingRecovery.claimRecovery(signer);

    console.log("Transfer from recovered vault")
    const newVault = await claimed.vaultState();
    let recoveredVault = await claimed.recoveredVaultState();
    recoveredVault = await recoveredVault.createVaultTransferRequest({
        legalOfficer: alice,
        amount: recoveredVault.balances[0].available,
        destination: newVault.vaultAddress,
        signer,
    });
    const pendingRequest = recoveredVault.pendingVaultTransferRequests[0];

    console.log("Alice accepts transfer from recovered vault")
    await aliceAcceptsTransfer(state, pendingRequest);

    console.log("Transfer from recovered account")
    const recoveredBalance = await claimed.recoveredBalanceState();
    await recoveredBalance.transfer({
        signer,
        destination: NEW_ADDRESS,
        amount: recoveredBalance.balances[0].available,
    });
}

async function requestRecovery(state: State): Promise<PendingProtection> {
    const { client, signer, alice, charlie } = state;

    await initRequesterBalance(client.config, signer, NEW_ADDRESS);

    const authenticatedClient = client.withCurrentAddress(NEW_ADDRESS)

    const noProtection = await authenticatedClient.protectionState() as NoProtection;

    console.log("Requesting recovery")
    return await noProtection.requestRecovery({
        recoveredAddress: REQUESTER_ADDRESS,
        signer,
        legalOfficer1: alice,
        legalOfficer2: charlie,
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
