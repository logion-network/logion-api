import {
    UUID,
    LegalOfficerCase,
    LocType,
    VoidInfo,
    ValidAccountId,
    LogionNodeApiClass,
    LocBatch,
    Hash,
    Fees as FeesClass,
} from "@logion/node-api";

import {
    LocRequest,
    LocClient,
    AddMetadataParams,
    LocMultiClient,
    LocLink,
    LocMetadataItem,
    LocFile,
    AddFileParams,
    AddCollectionItemParams,
    LocRequestVoidInfo,
    LocRequestStatus,
    AuthenticatedLocClient,
    FetchAllLocsParams,
    IdenfyVerificationSession,
    LocVerifiedIssuers,
    EMPTY_LOC_ISSUERS,
    AddTokensRecordParams,
    GetTokensRecordsRequest,
    ReviewFileParams,
    BlockchainSubmissionParams,
    AckFileParams,
    ReviewMetadataParams,
    AckMetadataParams,
    AddLinkParams,
    VoidParams,
    VerifiedIssuer,
    UploadableItemFile,
    ItemStatus,
    RefFileParams,
    RefMetadataParams,
    EstimateFeesPublishFileParams,
    EstimateFeesPublishMetadataParams,
    EstimateFeesPublishLinkParams,
    EstimateFeesOpenCollectionLocParams,
    OpenPolkadotLocParams,
    EstimateFeesAddCollectionItemParams,
    RefLinkParams,
    AckLinkParams,
    ReviewLinkParams,
    ItemsParams,
    ItemLifecycle as BackendItemLifecycle,
    AutoPublish,
    CollectionLimits,
    EstimateFeesAddTokensRecordParams,
} from "./LocClient.js";
import { SharedState, getLegalOfficer } from "./SharedClient.js";
import { LegalOfficer, UserIdentity, PostalAddress, LegalOfficerClass } from "./Types.js";
import { CollectionItem as CollectionItemClass } from "./CollectionItem.js";
import { State } from "./State.js";
import { LogionClient } from "./LogionClient.js";
import { TokensRecord as TokensRecordClass } from "./TokensRecord.js";
import { downloadFile, TypedFile } from "./Http.js";
import { requireDefined } from "./assertions.js";
import { Fees } from "./Fees.js";
import { HashString, HashOrContent } from "./Hash.js";
import { DateTime } from "luxon";
import { fromIsoString } from "./DateTimeUtil.js";
import { MimeType } from "./Mime.js";

export interface LocData extends LocVerifiedIssuers {
    id: UUID
    ownerAddress: string;
    requesterAddress?: ValidAccountId;
    requesterLocId?: UUID;
    description: string;
    locType: LocType;
    createdOn: DateTime;
    decisionOn?: DateTime;
    closedOn?: DateTime;
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
    fees: LocFees;
}

interface ItemLifecycle {
    addedOn?: DateTime;
    reviewedOn?: DateTime;
    acknowledgedByOwnerOn?: DateTime;
    acknowledgedByVerifiedIssuerOn?: DateTime;
    published: boolean;
    status: ItemStatus;
    rejectReason?: string;
    acknowledgedByOwner: boolean;
    acknowledgedByVerifiedIssuer: boolean;
}

export interface MergedLink extends ItemLifecycle {
    target: UUID;
    nature: HashString;
    fees?: Fees;
    submitter: ValidAccountId;
}

export interface MergedFile extends ItemLifecycle {
    hash: Hash;
    nature: HashString;
    name: string;
    restrictedDelivery: boolean;
    contentType: string;
    fees?: Fees;
    storageFeePaidBy?: string;
    submitter: ValidAccountId;
    size: bigint;
}

export interface MergedMetadataItem extends ItemLifecycle {
    name: HashString;
    value: HashString;
    fees?: Fees;
    submitter: ValidAccountId;
}

export interface LocFees {
    valueFee?: bigint;
    legalFee?: bigint;
    collectionItemFee?: bigint;
    tokensRecordFee?: bigint;    
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
        return LocsState.withPredicate(this._locs, loc => loc instanceof DraftRequest);
    }

    get openLocs(): Record<LocType, OpenLoc[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof OpenLoc);
    }

    get closedLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }

    get voidedLocs(): Record<LocType, (VoidedLoc | VoidedCollectionLoc)[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof VoidedLoc || loc instanceof VoidedCollectionLoc);
    }

    get pendingRequests(): Record<LocType, PendingRequest[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof PendingRequest);
    }

    get rejectedRequests(): Record<LocType, RejectedRequest[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof RejectedRequest);
    }

    get acceptedRequests(): Record<LocType, AcceptedRequest[]> {
        return LocsState.withPredicate(this._locs, loc => loc instanceof AcceptedRequest);
    }

    getLocRequestState(index: number): LocRequestState | undefined {
        const allLocs = Object.values(this._locs);
        if (index >= 0 && index < allLocs.length) {
            return allLocs[index];
        }
    }

    hasValidIdentityLoc(legalOfficer: LegalOfficer): boolean {
        return LocsState.filter(this._locs, 'Identity', loc =>
            loc instanceof ClosedLoc &&
            loc.data().ownerAddress === legalOfficer.address
        ).length > 0;
    }

    get legalOfficersWithValidIdentityLoc(): LegalOfficerClass[] {
        return this.sharedState.legalOfficers.filter(lo => this.hasValidIdentityLoc(lo));
    }

    private static withPredicate<T extends LocRequestState>(locs: Record<string, LocRequestState>, predicate: (l: LocRequestState) => boolean): Record<LocType, T[]> {
        return {
            'Transaction': LocsState.filter(locs, 'Transaction', predicate),
            'Collection': LocsState.filter(locs, 'Collection', predicate),
            'Identity': LocsState.filter(locs, 'Identity', predicate),
        };
    }

    private static filter<T extends LocRequestState>(locs: Record<string, LocRequestState>, locType: LocType, predicate: (loc: LocRequestState) => boolean): T[] {
        const filteredLocs = Object.values(locs)
            .filter(predicate)
            .filter(value => value.data().locType === locType)
        return filteredLocs as T[];
    }

    refreshWith(loc: LocRequestState): LocsState {
        return this.syncDiscardOnSuccess<LocsState>(current => current._refreshWith(loc));
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
        return this.syncDiscardOnSuccess<LocsState>(current => current._refreshWithout(locId));
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

    async requestCollectionLoc(params: CreateCollectionLocRequestParams): Promise<DraftRequest | PendingRequest> {
        return this.requestLoc({
            ...params,
            locType: "Collection"
        });
    }

    async requestIdentityLoc(params: CreateIdentityLocRequestParams): Promise<DraftRequest | PendingRequest> {
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

    private async requestLoc(params: CreateAnyLocRequestParams): Promise<DraftRequest | PendingRequest> {
        const { legalOfficerAddress, locType, description, userIdentity, userPostalAddress, company, draft, template, sponsorshipId } = params;
        const legalOfficer = getLegalOfficer(this.sharedState, legalOfficerAddress)
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
            fees: {
                legalFee: params.legalFee?.toString(),
                valueFee: params.valueFee?.toString(),
                collectionItemFee: params.collectionItemFee?.toString(),
                tokensRecordFee: params.tokensRecordFee?.toString(),
            }
        });
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        if(draft) {
            return new DraftRequest(locSharedState, request, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
        } else {
            return new PendingRequest(locSharedState, request, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
        }
    }

    async openTransactionLoc(params: CreateLocParams & ItemsParams & BlockchainSubmissionParams): Promise<OpenLoc> {
        return this.openLoc({
            ...params,
            locType: "Transaction"
        });
    }

    async openCollectionLoc(params: CreateCollectionLocParams & ItemsParams & BlockchainSubmissionParams): Promise<OpenLoc> {
        return this.openLoc({
            ...params,
            locType: "Collection"
        });
    }

    async openIdentityLoc(params: CreateIdentityLocParams & ItemsParams & BlockchainSubmissionParams): Promise<OpenLoc> {
        const { userIdentity, userPostalAddress } = params;
        if (userIdentity === undefined) {
            throw new Error("User Identity is mandatory for an Identity LOC")
        }
        if (userPostalAddress === undefined) {
            throw new Error("User Postal Address is mandatory for an Identity LOC")
        }
        return this.openLoc({
            ...params,
            locType: "Identity"
        });
    }

    private async openLoc(params: CreateAnyLocParams & ItemsParams & BlockchainSubmissionParams): Promise<OpenLoc> {
        const { legalOfficerAddress, locType, description, userIdentity, userPostalAddress, company, template, metadata, links } = params;
        const legalOfficer = getLegalOfficer(this.sharedState, legalOfficerAddress)
        if (this.sharedState.currentAddress?.type !== "Polkadot") {
            throw Error("Direct LOC opening must be done by Polkadot account");
        }
        const client = LocMultiClient.newLocMultiClient(this.sharedState).newLocClient(legalOfficer);
        const request = await client.createOpenLoc({
            ownerAddress: legalOfficer.address,
            description,
            locType,
            userIdentity,
            userPostalAddress,
            company,
            template,
            fees: {
                legalFee: params.legalFee?.toString(),
                valueFee: params.valueFee?.toString(),
                collectionItemFee: params.collectionItemFee?.toString(),
                tokensRecordFee: params.tokensRecordFee?.toString(),
            },
            metadata,
            links: links.map(link => ({
                target: link.target.toString(),
                nature: link.nature
            }))
        });

        const locId = new UUID(request.id);
        for (const file of params.files) {
            await client.addFile({
                ...file,
                locId,
                direct: true,
            })
        }
        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this };
        if (params.locType === "Identity") {
            await client.openIdentityLoc({
                ...params,
                locId,
                autoPublish: false,
            }, false);
        } else if (params.locType === "Transaction") {
            await client.openTransactionLoc({
                ...params,
                locId,
                autoPublish: false,
            }, false);
        } else if (params.locType === "Collection") {
            await client.openCollectionLoc({
                collectionCanUpload: requireDefined(params.collectionCanUpload),
                collectionLastBlockSubmission: params.collectionLastBlockSubmission,
                collectionMaxSize: params.collectionMaxSize,
                valueFee: requireDefined(params.valueFee),
                collectionItemFee: requireDefined(params.collectionItemFee),
                tokensRecordFee: requireDefined(params.tokensRecordFee),
                ...params, locId,
                autoPublish: false,
            }, false);
        }
        const loc = await client.getLoc({ locId });
        return (await new OpenLoc(locSharedState, request, loc, EMPTY_LOC_ISSUERS).refresh()) as OpenLoc;
    }

    async refresh(params?: FetchAllLocsParams): Promise<LocsState> {
        return this.discardOnSuccess<LocsState>(current => current._refresh(params));
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
            const legalOfficerCase = legalOfficerCases[id.toDecimalString()];
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
        if(!this.isVerifiedIssuer) {
            throw new Error("Authenticated user is not a Verified Issuer");
        }
        return LocsState.withPredicate(this._verifiedIssuerLocs, loc => loc instanceof OpenLoc);
    }

    get closedVerifiedIssuerLocs(): Record<LocType, (ClosedLoc | ClosedCollectionLoc)[]> {
        if(!this.isVerifiedIssuer) {
            throw new Error("Authenticated user is not a Verified Issuer");
        }
        return LocsState.withPredicate(this._verifiedIssuerLocs, loc => loc instanceof ClosedLoc || loc instanceof ClosedCollectionLoc);
    }

    get legalOfficer(): LegalOfficerLocsStateCommands {
        return new LegalOfficerLocsStateCommands({
            sharedState: this.sharedState,
            locsState: this,
        });
    }
}

