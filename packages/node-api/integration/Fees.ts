import { setup } from "./Util.js";
import { queryFileStorageFee } from "../src/index.js";

export async function fees() {
    const { api } = await setup();
    const fee = await queryFileStorageFee({
        api,
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee).toBeGreaterThanOrEqual(0);
}
