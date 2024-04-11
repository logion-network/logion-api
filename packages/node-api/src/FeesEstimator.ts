import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import { LocType, ValidAccountId } from "./Types.js";
import { Lgnt } from "./Currency.js";

export class Fees {

    static zero() {
        return new Fees({ inclusionFee: Lgnt.zero() });
    }

    static addAll(...fees: Fees[]): Fees {
        return fees.reduce((cur, next) => cur.add(next), Fees.zero());
    }

    constructor(params: {
        inclusionFee: Lgnt,
        storageFee?: Lgnt,
        legalFee?: Lgnt,
        certificateFee?: Lgnt,
        valueFee?: Lgnt,
        collectionItemFee?: Lgnt,
        tokensRecordFee?: Lgnt,
    }) {
        this.inclusionFee = params.inclusionFee;
        this.storageFee = params.storageFee;
        this.legalFee = params.legalFee;
        this.certificateFee = params.certificateFee;
        this.valueFee = params.valueFee;
        this.collectionItemFee = params.collectionItemFee;
        this.tokensRecordFee = params.tokensRecordFee;
    }

    readonly inclusionFee: Lgnt;
    readonly storageFee?: Lgnt;
    readonly legalFee?: Lgnt;
    readonly certificateFee?: Lgnt;
    readonly valueFee?: Lgnt;
    readonly collectionItemFee?: Lgnt;
    readonly tokensRecordFee?: Lgnt;

    get totalFee(): Lgnt {
        return this.inclusionFee
            .add(this.storageFee || Lgnt.zero())
            .add(this.legalFee || Lgnt.zero())
            .add(this.certificateFee || Lgnt.zero())
            .add(this.valueFee || Lgnt.zero())
            .add(this.collectionItemFee || Lgnt.zero())
            .add(this.tokensRecordFee || Lgnt.zero())
        ;
    }

    multiply(times: bigint): Fees {
        return new Fees({
            inclusionFee: this.inclusionFee.multiply(times),
            certificateFee: this.multiplyFee(this.certificateFee, times),
            collectionItemFee: this.multiplyFee(this.collectionItemFee, times),
            legalFee: this.multiplyFee(this.legalFee, times),
            storageFee: this.multiplyFee(this.storageFee, times),
            tokensRecordFee: this.multiplyFee(this.tokensRecordFee, times),
            valueFee: this.multiplyFee(this.valueFee, times),
        });
    }

    private multiplyFee(fee: Lgnt | undefined, times: bigint): Lgnt | undefined {
        if(fee !== undefined) {
            return fee.multiply(times);
        } else {
            return undefined;
        }
    }

    add(fee: Fees): Fees {
        return new Fees({
            inclusionFee: this.inclusionFee.add(fee.inclusionFee),
            certificateFee: this.addFee(this.certificateFee, fee.certificateFee),
            collectionItemFee: this.addFee(this.collectionItemFee, fee.collectionItemFee),
            legalFee: this.addFee(this.legalFee, fee.legalFee),
            storageFee: this.addFee(this.storageFee, fee.storageFee),
            tokensRecordFee: this.addFee(this.tokensRecordFee, fee.tokensRecordFee),
            valueFee: this.addFee(this.valueFee, fee.valueFee),
        });
    }

    private addFee(fee1: Lgnt | undefined, fee2: Lgnt | undefined): Lgnt | undefined {
        if(fee1 !== undefined && fee2 !== undefined) {
            return fee1.add(fee2);
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
        origin: ValidAccountId,
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

    private async estimateInclusionFee(origin: ValidAccountId, submittable: SubmittableExtrinsic): Promise<Lgnt> {
        const dispatchInfo = await submittable.paymentInfo(origin.address);
        const partialFee = dispatchInfo.partialFee.toBigInt();
        return Lgnt.fromCanonical(partialFee);
    }

    async estimateStorageFee(params: { numOfEntries: bigint, totSize: bigint }): Promise<Lgnt> {
        const { numOfEntries, totSize } = params;
        const fee = await this.api.call.feesApi.queryFileStorageFee(numOfEntries, totSize);
        return Lgnt.fromCanonical(fee.toBigInt());
    }

    getDefaultLegalFee(params: { locType: LocType }): Lgnt {
        const { locType } = params;
        if (locType === "Identity") {
            return Lgnt.from(160n);
        } else {
            return Lgnt.from(2000n);
        }
    }

    async estimateWithoutStorage(params: {
        origin: ValidAccountId,
        submittable: SubmittableExtrinsic,
    }): Promise<Fees> {
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        return new Fees({ inclusionFee });
    }

    async estimateCreateLoc(params: {
        origin: ValidAccountId,
        submittable: SubmittableExtrinsic,
        locType: LocType,
        valueFee?: Lgnt,
        legalFee?: Lgnt,
        storageSize?: bigint,
    }): Promise<Fees> {
        const { locType, valueFee, storageSize } = params;
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        const legalFee = params.legalFee !== undefined ? params.legalFee : this.getDefaultLegalFee({ locType });
        const storageFee = storageSize !== undefined ? await this.estimateStorageFee({ numOfEntries: 1n, totSize: storageSize }) : undefined;
        return new Fees({ inclusionFee, legalFee, valueFee, storageFee });
    }

    async estimateCertificateFee(params: { tokenIssuance: bigint }): Promise<Lgnt> {
        const { tokenIssuance } = params;
        const fee = await this.api.call.feesApi.queryCertificateFee(tokenIssuance);
        return Lgnt.fromCanonical(fee.toBigInt());
    }

    async estimateAddCollectionItem(params: {
        origin: ValidAccountId,
        submittable: SubmittableExtrinsic,
        numOfEntries: bigint,
        totSize: bigint,
        tokenIssuance: bigint | undefined,
        collectionItemFee: Lgnt,
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
        origin: ValidAccountId,
        submittable: SubmittableExtrinsic,
        numOfEntries: bigint,
        totSize: bigint,
        tokensRecordFee: Lgnt,
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

    async ensureEnoughFunds(params: { fees: Fees, origin: ValidAccountId }) {
        const { fees, origin } = params;
        const totalFees = fees.totalFee.canonical;
        const accountData = await this.api.query.system.account(origin.address);
        const existentialDeposit = this.api.consts.balances.existentialDeposit.toBigInt();
        if(accountData.data.free.toBigInt() - existentialDeposit < totalFees) {
            throw new Error("Not enough funds");
        }
    }
}
