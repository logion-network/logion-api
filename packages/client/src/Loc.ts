import { LegalOfficerCase, DataLocType, CollectionItem, LocType, VoidInfo } from '@logion/node-api/dist/Types';
import {
    LocRequest,
    LocClient,
    AddMetadataParams,
    DeleteMetadataParams,
    LocMultiClient,
    LocLink,
    LocMetadataItem,
    LocFile,
    FetchParameters,
    AddFileParams,
    DeleteFileParams,
    AddCollectionItemParams,
    LocRequestVoidInfo,
    LocRequestStatus, Published, AddedOn
} from "./LocClient";
import { SharedState } from "./SharedClient";
import { LegalOfficer, UserIdentity } from "./Types";
import { UUID } from "@logion/node-api";

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
    userIdentity?: UserIdentity;
    collectionLastBlockSubmission?: bigint;
    collectionMaxSize?: number;
    files: MergedFile[];
    metadata: MergedMetadataItem[];
    links: MergedLink[];
}

export type MergedCollectionItem = CollectionItem & Partial<AddedOn>

export interface MergedLink extends LocLink, Published {
}

export interface MergedFile extends LocFile, Published {
}

export interface MergedMetadataItem extends LocMetadataItem, Published {
}

export class LocsState {
    private readonly sharedState: SharedState;
    readonly openLocs: Record<DataLocType, OpenLoc[]>;
    readonly closedLocs: Record<DataLocType, (ClosedLoc | ClosedCollectionLoc)[]>;
    readonly voidedLocs: Record<DataLocType, (VoidedLoc | VoidedCollectionLoc)[]>;
    readonly pendingRequests: Record<DataLocType, PendingRequest[]>;
    readonly rejectedRequests: Record<DataLocType, RejectedRequest[]>;

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
        this.openLocs = { "Transaction": [], "Collection": [] };
        this.closedLocs = { "Transaction": [], "Collection": [] };
        this.voidedLocs = { "Transaction": [], "Collection": [] };
        this.pendingRequests = { "Transaction": [], "Collection": [] };
        this.rejectedRequests = { "Transaction": [], "Collection": [] };
    }

    static async getInitialLocsState(sharedState: SharedState): Promise<LocsState> {
        return new LocsState(sharedState).refresh();
    }

    async findById(params: FetchParameters): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc | undefined> {
        const locMultiClient = newLocMultiClient(this.sharedState);
        const loc = await locMultiClient.getLoc(params);
        const legalOfficer = this.sharedState.legalOfficers.find(lo => lo.address === loc.owner)
        if (!legalOfficer) {
            return undefined;
        }
        const client = locMultiClient.newLocClient(legalOfficer);
        const locRequest = await client.getLocRequest(params);
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        return await LocRequestState.createFromLoc(locSharedState, locRequest, loc);
    }

    async requestTransactionLoc(params: CreateLocRequestParams): Promise<PendingRequest> {
        return this.requestLoc({
            ...params,
            locType: "Transaction"
        });
    }

    async requestCollectionLoc(params: CreateLocRequestParams): Promise<PendingRequest> {
        return this.requestLoc({
            ...params,
            locType: "Collection"
        });
    }

    async requestLoc(params: CreateLocRequestParams & { locType: DataLocType }): Promise<PendingRequest> {
        const { legalOfficer, locType } = params;
        const client = newLocMultiClient(this.sharedState).newLocClient(legalOfficer);
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        const request = await client.createLocRequest({
            ownerAddress: legalOfficer.address,
            requesterAddress: locSharedState.currentAddress!,
            ...params
        });
        const pendingRequest = new PendingRequest(locSharedState, request);
        this.pendingRequests[locType].push(pendingRequest);
        return pendingRequest;
    }

    async refresh(): Promise<LocsState> {
        const refreshed = new LocsState(this.sharedState);
        const locMultiClient = newLocMultiClient(this.sharedState);
        const locRequests = await locMultiClient.fetchAll();
        for (let locRequest of locRequests) {
            const legalOfficer = this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === locRequest.ownerAddress)
            if (legalOfficer) {
                const client = locMultiClient.newLocClient(legalOfficer);
                const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
                const state = await LocRequestState.createFromRequest(locSharedState, locRequest)
                const type: DataLocType | null = locRequest.locType === 'Identity' ? null : locRequest.locType;
                if (type) {
                    if (state instanceof OpenLoc) {
                        refreshed.openLocs[type].push(state);
                    } else if (state instanceof ClosedLoc || state instanceof ClosedCollectionLoc) {
                        refreshed.closedLocs[type].push(state);
                    } else if (state instanceof VoidedLoc || state instanceof VoidedCollectionLoc) {
                        refreshed.voidedLocs[type].push(state);
                    } else if (state instanceof PendingRequest) {
                        refreshed.pendingRequests[type].push(state);
                    } else if (state instanceof RejectedRequest) {
                        refreshed.rejectedRequests[type].push(state);
                    }
                }
            } else {
                console.error("Can not find owner %s of LOC %S among LO list", locRequest.ownerAddress, locRequest.id)
            }
        }
        return refreshed;
    }
}

