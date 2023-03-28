import { setupInitialState, State, tearDown } from "./Utils.js";
import { enablesProtection, requestsProtectionAndCancel } from "./Protection.js";
import { transfers } from "./Balance.js";
import { providesVault } from "./Vault.js";
import { recoverLostAccount, requestRecoveryAndCancel } from "./Recovery.js";
import { requestTransactionLoc, collectionLoc, collectionLocWithUpload, identityLoc } from "./Loc.js";
import { verifiedThirdParty } from "./VerifiedThirdParty.js";
import { tokensRecords } from "./TokensRecord.js";
import { fees } from "./Fees.js";

describe("Logion SDK", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    let state: State;

    beforeAll(async () => {
        state = await setupInitialState();
    });

    it("estimates fees", async () => {
        await fees(state);
    });

    it("transfers", async () => {
        await transfers(state);
    });

    it("enables protection", async () => {
        await requestsProtectionAndCancel(state);
        await enablesProtection(state);
    });

    it("provides vault", async () => {
        await providesVault(state);
    });

    it("recovers a lost account", async () => {
        await requestRecoveryAndCancel(state);
        await recoverLostAccount(state);
    });

    it("provides Identity LOC", async () => {
        await identityLoc(state);
    });

    it("requests a Transaction LOC", async () => {
        await requestTransactionLoc(state);
    });

    it("provides Collection LOC", async () => {
        await collectionLoc(state);
    });

    it("provides Collection LOC with upload and restricted delivery", async () => {
        await collectionLocWithUpload(state);
    });

    it("provides VTP", async () => {
        await verifiedThirdParty(state);
    });

    it("provides Tokens Records", async () => {
        await tokensRecords(state);
    });

    afterAll(() => {
        tearDown(state);
    })
});
