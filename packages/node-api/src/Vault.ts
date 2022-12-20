import { ApiPromise } from "@polkadot/api";
import { createKeyMulti, encodeAddress } from '@polkadot/util-crypto';
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Call } from "@polkadot/types/interfaces";
import { Weight } from "./interfaces/runtime";

import { getRecoveryConfig } from "./Recovery.js";
import { PrefixedNumber } from "./numbers.js";
import { LGNT_SMALLEST_UNIT } from './Balances.js';

const THRESHOLD = 2;

export function getVaultAddress(requesterAddress: string, legalOfficers: string[]): string {
    const signatories: string[] = [ requesterAddress, ...legalOfficers ].sort()
    return encodeAddress(createKeyMulti(signatories, THRESHOLD));
}

export interface BuildRequestVaultTransferParameters {
    api: ApiPromise;
    legalOfficers: string[];
    amount: PrefixedNumber;
    destination: string;
}

export interface RequestVaultTransferParameters extends BuildRequestVaultTransferParameters {
    signerId: string;
}

export async function requestVaultTransfer(parameters: RequestVaultTransferParameters): Promise<SubmittableExtrinsic> {
    return await buildRequestCallSubmittable({ ...parameters, requesterAddress: parameters.signerId });
}

async function buildRequestCallSubmittable(parameters: BuildRequestVaultTransferParameters & { requesterAddress: string }): Promise<SubmittableExtrinsic> {
    const {
        api,
        requesterAddress,
        legalOfficers,
        destination,
        amount,
    } = parameters;

    const actualAmount = amount.convertTo(LGNT_SMALLEST_UNIT).coefficient.unnormalize();
    const { call, weight, multisigOrigin } = await transferCallAndWeight(api, requesterAddress, legalOfficers, BigInt(actualAmount), destination);

    const existingMultisig = await api.query.multisig.multisigs(multisigOrigin, call.method.hash);
    if(existingMultisig.isSome) {
        throw new Error("A similar transfer has already been requested and is pending");
    }

    const sortedLegalOfficers = [ ...legalOfficers ].sort();
    return api.tx.vault.requestCall(sortedLegalOfficers, call.method.hash, { refTime: weight })
}

export async function buildVaultTransferCall(parameters: BuildRequestVaultTransferParameters & { requesterAddress: string }): Promise<Call> {
    return parameters.api.createType('Call', await buildRequestCallSubmittable(parameters))
}

async function transferCallAndWeight(
    api: ApiPromise,
    requesterAddress: string,
    legalOfficers: string[],
    amount: bigint,
    destination: string,
): Promise<{ call: SubmittableExtrinsic, weight: string, multisigOrigin: string }> {
    const multisigOrigin = getVaultAddress(requesterAddress, legalOfficers);
    const call = transferCall(api, destination, amount);
    const dispatchInfo = await call.paymentInfo(multisigOrigin);
    const maxWeight = dispatchInfo.weight as unknown as Weight;
    return {
        call,
        weight: maxWeight.refTime.toString(),
        multisigOrigin
    }
}

function transferCall(
    api: ApiPromise,
    destination: string,
    amount: bigint,
): SubmittableExtrinsic {
    return api.tx.balances.transfer(destination, amount);
}

export interface VaultTransferApprovalParameters {
    api: ApiPromise,
    requester: string,
    amount: PrefixedNumber;
    destination: string;
    block: bigint,
    index: number,
    signerId: string,
}

export async function approveVaultTransfer(parameters: VaultTransferApprovalParameters): Promise<SubmittableExtrinsic> {
    const {
        api,
        signerId,
        requester,
        amount,
        destination,
        block,
        index,
    } = parameters;

    const recoveryConfig = await getRecoveryConfig({
        api,
        accountId: requester
    });
    if(!recoveryConfig) {
        throw new Error("Cannot approve vault transfer of requester without recovery defined");
    }

    const otherLegalOfficer = recoveryConfig.legalOfficers.find(accountId => accountId !== signerId);
    if(!otherLegalOfficer) {
        throw new Error("No other legal officer found");
    }

    const actualAmount = amount.convertTo(LGNT_SMALLEST_UNIT).coefficient.unnormalize();
    const { call, weight } = await transferCallAndWeight(api, requester, recoveryConfig.legalOfficers, BigInt(actualAmount), destination);

    const otherSignatories = [ requester, otherLegalOfficer ].sort();
    return api.tx.vault.approveCall(otherSignatories, call.method, {height: block, index}, { refTime: weight });
}

export interface CancelVaultTransferParameters {
    api: ApiPromise;
    legalOfficers: string[];
    amount: PrefixedNumber;
    destination: string;
    block: bigint,
    index: number
}

export function buildCancelVaultTransferCall(parameters: CancelVaultTransferParameters): Call {
    return parameters.api.createType('Call', cancelVaultTransfer(parameters))
}

export function cancelVaultTransfer(parameters: CancelVaultTransferParameters): SubmittableExtrinsic {
    const { api, amount, destination, legalOfficers, block, index } = parameters
    const actualAmount = amount.convertTo(LGNT_SMALLEST_UNIT).coefficient.unnormalize();
    const call = transferCall(api, destination, BigInt(actualAmount));
    const sortedLegalOfficers = [ ...legalOfficers ].sort();
    return api.tx.multisig.cancelAsMulti(2, sortedLegalOfficers, {height: block, index}, call.method.hash)
}
