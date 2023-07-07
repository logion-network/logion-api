import { LogionNodeApiClass, Region } from "@logion/node-api";
import type { StorageKey } from '@polkadot/types';
import { AccountId32 } from "@polkadot/types/interfaces/runtime";
import { Option } from "@polkadot/types-codec";
import { PalletLoAuthorityListLegalOfficerData } from "@polkadot/types/lookup";
import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory.js";
import { LegalOfficer, LegalOfficerClass, LegalOfficerPostalAddress, UserIdentity } from "./Types.js";

export interface DirectoryLegalOfficer {
    userIdentity: UserIdentity;
    postalAddress: LegalOfficerPostalAddress;
    address: string;
    additionalDetails: string;
}

export class DirectoryClient {

    constructor(api: LogionNodeApiClass, directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) {
        this.authenticated = token !== undefined;
        this.axiosFactory = axiosFactory;
        this.token = token;
        this.api = api;

        this.axios = axiosFactory.buildAxiosInstance(directoryEndpoint, token);
    }

    private authenticated: boolean;

    private axiosFactory: AxiosFactory;

    private token: string | undefined;

    private axios: AxiosInstance;

    private api: LogionNodeApiClass;

    async getLegalOfficers(): Promise<LegalOfficerClass[]> {
        const offchain = (await this.axios.get("/api/legal-officer")
            .then(response => response.data.legalOfficers)) as DirectoryLegalOfficer[];
        const offchainMap = this.toOffchainMap(offchain);
        const onchain = await this.api.polkadot.query.loAuthorityList.legalOfficerSet.entries();
        const onchainMap = this.toOnchainMap(onchain);
        const legalOfficers = [];
        for(const address in onchainMap) {
            const offchainData = offchainMap[address];
            if(offchainData) {
                const hostData = this.getHostData(address, onchainMap);
                const legalOfficer: LegalOfficer = {
                    ...offchainData,
                    name: `${offchainData.userIdentity.firstName} ${offchainData.userIdentity.lastName}`,
                    ...hostData,
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

    private toOffchainMap(array: DirectoryLegalOfficer[]): Record<string, DirectoryLegalOfficer> {
        const map: Record<string, DirectoryLegalOfficer> = {};
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

        const region = this.api.adapters.fromLogionNodeRuntimeRegion(onchainHost.asHost.region);

        return { nodeId, node, region };
    }

    private getHost(address: string, data: Record<string, PalletLoAuthorityListLegalOfficerData>): PalletLoAuthorityListLegalOfficerData {
        const hostOrGuest = data[address];
        if(hostOrGuest.isHost) {
            return hostOrGuest;
        } else {
            return data[hostOrGuest.asGuest.toString()];
        }
    }

    async createOrUpdate(legalOfficer: LegalOfficer) {
        if(!this.authenticated) {
            throw new Error("Authentication is required");
        }
        await this.axios.put('/api/legal-officer', legalOfficer);
    }
}
