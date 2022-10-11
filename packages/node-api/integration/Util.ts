import { ApiPromise, Keyring } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

import { buildApi } from "../src";

export interface State {
    api: ApiPromise,
    keyring: Keyring,
    alice: IKeyringPair,
    requester: IKeyringPair,
}

let state: State;

export async function setup(): Promise<State> {
    if(!state) {
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri(ALICE_SEED);
        const requester = keyring.addFromUri(REQUESTER_SECRET_SEED);
        const api = await buildApi("ws://127.0.0.1:9944");
        state = {
            api,
            keyring,
            alice,
            requester,
        };
    }
    return state;
}

const ALICE_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";

export const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

export const REQUESTER = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";

export function signAndSend(keypair: IKeyringPair, extrinsic: SubmittableExtrinsic): Promise<void> {
    let unsub: () => void;
    return new Promise((resolve, error) => {
        extrinsic.signAndSend(keypair, (result) => {
            if(result.isError) {
                unsub();
                error();
            } else if (result.status.isInBlock) {
                unsub();
                resolve();
            }
        })
        .then(_unsub => unsub = _unsub)
        .catch(() => error());
    });
}
