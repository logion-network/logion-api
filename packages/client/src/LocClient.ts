import {
    File as BlockchainFile,
    MetadataItem,
    Link,
    CollectionItem,
    LocType,
    LegalOfficerCase,
} from '@logion/node-api/dist/Types';
import { UserIdentity, LegalOfficer } from "./Types";
import { NetworkState } from "./NetworkState";
import { LegalOfficerEndpoint } from "./SharedClient";
import { AxiosFactory } from "./AxiosFactory";
import { LogionNodeApi, UUID } from "node-api/dist";
import { getLegalOfficerCase, addCollectionItem, getCollectionItem } from "@logion/node-api/dist/LogionLoc";
import { AxiosInstance } from 'axios';
import { requireDefined } from "./assertions";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, aggregateArrays } from "./Http";
import { Signer, SignCallback } from "./Signer";

export interface AddedOn {
    addedOn: string;
}

export interface Published {
    published: boolean;
}

/**
 * Blockchain File, extended with private attributes and timestamp.
 */
export interface LocFile extends BlockchainFile, Partial<AddedOn> {
    name: string;
}

/**
 * Blockchain MetadataItem, extended with timestamp.
 */
export interface LocMetadataItem extends MetadataItem, Partial<AddedOn> {
}

/**
 * Blockchain MetadataItem, extended with timestamp.
 */
export interface LocLink extends Link, AddedOn {
    target: string; // is redundant with inherited "id: UUID"
}

export interface LocCollectionItem extends AddedOn {
    itemId: string,
}

export interface LocRequestVoidInfo {
    reason?: string; // undefined in public view
    voidedOn?: string;
}

export interface LocRequest {
    ownerAddress: string;
    requesterAddress?: string | null;
    requesterIdentityLoc?: string | null;
    description: string;
    locType: LocType;
    createdOn: string;
    decisionOn?: string;
    id: string;
    status: LocRequestStatus;
    rejectReason?: string;
    userIdentity?: UserIdentity;
    closedOn?: string;
    files: LocFile[];
    metadata: LocMetadataItem[];
    links: LocLink[];
}

export type LocRequestStatus = "OPEN" | "REQUESTED" | "REJECTED" | "CLOSED";

export interface FetchParameters {
    locId: UUID,
}

export interface AddMetadataParams {
    name: string,
    value: string,
}

export interface DeleteMetadataParams {
    name: string,
}

export interface AddFileParams {
    file: File,
    fileName: string,
    nature: string,
}

export interface DeleteFileParams {
    hash: string
}

export interface AddFileResult {
    hash: string
}

export interface AddCollectionItemParams {
    itemId: string,
    itemDescription: string,
    signer: Signer,
    callback?: SignCallback,
}

export interface FetchLocRequestSpecification {
    requesterAddress?: string,
    statuses: LocRequestStatus[],
    locTypes: LocType[],
}

interface CreateLocRequest {
    ownerAddress: string;
    requesterAddress: string;
    description: string;
    locType: LocType;
    userIdentity?: UserIdentity;
}

interface CreateSofRequest {
    itemId?: string;
}

export class LocMultiClient {

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        nodeApi: LogionNodeApi,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;

    private readonly axiosFactory: AxiosFactory;

    private readonly currentAddress: string;

    private readonly token: string;

    private readonly nodeApi: LogionNodeApi;

    newLocClient(legalOfficer: LegalOfficer) {
        return new LocClient({
            axiosFactory: this.axiosFactory,
            currentAddress: this.currentAddress,
            token: this.token,
            nodeApi: this.nodeApi,
            legalOfficer,
            multiClient: this,
        })
    }

    async fetchAll(legalOfficers?: LegalOfficer[]): Promise<LocRequest[]> {
        let initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers)

        const httpClient = new MultiSourceHttpClient<LegalOfficerEndpoint, LocRequest[]>(
            initialState,
            this.axiosFactory,
            this.token
        );

        const multiResponse = await httpClient.fetch(async (axios, _) => {
            const specs: FetchLocRequestSpecification = {
                requesterAddress: this.currentAddress,
                locTypes: [ "Transaction", "Collection" ],
                statuses: [ "OPEN", "REQUESTED", "REJECTED", "CLOSED" ]
            }
            const response = await axios.put("/api/loc-request", specs);
            return response.data.requests;
        });

        return aggregateArrays(multiResponse);
    }

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        const { locId } = parameters;
        return requireDefined(
            await getLegalOfficerCase({ locId, api: this.nodeApi }),
            () => new Error(`LOC not found on chain: ${ locId.toDecimalString() }`)
        );
    }
}

export class LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        nodeApi: LogionNodeApi,
        legalOfficer: LegalOfficer,
        multiClient: LocMultiClient,
    }) {
        this.axiosFactory = params.axiosFactory;
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
        this.legalOfficer = params.legalOfficer;
        this.multiClient = params.multiClient;
    }

    private readonly axiosFactory: AxiosFactory;
    private readonly currentAddress: string;
    private readonly token: string;
    private readonly nodeApi: LogionNodeApi;
    private readonly legalOfficer: LegalOfficer;
    private readonly multiClient: LocMultiClient;

    async createLocRequest(request: CreateLocRequest): Promise<LocRequest> {
        const response = await this.backend().post(`/api/loc-request`, request);
        return response.data;
    }

    async createSofRequest(request: CreateSofRequest & FetchParameters): Promise<LocRequest> {
        const response = await this.backend().post(`/api/loc-request/sof`, request);
        return response.data;
    }

    async getLocRequest(parameters: FetchParameters): Promise<LocRequest> {
        const { locId } = parameters;
        const response = await this.backend().get(`/api/loc-request/${ locId.toString() }`);
        return response.data;
    }

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        return this.multiClient.getLoc(parameters);
    }

    async addMetadata(parameters: AddMetadataParams & FetchParameters): Promise<void> {
        const { name, value, locId } = parameters;
        await this.backend().post(`/api/loc-request/${ locId.toString() }/metadata`, { name, value })
    }

    async deleteMetadata(parameters: DeleteMetadataParams & FetchParameters): Promise<void> {
        const { name, locId } = parameters;
        await this.backend().delete(`/api/loc-request/${ locId.toString() }/metadata/${ encodeURIComponent(name) }`)
    }

    async addFile(parameters: AddFileParams & FetchParameters): Promise<AddFileResult> {
        const { file, fileName, nature, locId } = parameters
        const formData = new FormData();
        formData.append('file', file, fileName);
        formData.append('nature', nature);
        const response = await this.backend().post(
            `/api/loc-request/${ locId.toString() }/files`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } })
        return response.data;
    }

    async deleteFile(parameters: DeleteFileParams & FetchParameters): Promise<void> {
        const { hash, locId } = parameters;
        await this.backend().delete(`/api/loc-request/${ locId.toString() }/files/${ hash }`)
    }

    private backend(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.legalOfficer.node, this.token);
    }

    async addCollectionItem(parameters: AddCollectionItemParams & FetchParameters): Promise<void> {
        const { itemId, itemDescription, signer, callback, locId } = parameters;
        const submittable = addCollectionItem({
            api: this.nodeApi,
            collectionId: locId,
            itemId,
            itemDescription
        });
        await signer.signAndSend({
            signerId: this.currentAddress,
            submittable,
            callback
        })
    }

    async getCollectionItem(parameters: { itemId: string } & FetchParameters): Promise<CollectionItem | undefined> {
        const { locId, itemId } = parameters;
        return await getCollectionItem({
            api: this.nodeApi,
            locId,
            itemId
        });
    }
}

