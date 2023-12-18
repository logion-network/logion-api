import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { Mock } from "moq.ts";
import { Balance } from "../src/interfaces/index.js";
import { DEFAULT_LEGAL_OFFICER } from "./TestData.js";
import { POLKADOT_API_CREATE_TYPE, mockCodecWithToString } from "./Util.js";
import { Fees, FeesEstimator } from "../src/index.js";

describe("Fees", () => {

    it("computes total fee (all set)", () => {
        expect(allSet.totalFee).toBe(28n);
    });

    it("computes total (only inclusion)", () => {
        expect(onlyInclusionSet.totalFee).toBe(1n);
    });

    it("adds another fee (all set + only inclusion)", () => {
        expect(allSet.add(onlyInclusionSet)).toEqual(new Fees({
            ...allSet,
            inclusionFee: 2n,
        }));
    });

    it("adds another fee (only inclusion + all set)", () => {
        expect(onlyInclusionSet.add(allSet)).toEqual(new Fees({
            ...allSet,
            inclusionFee: 2n,
        }));
    });

    it("adds another fee (only inclusion + only inclusion)", () => {
        expect(onlyInclusionSet.add(onlyInclusionSet)).toEqual(new Fees({
            inclusionFee: 2n,
        }));
    });

    it("adds another fee (all set + all set)", () => {
        expect(allSet.add(allSet)).toEqual(new Fees({
            inclusionFee: 2n,
            certificateFee: 4n,
            collectionItemFee: 6n,
            legalFee: 8n,
            storageFee: 10n,
            tokensRecordFee: 12n,
            valueFee: 14n,
        }));
    });

    it("multiplies (only inclusion)", () => {
        expect(onlyInclusionSet.multiply(2n)).toEqual(new Fees({
            inclusionFee: 2n,
        }));
    });

    it("multiplies (all set)", () => {
        expect(allSet.multiply(2n)).toEqual(new Fees({
            inclusionFee: 2n,
            certificateFee: 4n,
            collectionItemFee: 6n,
            legalFee: 8n,
            storageFee: 10n,
            tokensRecordFee: 12n,
            valueFee: 14n,
        }));
    });

    it("adds all fees", () => {
        expect(Fees.addAll(allSet, onlyInclusionSet)).toEqual(new Fees({
            ...allSet,
            inclusionFee: 2n,
        }));
    });
});

const allSet = new Fees({
    inclusionFee: 1n,
    certificateFee: 2n,
    collectionItemFee: 3n,
    legalFee: 4n,
    storageFee: 5n,
    tokensRecordFee: 6n,
    valueFee: 7n,
});

const onlyInclusionSet = new Fees({
    inclusionFee: 1n,
});

describe("FeesEstimator", () => {

    it("estimates fees on file add", async () => {

        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const expectedStorageFee = BigInt(100);
        const queryFileStorageFee = () => Promise.resolve({ toBigInt: () => expectedStorageFee } as Balance );

        const api = mockPolkadotApiForFeesEstimator({ queryFileStorageFee });
        const estimator = new FeesEstimator(api);
        const fees = await estimator.estimateWithStorage({
            size: BigInt(42),
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBe(expectedStorageFee);
        expect(fees.legalFee).toBeUndefined();
        expect(fees.certificateFee).toBeUndefined();
        expect(fees.valueFee).toBeUndefined();
    });

    it("estimates fees without storage", async () => {
        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const api = mockPolkadotApiForFeesEstimator({});
        const estimator = new FeesEstimator(api);
        const fees = await estimator.estimateWithoutStorage({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBeUndefined();
        expect(fees.legalFee).toBeUndefined();
        expect(fees.certificateFee).toBeUndefined();
        expect(fees.valueFee).toBeUndefined();
    });

    it("estimates fees on LOC creation", async () => {

        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const expectedLegalFee = BigInt(1000);

        const expectedValueFee = BigInt(2000);

        const api = mockPolkadotApiForFeesEstimator( { } );
        const estimator = new FeesEstimator(api);
        const fees = await estimator.estimateCreateLoc({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
            locType: "Collection",
            valueFee: expectedValueFee,
            legalFee: expectedLegalFee,
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBeUndefined();
        expect(fees.legalFee).toBe(expectedLegalFee);
        expect(fees.certificateFee).toBeUndefined();
        expect(fees.valueFee).toBe(expectedValueFee);
    });

    it("estimates fees on Collection Item addition", async () => {

        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const expectedStorageFee = BigInt(100);
        const queryFileStorageFee = () => Promise.resolve({ toBigInt: () => expectedStorageFee } as Balance );

        const expectedCertificateFee = BigInt(1000);
        const queryCertificateFee = () => Promise.resolve({ toBigInt: () => expectedCertificateFee } as Balance );

        const api = mockPolkadotApiForFeesEstimator( { queryCertificateFee, queryFileStorageFee } );
        const estimator = new FeesEstimator(api);
        const expectedCollectionItemFee = 2n;
        const fees = await estimator.estimateAddCollectionItem({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
            numOfEntries: 5n,
            totSize: 5n,
            tokenIssuance: 5n,
            collectionItemFee: expectedCollectionItemFee,
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBe(expectedStorageFee);
        expect(fees.legalFee).toBeUndefined();
        expect(fees.certificateFee).toBe(expectedCertificateFee);
        expect(fees.valueFee).toBeUndefined();
        expect(fees.collectionItemFee).toBe(expectedCollectionItemFee);
        expect(fees.tokensRecordFee).toBeUndefined();
    });

    it("estimates fees on Tokens Record addition", async () => {

        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const expectedStorageFee = BigInt(100);
        const queryFileStorageFee = () => Promise.resolve({ toBigInt: () => expectedStorageFee } as Balance );

        const expectedCertificateFee = BigInt(1000);
        const queryCertificateFee = () => Promise.resolve({ toBigInt: () => expectedCertificateFee } as Balance );

        const api = mockPolkadotApiForFeesEstimator( { queryCertificateFee, queryFileStorageFee } );
        const estimator = new FeesEstimator(api);
        const expectedTokensRecord = 2n;
        const fees = await estimator.estimateAddTokensRecord({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
            numOfEntries: 5n,
            totSize: 5n,
            tokensRecordFee: expectedTokensRecord,
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBe(expectedStorageFee);
        expect(fees.legalFee).toBeUndefined();
        expect(fees.certificateFee).toBeUndefined();
        expect(fees.valueFee).toBeUndefined();
        expect(fees.tokensRecordFee).toBe(expectedTokensRecord);
        expect(fees.collectionItemFee).toBeUndefined();
    });
});

function mockPolkadotApiForFeesEstimator(params: { queryFileStorageFee?: any, queryCertificateFee?: any}) {
    const { queryFileStorageFee, queryCertificateFee } = params;
    return {
        call: {
            feesApi: {
                queryFileStorageFee,
                queryCertificateFee,
            }
        },
        createType: POLKADOT_API_CREATE_TYPE,
    } as unknown as ApiPromise;
}
