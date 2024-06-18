import { LogionNodeApiClass, Region, ValidAccountId } from "@logion/node-api";
import type { StorageKey } from '@polkadot/types';
import { AccountId32 } from "@polkadot/types/interfaces/runtime";
import { Option } from "@polkadot/types-codec";
import { PalletLoAuthorityListLegalOfficerData } from "@polkadot/types/lookup";
import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory.js";
import { LegalOfficer, LegalOfficerClass, LegalOfficerPostalAddress, UserIdentity } from "./Types.js";
import { MultiSourceHttpClient, aggregateArrays, Endpoint, MultiSourceHttpClientState } from "./Http.js";
import { newBackendError } from "./Error.js";

interface BackendLegalOfficer {
    userIdentity: UserIdentity;
    postalAddress: LegalOfficerPostalAddress;
    address: string;
    additionalDetails: string;
}

export interface CreateOrUpdateLegalOfficer {
    node: string;
    userIdentity: UserIdentity;
    postalAddress: LegalOfficerPostalAddress;
    additionalDetails: string;
}

export class LegalOfficerClient {

    constructor(api: LogionNodeApiClass, axiosFactory: AxiosFactory, token?: string) {
        this.authenticated = token !== undefined;
        this.axiosFactory = axiosFactory;
        this.token = token;
        this.api = api;
    }

    private readonly authenticated: boolean;

    private readonly axiosFactory: AxiosFactory;

    private readonly token: string | undefined;

    private api: LogionNodeApiClass;

    async getLegalOfficers(): Promise<LegalOfficerClass[]> {
        const onchain = await this.api.polkadot.query.loAuthorityList.legalOfficerSet.entries();
        const onchainMap = this.toOnchainMap(onchain);
        const httpClient = new MultiSourceHttpClient<Endpoint>(
            this.getInitialState(onchainMap),
            this.axiosFactory,
        );
        const multiResponse = await httpClient.fetch(async axios => this.getLegalOfficersFromNode(axios, onchainMap));
        return aggregateArrays<LegalOfficerClass>(multiResponse);
    }

    async getLegalOfficersFromNode(
        axios: AxiosInstance,
        onchainMap: Record<string, PalletLoAuthorityListLegalOfficerData>
    ): Promise<LegalOfficerClass[]> {
        const offchain = (await axios.get("/api/legal-officer")
            .then(response => response.data.legalOfficers)) as BackendLegalOfficer[];
        const offchainMap = this.toOffchainMap(offchain);
        const legalOfficers = [];
        for(const address in offchainMap) {
            const offchainData = offchainMap[address];
            const hostData = this.getHostData(address, onchainMap);
            if(hostData) {
                const legalOfficer: LegalOfficer = {
                    ...offchainData,
                    name: `${offchainData.userIdentity.firstName} ${offchainData.userIdentity.lastName}`,
                    ...hostData,
                    account: ValidAccountId.polkadot(address),
                };
                legalOfficers.push(new LegalOfficerClass({
                    legalOfficer,
                    axiosFactory: this.axiosFactory,
                    token: this.token,
                }));
            }
        }
        return legalOfficers;
    }

    private toOffchainMap(array: BackendLegalOfficer[]): Record<string, BackendLegalOfficer> {
        const map: Record<string, BackendLegalOfficer> = {};
        array.forEach(item => { map[item.address] = item; });
        return map;
    }

    private toOnchainMap(array: [StorageKey<[AccountId32]>, Option<PalletLoAuthorityListLegalOfficerData>][]): Record<string, PalletLoAuthorityListLegalOfficerData> {
        const map: Record<string, PalletLoAuthorityListLegalOfficerData> = {};
        array.forEach(item => {
            map[item[0].args[0].toString()] = item[1].unwrap();
        });
        return map;
    }

    private getHostData(address: string, onchainMap: Record<string, PalletLoAuthorityListLegalOfficerData>): { nodeId: string, node: string, region: Region } {
        const onchainHost = this.getHost(address, onchainMap);

        let nodeId = "";
        if(onchainHost.asHost.nodeId.isSome) {
            nodeId = onchainHost.asHost.nodeId.unwrap().toString();
        }

        let node = "";
        if(onchainHost.asHost.baseUrl.isSome) {
            node = onchainHost.asHost.baseUrl.unwrap().toUtf8();
        }

        const region = this.api.adapters.fromLogionRuntimeRegion(onchainHost.asHost.region);

        return { nodeId, node, region };
    }

    private getHost(address: string, data: Record<string, PalletLoAuthorityListLegalOfficerData>): PalletLoAuthorityListLegalOfficerData {
        const hostOrGuest = data[address];
        if(!hostOrGuest) {
            throw new Error(`No data for address ${ address }`);
        }
        if(hostOrGuest.isHost) {
            return hostOrGuest;
        } else {
            const hostAddress = hostOrGuest.asGuest.hostId.toString();
            const host = data[hostAddress];
            if(!host) {
                throw new Error(`No host with address ${ hostAddress }`);
            }
            return host;
        }
    }

    private getInitialState(onchainMap: Record<string, PalletLoAuthorityListLegalOfficerData>): MultiSourceHttpClientState<Endpoint> {
        const nodes = new Set<string>();
        for(const address in onchainMap) {
            const hostData = this.getHostData(address, onchainMap);
            nodes.add(hostData.node);
        }
        return {
            nodesUp: Array.from(nodes).map(node => ({ url: node })),
            nodesDown: [],
        };
    }

    async createOrUpdate(legalOfficer: CreateOrUpdateLegalOfficer) {
        if(!this.authenticated) {
            throw new Error("Authentication is required");
        }
        try {
            const backend = this.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token);
            await backend.put('/api/legal-officer', legalOfficer);
        } catch(e) {
            throw newBackendError(e);
        }
    }
}
