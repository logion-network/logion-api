import { setupInitialState, State, tearDown } from "./Utils.js";
import { enablesProtection, requestsProtectionAndCancel } from "./Protection.js";
import { transferAndCannotPayFees, transfers, transferWithInsufficientFunds } from "./Balance.js";
import { providesVault } from "./Vault.js";
import { recoverLostAccount, recoverLostVault, requestRecoveryAndCancel, requestRecoveryWithResubmit } from "./Recovery.js";
import { requestTransactionLoc, collectionLoc, collectionLocWithUpload, identityLoc, otherIdentityLoc, logionIdentityLoc } from "./Loc.js";
import { verifiedIssuer } from "./VerifiedIssuer.js";
import { tokensRecords } from "./TokensRecord.js";
import { fees } from "./Fees.js";
import { backendConfig } from "./LegalOfficer.js";
import { voidTransactionLoc } from "./Void.js";

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

    it("refuses transfer if cannot pay fees", async () => {
        await transferAndCannotPayFees(state);
    });

    it("transfers", async () => {
        await transfers(state);
    });

    it("refuses transfer with unsufficient funds", async () => {
        await transferWithInsufficientFunds(state);
    });

    it("enables protection", async () => {
        await requestsProtectionAndCancel(state);
        await enablesProtection(state);
    });

    it("provides vault", async () => {
        await providesVault(state);
    });

    it("is able to cancel a recovery request", async () => {
        await requestRecoveryAndCancel(state);
    });

    it("is able to start recovery after resubmission", async () => {
        await requestRecoveryWithResubmit(state);
    });

    it("recovers a lost vault", async () => {
        await recoverLostVault(state);
    });

    xit("recovers a lost account", async () => {
        await recoverLostAccount(state);
    });

    it("provides Identity LOC", async () => {
        await identityLoc(state);
    });

    it("provides Other Identity LOC", async () => {
        await otherIdentityLoc(state);
    });

    it("provides Logion Identity LOC", async () => {
        await logionIdentityLoc(state);
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

    it("voids a Transaction LOC", async () => {
        await voidTransactionLoc(state);
    });

    afterAll(() => {
        if(state) {
            tearDown(state);
        }
    })
});
