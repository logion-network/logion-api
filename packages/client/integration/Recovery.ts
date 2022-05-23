import { buildApi } from "@logion/node-api";

import { AcceptedProtection, FullSigner, LegalOfficer, LogionClient, NoProtection, PendingRecovery } from "../src";
import { LogionClientConfig } from "../src/SharedClient";
import { acceptRequest } from "./Protection";
import { aliceAcceptsTransfer } from './Vault';
import { initRequesterBalance, NEW_ADDRESS, REQUESTER_ADDRESS, State } from "./Utils";

export async function recoverLostAccount(state: State) {
    const { client, signer, alice, bob } = state;

    await initRequesterBalance(client.config, signer, NEW_ADDRESS);

    const authenticatedClient = client.withCurrentAddress(NEW_ADDRESS)

    const noProtection = await authenticatedClient.protectionState() as NoProtection;

    console.log("Requesting recovery")
    const pending = await noProtection.requestRecovery({
        recoveredAddress: REQUESTER_ADDRESS,
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
    await acceptRequestAndVouch(client.config, client, signer, alice, REQUESTER_ADDRESS, NEW_ADDRESS);
    await acceptRequestAndVouch(client.config, client, signer, bob, REQUESTER_ADDRESS, NEW_ADDRESS);

    const accepted = (await pending.refresh()) as AcceptedProtection;

    console.log("Activating")
    let pendingRecovery = await accepted.activate(signer) as PendingRecovery;
    pendingRecovery = await pendingRecovery.waitForFullyReady();

    console.log("Claiming")
    const claimed = await pendingRecovery.claimRecovery(signer);

    // Transfer from recovered account
    const recoveredBalance = await claimed.recoveredBalanceState();
    await recoveredBalance.transfer({
        signer,
        destination: NEW_ADDRESS,
        amount: recoveredBalance.balances[0].available,
    });

    // Transfer from recovered account
    const newVault = await claimed.vaultState();
    let recoveredVault = await claimed.recoveredVaultState();
    recoveredVault = await recoveredVault.createVaultTransferRequest({
        legalOfficer: alice,
        amount: recoveredVault.balances[0].available,
        destination: newVault.vaultAddress,
        signer,
    });
    const pendingRequest = recoveredVault.pendingVaultTransferRequests[0];
    await aliceAcceptsTransfer(state, pendingRequest);
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
