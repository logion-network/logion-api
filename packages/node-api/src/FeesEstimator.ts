import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import { LocType } from "./Types.js";
import { LGNT } from "./Currency.js";

export class Fees {

    static zero() {
        return new Fees({ inclusionFee: 0n });
    }

    static addAll(...fees: Fees[]): Fees {
        return fees.reduce((cur, next) => cur.add(next), Fees.zero());
    }

    constructor(params: {
        inclusionFee: bigint,
        storageFee?: bigint,
        legalFee?: bigint,
        certificateFee?: bigint,
        valueFee?: bigint,
        collectionItemFee?: bigint,
        tokensRecordFee?: bigint,
    }) {
        this.inclusionFee = params.inclusionFee;
        this.storageFee = params.storageFee;
        this.legalFee = params.legalFee;
        this.certificateFee = params.certificateFee;
        this.valueFee = params.valueFee;
        this.collectionItemFee = params.collectionItemFee;
        this.tokensRecordFee = params.tokensRecordFee;
    }

    readonly inclusionFee: bigint;
    readonly storageFee?: bigint;
    readonly legalFee?: bigint;
    readonly certificateFee?: bigint;
    readonly valueFee?: bigint;
    readonly collectionItemFee?: bigint;
    readonly tokensRecordFee?: bigint;

    get totalFee(): bigint {
        return this.inclusionFee
            + (this.storageFee || 0n)
            + (this.legalFee || 0n)
            + (this.certificateFee || 0n)
            + (this.valueFee || 0n)
            + (this.collectionItemFee || 0n)
            + (this.tokensRecordFee || 0n)
        ;
    }

    multiply(times: bigint): Fees {
        return new Fees({
            inclusionFee: this.inclusionFee * times,
            certificateFee: this.multiplyFee(this.certificateFee, times),
            collectionItemFee: this.multiplyFee(this.collectionItemFee, times),
            legalFee: this.multiplyFee(this.legalFee, times),
            storageFee: this.multiplyFee(this.storageFee, times),
            tokensRecordFee: this.multiplyFee(this.tokensRecordFee, times),
            valueFee: this.multiplyFee(this.valueFee, times),
        });
    }

    private multiplyFee(fee: bigint | undefined, times: bigint): bigint | undefined {
        if(fee !== undefined) {
            return fee * times;
        } else {
            return undefined;
        }
    }

    add(fee: Fees): Fees {
        return new Fees({
            inclusionFee: this.inclusionFee + fee.inclusionFee,
            certificateFee: this.addFee(this.certificateFee, fee.certificateFee),
            collectionItemFee: this.addFee(this.collectionItemFee, fee.collectionItemFee),
            legalFee: this.addFee(this.legalFee, fee.legalFee),
            storageFee: this.addFee(this.storageFee, fee.storageFee),
            tokensRecordFee: this.addFee(this.tokensRecordFee, fee.tokensRecordFee),
            valueFee: this.addFee(this.valueFee, fee.valueFee),
        });
    }

    private addFee(fee1: bigint | undefined, fee2: bigint | undefined): bigint | undefined {
        if(fee1 !== undefined && fee2 !== undefined) {
            return fee1 + fee2;
        } else if(fee1 !== undefined && fee2 === undefined) {
            return fee1;
        } else if(fee1 === undefined && fee2 !== undefined) {
            return fee2;
        } else {
            return undefined;
        }
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

    getDefaultLegalFee(params: { locType: LocType }): bigint {
        const { locType } = params;
        if (locType === "Identity") {
            return 160n * LGNT;
        } else {
            return 2000n * LGNT;
        }
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
        storageSize?: bigint,
    }): Promise<Fees> {
        const { locType, valueFee, storageSize } = params;
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        const legalFee = params.legalFee !== undefined ? params.legalFee : this.getDefaultLegalFee({ locType });
        const storageFee = storageSize !== undefined ? await this.estimateStorageFee({ numOfEntries: 1n, totSize: storageSize }) : undefined;
        return new Fees({ inclusionFee, legalFee, valueFee, storageFee });
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
        collectionItemFee: bigint;
    }): Promise<Fees> {
        const { origin, submittable, numOfEntries, totSize, collectionItemFee } = params;
        const tokenIssuance = params.tokenIssuance || 0n;
        const inclusionFee = await this.estimateInclusionFee(origin, submittable);
        const storageFee = await this.estimateStorageFee({ numOfEntries, totSize });
        const certificateFee = await this.estimateCertificateFee({ tokenIssuance });
        return new Fees({
            inclusionFee,
            storageFee,
            certificateFee,
            collectionItemFee,
        });
    }

    async estimateAddTokensRecord(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
        numOfEntries: bigint,
        totSize: bigint,
        tokensRecordFee: bigint;
    }): Promise<Fees> {
        const { origin, submittable, numOfEntries, totSize, tokensRecordFee } = params;
        const inclusionFee = await this.estimateInclusionFee(origin, submittable);
        const storageFee = await this.estimateStorageFee({ numOfEntries, totSize });
        return new Fees({
            inclusionFee,
            storageFee,
            tokensRecordFee,
        });
    }

    async ensureEnoughFunds(params: { fees: Fees, origin: string }) {
        const { fees, origin } = params;
        const totalFees = fees.totalFee;
        const accountData = await this.api.query.system.account(origin);
        const existentialDeposit = this.api.consts.balances.existentialDeposit.toBigInt();
        if(accountData.data.free.toBigInt() - existentialDeposit < totalFees) {
            throw new Error("Not enough funds");
        }
    }
}
