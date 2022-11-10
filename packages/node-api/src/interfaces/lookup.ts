// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup8: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup15: sp_runtime::generic::digest::DigestItem
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
   * Lookup18: frame_system::EventRecord<logion_node_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup20: frame_system::pallet::Event<T>
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
   * Lookup21: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup23: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup24: sp_runtime::DispatchError
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
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null'
    }
  },
  /**
   * Lookup25: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup27: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup28: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup29: pallet_balances::pallet::Event<T, I>
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
        reserved: 'u128',
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
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup30: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup31: substrate_validator_set::pallet::Event<T>
   **/
  SubstrateValidatorSetEvent: {
    _enum: {
      ValidatorAdditionInitiated: 'AccountId32',
      ValidatorRemovalInitiated: 'AccountId32'
    }
  },
  /**
   * Lookup32: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup33: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup36: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup37: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup38: pallet_transaction_payment::pallet::Event<T>
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
   * Lookup39: pallet_sudo::pallet::Event<T>
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
   * Lookup43: pallet_node_authorization::pallet::Event<T>
   **/
  PalletNodeAuthorizationEvent: {
    _enum: {
      NodeAdded: {
        peerId: 'OpaquePeerId',
        who: 'AccountId32',
      },
      NodeRemoved: {
        peerId: 'OpaquePeerId',
      },
      NodeSwapped: {
        removed: 'OpaquePeerId',
        added: 'OpaquePeerId',
      },
      NodesReset: {
        nodes: 'Vec<(OpaquePeerId,AccountId32)>',
      },
      NodeClaimed: {
        peerId: 'OpaquePeerId',
        who: 'AccountId32',
      },
      ClaimRemoved: {
        peerId: 'OpaquePeerId',
        who: 'AccountId32',
      },
      NodeTransferred: {
        peerId: 'OpaquePeerId',
        target: 'AccountId32',
      },
      ConnectionsAdded: {
        peerId: 'OpaquePeerId',
        allowedConnections: 'Vec<OpaquePeerId>',
      },
      ConnectionsRemoved: {
        peerId: 'OpaquePeerId',
        allowedConnections: 'Vec<OpaquePeerId>'
      }
    }
  },
  /**
   * Lookup48: pallet_multisig::pallet::Event<T>
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
   * Lookup49: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup50: pallet_recovery::pallet::Event<T>
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
   * Lookup51: pallet_assets::pallet::Event<T, I>
   **/
  PalletAssetsEvent: {
    _enum: {
      Created: {
        assetId: 'u64',
        creator: 'AccountId32',
        owner: 'AccountId32',
      },
      Issued: {
        assetId: 'u64',
        owner: 'AccountId32',
        totalSupply: 'u128',
      },
      Transferred: {
        assetId: 'u64',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      Burned: {
        assetId: 'u64',
        owner: 'AccountId32',
        balance: 'u128',
      },
      TeamChanged: {
        assetId: 'u64',
        issuer: 'AccountId32',
        admin: 'AccountId32',
        freezer: 'AccountId32',
      },
      OwnerChanged: {
        assetId: 'u64',
        owner: 'AccountId32',
      },
      Frozen: {
        assetId: 'u64',
        who: 'AccountId32',
      },
      Thawed: {
        assetId: 'u64',
        who: 'AccountId32',
      },
      AssetFrozen: {
        assetId: 'u64',
      },
      AssetThawed: {
        assetId: 'u64',
      },
      Destroyed: {
        assetId: 'u64',
      },
      ForceCreated: {
        assetId: 'u64',
        owner: 'AccountId32',
      },
      MetadataSet: {
        assetId: 'u64',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
        isFrozen: 'bool',
      },
      MetadataCleared: {
        assetId: 'u64',
      },
      ApprovedTransfer: {
        assetId: 'u64',
        source: 'AccountId32',
        delegate: 'AccountId32',
        amount: 'u128',
      },
      ApprovalCancelled: {
        assetId: 'u64',
        owner: 'AccountId32',
        delegate: 'AccountId32',
      },
      TransferredApproved: {
        assetId: 'u64',
        owner: 'AccountId32',
        delegate: 'AccountId32',
        destination: 'AccountId32',
        amount: 'u128',
      },
      AssetStatusChanged: {
        assetId: 'u64'
      }
    }
  },
  /**
   * Lookup53: pallet_lo_authority_list::pallet::Event<T>
   **/
  PalletLoAuthorityListEvent: {
    _enum: {
      LoAdded: 'AccountId32',
      LoRemoved: 'AccountId32',
      LoUpdated: 'AccountId32'
    }
  },
  /**
   * Lookup54: pallet_logion_loc::pallet::Event<T>
   **/
  PalletLogionLocEvent: {
    _enum: {
      LocCreated: 'u128',
      LocClosed: 'u128',
      LocVoid: 'u128',
      ItemAdded: '(u128,H256)'
    }
  },
  /**
   * Lookup55: pallet_verified_recovery::pallet::Event<T>
   **/
  PalletVerifiedRecoveryEvent: 'Null',
  /**
   * Lookup56: pallet_logion_vault::pallet::Event<T>
   **/
  PalletLogionVaultEvent: 'Null',
  /**
   * Lookup57: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup61: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup64: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
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
   * Lookup69: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup70: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup71: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup73: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup74: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup75: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup76: sp_version::RuntimeVersion
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
   * Lookup82: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup84: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup86: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup87: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup90: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup92: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup93: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
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
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup98: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup100: substrate_validator_set::pallet::Call<T>
   **/
  SubstrateValidatorSetCall: {
    _enum: {
      add_validator: {
        validatorId: 'AccountId32',
      },
      remove_validator: {
        validatorId: 'AccountId32',
      },
      add_validator_again: {
        validatorId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup101: substrate_validator_set::pallet::Error<T>
   **/
  SubstrateValidatorSetError: {
    _enum: ['TooLowValidatorCount', 'Duplicate', 'ValidatorNotApproved', 'BadOrigin']
  },
  /**
   * Lookup104: logion_node_runtime::opaque::SessionKeys
   **/
  LogionNodeRuntimeOpaqueSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public',
    grandpa: 'SpFinalityGrandpaAppPublic'
  },
  /**
   * Lookup105: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup106: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup109: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup110: pallet_session::pallet::Call<T>
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
   * Lookup111: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup115: pallet_grandpa::StoredState<N>
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
   * Lookup116: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup119: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup120: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup121: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup122: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup123: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup124: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup125: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup128: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup129: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup131: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup132: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup134: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup135: pallet_sudo::pallet::Call<T>
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
   * Lookup137: pallet_node_authorization::pallet::Call<T>
   **/
  PalletNodeAuthorizationCall: {
    _enum: {
      add_well_known_node: {
        node: 'OpaquePeerId',
        owner: 'MultiAddress',
      },
      remove_well_known_node: {
        node: 'OpaquePeerId',
      },
      swap_well_known_node: {
        remove: 'OpaquePeerId',
        add: 'OpaquePeerId',
      },
      reset_well_known_nodes: {
        nodes: 'Vec<(OpaquePeerId,AccountId32)>',
      },
      claim_node: {
        node: 'OpaquePeerId',
      },
      remove_claim: {
        node: 'OpaquePeerId',
      },
      transfer_node: {
        node: 'OpaquePeerId',
        owner: 'MultiAddress',
      },
      add_connections: {
        node: 'OpaquePeerId',
        connections: 'Vec<OpaquePeerId>',
      },
      remove_connections: {
        node: 'OpaquePeerId',
        connections: 'Vec<OpaquePeerId>'
      }
    }
  },
  /**
   * Lookup138: pallet_multisig::pallet::Call<T>
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
   * Lookup140: pallet_recovery::pallet::Call<T>
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
   * Lookup141: pallet_assets::pallet::Call<T, I>
   **/
  PalletAssetsCall: {
    _enum: {
      create: {
        id: 'Compact<u64>',
        admin: 'MultiAddress',
        minBalance: 'u128',
      },
      force_create: {
        id: 'Compact<u64>',
        owner: 'MultiAddress',
        isSufficient: 'bool',
        minBalance: 'Compact<u128>',
      },
      destroy: {
        id: 'Compact<u64>',
        witness: 'PalletAssetsDestroyWitness',
      },
      mint: {
        id: 'Compact<u64>',
        beneficiary: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      burn: {
        id: 'Compact<u64>',
        who: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      transfer: {
        id: 'Compact<u64>',
        target: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      transfer_keep_alive: {
        id: 'Compact<u64>',
        target: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      force_transfer: {
        id: 'Compact<u64>',
        source: 'MultiAddress',
        dest: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      freeze: {
        id: 'Compact<u64>',
        who: 'MultiAddress',
      },
      thaw: {
        id: 'Compact<u64>',
        who: 'MultiAddress',
      },
      freeze_asset: {
        id: 'Compact<u64>',
      },
      thaw_asset: {
        id: 'Compact<u64>',
      },
      transfer_ownership: {
        id: 'Compact<u64>',
        owner: 'MultiAddress',
      },
      set_team: {
        id: 'Compact<u64>',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
      },
      set_metadata: {
        id: 'Compact<u64>',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
      },
      clear_metadata: {
        id: 'Compact<u64>',
      },
      force_set_metadata: {
        id: 'Compact<u64>',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
        isFrozen: 'bool',
      },
      force_clear_metadata: {
        id: 'Compact<u64>',
      },
      force_asset_status: {
        id: 'Compact<u64>',
        owner: 'MultiAddress',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
        minBalance: 'Compact<u128>',
        isSufficient: 'bool',
        isFrozen: 'bool',
      },
      approve_transfer: {
        id: 'Compact<u64>',
        delegate: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      cancel_approval: {
        id: 'Compact<u64>',
        delegate: 'MultiAddress',
      },
      force_cancel_approval: {
        id: 'Compact<u64>',
        owner: 'MultiAddress',
        delegate: 'MultiAddress',
      },
      transfer_approved: {
        id: 'Compact<u64>',
        owner: 'MultiAddress',
        destination: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      touch: {
        id: 'Compact<u64>',
      },
      refund: {
        id: 'Compact<u64>',
        allowBurn: 'bool'
      }
    }
  },
  /**
   * Lookup142: pallet_assets::types::DestroyWitness
   **/
  PalletAssetsDestroyWitness: {
    accounts: 'Compact<u32>',
    sufficients: 'Compact<u32>',
    approvals: 'Compact<u32>'
  },
  /**
   * Lookup143: pallet_lo_authority_list::pallet::Call<T>
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
   * Lookup144: pallet_lo_authority_list::LegalOfficerData
   **/
  PalletLoAuthorityListLegalOfficerData: {
    nodeId: 'Option<OpaquePeerId>',
    baseUrl: 'Option<Bytes>'
  },
  /**
   * Lookup147: pallet_logion_loc::pallet::Call<T>
   **/
  PalletLogionLocCall: {
    _enum: {
      create_polkadot_identity_loc: {
        locId: 'Compact<u128>',
        requesterAccountId: 'AccountId32',
      },
      create_logion_identity_loc: {
        locId: 'Compact<u128>',
      },
      create_polkadot_transaction_loc: {
        locId: 'Compact<u128>',
        requesterAccountId: 'AccountId32',
      },
      create_logion_transaction_loc: {
        locId: 'Compact<u128>',
        requesterLocId: 'u128',
      },
      create_collection_loc: {
        locId: 'Compact<u128>',
        requesterAccountId: 'AccountId32',
        collectionLastBlockSubmission: 'Option<u32>',
        collectionMaxSize: 'Option<u32>',
        collectionCanUpload: 'bool',
      },
      add_metadata: {
        locId: 'Compact<u128>',
        item: 'PalletLogionLocMetadataItem',
      },
      add_file: {
        locId: 'Compact<u128>',
        file: 'PalletLogionLocFile',
      },
      add_link: {
        locId: 'Compact<u128>',
        link: 'PalletLogionLocLocLink',
      },
      close: {
        locId: 'Compact<u128>',
      },
      close_and_seal: {
        locId: 'Compact<u128>',
        seal: 'H256',
      },
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
        itemDescription: 'Bytes',
        itemFiles: 'Vec<PalletLogionLocCollectionItemFile>',
        itemToken: 'Option<PalletLogionLocCollectionItemToken>',
        restrictedDelivery: 'bool',
      },
      add_collection_item_with_terms_and_conditions: {
        collectionLocId: 'Compact<u128>',
        itemId: 'H256',
        itemDescription: 'Bytes',
        itemFiles: 'Vec<PalletLogionLocCollectionItemFile>',
        itemToken: 'Option<PalletLogionLocCollectionItemToken>',
        restrictedDelivery: 'bool',
        termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>'
      }
    }
  },
  /**
   * Lookup148: pallet_logion_loc::MetadataItem<sp_core::crypto::AccountId32>
   **/
  PalletLogionLocMetadataItem: {
    name: 'Bytes',
    value: 'Bytes',
    submitter: 'AccountId32'
  },
  /**
   * Lookup149: pallet_logion_loc::File<primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletLogionLocFile: {
    _alias: {
      hash_: 'hash'
    },
    hash_: 'H256',
    nature: 'Bytes',
    submitter: 'AccountId32'
  },
  /**
   * Lookup150: pallet_logion_loc::LocLink<LocId>
   **/
  PalletLogionLocLocLink: {
    id: 'u128',
    nature: 'Bytes'
  },
  /**
   * Lookup152: pallet_logion_loc::CollectionItemFile<primitive_types::H256>
   **/
  PalletLogionLocCollectionItemFile: {
    _alias: {
      size_: 'size',
      hash_: 'hash'
    },
    name: 'Bytes',
    contentType: 'Bytes',
    size_: 'u32',
    hash_: 'H256'
  },
  /**
   * Lookup154: pallet_logion_loc::CollectionItemToken
   **/
  PalletLogionLocCollectionItemToken: {
    tokenType: 'Bytes',
    tokenId: 'Bytes'
  },
  /**
   * Lookup156: pallet_logion_loc::TermsAndConditionsElement<LocId>
   **/
  PalletLogionLocTermsAndConditionsElement: {
    tcType: 'Bytes',
    tcLoc: 'u128',
    details: 'Bytes'
  },
  /**
   * Lookup157: pallet_verified_recovery::pallet::Call<T>
   **/
  PalletVerifiedRecoveryCall: {
    _enum: {
      create_recovery: {
        legalOfficers: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup158: pallet_logion_vault::pallet::Call<T>
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
   * Lookup159: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup161: pallet_node_authorization::pallet::Error<T>
   **/
  PalletNodeAuthorizationError: {
    _enum: ['PeerIdTooLong', 'TooManyNodes', 'AlreadyJoined', 'NotExist', 'AlreadyClaimed', 'NotClaimed', 'NotOwner', 'PermissionDenied']
  },
  /**
   * Lookup163: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup164: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup165: pallet_recovery::RecoveryConfig<BlockNumber, Balance, sp_core::bounded::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryRecoveryConfig: {
    delayPeriod: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>',
    threshold: 'u16'
  },
  /**
   * Lookup168: pallet_recovery::ActiveRecovery<BlockNumber, Balance, sp_core::bounded::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryActiveRecovery: {
    created: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>'
  },
  /**
   * Lookup169: pallet_recovery::pallet::Error<T>
   **/
  PalletRecoveryError: {
    _enum: ['NotAllowed', 'ZeroThreshold', 'NotEnoughFriends', 'MaxFriends', 'NotSorted', 'NotRecoverable', 'AlreadyRecoverable', 'AlreadyStarted', 'NotStarted', 'NotFriend', 'DelayPeriod', 'AlreadyVouched', 'Threshold', 'StillActive', 'AlreadyProxy', 'BadState']
  },
  /**
   * Lookup170: pallet_assets::types::AssetDetails<Balance, sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletAssetsAssetDetails: {
    owner: 'AccountId32',
    issuer: 'AccountId32',
    admin: 'AccountId32',
    freezer: 'AccountId32',
    supply: 'u128',
    deposit: 'u128',
    minBalance: 'u128',
    isSufficient: 'bool',
    accounts: 'u32',
    sufficients: 'u32',
    approvals: 'u32',
    isFrozen: 'bool'
  },
  /**
   * Lookup172: pallet_assets::types::AssetAccount<Balance, DepositBalance, Extra>
   **/
  PalletAssetsAssetAccount: {
    balance: 'u128',
    isFrozen: 'bool',
    reason: 'PalletAssetsExistenceReason',
    extra: 'Null'
  },
  /**
   * Lookup173: pallet_assets::types::ExistenceReason<Balance>
   **/
  PalletAssetsExistenceReason: {
    _enum: {
      Consumer: 'Null',
      Sufficient: 'Null',
      DepositHeld: 'u128',
      DepositRefunded: 'Null'
    }
  },
  /**
   * Lookup175: pallet_assets::types::Approval<Balance, DepositBalance>
   **/
  PalletAssetsApproval: {
    amount: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup176: pallet_assets::types::AssetMetadata<DepositBalance, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  PalletAssetsAssetMetadata: {
    deposit: 'u128',
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8',
    isFrozen: 'bool'
  },
  /**
   * Lookup178: pallet_assets::pallet::Error<T, I>
   **/
  PalletAssetsError: {
    _enum: ['BalanceLow', 'NoAccount', 'NoPermission', 'Unknown', 'Frozen', 'InUse', 'BadWitness', 'MinBalanceZero', 'NoProvider', 'BadMetadata', 'Unapproved', 'WouldDie', 'AlreadyExists', 'NoDeposit', 'WouldBurn']
  },
  /**
   * Lookup179: pallet_lo_authority_list::pallet::StorageVersion
   **/
  PalletLoAuthorityListStorageVersion: {
    _enum: ['V1', 'V2AddOnchainSettings']
  },
  /**
   * Lookup180: pallet_lo_authority_list::pallet::Error<T>
   **/
  PalletLoAuthorityListError: {
    _enum: ['AlreadyExists', 'NotFound', 'PeerIdAlreadyInUse']
  },
  /**
   * Lookup181: pallet_logion_loc::LegalOfficerCase<sp_core::crypto::AccountId32, primitive_types::H256, LocId, BlockNumber>
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
    seal: 'Option<H256>'
  },
  /**
   * Lookup182: pallet_logion_loc::Requester<sp_core::crypto::AccountId32, LocId>
   **/
  PalletLogionLocRequester: {
    _enum: {
      None: 'Null',
      Account: 'AccountId32',
      Loc: 'u128'
    }
  },
  /**
   * Lookup185: pallet_logion_loc::LocType
   **/
  PalletLogionLocLocType: {
    _enum: ['Transaction', 'Identity', 'Collection']
  },
  /**
   * Lookup188: pallet_logion_loc::LocVoidInfo<LocId>
   **/
  PalletLogionLocLocVoidInfo: {
    replacer: 'Option<u128>'
  },
  /**
   * Lookup193: pallet_logion_loc::CollectionItem<primitive_types::H256, LocId>
   **/
  PalletLogionLocCollectionItem: {
    description: 'Bytes',
    files: 'Vec<PalletLogionLocCollectionItemFile>',
    token: 'Option<PalletLogionLocCollectionItemToken>',
    restrictedDelivery: 'bool',
    termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>'
  },
  /**
   * Lookup194: pallet_logion_loc::pallet::StorageVersion
   **/
  PalletLogionLocStorageVersion: {
    _enum: ['V1', 'V2MakeLocVoid', 'V3RequesterEnum', 'V4ItemSubmitter', 'V5Collection', 'V6ItemUpload', 'V7ItemToken', 'V8AddSeal', 'V9TermsAndConditions']
  },
  /**
   * Lookup195: pallet_logion_loc::pallet::Error<T>
   **/
  PalletLogionLocError: {
    _enum: ['AlreadyExists', 'NotFound', 'Unauthorized', 'CannotMutate', 'AlreadyClosed', 'LinkedLocNotFound', 'ReplacerLocNotFound', 'AlreadyVoid', 'ReplacerLocAlreadyVoid', 'ReplacerLocAlreadyReplacing', 'CannotMutateVoid', 'UnexpectedRequester', 'ReplacerLocWrongType', 'InvalidSubmitter', 'CollectionHasNoLimit', 'WrongCollectionLoc', 'CollectionItemAlreadyExists', 'CollectionItemTooMuchData', 'CollectionLimitsReached', 'MetadataItemInvalid', 'FileInvalid', 'LocLinkInvalid', 'CannotUpload', 'MustUpload', 'DuplicateFile', 'MissingToken', 'MissingFiles', 'TermsAndConditionsLocNotFound', 'TermsAndConditionsLocNotClosed', 'TermsAndConditionsLocVoid']
  },
  /**
   * Lookup196: pallet_verified_recovery::pallet::Error<T>
   **/
  PalletVerifiedRecoveryError: {
    _enum: ['InvalidLegalOfficers', 'MissingIdentityLoc']
  },
  /**
   * Lookup197: pallet_logion_vault::pallet::Error<T>
   **/
  PalletLogionVaultError: {
    _enum: ['InvalidSignatories', 'WrongInitiator']
  },
  /**
   * Lookup199: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup200: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup201: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup204: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup205: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup206: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup207: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup210: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup211: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup212: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup213: logion_node_runtime::Runtime
   **/
  LogionNodeRuntimeRuntime: 'Null'
};
