import { AnyJson } from "@polkadot/types-codec/types";
import { UUID } from "./UUID.js";

export interface TypesAccountData {
    available: string,
    reserved: string,
    total: string,
}

export interface MetadataItem {
    name: string;
    value: string;
    submitter: string;
}

export interface File {
    hash: string;
    nature: string;
    submitter: string;
    size: bigint;
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
    seal?: string;
}

export type LocType = 'Transaction' | 'Collection' | 'Identity';

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
    termsAndConditions: TermsAndConditionsElement[],
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

export interface TermsAndConditionsElement {
    tcType: string;
    tcLocId: UUID;
    details: string;
}

export function isLogionIdentityLoc(loc: LegalOfficerCase): boolean {
    return loc.locType === 'Identity' && !loc.requesterAddress && !loc.requesterLocId;
}

export function isLogionDataLoc(loc: LegalOfficerCase): boolean {
    return loc.locType !== 'Identity' && (loc.requesterLocId !== undefined && loc.requesterLocId !== null);
}

export interface TypesJsonObject {
    [index: string]: AnyJson
}

export interface TypesJsonCall extends TypesJsonObject {
    method: string;
    section: string;
    args: TypesJsonObject;
}

export interface TypesEvent {
    name: string;
    section: string;
    data: TypesJsonObject | AnyJson[];
}

export interface TypesErrorMetadata {
    readonly pallet: string;
    readonly error: string;
    readonly details: string;
}

export interface TypesTokensRecordFile {
    name: string;
    contentType: string;
    size: string;
    hash: string;
}

export interface TypesTokensRecord {
    description: string;
    files: TypesTokensRecordFile[];
    submitter: string;
}

export interface TypesRecoveryConfig {
    legalOfficers: string[];
}
