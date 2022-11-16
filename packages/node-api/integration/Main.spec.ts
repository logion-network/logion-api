import { transferTokens } from "./Balances";
import { addCollectionItemTest, closeCollectionLocTest, createCollectionLocLimitedInSizeTest } from "./CollectionLoc";
import { queryInfos } from "./Query";
import { addFileToTransactionLocTest, createTransactionLocTest } from "./TransactionLoc";

describe("Logion Node API", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    it("queries extrinsic infos", queryInfos);

    it("transfers logion tokens", transferTokens);

    it("creates transaction LOCs", createTransactionLocTest);
    it("adds file to transaction LOC", addFileToTransactionLocTest);

    it("creates collection LOC limited in size", createCollectionLocLimitedInSizeTest);
    it("closes collection LOC", closeCollectionLocTest);
    it("adds collection item", addCollectionItemTest);
});
