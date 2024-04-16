import { Lgnt, LogionNodeApiClass, ValidAccountId, AnyAccountId } from "@logion/node-api";
import { Keyring, ApiPromise } from "@polkadot/api";

import {
    FullSigner,
    KeyringSigner,
    SignAndSendStrategy,
    LogionClientConfig,
    ISubmittableResult,
    LogionClient,
    LegalOfficerClass,
    LocRequestState,
    requireDefined,
} from "@logion/client";
import { NodeAxiosFileUploader } from "../src/index.js";

export const ALICE = "vQx5kESPn8dWyX4KxMCKqUyCaWUwtui1isX6PVNcZh2Ghjitr";
export const ALICE_SECRET_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
export const BOB = "vQvWaxNDdzuX5N3qSvGMtjdHcQdw1TAcPNgx4S1Utd3MTxYeN";
export const BOB_SECRET_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";
export const CHARLIE = "vQvZF2YMgKuQhzfF7T3xDjHjuEmcPSUVEoUDPy1mzuSXzFgca";
export const CHARLIE_SECRET_SEED = "0xbc1ede780f784bb6991a585e4f6e61522c14e1cae6ad0895fb57b9a205a8f938";

class IntegrationTestSignAndSendStrategy implements SignAndSendStrategy {

    canUnsub(result: ISubmittableResult): boolean {
        return result.isInBlock;
    }
}

export function buildSigner(seeds: string []): FullSigner {
    const keyring = new Keyring({ type: 'sr25519' });
    seeds.forEach(seed => keyring.addFromUri(seed));
    keyring.addFromUri(ETHEREUM_SEED, undefined, "ethereum");
    return new KeyringSigner(keyring, new IntegrationTestSignAndSendStrategy());
}

export const TEST_LOGION_CLIENT_CONFIG: LogionClientConfig = {
    directoryEndpoint: "http://localhost:8090",
    rpcEndpoints: [ 'ws://localhost:9944' ],
    buildFileUploader: () => new NodeAxiosFileUploader(),
};

export const REQUESTER_ADDRESS = "vQtc8ViMVqMFymbKcCgV4VWaEkRKPQzXGtBFJb423qMn56cxf";
export const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

export const DIRECT_REQUESTER_ADDRESS = "vQucBnRK4HNdZBGo2QZbySuaqqFy6ofd24GcEGRGE886A6Nta";
export const DIRECT_REQUESTER_SECRET_SEED = "pitch move leader grief stool crisp arm menu target hero inner essay";

export const NEW_ADDRESS = "vQvjBRZjeypopJjem41ugaEpkZ3vUZGNsVNxHM1uxj1vWFVa6";
export const NEW_SECRET_SEED = "inquiry nose frog devote demand main front caution excess bridge mom voice";

export const ISSUER_ADDRESS = "vQvgr532ykR1ydAEcGxVv7TgPosRKZAXSJE22U8f7AfL8uKUv";
export const ISSUER_SECRET_SEED = "exit photo know trouble stay hollow gate river upgrade twenty south random";

export const ETHEREUM_ADDRESS = "0x2469a2fd33ad71a3525cc2047bdd4f3ca851e89f";
export const ETHEREUM_SEED = "0x09dc05bbed08ff234919b84002a1eb6f856a6e949b017289fc7d457e1bb5e9d4";

export const INVITED_CONTRIBUTOR_ADDRESS = "vQvGpb2scoZCUfm8XqSBcPJv5YYu5g2owPomQiVAg7a3cXGKJ";
export const INVITED_CONTRIBUTOR_SECRET_SEED = "october minimum future canvas range cruise jealous web renew border hover name";

export interface State {
    signer: FullSigner;
    client: LogionClient;
    alice: LegalOfficerClass;
    bob: LegalOfficerClass;
    charlie: LegalOfficerClass;
    requesterAccount: ValidAccountId,
    directRequesterAccount: ValidAccountId,
    newAccount: ValidAccountId,
    issuerAccount: ValidAccountId,
    ethereumAccount: ValidAccountId,
    invitedContributorAccount: ValidAccountId,
}

