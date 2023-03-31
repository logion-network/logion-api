import { ApiPromise } from '@polkadot/api';
import { LogionNodeApiClass } from './Connection.js';

/**
 * @deprecated use logionApi.queries.isValidAccountId(accountId)
 */
export function isValidAccountId(api: ApiPromise, accountId?: string | null): boolean {
    const logionApi = new LogionNodeApiClass(api);
    return logionApi.queries.isValidAccountId(accountId);
}
