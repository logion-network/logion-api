import { UUID } from "@logion/node-api";

import { ItemDelivery, LocClient, UploadableCollectionItem, UploadableItemFile } from "./LocClient";
import { ItemTokenWithRestrictedType } from "./Token";
import { License, newLicense } from "./license";

export class CollectionItem implements UploadableCollectionItem {

    constructor(args: {
        locId: UUID,
        locClient: LocClient,
        clientItem: UploadableCollectionItem,
    }) {
        this._locId = args.locId;
        this.locClient = args.locClient;
        this.clientItem = args.clientItem;
    }

    private readonly _locId: UUID;

    private locClient: LocClient;

    private clientItem: UploadableCollectionItem;


    get locId(): UUID {
        return this._locId;
    }

    get id(): string {
        return this.clientItem.id;
    }

    get description(): string {
        return this.clientItem.description;
    }

    get addedOn(): string {
        return this.clientItem.addedOn;
    }

    get files(): UploadableItemFile[] {
        return this.clientItem.files;
    }

    get token(): ItemTokenWithRestrictedType | undefined {
        return this.clientItem.token;
    }

    get restrictedDelivery(): boolean {
        return this.clientItem.restrictedDelivery;
    }

    get license(): License | undefined {
        const license = this.clientItem.license;
        return license ? newLicense(license.type, license.licenseLocId, license.details) : undefined;
    }

    async checkCertifiedCopy(hash: string): Promise<CheckCertifiedCopyResult> {
        if(!this.clientItem.restrictedDelivery) {
            throw new Error("No restricted delivery possible with this item");
        }

        const deliveries = await this.locClient.getDeliveries({ locId: this._locId, itemId: this.clientItem.id });
        for(const originalFileHash of Object.keys(deliveries)) {
            for(let i = 0; i < deliveries[originalFileHash].length; ++i) {
                const delivery = deliveries[originalFileHash][i];
                if(delivery.copyHash === hash) {
                    return {
                        match: {
                            ...delivery,
                            originalFileHash
                        },
                        summary: i === 0 && delivery.belongsToCurrentOwner ? CheckResultType.POSITIVE : CheckResultType.NEGATIVE,
                        logionOrigin: CheckResultType.POSITIVE,
                        latest: i === 0 ? CheckResultType.POSITIVE : CheckResultType.NEGATIVE,
                        nftOwnership: delivery.belongsToCurrentOwner ? CheckResultType.POSITIVE : CheckResultType.NEGATIVE,
                    };
                }
            }
        }
        return {
            summary: CheckResultType.NEGATIVE,
            logionOrigin: CheckResultType.NEGATIVE,
            latest: CheckResultType.NEGATIVE,
            nftOwnership: CheckResultType.NEGATIVE,
        };
    }
}

export interface CheckCertifiedCopyResult {
    match?: ItemDeliveryMatch;
    summary: CheckResultType;
    logionOrigin: CheckResultType;
    nftOwnership: CheckResultType;
    latest: CheckResultType;
}

export interface ItemDeliveryMatch extends ItemDelivery {
    originalFileHash: string;
}

export enum CheckResultType {
    POSITIVE,
    NEGATIVE,
}
