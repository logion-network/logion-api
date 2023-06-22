import { VoidedLoc } from "../src/index.js";
import { State } from "./Utils.js";

export async function voidTransactionLoc(state: State) {
    const { aliceAccount, signer } = state;
    const client = state.client.withCurrentAddress(aliceAccount);
    let locsState = await client.locsState({ spec: { ownerAddress: aliceAccount.address, locTypes: ["Transaction"], statuses: ["CLOSED"] }});
    const closedLoc = locsState.closedLocs['Transaction'][0];

    const voidLoc = await closedLoc.legalOfficer.voidLoc({
        reason: "Because.",
        signer
    });

    expect(voidLoc).toBeInstanceOf(VoidedLoc);
}
