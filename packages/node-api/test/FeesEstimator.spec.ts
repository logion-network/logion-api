import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { Mock } from "moq.ts";
import { Balance } from "../src/interfaces/index.js";
import { DEFAULT_LEGAL_OFFICER } from "./TestData.js";
import { POLKADOT_API_CREATE_TYPE, mockCodecWithToString } from "./Util.js";
import { Fees, FeesEstimator } from "../src/index.js";

describe("Fees", () => {

    it("computes total fee", () => {
        const fees = new Fees({
            inclusionFee: 1n,
            certificateFee: 2n,
            collectionItemFee: 3n,
            legalFee: 4n,
            storageFee: 5n,
            tokensRecordFee: 6n,
            valueFee: 7n,
        });
        expect(fees.totalFee).toBe(28n);
    });

    it("computes total with undefined fees", () => {
        const fees = new Fees({
            inclusionFee: 1n,
        });
        expect(fees.totalFee).toBe(1n);
    });
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
        const queryLegalFee = () => Promise.resolve({ toBigInt: () => expectedLegalFee } as Balance );

        const expectedValueFee = BigInt(2000);

        const api = mockPolkadotApiForFeesEstimator( { queryLegalFee } );
        const estimator = new FeesEstimator(api);
        const fees = await estimator.estimateCreateLoc({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
            locType: "Collection",
            valueFee: expectedValueFee,
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
            tokenIssuance: 5n,
            tokensRecordFee: expectedTokensRecord,
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBe(expectedStorageFee);
        expect(fees.legalFee).toBeUndefined();
        expect(fees.certificateFee).toBe(expectedCertificateFee);
        expect(fees.valueFee).toBeUndefined();
        expect(fees.tokensRecordFee).toBe(expectedTokensRecord);
        expect(fees.collectionItemFee).toBeUndefined();
    });
});

function mockPolkadotApiForFeesEstimator(params: { queryFileStorageFee?: any, queryLegalFee?: any, queryCertificateFee?: any}) {
    const { queryFileStorageFee, queryLegalFee, queryCertificateFee } = params;
    return {
        call: {
            feesApi: {
                queryFileStorageFee,
                queryLegalFee,
                queryCertificateFee,
            }
        },
        createType: POLKADOT_API_CREATE_TYPE,
    } as unknown as ApiPromise;
}
