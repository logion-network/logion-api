import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import { LocType } from "./Types.js";

export class Fees {

    constructor(params: {
        inclusionFee: bigint,
        storageFee?: bigint,
        legalFee?: bigint,
        certificateFee?: bigint,
        valueFee?: bigint,
    }) {
        this.inclusionFee = params.inclusionFee;
        this.storageFee = params.storageFee;
        this.legalFee = params.legalFee;
        this.certificateFee = params.certificateFee;
        this.valueFee = params.valueFee;
    }

    readonly inclusionFee: bigint;
    readonly storageFee?: bigint;
    readonly legalFee?: bigint;
    readonly certificateFee?: bigint;
    readonly valueFee?: bigint;

    get totalFee(): bigint {
        return this.inclusionFee
            + (this.storageFee || 0n)
            + (this.legalFee || 0n)
            + (this.certificateFee || 0n)
            + (this.valueFee || 0n)
        ;
    }
}

export class FeesEstimator {

    constructor(api: ApiPromise) {
        this.api = api;
    }

    private readonly api: ApiPromise;

    async estimateWithStorage(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
        size: bigint,
    }): Promise<Fees> {
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        const storageFee = await this.estimateStorageFee({
            numOfEntries: 1n,
            totSize: params.size,
        });
        return new Fees({ inclusionFee, storageFee });
    }

    private async estimateInclusionFee(origin: string, submittable: SubmittableExtrinsic): Promise<bigint> {
        const dispatchInfo = await submittable.paymentInfo(origin);
        const partialFee = dispatchInfo.partialFee;
        return BigInt(partialFee.toString());
    }

    async estimateStorageFee(params: { numOfEntries: bigint, totSize: bigint }): Promise<bigint> {
        const { numOfEntries, totSize } = params;
        const fee = await this.api.call.feesApi.queryFileStorageFee(numOfEntries, totSize);
        return fee.toBigInt();
    }

    async estimateLegalFee(params: { locType: LocType }): Promise<bigint> {
        const { locType } = params;
        const fee = await this.api.call.feesApi.queryLegalFee(locType);
        return fee.toBigInt();
    }

    async estimateWithoutStorage(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
    }): Promise<Fees> {
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        return new Fees({ inclusionFee });
    }

    async estimateCreateLoc(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
        locType: LocType,
        valueFee?: bigint,
        legalFee?: bigint,
    }): Promise<Fees> {
        const { locType, valueFee } = params;
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        const legalFee = params.legalFee !== undefined ? params.legalFee : await this.estimateLegalFee({ locType });
        return new Fees({ inclusionFee, legalFee, valueFee });
    }

    async estimateCertificateFee(params: { tokenIssuance: bigint }): Promise<bigint> {
        const { tokenIssuance } = params;
        const fee = await this.api.call.feesApi.queryCertificateFee(tokenIssuance);
        return fee.toBigInt();
    }

    async estimateAddCollectionItem(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
        numOfEntries: bigint,
        totSize: bigint,
        tokenIssuance: bigint | undefined,
    }): Promise<Fees> {
        const { origin, submittable, numOfEntries, totSize } = params;
        const tokenIssuance = params.tokenIssuance || 0n;
        const inclusionFee = await this.estimateInclusionFee(origin, submittable);
        const storageFee = await this.estimateStorageFee({ numOfEntries, totSize })
        const certificateFee = await this.estimateCertificateFee({ tokenIssuance })
        return new Fees({
            inclusionFee,
            storageFee,
            certificateFee,
        });
    }
}
