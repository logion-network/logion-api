import { LogionNodeApiClass, OtherAccountId, UUID } from "@logion/node-api";
import { LegalOfficer } from "./Types.js";
import { Signer, SignCallback } from "./Signer.js";

export class Sponsorship {

    constructor(args: {
        signerId: string,
        api: LogionNodeApiClass,
    }) {
        this.signerId = args.signerId;
        this.api = args.api;
    }

    private signerId: string;
    private api: LogionNodeApiClass;

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
            args.legalOfficer.address,
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
