import { buildApiClass, UUID, Currency, Numbers, ValidAccountId, OtherAccountId } from "@logion/node-api";
import { Keyring } from "@polkadot/api";
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import FormData from "form-data";

import {
    FullSigner,
    KeyringSigner,
    SignAndSendStrategy,
    Signer,
    LogionClientConfig,
    AxiosFactory,
    ISubmittableResult,
    LegalOfficer,
    LogionClient,
    DefaultSignAndSendStrategy,
    LegalOfficerClass,
} from "../src/index.js";
import { ALICE, BOB, CHARLIE } from "../test/Utils.js";
import { requireDefined } from "../src/assertions.js";
import { newBackendError } from "../src/Error.js";


export const ALICE_SECRET_SEED = "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a";
export const BOB_SECRET_SEED = "0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89";
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
    formDataLikeFactory: () => new FormData(),
};

export const REQUESTER_ADDRESS = "5DPLBrBxniGbGdFe1Lmdpkt6K3aNjhoNPJrSJ51rwcmhH2Tn";
export const REQUESTER_SECRET_SEED = "unique chase zone team upset caution match west enter eyebrow limb wrist";

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
        NEW_SECRET_SEED,
        ALICE_SECRET_SEED,
        BOB_SECRET_SEED,
        CHARLIE_SECRET_SEED,
        ISSUER_SECRET_SEED,
    ]);
    const requesterAccount = anonymousClient.logionApi.queries.getValidAccountId(REQUESTER_ADDRESS, "Polkadot");
    const newAccount = anonymousClient.logionApi.queries.getValidAccountId(NEW_ADDRESS, "Polkadot");
    const aliceAccount = anonymousClient.logionApi.queries.getValidAccountId(ALICE.address, "Polkadot");
    const bobAccount = anonymousClient.logionApi.queries.getValidAccountId(BOB.address, "Polkadot");
    const charlieAccount = anonymousClient.logionApi.queries.getValidAccountId(CHARLIE.address, "Polkadot");
    const issuerAccount = anonymousClient.logionApi.queries.getValidAccountId(ISSUER_ADDRESS, "Polkadot");
    const ethereumAccount = anonymousClient.logionApi.queries.getValidAccountId(ETHEREUM_ADDRESS, "Ethereum");
    const client = await anonymousClient.authenticate([
        requesterAccount,
        newAccount,
        aliceAccount,
        bobAccount,
        charlieAccount,
        issuerAccount,
        ethereumAccount,
    ], signer);
    const legalOfficers = client.legalOfficers;
    const alice = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === ALICE.address));
    const bob = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === BOB.address));
    const charlie = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === CHARLIE.address));
    return {
        client,
        signer,
        alice,
        bob,
        charlie,
        requesterAccount,
        newAccount,
        aliceAccount,
        bobAccount,
        charlieAccount,
        issuerAccount,
        ethereumAccount,
    };
}

export async function initRequesterBalance(config: LogionClientConfig, signer: Signer, requester: string): Promise<void> {
    await transferTokens(config, signer, ALICE.address, requester, Currency.toCanonicalAmount(new Numbers.PrefixedNumber("10", Numbers.NONE)));
}

async function transferTokens(config: LogionClientConfig, signer: Signer, source: string, destination: string, amount: bigint) {
    const api = await buildApiClass(config.rpcEndpoints);
    await signer.signAndSend({
        signerId: source,
        submittable: api.polkadot.tx.balances.transfer(destination, amount)
    });
}

export async function tearDown(state: State) {
    return state.client.disconnect();
}

export class LegalOfficerWorker {

    legalOfficer: LegalOfficer;
    state: State;

    constructor(legalOfficer: LegalOfficer, state: State) {
        this.legalOfficer = legalOfficer;
        this.state = state;
    }

    async createValidTermsAndConditionsLoc(id: UUID, requesterAccountId: string): Promise<void> {
        return this.openAndCloseTransactionLoc(id, requesterAccountId);
    }

    async createValidIdentityLoc(id: UUID, requesterAccountId: string): Promise<void> {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(api.adapters.toLocId(id), requesterAccountId);
        await this.openLoc(id, submittable);
        await this.closeLoc(id);
    }

    async openAndCloseTransactionLoc(id: UUID, requesterAccountId: string): Promise<void> {
        await this.openTransactionLoc(id, requesterAccountId);
        await this.closeLoc(id);
    }

    async openTransactionLoc(id: UUID, requesterAccountId: string) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.polkadot.tx.logionLoc.createPolkadotTransactionLoc(api.adapters.toLocId(id), requesterAccountId);
        await this.openLoc(id, submittable);
    }

    private async openLoc(id: UUID, submittable: SubmittableExtrinsic) {
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable,
        });
        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/accept`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async buildLegalOfficerAxios() {
        const { client, signer } = this.state;
        const legalOfficerAccount = client.logionApi.queries.getValidAccountId(this.legalOfficer.address, "Polkadot");
        const authenticatedClient = await client.authenticate([ legalOfficerAccount ], signer);
        const token = authenticatedClient.tokens.get(legalOfficerAccount)!;
        const axiosFactory = new AxiosFactory();
        return axiosFactory.buildAxiosInstance(this.legalOfficer.node, token.value);
    }

    async createOtherIdentityLoc(id: UUID, requesterAccountId: OtherAccountId, sponsorshipId: UUID) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.polkadot.tx.logionLoc.createOtherIdentityLoc(
            api.adapters.toLocId(id),
            api.adapters.toPalletLogionLocOtherAccountId(requesterAccountId),
            api.adapters.toSponsorshipId(sponsorshipId),
        );
        await this.openLoc(id, submittable);
        await this.closeLoc(id);
    }

    async rejectPendingLoc(id: UUID) {
        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/reject`, {reason: "Because."});
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async openCollectionLoc(id: UUID, requesterAccountId: string, withUpload: boolean) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.polkadot.tx.logionLoc.createCollectionLoc(api.adapters.toLocId(id), requesterAccountId, null, "100", withUpload)
        });

        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/accept`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async closeLoc(id: UUID) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.polkadot.tx.logionLoc.close(api.adapters.toLocId(id))
        });

        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/close`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async nominateVerifiedIssuer(issuerAddress: string, identityLocId: UUID) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.polkadot.tx.logionLoc.nominateIssuer(issuerAddress, identityLocId.toDecimalString());
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable,
        });
    }

    async selectIssuer(locId: UUID, issuerAddress: string, selected: boolean) {
        const api = await buildApiClass(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.polkadot.tx.logionLoc.setIssuerSelection(api.adapters.toLocId(locId), issuerAddress, selected);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable,
            strategy: new DefaultSignAndSendStrategy(),
        });
    }
}
