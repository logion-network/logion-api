import {
    LogionNodeApiClass,
    UUID,
    LocType,
    LegalOfficerCase,
    ItemFile,
    CollectionItem,
    ValidAccountId,
    AccountType,
    LocBatch,
    Adapters,
    TypesTokensRecord,
    TypesTokensRecordFile,
    FileParams,
    VoidInfo,
    Hash,
    Fees as FeesClass,
    LinkParams,
    MetadataItemParams,
    Lgnt,
} from '@logion/node-api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { AnyJson } from "@polkadot/types-codec/types";
import { AxiosInstance } from 'axios';

import { UserIdentity, LegalOfficer, PostalAddress, LegalOfficerClass } from "./Types.js";
import { NetworkState } from "./NetworkState.js";
import { authenticatedCurrentAccount, LegalOfficerEndpoint, SharedState, LogionClientConfig } from "./SharedClient.js";
import { AxiosFactory } from "./AxiosFactory.js";
import { requireDefined } from "./assertions.js";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, aggregateArrays, Token } from "./Http.js";
import {
    BlockchainSubmission,
    BlockchainBatchSubmission,
    OptionalBlockchainSubmission,
} from "./Signer.js";
import { ComponentFactory } from "./ComponentFactory.js";
import { newBackendError } from "./Error.js";
import { HashOrContent, HashString } from "./Hash.js";
import { validateToken, ItemTokenWithRestrictedType, TokenType } from "./Token.js";
import {
    TermsAndConditionsElement,
    newTermsAndConditions,
    LogionClassification,
    SpecificLicense,
    CreativeCommons,
    OffchainTermsAndConditionsElement,
    MergedTermsAndConditionsElement,
    LogionClassificationParameters,
    CreativeCommonsCode
} from "./license/index.js";
import { CollectionDelivery, ItemDeliveries } from './Deliveries.js';
import { Fees } from './Fees.js';

interface AddedOn {
    addedOn: string;
}

export interface SupportedAccountId {
    type: AccountType;
    address: string;
}

export type ItemStatus = "DRAFT" | "REVIEW_PENDING" | "REVIEW_ACCEPTED" | "REVIEW_REJECTED" | "PUBLISHED" | "ACKNOWLEDGED";

export interface ItemLifecycle extends Partial<AddedOn> {
    reviewedOn?: string;
    acknowledgedByOwnerOn?: string;
    acknowledgedByVerifiedIssuerOn?: string;
    status: ItemStatus;
    rejectReason?: string;
}

/**
 * Backend LOC file.
 */
export interface LocFile extends ItemLifecycle {
    hash: string;
    nature: string;
    submitter: SupportedAccountId;
    name: string;
    restrictedDelivery: boolean;
    contentType: string;
    fees?: Fees;
    storageFeePaidBy?: string;
    size: string;
}

/**
 * Backend MetadataItem.
 */
export interface LocMetadataItem extends ItemLifecycle {
    name: string;
    nameHash: string;
    value: string;
    submitter: SupportedAccountId;
    fees?: Fees;
}

/**
 * Backend LocLink.
 */
export interface LocLink extends ItemLifecycle {
    target: string;
    nature: string;
    submitter: SupportedAccountId;
    fees?: Fees;
}

export interface LocCollectionItem extends AddedOn {
    itemId: string,
}

export interface LocRequestVoidInfo {
    reason?: string; // undefined in public view
    voidedOn?: string;
}

export interface VerifiedIssuer {
    firstName: string;
    lastName: string;
    identityLocId: string;
    account: ValidAccountId;
    selected?: boolean;
}

export interface LocVerifiedIssuers {
    verifiedIssuer: boolean;
    issuers: VerifiedIssuer[];
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
    selectedIssuers: BackendVerifiedIssuerIdentity[];
    template?: string;
    sponsorshipId?: string;
    fees?: BackendLocFees;
    collectionParams?: BackendCollectionParams;
}

export interface IdenfyVerificationSession {
    status: IdenfySessionStatus;
    redirectUrl?: string;
}

export type IdenfySessionStatus = "APPROVED" | "DENIED" | "SUSPECTED" | "EXPIRED" | "PENDING";

export type LocRequestStatus = "DRAFT" | "REVIEW_PENDING" | "REVIEW_REJECTED" | "REVIEW_ACCEPTED" | "OPEN" | "CLOSED";

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

export interface AddFileParams {
    file: HashOrContent,
    nature: string,
}

export interface AddLinkParams {
    target: UUID;
    nature: string;
}

export function withLocId<T>(locId: UUID, params: BlockchainSubmission<T>): BlockchainSubmission<T & FetchParameters> {
    return withAdditional({ locId }, params)
}

export function withAdditional<T, P>(additionalPayload: P, params: BlockchainSubmission<T>): BlockchainSubmission<T & P> {
    const { signer, callback, payload } = params;
    return {
        signer,
        callback,
        payload: {
            ...payload,
            ...additionalPayload,
        }
    }
}

export interface AddCollectionItemParams {
    itemId: Hash,
    itemDescription: string,
    itemFiles?: HashOrContent[],
    itemToken?: ItemTokenWithRestrictedType,
    restrictedDelivery?: boolean,
    logionClassification?: LogionClassificationParameters,
    specificLicenses?: SpecificLicense[],
    creativeCommons?: CreativeCommonsCode,
}

export interface FetchLocRequestSpecification {
    ownerAddress?: string;
    requesterAddress?: string,
    statuses: LocRequestStatus[],
    locTypes: LocType[],
    sponsorshipId?: string;
}

export interface BaseLoc {
    ownerAddress: string;
    description: string;
    locType: LocType;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
    template?: string;
    fees?: BackendLocFees;
    collectionParams?: BackendCollectionParams;
}

export interface BackendCollectionParams {
    lastBlockSubmission?: string;
    maxSize?: string;
    canUpload: boolean;
}

export interface BackendLocFees {
    valueFee?: string;
    legalFee?: string;
    collectionItemFee?: string;
    tokensRecordFee?: string;
}

export interface ItemsParams {
    metadata: AddMetadataParams[];
    files: AddFileParams[];
    links: AddLinkParams[];
}

export interface CreateLocRequest extends BaseLoc {
    requesterAddress?: SupportedAccountId;
    requesterIdentityLoc?: string;
    draft?: boolean;
    sponsorshipId?: string;
}

export interface CreateOpenLoc extends BaseLoc {
    metadata: AddMetadataParams[];
    links: { target: string, nature: string }[];
}

export interface CreateSofRequest {
    itemId?: Hash;
}

export interface GetDeliveriesRequest {
    locId: UUID;
    itemId: Hash;
}

export interface CheckCollectionDeliveryRequest {
    locId: UUID;
    hash: Hash;
}

export interface FetchAllLocsParams {
    legalOfficers?: LegalOfficer[];
    spec?: FetchLocRequestSpecification;
}

export interface BackendVerifiedIssuerIdentity {
    address: string;
    identity: UserIdentity;
    identityLocId: string;
    selected?: boolean;
}

export interface AddTokensRecordParams {
    recordId: Hash,
    description: string,
    files: HashOrContent[],
}

export interface GetTokensRecordDeliveriesRequest {
    locId: UUID;
    recordId: Hash;
}

export interface CheckTokensRecordDeliveryRequest {
    locId: UUID;
    recordId: Hash;
    hash: Hash;
}

export class LocMultiClient {

    static newLocMultiClient(sharedState: SharedState): LocMultiClient {
        const { currentAccount, token } = authenticatedCurrentAccount(sharedState);
        return new LocMultiClient({
            axiosFactory: sharedState.axiosFactory,
            currentAccount,
            networkState: sharedState.networkState,
            token: token.value,
            nodeApi: sharedState.nodeApi,
            componentFactory: sharedState.componentFactory,
            config: sharedState.config,
        });
    }

    constructor(params: {
        networkState: NetworkState<LegalOfficerEndpoint>,
        axiosFactory: AxiosFactory,
        currentAccount: ValidAccountId,
        token: string,
        nodeApi: LogionNodeApiClass,
        componentFactory: ComponentFactory,
        config: LogionClientConfig,
    }) {
        this.networkState = params.networkState;
        this.axiosFactory = params.axiosFactory;
        this.currentAccount = params.currentAccount;
        this.token = params.token;
        this.nodeApi = params.nodeApi;
        this.componentFactory = params.componentFactory;
        this.config = params.config;
    }

