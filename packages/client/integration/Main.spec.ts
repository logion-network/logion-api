import { setupInitialState, State } from "./Utils";
import { enablesProtection, requestsProtectionAndCancel } from "./Protection";
import { transfers } from "./Balance";
import { providesVault } from "./Vault";
import { recoverLostAccount, requestRecoveryAndCancel } from "./Recovery";
import { requestTransactionLoc, collectionLoc, collectionLocWithUpload, identityLoc } from "./Loc";

describe("Logion SDK", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    let state: State;

    beforeAll(async () => {
        state = await setupInitialState();
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
    })

    it("requests a Transaction LOC", async () => {
        await requestTransactionLoc(state);
    });

    it("provides Collection LOC", async () => {
        await collectionLoc(state);
    });

    it("provides Collection LOC with upload and restricted delivery", async () => {
        await collectionLocWithUpload(state);
    });
});
