import { transferTokens, failedTransfer } from "./Balances.js";
import {
    addCollectionItemTest,
    closeCollectionLocTest,
    createCollectionLocLimitedInSizeTest
} from "./CollectionLoc.js";
import { addGuardian } from "./LoAuthorityList.js";
import {
    createTransactionLocTest,
    addMetadataToTransactionLocTestAsLLO,
    addMetadataToTransactionLocTestAsRequester,
    acknowledgeMetadata,
    addFileToTransactionLocTestAsLLO,
    addFileToTransactionLocTestAsRequester,
    acknowledgeFile
} from "./TransactionLoc.js";
import { createVote } from "./Vote.js";
import { verifiedIssuers } from "./VerifiedIssuers.js";
import { storageFees, legalFees } from "./Fees.js";
import { adapts } from "./Adapters.js";

describe("Logion Node API", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    it("transfers logion tokens", transferTokens);
    it("fails transferring more logion tokens than available", failedTransfer);

    it("creates transaction LOCs", createTransactionLocTest);

    it("adds metadata to transaction LOC (LLO)", addMetadataToTransactionLocTestAsLLO);
    it("adds metadata to transaction LOC (Requester)", addMetadataToTransactionLocTestAsRequester);
    it("acknowledges metadata (LLO)", acknowledgeMetadata)

    it("adds file to transaction LOC (LLO)", addFileToTransactionLocTestAsLLO);
    it("adds file to transaction LOC (Requester)", addFileToTransactionLocTestAsRequester);
    it("acknowledges file (LLO)", acknowledgeFile)

    it("creates collection LOC limited in size", createCollectionLocLimitedInSizeTest);
    it("closes collection LOC", closeCollectionLocTest);
    it("adds collection item", addCollectionItemTest);

    it("creates a vote", createVote);

    it("adds guest guardian", addGuardian);

    it("supports verified issuers", verifiedIssuers);

    it("queries file storage fees", storageFees);
    it("queries file storage fees", legalFees);

    it("adapts", adapts);
});
