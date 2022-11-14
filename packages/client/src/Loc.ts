import { UUID, LegalOfficerCase, LocType, VoidInfo, ItemFile } from "@logion/node-api";

import {
    LocRequest,
    LocClient,
    AddMetadataParams,
    DeleteMetadataParams,
    LocMultiClient,
    LocLink,
    LocMetadataItem,
    LocFile,
    AddFileParams,
    DeleteFileParams,
    AddCollectionItemParams,
    LocRequestVoidInfo,
    LocRequestStatus,
    Published,
    ItemFileWithContent,
    AuthenticatedLocClient,
    FetchAllLocsParams,
} from "./LocClient";
import { SharedState } from "./SharedClient";
import { LegalOfficer, UserIdentity, PostalAddress } from "./Types";
import { CollectionItem as CollectionItemClass } from './CollectionItem';
import { State } from "./State";
import { LogionClient } from "./LogionClient";

export interface LocData {
    id: UUID
    ownerAddress: string;
    requesterAddress?: string;
    requesterLocId?: UUID;
    description: string;
    locType: LocType;
    closed: boolean;
    createdOn: string;
    decisionOn?: string;
    closedOn?: string;
    status: LocRequestStatus;
    voidInfo?: LocRequestVoidInfo & VoidInfo
    replacerOf?: UUID;
    rejectReason?: string;
    identityLocId?: UUID;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    collectionLastBlockSubmission?: bigint;
    collectionMaxSize?: number;
    collectionCanUpload?: boolean;
    files: MergedFile[];
    metadata: MergedMetadataItem[];
    links: MergedLink[];
    seal?: string;
    company?: string;
    verifiedThirdParty: boolean;
}

export interface MergedLink extends LocLink, Published {
}

export interface MergedFile extends LocFile, Published {
}

export interface MergedMetadataItem extends LocMetadataItem, Published {
}

export class LocsState extends State {
    private readonly sharedState: SharedState;
    private _locs: Record<string, LocRequestState>;
    private readonly _client: LogionClient;

    constructor(sharedState: SharedState, locs: Record<string, LocRequestState>, client: LogionClient) {
        super();
        this.sharedState = sharedState;
        this._locs = locs;
        this._client = client;
    }

