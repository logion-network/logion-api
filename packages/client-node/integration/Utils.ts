import { buildApiClass, Currency, Numbers, ValidAccountId } from "@logion/node-api";
import { Keyring } from "@polkadot/api";

import {
    FullSigner,
    KeyringSigner,
    SignAndSendStrategy,
    Signer,
    LogionClientConfig,
    ISubmittableResult,
    LogionClient,
    LegalOfficerClass,
    LocRequestState,
    requireDefined,
} from "@logion/client";
import { NodeAxiosFileUploader } from "../src/index.js";

export const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
export const ALICE_SECRET_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
export const BOB = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty";
export const BOB_SECRET_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";
export const CHARLIE = "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y";
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
    rpcEndpoints: [ 'ws://localhost:9944', 'ws://localhost:9945' ],
    buildFileUploader: () => new NodeAxiosFileUploader(),
};

export const REQUESTER_ADDRESS = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";
export const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

export const DIRECT_REQUESTER_ADDRESS = "5EPPUZ9XEjeAgJj4DDtYn9thPtE68Nu7ZQDMySG3EP5nGVmV";
export const DIRECT_REQUESTER_SECRET_SEED = "pitch move leader grief stool crisp arm menu target hero inner essay";

export const NEW_ADDRESS = "5FWP7ha7wBpRomanrgCFuV8c7gBTsyexzWZR42umqGv8Rpx4";
export const NEW_SECRET_SEED = "inquiry nose frog devote demand main front caution excess bridge mom voice";

export const ISSUER_ADDRESS = "5FU3mAsShn2b8CAe5cnVShzFNVgJssoXoMdAB9evGvKm5x4N";
export const ISSUER_SECRET_SEED = "exit photo know trouble stay hollow gate river upgrade twenty south random";

export const ETHEREUM_ADDRESS = "0x2469a2fd33ad71a3525cc2047bdd4f3ca851e89f";
export const ETHEREUM_SEED = "0x09dc05bbed08ff234919b84002a1eb6f856a6e949b017289fc7d457e1bb5e9d4";

export interface State {
    signer: FullSigner;
    client: LogionClient;
    alice: LegalOfficerClass;
    bob: LegalOfficerClass;
    charlie: LegalOfficerClass;
    requesterAccount: ValidAccountId,
    directRequesterAccount: ValidAccountId,
    newAccount: ValidAccountId,
    aliceAccount: ValidAccountId,
    bobAccount: ValidAccountId,
    charlieAccount: ValidAccountId,
    issuerAccount: ValidAccountId,
    ethereumAccount: ValidAccountId,
}

export async function setupInitialState(): Promise<State> {
    const anonymousClient = await LogionClient.create(TEST_LOGION_CLIENT_CONFIG);
    const signer = buildSigner([
        REQUESTER_SECRET_SEED,
        DIRECT_REQUESTER_SECRET_SEED,
        NEW_SECRET_SEED,
        ALICE_SECRET_SEED,
        BOB_SECRET_SEED,
        CHARLIE_SECRET_SEED,
        ISSUER_SECRET_SEED,
    ]);
    const requesterAccount = anonymousClient.logionApi.queries.getValidAccountId(REQUESTER_ADDRESS, "Polkadot");
    const directRequesterAccount = anonymousClient.logionApi.queries.getValidAccountId(DIRECT_REQUESTER_ADDRESS, "Polkadot");
    const newAccount = anonymousClient.logionApi.queries.getValidAccountId(NEW_ADDRESS, "Polkadot");
    const aliceAccount = anonymousClient.logionApi.queries.getValidAccountId(ALICE, "Polkadot");
    const bobAccount = anonymousClient.logionApi.queries.getValidAccountId(BOB, "Polkadot");
    const charlieAccount = anonymousClient.logionApi.queries.getValidAccountId(CHARLIE, "Polkadot");
    const issuerAccount = anonymousClient.logionApi.queries.getValidAccountId(ISSUER_ADDRESS, "Polkadot");
    const ethereumAccount = anonymousClient.logionApi.queries.getValidAccountId(ETHEREUM_ADDRESS, "Ethereum");
    const client = await anonymousClient.authenticate([
        requesterAccount,
        directRequesterAccount,
        newAccount,
        aliceAccount,
        bobAccount,
        charlieAccount,
        issuerAccount,
        ethereumAccount,
    ], signer);
    const legalOfficers = client.legalOfficers;
    const alice = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === ALICE));
    const bob = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === BOB));
    const charlie = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === CHARLIE));
    return {
        client,
        signer,
        alice,
        bob,
        charlie,
        requesterAccount,
        directRequesterAccount,
        newAccount,
        aliceAccount,
        bobAccount,
        charlieAccount,
        issuerAccount,
        ethereumAccount,
    };
}

export async function initRequesterBalance(config: LogionClientConfig, signer: Signer, requester: string): Promise<void> {
    await transferTokens(config, signer, ALICE, requester, Currency.toCanonicalAmount(new Numbers.PrefixedNumber("10000", Numbers.NONE)));
}

async function transferTokens(config: LogionClientConfig, signer: Signer, source: string, destination: string, amount: bigint) {
    const api = await buildApiClass(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: source,
        submittable: api.polkadot.tx.balances.transferAllowDeath(destination, amount)
    });
}

export async function tearDown(state: State) {
    return state.client.disconnect();
}

export async function findWithLegalOfficerClient(client: LogionClient, loc: LocRequestState): Promise<LocRequestState> {
    if(!client.currentAddress) {
        throw new Error("Client must be authenticated");
    }
    const locType = loc.data().locType;
    const locStatus = loc.data().status;
    let aliceLocs = await client.locsState({ spec: { ownerAddress: client.currentAddress.address, locTypes: [locType], statuses: [locStatus] } });
    return aliceLocs.findById(loc.locId);
}
