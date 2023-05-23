import {
    UUID,
    LegalOfficerCase,
    LocType,
    VoidInfo,
    ItemFile,
    ValidAccountId,
    LogionNodeApiClass,
    LocBatch,
} from "@logion/node-api";

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
    IdenfyVerificationSession,
    LocVerifiedIssuers,
    EMPTY_LOC_ISSUERS,
    AddTokensRecordParams,
    GetTokensRecordsRequest,
    FileInfo,
    ReviewFileParams,
    BlockchainSubmissionParams,
    mockPublishedItems,
    AckFileParams,
    ReviewMetadataParams,
    AckMetadataParams,
    AcceptCollectionLocParams,
} from "./LocClient.js";
import { SharedState } from "./SharedClient.js";
import { LegalOfficer, UserIdentity, PostalAddress, LegalOfficerClass } from "./Types.js";
import { CollectionItem as CollectionItemClass } from "./CollectionItem.js";
import { State } from "./State.js";
import { LogionClient } from "./LogionClient.js";
import { TokensRecord as TokensRecordClass } from "./TokensRecord.js";
import { downloadFile, TypedFile } from "./Http.js";
import { requireDefined } from "./assertions.js";

export interface LocData extends LocVerifiedIssuers {
    id: UUID
    ownerAddress: string;
    requesterAddress?: ValidAccountId;
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
    iDenfy?: IdenfyVerificationSession;
    voteId?: string;
    template?: string;
    sponsorshipId?: UUID;
}

export interface MergedLink extends LocLink, Published {
}

export interface MergedFile extends FileInfo, Published {
    submitter: ValidAccountId;
    size: bigint;
}

export interface MergedMetadataItem extends LocMetadataItem, Published {
    submitter: ValidAccountId;
}

export class LocsState extends State {
    private readonly sharedState: SharedState;
    private _locs: Record<string, LocRequestState>;
    private _verifiedIssuerLocs: Record<string, LocRequestState>;
    private readonly _client: LogionClient;

    constructor(
        sharedState: SharedState,
        locs: Record<string, LocRequestState>,
        client: LogionClient,
        verifiedIssuerLocs: Record<string, LocRequestState>
    ) {
        super();
        this.sharedState = sharedState;
        this._locs = locs;
        this._verifiedIssuerLocs = verifiedIssuerLocs;
        this._client = client;
    }

