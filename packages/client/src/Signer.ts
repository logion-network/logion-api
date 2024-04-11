import { TypesEvent, Adapters, ValidAccountId } from '@logion/node-api';
import { Keyring } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { Registry } from '@polkadot/types-codec/types';
import { base64Encode } from '@polkadot/util-crypto';
import { stringToHex } from '@polkadot/util';
import { Hash } from 'fast-sha256';
import { DateTime } from "luxon";
import { toIsoString } from "./DateTimeUtil.js";
import { requireDefined } from "./assertions.js";

export interface SignRawParameters {
    signerId: ValidAccountId;
    resource: string;
    operation: string;
    signedOn: DateTime;
    attributes: string[];
}

export type SignatureType = "POLKADOT" | "ETHEREUM" | "CROSSMINT_ETHEREUM" | "MULTIVERSX";

export interface TypedSignature {
    signature: string
    type: SignatureType
}

export interface RawSigner {

    signRaw(parameters: SignRawParameters): Promise<TypedSignature>;
}

export type SignCallback = (result: ISubmittableResult) => void;

export interface SignParameters {
    signerId: ValidAccountId;
    submittable: SubmittableExtrinsic;
    callback?: SignCallback;
    strategy?: SignAndSendStrategy;
}

export interface SuccessfulSubmission {
    readonly block: string;
    readonly index: number;
    readonly events: TypesEvent[];
}

export interface Signer {

    signAndSend(parameters: SignParameters): Promise<SuccessfulSubmission>;
}

export type FullSigner = RawSigner & Signer;

export type SignAndSendFunction = (statusCallback: (result: ISubmittableResult) => void) => Promise<() => void>;

export interface SignAndSendStrategy {
    canUnsub(result: ISubmittableResult): boolean;
}

export class DefaultSignAndSendStrategy implements SignAndSendStrategy {

    canUnsub(result: ISubmittableResult): boolean {
        return result.status.isFinalized;
    }
}

interface SubmissionState {
    block?: string;
}

export interface BlockchainSubmissionParams {
    signer: Signer;
    callback?: SignCallback;
}

export interface BlockchainSubmission<T> extends BlockchainSubmissionParams {
    payload: T;
}

export interface BlockchainBatchSubmission<T> extends BlockchainSubmissionParams {
    payload: T[];
}

export abstract class BaseSigner implements FullSigner {

    constructor(signAndSendStrategy?: SignAndSendStrategy) {
        if(signAndSendStrategy) {
            this.signAndSendStrategy = signAndSendStrategy;
        } else {
            this.signAndSendStrategy = new DefaultSignAndSendStrategy();
        }
    }

    private signAndSendStrategy: SignAndSendStrategy;

    async signRaw(parameters: SignRawParameters): Promise<TypedSignature> {
        const message = this.buildMessage(parameters);
        return await this.signToHex(parameters.signerId, message);
    }

    abstract signToHex(signerId: ValidAccountId, message: string): Promise<TypedSignature>;

    buildMessage(parameters: SignRawParameters): string {
        return stringToHex(hashAttributes(this.buildAttributes(parameters)));
    }

    buildAttributes(parameters: SignRawParameters): string[] {
        const signedOn = toIsoString(parameters.signedOn);
        const attributes = [parameters.resource, parameters.operation, signedOn];
        return attributes.concat(parameters.attributes);
    }

    async signAndSend(parameters: SignParameters): Promise<SuccessfulSubmission> {
        const signAndSendFunction = await this.buildSignAndSendFunction(parameters);
        try {
            return await this.buildSignAndSendPromise({
                ...parameters,
                signAndSend: signAndSendFunction,
            });
        } catch(e) {
            if(typeof e === "object" && e !== null && "message" in e && typeof e.message === "string") {
                throw new Error(e.message);
            } else {
                throw new Error("Unexpected error");
            }
        }
    }

    abstract buildSignAndSendFunction(parameters: SignParameters): Promise<SignAndSendFunction>;

    private buildSignAndSendPromise(parameters: SignParameters & { signAndSend: SignAndSendFunction }): Promise<SuccessfulSubmission> {
        const registry = parameters.submittable.registry;
        const next = parameters.callback;
        return new Promise<SuccessfulSubmission>((resolve, reject) => {
            let unsub: (() => void) | undefined;
            const submissionState: SubmissionState = {};
            parameters.signAndSend(result => {
                if(unsub) {
                    this.signerCallback({
                        result,
                        unsub,
                        reject,
                        resolve,
                        registry,
                        next,
                        submissionState,
                        signAndSendStrategy: parameters.strategy ? parameters.strategy : this.signAndSendStrategy,
                    });
                }
            })
            .then(unsubParam => unsub = unsubParam)
            .catch(error => reject(error));
        });
    }

    private signerCallback(params: {
        next?: (result: ISubmittableResult) => void;
        unsub: () => void;
        resolve: (result: SuccessfulSubmission) => void;
        reject: (error: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
        registry: Registry;
        result: ISubmittableResult;
        submissionState: SubmissionState;
        signAndSendStrategy: SignAndSendStrategy;
    }) {
        if(params.next !== undefined) {
            params.next(params.result);
        }
        if (params.result.status.isInBlock) {
            params.submissionState.block = params.result.status.asInBlock.toString();
        }
        if (params.result.dispatchError || params.signAndSendStrategy.canUnsub(params.result)) {
            params.unsub();
            if(params.result.dispatchError) {
                params.reject(new Error(Adapters.getErrorMessage(params.result.dispatchError)));
            } else {
                params.resolve({
                    block: requireDefined(params.submissionState.block),
                    index: params.result.txIndex || -1,
                    events: Adapters.getExtrinsicEvents(params.result),
                });
            }
        }
    }

}

export class KeyringSigner extends BaseSigner {

    constructor(keyring: Keyring, signAndSendStrategy?: SignAndSendStrategy) {
        super(signAndSendStrategy);
        this.keyring = keyring;
    }

    private keyring: Keyring;

    async signToHex(signerId: ValidAccountId, message: string): Promise<TypedSignature> {
        const keypair = this.keyring.getPair(signerId.address);
        const bytes = keypair.sign(message);
        const signature = '0x' + Buffer.from(bytes).toString('hex');
        const type: SignatureType = keypair.type === "ethereum" ? "ETHEREUM" : "POLKADOT";
        return { signature, type };
    }

    async buildSignAndSendFunction(parameters: SignParameters): Promise<SignAndSendFunction> {
        const keypair = this.keyring.getPair(parameters.signerId.address);
        return statusCallback => parameters.submittable.signAndSend(keypair, statusCallback);
    }
}

export function hashAttributes(attributes: string[]): string {
    const digest = new Hash();
    for (let i = 0; i < attributes.length; i++) {
        const bytes = encodeString(attributes[i]);
        digest.update(bytes);
    }
    return base64Encode(digest.digest());
}

function encodeString(str: string): Uint8Array {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