    get draftRequests(): Record<LocType, DraftRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof DraftRequest);
    }

    get openLocs(): Record<LocType, OpenLoc[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof OpenLoc);
    }

    get closedLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }

    get voidedLocs(): Record<LocType, (VoidedLoc | VoidedCollectionLoc)[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof VoidedLoc || loc instanceof VoidedCollectionLoc);
    }

    get pendingRequests(): Record<LocType, PendingRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof PendingRequest);
    }

    get rejectedRequests(): Record<LocType, RejectedRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(loc => loc instanceof RejectedRequest);
    }

    hasValidIdentityLoc(legalOfficer: LegalOfficer): boolean {
        this.ensureCurrent();
        return this.filter('Identity', loc =>
            loc instanceof ClosedLoc &&
            loc.data().ownerAddress === legalOfficer.address
        ).length > 0;
    }

    get legalOfficersWithValidIdentityLoc(): LegalOfficer[] {
        this.ensureCurrent();
        return this.sharedState.legalOfficers.filter(lo => this.hasValidIdentityLoc(lo));
    }

    private withPredicate<T extends LocRequestState>(predicate: (l: LocRequestState) => boolean): Record<LocType, T[]> {
        return {
            'Transaction': this.filter('Transaction', predicate),
            'Collection': this.filter('Collection', predicate),
            'Identity': this.filter('Identity', predicate),
        };
    }

    private filter<T extends LocRequestState>(locType: LocType, predicate: (loc: LocRequestState) => boolean): T[] {
        const locs = Object.values(this._locs)
            .filter(predicate)
            .filter(value => value.data().locType === locType)
        return locs as T[];
    }

    refreshWith(loc: LocRequestState): LocsState {
        return this.syncDiscardOnSuccess(() => this._refreshWith(loc));
    }

    private _refreshWith(loc: LocRequestState): LocsState {
        const locsState = new LocsState(this.sharedState, {}, this._client);
        const refreshedLocs: Record<string, LocRequestState> = {};
        for(const locId in this._locs) {
            const state = this._locs[locId];
            refreshedLocs[locId.toString()] = state.withLocs(locsState);
        }
        refreshedLocs[loc.locId.toString()] = loc.withLocs(locsState);
        locsState._locs = refreshedLocs;
        return locsState;
    }

    refreshWithout(locId: UUID): LocsState {
        return this.syncDiscardOnSuccess(() => this._refreshWithout(locId));
    }

    private _refreshWithout(locId: UUID): LocsState {
        const refreshedLocs: Record<string, LocRequestState> = { ...this._locs };
        delete refreshedLocs[locId.toString()];
        return new LocsState(this.sharedState, refreshedLocs, this._client);
    }

    static async getInitialLocsState(sharedState: SharedState, client: LogionClient, params?: FetchAllLocsParams): Promise<LocsState> {
        return new LocsState(sharedState, {}, client).refresh(params);
    }

    findById(locId: UUID): LocRequestState {
        this.ensureCurrent();
        if(!(locId.toString() in this._locs)) {
            throw new Error("LOC not found");
        }
        return this._locs[locId.toString()];
    }

    async requestTransactionLoc(params: CreateLocRequestParams): Promise<DraftRequest | PendingRequest> {
        return this.requestLoc({
            ...params,
            locType: "Transaction"
        });
    }

    async requestCollectionLoc(params: CreateLocRequestParams): Promise<DraftRequest | PendingRequest> {
        return this.requestLoc({
            ...params,
            locType: "Collection"
        });
    }

    async requestIdentityLoc(params: CreateLocRequestParams): Promise<DraftRequest | PendingRequest> {
        const { userIdentity, userPostalAddress } = params;
        if (userIdentity === undefined) {
            throw new Error("User Identity is mandatory for an Identity LOC")
        }
        if (userPostalAddress === undefined) {
            throw new Error("User Postal Address is mandatory for an Identity LOC")
        }
        return this.requestLoc({
            ...params,
            locType: "Identity"
        });
    }

    async requestLoc(params: CreateLocRequestParams & { locType: LocType }): Promise<DraftRequest | PendingRequest> {
        const { legalOfficer, locType, description, userIdentity, userPostalAddress, company, draft } = params;
        const client = LocMultiClient.newLocMultiClient(this.sharedState).newLocClient(legalOfficer);
        const request = await client.createLocRequest({
            ownerAddress: legalOfficer.address,
            requesterAddress: this.sharedState.currentAddress || "",
            description,
            locType,
            userIdentity,
            userPostalAddress,
            company,
            draft,
        });
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        if(draft) {
            return new DraftRequest(locSharedState, request).veryNew(); // Discards this state
        } else {
            return new PendingRequest(locSharedState, request).veryNew(); // Discards this state
        }
    }

    async refresh(params?: FetchAllLocsParams): Promise<LocsState> {
        return this.discardOnSuccess(() => this._refresh(params));
    }

    private async _refresh(params?: FetchAllLocsParams): Promise<LocsState> {
        const locsState = new LocsState(this.sharedState, {}, this._client);
        const refreshedLocs: Record<string, LocRequestState> = {};
        const locMultiClient = LocMultiClient.newLocMultiClient(this.sharedState);
        const locRequests = await locMultiClient.fetchAll(params);
        for (const locRequest of locRequests) {
            const legalOfficer = this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === locRequest.ownerAddress)
            if (legalOfficer) {
                const client = locMultiClient.newLocClient(legalOfficer);
                const locSharedState: LocSharedState = {
                    ...this.sharedState,
                    legalOfficer,
                    client,
                    locsState,
                };
                const state = await LocRequestState.createFromRequest(locSharedState, locRequest)
                refreshedLocs[state.locId.toString()] = state;
            } else {
                console.error("Can not find owner %s of LOC %S among LO list", locRequest.ownerAddress, locRequest.id)
            }
        }
        locsState._locs = refreshedLocs;
        return locsState;
    }

    get client(): LogionClient {
        return this._client;
    }
}

interface LocSharedState extends SharedState {
    legalOfficer: LegalOfficer;
    client: AuthenticatedLocClient;
    locsState: LocsState;
}

