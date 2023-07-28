import { ApiPromise } from "@polkadot/api";
import { Call, FunctionMetadataLatest } from "@polkadot/types/interfaces";
import {
    FrameSystemAccountInfo,
    LogionNodeRuntimeRegion,
    PalletLoAuthorityListLegalOfficerData,
    PalletLogionLocFileParams,
    PalletLogionLocLegalOfficerCase,
    PalletLogionLocCollectionItem,
    PalletLogionLocTokensRecordFile,
    PalletLogionLocTokensRecord,
    PalletLogionLocOtherAccountId,
    PalletLogionLocSupportedAccountId,
    PalletLogionLocMetadataItemParams,
    PalletLogionLocSponsorship,
    PalletLogionLocLocLink,
} from '@polkadot/types/lookup';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { ISubmittableResult } from "@polkadot/types/types";
import { Compact, Vec, u128 } from "@polkadot/types-codec";
import { CallBase, AnyTuple, AnyJson } from "@polkadot/types-codec/types";
import { DispatchError } from '@polkadot/types/interfaces/system/types';
import {
    TypesAccountData,
    FileParams,
    LegalOfficerCase,
    LocType,
    TypesJsonObject,
    TypesJsonCall,
    TypesErrorMetadata,
    TypesEvent,
    CollectionItem,
    ItemFile,
    TermsAndConditionsElement,
    TypesTokensRecordFile,
    TypesTokensRecord,
    ValidAccountId,
    AnyAccountId,
    OtherAccountId,
    MetadataItemParams,
    Sponsorship,
    AccountId,
    AccountType,
    HostData,
    Region,
    Link,
    ItemToken,
} from "./Types.js";
import { UUID } from "./UUID.js";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { base58Decode, base58Encode } from "@polkadot/util-crypto";
import { HexString } from "@polkadot/util/types.js";
import { H256 } from "./interfaces/types.js";
import { Hash } from "./Hash.js";


export class Adapters {

    constructor(api: ApiPromise) {
        this.api = api;
    }

    private readonly api: ApiPromise;

    toPalletLogionLocFile(file: FileParams): PalletLogionLocFileParams {
        return this.api.createType("PalletLogionLocFileParams", {
            hash_: this.toH256(file.hash),
            nature: this.toH256(file.nature),
            submitter: this.toPalletLogionLocSupportedAccountId(file.submitter),
            size_: file.size,
        });
    }

    toCall(submittable: SubmittableExtrinsic): Call {
        return this.api.createType('Call', submittable);
    }

    fromFrameSystemAccountInfo(accountData: FrameSystemAccountInfo): TypesAccountData {
        return {
            available: accountData.data.free.toString(),
            reserved: accountData.data.reserved.toString(),
            total: accountData.data.free.add(accountData.data.reserved).toString(),
        };
    }

