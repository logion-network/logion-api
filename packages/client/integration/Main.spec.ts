import { setupInitialState, State, tearDown } from "./Utils.js";
import { enablesProtection, requestsProtectionAndCancel } from "./Protection.js";
import { transfers } from "./Balance.js";
import { providesVault } from "./Vault.js";
import { recoverLostAccount, requestRecoveryAndCancel } from "./Recovery.js";
import { requestTransactionLoc, collectionLoc, collectionLocWithUpload, identityLoc, otherIdentityLoc } from "./Loc.js";
import { verifiedIssuer } from "./VerifiedIssuer.js";
import { tokensRecords } from "./TokensRecord.js";
import { fees } from "./Fees.js";
import { backendConfig } from "./LegalOfficer.js";

describe("Logion SDK", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    let state: State;

    beforeAll(async () => {
        state = await setupInitialState();
    });

    it("fetches backend config", async () => {
        await backendConfig(state);
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

    it("provides Other Identity LOC", async () => {
        await otherIdentityLoc(state);
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

    it("provides verified issuer", async () => {
        await verifiedIssuer(state);
    });

    it("provides Tokens Records", async () => {
        await tokensRecords(state);
    });

    afterAll(() => {
        tearDown(state);
    })
});
