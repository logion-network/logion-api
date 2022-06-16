import { ApiPromise } from '@polkadot/api';
import { stringToHex } from '@polkadot/util';
import { Option } from "@polkadot/types-codec";

import { UUID } from './UUID';
import { LegalOfficerCase, LocType, MetadataItem, VoidInfo, CollectionItem } from './Types';
import { LegalOfficerCaseOf, CollectionSize } from './interfaces';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { PalletLogionLocLegalOfficerCase } from '@polkadot/types/lookup';

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
}

export function createCollectionLoc(parameters: CollectionLocCreationParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
        requester,
        lastBlock,
        maxSize
    } = parameters;

    return api.tx.logionLoc.createCollectionLoc(locId.toHexString(), requester, lastBlock || null, maxSize || null);
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
            hash: rawFile.get('hash')!.toHex(),
            nature: rawFile.nature.toUtf8(),
            submitter: rawFile.submitter.toString(),
        })),
        links: rawLoc.links.toArray().map(rawLink => ({
            id: UUID.fromDecimalString(rawLink.id.toString())!,
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
}

export function closeLoc(parameters: CloseLocParameters): SubmittableExtrinsic {
    const {
        api,
        locId,
    } = parameters;

    return api.tx.logionLoc.close(locId.toHexString());
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
    if (result.isSome) {
        const description = result.unwrap().description.toUtf8();
        return { id: itemId, description }
    } else {
        return undefined;
    }
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
}

export function addCollectionItem(parameters: AddCollectionItemParameters): SubmittableExtrinsic {
    const {
        api,
        collectionId,
        itemId,
        itemDescription,
    } = parameters;

    return api.tx.logionLoc.addCollectionItem(collectionId.toHexString(), itemId, itemDescription);
}
