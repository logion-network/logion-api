import { ValidAccountId } from "../src/Types.js";
import { Vault } from "../src/VaultClass.js";
import { DEFAULT_LEGAL_OFFICER, ANOTHER_LEGAL_OFFICER } from "./TestData.js";

describe("Vault", () => {

    it("generates expected Vault address", ()=> {
        const accountId = ValidAccountId.polkadot("vQxHAE33LeJYV69GCB4o4YcCgnDu8y99u5hy2751fRdxjX9kz");
        const vaultAddress = Vault.getVaultAccountId(accountId, [ DEFAULT_LEGAL_OFFICER, ANOTHER_LEGAL_OFFICER ]);
        expect(vaultAddress.address).toEqual("vQxSUrKm9aHXG1vHqpmCkAPsSs4DsWNPHzppgfZVkSRJ8kQZJ");
    });
});