export interface CreateLocRequestParams {
    legalOfficer: LegalOfficer;
    description: string;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
    draft: boolean;
}

export interface CreateSofRequestParams {
    itemId: string;
}

export interface CheckHashResult {
    file?: MergedFile;
    metadataItem?: MergedMetadataItem;
    collectionItem?: CollectionItemClass;
    collectionItemFile?: ItemFile;
}

export type AnyLocState = OffchainLocState | OnchainLocState;

export type OffchainLocState = DraftRequest | PendingRequest | RejectedRequest;

export type OnchainLocState = OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc;

export abstract class LocRequestState extends State {

    protected readonly locSharedState: LocSharedState;
    protected readonly request: LocRequest;
    protected readonly legalOfficerCase?: LegalOfficerCase;

    constructor(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase?: LegalOfficerCase) {
        super();
        this.locSharedState = locSharedState;
        this.request = request;
        this.legalOfficerCase = legalOfficerCase;
    }

    get locId(): UUID {
        return new UUID(this.request.id);
    }

    static async createFromRequest(locSharedState: LocSharedState, request: LocRequest): Promise<AnyLocState> {
        switch (request.status) {
            case "DRAFT":
                return new DraftRequest(locSharedState, request)
            case "REQUESTED":
                return new PendingRequest(locSharedState, request)
            case "REJECTED":
                return new RejectedRequest(locSharedState, request)
            default:
                return LocRequestState.refreshLoc(locSharedState, request)
        }
    }

    static async createFromLoc(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase): Promise<OnchainLocState> {
        return await LocRequestState.refreshLoc(locSharedState, request, legalOfficerCase) as OnchainLocState;
    }

    private static async refreshLoc(locSharedState: LocSharedState, request: LocRequest, loc?: LegalOfficerCase): Promise<OnchainLocState> {
        const legalOfficerCase: LegalOfficerCase = loc ? loc : await locSharedState.client.getLoc({ locId: new UUID(request.id) });
        if (legalOfficerCase.voidInfo) {
            if (legalOfficerCase.locType === 'Collection') {
                return new VoidedCollectionLoc(locSharedState, request, legalOfficerCase);
            } else {
                return new VoidedLoc(locSharedState, request, legalOfficerCase);
            }
        } else if (legalOfficerCase.closed) {
            if (legalOfficerCase.locType === 'Collection') {
                return new ClosedCollectionLoc(locSharedState, request, legalOfficerCase);
            } else {
                return new ClosedLoc(locSharedState, request, legalOfficerCase);
            }
        } else {
            return new OpenLoc(locSharedState, request, legalOfficerCase);
        }
    }

    async refresh(): Promise<LocRequestState> {
        const client = this.locSharedState.client;
        const request = await client.getLocRequest({ locId: this.locId });
        const newState = await LocRequestState.createFromRequest(this.locSharedState, request);
        const newLocsState = this.locSharedState.locsState.refreshWith(newState); // Discards this state
        return newLocsState.findById(this.locId);
    }

    locsState(): LocsState {
        this.ensureCurrent();
        return this.locSharedState.locsState;
    }

    data(): LocData {
        this.ensureCurrent();
        return LocRequestState.buildLocData(this.legalOfficerCase, this.request);
    }

    static buildLocData(legalOfficerCase: LegalOfficerCase | undefined, request: LocRequest): LocData {
        if (legalOfficerCase) {
            return LocRequestState.dataFromRequestAndLoc(request, legalOfficerCase);
        } else {
            return LocRequestState.dataFromRequest(request);
        }
    }

    async supersededLoc(): Promise<VoidedLoc | undefined> {
        this.ensureCurrent();
        const superseded = this.data().replacerOf;
        if (superseded) {
            return this.locSharedState.locsState.findById(superseded) as VoidedLoc;
        }
        return undefined;
    }

    isLogionIdentity(): boolean {
        this.ensureCurrent();
        const loc = this.data();
        return loc.locType === 'Identity' && !loc.requesterAddress && !loc.requesterLocId;
    }

    isLogionData(): boolean {
        this.ensureCurrent();
        const loc = this.data();
        return loc.locType !== 'Identity' && (loc.requesterLocId !== undefined && loc.requesterLocId !== null);
    }

