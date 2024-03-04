import { transferTokens } from "./Balances.js";
import {
    addCollectionItemTest,
    closeCollectionLocTest,
    createCollectionLocLimitedInSizeTest
} from "./CollectionLoc.js";
import { addGuestLegalOfficer, getAvailableRegions, importHost, updateHostLegalOfficer } from "./LoAuthorityList.js";
import {
    createTransactionLocTest,
    addMetadataToTransactionLocTestAsLLO,
    addMetadataToTransactionLocTestAsRequester,
    acknowledgeMetadataAsOwner,
    addFileToTransactionLocTestAsLLO,
    addFileToTransactionLocTestAsRequester,
    acknowledgeFileAsOwner,
    addLinkToTransactionLocTestAsLLO,
    addLinkToTransactionLocTestAsRequester,
    acknowledgeLinkAsOwner,
} from "./TransactionLoc.js";
import { createVote } from "./Vote.js";
import { verifiedIssuers } from "./VerifiedIssuers.js";
import { invitedContributors } from "./InvitedContributors.js";
import { storageFees, legalFees, certificateFees, ensureEnoughFunds } from "./Fees.js";
import { toPalletLogionLocOtherAccountId, toSponsorshipId, toPalletLogionLocMetadataItem, toPalletLogionLocFile, toCollectionItemToken, toCollectionItemFile } from "./Adapters.js";
import { badOriginError, moduleError } from "./Error.js";
import { createIdentityLocTest } from "./IdentityLoc.js";

describe("Logion Node API", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

    it("queries file storage fees", storageFees);
    it("queries legal fees", legalFees);
    it("queries certificate fees", certificateFees);
    it("ensures enough funds", ensureEnoughFunds);

    it("adapts to PalletLogionLocOtherAccountId", toPalletLogionLocOtherAccountId);
    it("adapts to SponsorshipId", toSponsorshipId);
    it("adapts to PalletLogionLocMetadataItem", toPalletLogionLocMetadataItem);
    it("adapts to PalletLogionLocFile", toPalletLogionLocFile);
    it("adapts to CollectionItemToken", toCollectionItemToken);
    it("adapts to CollectionItemFile", toCollectionItemFile);

    it("transfers logion tokens", transferTokens);

    it("handles properly bad origin error", badOriginError);
    it("handles properly pallet error", moduleError);

    it("creates identity LOC", createIdentityLocTest);
    it("creates transaction LOCs", createTransactionLocTest);

    it("adds metadata to transaction LOC (LLO)", addMetadataToTransactionLocTestAsLLO);
    it("adds metadata to transaction LOC (Requester)", addMetadataToTransactionLocTestAsRequester);
    it("acknowledges metadata (LLO)", acknowledgeMetadataAsOwner);

    it("adds file to transaction LOC (LLO)", addFileToTransactionLocTestAsLLO);
    it("adds file to transaction LOC (Requester)", addFileToTransactionLocTestAsRequester);
    it("acknowledges file (LLO)", acknowledgeFileAsOwner);

    it("adds link to transaction LOC (LLO)", addLinkToTransactionLocTestAsLLO);
    it("adds link to transaction LOC (Requester)", addLinkToTransactionLocTestAsRequester);
    it("acknowledges link (LLO)", acknowledgeLinkAsOwner);

    it("creates collection LOC limited in size", createCollectionLocLimitedInSizeTest);
    it("closes collection LOC", closeCollectionLocTest);
    it("adds collection item", addCollectionItemTest);

    it("creates a vote", createVote);

    it("adds guest legal offier", addGuestLegalOfficer);
    it("updates host legal offier", updateHostLegalOfficer);
    it("provides available regions", getAvailableRegions);
    it("imports host legal officer", importHost);

    it("supports verified issuers", verifiedIssuers);
    it("supports invited contributors", invitedContributors);
});
