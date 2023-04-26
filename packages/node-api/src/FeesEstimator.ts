import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import { UUID } from "./UUID.js";
import { Adapters } from "./Adapters.js";
import { ValidAccountId } from "./Types.js";

export class Fees {

    constructor(inclusionFee: bigint, storageFee?: bigint) {
        this.inclusionFee = inclusionFee;
        this.storageFee = storageFee;
    }

    readonly inclusionFee: bigint;
    readonly storageFee?: bigint;

    get totalFee(): bigint {
        return this.inclusionFee + (this.storageFee || 0n);
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
        const submittable = this.api.tx.logionLoc.addFile(Adapters.toLocId(args.locId), this.adapters.toLocFile(args));
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

    async estimateWithoutStorage(args: {
        origin: string,
        submittable: SubmittableExtrinsic,
    }): Promise<Fees> {
        const inclusionFee = await this.estimateInclusionFee(args.origin, args.submittable);
        return new Fees(inclusionFee);
    }
}