    get draftRequests(): Record<LocType, DraftRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof DraftRequest);
    }

    get openLocs(): Record<LocType, OpenLoc[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof OpenLoc);
    }

    get closedLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }

    get voidedLocs(): Record<LocType, (VoidedLoc | VoidedCollectionLoc)[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof VoidedLoc || loc instanceof VoidedCollectionLoc);
    }

    get pendingRequests(): Record<LocType, PendingRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof PendingRequest);
    }

    get rejectedRequests(): Record<LocType, RejectedRequest[]> {
        this.ensureCurrent();
        return this.withPredicate(this._locs, loc => loc instanceof RejectedRequest);
    }

    getLocRequestState(index: number): LocRequestState | undefined {
        const allLocs = Object.values(this._locs);
        if (index >= 0 && index < allLocs.length) {
            return allLocs[index];
        }
    }

    hasValidIdentityLoc(legalOfficer: LegalOfficer): boolean {
        this.ensureCurrent();
        return this.filter(this._locs, 'Identity', loc =>
            loc instanceof ClosedLoc &&
            loc.data().ownerAddress === legalOfficer.address
        ).length > 0;
    }

    get legalOfficersWithValidIdentityLoc(): LegalOfficerClass[] {
        this.ensureCurrent();
        return this.sharedState.legalOfficers.filter(lo => this.hasValidIdentityLoc(lo));
    }

    private withPredicate<T extends LocRequestState>(locs: Record<string, LocRequestState>, predicate: (l: LocRequestState) => boolean): Record<LocType, T[]> {
        return {
            'Transaction': this.filter(locs, 'Transaction', predicate),
            'Collection': this.filter(locs, 'Collection', predicate),
            'Identity': this.filter(locs, 'Identity', predicate),
        };
    }

    private filter<T extends LocRequestState>(locs: Record<string, LocRequestState>, locType: LocType, predicate: (loc: LocRequestState) => boolean): T[] {
        const filteredLocs = Object.values(locs)
            .filter(predicate)
            .filter(value => value.data().locType === locType)
        return filteredLocs as T[];
    }

    refreshWith(loc: LocRequestState): LocsState {
        return this.syncDiscardOnSuccess(() => this._refreshWith(loc));
    }

    private _refreshWith(loc: LocRequestState): LocsState {
        const locsState = new LocsState(this.sharedState, {}, this._client, {});
        const refreshedLocs = this.refreshStates(locsState, this._locs);
        const refreshedVerifiedIssuerLocs = this.refreshStates(locsState, this._verifiedIssuerLocs);
        if(this.isVerifiedIssuerLoc(loc)) {
            refreshedVerifiedIssuerLocs[loc.locId.toString()] = loc.withLocs(locsState);
        } else {
            refreshedLocs[loc.locId.toString()] = loc.withLocs(locsState);
        }
        locsState._locs = refreshedLocs;
        locsState._verifiedIssuerLocs = refreshedVerifiedIssuerLocs;
        return locsState;
    }

    private refreshStates(locsState: LocsState, states: Record<string, LocRequestState>): Record<string, LocRequestState> {
        const refreshedLocs: Record<string, LocRequestState> = {};
        for(const locId in states) {
            const state = states[locId];
            refreshedLocs[locId.toString()] = state.withLocs(locsState);
        }
        return refreshedLocs;
    }

    private isVerifiedIssuerLoc(loc: LocRequestState): boolean {
        return loc.locId.toString() in this._verifiedIssuerLocs;
    }

    refreshWithout(locId: UUID): LocsState {
        return this.syncDiscardOnSuccess(() => this._refreshWithout(locId));
    }

    private _refreshWithout(locId: UUID): LocsState {
        const refreshedLocs: Record<string, LocRequestState> = { ...this._locs };
        delete refreshedLocs[locId.toString()];
        const refreshedVerifiedIssuerLocs: Record<string, LocRequestState> = { ...this._verifiedIssuerLocs };
        delete refreshedVerifiedIssuerLocs[locId.toString()];
        return new LocsState(this.sharedState, refreshedLocs, this._client, refreshedVerifiedIssuerLocs);
    }

    static async getInitialLocsState(sharedState: SharedState, client: LogionClient, params?: FetchAllLocsParams): Promise<LocsState> {
        return new LocsState(sharedState, {}, client, {}).refresh(params);
    }

    findById(locId: UUID): LocRequestState {
        const loc = this.findByIdOrUndefined(locId);
        if(!loc) {
            throw new Error("LOC not found");
        } else {
            return loc;
        }
    }

    findByIdOrUndefined(locId: UUID): LocRequestState | undefined {
        this.ensureCurrent();
        const stringLocId = locId.toString();
        if(stringLocId in this._locs) {
            return this._locs[stringLocId];
        } else if(stringLocId in this._verifiedIssuerLocs) {
            return this._verifiedIssuerLocs[stringLocId];
        } else {
            return undefined;
        }
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
        if(this._client.currentAddress?.type === "Ethereum" && !params.sponsorshipId) {
            throw new Error("Identity LOC requests with an Ethereum address must be sponsored");
        }
        return this.requestLoc({
            ...params,
            locType: "Identity"
        });
    }

    async requestLoc(params: CreateLocRequestParams & { locType: LocType }): Promise<DraftRequest | PendingRequest> {
        const { legalOfficer, locType, description, userIdentity, userPostalAddress, company, draft, template, sponsorshipId } = params;
        const client = LocMultiClient.newLocMultiClient(this.sharedState).newLocClient(legalOfficer);
        const request = await client.createLocRequest({
            ownerAddress: legalOfficer.address,
            description,
            locType,
            userIdentity,
            userPostalAddress,
            company,
            draft,
            template,
            sponsorshipId: sponsorshipId?.toString(),
        });
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        if(draft) {
            return new DraftRequest(locSharedState, request, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
        } else {
            return new PendingRequest(locSharedState, request, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
        }
    }

    async refresh(params?: FetchAllLocsParams): Promise<LocsState> {
        return this.discardOnSuccess(() => this._refresh(params));
    }

    private async _refresh(params?: FetchAllLocsParams): Promise<LocsState> {
        const locsState = new LocsState(this.sharedState, {}, this._client, {});
        const locMultiClient = LocMultiClient.newLocMultiClient(this.sharedState);

        const locRequests = await locMultiClient.fetchAll(params);
        const locIds = locRequests
            .filter(request => request.status === "OPEN" || request.status === "CLOSED")
            .map(request => new UUID(request.id));
        const locBatch = await locMultiClient.getLocBatch(locIds);
        locsState._locs = await this.toStates(locMultiClient, locsState, locRequests, locBatch);

        if(locsState.isVerifiedIssuer) {
            const legalOfficers = this.getVerifiedIssuerLegalOfficers(locsState);
            const verifiedIssuerRequests = await locMultiClient.fetchAllForVerifiedIssuer(legalOfficers);
            const verifiedIssuerLocIds = verifiedIssuerRequests
                .filter(request => request.status === "OPEN" || request.status === "CLOSED")
                .map(request => new UUID(request.id));
            const verifiedIssuerLocBatch = await locMultiClient.getLocBatch(verifiedIssuerLocIds);
            locsState._verifiedIssuerLocs = await this.toStates(locMultiClient, locsState, verifiedIssuerRequests, verifiedIssuerLocBatch);
        }

        return locsState;
    }

    private async toStates(
        locMultiClient: LocMultiClient,
        locsState: LocsState,
        locRequests: LocRequest[],
        locBatch: LocBatch,
    ): Promise<Record<string, LocRequestState>> {
        const refreshedLocs: Record<string, LocRequestState> = {};
        for (const locRequest of locRequests) {
            try {
                const state = await this.toState(locMultiClient, locsState, locRequest, locBatch);
                refreshedLocs[state.locId.toString()] = state;
            } catch(e) {
                console.warn(e);
            }
        }
        return refreshedLocs;
    }

    private async toState(
        locMultiClient: LocMultiClient,
        locsState: LocsState,
        locRequest: LocRequest,
        locBatch: LocBatch,
    ): Promise<AnyLocState> {
        const legalOfficer = this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === locRequest.ownerAddress);
        if (legalOfficer) {
            const client = locMultiClient.newLocClient(legalOfficer);
            const locSharedState: LocSharedState = {
                ...this.sharedState,
                legalOfficer,
                client,
                locsState,
            };
            const id = new UUID(locRequest.id);
            const legalOfficerCases = await locBatch.getLocs();
            const legalOfficerCase = mockPublishedItems(id, legalOfficerCases[id.toDecimalString()]);
            const locIssuers = await client.getLocIssuers(locRequest, locBatch);
            if((locRequest.status === "OPEN" || locRequest.status === "CLOSED") && !legalOfficerCase) {
                throw new Error("LOC expected");
            }
            return LocRequestState.createFromRequest(locSharedState, locRequest, locIssuers, legalOfficerCase);
        } else {
            throw new Error(`Can not find owner ${ locRequest.ownerAddress } of LOC ${ locRequest.id } among LO list`);
        }
    }

    private getVerifiedIssuerLegalOfficers(locsState: LocsState): LegalOfficerClass[] {
        return locsState.closedLocs["Identity"]
            .filter(loc => loc.data().verifiedIssuer)
            .map(loc => loc.data().ownerAddress)
            .map(address => locsState.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === address))
            .filter(this.isDefinedLegalOfficer);
    }

    private isDefinedLegalOfficer(legalOfficer: LegalOfficerClass | undefined): legalOfficer is LegalOfficerClass {
        return legalOfficer !== undefined;
    }

    get client(): LogionClient {
        return this._client;
    }

    /**
     * Tells if current user is a Verified Issuer.
     * 
     * @returns True if it is, false otherwise.
     */
    get isVerifiedIssuer(): boolean {
        this.ensureCurrent();
        this._isVerifiedIssuer ||= this.computeIsVerifiedIssuer();
        return this._isVerifiedIssuer;
    }

    private _isVerifiedIssuer: boolean | undefined;

    private computeIsVerifiedIssuer(): boolean {
        return this.closedLocs["Identity"].find(loc => loc.data().verifiedIssuer
            && loc.data().requesterAddress?.address === this.sharedState.currentAddress?.address
            && loc.data().requesterAddress?.type === this.sharedState.currentAddress?.type) !== undefined;
    }

    get openVerifiedIssuerLocs(): Record<LocType, OpenLoc[]> {
        this.ensureCurrent();
        if(!this.isVerifiedIssuer) {
            throw new Error("Authenticated user is not a Verified Issuer");
        }
        return this.withPredicate(this._verifiedIssuerLocs, loc => loc instanceof OpenLoc);
    }

    get closedVerifiedIssuerLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        this.ensureCurrent();
        if(!this.isVerifiedIssuer) {
            throw new Error("Authenticated user is not a Verified Issuer");
        }
        return this.withPredicate(this._verifiedIssuerLocs, loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }
}

