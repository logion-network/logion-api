import { VoidedLoc } from "@logion/client";
import { State } from "./Utils.js";

export async function voidTransactionLoc(state: State) {
    const { alice, signer } = state;
    const client = state.client.withCurrentAccount(alice.account);
    let locsState = await client.locsState({ spec: { ownerAddress: alice.account.address, locTypes: ["Transaction"], statuses: ["CLOSED"] }});
    const closedLoc = locsState.closedLocs['Transaction'][0];

    const voidLoc = await closedLoc.legalOfficer.voidLoc({
        reason: "Because.",
        signer
    });

    expect(voidLoc).toBeInstanceOf(VoidedLoc);
}
