import { UUID, LegalOfficerCase, CollectionItem, LocType, VoidInfo } from "@logion/node-api";

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
    LocRequestStatus,
    Published,
    AddedOn,
    ItemFileWithContent,
    AuthenticatedLocClient,
} from "./LocClient";
import { SharedState } from "./SharedClient";
import { LegalOfficer, UserIdentity, PostalAddress } from "./Types";
import { CollectionItem as CollectionItemClass } from './CollectionItem';

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
    userPostalAddress?: PostalAddress;
    collectionLastBlockSubmission?: bigint;
    collectionMaxSize?: number;
    collectionCanUpload?: boolean;
    files: MergedFile[];
    metadata: MergedMetadataItem[];
    links: MergedLink[];
    seal?: string;
}

export interface MergedLink extends LocLink, Published {
}

export interface MergedFile extends LocFile, Published {
}

export interface MergedMetadataItem extends LocMetadataItem, Published {
}

export class LocsState {
    private readonly sharedState: SharedState;
    private readonly _locs: Record<string, LocRequestState>;

    constructor(sharedState: SharedState, locs: Record<string, LocRequestState>) {
        this.sharedState = sharedState;
        this._locs = locs;
    }

    get openLocs(): Record<LocType, OpenLoc[]> {
        return this.withPredicate(loc => loc instanceof OpenLoc);
    }

    get closedLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        return this.withPredicate(loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }

    get voidedLocs(): Record<LocType, (VoidedLoc | VoidedCollectionLoc)[]> {
        return this.withPredicate(loc => loc instanceof VoidedLoc || loc instanceof VoidedCollectionLoc);
    }

    get pendingRequests(): Record<LocType, PendingRequest[]> {
        return this.withPredicate(loc => loc instanceof PendingRequest);
    }

    get rejectedRequests(): Record<LocType, RejectedRequest[]> {
        return this.withPredicate(loc => loc instanceof RejectedRequest);
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
        const refreshedLocs: Record<string, LocRequestState> = { ...this._locs };
        refreshedLocs[loc.locId.toString()] = loc;
        return new LocsState(this.sharedState, refreshedLocs);
    }

    static async getInitialLocsState(sharedState: SharedState): Promise<LocsState> {
        return new LocsState(sharedState, {}).refresh();
    }

    async findById(params: FetchParameters): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc | undefined> {
        const locMultiClient = LocMultiClient.newLocMultiClient(this.sharedState);
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

    async requestIdentityLoc(params: CreateLocRequestParams): Promise<PendingRequest> {
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

    async requestLoc(params: CreateLocRequestParams & { locType: LocType }): Promise<PendingRequest> {
        const { legalOfficer, locType, description, userIdentity, userPostalAddress } = params;
        const client = LocMultiClient.newLocMultiClient(this.sharedState).newLocClient(legalOfficer);
        const request = await client.createLocRequest({
            ownerAddress: legalOfficer.address,
            requesterAddress: this.sharedState.currentAddress || "",
            description,
            locType,
            userIdentity,
            userPostalAddress,
        });
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        return new PendingRequest(locSharedState, request).veryNew();
    }

    async refresh(): Promise<LocsState> {
        const refreshedLocs: Record<string, LocRequestState> = {};
        const locMultiClient = LocMultiClient.newLocMultiClient(this.sharedState);
        const locRequests = await locMultiClient.fetchAll();
        for (const locRequest of locRequests) {
            const legalOfficer = this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === locRequest.ownerAddress)
            if (legalOfficer) {
                const client = locMultiClient.newLocClient(legalOfficer);
                const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
                const state = await LocRequestState.createFromRequest(locSharedState, locRequest)
                refreshedLocs[state.locId.toString()] = state;
            } else {
                console.error("Can not find owner %s of LOC %S among LO list", locRequest.ownerAddress, locRequest.id)
            }
        }
        return new LocsState(this.sharedState, refreshedLocs);
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
}

export interface CreateSofRequestParams {
    itemId: string;
}

export interface CheckHashResult {
    file?: MergedFile;
    metadataItem?: MergedMetadataItem;
    collectionItem?: CollectionItemClass;
}

export class LocRequestState {

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
        const locSharedState = { ...this.locSharedState, locsState: this.locSharedState.locsState.refreshWith(this) };
        return LocRequestState.createFromRequest(locSharedState, request);
    }

    locsState(): LocsState {
        return this.locSharedState.locsState;
    }

    data(): LocData {
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
            userIdentity: request.userIdentity,
            userPostalAddress: request.userPostalAddress,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(item, loc)),
            files: request.files.map(item => LocRequestState.mergeFile(item, loc)),
            links: request.links.map(item => LocRequestState.mergeLink(item, loc)),
            seal: loc.closed ? loc.seal : request.seal,
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
}

export class PendingRequest extends LocRequestState {

    veryNew(): PendingRequest {
        return new PendingRequest(
            {...this.locSharedState, locsState: this.locsState().refreshWith(this) },
            this.request
        )
    }
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
        return await this.refresh() as OpenLoc
    }

    async requestSof(): Promise<PendingRequest> {
        const client = this.locSharedState.client;
        const locRequest = await client.createSofRequest({ locId: this.locId });
        return new PendingRequest(this.locSharedState, locRequest).veryNew();
    }

    override async refresh(): Promise<OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc> {
        return await super.refresh() as OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc;
    }
}

export class ClosedLoc extends LocRequestState {

    async requestSof(): Promise<PendingRequest> {
        const client = this.locSharedState.client;
        const locRequest = await client.createSofRequest({ locId: this.locId });
        return new PendingRequest(this.locSharedState, locRequest).veryNew();
    }

    override async refresh(): Promise<ClosedLoc | VoidedLoc> {
        return await super.refresh() as ClosedLoc | VoidedLoc;
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

class ClosedOrVoidCollectionLoc extends LocRequestState {

    async getCollectionItem(parameters: { itemId: string }): Promise<CollectionItemClass | undefined> {
        return getCollectionItem({
            locClient: this.locSharedState.client,
            locId: this.locId,
            itemId: parameters.itemId,
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

    async size(): Promise<number | undefined> {
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
        const client = this.locSharedState.client;
        await client.uploadItemFile({
            locId: this.locId,
            itemId: parameters.itemId,
            file: parameters.itemFile,
        })
        return this;
    }

    async requestSof(params: CreateSofRequestParams): Promise<PendingRequest> {
        const client = this.locSharedState.client;
        const locRequest = await client.createSofRequest({
            locId: this.locId,
            itemId: params.itemId
        })
        return new PendingRequest(this.locSharedState, locRequest).veryNew();
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
