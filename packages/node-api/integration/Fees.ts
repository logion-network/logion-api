import { setup } from "./Util.js";

export async function storageFees() {
    const { api } = await setup();
    const fee = await api.fees.estimateStorageFee({
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee).toBeGreaterThanOrEqual(0);
}

const ONE_LGNT = 1_000_000_000_000_000_000n;

export async function legalFees() {
    const { api } = await setup();
    const identityLocFee = await api.fees.estimateLegalFee({ locType: "Identity"});
    expect(identityLocFee).toEqual(160n * ONE_LGNT);
    const transactionLocFee = await api.fees.estimateLegalFee({ locType: "Transaction"});
    expect(transactionLocFee).toEqual(2000n * ONE_LGNT);
    const collectionLocFee = await api.fees.estimateLegalFee({ locType: "Collection"});
    expect(collectionLocFee).toEqual(2000n * ONE_LGNT);
}

