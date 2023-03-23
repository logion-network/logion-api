import { getVaultAddress } from "../src/index.js";
import { DEFAULT_LEGAL_OFFICER, ANOTHER_LEGAL_OFFICER } from "./TestData.js";

describe("Vault", () => {

    it("generates expected Vault address", ()=> {
        const vaultAddress = getVaultAddress("5H4MvAsobfZ6bBCDyj5dsrWYLrA8HrRzaqa9p61UXtxMhSCY", [ DEFAULT_LEGAL_OFFICER, ANOTHER_LEGAL_OFFICER ]);
        expect(vaultAddress).toEqual("5HDgYTbcXeXsWxDsdRVKVeBJRgUrq5fPVxRpNaVZYgHkvuzU");
    })
})
