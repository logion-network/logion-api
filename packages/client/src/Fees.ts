export interface Fees {
    /** @description Inclusion fee */
    inclusion: string;
    /** @description File storage fee (if applicable) */
    storage?: string;
    /** @description Total fee (inclusion + storage) */
    total: string;
}
