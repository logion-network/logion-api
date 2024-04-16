import { Keyring } from "@polkadot/api";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { waitReady } from "@polkadot/wasm-crypto";

import { Adapters, LogionNodeApiClass } from "../src/index.js";

export interface State {
    api: LogionNodeApiClass;
    keyring: Keyring;
    alice: IKeyringPair;
    bob: IKeyringPair;
    requester: IKeyringPair;
    issuer: IKeyringPair;
    invitedContributor: IKeyringPair;
    newRequester: IKeyringPair;
}

let state: State;

export async function setup(): Promise<State> {
    if(!state) {
        await waitReady();
        const api = await LogionNodeApiClass.connect("ws://127.0.0.1:9944");
        const keyring = new Keyring({ type: 'sr25519', ss58Format: api.queries.ss58Prefix });
        const alice = keyring.addFromUri(ALICE_SEED);
        const bob = keyring.addFromUri(BOB_SEED);
        const requester = keyring.addFromUri(REQUESTER_SECRET_SEED);
        const issuer = keyring.addFromUri(ISSUER_SECRET_SEED);
        const invitedContributor = keyring.addFromUri(INVITED_CONTRIBUTOR_SECRET_SEED);
        const newRequester = keyring.addFromUri(NEW_REQUESTER_SECRET_SEED);
        state = {
            api,
            keyring,
            alice,
            bob,
            requester,
            issuer,
            invitedContributor,
            newRequester,
        };
    }
    return state;
}

const ALICE_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";

const BOB_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";

const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

const ISSUER_SECRET_SEED = "earth rough predict document divide deliver unable vanish spike alarm exotic spider";

const INVITED_CONTRIBUTOR_SECRET_SEED = "october minimum future canvas range cruise jealous web renew border hover name";

const NEW_REQUESTER_SECRET_SEED = "royal trade reopen lounge nurse keep neck route dash circle bleak cute";

export async function signAndSend(keypair: IKeyringPair, extrinsic: SubmittableExtrinsic): Promise<ISubmittableResult> {
    let unsub: () => void;
    const promise = new Promise<ISubmittableResult>((resolve, error) => {
        extrinsic.signAndSend(keypair, (result) => {
            if(result.isError) {
                unsub();
                if(result.dispatchError) {
                    error(Adapters.getErrorMessage(result.dispatchError));
                } else {
                    error("Error without dispatchError");
                }
            } else if (result.status.isInBlock) {
                unsub();
                if(result.dispatchError) {
                    error(Adapters.getErrorMessage(result.dispatchError));
                } else {
                    resolve(result);
                }
            }
        })
        .then(_unsub => unsub = _unsub)
        .catch(e => error("" + e));
    });
    try {
        return await promise;
    } catch(e) {
        throw new Error("" + e);
    }
}

export async function signAndSendBatch(keypair: IKeyringPair, extrinsics: SubmittableExtrinsic[]): Promise<void> {
    const extrinsic = state.api.batching.batchAll(extrinsics);
    await signAndSend(keypair, extrinsic);
}

export async function getBlockNumber(api: LogionNodeApiClass, result: ISubmittableResult): Promise<bigint> {
    const header = await api.polkadot.rpc.chain.getHeader(result.status.asInBlock);
    return header.number.toBigInt();
}
