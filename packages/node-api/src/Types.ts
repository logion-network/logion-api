import { UUID } from "./UUID";

export interface MetadataItem {
    name: string;
    value: string;
    submitter: string;
}

export interface File {
    hash: string;
    nature: string;
    submitter: string;
}

export interface Link {
    id: UUID;
    nature: string;
}

export interface LegalOfficerCase {
    owner: string;
    requesterAddress?: string;
    requesterLocId?: UUID;
    metadata: MetadataItem[];
    files: File[];
    links: Link[];
    closed: boolean;
    locType: LocType;
    voidInfo?: VoidInfo;
    replacerOf?: UUID;
    collectionLastBlockSubmission?: bigint;
    collectionMaxSize?: number;
    collectionCanUpload: boolean;
}

export type DataLocType = 'Transaction' | 'Collection';

export type LocType = DataLocType | 'Identity';

export type IdentityLocType = 'Polkadot' | 'Logion';

export interface VoidInfo {
    replacer?: UUID;
}

export interface CollectionItem {
    id: string,
    description: string,
    files: ItemFile[],
    token?: ItemToken,
    restrictedDelivery: boolean,
}

export interface ItemFile {
    name: string;
    contentType: string;
    size: bigint;
    hash: string;
}

export interface ItemToken {
    type: string;
    id: string;
}

export function isLogionIdentityLoc(loc: LegalOfficerCase): boolean {
    return loc.locType === 'Identity' && !loc.requesterAddress && !loc.requesterLocId;
}

export function isLogionDataLoc(loc: LegalOfficerCase): boolean {
    return loc.locType !== 'Identity' && (loc.requesterLocId !== undefined && loc.requesterLocId !== null);
}
