import { CollectionItem, Hash, LegalOfficerCase, LocBatch, LocType, UUID, ValidAccountId, VerifiedIssuerType, VoidInfo } from "@logion/node-api";
import { DateTime } from "luxon";
import { Mock } from "moq.ts";

import { HashString, LocFile, LocLink, LocRequest, LocRequestStatus, OffchainCollectionItem, UploadableItemFile } from "../src/index.js";
import {
    REQUESTER,
    buildValidPolkadotAccountId
} from "./Utils.js";

export const EXISTING_FILE_HASH = Hash.fromHex("0xa4d9f9f1a02baae960d1a7c4cedb25940a414ae4c545bf2f14ab24691fec09a5");

export const EXISTING_FILE: LocFile = {
    name: "existing-file.txt",
    hash: EXISTING_FILE_HASH.toHex(),
    nature: "Some nature",
    submitter: REQUESTER,
    restrictedDelivery: false,
    contentType: "text/plain",
    size: "42",
    status: "ACKNOWLEDGED",
};

export const EXISTING_ITEM_FILE_HASH = Hash.fromHex("0x8443d95fceccd27c0ca8d8c8d6c443ddc787afc234620a5548baf8c7b46aa277");

export const EXISTING_ITEM_FILE: UploadableItemFile = {
    name: HashString.fromValue("existing-item-file.txt"),
    hash: EXISTING_ITEM_FILE_HASH,
    contentType: HashString.fromValue("text/plain"),
    size: 0n,
    uploaded: false,
}

export const EXISTING_LINK_TARGET = new UUID();

export const EXISTING_LINK: LocLink = {
    target: EXISTING_LINK_TARGET.toString(),
    nature: "Some nature",
    addedOn: DateTime.now().toISO(),
};

export type LocAndRequest = {
    request: LocRequest,
    loc: LegalOfficerCase
}

export function buildLocAndRequest(ownerAddress: string, status: LocRequestStatus, locType: LocType, voidInfo?: VoidInfo, requester: ValidAccountId = REQUESTER): LocAndRequest {
    return {
        request: buildLocRequest(ownerAddress, status, locType, voidInfo !== undefined, requester),
        loc: buildLoc(ownerAddress, status, locType, voidInfo, requester)
    }
}

export function buildLocRequest(ownerAddress: string, status: LocRequestStatus, locType: LocType, voided?: boolean, requester: ValidAccountId = REQUESTER): LocRequest {
    return {
        id: new UUID().toString(),
        createdOn: DateTime.now().toISO(),
        description: `Some ${status} ${locType} LOC owned by ${ownerAddress}`,
        files: [ EXISTING_FILE ],
        links: [ EXISTING_LINK ],
        metadata: [],
        requesterAddress: requester,
        ownerAddress,
        status,
        locType,
        voidInfo: voided ? { reason: "Some voiding reason.", voidedOn: DateTime.now().toISO() } : undefined,
        selectedIssuers: [],
    };
}

export const ISSUER = buildValidPolkadotAccountId("5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb")!;

export function buildLoc(ownerAddress: string, status: LocRequestStatus, locType: LocType, voidInfo?: VoidInfo, requester: ValidAccountId = REQUESTER): LegalOfficerCase {
    return {
        owner: ownerAddress,
        requesterAddress: requester,
        metadata: [],
        files: [
            {
                hash: EXISTING_FILE_HASH,
                nature: Hash.of("Some nature"),
                submitter: requester,
                size: 128n,
                acknowledged: status === "CLOSED",
            }
        ],
        links: [],
        closed: status === "CLOSED",
        locType,
        voidInfo,
        collectionCanUpload: false,
    };
}

export const ITEM_DESCRIPTION = "Some item description";

export function buildCollectionItem(): CollectionItem {
    return {
        id: EXISTING_ITEM_ID,
        description: Hash.of(ITEM_DESCRIPTION),
        files: [],
        restrictedDelivery: false,
        termsAndConditions: [],
    };
}

export const EXISTING_ITEM_ID = Hash.fromHex("0x3ba63a86247fac44f6f196db27ec10fdf5335367e3f6ac6be8da8594645bfc85");

export function buildOffchainCollectionItem(collectionLocId: string): OffchainCollectionItem {
    return ({
        collectionLocId,
        itemId: EXISTING_ITEM_ID.toHex(),
        addedOn: DateTime.now().toISO(),
        files: [],
        termsAndConditions: [],
    });
}

export function mockVoidInfo(): VoidInfo {
    return {};
}

export function mockGetLegalOfficerCase(ALL_LOCS: LocAndRequest[]): ((locId: UUID) => Promise<LegalOfficerCase | undefined>) {
    return (id: UUID) => {
        const locData = ALL_LOCS.find(locData => new UUID(locData.request.id).toString() === id.toString());
        if(locData) {
            return Promise.resolve(locData.loc);
        } else {
            return Promise.resolve(undefined);
        }
    };
}

export function mockLocBatchFactory(ALL_LOCS: LocAndRequest[], verifiedIssuer?: VerifiedIssuerType): ((locIds: UUID[]) => LocBatch) {
    return (locIds: UUID[]) => {
        const locBatch = new Mock<LocBatch>();
        const stringIds = locIds.map(uuid => uuid.toString());

        const getLocsImpl = () => {
            const locs: Record<string, LegalOfficerCase> = {};
            ALL_LOCS.forEach(locAndRequest => {
                if(stringIds.includes(locAndRequest.request.id)) {
                    locs[new UUID(locAndRequest.request.id).toDecimalString()] = locAndRequest.loc;
                }
            });
            return Promise.resolve(locs);
        };
        locBatch.setup(instance => instance.getLocs).returns(getLocsImpl);

        const getLocsVerifiedIssuersImpl = () => {
            const locsVerifiedIssuers: Record<string, VerifiedIssuerType[]> = {};
            ALL_LOCS.forEach(locAndRequest => {
                if(stringIds.includes(locAndRequest.request.id)) {
                    locsVerifiedIssuers[new UUID(locAndRequest.request.id).toDecimalString()] ||= [];
                    if(verifiedIssuer) {
                        locsVerifiedIssuers[new UUID(locAndRequest.request.id).toDecimalString()].push(verifiedIssuer);
                    }
                }
            });
            return Promise.resolve(locsVerifiedIssuers);
        };
        locBatch.setup(instance => instance.getLocsVerifiedIssuers).returns(getLocsVerifiedIssuersImpl);

        const getAvailableVerifiedIssuersImpl = () => {
            const availableVerifiedIssuers: Record<string, VerifiedIssuerType[]> = {};
            ALL_LOCS.forEach(locAndRequest => {
                if(stringIds.includes(locAndRequest.request.id)) {
                    availableVerifiedIssuers[locAndRequest.request.ownerAddress] ||= [];
                    if(verifiedIssuer) {
                        availableVerifiedIssuers[locAndRequest.request.ownerAddress].push(verifiedIssuer);
                    }
                }
            });
            return Promise.resolve(availableVerifiedIssuers);
        };
        locBatch.setup(instance => instance.getAvailableVerifiedIssuers).returns(getAvailableVerifiedIssuersImpl);

        return locBatch.object();
    };
}
