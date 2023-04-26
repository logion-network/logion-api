import { ALICE, DAVE, setup, signAndSend } from "./Util.js";

export async function addGuardian() {
    const { alice, api } = await setup();
    const extrinsic = api.polkadot.tx.loAuthorityList.addLegalOfficer(DAVE, {
        Guest: ALICE,
    });
    const sudoExtrinsic = api.polkadot.tx.sudo.sudo(extrinsic);
    const result = await signAndSend(alice, sudoExtrinsic);
    expect(result.dispatchError).not.toBeDefined();
    const entry = await api.polkadot.query.loAuthorityList.legalOfficerSet(DAVE);
    expect(entry.isSome).toBe(true);
    const host = entry.unwrap().asGuest;
    expect(host.toString()).toBe(ALICE);
}