    private readonly networkState: NetworkState<LegalOfficerEndpoint>;
    private readonly axiosFactory: AxiosFactory;
    private readonly currentAccount: ValidAccountId;
    private readonly token: string;
    private readonly nodeApi: LogionNodeApiClass;
    private readonly componentFactory: ComponentFactory;
    private readonly config: LogionClientConfig;

    newLocClient(legalOfficer: LegalOfficerClass) {
        return new AuthenticatedLocClient({
            axiosFactory: this.axiosFactory,
            currentAccount: this.currentAccount,
            nodeApi: this.nodeApi,
            legalOfficer,
            componentFactory: this.componentFactory,
            config: this.config,
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
            requesterAddress: this.currentAccount.address,
            locTypes: [ "Transaction", "Collection", "Identity" ],
            statuses: [ "OPEN", "REVIEW_PENDING", "REVIEW_ACCEPTED", "REVIEW_REJECTED", "CLOSED", "DRAFT" ]
        };

        const multiResponse = await httpClient.fetch(async axios => {
            const specs: FetchLocRequestSpecification = params?.spec ? params?.spec : defaultSpec;
            const response = await axios.put("/api/loc-request", specs);
            return response.data.requests;
        });

        return aggregateArrays<LocRequest>(multiResponse);
    }

    async fetchAllForVerifiedIssuer(legalOfficers: LegalOfficerClass[]): Promise<LocRequest[]> {
        if (this.currentAccount.type !== "Polkadot") {
            return [];
        }
        const entries = await this.nodeApi.polkadot.query.logionLoc.locsByVerifiedIssuerMap.entries(this.currentAccount.address);
        const requests: LocRequest[] = [];
        for(const entry of entries) {
            const owner = ValidAccountId.polkadot(entry[0].args[1].toString());
            const locId = UUID.fromDecimalStringOrThrow(entry[0].args[2].toString());
            const legalOfficer = requireDefined(legalOfficers.find(legalOfficer => legalOfficer.account.equals(owner)));
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
        return requireDefined(await params.api.queries.getLegalOfficerCase(params.locId),
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
    id: Hash;
    description: HashString;
    addedOn: string;
    files: UploadableItemFile[];
    token?: ClientToken,
    restrictedDelivery: boolean;
    termsAndConditions: MergedTermsAndConditionsElement[],
}

export class ClientToken {

    constructor(params: { type: HashString, id: HashString, issuance: bigint }) {
        this.type = params.type;
        this.id = params.id;
        this.issuance = params.issuance;
    }

    readonly type: HashString;
    readonly id: HashString;
    readonly issuance: bigint;

    isValidItemTokenWithRestrictedType() {
        return this.type.isValidValue() && this.id.isValidValue();
    }

    toItemTokenWithRestrictedType(): ItemTokenWithRestrictedType {
        const type = this.type.validValue();
        const id = this.id.validValue();
        return {
            id,
            type: type as TokenType,
            issuance: this.issuance,
        };
    }
}

export interface ClientItemFile {
    name: HashString;
    contentType: HashString;
    size: bigint;
    hash: Hash;
}

export interface UploadableItemFile extends ClientItemFile {
    uploaded: boolean;
}

export interface OffchainCollectionItem {
    collectionLocId: string;
    itemId: string;
    addedOn: string;
    description?: string;
    files: OffchainCollectionItemFile[];
    termsAndConditions: OffchainTermsAndConditionsElement[];
    token?: OffchainCollectionItemToken;
}

export interface OffchainCollectionItemFile {
    hash: string;
    name?: string;
    contentType?: string;
    uploaded?: boolean;
}

export interface OffchainCollectionItemToken {
    type?: string;
    id?: string;
}

interface CreateOffchainCollectionItem {
    itemId: string;
    description: string;
    files: OffchainCollectionItemFile[];
    termsAndConditions: OffchainTermsAndConditionsElement[];
    token?: OffchainCollectionItemToken;
}

export interface ClientTokensRecord {
    id: Hash;
    description: HashString;
    addedOn: string;
    files: UploadableItemFile[];
    issuer: ValidAccountId;
}

export interface OffchainTokensRecord {
    collectionLocId: string;
    recordId: string;
    description: string;
    addedOn: string;
    files: OffchainTokensRecordFile[];
}

interface CreateOffchainTokensRecord {
    recordId: string;
    description: string;
    files: OffchainTokensRecordFile[];
}

export interface OffchainTokensRecordFile {
    hash: string;
    name?: string;
    contentType?: string;
    uploaded?: boolean;
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

    async getCollectionItem(parameters: { itemId: Hash } & FetchParameters): Promise<UploadableCollectionItem | undefined> {
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

    private async getOffchainItem(parameters: { locId: UUID, itemId: Hash }): Promise<OffchainCollectionItem> {
        const { locId, itemId } = parameters;
        const response = await this.backend().get(`/api/collection/${ locId.toString() }/items/${ itemId.toHex() }`);
        return response.data;
    }

    private mergeItems(onchainItem: CollectionItem, offchainItem: OffchainCollectionItem): UploadableCollectionItem {
        return {
            id: onchainItem.id,
            description: new HashString(onchainItem.description, offchainItem.description),
            addedOn: offchainItem.addedOn,
            files: onchainItem.files.map(file => ({
                hash: file.hash,
                size: file.size,
                name: new HashString(file.name, offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.name),
                contentType: new HashString(file.contentType, offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.contentType),
                uploaded: offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.uploaded || false,
            })),
            token: onchainItem.token ? new ClientToken({
                type: new HashString(onchainItem.token.type, offchainItem.token?.type),
                id: new HashString(onchainItem.token.id, offchainItem.token?.id),
                issuance: onchainItem.token.issuance,
            }) : undefined,
            restrictedDelivery: onchainItem.restrictedDelivery,
            termsAndConditions: newTermsAndConditions(onchainItem.termsAndConditions, offchainItem.termsAndConditions),
        }
    }

    async getCollectionItems(parameters: FetchParameters): Promise<UploadableCollectionItem[]> {
        const { locId } = parameters;
        const onchainItems = await this.nodeApi.queries.getCollectionItems(locId);

        const onchainItemsMap: Record<string, CollectionItem> = {};
        for(const item of onchainItems) {
            onchainItemsMap[item.id.toHex()] = item;
        }

        try {
            const result: UploadableCollectionItem[] = [];
            const offchainItems = await this.getOffchainItems({ locId });
            for(const offchainItem of offchainItems) {
                const onchainItem = onchainItemsMap[offchainItem.itemId];
                if (onchainItem) {
                    result.push(this.mergeItems(onchainItem, offchainItem))
                }
            }
            return result;
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

    async getTokensRecord(parameters: { recordId: Hash } & FetchParameters): Promise<ClientTokensRecord | undefined> {
        const { locId, recordId } = parameters;
        const onchainRecord = await this.nodeApi.polkadot.query.logionLoc.tokensRecordsMap(
            this.nodeApi.adapters.toNonCompactLocId(locId),
            this.nodeApi.adapters.toH256(recordId),
        );
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

    private async getOffchainRecord(parameters: { locId: UUID, recordId: Hash }): Promise<OffchainTokensRecord> {
        const { locId, recordId } = parameters;
        const response = await this.backend().get(`/api/records/${ locId.toString() }/record/${ recordId.toHex() }`);
        return response.data;
    }

    private mergeRecords(onchainItem: TypesTokensRecord, offchainItem: OffchainTokensRecord): ClientTokensRecord {
        return {
            id: Hash.fromHex(offchainItem.recordId),
            description: new HashString(onchainItem.description, offchainItem.description),
            addedOn: offchainItem.addedOn,
            issuer: onchainItem.submitter,
            files: onchainItem.files.map(file => ({
                hash: file.hash,
                name: new HashString(file.name, offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.name),
                contentType: new HashString(file.contentType, offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.contentType),
                size: BigInt(file.size),
                uploaded: offchainItem.files.find(offchainFile => offchainFile.hash === file.hash.toHex())?.uploaded || false,
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
        const response = await this.backend().get(`/api/collection/${ locId }/${ itemId.toHex() }/latest-deliveries`);
        return response.data;
    }

    override async checkDelivery(parameters: CheckCollectionDeliveryRequest): Promise<CollectionDelivery> {
        const { locId, hash } = parameters;
        const response = await this.backend().put(`/api/collection/${ locId }/file-deliveries`, { copyHash: hash.toHex() });
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
    const response = await axios.get(`/api/records/${ locId }/${ recordId.toHex() }/deliveries`);
    return response.data;
}

async function checkTokensRecordDelivery(axios: AxiosInstance, parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery> {
    try {
        const { locId, recordId, hash } = parameters;
        const response = await axios.put(`/api/records/${ locId }/${ recordId.toHex() }/deliveries/check`, { copyHash: hash.toHex() });
        return response.data;
    } catch(e) {
        throw newBackendError(e);
    }
}

export class AuthenticatedLocClient extends LocClient {

    constructor(params: {
        axiosFactory: AxiosFactory,
        currentAccount: ValidAccountId,
        nodeApi: LogionNodeApiClass,
        legalOfficer: LegalOfficerClass,
        componentFactory: ComponentFactory,
        config: LogionClientConfig,
    }) {
        super({
            axiosFactory: params.axiosFactory,
            legalOfficer: params.legalOfficer,
            nodeApi: params.nodeApi,
        });
        this.currentAccount = params.currentAccount;
        this.componentFactory = params.componentFactory;
        this.config = params.config;
    }

    readonly currentAccount: ValidAccountId;
    private readonly componentFactory: ComponentFactory;
    private readonly config: LogionClientConfig;

    async createLocRequest(request: CreateLocRequest): Promise<LocRequest> {
        try {
            const response = await this.backend().post(`/api/loc-request`, request);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async createOpenLoc(request: CreateOpenLoc): Promise<LocRequest> {
        try {
            const response = await this.backend().post(`/api/loc-request/open`, request);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async createSofRequest(request: CreateSofRequest & FetchParameters): Promise<LocRequest> {
        const { locId, itemId } = request;
        const response = await this.backend().post(`/api/loc-request/sof`, {
            locId: locId.toString(),
            itemId: itemId?.toHex(),
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

    async deleteMetadata(parameters: RefMetadataParams & FetchParameters): Promise<void> {
        try {
            const { nameHash, locId } = parameters;
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/metadata/${ nameHash.toHex() }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addFile(parameters: AddFileParams & FetchParameters & { direct: boolean }): Promise<void> {
        const { file, nature, locId, direct } = parameters;

        await file.finalize();

        const uploader = this.componentFactory.buildFileUploader();
        await uploader.upload({
            endpoint: `${ this.legalOfficer.node }/api/loc-request/${ locId.toString() }/files`,
            files: [
                {
                    file: file.content,
                    field: "file",
                }
            ],
            fields: [
                {
                    name: "nature",
                    value: nature,
                },
                {
                    name: "hash",
                    value: file.contentHash.toHex(),
                },
                {
                    name: "direct",
                    value: String(direct),
                }
            ],
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${this.legalOfficer.token}`,
            }
        });
    }

    async deleteFile(parameters: RefFileParams & FetchParameters): Promise<void> {
        try {
            const { hash, locId } = parameters;
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/files/${ hash.toHex() }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addLink(parameters: AddLinkParams & FetchParameters): Promise<void> {
        const { target, nature, locId } = parameters;
        try {
            await this.backend().post(`/api/loc-request/${ locId.toString() }/links`, { target: target.toString(), nature });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async deleteLink(parameters: RefLinkParams & FetchParameters): Promise<void> {
        try {
            const { target, locId } = parameters;
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/links/${ target.toString() }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async addCollectionItem(parameters: BlockchainSubmission<AddCollectionItemParams & FetchParameters>): Promise<void> {
        const { signer, callback, payload } = parameters;
        return this.addCollectionItems({
            signer,
            callback,
            payload: [ payload ],
        })
    }

    async addCollectionItems(parameters: BlockchainBatchSubmission<AddCollectionItemParams & FetchParameters>): Promise<void> {

        const submittables: SubmittableExtrinsic[] = [];

        for (const params of parameters.payload) {
            const {
                itemId,
                itemDescription,
                locId,
                itemFiles,
                itemToken,
            } = params;

            if(itemFiles) {
                for(const file of itemFiles) {
                    await file.finalize();
                }
            }

            const termsAndConditions = this.termsAndConditions(params);

            await this.submitItemPublicData(locId, {
                itemId: itemId.toHex(),
                files: itemFiles?.map(file => ({
                    name: file.name,
                    contentType: file.mimeType.mimeType,
                    hash: file.contentHash.toHex(),
                })) || [],
                termsAndConditions: termsAndConditions.map(element => ({
                    type: element.type,
                    details: element.details,
                })),
                description: itemDescription,
                token: itemToken ? {
                    id: itemToken.id,
                    type: itemToken.type,
                } : undefined,
            });

            const submittable = await this.addCollectionItemSubmittable({ ...params, termsAndConditions }); // finalizes files
            submittables.push(submittable);
        }
        const { signer, callback } = parameters;
        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.nodeApi.batching.batchAll(submittables),
                callback
            });
        } catch(e) {
            for (const params of parameters.payload) {
                const { locId, itemId } = params;
                await this.cancelItemPublicDataSubmission(locId, itemId);
            }
            throw e;
        }

        for (const params of parameters.payload) {
            const { locId, itemId, itemFiles } = params;
            if (itemFiles) {
                for(const file of itemFiles) {
                    if(file.hasContent) {
                        await this.uploadItemFile({ locId, itemId, file });
                    }
                }
            }
        }
    }

    async addTokensRecords(parameters: BlockchainBatchSubmission<AddTokensRecordParams & FetchParameters>): Promise<void> {

        const submittables: SubmittableExtrinsic[] = [];

        for (const params of parameters.payload) {
            const {
                recordId,
                description,
                locId,
                files,
            } = params;

            if(files) {
                for(const file of files) {
                    await file.finalize();
                }
            }

            await this.submitRecordPublicData(locId, {
                recordId: recordId.toHex(),
                files: files?.map(file => ({
                    name: file.name,
                    contentType: file.mimeType.mimeType,
                    hash: file.contentHash.toHex(),
                })) || [],
                description,
            });

            const submittable = await this.addTokensRecordSubmittable({ ...params });
            submittables.push(submittable);
        }
        const { signer, callback } = parameters;
        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.nodeApi.batching.batchAll(submittables),
                callback
            });
        } catch(e) {
            for (const params of parameters.payload) {
                const { locId, recordId } = params;
                await this.cancelRecordPublicDataSubmission(locId, recordId);
            }
            throw e;
        }

        for (const params of parameters.payload) {
            const { locId, recordId, files } = params;
            if (files) {
                for(const file of files) {
                    if(file.hasContent) {
                        await this.uploadTokensRecordFile({ locId, recordId, file });
                    }
                }
            }
        }
    }

    private termsAndConditions(parameters: AddCollectionItemParams): TermsAndConditionsElement[] {
        const { logionClassification, creativeCommons, specificLicenses } = parameters
        const termsAndConditions: TermsAndConditionsElement[] = [];
        if (logionClassification && creativeCommons) {
            throw new Error("Logion Classification and Creative Commons are mutually exclusive.");
        } else if (logionClassification) {
            const logionClassificationLoc = requireDefined(this.config.logionClassificationLoc, () => Error("Missing Logion Classification LOC ID in config"));
            termsAndConditions.push(new LogionClassification(logionClassificationLoc, logionClassification));
        } else if (creativeCommons) {
            const creativeCommonsLoc = requireDefined(this.config.creativeCommonsLoc, () => Error("Missing Creative Commons LOC ID in config"));
            termsAndConditions.push(new CreativeCommons(creativeCommonsLoc, creativeCommons));
        }
        if (specificLicenses) {
            specificLicenses.forEach(specific => termsAndConditions.push(specific));
        }
        return termsAndConditions;
    }

    private async addCollectionItemSubmittable(parameters: AddCollectionItemParams & FetchParameters & { termsAndConditions: TermsAndConditionsElement[]}): Promise<SubmittableExtrinsic> {
        const {
            itemId,
            itemDescription,
            locId,
            itemFiles,
            itemToken,
            restrictedDelivery,
            termsAndConditions,
        } = parameters;

        if(itemToken) {
            this.validTokenOrThrow(itemToken);
        }

        const booleanRestrictedDelivery = restrictedDelivery !== undefined ? restrictedDelivery : false;

        const chainItemFiles: ItemFile[] = [];
        if(itemFiles) {
            for(const itemFile of itemFiles) {
                await itemFile.finalize(); // Ensure hash and size
            }
            for(const itemFile of itemFiles) {
                chainItemFiles.push({
                    name: Hash.of(itemFile.name),
                    contentType: Hash.of(itemFile.mimeType.mimeType),
                    hash: itemFile.contentHash,
                    size: itemFile.size,
                });
            }
        }
        return this.nodeApi.polkadot.tx.logionLoc.addCollectionItem(
            this.nodeApi.adapters.toLocId(locId),
            this.nodeApi.adapters.toH256(itemId),
            this.nodeApi.adapters.toH256(Hash.of(itemDescription)),
            chainItemFiles.map(file => this.nodeApi.adapters.toCollectionItemFile(file)),
            this.nodeApi.adapters.toCollectionItemToken(itemToken ? {
                id: Hash.of(itemToken.id),
                type: Hash.of(itemToken.type),
                issuance: itemToken.issuance,
            } : undefined),
            booleanRestrictedDelivery,
            termsAndConditions.map(element => this.nodeApi.adapters.toTermsAndConditionsElement({
                tcType: Hash.of(element.type),
                tcLocId: element.tcLocId,
                details: Hash.of(element.details),
            })),
        );
    }

    async estimateFeesAddCollectionItem(parameters: AddCollectionItemParams & FetchParameters & { collectionItemFee: Lgnt }): Promise<FeesClass> {
        const { itemFiles, itemToken, collectionItemFee } = parameters;
        const termsAndConditions = this.termsAndConditions(parameters);
        const submittable = await this.addCollectionItemSubmittable({
            ...parameters,
            termsAndConditions,
        });
        const numOfEntries = itemFiles ? BigInt(itemFiles.length) : 0n;
        const totSize = itemFiles ? itemFiles.map(file => file.size).reduce((cur, prev) => cur + prev, 0n) : 0n;
        const tokenIssuance = itemToken?.issuance;
        return await this.nodeApi.fees.estimateAddCollectionItem({
            origin: this.currentAccount,
            submittable,
            numOfEntries,
            totSize,
            tokenIssuance,
            collectionItemFee,
        })
    }

    private async submitItemPublicData(locId: UUID, item: CreateOffchainCollectionItem) {
        try {
            await this.backend().post(
                `/api/collection/${ locId.toString() }/items`,
                item
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelItemPublicDataSubmission(locId: UUID, itemId: Hash) {
        try {
            await this.backend().delete(`/api/collection/${ locId.toString() }/items/${ itemId.toHex() }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async uploadItemFile(parameters: { locId: UUID, itemId: Hash, file: HashOrContent }) {
        const { locId, itemId, file } = parameters;

        await file.finalize(); // Ensure validity

        const uploader = this.componentFactory.buildFileUploader();
        await uploader.upload({
            endpoint: `${ this.legalOfficer.node }/api/collection/${ locId.toString() }/${ itemId.toHex() }/files`,
            files: [
                {
                    file: file.content,
                    field: "file",
                }
            ],
            fields: [
                {
                    name: "hash",
                    value: file.contentHash.toHex(),
                },
            ],
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${this.legalOfficer.token}`,
            }
        });
    }

    private validTokenOrThrow(itemToken: ItemTokenWithRestrictedType) {
        const result = validateToken(this.nodeApi, itemToken);
        if(!result.valid) {
            throw new Error(`Given token definition is invalid: ${result.error}`);
        }
        if(itemToken.issuance < 1n) {
            throw new Error("Token must have an issuance >= 1");
        }
    }

    override async getDeliveries(parameters: GetDeliveriesRequest): Promise<ItemDeliveries> {
        try {
            const { locId, itemId } = parameters;
            const response = await this.backend().get(`/api/collection/${ locId }/${ itemId.toHex() }/all-deliveries`);
            return response.data;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    override async checkDelivery(parameters: CheckCollectionDeliveryRequest): Promise<CollectionDelivery> {
        try {
            const { locId, hash } = parameters;
            const response = await this.backend().put(`/api/collection/${ locId }/file-deliveries`, { copyHash: hash.toHex() });
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
        if(!this.currentAccount || (request.status !== "OPEN" && request.status !== "CLOSED")) {
            return EMPTY_LOC_ISSUERS;
        } else {
            const locId = new UUID(request.id);
            let verifiedIssuer = false;
            if(request.locType === "Identity" && request.status === "CLOSED") {
                const availableVerifiedIssuers = await locBatch.getAvailableVerifiedIssuers();
                verifiedIssuer = availableVerifiedIssuers[request.ownerAddress].find(issuer => issuer.account.equals(request.requesterAddress)) !== undefined;
            }
            const nodeIssuers = (await locBatch.getLocsVerifiedIssuers())[locId.toDecimalString()];
            const chainSelectedIssuers = new Set<string>();
            nodeIssuers.forEach(issuer => chainSelectedIssuers.add(issuer.account.address));

            const issuers: VerifiedIssuer[] = [];
            if((this.currentAccount.address === request.requesterAddress?.address && this.currentAccount.type === request.requesterAddress.type)
                || (this.currentAccount.address === request.ownerAddress && this.currentAccount.type === "Polkadot")
                || chainSelectedIssuers.has(this.currentAccount.address)) {

                const backendIssuers = request.selectedIssuers;
                const addedIssuers = new Set<string>();
                for(const maybeSelectedIssuer of backendIssuers) {
                    addedIssuers.add(maybeSelectedIssuer.address);
                    issuers.push({
                        identityLocId: maybeSelectedIssuer.identityLocId.toString(),
                        account: ValidAccountId.polkadot(maybeSelectedIssuer.address),
                        firstName: maybeSelectedIssuer?.identity.firstName || "",
                        lastName: maybeSelectedIssuer?.identity.lastName || "",
                        selected: chainSelectedIssuers.has(maybeSelectedIssuer.address), // Backend may be out-of-date
                    });
                }
                for(const nodeIssuer of nodeIssuers) {
                    if(!addedIssuers.has(nodeIssuer.account.address)) { // Backend may be out-of-date
                        issuers.push({
                            identityLocId: nodeIssuer.identityLocId.toString(),
                            account: nodeIssuer.account,
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
                        account: nodeIssuer.account,
                        firstName: "",
                        lastName: "",
                    });
                }
            }
            return {
                verifiedIssuer,
                issuers,
            };
        }
    }

    async canAddRecord(request: LocRequest): Promise<boolean> {
        return (this.currentAccount.address === request.requesterAddress?.address && this.currentAccount.type === request.requesterAddress?.type)
            || this.currentAccount.address === request.ownerAddress
            || await this.isIssuerOf(request);
    }

    private async isIssuerOf(request: LocRequest): Promise<boolean> {
        const issuers = await this.getLocIssuers(request, this.nodeApi.batch.locs([ new UUID(request.id) ]));
        return issuers.issuers.find(issuer => issuer.account.equals(this.currentAccount)) !== undefined;
    }

    async isInvitedContributorOf(locId: UUID): Promise<boolean> {
        return this.nodeApi.queries.isInvitedContributorOf(this.currentAccount, locId);
    }

    async getInvitedContributors(
        request: LocRequest,
    ): Promise<ValidAccountId[]> {
        if (!this.currentAccount || (request.status !== "OPEN" && request.status !== "CLOSED")) {
            return [];
        } else {
            const locId = new UUID(request.id);
            const invitedContributors = await this.nodeApi.polkadot.query.logionLoc.invitedContributorsByLocMap.entries(locId.toDecimalString());
            return invitedContributors.map(entry => {
                const address = entry[0].args[1].toString();
                return this.nodeApi.queries.getValidAccountId(address, "Polkadot");
            });
        }
    }

    async setInvitedContributor(params: BlockchainSubmission<SetInvitedContributorSelectionParams & FetchParameters>) {
        await params.signer.signAndSend({
            signerId: this.currentAccount,
            submittable: this.setInvitedContributorSubmittable(params.payload),
            callback: params.callback,
        });
    }

    async estimateFeesSetInvitedContributor(params: SetInvitedContributorSelectionParams & FetchParameters) {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.setInvitedContributorSubmittable(params),
        });
    }

    private setInvitedContributorSubmittable(params: SetInvitedContributorSelectionParams & FetchParameters): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.setInvitedContributorSelection(
            this.nodeApi.adapters.toLocId(params.locId),
            params.invitedContributor,
            params.selected,
        )
    }

    async addTokensRecord(parameters: BlockchainSubmission<AddTokensRecordParams & FetchParameters>): Promise<void> {
        const {
            recordId,
            description,
            locId,
            files,
        } = parameters.payload;
        const {
            signer,
            callback,
        } = parameters;

        const submittable = await this.addTokensRecordSubmittable(parameters.payload); // finalizes files

        await this.submitRecordPublicData(locId, {
            recordId: recordId.toHex(),
            files: files?.map(file => ({
                name: file.name,
                contentType: file.mimeType.mimeType,
                hash: file.contentHash.toHex(),
            })) || [],
            description,
        });

        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable,
                callback
            });
        } catch(e) {
            await this.cancelRecordPublicDataSubmission(locId, recordId);
            throw e;
        }

        for(const file of files) {
            if(file.hasContent) {
                await this.uploadTokensRecordFile({ locId, recordId, file });
            }
        }
    }

    private async addTokensRecordSubmittable(parameters: AddTokensRecordParams & FetchParameters) {
        const {
            recordId,
            description,
            locId,
            files,
        } = parameters;

        const chainItemFiles: TypesTokensRecordFile[] = [];
        for(const itemFile of files) {
            await itemFile.finalize(); // Ensure hash and size
        }
        for(const itemFile of files) {
            chainItemFiles.push({
                name: Hash.of(itemFile.name),
                contentType: Hash.of(itemFile.mimeType.mimeType),
                hash: itemFile.contentHash,
                size: itemFile.size.toString(),
            });
        }

        return this.nodeApi.polkadot.tx.logionLoc.addTokensRecord(
            this.nodeApi.adapters.toLocId(locId),
            this.nodeApi.adapters.toH256(recordId),
            this.nodeApi.adapters.toH256(Hash.of(description)),
            this.nodeApi.adapters.newTokensRecordFileVec(chainItemFiles),
        );
    }

    private async submitRecordPublicData(locId: UUID, record: CreateOffchainTokensRecord) {
        try {
            await this.backend().post(
                `/api/records/${ locId.toString() }/record`,
                record
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelRecordPublicDataSubmission(locId: UUID, recordId: Hash) {
        try {
            await this.backend().delete(`/api/records/${ locId.toString() }/record/${ recordId.toHex() }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async estimateFeesAddTokensRecord(parameters: AddTokensRecordParams & FetchParameters & { tokensRecordFee: Lgnt }): Promise<FeesClass> {
        const { files, tokensRecordFee } = parameters;
        const submittable = await this.addTokensRecordSubmittable(parameters);
        const numOfEntries = files ? BigInt(files.length) : 0n;
        const totSize = files ? files.map(file => file.size).reduce((cur, prev) => cur + prev, 0n) : 0n;
        return await this.nodeApi.fees.estimateAddTokensRecord({
            origin: this.currentAccount,
            submittable,
            numOfEntries,
            totSize,
            tokensRecordFee,
        })
    }

    async uploadTokensRecordFile(parameters: { locId: UUID, recordId: Hash, file: HashOrContent }) {
        const { locId, recordId, file } = parameters;

        await file.finalize(); // Ensure validity

        const uploader = this.componentFactory.buildFileUploader();
        await uploader.upload({
            endpoint: `${ this.legalOfficer.node }/api/records/${ locId.toString() }/${ recordId.toHex() }/files`,
            files: [
                {
                    file: file.content,
                    field: "file",
                }
            ],
            fields: [
                {
                    name: "hash",
                    value: file.contentHash.toHex(),
                },
            ],
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${this.legalOfficer.token}`,
            }
        });
    }

    override async getTokensRecordDeliveries(parameters: GetTokensRecordDeliveriesRequest): Promise<ItemDeliveries> {
        return getTokensRecordDeliveries(this.backend(), parameters);
    }

    override async checkTokensRecordDelivery(parameters: CheckTokensRecordDeliveryRequest): Promise<CollectionDelivery> {
        return checkTokensRecordDelivery(this.backend(), parameters);
    }

    async requestFileReview(parameters: { locId: UUID, hash: Hash }): Promise<void> {
        const { locId, hash } = parameters;
        try {
            await this.backend().post(`/api/loc-request/${ locId.toString() }/files/${ hash.toHex() }/review-request`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async reviewFile(parameters: { locId: UUID } & ReviewFileParams): Promise<void> {
        try {
            const { locId, hash, decision, rejectReason } = parameters;

            await this.backend().post(`/api/loc-request/${ locId.toString() }/files/${ hash.toHex() }/review`, { decision, rejectReason });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async publishFile(parameters: BlockchainSubmission<PublishFileParams>): Promise<void> {
        const payload = parameters.payload;
        const fees = await this.estimateFeesPublishFile(payload);
        await this.ensureEnoughFunds(fees);

        await this.prePublishFile(payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.publishFileSubmittable(payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPrePublishFile(payload);
            throw e;
        }
    }

    private async prePublishFile(parameters: PublishFileParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/files/${ parameters.file.hash.toHex() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPrePublishFile(parameters: PublishFileParams) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/files/${ parameters.file.hash.toHex() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async ensureEnoughFunds(fees: FeesClass) {
        await this.nodeApi.fees.ensureEnoughFunds({ origin: this.currentAccount, fees });
    }

    async estimateFeesPublishFile(parameters: PublishFileParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithStorage({
            origin: this.currentAccount,
            submittable: this.publishFileSubmittable(parameters),
            size: parameters.file.size,
        });
    }

    private publishFileSubmittable(parameters: PublishFileParams): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.addFile(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toPalletLogionLocFile(parameters.file),
        );
    }

    async acknowledgeFile(parameters: BlockchainSubmission<FetchParameters & RefFileParams>): Promise<void> {
        const fees = await this.estimateFeesAcknowledgeFile(parameters.payload);
        await this.ensureEnoughFunds(fees);

        await this.preAcknowledgeFile(parameters.payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.acknowledgeFileSubmittable(parameters.payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPreAcknowledgeFile(parameters.payload);
            throw e;
        }
    }

    private async preAcknowledgeFile(parameters: FetchParameters & RefFileParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/files/${ parameters.hash.toHex() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPreAcknowledgeFile(parameters: FetchParameters & RefFileParams) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/files/${ parameters.hash.toHex() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async estimateFeesAcknowledgeFile(parameters: { locId: UUID } & RefFileParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.acknowledgeFileSubmittable(parameters)
        });
    }

    private acknowledgeFileSubmittable(parameters: { locId: UUID } & RefFileParams): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.acknowledgeFile(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toH256(parameters.hash)
        );
    }

    async requestMetadataReview(parameters: { locId: UUID, nameHash: Hash }): Promise<void> {
        const { locId, nameHash } = parameters;
        try {
            await this.backend().post(`/api/loc-request/${ locId.toString() }/metadata/${ nameHash.toHex() }/review-request`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async reviewMetadata(parameters: { locId: UUID } & ReviewMetadataParams): Promise<void> {
        try {
            const { locId, nameHash, decision, rejectReason } = parameters;

            await this.backend().post(`/api/loc-request/${ locId.toString() }/metadata/${ nameHash.toHex() }/review`, { decision, rejectReason });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async publishMetadata(parameters: BlockchainSubmission<PublishMetadataParams>): Promise<void> {
        const { payload } = parameters;
        const { name } = payload.metadata;
        const nameHash = Hash.of(name);

        const fees = await this.estimateFeesPublishMetadata(payload);
        await this.ensureEnoughFunds(fees);

        await this.prePublishMetadata({ locId: payload.locId, nameHash });

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.publishMetadataSubmittable(payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPrePublishMetadata({ locId: payload.locId, nameHash });
            throw e;
        }
    }

    private async prePublishMetadata(parameters: { locId: UUID, nameHash: Hash }) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/metadata/${ parameters.nameHash.toHex() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPrePublishMetadata(parameters: { locId: UUID, nameHash: Hash }) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/metadata/${ parameters.nameHash.toHex() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async estimateFeesPublishMetadata(parameters: PublishMetadataParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.publishMetadataSubmittable(parameters)
        });
    }

    private publishMetadataSubmittable(parameters: PublishMetadataParams): SubmittableExtrinsic {
        const { name, value, submitter } = parameters.metadata;
        const nameHash = Hash.of(name);
        return this.nodeApi.polkadot.tx.logionLoc.addMetadata(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toPalletLogionLocMetadataItem({
                name: nameHash,
                value: Hash.of(value),
                submitter,
            }),
        );
    }

    async acknowledgeMetadata(parameters: BlockchainSubmission<FetchParameters & RefMetadataParams>): Promise<void> {
        const { payload } = parameters;
        const fees = await this.estimateFeesAcknowledgeMetadata(payload);
        await this.ensureEnoughFunds(fees);

        await this.preAcknowledgeMetadata(payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.acknowledgeMetadataSubmittable(payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPreAcknowledgeMetadata(payload);
            throw e;
        }
    }

    private async preAcknowledgeMetadata(parameters: FetchParameters & RefMetadataParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/metadata/${ parameters.nameHash.toHex() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPreAcknowledgeMetadata(parameters: FetchParameters & RefMetadataParams) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/metadata/${ parameters.nameHash.toHex() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async estimateFeesAcknowledgeMetadata(parameters: FetchParameters & RefMetadataParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.acknowledgeMetadataSubmittable(parameters)
        });
    }

    private acknowledgeMetadataSubmittable(parameters: FetchParameters & RefMetadataParams): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.acknowledgeMetadata(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toH256(parameters.nameHash),
        );
    }

    async requestLinkReview(parameters: { locId: UUID, target: UUID }): Promise<void> {
        const { locId, target } = parameters;
        try {
            await this.backend().post(`/api/loc-request/${ locId.toString() }/links/${ target.toString() }/review-request`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async reviewLink(parameters: { locId: UUID } & ReviewLinkParams): Promise<void> {
        try {
            const { locId, target, decision, rejectReason } = parameters;

            await this.backend().post(`/api/loc-request/${ locId.toString() }/links/${ target.toString() }/review`, { decision, rejectReason });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async publishLink(parameters: BlockchainSubmission<PublishLinkParams>): Promise<void> {
        const { payload } = parameters;
        const fees = await this.estimateFeesPublishLink(payload);
        await this.ensureEnoughFunds(fees);

        await this.prePublishLink(payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.publishLinkSubmittable(payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPrePublishLink(payload);
            throw e;
        }
    }

    private async prePublishLink(parameters: PublishLinkParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/links/${ parameters.link.id.toString() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPrePublishLink(parameters: PublishLinkParams) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/links/${ parameters.link.id.toString() }/pre-publish-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private publishLinkSubmittable(parameters: PublishLinkParams): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.addLink(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toPalletLogionLocLocLinkParams(parameters.link),
        );
    }

    async estimateFeesPublishLink(parameters: PublishLinkParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.publishLinkSubmittable(parameters)
        });
    }

    async acknowledgeLink(parameters: BlockchainSubmission<FetchParameters & RefLinkParams>): Promise<void> {
        const { payload } = parameters;
        const fees = await this.estimateFeesAcknowledgeLink(payload);
        await this.ensureEnoughFunds(fees);

        await this.preAcknowledgeLink(payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.acknowledgeLinkSubmittable(payload),
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPreAcknowledgeLink(payload);
            throw e;
        }
    }

    private async preAcknowledgeLink(parameters: FetchParameters & RefLinkParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/links/${ parameters.target.toString() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPreAcknowledgeLink(parameters: FetchParameters & RefLinkParams) {
        try {
            await this.backend().put(`/api/loc-request/${ parameters.locId.toString() }/links/${ parameters.target.toString() }/pre-ack`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async estimateFeesAcknowledgeLink(parameters: { locId: UUID } & RefLinkParams): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable: this.acknowledgeLinkSubmittable(parameters)
        });
    }

    private acknowledgeLinkSubmittable(parameters: { locId: UUID } & RefLinkParams): SubmittableExtrinsic {
        return this.nodeApi.polkadot.tx.logionLoc.acknowledgeLink(
            this.nodeApi.adapters.toLocId(parameters.locId),
            this.nodeApi.adapters.toLocId(parameters.target),
        );
    }

    async rejectLoc(args: {
        locId: UUID,
        reason: string,
    }): Promise<void> {
        const axios = this.backend();
        try {
            await axios.post(`/api/loc-request/${ args.locId.toString() }/reject`, { rejectReason: args.reason });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async acceptTransactionLoc(parameters: OptionalBlockchainSubmission<AcceptTransactionLocParams>): Promise<void> {
        const { payload, callback } = parameters;
        const { locId } = payload;
        const submittable = this.acceptTransactionLocSubmittable(payload);
        if (submittable) {
            const signer = requireDefined(parameters.signer);
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable,
                callback,
            });
        }
        await this.acceptLoc({ locId })
    }

    private acceptTransactionLocSubmittable(parameters: AcceptTransactionLocParams): SubmittableExtrinsic | undefined {
        const { locId, requesterAccountId, requesterLoc } = parameters;
        if (requesterAccountId) {
            return undefined;
        } else if (requesterLoc) {
            return this.nodeApi.polkadot.tx.logionLoc.createLogionTransactionLoc(
                this.nodeApi.adapters.toLocId(locId),
                this.nodeApi.adapters.toNonCompactLocId(requesterLoc),
            )
        } else {
            throw new Error("No requester provided");
        }
    }

    async estimateFeesAcceptTransactionLoc(parameters: AcceptTransactionLocParams): Promise<FeesClass | undefined> {
        const submittable = this.acceptTransactionLocSubmittable(parameters);
        if (submittable) {
            return await this.nodeApi.fees.estimateCreateLoc({
                origin: this.currentAccount,
                submittable,
                locType: 'Transaction',
                legalFee: Lgnt.zero(),
            });
        }
        return undefined;
    }

    async openTransactionLoc(parameters: BlockchainSubmission<OpenPolkadotLocParams & AutoPublish>, requirePreOpen = true) {
        const { payload, signer, callback } = parameters;
        const { locId, autoPublish } = payload;

        const fees = await this.estimateFeesOpenTransactionLoc(payload);
        await this.ensureEnoughFunds(fees);

        if (requirePreOpen) {
            await this.openLoc({ locId, autoPublish });
        }

        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.openTransactionLocSubmittable(payload),
                callback,
            });
        } catch(e) {
            this.cancelOpenLoc({ locId });
            throw e;
        }
    }

    private storageSize(autoPublish: boolean, files: AddFileParams[]): bigint | undefined {
        if (!autoPublish || files.length === 0) {
            return undefined;
        }
        return files.map(file => file.file.size).reduce((a, b) => a + b);
    }

    private openTransactionLocSubmittable(parameters: OpenPolkadotLocParams): SubmittableExtrinsic {
        const { locId, legalOfficerAccountId, metadata, files, links } = parameters;
        const legalFee = parameters.legalFee === undefined ?
            this.nodeApi.fees.getDefaultLegalFee({ locType: "Transaction" }) :
            parameters.legalFee;
        return this.nodeApi.polkadot.tx.logionLoc.createPolkadotTransactionLoc(
            this.nodeApi.adapters.toLocId(locId),
            legalOfficerAccountId.address,
            legalFee.canonical,
            this.nodeApi.adapters.toPalletLogionLocItemsParams({
                metadata: metadata.map(item => this.toMetadataItemParams(item)),
                files: files.map(item => this.toFileParams(item)),
                links: links.map(item => this.toLinkParams(item)),
            }),
        );
    }

    async estimateFeesOpenTransactionLoc(parameters: OpenPolkadotLocParams & AutoPublish): Promise<FeesClass> {
        const storageSize = this.storageSize(parameters.autoPublish, parameters.files);
        return await this.nodeApi.fees.estimateCreateLoc({
            origin: this.currentAccount,
            submittable: this.openTransactionLocSubmittable(parameters),
            locType: 'Transaction',
            legalFee: parameters.legalFee,
            storageSize,
        });
    }

    async openLogionTransactionLoc(parameters: BlockchainSubmission<{ locId: UUID, requesterLocId: UUID }>) {
        const { signer, callback } = parameters;
        await signer.signAndSend({
            signerId: this.currentAccount,
            submittable: this.openLogionTransactionLocSubmittable(parameters.payload),
            callback,
        });
    }

    private openLogionTransactionLocSubmittable(parameters: { locId: UUID, requesterLocId: UUID }): SubmittableExtrinsic {
        const { locId, requesterLocId } = parameters;
        return this.nodeApi.polkadot.tx.logionLoc.createLogionTransactionLoc(
            this.nodeApi.adapters.toLocId(locId),
            this.nodeApi.adapters.toNonCompactLocId(requesterLocId),
        );
    }

    async estimateFeesOpenLogionTransactionLoc(parameters: { locId: UUID, requesterLocId: UUID } ): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateCreateLoc({
            origin: this.currentAccount,
            submittable: this.openLogionTransactionLocSubmittable(parameters),
            locType: 'Transaction',
            legalFee: Lgnt.zero(),
        });
    }

    private async acceptLoc(args: { locId: UUID }) {
        const axios = this.backend();
        try {
            await axios.post(`/api/loc-request/${ args.locId.toString() }/accept`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async openLoc(args: { locId: UUID } & AutoPublish) {
        const axios = this.backend();
        try {
            await axios.post(`/api/loc-request/${ args.locId.toString() }/open`, {
                autoPublish: args.autoPublish
            });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelOpenLoc(args: { locId: UUID }) {
        const axios = this.backend();
        try {
            await axios.delete(`/api/loc-request/${ args.locId.toString() }/open`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async acceptIdentityLoc(parameters: OptionalBlockchainSubmission<AcceptIdentityLocParams>): Promise<void> {
        const { payload, callback } = parameters;
        const { locId } = payload;
        const submittable = this.acceptIdentityLocSubmittable(payload);
        if (submittable) {
            const signer = requireDefined(parameters.signer);
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable,
                callback,
            });
        }
        await this.acceptLoc({ locId });
    }

    private acceptIdentityLocSubmittable(parameters: AcceptIdentityLocParams): SubmittableExtrinsic | undefined {
        const { locId, requesterAccountId, sponsorshipId } = parameters;
        if (requesterAccountId) {
            if (requesterAccountId.type === "Polkadot") {
                return undefined;
            } else {
                if (!sponsorshipId) {
                    throw new Error("Other Identity LOCs can only be created with a sponsorship");
                }
                const otherAccountId = requesterAccountId.toOtherAccountId();
                return this.nodeApi.polkadot.tx.logionLoc.createOtherIdentityLoc(
                    this.nodeApi.adapters.toLocId(locId),
                    this.nodeApi.adapters.toPalletLogionLocOtherAccountId(otherAccountId),
                    this.nodeApi.adapters.toSponsorshipId(sponsorshipId),
                    this.nodeApi.fees.getDefaultLegalFee({ locType: "Identity" }).canonical,
                );
            }
        } else {
            return this.nodeApi.polkadot.tx.logionLoc.createLogionIdentityLoc(
                this.nodeApi.adapters.toLocId(locId),
            );
        }
    }

    async estimateFeesAcceptIdentityLoc(parameters: AcceptIdentityLocParams): Promise<FeesClass | undefined> {
        const submittable = this.acceptIdentityLocSubmittable(parameters);
        if (submittable) {
            return await this.nodeApi.fees.estimateCreateLoc({
                origin: this.currentAccount,
                submittable,
                locType: 'Identity',
            });
        } else {
            return undefined;
        }
    }

    async openIdentityLoc(parameters: BlockchainSubmission<OpenPolkadotLocParams & AutoPublish>, requirePreOpen = true) {
        const { payload, signer, callback } = parameters;
        const { locId, autoPublish } = payload;

        const fees = await this.estimateFeesOpenIdentityLoc(payload);
        await this.ensureEnoughFunds(fees);

        if (requirePreOpen) {
            await this.openLoc({ locId, autoPublish });
        }

        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.openIdentityLocSubmittable(payload),
                callback,
            });
        } catch(e) {
            await this.cancelOpenLoc({ locId });
            throw e;
        }
    }

    private openIdentityLocSubmittable(parameters: OpenPolkadotLocParams): SubmittableExtrinsic {
        const { locId, legalOfficerAccountId, metadata, files, links } = parameters
        const legalFee = parameters.legalFee === undefined ?
            this.nodeApi.fees.getDefaultLegalFee({ locType: "Identity" }) :
            parameters.legalFee;
        return this.nodeApi.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
            this.nodeApi.adapters.toLocId(locId),
            legalOfficerAccountId.address,
            legalFee.canonical,
            this.nodeApi.adapters.toPalletLogionLocItemsParams({
                metadata: metadata.map(item => this.toMetadataItemParams(item)),
                files: files.map(item => this.toFileParams(item)),
                links: links.map(item => this.toLinkParams(item)),
            }),
        );
    }

    private toMetadataItemParams(item: AddMetadataParams): MetadataItemParams {
        return {
            name: Hash.of(item.name),
            value: Hash.of(item.value),
            submitter: this.currentAccount,
        }
    }

    private toFileParams(item: AddFileParams): FileParams {
        return {
            hash: item.file.contentHash,
            nature: Hash.of(item.nature),
            size: item.file.size,
            submitter: this.currentAccount,
        }
    }

    private toLinkParams(item: AddLinkParams): LinkParams {
        return {
            id: item.target,
            nature: Hash.of(item.nature),
            submitter: this.currentAccount,
        }
    }

    async estimateFeesOpenIdentityLoc(parameters: OpenPolkadotLocParams & AutoPublish) {
        const storageSize = this.storageSize(parameters.autoPublish, parameters.files);
        return await this.nodeApi.fees.estimateCreateLoc({
            origin: this.currentAccount,
            submittable: this.openIdentityLocSubmittable(parameters),
            locType: 'Identity',
            legalFee: parameters.legalFee,
            storageSize,
        });
    }

    async openLogionIdentityLoc(parameters: BlockchainSubmission<FetchParameters>) {
        const { signer, callback } = parameters
        await signer.signAndSend({
            signerId: this.currentAccount,
            submittable: this.openLogionIdentityLocSubmittable(parameters.payload),
            callback,
        });
    }

    private openLogionIdentityLocSubmittable(parameters: FetchParameters): SubmittableExtrinsic {
        const { locId } = parameters
        return this.nodeApi.polkadot.tx.logionLoc.createLogionIdentityLoc(
            this.nodeApi.adapters.toLocId(locId),
        );
    }

    async estimateFeesOpenLogionIdentityLoc(parameters: FetchParameters): Promise<FeesClass> {
        return await this.nodeApi.fees.estimateCreateLoc({
            origin: this.currentAccount,
            submittable: this.openLogionIdentityLocSubmittable(parameters),
            locType: 'Identity',
            legalFee: Lgnt.zero(),
        });
    }

    async acceptCollectionLoc(parameters: FetchParameters): Promise<void> {
        await this.acceptLoc(parameters);
    }

    async openCollectionLoc(parameters: BlockchainSubmission<OpenPolkadotLocParams & OpenCollectionLocParams & AutoPublish>, requirePreOpen = true) {
        const { signer, callback, payload } = parameters;
        const { locId, autoPublish } = payload;

        const fees = await this.estimateFeesOpenCollectionLoc(parameters.payload);
        await this.ensureEnoughFunds(fees);

        if (requirePreOpen) {
            await this.openLoc({ locId, autoPublish });
        }

        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable: this.openCollectionLocSubmittable(payload),
                callback,
            });
        } catch(e) {
            await this.cancelOpenLoc({ locId });
            throw e;
        }
    }

    private openCollectionLocSubmittable(parameters: OpenPolkadotLocParams & OpenCollectionLocParams): SubmittableExtrinsic {
        const { locId, legalOfficerAccountId, metadata, files, links, collectionItemFee, tokensRecordFee, valueFee } = parameters;
        const { lastBlockSubmission, maxSize, canUpload } = parameters.collectionParams;
        const legalFee = parameters.legalFee === undefined ?
            this.nodeApi.fees.getDefaultLegalFee({ locType: "Collection" }) :
            parameters.legalFee;
        return this.nodeApi.polkadot.tx.logionLoc.createCollectionLoc(
            this.nodeApi.adapters.toLocId(locId),
            legalOfficerAccountId.address,
            lastBlockSubmission || null,
            maxSize || null,
            canUpload,
            valueFee.canonical,
            legalFee.canonical,
            collectionItemFee.canonical,
            tokensRecordFee.canonical,
            this.nodeApi.adapters.toPalletLogionLocItemsParams({
                metadata: metadata.map(item => this.toMetadataItemParams(item)),
                files: files.map(item => this.toFileParams(item)),
                links: links.map(item => this.toLinkParams(item)),
            }),
        );
    }

    async estimateFeesOpenCollectionLoc(parameters: { valueFee: Lgnt } & OpenPolkadotLocParams & OpenCollectionLocParams & AutoPublish) {
        const storageSize = this.storageSize(parameters.autoPublish, parameters.files);
        return await this.nodeApi.fees.estimateCreateLoc({
            origin: this.currentAccount,
            submittable: this.openCollectionLocSubmittable(parameters),
            locType: 'Collection',
            valueFee: parameters.valueFee,
            legalFee: parameters.legalFee,
            storageSize,
        });
    }

    async close(parameters: BlockchainSubmission<{ locId: UUID, seal?: string, autoAck: boolean }>): Promise<void> {
        const { payload } = parameters;
        const seal = payload.seal || null;
        const autoAck = payload.autoAck;
        const submittable = this.nodeApi.polkadot.tx.logionLoc.close(
            this.nodeApi.adapters.toLocId(payload.locId),
            seal,
            autoAck,
        );

        const fees = await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable,
        });
        await this.ensureEnoughFunds(fees);

        await this.preClose(payload);

        try {
            await parameters.signer.signAndSend({
                signerId: this.currentAccount,
                submittable,
                callback: parameters.callback,
            });
        } catch(e) {
            await this.cancelPreClose(payload);
            throw e;
        }
    }

    private async preClose(parameters: { locId: UUID, autoAck: boolean }) {
        try {
            await this.backend().post(`/api/loc-request/${ parameters.locId.toString() }/close`, { autoAck: parameters.autoAck });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPreClose(parameters: { locId: UUID, autoAck: boolean }) {
        try {
            await this.backend().delete(`/api/loc-request/${ parameters.locId.toString() }/close?autoAck=${ parameters.autoAck }`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async voidLoc(parameters: BlockchainSubmission<FetchParameters & VoidParams>): Promise<void> {
        const { payload, signer, callback } = parameters;
        const { locId, replacer } = payload;

        let submittable;
        if(replacer) {
            submittable = this.nodeApi.polkadot.tx.logionLoc.makeVoidAndReplace(
                this.nodeApi.adapters.toLocId(locId),
                this.nodeApi.adapters.toLocId(replacer),
            );
        } else {
            submittable = this.nodeApi.polkadot.tx.logionLoc.makeVoid(
                this.nodeApi.adapters.toLocId(locId),
            );
        }

        const fees = await this.nodeApi.fees.estimateWithoutStorage({
            origin: this.currentAccount,
            submittable,
        });
        await this.ensureEnoughFunds(fees);

        await this.preVoid(payload);

        try {
            await signer.signAndSend({
                signerId: this.currentAccount,
                submittable,
                callback
            });
        } catch (e) {
            await this.cancelPreVoid(payload);
            throw e;
        }
    }

    private async preVoid(parameters: { locId: UUID, reason: string }) {
        const { locId, reason } = parameters;
        try {
            await this.backend().post(`/api/loc-request/${ locId.toString() }/void`, {
                reason
            });
        } catch(e) {
            throw newBackendError(e);
        }
    }

    private async cancelPreVoid(parameters: { locId: UUID }) {
        const { locId } = parameters;
        try {
            await this.backend().delete(`/api/loc-request/${ locId.toString() }/void`);
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async nominateIssuer(parameters: BlockchainSubmission<{ locId: UUID, requester: string }>) {
        const { requester, locId } = parameters.payload;
        const submittable = this.nodeApi.polkadot.tx.logionLoc.nominateIssuer(
            requester,
            this.nodeApi.adapters.toLocId(locId),
        );
        await parameters.signer.signAndSend({
            signerId: this.currentAccount,
            submittable,
            callback: parameters.callback,
        });
    }

    async dismissIssuer(parameters: BlockchainSubmission<{ requester: string }>) {
        const { requester } = parameters.payload;
        const submittable = this.nodeApi.polkadot.tx.logionLoc.dismissIssuer(requester);
        await parameters.signer.signAndSend({
            signerId: this.currentAccount,
            submittable,
            callback: parameters.callback,
        });
    }

    async getLegalOfficerVerifiedIssuers(): Promise<BackendVerifiedIssuerIdentity[]> {
        try {
            const response = await this.backend().get("/api/issuers-identity");
            return response.data.issuers;
        } catch(e) {
            throw newBackendError(e);
        }
    }

    async setIssuerSelection(params: BlockchainSubmission<SetIssuerSelectionParams>) {
        const { locId, issuer, selected } = params.payload;
        const submittable = this.nodeApi.polkadot.tx.logionLoc.setIssuerSelection(
            this.nodeApi.adapters.toLocId(locId),
            issuer.address,
            selected,
        );
        await params.signer.signAndSend({
            signerId: this.currentAccount,
            submittable,
            callback: params.callback,
        });
    }

    async requestVote(params: BlockchainSubmission<FetchParameters>): Promise<string> {
        const { locId } = params.payload;
        const submittable = this.nodeApi.polkadot.tx.vote.createVoteForAllLegalOfficers(
            this.nodeApi.adapters.toLocId(locId),
        );
        const result = await params.signer.signAndSend({
            signerId: this.currentAccount,
            submittable,
            callback: params.callback,
        });
        const voteCreated = result.events.find(event => event.name === "VoteCreated" && event.section === "vote");
        if(!voteCreated) {
            throw new Error("Unable to retrieve vote ID");
        }
        const voteCreatedData = voteCreated.data as AnyJson[];
        return Adapters.asString(voteCreatedData[0]);
    }

    async setCollectionFileRestrictedDelivery(params: {
        locId: UUID,
        hash: Hash,
        restrictedDelivery: boolean,
    }): Promise<void> {
        const { locId, hash, restrictedDelivery } = params;
        try {
            await this.backend().put(`/api/collection/${ locId.toString() }/files/${ hash.toHex() }`, {
                restrictedDelivery
            });
        } catch(e) {
            throw newBackendError(e);
        }
    }
}

export interface ReviewParams {
    decision: ReviewResult;
    rejectReason?: string;
}

export type ReviewResult = "ACCEPT" | "REJECT";

export interface ReviewFileParams extends RefFileParams, ReviewParams {}

export interface ReviewMetadataParams extends RefMetadataParams, ReviewParams {}

export interface ReviewLinkParams extends RefLinkParams, ReviewParams {}


export interface PublishFileParams {
    locId: UUID;
    file: FileParams;
}

export interface RefFileParams {
    hash: Hash;
}

export interface PublishMetadataParams {
    locId: UUID;
    metadata: {
        name: string;
        value: string;
        submitter: ValidAccountId;
    };
}

export interface RefMetadataParams {
    nameHash: Hash;
}

export interface RefLinkParams {
    target: UUID;
}

export interface OpenPolkadotLocParams {
    locId: UUID;
    legalOfficerAccountId: ValidAccountId;
    legalFee?: Lgnt;
    metadata: AddMetadataParams[],
    files: AddFileParams[],
    links: AddLinkParams[],
}

export interface CollectionParams {
    lastBlockSubmission?: bigint;
    maxSize?: number;
    canUpload: boolean;
}

export interface OpenCollectionLocParams {
    valueFee: Lgnt;
    collectionItemFee: Lgnt;
    tokensRecordFee: Lgnt;
    collectionParams: CollectionParams;
}

export const EMPTY_LOC_ISSUERS: LocVerifiedIssuers = {
    verifiedIssuer: false,
    issuers: [],
}

export interface PublishLinkParams {
    locId: UUID;
    link: LinkParams;
}

export interface VoidParams extends VoidInfo {
    reason: string;
}

export interface SetIssuerSelectionParams {
    locId: UUID;
    issuer: ValidAccountId;
    selected: boolean;
}

export interface SetInvitedContributorSelectionParams {
    invitedContributor: string;
    selected: boolean;
}

export interface AcceptTransactionLocParams {
    locId: UUID;
    requesterAccountId?: ValidAccountId;
    requesterLoc?: UUID;
}

export interface AcceptIdentityLocParams {
    locId: UUID;
    requesterAccountId?: ValidAccountId;
    sponsorshipId?: UUID;
}

export interface AutoPublish {
    autoPublish: boolean;
}