export async function setupInitialState(config: LogionClientConfig = TEST_LOGION_CLIENT_CONFIG, mustUpdateLLOs = true): Promise<State> {
    let anonymousClient = await LogionClient.create(config);

    const signer = buildSigner([
        REQUESTER_SECRET_SEED,
        DIRECT_REQUESTER_SECRET_SEED,
        NEW_SECRET_SEED,
        ALICE_SECRET_SEED,
        BOB_SECRET_SEED,
        CHARLIE_SECRET_SEED,
        ISSUER_SECRET_SEED,
        INVITED_CONTRIBUTOR_SECRET_SEED,
    ]);
    const requesterAccount = ValidAccountId.polkadot(REQUESTER_ADDRESS)
    const directRequesterAccount = ValidAccountId.polkadot(DIRECT_REQUESTER_ADDRESS);
    const newAccount = ValidAccountId.polkadot(NEW_ADDRESS);
    const aliceAccount = ValidAccountId.polkadot(ALICE);
    const bobAccount = ValidAccountId.polkadot(BOB);
    const charlieAccount = ValidAccountId.polkadot(CHARLIE);
    const issuerAccount = ValidAccountId.polkadot(ISSUER_ADDRESS);
    const ethereumAccount = new AnyAccountId(ETHEREUM_ADDRESS, "Ethereum").toValidAccountId();
    const invitedContributorAccount = ValidAccountId.polkadot(INVITED_CONTRIBUTOR_ADDRESS);

    if (mustUpdateLLOs) {
        await updateLegalOfficers({
            api: anonymousClient.logionApi.polkadot,
            signer,
            aliceAccount,
            bobAccount,
            charlieAccount
        });
    }

    anonymousClient = await LogionClient.create(config);

    const client = await anonymousClient.authenticate([
        requesterAccount,
        directRequesterAccount,
        newAccount,
        aliceAccount,
        bobAccount,
        charlieAccount,
        issuerAccount,
        ethereumAccount,
        invitedContributorAccount,
    ], signer);
    const legalOfficers = client.legalOfficers;
    if (mustUpdateLLOs) {
        console.log(legalOfficers.map(llo => `${ llo.name }:${ llo.account.address }`))
    }
    const alice = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.account.equals(aliceAccount)));
    const bob = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.account.equals(bobAccount)));
    const charlie = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.account.equals(charlieAccount)));
    return {
        client,
        signer,
        alice,
        bob,
        charlie,
        requesterAccount,
        directRequesterAccount,
        newAccount,
        issuerAccount,
        ethereumAccount,
        invitedContributorAccount,
    };
}

async function updateLegalOfficers(params: { api: ApiPromise, aliceAccount: ValidAccountId, bobAccount: ValidAccountId, charlieAccount: ValidAccountId, signer: FullSigner }): Promise<void> {
    const { api, aliceAccount, bobAccount, charlieAccount, signer } = params;

    const llo1 = signer.signAndSend({
        signerId: aliceAccount,
        submittable: api.tx.loAuthorityList.updateLegalOfficer(
            aliceAccount.address,
            {
                Host: {
                    nodeId: "0x0024080112201ce5f00ef6e89374afb625f1ae4c1546d31234e87e3c3f51a62b91dd6bfa57df",
                    baseUrl: "http://localhost:8080",
                    region: "Europe",
                }
            }
        ),
    });
    const llo2 = signer.signAndSend({
        signerId: bobAccount,
        submittable: api.tx.loAuthorityList.updateLegalOfficer(
            bobAccount.address,
            {
                Host: {
                    nodeId: "0x002408011220dacde7714d8551f674b8bb4b54239383c76a2b286fa436e93b2b7eb226bf4de7",
                    baseUrl: "http://localhost:8081",
                    region: "Europe",
                }
            }
        ),
    });
    const llo3 = signer.signAndSend({
        signerId: charlieAccount,
        submittable: api.tx.loAuthorityList.updateLegalOfficer(
            charlieAccount.address,
            {
                Host: {
                    nodeId: "0x002408011220876a7b4984f98006dc8d666e28b60de307309835d775e7755cc770328cdacf2e",
                    baseUrl: "http://localhost:8082",
                    region: "Europe",
                }
            }
        ),
    });
    await Promise.all([llo1, llo2, llo3]);
}

export async function updateConfig(config: Partial<LogionClientConfig>): Promise<State> {
    const newConfig: LogionClientConfig = {
        ...TEST_LOGION_CLIENT_CONFIG,
        ...config,
    };
    return setupInitialState(newConfig, false);
}

export async function initAccountBalance(state: State, account: ValidAccountId): Promise<void> {
    const { alice, client, signer } = state
    const api = await LogionNodeApiClass.connect(client.config.rpcEndpoints);
    const setBalance = api.polkadot.tx.balances.forceSetBalance(account.address, Lgnt.from(10000).canonical);
    await signer.signAndSend({
        signerId: alice.account,
        submittable: api.polkadot.tx.sudo.sudo(setBalance),
    });
}

export async function tearDown(state: State) {
    return state.client.disconnect();
}

export async function findWithLegalOfficerClient(client: LogionClient, loc: LocRequestState): Promise<LocRequestState> {
    if(!client.currentAccount) {
        throw new Error("Client must be authenticated");
    }
    const locType = loc.data().locType;
    const locStatus = loc.data().status;
    let aliceLocs = await client.locsState({ spec: { ownerAddress: client.currentAccount.address, locTypes: [locType], statuses: [locStatus] } });
    return aliceLocs.findById(loc.locId);
}
