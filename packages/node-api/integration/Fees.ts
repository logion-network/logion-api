import { setup } from "./Util.js";
import { Currency } from "../src/index.js";

export async function storageFees() {
    const { api } = await setup();
    const fee = await api.fees.estimateStorageFee({
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee).toBeGreaterThanOrEqual(0);
}

export async function legalFees() {
    const { api } = await setup();
    const identityLocFee = await api.fees.estimateLegalFee({ locType: "Identity"});
    expect(identityLocFee).toEqual(Currency.toCanonicalAmount(Currency.nLgnt(160n)));
    const transactionLocFee = await api.fees.estimateLegalFee({ locType: "Transaction"});
    expect(transactionLocFee).toEqual(Currency.toCanonicalAmount(Currency.nLgnt(2000n)));
    const collectionLocFee = await api.fees.estimateLegalFee({ locType: "Collection"});
    expect(collectionLocFee).toEqual(Currency.toCanonicalAmount(Currency.nLgnt(2000n)));
}

export async function certificateFees() {
    const { api } = await setup();
    const certificateFee = await api.fees.estimateCertificateFee({ tokenIssuance: 1000n });
    expect(certificateFee).toEqual(Currency.toCanonicalAmount(Currency.nLgnt(4n)));
}
