import { ApiPromise } from '@polkadot/api';
import { stringToHex } from '@polkadot/util';
import { Option, Vec } from "@polkadot/types-codec";

import { UUID } from './UUID.js';
import {
    LegalOfficerCase,
    LocType,
    MetadataItem,
    VoidInfo,
    CollectionItem,
    ItemFile,
    ItemToken,
    TermsAndConditionsElement
} from './Types.js';
import { CollectionSize } from './interfaces/index.js';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { PalletLogionLocLegalOfficerCase, PalletLogionLocCollectionItem, PalletLogionLocTokensRecordFile, PalletLogionLocTokensRecord } from '@polkadot/types/lookup';
import { LogionNodeApi } from './Connection.js';

export interface LogionIdentityLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
}

export function createLogionIdentityLoc(parameters: LogionIdentityLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
    } = parameters;

    return api.tx.logionLoc.createLogionIdentityLoc(locId.toHexString());
}

export interface LogionTransactionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requesterLocId: UUID;
}

export function createLogionTransactionLoc(parameters: LogionTransactionLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        requesterLocId,
    } = parameters;

    return api.tx.logionLoc.createLogionTransactionLoc(locId.toHexString(), requesterLocId.toHexString());
}

export interface PolkadotIdentityLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
}

export function createPolkadotIdentityLoc(parameters: PolkadotIdentityLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        requester,
    } = parameters;

    return api.tx.logionLoc.createPolkadotIdentityLoc(locId.toHexString(), requester);
}

export interface PolkadotTransactionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
}

export function createPolkadotTransactionLoc(parameters: PolkadotTransactionLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        requester,
    } = parameters;

    return api.tx.logionLoc.createPolkadotTransactionLoc(locId.toHexString(), requester);
}

export interface CollectionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
    lastBlock?: string;
    maxSize?: string;
    canUpload: boolean;
}

export function createCollectionLoc(parameters: CollectionLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        requester,
        lastBlock,
        maxSize,
        canUpload,
    } = parameters;

    return api.tx.logionLoc.createCollectionLoc(locId.toHexString(), requester, lastBlock || null, maxSize || null, canUpload);
}

export interface AddMetadataParameters {
    api: ApiPromise;
    locId: UUID;
    item: MetadataItem;
}

export function addMetadata(parameters: AddMetadataParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        item,
    } = parameters;

    return api.tx.logionLoc.addMetadata(locId.toHexString(), {
        name: stringToHex(item.name),
        value: stringToHex(item.value),
        submitter: item.submitter,
    });
}

export interface GetLegalOfficerCaseParameters {
    api: ApiPromise;
    locId: UUID;
}

export async function getLegalOfficerCase(
    parameters: GetLegalOfficerCaseParameters
): Promise<LegalOfficerCase | undefined> {
    const {
        api,
        locId,
    } = parameters;

    const result = await api.query.logionLoc.locMap(locId.toHexString());
    if(result.isSome) {
        return toModel(result.unwrap());
    } else {
        return undefined;
    }
}

function toModel(rawLoc: PalletLogionLocLegalOfficerCase): LegalOfficerCase {
    return {
        owner: rawLoc.owner.toString(),
        requesterAddress: rawLoc.requester.isAccount ? rawLoc.requester.asAccount.toString() : undefined,
        requesterLocId: rawLoc.requester.isLoc ? UUID.fromDecimalString(rawLoc.requester.asLoc.toString()) : undefined,
        metadata: rawLoc.metadata.toArray().map(rawItem => ({
            name: rawItem.name.toUtf8(),
            value: rawItem.value.toUtf8(),
            submitter: rawItem.submitter.toString(),
        })),
        files: rawLoc.files.toArray().map(rawFile => ({
            hash: rawFile.hash_.toHex(),
            nature: rawFile.nature.toUtf8(),
            submitter: rawFile.submitter.toString(),
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
    };
}

export interface GetLegalOfficerCasesParameters {
    api: ApiPromise;
    locIds: UUID[];
}

export async function getLegalOfficerCases(
    parameters: GetLegalOfficerCasesParameters
): Promise<(LegalOfficerCase | undefined)[]> {
    const {
        api,
        locIds,
    } = parameters;

    const result = await Promise.all(locIds.map(id => api.query.logionLoc.locMap(id.toHexString())));
    const locs: (LegalOfficerCase | undefined)[] = [];
    for(let i = 0; i < result.length; ++i) {
        const option = result[i];
        if(option.isSome) {
            locs.push(toModel(option.unwrap()));
        } else {
            locs.push(undefined);
        }
    }
    return locs;
}

export async function getLegalOfficerCasesMap(
    parameters: GetLegalOfficerCasesParameters
): Promise<Record<string, LegalOfficerCase>> {
    const locs = await getLegalOfficerCases(parameters);
    const map: Record<string, LegalOfficerCase> = {};
    for(let i = 0; i < locs.length; ++i) {
        const loc = locs[i];
        const locId = parameters.locIds[i];
        if(loc !== undefined) {
            map[locId.toDecimalString()] = loc;
        }
    }
    return map;
}

export interface AddFileParameters {
    api: ApiPromise;
    locId: UUID;
    hash: string;
    nature: string;
    submitter: string;
}

export function addFile(parameters: AddFileParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        hash,
        nature,
        submitter,
    } = parameters;

    return api.tx.logionLoc.addFile(locId.toHexString(), {
        hash_: hash,
        nature: stringToHex(nature),
        submitter
    });
}

export interface CloseLocParameters {
    api: ApiPromise;
    locId: UUID;
    seal?: string;
}

export function closeLoc(parameters: CloseLocParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        seal,
    } = parameters;

    if(seal) {
        return api.tx.logionLoc.closeAndSeal(locId.toHexString(), seal);
    } else {
        return api.tx.logionLoc.close(locId.toHexString());
    }
}

export interface AddLinkParameters {
    api: ApiPromise;
    locId: UUID;
    target: UUID;
    nature: string;
}

export function addLink(parameters: AddLinkParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        target,
        nature,
    } = parameters;

    return api.tx.logionLoc.addLink(locId.toHexString(), {
        id: target.toHexString(),
        nature: stringToHex(nature)
    });
}

