import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { ApiPromise } from "@polkadot/api";

export class Batching {

    constructor(api: ApiPromise) {
        this.api = api;
    }

    private readonly api: ApiPromise;

    batchAll(submittables: SubmittableExtrinsic[]): SubmittableExtrinsic {
        if (submittables.length === 0) {
            throw Error("Cannot batch with empty submittable extrinsics list");
        } else if (submittables.length === 1) {  // Do not add utility overhead when not necessary
            return submittables[0];
        } else {
            return this.api.tx.utility.batchAll(submittables);
        }
    }
}

