import { Hash } from "@logion/node-api";
import { HexString } from "@polkadot/util/types";

export function checkCertifiedCopy(deliveries: ItemDeliveries, hash: Hash): CheckCertifiedCopyResult {
    for(const originalFileHash of Object.keys(deliveries)) {
        for(let i = 0; i < deliveries[originalFileHash].length; ++i) {
            const delivery = deliveries[originalFileHash][i];
            if(delivery.copyHash === hash.toHex()) {
                return {
                    match: {
                        ...delivery,
                        originalFileHash: Hash.fromHex(originalFileHash as HexString),
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

export interface Delivery {
    copyHash: string;
    generatedOn: string;
    owner: string;
}

export interface ItemDeliveries {
    [key: string]: ItemDelivery[];
}

export interface ItemDelivery extends Delivery {
    belongsToCurrentOwner: boolean;
}

export interface CollectionDelivery extends Delivery {
    originalFileHash: Hash;
}

export interface CheckCertifiedCopyResult {
    match?: ItemDeliveryMatch;
    summary: CheckResultType;
    logionOrigin: CheckResultType;
    nftOwnership: CheckResultType;
    latest: CheckResultType;
}

export interface ItemDeliveryMatch extends ItemDelivery {
    originalFileHash: Hash;
}

export enum CheckResultType {
    POSITIVE,
    NEGATIVE,
}