/**
 * Encapsulated calls can be used only by a Logion Legal Officer.
 */
export class LegalOfficerLocsStateCommands {

    constructor(args: {
        sharedState: SharedState,
        locsState: LocsState,
    }) {
        this.sharedState = args.sharedState;
        this.locsState = args.locsState;
    }

    private sharedState: SharedState;

    private locsState: LocsState;

    async createLoc(params: OpenLocParams & BlockchainSubmissionParams): Promise<OpenLoc> {
        const { locType, description, userIdentity, userPostalAddress, company, template, signer, callback } = params;
        const legalOfficer = this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === this.sharedState.currentAddress?.address);
        if(!legalOfficer) {
            throw new Error("Current user is not a Legal Officer");
        }
        const client = LocMultiClient.newLocMultiClient(this.sharedState).newLocClient(legalOfficer);

        if(locType === "Transaction" && !params.requesterLocId) {
            throw new Error("Cannot create Logion Transaction LOC without a requester");
        }

        const request = await client.createLocRequest({
            ownerAddress: legalOfficer.address,
            requesterIdentityLoc: params.requesterLocId ? params.requesterLocId.toString() : undefined,
            description,
            locType,
            userIdentity,
            userPostalAddress,
            company,
            template,
            fees: {
                valueFee: "0",
                collectionItemFee: "0",
                tokensRecordFee: "0",
            }
        });

        const locId = new UUID(request.id);
        if (request.locType === "Transaction") {
            if(params.requesterLocId) {
                await client.openLogionTransactionLoc({
                    locId,
                    requesterLocId: params.requesterLocId,
                    signer,
                    callback,
                });
            } else {
                throw new Error();
            }
        } else if (request.locType === "Identity") {
            await client.openLogionIdentityLoc({
                locId,
                signer,
                callback,
            });
        } else {
            throw Error("Collection LOCs are opened by Polkadot requesters");
        }

        const locSharedState: LocSharedState = { ...this.sharedState, legalOfficer, client, locsState: this.locsState };
        return new OpenLoc(locSharedState, request, undefined, EMPTY_LOC_ISSUERS).veryNew();
    }
}

export interface OpenLocParams {
    description: string;
    userIdentity?: UserIdentity;
    userPostalAddress?: PostalAddress;
    company?: string;
    template?: string;
    locType: "Identity" | "Transaction";
    requesterLocId?: UUID;
}

export interface LocSharedState extends SharedState {
    legalOfficer: LegalOfficerClass;
    client: AuthenticatedLocClient;
    locsState: LocsState;
}

export interface CreateLocParams {
    legalOfficerAddress: string;
    description: string;
    template?: string;
    legalFee?: bigint;
}

export interface HasDraft {
    draft: boolean;
}

export interface CreateLocRequestParams extends CreateLocParams, HasDraft {
}

export interface HasIdentity {
    userIdentity: UserIdentity;
    userPostalAddress: PostalAddress;
    company?: string;
}

export interface CreateIdentityLocRequestParams extends CreateLocRequestParams, HasIdentity {
    sponsorshipId?: UUID;
}

export interface CreateIdentityLocParams extends CreateLocParams, HasIdentity {
}

export interface CreateCollectionLocParams extends CreateLocParams, EstimateFeesOpenCollectionLocParams {
}

export interface CreateCollectionLocRequestParams extends CreateLocRequestParams {
    valueFee: bigint;
    collectionItemFee: bigint;
    tokensRecordFee: bigint;
}

interface CreateAnyLocParams extends CreateLocParams, Partial<HasIdentity>, Partial<EstimateFeesOpenCollectionLocParams> {
    locType: LocType;
}

interface CreateAnyLocRequestParams extends CreateAnyLocParams {
    sponsorshipId?: UUID;
    draft: boolean;
}

export interface CreateSofRequestParams {
    itemId: Hash;
}

export interface CheckHashResult {
    file?: MergedFile;
    metadataItem?: MergedMetadataItem;
    collectionItem?: CollectionItemClass;
    collectionItemFile?: UploadableItemFile;
    recordFile?: UploadableItemFile;
}

export type AnyLocState = OffchainLocState | OnchainLocState;