interface LocSharedState extends SharedState {
    legalOfficer: LegalOfficer
    client: LocClient
    locsState: LocsState
}

export interface CreateLocRequestParams {
    legalOfficer: LegalOfficer;
    description: string;
    userIdentity?: UserIdentity;
}

export interface CreateSofRequestParams {
    itemId: string;
}

export interface CheckHashResult {
    file?: MergedFile;
    metadataItem?: MergedMetadataItem;
    collectionItem?: CollectionItem;
}

class LocRequestState {

    protected readonly locSharedState: LocSharedState;
    protected readonly request: LocRequest;
    protected readonly legalOfficerCase?: LegalOfficerCase;

    constructor(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase?: LegalOfficerCase) {
        this.locSharedState = locSharedState;
        this.request = request;
        this.legalOfficerCase = legalOfficerCase;
    }

    get locId(): UUID {
        return new UUID(this.request.id);
    }

    static async createFromRequest(locSharedState: LocSharedState, request: LocRequest): Promise<PendingRequest | RejectedRequest | OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc> {
        switch (request.status) {
            case "REQUESTED":
                return new PendingRequest(locSharedState, request)
            case "REJECTED":
                return new RejectedRequest(locSharedState, request)
            default:
                return new LocRequestState(locSharedState, request).refreshLoc()
        }
    }

