import { setup } from "./Util.js";
import { FeesEstimator } from "../src/index.js";

export async function fees() {
    const { api } = await setup();
    const feesEstimator = new FeesEstimator(api);
    const fee = await feesEstimator.estimateStorageFee({
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee).toBeGreaterThanOrEqual(0);
}
