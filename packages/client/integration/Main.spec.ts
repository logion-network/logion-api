import { setupInitialState, State } from "./Utils";
import { enablesProtection } from "./Protection";
import { transfers } from "./Balance";
import { providesVault } from "./Vault";
import { recoverLostAccount } from "./Recovery";
import { requestTransactionLoc } from "./Loc";

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
        await enablesProtection(state);
    });

    it("provides vault", async () => {
        await providesVault(state);
    });

    it("recovers a lost account", async () => {
        await recoverLostAccount(state);
    });

    it("requests a Transaction LOC", async () => {
        await requestTransactionLoc(state);
    })
});
