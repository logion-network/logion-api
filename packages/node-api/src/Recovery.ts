import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { Call } from '@polkadot/types/interfaces';

export interface RecoveryCreationParameters {
    api: ApiPromise,
    legalOfficers: string[]
}

export function createRecovery(parameters: RecoveryCreationParameters): SubmittableExtrinsic {
    const {
        api,
        legalOfficers,
    } = parameters;

    const sortedLegalOfficers = [ ...legalOfficers ].sort();
    return api.tx.verifiedRecovery.createRecovery(sortedLegalOfficers);
}

export interface GetRecoveryConfigParameters {
    api: ApiPromise,
    accountId: string,
}

export async function getRecoveryConfig(parameters: GetRecoveryConfigParameters): Promise<RecoveryConfig | undefined> {
    const {
        api,
        accountId,
    } = parameters;

    const recoveryConfig = await api.query.recovery.recoverable(accountId);
    if (recoveryConfig.isEmpty) {
        return undefined
    }
    return { legalOfficers: recoveryConfig.unwrap().friends.toArray().map(accountId => accountId.toString())};
}

export type RecoveryConfig = {
    legalOfficers: string[]
}

export interface GetActiveRecoveryParameters {
    api: ApiPromise,
    sourceAccount: string,
    destinationAccount: string,
}

export async function getActiveRecovery(parameters: GetActiveRecoveryParameters): Promise<ActiveRecovery | undefined> {
    const {
        api,
        sourceAccount,
        destinationAccount,
    } = parameters;

    const activeRecovery = await api.query.recovery.activeRecoveries(sourceAccount, destinationAccount);
    if (activeRecovery.isEmpty) {
        return undefined
    }
    return { legalOfficers: activeRecovery.unwrap().friends.toArray().map(accountId => accountId.toString())};
}

export type ActiveRecovery = {
    legalOfficers: string[]
}

export interface InitiateRecoveryParameters {
    api: ApiPromise,
    addressToRecover: string,
}

export function initiateRecovery(parameters: InitiateRecoveryParameters): SubmittableExtrinsic {
    const {
        api,
        addressToRecover,
    } = parameters;

    return api.tx.recovery.initiateRecovery(addressToRecover);
}

export interface VouchRecoveryParameters {
    api: ApiPromise,
    lost: string,
    rescuer: string,
}

export function vouchRecovery(parameters: VouchRecoveryParameters): SubmittableExtrinsic {
    const {
        api,
        lost,
        rescuer,
    } = parameters;

    return api.tx.recovery.vouchRecovery(lost, rescuer);
}

export interface GetProxyParameters {
    api: ApiPromise,
    currentAddress: string,
}

export async function getProxy(parameters: GetProxyParameters): Promise<string | undefined> {
    const {
        api,
        currentAddress,
    } = parameters;

    const proxy = await api.query.recovery.proxy(currentAddress);
    if (proxy.isEmpty) {
        return undefined
    }
    return proxy.unwrap().toString();
}

export interface ClaimRecoveryParameters {
    api: ApiPromise,
    addressToRecover: string,
}

export function claimRecovery(parameters: ClaimRecoveryParameters): SubmittableExtrinsic {
    const {
        api,
        addressToRecover,
    } = parameters;

    return api.tx.recovery.claimRecovery(addressToRecover);
}

export interface SignAndSendAsRecoveredParameters {
    api: ApiPromise,
    recoveredAccountId: string,
    call: Call,
}

export function asRecovered(parameters: SignAndSendAsRecoveredParameters): SubmittableExtrinsic {
    const {
        api,
        recoveredAccountId,
        call,
    } = parameters;

    return api.tx.recovery.asRecovered(recoveredAccountId, call);
}