    static async createFromLoc(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc> {
        return await new LocRequestState(locSharedState, request).refreshLoc(legalOfficerCase) as OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc;
    }

    private async refreshLoc(loc?: LegalOfficerCase): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc> {
        const legalOfficerCase: LegalOfficerCase = loc ? loc : await this.locSharedState.client.getLoc({ locId: this.locId });
        if (legalOfficerCase.voidInfo) {
            if (legalOfficerCase.locType === 'Collection') {
                return new VoidedCollectionLoc(this.locSharedState, this.request, legalOfficerCase);
            } else {
                return new VoidedLoc(this.locSharedState, this.request, legalOfficerCase);
            }
        } else if (legalOfficerCase.closed) {
            if (legalOfficerCase.locType === 'Collection') {
                return new ClosedCollectionLoc(this.locSharedState, this.request, legalOfficerCase);
            } else {
                return new ClosedLoc(this.locSharedState, this.request, legalOfficerCase);
            }
        } else {
            return new OpenLoc(this.locSharedState, this.request, legalOfficerCase);
        }
    }

    async refresh(): Promise<PendingRequest | RejectedRequest | OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc> {
        const client = this.locSharedState.client;
        const request = await client.getLocRequest({ locId: this.locId });
        return LocRequestState.createFromRequest(this.locSharedState, request);
    }

    locsState(): LocsState {
        return this.locSharedState.locsState;
    }

    data(): LocData {
        if (this.legalOfficerCase) {
            return this.dataFromRequestAndLoc(this.request, this.legalOfficerCase)
        } else {
            return this.dataFromRequest(this.request)
        }
    }

    async supersededLoc(): Promise<VoidedLoc | undefined> {
        const superseded = this.data().replacerOf;
        if (superseded) {
            return await this.locSharedState.locsState.findById({ locId: superseded }) as VoidedLoc;
        }
        return undefined;
    }

    isLogionIdentity(): boolean {
        const loc = this.data();
        return loc.locType === 'Identity' && !loc.requesterAddress && !loc.requesterLocId;
    }

    isLogionData(): boolean {
        const loc = this.data();
        return loc.locType !== 'Identity' && (loc.requesterLocId !== undefined && loc.requesterLocId !== null);
    }

    async checkHash(hash: string): Promise<CheckHashResult> {
        const loc = this.data();
        const result: CheckHashResult = {};

        for(const file of loc.files) {
            if(file.hash === hash) {
                result.file = file;
            }
        }

        for(const item of loc.metadata) {
            if(item.value === hash) {
                result.metadataItem = item;
            }
        }

        return result;
    }

    private dataFromRequest(request: LocRequest): LocData {
        return {
            ...request,
            requesterAddress: request.requesterAddress || undefined,
            id: this.locId,
            closed: false,
            replacerOf: undefined,
            voidInfo: undefined,
            metadata: request.metadata.map(item => this.mergeMetadata(item)),
            files: request.files.map(item => this.mergeFile(item)),
            links: request.links.map(item => this.mergeLink(item)),
        };
    }

    private dataFromRequestAndLoc(request: LocRequest, loc: LegalOfficerCase): LocData {
        return {
            ...loc,
            id: this.locId,
            ownerAddress: loc.owner,
            closedOn: request.closedOn,
            createdOn: request.createdOn,
            decisionOn: request.decisionOn,
            description: request.description,
            rejectReason: request.rejectReason,
            status: request.status,
            userIdentity: request.userIdentity,
            metadata: request.metadata.map(item => this.mergeMetadata(item, loc)),
            files: request.files.map(item => this.mergeFile(item, loc)),
            links: request.links.map(item => this.mergeLink(item, loc)),
        };
    }

    private mergeMetadata(backendMetadataItem: LocMetadataItem, chainLoc?: LegalOfficerCase): MergedMetadataItem {
        const chainMetadataItem = chainLoc ? chainLoc.metadata.find(item => item.name === backendMetadataItem.name) : undefined;
        return {
            ...backendMetadataItem,
            published: chainMetadataItem !== undefined,
        }
    }

    private mergeFile(backendFile: LocFile, chainLoc?: LegalOfficerCase): MergedFile {
        const chainFile = chainLoc ? chainLoc.files.find(item => item.hash === backendFile.hash) : undefined;
        return {
            ...backendFile,
            name: backendFile?.name || "",
            published: chainFile !== undefined,
        }
    }

    private mergeLink(backendLink: LocLink, chainLoc?: LegalOfficerCase): MergedLink {
        const chainLink = chainLoc ? chainLoc.links.find(link => link.id.toString() === backendLink.target) : undefined;
        return {
            ...backendLink,
            id: new UUID(backendLink.target),
            published: chainLink !== undefined
        }
    }
}

export class PendingRequest extends LocRequestState {
}

export class RejectedRequest extends LocRequestState {
}

export class OpenLoc extends LocRequestState {

    async addMetadata(params: AddMetadataParams): Promise<OpenLoc> {
        const client = this.locSharedState.client;
        await client.addMetadata({
            locId: this.locId,
            ...params
        });
        return await this.refresh() as OpenLoc;
    }

    async addFile(params: AddFileParams): Promise<{ state: OpenLoc, hash: string }> {
        const client = this.locSharedState.client;
        const { hash } = await client.addFile({
            locId: this.locId,
            ...params
        });
        const state = await this.refresh() as OpenLoc;
        return {
            state,
            hash
        }
    }

