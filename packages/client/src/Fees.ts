import { Fees as FeesClass } from "@logion/node-api";

// The fields below must be kept in sync with FeesView in
// https://github.com/logion-network/logion-backend-ts/blob/main/src/logion/controllers/components.ts

export interface Fees {
    /** @description Inclusion fee */
    inclusion: string;
    /** @description File storage fee (if applicable) */
    storage?: string;
    /** @description Legal fee (if applicable) */
    legal?: string;
    /** @description Certificate fee (if applicable) */
    certificate?: string;
    /** @description Total fee (inclusion + storage) */
    total?: string;
}

export function toFeesClass(fees: Fees | undefined): FeesClass | undefined {
    if(fees) {
        return new FeesClass({
            inclusionFee: BigInt(fees.inclusion),
            storageFee: fees.storage ? BigInt(fees.storage) : undefined,
            legalFee: fees.legal ? BigInt(fees.legal) : undefined,
            certificateFee: fees.certificate ? BigInt(fees.certificate) : undefined,
        });
    } else {
        return undefined;
    }
}