    fromPalletLogionLocLegalOfficerCase(rawLoc: PalletLogionLocLegalOfficerCase): LegalOfficerCase {
        let requesterAddress: ValidAccountId | undefined;
        if(rawLoc.requester.isAccount) {
            requesterAddress = new AnyAccountId(this.api, rawLoc.requester.asAccount.toString(), "Polkadot").toValidAccountId();
        } else if(rawLoc.requester.isOtherAccount) {
            if(rawLoc.requester.asOtherAccount.isEthereum) {
                requesterAddress = new AnyAccountId(this.api, rawLoc.requester.asOtherAccount.asEthereum.toHex(), "Ethereum").toValidAccountId();
            } else {
                throw new Error("Unsupported other account value");
            }
        }
        return {
            owner: rawLoc.owner.toString(),
            requesterAddress,
            requesterLocId: rawLoc.requester.isLoc ? UUID.fromDecimalString(rawLoc.requester.asLoc.toString()) : undefined,
            metadata: rawLoc.metadata.toArray().map(rawItem => ({
                name: Hash.fromHex(rawItem.name.toHex()),
                value: Hash.fromHex(rawItem.value.toHex()),
                submitter: this.fromPalletLogionLocSupportedAccountId(rawItem.submitter),
                acknowledged: rawItem.acknowledged.isTrue,
            })),
            files: rawLoc.files.toArray().map(rawFile => ({
                hash: Hash.fromHex(rawFile.hash_.toHex()),
                nature: Hash.fromHex(rawFile.nature.toHex()),
                submitter: this.fromPalletLogionLocSupportedAccountId(rawFile.submitter),
                size: rawFile.size_.toBigInt(),
                acknowledged: rawFile.acknowledged.isTrue,
            })),
            links: rawLoc.links.toArray().map(rawLink => ({
                id: UUID.fromDecimalStringOrThrow(rawLink.id.toString()),
                nature: Hash.fromHex(rawLink.nature.toHex()),
            })),
            closed: rawLoc.closed.isTrue,
            locType: rawLoc.locType.toString() as LocType,
            voidInfo: rawLoc.voidInfo.isSome ? {
                replacer: rawLoc.voidInfo.unwrap().replacer.isSome ? UUID.fromDecimalString(rawLoc.voidInfo.unwrap().replacer.toString()) : undefined
            } : undefined,
            replacerOf: rawLoc.replacerOf.isSome ? UUID.fromDecimalString(rawLoc.replacerOf.toString()) : undefined,
            collectionLastBlockSubmission: rawLoc.collectionLastBlockSubmission.isSome ? rawLoc.collectionLastBlockSubmission.unwrap().toBigInt() : undefined,
            collectionMaxSize: rawLoc.collectionMaxSize.isSome ? rawLoc.collectionMaxSize.unwrap().toNumber() : undefined,
            collectionCanUpload: rawLoc.collectionCanUpload.isTrue,
            seal: rawLoc.seal.isSome ? rawLoc.seal.unwrap().toHex() : undefined,
            sponsorshipId: rawLoc.sponsorshipId.isSome ? this.fromSponsorshipId(rawLoc.sponsorshipId.unwrap()) : undefined,
        };
    }

    static toJsonCall(genericCall: CallBase<AnyTuple, FunctionMetadataLatest>): TypesJsonCall {
        const args: {[index: string]: AnyJson} = {};
    
        for (let i = 0; i < genericCall.args.length; ++i) {
            const arg = genericCall.args[i];
            const meta = genericCall.meta.fields[i];
            args[meta.name.unwrap().toString()] = arg.toHuman(true);
        }
    
        return {
            section: genericCall.section,
            method: genericCall.method,
            args,
        };
    }
    
    static isJsonObject(anyJson: AnyJson): anyJson is TypesJsonObject {
        return typeof anyJson === "object";
    }
    
    static asJsonObject(anyJson: AnyJson): TypesJsonObject {
        if(Adapters.isJsonObject(anyJson)) {
            return anyJson;
        } else {
            throw new Error("Not an object");
        }
    }
    
    static isString(anyJson: AnyJson): anyJson is string {
        return typeof anyJson === "string";
    }
    
    static asString(anyJson: AnyJson): string {
        if(Adapters.isString(anyJson)) {
            return anyJson;
        } else {
            throw new Error("Not a string");
        }
    }
    
    static isArray(anyJson: AnyJson): anyJson is AnyJson[] {
        return anyJson instanceof Array;
    }
    
    static asArray(anyJson: AnyJson): AnyJson[] {
        if(Adapters.isArray(anyJson)) {
            return anyJson;
        } else {
            throw new Error("Not an array");
        }
    }
    
    static isHexString(anyJson: AnyJson): anyJson is HexString {
        return typeof anyJson === "string" && anyJson.startsWith("0x");
    }
    
    static asHexString(anyJson: AnyJson): HexString {
        if(Adapters.isHexString(anyJson)) {
            return anyJson;
        } else {
            throw new Error("Not a string");
        }
    }
    
    static isNumberString(anyJson: AnyJson): anyJson is string {
        return typeof anyJson === "string";
    }
    
