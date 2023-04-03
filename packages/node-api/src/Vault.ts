import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Call } from "@polkadot/types/interfaces";

import { PrefixedNumber } from "./numbers.js";
import { LogionNodeApiClass } from "./Connection.js";
import { Vault } from "./VaultClass.js";

/**
 * @deprecated use Queries.getVaultAddress(requester, legalOfficers)
 */
export function getVaultAddress(requesterAddress: string, legalOfficers: string[]): string {
    return Vault.getVaultAddress(requesterAddress, legalOfficers);
}

/**
 * @deprecated
 */
export interface BuildRequestVaultTransferParameters {
    api: ApiPromise;
    legalOfficers: string[];
    amount: PrefixedNumber;
    destination: string;
}

/**
 * @deprecated
 */
export interface RequestVaultTransferParameters extends BuildRequestVaultTransferParameters {
    signerId: string;
}

/**
 * @deprecated use vault.tx.transferFromVault(parameters)
 */
export async function requestVaultTransfer(parameters: RequestVaultTransferParameters): Promise<SubmittableExtrinsic> {
    return await buildRequestCallSubmittable({ ...parameters, requesterAddress: parameters.signerId });
}

async function buildRequestCallSubmittable(parameters: BuildRequestVaultTransferParameters & { requesterAddress: string }): Promise<SubmittableExtrinsic> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const vault = logionApi.vault(parameters.requesterAddress, parameters.legalOfficers);
    return vault.tx.transferFromVault(parameters);
}

/**
 * @deprecated use vault.tx.transferFromVault(parameters) and logionApi.adapters.toCall(submittable)
 */
export async function buildVaultTransferCall(parameters: BuildRequestVaultTransferParameters & { requesterAddress: string }): Promise<Call> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.adapters.toCall(await buildRequestCallSubmittable(parameters));
}

/**
 * @deprecated
 */
export interface VaultTransferApprovalParameters {
    api: ApiPromise,
    requester: string,
    amount: PrefixedNumber;
    destination: string;
    block: bigint,
    index: number,
    signerId: string,
}

/**
 * @deprecated use vault.tx.approveVaultTransfer(parameters), the set of legal officers comes from recovery configuration.
 */
export async function approveVaultTransfer(parameters: VaultTransferApprovalParameters): Promise<SubmittableExtrinsic> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const legalOfficers = await logionApi.queries.getRecoveryConfig(parameters.requester);
    if(!legalOfficers) {
        throw new Error("Cannot approve vault transfer for requester without recovery configured");
    }
    const vault = logionApi.vault(parameters.requester, legalOfficers.legalOfficers);
    return await vault.tx.approveVaultTransfer(parameters);
}

/**
 * @deprecated
 */
export interface CancelVaultTransferParameters {
    api: ApiPromise;
    legalOfficers: string[];
    amount: PrefixedNumber;
    destination: string;
    block: bigint,
    index: number
}

/**
 * @deprecated use vault.tx.cancelVaultTransfer(parameters) and logionApi.adapters.toCall(submittable)
 */
export function buildCancelVaultTransferCall(parameters: CancelVaultTransferParameters): Call {
    return parameters.api.createType('Call', cancelVaultTransfer(parameters))
}

/**
 * @deprecated use vault.tx.cancelVaultTransfer(parameters)
 */
export function cancelVaultTransfer(parameters: CancelVaultTransferParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    const vault = logionApi.vault("", parameters.legalOfficers); // requester is not necessary when cancelling
    return vault.tx.cancelVaultTransfer(parameters);
}