export interface VoidLocParameters {
    api: ApiPromise;
    locId: UUID;
    voidInfo: VoidInfo;
}

export function voidLoc(parameters: VoidLocParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        voidInfo,
    } = parameters;

    if(voidInfo.replacer === undefined) {
        return api.tx.logionLoc.makeVoid(locId.toHexString());
    } else {
        return api.tx.logionLoc.makeVoidAndReplace(locId.toHexString(), voidInfo.replacer.toHexString());
    }
}

export interface GetCollectionItemParameters {
    api: ApiPromise;
    locId: UUID;
    itemId: string;
}

export async function getCollectionItem(
    parameters: GetCollectionItemParameters
): Promise<CollectionItem | undefined> {
    const {
        api,
        locId,
        itemId
    } = parameters;

    if(!itemId) {
        return undefined;
    }

    const result = await api.query.logionLoc.collectionItemsMap(locId.toHexString(), itemId);
    if(result.isSome) {
        return convertItem(itemId, result.unwrap());
    } else {
        return undefined;
    }
}

function convertItem(itemId: string, unwrappedResult: PalletLogionLocCollectionItem): CollectionItem {
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

export async function getCollectionItems(
    parameters: { api: ApiPromise, locId: UUID }
): Promise<CollectionItem[]> {
    const {
        api,
        locId,
    } = parameters;

    const result = await api.query.logionLoc.collectionItemsMap.entries<Option<PalletLogionLocCollectionItem>>(locId.toHexString());
    return result.map(entry => convertItem(entry[0].args[1].toString(), entry[1].unwrap()));
}

export interface GetCollectionSizeParameters {
    api: ApiPromise;
    locId: UUID;
}

export async function getCollectionSize(
    parameters: GetCollectionSizeParameters
): Promise<number | undefined> {
    const {
        api,
        locId
    } = parameters;

    const result: Option<CollectionSize> = await api.query.logionLoc.collectionSizeMap(locId.toHexString());
    if (result.isSome) {
        return result.unwrap().toNumber();
    } else {
        return undefined;
    }
}

export interface AddCollectionItemParameters {
    api: ApiPromise;
    collectionId: UUID;
    itemId: string;
    itemDescription: string;
    itemFiles: ItemFile[];
    itemToken?: ItemToken;
    restrictedDelivery: boolean,
    termsAndConditions?: TermsAndConditionsElement[];
}

export function addCollectionItem(parameters: AddCollectionItemParameters): SubmittableExtrinsic {
    const {
        api,
        collectionId,
        itemId,
        itemDescription,
        itemFiles,
        itemToken,
        restrictedDelivery,
    } = parameters;

    const files: ({ name: string; contentType: string; size_: bigint; hash_: string })[] = itemFiles.map(itemFile => ({
        name: stringToHex(itemFile.name),
        contentType: stringToHex(itemFile.contentType),
        size_: itemFile.size,
        hash_: itemFile.hash,
    }));

    const token = itemToken ? {
        tokenType: stringToHex(itemToken.type),
        tokenId: stringToHex(itemToken.id),
    } : null;

    if (parameters.termsAndConditions && parameters.termsAndConditions.length > 0) {
        const termsAndConditions = parameters.termsAndConditions.map(tc => ({
            tcType: stringToHex(tc.tcType),
            tcLoc: tc.tcLocId.toHexString(),
            details: stringToHex(tc.details)
        }))
        return api.tx.logionLoc.addCollectionItemWithTermsAndConditions(collectionId.toHexString(), itemId, stringToHex(itemDescription), files, token, restrictedDelivery, termsAndConditions);
    } else {
        return api.tx.logionLoc.addCollectionItem(collectionId.toHexString(), itemId, stringToHex(itemDescription), files, token, restrictedDelivery);
    }
}

export interface TokensRecordFile {
    name: string;
    contentType: string;
    size: string;
    hash: string;
}

export function newTokensRecordFile(api: LogionNodeApi, file: TokensRecordFile): PalletLogionLocTokensRecordFile {
    return api.createType("PalletLogionLocTokensRecordFile", {
        name: api.createType("Bytes", file.name),
        contentType: api.createType("Bytes", file.contentType),
        size_: api.createType("u32", file.size),
        hash_: api.createType("Hash", file.hash),
    });
}

export function newTokensRecordFiles(api: LogionNodeApi, files: TokensRecordFile[]): Vec<PalletLogionLocTokensRecordFile> {
    return api.createType("Vec<PalletLogionLocTokensRecordFile>", files.map(file => newTokensRecordFile(api, file)));
}

export interface TokensRecord {
    description: string;
    files: TokensRecordFile[];
    submitter: string;
}

export function toTokensRecord(substrateObject: PalletLogionLocTokensRecord): TokensRecord {
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

export async function toUnwrappedTokensRecord(query: Promise<Option<PalletLogionLocTokensRecord>>): Promise<TokensRecord> {
    return toTokensRecord((await query).unwrap());
}