    static asBigInt(anyJson: AnyJson): bigint {
        if(Adapters.isString(anyJson)) {
            return BigInt(anyJson.replaceAll(",", ""));
        } else {
            throw new Error("Not a string");
        }
    }
    
    static isJsonCall(anyJson: AnyJson): anyJson is TypesJsonCall {
        return Adapters.isJsonObject(anyJson)
            && "section" in anyJson && Adapters.isString(anyJson.section)
            && "method" in anyJson && Adapters.isString(anyJson.method)
            && "args" in anyJson && Adapters.isJsonObject(anyJson.args);
    }
    
    static asJsonCall(anyJson: AnyJson): TypesJsonCall {
        if(Adapters.isJsonCall(anyJson)) {
            return anyJson;
        } else {
            throw new Error("Not a JsonCall");
        }
    }

    static getExtrinsicEvents(result: ISubmittableResult): TypesEvent[] {
        return result.events
            .filter(record => record.phase.isApplyExtrinsic)
            .map(record => record.event.toHuman())
            .map(json => ({
                name: json.method as string,
                section: json.section as string,
                data: Adapters.getEventData(json.data),
            }));
    }

    private static getEventData(json: AnyJson): TypesJsonObject | AnyJson[] {
        if(Adapters.isArray(json)) {
            return Adapters.asArray(json);
        } else {
            return Adapters.asJsonObject(json);
        }
    }

    static getErrorMetadata(dispatchError: DispatchError): TypesErrorMetadata {
        // Source for non-module error descriptions:
        //
        // https://paritytech.github.io/substrate/master/frame_support/dispatch/enum.DispatchError.html

        if (dispatchError && dispatchError.isModule) {
            const module = dispatchError.asModule;
            try {
                const metaError = dispatchError.registry.findMetaError({
                    index: module.index,
                    error: module.error
                });
                if (metaError) {
                    return {
                        pallet: metaError.section,
                        error: metaError.name,
                        details: metaError.docs.join(', ').trim()
                    }
                } else {
                    return {
                        pallet: "unknown",
                        error: "Unknown",
                        details: `index:${ module.index } error:${ module.error }`
                    }
                }
            } catch (e) {
                return {
                    pallet: "unknown",
                    error: "Unknown",
                    details: `Failed to find meta error: ${e}`
                }
            }
        } else if (dispatchError && dispatchError.isArithmetic) {
            const error = dispatchError.asArithmetic;
            return {
                pallet: "dispatch",
                error: "Arithmetic",
                details: error.toString(),
            };
        } else if (dispatchError && dispatchError.isBadOrigin) {
            return {
                pallet: "dispatch",
                error: "BadOrigin",
                details: "A bad origin.",
            };
        } else if (dispatchError && dispatchError.isCannotLookup) {
            return {
                pallet: "dispatch",
                error: "CannotLookup",
                details: "Failed to lookup some data.",
            };
        } else if (dispatchError && dispatchError.isConsumerRemaining) {
            return {
                pallet: "dispatch",
                error: "ConsumerRemaining",
                details: "At least one consumer is remaining so the account cannot be destroyed.",
            };
        } else if (dispatchError && dispatchError.isCorruption) {
            return {
                pallet: "dispatch",
                error: "Corruption",
                details: "The state is corrupt; this is generally not going to fix itself.",
            };
        } else if (dispatchError && dispatchError.isExhausted) {
            return {
                pallet: "dispatch",
                error: "Exhausted",
                details: "Resources exhausted, e.g. attempt to read/write data which is too large to manipulate.",
            };
        } else if (dispatchError && dispatchError.isNoProviders) {
            return {
                pallet: "dispatch",
                error: "NoProviders",
                details: "There are no providers so the account cannot be created.",
            };
        } else if (dispatchError && dispatchError.isOther) {
            return {
                pallet: "dispatch",
                error: "Other",
                details: "Some error occurred.",
            };
        } else if (dispatchError && dispatchError.isToken) {
            const error = dispatchError.asToken;
            return {
                pallet: "dispatch",
                error: "Token",
                details: error.toString(),
            };
        } else if (dispatchError && dispatchError.isTooManyConsumers) {
            return {
                pallet: "dispatch",
                error: "TooManyConsumers",
                details: "There are too many consumers so the account cannot be created.",
            };
        } else if (dispatchError && dispatchError.isTransactional) {
            const error = dispatchError.asTransactional;
            return {
                pallet: "dispatch",
                error: "Transactional",
                details: error.toString(),
            };
        } else if (dispatchError && dispatchError.isUnavailable) {
            return {
                pallet: "dispatch",
                error: "Unavailable",
                details: "Some resource (e.g. a preimage) is unavailable right now. This might fix itself later.",
            };
        } else {
            return {
                pallet: "unknown",
                error: "Unknown",
                details: `An unknown error occurred: ${ dispatchError.type }`
            }
        }
    }