export interface LocSharedState extends SharedState {
    legalOfficer: LegalOfficerClass;
    client: AuthenticatedLocClient;
    locsState: LocsState;
}

export interface CreateLocRequestParams {
    legalOfficer: LegalOfficerClass;
    description: string;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
    draft: boolean;
    template?: string;
    sponsorshipId?: UUID;
}

export interface CreateSofRequestParams {
    itemId: string;
}

export interface CheckHashResult {
    file?: MergedFile;
    metadataItem?: MergedMetadataItem;
    collectionItem?: CollectionItemClass;
    collectionItemFile?: ItemFile;
    recordFile?: ItemFile;
}

export type AnyLocState = OffchainLocState | OnchainLocState;

export type OffchainLocState = DraftRequest | PendingRequest | RejectedRequest;

export type OnchainLocState = OpenLoc | ClosedLoc | ClosedCollectionLoc | VoidedLoc | VoidedCollectionLoc;

export abstract class LocRequestState extends State {

    protected readonly locSharedState: LocSharedState;
    protected readonly request: LocRequest;
    protected readonly legalOfficerCase?: LegalOfficerCase;
    protected readonly locIssuers: LocVerifiedIssuers;
    readonly owner: LegalOfficerClass;

    constructor(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase | undefined, locIssuers: LocVerifiedIssuers) {
        super();
        this.locSharedState = locSharedState;
        this.request = request;
        this.legalOfficerCase = legalOfficerCase;
        this.locIssuers = locIssuers;

        const owner = locSharedState.allLegalOfficers.find(officer => officer.address === request.ownerAddress);
        if(!owner) {
            throw new Error("LOC owner is not a registered legal officer");
        }
        this.owner = owner;
    }

