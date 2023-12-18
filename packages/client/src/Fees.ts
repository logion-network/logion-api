import { Fees as FeesClass, Lgnt } from "@logion/node-api";

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
    /** @description Value fee (if applicable) */
    value?: string;
    /** @description Collection item fee (if applicable) */
    collectionItem?: string;
    /** @description Tokens record fee (if applicable) */
    tokensRecord?: string;
    /** @description Total fee */
    total: string;
}

export function toFeesClass(fees: Fees | undefined): FeesClass | undefined {
    if(fees) {
        return new FeesClass({
            inclusionFee: Lgnt.fromCanonical(BigInt(fees.inclusion)),
            storageFee: fees.storage ? Lgnt.fromCanonical(BigInt(fees.storage)) : undefined,
            legalFee: fees.legal ? Lgnt.fromCanonical(BigInt(fees.legal)) : undefined,
            certificateFee: fees.certificate ? Lgnt.fromCanonical(BigInt(fees.certificate)) : undefined,
            valueFee: fees.value ? Lgnt.fromCanonical(BigInt(fees.value)) : undefined,
            collectionItemFee: fees.collectionItem ? Lgnt.fromCanonical(BigInt(fees.collectionItem)) : undefined,
            tokensRecordFee: fees.tokensRecord ? Lgnt.fromCanonical(BigInt(fees.tokensRecord)) : undefined,
        });
    } else {
        return undefined;
    }
}