    static getErrorMessage(dispatchError: DispatchError): string {
        const metadata = Adapters.getErrorMetadata(dispatchError);
        return `Got error ${metadata.error} from pallet ${metadata.pallet}: ${metadata.details}`;
    }

    static toLocId(id: UUID): string {
        return id.toHexString();
    }

    toLocId(id: UUID): Compact<u128> {
        return this.toCompactU128Uuid(id);
    }

    private toCompactU128Uuid(id: UUID): Compact<u128> {
        return this.api.createType("Compact<u128>", id.toHexString());
    }

    toNonCompactLocId(id: UUID): u128 {
        return this.toNonCompactU128Uuid(id);
    }

    private toNonCompactU128Uuid(id: UUID): u128 {
        return this.api.createType("u128", id.toDecimalString());
    }

    fromLocId(locId: u128): UUID {
        return UUID.fromDecimalStringOrThrow(locId.toString());
    }

    toPalletLogionLocSupportedAccountId(accountId: ValidAccountId): PalletLogionLocSupportedAccountId {
        if(accountId.type === "Polkadot") {
            return this.api.createType("PalletLogionLocSupportedAccountId", { Polkadot: accountId.address });
        } else if(accountId.type === "Ethereum") {
            return this.api.createType("PalletLogionLocSupportedAccountId", { Other: { Ethereum: accountId.address } });
        } else {
            throw new Error(`Unsupported account type ${accountId.type}`);
        }
    }

    fromPalletLogionLocSupportedAccountId(accountId: PalletLogionLocSupportedAccountId): ValidAccountId {
        if(accountId.isPolkadot) {
            return new AnyAccountId(this.api, accountId.asPolkadot.toString(), "Polkadot").toValidAccountId();
        } else if(accountId.isOther) {
            if(accountId.asOther.isEthereum) {
                return new AnyAccountId(this.api, accountId.asOther.asEthereum.toHex(), "Ethereum").toValidAccountId();
            } else {
                throw new Error(`Unsupported account type ${accountId.asOther.type}`);
            }
        } else {
            throw new Error(`Unsupported account type ${accountId.type}`);
        }
    }

    toPalletLogionLocMetadataItem(item: MetadataItemParams): PalletLogionLocMetadataItemParams {
        return this.api.createType("PalletLogionLocMetadataItemParams", {
            name: this.toH256(item.name),
            value: this.toH256(item.value),
            submitter: this.toPalletLogionLocSupportedAccountId(item.submitter),
        });
    }

    static toLocLink(link: {
        target: UUID;
        nature: Hash;
    }): { id?: string; nature?: Hash } {
        return {
            id: Adapters.toLocId(link.target),
            nature: link.nature,
        };
    }