    get locId(): UUID {
        return new UUID(this.request.id);
    }

    static async createFromRequest(locSharedState: LocSharedState, request: LocRequest, locIssuers: LocVerifiedIssuers, legalOfficerCase?: LegalOfficerCase): Promise<AnyLocState> {
        switch (request.status) {
            case "DRAFT":
                return new DraftRequest(locSharedState, request, undefined, locIssuers)
            case "REQUESTED":
                return new PendingRequest(locSharedState, request, undefined, locIssuers)
            case "REJECTED":
                return new RejectedRequest(locSharedState, request, undefined, locIssuers)
            default:
                return LocRequestState.refreshLoc(locSharedState, request, legalOfficerCase, locIssuers)
        }
    }

    static async createFromLoc(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase, locIssuers: LocVerifiedIssuers): Promise<OnchainLocState> {
        return await LocRequestState.refreshLoc(locSharedState, request, legalOfficerCase, locIssuers) as OnchainLocState;
    }

    private static async refreshLoc(locSharedState: LocSharedState, request: LocRequest, loc: LegalOfficerCase | undefined, locIssuers: LocVerifiedIssuers): Promise<OnchainLocState> {
        const legalOfficerCase: LegalOfficerCase = loc ? loc : await locSharedState.client.getLoc({ locId: new UUID(request.id) });
        if (legalOfficerCase.voidInfo) {
            if (legalOfficerCase.locType === 'Collection') {
                return new VoidedCollectionLoc(locSharedState, request, legalOfficerCase, locIssuers);
            } else {
                return new VoidedLoc(locSharedState, request, legalOfficerCase, locIssuers);
            }
        } else if (legalOfficerCase.closed) {
            if (legalOfficerCase.locType === 'Collection') {
                return new ClosedCollectionLoc(locSharedState, request, legalOfficerCase, locIssuers);
            } else {
                return new ClosedLoc(locSharedState, request, legalOfficerCase, locIssuers);
            }
        } else {
            return new OpenLoc(locSharedState, request, legalOfficerCase, locIssuers);
        }
    }

