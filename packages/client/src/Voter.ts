import { LegalOfficerCase, UUID, ValidAccountId } from "@logion/node-api";
import { DateTime } from "luxon";
import { LocSharedState, LocsState, ReadOnlyLocState } from "./Loc.js";
import { AuthenticatedLocClient, EMPTY_LOC_ISSUERS, LocMultiClient, LocRequest } from "./LocClient.js";
import { LogionClient } from "./LogionClient.js";
import { SharedState } from "./SharedClient.js";
import { Votes } from "./Votes.js";

export class VoterApi {

    constructor(args: {
        sharedState: SharedState,
        logionClient: LogionClient,
    }) {
        this.sharedState = args.sharedState;
        this.logionClient = args.logionClient;
    }

    private sharedState: SharedState;

    private logionClient: LogionClient;

    async findLocById(locId: UUID): Promise<ReadOnlyLocState | undefined> {
        const locAndClient = await this.getLocAndClient(locId);
        if(!locAndClient) {
            return undefined;
        }
        const { loc, locRequest, client } = locAndClient;
        const legalOfficer = this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.account.equals(ValidAccountId.polkadot(locRequest.ownerAddress)));
        if(!legalOfficer) {
            throw new Error(`Unknown legal officer ${locRequest.ownerAddress}`);
        }
        const locsState = new LocsState(this.sharedState, {}, this.logionClient, {});
        const locSharedState: LocSharedState = {
            ...this.sharedState,
            legalOfficer,
            client,
            locsState,
        }
        return new ReadOnlyLocState(locSharedState, locRequest, loc, EMPTY_LOC_ISSUERS, []);
    }

    private async getLocAndClient(locId: UUID): Promise<{ loc: LegalOfficerCase, locRequest: LocRequest, client: AuthenticatedLocClient } | undefined> {
        const loc = await LocMultiClient.getLoc({
            locId,
            api: this.sharedState.nodeApi,
        });
        const legalOfficer = this.sharedState.legalOfficers.find(lo => lo.account.equals(loc.owner));
        if (!legalOfficer) {
            return undefined;
        }
        if (!this.sharedState.currentAccount) {
            throw new Error("Current address must be set");
        }
        if (!this.logionClient.isTokenValid(DateTime.now())) {
            throw new Error("Client must be authenticated");
        }
        const client = new AuthenticatedLocClient({
            ...this.sharedState,
            axiosFactory: this.sharedState.axiosFactory,
            nodeApi: this.sharedState.nodeApi,
            currentAccount: this.sharedState.currentAccount,
            legalOfficer,
        });
        const locRequest = await client.getLocRequest({ locId });
        return {
            loc,
            locRequest,
            client,
        }
    }

    async getVotes(): Promise<Votes> {
        return Votes.fetch(this.logionClient);
    }
}
