import { ALICE, setup } from "./Util.js";
import { Lgnt, Fees } from "../src/index.js";

export async function storageFees() {
    const { api } = await setup();
    const fee = await api.fees.estimateStorageFee({
        numOfEntries: BigInt(10),
        totSize: BigInt(15000),
    });
    expect(fee.canonical).toBeGreaterThanOrEqual(0);
}

export async function legalFees() {
    const { api } = await setup();
    const identityLocFee = api.fees.getDefaultLegalFee({ locType: "Identity"});
    expect(identityLocFee).toEqual(Lgnt.from(160n));
    const transactionLocFee = api.fees.getDefaultLegalFee({ locType: "Transaction"});
    expect(transactionLocFee).toEqual(Lgnt.from(2000n));
    const collectionLocFee = api.fees.getDefaultLegalFee({ locType: "Collection"});
    expect(collectionLocFee).toEqual(Lgnt.from(2000n));
}

export async function certificateFees() {
    const { api } = await setup();
    const certificateFee = await api.fees.estimateCertificateFee({ tokenIssuance: 1000n });
    expect(certificateFee).toEqual(Lgnt.from(40n));
}

export async function ensureEnoughFunds() {
    const { api } = await setup();

    const accountData = await api.queries.getAccountData(ALICE);
    const existentialDeposit = api.polkadot.consts.balances.existentialDeposit.toBigInt();

    await expectAsync(testEnsureEnoughFunds(accountData.available)).toBeRejectedWithError("Not enough funds");
    await expectAsync(testEnsureEnoughFunds(accountData.available + 1000n)).toBeRejectedWithError("Not enough funds");
    await expectAsync(testEnsureEnoughFunds(accountData.available - existentialDeposit)).toBeResolved();
    await expectAsync(testEnsureEnoughFunds(accountData.available - (10n * existentialDeposit))).toBeResolved();
}

async function testEnsureEnoughFunds(fees: bigint) {
    const { api } = await setup();
    return api.fees.ensureEnoughFunds({ fees: new Fees({ inclusionFee: Lgnt.fromCanonical(fees) }), origin: ALICE })
}
