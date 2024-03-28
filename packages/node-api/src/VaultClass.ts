import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { createKeyMulti, encodeAddress } from '@polkadot/util-crypto';
import { Weight } from "./interfaces/index.js";
import { Lgnt } from "./Currency.js";

export interface RequestVaultOutTransferParameters {
    amount: Lgnt;
    destination: string;
}

export interface ApproveVaultOutTransferParameters extends RequestVaultOutTransferParameters {
    signerId: string;
    block: bigint;
    index: number;
}

export interface CancelVaultOutTransferParameters extends RequestVaultOutTransferParameters {
    block: bigint,
    index: number
}

export class Vault {

    // Should be taken from runtime, requires https://github.com/logion-network/logion-internal/issues/1193
    static readonly THRESHOLD = 2;

    constructor(
        api: ApiPromise,
        requester: string,
        legalOfficers: string[],
    ) {
        this.api = api;
        this.requester = requester;
        this.legalOfficers = [ ...legalOfficers ].sort();
        this.address = Vault.getVaultAddress(this.requester, this.legalOfficers);
    }

    private api: ApiPromise;
    private requester: string;
    private legalOfficers: string[];
    readonly address: string;

    static getVaultAddress(requesterAddress: string, legalOfficers: string[]): string {
        const signatories: string[] = [ requesterAddress, ...legalOfficers ].sort();
        return encodeAddress(createKeyMulti(signatories, Vault.THRESHOLD));
    }

    readonly tx = {
        transferFromVault: async (parameters: RequestVaultOutTransferParameters): Promise<SubmittableExtrinsic> => {
            const actualAmount = parameters.amount.canonical;
            const { submittable, weight } = await this.transferCallAndWeight(actualAmount, parameters.destination);
        
            const existingMultisig = await this.api.query.multisig.multisigs(this.address, submittable.method.hash);
            if(existingMultisig.isSome) {
                throw new Error("A similar transfer has already been requested and is pending");
            }
            return this.api.tx.vault.requestCall(this.legalOfficers, submittable.method.hash, weight);
        },

        approveVaultTransfer: async (parameters: ApproveVaultOutTransferParameters): Promise<SubmittableExtrinsic> => {
            const {
                signerId,
                amount,
                destination,
                block,
                index,
            } = parameters;

            const otherLegalOfficer = this.legalOfficers.find(accountId => accountId !== signerId);
            if(!otherLegalOfficer) {
                throw new Error("No other legal officer found");
            }

            const actualAmount = amount.canonical;
            const { submittable, weight } = await this.transferCallAndWeight(BigInt(actualAmount), destination);

            const otherSignatories = [ this.requester, otherLegalOfficer ].sort();
            return this.api.tx.vault.approveCall(otherSignatories, submittable.method, {height: block, index}, weight);
        },

        cancelVaultTransfer: (parameters: CancelVaultOutTransferParameters): SubmittableExtrinsic => {
            const { amount, destination, block, index } = parameters;
            const actualAmount = amount.canonical;
            const call = this.api.tx.balances.transferAllowDeath(destination, actualAmount);
            const sortedLegalOfficers = [ ...this.legalOfficers ].sort();
            return this.api.tx.multisig.cancelAsMulti(Vault.THRESHOLD, sortedLegalOfficers, { height: block, index }, call.method.hash)
        },
    }

    private async transferCallAndWeight(
        amount: bigint,
        destination: string,
    ): Promise<{ submittable: SubmittableExtrinsic, weight: Weight }> {
        const submittable = this.api.tx.balances.transferAllowDeath(destination, amount);
        const dispatchInfo = await submittable.paymentInfo(this.address);
        const weight = dispatchInfo.weight;
        return {
            submittable,
            weight,
        }
    }
}
