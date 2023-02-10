import { LegalOfficerCase, UUID } from "@logion/node-api";
import { LocSharedState, LocsState, ReadOnlyLocState } from "./Loc.js";
import { AuthenticatedLocClient, EMPTY_LOC_ISSUERS, LocMultiClient, LocRequest } from "./LocClient.js";
import { LogionClient } from "./LogionClient.js";
import { SharedState } from "./SharedClient.js";

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
        const legalOfficer = this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.address === locRequest.ownerAddress);
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
        return new ReadOnlyLocState(locSharedState, locRequest, loc, EMPTY_LOC_ISSUERS);
    }

    private async getLocAndClient(locId: UUID): Promise<{ loc: LegalOfficerCase, locRequest: LocRequest, client: AuthenticatedLocClient } | undefined> {
        const loc = await LocMultiClient.getLoc({
            locId,
            api: this.sharedState.nodeApi,
        });
        const legalOfficer = this.sharedState.legalOfficers.find(lo => lo.address === loc.owner);
        if (!legalOfficer) {
            return undefined;
        }
        if (!this.sharedState.currentAddress) {
            throw new Error("Current address must be set");
        }
        const token = this.sharedState.tokens.get(this.sharedState.currentAddress);
        if (!token) {
            throw new Error("Client must be authenticated");
        }
        const client = new AuthenticatedLocClient({
            ...this.sharedState,
            axiosFactory: this.sharedState.axiosFactory,
            nodeApi: this.sharedState.nodeApi,
            legalOfficer,
            currentAddress: this.sharedState.currentAddress,
            token: token.value,
        });
        const locRequest = await client.getLocRequest({ locId });
        return {
            loc,
            locRequest,
            client,
        }
    }
}
