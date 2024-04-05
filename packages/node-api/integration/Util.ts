import { Keyring } from "@polkadot/api";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { waitReady } from "@polkadot/wasm-crypto";

import { Adapters, LogionNodeApiClass } from "../src/index.js";

export interface State {
    api: LogionNodeApiClass;
    keyring: Keyring;
    alice: IKeyringPair;
    requester: IKeyringPair;
    issuer: IKeyringPair;
    invitedContributor: IKeyringPair;
}

let state: State;

export async function setup(): Promise<State> {
    if(!state) {
        await waitReady();
        const api = await LogionNodeApiClass.connect("ws://127.0.0.1:9944");
        const keyring = new Keyring({ type: 'sr25519', ss58Format: api.queries.ss58Prefix });
        const alice = keyring.addFromUri(ALICE_SEED);
        const requester = keyring.addFromUri(REQUESTER_SECRET_SEED);
        const issuer = keyring.addFromUri(ISSUER_SECRET_SEED);
        const invitedContributor = keyring.addFromUri(INVITED_CONTRIBUTOR_SECRET_SEED);
        state = {
            api,
            keyring,
            alice,
            requester,
            issuer,
            invitedContributor,
        };
    }
    return state;
}

const ALICE_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";

const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

const ISSUER_SECRET_SEED = "earth rough predict document divide deliver unable vanish spike alarm exotic spider";

const INVITED_CONTRIBUTOR_SECRET_SEED = "october minimum future canvas range cruise jealous web renew border hover name";

export function signAndSend(keypair: IKeyringPair, extrinsic: SubmittableExtrinsic): Promise<ISubmittableResult> {
    let unsub: () => void;
    return new Promise((resolve, error) => {
        extrinsic.signAndSend(keypair, (result) => {
            if(result.isError) {
                unsub();
                if(result.dispatchError) {
                    error(new Error(Adapters.getErrorMessage(result.dispatchError)));
                } else {
                    error();
                }
            } else if (result.status.isInBlock) {
                unsub();
                if(result.dispatchError) {
                    error(new Error(Adapters.getErrorMessage(result.dispatchError)));
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
    try {
        const extrinsic = state.api.batching.batchAll(extrinsics);
        await signAndSend(keypair, extrinsic);
    } catch (e) {
        console.log(e);
        throw e;
    }
}