    async refresh(): Promise<LocRequestState> {
        const client = this.locSharedState.client;
        const request = await client.getLocRequest({ locId: this.locId });
        const locIssuers = await client.getLocIssuers(request, this.locSharedState.nodeApi.batch.locs([ this.locId ]));
        const newState = await LocRequestState.createFromRequest(this.locSharedState, request, locIssuers);
        const newLocsState = this.locSharedState.locsState.refreshWith(newState); // Discards this state
        return newLocsState.findById(this.locId);
    }

    locsState(): LocsState {
        this.ensureCurrent();
        return this.locSharedState.locsState;
    }

    data(): LocData {
        this.ensureCurrent();
        return LocRequestState.buildLocData(this.locSharedState.nodeApi, this.legalOfficerCase, this.request, this.locIssuers);
    }

    static buildLocData(api: LogionNodeApiClass, legalOfficerCase: LegalOfficerCase | undefined, request: LocRequest, locIssuers: LocVerifiedIssuers): LocData {
        if (legalOfficerCase) {
            return LocRequestState.dataFromRequestAndLoc(api, request, legalOfficerCase, locIssuers);
        } else {
            return LocRequestState.dataFromRequest(api, request, locIssuers);
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

    private static dataFromRequest(api: LogionNodeApiClass, request: LocRequest, locIssuers: LocVerifiedIssuers): LocData {
        return {
            ...request,
            ...locIssuers,
            requesterAddress: request.requesterAddress ? api.queries.getValidAccountId(request.requesterAddress.address, request.requesterAddress.type) : undefined,
            requesterLocId: request.requesterIdentityLoc ? new UUID(request.requesterIdentityLoc) : undefined,
            id: new UUID(request.id),
            closed: false,
            replacerOf: undefined,
            voidInfo: undefined,
            identityLocId: request.identityLoc ? new UUID(request.identityLoc) : undefined,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(api, item)),
            files: request.files.map(item => LocRequestState.mergeFile(api, item)),
            links: request.links.map(item => LocRequestState.mergeLink(item)),
            voteId: request.voteId ? request.voteId : undefined,
            sponsorshipId: request.sponsorshipId ? new UUID(request.sponsorshipId) : undefined,
        };
    }

    private static dataFromRequestAndLoc(api: LogionNodeApiClass, request: LocRequest, loc: LegalOfficerCase, locIssuers: LocVerifiedIssuers): LocData {
        const data: LocData = {
            ...loc,
            ...locIssuers,
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
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(api, item, loc)),
            files: request.files.map(item => LocRequestState.mergeFile(api, item, loc)),
            links: request.links.map(item => LocRequestState.mergeLink(item, loc)),
            seal: loc.closed ? loc.seal : request.seal,
            company: request.company,
            iDenfy: request.iDenfy,
            voteId: request.voteId ? request.voteId : undefined,
            template: request.template,
        };

        if(data.voidInfo && request.voidInfo) {
            data.voidInfo.reason = request.voidInfo.reason;
            data.voidInfo.voidedOn = request.voidInfo.voidedOn;
        }

        return data;
    }

