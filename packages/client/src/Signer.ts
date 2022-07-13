import { DateTime } from "luxon";
import { Keyring } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { base64Encode } from '@polkadot/util-crypto';
import { Registry } from '@polkadot/types-codec/types';
import { toHex } from '@logion/node-api/dist/Codec';
import { buildErrorMessage } from '@logion/node-api/dist/Error';
import { Hash } from 'fast-sha256';
import { TextEncoder } from 'util';

import { toIsoString } from './DateTimeUtil';

export interface SignRawParameters {
    signerId: string;
    resource: string;
    operation: string;
    signedOn: DateTime;
    attributes: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface RawSigner {

    signRaw(parameters: SignRawParameters): Promise<string>;
}

export type SignCallback = (result: ISubmittableResult) => void;

export interface SignParameters {
    signerId: string;
    submittable: SubmittableExtrinsic;
    callback?: SignCallback;
}

export interface SuccessfulSubmission {
    readonly block: string;
    readonly index: number;
}

export interface Signer {

    signAndSend(parameters: SignParameters): Promise<SuccessfulSubmission>;
}

export type FullSigner = RawSigner & Signer;

export class KeyringSigner implements FullSigner {

    constructor(keyring: Keyring) {
        this.keyring = keyring;
    }

    private keyring: Keyring;

    async signRaw(parameters: SignRawParameters): Promise<string> {
        const message = buildMessage(parameters);
        const keypair = this.keyring.getPair(parameters.signerId);
        const bytes = keypair.sign(message);
        return '0x' + Buffer.from(bytes).toString('hex');
    }

    signAndSend(parameters: SignParameters): Promise<SuccessfulSubmission> {
        const keypair = this.keyring.getPair(parameters.signerId);
        const registry = parameters.submittable.registry;
        const next = parameters.callback;
        return new Promise<SuccessfulSubmission>(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor
            try {
                const unsub = await parameters.submittable.signAndSend(keypair, (result) => {
                    signerCallback({
                        result,
                        unsub,
                        reject,
                        resolve,
                        registry,
                        next,
                    })
                });
              } catch(e) {
                reject(e);
              }
        });
    }
}

export function buildMessage(parameters: SignRawParameters): string {
    return toHex(hashAttributes(buildAttributes(parameters)));
}

function buildAttributes(parameters: SignRawParameters): string[] {
    const signedOn = toIsoString(parameters.signedOn);
    const attributes = [parameters.resource, parameters.operation, signedOn];
    return attributes.concat(parameters.attributes);
}

export function hashAttributes(attributes: any[]): string { // eslint-disable-line @typescript-eslint/no-explicit-any
    const digest = new Hash();
    for (let i = 0; i < attributes.length; i++) {
        const bytes = new TextEncoder().encode(attributes[i]);
        digest.update(bytes);
    }
    return base64Encode(digest.digest());
}

export function signerCallback(params: {
    next?: (result: ISubmittableResult) => void;
    unsub: () => void;
    resolve: (result: SuccessfulSubmission) => void;
    reject: (error: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    registry: Registry;
    result: ISubmittableResult;
}) {
    if(params.next !== undefined) {
        params.next(params.result);
    }
    if (params.result.status.isInBlock) {
        params.unsub();
        if(params.result.dispatchError) {
            params.reject(new Error(buildErrorMessage(params.registry, params.result.dispatchError)));
        } else {
            params.resolve({
                block: params.result.status.asInBlock.toString(),
                index: params.result.txIndex || -1
            });
        }
    }
}

export function isSuccessful(result: ISubmittableResult): boolean {
    return result.status.isInBlock && !result.dispatchError;
}
