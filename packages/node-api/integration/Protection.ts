import { Lgnt } from "../src/Currency.js";
import { ValidAccountId } from "../src/Types.js";
import { UUID } from "../src/UUID.js";
import { Vault } from "../src/VaultClass.js";
import { createIdentityLoc } from "./IdentityLoc.js";
import { getBlockNumber, setup, signAndSend } from "./Util.js";
import { requesterVault } from "./Vault.js";

export async function handleProtection() {
    const { api, alice, bob, requester } = await setup();

    await createIdentityLoc(BOB_IDENTITY_LOC_ID, requester, bob);

    const protection = api.polkadot.tx.verifiedRecovery.createRecovery(
        [ alice.address, bob.address ].sort(),
    );
    await signAndSend(requester, protection);
}

const BOB_IDENTITY_LOC_ID = new UUID("658043c8-34f4-4645-9ac4-d8dc0e68ef05");

export async function handleRecovery() {
    const { api, alice, bob, requester, newRequester } = await setup();

    const transferExtrinsic = api.polkadot.tx.balances.transferAllowDeath(
        newRequester.address,
        Lgnt.from(20000n).canonical
    );
    await signAndSend(bob, transferExtrinsic);

    await createIdentityLoc(ALICE_NEW_IDENTITY_LOC_ID, newRequester, alice);
    await createIdentityLoc(BOB_NEW_IDENTITY_LOC_ID, newRequester, bob);

    const protection = api.polkadot.tx.verifiedRecovery.createRecovery(
        [ alice.address, bob.address ].sort(),
    );
    await signAndSend(newRequester, protection);

    const initiateRecovery = api.polkadot.tx.recovery.initiateRecovery(
        requester.address,
    );
    await signAndSend(newRequester, initiateRecovery);

    const vouchRecovery = api.polkadot.tx.recovery.vouchRecovery(
        requester.address,
        newRequester.address,
    );
    await signAndSend(alice, vouchRecovery);
    await signAndSend(bob, vouchRecovery);

    const claimRecovery = api.polkadot.tx.recovery.claimRecovery(
        requester.address,
    );
    await signAndSend(newRequester, claimRecovery);

    const vaultApi = await requesterVault();
    const aliceAccount = ValidAccountId.polkadot(alice.address);
    const newVaultAddress = Vault.getVaultAccountId(
        ValidAccountId.polkadot(newRequester.address),
        [ aliceAccount, ValidAccountId.polkadot(bob.address) ],
    );
    const transferParameters = {
        amount: Lgnt.from(50), // Remainder, see Vault.ts
        destination: newVaultAddress,
    };
    const transferFromVaultAsRecovered = api.polkadot.tx.recovery.asRecovered(requester.address,
        await vaultApi.tx.transferFromVault(transferParameters),
    );
    const successfulSubmission = await signAndSend(newRequester, transferFromVaultAsRecovered);

    const block = await getBlockNumber(api, successfulSubmission);
    const approveExtrinsic = await vaultApi.tx.approveVaultTransfer({
        ...transferParameters,
        signerId: aliceAccount,
        block,
        index: successfulSubmission.txIndex || 0,
    });
    await signAndSend(alice, approveExtrinsic);

    const transferAsRecoverd = api.polkadot.tx.recovery.asRecovered(requester.address,
        api.polkadot.tx.balances.transferAll(newRequester.address, false),
    );
    await signAndSend(newRequester, transferAsRecoverd);
}

const ALICE_NEW_IDENTITY_LOC_ID = new UUID("478955bd-60a9-4000-aef2-418162fbe497");
const BOB_NEW_IDENTITY_LOC_ID = new UUID("6d419018-7587-4bf1-8883-90e6ec7e6580");
