import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory";

export interface UserIdentity {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export interface PostalAddress {
    line1: string,
    line2: string,
    postalCode: string,
    city: string,
    country: string
}

export interface LegalOfficerPostalAddress extends PostalAddress {
    company: string,
}

export interface LegalOfficer {
    userIdentity: UserIdentity;
    postalAddress: LegalOfficerPostalAddress;
    address: string;
    additionalDetails: string;
    node: string;
    name: string;
    logoUrl: string;
    nodeId: string;
}

export type Language = 'en' | 'fr';

export class LegalOfficerClass implements LegalOfficer {

    constructor(args: {
        legalOfficer: LegalOfficer,
        axiosFactory: AxiosFactory,
        token?: string,
    }) {
        this.userIdentity = args.legalOfficer.userIdentity;
        this.postalAddress = args.legalOfficer.postalAddress;
        this.address = args.legalOfficer.address;
        this.additionalDetails = args.legalOfficer.additionalDetails;
        this.node = args.legalOfficer.node;
        this.name = args.legalOfficer.name;
        this.logoUrl = args.legalOfficer.logoUrl;
        this.nodeId = args.legalOfficer.nodeId;

        this.axiosFactory = args.axiosFactory;
        this.token = args.token;
    }

    readonly userIdentity: UserIdentity;
    readonly postalAddress: LegalOfficerPostalAddress;
    readonly address: string;
    readonly additionalDetails: string;
    readonly node: string;
    readonly name: string;
    readonly logoUrl: string;
    readonly nodeId: string;

    private axiosFactory: AxiosFactory;
    private token: string | undefined;

    buildAxiosToNode(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.node, this.token);
    }

    withToken(token?: string) {
        return new LegalOfficerClass({
            legalOfficer: this,
            axiosFactory: this.axiosFactory,
            token,
        });
    }
}
