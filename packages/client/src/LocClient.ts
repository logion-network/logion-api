import {
    LogionNodeApi,
    UUID,
    File as BlockchainFile,
    MetadataItem,
    Link,
    LocType,
    LegalOfficerCase,
    ItemFile,
    getLegalOfficerCase,
    addCollectionItem,
    getCollectionItem,
    getCollectionSize,
    GetLegalOfficerCaseParameters,
    getCollectionItems,
    CollectionItem,
} from '@logion/node-api';
import { AxiosInstance } from 'axios';

import { UserIdentity, LegalOfficer, PostalAddress } from "./Types";
import { NetworkState } from "./NetworkState";
import { authenticatedCurrentAddress, LegalOfficerEndpoint, SharedState } from "./SharedClient";
import { AxiosFactory } from "./AxiosFactory";
import { requireDefined } from "./assertions";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, aggregateArrays } from "./Http";
import { Signer, SignCallback } from "./Signer";
import { ComponentFactory, FileLike } from './ComponentFactory';
import { newBackendError } from './Error';
import { HashOrContent } from './Hash';
import { MimeType } from './Mime';
import { validateToken, ItemTokenWithRestrictedType, TokenType } from './Token';
import { TermsAndConditionsElement, newTermsAndConditions, LogionClassification, SpecificLicense } from "./license";

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
    identityLoc?: string;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    closedOn?: string;
    files: LocFile[];
    metadata: LocMetadataItem[];
    links: LocLink[];
    voidInfo?: LocRequestVoidInfo;
    seal?: string;
    company?: string;
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
    file: FileLike,
    fileName: string,
    nature: string,
}

export interface DeleteFileParams {
    hash: string
}

export interface AddFileResult {
    hash: string
}

export class ItemFileWithContent {

    constructor(parameters: {
        name: string;
        contentType: MimeType;
        size?: bigint;
        hashOrContent: HashOrContent;
    }) {
        this._name = parameters.name;
        this._contentType = parameters.contentType;
        this._hashOrContent = parameters.hashOrContent;
        this._size = parameters.size;

        if(!this._size && !this._hashOrContent.hasContent) {
            throw new Error("File size must be provided if no content is");
        }
    }

    private _name: string;
    private _contentType: MimeType;
    private _size?: bigint;
    private _hashOrContent: HashOrContent;

    async finalize() {
        await this._hashOrContent.finalize();
        if(this._hashOrContent.hasContent) {
            const contentSize = this._hashOrContent.size;
            if(!this._size) {
                this._size = contentSize;
            } else if(this._size !== contentSize) {
                throw new Error(`Given size does not match content: got ${this._size}, should be ${contentSize}`);
            }
        }
    }

    get name() {
        return this._name;
    }

    get contentType() {
        return this._contentType;
    }

    get size() {
        if(!this._size) {
            throw new Error("Call finalize() first");
        }
        return this._size;
    }

    get hashOrContent() {
        return this._hashOrContent;
    }
}

export interface AddCollectionItemParams {
    itemId: string,
    itemDescription: string,
    itemFiles?: ItemFileWithContent[],
    itemToken?: ItemTokenWithRestrictedType,
    restrictedDelivery?: boolean,
    logionClassification?: LogionClassification,
    specificLicenses?: SpecificLicense[],
    signer: Signer,
    callback?: SignCallback,
}

export interface FetchLocRequestSpecification {
    requesterAddress?: string,
    statuses: LocRequestStatus[],
    locTypes: LocType[],
}

export interface CreateLocRequest {
    ownerAddress: string;
    requesterAddress: string;
    description: string;
    locType: LocType;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
}

export interface CreateSofRequest {
    itemId?: string;
}

export interface GetDeliveriesRequest {
    locId: UUID;
    itemId: string;
}

export class LocMultiClient {

    static newLocMultiClient(sharedState: SharedState): LocMultiClient {
        const { currentAddress, token } = authenticatedCurrentAddress(sharedState);
        return new LocMultiClient({
            axiosFactory: sharedState.axiosFactory,
            currentAddress,
            networkState: sharedState.networkState,
            token: token.value,
            nodeApi: sharedState.nodeApi,
            componentFactory: sharedState.componentFactory,
        });
    }

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        nodeApi: LogionNodeApi,
        componentFactory: ComponentFactory,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
        this.componentFactory = params.componentFactory;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;

    private readonly axiosFactory: AxiosFactory;

    private readonly currentAddress: string;

    private readonly token: string;

    private readonly nodeApi: LogionNodeApi;

    private readonly componentFactory: ComponentFactory;

    newLocClient(legalOfficer: LegalOfficer) {
        return new AuthenticatedLocClient({
            axiosFactory: this.axiosFactory,
            currentAddress: this.currentAddress,
            token: this.token,
            nodeApi: this.nodeApi,
            legalOfficer,
            multiClient: this,
            componentFactory: this.componentFactory,
        })
    }

