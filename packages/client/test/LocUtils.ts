import { LocType, UUID, ValidAccountId } from "@logion/node-api";
import {
    PalletLogionLocLegalOfficerCase,
    PalletLogionLocRequester,
    PalletLogionLocLocType,
    PalletLogionLocFile,
    PalletLogionLocCollectionItem,
    PalletLogionLocLocVoidInfo,
    PalletLogionLocSupportedAccountId,
} from "@polkadot/types/lookup";
import { AccountId32, H256 } from "@polkadot/types/interfaces/runtime";
import { Option, Bytes, u32 } from "@polkadot/types-codec";
import { DateTime } from "luxon";
import { Mock } from "moq.ts";

import { LocFile, LocRequest, LocRequestStatus, OffchainCollectionItem, UploadableItemFile } from "../src/index.js";
import {
    mockBool,
    mockCodecWithToHex,
    mockCodecWithToString,
    mockCodecWithToUtf8,
    mockEmptyOption,
    mockOption,
    mockVec,
    REQUESTER,
    mockCodecWithToBigInt,
    buildValidPolkadotAccountId
} from "./Utils.js";

export const EXISTING_FILE_HASH = "0xa4d9f9f1a02baae960d1a7c4cedb25940a414ae4c545bf2f14ab24691fec09a5";

export const EXISTING_FILE: LocFile = {
    name: "existing-file.txt",
    hash: EXISTING_FILE_HASH,
    nature: "Some nature",
    submitter: REQUESTER,
    restrictedDelivery: false,
    contentType: "text/plain",
    size: "42",
};

export const EXISTING_ITEM_FILE_HASH = "0x8443d95fceccd27c0ca8d8c8d6c443ddc787afc234620a5548baf8c7b46aa277";

export const EXISTING_ITEM_FILE: UploadableItemFile = {
    name: "existing-item-file.txt",
    hash: EXISTING_ITEM_FILE_HASH,
    contentType: "text/plain",
    size: 0n,
    uploaded: false,
}

export type LocAndRequest = {
    request: LocRequest,
    loc: Option<PalletLogionLocLegalOfficerCase>
}

export function buildLocAndRequest(ownerAddress: string, status: LocRequestStatus, locType: LocType, voidInfo?: Option<PalletLogionLocLocVoidInfo>, requester: ValidAccountId = REQUESTER): LocAndRequest {
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
        links: [],
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

export function buildLoc(ownerAddress: string, status: LocRequestStatus, locType: LocType, voidInfo?: Option<PalletLogionLocLocVoidInfo>, requester: ValidAccountId = REQUESTER): Option<PalletLogionLocLegalOfficerCase> {
    return mockOption<PalletLogionLocLegalOfficerCase>({
        owner: mockCodecWithToString<AccountId32>(ownerAddress),
        requester: mockPalletLogionLocRequester(requester),
        metadata: mockVec([]),
        files: mockVec<PalletLogionLocFile>([
            mockLogionLocFile({
                hash: EXISTING_FILE_HASH,
                nature: "Some nature",
                submitter: requester.address,
                size: 128n,
            })
        ]),
        links: mockVec([]),
        closed: mockBool(status === "CLOSED"),
        locType: mockPalletLogionLocLocType(locType),
        voidInfo: voidInfo ? voidInfo : mockEmptyOption(),
        replacerOf: mockEmptyOption(),
        collectionLastBlockSubmission: mockEmptyOption(),
        collectionMaxSize: mockEmptyOption(),
        collectionCanUpload: mockBool(false),
        seal: mockEmptyOption(),
    });
}

function mockPalletLogionLocRequester(address: ValidAccountId): PalletLogionLocRequester {
    const mock = new Mock<PalletLogionLocRequester>();
    if(address.type === "Polkadot") {
        mock.setup(instance => instance.isAccount).returns(true);
        mock.setup(instance => instance.isLoc).returns(false);
        mock.setup(instance => instance.asAccount).returns(mockCodecWithToString<AccountId32>(address.address));
    }
    return mock.object();
}

function mockLogionLocFile(file: {
    hash: string,
    nature: string,
    submitter: string,
    size: bigint,
}): PalletLogionLocFile {
    const mock = new Mock<PalletLogionLocFile>();
    mock.setup(instance => instance.hash_).returns(mockCodecWithToHex<H256>(file.hash));
    mock.setup(instance => instance.nature).returns(mockCodecWithToUtf8<Bytes>(file.nature));
    mock.setup(instance => instance.submitter).returns({ isPolkadot: true, asPolkadot: mockCodecWithToString<AccountId32>(file.submitter) } as PalletLogionLocSupportedAccountId);
    mock.setup(instance => instance.size_).returns(mockCodecWithToBigInt<u32>(file.size));
    return mock.object();
}

function mockPalletLogionLocLocType(locType: LocType): PalletLogionLocLocType {
    const mock = new Mock<PalletLogionLocLocType>();
    mock.setup(instance => instance.isCollection).returns(locType === "Collection");
    mock.setup(instance => instance.isIdentity).returns(locType === "Identity");
    mock.setup(instance => instance.isTransaction).returns(locType === "Transaction");
    mock.setup(instance => instance.toString()).returns(locType);
    return mock.object();
}

export const ITEM_DESCRIPTION = "Some item description";

export function buildCollectionItem(): Option<PalletLogionLocCollectionItem> {
    return mockOption<PalletLogionLocCollectionItem>({
        description: mockCodecWithToUtf8<Bytes>(ITEM_DESCRIPTION),
        token: mockEmptyOption(),
        files: mockVec([]),
        restrictedDelivery: mockBool(false),
        termsAndConditions: mockVec([]),
    });
}

export const EXISTING_ITEM_ID = "0x3ba63a86247fac44f6f196db27ec10fdf5335367e3f6ac6be8da8594645bfc85";

export function buildOffchainCollectionItem(collectionLocId: string): OffchainCollectionItem {
    return ({
        collectionLocId,
        itemId: EXISTING_ITEM_ID,
        addedOn: DateTime.now().toISO(),
        files: [],
    });
}

export function mockVoidInfo(): Option<PalletLogionLocLocVoidInfo> {
    return mockOption<PalletLogionLocLocVoidInfo>({
        replacer: mockEmptyOption(),
    });
}