    private static mergeMetadata(api: LogionNodeApiClass, backendMetadataItem: LocMetadataItem, chainLoc?: LegalOfficerCase): MergedMetadataItem {
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
                submitter: api.queries.getValidAccountId(backendMetadataItem.submitter.address, backendMetadataItem.submitter.type),
                published: false,
            };
        }
    }

    private static mergeFile(api: LogionNodeApiClass, backendFile: LocFile, chainLoc?: LegalOfficerCase): MergedFile {
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
                submitter: api.queries.getValidAccountId(backendFile.submitter.address, backendFile.submitter.type),
                size: BigInt(backendFile.size),
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

    protected _withLocs<T extends LocRequestState>(locsState: LocsState, constructor: new (locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase | undefined, locIssuers: LocVerifiedIssuers) => T): T {
        return this.syncDiscardOnSuccess(() => new constructor({
            ...this.locSharedState,
            locsState
        }, this.request, this.legalOfficerCase, this.locIssuers));
    }

    async getFile(hash: string): Promise<TypedFile> {
        return downloadFile(this.owner.buildAxiosToNode(), `/api/loc-request/${ this.request.id }/files/${ hash }`);
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

    async requestFileReview(hash: string): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.requestFileReview({
            locId: this.locId,
            hash,
        });
        return await this.refresh() as EditableRequest;
    }

    async requestMetadataReview(name: string): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.requestMetadataReview({
            locId: this.locId,
            name,
        });
        return await this.refresh() as EditableRequest;
    }

    get legalOfficer(): LegalOfficerEditableRequestCommands {
        return new LegalOfficerEditableRequestCommands({
            locId: this.locId,
            client: this.locSharedState.client,
            request: this,
        });
    }
}

/**
 * Encapsulated calls can be used only by a Logion Legal Officer.
 */
export class LegalOfficerEditableRequestCommands {

    constructor(args: {
        locId: UUID,
        client: AuthenticatedLocClient,
        request: EditableRequest,
    }) {
        this.locId = args.locId;
        this.client = args.client;
        this.request = args.request;
    }

    protected locId: UUID;

    protected client: AuthenticatedLocClient;

    protected request: EditableRequest;

