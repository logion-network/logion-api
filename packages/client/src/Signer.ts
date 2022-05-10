import { DateTime } from "luxon";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

export interface SignRawParameters {
    signerId: string;
    resource: string;
    operation: string;
    signedOn: DateTime;
    attributes: any[];
}

export interface RawSigner {

    signRaw(parameters: SignRawParameters): Promise<string>;
}

export interface Signer {

    signAndSend(parameters: {
        signerId: string,
        submittable: SubmittableExtrinsic,
    }): Promise<void>;
}