    static fromPalletCollectionItem(itemId: Hash, unwrappedResult: PalletLogionLocCollectionItem): CollectionItem {
        const description = Hash.fromHex(unwrappedResult.description.toHex());
        const token = unwrappedResult.token;
        let tokenId: Hash | undefined;
        if(token && token.isSome) {
            tokenId = Hash.fromHex(token.unwrap().tokenId.toHex());
        }
        return {
            id: itemId,
            description,
            files: unwrappedResult.files.map(resultFile => ({
                name: Hash.fromHex(resultFile.name.toHex()),
                contentType: Hash.fromHex(resultFile.contentType.toHex()),
                hash: Hash.fromHex(resultFile.hash_.toHex()),
                size: resultFile.size_.toBigInt(),
            })),
            token: tokenId !== undefined ? {
                id: tokenId,
                type: Hash.fromHex(token.unwrap().tokenType.toHex()),
                issuance: token.unwrap().tokenIssuance.toBigInt(),
            } : undefined,
            restrictedDelivery: unwrappedResult.restrictedDelivery.isTrue,
            termsAndConditions: unwrappedResult.termsAndConditions.map(tc => ({
                tcType: Hash.fromHex(tc.tcType.toHex()),
                tcLocId: UUID.fromDecimalStringOrThrow(tc.tcLoc.toString()),
                details: Hash.fromHex(tc.details.toHex()),
            })),
        };
    }

    toCollectionItemFile(itemFile: ItemFile): { name: H256; contentType: H256; size_: bigint; hash_: H256 } {
        return {
            name: this.toH256(itemFile.name),
            contentType: this.toH256(itemFile.contentType),
            size_: itemFile.size,
            hash_: this.toH256(itemFile.hash),
        };
    }

    toCollectionItemToken(itemToken?: ItemToken): { tokenType: H256; tokenId: H256; tokenIssuance: bigint } | null {
        if(itemToken) {
            return {
                tokenType: this.toH256(itemToken.type),
                tokenId: this.toH256(itemToken.id),
                tokenIssuance: itemToken.issuance,
            };
        } else {
            return null;
        }
    }

    toTermsAndConditionsElement(tc: TermsAndConditionsElement): { tcType: H256; tcLoc: string; details: H256 } {
        return {
            tcType: this.toH256(tc.tcType),
            tcLoc: Adapters.toLocId(tc.tcLocId),
            details: this.toH256(tc.details),
        };
    }

    toPalletLogionLocTokensRecordFile(file: TypesTokensRecordFile): PalletLogionLocTokensRecordFile {
        return this.api.createType("PalletLogionLocTokensRecordFile", {
            name: this.toH256(file.name),
            contentType: this.toH256(file.contentType),
            size_: this.api.createType("u32", file.size),
            hash_: this.toH256(file.hash),
        });
    }

    newTokensRecordFileVec(files: TypesTokensRecordFile[]): Vec<PalletLogionLocTokensRecordFile> {
        return this.api.createType("Vec<PalletLogionLocTokensRecordFile>", files.map(file => this.toPalletLogionLocTokensRecordFile(file)));
    }

    static toTokensRecord(substrateObject: PalletLogionLocTokensRecord): TypesTokensRecord {
        return {
            description: Hash.fromHex(substrateObject.description.toHex()),
            files: substrateObject.files.map(file => ({
                name: Hash.fromHex(file.name.toHex()),
                contentType: Hash.fromHex(file.contentType.toHex()),
                size: file.size_.toString(),
                hash: Hash.fromHex(file.hash_.toHex()),
            })),
            submitter: substrateObject.submitter.toString(),
        };
    }

    toPalletLogionLocOtherAccountId(accountId: OtherAccountId): PalletLogionLocOtherAccountId {
        return this.api.createType("PalletLogionLocOtherAccountId", { Ethereum: accountId.address });
    }

    toSponsorshipId(id: UUID): Compact<u128> {
        return this.toCompactU128Uuid(id);
    }

    toNonCompactSponsorshipId(id: UUID): u128 {
        return this.toNonCompactU128Uuid(id);
    }

    fromSponsorshipId(sponsorshipId: u128): UUID {
        return UUID.fromDecimalStringOrThrow(sponsorshipId.toString());
    }

