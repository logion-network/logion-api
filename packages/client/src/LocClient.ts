import {
    LogionNodeApiClass,
    UUID,
    Link,
    LocType,
    LegalOfficerCase,
    ItemFile,
    CollectionItem,
    TermsAndConditionsElement as ChainTermsAndConditionsElement,
    ValidAccountId,
    AccountType,
    LocBatch,
    Adapters,
    TypesTokensRecord,
    TypesTokensRecordFile
} from '@logion/node-api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { AxiosInstance } from 'axios';

import { UserIdentity, LegalOfficer, PostalAddress, LegalOfficerClass } from "./Types.js";
import { NetworkState } from "./NetworkState.js";
import { authenticatedCurrentAddress, LegalOfficerEndpoint, SharedState } from "./SharedClient.js";
import { AxiosFactory } from "./AxiosFactory.js";
import { requireDefined } from "./assertions.js";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, aggregateArrays, Token } from "./Http.js";
import { Signer, SignCallback } from "./Signer.js";
import { ComponentFactory } from "./ComponentFactory.js";
import { newBackendError } from "./Error.js";
import { HashOrContent } from "./Hash.js";
import { MimeType } from "./Mime.js";
import { validateToken, ItemTokenWithRestrictedType, TokenType } from "./Token.js";
import { TermsAndConditionsElement, newTermsAndConditions, LogionClassification, SpecificLicense, CreativeCommons } from "./license/index.js";
import { CollectionDelivery, ItemDeliveries } from './Deliveries.js';
import { Fees } from './Fees.js';

export interface AddedOn {
    addedOn: string;
}

export interface Published {
    published: boolean;
}

export interface SupportedAccountId {
    type: AccountType;
    address: string;
}

export interface FileInfo extends Partial<AddedOn> {
    hash: string;
    nature: string;
    submitter: SupportedAccountId;
    name: string;
    restrictedDelivery: boolean;
    contentType: string;
    fees?: Fees;
    storageFeePaidBy?: string;
}

/**
 * LOC File.
 */
export interface LocFile extends FileInfo {
    size: string;
}

/**
 * Blockchain MetadataItem, extended with timestamp.
 */
export interface LocMetadataItem extends Partial<AddedOn> {
    name: string;
    value: string;
    submitter: SupportedAccountId;
    fees?: Fees;
}

/**
 * Blockchain MetadataItem, extended with timestamp.
 */
export interface LocLink extends Link, AddedOn {
    target: string; // is redundant with inherited "id: UUID"
    fees?: Fees;
}

export interface LocCollectionItem extends AddedOn {
    itemId: string,
}

export interface LocRequestVoidInfo {
    reason?: string; // undefined in public view
    voidedOn?: string;
}

export interface VerifiedThirdParty {
    firstName: string;
    lastName: string;
    identityLocId: string;
    address: string;
    selected?: boolean;
}

export interface LocVerifiedIssuers {
    verifiedThirdParty: boolean;
    issuers: VerifiedThirdParty[];
}

export interface LocRequest {
    ownerAddress: string;
    requesterAddress?: SupportedAccountId;
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
    iDenfy?: IdenfyVerificationSession;
    voteId?: string | null;
    selectedIssuers: VerifiedIssuerIdentity[];
    template?: string;
    sponsorshipId?: string;
}

export interface IdenfyVerificationSession {
    status: IdenfySessionStatus;
    redirectUrl?: string;
}

export type IdenfySessionStatus = "APPROVED" | "DENIED" | "SUSPECTED" | "EXPIRED" | "PENDING";

export type LocRequestStatus = "DRAFT" | "OPEN" | "REQUESTED" | "REJECTED" | "CLOSED";

export interface FetchParameters {
    locId: UUID,
}

export interface HasJwtToken {
    jwtToken?: Token
}

export interface GetTokensRecordsRequest extends FetchParameters, HasJwtToken {
}

export interface AddMetadataParams {
    name: string,
    value: string,
}

export interface DeleteMetadataParams {
    name: string,
}

export interface AddFileParams {
    file: HashOrContent,
    fileName: string,
    nature: string,
}

export interface DeleteFileParams {
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

