import { ClosedIdentityLoc, ClosedLoc, PendingVote, Votes, waitFor } from "@logion/client";
import { State } from "./Utils.js";

export async function votingProcess(state: State) {
    const { client, alice, bob, charlie, signer } = state;

    const aliceClient = client.withCurrentAccount(alice.account);
    const closedIdentityLocs = await aliceClient.locsState({ spec: { ownerAddress: alice.account.address, locTypes: ["Identity"], statuses: ["CLOSED"] } });
    const votableLoc = closedIdentityLocs.closedLocs["Identity"].find(loc => loc.data().requesterAccountId !== undefined && loc.data().requesterAccountId?.type === "Polkadot") as ClosedIdentityLoc;

    await votableLoc.legalOfficer.requestVote({ signer });

    const votes = await waitFor<Votes>({
        predicate: votes => votes.votes.length > 0,
        producer: () => aliceClient.voter.getVotes(),
    });

    let pendingVote = votes.votes[0] as PendingVote;
    pendingVote = await pendingVote.castVote({ payload: { result: "Yes" }, signer });

    const bobClient = client.withCurrentAccount(bob.account);
    const bobVotes = await bobClient.voter.getVotes();
    let bobPendingVote = bobVotes.votes[0] as PendingVote;
    const bobLoc = bobClient.voter.findLocById(bobPendingVote.data.locId);
    expect(bobLoc).toBeDefined();
    bobPendingVote = await bobPendingVote.castVote({ payload: { result: "No" }, signer });

    const charlieClient = client.withCurrentAccount(charlie.account);
    const charlieVotes = await charlieClient.voter.getVotes();
    let charliePendingVote = charlieVotes.votes[0] as PendingVote;
    await charliePendingVote.castVote({ payload: { result: "No" }, signer });

    await waitFor<Votes>({
        predicate: votes => votes.votes.length === 1 && votes.votes[0].data.status === "REJECTED",
        producer: () => aliceClient.voter.getVotes(),
    });
}
