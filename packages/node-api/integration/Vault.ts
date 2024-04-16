import { Lgnt } from "../src/Currency.js";
import { ValidAccountId } from "../src/Types.js";
import { getBlockNumber, setup, signAndSend } from "./Util.js";

export async function handleVault() {
    const { api, alice, requester } = await setup();

    const requesterAccount = ValidAccountId.polkadot(requester.address);
    const vaultApi = await requesterVault();

    const transferExtrinsic = api.polkadot.tx.balances.transferAllowDeath(
        vaultApi.account.address,
        Lgnt.from(100n).canonical
    );
    await signAndSend(requester, transferExtrinsic);

    const transferParameters = {
        amount: Lgnt.from(50),
        destination: requesterAccount,
    };
    const transferBackExtrinsic = await vaultApi.tx.transferFromVault(transferParameters);
    const successfulSubmission = await signAndSend(requester, transferBackExtrinsic);

    const block = await getBlockNumber(api, successfulSubmission);
    const approveExtrinsic = await vaultApi.tx.approveVaultTransfer({
        ...transferParameters,
        signerId: ValidAccountId.polkadot(alice.address),
        block,
        index: successfulSubmission.txIndex || 0,
    });
    await signAndSend(alice, approveExtrinsic);
}

export async function requesterVault() {
    const { api, alice, bob, requester } = await setup();

    return api.vault(
        ValidAccountId.polkadot(requester.address),
        [ ValidAccountId.polkadot(alice.address), ValidAccountId.polkadot(bob.address) ]
    );
}
