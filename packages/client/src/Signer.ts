import { DateTime } from "luxon";

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
