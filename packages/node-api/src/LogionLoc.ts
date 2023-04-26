import { ApiPromise } from '@polkadot/api';
import { Option, Vec } from "@polkadot/types-codec";
import { UUID } from './UUID.js';
import {
    LegalOfficerCase,
    MetadataItem,
    VoidInfo,
    CollectionItem,
    ItemFile,
    ItemToken,
    TermsAndConditionsElement,
    TypesTokensRecordFile,
    TypesTokensRecord,
    OtherAccountId,
    ValidAccountId
} from './Types.js';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { PalletLogionLocTokensRecordFile, PalletLogionLocTokensRecord } from '@polkadot/types/lookup';
import { LogionNodeApi, LogionNodeApiClass } from './Connection.js';
import { Adapters } from './Adapters.js';

/**
 * @deprecated
 */
export interface LogionIdentityLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createLogionIdentityLoc(Adapters.toLocId(locId))
 */
export function createLogionIdentityLoc(parameters: LogionIdentityLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createLogionIdentityLoc(Adapters.toLocId(parameters.locId));
}

/**
 * @deprecated
 */
export interface LogionTransactionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requesterLocId: UUID;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createLogionTransactionLoc(Adapters.toLocId(locId), Adapters.toLocId(requesterLocId))
 */
export function createLogionTransactionLoc(parameters: LogionTransactionLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createLogionTransactionLoc(Adapters.toLocId(parameters.locId), Adapters.toLocId(parameters.requesterLocId));
}

/**
 * @deprecated
 */
export interface PolkadotIdentityLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createPolkadotIdentityLoc(Adapters.toLocId(locId), requester)
 */
export function createPolkadotIdentityLoc(parameters: PolkadotIdentityLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createPolkadotIdentityLoc(Adapters.toLocId(parameters.locId), parameters.requester);
}

/**
 * @deprecated
 */
export interface OtherIdentityLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: OtherAccountId;
    sponsorshipId: UUID;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createPolkadotIdentityLoc(Adapters.toLocId(locId), requester)
 */
export function createOtherIdentityLoc(parameters: OtherIdentityLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createOtherIdentityLoc(
        Adapters.toLocId(parameters.locId),
        logionApi.adapters.toPalletLogionLocOtherAccountId(parameters.requester),
        logionApi.adapters.toSponsorshipId(parameters.sponsorshipId),
    );
}

/**
 * @deprecated
 */
export interface PolkadotTransactionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createPolkadotIdentityLoc(Adapters.toLocId(locId), requester)
 */
export function createPolkadotTransactionLoc(parameters: PolkadotTransactionLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createPolkadotTransactionLoc(Adapters.toLocId(parameters.locId), parameters.requester);
}

/**
 * @deprecated
 */
export interface CollectionLocCreationParameters {
    api: ApiPromise;
    locId: UUID;
    requester: string;
    lastBlock?: string;
    maxSize?: string;
    canUpload: boolean;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.createCollectionLoc(Adapters.toLocId(locId), requester, lastBlock, maxSize, canUpload)
 */
export function createCollectionLoc(parameters: CollectionLocCreationParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.createCollectionLoc(Adapters.toLocId(parameters.locId), parameters.requester, parameters.lastBlock || null, parameters.maxSize || null, parameters.canUpload);
}

/**
 * @deprecated
 */
export interface AddMetadataParameters {
    api: ApiPromise;
    locId: UUID;
    item: MetadataItem;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.addMetadata(Adapters.toLocId(locId), item)
 */
export function addMetadata(parameters: AddMetadataParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.addMetadata(Adapters.toLocId(parameters.locId), logionApi.adapters.toPalletLogionLocMetadataItem(parameters.item));
}

/**
 * @deprecated
 */
export interface GetLegalOfficerCaseParameters {
    api: ApiPromise;
    locId: UUID;
}

/**
 * @deprecated use logionApi.queries.getLegalOfficerCase(locId)
 */
export async function getLegalOfficerCase(parameters: GetLegalOfficerCaseParameters): Promise<LegalOfficerCase | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getLegalOfficerCase(parameters.locId);
}

/**
 * @deprecated
 */
export interface GetLegalOfficerCasesParameters {
    api: ApiPromise;
    locIds: UUID[];
}

/**
 * @deprecated use logionApi.batch.locs(locIds).getLocs()
 */
export async function getLegalOfficerCases(parameters: GetLegalOfficerCasesParameters): Promise<(LegalOfficerCase | undefined)[]> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return Object.values(await logionApi.batch.locs(parameters.locIds).getLocs());
}

/**
 * @deprecated use logionApi.batch.locs(locIds).getLocs()
 */
export async function getLegalOfficerCasesMap(parameters: GetLegalOfficerCasesParameters): Promise<Record<string, LegalOfficerCase>> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return await logionApi.batch.locs(parameters.locIds).getLocs();
}

/**
 * @deprecated
 */
