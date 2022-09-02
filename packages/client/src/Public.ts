import { LegalOfficerCase, UUID } from "@logion/node-api";

import { CollectionItem } from "./CollectionItem";
import { CheckHashResult, getCollectionItem, LocData, LocRequestState } from "./Loc";
import { FetchParameters, LocClient, LocMultiClient, PublicLocClient } from "./LocClient";
import { SharedState } from "./SharedClient";

export class PublicApi {

    constructor(args: {
        sharedState: SharedState
    }) {
        this.sharedState = args.sharedState;
    }

    private sharedState: SharedState;

    async findLocById(params: FetchParameters): Promise<PublicLoc | undefined> {
        const locAndClient = await this.getLocAndClient(params);
        if(!locAndClient) {
            return undefined;
        }
        const { loc, client } = locAndClient;

        const locRequest = await client.getLocRequest(params);
        const data = LocRequestState.buildLocData(loc, locRequest);
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

    async findCollectionLocItemById(params: { locId: UUID, itemId: string }): Promise<CollectionItem | undefined> {
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
}

export class PublicLoc {

    constructor(args: {
        data: LocData,
        client: PublicLocClient,
    }) {
        this._data = args.data;
        this.client = args.client;
    }

    private _data: LocData;

    private client: PublicLocClient;

    get data(): LocData {
        return this._data;
    }

    async checkHash(hash: string): Promise<CheckHashResult> {
        const result = LocRequestState.checkHash(this._data, hash);
        let collectionItem = undefined;
        if(this._data.locType === "Collection") {
            collectionItem = await getCollectionItem({
                locClient: this.client,
                locId: this._data.id,
                itemId: hash,
            });
        }
        return {
            ...result,
            collectionItem,
        };
    }

    isLogionIdentityLoc(): boolean {
        return this._data.locType === "Identity" && !this._data.requesterAddress && !this._data.requesterLocId;
    }

    isLogionDataLoc(): boolean {
        return this._data.locType !== 'Identity' && this._data.requesterLocId !== null && this._data.requesterLocId !== undefined;
    }
}
