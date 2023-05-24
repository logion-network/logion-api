import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import { UUID } from "./UUID.js";
import { Adapters } from "./Adapters.js";
import { ValidAccountId, LocType } from "./Types.js";

export class Fees {

    constructor(inclusionFee: bigint, storageFee?: bigint, legalFee?: bigint) {
        this.inclusionFee = inclusionFee;
        this.storageFee = storageFee;
        this.legalFee = legalFee;
    }

    readonly inclusionFee: bigint;
    readonly storageFee?: bigint;
    readonly legalFee?: bigint;

    get totalFee(): bigint {
        return this.inclusionFee + (this.storageFee || 0n) + (this.legalFee || 0n);
    }
}

export class FeesEstimator {

    constructor(api: ApiPromise, adapters: Adapters) {
        this.api = api;
        this.adapters = adapters;
    }

    private readonly api: ApiPromise;
    private readonly adapters: Adapters;

    async estimateAddFile(args: {
        locId: UUID,
        hash: string,
        nature: string,
        submitter: ValidAccountId,
        size: bigint,
        origin: string,
    }): Promise<Fees> {
        const submittable = this.api.tx.logionLoc.addFile(Adapters.toLocId(args.locId), this.adapters.toPalletLogionLocFile(args));
        const inclusionFee = await this.estimateInclusionFee(args.origin, submittable);
        const storageFee = await this.estimateStorageFee({
            numOfEntries: 1n,
            totSize: args.size,
        });
        return new Fees(inclusionFee, storageFee);
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
        return new Fees(inclusionFee);
    }

    async estimateCreateLoc(params: {
        origin: string,
        submittable: SubmittableExtrinsic,
        locType: LocType,
    }): Promise<Fees> {
        const { locType } = params;
        const inclusionFee = await this.estimateInclusionFee(params.origin, params.submittable);
        const legalFee = await this.estimateLegalFee({ locType });
        return new Fees(inclusionFee, undefined, legalFee);
    }
}
