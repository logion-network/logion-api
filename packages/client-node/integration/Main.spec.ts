import { setupInitialState, State, tearDown } from "./Utils.js";
import { enablesProtection, requestsProtectionAndCancel, requestValidIdentity } from "./Protection.js";
import { transferAndCannotPayFees, transfers, transferWithInsufficientFunds } from "./Balance.js";
import { providesVault } from "./Vault.js";
import { recoverLostAccount, recoverLostVault, requestRecoveryAndCancel, requestRecoveryWithResubmit } from "./Recovery.js";
import {
    requestTransactionLoc,
    collectionLoc,
    collectionLocWithUpload,
    identityLoc,
    otherIdentityLoc,
    logionIdentityLoc,
    transactionLocWithCustomLegalFee,
    openTransactionLocWithAutoPublish
} from "./Loc.js";
import { verifiedIssuer } from "./VerifiedIssuer.js";
import { tokensRecords } from "./TokensRecord.js";
import { fees } from "./Fees.js";
import { backendConfig } from "./LegalOfficer.js";
import { voidTransactionLoc } from "./Void.js";
import { votingProcess } from "./Vote.js";
import { openIdentityLoc, openTransactionLoc, openCollectionLoc } from "./DirectLocOpen.js";
import { invitedContributors } from "./InvitedContributors.js";

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

    it("refuses transfer with insufficient funds", async () => {
        await transferWithInsufficientFunds(state);
    });

    it("enables protection", async () => {
        const identityLocs = await requestValidIdentity(state);
        await requestsProtectionAndCancel(state, identityLocs);
        await enablesProtection(state, identityLocs);
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

    it("recovers a lost account", async () => {
        await recoverLostAccount(state);
    });

    it("provides Identity LOC", async () => {
        await identityLoc(state);
    });

    it("provides Logion Identity LOC", async () => {
        await logionIdentityLoc(state);
    });

    it("provides Other Identity LOC, requests a Transaction LOC and link it to the Identity LOC", async () => {
        const identityLocLink = await otherIdentityLoc(state);
        await requestTransactionLoc(state, identityLocLink);
        await openTransactionLocWithAutoPublish(state, identityLocLink);
    });

    it("requests a Transaction LOC with custom legal fee", async () => {
        await transactionLocWithCustomLegalFee(state);
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

    it("provides invited contributor", async () => {
        await invitedContributors(state);
    });

    it("voids a Transaction LOC", async () => {
        await voidTransactionLoc(state);
    });

    it("directly opens LOCs", async () => {
        const linkedLoc1 = await openIdentityLoc(state);
        const linkedLoc2 = await openTransactionLoc(state, linkedLoc1);
        await openCollectionLoc(state, linkedLoc1, linkedLoc2);
    })

    it("provides vote", async () => {
        await votingProcess(state);
    });

    afterAll(() => {
        if(state) {
            tearDown(state);
        }
    })
});