    async checkHash(hash: string): Promise<CheckHashResult> {
        this.ensureCurrent();
        return LocRequestState.checkHash(this.data(), hash);
    }

    static checkHash(loc: LocData, hash: string): CheckHashResult {
        const result: CheckHashResult = {};

        for (const file of loc.files) {
            if (file.hash === hash) {
                result.file = file;
            }
        }

        for (const item of loc.metadata) {
            if (item.value === hash) {
                result.metadataItem = item;
            }
        }

        return result;
    }

    private static dataFromRequest(request: LocRequest): LocData {
        return {
            ...request,
            requesterAddress: request.requesterAddress || undefined,
            id: new UUID(request.id),
            closed: false,
            replacerOf: undefined,
            voidInfo: undefined,
            identityLocId: request.identityLoc ? new UUID(request.identityLoc) : undefined,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(item)),
            files: request.files.map(item => LocRequestState.mergeFile(item)),
            links: request.links.map(item => LocRequestState.mergeLink(item)),
        };
    }

    private static dataFromRequestAndLoc(request: LocRequest, loc: LegalOfficerCase): LocData {
        const data: LocData = {
            ...loc,
            id: new UUID(request.id),
            ownerAddress: loc.owner,
            closedOn: request.closedOn,
            createdOn: request.createdOn,
            decisionOn: request.decisionOn,
            description: request.description,
            rejectReason: request.rejectReason,
            status: request.status,
            identityLocId: request.identityLoc ? new UUID(request.identityLoc) : undefined,
            userIdentity: request.userIdentity,
            userPostalAddress: request.userPostalAddress,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(item, loc)),
            files: request.files.map(item => LocRequestState.mergeFile(item, loc)),
            links: request.links.map(item => LocRequestState.mergeLink(item, loc)),
            seal: loc.closed ? loc.seal : request.seal,
            company: request.company,
            verifiedThirdParty: request.verifiedThirdParty,
        };

        if(data.voidInfo && request.voidInfo) {
            data.voidInfo.reason = request.voidInfo.reason;
            data.voidInfo.voidedOn = request.voidInfo.voidedOn;
        }

        return data;
    }

    private static mergeMetadata(backendMetadataItem: LocMetadataItem, chainLoc?: LegalOfficerCase): MergedMetadataItem {
        const chainMetadataItem = chainLoc ? chainLoc.metadata.find(item => item.name === backendMetadataItem.name) : undefined;
        if(chainMetadataItem) {
            return {
                ...backendMetadataItem,
                ...chainMetadataItem,
                published: true,
            };
        } else {
            return {
                ...backendMetadataItem,
                published: false,
            };
        }
    }

    private static mergeFile(backendFile: LocFile, chainLoc?: LegalOfficerCase): MergedFile {
        const chainFile = chainLoc ? chainLoc.files.find(item => item.hash === backendFile.hash) : undefined;
        if(chainFile) {
            return {
                ...backendFile,
                ...chainFile,
                published: true,
            };
        } else {
            return {
                ...backendFile,
                published: false,
            }
        }
    }

    private static mergeLink(backendLink: LocLink, chainLoc?: LegalOfficerCase): MergedLink {
        const chainLink = chainLoc ? chainLoc.links.find(link => link.id.toString() === backendLink.target) : undefined;
        const targetLink = new UUID(backendLink.target);
        if(chainLink) {
            return {
                ...backendLink,
                ...chainLink,
                id: targetLink,
                published: true,
            };
        } else {
            return {
                ...backendLink,
                id: targetLink,
                published: false,
            }
        }
    }

    abstract withLocs(locsState: LocsState): LocRequestState;

    protected _withLocs<T extends LocRequestState>(locsState: LocsState, constructor: new (locSharedState: LocSharedState, request: LocRequest, legalOfficerCase?: LegalOfficerCase) => T): T {
        return this.syncDiscardOnSuccess(() => new constructor({
            ...this.locSharedState,
            locsState
        }, this.request, this.legalOfficerCase));
    }
}

export abstract class EditableRequest extends LocRequestState {

    async addMetadata(params: AddMetadataParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.addMetadata({
            locId: this.locId,
            ...params
        });
        return await this.refresh() as EditableRequest;
    }

