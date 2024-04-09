import { LogionRuntimeRegion } from '@polkadot/types/lookup';
import { AnyJson } from "@polkadot/types-codec/types";
import { isHex } from "@polkadot/util";
import { UUID } from "./UUID.js";
import { Hash } from './Hash.js';
import { Lgnt } from './Currency.js';
import { encodeAddress, validateAddress, addressEq } from "@polkadot/util-crypto";

export interface TypesAccountData {
    available: bigint,
    reserved: bigint,
    total: bigint,
}

export interface LocItemParams {
    submitter: ValidAccountId;
}

export interface MetadataItemParams extends LocItemParams {
    name: Hash;
    value: Hash;
}

export interface LocItemAck {
    acknowledgedByOwner: boolean;
    acknowledgedByVerifiedIssuer: boolean;
}

export interface MetadataItem extends MetadataItemParams, LocItemAck {

}

export interface FileParams extends LocItemParams {
    hash: Hash;
    nature: Hash;
    size: bigint;
}

export interface File extends FileParams, LocItemAck {

}

export interface LinkParams extends LocItemParams {
    id: UUID;
    nature: Hash;
}

export interface Link extends LinkParams, LocItemAck {

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
    valueFee: Lgnt;
    collectionItemFee: Lgnt;
    tokensRecordFee: Lgnt;
    legalFee: Lgnt;
}

export type LocType = 'Transaction' | 'Collection' | 'Identity';

export type IdentityLocType = 'Polkadot' | 'Logion';

export interface VoidInfo {
    replacer?: UUID;
}

export interface CollectionItem {
    id: Hash,
    description: Hash,
    files: ItemFile[],
    token?: ItemToken,
    restrictedDelivery: boolean,
    termsAndConditions: TermsAndConditionsElement[],
}

export interface ItemFile {
    name: Hash;
    contentType: Hash;
    size: bigint;
    hash: Hash;
}

export interface ItemTokenWithoutIssuance {
    type: Hash;
    id: Hash;
}

export interface ItemToken extends ItemTokenWithoutIssuance {
    issuance: bigint;
}

export interface TermsAndConditionsElement {
    tcType: Hash;
    tcLocId: UUID;
    details: Hash;
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
    name: Hash;
    contentType: Hash;
    size: string;
    hash: Hash;
}

export interface TypesTokensRecord {
    description: Hash;
    files: TypesTokensRecordFile[];
    submitter: string;
}

export interface TypesRecoveryConfig {
    legalOfficers: string[];
}

export type AccountType = "Polkadot" | "Ethereum" | "Bech32";

export const ETHEREUM_ADDRESS_LENGTH_IN_BITS = 20 * 8;

export interface AccountId {
    readonly address: string;
    readonly type: AccountType;
}

export const SS58_PREFIX = 2021;

export class AnyAccountId implements AccountId {

    /**
     * Developers should not construct directly this object but call logionApi.queries.getValidAccountId(address, type).
     *
     * @param address
     * @param type
     */
    constructor(address: string, type: AccountType) {
        this.address = address;
        this.type = type;
    }

    readonly address: string;
    readonly type: AccountType;

    isValid(): boolean {
        return this.validate() === undefined;
    }

    validate(): string | undefined {
        if(!["Polkadot", "Ethereum", "Bech32"].includes(this.type)) {
            return `Unsupported address type ${this.type}`;
        }
        if(this.type === "Ethereum" && !isHex(this.address, ETHEREUM_ADDRESS_LENGTH_IN_BITS)) {
            return `Wrong Ethereum address ${this.address}`;
        } else if(this.type === "Polkadot") {
            const validation = this.validPolkadotAccountId();
            return validation !== undefined ? `Wrong Polkadot address ${this.address}: ${validation}` : undefined;
        } else if (this.type === "Bech32" && !this.isValidBech32Address()) {
            return `Wrong Bech32 address ${this.address}`;
        } else {
            return undefined;
        }
    }

    private validPolkadotAccountId(): string | undefined {
        try {
            if (validateAddress(this.address, false)) {
                return undefined
            } else {
                return "Not valid"
            }
        } catch(e) {
            return String(e);
        }
    }

    static isValidBech32Address(address: string, prefix?: string): boolean {
        if (prefix && !address.startsWith(prefix)) {
            return false;
        }
        // TODO Improve by verifying the checksum
        // @see https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js#L95
        for (let p = 0; p < address.length; ++p) {
            if (address.charCodeAt(p) < 33 || address.charCodeAt(p) > 126) {
                return false;
            }
        }
        return true;
    }

    isValidBech32Address(prefix?: string): boolean {
        return AnyAccountId.isValidBech32Address(this.address, prefix);
    }

    toValidAccountId(): ValidAccountId {
        return new ValidAccountId(this);
    }

    toKey(): string {
        return accountIdToKey(this);
    }

    static parseKey(key: string): AnyAccountId {
        if(key.startsWith(POLKADOT_PREFIX)) {
            return new AnyAccountId(key.substring(POLKADOT_PREFIX.length), "Polkadot");
        } else if(key.startsWith(ETHEREUM_PREFIX)) {
            return new AnyAccountId(key.substring(ETHEREUM_PREFIX.length), "Ethereum");
        } else if(key.startsWith(BECH32_PREFIX)) {
            return new AnyAccountId(key.substring(BECH32_PREFIX.length), "Bech32");
        } else {
            throw new Error("Unsupported key format");
        }
    }

    equals(other: AccountId): boolean {
        if (this.type !== "Polkadot") {
            return this.type === other.type && this.address === other.address;
        } else {
            return this.type === other.type && addressEq(this.address, other.address);

        }
    }
}

const POLKADOT_PREFIX = "Polkadot:";
const ETHEREUM_PREFIX = "Ethereum:";
const BECH32_PREFIX = "Bech32:";

function accountIdToKey(accountId: AccountId): string {
    return `${accountId.type}:${accountId.address}`;
}

export class ValidAccountId implements AccountId {

    constructor(accountId: AnyAccountId) {
        const error = accountId.validate();
        if(error) {
            throw new Error(error);
        }

        this.address = ValidAccountId.computeAddress(SS58_PREFIX, accountId.address, accountId.type);
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

    static parseKey(key: string): ValidAccountId {
        return AnyAccountId.parseKey(key).toValidAccountId();
    }

    equals(other: AccountId): boolean {
        return this.type === other.type && this.address === other.address;
    }

    getAddress(prefix: number): string {
        return ValidAccountId.computeAddress(prefix, this.address, this.type);
    }

    static polkadot(address: string): ValidAccountId {
        return new AnyAccountId(address, "Polkadot").toValidAccountId();
    }

    private static computeAddress(prefix: number, address: string, type: AccountType): string {
        if (type === 'Polkadot') {
            return encodeAddress(address, prefix);
        }
        return address
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

export type Region = LogionRuntimeRegion["type"];
