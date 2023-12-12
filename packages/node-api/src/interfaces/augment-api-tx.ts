// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Null, Option, U8aFixed, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { LogionNodeRuntimeOpaqueSessionKeys, LogionNodeRuntimeOriginCaller, PalletLoAuthorityListLegalOfficerData, PalletLogionLocCollectionItemFile, PalletLogionLocCollectionItemToken, PalletLogionLocFileParams, PalletLogionLocItemsParams, PalletLogionLocLocLinkParams, PalletLogionLocMetadataItemParams, PalletLogionLocOtherAccountId, PalletLogionLocSupportedAccountId, PalletLogionLocTermsAndConditionsElement, PalletLogionLocTokensRecordFile, PalletMultisigTimepoint, SpConsensusGrandpaEquivocationProof, SpCoreVoid, SpWeightsWeightV2Weight } from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * See [`Pallet::force_set_balance`].
       **/
      forceSetBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * See [`Pallet::force_transfer`].
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * See [`Pallet::force_unreserve`].
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * See [`Pallet::transfer_all`].
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * See [`Pallet::transfer_allow_death`].
       **/
      transferAllowDeath: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * See [`Pallet::transfer_keep_alive`].
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * See [`Pallet::upgrade_accounts`].
       **/
      upgradeAccounts: AugmentedSubmittable<(who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    communityTreasury: {
      /**
       * See [`Pallet::approve_proposal`].
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::check_status`].
       **/
      checkStatus: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * See [`Pallet::payout`].
       **/
      payout: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * See [`Pallet::propose_spend`].
       **/
      proposeSpend: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * See [`Pallet::reject_proposal`].
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::remove_approval`].
       **/
      removeApproval: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::spend`].
       **/
      spend: AugmentedSubmittable<(assetKind: Null | null, amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: AccountId32 | string | Uint8Array, validFrom: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Null, Compact<u128>, AccountId32, Option<u32>]>;
      /**
       * See [`Pallet::spend_local`].
       **/
      spendLocal: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * See [`Pallet::void_spend`].
       **/
      voidSpend: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * See [`Pallet::note_stalled`].
       **/
      noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * See [`Pallet::report_equivocation`].
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * See [`Pallet::report_equivocation_unsigned`].
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    loAuthorityList: {
      /**
       * See [`Pallet::add_legal_officer`].
       **/
      addLegalOfficer: AugmentedSubmittable<(legalOfficerId: AccountId32 | string | Uint8Array, data: PalletLoAuthorityListLegalOfficerData | { Host: any } | { Guest: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, PalletLoAuthorityListLegalOfficerData]>;
      /**
       * See [`Pallet::remove_legal_officer`].
       **/
      removeLegalOfficer: AugmentedSubmittable<(legalOfficerId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * See [`Pallet::update_legal_officer`].
       **/
      updateLegalOfficer: AugmentedSubmittable<(legalOfficerId: AccountId32 | string | Uint8Array, data: PalletLoAuthorityListLegalOfficerData | { Host: any } | { Guest: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, PalletLoAuthorityListLegalOfficerData]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    logionLoc: {
      /**
       * See [`Pallet::acknowledge_file`].
       **/
      acknowledgeFile: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, H256]>;
      /**
       * See [`Pallet::acknowledge_link`].
       **/
      acknowledgeLink: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, target: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Compact<u128>]>;
      /**
       * See [`Pallet::acknowledge_metadata`].
       **/
      acknowledgeMetadata: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, name: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, H256]>;
      /**
       * See [`Pallet::add_collection_item`].
       **/
      addCollectionItem: AugmentedSubmittable<(collectionLocId: Compact<u128> | AnyNumber | Uint8Array, itemId: H256 | string | Uint8Array, itemDescription: H256 | string | Uint8Array, itemFiles: Vec<PalletLogionLocCollectionItemFile> | (PalletLogionLocCollectionItemFile | { name?: any; contentType?: any; size_?: any; hash_?: any } | string | Uint8Array)[], itemToken: Option<PalletLogionLocCollectionItemToken> | null | Uint8Array | PalletLogionLocCollectionItemToken | { tokenType?: any; tokenId?: any; tokenIssuance?: any } | string, restrictedDelivery: bool | boolean | Uint8Array, termsAndConditions: Vec<PalletLogionLocTermsAndConditionsElement> | (PalletLogionLocTermsAndConditionsElement | { tcType?: any; tcLoc?: any; details?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Compact<u128>, H256, H256, Vec<PalletLogionLocCollectionItemFile>, Option<PalletLogionLocCollectionItemToken>, bool, Vec<PalletLogionLocTermsAndConditionsElement>]>;
      /**
       * See [`Pallet::add_file`].
       **/
      addFile: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, file: PalletLogionLocFileParams | { hash_?: any; nature?: any; submitter?: any; size_?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocFileParams]>;
      /**
       * See [`Pallet::add_link`].
       **/
      addLink: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, link: PalletLogionLocLocLinkParams | { id?: any; nature?: any; submitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocLocLinkParams]>;
      /**
       * See [`Pallet::add_metadata`].
       **/
      addMetadata: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, item: PalletLogionLocMetadataItemParams | { name?: any; value?: any; submitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocMetadataItemParams]>;
      /**
       * See [`Pallet::add_tokens_record`].
       **/
      addTokensRecord: AugmentedSubmittable<(collectionLocId: Compact<u128> | AnyNumber | Uint8Array, recordId: H256 | string | Uint8Array, description: H256 | string | Uint8Array, files: Vec<PalletLogionLocTokensRecordFile> | (PalletLogionLocTokensRecordFile | { name?: any; contentType?: any; size_?: any; hash_?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Compact<u128>, H256, H256, Vec<PalletLogionLocTokensRecordFile>]>;
      /**
       * See [`Pallet::close`].
       **/
      close: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, seal: Option<H256> | null | Uint8Array | H256 | string, autoAck: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Option<H256>, bool]>;
      /**
       * See [`Pallet::create_collection_loc`].
       **/
      createCollectionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, legalOfficer: AccountId32 | string | Uint8Array, collectionLastBlockSubmission: Option<u32> | null | Uint8Array | u32 | AnyNumber, collectionMaxSize: Option<u32> | null | Uint8Array | u32 | AnyNumber, collectionCanUpload: bool | boolean | Uint8Array, valueFee: u128 | AnyNumber | Uint8Array, legalFee: u128 | AnyNumber | Uint8Array, collectionItemFee: u128 | AnyNumber | Uint8Array, tokensRecordFee: u128 | AnyNumber | Uint8Array, items: PalletLogionLocItemsParams | { metadata?: any; files?: any; links?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32, Option<u32>, Option<u32>, bool, u128, u128, u128, u128, PalletLogionLocItemsParams]>;
      /**
       * See [`Pallet::create_logion_identity_loc`].
       **/
      createLogionIdentityLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * See [`Pallet::create_logion_transaction_loc`].
       **/
      createLogionTransactionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterLocId: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, u128]>;
      /**
       * See [`Pallet::create_other_identity_loc`].
       **/
      createOtherIdentityLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterAccountId: PalletLogionLocOtherAccountId | { Ethereum: any } | string | Uint8Array, sponsorshipId: Compact<u128> | AnyNumber | Uint8Array, legalFee: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocOtherAccountId, Compact<u128>, u128]>;
      /**
       * See [`Pallet::create_polkadot_identity_loc`].
       **/
      createPolkadotIdentityLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, legalOfficer: AccountId32 | string | Uint8Array, legalFee: u128 | AnyNumber | Uint8Array, items: PalletLogionLocItemsParams | { metadata?: any; files?: any; links?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32, u128, PalletLogionLocItemsParams]>;
      /**
       * See [`Pallet::create_polkadot_transaction_loc`].
       **/
      createPolkadotTransactionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, legalOfficer: AccountId32 | string | Uint8Array, legalFee: u128 | AnyNumber | Uint8Array, items: PalletLogionLocItemsParams | { metadata?: any; files?: any; links?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32, u128, PalletLogionLocItemsParams]>;
      /**
       * See [`Pallet::dismiss_issuer`].
       **/
      dismissIssuer: AugmentedSubmittable<(issuer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * See [`Pallet::make_void`].
       **/
      makeVoid: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * See [`Pallet::make_void_and_replace`].
       **/
      makeVoidAndReplace: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, replacerLocId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Compact<u128>]>;
      /**
       * See [`Pallet::nominate_issuer`].
       **/
      nominateIssuer: AugmentedSubmittable<(issuer: AccountId32 | string | Uint8Array, identityLocId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Compact<u128>]>;
      /**
       * See [`Pallet::set_issuer_selection`].
       **/
      setIssuerSelection: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, issuer: AccountId32 | string | Uint8Array, selected: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32, bool]>;
      /**
       * See [`Pallet::sponsor`].
       **/
      sponsor: AugmentedSubmittable<(sponsorshipId: Compact<u128> | AnyNumber | Uint8Array, sponsoredAccount: PalletLogionLocSupportedAccountId | { None: any } | { Polkadot: any } | { Other: any } | string | Uint8Array, legalOfficer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocSupportedAccountId, AccountId32]>;
      /**
       * See [`Pallet::withdraw_sponsorship`].
       **/
      withdrawSponsorship: AugmentedSubmittable<(sponsorshipId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    logionTreasury: {
      /**
       * See [`Pallet::approve_proposal`].
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::check_status`].
       **/
      checkStatus: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * See [`Pallet::payout`].
       **/
      payout: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * See [`Pallet::propose_spend`].
       **/
      proposeSpend: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * See [`Pallet::reject_proposal`].
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::remove_approval`].
       **/
      removeApproval: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * See [`Pallet::spend`].
       **/
      spend: AugmentedSubmittable<(assetKind: Null | null, amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: AccountId32 | string | Uint8Array, validFrom: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Null, Compact<u128>, AccountId32, Option<u32>]>;
      /**
       * See [`Pallet::spend_local`].
       **/
      spendLocal: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * See [`Pallet::void_spend`].
       **/
      voidSpend: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    multisig: {
      /**
       * See [`Pallet::approve_as_multi`].
       **/
      approveAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, callHash: U8aFixed | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, U8aFixed, SpWeightsWeightV2Weight]>;
      /**
       * See [`Pallet::as_multi`].
       **/
      asMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, call: Call | IMethod | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, Call, SpWeightsWeightV2Weight]>;
      /**
       * See [`Pallet::as_multi_threshold_1`].
       **/
      asMultiThreshold1: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Call]>;
      /**
       * See [`Pallet::cancel_as_multi`].
       **/
      cancelAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, PalletMultisigTimepoint, U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    recovery: {
      /**
       * See [`Pallet::as_recovered`].
       **/
      asRecovered: AugmentedSubmittable<(account: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * See [`Pallet::cancel_recovered`].
       **/
      cancelRecovered: AugmentedSubmittable<(account: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::claim_recovery`].
       **/
      claimRecovery: AugmentedSubmittable<(account: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::close_recovery`].
       **/
      closeRecovery: AugmentedSubmittable<(rescuer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::create_recovery`].
       **/
      createRecovery: AugmentedSubmittable<(friends: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], threshold: u16 | AnyNumber | Uint8Array, delayPeriod: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, u16, u32]>;
      /**
       * See [`Pallet::initiate_recovery`].
       **/
      initiateRecovery: AugmentedSubmittable<(account: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::remove_recovery`].
       **/
      removeRecovery: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * See [`Pallet::set_recovered`].
       **/
      setRecovered: AugmentedSubmittable<(lost: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, rescuer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress]>;
      /**
       * See [`Pallet::vouch_recovery`].
       **/
      vouchRecovery: AugmentedSubmittable<(lost: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, rescuer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      /**
       * See [`Pallet::purge_keys`].
       **/
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * See [`Pallet::set_keys`].
       **/
      setKeys: AugmentedSubmittable<(keys: LogionNodeRuntimeOpaqueSessionKeys | { aura?: any; grandpa?: any } | string | Uint8Array, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [LogionNodeRuntimeOpaqueSessionKeys, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * See [`Pallet::set_key`].
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::sudo`].
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * See [`Pallet::sudo_as`].
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * See [`Pallet::sudo_unchecked_weight`].
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * See [`Pallet::kill_prefix`].
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * See [`Pallet::kill_storage`].
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * See [`Pallet::remark`].
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::remark_with_event`].
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_code`].
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_code_without_checks`].
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_heap_pages`].
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * See [`Pallet::set_storage`].
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * See [`Pallet::set`].
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * See [`Pallet::as_derivative`].
       **/
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      /**
       * See [`Pallet::batch`].
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::batch_all`].
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::dispatch_as`].
       **/
      dispatchAs: AugmentedSubmittable<(asOrigin: LogionNodeRuntimeOriginCaller | { system: any } | { Void: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [LogionNodeRuntimeOriginCaller, Call]>;
      /**
       * See [`Pallet::force_batch`].
       **/
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::with_weight`].
       **/
      withWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    validatorSet: {
      /**
       * See [`Pallet::add_validator`].
       **/
      addValidator: AugmentedSubmittable<(validatorId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * See [`Pallet::remove_validator`].
       **/
      removeValidator: AugmentedSubmittable<(validatorId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    vault: {
      /**
       * See [`Pallet::approve_call`].
       **/
      approveCall: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array, timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Call, PalletMultisigTimepoint, SpWeightsWeightV2Weight]>;
      /**
       * See [`Pallet::request_call`].
       **/
      requestCall: AugmentedSubmittable<(legalOfficers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], callHash: U8aFixed | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, U8aFixed, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    verifiedRecovery: {
      /**
       * See [`Pallet::create_recovery`].
       **/
      createRecovery: AugmentedSubmittable<(legalOfficers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    vote: {
      /**
       * See [`Pallet::create_vote_for_all_legal_officers`].
       **/
      createVoteForAllLegalOfficers: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * See [`Pallet::vote`].
       **/
      vote: AugmentedSubmittable<(voteId: Compact<u64> | AnyNumber | Uint8Array, voteYes: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
