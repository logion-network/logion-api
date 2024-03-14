// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { OpaquePeerId } from '@polkadot/types/interfaces/imOnline';
import type { AccountId32, Call, H160, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
    readonly flags: u128;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (8) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (9) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (14) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (16) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (19) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (21) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly isUpgradeAuthorized: boolean;
    readonly asUpgradeAuthorized: {
      readonly codeHash: H256;
      readonly checkVersion: bool;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked' | 'UpgradeAuthorized';
  }

  /** @name FrameSupportDispatchDispatchInfo (22) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (23) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (24) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (25) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly isRootNotAllowed: boolean;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable' | 'RootNotAllowed';
  }

  /** @name SpRuntimeModuleError (26) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (27) */
  interface SpRuntimeTokenError extends Enum {
    readonly isFundsUnavailable: boolean;
    readonly isOnlyProvider: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly isCannotCreateHold: boolean;
    readonly isNotExpendable: boolean;
    readonly isBlocked: boolean;
    readonly type: 'FundsUnavailable' | 'OnlyProvider' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported' | 'CannotCreateHold' | 'NotExpendable' | 'Blocked';
  }

  /** @name SpArithmeticArithmeticError (28) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (29) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletBalancesEvent (31) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSuspended: boolean;
    readonly asSuspended: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isRestored: boolean;
    readonly asRestored: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUpgraded: boolean;
    readonly asUpgraded: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly amount: u128;
    } & Struct;
    readonly isRescinded: boolean;
    readonly asRescinded: {
      readonly amount: u128;
    } & Struct;
    readonly isLocked: boolean;
    readonly asLocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnlocked: boolean;
    readonly asUnlocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTotalIssuanceForced: boolean;
    readonly asTotalIssuanceForced: {
      readonly old: u128;
      readonly new_: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed' | 'Minted' | 'Burned' | 'Suspended' | 'Restored' | 'Upgraded' | 'Issued' | 'Rescinded' | 'Locked' | 'Unlocked' | 'Frozen' | 'Thawed' | 'TotalIssuanceForced';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (32) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name SubstrateValidatorSetEvent (33) */
  interface SubstrateValidatorSetEvent extends Enum {
    readonly isValidatorAdditionInitiated: boolean;
    readonly asValidatorAdditionInitiated: AccountId32;
    readonly isValidatorRemovalInitiated: boolean;
    readonly asValidatorRemovalInitiated: AccountId32;
    readonly type: 'ValidatorAdditionInitiated' | 'ValidatorRemovalInitiated';
  }

  /** @name PalletSessionEvent (34) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (35) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpConsensusGrandpaAppPublic (38) */
  interface SpConsensusGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (39) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletTransactionPaymentEvent (40) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletSudoEvent (41) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly old: Option<AccountId32>;
      readonly new_: AccountId32;
    } & Struct;
    readonly isKeyRemoved: boolean;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'KeyRemoved' | 'SudoAsDone';
  }

  /** @name PalletMultisigEvent (45) */
  interface PalletMultisigEvent extends Enum {
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: {
      readonly approving: AccountId32;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: {
      readonly cancelling: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigTimepoint (46) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletRecoveryEvent (47) */
  interface PalletRecoveryEvent extends Enum {
    readonly isRecoveryCreated: boolean;
    readonly asRecoveryCreated: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRecoveryInitiated: boolean;
    readonly asRecoveryInitiated: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isRecoveryVouched: boolean;
    readonly asRecoveryVouched: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
      readonly sender: AccountId32;
    } & Struct;
    readonly isRecoveryClosed: boolean;
    readonly asRecoveryClosed: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isAccountRecovered: boolean;
    readonly asAccountRecovered: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isRecoveryRemoved: boolean;
    readonly asRecoveryRemoved: {
      readonly lostAccount: AccountId32;
    } & Struct;
    readonly type: 'RecoveryCreated' | 'RecoveryInitiated' | 'RecoveryVouched' | 'RecoveryClosed' | 'AccountRecovered' | 'RecoveryRemoved';
  }

  /** @name PalletLoAuthorityListEvent (48) */
  interface PalletLoAuthorityListEvent extends Enum {
    readonly isLoAdded: boolean;
    readonly asLoAdded: AccountId32;
    readonly isLoRemoved: boolean;
    readonly asLoRemoved: AccountId32;
    readonly isLoUpdated: boolean;
    readonly asLoUpdated: AccountId32;
    readonly isLoImported: boolean;
    readonly asLoImported: AccountId32;
    readonly type: 'LoAdded' | 'LoRemoved' | 'LoUpdated' | 'LoImported';
  }

  /** @name PalletLogionLocEvent (49) */
  interface PalletLogionLocEvent extends Enum {
    readonly isLocCreated: boolean;
    readonly asLocCreated: u128;
    readonly isLocClosed: boolean;
    readonly asLocClosed: u128;
    readonly isLocVoid: boolean;
    readonly asLocVoid: u128;
    readonly isItemAdded: boolean;
    readonly asItemAdded: ITuple<[u128, H256]>;
    readonly isStorageFeeWithdrawn: boolean;
    readonly asStorageFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isSponsorshipCreated: boolean;
    readonly asSponsorshipCreated: ITuple<[u128, AccountId32, PalletLogionLocSupportedAccountId]>;
    readonly isSponsorshipWithdrawn: boolean;
    readonly asSponsorshipWithdrawn: ITuple<[u128, AccountId32, PalletLogionLocSupportedAccountId]>;
    readonly isLegalFeeWithdrawn: boolean;
    readonly asLegalFeeWithdrawn: ITuple<[AccountId32, LogionSharedBeneficiary, u128]>;
    readonly isCertificateFeeWithdrawn: boolean;
    readonly asCertificateFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isValueFeeWithdrawn: boolean;
    readonly asValueFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isCollectionItemFeeWithdrawn: boolean;
    readonly asCollectionItemFeeWithdrawn: ITuple<[AccountId32, u128, LogionSharedBeneficiary, u128]>;
    readonly isTokensRecordFeeWithdrawn: boolean;
    readonly asTokensRecordFeeWithdrawn: ITuple<[AccountId32, u128, LogionSharedBeneficiary, u128]>;
    readonly isLocImported: boolean;
    readonly asLocImported: u128;
    readonly isItemImported: boolean;
    readonly asItemImported: ITuple<[u128, H256]>;
    readonly isTokensRecordImported: boolean;
    readonly asTokensRecordImported: ITuple<[u128, H256]>;
    readonly isSponsorshipImported: boolean;
    readonly asSponsorshipImported: u128;
    readonly type: 'LocCreated' | 'LocClosed' | 'LocVoid' | 'ItemAdded' | 'StorageFeeWithdrawn' | 'SponsorshipCreated' | 'SponsorshipWithdrawn' | 'LegalFeeWithdrawn' | 'CertificateFeeWithdrawn' | 'ValueFeeWithdrawn' | 'CollectionItemFeeWithdrawn' | 'TokensRecordFeeWithdrawn' | 'LocImported' | 'ItemImported' | 'TokensRecordImported' | 'SponsorshipImported';
  }

  /** @name PalletLogionLocSupportedAccountId (50) */
  interface PalletLogionLocSupportedAccountId extends Enum {
    readonly isNone: boolean;
    readonly isPolkadot: boolean;
    readonly asPolkadot: AccountId32;
    readonly isOther: boolean;
    readonly asOther: PalletLogionLocOtherAccountId;
    readonly type: 'None' | 'Polkadot' | 'Other';
  }

  /** @name PalletLogionLocOtherAccountId (53) */
  interface PalletLogionLocOtherAccountId extends Enum {
    readonly isEthereum: boolean;
    readonly asEthereum: H160;
    readonly type: 'Ethereum';
  }

  /** @name LogionSharedBeneficiary (54) */
  interface LogionSharedBeneficiary extends Enum {
    readonly isOther: boolean;
    readonly isLegalOfficer: boolean;
    readonly asLegalOfficer: AccountId32;
    readonly type: 'Other' | 'LegalOfficer';
  }

  /** @name PalletVerifiedRecoveryEvent (55) */
  type PalletVerifiedRecoveryEvent = Null;

  /** @name PalletLogionVaultEvent (56) */
  type PalletLogionVaultEvent = Null;

  /** @name PalletLogionVoteEvent (57) */
  interface PalletLogionVoteEvent extends Enum {
    readonly isVoteCreated: boolean;
    readonly asVoteCreated: ITuple<[u64, Vec<AccountId32>]>;
    readonly isVoteUpdated: boolean;
    readonly asVoteUpdated: ITuple<[u64, PalletLogionVoteBallot, bool, bool]>;
    readonly type: 'VoteCreated' | 'VoteUpdated';
  }

  /** @name PalletLogionVoteBallot (59) */
  interface PalletLogionVoteBallot extends Struct {
    readonly voter: AccountId32;
    readonly status: PalletLogionVoteBallotStatus;
  }

  /** @name PalletLogionVoteBallotStatus (60) */
  interface PalletLogionVoteBallotStatus extends Enum {
    readonly isNotVoted: boolean;
    readonly isVotedYes: boolean;
    readonly isVotedNo: boolean;
    readonly type: 'NotVoted' | 'VotedYes' | 'VotedNo';
  }

  /** @name PalletTreasuryEvent (61) */
  interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u128;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u128;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u128;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u128;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u128;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly isSpendApproved: boolean;
    readonly asSpendApproved: {
      readonly proposalIndex: u32;
      readonly amount: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isUpdatedInactive: boolean;
    readonly asUpdatedInactive: {
      readonly reactivated: u128;
      readonly deactivated: u128;
    } & Struct;
    readonly isAssetSpendApproved: boolean;
    readonly asAssetSpendApproved: {
      readonly index: u32;
      readonly assetKind: Null;
      readonly amount: u128;
      readonly beneficiary: AccountId32;
      readonly validFrom: u32;
      readonly expireAt: u32;
    } & Struct;
    readonly isAssetSpendVoided: boolean;
    readonly asAssetSpendVoided: {
      readonly index: u32;
    } & Struct;
    readonly isPaid: boolean;
    readonly asPaid: {
      readonly index: u32;
      readonly paymentId: Null;
    } & Struct;
    readonly isPaymentFailed: boolean;
    readonly asPaymentFailed: {
      readonly index: u32;
      readonly paymentId: Null;
    } & Struct;
    readonly isSpendProcessed: boolean;
    readonly asSpendProcessed: {
      readonly index: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved' | 'UpdatedInactive' | 'AssetSpendApproved' | 'AssetSpendVoided' | 'Paid' | 'PaymentFailed' | 'SpendProcessed';
  }

  /** @name PalletUtilityEvent (63) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
  }

  /** @name FrameSystemPhase (64) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (68) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCodeUpgradeAuthorization (71) */
  interface FrameSystemCodeUpgradeAuthorization extends Struct {
    readonly codeHash: H256;
    readonly checkVersion: bool;
  }

  /** @name FrameSystemCall (72) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly isAuthorizeUpgrade: boolean;
    readonly asAuthorizeUpgrade: {
      readonly codeHash: H256;
    } & Struct;
    readonly isAuthorizeUpgradeWithoutChecks: boolean;
    readonly asAuthorizeUpgradeWithoutChecks: {
      readonly codeHash: H256;
    } & Struct;
    readonly isApplyAuthorizedUpgrade: boolean;
    readonly asApplyAuthorizedUpgrade: {
      readonly code: Bytes;
    } & Struct;
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent' | 'AuthorizeUpgrade' | 'AuthorizeUpgradeWithoutChecks' | 'ApplyAuthorizedUpgrade';
  }

  /** @name FrameSystemLimitsBlockWeights (76) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (77) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (78) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (80) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (81) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (82) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (83) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (89) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly isNothingAuthorized: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered' | 'NothingAuthorized' | 'Unauthorized';
  }

  /** @name PalletTimestampCall (90) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesBalanceLock (92) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (93) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (96) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesIdAmount (102) */
  interface PalletBalancesIdAmount extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesCall (104) */
  interface PalletBalancesCall extends Enum {
    readonly isTransferAllowDeath: boolean;
    readonly asTransferAllowDeath: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly isUpgradeAccounts: boolean;
    readonly asUpgradeAccounts: {
      readonly who: Vec<AccountId32>;
    } & Struct;
    readonly isForceSetBalance: boolean;
    readonly asForceSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
    } & Struct;
    readonly isForceAdjustTotalIssuance: boolean;
    readonly asForceAdjustTotalIssuance: {
      readonly direction: PalletBalancesAdjustmentDirection;
      readonly delta: Compact<u128>;
    } & Struct;
    readonly type: 'TransferAllowDeath' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve' | 'UpgradeAccounts' | 'ForceSetBalance' | 'ForceAdjustTotalIssuance';
  }

  /** @name PalletBalancesAdjustmentDirection (108) */
  interface PalletBalancesAdjustmentDirection extends Enum {
    readonly isIncrease: boolean;
    readonly isDecrease: boolean;
    readonly type: 'Increase' | 'Decrease';
  }

  /** @name PalletBalancesError (109) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isExpendability: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly isTooManyHolds: boolean;
    readonly isTooManyFreezes: boolean;
    readonly isIssuanceDeactivated: boolean;
    readonly isDeltaZero: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'Expendability' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves' | 'TooManyHolds' | 'TooManyFreezes' | 'IssuanceDeactivated' | 'DeltaZero';
  }

  /** @name SubstrateValidatorSetCall (110) */
  interface SubstrateValidatorSetCall extends Enum {
    readonly isAddValidator: boolean;
    readonly asAddValidator: {
      readonly validatorId: AccountId32;
    } & Struct;
    readonly isRemoveValidator: boolean;
    readonly asRemoveValidator: {
      readonly validatorId: AccountId32;
    } & Struct;
    readonly type: 'AddValidator' | 'RemoveValidator';
  }

  /** @name SubstrateValidatorSetError (111) */
  interface SubstrateValidatorSetError extends Enum {
    readonly isTooLowValidatorCount: boolean;
    readonly isDuplicate: boolean;
    readonly type: 'TooLowValidatorCount' | 'Duplicate';
  }

  /** @name LogionNodeRuntimeOpaqueSessionKeys (114) */
  interface LogionNodeRuntimeOpaqueSessionKeys extends Struct {
    readonly aura: SpConsensusAuraSr25519AppSr25519Public;
    readonly grandpa: SpConsensusGrandpaAppPublic;
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (115) */
  interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (116) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name SpCoreCryptoKeyTypeId (119) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionCall (120) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: LogionNodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name PalletSessionError (121) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (125) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (126) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (129) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpConsensusGrandpaEquivocationProof (130) */
  interface SpConsensusGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpConsensusGrandpaEquivocation;
  }

  /** @name SpConsensusGrandpaEquivocation (131) */
  interface SpConsensusGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (132) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (133) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpConsensusGrandpaAppSignature (134) */
  interface SpConsensusGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (135) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (138) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (139) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (141) */
  type SpCoreVoid = Null;

  /** @name PalletGrandpaError (142) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletTransactionPaymentReleases (144) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletSudoCall (145) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly isRemoveKey: boolean;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs' | 'RemoveKey';
  }

  /** @name PalletMultisigCall (147) */
  interface PalletMultisigCall extends Enum {
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly call: Call;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly timepoint: PalletMultisigTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletRecoveryCall (149) */
  interface PalletRecoveryCall extends Enum {
    readonly isAsRecovered: boolean;
    readonly asAsRecovered: {
      readonly account: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly isSetRecovered: boolean;
    readonly asSetRecovered: {
      readonly lost: MultiAddress;
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isCreateRecovery: boolean;
    readonly asCreateRecovery: {
      readonly friends: Vec<AccountId32>;
      readonly threshold: u16;
      readonly delayPeriod: u32;
    } & Struct;
    readonly isInitiateRecovery: boolean;
    readonly asInitiateRecovery: {
      readonly account: MultiAddress;
    } & Struct;
    readonly isVouchRecovery: boolean;
    readonly asVouchRecovery: {
      readonly lost: MultiAddress;
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isClaimRecovery: boolean;
    readonly asClaimRecovery: {
      readonly account: MultiAddress;
    } & Struct;
    readonly isCloseRecovery: boolean;
    readonly asCloseRecovery: {
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isRemoveRecovery: boolean;
    readonly isCancelRecovered: boolean;
    readonly asCancelRecovered: {
      readonly account: MultiAddress;
    } & Struct;
    readonly type: 'AsRecovered' | 'SetRecovered' | 'CreateRecovery' | 'InitiateRecovery' | 'VouchRecovery' | 'ClaimRecovery' | 'CloseRecovery' | 'RemoveRecovery' | 'CancelRecovered';
  }

  /** @name PalletLoAuthorityListCall (150) */
  interface PalletLoAuthorityListCall extends Enum {
    readonly isAddLegalOfficer: boolean;
    readonly asAddLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly data: PalletLoAuthorityListLegalOfficerDataParam;
    } & Struct;
    readonly isRemoveLegalOfficer: boolean;
    readonly asRemoveLegalOfficer: {
      readonly legalOfficerId: AccountId32;
    } & Struct;
    readonly isUpdateLegalOfficer: boolean;
    readonly asUpdateLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly data: PalletLoAuthorityListLegalOfficerDataParam;
    } & Struct;
    readonly isImportHostLegalOfficer: boolean;
    readonly asImportHostLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly data: PalletLoAuthorityListHostDataParam;
    } & Struct;
    readonly isImportGuestLegalOfficer: boolean;
    readonly asImportGuestLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly hostId: AccountId32;
    } & Struct;
    readonly type: 'AddLegalOfficer' | 'RemoveLegalOfficer' | 'UpdateLegalOfficer' | 'ImportHostLegalOfficer' | 'ImportGuestLegalOfficer';
  }

  /** @name PalletLoAuthorityListLegalOfficerDataParam (151) */
  interface PalletLoAuthorityListLegalOfficerDataParam extends Enum {
    readonly isHost: boolean;
    readonly asHost: PalletLoAuthorityListHostDataParam;
    readonly isGuest: boolean;
    readonly asGuest: AccountId32;
    readonly type: 'Host' | 'Guest';
  }

  /** @name LogionNodeRuntimeRegion (152) */
  interface LogionNodeRuntimeRegion extends Enum {
    readonly isEurope: boolean;
    readonly type: 'Europe';
  }

  /** @name PalletLoAuthorityListHostDataParam (153) */
  interface PalletLoAuthorityListHostDataParam extends Struct {
    readonly nodeId: Option<OpaquePeerId>;
    readonly baseUrl: Option<Bytes>;
    readonly region: LogionNodeRuntimeRegion;
  }

  /** @name PalletLogionLocCall (157) */
  interface PalletLogionLocCall extends Enum {
    readonly isCreatePolkadotIdentityLoc: boolean;
    readonly asCreatePolkadotIdentityLoc: {
      readonly locId: Compact<u128>;
      readonly legalOfficer: AccountId32;
      readonly legalFee: u128;
      readonly items: PalletLogionLocItemsParams;
    } & Struct;
    readonly isCreateLogionIdentityLoc: boolean;
    readonly asCreateLogionIdentityLoc: {
      readonly locId: Compact<u128>;
    } & Struct;
    readonly isCreatePolkadotTransactionLoc: boolean;
    readonly asCreatePolkadotTransactionLoc: {
      readonly locId: Compact<u128>;
      readonly legalOfficer: AccountId32;
      readonly legalFee: u128;
      readonly items: PalletLogionLocItemsParams;
    } & Struct;
    readonly isCreateLogionTransactionLoc: boolean;
    readonly asCreateLogionTransactionLoc: {
      readonly locId: Compact<u128>;
      readonly requesterLocId: u128;
    } & Struct;
    readonly isCreateCollectionLoc: boolean;
    readonly asCreateCollectionLoc: {
      readonly locId: Compact<u128>;
      readonly legalOfficer: AccountId32;
      readonly collectionLastBlockSubmission: Option<u32>;
      readonly collectionMaxSize: Option<u32>;
      readonly collectionCanUpload: bool;
      readonly valueFee: u128;
      readonly legalFee: u128;
      readonly collectionItemFee: u128;
      readonly tokensRecordFee: u128;
      readonly items: PalletLogionLocItemsParams;
    } & Struct;
    readonly isAddMetadata: boolean;
    readonly asAddMetadata: {
      readonly locId: Compact<u128>;
      readonly item: PalletLogionLocMetadataItemParams;
    } & Struct;
    readonly isAddFile: boolean;
    readonly asAddFile: {
      readonly locId: Compact<u128>;
      readonly file: PalletLogionLocFileParams;
    } & Struct;
    readonly isAddLink: boolean;
    readonly asAddLink: {
      readonly locId: Compact<u128>;
      readonly link: PalletLogionLocLocLinkParams;
    } & Struct;
    readonly isMakeVoid: boolean;
    readonly asMakeVoid: {
      readonly locId: Compact<u128>;
    } & Struct;
    readonly isMakeVoidAndReplace: boolean;
    readonly asMakeVoidAndReplace: {
      readonly locId: Compact<u128>;
      readonly replacerLocId: Compact<u128>;
    } & Struct;
    readonly isAddCollectionItem: boolean;
    readonly asAddCollectionItem: {
      readonly collectionLocId: Compact<u128>;
      readonly itemId: H256;
      readonly itemDescription: H256;
      readonly itemFiles: Vec<PalletLogionLocCollectionItemFile>;
      readonly itemToken: Option<PalletLogionLocCollectionItemToken>;
      readonly restrictedDelivery: bool;
      readonly termsAndConditions: Vec<PalletLogionLocTermsAndConditionsElement>;
    } & Struct;
    readonly isNominateIssuer: boolean;
    readonly asNominateIssuer: {
      readonly issuer: AccountId32;
      readonly identityLocId: Compact<u128>;
    } & Struct;
    readonly isDismissIssuer: boolean;
    readonly asDismissIssuer: {
      readonly issuer: AccountId32;
    } & Struct;
    readonly isSetIssuerSelection: boolean;
    readonly asSetIssuerSelection: {
      readonly locId: Compact<u128>;
      readonly issuer: AccountId32;
      readonly selected: bool;
    } & Struct;
    readonly isAddTokensRecord: boolean;
    readonly asAddTokensRecord: {
      readonly collectionLocId: Compact<u128>;
      readonly recordId: H256;
      readonly description: H256;
      readonly files: Vec<PalletLogionLocTokensRecordFile>;
    } & Struct;
    readonly isCreateOtherIdentityLoc: boolean;
    readonly asCreateOtherIdentityLoc: {
      readonly locId: Compact<u128>;
      readonly requesterAccountId: PalletLogionLocOtherAccountId;
      readonly sponsorshipId: Compact<u128>;
      readonly legalFee: u128;
    } & Struct;
    readonly isSponsor: boolean;
    readonly asSponsor: {
      readonly sponsorshipId: Compact<u128>;
      readonly sponsoredAccount: PalletLogionLocSupportedAccountId;
      readonly legalOfficer: AccountId32;
    } & Struct;
    readonly isWithdrawSponsorship: boolean;
    readonly asWithdrawSponsorship: {
      readonly sponsorshipId: Compact<u128>;
    } & Struct;
    readonly isAcknowledgeMetadata: boolean;
    readonly asAcknowledgeMetadata: {
      readonly locId: Compact<u128>;
      readonly name: H256;
    } & Struct;
    readonly isAcknowledgeFile: boolean;
    readonly asAcknowledgeFile: {
      readonly locId: Compact<u128>;
      readonly hash_: H256;
    } & Struct;
    readonly isAcknowledgeLink: boolean;
    readonly asAcknowledgeLink: {
      readonly locId: Compact<u128>;
      readonly target: Compact<u128>;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly locId: Compact<u128>;
      readonly seal: Option<H256>;
      readonly autoAck: bool;
    } & Struct;
    readonly isSetInvitedContributorSelection: boolean;
    readonly asSetInvitedContributorSelection: {
      readonly locId: Compact<u128>;
      readonly invitedContributor: AccountId32;
      readonly selected: bool;
    } & Struct;
    readonly isImportLoc: boolean;
    readonly asImportLoc: {
      readonly locId: Compact<u128>;
      readonly requester: PalletLogionLocRequester;
      readonly legalOfficer: AccountId32;
      readonly locType: PalletLogionLocLocType;
      readonly items: PalletLogionLocItems;
      readonly collectionLastBlockSubmission: Option<u32>;
      readonly collectionMaxSize: Option<u32>;
      readonly collectionCanUpload: bool;
      readonly valueFee: u128;
      readonly legalFee: u128;
      readonly collectionItemFee: u128;
      readonly tokensRecordFee: u128;
      readonly sponsorshipId: Option<u128>;
      readonly seal: Option<H256>;
      readonly voidInfo: Option<PalletLogionLocLocVoidInfo>;
      readonly replacerOf: Option<u128>;
      readonly closed: bool;
    } & Struct;
    readonly isImportCollectionItem: boolean;
    readonly asImportCollectionItem: {
      readonly collectionLocId: Compact<u128>;
      readonly itemId: H256;
      readonly itemDescription: H256;
      readonly itemFiles: Vec<PalletLogionLocCollectionItemFile>;
      readonly itemToken: Option<PalletLogionLocCollectionItemToken>;
      readonly restrictedDelivery: bool;
      readonly termsAndConditions: Vec<PalletLogionLocTermsAndConditionsElement>;
    } & Struct;
    readonly isImportTokensRecord: boolean;
    readonly asImportTokensRecord: {
      readonly collectionLocId: Compact<u128>;
      readonly recordId: H256;
      readonly description: H256;
      readonly files: Vec<PalletLogionLocTokensRecordFile>;
      readonly submitter: AccountId32;
    } & Struct;
    readonly isImportInvitedContributorSelection: boolean;
    readonly asImportInvitedContributorSelection: {
      readonly locId: Compact<u128>;
      readonly invitedContributor: AccountId32;
    } & Struct;
    readonly isImportVerifiedIssuer: boolean;
    readonly asImportVerifiedIssuer: {
      readonly legalOfficer: AccountId32;
      readonly issuer: AccountId32;
      readonly identityLocId: Compact<u128>;
    } & Struct;
    readonly isImportVerifiedIssuerSelection: boolean;
    readonly asImportVerifiedIssuerSelection: {
      readonly locId: Compact<u128>;
      readonly issuer: AccountId32;
      readonly locOwner: AccountId32;
    } & Struct;
    readonly isImportSponsorship: boolean;
    readonly asImportSponsorship: {
      readonly sponsorshipId: Compact<u128>;
      readonly sponsor: AccountId32;
      readonly sponsoredAccount: PalletLogionLocSupportedAccountId;
      readonly legalOfficer: AccountId32;
      readonly locId: Option<u128>;
    } & Struct;
    readonly type: 'CreatePolkadotIdentityLoc' | 'CreateLogionIdentityLoc' | 'CreatePolkadotTransactionLoc' | 'CreateLogionTransactionLoc' | 'CreateCollectionLoc' | 'AddMetadata' | 'AddFile' | 'AddLink' | 'MakeVoid' | 'MakeVoidAndReplace' | 'AddCollectionItem' | 'NominateIssuer' | 'DismissIssuer' | 'SetIssuerSelection' | 'AddTokensRecord' | 'CreateOtherIdentityLoc' | 'Sponsor' | 'WithdrawSponsorship' | 'AcknowledgeMetadata' | 'AcknowledgeFile' | 'AcknowledgeLink' | 'Close' | 'SetInvitedContributorSelection' | 'ImportLoc' | 'ImportCollectionItem' | 'ImportTokensRecord' | 'ImportInvitedContributorSelection' | 'ImportVerifiedIssuer' | 'ImportVerifiedIssuerSelection' | 'ImportSponsorship';
  }

  /** @name PalletLogionLocItemsParams (158) */
  interface PalletLogionLocItemsParams extends Struct {
    readonly metadata: Vec<PalletLogionLocMetadataItemParams>;
    readonly files: Vec<PalletLogionLocFileParams>;
    readonly links: Vec<PalletLogionLocLocLinkParams>;
  }

  /** @name PalletLogionLocMetadataItemParams (160) */
  interface PalletLogionLocMetadataItemParams extends Struct {
    readonly name: H256;
    readonly value: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
  }

  /** @name PalletLogionLocFileParams (162) */
  interface PalletLogionLocFileParams extends Struct {
    readonly hash_: H256;
    readonly nature: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
    readonly size_: u32;
  }

  /** @name PalletLogionLocLocLinkParams (164) */
  interface PalletLogionLocLocLinkParams extends Struct {
    readonly id: u128;
    readonly nature: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
  }

  /** @name PalletLogionLocCollectionItemFile (166) */
  interface PalletLogionLocCollectionItemFile extends Struct {
    readonly name: H256;
    readonly contentType: H256;
    readonly size_: u32;
    readonly hash_: H256;
  }

  /** @name PalletLogionLocCollectionItemToken (168) */
  interface PalletLogionLocCollectionItemToken extends Struct {
    readonly tokenType: H256;
    readonly tokenId: H256;
    readonly tokenIssuance: u64;
  }

  /** @name PalletLogionLocTermsAndConditionsElement (170) */
  interface PalletLogionLocTermsAndConditionsElement extends Struct {
    readonly tcType: H256;
    readonly tcLoc: u128;
    readonly details: H256;
  }

  /** @name PalletLogionLocTokensRecordFile (172) */
  interface PalletLogionLocTokensRecordFile extends Struct {
    readonly name: H256;
    readonly contentType: H256;
    readonly size_: u32;
    readonly hash_: H256;
  }

  /** @name PalletLogionLocRequester (174) */
  interface PalletLogionLocRequester extends Enum {
    readonly isNone: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isLoc: boolean;
    readonly asLoc: u128;
    readonly isOtherAccount: boolean;
    readonly asOtherAccount: PalletLogionLocOtherAccountId;
    readonly type: 'None' | 'Account' | 'Loc' | 'OtherAccount';
  }

  /** @name PalletLogionLocLocType (175) */
  interface PalletLogionLocLocType extends Enum {
    readonly isTransaction: boolean;
    readonly isIdentity: boolean;
    readonly isCollection: boolean;
    readonly type: 'Transaction' | 'Identity' | 'Collection';
  }

  /** @name PalletLogionLocItems (176) */
  interface PalletLogionLocItems extends Struct {
    readonly metadata: Vec<PalletLogionLocMetadataItem>;
    readonly files: Vec<PalletLogionLocFile>;
    readonly links: Vec<PalletLogionLocLocLink>;
  }

  /** @name PalletLogionLocMetadataItem (178) */
  interface PalletLogionLocMetadataItem extends Struct {
    readonly name: H256;
    readonly value: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
    readonly acknowledgedByOwner: bool;
    readonly acknowledgedByVerifiedIssuer: bool;
  }

  /** @name PalletLogionLocFile (180) */
  interface PalletLogionLocFile extends Struct {
    readonly hash_: H256;
    readonly nature: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
    readonly size_: u32;
    readonly acknowledgedByOwner: bool;
    readonly acknowledgedByVerifiedIssuer: bool;
  }

  /** @name PalletLogionLocLocLink (182) */
  interface PalletLogionLocLocLink extends Struct {
    readonly id: u128;
    readonly nature: H256;
    readonly submitter: PalletLogionLocSupportedAccountId;
    readonly acknowledgedByOwner: bool;
    readonly acknowledgedByVerifiedIssuer: bool;
  }

  /** @name PalletLogionLocLocVoidInfo (185) */
  interface PalletLogionLocLocVoidInfo extends Struct {
    readonly replacer: Option<u128>;
  }

  /** @name PalletVerifiedRecoveryCall (186) */
  interface PalletVerifiedRecoveryCall extends Enum {
    readonly isCreateRecovery: boolean;
    readonly asCreateRecovery: {
      readonly legalOfficers: Vec<AccountId32>;
    } & Struct;
    readonly type: 'CreateRecovery';
  }

  /** @name PalletLogionVaultCall (187) */
  interface PalletLogionVaultCall extends Enum {
    readonly isRequestCall: boolean;
    readonly asRequestCall: {
      readonly legalOfficers: Vec<AccountId32>;
      readonly callHash: U8aFixed;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isApproveCall: boolean;
    readonly asApproveCall: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
      readonly timepoint: PalletMultisigTimepoint;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'RequestCall' | 'ApproveCall';
  }

  /** @name PalletLogionVoteCall (188) */
  interface PalletLogionVoteCall extends Enum {
    readonly isCreateVoteForAllLegalOfficers: boolean;
    readonly asCreateVoteForAllLegalOfficers: {
      readonly locId: Compact<u128>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly voteId: Compact<u64>;
      readonly voteYes: bool;
    } & Struct;
    readonly type: 'CreateVoteForAllLegalOfficers' | 'Vote';
  }

  /** @name PalletTreasuryCall (189) */
  interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpendLocal: boolean;
    readonly asSpendLocal: {
      readonly amount: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly assetKind: Null;
      readonly amount: Compact<u128>;
      readonly beneficiary: AccountId32;
      readonly validFrom: Option<u32>;
    } & Struct;
    readonly isPayout: boolean;
    readonly asPayout: {
      readonly index: u32;
    } & Struct;
    readonly isCheckStatus: boolean;
    readonly asCheckStatus: {
      readonly index: u32;
    } & Struct;
    readonly isVoidSpend: boolean;
    readonly asVoidSpend: {
      readonly index: u32;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'SpendLocal' | 'RemoveApproval' | 'Spend' | 'Payout' | 'CheckStatus' | 'VoidSpend';
  }

  /** @name PalletUtilityCall (191) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: LogionNodeRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isWithWeight: boolean;
    readonly asWithWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch' | 'WithWeight';
  }

  /** @name LogionNodeRuntimeOriginCaller (193) */
  interface LogionNodeRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly type: 'System' | 'Void';
  }

  /** @name FrameSupportDispatchRawOrigin (194) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletSudoError (195) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletMultisigMultisig (197) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (199) */
  interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isMaxWeightTooLow: boolean;
    readonly isAlreadyStored: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'MaxWeightTooLow' | 'AlreadyStored';
  }

  /** @name PalletRecoveryRecoveryConfig (200) */
  interface PalletRecoveryRecoveryConfig extends Struct {
    readonly delayPeriod: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
    readonly threshold: u16;
  }

  /** @name PalletRecoveryActiveRecovery (203) */
  interface PalletRecoveryActiveRecovery extends Struct {
    readonly created: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
  }

  /** @name PalletRecoveryError (204) */
  interface PalletRecoveryError extends Enum {
    readonly isNotAllowed: boolean;
    readonly isZeroThreshold: boolean;
    readonly isNotEnoughFriends: boolean;
    readonly isMaxFriends: boolean;
    readonly isNotSorted: boolean;
    readonly isNotRecoverable: boolean;
    readonly isAlreadyRecoverable: boolean;
    readonly isAlreadyStarted: boolean;
    readonly isNotStarted: boolean;
    readonly isNotFriend: boolean;
    readonly isDelayPeriod: boolean;
    readonly isAlreadyVouched: boolean;
    readonly isThreshold: boolean;
    readonly isStillActive: boolean;
    readonly isAlreadyProxy: boolean;
    readonly isBadState: boolean;
    readonly type: 'NotAllowed' | 'ZeroThreshold' | 'NotEnoughFriends' | 'MaxFriends' | 'NotSorted' | 'NotRecoverable' | 'AlreadyRecoverable' | 'AlreadyStarted' | 'NotStarted' | 'NotFriend' | 'DelayPeriod' | 'AlreadyVouched' | 'Threshold' | 'StillActive' | 'AlreadyProxy' | 'BadState';
  }

  /** @name PalletLoAuthorityListLegalOfficerData (205) */
  interface PalletLoAuthorityListLegalOfficerData extends Enum {
    readonly isHost: boolean;
    readonly asHost: PalletLoAuthorityListHostData;
    readonly isGuest: boolean;
    readonly asGuest: PalletLoAuthorityListGuestData;
    readonly type: 'Host' | 'Guest';
  }

  /** @name LogionNodeRuntimeMaxPeerIdLength (206) */
  type LogionNodeRuntimeMaxPeerIdLength = Null;

  /** @name LogionNodeRuntimeMaxBaseUrlLen (207) */
  type LogionNodeRuntimeMaxBaseUrlLen = Null;

  /** @name PalletLoAuthorityListHostData (208) */
  interface PalletLoAuthorityListHostData extends Struct {
    readonly nodeId: Option<Bytes>;
    readonly baseUrl: Option<Bytes>;
    readonly region: LogionNodeRuntimeRegion;
    readonly imported: bool;
  }

  /** @name PalletLoAuthorityListGuestData (214) */
  interface PalletLoAuthorityListGuestData extends Struct {
    readonly hostId: AccountId32;
    readonly imported: bool;
  }

  /** @name PalletLoAuthorityListStorageVersion (218) */
  interface PalletLoAuthorityListStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2AddOnchainSettings: boolean;
    readonly isV3GuestLegalOfficers: boolean;
    readonly isV4Region: boolean;
    readonly isV5Imported: boolean;
    readonly type: 'V1' | 'V2AddOnchainSettings' | 'V3GuestLegalOfficers' | 'V4Region' | 'V5Imported';
  }

  /** @name PalletLoAuthorityListError (219) */
  interface PalletLoAuthorityListError extends Enum {
    readonly isAlreadyExists: boolean;
    readonly isNotFound: boolean;
    readonly isPeerIdAlreadyInUse: boolean;
    readonly isHostHasGuest: boolean;
    readonly isGuestOfGuest: boolean;
    readonly isHostNotFound: boolean;
    readonly isHostCannotConvert: boolean;
    readonly isGuestCannotUpdate: boolean;
    readonly isCannotChangeRegion: boolean;
    readonly isTooManyNodes: boolean;
    readonly isBaseUrlTooLong: boolean;
    readonly isPeerIdTooLong: boolean;
    readonly type: 'AlreadyExists' | 'NotFound' | 'PeerIdAlreadyInUse' | 'HostHasGuest' | 'GuestOfGuest' | 'HostNotFound' | 'HostCannotConvert' | 'GuestCannotUpdate' | 'CannotChangeRegion' | 'TooManyNodes' | 'BaseUrlTooLong' | 'PeerIdTooLong';
  }

  /** @name PalletLogionLocLegalOfficerCase (220) */
  interface PalletLogionLocLegalOfficerCase extends Struct {
    readonly owner: AccountId32;
    readonly requester: PalletLogionLocRequester;
    readonly metadata: Vec<PalletLogionLocMetadataItem>;
    readonly files: Vec<PalletLogionLocFile>;
    readonly closed: bool;
    readonly locType: PalletLogionLocLocType;
    readonly links: Vec<PalletLogionLocLocLink>;
    readonly voidInfo: Option<PalletLogionLocLocVoidInfo>;
    readonly replacerOf: Option<u128>;
    readonly collectionLastBlockSubmission: Option<u32>;
    readonly collectionMaxSize: Option<u32>;
    readonly collectionCanUpload: bool;
    readonly seal: Option<H256>;
    readonly sponsorshipId: Option<u128>;
    readonly valueFee: u128;
    readonly legalFee: u128;
    readonly collectionItemFee: u128;
    readonly tokensRecordFee: u128;
    readonly imported: bool;
  }

  /** @name LogionNodeRuntimeMaxLocMetadata (221) */
  type LogionNodeRuntimeMaxLocMetadata = Null;

  /** @name LogionNodeRuntimeMaxLocFiles (222) */
  type LogionNodeRuntimeMaxLocFiles = Null;

  /** @name LogionNodeRuntimeMaxLocLinks (223) */
  type LogionNodeRuntimeMaxLocLinks = Null;

  /** @name PalletLogionLocCollectionItem (230) */
  interface PalletLogionLocCollectionItem extends Struct {
    readonly description: H256;
    readonly files: Vec<PalletLogionLocCollectionItemFile>;
    readonly token: Option<PalletLogionLocCollectionItemToken>;
    readonly restrictedDelivery: bool;
    readonly termsAndConditions: Vec<PalletLogionLocTermsAndConditionsElement>;
    readonly imported: bool;
  }

  /** @name PalletLogionLocTokensRecord (233) */
  interface PalletLogionLocTokensRecord extends Struct {
    readonly description: H256;
    readonly files: Vec<PalletLogionLocTokensRecordFile>;
    readonly submitter: AccountId32;
    readonly imported: bool;
  }

  /** @name PalletLogionLocVerifiedIssuer (235) */
  interface PalletLogionLocVerifiedIssuer extends Struct {
    readonly identityLoc: u128;
    readonly imported: bool;
  }

  /** @name PalletLogionLocSponsorship (238) */
  interface PalletLogionLocSponsorship extends Struct {
    readonly sponsor: AccountId32;
    readonly sponsoredAccount: PalletLogionLocSupportedAccountId;
    readonly legalOfficer: AccountId32;
    readonly locId: Option<u128>;
    readonly imported: bool;
  }

  /** @name PalletLogionLocStorageVersion (239) */
  interface PalletLogionLocStorageVersion extends Enum {
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
    readonly isV16MoveTokenIssuance: boolean;
    readonly isV17HashItemRecordPublicData: boolean;
    readonly isV18AddValueFee: boolean;
    readonly isV19AcknowledgeItemsByIssuer: boolean;
    readonly isV20AddCustomLegalFee: boolean;
    readonly isV21EnableRequesterLinks: boolean;
    readonly isV22AddRecurrentFees: boolean;
    readonly isV23RemoveUselessMapsAddImported: boolean;
    readonly type: 'V1' | 'V2MakeLocVoid' | 'V3RequesterEnum' | 'V4ItemSubmitter' | 'V5Collection' | 'V6ItemUpload' | 'V7ItemToken' | 'V8AddSeal' | 'V9TermsAndConditions' | 'V10AddLocFileSize' | 'V11EnableEthereumSubmitter' | 'V12Sponsorship' | 'V13AcknowledgeItems' | 'V14HashLocPublicData' | 'V15AddTokenIssuance' | 'V16MoveTokenIssuance' | 'V17HashItemRecordPublicData' | 'V18AddValueFee' | 'V19AcknowledgeItemsByIssuer' | 'V20AddCustomLegalFee' | 'V21EnableRequesterLinks' | 'V22AddRecurrentFees' | 'V23RemoveUselessMapsAddImported';
  }

  /** @name PalletLogionLocError (240) */
  interface PalletLogionLocError extends Enum {
    readonly isAlreadyExists: boolean;
    readonly isNotFound: boolean;
    readonly isUnauthorized: boolean;
    readonly isCannotMutate: boolean;
    readonly isAlreadyClosed: boolean;
    readonly isLinkedLocNotFound: boolean;
    readonly isReplacerLocNotFound: boolean;
    readonly isAlreadyVoid: boolean;
    readonly isReplacerLocAlreadyVoid: boolean;
    readonly isReplacerLocAlreadyReplacing: boolean;
    readonly isCannotMutateVoid: boolean;
    readonly isUnexpectedRequester: boolean;
    readonly isReplacerLocWrongType: boolean;
    readonly isInvalidSubmitter: boolean;
    readonly isCollectionHasNoLimit: boolean;
    readonly isWrongCollectionLoc: boolean;
    readonly isCollectionItemAlreadyExists: boolean;
    readonly isCollectionItemTooMuchData: boolean;
    readonly isCollectionLimitsReached: boolean;
    readonly isMetadataItemInvalid: boolean;
    readonly isFileInvalid: boolean;
    readonly isLocLinkInvalid: boolean;
    readonly isCannotUpload: boolean;
    readonly isMustUpload: boolean;
    readonly isDuplicateFile: boolean;
    readonly isMissingToken: boolean;
    readonly isMissingFiles: boolean;
    readonly isTermsAndConditionsLocNotFound: boolean;
    readonly isTermsAndConditionsLocNotClosed: boolean;
    readonly isTermsAndConditionsLocVoid: boolean;
    readonly isDuplicateLocFile: boolean;
    readonly isDuplicateLocMetadata: boolean;
    readonly isDuplicateLocLink: boolean;
    readonly isTokensRecordTooMuchData: boolean;
    readonly isTokensRecordAlreadyExists: boolean;
    readonly isCannotAddRecord: boolean;
    readonly isInvalidIdentityLoc: boolean;
    readonly isAlreadyNominated: boolean;
    readonly isNotNominated: boolean;
    readonly isCannotSubmit: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isAlreadyUsed: boolean;
    readonly isCannotLinkToSponsorship: boolean;
    readonly isItemNotFound: boolean;
    readonly isItemAlreadyAcknowledged: boolean;
    readonly isCannotCloseUnacknowledgedByOwner: boolean;
    readonly isBadTokenIssuance: boolean;
    readonly isCannotCloseUnacknowledgedByVerifiedIssuer: boolean;
    readonly isAccountNotIdentified: boolean;
    readonly isLocMetadataTooMuchData: boolean;
    readonly isLocFilesTooMuchData: boolean;
    readonly isLocLinksTooMuchData: boolean;
    readonly isCollectionItemFilesTooMuchData: boolean;
    readonly isCollectionItemTCsTooMuchData: boolean;
    readonly isAccountLocsTooMuchData: boolean;
    readonly type: 'AlreadyExists' | 'NotFound' | 'Unauthorized' | 'CannotMutate' | 'AlreadyClosed' | 'LinkedLocNotFound' | 'ReplacerLocNotFound' | 'AlreadyVoid' | 'ReplacerLocAlreadyVoid' | 'ReplacerLocAlreadyReplacing' | 'CannotMutateVoid' | 'UnexpectedRequester' | 'ReplacerLocWrongType' | 'InvalidSubmitter' | 'CollectionHasNoLimit' | 'WrongCollectionLoc' | 'CollectionItemAlreadyExists' | 'CollectionItemTooMuchData' | 'CollectionLimitsReached' | 'MetadataItemInvalid' | 'FileInvalid' | 'LocLinkInvalid' | 'CannotUpload' | 'MustUpload' | 'DuplicateFile' | 'MissingToken' | 'MissingFiles' | 'TermsAndConditionsLocNotFound' | 'TermsAndConditionsLocNotClosed' | 'TermsAndConditionsLocVoid' | 'DuplicateLocFile' | 'DuplicateLocMetadata' | 'DuplicateLocLink' | 'TokensRecordTooMuchData' | 'TokensRecordAlreadyExists' | 'CannotAddRecord' | 'InvalidIdentityLoc' | 'AlreadyNominated' | 'NotNominated' | 'CannotSubmit' | 'InsufficientFunds' | 'AlreadyUsed' | 'CannotLinkToSponsorship' | 'ItemNotFound' | 'ItemAlreadyAcknowledged' | 'CannotCloseUnacknowledgedByOwner' | 'BadTokenIssuance' | 'CannotCloseUnacknowledgedByVerifiedIssuer' | 'AccountNotIdentified' | 'LocMetadataTooMuchData' | 'LocFilesTooMuchData' | 'LocLinksTooMuchData' | 'CollectionItemFilesTooMuchData' | 'CollectionItemTCsTooMuchData' | 'AccountLocsTooMuchData';
  }

  /** @name PalletVerifiedRecoveryError (241) */
  interface PalletVerifiedRecoveryError extends Enum {
    readonly isInvalidLegalOfficers: boolean;
    readonly isMissingIdentityLoc: boolean;
    readonly type: 'InvalidLegalOfficers' | 'MissingIdentityLoc';
  }

  /** @name PalletLogionVaultError (242) */
  interface PalletLogionVaultError extends Enum {
    readonly isInvalidSignatories: boolean;
    readonly isWrongInitiator: boolean;
    readonly type: 'InvalidSignatories' | 'WrongInitiator';
  }

  /** @name PalletLogionVoteVote (243) */
  interface PalletLogionVoteVote extends Struct {
    readonly locId: u128;
    readonly ballots: Vec<PalletLogionVoteBallot>;
  }

  /** @name LogionNodeRuntimeMaxBallots (244) */
  type LogionNodeRuntimeMaxBallots = Null;

  /** @name PalletLogionVoteError (247) */
  interface PalletLogionVoteError extends Enum {
    readonly isInvalidLoc: boolean;
    readonly isVoteNotFound: boolean;
    readonly isNotAllowed: boolean;
    readonly isAlreadyVoted: boolean;
    readonly isTooMuchBallots: boolean;
    readonly type: 'InvalidLoc' | 'VoteNotFound' | 'NotAllowed' | 'AlreadyVoted' | 'TooMuchBallots';
  }

  /** @name PalletTreasuryProposal (248) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name PalletTreasurySpendStatus (250) */
  interface PalletTreasurySpendStatus extends Struct {
    readonly assetKind: Null;
    readonly amount: u128;
    readonly beneficiary: AccountId32;
    readonly validFrom: u32;
    readonly expireAt: u32;
    readonly status: PalletTreasuryPaymentState;
  }

  /** @name PalletTreasuryPaymentState (251) */
  interface PalletTreasuryPaymentState extends Enum {
    readonly isPending: boolean;
    readonly isAttempted: boolean;
    readonly asAttempted: {
      readonly id: Null;
    } & Struct;
    readonly isFailed: boolean;
    readonly type: 'Pending' | 'Attempted' | 'Failed';
  }

  /** @name FrameSupportPalletId (253) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (254) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly isFailedToConvertBalance: boolean;
    readonly isSpendExpired: boolean;
    readonly isEarlyPayout: boolean;
    readonly isAlreadyAttempted: boolean;
    readonly isPayoutError: boolean;
    readonly isNotAttempted: boolean;
    readonly isInconclusive: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved' | 'FailedToConvertBalance' | 'SpendExpired' | 'EarlyPayout' | 'AlreadyAttempted' | 'PayoutError' | 'NotAttempted' | 'Inconclusive';
  }

  /** @name PalletUtilityError (256) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name SpRuntimeMultiSignature (258) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (259) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (260) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (263) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (264) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (265) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (266) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (269) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (270) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (271) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name LogionNodeRuntimeRuntime (272) */
  type LogionNodeRuntimeRuntime = Null;

} // declare module
