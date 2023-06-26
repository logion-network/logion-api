import { It, Mock } from "moq.ts";
import { AxiosInstance, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { UUID } from "@logion/node-api";
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { LogionClient } from "../src/LogionClient.js";
import { ApprovedVote, BackendVote, PendingVote, RejectedVote, Vote, Votes } from "../src/Votes.js";
import { ALICE, BOB, CHARLIE, doBuildValidPolkadotAccountId, mockSigner } from "./Utils.js";
import { LegalOfficerClass } from "../src/Types.js";

describe("Votes", () => {

    it("fetches and orders", async () => {
        const client = mockClient();

        const votes = await Votes.fetch(client.object());

        expectVotesAndOrder(votes);
    });

    it("refreshes", async () => {
        const client = mockClient();
        const votes = await Votes.fetch(client.object());

        const newVotes = await votes.refresh();

        expect(votes.discarded).toBe(true);
        expect(votes.getCurrentState()).toBe(newVotes);
        votes.votes.forEach(previousVote => expect(previousVote.discarded).toBe(true));
        votes.votes.forEach(previousVote => expect(newVotes.votes.includes(previousVote.getCurrentStateOrThrow() as Vote)));

        expectVotesAndOrder(newVotes);
        expect(newVotes.discarded).toBe(false);
        newVotes.votes.forEach(currentVote => expect(currentVote.discarded).toBe(false));
    });

    it("finds exsiting by ID", async () => {
        const client = mockClient();
        const votes = await Votes.fetch(client.object());

        const vote = votes.findById("1");

        expect(vote).toBeDefined();
        expect(vote?.data.voteId).toBe("1");
    });

    it("does not find non-exsiting by ID", async () => {
        const client = mockClient();
        const votes = await Votes.fetch(client.object());

        const vote = votes.findById("42");

        expect(vote).not.toBeDefined();
    });

    it("finds or throws exsiting by ID", async () => {
        const client = mockClient();
        const votes = await Votes.fetch(client.object());

        const vote = votes.findByIdOrThrow("1");

        expect(vote.data.voteId).toBe("1");
    });

    it("throws with non-exsiting", async () => {
        const client = mockClient();
        const votes = await Votes.fetch(client.object());

        expect(() => votes.findByIdOrThrow("42")).toThrow();
    });

    describe("ApprovedVote", () => {

        it("has already voted", async () => {
            const client = mockClient();
            const votes = await Votes.fetch(client.object());
            const approvedVote = votes.findByIdOrThrow("1") as PendingVote;

            expect(approvedVote.alreadyVoted()).toBe(true);
        });
    });

    describe("RejectedVote", () => {

        it("has already voted", async () => {
            const client = mockClient();
            const votes = await Votes.fetch(client.object());
            const rejectedVote = votes.findByIdOrThrow("2") as PendingVote;

            expect(rejectedVote.alreadyVoted()).toBe(true);
        });
    });

    describe("PendingVote", () => {

        it("has not already voted", async () => {
            const client = mockClient();
            const votes = await Votes.fetch(client.object());
            const pendingVote = votes.findByIdOrThrow("3") as PendingVote;

            expect(pendingVote.alreadyVoted()).toBe(false);
        });

        it("casts vote", async () => {
            const client = mockClient();
            const submittable = new Mock<SubmittableExtrinsic>();
            client.setup(client => client.logionApi.polkadot.tx.vote.vote(It.IsAny(), It.IsAny()))
                .returns(submittable.object());

            const votes = await Votes.fetch(client.object());
            const pendingVote = votes.findByIdOrThrow("3") as PendingVote;
            const signer = mockSigner({
                signerId: ALICE.address,
                submittable: submittable.object(),
            });
            const updatedVote = await pendingVote.castVote({
                result: "Yes",
                signer: signer.object(),
            });

            expect(updatedVote.alreadyVoted()).toBe(true);

            expect(updatedVote.discarded).toBe(false);
            expect(updatedVote.votes.discarded).toBe(false);

            expect(votes.discarded).toBe(true);
            expect(pendingVote.discarded).toBe(true);
        });
    });
});

function mockClient(): Mock<LogionClient> {
    const client = new Mock<LogionClient>();
    client.setup(client => client.authenticatedCurrentAddress)
        .returns(doBuildValidPolkadotAccountId(ALICE.address));

    const axiosMock = new Mock<AxiosInstance>();
    const response = new Mock<AxiosResponse>();
    response.setup(response => response.data.votes).returns(votesData());
    axiosMock.setup(axios => axios.get(`/api/vote/${ ALICE.address }`))
        .returnsAsync(response.object());

    client.setup(client => client.getLegalOfficer(ALICE.address))
        .returns(new LegalOfficerClass({
            legalOfficer: ALICE,
            axiosFactory: { buildAxiosInstance: () => axiosMock.object() },
            token: "auth-token",
        }));

    return client;
}

function expectVotesAndOrder(votes: Votes) {
    expect(votes.votes[0].data.voteId).toBe("3");
    expect(votes.votes[0]).toBeInstanceOf(PendingVote);

    expect(votes.votes[1].data.voteId).toBe("2");
    expect(votes.votes[1]).toBeInstanceOf(RejectedVote);

    expect(votes.votes[2].data.voteId).toBe("1");
    expect(votes.votes[2]).toBeInstanceOf(ApprovedVote);
}

function votesData(): BackendVote[] {
    return [
        {
            voteId: "1",
            createdOn: DateTime.now().toISO(),
            locId: new UUID().toString(),
            status: "APPROVED",
            ballots: {
                [ALICE.address]: "Yes",
                [BOB.address]: "Yes",
                [CHARLIE.address]: "Yes",
            },
        },
        {
            voteId: "2",
            createdOn: DateTime.now().toISO(),
            locId: new UUID().toString(),
            status: "REJECTED",
            ballots: {
                [ALICE.address]: "Yes",
                [BOB.address]: "No",
                [CHARLIE.address]: "No",
            },
        },
        {
            voteId: "3",
            createdOn: DateTime.now().toISO(),
            locId: new UUID().toString(),
            status: "PENDING",
            ballots: {},
        }
    ];
}
