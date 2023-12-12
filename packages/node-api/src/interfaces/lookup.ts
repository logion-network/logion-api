// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Nonce, pallet_balances::types::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::types::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128',
    flags: 'u128'
  },
  /**
   * Lookup8: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup9: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup14: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup16: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup19: frame_system::EventRecord<logion_node_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup21: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup23: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup24: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup25: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null',
      RootNotAllowed: 'Null'
    }
  },
  /**
   * Lookup26: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup27: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['FundsUnavailable', 'OnlyProvider', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported', 'CannotCreateHold', 'NotExpendable', 'Blocked']
  },
  /**
   * Lookup28: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup29: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup30: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Minted: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Burned: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Suspended: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Restored: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Upgraded: {
        who: 'AccountId32',
      },
      Issued: {
        amount: 'u128',
      },
      Rescinded: {
        amount: 'u128',
      },
      Locked: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unlocked: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Frozen: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Thawed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup31: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup32: substrate_validator_set::pallet::Event<T>
   **/
  SubstrateValidatorSetEvent: {
    _enum: {
      ValidatorAdditionInitiated: 'AccountId32',
      ValidatorRemovalInitiated: 'AccountId32'
    }
  },
  /**
   * Lookup33: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup34: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup37: sp_consensus_grandpa::app::Public
   **/
  SpConsensusGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup38: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup39: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128'
      }
    }
  },
  /**
   * Lookup40: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup44: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: 'AccountId32',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigApproval: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigExecuted: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MultisigCancelled: {
        cancelling: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup45: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup46: pallet_recovery::pallet::Event<T>
   **/
  PalletRecoveryEvent: {
    _enum: {
      RecoveryCreated: {
        account: 'AccountId32',
      },
      RecoveryInitiated: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      RecoveryVouched: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
        sender: 'AccountId32',
      },
      RecoveryClosed: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      AccountRecovered: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      RecoveryRemoved: {
        lostAccount: 'AccountId32'
      }
    }
  },
  /**
   * Lookup47: pallet_lo_authority_list::pallet::Event<T>
   **/
  PalletLoAuthorityListEvent: {
    _enum: {
      LoAdded: 'AccountId32',
      LoRemoved: 'AccountId32',
      LoUpdated: 'AccountId32'
    }
  },
  /**
   * Lookup48: pallet_logion_loc::pallet::Event<T>
   **/
  PalletLogionLocEvent: {
    _enum: {
      LocCreated: 'u128',
      LocClosed: 'u128',
      LocVoid: 'u128',
      ItemAdded: '(u128,H256)',
      StorageFeeWithdrawn: '(AccountId32,u128)',
      SponsorshipCreated: '(u128,AccountId32,PalletLogionLocSupportedAccountId)',
      SponsorshipWithdrawn: '(u128,AccountId32,PalletLogionLocSupportedAccountId)',
      LegalFeeWithdrawn: '(AccountId32,LogionSharedBeneficiary,u128)',
      CertificateFeeWithdrawn: '(AccountId32,u128)',
      ValueFeeWithdrawn: '(AccountId32,u128)',
      CollectionItemFeeWithdrawn: '(AccountId32,u128,LogionSharedBeneficiary,u128)',
      TokensRecordFeeWithdrawn: '(AccountId32,u128,LogionSharedBeneficiary,u128)'
    }
  },
  /**
   * Lookup49: pallet_logion_loc::SupportedAccountId<sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocSupportedAccountId: {
    _enum: {
      None: 'Null',
      Polkadot: 'AccountId32',
      Other: 'PalletLogionLocOtherAccountId'
    }
  },
  /**
   * Lookup52: pallet_logion_loc::OtherAccountId<primitive_types::H160>
   **/
  PalletLogionLocOtherAccountId: {
    _enum: {
      Ethereum: 'H160'
    }
  },
  /**
   * Lookup53: logion_shared::Beneficiary<sp_core::crypto::AccountId32>
   **/
  LogionSharedBeneficiary: {
    _enum: {
      Other: 'Null',
      LegalOfficer: 'AccountId32'
    }
  },
  /**
   * Lookup54: pallet_verified_recovery::pallet::Event<T>
   **/
  PalletVerifiedRecoveryEvent: 'Null',
  /**
   * Lookup55: pallet_logion_vault::pallet::Event<T>
   **/
  PalletLogionVaultEvent: 'Null',
  /**
   * Lookup56: pallet_logion_vote::pallet::Event<T>
   **/
  PalletLogionVoteEvent: {
    _enum: {
      VoteCreated: '(u64,Vec<AccountId32>)',
      VoteUpdated: '(u64,PalletLogionVoteBallot,bool,bool)'
    }
  },
  /**
   * Lookup58: pallet_logion_vote::Ballot<sp_core::crypto::AccountId32>
   **/
  PalletLogionVoteBallot: {
    voter: 'AccountId32',
    status: 'PalletLogionVoteBallotStatus'
  },
  /**
   * Lookup59: pallet_logion_vote::BallotStatus
   **/
  PalletLogionVoteBallotStatus: {
    _enum: ['NotVoted', 'VotedYes', 'VotedNo']
  },
  /**
   * Lookup61: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u128',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u128',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u128',
      },
      Burnt: {
        burntFunds: 'u128',
      },
      Rollover: {
        rolloverBalance: 'u128',
      },
      Deposit: {
        value: 'u128',
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u128',
        beneficiary: 'AccountId32',
      },
      UpdatedInactive: {
        reactivated: 'u128',
        deactivated: 'u128',
      },
      AssetSpendApproved: {
        index: 'u32',
        assetKind: 'Null',
        amount: 'u128',
        beneficiary: 'AccountId32',
        validFrom: 'u32',
        expireAt: 'u32',
      },
      AssetSpendVoided: {
        index: 'u32',
      },
      Paid: {
        index: 'u32',
        paymentId: 'Null',
      },
      PaymentFailed: {
        index: 'u32',
        paymentId: 'Null',
      },
      SpendProcessed: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup63: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup64: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup68: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup71: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup75: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup76: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup77: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup79: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup80: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup81: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup82: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup88: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup89: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup91: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup92: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup95: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup101: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup103: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer_allow_death: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      __Unused1: 'Null',
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128',
      },
      upgrade_accounts: {
        who: 'Vec<AccountId32>',
      },
      __Unused7: 'Null',
      force_set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup107: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'Expendability', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves', 'TooManyHolds', 'TooManyFreezes']
  },
  /**
   * Lookup108: substrate_validator_set::pallet::Call<T>
   **/
  SubstrateValidatorSetCall: {
    _enum: {
      add_validator: {
        validatorId: 'AccountId32',
      },
      remove_validator: {
        validatorId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup109: substrate_validator_set::pallet::Error<T>
   **/
  SubstrateValidatorSetError: {
    _enum: ['TooLowValidatorCount', 'Duplicate']
  },
  /**
   * Lookup112: logion_node_runtime::opaque::SessionKeys
   **/
  LogionNodeRuntimeOpaqueSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public',
    grandpa: 'SpConsensusGrandpaAppPublic'
  },
  /**
   * Lookup113: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup114: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup117: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup118: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'LogionNodeRuntimeOpaqueSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup119: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup123: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup124: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup127: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup128: sp_consensus_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpConsensusGrandpaEquivocation'
  },
  /**
   * Lookup129: sp_consensus_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup130: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup131: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup132: sp_consensus_grandpa::app::Signature
   **/
  SpConsensusGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup133: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup136: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup137: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup139: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup140: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup142: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup143: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup145: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Call',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup147: pallet_recovery::pallet::Call<T>
   **/
  PalletRecoveryCall: {
    _enum: {
      as_recovered: {
        account: 'MultiAddress',
        call: 'Call',
      },
      set_recovered: {
        lost: 'MultiAddress',
        rescuer: 'MultiAddress',
      },
      create_recovery: {
        friends: 'Vec<AccountId32>',
        threshold: 'u16',
        delayPeriod: 'u32',
      },
      initiate_recovery: {
        account: 'MultiAddress',
      },
      vouch_recovery: {
        lost: 'MultiAddress',
        rescuer: 'MultiAddress',
      },
      claim_recovery: {
        account: 'MultiAddress',
      },
      close_recovery: {
        rescuer: 'MultiAddress',
      },
      remove_recovery: 'Null',
      cancel_recovered: {
        account: 'MultiAddress'
      }
    }
  },
  /**
   * Lookup148: pallet_lo_authority_list::pallet::Call<T>
   **/
  PalletLoAuthorityListCall: {
    _enum: {
      add_legal_officer: {
        legalOfficerId: 'AccountId32',
        data: 'PalletLoAuthorityListLegalOfficerData',
      },
      remove_legal_officer: {
        legalOfficerId: 'AccountId32',
      },
      update_legal_officer: {
        legalOfficerId: 'AccountId32',
        data: 'PalletLoAuthorityListLegalOfficerData'
      }
    }
  },
  /**
   * Lookup149: pallet_lo_authority_list::LegalOfficerData<sp_core::crypto::AccountId32, logion_node_runtime::Region>
   **/
  PalletLoAuthorityListLegalOfficerData: {
    _enum: {
      Host: 'PalletLoAuthorityListHostData',
      Guest: 'AccountId32'
    }
  },
  /**
   * Lookup150: logion_node_runtime::Region
   **/
  LogionNodeRuntimeRegion: {
    _enum: ['Europe']
  },
  /**
   * Lookup151: pallet_lo_authority_list::HostData<logion_node_runtime::Region>
   **/
  PalletLoAuthorityListHostData: {
    nodeId: 'Option<OpaquePeerId>',
    baseUrl: 'Option<Bytes>',
    region: 'LogionNodeRuntimeRegion'
  },
  /**
   * Lookup155: pallet_logion_loc::pallet::Call<T>
   **/
  PalletLogionLocCall: {
    _enum: {
      create_polkadot_identity_loc: {
        locId: 'Compact<u128>',
        legalOfficer: 'AccountId32',
        legalFee: 'u128',
        items: 'PalletLogionLocItemsParams',
      },
      create_logion_identity_loc: {
        locId: 'Compact<u128>',
      },
      create_polkadot_transaction_loc: {
        locId: 'Compact<u128>',
        legalOfficer: 'AccountId32',
        legalFee: 'u128',
        items: 'PalletLogionLocItemsParams',
      },
      create_logion_transaction_loc: {
        locId: 'Compact<u128>',
        requesterLocId: 'u128',
      },
      create_collection_loc: {
        locId: 'Compact<u128>',
        legalOfficer: 'AccountId32',
        collectionLastBlockSubmission: 'Option<u32>',
        collectionMaxSize: 'Option<u32>',
        collectionCanUpload: 'bool',
        valueFee: 'u128',
        legalFee: 'u128',
        collectionItemFee: 'u128',
        tokensRecordFee: 'u128',
        items: 'PalletLogionLocItemsParams',
      },
      add_metadata: {
        locId: 'Compact<u128>',
        item: 'PalletLogionLocMetadataItemParams',
      },
      add_file: {
        locId: 'Compact<u128>',
        file: 'PalletLogionLocFileParams',
      },
      add_link: {
        locId: 'Compact<u128>',
        link: 'PalletLogionLocLocLinkParams',
      },
      __Unused8: 'Null',
      __Unused9: 'Null',
      make_void: {
        locId: 'Compact<u128>',
      },
      make_void_and_replace: {
        locId: 'Compact<u128>',
        replacerLocId: 'Compact<u128>',
      },
      add_collection_item: {
        collectionLocId: 'Compact<u128>',
        itemId: 'H256',
        itemDescription: 'H256',
        itemFiles: 'Vec<PalletLogionLocCollectionItemFile>',
        itemToken: 'Option<PalletLogionLocCollectionItemToken>',
        restrictedDelivery: 'bool',
        termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>',
      },
      __Unused13: 'Null',
      nominate_issuer: {
        issuer: 'AccountId32',
        identityLocId: 'Compact<u128>',
      },
      dismiss_issuer: {
        issuer: 'AccountId32',
      },
      set_issuer_selection: {
        locId: 'Compact<u128>',
        issuer: 'AccountId32',
        selected: 'bool',
      },
      add_tokens_record: {
        collectionLocId: 'Compact<u128>',
        recordId: 'H256',
        description: 'H256',
        files: 'Vec<PalletLogionLocTokensRecordFile>',
      },
      create_other_identity_loc: {
        locId: 'Compact<u128>',
        requesterAccountId: 'PalletLogionLocOtherAccountId',
        sponsorshipId: 'Compact<u128>',
        legalFee: 'u128',
      },
      sponsor: {
        sponsorshipId: 'Compact<u128>',
        sponsoredAccount: 'PalletLogionLocSupportedAccountId',
        legalOfficer: 'AccountId32',
      },
      withdraw_sponsorship: {
        sponsorshipId: 'Compact<u128>',
      },
      acknowledge_metadata: {
        locId: 'Compact<u128>',
        name: 'H256',
      },
      acknowledge_file: {
        _alias: {
          hash_: 'hash',
        },
        locId: 'Compact<u128>',
        hash_: 'H256',
      },
      acknowledge_link: {
        locId: 'Compact<u128>',
        target: 'Compact<u128>',
      },
      close: {
        locId: 'Compact<u128>',
        seal: 'Option<H256>',
        autoAck: 'bool'
      }
    }
  },
  /**
   * Lookup156: pallet_logion_loc::ItemsParams<LocId, sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocItemsParams: {
    metadata: 'Vec<PalletLogionLocMetadataItemParams>',
    files: 'Vec<PalletLogionLocFileParams>',
    links: 'Vec<PalletLogionLocLocLinkParams>'
  },
  /**
   * Lookup158: pallet_logion_loc::MetadataItemParams<sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocMetadataItemParams: {
    name: 'H256',
    value: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId'
  },
  /**
   * Lookup160: pallet_logion_loc::FileParams<primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocFileParams: {
    _alias: {
      hash_: 'hash',
      size_: 'size'
    },
    hash_: 'H256',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    size_: 'u32'
  },
  /**
   * Lookup162: pallet_logion_loc::LocLinkParams<LocId, primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocLocLinkParams: {
    id: 'u128',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId'
  },
  /**
   * Lookup164: pallet_logion_loc::CollectionItemFile<primitive_types::H256>
   **/
  PalletLogionLocCollectionItemFile: {
    _alias: {
      size_: 'size',
      hash_: 'hash'
    },
    name: 'H256',
    contentType: 'H256',
    size_: 'u32',
    hash_: 'H256'
  },
  /**
   * Lookup166: pallet_logion_loc::CollectionItemToken<TokenIssuance, primitive_types::H256>
   **/
  PalletLogionLocCollectionItemToken: {
    tokenType: 'H256',
    tokenId: 'H256',
    tokenIssuance: 'u64'
  },
  /**
   * Lookup168: pallet_logion_loc::TermsAndConditionsElement<LocId, primitive_types::H256>
   **/
  PalletLogionLocTermsAndConditionsElement: {
    tcType: 'H256',
    tcLoc: 'u128',
    details: 'H256'
  },
  /**
   * Lookup170: pallet_logion_loc::TokensRecordFile<primitive_types::H256>
   **/
  PalletLogionLocTokensRecordFile: {
    _alias: {
      size_: 'size',
      hash_: 'hash'
    },
    name: 'H256',
    contentType: 'H256',
    size_: 'u32',
    hash_: 'H256'
  },
  /**
   * Lookup172: pallet_verified_recovery::pallet::Call<T>
   **/
  PalletVerifiedRecoveryCall: {
    _enum: {
      create_recovery: {
        legalOfficers: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup173: pallet_logion_vault::pallet::Call<T>
   **/
  PalletLogionVaultCall: {
    _enum: {
      request_call: {
        legalOfficers: 'Vec<AccountId32>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_call: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
        timepoint: 'PalletMultisigTimepoint',
        maxWeight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup174: pallet_logion_vote::pallet::Call<T>
   **/
  PalletLogionVoteCall: {
    _enum: {
      create_vote_for_all_legal_officers: {
        locId: 'Compact<u128>',
      },
      vote: {
        voteId: 'Compact<u64>',
        voteYes: 'bool'
      }
    }
  },
  /**
   * Lookup175: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>',
      },
      spend_local: {
        amount: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      remove_approval: {
        proposalId: 'Compact<u32>',
      },
      spend: {
        assetKind: 'Null',
        amount: 'Compact<u128>',
        beneficiary: 'AccountId32',
        validFrom: 'Option<u32>',
      },
      payout: {
        index: 'u32',
      },
      check_status: {
        index: 'u32',
      },
      void_spend: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup177: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'LogionNodeRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>',
      },
      with_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup179: logion_node_runtime::OriginCaller
   **/
  LogionNodeRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      Void: 'SpCoreVoid'
    }
  },
  /**
   * Lookup180: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup181: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup183: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup185: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup186: pallet_recovery::RecoveryConfig<BlockNumber, Balance, bounded_collections::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryRecoveryConfig: {
    delayPeriod: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>',
    threshold: 'u16'
  },
  /**
   * Lookup189: pallet_recovery::ActiveRecovery<BlockNumber, Balance, bounded_collections::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryActiveRecovery: {
    created: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>'
  },
  /**
   * Lookup190: pallet_recovery::pallet::Error<T>
   **/
  PalletRecoveryError: {
    _enum: ['NotAllowed', 'ZeroThreshold', 'NotEnoughFriends', 'MaxFriends', 'NotSorted', 'NotRecoverable', 'AlreadyRecoverable', 'AlreadyStarted', 'NotStarted', 'NotFriend', 'DelayPeriod', 'AlreadyVouched', 'Threshold', 'StillActive', 'AlreadyProxy', 'BadState']
  },
  /**
   * Lookup193: pallet_lo_authority_list::pallet::StorageVersion
   **/
  PalletLoAuthorityListStorageVersion: {
    _enum: ['V1', 'V2AddOnchainSettings', 'V3GuestLegalOfficers', 'V4Region']
  },
  /**
   * Lookup194: pallet_lo_authority_list::pallet::Error<T>
   **/
  PalletLoAuthorityListError: {
    _enum: ['AlreadyExists', 'NotFound', 'PeerIdAlreadyInUse', 'HostHasGuest', 'GuestOfGuest', 'HostNotFound', 'HostCannotConvert', 'GuestCannotUpdate', 'CannotChangeRegion']
  },
  /**
   * Lookup195: pallet_logion_loc::LegalOfficerCase<sp_core::crypto::AccountId32, primitive_types::H256, LocId, BlockNumber, primitive_types::H160, SponsorshipId, Balance>
   **/
  PalletLogionLocLegalOfficerCase: {
    owner: 'AccountId32',
    requester: 'PalletLogionLocRequester',
    metadata: 'Vec<PalletLogionLocMetadataItem>',
    files: 'Vec<PalletLogionLocFile>',
    closed: 'bool',
    locType: 'PalletLogionLocLocType',
    links: 'Vec<PalletLogionLocLocLink>',
    voidInfo: 'Option<PalletLogionLocLocVoidInfo>',
    replacerOf: 'Option<u128>',
    collectionLastBlockSubmission: 'Option<u32>',
    collectionMaxSize: 'Option<u32>',
    collectionCanUpload: 'bool',
    seal: 'Option<H256>',
    sponsorshipId: 'Option<u128>',
    valueFee: 'u128',
    legalFee: 'u128',
    collectionItemFee: 'u128',
    tokensRecordFee: 'u128'
  },
  /**
   * Lookup196: pallet_logion_loc::Requester<sp_core::crypto::AccountId32, LocId, primitive_types::H160>
   **/
  PalletLogionLocRequester: {
    _enum: {
      None: 'Null',
      Account: 'AccountId32',
      Loc: 'u128',
      OtherAccount: 'PalletLogionLocOtherAccountId'
    }
  },
  /**
   * Lookup198: pallet_logion_loc::MetadataItem<sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocMetadataItem: {
    name: 'H256',
    value: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    acknowledgedByOwner: 'bool',
    acknowledgedByVerifiedIssuer: 'bool'
  },
  /**
   * Lookup200: pallet_logion_loc::File<primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocFile: {
    _alias: {
      hash_: 'hash',
      size_: 'size'
    },
    hash_: 'H256',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    size_: 'u32',
    acknowledgedByOwner: 'bool',
    acknowledgedByVerifiedIssuer: 'bool'
  },
  /**
   * Lookup201: pallet_logion_loc::LocType
   **/
  PalletLogionLocLocType: {
    _enum: ['Transaction', 'Identity', 'Collection']
  },
  /**
   * Lookup203: pallet_logion_loc::LocLink<LocId, primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocLocLink: {
    id: 'u128',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    acknowledgedByOwner: 'bool',
    acknowledgedByVerifiedIssuer: 'bool'
  },
  /**
   * Lookup205: pallet_logion_loc::LocVoidInfo<LocId>
   **/
  PalletLogionLocLocVoidInfo: {
    replacer: 'Option<u128>'
  },
  /**
   * Lookup209: pallet_logion_loc::CollectionItem<primitive_types::H256, LocId, TokenIssuance>
   **/
  PalletLogionLocCollectionItem: {
    description: 'H256',
    files: 'Vec<PalletLogionLocCollectionItemFile>',
    token: 'Option<PalletLogionLocCollectionItemToken>',
    restrictedDelivery: 'bool',
    termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>'
  },
  /**
   * Lookup210: pallet_logion_loc::TokensRecord<primitive_types::H256, bounded_collections::bounded_vec::BoundedVec<pallet_logion_loc::TokensRecordFile<primitive_types::H256>, S>, sp_core::crypto::AccountId32>
   **/
  PalletLogionLocTokensRecord: {
    description: 'H256',
    files: 'Vec<PalletLogionLocTokensRecordFile>',
    submitter: 'AccountId32'
  },
  /**
   * Lookup212: pallet_logion_loc::VerifiedIssuer<LocId>
   **/
  PalletLogionLocVerifiedIssuer: {
    identityLoc: 'u128'
  },
  /**
   * Lookup215: pallet_logion_loc::Sponsorship<sp_core::crypto::AccountId32, primitive_types::H160, LocId>
   **/
  PalletLogionLocSponsorship: {
    sponsor: 'AccountId32',
    sponsoredAccount: 'PalletLogionLocSupportedAccountId',
    legalOfficer: 'AccountId32',
    locId: 'Option<u128>'
  },
  /**
   * Lookup216: pallet_logion_loc::pallet::StorageVersion
   **/
  PalletLogionLocStorageVersion: {
    _enum: ['V1', 'V2MakeLocVoid', 'V3RequesterEnum', 'V4ItemSubmitter', 'V5Collection', 'V6ItemUpload', 'V7ItemToken', 'V8AddSeal', 'V9TermsAndConditions', 'V10AddLocFileSize', 'V11EnableEthereumSubmitter', 'V12Sponsorship', 'V13AcknowledgeItems', 'V14HashLocPublicData', 'V15AddTokenIssuance', 'V16MoveTokenIssuance', 'V17HashItemRecordPublicData', 'V18AddValueFee', 'V19AcknowledgeItemsByIssuer', 'V20AddCustomLegalFee', 'V21EnableRequesterLinks', 'V22AddRecurrentFees']
  },
  /**
   * Lookup217: pallet_logion_loc::pallet::Error<T>
   **/
  PalletLogionLocError: {
    _enum: ['AlreadyExists', 'NotFound', 'Unauthorized', 'CannotMutate', 'AlreadyClosed', 'LinkedLocNotFound', 'ReplacerLocNotFound', 'AlreadyVoid', 'ReplacerLocAlreadyVoid', 'ReplacerLocAlreadyReplacing', 'CannotMutateVoid', 'UnexpectedRequester', 'ReplacerLocWrongType', 'InvalidSubmitter', 'CollectionHasNoLimit', 'WrongCollectionLoc', 'CollectionItemAlreadyExists', 'CollectionItemTooMuchData', 'CollectionLimitsReached', 'MetadataItemInvalid', 'FileInvalid', 'LocLinkInvalid', 'CannotUpload', 'MustUpload', 'DuplicateFile', 'MissingToken', 'MissingFiles', 'TermsAndConditionsLocNotFound', 'TermsAndConditionsLocNotClosed', 'TermsAndConditionsLocVoid', 'DuplicateLocFile', 'DuplicateLocMetadata', 'DuplicateLocLink', 'TokensRecordTooMuchData', 'TokensRecordAlreadyExists', 'CannotAddRecord', 'InvalidIdentityLoc', 'AlreadyNominated', 'NotNominated', 'CannotSubmit', 'InsufficientFunds', 'AlreadyUsed', 'CannotLinkToSponsorship', 'ItemNotFound', 'ItemAlreadyAcknowledged', 'CannotCloseUnacknowledgedByOwner', 'BadTokenIssuance', 'CannotCloseUnacknowledgedByVerifiedIssuer']
  },
  /**
   * Lookup218: pallet_verified_recovery::pallet::Error<T>
   **/
  PalletVerifiedRecoveryError: {
    _enum: ['InvalidLegalOfficers', 'MissingIdentityLoc']
  },
  /**
   * Lookup219: pallet_logion_vault::pallet::Error<T>
   **/
  PalletLogionVaultError: {
    _enum: ['InvalidSignatories', 'WrongInitiator']
  },
  /**
   * Lookup220: pallet_logion_vote::Vote<LocId, sp_core::crypto::AccountId32>
   **/
  PalletLogionVoteVote: {
    locId: 'u128',
    ballots: 'Vec<PalletLogionVoteBallot>'
  },
  /**
   * Lookup222: pallet_logion_vote::pallet::Error<T>
   **/
  PalletLogionVoteError: {
    _enum: ['InvalidLoc', 'VoteNotFound', 'NotAllowed', 'AlreadyVoted']
  },
  /**
   * Lookup223: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup225: pallet_treasury::SpendStatus<AssetKind, AssetBalance, sp_core::crypto::AccountId32, BlockNumber, PaymentId>
   **/
  PalletTreasurySpendStatus: {
    assetKind: 'Null',
    amount: 'u128',
    beneficiary: 'AccountId32',
    validFrom: 'u32',
    expireAt: 'u32',
    status: 'PalletTreasuryPaymentState'
  },
  /**
   * Lookup226: pallet_treasury::PaymentState<Id>
   **/
  PalletTreasuryPaymentState: {
    _enum: {
      Pending: 'Null',
      Attempted: {
        id: 'Null',
      },
      Failed: 'Null'
    }
  },
  /**
   * Lookup228: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup229: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved', 'FailedToConvertBalance', 'SpendExpired', 'EarlyPayout', 'AlreadyAttempted', 'PayoutError', 'NotAttempted', 'Inconclusive']
  },
  /**
   * Lookup231: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup233: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup234: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup235: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup238: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup239: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup240: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup241: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup244: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup245: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup246: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup247: logion_node_runtime::Runtime
   **/
  LogionNodeRuntimeRuntime: 'Null'
};