    async fetchAll(legalOfficers?: LegalOfficer[]): Promise<LocRequest[]> {
        const initialState = initMultiSourceHttpClientState(this.networkState, legalOfficers);

        const httpClient = new MultiSourceHttpClient<LegalOfficerEndpoint, LocRequest[]>(
            initialState,
            this.axiosFactory,
            this.token
        );

        const multiResponse = await httpClient.fetch(async axios => {
            const specs: FetchLocRequestSpecification = {
                requesterAddress: this.currentAddress,
                locTypes: [ "Transaction", "Collection", "Identity" ],
                statuses: [ "OPEN", "REQUESTED", "REJECTED", "CLOSED" ]
            }
            const response = await axios.put("/api/loc-request", specs);
            return response.data.requests;
        });

        return aggregateArrays(multiResponse);
    }

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        return LocMultiClient.getLoc({
            ...parameters,
            api: this.nodeApi,
        });
    }

    static async getLoc(params: GetLegalOfficerCaseParameters): Promise<LegalOfficerCase> {
        return requireDefined(
            await getLegalOfficerCase(params),
            () => new Error(`LOC not found on chain: ${ params.locId.toDecimalString() }`)
        );
    }
}

export interface UploadableCollectionItem {
    id: string;
    description: string;
    addedOn: string;
    files: UploadableItemFile[];
    token?: ItemTokenWithRestrictedType,
    restrictedDelivery: boolean;
    termsAndConditions: TermsAndConditionsElement[],
}

export interface UploadableItemFile extends ItemFile {
    uploaded: boolean;
}

export interface OffchainCollectionItem {
    collectionLocId: string;
    itemId: string;
    addedOn: string;
    files: string[];
}

export interface FetchParameters {
    locId: UUID,
}

export interface ItemDeliveries {
    [key: string]: ItemDelivery[];
}

export interface ItemDelivery {
    copyHash: string;
    generatedOn: string;
    owner: string;
    belongsToCurrentOwner: boolean;
}

