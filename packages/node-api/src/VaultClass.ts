import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { createKeyMulti, encodeAddress } from '@polkadot/util-crypto';
import { Weight } from "./interfaces/index.js";
import { Lgnt } from "./Currency.js";
import { ValidAccountId } from "./Types.js";

export interface RequestVaultOutTransferParameters {
    amount: Lgnt;
    destination: ValidAccountId;
}

export interface ApproveVaultOutTransferParameters extends RequestVaultOutTransferParameters {
    signerId: ValidAccountId;
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
        requester: ValidAccountId,
        legalOfficers: ValidAccountId[],
    ) {
        this.api = api;
        this.requester = requester;
        this.legalOfficers = [ ...legalOfficers ];
        this.sortedLegalOfficers = this.legalOfficers.map(account => account.address).sort();
        this.account = Vault.getVaultAccountId(this.requester, this.legalOfficers);
    }

    private api: ApiPromise;
    private requester: ValidAccountId;
    private legalOfficers: ValidAccountId[];
    readonly account: ValidAccountId;
    private sortedLegalOfficers: string[];

    static getVaultAccountId(requesterAddress: ValidAccountId, legalOfficers: ValidAccountId[]): ValidAccountId {
        const signatories: string[] = [ requesterAddress.address, ...legalOfficers.map(accountId => accountId.address) ].sort();
        return ValidAccountId.polkadot(encodeAddress(createKeyMulti(signatories, Vault.THRESHOLD)));
    }

    readonly tx = {
        transferFromVault: async (parameters: RequestVaultOutTransferParameters): Promise<SubmittableExtrinsic> => {
            const actualAmount = parameters.amount.canonical;
            const { submittable, weight } = await this.transferCallAndWeight(actualAmount, parameters.destination);
        
            const existingMultisig = await this.api.query.multisig.multisigs(this.account.address, submittable.method.hash);
            if(existingMultisig.isSome) {
                throw new Error("A similar transfer has already been requested and is pending");
            }
            return this.api.tx.vault.requestCall(this.sortedLegalOfficers, submittable.method.hash, weight);
        },

        approveVaultTransfer: async (parameters: ApproveVaultOutTransferParameters): Promise<SubmittableExtrinsic> => {
            const {
                signerId,
                amount,
                destination,
                block,
                index,
            } = parameters;

            const otherLegalOfficer = this.legalOfficers.find(accountId => !accountId.equals(signerId));
            if(!otherLegalOfficer) {
                throw new Error("No other legal officer found");
            }

            const actualAmount = amount.canonical;
            const { submittable, weight } = await this.transferCallAndWeight(BigInt(actualAmount), destination);

            const otherSignatories = [ this.requester.address, otherLegalOfficer.address ].sort();
            return this.api.tx.vault.approveCall(otherSignatories, submittable.method, {height: block, index}, weight);
        },

        cancelVaultTransfer: (parameters: CancelVaultOutTransferParameters): SubmittableExtrinsic => {
            const { amount, destination, block, index } = parameters;
            const actualAmount = amount.canonical;
            const call = this.api.tx.balances.transferAllowDeath(destination.address, actualAmount);
            return this.api.tx.multisig.cancelAsMulti(Vault.THRESHOLD, this.sortedLegalOfficers, { height: block, index }, call.method.hash)
        },
    }

    private async transferCallAndWeight(
        amount: bigint,
        destination: ValidAccountId,
    ): Promise<{ submittable: SubmittableExtrinsic, weight: Weight }> {
        const submittable = this.api.tx.balances.transferAllowDeath(destination.address, amount);
        const dispatchInfo = await submittable.paymentInfo(this.account.address);
        const weight = dispatchInfo.weight;
        return {
            submittable,
            weight,
        }
    }
}
