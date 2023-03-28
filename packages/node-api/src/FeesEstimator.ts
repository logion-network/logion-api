import { LogionNodeApi } from "./Connection.js";
import { UUID } from "./UUID.js";
import { addFile } from "./LogionLoc.js";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";

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

    constructor(api: LogionNodeApi) {
        this.api = api;
    }

    private readonly api: LogionNodeApi;

    async estimateAddFile(args: {
        locId: UUID,
        hash: string,
        nature: string,
        submitter: string,
        size: bigint,
        origin: string,
    }): Promise<Fees> {
        const submittable = addFile({
            api: this.api,
            hash: args.hash,
            locId: args.locId,
            nature: args.nature,
            size: args.size,
            submitter: args.submitter,
        });
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