        if (!this._size && !this._hashOrContent.hasContent) {
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
    creativeCommons?: CreativeCommons,
    signer: Signer,
    callback?: SignCallback,
}

export interface FetchLocRequestSpecification {
    ownerAddress?: string;
    requesterAddress?: string,
    statuses: LocRequestStatus[],
    locTypes: LocType[],
}

export interface CreateLocRequest {
    ownerAddress: string;
    description: string;
    locType: LocType;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
    draft: boolean;
    template?: string;
    sponsorshipId?: string;
}

export interface CreateSofRequest {
    itemId?: string;
}

export interface GetDeliveriesRequest {
    locId: UUID;
    itemId: string;
}

export interface CheckCollectionDeliveryRequest {
    locId: UUID;
    hash: string;
}

export interface FetchAllLocsParams {
    legalOfficers?: LegalOfficer[];
    spec?: FetchLocRequestSpecification;
}

export interface VerifiedIssuerIdentity {
    address: string;
    identity: UserIdentity;
    identityLocId: string;
    selected?: boolean;
}

export interface AddTokensRecordParams {
    recordId: string,
    description: string,
    files: ItemFileWithContent[],
    signer: Signer,
    callback?: SignCallback,
}

export interface GetTokensRecordDeliveriesRequest {
    locId: UUID;
    recordId: string;
}

export interface CheckTokensRecordDeliveryRequest {
    locId: UUID;
    recordId: string;
    hash: string;
}

export class LocMultiClient {

    static newLocMultiClient(sharedState: SharedState): LocMultiClient {
        const { currentAddress, token } = authenticatedCurrentAddress(sharedState);
        return new LocMultiClient({
            axiosFactory: sharedState.axiosFactory,
            currentAddress: currentAddress,
            networkState: sharedState.networkState,
            token: token.value,
            nodeApi: sharedState.nodeApi,
            componentFactory: sharedState.componentFactory,
        });
    }

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAddress: ValidAccountId,
        token: string,
        nodeApi: LogionNodeApiClass,
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

    private readonly currentAddress: ValidAccountId;

    private readonly token: string;

    private readonly nodeApi: LogionNodeApiClass;

    private readonly componentFactory: ComponentFactory;

    newLocClient(legalOfficer: LegalOfficerClass) {
        return new AuthenticatedLocClient({
            axiosFactory: this.axiosFactory,
            currentAddress: this.currentAddress,
            nodeApi: this.nodeApi,
            legalOfficer,
            componentFactory: this.componentFactory,
        });
    }

    async fetchAll(params?: FetchAllLocsParams): Promise<LocRequest[]> {
        const initialState = initMultiSourceHttpClientState(this.networkState, params?.legalOfficers);

        const httpClient = new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.axiosFactory,
            this.token
        );

        const defaultSpec: FetchLocRequestSpecification = {
            requesterAddress: this.currentAddress.address,
            locTypes: [ "Transaction", "Collection", "Identity" ],
            statuses: [ "OPEN", "REQUESTED", "REJECTED", "CLOSED", "DRAFT" ]
        };

        const multiResponse = await httpClient.fetch(async axios => {
            const specs: FetchLocRequestSpecification = params?.spec ? params?.spec : defaultSpec;
            const response = await axios.put("/api/loc-request", specs);
            return response.data.requests;
        });

        return aggregateArrays(multiResponse);
    }

