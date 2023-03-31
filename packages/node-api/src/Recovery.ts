import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { Call } from '@polkadot/types/interfaces';
import { LogionNodeApiClass } from './Connection.js';
import { TypesRecoveryConfig } from './Types.js';

/**
 * @deprecated
 */
export interface RecoveryCreationParameters {
    api: ApiPromise,
    legalOfficers: string[]
}

/**
 * @deprecated use logionApi.polkadot.tx.verifiedRecovery.createRecovery(legalOfficers)
 * WARNING: the list of legal officers must be sorted.
 */
export function createRecovery(parameters: RecoveryCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const sortedLegalOfficers = [ ...parameters.legalOfficers ].sort();
    return logionApi.polkadot.tx.verifiedRecovery.createRecovery(sortedLegalOfficers);
}

/**
 * @deprecated
 */
export interface GetRecoveryConfigParameters {
    api: ApiPromise,
    accountId: string,
}

/**
 * @deprecated use logionApi.queries.getRecoveryConfig(accountId)
 */
export async function getRecoveryConfig(parameters: GetRecoveryConfigParameters): Promise<RecoveryConfig | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getRecoveryConfig(parameters.accountId);
}

/**
 * @deprecated use TypesRecoveryConfig
 */
export interface RecoveryConfig extends TypesRecoveryConfig {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated
 */
export interface GetActiveRecoveryParameters {
    api: ApiPromise,
    sourceAccount: string,
    destinationAccount: string,
}

/**
 * @deprecated use logionApi.queries.getActiveRecovery(sourceAccount, destinationAccount)
 */
export async function getActiveRecovery(parameters: GetActiveRecoveryParameters): Promise<ActiveRecovery | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getActiveRecovery(parameters.sourceAccount, parameters.destinationAccount);
}

/**
 * @deprecated use TypesActiveRecovery
 */
export interface ActiveRecovery extends TypesRecoveryConfig {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated
 */
export interface InitiateRecoveryParameters {
    api: ApiPromise,
    addressToRecover: string,
}

/**
 * @deprecated use logionApi.polkadot.tx.recovery.initiateRecovery(addressToRecover)
 */
export function initiateRecovery(parameters: InitiateRecoveryParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.recovery.initiateRecovery(parameters.addressToRecover);
}

/**
 * @deprecated
 */
export interface VouchRecoveryParameters {
    api: ApiPromise,
    lost: string,
    rescuer: string,
}

/**
 * @deprecated use logionApi.polkadot.tx.recovery.vouchRecovery(lost, rescuer)
 */
export function vouchRecovery(parameters: VouchRecoveryParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.recovery.vouchRecovery(parameters.lost, parameters.rescuer);
}

/**
 * @deprecated
 */
export interface GetProxyParameters {
    api: ApiPromise,
    currentAddress: string,
}

/**
 * @deprecated use logionApi.queries.getProxy(address)
 */
export async function getProxy(parameters: GetProxyParameters): Promise<string | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getProxy(parameters.currentAddress);
}

/**
 * @deprecated
 */
export interface ClaimRecoveryParameters {
    api: ApiPromise,
    addressToRecover: string,
}

/**
 * @deprecated use logionApi.polkadot.tx.recovery.claimRecovery(addressToRecover)
 */
export function claimRecovery(parameters: ClaimRecoveryParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.recovery.claimRecovery(parameters.addressToRecover);
}

/**
 * @deprecated
 */
export interface SignAndSendAsRecoveredParameters {
    api: ApiPromise,
    recoveredAccountId: string,
    call: Call,
}

/**
 * @deprecated use logionApi.polkadot.tx.recovery.asRecovered(recoveredAccountId, call)
 */
export function asRecovered(parameters: SignAndSendAsRecoveredParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.recovery.asRecovered(parameters.recoveredAccountId, parameters.call);
}
