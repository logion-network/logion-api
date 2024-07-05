import { LogionNodeApiClass, OtherAccountId, UUID, Sponsorship, ValidAccountId } from "@logion/node-api";
import { LegalOfficer, LegalOfficerClass } from "./Types.js";
import { Signer, SignCallback } from "./Signer.js";
import { LocRequestState, LocsState } from "./Loc.js";
import { SharedState, getDefinedCurrentAccount } from "./SharedClient.js";
import { requireDefined } from "./assertions.js";
import { FetchAllLocsParams } from "./LocClient.js";
import { LogionClient } from "./LogionClient.js";

export class SponsorshipApi {

    constructor(args: {
        signerId: ValidAccountId,
        api: LogionNodeApiClass,
    }) {
        this.signerId = args.signerId;
        this.api = args.api;
    }

    private readonly signerId: ValidAccountId;
    private readonly api: LogionNodeApiClass;

    async sponsor(args: {
        sponsorshipId: UUID,
        sponsoredAccount: OtherAccountId,
        legalOfficer: LegalOfficer,
        signer: Signer,
        callback?: SignCallback,
    }) {
        const submittable = this.api.polkadot.tx.logionLoc.sponsor(
            this.api.adapters.toSponsorshipId(args.sponsorshipId),
            this.api.adapters.toPalletLogionLocSupportedAccountId(args.sponsoredAccount.toValidAccountId()),
            args.legalOfficer.account.address,
        );
        await args.signer.signAndSend({
            signerId: this.signerId,
            submittable,
            callback: args.callback,
        });
    }

    async withdraw(args: {
        sponsorshipId: UUID,
        signer: Signer,
        callback?: SignCallback,
    }) {
        const submittable = this.api.polkadot.tx.logionLoc.withdrawSponsorship(
            this.api.adapters.toSponsorshipId(args.sponsorshipId)
        );
        await args.signer.signAndSend({
            signerId: this.signerId,
            submittable,
            callback: args.callback,
        });
    }
}

export class SponsorshipState {

    private readonly sharedState: SharedState;
    private readonly client: LogionClient;
    private readonly id: UUID;

    readonly sponsorship: Sponsorship;
    readonly legalOfficer: LegalOfficerClass;
    readonly locRequestState?: LocRequestState;


    constructor(sharedState: SharedState, client: LogionClient, id: UUID, sponsorship: Sponsorship, legalOfficer: LegalOfficerClass, locRequestState?: LocRequestState) {
        this.sharedState = sharedState;
        this.client = client;
        this.id = id;
        this.sponsorship = sponsorship;
        this.legalOfficer = legalOfficer;
        this.locRequestState = locRequestState;
    }

    static async getState(params: {
        sharedState: SharedState,
        client: LogionClient,
        id: UUID
    }): Promise<SponsorshipState> {
        const { sharedState, client, id } = params;
        const sponsorship = await this.getValidSponsorship(sharedState, id);
        const legalOfficer = requireDefined(sharedState.allLegalOfficers.find(lo => lo.account.equals(sponsorship.legalOfficer)));
        return new SponsorshipState(sharedState, client, id, sponsorship, legalOfficer).refresh(false);
    }

    private static async getValidSponsorship(sharedState: SharedState, id: UUID): Promise<Sponsorship> {
        const requester = getDefinedCurrentAccount(sharedState);
        const sponsorship = await sharedState.nodeApi.queries.getSponsorship(id);
        if (sponsorship === undefined) {
            throw new Error("Sponsorship not found")
        }
        if (!requester.equals(sponsorship.sponsoredAccount)) {
            throw new Error("Invalid Sponsorship")
        }
        return sponsorship;
    }

    async refresh(refreshFromChain = true): Promise<SponsorshipState> {
        const { address, type } = getDefinedCurrentAccount(this.sharedState);
        const params: FetchAllLocsParams = {
            legalOfficers: [ this.legalOfficer ],
            spec: {
                requesterAddress: address,
                requesterAddressType: type,
                sponsorshipId: this.id.toString(),
                locTypes: [ "Identity" ],
                ownerAddress: this.legalOfficer.account.address,
                statuses: [],
            }
        };
        const locsState = await LocsState.getInitialLocsState(this.sharedState, this.client, params);
        const locRequestState = locsState.getLocRequestState(0);
        const sponsorship = refreshFromChain ? await SponsorshipState.getValidSponsorship(this.sharedState, this.id) : this.sponsorship;
        return new SponsorshipState(this.sharedState, this.client, this.id, sponsorship, this.legalOfficer, locRequestState)
    }
}
