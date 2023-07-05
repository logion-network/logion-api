// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Balance, BlockNumber, H160, Hash } from '@logion/node-api/dist/interfaces/runtime';
import type { Bytes, Enum, Option, Struct, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { AccountInfoWithDualRefCount } from '@polkadot/types/interfaces/system';
import type { DepositBalance } from '@polkadot/types/interfaces/uniques';

/** @name AccountInfo */
export interface AccountInfo extends AccountInfoWithDualRefCount {}

/** @name AssetDetails */
export interface AssetDetails extends Struct {
  readonly owner: AccountId;
  readonly issuer: AccountId;
  readonly admin: AccountId;
  readonly freezer: AccountId;
  readonly supply: Balance;
  readonly deposit: DepositBalance;
  readonly max_zombies: u32;
  readonly min_balance: Balance;
  readonly zombies: u32;
  readonly accounts: u32;
  readonly is_frozen: bool;
}

/** @name AssetMetadata */
export interface AssetMetadata extends Struct {
  readonly deposit: DepositBalance;
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8;
}

/** @name Ballot */
export interface Ballot extends Struct {
  readonly voter: LocId;
  readonly status: AccountId;
}

/** @name BallotStatus */
export interface BallotStatus extends Enum {
  readonly isNotVoted: boolean;
  readonly isVotedYes: boolean;
  readonly isVotedNo: boolean;
  readonly type: 'NotVoted' | 'VotedYes' | 'VotedNo';
}

/** @name Beneficiary */
export interface Beneficiary extends Enum {
  readonly isTreasury: boolean;
  readonly isLegalOfficer: boolean;
  readonly asLegalOfficer: AccountId;
  readonly type: 'Treasury' | 'LegalOfficer';
}

/** @name CollectionItem */
export interface CollectionItem extends Struct {
  readonly description: Bytes;
  readonly files: Vec<CollectionItemFile>;
  readonly token: Option<CollectionItemToken>;
  readonly restricted_delivery: bool;
  readonly terms_and_conditions: Vec<TermsAndConditionsElement>;
}

/** @name CollectionItemFile */
export interface CollectionItemFile extends Struct {
  readonly name: Bytes;
  readonly content_type: Bytes;
  readonly fileSize: u32;
  readonly hash: Hash;
}

/** @name CollectionItemId */
export interface CollectionItemId extends Hash {}

/** @name CollectionItemToken */
export interface CollectionItemToken extends Struct {
  readonly token_type: Bytes;
  readonly token_id: Bytes;
  readonly token_issuance: TokenIssuance;
}

/** @name CollectionSize */
export interface CollectionSize extends u32 {}

/** @name File */
export interface File extends Struct {
  readonly hash: Hash;
  readonly nature: Hash;
  readonly submitter: SupportedAccountId;
  readonly acknowledged: bool;
}

/** @name FileParams */
export interface FileParams extends Struct {
  readonly hash: Hash;
  readonly nature: Hash;
  readonly submitter: SupportedAccountId;
}

/** @name HostData */
export interface HostData extends Struct {
  readonly node_id: Option<OpaquePeerId>;
  readonly base_url: Option<Bytes>;
  readonly region: Region;
}

/** @name LegalOfficerCaseOf */
export interface LegalOfficerCaseOf extends Struct {
  readonly owner: AccountId;
  readonly requester: Requester;
  readonly metadata: Vec<MetadataItem>;
  readonly files: Vec<File>;
  readonly closed: bool;
  readonly loc_type: LocType;
  readonly links: Vec<LocLink>;
  readonly void_info: Option<LocVoidInfo>;
  readonly replacer_of: Option<LocId>;
  readonly collection_last_block_submission: Option<BlockNumber>;
  readonly collection_max_size: Option<CollectionSize>;
  readonly collection_can_upload: bool;
  readonly seal: Option<Hash>;
  readonly sponsorship_id: Option<SponsorshipId>;
}

/** @name LegalOfficerCaseSummary */
export interface LegalOfficerCaseSummary extends Struct {
  readonly owner: AccountId;
  readonly requester: Option<AccountId>;
}

/** @name LegalOfficerData */
export interface LegalOfficerData extends Enum {
  readonly isHost: boolean;
  readonly asHost: HostData;
  readonly isGuest: boolean;
  readonly asGuest: AccountId;
  readonly type: 'Host' | 'Guest';
}

/** @name LoAuthorityListStorageVersion */
export interface LoAuthorityListStorageVersion extends Enum {
  readonly isV1: boolean;
  readonly isV2AddOnchainSettings: boolean;
  readonly isV3GuestLegalOfficers: boolean;
  readonly isV4Region: boolean;
  readonly type: 'V1' | 'V2AddOnchainSettings' | 'V3GuestLegalOfficers' | 'V4Region';
}

/** @name LocId */
export interface LocId extends u128 {}

/** @name LocLink */
export interface LocLink extends Struct {
  readonly id: LocId;
  readonly nature: Hash;
}

/** @name LocType */
export interface LocType extends Enum {
  readonly isTransaction: boolean;
  readonly isIdentity: boolean;
  readonly isCollection: boolean;
  readonly type: 'Transaction' | 'Identity' | 'Collection';
}

/** @name LocVoidInfo */
export interface LocVoidInfo extends Struct {
  readonly replacer: Option<LocId>;
}

/** @name LogionVote */
export interface LogionVote extends Struct {
  readonly locId: LocId;
  readonly ballots: Vec<Ballot>;
}

/** @name MetadataItem */
export interface MetadataItem extends Struct {
  readonly name: Hash;
  readonly value: Hash;
  readonly submitter: SupportedAccountId;
  readonly acknowledged: bool;
}

/** @name MetadataItemParams */
export interface MetadataItemParams extends Struct {
  readonly name: Hash;
  readonly value: Hash;
  readonly submitter: SupportedAccountId;
}

/** @name OpaquePeerId */
export interface OpaquePeerId extends Bytes {}

/** @name OtherAccountId */
export interface OtherAccountId extends Enum {
  readonly isEthereum: boolean;
  readonly asEthereum: H160;
  readonly type: 'Ethereum';
}

/** @name Region */
export interface Region extends Enum {
  readonly isEurope: boolean;
  readonly type: 'Europe';
}

/** @name Requester */
export interface Requester extends Enum {
  readonly isNone: boolean;
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isLoc: boolean;
  readonly asLoc: LocId;
  readonly isOtherAccount: boolean;
  readonly asOtherAccount: OtherAccountId;
  readonly type: 'None' | 'Account' | 'Loc' | 'OtherAccount';
}

/** @name Sponsorship */
export interface Sponsorship extends Struct {
  readonly sponsor: AccountId;
  readonly sponsored_account: SupportedAccountId;
  readonly legal_officer: AccountId;
  readonly loc_id: Option<LocId>;
}

/** @name SponsorshipId */
export interface SponsorshipId extends u128 {}

/** @name StorageVersion */
export interface StorageVersion extends Enum {
  readonly isV1: boolean;
  readonly isV2MakeLocVoid: boolean;
  readonly isV3RequesterEnum: boolean;
  readonly isV4ItemSubmitter: boolean;
  readonly isV5Collection: boolean;
  readonly isV6ItemUpload: boolean;
  readonly isV7ItemToken: boolean;
  readonly isV8AddSeal: boolean;
  readonly isV9TermsAndConditions: boolean;
  readonly isV10AddLocFileSize: boolean;
  readonly isV11EnableEthereumSubmitter: boolean;
  readonly isV12Sponsorship: boolean;
  readonly isV13AcknowledgeItems: boolean;
  readonly isV14HashLocPublicData: boolean;
  readonly isV15AddTokenIssuance: boolean;
  readonly type: 'V1' | 'V2MakeLocVoid' | 'V3RequesterEnum' | 'V4ItemSubmitter' | 'V5Collection' | 'V6ItemUpload' | 'V7ItemToken' | 'V8AddSeal' | 'V9TermsAndConditions' | 'V10AddLocFileSize' | 'V11EnableEthereumSubmitter' | 'V12Sponsorship' | 'V13AcknowledgeItems' | 'V14HashLocPublicData' | 'V15AddTokenIssuance';
}

/** @name SupportedAccountId */
export interface SupportedAccountId extends Enum {
  readonly isNone: boolean;
  readonly isPolkadot: boolean;
  readonly asPolkadot: AccountId;
  readonly isOther: boolean;
  readonly asOther: OtherAccountId;
  readonly type: 'None' | 'Polkadot' | 'Other';
}

/** @name TAssetBalance */
export interface TAssetBalance extends u128 {}

/** @name TermsAndConditionsElement */
export interface TermsAndConditionsElement extends Struct {
  readonly tcType: Bytes;
  readonly tcLoc: LocId;
  readonly details: Bytes;
}

/** @name TokenIssuance */
export interface TokenIssuance extends u64 {}

/** @name TokensRecord */
export interface TokensRecord extends Struct {
  readonly description: Bytes;
  readonly files: Vec<TokensRecordFile>;
  readonly submitter: AccountId;
}

/** @name TokensRecordFile */
export interface TokensRecordFile extends Struct {
  readonly name: Bytes;
  readonly contentType: Bytes;
  readonly file_size: u32;
  readonly hash: Hash;
}

/** @name UnboundedTokensRecordFile */
export interface UnboundedTokensRecordFile extends TokensRecordFile {}

/** @name UnboundedTokensRecordFileOf */
export interface UnboundedTokensRecordFileOf extends TokensRecordFile {}

/** @name VerifiedIssuer */
export interface VerifiedIssuer extends Struct {
  readonly identityLoc: LocId;
}

/** @name VoteApproved */
export interface VoteApproved extends bool {}

/** @name VoteClosed */
export interface VoteClosed extends bool {}

/** @name VoteId */
export interface VoteId extends u64 {}

export type PHANTOM_DEFAULT = 'default';
