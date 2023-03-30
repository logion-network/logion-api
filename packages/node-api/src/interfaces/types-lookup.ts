// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { OpaquePeerId } from '@polkadot/types/interfaces/imOnline';
import type { AccountId32, Call, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
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
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (7) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (8) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (13) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (15) */
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

  /** @name FrameSystemEventRecord (18) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (20) */
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
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportDispatchDispatchInfo (21) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (22) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (23) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (24) */
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
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable';
  }

  /** @name SpRuntimeModuleError (25) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (26) */
  interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpArithmeticArithmeticError (27) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (28) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletBalancesEvent (29) */
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
      readonly reserved: u128;
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
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (30) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name SubstrateValidatorSetEvent (31) */
  interface SubstrateValidatorSetEvent extends Enum {
    readonly isValidatorAdditionInitiated: boolean;
    readonly asValidatorAdditionInitiated: AccountId32;
    readonly isValidatorRemovalInitiated: boolean;
    readonly asValidatorRemovalInitiated: AccountId32;
    readonly type: 'ValidatorAdditionInitiated' | 'ValidatorRemovalInitiated';
  }

  /** @name PalletSessionEvent (32) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (33) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (36) */
  interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (37) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletTransactionPaymentEvent (38) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletSudoEvent (39) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletNodeAuthorizationEvent (43) */
  interface PalletNodeAuthorizationEvent extends Enum {
    readonly isNodeAdded: boolean;
    readonly asNodeAdded: {
      readonly peerId: OpaquePeerId;
      readonly who: AccountId32;
    } & Struct;
    readonly isNodeRemoved: boolean;
    readonly asNodeRemoved: {
      readonly peerId: OpaquePeerId;
    } & Struct;
    readonly isNodeSwapped: boolean;
    readonly asNodeSwapped: {
      readonly removed: OpaquePeerId;
      readonly added: OpaquePeerId;
    } & Struct;
    readonly isNodesReset: boolean;
    readonly asNodesReset: {
      readonly nodes: Vec<ITuple<[OpaquePeerId, AccountId32]>>;
    } & Struct;
    readonly isNodeClaimed: boolean;
    readonly asNodeClaimed: {
      readonly peerId: OpaquePeerId;
      readonly who: AccountId32;
    } & Struct;
    readonly isClaimRemoved: boolean;
    readonly asClaimRemoved: {
      readonly peerId: OpaquePeerId;
      readonly who: AccountId32;
    } & Struct;
    readonly isNodeTransferred: boolean;
    readonly asNodeTransferred: {
      readonly peerId: OpaquePeerId;
      readonly target: AccountId32;
    } & Struct;
    readonly isConnectionsAdded: boolean;
    readonly asConnectionsAdded: {
      readonly peerId: OpaquePeerId;
      readonly allowedConnections: Vec<OpaquePeerId>;
    } & Struct;
    readonly isConnectionsRemoved: boolean;
    readonly asConnectionsRemoved: {
      readonly peerId: OpaquePeerId;
      readonly allowedConnections: Vec<OpaquePeerId>;
    } & Struct;
    readonly type: 'NodeAdded' | 'NodeRemoved' | 'NodeSwapped' | 'NodesReset' | 'NodeClaimed' | 'ClaimRemoved' | 'NodeTransferred' | 'ConnectionsAdded' | 'ConnectionsRemoved';
  }

  /** @name PalletMultisigEvent (48) */
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

  /** @name PalletMultisigTimepoint (49) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletRecoveryEvent (50) */
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

  /** @name PalletAssetsEvent (51) */
  interface PalletAssetsEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly assetId: u64;
      readonly creator: AccountId32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly assetId: u64;
      readonly owner: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly assetId: u64;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly assetId: u64;
      readonly owner: AccountId32;
      readonly balance: u128;
    } & Struct;
    readonly isTeamChanged: boolean;
    readonly asTeamChanged: {
      readonly assetId: u64;
      readonly issuer: AccountId32;
      readonly admin: AccountId32;
      readonly freezer: AccountId32;
    } & Struct;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: {
      readonly assetId: u64;
      readonly owner: AccountId32;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly assetId: u64;
      readonly who: AccountId32;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly assetId: u64;
      readonly who: AccountId32;
    } & Struct;
    readonly isAssetFrozen: boolean;
    readonly asAssetFrozen: {
      readonly assetId: u64;
    } & Struct;
    readonly isAssetThawed: boolean;
    readonly asAssetThawed: {
      readonly assetId: u64;
    } & Struct;
    readonly isAccountsDestroyed: boolean;
    readonly asAccountsDestroyed: {
      readonly assetId: u64;
      readonly accountsDestroyed: u32;
      readonly accountsRemaining: u32;
    } & Struct;
    readonly isApprovalsDestroyed: boolean;
    readonly asApprovalsDestroyed: {
      readonly assetId: u64;
      readonly approvalsDestroyed: u32;
      readonly approvalsRemaining: u32;
    } & Struct;
    readonly isDestructionStarted: boolean;
    readonly asDestructionStarted: {
      readonly assetId: u64;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly assetId: u64;
    } & Struct;
    readonly isForceCreated: boolean;
    readonly asForceCreated: {
      readonly assetId: u64;
      readonly owner: AccountId32;
    } & Struct;
    readonly isMetadataSet: boolean;
    readonly asMetadataSet: {
      readonly assetId: u64;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
      readonly isFrozen: bool;
    } & Struct;
    readonly isMetadataCleared: boolean;
    readonly asMetadataCleared: {
      readonly assetId: u64;
    } & Struct;
    readonly isApprovedTransfer: boolean;
    readonly asApprovedTransfer: {
      readonly assetId: u64;
      readonly source: AccountId32;
      readonly delegate: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isApprovalCancelled: boolean;
    readonly asApprovalCancelled: {
      readonly assetId: u64;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isTransferredApproved: boolean;
    readonly asTransferredApproved: {
      readonly assetId: u64;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
      readonly destination: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isAssetStatusChanged: boolean;
    readonly asAssetStatusChanged: {
      readonly assetId: u64;
    } & Struct;
    readonly type: 'Created' | 'Issued' | 'Transferred' | 'Burned' | 'TeamChanged' | 'OwnerChanged' | 'Frozen' | 'Thawed' | 'AssetFrozen' | 'AssetThawed' | 'AccountsDestroyed' | 'ApprovalsDestroyed' | 'DestructionStarted' | 'Destroyed' | 'ForceCreated' | 'MetadataSet' | 'MetadataCleared' | 'ApprovedTransfer' | 'ApprovalCancelled' | 'TransferredApproved' | 'AssetStatusChanged';
  }

  /** @name PalletLoAuthorityListEvent (53) */
  interface PalletLoAuthorityListEvent extends Enum {
    readonly isLoAdded: boolean;
    readonly asLoAdded: AccountId32;
    readonly isLoRemoved: boolean;
    readonly asLoRemoved: AccountId32;
    readonly isLoUpdated: boolean;
    readonly asLoUpdated: AccountId32;
    readonly type: 'LoAdded' | 'LoRemoved' | 'LoUpdated';
  }

  /** @name PalletLogionLocEvent (54) */
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
    readonly type: 'LocCreated' | 'LocClosed' | 'LocVoid' | 'ItemAdded' | 'StorageFeeWithdrawn';
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
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved' | 'UpdatedInactive';
  }

  /** @name FrameSystemPhase (62) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (66) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (69) */
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
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (73) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (74) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (75) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (77) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (78) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (79) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (80) */
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

  /** @name FrameSystemError (86) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletTimestampCall (87) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesBalanceLock (89) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (90) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (93) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesCall (95) */
  interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
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
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (100) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name SubstrateValidatorSetCall (101) */
  interface SubstrateValidatorSetCall extends Enum {
    readonly isAddValidator: boolean;
    readonly asAddValidator: {
      readonly validatorId: AccountId32;
    } & Struct;
    readonly isRemoveValidator: boolean;
    readonly asRemoveValidator: {
      readonly validatorId: AccountId32;
    } & Struct;
    readonly isAddValidatorAgain: boolean;
    readonly asAddValidatorAgain: {
      readonly validatorId: AccountId32;
    } & Struct;
    readonly type: 'AddValidator' | 'RemoveValidator' | 'AddValidatorAgain';
  }

  /** @name SubstrateValidatorSetError (102) */
  interface SubstrateValidatorSetError extends Enum {
    readonly isTooLowValidatorCount: boolean;
    readonly isDuplicate: boolean;
    readonly isValidatorNotApproved: boolean;
    readonly isBadOrigin: boolean;
    readonly type: 'TooLowValidatorCount' | 'Duplicate' | 'ValidatorNotApproved' | 'BadOrigin';
  }

  /** @name LogionNodeRuntimeOpaqueSessionKeys (105) */
  interface LogionNodeRuntimeOpaqueSessionKeys extends Struct {
    readonly aura: SpConsensusAuraSr25519AppSr25519Public;
    readonly grandpa: SpFinalityGrandpaAppPublic;
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (106) */
  interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (107) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name SpCoreCryptoKeyTypeId (110) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionCall (111) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: LogionNodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name PalletSessionError (112) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (116) */
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

  /** @name PalletGrandpaStoredPendingChange (117) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (120) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (121) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (122) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (123) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (124) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (125) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (126) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (129) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (130) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (132) */
  type SpCoreVoid = Null;

  /** @name PalletGrandpaError (133) */
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

  /** @name PalletTransactionPaymentReleases (135) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletSudoCall (136) */
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
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletNodeAuthorizationCall (138) */
  interface PalletNodeAuthorizationCall extends Enum {
    readonly isAddWellKnownNode: boolean;
    readonly asAddWellKnownNode: {
      readonly node: OpaquePeerId;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isRemoveWellKnownNode: boolean;
    readonly asRemoveWellKnownNode: {
      readonly node: OpaquePeerId;
    } & Struct;
    readonly isSwapWellKnownNode: boolean;
    readonly asSwapWellKnownNode: {
      readonly remove: OpaquePeerId;
      readonly add: OpaquePeerId;
    } & Struct;
    readonly isResetWellKnownNodes: boolean;
    readonly asResetWellKnownNodes: {
      readonly nodes: Vec<ITuple<[OpaquePeerId, AccountId32]>>;
    } & Struct;
    readonly isClaimNode: boolean;
    readonly asClaimNode: {
      readonly node: OpaquePeerId;
    } & Struct;
    readonly isRemoveClaim: boolean;
    readonly asRemoveClaim: {
      readonly node: OpaquePeerId;
    } & Struct;
    readonly isTransferNode: boolean;
    readonly asTransferNode: {
      readonly node: OpaquePeerId;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isAddConnections: boolean;
    readonly asAddConnections: {
      readonly node: OpaquePeerId;
      readonly connections: Vec<OpaquePeerId>;
    } & Struct;
    readonly isRemoveConnections: boolean;
    readonly asRemoveConnections: {
      readonly node: OpaquePeerId;
      readonly connections: Vec<OpaquePeerId>;
    } & Struct;
    readonly type: 'AddWellKnownNode' | 'RemoveWellKnownNode' | 'SwapWellKnownNode' | 'ResetWellKnownNodes' | 'ClaimNode' | 'RemoveClaim' | 'TransferNode' | 'AddConnections' | 'RemoveConnections';
  }

  /** @name PalletMultisigCall (139) */
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

  /** @name PalletRecoveryCall (141) */
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

  /** @name PalletAssetsCall (142) */
  interface PalletAssetsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly id: u64;
      readonly admin: MultiAddress;
      readonly minBalance: u128;
    } & Struct;
    readonly isForceCreate: boolean;
    readonly asForceCreate: {
      readonly id: u64;
      readonly owner: MultiAddress;
      readonly isSufficient: bool;
      readonly minBalance: Compact<u128>;
    } & Struct;
    readonly isStartDestroy: boolean;
    readonly asStartDestroy: {
      readonly id: u64;
    } & Struct;
    readonly isDestroyAccounts: boolean;
    readonly asDestroyAccounts: {
      readonly id: u64;
    } & Struct;
    readonly isDestroyApprovals: boolean;
    readonly asDestroyApprovals: {
      readonly id: u64;
    } & Struct;
    readonly isFinishDestroy: boolean;
    readonly asFinishDestroy: {
      readonly id: u64;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly id: u64;
      readonly beneficiary: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly id: u64;
      readonly who: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly id: u64;
      readonly target: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly id: u64;
      readonly target: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly id: u64;
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isFreeze: boolean;
    readonly asFreeze: {
      readonly id: u64;
      readonly who: MultiAddress;
    } & Struct;
    readonly isThaw: boolean;
    readonly asThaw: {
      readonly id: u64;
      readonly who: MultiAddress;
    } & Struct;
    readonly isFreezeAsset: boolean;
    readonly asFreezeAsset: {
      readonly id: u64;
    } & Struct;
    readonly isThawAsset: boolean;
    readonly asThawAsset: {
      readonly id: u64;
    } & Struct;
    readonly isTransferOwnership: boolean;
    readonly asTransferOwnership: {
      readonly id: u64;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isSetTeam: boolean;
    readonly asSetTeam: {
      readonly id: u64;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly id: u64;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
    } & Struct;
    readonly isClearMetadata: boolean;
    readonly asClearMetadata: {
      readonly id: u64;
    } & Struct;
    readonly isForceSetMetadata: boolean;
    readonly asForceSetMetadata: {
      readonly id: u64;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
      readonly isFrozen: bool;
    } & Struct;
    readonly isForceClearMetadata: boolean;
    readonly asForceClearMetadata: {
      readonly id: u64;
    } & Struct;
    readonly isForceAssetStatus: boolean;
    readonly asForceAssetStatus: {
      readonly id: u64;
      readonly owner: MultiAddress;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
      readonly minBalance: Compact<u128>;
      readonly isSufficient: bool;
      readonly isFrozen: bool;
    } & Struct;
    readonly isApproveTransfer: boolean;
    readonly asApproveTransfer: {
      readonly id: u64;
      readonly delegate: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isCancelApproval: boolean;
    readonly asCancelApproval: {
      readonly id: u64;
      readonly delegate: MultiAddress;
    } & Struct;
    readonly isForceCancelApproval: boolean;
    readonly asForceCancelApproval: {
      readonly id: u64;
      readonly owner: MultiAddress;
      readonly delegate: MultiAddress;
    } & Struct;
    readonly isTransferApproved: boolean;
    readonly asTransferApproved: {
      readonly id: u64;
      readonly owner: MultiAddress;
      readonly destination: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTouch: boolean;
    readonly asTouch: {
      readonly id: u64;
    } & Struct;
    readonly isRefund: boolean;
    readonly asRefund: {
      readonly id: u64;
      readonly allowBurn: bool;
    } & Struct;
    readonly type: 'Create' | 'ForceCreate' | 'StartDestroy' | 'DestroyAccounts' | 'DestroyApprovals' | 'FinishDestroy' | 'Mint' | 'Burn' | 'Transfer' | 'TransferKeepAlive' | 'ForceTransfer' | 'Freeze' | 'Thaw' | 'FreezeAsset' | 'ThawAsset' | 'TransferOwnership' | 'SetTeam' | 'SetMetadata' | 'ClearMetadata' | 'ForceSetMetadata' | 'ForceClearMetadata' | 'ForceAssetStatus' | 'ApproveTransfer' | 'CancelApproval' | 'ForceCancelApproval' | 'TransferApproved' | 'Touch' | 'Refund';
  }

  /** @name PalletLoAuthorityListCall (143) */
  interface PalletLoAuthorityListCall extends Enum {
    readonly isAddLegalOfficer: boolean;
    readonly asAddLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly data: PalletLoAuthorityListLegalOfficerData;
    } & Struct;
    readonly isRemoveLegalOfficer: boolean;
    readonly asRemoveLegalOfficer: {
      readonly legalOfficerId: AccountId32;
    } & Struct;
    readonly isUpdateLegalOfficer: boolean;
    readonly asUpdateLegalOfficer: {
      readonly legalOfficerId: AccountId32;
      readonly data: PalletLoAuthorityListLegalOfficerData;
    } & Struct;
    readonly type: 'AddLegalOfficer' | 'RemoveLegalOfficer' | 'UpdateLegalOfficer';
  }

  /** @name PalletLoAuthorityListLegalOfficerData (144) */
  interface PalletLoAuthorityListLegalOfficerData extends Enum {
    readonly isHost: boolean;
    readonly asHost: PalletLoAuthorityListHostData;
    readonly isGuest: boolean;
    readonly asGuest: AccountId32;
    readonly type: 'Host' | 'Guest';
  }

  /** @name PalletLoAuthorityListHostData (145) */
  interface PalletLoAuthorityListHostData extends Struct {
    readonly nodeId: Option<OpaquePeerId>;
    readonly baseUrl: Option<Bytes>;
  }

  /** @name PalletLogionLocCall (148) */
  interface PalletLogionLocCall extends Enum {
    readonly isCreatePolkadotIdentityLoc: boolean;
    readonly asCreatePolkadotIdentityLoc: {
      readonly locId: Compact<u128>;
      readonly requesterAccountId: AccountId32;
    } & Struct;
    readonly isCreateLogionIdentityLoc: boolean;
    readonly asCreateLogionIdentityLoc: {
      readonly locId: Compact<u128>;
    } & Struct;
    readonly isCreatePolkadotTransactionLoc: boolean;
    readonly asCreatePolkadotTransactionLoc: {
      readonly locId: Compact<u128>;
      readonly requesterAccountId: AccountId32;
    } & Struct;
    readonly isCreateLogionTransactionLoc: boolean;
    readonly asCreateLogionTransactionLoc: {
      readonly locId: Compact<u128>;
      readonly requesterLocId: u128;
    } & Struct;
    readonly isCreateCollectionLoc: boolean;
    readonly asCreateCollectionLoc: {
      readonly locId: Compact<u128>;
      readonly requesterAccountId: AccountId32;
      readonly collectionLastBlockSubmission: Option<u32>;
      readonly collectionMaxSize: Option<u32>;
      readonly collectionCanUpload: bool;
    } & Struct;
    readonly isAddMetadata: boolean;
    readonly asAddMetadata: {
      readonly locId: Compact<u128>;
      readonly item: PalletLogionLocMetadataItem;
    } & Struct;
    readonly isAddFile: boolean;
    readonly asAddFile: {
      readonly locId: Compact<u128>;
      readonly file: PalletLogionLocFile;
    } & Struct;
    readonly isAddLink: boolean;
    readonly asAddLink: {
      readonly locId: Compact<u128>;
      readonly link: PalletLogionLocLocLink;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly locId: Compact<u128>;
    } & Struct;
    readonly isCloseAndSeal: boolean;
    readonly asCloseAndSeal: {
      readonly locId: Compact<u128>;
      readonly seal: H256;
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
      readonly itemDescription: Bytes;
      readonly itemFiles: Vec<PalletLogionLocCollectionItemFile>;
      readonly itemToken: Option<PalletLogionLocCollectionItemToken>;
      readonly restrictedDelivery: bool;
    } & Struct;
    readonly isAddCollectionItemWithTermsAndConditions: boolean;
    readonly asAddCollectionItemWithTermsAndConditions: {
      readonly collectionLocId: Compact<u128>;
      readonly itemId: H256;
      readonly itemDescription: Bytes;
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
      readonly description: Bytes;
      readonly files: Vec<{
      readonly name: Bytes;
      readonly contentType: Bytes;
      readonly size_: u32;
      readonly hash_: H256;
    } & Struct>;
    } & Struct;
    readonly type: 'CreatePolkadotIdentityLoc' | 'CreateLogionIdentityLoc' | 'CreatePolkadotTransactionLoc' | 'CreateLogionTransactionLoc' | 'CreateCollectionLoc' | 'AddMetadata' | 'AddFile' | 'AddLink' | 'Close' | 'CloseAndSeal' | 'MakeVoid' | 'MakeVoidAndReplace' | 'AddCollectionItem' | 'AddCollectionItemWithTermsAndConditions' | 'NominateIssuer' | 'DismissIssuer' | 'SetIssuerSelection' | 'AddTokensRecord';
  }

  /** @name PalletLogionLocMetadataItem (149) */
  interface PalletLogionLocMetadataItem extends Struct {
    readonly name: Bytes;
    readonly value: Bytes;
    readonly submitter: AccountId32;
  }

  /** @name PalletLogionLocFile (150) */
  interface PalletLogionLocFile extends Struct {
    readonly hash_: H256;
    readonly nature: Bytes;
    readonly submitter: AccountId32;
    readonly size_: u32;
  }

  /** @name PalletLogionLocLocLink (151) */
  interface PalletLogionLocLocLink extends Struct {
    readonly id: u128;
    readonly nature: Bytes;
  }

  /** @name PalletLogionLocCollectionItemFile (153) */
  interface PalletLogionLocCollectionItemFile extends Struct {
    readonly name: Bytes;
    readonly contentType: Bytes;
    readonly size_: u32;
    readonly hash_: H256;
  }

  /** @name PalletLogionLocCollectionItemToken (155) */
  interface PalletLogionLocCollectionItemToken extends Struct {
    readonly tokenType: Bytes;
    readonly tokenId: Bytes;
  }

  /** @name PalletLogionLocTermsAndConditionsElement (157) */
  interface PalletLogionLocTermsAndConditionsElement extends Struct {
    readonly tcType: Bytes;
    readonly tcLoc: u128;
    readonly details: Bytes;
  }

  /** @name PalletVerifiedRecoveryCall (160) */
  interface PalletVerifiedRecoveryCall extends Enum {
    readonly isCreateRecovery: boolean;
    readonly asCreateRecovery: {
      readonly legalOfficers: Vec<AccountId32>;
    } & Struct;
    readonly type: 'CreateRecovery';
  }

  /** @name PalletLogionVaultCall (161) */
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

  /** @name PalletLogionVoteCall (162) */
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

  /** @name PalletTreasuryCall (163) */
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
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly amount: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'Spend' | 'RemoveApproval';
  }

  /** @name PalletSudoError (164) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletNodeAuthorizationError (166) */
  interface PalletNodeAuthorizationError extends Enum {
    readonly isPeerIdTooLong: boolean;
    readonly isTooManyNodes: boolean;
    readonly isAlreadyJoined: boolean;
    readonly isNotExist: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isNotClaimed: boolean;
    readonly isNotOwner: boolean;
    readonly isPermissionDenied: boolean;
    readonly type: 'PeerIdTooLong' | 'TooManyNodes' | 'AlreadyJoined' | 'NotExist' | 'AlreadyClaimed' | 'NotClaimed' | 'NotOwner' | 'PermissionDenied';
  }

  /** @name PalletMultisigMultisig (168) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (170) */
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

  /** @name PalletRecoveryRecoveryConfig (171) */
  interface PalletRecoveryRecoveryConfig extends Struct {
    readonly delayPeriod: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
    readonly threshold: u16;
  }

  /** @name PalletRecoveryActiveRecovery (174) */
  interface PalletRecoveryActiveRecovery extends Struct {
    readonly created: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
  }

  /** @name PalletRecoveryError (175) */
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

  /** @name PalletAssetsAssetDetails (176) */
  interface PalletAssetsAssetDetails extends Struct {
    readonly owner: AccountId32;
    readonly issuer: AccountId32;
    readonly admin: AccountId32;
    readonly freezer: AccountId32;
    readonly supply: u128;
    readonly deposit: u128;
    readonly minBalance: u128;
    readonly isSufficient: bool;
    readonly accounts: u32;
    readonly sufficients: u32;
    readonly approvals: u32;
    readonly status: PalletAssetsAssetStatus;
  }

  /** @name PalletAssetsAssetStatus (177) */
  interface PalletAssetsAssetStatus extends Enum {
    readonly isLive: boolean;
    readonly isFrozen: boolean;
    readonly isDestroying: boolean;
    readonly type: 'Live' | 'Frozen' | 'Destroying';
  }

  /** @name PalletAssetsAssetAccount (179) */
  interface PalletAssetsAssetAccount extends Struct {
    readonly balance: u128;
    readonly isFrozen: bool;
    readonly reason: PalletAssetsExistenceReason;
    readonly extra: Null;
  }

  /** @name PalletAssetsExistenceReason (180) */
  interface PalletAssetsExistenceReason extends Enum {
    readonly isConsumer: boolean;
    readonly isSufficient: boolean;
    readonly isDepositHeld: boolean;
    readonly asDepositHeld: u128;
    readonly isDepositRefunded: boolean;
    readonly type: 'Consumer' | 'Sufficient' | 'DepositHeld' | 'DepositRefunded';
  }

  /** @name PalletAssetsApproval (182) */
  interface PalletAssetsApproval extends Struct {
    readonly amount: u128;
    readonly deposit: u128;
  }

  /** @name PalletAssetsAssetMetadata (183) */
  interface PalletAssetsAssetMetadata extends Struct {
    readonly deposit: u128;
    readonly name: Bytes;
    readonly symbol: Bytes;
    readonly decimals: u8;
    readonly isFrozen: bool;
  }

  /** @name PalletAssetsError (185) */
  interface PalletAssetsError extends Enum {
    readonly isBalanceLow: boolean;
    readonly isNoAccount: boolean;
    readonly isNoPermission: boolean;
    readonly isUnknown: boolean;
    readonly isFrozen: boolean;
    readonly isInUse: boolean;
    readonly isBadWitness: boolean;
    readonly isMinBalanceZero: boolean;
    readonly isNoProvider: boolean;
    readonly isBadMetadata: boolean;
    readonly isUnapproved: boolean;
    readonly isWouldDie: boolean;
    readonly isAlreadyExists: boolean;
    readonly isNoDeposit: boolean;
    readonly isWouldBurn: boolean;
    readonly isLiveAsset: boolean;
    readonly isAssetNotLive: boolean;
    readonly isIncorrectStatus: boolean;
    readonly isNotFrozen: boolean;
    readonly type: 'BalanceLow' | 'NoAccount' | 'NoPermission' | 'Unknown' | 'Frozen' | 'InUse' | 'BadWitness' | 'MinBalanceZero' | 'NoProvider' | 'BadMetadata' | 'Unapproved' | 'WouldDie' | 'AlreadyExists' | 'NoDeposit' | 'WouldBurn' | 'LiveAsset' | 'AssetNotLive' | 'IncorrectStatus' | 'NotFrozen';
  }

  /** @name PalletLoAuthorityListStorageVersion (186) */
  interface PalletLoAuthorityListStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2AddOnchainSettings: boolean;
    readonly isV3GuestLegalOfficers: boolean;
    readonly type: 'V1' | 'V2AddOnchainSettings' | 'V3GuestLegalOfficers';
  }

  /** @name PalletLoAuthorityListError (187) */
  interface PalletLoAuthorityListError extends Enum {
    readonly isAlreadyExists: boolean;
    readonly isNotFound: boolean;
    readonly isPeerIdAlreadyInUse: boolean;
    readonly isHostHasGuest: boolean;
    readonly isGuestOfGuest: boolean;
    readonly isHostNotFound: boolean;
    readonly isHostCannotConvert: boolean;
    readonly isGuestCannotUpdate: boolean;
    readonly type: 'AlreadyExists' | 'NotFound' | 'PeerIdAlreadyInUse' | 'HostHasGuest' | 'GuestOfGuest' | 'HostNotFound' | 'HostCannotConvert' | 'GuestCannotUpdate';
  }

  /** @name PalletLogionLocLegalOfficerCase (188) */
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
  }

  /** @name PalletLogionLocRequester (189) */
  interface PalletLogionLocRequester extends Enum {
    readonly isNone: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isLoc: boolean;
    readonly asLoc: u128;
    readonly type: 'None' | 'Account' | 'Loc';
  }

  /** @name PalletLogionLocLocType (192) */
  interface PalletLogionLocLocType extends Enum {
    readonly isTransaction: boolean;
    readonly isIdentity: boolean;
    readonly isCollection: boolean;
    readonly type: 'Transaction' | 'Identity' | 'Collection';
  }

  /** @name PalletLogionLocLocVoidInfo (195) */
  interface PalletLogionLocLocVoidInfo extends Struct {
    readonly replacer: Option<u128>;
  }

  /** @name PalletLogionLocCollectionItem (200) */
  interface PalletLogionLocCollectionItem extends Struct {
    readonly description: Bytes;
    readonly files: Vec<PalletLogionLocCollectionItemFile>;
    readonly token: Option<PalletLogionLocCollectionItemToken>;
    readonly restrictedDelivery: bool;
    readonly termsAndConditions: Vec<PalletLogionLocTermsAndConditionsElement>;
  }

  /** @name PalletLogionLocTokensRecord (201) */
  interface PalletLogionLocTokensRecord extends Struct {
    readonly description: Bytes;
    readonly files: Vec<PalletLogionLocTokensRecordFile>;
    readonly submitter: AccountId32;
  }

  /** @name PalletLogionLocTokensRecordFile (204) */
  interface PalletLogionLocTokensRecordFile extends Struct {
    readonly name: Bytes;
    readonly contentType: Bytes;
    readonly size_: u32;
    readonly hash_: H256;
  }

  /** @name PalletLogionLocVerifiedIssuer (208) */
  interface PalletLogionLocVerifiedIssuer extends Struct {
    readonly identityLoc: u128;
  }

  /** @name PalletLogionLocStorageVersion (211) */
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
    readonly type: 'V1' | 'V2MakeLocVoid' | 'V3RequesterEnum' | 'V4ItemSubmitter' | 'V5Collection' | 'V6ItemUpload' | 'V7ItemToken' | 'V8AddSeal' | 'V9TermsAndConditions' | 'V10AddLocFileSize';
  }

  /** @name PalletLogionLocError (212) */
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
    readonly type: 'AlreadyExists' | 'NotFound' | 'Unauthorized' | 'CannotMutate' | 'AlreadyClosed' | 'LinkedLocNotFound' | 'ReplacerLocNotFound' | 'AlreadyVoid' | 'ReplacerLocAlreadyVoid' | 'ReplacerLocAlreadyReplacing' | 'CannotMutateVoid' | 'UnexpectedRequester' | 'ReplacerLocWrongType' | 'InvalidSubmitter' | 'CollectionHasNoLimit' | 'WrongCollectionLoc' | 'CollectionItemAlreadyExists' | 'CollectionItemTooMuchData' | 'CollectionLimitsReached' | 'MetadataItemInvalid' | 'FileInvalid' | 'LocLinkInvalid' | 'CannotUpload' | 'MustUpload' | 'DuplicateFile' | 'MissingToken' | 'MissingFiles' | 'TermsAndConditionsLocNotFound' | 'TermsAndConditionsLocNotClosed' | 'TermsAndConditionsLocVoid' | 'DuplicateLocFile' | 'DuplicateLocMetadata' | 'DuplicateLocLink' | 'TokensRecordTooMuchData' | 'TokensRecordAlreadyExists' | 'CannotAddRecord' | 'InvalidIdentityLoc' | 'AlreadyNominated' | 'NotNominated' | 'CannotSubmit' | 'InsufficientFunds';
  }

  /** @name PalletVerifiedRecoveryError (213) */
  interface PalletVerifiedRecoveryError extends Enum {
    readonly isInvalidLegalOfficers: boolean;
    readonly isMissingIdentityLoc: boolean;
    readonly type: 'InvalidLegalOfficers' | 'MissingIdentityLoc';
  }

  /** @name PalletLogionVaultError (214) */
  interface PalletLogionVaultError extends Enum {
    readonly isInvalidSignatories: boolean;
    readonly isWrongInitiator: boolean;
    readonly type: 'InvalidSignatories' | 'WrongInitiator';
  }

  /** @name PalletLogionVoteVote (215) */
  interface PalletLogionVoteVote extends Struct {
    readonly locId: u128;
    readonly ballots: Vec<PalletLogionVoteBallot>;
  }

  /** @name PalletLogionVoteError (217) */
  interface PalletLogionVoteError extends Enum {
    readonly isInvalidLoc: boolean;
    readonly isVoteNotFound: boolean;
    readonly isNotAllowed: boolean;
    readonly isAlreadyVoted: boolean;
    readonly type: 'InvalidLoc' | 'VoteNotFound' | 'NotAllowed' | 'AlreadyVoted';
  }

  /** @name PalletTreasuryProposal (218) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name FrameSupportPalletId (221) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (222) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved';
  }

  /** @name SpRuntimeMultiSignature (224) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (225) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (226) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (229) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (230) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (231) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (232) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (235) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (236) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (237) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name LogionNodeRuntimeRuntime (238) */
  type LogionNodeRuntimeRuntime = Null;

} // declare module
