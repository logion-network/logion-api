import { Region } from "@logion/node-api";
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
    nodeId: string;
    region: Region;
}

export type Language = 'en' | 'fr';

export interface BackendConfig {
    features: {
        iDenfy: boolean;
        vote: boolean;
    };
}

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
        this.nodeId = args.legalOfficer.nodeId;
        this.region = args.legalOfficer.region;

        this.axiosFactory = args.axiosFactory;
        this.token = args.token;
    }

    readonly userIdentity: UserIdentity;
    readonly postalAddress: LegalOfficerPostalAddress;
    readonly address: string;
    readonly additionalDetails: string;
    readonly node: string;
    readonly name: string;
    readonly nodeId: string;
    readonly region: Region;

    private axiosFactory: AxiosFactory;
    private token: string | undefined;
    private config: BackendConfig | undefined;

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

    async getConfig(): Promise<BackendConfig> {
        this.config ||= await this.fetchConfig();
        return this.config;
    }

    private async fetchConfig(): Promise<BackendConfig> {
        if(!this.token) {
            throw new Error("Authenticate first");
        }
        const axios = this.buildAxiosToNode();
        const response = await axios.get("/api/config");
        return response.data;
    }
}
