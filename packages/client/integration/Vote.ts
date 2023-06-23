import { ClosedLoc, PendingVote, Votes, waitFor } from "../src/index.js";
import { State } from "./Utils.js";

export async function votingProcess(state: State) {
    const { client, alice, aliceAccount, bobAccount, charlieAccount, signer } = state;

    const aliceClient = client.withCurrentAddress(aliceAccount);
    const closedIdentityLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.address, locTypes: ["Identity"], statuses: ["CLOSED"] } });
    const votableLoc = closedIdentityLocs.closedLocs["Identity"].find(loc => loc.data().requesterAddress !== undefined && loc.data().requesterAddress?.type === "Polkadot") as ClosedLoc;

    await votableLoc.legalOfficer.requestVote({ signer });

    const votes = await waitFor<Votes>({
        predicate: votes => votes.votes.length > 0,
        producer: () => aliceClient.voter.getVotes(),
    });

    let pendingVote = votes.votes[0] as PendingVote;
    pendingVote = await pendingVote.castVote({ result: "Yes", signer });

    const bobClient = client.withCurrentAddress(bobAccount);
    const bobVotes = await bobClient.voter.getVotes();
    let bobPendingVote = bobVotes.votes[0] as PendingVote;
    const bobLoc = bobClient.voter.findLocById(bobPendingVote.data.locId);
    expect(bobLoc).toBeDefined();
    bobPendingVote = await bobPendingVote.castVote({ result: "No", signer });

    const chalieClient = client.withCurrentAddress(charlieAccount);
    const chalieVotes = await chalieClient.voter.getVotes();
    let chaliePendingVote = chalieVotes.votes[0] as PendingVote;
    await chaliePendingVote.castVote({ result: "No", signer });

    await waitFor<Votes>({
        predicate: votes => votes.votes.length === 1 && votes.votes[0].data.status === "REJECTED",
        producer: () => aliceClient.voter.getVotes(),
    });
}