    async reviewFile(params: ReviewFileParams): Promise<EditableRequest> {
        await this.client.reviewFile({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as EditableRequest;
    }

    async reviewMetadata(params: ReviewMetadataParams): Promise<EditableRequest> {
        await this.client.reviewMetadata({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as EditableRequest;
    }
}

export interface IdenfyVerificationCreation {
    successUrl: string;
    errorUrl: string;
    unverifiedUrl: string;
}

export class DraftRequest extends EditableRequest {

    veryNew(): DraftRequest {
        const newLocsState = this.locsState().refreshWith(this);
        return newLocsState.findById(this.locId) as DraftRequest;
    }

    override async refresh(): Promise<DraftRequest> {
        return await super.refresh() as DraftRequest;
    }

    async submit(): Promise<PendingRequest> {
        await this.locSharedState.client.submit(this.locId);
        return await super.refresh() as PendingRequest;
    }

    async cancel(): Promise<LocsState> {
        this.ensureCurrent();
        await this.locSharedState.client.cancel(this.locId);
        this.discard(undefined);
        return this.locSharedState.locsState.refreshWithout(this.locId);
    }

    isIDenfySessionInProgress(): boolean {
        return this.data().iDenfy?.redirectUrl !== undefined;
    }

    async startNewIDenfySession(request: IdenfyVerificationCreation): Promise<DraftRequest> {
        if(this.isIDenfySessionInProgress()) {
            throw new Error("An iDenfy session is already in progress");
        } else {
            const axios = this.locSharedState.legalOfficer.buildAxiosToNode();
            await axios.post(`/api/idenfy/verification-session/${ this.data().id.toString() }`, request);
            return this.refresh();
        }
    }

    get iDenfySessionUrl(): string {
        if(!this.isIDenfySessionInProgress()) {
            throw new Error("No iDenfy session in progress");
        } else {
            return requireDefined(this.data().iDenfy?.redirectUrl);
        }
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

    get legalOfficer(): LegalOfficerPendingRequestCommands {
        return new LegalOfficerPendingRequestCommands({
            locId: this.locId,
            client: this.locSharedState.client,
            request: this,
        });
    }
}

export class LegalOfficerPendingRequestCommands {

    constructor(args: {
        locId: UUID,
        client: AuthenticatedLocClient,
        request: PendingRequest,
    }) {
        this.locId = args.locId;
        this.client = args.client;
        this.request = args.request;
    }

    private locId: UUID;

    private client: AuthenticatedLocClient;

    private request: PendingRequest;

    async reject(reason: string): Promise<RejectedRequest> {
        this.request.ensureCurrent();
        await this.client.rejectLoc({
            locId: this.locId,
            reason,
        });
        return await this.request.refresh() as RejectedRequest;
    }

    async accept(args: BlockchainSubmissionParams): Promise<OpenLoc> {
        this.request.ensureCurrent();
        const requesterAccount = this.request.data().requesterAddress;
        const requesterLoc = this.request.data().requesterLocId;
        const sponsorshipId = this.request.data().sponsorshipId;
        const locType = this.request.data().locType;
        if(locType === "Transaction") {
            await this.client.acceptTransactionLoc({
                locId: this.locId,
                requesterAccount,
                requesterLoc,
                ...args,
            });
        } else if(locType === "Identity") {
            await this.client.acceptIdentityLoc({
                locId: this.locId,
                requesterAccount,
                sponsorshipId,
                ...args,
            });
        } else {
            throw new Error(`Unsupported loc type ${ locType }`);
        }
        return await this.request.refresh() as OpenLoc;
    }

    async acceptCollection(args: AcceptCollectionLocParams): Promise<OpenLoc> {
        this.request.ensureCurrent();
        const requester = this.request.data().requesterAddress;
        if(!requester) {
            throw new Error("Can only accept LOC with polkadot requester");
        }
        const locType = this.request.data().locType;
        if(locType === "Collection") {
            await this.client.acceptCollectionLoc({
                locId: this.locId,
                requester,
                ...args,
            });
        } else {
            throw new Error(`Unsupported loc type ${ locType }`);
        }
        return await this.request.refresh() as OpenLoc;
    }
}

export class RejectedRequest extends LocRequestState {

    async cancel(): Promise<LocsState> {
        this.ensureCurrent();
        await this.locSharedState.client.cancel(this.locId);
        this.discard(undefined);
        return this.locSharedState.locsState.refreshWithout(this.locId);
    }

    async rework(): Promise<DraftRequest> {
        await this.locSharedState.client.rework(this.locId);
        return await super.refresh() as DraftRequest;
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

    async publishFile(parameters: { hash: string } & BlockchainSubmissionParams): Promise<OpenLoc> {
        const client = this.locSharedState.client;
        const file = this.request.files.find(file => file.hash === parameters.hash && file.status === "REVIEW_ACCEPTED");
        if(!file) {
            throw new Error("File was not found or was not reviewed and accepted by the LLO yet");
        }
        await client.publishFile({
            locId: this.locId,
            file: {
                hash: file.hash,
                nature: file.nature,
                size: BigInt(file.size),
                submitter: this.locSharedState.nodeApi.queries.getValidAccountId(file.submitter.address, file.submitter.type),
            },
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    async publishMetadata(parameters: { name: string } & BlockchainSubmissionParams): Promise<OpenLoc> {
        const client = this.locSharedState.client;
        const metadata = this.request.metadata.find(metadata => metadata.name === parameters.name && metadata.status === "REVIEW_ACCEPTED");
        if(!metadata) {
            throw new Error("File was not found or was not reviewed and accepted by the LLO yet");
        }
        await client.publishMetadata({
            locId: this.locId,
            metadata: {
                name: metadata.name,
                value: metadata.value,
                submitter: this.locSharedState.nodeApi.queries.getValidAccountId(metadata.submitter.address, metadata.submitter.type),
            },
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    override get legalOfficer(): LegalOfficerOpenRequestCommands {
        return new LegalOfficerOpenRequestCommands({
            locId: this.locId,
            client: this.locSharedState.client,
            request: this,
        });
    }
}

/**
 * Encapsulated calls can be used only by a Logion Legal Officer.
 */
export class LegalOfficerOpenRequestCommands extends LegalOfficerEditableRequestCommands {

    async acknowledgeFile(parameters: AckFileParams): Promise<OpenLoc> {
        this.request.ensureCurrent();
        const file = this.request.data().files.find(file => file.hash === parameters.hash && file.status === "PUBLISHED");
        if(!file) {
            throw new Error("File was not found or was not published yet");
        }
        await this.client.acknowledgeFile({
            locId: this.locId,
            hash: parameters.hash,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.request.refresh() as OpenLoc;
    }

    async acknowledgeMetadata(parameters: AckMetadataParams): Promise<OpenLoc> {
        this.request.ensureCurrent();
        const metadata = this.request.data().metadata.find(metadata => metadata.name === parameters.name && metadata.status === "PUBLISHED");
        if(!metadata) {
            throw new Error("Data was not found or was not published yet");
        }
        await this.client.acknowledgeMetadata({
            locId: this.locId,
            name: parameters.name,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.request.refresh() as OpenLoc;
    }

    async close(parameters: BlockchainSubmissionParams): Promise<ClosedLoc | ClosedCollectionLoc> {
        this.request.ensureCurrent();
        const file = this.request.data().files.find(file => file.status !== "ACKNOWLEDGED");
        if(file) {
            throw new Error("All files have not been acknowledged yet");
        }
        const metadata = this.request.data().metadata.find(metadata => metadata.status !== "ACKNOWLEDGED");
        if(metadata) {
            throw new Error("All metadata have not been acknowledged yet");
        }

        const seal = this.request.data().seal;
        await this.client.close({
            ...parameters,
            locId: this.locId,
            seal,
        });

        const state = await this.request.refresh();
        if(state.data().locType === "Collection") {
            return state as ClosedCollectionLoc;
        } else {
            return state as ClosedLoc;
        }
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

export async function getTokensRecord(parameters: { locClient: LocClient, locId: UUID, recordId: string }): Promise<TokensRecordClass | undefined> {
    const { locId, recordId, locClient } = parameters;
        const tokensRecord = await locClient.getTokensRecord({
            locId,
            recordId
        });
        if(tokensRecord) {
            return new TokensRecordClass({
                locId,
                locClient,
                tokensRecord,
            });
        } else {
            return undefined;
        }
}

export async function getTokensRecords(parameters: { locClient: LocClient } & GetTokensRecordsRequest): Promise<TokensRecordClass[]> {
    const { locId, locClient, jwtToken } = parameters;
    const clientRecords = await locClient.getTokensRecords({
        locId,
        jwtToken
    });
    return clientRecords.map(tokensRecord => new TokensRecordClass({
        locId,
        locClient,
        tokensRecord,
    }));
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

    async getTokensRecord(parameters: { recordId: string }): Promise<TokensRecordClass | undefined> {
        this.ensureCurrent();
        return getTokensRecord({
            locClient: this.locSharedState.client,
            locId: this.locId,
            recordId: parameters.recordId,
        });
    }

    async getTokensRecords(): Promise<TokensRecordClass[]> {
        this.ensureCurrent();
        return getTokensRecords({
            locClient: this.locSharedState.client,
            locId: this.locId,
        });
    }
}

export interface UploadCollectionItemFileParams {
    itemId: string,
    itemFile: ItemFileWithContent,
}

export interface UploadTokensRecordFileParams {
    recordId: string,
    file: ItemFileWithContent,
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

    async addTokensRecord(parameters: AddTokensRecordParams): Promise<ClosedCollectionLoc> {
        this.ensureCurrent();
        const client = this.locSharedState.client;
        if(parameters.files.length === 0) {
            throw new Error("Cannot add a tokens record without files");
        }
        if(!await client.canAddRecord(this.request)) {
            throw new Error("Current user is not allowed to add a tokens record");
        }
        await client.addTokensRecord({
            locId: this.locId,
            ...parameters
        })
        return this;
    }

    async uploadTokensRecordFile(parameters: UploadTokensRecordFileParams): Promise<ClosedCollectionLoc> {
        this.ensureCurrent();
        const client = this.locSharedState.client;
        await client.uploadTokensRecordFile({
            locId: this.locId,
            recordId: parameters.recordId,
            file: parameters.file,
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
    return new PendingRequest(locSharedState, locRequest, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
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

export class ReadOnlyLocState extends LocRequestState {

    constructor(locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase | undefined, locIssuers: LocVerifiedIssuers) {
        super(locSharedState, request, legalOfficerCase, locIssuers);
    }

    withLocs(locsState: LocsState): LocRequestState {
        return this._withLocs(locsState, ReadOnlyLocState);
    }
}