export interface AddFileParameters {
    api: ApiPromise;
    locId: UUID;
    hash: string;
    nature: string;
    submitter: ValidAccountId;
    size: bigint;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.addFile(Adapters.toLocId(locId), Adapters.toLocFile(file))
 */
export function addFile(parameters: AddFileParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.addFile(Adapters.toLocId(parameters.locId), logionApi.adapters.toLocFile(parameters));
}

/**
 * @deprecated
 */
export interface CloseLocParameters {
    api: ApiPromise;
    locId: UUID;
    seal?: string;
}

/**
 * @deprecated use either logionApi.polkadot.tx.logionLoc.closeAndSeal(Adapters.toLocId(locId), seal) or 
 * logionApi.polkadot.tx.logionLoc.close(Adapters.toLocId(locId))
 */
export function closeLoc(parameters: CloseLocParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    if(parameters.seal) {
        return logionApi.polkadot.tx.logionLoc.closeAndSeal(Adapters.toLocId(parameters.locId), parameters.seal);
    } else {
        return logionApi.polkadot.tx.logionLoc.close(Adapters.toLocId(parameters.locId));
    }
}

/**
 * @deprecated
 */
export interface AddLinkParameters {
    api: ApiPromise;
    locId: UUID;
    target: UUID;
    nature: string;
}

/**
 * @deprecated use logionApi.polkadot.tx.logionLoc.addLink(Adapters.toLocId(locId), Adapters.toLocLink(link))
 */
export function addLink(parameters: AddLinkParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.polkadot.tx.logionLoc.addLink(
        Adapters.toLocId(parameters.locId),
        Adapters.toLocLink(parameters),
    );
}

/**
 * @deprecated
 */
export interface VoidLocParameters {
    api: ApiPromise;
    locId: UUID;
    voidInfo: VoidInfo;
}

/**
 * @deprecated use either logionApi.polkadot.tx.logionLoc.makeVoid(Adapters.toLocId(locId)) or
 * logionApi.polkadot.tx.logionLoc.makeVoidAndReplace(Adapters.toLocId(locId), Adapters.toLocId(replacer))
 */
export function voidLoc(parameters: VoidLocParameters): SubmittableExtrinsic {
    const logionApi = new LogionNodeApiClass(parameters.api);
    if(parameters.voidInfo.replacer === undefined) {
        return logionApi.polkadot.tx.logionLoc.makeVoid(Adapters.toLocId(parameters.locId));
    } else {
        return logionApi.polkadot.tx.logionLoc.makeVoidAndReplace(Adapters.toLocId(parameters.locId), Adapters.toLocId(parameters.voidInfo.replacer));
    }
}

/**
 * @deprecated
 */
export interface GetCollectionItemParameters {
    api: ApiPromise;
    locId: UUID;
    itemId: string;
}

/**
 * @deprecated use logionApi.queries.getCollectionItem(locId, itemId)
 */
export async function getCollectionItem(
    parameters: GetCollectionItemParameters
): Promise<CollectionItem | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getCollectionItem(parameters.locId, parameters.itemId);
}

/**
 * @deprecated use logionApi.queries.getCollectionItems(locId)
 */
export async function getCollectionItems(
    parameters: { api: ApiPromise, locId: UUID }
): Promise<CollectionItem[]> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getCollectionItems(parameters.locId);
}

/**
 * @deprecated
 */
export interface GetCollectionSizeParameters {
    api: ApiPromise;
    locId: UUID;
}

/**
 * @deprecated use logionApi.queries.getCollectionSize(locId)
 */
export async function getCollectionSize(
    parameters: GetCollectionSizeParameters
): Promise<number | undefined> {
    const logionApi = new LogionNodeApiClass(parameters.api);
    return logionApi.queries.getCollectionSize(parameters.locId);
}

/**
 * @deprecated
 */
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

/**
 * @deprecated use either logionApi.polkadot.tx.logionLoc.addCollectionItemWithTermsAndConditions(Adapters.toLocId(collectionId), itemId, itemDescription, files, token, restrictedDelivery, termsAndConditions)
 * or logionApi.polkadot.tx.logionLoc.addCollectionItem(Adapters.toLocId(collectionId), itemId, stringToHex(itemDescription), files, token, restrictedDelivery)
 * in combination with Adapters.toCollectionItemFile(file), Adapters.toCollectionItemToken(itemToken) and Adapters.toTermsAndConditionsElement(element)
 */
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

    const files = itemFiles.map(Adapters.toCollectionItemFile);
    const token = Adapters.toCollectionItemToken(itemToken);

    if (parameters.termsAndConditions && parameters.termsAndConditions.length > 0) {
        const termsAndConditions = parameters.termsAndConditions.map(Adapters.toTermsAndConditionsElement);
        return api.tx.logionLoc.addCollectionItemWithTermsAndConditions(Adapters.toLocId(collectionId), itemId, itemDescription, files, token, restrictedDelivery, termsAndConditions);
    } else {
        return api.tx.logionLoc.addCollectionItem(Adapters.toLocId(collectionId), itemId, itemDescription, files, token, restrictedDelivery);
    }
}

/**
 * @deprecated use TypesTokensRecordFile
 */
export interface TokensRecordFile extends TypesTokensRecordFile {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use logionApi.adapters.toPalletLogionLocTokensRecordFile(file)
 */
export function newTokensRecordFile(api: LogionNodeApi, file: TokensRecordFile): PalletLogionLocTokensRecordFile {
    const logionApi = new LogionNodeApiClass(api);
    return logionApi.adapters.toPalletLogionLocTokensRecordFile(file);
}

/**
 * @deprecated use logionApi.adapters.newTokensRecordFiles(files)
 */
export function newTokensRecordFiles(api: LogionNodeApi, files: TokensRecordFile[]): Vec<PalletLogionLocTokensRecordFile> {
    const logionApi = new LogionNodeApiClass(api);
    return logionApi.adapters.newTokensRecordFileVec(files);
}

/**
 * @deprecated use TypesTokensRecord
 */
export interface TokensRecord extends TypesTokensRecord {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use Adapters.toTokensRecord(substrateObject)
 */
export function toTokensRecord(substrateObject: PalletLogionLocTokensRecord): TokensRecord {
    return Adapters.toTokensRecord(substrateObject);
}

/**
 * @deprecated this function nas no replacement
 */
export async function toUnwrappedTokensRecord(query: Promise<Option<PalletLogionLocTokensRecord>>): Promise<TokensRecord> {
    return toTokensRecord((await query).unwrap());
}