    async fetchAllForVerifiedThirdParty(legalOfficers: LegalOfficerClass[]): Promise<LocRequest[]> {
        if (this.currentAddress.type !== "Polkadot") {
            return [];
        }
        const entries = await this.nodeApi.polkadot.query.logionLoc.locsByVerifiedIssuerMap.entries(this.currentAddress.address);
        const requests: LocRequest[] = [];
        for(const entry of entries) {
            const owner = entry[0].args[1].toString();
            const locId = UUID.fromDecimalStringOrThrow(entry[0].args[2].toString());
            const legalOfficer = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.address === owner));
            const request = await this.newLocClient(legalOfficer).getLocRequest({ locId });
            requests.push(request);
        }
        return requests;
    }

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        return LocMultiClient.getLoc({
            ...parameters,
            api: this.nodeApi,
        });
    }

    static async getLoc(params: { api: LogionNodeApiClass, locId: UUID }): Promise<LegalOfficerCase> {
        return requireDefined(
            await params.api.queries.getLegalOfficerCase(params.locId),
            () => new Error(`LOC not found on chain: ${ params.locId.toDecimalString() }`)
        );
    }

    static async getLocBatch(params: { api: LogionNodeApiClass, locIds: UUID[] }): Promise<LocBatch> {
        const { api, locIds } = params;
        return api.batch.locs(locIds);
    }

    async getLocBatch(locIds: UUID[]): Promise<LocBatch> {
        return LocMultiClient.getLocBatch({ api: this.nodeApi, locIds });
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

export interface ClientTokensRecord {
    id: string;
    description: string;
    addedOn: string;
    files: UploadableItemFile[];
    issuer: string;
}

export interface OffchainTokensRecord {
    collectionLocId: string;
    recordId: string;
    addedOn: string;
    files: string[];
}

export abstract class LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        nodeApi: LogionNodeApiClass,
        legalOfficer: LegalOfficerClass,
    }) {
        this.axiosFactory = params.axiosFactory;
        this.nodeApi = params.nodeApi;
        this.legalOfficer = params.legalOfficer;
    }

    protected readonly axiosFactory: AxiosFactory;
    protected readonly nodeApi: LogionNodeApiClass;
    protected readonly legalOfficer: LegalOfficerClass;

    async getLoc(parameters: FetchParameters): Promise<LegalOfficerCase> {
        return LocMultiClient.getLoc({ ...parameters, api: this.nodeApi });
    }

    backend(): AxiosInstance {
        return this.legalOfficer.buildAxiosToNode();
    }

    async getCollectionItem(parameters: { itemId: string } & FetchParameters): Promise<UploadableCollectionItem | undefined> {
        const { locId, itemId } = parameters;
        const onchainItem = await this.nodeApi.queries.getCollectionItem(locId, itemId);
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
        const response = await this.backend().get(`/api/collection/${ locId.toString() }/items/${ itemId }`);
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
        const onchainItems = await this.nodeApi.queries.getCollectionItems(locId);

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
        return await this.nodeApi.queries.getCollectionSize(locId);
    }

    async getTokensRecord(parameters: { recordId: string } & FetchParameters): Promise<ClientTokensRecord | undefined> {
        const { locId, recordId } = parameters;
        const onchainRecord = await this.nodeApi.polkadot.query.logionLoc.tokensRecordsMap(locId.toDecimalString(), recordId);
        if(onchainRecord.isNone) {
            return undefined;
        }
        try {
            const offchainRecord = await this.getOffchainRecord({ locId, recordId });
            return this.mergeRecords(Adapters.toTokensRecord(onchainRecord.unwrap()), offchainRecord);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async getOffchainRecord(parameters: { locId: UUID, recordId: string }): Promise<OffchainTokensRecord> {
        const { locId, recordId } = parameters;
        const response = await this.backend().get(`/api/records/${ locId.toString() }/record/${ recordId }`);
        return response.data;
    }

    private mergeRecords(onchainItem: TypesTokensRecord, offchainItem: OffchainTokensRecord): ClientTokensRecord {
        return {
            id: offchainItem.recordId,
            description: onchainItem.description,
            addedOn: offchainItem.addedOn,
            issuer: onchainItem.submitter,
            files: onchainItem.files.map(file => ({
                ...file,
                size: BigInt(file.size),
                uploaded: offchainItem.files.includes(file.hash),
            })),
        }
    }

    async getTokensRecords(parameters: GetTokensRecordsRequest): Promise<ClientTokensRecord[]> {
        const { locId } = parameters;
        const onchainRecords = await this.nodeApi.polkadot.query.logionLoc.tokensRecordsMap.entries(locId.toDecimalString());

        const onchainRecordsMap: Record<string, TypesTokensRecord> = {};
        for(const entry of onchainRecords) {
            onchainRecordsMap[entry[0].args[1].toHex()] = Adapters.toTokensRecord(entry[1].unwrap());
        }

        try {
            const offchainTokenRecords = await this.getOffchainTokensRecords(parameters);

            const offchainRecordsMap: Record<string, OffchainTokensRecord> = {};
            for(const item of offchainTokenRecords) {
                offchainRecordsMap[item.recordId] = item;
            }

            return offchainTokenRecords.map(item => this.mergeRecords(onchainRecordsMap[item.recordId], offchainRecordsMap[item.recordId]));
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async getOffchainTokensRecords(parameters: GetTokensRecordsRequest): Promise<OffchainTokensRecord[]> {
        const { locId, jwtToken } = parameters;
        const axios = jwtToken !== undefined ?
            this.axiosFactory.buildAxiosInstance(this.legalOfficer.node, jwtToken.value) :
            this.backend();
        const response = await axios.get(`/api/records/${ locId.toString() }`);
        return response.data.records;
    }

    abstract getLocRequest(parameters: FetchParameters): Promise<LocRequest>;

    abstract getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries>;

    abstract checkDelivery(parameters: CheckCollectionDeliveryRequest): Promise<CollectionDelivery>;

    abstract getTokensRecordDeliveries(parameters: GetTokensRecordDeliveriesRequest): Promise<ItemDeliveries>;

    abstract checkTokensRecordDelivery(parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery>;
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

    override async checkDelivery(parameters: CheckCollectionDeliveryRequest): Promise<CollectionDelivery> {
        const { locId, hash } = parameters;
        const response = await this.backend().put(`/api/collection/${ locId }/file-deliveries`, { copyHash: hash });
        return response.data;
    }

    override async getTokensRecordDeliveries(parameters: GetTokensRecordDeliveriesRequest): Promise<ItemDeliveries> {
        return getTokensRecordDeliveries(this.backend(), parameters);
    }

    override async checkTokensRecordDelivery(parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery> {
        return checkTokensRecordDelivery(this.backend(), parameters);
    }
}

async function getTokensRecordDeliveries(axios: AxiosInstance, parameters: GetTokensRecordDeliveriesRequest): Promise<ItemDeliveries> {
    const { locId, recordId } = parameters;
    const response = await axios.get(`/api/records/${ locId }/${ recordId }/deliveries`);
    return response.data;
}

async function checkTokensRecordDelivery(axios: AxiosInstance, parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery> {
    try {
        const { locId, recordId, hash } = parameters;
        const response = await axios.put(`/api/records/${ locId }/${ recordId }/deliveries/check`, { copyHash: hash });
        return response.data;
    } catch(e) {
        throw newBackendError(e);
    }
}

export class AuthenticatedLocClient extends LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        currentAddress: ValidAccountId,
        nodeApi: LogionNodeApiClass,
        legalOfficer: LegalOfficerClass,
        componentFactory: ComponentFactory,
    }) {
        super({
            axiosFactory: params.axiosFactory,
            legalOfficer: params.legalOfficer,
            nodeApi: params.nodeApi,
        });
        this.currentAddress = params.currentAddress;
        this.componentFactory = params.componentFactory;
    }

    private readonly currentAddress: ValidAccountId;
    private readonly componentFactory: ComponentFactory;

    async createLocRequest(request: CreateLocRequest): Promise<LocRequest> {
        try {
            const response = await this.backend().post(`/api/loc-request`, request);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
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
        try {
            const { locId } = parameters;
            const response = await this.backend().get(`/api/loc-request/${ locId.toString() }`);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addMetadata(parameters: AddMetadataParams & FetchParameters): Promise<void> {
        try {
            const { name, value, locId } = parameters;
            await this.backend().post(`/api/loc-request/${ locId.toString() }/metadata`, { name, value });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async deleteMetadata(parameters: DeleteMetadataParams & FetchParameters): Promise<void> {
        try {
            const { name, locId } = parameters;
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/metadata/${ encodeURIComponent(name) }`)
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addFile(parameters: AddFileParams & FetchParameters): Promise<void> {
        const { file, fileName, nature, locId } = parameters;

        await file.finalize();

        const formData = this.componentFactory.buildFormData();
        formData.append('file', await file.data(), fileName);
        formData.append('nature', nature);
        formData.append('hash', file.contentHash);

        try {
            await this.backend().post(
                `/api/loc-request/${ locId.toString() }/files`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async deleteFile(parameters: DeleteFileParams & FetchParameters): Promise<void> {
        try {
            const { hash, locId } = parameters;
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/files/${ hash }`)
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addCollectionItem(parameters: AddCollectionItemParams & FetchParameters): Promise<void> {
        const {
            itemId,
            itemDescription,
            signer,
            callback,
            locId,
            itemFiles,
            itemToken,
            restrictedDelivery
        } = parameters;

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

        const termsAndConditions: ChainTermsAndConditionsElement[] = [];

        const addTC = (tc: TermsAndConditionsElement) => {
            termsAndConditions.push({
                tcType: tc.type,
                tcLocId: tc.tcLocId,
                details: tc.details,
            })
        };

        if (parameters.logionClassification && parameters.creativeCommons) {
            throw new Error("Logion Classification and Creative Commons are mutually exclusive.");
        } else if(parameters.logionClassification) {
            addTC(parameters.logionClassification);
        } else if (parameters.creativeCommons) {
            addTC(parameters.creativeCommons);
        }

        if(parameters.specificLicenses) {
            parameters.specificLicenses.forEach(addTC);
        }

        let submittable: SubmittableExtrinsic;
        if(termsAndConditions.length === 0) {
            submittable = this.nodeApi.polkadot.tx.logionLoc.addCollectionItem(
                this.nodeApi.adapters.toLocId(locId),
                itemId,
                itemDescription,
                chainItemFiles.map(Adapters.toCollectionItemFile),
                Adapters.toCollectionItemToken(itemToken),
                booleanRestrictedDelivery,
            );
        } else {
            submittable = this.nodeApi.polkadot.tx.logionLoc.addCollectionItemWithTermsAndConditions(
                this.nodeApi.adapters.toLocId(locId),
                itemId,
                itemDescription,
                chainItemFiles.map(Adapters.toCollectionItemFile),
                Adapters.toCollectionItemToken(itemToken),
                booleanRestrictedDelivery,
                termsAndConditions.map(Adapters.toTermsAndConditionsElement),
            );
        }
        await signer.signAndSend({
            signerId: this.currentAddress.address,
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
        formData.append('file', await file.hashOrContent.data(), file.name);
        formData.append('hash', file.hashOrContent.contentHash);
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
        const result = validateToken(this.nodeApi, itemToken);
        if(!result.valid) {
            if(result.error) {
                throw new Error("Given token definition is invalid");
            } else {
                throw new Error(`Given token definition is invalid: ${result.error}`);
            }
        }
    }

    override async getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries> {
        try {
            const { locId, itemId } = parameters;
            const response = await this.backend().get(`/api/collection/${ locId }/${ itemId }/all-deliveries`);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    override async checkDelivery(parameters: CheckCollectionDeliveryRequest): Promise<CollectionDelivery> {
        try {
            const { locId, hash } = parameters;
            const response = await this.backend().put(`/api/collection/${ locId }/file-deliveries`, { copyHash: hash });
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async submit(locId: UUID) {
        try {
            await this.backend().post(`/api/loc-request/${ locId }/submit`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async cancel(locId: UUID) {
        try {
            await this.backend().post(`/api/loc-request/${ locId }/cancel`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async rework(locId: UUID) {
        try {
            await this.backend().post(`/api/loc-request/${ locId }/rework`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async getLocIssuers(
        request: LocRequest,
        locBatch: LocBatch,
    ): Promise<LocVerifiedIssuers> {
        if(!this.currentAddress || (request.status !== "OPEN" && request.status !== "CLOSED")) {
            return EMPTY_LOC_ISSUERS;
        } else {
            const locId = new UUID(request.id);
            let verifiedThirdParty = false;
            if(request.locType === "Identity" && request.status === "CLOSED") {
                const availableVerifiedIssuers = await locBatch.getAvailableVerifiedIssuers();
                verifiedThirdParty = availableVerifiedIssuers[request.ownerAddress].find(issuer => issuer.address === request.requesterAddress?.address && request.requesterAddress?.type === "Polkadot") !== undefined;
            }
            const nodeIssuers = (await locBatch.getLocsVerifiedIssuers())[locId.toDecimalString()];
            const chainSelectedIssuers = new Set<string>();
            nodeIssuers.forEach(issuer => chainSelectedIssuers.add(issuer.address));

            const issuers: VerifiedThirdParty[] = [];
            if((this.currentAddress.address === request.requesterAddress?.address && this.currentAddress.type === request.requesterAddress.type)
                || (this.currentAddress.address === request.ownerAddress && this.currentAddress.type === "Polkadot")
                || chainSelectedIssuers.has(this.currentAddress.address)) {

                const backendIssuers = request.selectedIssuers;
                const addedIssuers = new Set<string>();
                for(const maybeSelectedIssuer of backendIssuers) {
                    addedIssuers.add(maybeSelectedIssuer.address);
                    issuers.push({
                        identityLocId: maybeSelectedIssuer.identityLocId.toString(),
                        address: maybeSelectedIssuer.address,
                        firstName: maybeSelectedIssuer?.identity.firstName || "",
                        lastName: maybeSelectedIssuer?.identity.lastName || "",
                        selected: chainSelectedIssuers.has(maybeSelectedIssuer.address), // Backend may be out-of-date
                    });
                }
                for(const nodeIssuer of nodeIssuers) {
                    if(!addedIssuers.has(nodeIssuer.address)) { // Backend may be out-of-date
                        issuers.push({
                            identityLocId: nodeIssuer.identityLocId.toString(),
                            address: nodeIssuer.address,
                            firstName: "",
                            lastName: "",
                            selected: true,
                        });
                    }
                }
            } else {
                for(const nodeIssuer of nodeIssuers) {
                    issuers.push({
                        identityLocId: nodeIssuer.identityLocId.toString(),
                        address: nodeIssuer.address,
                        firstName: "",
                        lastName: "",
                    });
                }
            }
            return {
                verifiedThirdParty,
                issuers,
            };
        }
    }

    async canAddRecord(request: LocRequest): Promise<boolean> {
        return (this.currentAddress.address === request.requesterAddress?.address && this.currentAddress.type === request.requesterAddress?.type)
            || this.currentAddress.address === request.ownerAddress
            || await this.isIssuerOf(request);
    }

    private async isIssuerOf(request: LocRequest): Promise<boolean> {
        const issuers = await this.getLocIssuers(request, this.nodeApi.batch.locs([ new UUID(request.id) ]));
        return issuers.issuers.find(issuer => issuer.address === this.currentAddress.address && this.currentAddress.type === "Polkadot") !== undefined;
    }

    async addTokensRecord(parameters: AddTokensRecordParams & FetchParameters): Promise<void> {
        const {
            recordId,
            description,
            signer,
            callback,
            locId,
            files,
        } = parameters;

        const chainItemFiles: TypesTokensRecordFile[] = [];
        for(const itemFile of files) {
            await itemFile.finalize(); // Ensure hash and size
        }
        for(const itemFile of files) {
            chainItemFiles.push({
                name: itemFile.name,
                contentType: itemFile.contentType.mimeType,
                hash: itemFile.hashOrContent.contentHash,
                size: itemFile.size.toString(),
            });
        }

        const submittable = this.nodeApi.polkadot.tx.logionLoc.addTokensRecord(
            this.nodeApi.adapters.toLocId(locId),
            recordId,
            description,
            this.nodeApi.adapters.newTokensRecordFileVec(chainItemFiles),
        );
        await signer.signAndSend({
            signerId: this.currentAddress.address,
            submittable,
            callback
        });

        for(const file of files) {
            if(file.hashOrContent.hasContent) {
                await this.uploadTokensRecordFile({ locId, recordId, file });
            }
        }
    }

    async uploadTokensRecordFile(parameters: { locId: UUID, recordId: string, file: ItemFileWithContent }) {
        const { locId, recordId, file } = parameters;

        await file.hashOrContent.finalize(); // Ensure validity

        const formData = this.componentFactory.buildFormData();
        formData.append('file', await file.hashOrContent.data(), file.name);
        formData.append('hash', file.hashOrContent.contentHash);
        try {
            await this.backend().post(
                `/api/records/${ locId.toString() }/${ recordId }/files`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    override async getTokensRecordDeliveries(parameters: GetTokensRecordDeliveriesRequest): Promise<ItemDeliveries> {
        return getTokensRecordDeliveries(this.backend(), parameters);
    }

    override async checkTokensRecordDelivery(parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery> {
        return checkTokensRecordDelivery(this.backend(), parameters);
    }
}

export const EMPTY_LOC_ISSUERS: LocVerifiedIssuers = {
    verifiedThirdParty: false,
    issuers: [],
}
