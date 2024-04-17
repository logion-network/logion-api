import { LogionRuntimeRegion } from '@polkadot/types/lookup';
import { AnyJson } from "@polkadot/types-codec/types";
import { isHex } from "@polkadot/util";
import { UUID } from "./UUID.js";
import { Hash } from './Hash.js';
import { Lgnt } from './Currency.js';
import { encodeAddress, addressEq, base58Decode, checkAddressChecksum } from "@polkadot/util-crypto";
import { bech32 } from "bech32";

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
    owner: ValidAccountId;
    requesterAccountId?: ValidAccountId;
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
    return loc.locType === 'Identity' && !loc.requesterAccountId && !loc.requesterLocId;
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
    submitter: ValidAccountId;
}

export interface TypesRecoveryConfig {
    legalOfficers: ValidAccountId[];
}

export type AccountType = "Polkadot" | "Ethereum" | "Bech32";
const ACCOUNT_TYPES: AccountType[] = ["Polkadot", "Ethereum", "Bech32"];

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
        if(!ACCOUNT_TYPES.includes(this.type)) {
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
            const decoded = base58Decode(this.address);
            const [isValid,,,] = checkAddressChecksum(decoded);
            if (isValid) {
                return undefined
            } else {
                return "Invalid decoded address"
            }
        } catch(error) {
            return (error as Error).message
        }
    }

    isValidBech32Address(prefix?: string): boolean {
        try {
            if (prefix && !this.address.startsWith(prefix)) {
                return false;
            }
            const decoded = bech32.decode(this.address);
            return prefix === undefined || decoded.prefix === prefix;
        } catch (error) {
            return false;
        }
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

    equals(other?: AccountId | null): boolean {
        if(!this.isValid() || other === undefined || other === null) {
            return false;
        }

        let otherAnyAccount;
        if(other instanceof AnyAccountId) {
            otherAnyAccount = other;
        } else {
            otherAnyAccount = new AnyAccountId(other.address, other.type);
        }

        if(!otherAnyAccount.isValid()) {
            return false;
        }
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

        this.anyAccountId = new AnyAccountId(ValidAccountId.normalizeAddress(accountId.address, accountId.type), accountId.type);
    }

    private anyAccountId: AnyAccountId;

    get address() {
        return this.anyAccountId.address;
    }

    get type() {
        return this.anyAccountId.type;
    }

    toOtherAccountId(): OtherAccountId {
        return new OtherAccountId(this);
    }

    toKey(): string {
        return accountIdToKey(this);
    }

    static parseKey(key: string): ValidAccountId {
        return AnyAccountId.parseKey(key).toValidAccountId();
    }

    equals(other?: AccountId | null): boolean {
        if(other === undefined || other === null) {
            return false;
        }
        if(other instanceof ValidAccountId) {
            return this.anyAccountId.equals(other.anyAccountId);
        } else if(other instanceof AnyAccountId) {
            return this.anyAccountId.equals(other);
        } else {
            const anyAddress = new AnyAccountId(other.address, other.type);
            return this.anyAccountId.equals(anyAddress);
        }
    }

    getAddress(prefix: number): string {
        return ValidAccountId.computeAddress(prefix, this.address, this.type);
    }

    static polkadot(address: string): ValidAccountId {
        return new AnyAccountId(address, "Polkadot").toValidAccountId();
    }

    static ethereum(address: string): ValidAccountId {
        return new AnyAccountId(address, "Ethereum").toValidAccountId();
    }

    static bech32(address: string): ValidAccountId {
        return new AnyAccountId(address, "Bech32").toValidAccountId();
    }

    /**
     * Attempt to guess the account type from a given address, and instantiate
     * the corresponding valid account.
     * Warning: this method should NOT be used whenever caller site knows the account type.
     * In this case use {@link polkadot}, {@link ethereum}, {@link bech32} or {@link ValidAccountId:constructor}
     *
     * @param address the address.
     * @returns a valid account or undefined.
     */
    static fromUnknown(address: string): ValidAccountId | undefined {
        for (const type of ACCOUNT_TYPES) {
            const account = new AnyAccountId(address, type);
            if (account.isValid()) {
                return account.toValidAccountId();
            }
        }
    }

    private static normalizeAddress(address: string, type: AccountType): string {
        return this.computeAddress(SS58_PREFIX, address, type)
    }

    private static computeAddress(prefix: number, address: string, type: AccountType): string {
        if (type === 'Polkadot') {
            return encodeAddress(address, prefix);
        }
        return address.toLowerCase();
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

    equals(other?: AccountId | null): boolean {
        return this.validAccountId.equals(other);
    }
}

export interface Sponsorship {
    sponsor: ValidAccountId;
    sponsoredAccount: ValidAccountId;
    legalOfficer: ValidAccountId;
    locId: UUID | undefined;
}

export interface VerifiedIssuerType {
    account: ValidAccountId;
    identityLocId: UUID;
}

export interface LegalOfficerData {
    hostData?: Partial<HostData>;
    isHost?: boolean;
    hostAccount?: ValidAccountId;
    guests?: string[];
}

export interface HostData {
    nodeId: string;
    baseUrl: string;
    region: Region;
}

export type Region = LogionRuntimeRegion["type"];