export type OffchainLocState = DraftRequest | PendingRequest | RejectedRequest | AcceptedRequest;

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
            case "REVIEW_PENDING":
                return new PendingRequest(locSharedState, request, undefined, locIssuers)
            case "REVIEW_ACCEPTED":
                return new AcceptedRequest(locSharedState, request, undefined, locIssuers)
            case "REVIEW_REJECTED":
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
        const current = this.getCurrentStateOrThrow() as LocRequestState;
        const sharedState = current.locSharedState;
        const client = sharedState.client;
        const request = await client.getLocRequest({ locId: current.locId });
        const locIssuers = await client.getLocIssuers(request, sharedState.nodeApi.batch.locs([ current.locId ]));
        const newState = await LocRequestState.createFromRequest(sharedState, request, locIssuers);
        const newLocsState = sharedState.locsState.refreshWith(newState); // Discards this state
        return newLocsState.findById(current.locId);
    }

    locsState(): LocsState {
        return this.locSharedState.locsState;
    }

    data(): LocData {
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
        const superseded = this.data().replacerOf;
        if (superseded) {
            return this.locSharedState.locsState.findById(superseded) as VoidedLoc;
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

    async checkHash(hash: Hash): Promise<CheckHashResult> {
        return LocRequestState.checkHash(this.data(), hash);
    }

    static checkHash(loc: LocData, hash: Hash): CheckHashResult {
        const result: CheckHashResult = {};

        for (const file of loc.files) {
            if (file.hash.equalTo(hash)) {
                result.file = file;
            }
        }

        for (const item of loc.metadata) {
            if (item.value.value === hash.toHex()) {
                result.metadataItem = item;
            }
        }

        return result;
    }

    private static dataFromRequest(api: LogionNodeApiClass, request: LocRequest, locIssuers: LocVerifiedIssuers): LocData {
        return {
            ...request,
            ...locIssuers,
            closedOn: request.closedOn ? fromIsoString(request.closedOn) : undefined,
            createdOn: fromIsoString(request.createdOn),
            decisionOn: request.decisionOn ? fromIsoString(request.decisionOn) : undefined,
            requesterAddress: request.requesterAddress ? api.queries.getValidAccountId(request.requesterAddress.address, request.requesterAddress.type) : undefined,
            requesterLocId: request.requesterIdentityLoc ? new UUID(request.requesterIdentityLoc) : undefined,
            id: new UUID(request.id),
            replacerOf: undefined,
            voidInfo: undefined,
            identityLocId: request.identityLoc ? new UUID(request.identityLoc) : undefined,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(api, item)),
            files: request.files.map(item => LocRequestState.mergeFile(api, item)),
            links: request.links.map(item => LocRequestState.mergeLink(api, item)),
            voteId: request.voteId ? request.voteId : undefined,
            sponsorshipId: request.sponsorshipId ? new UUID(request.sponsorshipId) : undefined,
            fees: {
                valueFee: request.fees?.valueFee !== undefined ? BigInt(request.fees.valueFee) : undefined,
                legalFee: request.fees?.legalFee !== undefined ? BigInt(request.fees.legalFee) : undefined,
                collectionItemFee: request.fees?.collectionItemFee !== undefined ? BigInt(request.fees.collectionItemFee) : undefined,
                tokensRecordFee: request.fees?.tokensRecordFee !== undefined ? BigInt(request.fees.tokensRecordFee) : undefined,
            }
        };
    }

    private static dataFromRequestAndLoc(api: LogionNodeApiClass, request: LocRequest, loc: LegalOfficerCase, locIssuers: LocVerifiedIssuers): LocData {
        const data: LocData = {
            ...loc,
            ...locIssuers,
            id: new UUID(request.id),
            ownerAddress: loc.owner,
            closedOn: request.closedOn ? fromIsoString(request.closedOn) : undefined,
            createdOn: fromIsoString(request.createdOn),
            decisionOn: request.decisionOn ? fromIsoString(request.decisionOn) : undefined,
            description: request.description,
            rejectReason: request.rejectReason,
            status: request.status,
            identityLocId: request.identityLoc ? new UUID(request.identityLoc) : undefined,
            userIdentity: request.userIdentity,
            userPostalAddress: request.userPostalAddress,
            metadata: request.metadata.map(item => LocRequestState.mergeMetadata(api, item, loc)),
            files: request.files.map(item => LocRequestState.mergeFile(api, item, loc)),
            links: request.links.map(item => LocRequestState.mergeLink(api, item, loc)),
            seal: loc.closed ? loc.seal : request.seal,
            company: request.company,
            iDenfy: request.iDenfy,
            voteId: request.voteId ? request.voteId : undefined,
            template: request.template,
            fees: {
                valueFee: loc.valueFee,
                legalFee: loc.legalFee,
                collectionItemFee: loc.collectionItemFee,
                tokensRecordFee: loc.tokensRecordFee,
            }
        };

        if(data.voidInfo && request.voidInfo) {
            data.voidInfo.reason = request.voidInfo.reason;
            data.voidInfo.voidedOn = request.voidInfo.voidedOn;
        }

        return data;
    }

    private static mergeMetadata(api: LogionNodeApiClass, backendMetadataItem: LocMetadataItem, chainLoc?: LegalOfficerCase): MergedMetadataItem {
        const chainMetadataItem = chainLoc ? chainLoc.metadata.find(item => item.name.toHex() === backendMetadataItem.nameHash) : undefined;
        if(chainMetadataItem) {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendMetadataItem,
                    published: true,
                    acknowledgedByOwner: chainMetadataItem.acknowledgedByOwner,
                    acknowledgedByVerifiedIssuer: chainMetadataItem.acknowledgedByVerifiedIssuer,
                }),
                submitter: chainMetadataItem.submitter,
                fees: backendMetadataItem.fees,
                name: new HashString(chainMetadataItem.name, backendMetadataItem.name),
                value: new HashString(chainMetadataItem.value, backendMetadataItem.value),
            };
        } else {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendMetadataItem,
                    published: false,
                    acknowledgedByOwner: false,
                    acknowledgedByVerifiedIssuer: false,
                }),
                submitter: api.queries.getValidAccountId(backendMetadataItem.submitter.address, backendMetadataItem.submitter.type),
                fees: backendMetadataItem.fees,
                name: HashString.fromValue(backendMetadataItem.name),
                value: HashString.fromValue(backendMetadataItem.value),
            };
        }
    }

    private static parseItemLifecycleDates(args: { published: boolean, acknowledgedByOwner: boolean, acknowledgedByVerifiedIssuer: boolean } & BackendItemLifecycle): ItemLifecycle {
        const { published, acknowledgedByOwner, acknowledgedByVerifiedIssuer } = args;
        return {
            published,
            acknowledgedByOwner,
            acknowledgedByVerifiedIssuer,
            status: args.status,
            rejectReason: args.rejectReason,
            addedOn: args.addedOn ? fromIsoString(args.addedOn) : undefined,
            reviewedOn: args.reviewedOn ? fromIsoString(args.reviewedOn) : undefined,
            acknowledgedByOwnerOn: args.acknowledgedByOwnerOn ? fromIsoString(args.acknowledgedByOwnerOn) : undefined,
            acknowledgedByVerifiedIssuerOn: args.acknowledgedByVerifiedIssuerOn ? fromIsoString(args.acknowledgedByVerifiedIssuerOn) : undefined,
        }
    }

    private static mergeFile(api: LogionNodeApiClass, backendFile: LocFile, chainLoc?: LegalOfficerCase): MergedFile {
        const chainFile = chainLoc ? chainLoc.files.find(item => item.hash.toHex() === backendFile.hash) : undefined;
        if(chainFile) {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendFile,
                    published: true,
                    acknowledgedByOwner: chainFile.acknowledgedByOwner,
                    acknowledgedByVerifiedIssuer: chainFile.acknowledgedByVerifiedIssuer,
                }),
                submitter: chainFile.submitter,
                fees: backendFile.fees,
                name: backendFile.name,
                nature: new HashString(chainFile.nature, backendFile.nature),
                size: chainFile.size,
                restrictedDelivery: backendFile.restrictedDelivery,
                hash: chainFile.hash,
                contentType: backendFile.contentType,
            };
        } else {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendFile,
                    published: false,
                    acknowledgedByOwner: false,
                    acknowledgedByVerifiedIssuer: false,
                }),
                submitter: api.queries.getValidAccountId(backendFile.submitter.address, backendFile.submitter.type),
                fees: backendFile.fees,
                name: backendFile.name,
                nature: HashString.fromValue(backendFile.nature),
                size: BigInt(backendFile.size),
                restrictedDelivery: backendFile.restrictedDelivery,
                hash: Hash.fromHex(backendFile.hash),
                contentType: backendFile.contentType,
            }
        }
    }

    private static mergeLink(api: LogionNodeApiClass, backendLink: LocLink, chainLoc?: LegalOfficerCase): MergedLink {
        const chainLink = chainLoc ? chainLoc.links.find(link => link.id.toString() === backendLink.target) : undefined;
        if(chainLink) {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendLink,
                    published: true,
                    acknowledgedByOwner: chainLink.acknowledgedByOwner,
                    acknowledgedByVerifiedIssuer: chainLink.acknowledgedByVerifiedIssuer,
                }),
                submitter: chainLink.submitter,
                fees: backendLink.fees,
                nature: new HashString(chainLink.nature, backendLink.nature),
                target: chainLink.id,
            };
        } else {
            return {
                ...LocRequestState.parseItemLifecycleDates({
                    ...backendLink,
                    published: false,
                    acknowledgedByOwner: false,
                    acknowledgedByVerifiedIssuer: false,
                }),
                submitter: api.queries.getValidAccountId(backendLink.submitter.address, backendLink.submitter.type),
                fees: backendLink.fees,
                nature: HashString.fromValue(backendLink.nature),
                target: new UUID(backendLink.target),
            }
        }
    }

    abstract withLocs(locsState: LocsState): LocRequestState;

    protected _withLocs<T extends LocRequestState>(locsState: LocsState, constructor: new (locSharedState: LocSharedState, request: LocRequest, legalOfficerCase: LegalOfficerCase | undefined, locIssuers: LocVerifiedIssuers) => T): T {
        return this.syncDiscardOnSuccess<T>(current => new constructor({
            ...this.locSharedState,
            locsState
        }, current.request, current.legalOfficerCase, current.locIssuers));
    }

    async getFile(hash: Hash): Promise<TypedFile> {
        return downloadFile(this.owner.buildAxiosToNode(), `/api/loc-request/${ this.request.id }/files/${ hash.toHex() }`);
    }

    isRequester(account?: ValidAccountId): boolean {
        const candidate = account !== undefined ? account : this.locSharedState.currentAddress;
        return this.request.requesterAddress && candidate?.equals(this.request.requesterAddress) || false;
    }

    isOwner(account?: ValidAccountId): boolean {
        const candidate = account !== undefined ? account : this.locSharedState.currentAddress;
        return candidate?.type === "Polkadot" && candidate?.address === this.request.ownerAddress;
    }

    isVerifiedIssuer(account?: ValidAccountId): boolean {
        const candidate = account !== undefined ? account : this.locSharedState.currentAddress;
        return candidate?.type === "Polkadot" && (this.locIssuers.issuers.find(issuer => issuer.address === candidate?.address) !== undefined);
    }
}

