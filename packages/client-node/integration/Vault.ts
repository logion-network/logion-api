import { LogionNodeApiClass, Lgnt, ValidAccountId } from "@logion/node-api";
import { ActiveProtection, VaultTransferRequest, WithProtectionParameters } from "@logion/client";

import { State } from "./Utils.js";
import { checkCoinBalance } from "./Balance.js";

export async function providesVault(state: State) {
    const { client, signer, alice, requesterAccount } = state;

    const userClient = client.withCurrentAccount(requesterAccount);
    let activeProtection = (await userClient.protectionState()) as ActiveProtection;
    activeProtection = await activeProtection.waitForFullyReady();

    // Transfer to vault
    let vaultState = await activeProtection.vaultState();
    const vaultAccount = vaultState.vaultAccount;
    let balanceState = await userClient.balanceState();
    balanceState = await balanceState.transfer({
        signer,
        payload: {
            destination: vaultAccount,
            amount: Lgnt.from(5n),
        }
    });
    vaultState = await vaultState.refresh();
    checkCoinBalance(vaultState.balances[0], "5.00");

    // Transfer back from vault
    vaultState = await vaultState.createVaultTransferRequest({
        legalOfficer: alice,
        amount: Lgnt.from(1n),
        destination: requesterAccount,
        signer
    });
    const pendingRequest = vaultState.pendingVaultTransferRequests[0];

    // Alice accepts
    await aliceAcceptsTransfer(state, pendingRequest, activeProtection);

    // Check balances
    vaultState = await vaultState.refresh();
    balanceState = await balanceState.refresh();

    checkCoinBalance(vaultState.balances[0], "4.00");
}

export async function aliceAcceptsTransfer(state: State, request: VaultTransferRequest, activeProtection: WithProtectionParameters) {
    const { client, signer, alice, requesterAccount } = state;

    const api = await LogionNodeApiClass.connect(client.config.rpcEndpoints);

    const signerId = alice.account;
    const amount = Lgnt.fromCanonical(BigInt(request!.amount));
    const vault = api.vault(
        requesterAccount,
        activeProtection.protectionParameters.legalOfficers.map(legalOfficer => legalOfficer.account),
    );
    const submittable = await vault.tx.approveVaultTransfer({
        signerId,
        destination: ValidAccountId.polkadot(request!.destination),
        amount,
        block: BigInt(request!.block),
        index: request!.index,
    });
    await signer.signAndSend({
        signerId,
        submittable,
    });

    const authenticated = client.withCurrentAccount(alice.account);
    const axios = authenticated.getLegalOfficer(alice.account).buildAxiosToNode();
    await axios.post(`/api/vault-transfer-request/${request.id}/accept`);
}
