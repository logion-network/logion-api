// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { AccountId, Balance, BlockNumber, Hash, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { AccountInfoWithDualRefCount } from '@polkadot/types/interfaces/system';
import type { DepositBalance } from '@polkadot/types/interfaces/uniques';

/** @name AccountInfo */
export interface AccountInfo extends AccountInfoWithDualRefCount {}

/** @name Address */
export interface Address extends MultiAddress {}

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

/** @name AssetId */
export interface AssetId extends u64 {}

/** @name AssetMetadata */
export interface AssetMetadata extends Struct {
  readonly deposit: DepositBalance;
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8;
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
}

/** @name CollectionSize */
export interface CollectionSize extends u32 {}

/** @name File */
export interface File extends Struct {
  readonly hash: Hash;
  readonly nature: Bytes;
  readonly submitter: AccountId;
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
}

/** @name LegalOfficerData */
export interface LegalOfficerData extends Struct {
  readonly node_id: Option<OpaquePeerId>;
  readonly base_url: Option<Bytes>;
}

/** @name LoAuthorityListStorageVersion */
export interface LoAuthorityListStorageVersion extends Enum {
  readonly isV1: boolean;
  readonly isV2AddOnchainSettings: boolean;
  readonly type: 'V1' | 'V2AddOnchainSettings';
}

/** @name LocId */
export interface LocId extends u128 {}

/** @name LocLink */
export interface LocLink extends Struct {
  readonly id: LocId;
  readonly nature: Bytes;
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

/** @name LookupSource */
export interface LookupSource extends MultiAddress {}

/** @name MetadataItem */
export interface MetadataItem extends Struct {
  readonly name: Bytes;
  readonly value: Bytes;
  readonly submitter: AccountId;
}

/** @name OpaquePeerId */
export interface OpaquePeerId extends Bytes {}

/** @name Requester */
export interface Requester extends Enum {
  readonly isNone: boolean;
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isLoc: boolean;
  readonly asLoc: LocId;
  readonly type: 'None' | 'Account' | 'Loc';
}

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
  readonly type: 'V1' | 'V2MakeLocVoid' | 'V3RequesterEnum' | 'V4ItemSubmitter' | 'V5Collection' | 'V6ItemUpload' | 'V7ItemToken' | 'V8AddSeal' | 'V9TermsAndConditions';
}

/** @name TAssetBalance */
export interface TAssetBalance extends u128 {}

/** @name TermsAndConditionsElement */
export interface TermsAndConditionsElement extends Struct {
  readonly tc_type: Bytes;
  readonly tc_loc: LocId;
  readonly details: Bytes;
}

export type PHANTOM_DEFAULT = 'default';
