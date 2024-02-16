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

const WORKLOAD_CACHE_TTL_MS = 10 * 1000; // 10 sec

interface CachedWorkload {
    workload: number,
    timestamp: number,
}

class Workload {

    private workloads: Record<string, CachedWorkload> = {};
    private addressesByNode: Record<string, Set<string>> = {};

    constructor() {
    }

    addLegalOfficer(legalOfficer: LegalOfficer) {
        const addresses = this.addressesByNode[legalOfficer.node];
        if (addresses === undefined) {
            this.addressesByNode[legalOfficer.node] = new Set([ legalOfficer.address ]);
        } else {
            addresses.add(legalOfficer.address);
        }
    }

    async getWorkload(legalOfficer: LegalOfficerClass): Promise<number> {
        const cachedWorkload = this.workloads[legalOfficer.address];
        if (cachedWorkload !== undefined && (Date.now() - cachedWorkload.timestamp) < WORKLOAD_CACHE_TTL_MS) {
            return cachedWorkload.workload;
        } else {
            await this.fetchAndStoreWorkload(legalOfficer);
            return this.workloads[legalOfficer.address].workload;
        }

    }

    flushCache() {
        this.workloads = {};
    }

    private async fetchAndStoreWorkload(legalOfficer: LegalOfficerClass) {
        if (!legalOfficer.token) {
            throw new Error("Authenticate first");
        }
        const axios = legalOfficer.buildAxiosToNode();

        const legalOfficerAddresses = Array.from(this.addressesByNode[legalOfficer.node]);
        const response = await axios.put(`/api/workload`, {
            legalOfficerAddresses
        });
        const workloads = response.data.workloads;
        const addresses = Object.keys(workloads);
        addresses.forEach(address => {
            this.workloads[address] = {
                workload: workloads[address],
                timestamp: Date.now(),
            };
        })
    }
}

export class LegalOfficerClass implements LegalOfficer {

    private static readonly workload: Workload = new Workload();

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

        LegalOfficerClass.workload.addLegalOfficer(this);
    }


    readonly userIdentity: UserIdentity;
    readonly postalAddress: LegalOfficerPostalAddress;
    readonly address: string;
    readonly additionalDetails: string;
    readonly node: string;
    readonly name: string;
    readonly nodeId: string;
    readonly region: Region;
    readonly token: string | undefined;

    private axiosFactory: AxiosFactory;
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

    async getWorkload(): Promise<number> {
        return LegalOfficerClass.workload.getWorkload(this);
    }

    static flushWorkloadCache() {
        LegalOfficerClass.workload.flushCache();
    }
}