    async deleteMetadata(params: DeleteMetadataParams): Promise<OpenLoc> {
        const client = this.locSharedState.client;
        await client.deleteMetadata({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as OpenLoc
    }

    async deleteFile(params: DeleteFileParams): Promise<OpenLoc> {
        const client = this.locSharedState.client;
        await client.deleteFile({
            locId: this.locId,
            ...params
        })
        return this;
    }

    async requestSof(): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc> {
        const client = this.locSharedState.client;
        await client.createSofRequest({ locId : this.locId });
        return this.refresh();
    }

    override async refresh(): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc> {
        return await super.refresh() as OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc;
    }
}

export class ClosedLoc extends LocRequestState {

    async requestSof(): Promise<ClosedLoc | VoidedLoc> {
        const client = this.locSharedState.client;
        await client.createSofRequest({ locId : this.locId });
        return this.refresh();
    }

    override async refresh(): Promise<ClosedLoc | VoidedLoc> {
        return await super.refresh() as ClosedLoc | VoidedLoc;
    }
}

class ClosedOrVoidCollectionLoc extends LocRequestState {

    async getCollectionItem(parameters: {itemId: string}): Promise<CollectionItem | undefined> {
        const { itemId } = parameters;
        const client = this.locSharedState.client;
        return await client.getCollectionItem({
            locId: this.locId,
            itemId
        });
    }

    override async checkHash(hash: string): Promise<CheckHashResult> {
        const result = await super.checkHash(hash);
        const collectionItem = await this.getCollectionItem({ itemId: hash });
        return {
            ...result,
            collectionItem
        };
    }
}

export class ClosedCollectionLoc extends ClosedOrVoidCollectionLoc {

    async addCollectionItem(parameters: AddCollectionItemParams): Promise<ClosedCollectionLoc> {
        const client = this.locSharedState.client;
        await client.addCollectionItem({
            locId: this.locId,
            ...parameters
        })
        return this;
    }

    async requestSof(params: CreateSofRequestParams): Promise<ClosedCollectionLoc | VoidedLoc> {
        const client = this.locSharedState.client;
        await client.createSofRequest({
            locId: this.locId,
            itemId: params.itemId
        })
        return this.refresh();
    }

    async refresh(): Promise<ClosedCollectionLoc | VoidedLoc> {
        return await super.refresh() as ClosedCollectionLoc | VoidedLoc;
    }
}

export class VoidedLoc extends LocRequestState {

    async replacerLoc(): Promise<OpenLoc | ClosedLoc | VoidedLoc | undefined> {
        const replacer = this.data().voidInfo?.replacer;
        if (replacer) {
            return await this.locSharedState.locsState.findById({ locId: replacer }) as OpenLoc | ClosedLoc | VoidedLoc;
        }
        return undefined;
    }

    async refresh(): Promise<VoidedLoc> {
        return await super.refresh() as VoidedLoc;
    }
}

export class VoidedCollectionLoc extends ClosedOrVoidCollectionLoc {

    async replacerLoc(): Promise<OpenLoc | ClosedCollectionLoc | VoidedCollectionLoc | undefined> {
        const replacer = this.data().voidInfo?.replacer;
        if (replacer) {
            return await this.locSharedState.locsState.findById({ locId: replacer }) as OpenLoc | ClosedCollectionLoc | VoidedCollectionLoc;
        }
        return undefined;
    }

    async refresh(): Promise<VoidedCollectionLoc> {
        return await super.refresh() as VoidedCollectionLoc;
    }
}

function newLocMultiClient(sharedState: SharedState): LocMultiClient {
    return new LocMultiClient({
        axiosFactory: sharedState.axiosFactory,
        currentAddress: sharedState.currentAddress!,
        networkState: sharedState.networkState,
        token: sharedState.tokens.get(sharedState.currentAddress!)!.value,
        nodeApi: sharedState.nodeApi,
    });
}

