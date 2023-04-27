import { ApiPromise } from "@polkadot/api";
import { Call, FunctionMetadataLatest } from "@polkadot/types/interfaces";
import {
    FrameSystemAccountInfo,
    PalletLogionLocFile,
    PalletLogionLocLegalOfficerCase,
    PalletLogionLocCollectionItem,
    PalletLogionLocTokensRecordFile,
    PalletLogionLocTokensRecord,
    PalletLogionLocOtherAccountId,
    PalletLogionLocSupportedAccountId,
    PalletLogionLocMetadataItem,
    PalletLogionLocSponsorship
} from '@polkadot/types/lookup';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { ISubmittableResult } from "@polkadot/types/types";
import { Compact, Vec, u128 } from "@polkadot/types-codec";
import { CallBase, AnyTuple, AnyJson } from "@polkadot/types-codec/types";
import { DispatchError } from '@polkadot/types/interfaces/system/types';
import {
    TypesAccountData,
    File,
    LegalOfficerCase,
    LocType,
    TypesJsonObject,
    TypesJsonCall,
    TypesErrorMetadata,
    TypesEvent,
    CollectionItem,
    ItemFile,
    ItemToken,
    TermsAndConditionsElement,
    TypesTokensRecordFile,
    TypesTokensRecord,
    ValidAccountId,
    AnyAccountId,
    OtherAccountId,
    MetadataItem,
    Sponsorship,
    AccountId, AccountType
} from "./Types.js";
import { UUID } from "./UUID.js";
import { stringToHex } from "@polkadot/util";


export class Adapters {

    constructor(api: ApiPromise) {
        this.api = api;
    }

    private readonly api: ApiPromise;

    toPalletLogionLocFile(file: File): PalletLogionLocFile {
        return this.api.createType("PalletLogionLocFile", {
            hash_: file.hash,
            nature: file.nature,
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
                name: rawItem.name.toUtf8(),
                value: rawItem.value.toUtf8(),
                submitter: this.fromPalletLogionLocSupportedAccountId(rawItem.submitter),
            })),
            files: rawLoc.files.toArray().map(rawFile => ({
                hash: rawFile.hash_.toHex(),
                nature: rawFile.nature.toUtf8(),
                submitter: this.fromPalletLogionLocSupportedAccountId(rawFile.submitter),
                size: rawFile.size_.toBigInt(),
            })),
            links: rawLoc.links.toArray().map(rawLink => ({
                id: UUID.fromDecimalStringOrThrow(rawLink.id.toString()),
                nature: rawLink.nature.toUtf8()
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
    
    static isHexString(anyJson: AnyJson): anyJson is string {
        return typeof anyJson === "string" && anyJson.startsWith("0x");
    }
    
    static asHexString(anyJson: AnyJson): string {
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
        if (dispatchError && typeof dispatchError === 'object' && 'isModule' in dispatchError && dispatchError.isModule) {
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
        }
        return {
            pallet: "unknown",
            error: "Unknown",
            details: "An unknown error occurred"
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

    toLocFile(file: File): PalletLogionLocFile {
        return this.api.createType("PalletLogionLocFile", {
            hash_: file.hash,
            nature: file.nature,
            submitter: this.toPalletLogionLocSupportedAccountId(file.submitter),
            size_: file.size,
        });
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

    toPalletLogionLocMetadataItem(item: MetadataItem): PalletLogionLocMetadataItem {
        return this.api.createType("PalletLogionLocMetadataItem", {
            name: stringToHex(item.name),
            value: stringToHex(item.value),
            submitter: this.toPalletLogionLocSupportedAccountId(item.submitter),
        });
    }

    static toLocLink(link: {
        target: UUID;
        nature: string;
    }): { id?: string; nature?: string } {
        return {
            id: Adapters.toLocId(link.target),
            nature: stringToHex(link.nature),
        };
    }

    static fromPalletCollectionItem(itemId: string, unwrappedResult: PalletLogionLocCollectionItem): CollectionItem {
        const description = unwrappedResult.description.toUtf8();
        const token = unwrappedResult.token;
        return {
            id: itemId,
            description,
            files: unwrappedResult.files.map(resultFile => ({
                name: resultFile.name.toUtf8(),
                contentType: resultFile.contentType.toUtf8(),
                hash: resultFile.hash_.toHex(),
                size: resultFile.size_.toBigInt(),
            })),
            token: (token && token.isSome) ? {
                type: token.unwrap().tokenType.toUtf8(),
                id: token.unwrap().tokenId.toUtf8(),
            } : undefined,
            restrictedDelivery: unwrappedResult.restrictedDelivery.isTrue,
            termsAndConditions: unwrappedResult.termsAndConditions.map(tc => ({
                tcType: tc.tcType.toUtf8(),
                tcLocId: UUID.fromDecimalStringOrThrow(tc.tcLoc.toString()),
                details: tc.details.toUtf8(),
            })),
        };
    }

    static toCollectionItemFile(itemFile: ItemFile): { name: string; contentType: string; size_: bigint; hash_: string } {
        return {
            name: itemFile.name,
            contentType: itemFile.contentType,
            size_: itemFile.size,
            hash_: itemFile.hash,
        };
    }

    static toCollectionItemToken(itemToken?: ItemToken): { tokenType?: string; tokenId?: string } | null {
        if(itemToken) {
            return {
                tokenType: itemToken.type,
                tokenId: itemToken.id,
            };
        } else {
            return null;
        }
    }

    static toTermsAndConditionsElement(tc: TermsAndConditionsElement): { tcType?: string; tcLoc?: string; details?: string } {
        return {
            tcType: tc.tcType,
            tcLoc: Adapters.toLocId(tc.tcLocId),
            details: tc.details,
        };
    }

    toPalletLogionLocTokensRecordFile(file: TypesTokensRecordFile): PalletLogionLocTokensRecordFile {
        return this.api.createType("PalletLogionLocTokensRecordFile", {
            name: this.api.createType("Bytes", file.name),
            contentType: this.api.createType("Bytes", file.contentType),
            size_: this.api.createType("u32", file.size),
            hash_: this.api.createType("Hash", file.hash),
        });
    }

    newTokensRecordFileVec(files: TypesTokensRecordFile[]): Vec<PalletLogionLocTokensRecordFile> {
        return this.api.createType("Vec<PalletLogionLocTokensRecordFile>", files.map(file => this.toPalletLogionLocTokensRecordFile(file)));
    }

    static toTokensRecord(substrateObject: PalletLogionLocTokensRecord): TypesTokensRecord {
        return {
            description: substrateObject.description.toUtf8(),
            files: substrateObject.files.map(file => ({
                name: file.name.toUtf8(),
                contentType: file.contentType.toUtf8(),
                size: file.size_.toString(),
                hash: file.hash_.toHex(),
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

}
