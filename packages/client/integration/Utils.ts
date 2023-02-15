import { buildApi, UUID } from "@logion/node-api";
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
    DefaultSignAndSendStrategy
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
    seeds.forEach(seed => keyring.addFromUri(seed))
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

export const VTP_ADDRESS = "5FU3mAsShn2b8CAe5cnVShzFNVgJssoXoMdAB9evGvKm5x4N";
export const VTP_SECRET_SEED = "exit photo know trouble stay hollow gate river upgrade twenty south random";

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
        CHARLIE_SECRET_SEED,
        VTP_SECRET_SEED,
    ]);
    const client = await anonymousClient.authenticate([
        REQUESTER_ADDRESS,
        NEW_ADDRESS,
        ALICE.address,
        BOB.address,
        CHARLIE.address,
        VTP_ADDRESS,
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
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.tx.logionLoc.createPolkadotIdentityLoc(id.toDecimalString(), requesterAccountId);
        await this.openLoc(id, submittable);
        await this.closeLoc(id);
    }

    async openAndCloseTransactionLoc(id: UUID, requesterAccountId: string): Promise<void> {
        await this.openTransactionLoc(id, requesterAccountId);
        await this.closeLoc(id);
    }

    async openTransactionLoc(id: UUID, requesterAccountId: string) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.tx.logionLoc.createPolkadotTransactionLoc(id.toDecimalString(), requesterAccountId);
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
        const authenticatedClient = await client.authenticate([ this.legalOfficer.address ], signer);
        const token = authenticatedClient.tokens.get(this.legalOfficer.address)!;
        const axiosFactory = new AxiosFactory();
        return axiosFactory.buildAxiosInstance(this.legalOfficer.node, token.value);
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
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.createCollectionLoc(id.toDecimalString(), requesterAccountId, null, "100", withUpload)
        });

        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/accept`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async closeLoc(id: UUID) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.close(id.toDecimalString())
        });

        const axios = await this.buildLegalOfficerAxios();
        try {
            await axios.post(`/api/loc-request/${ id.toString() }/close`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async nominateVerifiedThirdParty(issuerAddress: string, identityLocId: UUID) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.tx.logionLoc.nominateIssuer(issuerAddress, identityLocId.toDecimalString());
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable,
        });
    }

    async selectVtp(locId: UUID, issuerAddress: string, selected: boolean) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        const submittable = api.tx.logionLoc.setIssuerSelection(locId.toDecimalString(), issuerAddress, selected);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable,
            strategy: new DefaultSignAndSendStrategy(),
        });
    }
}
