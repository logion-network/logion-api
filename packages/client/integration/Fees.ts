import { ALICE } from "../test/Utils.js";
import { State, REQUESTER_ADDRESS } from "./Utils.js";

export async function fees(state: State) {
    const client = state.client;
    const api = client.logionApi;
    const submittable = api.polkadot.tx.balances.transfer(ALICE.address, "10000000");
    const fees = await client.public.fees.estimateWithoutStorage({ origin: REQUESTER_ADDRESS, submittable });
    expect(fees.totalFee).toBe(2629491440000000n);
}
