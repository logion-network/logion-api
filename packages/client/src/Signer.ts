import { DateTime } from "luxon";
import { Keyring } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { base64Encode } from '@polkadot/util-crypto';
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

export interface Signer {

    signAndSend(parameters: {
        signerId: string,
        submittable: SubmittableExtrinsic,
    }): Promise<void>;
}

export type FullSigner = RawSigner & Signer;

export class KeyringSigner implements FullSigner {

    constructor(keyring: Keyring) {
        this.keyring = keyring;
    }

    private keyring: Keyring;

    async signRaw(parameters: SignRawParameters): Promise<string> {
        let signedOn = toIsoString(parameters.signedOn);
        const attributes = [parameters.resource, parameters.operation, signedOn];
        const allAttributes = attributes.concat(parameters.attributes);
        const keypair = this.keyring.getPair(parameters.signerId);
        const bytes = keypair.sign!(toHex(this.createHash(allAttributes)));
        return '0x' + Buffer.from(bytes).toString('hex');
    }

    private createHash(attributes: any[]): string {
        let digest = new Hash();
        for (let i = 0; i < attributes.length; i++) {
            const bytes = new TextEncoder().encode(attributes[i]);
            digest.update(bytes);
        }
        return base64Encode(digest.digest());
    }

    signAndSend(parameters: { signerId: string, submittable: SubmittableExtrinsic }): Promise<void> {
        const keypair = this.keyring.getPair(parameters.signerId);
        return new Promise(async (resolve, reject) => {
            try {
                const unsub = await parameters.submittable.signAndSend(keypair, (result) => {
                    if (result.status.isInBlock) {
                        unsub();
                        if(result.dispatchError) {
                            reject(new Error(buildErrorMessage(parameters.submittable.registry, result.dispatchError)));
                        } else {
                            resolve();
                        }
                    }
                  });
              } catch(e) {
                reject(e);
              }
        });
    }
}