export interface LegalOfficerCommandsConstructorArgs {
    locId: UUID;
    client: AuthenticatedLocClient;
    request: LocRequestState;
}

export class LegalOfficerCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        this.locId = args.locId;
        this.client = args.client;
        this.request = args.request;
    }

    protected locId: UUID;

    protected client: AuthenticatedLocClient;

    protected request: LocRequestState;
}

export interface LegalOfficerRestrictedDeliveryCommands {
    setCollectionFileRestrictedDelivery(params: {
        hash: Hash,
        restrictedDelivery: boolean,
    }): Promise<LocRequestState>;
}

export class LegalOfficerRestrictedDeliveryCommandsImpl
extends LegalOfficerCommands
implements LegalOfficerRestrictedDeliveryCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        super(args);
    }

    async setCollectionFileRestrictedDelivery(params: {
        hash: Hash,
        restrictedDelivery: boolean,
    }): Promise<LocRequestState> {
        const { hash, restrictedDelivery } = params;
        if(this.request.data().locType !== "Collection") {
            throw new Error("Restricted delivery is available for collection LOC files only");
        }

        await this.client.setCollectionFileRestrictedDelivery({
            locId: this.request.locId,
            hash,
            restrictedDelivery,
        });

        return this.request.refresh();
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
            ...params,
            direct: false,
        });
        return await this.refresh() as EditableRequest;
    }

    async addLink(params: AddLinkParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.addLink({
            locId: this.locId,
            ...params
        });
        return await this.refresh() as EditableRequest;
    }

    async deleteMetadata(params: RefMetadataParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.deleteMetadata({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as EditableRequest
    }

    async deleteFile(params: RefFileParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.deleteFile({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as EditableRequest
    }

    async deleteLink(params: RefLinkParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.deleteLink({
            locId: this.locId,
            ...params
        })
        return await this.refresh() as EditableRequest
    }

    async requestFileReview(params: RefFileParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.requestFileReview({
            locId: this.locId,
            ...params,
        });
        return await this.refresh() as EditableRequest;
    }

    async requestMetadataReview(params: RefMetadataParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.requestMetadataReview({
            locId: this.locId,
            ...params,
        });
        return await this.refresh() as EditableRequest;
    }

    async requestLinkReview(params: RefLinkParams): Promise<EditableRequest> {
        const client = this.locSharedState.client;
        await client.requestLinkReview({
            locId: this.locId,
            ...params,
        });
        return await this.refresh() as EditableRequest;
    }
}

export type ReviewableRequest = OpenLoc | PendingRequest;

export interface LegalOfficeReviewCommands {

    reviewFile(params: ReviewFileParams): Promise<ReviewableRequest>;
    reviewMetadata(params: ReviewMetadataParams): Promise<ReviewableRequest>;
    reviewLink(params: ReviewLinkParams): Promise<ReviewableRequest>;
}

export class LegalOfficeReviewCommandsImpl extends LegalOfficerCommands implements LegalOfficeReviewCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        super(args);
    }

    async reviewFile(params: ReviewFileParams): Promise<ReviewableRequest> {
        await this.client.reviewFile({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as ReviewableRequest;
    }

    async reviewMetadata(params: ReviewMetadataParams): Promise<ReviewableRequest> {
        await this.client.reviewMetadata({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as ReviewableRequest;
    }

    async reviewLink(params: ReviewLinkParams): Promise<ReviewableRequest> {
        await this.client.reviewLink({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as ReviewableRequest;
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
        const locsState = this.locSharedState.locsState;
        await this.finalizeOnSuccess<DraftRequest>(current => current.locSharedState.client.cancel(this.locId));
        return locsState.refreshWithout(this.locId);
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

export class LegalOfficerPendingRequestCommands
extends LegalOfficerCommands
implements LegalOfficeReviewCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        super(args);
        this.reviewCommands = new LegalOfficeReviewCommandsImpl(args);
    }

    private reviewCommands: LegalOfficeReviewCommands;

    async reject(reason: string): Promise<RejectedRequest> {
        await this.client.rejectLoc({
            locId: this.locId,
            reason,
        });
        return await this.request.refresh() as RejectedRequest;
    }

    async accept(args?: BlockchainSubmissionParams): Promise<AcceptedRequest | OpenLoc> {
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
            if(!requesterAccount) {
                throw new Error("Can only accept LOC with polkadot requester");
            }
            await this.client.acceptCollectionLoc({
                locId: this.locId
            });
        }
        return await this.request.refresh() as AcceptedRequest | OpenLoc;
    }

    async estimateFeesAccept(): Promise<FeesClass | undefined> {
        const requesterAccount = this.request.data().requesterAddress;
        const requesterLoc = this.request.data().requesterLocId;
        const sponsorshipId = this.request.data().sponsorshipId;
        const locType = this.request.data().locType;
        if(locType === "Transaction") {
            return this.client.estimateFeesAcceptTransactionLoc({
                locId: this.locId,
                requesterAccount,
                requesterLoc,
            });
        } else if(locType === "Identity") {
            return this.client.estimateFeesAcceptIdentityLoc({
                locId: this.locId,
                requesterAccount,
                sponsorshipId,
            });
        } else {
            // Acceptance of a Collection is always a pure backend operation (no onchain operation),
            // thus there is no fees.
            return undefined;
        }
    }

    reviewFile(params: ReviewFileParams): Promise<PendingRequest> {
        return this.reviewCommands.reviewFile(params) as Promise<PendingRequest>;
    }

    reviewMetadata(params: ReviewMetadataParams): Promise<PendingRequest> {
        return this.reviewCommands.reviewMetadata(params) as Promise<PendingRequest>;
    }

    reviewLink(params: ReviewLinkParams): Promise<PendingRequest> {
        return this.reviewCommands.reviewLink(params) as Promise<PendingRequest>;
    }
}

export class ReviewedRequest extends LocRequestState {

    async cancel(): Promise<LocsState> {
        const locsState = this.locSharedState.locsState;
        await this.finalizeOnSuccess<ReviewedRequest>(current => current.locSharedState.client.cancel(this.locId));
        return locsState.refreshWithout(this.locId);
    }

    async rework(): Promise<DraftRequest> {
        await this.locSharedState.client.rework(this.locId);
        return await super.refresh() as DraftRequest;
    }

    override withLocs(locsState: LocsState): RejectedRequest {
        return this._withLocs(locsState, RejectedRequest);
    }
}

export class AcceptedRequest extends ReviewedRequest {

    veryNew(): AcceptedRequest {
        const newLocsState = this.locsState().refreshWith(this);
        return newLocsState.findById(this.locId) as AcceptedRequest;
    }

    async open(parameters: BlockchainSubmissionParams & AutoPublish): Promise<OpenLoc> {
        const { autoPublish } = parameters;
        if (this.request.locType === "Transaction") {
            await this.locSharedState.client.openTransactionLoc({
                ...this.checkOpenParams(autoPublish),
                ...parameters,
            })
        } else if (this.request.locType === "Identity") {
            await this.locSharedState.client.openIdentityLoc({
                ...this.checkOpenParams(autoPublish),
                ...parameters,
            })
        } else {
            throw Error("Collection LOCs are opened with openCollection()");
        }
        return await this.refresh() as OpenLoc
    }

    private checkOpenParams(autoPublish: boolean): OpenPolkadotLocParams & AutoPublish {
        const requesterAddress = this.request.requesterAddress;
        if (requesterAddress === undefined || requesterAddress?.type !== "Polkadot") {
            throw Error("Only Polkadot requester can open LOC");
        }
        return {
            locId: this.locId,
            legalOfficerAddress: this.owner.address,
            legalFee: this.request.fees?.legalFee !== undefined ? BigInt(this.request.fees?.legalFee) : undefined,
            metadata: this.toAddMetadataParams(autoPublish),
            files: this.toAddFileParams(autoPublish),
            links: this.toAddLinkParams(autoPublish),
            autoPublish,
        }
    }

    private toAddMetadataParams(autoPublish: boolean): AddMetadataParams[] {
        if (autoPublish) {
            return this.request.metadata.filter(item => item.status === "REVIEW_ACCEPTED").map(item => ({
                name: item.name,
                value: item.value,
            }));
        } else {
            return [];
        }
    }

    private toAddFileParams(autoPublish: boolean): AddFileParams[] {
        if (autoPublish) {
            return this.request.files.filter(item => item.status === "REVIEW_ACCEPTED").map(item => ({
                file: HashOrContent.fromDescription({
                    name: item.name,
                    hash: Hash.fromHex(item.hash),
                    size: BigInt(item.size),
                    mimeType: MimeType.from(item.contentType),
                }),
                nature: item.nature,
            }));
        } else {
            return [];
        }
    }

    private toAddLinkParams(autoPublish: boolean): AddLinkParams[] {
        if (autoPublish) {
            return this.request.links.filter(item => item.status === "REVIEW_ACCEPTED").map(item => ({
                target: new UUID(item.target),
                nature: item.nature,
            }));
        } else {
            return [];
        }
    }

    async estimateFeesOpen(parameters: AutoPublish): Promise<FeesClass> {
        const { autoPublish } = parameters;
        if (this.request.locType === "Transaction") {
            return this.locSharedState.client.estimateFeesOpenTransactionLoc(this.checkOpenParams(autoPublish))
        } else if (this.request.locType === "Identity") {
            return this.locSharedState.client.estimateFeesOpenIdentityLoc(this.checkOpenParams(autoPublish))
        } else {
            throw Error("Collection LOCs fees are estimated with estimateFeesOpenCollection()");
        }
    }

    async openCollection(parameters: CollectionLimits & BlockchainSubmissionParams & AutoPublish): Promise<OpenLoc> {
        const { autoPublish } = parameters;
        await this.locSharedState.client.openCollectionLoc({
            ...this.checkOpenCollectionParams(autoPublish),
            ...parameters,
        });
        return await this.refresh() as OpenLoc;
    }

    private checkOpenCollectionParams(autoPublish: boolean): OpenPolkadotLocParams & { valueFee: bigint, collectionItemFee: bigint, tokensRecordFee: bigint } & AutoPublish {
        const requesterAddress = this.request.requesterAddress;
        if (requesterAddress === undefined || requesterAddress?.type !== "Polkadot") {
            throw Error("Only Polkadot requester can open, or estimate fees of, a Collection LOC");
        }
        const legalFee = this.request.fees?.legalFee;
        const valueFee = this.request.fees?.valueFee;
        if(!valueFee) {
            throw new Error("Missing value fee");
        }
        const collectionItemFee = this.request.fees?.collectionItemFee;
        if(!collectionItemFee) {
            throw new Error("Missing collection item fee");
        }
        const tokensRecordFee = this.request.fees?.tokensRecordFee;
        if(!tokensRecordFee) {
            throw new Error("Missing tokens record fee");
        }
        if (this.request.locType === "Collection") {
            return {
                locId: this.locId,
                legalOfficerAddress: this.owner.address,
                valueFee: BigInt(valueFee),
                collectionItemFee: BigInt(collectionItemFee),
                tokensRecordFee: BigInt(tokensRecordFee),
                legalFee: legalFee !== undefined ? BigInt(legalFee) : undefined,
                metadata: this.toAddMetadataParams(autoPublish),
                files: this.toAddFileParams(autoPublish),
                links: this.toAddLinkParams(autoPublish),
                autoPublish,
            }
        } else {
            throw Error("Other LOCs are opened/estimated with open()/estimateFeesOpen()");
        }
    }

    async estimateFeesOpenCollection(parameters: EstimateFeesOpenCollectionLocParams & AutoPublish): Promise<FeesClass> {
        return this.locSharedState.client.estimateFeesOpenCollectionLoc({
            ...this.checkOpenCollectionParams(parameters.autoPublish),
            ...parameters
        });
    }

    withLocs(locsState: LocsState): AcceptedRequest {
        return this._withLocs(locsState, AcceptedRequest);
    }
}

export class RejectedRequest extends ReviewedRequest {

    override withLocs(locsState: LocsState): RejectedRequest {
        return this._withLocs(locsState, RejectedRequest);
    }
}

export class OpenLoc extends EditableRequest {

    veryNew(): OpenLoc {
        const newLocsState = this.locsState().refreshWith(this);
        return newLocsState.findById(this.locId) as OpenLoc;
    }

    async requestSof(): Promise<PendingRequest> {
        return requestSof(this.locSharedState, this.locId);
    }

    override async refresh(): Promise<OnchainLocState> {
        return await super.refresh() as OnchainLocState;
    }

    override withLocs(locsState: LocsState): OpenLoc {
        return this._withLocs(locsState, OpenLoc);
    }

    async publishFile(parameters: { hash: Hash } & BlockchainSubmissionParams): Promise<OpenLoc> {
        this.ensureCanPublish();
        const client = this.locSharedState.client;
        const file = this.findFile(parameters.hash, "REVIEW_ACCEPTED");
        await client.publishFile({
            ...file,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    private ensureCanPublish() {
        if(this.request.requesterAddress && !this.isRequester()) {
            throw new Error("Only requester can publish");
        }
        if(!this.request.requesterAddress && !this.isOwner()) {
            throw new Error("Only owner can publish");
        }
    }

    private findFile(hash: Hash, status: ItemStatus): EstimateFeesPublishFileParams {
        const file = this.request.files.find(file => file.hash === hash.toHex() && file.status === status);
        if(!file) {
            throw new Error(`File ${ hash.toHex() } with status ${ status } was not found`);
        }
        return {
            locId: this.locId,
            file: {
                hash,
                nature: Hash.of(file.nature),
                size: BigInt(file.size),
                submitter: this.locSharedState.nodeApi.queries.getValidAccountId(file.submitter.address, file.submitter.type),
            }
        }
    }

    async estimateFeesPublishFile(parameters: { hash: Hash }): Promise<FeesClass> {
        const client = this.locSharedState.client;
        const file = this.findFile(parameters.hash, "REVIEW_ACCEPTED");
        return client.estimateFeesPublishFile(file);
    }

    async acknowledgeFile(parameters: AckFileParams): Promise<OpenLoc> {
        this.ensureCanAcknowledge();
        const client = this.locSharedState.client;
        this.findFile(parameters.hash, "PUBLISHED");
        await client.acknowledgeFile({
            locId: this.locId,
            hash: parameters.hash,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    private ensureCanAcknowledge() {
        if(!this.isOwner() && !this.isVerifiedIssuer()) {
            throw new Error("Only owner or a verified issuer can acknowledge");
        }
    }

    async estimateFeesAcknowledgeFile(parameters: RefFileParams): Promise<FeesClass> {
        const client = this.locSharedState.client;
        return await client.estimateFeesAcknowledgeFile({
            locId: this.locId,
            ...parameters
        });
    }

    async publishMetadata(parameters: { nameHash: Hash } & BlockchainSubmissionParams): Promise<OpenLoc> {
        this.ensureCanPublish();
        const client = this.locSharedState.client;
        const metadata = this.findMetadata(parameters.nameHash, "REVIEW_ACCEPTED");
        await client.publishMetadata({
            ...metadata,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    private findMetadata(nameHash: Hash, status: ItemStatus): EstimateFeesPublishMetadataParams {
        const metadata = this.request.metadata.find(metadata => metadata.nameHash === nameHash.toHex() && metadata.status === status);
        if (!metadata) {
            throw new Error(`Metadata ${ nameHash.toHex() } with status ${ status } not found`);
        }
        return {
            locId: this.locId,
            metadata: {
                name: metadata.name,
                value: metadata.value,
                submitter: this.locSharedState.nodeApi.queries.getValidAccountId(metadata.submitter.address, metadata.submitter.type),
            }
        }
    }

    async estimateFeesPublishMetadata(parameters: { nameHash: Hash }): Promise<FeesClass> {
        const client = this.locSharedState.client;
        const metadata = this.findMetadata(parameters.nameHash, "REVIEW_ACCEPTED");
        return client.estimateFeesPublishMetadata(metadata);
    }

    async acknowledgeMetadata(parameters: AckMetadataParams): Promise<OpenLoc> {
        this.ensureCanAcknowledge();
        const client = this.locSharedState.client;
        this.findMetadata(parameters.nameHash, "PUBLISHED");
        await client.acknowledgeMetadata({
            locId: this.locId,
            nameHash: parameters.nameHash,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    async estimateFeesAcknowledgeMetadata(parameters: RefMetadataParams): Promise<FeesClass> {
        const client = this.locSharedState.client;
        return await client.estimateFeesAcknowledgeMetadata({
            locId: this.locId,
            ...parameters
        });
    }

    async publishLink(parameters: { target: UUID } & BlockchainSubmissionParams): Promise<OpenLoc> {
        this.ensureCanPublish();
        const client = this.locSharedState.client;
        const link = this.findLink(parameters.target, "REVIEW_ACCEPTED");
        await client.publishLink({
            ...link,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    private findLink(target: UUID, status: ItemStatus): EstimateFeesPublishLinkParams {
        const link = this.request.links.find(link => link.target === target.toString() && link.status === status);
        if(!link) {
            throw new Error(`Link with target ${ target } was not found`);
        }
        return {
            locId: this.locId,
            link: {
                id: target,
                nature: Hash.of(link.nature),
                submitter: this.locSharedState.nodeApi.queries.getValidAccountId(link.submitter.address, link.submitter.type),
            },
        }
    }

    async estimateFeesPublishLink(parameters: { target: UUID }): Promise<FeesClass> {
        const client = this.locSharedState.client;
        const link = this.findLink(parameters.target, "REVIEW_ACCEPTED");
        return client.estimateFeesPublishLink(link);
    }

    async acknowledgeLink(parameters: AckLinkParams): Promise<OpenLoc> {
        this.ensureCanAcknowledge();
        const client = this.locSharedState.client;
        this.findLink(parameters.target, "PUBLISHED");
        await client.acknowledgeLink({
            locId: this.locId,
            target: parameters.target,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.refresh() as OpenLoc;
    }

    async estimateFeesAcknowledgeLink(parameters: RefLinkParams): Promise<FeesClass> {
        const client = this.locSharedState.client;
        return await client.estimateFeesAcknowledgeLink({
            locId: this.locId,
            ...parameters
        });
    }

    get legalOfficer(): LegalOfficerOpenRequestCommands {
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
export class LegalOfficerOpenRequestCommands
extends LegalOfficerCommands
implements LegalOfficeReviewCommands, LegalOfficerNonVoidedCommands, LegalOfficerLocWithSelectableIssuersCommands<OpenLoc>, LegalOfficerRestrictedDeliveryCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        super(args);

        this.legalOfficerNonVoidedCommands = new LegalOfficerNonVoidedCommandsImpl(args);
        this.legalOfficerLocWithSelectableIssuersCommands = new LegalOfficerLocWithSelectableIssuersCommandsImpl(args);
        this.reviewCommands = new LegalOfficeReviewCommandsImpl(args);
        this.restrictedDeliveryCommands = new LegalOfficerRestrictedDeliveryCommandsImpl(args);
    }

    private legalOfficerNonVoidedCommands: LegalOfficerNonVoidedCommands;

    private legalOfficerLocWithSelectableIssuersCommands: LegalOfficerLocWithSelectableIssuersCommands<OpenLoc>;

    private reviewCommands: LegalOfficeReviewCommands;

    private restrictedDeliveryCommands: LegalOfficerRestrictedDeliveryCommands;

    async acknowledgeFile(parameters: AckFileParams): Promise<OpenLoc> {
        const file = this.request.data().files.find(file => file.hash.equalTo(parameters.hash) && file.status === "PUBLISHED");
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

    async estimateFeesAcknowledgeFile(parameters: RefFileParams): Promise<FeesClass> {
        return await this.client.estimateFeesAcknowledgeFile({ locId: this.locId, ...parameters });
    }

    async acknowledgeMetadata(parameters: AckMetadataParams): Promise<OpenLoc> {
        const metadata = this.request.data().metadata.find(metadata => metadata.name.hash.equalTo(parameters.nameHash) && metadata.status === "PUBLISHED");
        if(!metadata) {
            throw new Error("Data was not found or was not published yet");
        }
        await this.client.acknowledgeMetadata({
            locId: this.locId,
            nameHash: parameters.nameHash,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.request.refresh() as OpenLoc;
    }

    async estimateFeesAcknowledgeMetadata(parameters: RefMetadataParams): Promise<FeesClass> {
        return this.client.estimateFeesAcknowledgeMetadata({ locId: this.locId, ...parameters })
    }

    async acknowledgeLink(parameters: AckLinkParams): Promise<OpenLoc> {
        const link = this.request.data().links.find(link => link.target.equalTo(parameters.target) && link.status === "PUBLISHED");
        if(!link) {
            throw new Error("Data was not found or was not published yet");
        }
        await this.client.acknowledgeLink({
            locId: this.locId,
            target: parameters.target,
            signer: parameters.signer,
            callback: parameters.callback,
        });
        return await this.request.refresh() as OpenLoc;
    }

    async estimateFeesAcknowledgeLink(parameters: RefLinkParams): Promise<FeesClass> {
        return this.client.estimateFeesAcknowledgeLink({ locId: this.locId, ...parameters })
    }

    async close(parameters: CloseLocParams): Promise<ClosedLoc | ClosedCollectionLoc> {
        this.ensureCanClose(parameters.autoAck);

        const seal = this.request.data().seal;
        await this.client.close({
            ...parameters,
            locId: this.locId,
            seal,
            autoAck: parameters.autoAck,
        });

        const state = await this.request.refresh();
        if(state.data().locType === "Collection") {
            return state as ClosedCollectionLoc;
        } else {
            return state as ClosedLoc;
        }
    }

    ensureCanClose(autoAck: boolean) {
        if(!this.canClose(autoAck)) {
            throw new Error(autoAck ? "Cannot close, all items must have been published and acked by Verified Issuer (if relevant)" : "Cannot close, all items must have been published.");
        }
    }

    canClose(autoAck: boolean): boolean {
        if(autoAck) {
            return this.canAutoAck();
        } else {
            return this.isAllItemsAcknowledged();
        }
    }

    canAutoAck() {
        return this.isNoItem(item => !this.isReadyForAutoAck(item));
    }

    private isReadyForAutoAck(item: ItemLifecycle & { submitter: ValidAccountId }) {
        return this.isAcknowledgedOnChain(item)
            || (this.isPublishedOnChain(item) && (!this.request.isVerifiedIssuer(item.submitter) || item.acknowledgedByVerifiedIssuerOn !== undefined));
    }

    private isAcknowledgedOnChain(item: ItemLifecycle & { submitter: ValidAccountId }) {
        return item.status === "ACKNOWLEDGED"
            && (
                (this.request.isVerifiedIssuer(item.submitter) && item.acknowledgedByOwnerOn !== undefined && item.acknowledgedByVerifiedIssuerOn !== undefined)
                || (!this.request.isVerifiedIssuer(item.submitter) && item.acknowledgedByOwnerOn !== undefined)
            )
    }

    private isPublishedOnChain(item: ItemLifecycle & { submitter: ValidAccountId }) {
        return item.status === "PUBLISHED" && item.addedOn !== undefined;
    }

    private isNoItem(predicate: (item: ItemLifecycle & { submitter: ValidAccountId }) => boolean): boolean {
        const data = this.request.data();
        return data.files.find(predicate) === undefined
            && data.metadata.find(predicate) === undefined
            && data.links.find(predicate) === undefined;
    }

    private isAllItemsAcknowledged() {
        return this.isNoItem(item => !this.isAcknowledgedOnChain(item));
    }

    async voidLoc(params: VoidParams): Promise<VoidedLoc | VoidedCollectionLoc> {
        return this.legalOfficerNonVoidedCommands.voidLoc(params);
    }

    async getVerifiedIssuers(): Promise<VerifiedIssuerWithSelect[]> {
        return this.legalOfficerLocWithSelectableIssuersCommands.getVerifiedIssuers();
    }

    async selectIssuer(params: SelectUnselectIssuerParams): Promise<OpenLoc> {
        return this.legalOfficerLocWithSelectableIssuersCommands.selectIssuer(params);
    }

    async unselectIssuer(params: SelectUnselectIssuerParams): Promise<OpenLoc> {
        return this.legalOfficerLocWithSelectableIssuersCommands.unselectIssuer(params);
    }

    reviewFile(params: ReviewFileParams): Promise<ReviewableRequest> {
        return this.reviewCommands.reviewFile(params);
    }

    reviewMetadata(params: ReviewMetadataParams): Promise<ReviewableRequest> {
        return this.reviewCommands.reviewMetadata(params);
    }

    reviewLink(params: ReviewLinkParams): Promise<ReviewableRequest> {
        return this.reviewCommands.reviewLink(params);
    }

    setCollectionFileRestrictedDelivery(params: { hash: Hash; restrictedDelivery: boolean; }): Promise<LocRequestState> {
        return this.restrictedDeliveryCommands.setCollectionFileRestrictedDelivery(params);
    }
}

export interface CloseLocParams extends BlockchainSubmissionParams {
    autoAck: boolean;
}

export interface LegalOfficerNonVoidedCommands {
    voidLoc(params: VoidParams): Promise<VoidedLoc | VoidedCollectionLoc>;
}

export class LegalOfficerNonVoidedCommandsImpl extends LegalOfficerCommands implements LegalOfficerNonVoidedCommands {

    async voidLoc(params: VoidParams): Promise<VoidedLoc | VoidedCollectionLoc> {
        await this.client.voidLoc({
            ...params,
            locId: this.locId,
        });
        return await this.request.refresh() as (VoidedLoc | VoidedCollectionLoc);
    }
}

export interface LegalOfficerLocWithSelectableIssuersCommands<T extends LocRequestState> {
    getVerifiedIssuers(): Promise<VerifiedIssuerWithSelect[]>;
    selectIssuer(params: SelectUnselectIssuerParams): Promise<T>;
    unselectIssuer(params: SelectUnselectIssuerParams): Promise<T>;
}

export class LegalOfficerLocWithSelectableIssuersCommandsImpl<T extends LocRequestState>
extends LegalOfficerCommands
implements LegalOfficerLocWithSelectableIssuersCommands<T> {

    async getVerifiedIssuers(): Promise<VerifiedIssuerWithSelect[]> {
        const allVerifiedIssuers = await this.client.getLegalOfficerVerifiedIssuers();
        const locData = this.request.data();
        const selectedIssuers = locData.issuers;

        return allVerifiedIssuers
            .filter(issuer => issuer.address !== locData.requesterAddress?.address)
            .map(issuer => {
                const selected = selectedIssuers.find(selectedIssuer => selectedIssuer.address === issuer.address);
                if(selected && selected.firstName && selected.lastName) {
                    return {
                        firstName: selected.firstName,
                        lastName: selected.lastName,
                        identityLocId: selected.identityLocId,
                        address: selected.address,
                        selected: selected.selected || false,
                    };
                } else {
                    return {
                        firstName: issuer.identity.firstName,
                        lastName: issuer.identity.lastName,
                        identityLocId: issuer.identityLocId,
                        address: issuer.address,
                        selected: selected?.selected || false,
                    };
                }
            })
            .sort((issuer1, issuer2) => issuer1.lastName.localeCompare(issuer2.lastName));
    }

    async selectIssuer(params: SelectUnselectIssuerParams): Promise<T> {
        return this.setIssuerSelection({
            ...params,
            selected: true,
        });
    }

    private async setIssuerSelection(params: { issuer: string, selected: boolean } & BlockchainSubmissionParams): Promise<T> {
        await this.client.setIssuerSelection({
            ...params,
            locId: this.request.data().id,
        });
        return await this.request.refresh() as T;
    }

    async unselectIssuer(params: SelectUnselectIssuerParams): Promise<T> {
        return this.setIssuerSelection({
            ...params,
            selected: false,
        });
    }
}

export type VerifiedIssuerWithSelect = VerifiedIssuer & { selected: boolean };

export interface SelectUnselectIssuerParams extends BlockchainSubmissionParams {
    issuer: string;
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

    get legalOfficer(): LegalOfficerClosedLocCommands {
        return new LegalOfficerClosedLocCommands({
            locId: this.locId,
            client: this.locSharedState.client,
            request: this,
        });
    }
}

export class LegalOfficerClosedLocCommands extends LegalOfficerNonVoidedCommandsImpl {

    async nominateIssuer(params: BlockchainSubmissionParams): Promise<ClosedLoc> {
        const data = this.request.data();
        if(data.locType !== "Identity") {
            throw new Error("Not an Identity LOC");
        }

        if(!data.requesterAddress || data.requesterAddress.type !== "Polkadot") {
            throw new Error("Identity LOC has no Polkadot requester");
        }

        await this.client.nominateIssuer({
            ...params,
            locId: data.id,
            requester: data.requesterAddress.address,
        });

        return await this.request.refresh() as ClosedLoc;
    }

    async dismissIssuer(params: BlockchainSubmissionParams): Promise<ClosedLoc> {
        const data = this.request.data();
        if(data.locType !== "Identity") {
            throw new Error("Not an Identity LOC");
        }

        if(!data.requesterAddress || data.requesterAddress.type !== "Polkadot") {
            throw new Error("Identity LOC has no Polkadot requester");
        }

        await this.client.dismissIssuer({
            ...params,
            requester: data.requesterAddress.address,
        });

        return await this.request.refresh() as ClosedLoc;
    }

    async requestVote(params: BlockchainSubmissionParams): Promise<string> {
        const data = this.request.data();
        if(data.locType !== "Identity") {
            throw new Error("Not an Identity LOC");
        }

        return this.client.requestVote({
            ...params,
            locId: data.id,
        });
    }
}

export async function getCollectionItem(parameters: { locClient: LocClient, locId: UUID, itemId: Hash }): Promise<CollectionItemClass | undefined> {
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

export async function getTokensRecord(parameters: { locClient: LocClient, locId: UUID, recordId: Hash }): Promise<TokensRecordClass | undefined> {
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

    async getCollectionItem(parameters: { itemId: Hash }): Promise<CollectionItemClass | undefined> {
        return getCollectionItem({
            locClient: this.locSharedState.client,
            locId: this.locId,
            itemId: parameters.itemId,
        });
    }

    async getCollectionItems(): Promise<CollectionItemClass[]> {
        const clientItems = await this.locSharedState.client.getCollectionItems({
            locId: this.locId,
        });
        return clientItems.map(clientItem => new CollectionItemClass({
            locId: this.locId,
            locClient: this.locSharedState.client,
            clientItem,
        }));
    }

    override async checkHash(hash: Hash): Promise<CheckHashResult> {
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

    async getTokensRecord(parameters: { recordId: Hash }): Promise<TokensRecordClass | undefined> {
        return getTokensRecord({
            locClient: this.locSharedState.client,
            locId: this.locId,
            recordId: parameters.recordId,
        });
    }

    async getTokensRecords(): Promise<TokensRecordClass[]> {
        return getTokensRecords({
            locClient: this.locSharedState.client,
            locId: this.locId,
        });
    }
}

export interface UploadCollectionItemFileParams {
    itemId: Hash,
    itemFile: HashOrContent,
}

export interface UploadTokensRecordFileParams {
    recordId: Hash,
    file: HashOrContent,
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
        return this.getCurrentStateOrThrow() as ClosedCollectionLoc;
    }

    async estimateFeesAddCollectionItem(parameters: EstimateFeesAddCollectionItemParams): Promise<FeesClass> {
        const client = this.locSharedState.client;
        const collectionItemFee = this.data().fees.collectionItemFee;
        if(collectionItemFee === undefined) {
            throw new Error("Collection item fee not set");
        }
        return client.estimateFeesAddCollectionItem({
            locId: this.locId,
            collectionItemFee,
            ...parameters,
        })
    }

    async uploadCollectionItemFile(parameters: UploadCollectionItemFileParams): Promise<ClosedCollectionLoc> {
        const client = this.locSharedState.client;
        await client.uploadItemFile({
            locId: this.locId,
            itemId: parameters.itemId,
            file: parameters.itemFile,
        })
        return this.getCurrentStateOrThrow() as ClosedCollectionLoc;
    }

    async addTokensRecord(parameters: AddTokensRecordParams): Promise<ClosedCollectionLoc> {
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
        return this.getCurrentStateOrThrow() as ClosedCollectionLoc;
    }

    async estimateFeesAddTokensRecord(parameters: EstimateFeesAddTokensRecordParams): Promise<FeesClass> {
        const client = this.locSharedState.client;
        const tokensRecordFee = this.data().fees.tokensRecordFee;
        if(tokensRecordFee === undefined) {
            throw new Error("Collection item fee not set");
        }
        return client.estimateFeesAddTokensRecord({
            locId: this.locId,
            tokensRecordFee,
            ...parameters,
        })
    }

    async uploadTokensRecordFile(parameters: UploadTokensRecordFileParams): Promise<ClosedCollectionLoc> {
        const client = this.locSharedState.client;
        await client.uploadTokensRecordFile({
            locId: this.locId,
            recordId: parameters.recordId,
            file: parameters.file,
        })
        return this.getCurrentStateOrThrow() as ClosedCollectionLoc;
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

    get legalOfficer(): LegalOfficerClosedCollectionLocCommands {
        return new LegalOfficerClosedCollectionLocCommands({
            locId: this.locId,
            client: this.locSharedState.client,
            request: this,
        });
    }
}

export class LegalOfficerClosedCollectionLocCommands
extends LegalOfficerNonVoidedCommandsImpl
implements LegalOfficerLocWithSelectableIssuersCommands<ClosedCollectionLoc>, LegalOfficerRestrictedDeliveryCommands {

    constructor(args: LegalOfficerCommandsConstructorArgs) {
        super(args);

        this.legalOfficerLocWithSelectableIssuersCommands = new LegalOfficerLocWithSelectableIssuersCommandsImpl(args);
        this.restrictedDeliveryCommands = new LegalOfficerRestrictedDeliveryCommandsImpl(args);
    }

    private legalOfficerLocWithSelectableIssuersCommands: LegalOfficerLocWithSelectableIssuersCommands<ClosedCollectionLoc>;

    private restrictedDeliveryCommands: LegalOfficerRestrictedDeliveryCommandsImpl;

    async getVerifiedIssuers(): Promise<VerifiedIssuerWithSelect[]> {
        return this.legalOfficerLocWithSelectableIssuersCommands.getVerifiedIssuers();
    }

    async selectIssuer(params: SelectUnselectIssuerParams): Promise<ClosedCollectionLoc> {
        return this.legalOfficerLocWithSelectableIssuersCommands.selectIssuer(params);
    }

    async unselectIssuer(params: SelectUnselectIssuerParams): Promise<ClosedCollectionLoc> {
        return this.legalOfficerLocWithSelectableIssuersCommands.unselectIssuer(params);
    }

    setCollectionFileRestrictedDelivery(params: {
        hash: Hash,
        restrictedDelivery: boolean,
    }): Promise<LocRequestState> {
        return this.restrictedDeliveryCommands.setCollectionFileRestrictedDelivery(params);
    }
}

async function requestSof(locSharedState: LocSharedState, locId: UUID, itemId?: Hash): Promise<PendingRequest> {
    const client = locSharedState.client;
    const locRequest = await client.createSofRequest({ locId, itemId });
    return new PendingRequest(locSharedState, locRequest, undefined, EMPTY_LOC_ISSUERS).veryNew(); // Discards this state
}

export class VoidedLoc extends LocRequestState {

    async replacerLoc(): Promise<OpenLoc | ClosedLoc | VoidedLoc | undefined> {
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
