import {
    AuthenticatedLocClient,
    AddTokensRecordParams,
    FetchParameters,
    BlockchainSubmission,
    withLocId
} from "./LocClient.js";
import { PublicLoc } from "./Public.js";
import { SharedState } from "./SharedClient.js";
import { LogionClient } from "./LogionClient.js";
import { DateTime } from "luxon";
import { requireDefined } from "./assertions.js";

export class InvitedContributorApi {

    constructor(args: {
        sharedState: SharedState,
        logionClient: LogionClient,

    }) {
        this.sharedState = args.sharedState;
        this.logionClient = args.logionClient;
    }

    private readonly sharedState: SharedState;
    private readonly logionClient: LogionClient;

    async findContributedLocById(params: FetchParameters): Promise<InvitedContributorLoc | undefined> {

        if (!this.sharedState.currentAddress) {
            throw new Error("Current address must be set");
        }
        if (!this.logionClient.isTokenValid(DateTime.now())) {
            throw new Error("Client must be authenticated");
        }
        const loc = await this.logionClient.public.findLocById(params);
        if (loc === undefined) {
            return undefined;
        }
        const legalOfficer = this.sharedState.legalOfficers.find(lo => lo.address === loc.data.ownerAddress);
        if (!legalOfficer) {
            return undefined;
        }
        const authenticatedClient = new AuthenticatedLocClient({
            ...this.sharedState,
            axiosFactory: this.sharedState.axiosFactory,
            nodeApi: this.sharedState.nodeApi,
            currentAddress: this.sharedState.currentAddress,
            legalOfficer,
        });

        return new InvitedContributorLoc({ loc, invitedContributorApi: this, authenticatedClient });
    }
}

export class InvitedContributorLoc extends PublicLoc {

    private invitedContributorApi: InvitedContributorApi;
    private authenticatedClient: AuthenticatedLocClient;

    constructor(args: {
        loc: PublicLoc,
        invitedContributorApi: InvitedContributorApi,
        authenticatedClient: AuthenticatedLocClient
    }) {
        super({ data: args.loc.data, client: args.loc.client });
        this.invitedContributorApi = args.invitedContributorApi;
        this.authenticatedClient = args.authenticatedClient;
    }

    async addTokensRecord(parameters: BlockchainSubmission<AddTokensRecordParams>): Promise<InvitedContributorLoc> {
        if(!await this.authenticatedClient.isInvitedContributorOf(super.data.id)) {
            throw new Error("Current user is not allowed to add a tokens record");
        }
        await this.authenticatedClient.addTokensRecord(withLocId(super.data.id, parameters));
        return requireDefined(await this.invitedContributorApi.findContributedLocById({ locId: super.data.id }))
    }
}

