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
   * Lookup19: frame_system::EventRecord<logion_runtime::RuntimeEvent, primitive_types::H256>
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
        hash_: 'H256',
      },
      UpgradeAuthorized: {
        codeHash: 'H256',
        checkVersion: 'bool'
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
   * Lookup31: cumulus_pallet_parachain_system::pallet::Event<T>
   **/
  CumulusPalletParachainSystemEvent: {
    _enum: {
      ValidationFunctionStored: 'Null',
      ValidationFunctionApplied: {
        relayChainBlockNum: 'u32',
      },
      ValidationFunctionDiscarded: 'Null',
      DownwardMessagesReceived: {
        count: 'u32',
      },
      DownwardMessagesProcessed: {
        weightUsed: 'SpWeightsWeightV2Weight',
        dmqHead: 'H256',
      },
      UpwardMessageSent: {
        messageHash: 'Option<[u8;32]>'
      }
    }
  },
  /**
   * Lookup33: pallet_balances::pallet::Event<T, I>
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
        amount: 'u128',
      },
      TotalIssuanceForced: {
        _alias: {
          new_: 'new',
        },
        old: 'u128',
        new_: 'u128'
      }
    }
  },
  /**
   * Lookup34: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup35: pallet_transaction_payment::pallet::Event<T>
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
   * Lookup36: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        _alias: {
          new_: 'new',
        },
        old: 'Option<AccountId32>',
        new_: 'AccountId32',
      },
      KeyRemoved: 'Null',
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup40: pallet_treasury::pallet::Event<T, I>
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
   * Lookup42: pallet_collator_selection::pallet::Event<T>
   **/
  PalletCollatorSelectionEvent: {
    _enum: {
      NewInvulnerables: {
        invulnerables: 'Vec<AccountId32>',
      },
      InvulnerableAdded: {
        accountId: 'AccountId32',
      },
      InvulnerableRemoved: {
        accountId: 'AccountId32',
      },
      NewDesiredCandidates: {
        desiredCandidates: 'u32',
      },
      NewCandidacyBond: {
        bondAmount: 'u128',
      },
      CandidateAdded: {
        accountId: 'AccountId32',
        deposit: 'u128',
      },
      CandidateBondUpdated: {
        accountId: 'AccountId32',
        deposit: 'u128',
      },
      CandidateRemoved: {
        accountId: 'AccountId32',
      },
      CandidateReplaced: {
        _alias: {
          new_: 'new',
        },
        old: 'AccountId32',
        new_: 'AccountId32',
        deposit: 'u128',
      },
      InvalidInvulnerableSkipped: {
        accountId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup44: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup45: cumulus_pallet_xcmp_queue::pallet::Event<T>
   **/
  CumulusPalletXcmpQueueEvent: {
    _enum: {
      XcmpMessageSent: {
        messageHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup46: pallet_xcm::pallet::Event<T>
   **/
  PalletXcmEvent: {
    _enum: {
      Attempted: {
        outcome: 'StagingXcmV4TraitsOutcome',
      },
      Sent: {
        origin: 'StagingXcmV4Location',
        destination: 'StagingXcmV4Location',
        message: 'StagingXcmV4Xcm',
        messageId: '[u8;32]',
      },
      UnexpectedResponse: {
        origin: 'StagingXcmV4Location',
        queryId: 'u64',
      },
      ResponseReady: {
        queryId: 'u64',
        response: 'StagingXcmV4Response',
      },
      Notified: {
        queryId: 'u64',
        palletIndex: 'u8',
        callIndex: 'u8',
      },
      NotifyOverweight: {
        queryId: 'u64',
        palletIndex: 'u8',
        callIndex: 'u8',
        actualWeight: 'SpWeightsWeightV2Weight',
        maxBudgetedWeight: 'SpWeightsWeightV2Weight',
      },
      NotifyDispatchError: {
        queryId: 'u64',
        palletIndex: 'u8',
        callIndex: 'u8',
      },
      NotifyDecodeFailed: {
        queryId: 'u64',
        palletIndex: 'u8',
        callIndex: 'u8',
      },
      InvalidResponder: {
        origin: 'StagingXcmV4Location',
        queryId: 'u64',
        expectedLocation: 'Option<StagingXcmV4Location>',
      },
      InvalidResponderVersion: {
        origin: 'StagingXcmV4Location',
        queryId: 'u64',
      },
      ResponseTaken: {
        queryId: 'u64',
      },
      AssetsTrapped: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        origin: 'StagingXcmV4Location',
        assets: 'XcmVersionedAssets',
      },
      VersionChangeNotified: {
        destination: 'StagingXcmV4Location',
        result: 'u32',
        cost: 'StagingXcmV4AssetAssets',
        messageId: '[u8;32]',
      },
      SupportedVersionChanged: {
        location: 'StagingXcmV4Location',
        version: 'u32',
      },
      NotifyTargetSendFail: {
        location: 'StagingXcmV4Location',
        queryId: 'u64',
        error: 'XcmV3TraitsError',
      },
      NotifyTargetMigrationFail: {
        location: 'XcmVersionedLocation',
        queryId: 'u64',
      },
      InvalidQuerierVersion: {
        origin: 'StagingXcmV4Location',
        queryId: 'u64',
      },
      InvalidQuerier: {
        origin: 'StagingXcmV4Location',
        queryId: 'u64',
        expectedQuerier: 'StagingXcmV4Location',
        maybeActualQuerier: 'Option<StagingXcmV4Location>',
      },
      VersionNotifyStarted: {
        destination: 'StagingXcmV4Location',
        cost: 'StagingXcmV4AssetAssets',
        messageId: '[u8;32]',
      },
      VersionNotifyRequested: {
        destination: 'StagingXcmV4Location',
        cost: 'StagingXcmV4AssetAssets',
        messageId: '[u8;32]',
      },
      VersionNotifyUnrequested: {
        destination: 'StagingXcmV4Location',
        cost: 'StagingXcmV4AssetAssets',
        messageId: '[u8;32]',
      },
      FeesPaid: {
        paying: 'StagingXcmV4Location',
        fees: 'StagingXcmV4AssetAssets',
      },
      AssetsClaimed: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        origin: 'StagingXcmV4Location',
        assets: 'XcmVersionedAssets',
      },
      VersionMigrationFinished: {
        version: 'u32'
      }
    }
  },
  /**
   * Lookup47: staging_xcm::v4::traits::Outcome
   **/
  StagingXcmV4TraitsOutcome: {
    _enum: {
      Complete: {
        used: 'SpWeightsWeightV2Weight',
      },
      Incomplete: {
        used: 'SpWeightsWeightV2Weight',
        error: 'XcmV3TraitsError',
      },
      Error: {
        error: 'XcmV3TraitsError'
      }
    }
  },
  /**
   * Lookup48: xcm::v3::traits::Error
   **/
  XcmV3TraitsError: {
    _enum: {
      Overflow: 'Null',
      Unimplemented: 'Null',
      UntrustedReserveLocation: 'Null',
      UntrustedTeleportLocation: 'Null',
      LocationFull: 'Null',
      LocationNotInvertible: 'Null',
      BadOrigin: 'Null',
      InvalidLocation: 'Null',
      AssetNotFound: 'Null',
      FailedToTransactAsset: 'Null',
      NotWithdrawable: 'Null',
      LocationCannotHold: 'Null',
      ExceedsMaxMessageSize: 'Null',
      DestinationUnsupported: 'Null',
      Transport: 'Null',
      Unroutable: 'Null',
      UnknownClaim: 'Null',
      FailedToDecode: 'Null',
      MaxWeightInvalid: 'Null',
      NotHoldingFees: 'Null',
      TooExpensive: 'Null',
      Trap: 'u64',
      ExpectationFalse: 'Null',
      PalletNotFound: 'Null',
      NameMismatch: 'Null',
      VersionIncompatible: 'Null',
      HoldingWouldOverflow: 'Null',
      ExportError: 'Null',
      ReanchorFailed: 'Null',
      NoDeal: 'Null',
      FeesNotMet: 'Null',
      LockError: 'Null',
      NoPermission: 'Null',
      Unanchored: 'Null',
      NotDepositable: 'Null',
      UnhandledXcmVersion: 'Null',
      WeightLimitReached: 'SpWeightsWeightV2Weight',
      Barrier: 'Null',
      WeightNotComputable: 'Null',
      ExceedsStackLimit: 'Null'
    }
  },
  /**
   * Lookup49: staging_xcm::v4::location::Location
   **/
  StagingXcmV4Location: {
    parents: 'u8',
    interior: 'StagingXcmV4Junctions'
  },
  /**
   * Lookup50: staging_xcm::v4::junctions::Junctions
   **/
  StagingXcmV4Junctions: {
    _enum: {
      Here: 'Null',
      X1: '[Lookup52;1]',
      X2: '[Lookup52;2]',
      X3: '[Lookup52;3]',
      X4: '[Lookup52;4]',
      X5: '[Lookup52;5]',
      X6: '[Lookup52;6]',
      X7: '[Lookup52;7]',
      X8: '[Lookup52;8]'
    }
  },
  /**
   * Lookup52: staging_xcm::v4::junction::Junction
   **/
  StagingXcmV4Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'Option<StagingXcmV4JunctionNetworkId>',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'Option<StagingXcmV4JunctionNetworkId>',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'Option<StagingXcmV4JunctionNetworkId>',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: {
        length: 'u8',
        data: '[u8;32]',
      },
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV3JunctionBodyId',
        part: 'XcmV3JunctionBodyPart',
      },
      GlobalConsensus: 'StagingXcmV4JunctionNetworkId'
    }
  },
  /**
   * Lookup55: staging_xcm::v4::junction::NetworkId
   **/
  StagingXcmV4JunctionNetworkId: {
    _enum: {
      ByGenesis: '[u8;32]',
      ByFork: {
        blockNumber: 'u64',
        blockHash: '[u8;32]',
      },
      Polkadot: 'Null',
      Kusama: 'Null',
      Westend: 'Null',
      Rococo: 'Null',
      Wococo: 'Null',
      Ethereum: {
        chainId: 'Compact<u64>',
      },
      BitcoinCore: 'Null',
      BitcoinCash: 'Null',
      PolkadotBulletin: 'Null'
    }
  },
  /**
   * Lookup58: xcm::v3::junction::BodyId
   **/
  XcmV3JunctionBodyId: {
    _enum: {
      Unit: 'Null',
      Moniker: '[u8;4]',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup59: xcm::v3::junction::BodyPart
   **/
  XcmV3JunctionBodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup67: staging_xcm::v4::Xcm<Call>
   **/
  StagingXcmV4Xcm: 'Vec<StagingXcmV4Instruction>',
  /**
   * Lookup69: staging_xcm::v4::Instruction<Call>
   **/
  StagingXcmV4Instruction: {
    _enum: {
      WithdrawAsset: 'StagingXcmV4AssetAssets',
      ReserveAssetDeposited: 'StagingXcmV4AssetAssets',
      ReceiveTeleportedAsset: 'StagingXcmV4AssetAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'StagingXcmV4Response',
        maxWeight: 'SpWeightsWeightV2Weight',
        querier: 'Option<StagingXcmV4Location>',
      },
      TransferAsset: {
        assets: 'StagingXcmV4AssetAssets',
        beneficiary: 'StagingXcmV4Location',
      },
      TransferReserveAsset: {
        assets: 'StagingXcmV4AssetAssets',
        dest: 'StagingXcmV4Location',
        xcm: 'StagingXcmV4Xcm',
      },
      Transact: {
        originKind: 'XcmV2OriginKind',
        requireWeightAtMost: 'SpWeightsWeightV2Weight',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'StagingXcmV4Junctions',
      ReportError: 'StagingXcmV4QueryResponseInfo',
      DepositAsset: {
        assets: 'StagingXcmV4AssetAssetFilter',
        beneficiary: 'StagingXcmV4Location',
      },
      DepositReserveAsset: {
        assets: 'StagingXcmV4AssetAssetFilter',
        dest: 'StagingXcmV4Location',
        xcm: 'StagingXcmV4Xcm',
      },
      ExchangeAsset: {
        give: 'StagingXcmV4AssetAssetFilter',
        want: 'StagingXcmV4AssetAssets',
        maximal: 'bool',
      },
      InitiateReserveWithdraw: {
        assets: 'StagingXcmV4AssetAssetFilter',
        reserve: 'StagingXcmV4Location',
        xcm: 'StagingXcmV4Xcm',
      },
      InitiateTeleport: {
        assets: 'StagingXcmV4AssetAssetFilter',
        dest: 'StagingXcmV4Location',
        xcm: 'StagingXcmV4Xcm',
      },
      ReportHolding: {
        responseInfo: 'StagingXcmV4QueryResponseInfo',
        assets: 'StagingXcmV4AssetAssetFilter',
      },
      BuyExecution: {
        fees: 'StagingXcmV4Asset',
        weightLimit: 'XcmV3WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'StagingXcmV4Xcm',
      SetAppendix: 'StagingXcmV4Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'StagingXcmV4AssetAssets',
        ticket: 'StagingXcmV4Location',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'SpWeightsWeightV2Weight',
      },
      UnsubscribeVersion: 'Null',
      BurnAsset: 'StagingXcmV4AssetAssets',
      ExpectAsset: 'StagingXcmV4AssetAssets',
      ExpectOrigin: 'Option<StagingXcmV4Location>',
      ExpectError: 'Option<(u32,XcmV3TraitsError)>',
      ExpectTransactStatus: 'XcmV3MaybeErrorCode',
      QueryPallet: {
        moduleName: 'Bytes',
        responseInfo: 'StagingXcmV4QueryResponseInfo',
      },
      ExpectPallet: {
        index: 'Compact<u32>',
        name: 'Bytes',
        moduleName: 'Bytes',
        crateMajor: 'Compact<u32>',
        minCrateMinor: 'Compact<u32>',
      },
      ReportTransactStatus: 'StagingXcmV4QueryResponseInfo',
      ClearTransactStatus: 'Null',
      UniversalOrigin: 'StagingXcmV4Junction',
      ExportMessage: {
        network: 'StagingXcmV4JunctionNetworkId',
        destination: 'StagingXcmV4Junctions',
        xcm: 'StagingXcmV4Xcm',
      },
      LockAsset: {
        asset: 'StagingXcmV4Asset',
        unlocker: 'StagingXcmV4Location',
      },
      UnlockAsset: {
        asset: 'StagingXcmV4Asset',
        target: 'StagingXcmV4Location',
      },
      NoteUnlockable: {
        asset: 'StagingXcmV4Asset',
        owner: 'StagingXcmV4Location',
      },
      RequestUnlock: {
        asset: 'StagingXcmV4Asset',
        locker: 'StagingXcmV4Location',
      },
      SetFeesMode: {
        jitWithdraw: 'bool',
      },
      SetTopic: '[u8;32]',
      ClearTopic: 'Null',
      AliasOrigin: 'StagingXcmV4Location',
      UnpaidExecution: {
        weightLimit: 'XcmV3WeightLimit',
        checkOrigin: 'Option<StagingXcmV4Location>'
      }
    }
  },
  /**
   * Lookup70: staging_xcm::v4::asset::Assets
   **/
  StagingXcmV4AssetAssets: 'Vec<StagingXcmV4Asset>',
  /**
   * Lookup72: staging_xcm::v4::asset::Asset
   **/
  StagingXcmV4Asset: {
    id: 'StagingXcmV4AssetAssetId',
    fun: 'StagingXcmV4AssetFungibility'
  },
  /**
   * Lookup73: staging_xcm::v4::asset::AssetId
   **/
  StagingXcmV4AssetAssetId: 'StagingXcmV4Location',
  /**
   * Lookup74: staging_xcm::v4::asset::Fungibility
   **/
  StagingXcmV4AssetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'StagingXcmV4AssetAssetInstance'
    }
  },
  /**
   * Lookup75: staging_xcm::v4::asset::AssetInstance
   **/
  StagingXcmV4AssetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]'
    }
  },
  /**
   * Lookup78: staging_xcm::v4::Response
   **/
  StagingXcmV4Response: {
    _enum: {
      Null: 'Null',
      Assets: 'StagingXcmV4AssetAssets',
      ExecutionResult: 'Option<(u32,XcmV3TraitsError)>',
      Version: 'u32',
      PalletsInfo: 'Vec<StagingXcmV4PalletInfo>',
      DispatchResult: 'XcmV3MaybeErrorCode'
    }
  },
  /**
   * Lookup82: staging_xcm::v4::PalletInfo
   **/
  StagingXcmV4PalletInfo: {
    index: 'Compact<u32>',
    name: 'Bytes',
    moduleName: 'Bytes',
    major: 'Compact<u32>',
    minor: 'Compact<u32>',
    patch: 'Compact<u32>'
  },
  /**
   * Lookup85: xcm::v3::MaybeErrorCode
   **/
  XcmV3MaybeErrorCode: {
    _enum: {
      Success: 'Null',
      Error: 'Bytes',
      TruncatedError: 'Bytes'
    }
  },
  /**
   * Lookup88: xcm::v2::OriginKind
   **/
  XcmV2OriginKind: {
    _enum: ['Native', 'SovereignAccount', 'Superuser', 'Xcm']
  },
  /**
   * Lookup89: xcm::double_encoded::DoubleEncoded<T>
   **/
  XcmDoubleEncoded: {
    encoded: 'Bytes'
  },
  /**
   * Lookup90: staging_xcm::v4::QueryResponseInfo
   **/
  StagingXcmV4QueryResponseInfo: {
    destination: 'StagingXcmV4Location',
    queryId: 'Compact<u64>',
    maxWeight: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup91: staging_xcm::v4::asset::AssetFilter
   **/
  StagingXcmV4AssetAssetFilter: {
    _enum: {
      Definite: 'StagingXcmV4AssetAssets',
      Wild: 'StagingXcmV4AssetWildAsset'
    }
  },
  /**
   * Lookup92: staging_xcm::v4::asset::WildAsset
   **/
  StagingXcmV4AssetWildAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'StagingXcmV4AssetAssetId',
        fun: 'StagingXcmV4AssetWildFungibility',
      },
      AllCounted: 'Compact<u32>',
      AllOfCounted: {
        id: 'StagingXcmV4AssetAssetId',
        fun: 'StagingXcmV4AssetWildFungibility',
        count: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup93: staging_xcm::v4::asset::WildFungibility
   **/
  StagingXcmV4AssetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup94: xcm::v3::WeightLimit
   **/
  XcmV3WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'SpWeightsWeightV2Weight'
    }
  },
  /**
   * Lookup95: xcm::VersionedAssets
   **/
  XcmVersionedAssets: {
    _enum: {
      __Unused0: 'Null',
      V2: 'XcmV2MultiassetMultiAssets',
      __Unused2: 'Null',
      V3: 'XcmV3MultiassetMultiAssets',
      V4: 'StagingXcmV4AssetAssets'
    }
  },
  /**
   * Lookup96: xcm::v2::multiasset::MultiAssets
   **/
  XcmV2MultiassetMultiAssets: 'Vec<XcmV2MultiAsset>',
  /**
   * Lookup98: xcm::v2::multiasset::MultiAsset
   **/
  XcmV2MultiAsset: {
    id: 'XcmV2MultiassetAssetId',
    fun: 'XcmV2MultiassetFungibility'
  },
  /**
   * Lookup99: xcm::v2::multiasset::AssetId
   **/
  XcmV2MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV2MultiLocation',
      Abstract: 'Bytes'
    }
  },
  /**
   * Lookup100: xcm::v2::multilocation::MultiLocation
   **/
  XcmV2MultiLocation: {
    parents: 'u8',
    interior: 'XcmV2MultilocationJunctions'
  },
  /**
   * Lookup101: xcm::v2::multilocation::Junctions
   **/
  XcmV2MultilocationJunctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV2Junction',
      X2: '(XcmV2Junction,XcmV2Junction)',
      X3: '(XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X4: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X5: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X6: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X7: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X8: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)'
    }
  },
  /**
   * Lookup102: xcm::v2::junction::Junction
   **/
  XcmV2Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV2NetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV2NetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV2NetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV2BodyId',
        part: 'XcmV2BodyPart'
      }
    }
  },
  /**
   * Lookup103: xcm::v2::NetworkId
   **/
  XcmV2NetworkId: {
    _enum: {
      Any: 'Null',
      Named: 'Bytes',
      Polkadot: 'Null',
      Kusama: 'Null'
    }
  },
  /**
   * Lookup105: xcm::v2::BodyId
   **/
  XcmV2BodyId: {
    _enum: {
      Unit: 'Null',
      Named: 'Bytes',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup106: xcm::v2::BodyPart
   **/
  XcmV2BodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup107: xcm::v2::multiasset::Fungibility
   **/
  XcmV2MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV2MultiassetAssetInstance'
    }
  },
  /**
   * Lookup108: xcm::v2::multiasset::AssetInstance
   **/
  XcmV2MultiassetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]',
      Blob: 'Bytes'
    }
  },
  /**
   * Lookup109: xcm::v3::multiasset::MultiAssets
   **/
  XcmV3MultiassetMultiAssets: 'Vec<XcmV3MultiAsset>',
  /**
   * Lookup111: xcm::v3::multiasset::MultiAsset
   **/
  XcmV3MultiAsset: {
    id: 'XcmV3MultiassetAssetId',
    fun: 'XcmV3MultiassetFungibility'
  },
  /**
   * Lookup112: xcm::v3::multiasset::AssetId
   **/
  XcmV3MultiassetAssetId: {
    _enum: {
      Concrete: 'StagingXcmV3MultiLocation',
      Abstract: '[u8;32]'
    }
  },
  /**
   * Lookup113: staging_xcm::v3::multilocation::MultiLocation
   **/
  StagingXcmV3MultiLocation: {
    parents: 'u8',
    interior: 'XcmV3Junctions'
  },
  /**
   * Lookup114: xcm::v3::junctions::Junctions
   **/
  XcmV3Junctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV3Junction',
      X2: '(XcmV3Junction,XcmV3Junction)',
      X3: '(XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X4: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X5: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X6: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X7: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X8: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)'
    }
  },
  /**
   * Lookup115: xcm::v3::junction::Junction
   **/
  XcmV3Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'Option<XcmV3JunctionNetworkId>',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'Option<XcmV3JunctionNetworkId>',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'Option<XcmV3JunctionNetworkId>',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: {
        length: 'u8',
        data: '[u8;32]',
      },
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV3JunctionBodyId',
        part: 'XcmV3JunctionBodyPart',
      },
      GlobalConsensus: 'XcmV3JunctionNetworkId'
    }
  },
  /**
   * Lookup117: xcm::v3::junction::NetworkId
   **/
  XcmV3JunctionNetworkId: {
    _enum: {
      ByGenesis: '[u8;32]',
      ByFork: {
        blockNumber: 'u64',
        blockHash: '[u8;32]',
      },
      Polkadot: 'Null',
      Kusama: 'Null',
      Westend: 'Null',
      Rococo: 'Null',
      Wococo: 'Null',
      Ethereum: {
        chainId: 'Compact<u64>',
      },
      BitcoinCore: 'Null',
      BitcoinCash: 'Null',
      PolkadotBulletin: 'Null'
    }
  },
  /**
   * Lookup118: xcm::v3::multiasset::Fungibility
   **/
  XcmV3MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV3MultiassetAssetInstance'
    }
  },
  /**
   * Lookup119: xcm::v3::multiasset::AssetInstance
   **/
  XcmV3MultiassetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]'
    }
  },
  /**
   * Lookup120: xcm::VersionedLocation
   **/
  XcmVersionedLocation: {
    _enum: {
      __Unused0: 'Null',
      V2: 'XcmV2MultiLocation',
      __Unused2: 'Null',
      V3: 'StagingXcmV3MultiLocation',
      V4: 'StagingXcmV4Location'
    }
  },
  /**
   * Lookup121: cumulus_pallet_xcm::pallet::Event<T>
   **/
  CumulusPalletXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;32]',
      UnsupportedVersion: '[u8;32]',
      ExecutedDownward: '([u8;32],StagingXcmV4TraitsOutcome)'
    }
  },
  /**
   * Lookup122: pallet_message_queue::pallet::Event<T>
   **/
  PalletMessageQueueEvent: {
    _enum: {
      ProcessingFailed: {
        id: 'H256',
        origin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        error: 'FrameSupportMessagesProcessMessageError',
      },
      Processed: {
        id: 'H256',
        origin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        weightUsed: 'SpWeightsWeightV2Weight',
        success: 'bool',
      },
      OverweightEnqueued: {
        id: '[u8;32]',
        origin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        pageIndex: 'u32',
        messageIndex: 'u32',
      },
      PageReaped: {
        origin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        index: 'u32'
      }
    }
  },
  /**
   * Lookup123: cumulus_primitives_core::AggregateMessageOrigin
   **/
  CumulusPrimitivesCoreAggregateMessageOrigin: {
    _enum: {
      Here: 'Null',
      Parent: 'Null',
      Sibling: 'u32'
    }
  },
  /**
   * Lookup125: frame_support::traits::messages::ProcessMessageError
   **/
  FrameSupportMessagesProcessMessageError: {
    _enum: {
      BadFormat: 'Null',
      Corrupt: 'Null',
      Unsupported: 'Null',
      Overweight: 'SpWeightsWeightV2Weight',
      Yield: 'Null'
    }
  },
  /**
   * Lookup126: pallet_utility::pallet::Event
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
   * Lookup127: pallet_vesting::pallet::Event<T>
   **/
  PalletVestingEvent: {
    _enum: {
      VestingUpdated: {
        account: 'AccountId32',
        unvested: 'u128',
      },
      VestingCompleted: {
        account: 'AccountId32'
      }
    }
  },
  /**
   * Lookup128: pallet_logion_loc::pallet::Event<T>
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
      TokensRecordFeeWithdrawn: '(AccountId32,u128,LogionSharedBeneficiary,u128)',
      LocImported: 'u128',
      ItemImported: '(u128,H256)',
      TokensRecordImported: '(u128,H256)',
      SponsorshipImported: 'u128'
    }
  },
  /**
   * Lookup129: pallet_logion_loc::SupportedAccountId<sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocSupportedAccountId: {
    _enum: {
      None: 'Null',
      Polkadot: 'AccountId32',
      Other: 'PalletLogionLocOtherAccountId'
    }
  },
  /**
   * Lookup131: pallet_logion_loc::OtherAccountId<primitive_types::H160>
   **/
  PalletLogionLocOtherAccountId: {
    _enum: {
      Ethereum: 'H160'
    }
  },
  /**
   * Lookup132: logion_shared::Beneficiary<sp_core::crypto::AccountId32>
   **/
  LogionSharedBeneficiary: {
    _enum: {
      Other: 'Null',
      LegalOfficer: 'AccountId32'
    }
  },
  /**
   * Lookup133: pallet_lo_authority_list::pallet::Event<T>
   **/
  PalletLoAuthorityListEvent: {
    _enum: {
      LoAdded: 'AccountId32',
      LoRemoved: 'AccountId32',
      LoUpdated: 'AccountId32',
      LoImported: 'AccountId32'
    }
  },
  /**
   * Lookup134: pallet_logion_vote::pallet::Event<T>
   **/
  PalletLogionVoteEvent: {
    _enum: {
      VoteCreated: '(u64,Vec<AccountId32>)',
      VoteUpdated: '(u64,PalletLogionVoteBallot,bool,bool)'
    }
  },
  /**
   * Lookup135: pallet_logion_vote::Ballot<sp_core::crypto::AccountId32>
   **/
  PalletLogionVoteBallot: {
    voter: 'AccountId32',
    status: 'PalletLogionVoteBallotStatus'
  },
  /**
   * Lookup136: pallet_logion_vote::BallotStatus
   **/
  PalletLogionVoteBallotStatus: {
    _enum: ['NotVoted', 'VotedYes', 'VotedNo']
  },
  /**
   * Lookup137: pallet_recovery::pallet::Event<T>
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
   * Lookup138: pallet_verified_recovery::pallet::Event<T>
   **/
  PalletVerifiedRecoveryEvent: 'Null',
  /**
   * Lookup139: pallet_multisig::pallet::Event<T>
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
   * Lookup140: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup141: pallet_logion_vault::pallet::Event<T>
   **/
  PalletLogionVaultEvent: 'Null',
  /**
   * Lookup142: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup146: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup148: frame_system::CodeUpgradeAuthorization<T>
   **/
  FrameSystemCodeUpgradeAuthorization: {
    codeHash: 'H256',
    checkVersion: 'bool'
  },
  /**
   * Lookup149: frame_system::pallet::Call<T>
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
        remark: 'Bytes',
      },
      __Unused8: 'Null',
      authorize_upgrade: {
        codeHash: 'H256',
      },
      authorize_upgrade_without_checks: {
        codeHash: 'H256',
      },
      apply_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup153: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup154: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup155: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup157: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup158: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup159: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup160: sp_version::RuntimeVersion
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
   * Lookup165: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup167: cumulus_pallet_parachain_system::unincluded_segment::Ancestor<primitive_types::H256>
   **/
  CumulusPalletParachainSystemUnincludedSegmentAncestor: {
    usedBandwidth: 'CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth',
    paraHeadHash: 'Option<H256>',
    consumedGoAheadSignal: 'Option<PolkadotPrimitivesV6UpgradeGoAhead>'
  },
  /**
   * Lookup168: cumulus_pallet_parachain_system::unincluded_segment::UsedBandwidth
   **/
  CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth: {
    umpMsgCount: 'u32',
    umpTotalBytes: 'u32',
    hrmpOutgoing: 'BTreeMap<u32, CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate>'
  },
  /**
   * Lookup170: cumulus_pallet_parachain_system::unincluded_segment::HrmpChannelUpdate
   **/
  CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate: {
    msgCount: 'u32',
    totalBytes: 'u32'
  },
  /**
   * Lookup175: polkadot_primitives::v6::UpgradeGoAhead
   **/
  PolkadotPrimitivesV6UpgradeGoAhead: {
    _enum: ['Abort', 'GoAhead']
  },
  /**
   * Lookup176: cumulus_pallet_parachain_system::unincluded_segment::SegmentTracker<primitive_types::H256>
   **/
  CumulusPalletParachainSystemUnincludedSegmentSegmentTracker: {
    usedBandwidth: 'CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth',
    hrmpWatermark: 'Option<u32>',
    consumedGoAheadSignal: 'Option<PolkadotPrimitivesV6UpgradeGoAhead>'
  },
  /**
   * Lookup178: polkadot_primitives::v6::PersistedValidationData<primitive_types::H256, N>
   **/
  PolkadotPrimitivesV6PersistedValidationData: {
    parentHead: 'Bytes',
    relayParentNumber: 'u32',
    relayParentStorageRoot: 'H256',
    maxPovSize: 'u32'
  },
  /**
   * Lookup181: polkadot_primitives::v6::UpgradeRestriction
   **/
  PolkadotPrimitivesV6UpgradeRestriction: {
    _enum: ['Present']
  },
  /**
   * Lookup182: sp_trie::storage_proof::StorageProof
   **/
  SpTrieStorageProof: {
    trieNodes: 'BTreeSet<Bytes>'
  },
  /**
   * Lookup184: cumulus_pallet_parachain_system::relay_state_snapshot::MessagingStateSnapshot
   **/
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: {
    dmqMqcHead: 'H256',
    relayDispatchQueueRemainingCapacity: 'CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity',
    ingressChannels: 'Vec<(u32,PolkadotPrimitivesV6AbridgedHrmpChannel)>',
    egressChannels: 'Vec<(u32,PolkadotPrimitivesV6AbridgedHrmpChannel)>'
  },
  /**
   * Lookup185: cumulus_pallet_parachain_system::relay_state_snapshot::RelayDispatchQueueRemainingCapacity
   **/
  CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity: {
    remainingCount: 'u32',
    remainingSize: 'u32'
  },
  /**
   * Lookup188: polkadot_primitives::v6::AbridgedHrmpChannel
   **/
  PolkadotPrimitivesV6AbridgedHrmpChannel: {
    maxCapacity: 'u32',
    maxTotalSize: 'u32',
    maxMessageSize: 'u32',
    msgCount: 'u32',
    totalSize: 'u32',
    mqcHead: 'Option<H256>'
  },
  /**
   * Lookup189: polkadot_primitives::v6::AbridgedHostConfiguration
   **/
  PolkadotPrimitivesV6AbridgedHostConfiguration: {
    maxCodeSize: 'u32',
    maxHeadDataSize: 'u32',
    maxUpwardQueueCount: 'u32',
    maxUpwardQueueSize: 'u32',
    maxUpwardMessageSize: 'u32',
    maxUpwardMessageNumPerCandidate: 'u32',
    hrmpMaxMessageNumPerCandidate: 'u32',
    validationUpgradeCooldown: 'u32',
    validationUpgradeDelay: 'u32',
    asyncBackingParams: 'PolkadotPrimitivesV6AsyncBackingAsyncBackingParams'
  },
  /**
   * Lookup190: polkadot_primitives::v6::async_backing::AsyncBackingParams
   **/
  PolkadotPrimitivesV6AsyncBackingAsyncBackingParams: {
    maxCandidateDepth: 'u32',
    allowedAncestryLen: 'u32'
  },
  /**
   * Lookup196: polkadot_core_primitives::OutboundHrmpMessage<polkadot_parachain_primitives::primitives::Id>
   **/
  PolkadotCorePrimitivesOutboundHrmpMessage: {
    recipient: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup198: cumulus_pallet_parachain_system::pallet::Call<T>
   **/
  CumulusPalletParachainSystemCall: {
    _enum: {
      set_validation_data: {
        data: 'CumulusPrimitivesParachainInherentParachainInherentData',
      },
      sudo_send_upward_message: {
        message: 'Bytes',
      },
      authorize_upgrade: {
        codeHash: 'H256',
        checkVersion: 'bool',
      },
      enact_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup199: cumulus_primitives_parachain_inherent::ParachainInherentData
   **/
  CumulusPrimitivesParachainInherentParachainInherentData: {
    validationData: 'PolkadotPrimitivesV6PersistedValidationData',
    relayChainState: 'SpTrieStorageProof',
    downwardMessages: 'Vec<PolkadotCorePrimitivesInboundDownwardMessage>',
    horizontalMessages: 'BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>'
  },
  /**
   * Lookup201: polkadot_core_primitives::InboundDownwardMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundDownwardMessage: {
    sentAt: 'u32',
    msg: 'Bytes'
  },
  /**
   * Lookup204: polkadot_core_primitives::InboundHrmpMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundHrmpMessage: {
    sentAt: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup207: cumulus_pallet_parachain_system::pallet::Error<T>
   **/
  CumulusPalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup208: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup209: staging_parachain_info::pallet::Call<T>
   **/
  StagingParachainInfoCall: 'Null',
  /**
   * Lookup211: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup212: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup215: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup219: logion_runtime::RuntimeHoldReason
   **/
  LogionRuntimeRuntimeHoldReason: 'Null',
  /**
   * Lookup222: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup224: pallet_balances::pallet::Call<T, I>
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
        newFree: 'Compact<u128>',
      },
      force_adjust_total_issuance: {
        direction: 'PalletBalancesAdjustmentDirection',
        delta: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup227: pallet_balances::types::AdjustmentDirection
   **/
  PalletBalancesAdjustmentDirection: {
    _enum: ['Increase', 'Decrease']
  },
  /**
   * Lookup228: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'Expendability', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves', 'TooManyHolds', 'TooManyFreezes', 'IssuanceDeactivated', 'DeltaZero']
  },
  /**
   * Lookup229: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup230: pallet_sudo::pallet::Call<T>
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
        call: 'Call',
      },
      remove_key: 'Null'
    }
  },
  /**
   * Lookup232: pallet_treasury::pallet::Call<T, I>
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
   * Lookup234: pallet_collator_selection::pallet::Call<T>
   **/
  PalletCollatorSelectionCall: {
    _enum: {
      set_invulnerables: {
        _alias: {
          new_: 'new',
        },
        new_: 'Vec<AccountId32>',
      },
      set_desired_candidates: {
        max: 'u32',
      },
      set_candidacy_bond: {
        bond: 'u128',
      },
      register_as_candidate: 'Null',
      leave_intent: 'Null',
      add_invulnerable: {
        who: 'AccountId32',
      },
      remove_invulnerable: {
        who: 'AccountId32',
      },
      update_bond: {
        newDeposit: 'u128',
      },
      take_candidate_slot: {
        deposit: 'u128',
        target: 'AccountId32'
      }
    }
  },
  /**
   * Lookup235: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'LogionRuntimeSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup236: logion_runtime::SessionKeys
   **/
  LogionRuntimeSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public'
  },
  /**
   * Lookup237: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup238: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup239: cumulus_pallet_xcmp_queue::pallet::Call<T>
   **/
  CumulusPalletXcmpQueueCall: {
    _enum: {
      __Unused0: 'Null',
      suspend_xcm_execution: 'Null',
      resume_xcm_execution: 'Null',
      update_suspend_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_drop_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_resume_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32'
      }
    }
  },
  /**
   * Lookup240: pallet_xcm::pallet::Call<T>
   **/
  PalletXcmCall: {
    _enum: {
      send: {
        dest: 'XcmVersionedLocation',
        message: 'XcmVersionedXcm',
      },
      teleport_assets: {
        dest: 'XcmVersionedLocation',
        beneficiary: 'XcmVersionedLocation',
        assets: 'XcmVersionedAssets',
        feeAssetItem: 'u32',
      },
      reserve_transfer_assets: {
        dest: 'XcmVersionedLocation',
        beneficiary: 'XcmVersionedLocation',
        assets: 'XcmVersionedAssets',
        feeAssetItem: 'u32',
      },
      execute: {
        message: 'XcmVersionedXcm',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      force_xcm_version: {
        location: 'StagingXcmV4Location',
        version: 'u32',
      },
      force_default_xcm_version: {
        maybeXcmVersion: 'Option<u32>',
      },
      force_subscribe_version_notify: {
        location: 'XcmVersionedLocation',
      },
      force_unsubscribe_version_notify: {
        location: 'XcmVersionedLocation',
      },
      limited_reserve_transfer_assets: {
        dest: 'XcmVersionedLocation',
        beneficiary: 'XcmVersionedLocation',
        assets: 'XcmVersionedAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV3WeightLimit',
      },
      limited_teleport_assets: {
        dest: 'XcmVersionedLocation',
        beneficiary: 'XcmVersionedLocation',
        assets: 'XcmVersionedAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV3WeightLimit',
      },
      force_suspension: {
        suspended: 'bool',
      },
      transfer_assets: {
        dest: 'XcmVersionedLocation',
        beneficiary: 'XcmVersionedLocation',
        assets: 'XcmVersionedAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV3WeightLimit'
      }
    }
  },
  /**
   * Lookup241: xcm::VersionedXcm<RuntimeCall>
   **/
  XcmVersionedXcm: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      V2: 'XcmV2Xcm',
      V3: 'XcmV3Xcm',
      V4: 'StagingXcmV4Xcm'
    }
  },
  /**
   * Lookup242: xcm::v2::Xcm<RuntimeCall>
   **/
  XcmV2Xcm: 'Vec<XcmV2Instruction>',
  /**
   * Lookup244: xcm::v2::Instruction<RuntimeCall>
   **/
  XcmV2Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV2MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV2MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV2MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV2Response',
        maxWeight: 'Compact<u64>',
      },
      TransferAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        beneficiary: 'XcmV2MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      Transact: {
        originType: 'XcmV2OriginKind',
        requireWeightAtMost: 'Compact<u64>',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'XcmV2MultilocationJunctions',
      ReportError: {
        queryId: 'Compact<u64>',
        dest: 'XcmV2MultiLocation',
        maxResponseWeight: 'Compact<u64>',
      },
      DepositAsset: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        beneficiary: 'XcmV2MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV2MultiassetMultiAssetFilter',
        receive: 'XcmV2MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        reserve: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV2MultiLocation',
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxResponseWeight: 'Compact<u64>',
      },
      BuyExecution: {
        fees: 'XcmV2MultiAsset',
        weightLimit: 'XcmV2WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV2Xcm',
      SetAppendix: 'XcmV2Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        ticket: 'XcmV2MultiLocation',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'Compact<u64>',
      },
      UnsubscribeVersion: 'Null'
    }
  },
  /**
   * Lookup245: xcm::v2::Response
   **/
  XcmV2Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV2MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV2TraitsError)>',
      Version: 'u32'
    }
  },
  /**
   * Lookup248: xcm::v2::traits::Error
   **/
  XcmV2TraitsError: {
    _enum: {
      Overflow: 'Null',
      Unimplemented: 'Null',
      UntrustedReserveLocation: 'Null',
      UntrustedTeleportLocation: 'Null',
      MultiLocationFull: 'Null',
      MultiLocationNotInvertible: 'Null',
      BadOrigin: 'Null',
      InvalidLocation: 'Null',
      AssetNotFound: 'Null',
      FailedToTransactAsset: 'Null',
      NotWithdrawable: 'Null',
      LocationCannotHold: 'Null',
      ExceedsMaxMessageSize: 'Null',
      DestinationUnsupported: 'Null',
      Transport: 'Null',
      Unroutable: 'Null',
      UnknownClaim: 'Null',
      FailedToDecode: 'Null',
      MaxWeightInvalid: 'Null',
      NotHoldingFees: 'Null',
      TooExpensive: 'Null',
      Trap: 'u64',
      UnhandledXcmVersion: 'Null',
      WeightLimitReached: 'u64',
      Barrier: 'Null',
      WeightNotComputable: 'Null'
    }
  },
  /**
   * Lookup249: xcm::v2::multiasset::MultiAssetFilter
   **/
  XcmV2MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV2MultiassetMultiAssets',
      Wild: 'XcmV2MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup250: xcm::v2::multiasset::WildMultiAsset
   **/
  XcmV2MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV2MultiassetAssetId',
        fun: 'XcmV2MultiassetWildFungibility'
      }
    }
  },
  /**
   * Lookup251: xcm::v2::multiasset::WildFungibility
   **/
  XcmV2MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup252: xcm::v2::WeightLimit
   **/
  XcmV2WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'Compact<u64>'
    }
  },
  /**
   * Lookup253: xcm::v3::Xcm<Call>
   **/
  XcmV3Xcm: 'Vec<XcmV3Instruction>',
  /**
   * Lookup255: xcm::v3::Instruction<Call>
   **/
  XcmV3Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV3MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV3MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV3MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV3Response',
        maxWeight: 'SpWeightsWeightV2Weight',
        querier: 'Option<StagingXcmV3MultiLocation>',
      },
      TransferAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        beneficiary: 'StagingXcmV3MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        dest: 'StagingXcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      Transact: {
        originKind: 'XcmV2OriginKind',
        requireWeightAtMost: 'SpWeightsWeightV2Weight',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'XcmV3Junctions',
      ReportError: 'XcmV3QueryResponseInfo',
      DepositAsset: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        beneficiary: 'StagingXcmV3MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        dest: 'StagingXcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV3MultiassetMultiAssetFilter',
        want: 'XcmV3MultiassetMultiAssets',
        maximal: 'bool',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        reserve: 'StagingXcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        dest: 'StagingXcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      ReportHolding: {
        responseInfo: 'XcmV3QueryResponseInfo',
        assets: 'XcmV3MultiassetMultiAssetFilter',
      },
      BuyExecution: {
        fees: 'XcmV3MultiAsset',
        weightLimit: 'XcmV3WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV3Xcm',
      SetAppendix: 'XcmV3Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        ticket: 'StagingXcmV3MultiLocation',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'SpWeightsWeightV2Weight',
      },
      UnsubscribeVersion: 'Null',
      BurnAsset: 'XcmV3MultiassetMultiAssets',
      ExpectAsset: 'XcmV3MultiassetMultiAssets',
      ExpectOrigin: 'Option<StagingXcmV3MultiLocation>',
      ExpectError: 'Option<(u32,XcmV3TraitsError)>',
      ExpectTransactStatus: 'XcmV3MaybeErrorCode',
      QueryPallet: {
        moduleName: 'Bytes',
        responseInfo: 'XcmV3QueryResponseInfo',
      },
      ExpectPallet: {
        index: 'Compact<u32>',
        name: 'Bytes',
        moduleName: 'Bytes',
        crateMajor: 'Compact<u32>',
        minCrateMinor: 'Compact<u32>',
      },
      ReportTransactStatus: 'XcmV3QueryResponseInfo',
      ClearTransactStatus: 'Null',
      UniversalOrigin: 'XcmV3Junction',
      ExportMessage: {
        network: 'XcmV3JunctionNetworkId',
        destination: 'XcmV3Junctions',
        xcm: 'XcmV3Xcm',
      },
      LockAsset: {
        asset: 'XcmV3MultiAsset',
        unlocker: 'StagingXcmV3MultiLocation',
      },
      UnlockAsset: {
        asset: 'XcmV3MultiAsset',
        target: 'StagingXcmV3MultiLocation',
      },
      NoteUnlockable: {
        asset: 'XcmV3MultiAsset',
        owner: 'StagingXcmV3MultiLocation',
      },
      RequestUnlock: {
        asset: 'XcmV3MultiAsset',
        locker: 'StagingXcmV3MultiLocation',
      },
      SetFeesMode: {
        jitWithdraw: 'bool',
      },
      SetTopic: '[u8;32]',
      ClearTopic: 'Null',
      AliasOrigin: 'StagingXcmV3MultiLocation',
      UnpaidExecution: {
        weightLimit: 'XcmV3WeightLimit',
        checkOrigin: 'Option<StagingXcmV3MultiLocation>'
      }
    }
  },
  /**
   * Lookup256: xcm::v3::Response
   **/
  XcmV3Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV3MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV3TraitsError)>',
      Version: 'u32',
      PalletsInfo: 'Vec<XcmV3PalletInfo>',
      DispatchResult: 'XcmV3MaybeErrorCode'
    }
  },
  /**
   * Lookup258: xcm::v3::PalletInfo
   **/
  XcmV3PalletInfo: {
    index: 'Compact<u32>',
    name: 'Bytes',
    moduleName: 'Bytes',
    major: 'Compact<u32>',
    minor: 'Compact<u32>',
    patch: 'Compact<u32>'
  },
  /**
   * Lookup262: xcm::v3::QueryResponseInfo
   **/
  XcmV3QueryResponseInfo: {
    destination: 'StagingXcmV3MultiLocation',
    queryId: 'Compact<u64>',
    maxWeight: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup263: xcm::v3::multiasset::MultiAssetFilter
   **/
  XcmV3MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV3MultiassetMultiAssets',
      Wild: 'XcmV3MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup264: xcm::v3::multiasset::WildMultiAsset
   **/
  XcmV3MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV3MultiassetAssetId',
        fun: 'XcmV3MultiassetWildFungibility',
      },
      AllCounted: 'Compact<u32>',
      AllOfCounted: {
        id: 'XcmV3MultiassetAssetId',
        fun: 'XcmV3MultiassetWildFungibility',
        count: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup265: xcm::v3::multiasset::WildFungibility
   **/
  XcmV3MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup277: cumulus_pallet_xcm::pallet::Call<T>
   **/
  CumulusPalletXcmCall: 'Null',
  /**
   * Lookup278: pallet_message_queue::pallet::Call<T>
   **/
  PalletMessageQueueCall: {
    _enum: {
      reap_page: {
        messageOrigin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        pageIndex: 'u32',
      },
      execute_overweight: {
        messageOrigin: 'CumulusPrimitivesCoreAggregateMessageOrigin',
        page: 'u32',
        index: 'u32',
        weightLimit: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup279: pallet_utility::pallet::Call<T>
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
        asOrigin: 'LogionRuntimeOriginCaller',
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
   * Lookup281: logion_runtime::OriginCaller
   **/
  LogionRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      __Unused2: 'Null',
      Void: 'SpCoreVoid',
      __Unused4: 'Null',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      __Unused27: 'Null',
      __Unused28: 'Null',
      __Unused29: 'Null',
      __Unused30: 'Null',
      PolkadotXcm: 'PalletXcmOrigin',
      CumulusXcm: 'CumulusPalletXcmOrigin'
    }
  },
  /**
   * Lookup282: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup283: pallet_xcm::pallet::Origin
   **/
  PalletXcmOrigin: {
    _enum: {
      Xcm: 'StagingXcmV4Location',
      Response: 'StagingXcmV4Location'
    }
  },
  /**
   * Lookup284: cumulus_pallet_xcm::pallet::Origin
   **/
  CumulusPalletXcmOrigin: {
    _enum: {
      Relay: 'Null',
      SiblingParachain: 'u32'
    }
  },
  /**
   * Lookup285: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup286: pallet_vesting::pallet::Call<T>
   **/
  PalletVestingCall: {
    _enum: {
      vest: 'Null',
      vest_other: {
        target: 'MultiAddress',
      },
      vested_transfer: {
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      force_vested_transfer: {
        source: 'MultiAddress',
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      merge_schedules: {
        schedule1Index: 'u32',
        schedule2Index: 'u32',
      },
      force_remove_vesting_schedule: {
        target: 'MultiAddress',
        scheduleIndex: 'u32'
      }
    }
  },
  /**
   * Lookup287: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
   **/
  PalletVestingVestingInfo: {
    locked: 'u128',
    perBlock: 'u128',
    startingBlock: 'u32'
  },
  /**
   * Lookup288: pallet_logion_loc::pallet::Call<T>
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
        chargeSubmitter: 'bool',
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
        autoAck: 'bool',
      },
      set_invited_contributor_selection: {
        locId: 'Compact<u128>',
        invitedContributor: 'AccountId32',
        selected: 'bool',
      },
      import_loc: {
        locId: 'Compact<u128>',
        requester: 'PalletLogionLocRequester',
        legalOfficer: 'AccountId32',
        locType: 'PalletLogionLocLocType',
        items: 'PalletLogionLocItems',
        collectionLastBlockSubmission: 'Option<u32>',
        collectionMaxSize: 'Option<u32>',
        collectionCanUpload: 'bool',
        valueFee: 'u128',
        legalFee: 'u128',
        collectionItemFee: 'u128',
        tokensRecordFee: 'u128',
        sponsorshipId: 'Option<u128>',
        seal: 'Option<H256>',
        voidInfo: 'Option<PalletLogionLocLocVoidInfo>',
        replacerOf: 'Option<u128>',
        closed: 'bool',
      },
      import_collection_item: {
        collectionLocId: 'Compact<u128>',
        itemId: 'H256',
        itemDescription: 'H256',
        itemFiles: 'Vec<PalletLogionLocCollectionItemFile>',
        itemToken: 'Option<PalletLogionLocCollectionItemToken>',
        restrictedDelivery: 'bool',
        termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>',
      },
      import_tokens_record: {
        collectionLocId: 'Compact<u128>',
        recordId: 'H256',
        description: 'H256',
        files: 'Vec<PalletLogionLocTokensRecordFile>',
        submitter: 'AccountId32',
      },
      import_invited_contributor_selection: {
        locId: 'Compact<u128>',
        invitedContributor: 'AccountId32',
      },
      import_verified_issuer: {
        legalOfficer: 'AccountId32',
        issuer: 'AccountId32',
        identityLocId: 'Compact<u128>',
      },
      import_verified_issuer_selection: {
        locId: 'Compact<u128>',
        issuer: 'AccountId32',
        locOwner: 'AccountId32',
      },
      import_sponsorship: {
        sponsorshipId: 'Compact<u128>',
        sponsor: 'AccountId32',
        sponsoredAccount: 'PalletLogionLocSupportedAccountId',
        legalOfficer: 'AccountId32',
        locId: 'Option<u128>'
      }
    }
  },
  /**
   * Lookup289: pallet_logion_loc::ItemsParams<LocId, sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocItemsParams: {
    metadata: 'Vec<PalletLogionLocMetadataItemParams>',
    files: 'Vec<PalletLogionLocFileParams>',
    links: 'Vec<PalletLogionLocLocLinkParams>'
  },
  /**
   * Lookup291: pallet_logion_loc::MetadataItemParams<sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocMetadataItemParams: {
    name: 'H256',
    value: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId'
  },
  /**
   * Lookup293: pallet_logion_loc::FileParams<primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
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
   * Lookup295: pallet_logion_loc::LocLinkParams<LocId, primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocLocLinkParams: {
    id: 'u128',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId'
  },
  /**
   * Lookup297: pallet_logion_loc::CollectionItemFile<primitive_types::H256>
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
   * Lookup299: pallet_logion_loc::CollectionItemToken<TokenIssuance, primitive_types::H256>
   **/
  PalletLogionLocCollectionItemToken: {
    tokenType: 'H256',
    tokenId: 'H256',
    tokenIssuance: 'u64'
  },
  /**
   * Lookup301: pallet_logion_loc::TermsAndConditionsElement<LocId, primitive_types::H256>
   **/
  PalletLogionLocTermsAndConditionsElement: {
    tcType: 'H256',
    tcLoc: 'u128',
    details: 'H256'
  },
  /**
   * Lookup303: pallet_logion_loc::TokensRecordFile<primitive_types::H256>
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
   * Lookup304: pallet_logion_loc::Requester<sp_core::crypto::AccountId32, LocId, primitive_types::H160>
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
   * Lookup305: pallet_logion_loc::LocType
   **/
  PalletLogionLocLocType: {
    _enum: ['Transaction', 'Identity', 'Collection']
  },
  /**
   * Lookup306: pallet_logion_loc::Items<LocId, sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocItems: {
    metadata: 'Vec<PalletLogionLocMetadataItem>',
    files: 'Vec<PalletLogionLocFile>',
    links: 'Vec<PalletLogionLocLocLink>'
  },
  /**
   * Lookup308: pallet_logion_loc::MetadataItem<sp_core::crypto::AccountId32, primitive_types::H160, primitive_types::H256>
   **/
  PalletLogionLocMetadataItem: {
    name: 'H256',
    value: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    acknowledgedByOwner: 'bool',
    acknowledgedByVerifiedIssuer: 'bool'
  },
  /**
   * Lookup310: pallet_logion_loc::File<primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
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
   * Lookup312: pallet_logion_loc::LocLink<LocId, primitive_types::H256, sp_core::crypto::AccountId32, primitive_types::H160>
   **/
  PalletLogionLocLocLink: {
    id: 'u128',
    nature: 'H256',
    submitter: 'PalletLogionLocSupportedAccountId',
    acknowledgedByOwner: 'bool',
    acknowledgedByVerifiedIssuer: 'bool'
  },
  /**
   * Lookup315: pallet_logion_loc::LocVoidInfo<LocId>
   **/
  PalletLogionLocLocVoidInfo: {
    replacer: 'Option<u128>'
  },
  /**
   * Lookup316: pallet_lo_authority_list::pallet::Call<T>
   **/
  PalletLoAuthorityListCall: {
    _enum: {
      add_legal_officer: {
        legalOfficerId: 'AccountId32',
        data: 'PalletLoAuthorityListLegalOfficerDataParam',
      },
      remove_legal_officer: {
        legalOfficerId: 'AccountId32',
      },
      update_legal_officer: {
        legalOfficerId: 'AccountId32',
        data: 'PalletLoAuthorityListLegalOfficerDataParam',
      },
      import_host_legal_officer: {
        legalOfficerId: 'AccountId32',
        data: 'PalletLoAuthorityListHostDataParam',
      },
      import_guest_legal_officer: {
        legalOfficerId: 'AccountId32',
        hostId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup317: pallet_lo_authority_list::LegalOfficerDataParam<sp_core::crypto::AccountId32, logion_runtime::Region>
   **/
  PalletLoAuthorityListLegalOfficerDataParam: {
    _enum: {
      Host: 'PalletLoAuthorityListHostDataParam',
      Guest: 'AccountId32'
    }
  },
  /**
   * Lookup318: logion_runtime::Region
   **/
  LogionRuntimeRegion: {
    _enum: ['Europe']
  },
  /**
   * Lookup319: pallet_lo_authority_list::HostDataParam<logion_runtime::Region>
   **/
  PalletLoAuthorityListHostDataParam: {
    nodeId: 'Option<OpaquePeerId>',
    baseUrl: 'Option<Bytes>',
    region: 'LogionRuntimeRegion'
  },
  /**
   * Lookup323: pallet_logion_vote::pallet::Call<T>
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
   * Lookup324: pallet_recovery::pallet::Call<T>
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
   * Lookup325: pallet_verified_recovery::pallet::Call<T>
   **/
  PalletVerifiedRecoveryCall: {
    _enum: {
      create_recovery: {
        legalOfficers: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup326: pallet_multisig::pallet::Call<T>
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
   * Lookup328: pallet_logion_vault::pallet::Call<T>
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
   * Lookup329: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup330: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup333: pallet_treasury::SpendStatus<AssetKind, AssetBalance, sp_core::crypto::AccountId32, BlockNumber, PaymentId>
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
   * Lookup334: pallet_treasury::PaymentState<Id>
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
   * Lookup336: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup337: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved', 'FailedToConvertBalance', 'SpendExpired', 'EarlyPayout', 'AlreadyAttempted', 'PayoutError', 'NotAttempted', 'Inconclusive']
  },
  /**
   * Lookup341: pallet_collator_selection::pallet::CandidateInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PalletCollatorSelectionCandidateInfo: {
    who: 'AccountId32',
    deposit: 'u128'
  },
  /**
   * Lookup343: pallet_collator_selection::pallet::Error<T>
   **/
  PalletCollatorSelectionError: {
    _enum: ['TooManyCandidates', 'TooFewEligibleCollators', 'AlreadyCandidate', 'NotCandidate', 'TooManyInvulnerables', 'AlreadyInvulnerable', 'NotInvulnerable', 'NoAssociatedValidatorId', 'ValidatorNotRegistered', 'InsertToCandidateListFailed', 'RemoveFromCandidateListFailed', 'DepositTooLow', 'UpdateCandidateListFailed', 'InsufficientBond', 'TargetIsNotCandidate', 'IdenticalDeposit', 'InvalidUnreserve']
  },
  /**
   * Lookup347: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup348: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup357: cumulus_pallet_xcmp_queue::OutboundChannelDetails
   **/
  CumulusPalletXcmpQueueOutboundChannelDetails: {
    recipient: 'u32',
    state: 'CumulusPalletXcmpQueueOutboundState',
    signalsExist: 'bool',
    firstIndex: 'u16',
    lastIndex: 'u16'
  },
  /**
   * Lookup358: cumulus_pallet_xcmp_queue::OutboundState
   **/
  CumulusPalletXcmpQueueOutboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup360: cumulus_pallet_xcmp_queue::QueueConfigData
   **/
  CumulusPalletXcmpQueueQueueConfigData: {
    suspendThreshold: 'u32',
    dropThreshold: 'u32',
    resumeThreshold: 'u32'
  },
  /**
   * Lookup361: cumulus_pallet_xcmp_queue::pallet::Error<T>
   **/
  CumulusPalletXcmpQueueError: {
    _enum: ['BadQueueConfig', 'AlreadySuspended', 'AlreadyResumed']
  },
  /**
   * Lookup362: pallet_xcm::pallet::QueryStatus<BlockNumber>
   **/
  PalletXcmQueryStatus: {
    _enum: {
      Pending: {
        responder: 'XcmVersionedLocation',
        maybeMatchQuerier: 'Option<XcmVersionedLocation>',
        maybeNotify: 'Option<(u8,u8)>',
        timeout: 'u32',
      },
      VersionNotifier: {
        origin: 'XcmVersionedLocation',
        isActive: 'bool',
      },
      Ready: {
        response: 'XcmVersionedResponse',
        at: 'u32'
      }
    }
  },
  /**
   * Lookup366: xcm::VersionedResponse
   **/
  XcmVersionedResponse: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      V2: 'XcmV2Response',
      V3: 'XcmV3Response',
      V4: 'StagingXcmV4Response'
    }
  },
  /**
   * Lookup372: pallet_xcm::pallet::VersionMigrationStage
   **/
  PalletXcmVersionMigrationStage: {
    _enum: {
      MigrateSupportedVersion: 'Null',
      MigrateVersionNotifiers: 'Null',
      NotifyCurrentTargets: 'Option<Bytes>',
      MigrateAndNotifyOldTargets: 'Null'
    }
  },
  /**
   * Lookup374: xcm::VersionedAssetId
   **/
  XcmVersionedAssetId: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      __Unused2: 'Null',
      V3: 'XcmV3MultiassetAssetId',
      V4: 'StagingXcmV4AssetAssetId'
    }
  },
  /**
   * Lookup375: pallet_xcm::pallet::RemoteLockedFungibleRecord<ConsumerIdentifier, MaxConsumers>
   **/
  PalletXcmRemoteLockedFungibleRecord: {
    amount: 'u128',
    owner: 'XcmVersionedLocation',
    locker: 'XcmVersionedLocation',
    consumers: 'Vec<(Null,u128)>'
  },
  /**
   * Lookup382: pallet_xcm::pallet::Error<T>
   **/
  PalletXcmError: {
    _enum: ['Unreachable', 'SendFailure', 'Filtered', 'UnweighableMessage', 'DestinationNotInvertible', 'Empty', 'CannotReanchor', 'TooManyAssets', 'InvalidOrigin', 'BadVersion', 'BadLocation', 'NoSubscription', 'AlreadySubscribed', 'CannotCheckOutTeleport', 'LowBalance', 'TooManyLocks', 'AccountNotSovereign', 'FeesNotMet', 'LockNotFound', 'InUse', 'InvalidAssetNotConcrete', 'InvalidAssetUnknownReserve', 'InvalidAssetUnsupportedReserve', 'TooManyReserves', 'LocalExecutionIncomplete']
  },
  /**
   * Lookup383: pallet_message_queue::BookState<cumulus_primitives_core::AggregateMessageOrigin>
   **/
  PalletMessageQueueBookState: {
    _alias: {
      size_: 'size'
    },
    begin: 'u32',
    end: 'u32',
    count: 'u32',
    readyNeighbours: 'Option<PalletMessageQueueNeighbours>',
    messageCount: 'u64',
    size_: 'u64'
  },
  /**
   * Lookup385: pallet_message_queue::Neighbours<cumulus_primitives_core::AggregateMessageOrigin>
   **/
  PalletMessageQueueNeighbours: {
    prev: 'CumulusPrimitivesCoreAggregateMessageOrigin',
    next: 'CumulusPrimitivesCoreAggregateMessageOrigin'
  },
  /**
   * Lookup387: pallet_message_queue::Page<Size, HeapSize>
   **/
  PalletMessageQueuePage: {
    remaining: 'u32',
    remainingSize: 'u32',
    firstIndex: 'u32',
    first: 'u32',
    last: 'u32',
    heap: 'Bytes'
  },
  /**
   * Lookup389: pallet_message_queue::pallet::Error<T>
   **/
  PalletMessageQueueError: {
    _enum: ['NotReapable', 'NoPage', 'NoMessage', 'AlreadyProcessed', 'Queued', 'InsufficientWeight', 'TemporarilyUnprocessable', 'QueuePaused', 'RecursiveDisallowed']
  },
  /**
   * Lookup390: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup393: pallet_vesting::Releases
   **/
  PalletVestingReleases: {
    _enum: ['V0', 'V1']
  },
  /**
   * Lookup394: pallet_vesting::pallet::Error<T>
   **/
  PalletVestingError: {
    _enum: ['NotVesting', 'AtMaxVestingSchedules', 'AmountLow', 'ScheduleIndexOutOfBounds', 'InvalidScheduleParams']
  },
  /**
   * Lookup395: pallet_logion_loc::LegalOfficerCase<sp_core::crypto::AccountId32, primitive_types::H256, LocId, BlockNumber, primitive_types::H160, SponsorshipId, Balance, logion_runtime::MaxLocMetadata, logion_runtime::MaxLocFiles, logion_runtime::MaxLocLinks>
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
    tokensRecordFee: 'u128',
    imported: 'bool'
  },
  /**
   * Lookup396: logion_runtime::MaxLocMetadata
   **/
  LogionRuntimeMaxLocMetadata: 'Null',
  /**
   * Lookup397: logion_runtime::MaxLocFiles
   **/
  LogionRuntimeMaxLocFiles: 'Null',
  /**
   * Lookup398: logion_runtime::MaxLocLinks
   **/
  LogionRuntimeMaxLocLinks: 'Null',
  /**
   * Lookup405: pallet_logion_loc::CollectionItem<primitive_types::H256, TokenIssuance, bounded_collections::bounded_vec::BoundedVec<pallet_logion_loc::CollectionItemFile<primitive_types::H256>, S>, bounded_collections::bounded_vec::BoundedVec<pallet_logion_loc::TermsAndConditionsElement<LocId, primitive_types::H256>, S>>
   **/
  PalletLogionLocCollectionItem: {
    description: 'H256',
    files: 'Vec<PalletLogionLocCollectionItemFile>',
    token: 'Option<PalletLogionLocCollectionItemToken>',
    restrictedDelivery: 'bool',
    termsAndConditions: 'Vec<PalletLogionLocTermsAndConditionsElement>',
    imported: 'bool'
  },
  /**
   * Lookup408: pallet_logion_loc::TokensRecord<primitive_types::H256, bounded_collections::bounded_vec::BoundedVec<pallet_logion_loc::TokensRecordFile<primitive_types::H256>, S>, sp_core::crypto::AccountId32>
   **/
  PalletLogionLocTokensRecord: {
    description: 'H256',
    files: 'Vec<PalletLogionLocTokensRecordFile>',
    submitter: 'AccountId32',
    imported: 'bool'
  },
  /**
   * Lookup411: pallet_logion_loc::VerifiedIssuer<LocId>
   **/
  PalletLogionLocVerifiedIssuer: {
    identityLoc: 'u128',
    imported: 'bool'
  },
  /**
   * Lookup414: pallet_logion_loc::Sponsorship<sp_core::crypto::AccountId32, primitive_types::H160, LocId>
   **/
  PalletLogionLocSponsorship: {
    sponsor: 'AccountId32',
    sponsoredAccount: 'PalletLogionLocSupportedAccountId',
    legalOfficer: 'AccountId32',
    locId: 'Option<u128>',
    imported: 'bool'
  },
  /**
   * Lookup415: pallet_logion_loc::pallet::StorageVersion
   **/
  PalletLogionLocStorageVersion: {
    _enum: ['V1', 'V2MakeLocVoid', 'V3RequesterEnum', 'V4ItemSubmitter', 'V5Collection', 'V6ItemUpload', 'V7ItemToken', 'V8AddSeal', 'V9TermsAndConditions', 'V10AddLocFileSize', 'V11EnableEthereumSubmitter', 'V12Sponsorship', 'V13AcknowledgeItems', 'V14HashLocPublicData', 'V15AddTokenIssuance', 'V16MoveTokenIssuance', 'V17HashItemRecordPublicData', 'V18AddValueFee', 'V19AcknowledgeItemsByIssuer', 'V20AddCustomLegalFee', 'V21EnableRequesterLinks', 'V22AddRecurrentFees', 'V23RemoveUselessMapsAddImported']
  },
  /**
   * Lookup416: pallet_logion_loc::pallet::Error<T>
   **/
  PalletLogionLocError: {
    _enum: ['AlreadyExists', 'NotFound', 'Unauthorized', 'CannotMutate', 'AlreadyClosed', 'LinkedLocNotFound', 'ReplacerLocNotFound', 'AlreadyVoid', 'ReplacerLocAlreadyVoid', 'ReplacerLocAlreadyReplacing', 'CannotMutateVoid', 'UnexpectedRequester', 'ReplacerLocWrongType', 'InvalidSubmitter', 'CollectionHasNoLimit', 'WrongCollectionLoc', 'CollectionItemAlreadyExists', 'CollectionItemTooMuchData', 'CollectionLimitsReached', 'MetadataItemInvalid', 'FileInvalid', 'LocLinkInvalid', 'CannotUpload', 'MustUpload', 'DuplicateFile', 'MissingToken', 'MissingFiles', 'TermsAndConditionsLocNotFound', 'TermsAndConditionsLocNotClosed', 'TermsAndConditionsLocVoid', 'DuplicateLocFile', 'DuplicateLocMetadata', 'DuplicateLocLink', 'TokensRecordTooMuchData', 'TokensRecordAlreadyExists', 'CannotAddRecord', 'InvalidIdentityLoc', 'AlreadyNominated', 'NotNominated', 'CannotSubmit', 'InsufficientFunds', 'AlreadyUsed', 'CannotLinkToSponsorship', 'ItemNotFound', 'ItemAlreadyAcknowledged', 'CannotCloseUnacknowledgedByOwner', 'BadTokenIssuance', 'CannotCloseUnacknowledgedByVerifiedIssuer', 'AccountNotIdentified', 'LocMetadataTooMuchData', 'LocFilesTooMuchData', 'LocLinksTooMuchData', 'CollectionItemFilesTooMuchData', 'CollectionItemTCsTooMuchData', 'AccountLocsTooMuchData']
  },
  /**
   * Lookup417: pallet_lo_authority_list::LegalOfficerData<sp_core::crypto::AccountId32, logion_runtime::Region, logion_runtime::MaxPeerIdLength, logion_runtime::MaxBaseUrlLen>
   **/
  PalletLoAuthorityListLegalOfficerData: {
    _enum: {
      Host: 'PalletLoAuthorityListHostData',
      Guest: 'PalletLoAuthorityListGuestData'
    }
  },
  /**
   * Lookup418: logion_runtime::MaxPeerIdLength
   **/
  LogionRuntimeMaxPeerIdLength: 'Null',
  /**
   * Lookup419: logion_runtime::MaxBaseUrlLen
   **/
  LogionRuntimeMaxBaseUrlLen: 'Null',
  /**
   * Lookup420: pallet_lo_authority_list::HostData<logion_runtime::Region, logion_runtime::MaxPeerIdLength, logion_runtime::MaxBaseUrlLen>
   **/
  PalletLoAuthorityListHostData: {
    nodeId: 'Option<Bytes>',
    baseUrl: 'Option<Bytes>',
    region: 'LogionRuntimeRegion',
    imported: 'bool'
  },
  /**
   * Lookup426: pallet_lo_authority_list::GuestData<sp_core::crypto::AccountId32>
   **/
  PalletLoAuthorityListGuestData: {
    hostId: 'AccountId32',
    imported: 'bool'
  },
  /**
   * Lookup430: pallet_lo_authority_list::pallet::StorageVersion
   **/
  PalletLoAuthorityListStorageVersion: {
    _enum: ['V1', 'V2AddOnchainSettings', 'V3GuestLegalOfficers', 'V4Region', 'V5Imported']
  },
  /**
   * Lookup431: pallet_lo_authority_list::pallet::Error<T>
   **/
  PalletLoAuthorityListError: {
    _enum: ['AlreadyExists', 'NotFound', 'PeerIdAlreadyInUse', 'HostHasGuest', 'GuestOfGuest', 'HostNotFound', 'HostCannotConvert', 'GuestCannotUpdate', 'CannotChangeRegion', 'TooManyNodes', 'BaseUrlTooLong', 'PeerIdTooLong']
  },
  /**
   * Lookup432: pallet_logion_vote::Vote<LocId, sp_core::crypto::AccountId32, logion_runtime::MaxBallots>
   **/
  PalletLogionVoteVote: {
    locId: 'u128',
    ballots: 'Vec<PalletLogionVoteBallot>'
  },
  /**
   * Lookup433: logion_runtime::MaxBallots
   **/
  LogionRuntimeMaxBallots: 'Null',
  /**
   * Lookup436: pallet_logion_vote::pallet::Error<T>
   **/
  PalletLogionVoteError: {
    _enum: ['InvalidLoc', 'VoteNotFound', 'NotAllowed', 'AlreadyVoted', 'TooMuchBallots']
  },
  /**
   * Lookup437: pallet_recovery::RecoveryConfig<BlockNumber, Balance, bounded_collections::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryRecoveryConfig: {
    delayPeriod: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>',
    threshold: 'u16'
  },
  /**
   * Lookup439: pallet_recovery::ActiveRecovery<BlockNumber, Balance, bounded_collections::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryActiveRecovery: {
    created: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>'
  },
  /**
   * Lookup440: pallet_recovery::pallet::Error<T>
   **/
  PalletRecoveryError: {
    _enum: ['NotAllowed', 'ZeroThreshold', 'NotEnoughFriends', 'MaxFriends', 'NotSorted', 'NotRecoverable', 'AlreadyRecoverable', 'AlreadyStarted', 'NotStarted', 'NotFriend', 'DelayPeriod', 'AlreadyVouched', 'Threshold', 'StillActive', 'AlreadyProxy', 'BadState']
  },
  /**
   * Lookup441: pallet_verified_recovery::pallet::Error<T>
   **/
  PalletVerifiedRecoveryError: {
    _enum: ['InvalidLegalOfficers', 'MissingIdentityLoc']
  },
  /**
   * Lookup443: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup445: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup446: pallet_logion_vault::pallet::Error<T>
   **/
  PalletLogionVaultError: {
    _enum: ['InvalidSignatories', 'WrongInitiator']
  },
  /**
   * Lookup448: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup449: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup451: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup452: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup455: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup456: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup457: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup458: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup461: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup462: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup463: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup464: logion_runtime::Runtime
   **/
  LogionRuntimeRuntime: 'Null'
};
