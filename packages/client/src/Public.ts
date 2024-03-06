import { LegalOfficerCase, UUID, FeesEstimator, Hash } from "@logion/node-api";

import { CollectionItem } from "./CollectionItem.js";
import { CheckCertifiedCopyResult, CheckResultType } from "./Deliveries.js";
import { CheckHashResult, getCollectionItem, getTokensRecord, getTokensRecords, LocData, LocRequestState } from "./Loc.js";
import {
    EMPTY_LOC_ISSUERS,
    FetchParameters,
    LocClient,
    LocMultiClient,
    PublicLocClient,
    GetTokensRecordsRequest
} from "./LocClient.js";
import { SharedState } from "./SharedClient.js";
import { TokensRecord } from "./TokensRecord.js";

export class PublicApi {

    constructor(args: {
        sharedState: SharedState
    }) {
        this.sharedState = args.sharedState;
        this.fees = args.sharedState.nodeApi.fees;
    }

    private sharedState: SharedState;

    readonly fees: FeesEstimator;

    async findLocById(params: FetchParameters): Promise<PublicLoc | undefined> {
        const locAndClient = await this.getLocAndClient(params);
        if(!locAndClient) {
            return undefined;
        }
        const { loc, client } = locAndClient;

        const locRequest = await client.getLocRequest(params);
        const data = LocRequestState.buildLocData(this.sharedState.nodeApi, loc, locRequest, EMPTY_LOC_ISSUERS, []);
        return new PublicLoc({
            data,
            client,
        });
    }

    private async getLocAndClient(params: FetchParameters): Promise<{ loc: LegalOfficerCase, client: LocClient } | undefined> {
        const loc = await LocMultiClient.getLoc({
            ...params,
            api: this.sharedState.nodeApi,
        });
        const legalOfficer = this.sharedState.legalOfficers.find(lo => lo.address === loc.owner);
        if (!legalOfficer) {
            return undefined;
        }
        const client = new PublicLocClient({
            axiosFactory: this.sharedState.axiosFactory,
            nodeApi: this.sharedState.nodeApi,
            legalOfficer,
        });
        return {
            loc,
            client,
        }
    }

    async findCollectionLocItemById(params: { locId: UUID, itemId: Hash }): Promise<CollectionItem | undefined> {
        const locAndClient = await this.getLocAndClient(params);
        if(!locAndClient) {
            return undefined;
        }
        const { client } = locAndClient;

        return getCollectionItem({
            locClient: client,
            locId: params.locId,
            itemId: params.itemId,
        });
    }

    async getTokensRecords(params: GetTokensRecordsRequest): Promise<TokensRecord[]> {
        const { locId, jwtToken } = params;
        const locAndClient = await this.getLocAndClient(params);
        if(!locAndClient) {
            return [];
        }
        const { client } = locAndClient;

        return getTokensRecords({
            locClient: client,
            locId,
            jwtToken,
        })
    }

    async getTokensRecord(params: { locId: UUID, recordId: Hash }): Promise<TokensRecord | undefined> {
        const { locId, recordId } = params;
        const locAndClient = await this.getLocAndClient(params);
        if (!locAndClient) {
            return undefined
        }
        return getTokensRecord({
            locClient: locAndClient.client,
            locId,
            recordId,
        })
    }
}

export class PublicLoc {

    constructor(args: {
        data: LocData,
        client: PublicLocClient,
    }) {
        this._data = args.data;
        this._client = args.client;
    }

    private readonly _data: LocData;

    private readonly _client: PublicLocClient;

    get data(): LocData {
        return this._data;
    }

    get client(): PublicLocClient {
        return this._client;
    }

    async checkHash(hash: Hash, itemId?: Hash): Promise<CheckHashResult> {
        const result = LocRequestState.checkHash(this._data, hash);
        let collectionItem = undefined;
        let collectionItemFile = undefined;
        if(this._data.locType === "Collection") {
            collectionItem = await getCollectionItem({
                locClient: this._client,
                locId: this._data.id,
                itemId: hash,
            });
            if (itemId) {
                const collectionItemToInspect = await getCollectionItem({
                    locClient: this._client,
                    locId: this._data.id,
                    itemId,
                });
                collectionItemFile = collectionItemToInspect?.getItemFile(hash);
            }
        }
        return {
            ...result,
            collectionItem,
            collectionItemFile
        };
    }

    isLogionIdentityLoc(): boolean {
        return this._data.locType === "Identity" && !this._data.requesterAddress && !this._data.requesterLocId;
    }

    isLogionDataLoc(): boolean {
        return this._data.locType !== 'Identity' && this._data.requesterLocId !== null && this._data.requesterLocId !== undefined;
    }

    async checkCertifiedCopy(hash: Hash): Promise<CheckCertifiedCopyResult> {
        try {
            const delivery = await this._client.checkDelivery({
                locId: this._data.id,
                hash,
            });
            return {
                summary: CheckResultType.POSITIVE,
                logionOrigin: CheckResultType.POSITIVE,
                latest: CheckResultType.NEGATIVE,
                nftOwnership: CheckResultType.NEGATIVE,
                match: {
                    ...delivery,
                    belongsToCurrentOwner: false,
                }
            }
        } catch (e) {
            return {
                summary: CheckResultType.NEGATIVE,
                logionOrigin: CheckResultType.NEGATIVE,
                latest: CheckResultType.NEGATIVE,
                nftOwnership: CheckResultType.NEGATIVE,
            }
        }
    }
}
