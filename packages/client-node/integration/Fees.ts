import { State } from "./Utils.js";

export async function fees(state: State) {
    const { client, requesterAccount, alice } = state;
    const api = client.logionApi;
    const submittable = api.polkadot.tx.balances.transferAllowDeath(alice.account.address, "10000000");
    const fees = await client.public.fees.estimateWithoutStorage({ origin: requesterAccount, submittable });
    expect(fees.totalFee.canonical).toBe(1526123495430309312n);
}
