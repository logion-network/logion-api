import { UUID } from "@logion/node-api";
import { LogionClient } from "./LogionClient.js";
import { State } from "./State.js";
import { BlockchainSubmissionParams } from "./LocClient.js";

export class Votes extends State {

    static async fetch(client: LogionClient): Promise<Votes> {
        return Votes.fetchAndDiscard(client, []);
    }

    private static async fetchAndDiscard(client: LogionClient, previousVotes: Vote[]): Promise<Votes> {
        const votesData = await Votes.fetchData(client);

        const votes = new Votes({
            client,
            votes: [],
        });
        votes._votes = votesData.map(data => Votes.toVote(votes, data));

        Votes.discardPrevious(previousVotes, votes._votes);

        return votes;
    }

    private static async fetchData(client: LogionClient): Promise<VoteData[]> {
        const currentAddress = client.authenticatedCurrentAddress;
        const axios = client.getLegalOfficer(currentAddress.address).buildAxiosToNode();
        const response = await axios.get(`/api/vote/${ currentAddress.address }`);
        const backendVotes: BackendVote[] = response.data.votes;
        return backendVotes.map(backendVote => ({
            ...backendVote,
            locId: new UUID(backendVote.locId),
            status: backendVote.status || "PENDING",
            ballots: backendVote.ballots || {},
        })).sort((v1, v2) => v2.voteId.localeCompare(v1.voteId));
    }

    static toVote(votes: Votes, data: VoteData): Vote {
        if(data.status === "PENDING") {
            return new PendingVote(votes, data);
        } else if(data.status === "APPROVED") {
            return new ApprovedVote(votes, data);
        } else if(data.status === "REJECTED") {
            return new RejectedVote(votes, data);
        } else {
            throw new Error(`Unsuppported vote status ${data.status}`);
        }
    }

    private static discardPrevious(previousVotes: Vote[], currentVotes: Vote[]) {
        previousVotes.forEach(previousVote => {
            const currentVote = currentVotes.find(currentVote => previousVote.data.voteId === currentVote.data.voteId);
            if(currentVote) {
                previousVote.discard(currentVote);
            } else {
                previousVote.discard(undefined);
            }
        });
    }

    constructor(params: {
        client: LogionClient,
        votes: Vote[],
    }) {
        super();
        this.client = params.client;
        this._votes = params.votes;
    }

    readonly client: LogionClient;

    private _votes: Vote[];

    get votes(): Vote[] {
        return this._votes;
    }

    refreshWith(updatedVote: VoteData): Votes {
        return this.syncDiscardOnSuccess(() => this._refreshWith(updatedVote));
    }

    _refreshWith(updatedVoteData: VoteData): Votes {
        const votes = new Votes({
            client: this.client,
            votes: [],
        });
        votes._votes = this._votes.map(vote =>
            vote.data.voteId === updatedVoteData.voteId ? Votes.toVote(votes, updatedVoteData) : vote.refreshVotes(votes));
        return votes;
    }

    findById(voteId: string): Vote | undefined {
        return this._votes.find(vote => vote.data.voteId === voteId);
    }

    findByIdOrThrow(voteId: string): Vote {
        const vote = this.findById(voteId);
        if(!vote) {
            throw new Error(`No vote with ID ${voteId}`);
        }
        return vote;
    }

    refresh(): Promise<Votes> {
        return this.getCurrentStateOrThrow().discardOnSuccess(async () => Votes.fetchAndDiscard(this.client, this._votes));
    }
}

export interface BackendVote {
    voteId: string;
    createdOn: string;
    locId: string;
    status?: VoteStatus;
    ballots?: {
        [key: string]: ("Yes" | "No") | undefined;
    };
}

export type VoteStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface VoteData {
    voteId: string;
    createdOn: string;
    locId: UUID;
    status: VoteStatus;
    ballots: {
        [key: string]: (VoteResult | undefined);
    };
}

export type VoteResult = "Yes" | "No";

export abstract class Vote extends State {

    constructor(votes: Votes, data: VoteData) {
        super();
        this._data = data;
        this._votes = votes;
    }

    protected _data: VoteData;

    protected _votes: Votes;

    get data() {
        return this._data;
    }

    get votes() {
        return this._votes;
    }

    alreadyVoted(): boolean {
        const currentAddress = this.currentAddress();
        return currentAddress in this._data.ballots && this._data.ballots[currentAddress] !== undefined;
    }

    protected currentAddress() {
        return this._votes.client.authenticatedCurrentAddress.address;
    }

    abstract refreshVotes(newVotes: Votes): Vote;
}

export class PendingVote extends Vote {

    async castVote(params: { result: VoteResult } & BlockchainSubmissionParams): Promise<PendingVote> {
        this.ensureCurrent();
        const api = this._votes.client.logionApi;
        const submittable = api.polkadot.tx.vote.vote(
            this._data.voteId,
            params.result === "Yes",
        );
        await params.signer.signAndSend({
            signerId: super.currentAddress(),
            submittable,
            callback: params.callback,
        });
        const ballots = {
            ...this._data.ballots,
            [super.currentAddress()]: params.result,
        };
        const newData = {
            ...this._data,
            ballots
        };
        const current = this.getCurrentStateOrThrow() as PendingVote;
        const newVotes = current.syncDiscardOnSuccess(() => current._votes.refreshWith(newData));
        return newVotes.findByIdOrThrow(current._data.voteId) as PendingVote;
    }

    override refreshVotes(newVotes: Votes): PendingVote {
        return this.syncDiscardOnSuccess(() => new PendingVote(newVotes, this._data));
    }
}

export class ApprovedVote extends Vote {

    override refreshVotes(newVotes: Votes): ApprovedVote {
        return this.syncDiscardOnSuccess(() => new ApprovedVote(newVotes, this._data));
    }
}

export class RejectedVote extends Vote {

    override refreshVotes(newVotes: Votes): RejectedVote {
        return this.syncDiscardOnSuccess(() => new RejectedVote(newVotes, this._data));
    }
}