    toSponsorship(sponsorship: PalletLogionLocSponsorship): Sponsorship {
        return {
            sponsor: this.getValidAccountId(sponsorship.sponsor.toString(), "Polkadot"),
            sponsoredAccount: this.toAccountId(sponsorship.sponsoredAccount),
            legalOfficer: this.getValidAccountId(sponsorship.legalOfficer.toString(), "Polkadot"),
            locId: sponsorship.locId.isSome ? UUID.fromDecimalStringOrThrow(sponsorship.locId.unwrap().toString()) : undefined
        }
    }

    toAccountId(account: PalletLogionLocSupportedAccountId): AccountId {
        let type: string = account.type;
        if (account.isPolkadot) {
            return this.getValidAccountId(account.toString(), "Polkadot");
        } else if (account.isOther) {
            const otherAccount = account.asOther;
            type = otherAccount.type;
            if (otherAccount.isEthereum) {
                return this.getValidAccountId(account.asOther.asEthereum.toHex(), "Ethereum")
            }
        }
        throw new Error(`Unsupported account type: ${ type }`);
    }

    getValidAccountId(accountId: string, type: AccountType): ValidAccountId {
        const anyAccountId = new AnyAccountId(this.api, accountId, type);
        return anyAccountId.toValidAccountId();
    }

    toPalletLoAuthorityListLegalOfficerDataHost(legalOfficerData: Partial<HostData>): PalletLoAuthorityListLegalOfficerData {
        let nodeId: string | null = null;
        if(legalOfficerData.nodeId) {
            const opaquePeerId = base58Decode(legalOfficerData.nodeId);
            nodeId = u8aToHex(opaquePeerId);
        }

        let baseUrl: string | null = null;
        if(legalOfficerData.baseUrl) {
            const urlBytes = stringToU8a(legalOfficerData.baseUrl);
            baseUrl = u8aToHex(urlBytes);
        }

        const region = legalOfficerData.region ? this.toLogionNodeRuntimeRegion(legalOfficerData.region) : this.fromLogionNodeRuntimeRegion(this.getDefaultLogionNodeRuntimeRegion());

        return this.api.createType<PalletLoAuthorityListLegalOfficerData>("PalletLoAuthorityListLegalOfficerData", { Host: { nodeId, baseUrl, region } });
    }

    toLogionNodeRuntimeRegion(region: Region): LogionNodeRuntimeRegion {
        return this.api.createType<LogionNodeRuntimeRegion>("LogionNodeRuntimeRegion", region);
    }

    fromLogionNodeRuntimeRegion(region: LogionNodeRuntimeRegion): Region {
        return region.toString() as Region;
    }

    getDefaultLogionNodeRuntimeRegion(): LogionNodeRuntimeRegion {
        this.defaultRegion ||= this.api.createType<LogionNodeRuntimeRegion>("LogionNodeRuntimeRegion");
        return this.defaultRegion;
    }

    private defaultRegion?: LogionNodeRuntimeRegion;

    toHostData(legalOfficerData: PalletLoAuthorityListLegalOfficerData): Partial<HostData> {
        let nodeId: string | undefined;
        if(legalOfficerData.asHost.nodeId.isSome) {
            const opaquePeerId = legalOfficerData.asHost.nodeId.unwrap();
            nodeId = base58Encode(opaquePeerId);
        }
    
        let baseUrl: string | undefined;
        if(legalOfficerData.asHost.baseUrl.isSome) {
            const urlBytes = legalOfficerData.asHost.baseUrl.unwrap();
            baseUrl = urlBytes.toUtf8();
        }

        const region = this.fromLogionNodeRuntimeRegion(legalOfficerData.asHost.region);
    
        return { baseUrl, nodeId, region };
    }

    toH256(data: Hash): H256 {
        return this.api.createType<H256>("H256", data.bytes);
    }

    toPalletLogionLocLocLink(link: Link): PalletLogionLocLocLink {
        return this.api.createType("PalletLogionLocLocLink", {
            id: this.toNonCompactU128Uuid(link.id),
            nature: this.toH256(link.nature),
        });
    }
}
