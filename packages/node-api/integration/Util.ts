import { ApiPromise, Keyring } from "@polkadot/api";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { waitReady } from "@polkadot/wasm-crypto";

import { buildApi, LGNT_SMALLEST_UNIT, NONE, PrefixedNumber } from "../src";

export interface State {
    api: ApiPromise;
    keyring: Keyring;
    alice: IKeyringPair;
    requester: IKeyringPair;
    issuer: IKeyringPair;
}

let state: State;

export async function setup(): Promise<State> {
    if(!state) {
        await waitReady();
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri(ALICE_SEED);
        const requester = keyring.addFromUri(REQUESTER_SECRET_SEED);
        const issuer = keyring.addFromUri(ISSUER_SECRET_SEED);
        const api = await buildApi("ws://127.0.0.1:9944");
        state = {
            api,
            keyring,
            alice,
            requester,
            issuer,
        };
    }
    return state;
}

const ALICE_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";

export const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

export const REQUESTER = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";

export const DAVE = "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy";

export const ISSUER = "5HTA8nHHQWdN6XnciaWxjjzCHLoV8d5tME6CqT6KNDypovKU";

const ISSUER_SECRET_SEED = "earth rough predict document divide deliver unable vanish spike alarm exotic spider";

export function signAndSend(keypair: IKeyringPair, extrinsic: SubmittableExtrinsic): Promise<ISubmittableResult> {
    let unsub: () => void;
    return new Promise((resolve, error) => {
        extrinsic.signAndSend(keypair, (result) => {
            if(result.isError) {
                unsub();
                error(result.dispatchError);
            } else if (result.status.isInBlock) {
                unsub();
                if(result.dispatchError) {
                    error(result.dispatchError);
                } else {
                    resolve(result);
                }
            }
        })
        .then(_unsub => unsub = _unsub)
        .catch(() => error());
    });
}

export async function signAndSendBatch(keypair: IKeyringPair, extrinsics: SubmittableExtrinsic[]): Promise<void> {
    for(const extrinsic of extrinsics) {
        try {
            await signAndSend(keypair, extrinsic);
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}
