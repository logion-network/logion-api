import { buildApi } from "@logion/node-api";
import { Keyring } from "@polkadot/api";
import FormData from "form-data";

import { FullSigner, KeyringSigner, Signer } from "../src/Signer";
import { LogionClientConfig } from "../src/SharedClient";
import { LegalOfficer, LogionClient } from "../src";
import { ALICE, BOB, CHARLIE } from "../test/Utils";


export const ALICE_SECRET_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
export const BOB_SECRET_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";
export const CHARLIE_SECRET_SEED = "0xbc1ede780f784bb6991a585e4f6e61522c14e1cae6ad0895fb57b9a205a8f938";

export function buildSigner(seeds: string []): FullSigner {
    const keyring = new Keyring({ type: 'sr25519' });
    seeds.forEach(seed => keyring.addFromUri(seed))
    return new KeyringSigner(keyring);
}

export const TEST_LOGION_CLIENT_CONFIG: LogionClientConfig = {
    directoryEndpoint: "http://localhost:8090",
    rpcEndpoints: [ 'ws://localhost:9944', 'ws://localhost:9945' ],
    formDataLikeFactory: () => new FormData(),
};

export const REQUESTER_ADDRESS = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";
export const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

export const NEW_ADDRESS = "5FWP7ha7wBpRomanrgCFuV8c7gBTsyexzWZR42umqGv8Rpx4";
export const NEW_SECRET_SEED = "inquiry nose frog devote demand main front caution excess bridge mom voice";

export interface State {
    signer: FullSigner;
    client: LogionClient;
    alice: LegalOfficer;
    bob: LegalOfficer;
    charlie: LegalOfficer;
}

export async function setupInitialState(): Promise<State> {
    const anonymousClient = await LogionClient.create(TEST_LOGION_CLIENT_CONFIG);
    const signer = buildSigner([
        REQUESTER_SECRET_SEED,
        NEW_SECRET_SEED,
        ALICE_SECRET_SEED,
        BOB_SECRET_SEED,
        CHARLIE_SECRET_SEED
    ]);
    const client = await anonymousClient.authenticate([
        REQUESTER_ADDRESS,
        NEW_ADDRESS,
        ALICE.address,
        BOB.address,
        CHARLIE.address
    ], signer);
    const legalOfficers = client.legalOfficers;
    const alice = legalOfficers.find(legalOfficer => legalOfficer.address === ALICE.address)!;
    const bob = legalOfficers.find(legalOfficer => legalOfficer.address === BOB.address)!;
    const charlie = legalOfficers.find(legalOfficer => legalOfficer.address === CHARLIE.address)!;
    return {
        client,
        signer,
        alice,
        bob,
        charlie
    };
}

export async function initRequesterBalance(config: LogionClientConfig, signer: Signer, requester: string): Promise<void> {
    await transferTokens(config, signer, ALICE.address, requester, 1000000000);
}

async function transferTokens(config: LogionClientConfig, signer: Signer, source: string, destination: string, amount: number) {
    const api = await buildApi(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: source,
        submittable: api.tx.balances.transfer(destination, amount)
    });
}
