import { ApiPromise } from "@polkadot/api";

export interface FileStorageFeesParameters {
    api: ApiPromise;
    numOfEntries: bigint,
    totSize: bigint
}

export async function queryFileStorageFee(params: FileStorageFeesParameters): Promise<bigint> {
    const { api, numOfEntries, totSize } = params;
    const fee = await api.call.feesApi.queryFileStorageFee(numOfEntries, totSize);
    return fee.toBigInt();
}