    async addFile(params: AddFileParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.addFile({
            locId: this.locId,
            ...params
        });
        return await this.refresh() as EditableRequest;
    }

    async deleteMetadata(params: DeleteMetadataParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.deleteMetadata({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as EditableRequest
    }

    async deleteFile(params: DeleteFileParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.deleteFile({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as EditableRequest
    }
}

export class DraftRequest extends EditableRequest {

    veryNew(): PendingRequest {
        const newLocsState = this.locsState().refreshWith(this);
        return newLocsState.findById(this.locId) as DraftRequest;
    }

    override async refresh(): Promise<DraftRequest> {
        return await super.refresh() as DraftRequest;
    }

    async submit(): Promise<PendingRequest> {
        await this.locSharedState.client.submit(this.locId);
        const request: LocRequest = {
            ...this.request,
            status: "REQUESTED",
        };
        const tempPending = new PendingRequest(this.locSharedState, request);
        const newLocsState = this.locSharedState.locsState.refreshWith(tempPending); // Discards this state
        return newLocsState.findById(this.locId) as PendingRequest;
    }

    async cancel(): Promise<LocsState> {
        this.ensureCurrent();
        await this.locSharedState.client.cancel(this.locId);
        this.discard();
        return this.locSharedState.locsState.refreshWithout(this.locId);
    }

    override withLocs(locsState: LocsState): DraftRequest {
        return this._withLocs(locsState, DraftRequest);
    }
}

export class PendingRequest extends LocRequestState {

    veryNew(): PendingRequest {
        const newLocsState = this.locsState().refreshWith(this);
        return newLocsState.findById(this.locId) as PendingRequest;
    }

    override withLocs(locsState: LocsState): PendingRequest {
        return this._withLocs(locsState, PendingRequest);
    }
}

export class RejectedRequest extends LocRequestState {

    async cancel(): Promise<LocsState> {
        this.ensureCurrent();
        await this.locSharedState.client.cancel(this.locId);
        this.discard();
        return this.locSharedState.locsState.refreshWithout(this.locId);
    }

    async rework(): Promise<DraftRequest> {
        await this.locSharedState.client.rework(this.locId);
        const request: LocRequest = {
            ...this.request,
            status: "DRAFT",
        };
        const tempDraft = new DraftRequest(this.locSharedState, request);
        const newLocsState = this.locSharedState.locsState.refreshWith(tempDraft); // Discards this state
        return newLocsState.findById(this.locId) as DraftRequest;
    }

    override withLocs(locsState: LocsState): RejectedRequest {
        return this._withLocs(locsState, RejectedRequest);
    }
}

export class OpenLoc extends EditableRequest {

    async requestSof(): Promise<PendingRequest> {
        return requestSof(this.locSharedState, this.locId);
    }

    override async refresh(): Promise<OnchainLocState> {
        return await super.refresh() as OnchainLocState;
    }

    override withLocs(locsState: LocsState): OpenLoc {
        return this._withLocs(locsState, OpenLoc);
    }
}

export class ClosedLoc extends LocRequestState {

    async requestSof(): Promise<PendingRequest> {
        return requestSof(this.locSharedState, this.locId);
    }

    override async refresh(): Promise<ClosedLoc | VoidedLoc> {
        return await super.refresh() as ClosedLoc | VoidedLoc;
    }

    override withLocs(locsState: LocsState): ClosedLoc {
        return this._withLocs(locsState, ClosedLoc);
    }
}

export async function getCollectionItem(parameters: { locClient: LocClient, locId: UUID, itemId: string }): Promise<CollectionItemClass | undefined> {
    const { locId, itemId, locClient } = parameters;
        const clientItem = await locClient.getCollectionItem({
            locId,
            itemId
        });
        if(clientItem) {
            return new CollectionItemClass({
                locId,
                locClient,
                clientItem,
            });
        } else {
            return undefined;
        }
}

abstract class ClosedOrVoidCollectionLoc extends LocRequestState {

    async getCollectionItem(parameters: { itemId: string }): Promise<CollectionItemClass | undefined> {
        this.ensureCurrent();
        return getCollectionItem({
            locClient: this.locSharedState.client,
            locId: this.locId,
            itemId: parameters.itemId,
        });
    }

    async getCollectionItems(): Promise<CollectionItemClass[]> {
        this.ensureCurrent();
        const clientItems = await this.locSharedState.client.getCollectionItems({
            locId: this.locId,
        });
        return clientItems.map(clientItem => new CollectionItemClass({
            locId: this.locId,
            locClient: this.locSharedState.client,
            clientItem,
        }));
    }

    override async checkHash(hash: string): Promise<CheckHashResult> {
        this.ensureCurrent();
        const result = await super.checkHash(hash);
        const collectionItem = await this.getCollectionItem({ itemId: hash });
        return {
            ...result,
            collectionItem
        };
    }

    async size(): Promise<number | undefined> {
        this.ensureCurrent();
        const client = this.locSharedState.client;
        return await client.getCollectionSize({
            locId: this.locId
        })
    }
}

export interface UploadCollectionItemFileParams {
    itemId: string,
    itemFile: ItemFileWithContent,
}

export class ClosedCollectionLoc extends ClosedOrVoidCollectionLoc {

    async addCollectionItem(parameters: AddCollectionItemParams): Promise<ClosedCollectionLoc> {
        this.ensureCurrent();
        const client = this.locSharedState.client;
        if(parameters.itemFiles
            && parameters.itemFiles.length > 0
            && (!this.legalOfficerCase?.collectionCanUpload || false)) {
            throw new Error("This Collection LOC does not allow uploading files with items");
        }
        await client.addCollectionItem({
            locId: this.locId,
            ...parameters
        })
        return this;
    }

    async uploadCollectionItemFile(parameters: UploadCollectionItemFileParams): Promise<ClosedCollectionLoc> {
        this.ensureCurrent();
        const client = this.locSharedState.client;
        await client.uploadItemFile({
            locId: this.locId,
            itemId: parameters.itemId,
            file: parameters.itemFile,
        })
        return this;
    }

    async requestSof(params: CreateSofRequestParams): Promise<PendingRequest> {
        return requestSof(this.locSharedState, this.locId, params.itemId);
    }

    async refresh(): Promise<ClosedCollectionLoc | VoidedLoc> {
        return await super.refresh() as ClosedCollectionLoc | VoidedLoc;
    }

    override withLocs(locsState: LocsState): ClosedCollectionLoc {
        return this._withLocs(locsState, ClosedCollectionLoc);
    }
}

async function requestSof(locSharedState: LocSharedState, locId: UUID, itemId?: string): Promise<PendingRequest> {
    const client = locSharedState.client;
    const locRequest = await client.createSofRequest({ locId, itemId });
    return new PendingRequest(locSharedState, locRequest).veryNew(); // Discards this state
}

export class VoidedLoc extends LocRequestState {

    async replacerLoc(): Promise<OpenLoc | ClosedLoc | VoidedLoc | undefined> {
        this.ensureCurrent();
        const replacer = this.data().voidInfo?.replacer;
        if (replacer) {
            return this.locSharedState.locsState.findById(replacer) as OpenLoc | ClosedLoc | VoidedLoc;
        }
        return undefined;
    }

    async refresh(): Promise<VoidedLoc> {
        return await super.refresh() as VoidedLoc;
    }

    override withLocs(locsState: LocsState): VoidedLoc {
        return this._withLocs(locsState, VoidedLoc);
    }
}

export class VoidedCollectionLoc extends ClosedOrVoidCollectionLoc {

    async replacerLoc(): Promise<OpenLoc | ClosedCollectionLoc | VoidedCollectionLoc | undefined> {
        this.ensureCurrent();
        const replacer = this.data().voidInfo?.replacer;
        if (replacer) {
            return this.locSharedState.locsState.findById(replacer) as OpenLoc | ClosedCollectionLoc | VoidedCollectionLoc;
        }
        return undefined;
    }

    async refresh(): Promise<VoidedCollectionLoc> {
        return await super.refresh() as VoidedCollectionLoc;
    }

    override withLocs(locsState: LocsState): VoidedCollectionLoc {
        return this._withLocs(locsState, VoidedCollectionLoc);
    }
}
