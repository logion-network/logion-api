import { AnyJson } from "@polkadot/types-codec/types";
import { isHex } from "@polkadot/util";
import { UUID } from "./UUID.js";
import { ApiPromise } from "@polkadot/api";

export interface TypesAccountData {
    available: string,
    reserved: string,
    total: string,
}

export interface MetadataItemParams {
    name: string;
    value: string;
    submitter: ValidAccountId;
}

export interface MetadataItem extends MetadataItemParams {
    acknowledged: boolean;
}

export interface FileParams {
    hash: string;
    nature: string;
    submitter: ValidAccountId;
    size: bigint;
}

export interface File extends FileParams {
    acknowledged: boolean;
}

export interface Link {
    id: UUID;
    nature: string;
}

export interface LegalOfficerCase {
    owner: string;
    requesterAddress?: ValidAccountId;
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
    sponsorshipId?: UUID;
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

export type AccountType = "Polkadot" | "Ethereum";

export const ETHEREUM_ADDRESS_LENGTH_IN_BITS = 20 * 8;

export interface AccountId {
    readonly address: string;
    readonly type: AccountType;
    equals(other: AccountId): boolean;
}

export class AnyAccountId implements AccountId {

    /**
     * Developers should not construct directly this object but call logionApi.queries.getValidAccountId(address, type).
     * 
     * @param api 
     * @param address 
     * @param type 
     */
    constructor(api: ApiPromise, address: string, type: AccountType) {
        this.api = api;
        this.address = address;
        this.type = type;
    }

    readonly api: ApiPromise;
    readonly address: string;
    readonly type: AccountType;

    isValid(): boolean {
        return this.validate() === undefined;
    }

    validate(): string | undefined {
        if(!["Polkadot", "Ethereum"].includes(this.type)) {
            return `Unsupported address type ${this.type}`;
        }
        if(this.type === "Ethereum" && !isHex(this.address, ETHEREUM_ADDRESS_LENGTH_IN_BITS)) {
            return `Wrong Ethereum address ${this.address}`;
        } else if(this.type === "Polkadot" && !this.isValidPolkadotAccountId()) {
            return `Wrong Polkadot address ${this.address}`;
        } else {
            return undefined;
        }
    }

    private isValidPolkadotAccountId(): boolean {
        try {
            this.api.createType('AccountId', this.address);
            return true;
        } catch(e) {
            return false;
        }
    }

    toValidAccountId(): ValidAccountId {
        return new ValidAccountId(this);
    }

    toKey(): string {
        return accountIdToKey(this);
    }

    static parseKey(api: ApiPromise, key: string): AnyAccountId { 
        if(key.startsWith(POLKADOT_PREFIX)) {
            return new AnyAccountId(api, key.substring(POLKADOT_PREFIX.length), "Polkadot");
        } else if(key.startsWith(ETHEREUM_PREFIX)) {
            return new AnyAccountId(api, key.substring(ETHEREUM_PREFIX.length), "Ethereum");
        } else {
            throw new Error("Unsupported key format");
        }
    }

    equals(other: AccountId): boolean {
        return this.type === other.type && this.address === other.address;
    }
}

const POLKADOT_PREFIX = "Polkadot:";
const ETHEREUM_PREFIX = "Ethereum:";

function accountIdToKey(accountId: AccountId): string {
    return `${accountId.type}:${accountId.address}`;
}

export class ValidAccountId implements AccountId {

    constructor(accountId: AnyAccountId) {
        const error = accountId.validate();
        if(error) {
            throw new Error(error);
        }

        this.address = accountId.address;
        this.type = accountId.type;
    }

    readonly address: string;
    readonly type: AccountType;

    toOtherAccountId(): OtherAccountId {
        return new OtherAccountId(this);
    }

    toKey(): string {
        return accountIdToKey(this);
    }

    static parseKey(api: ApiPromise, key: string): ValidAccountId { 
        return AnyAccountId.parseKey(api, key).toValidAccountId();
    }

    equals(other: AccountId): boolean {
        return this.type === other.type && this.address === other.address;
    }
}

export class OtherAccountId implements AccountId {

    constructor(accountId: ValidAccountId) {
        if(accountId.type === "Polkadot") {
            throw new Error("Type cannot be Polkadot")
        }
        this.validAccountId = accountId;
    }

    private validAccountId: ValidAccountId;

    get address(): string {
        return this.validAccountId.address;
    }

    get type(): AccountType {
        return this.validAccountId.type;
    }

    toKey(): string {
        return accountIdToKey(this);
    }

    toValidAccountId(): ValidAccountId {
        return this.validAccountId;
    }

    equals(other: AccountId): boolean {
        return this.validAccountId.equals(other);
    }
}

export interface Sponsorship {
    sponsor: AccountId;
    sponsoredAccount: AccountId;
    legalOfficer: AccountId;
    locId: UUID | undefined;
}

export interface VerifiedIssuerType {
    address: string;
    identityLocId: UUID;
}

export interface LegalOfficerData {
    hostData?: Partial<HostData>;
    isHost?: boolean;
    hostAddress?: string;
    guests?: string[];
}

export interface HostData {
    nodeId: string;
    baseUrl: string;
    region: Region;
}

export type Region = "Europe";

export const DEFAULT_REGION: Region = "Europe";
