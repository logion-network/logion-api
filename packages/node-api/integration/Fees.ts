import { setup } from "./Util.js";

export async function fees() {
    const { api } = await setup();
    const fee = await api.fees.estimateStorageFee({
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee).toBeGreaterThanOrEqual(0);
}