export abstract class LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        nodeApi: LogionNodeApi,
        legalOfficer: LegalOfficer,
    }) {
        this.axiosFactory = params.axiosFactory;
        this.nodeApi = params.nodeApi;
        this.legalOfficer = params.legalOfficer;
    }

    protected readonly axiosFactory: AxiosFactory;
    protected readonly nodeApi: LogionNodeApi;
    protected readonly legalOfficer: LegalOfficer;

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        return LocMultiClient.getLoc({ ...parameters, api: this.nodeApi });
    }

    protected backend(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.legalOfficer.node);
    }

    async getCollectionItem(parameters: { itemId: string } & FetchParameters): Promise<UploadableCollectionItem | undefined> {
        const { locId, itemId } = parameters;
        const onchainItem = await getCollectionItem({
            api: this.nodeApi,
            locId,
            itemId
        });
        if(!onchainItem) {
            return undefined;
        }
        try {
            const offchainItem = await this.getOffchainItem({ locId, itemId });
            return this.mergeItems(onchainItem, offchainItem);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async getOffchainItem(parameters: { locId: UUID, itemId: string }): Promise<OffchainCollectionItem> {
        const { locId, itemId } = parameters;
        const response = await this.backend().get(`/api/collection/${ locId.toString() }/${ itemId }`);
        return response.data;
    }

    private mergeItems(onchainItem: CollectionItem, offchainItem: OffchainCollectionItem): UploadableCollectionItem {
        return {
            id: onchainItem.id,
            description: onchainItem.description,
            addedOn: offchainItem.addedOn,
            files: onchainItem.files.map(file => ({
                ...file,
                uploaded: offchainItem.files.includes(file.hash),
            })),
            token: onchainItem.token ? {
                type: onchainItem.token.type as TokenType,
                id: onchainItem.token.id,
            } : undefined,
            restrictedDelivery: onchainItem.restrictedDelivery,
            termsAndConditions: newTermsAndConditions(onchainItem.termsAndConditions),
        }
    }

    async getCollectionItems(parameters: FetchParameters): Promise<UploadableCollectionItem[]> {
        const { locId } = parameters;
        const onchainItems = await getCollectionItems({
            api: this.nodeApi,
            locId,
        });

        const onchainItemsMap: Record<string, CollectionItem> = {};
        for(const item of onchainItems) {
            onchainItemsMap[item.id] = item;
        }

        try {
            const offchainItems = await this.getOffchainItems({ locId });

            const offchainItemsMap: Record<string, OffchainCollectionItem> = {};
            for(const item of offchainItems) {
                offchainItemsMap[item.itemId] = item;
            }

            return offchainItems.map(item => this.mergeItems(onchainItemsMap[item.itemId], offchainItemsMap[item.itemId]));
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async getOffchainItems(parameters: { locId: UUID }): Promise<OffchainCollectionItem[]> {
        const { locId } = parameters;
        const response = await this.backend().get(`/api/collection/${ locId.toString() }`);
        return response.data.items;
    }

    async getCollectionSize(parameters: FetchParameters): Promise<number | undefined> {
        const { locId } = parameters;
        return await getCollectionSize({
            api: this.nodeApi,
            locId,
        });
    }

    abstract getLocRequest(parameters: FetchParameters): Promise<LocRequest>;

    abstract getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries>;
}

export class PublicLocClient extends LocClient {

    override async getLocRequest(parameters: FetchParameters): Promise<LocRequest> {
        const { locId } = parameters;
        const response = await this.backend().get(`/api/loc-request/${ locId.toString() }/public`);
        return response.data;
    }

    override async getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries> {
        const { locId, itemId } = parameters;
        const response = await this.backend().get(`/api/collection/${ locId }/${ itemId }/latest-deliveries`);
        return response.data;
    }
}

export class AuthenticatedLocClient extends LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        currentAddress: string,
        token: string,
        nodeApi: LogionNodeApi,
        legalOfficer: LegalOfficer,
        multiClient: LocMultiClient,
        componentFactory: ComponentFactory,
    }) {
        super({
            axiosFactory: params.axiosFactory,
            legalOfficer: params.legalOfficer,
            nodeApi: params.nodeApi,
        });
        this.currentAddress = params.currentAddress;
        this.token = params.token;
        this.multiClient = params.multiClient;
        this.componentFactory = params.componentFactory;
    }

    private readonly currentAddress: string;
    private readonly token: string;
    private readonly multiClient: LocMultiClient;
    private readonly componentFactory: ComponentFactory;

    async createLocRequest(request: CreateLocRequest): Promise<LocRequest> {
        const response = await this.backend().post(`/api/loc-request`, request);
        return response.data;
    }

    async createSofRequest(request: CreateSofRequest & FetchParameters): Promise<LocRequest> {
        const { locId, itemId } = request;
        const response = await this.backend().post(`/api/loc-request/sof`, {
            locId: locId.toString(),
            itemId
        });
        return response.data;
    }

    override async getLocRequest(parameters: FetchParameters): Promise<LocRequest> {
        const { locId } = parameters;
        const response = await this.backend().get(`/api/loc-request/${ locId.toString() }`);
        return response.data;
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
        const formData = this.componentFactory.buildFormData();
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

    override backend(): AxiosInstance {
        return this.axiosFactory.buildAxiosInstance(this.legalOfficer.node, this.token);
    }

    async addCollectionItem(parameters: AddCollectionItemParams & FetchParameters): Promise<void> {
        const { itemId, itemDescription, signer, callback, locId, itemFiles, itemToken, restrictedDelivery } = parameters;

        const booleanRestrictedDelivery = restrictedDelivery !== undefined ? restrictedDelivery : false;

        const chainItemFiles: ItemFile[] = [];
        if(itemFiles) {
            for(const itemFile of itemFiles) {
                await itemFile.finalize(); // Ensure hash and size
            }
            for(const itemFile of itemFiles) {
                chainItemFiles.push({
                    name: itemFile.name,
                    contentType: itemFile.contentType.mimeType,
                    hash: itemFile.hashOrContent.contentHash,
                    size: itemFile.size,
                });
            }
        }

        if(booleanRestrictedDelivery
            && (chainItemFiles.length === 0 || !itemToken)) {
            throw new Error("Restricted delivery requires a defined underlying token as well as at least one file");
        }

        if(itemToken) {
            this.validTokenOrThrow(itemToken);
        }

        const termsAndConditions = [];

        if(parameters.logionClassification) {
            termsAndConditions.push({
                tcType: parameters.logionClassification.type,
                tcLocId: parameters.logionClassification.tcLocId,
                details: parameters.logionClassification.details,
            })
        }

        if(parameters.specificLicenses) {
            parameters.specificLicenses.forEach(element => termsAndConditions.push({
                tcType: element.type,
                tcLocId: element.tcLocId,
                details: element.details,
            }));
        }

        const submittable = addCollectionItem({
            api: this.nodeApi,
            collectionId: locId,
            itemId,
            itemDescription,
            itemFiles: chainItemFiles,
            itemToken,
            restrictedDelivery: booleanRestrictedDelivery,
            termsAndConditions,
        });
        await signer.signAndSend({
            signerId: this.currentAddress,
            submittable,
            callback
        });

        if(itemFiles) {
            for(const file of itemFiles) {
                if(file.hashOrContent.hasContent) {
                    await this.uploadItemFile({ locId, itemId, file });
                }
            }
        }
    }

    async uploadItemFile(parameters: { locId: UUID, itemId: string, file: ItemFileWithContent }) {
        const { locId, itemId, file } = parameters;

        await file.hashOrContent.finalize(); // Ensure validity

        const formData = this.componentFactory.buildFormData();
        formData.append('file', file.hashOrContent.content, file.name);
        try {
            await this.backend().post(
                `/api/collection/${ locId.toString() }/${ itemId }/files`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private validTokenOrThrow(itemToken: ItemTokenWithRestrictedType) {
        const result = validateToken(itemToken);
        if(!result.valid) {
            if(result.error) {
                throw new Error("Given token definition is invalid");
            } else {
                throw new Error(`Given token definition is invalid: ${result.error}`);
            }
        }
    }

    override async getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries> {
        const { locId, itemId } = parameters;
        const response = await this.backend().get(`/api/collection/${ locId }/${ itemId }/all-deliveries`);
        return response.data;
    }
}
