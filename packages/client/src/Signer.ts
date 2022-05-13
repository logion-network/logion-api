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
    attributes: any[];
}

export interface RawSigner {

    signRaw(parameters: SignRawParameters): Promise<string>;
}

export interface SignParameters {
    signerId: string;
    submittable: SubmittableExtrinsic;
    callback?: (result: ISubmittableResult) => void;
}

export interface Signer {

    signAndSend(parameters: SignParameters): Promise<void>;
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
        const bytes = keypair.sign!(message);
        return '0x' + Buffer.from(bytes).toString('hex');
    }

    signAndSend(parameters: SignParameters): Promise<void> {
        const keypair = this.keyring.getPair(parameters.signerId);
        const registry = parameters.submittable.registry;
        const next = parameters.callback;
        return new Promise(async (resolve, reject) => {
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

function buildAttributes(parameters: SignRawParameters): any[] {
    let signedOn = toIsoString(parameters.signedOn);
    const attributes = [parameters.resource, parameters.operation, signedOn];
    return attributes.concat(parameters.attributes);
}

export function hashAttributes(attributes: any[]): string {
    let digest = new Hash();
    for (let i = 0; i < attributes.length; i++) {
        const bytes = new TextEncoder().encode(attributes[i]);
        digest.update(bytes);
    }
    return base64Encode(digest.digest());
}

export function signerCallback(params: {
    next?: (result: ISubmittableResult) => void;
    unsub: () => void;
    resolve: () => void;
    reject: (error: any) => void;
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
            params.resolve();
        }
    }
}
