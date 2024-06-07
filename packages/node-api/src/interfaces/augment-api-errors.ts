// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    balances: {
      /**
       * Beneficiary account must pre-exist.
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * The delta cannot be zero.
       **/
      DeltaZero: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit.
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account.
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account.
       **/
      Expendability: AugmentedError<ApiType>;
      /**
       * Balance too low to send value.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * The issuance cannot be modified since it is already deactivated.
       **/
      IssuanceDeactivated: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal.
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of freezes exceed `MaxFreezes`.
       **/
      TooManyFreezes: AugmentedError<ApiType>;
      /**
       * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
       **/
      TooManyHolds: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed `MaxReserves`.
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value.
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    collatorSelection: {
      /**
       * Account is already a candidate.
       **/
      AlreadyCandidate: AugmentedError<ApiType>;
      /**
       * Account is already an Invulnerable.
       **/
      AlreadyInvulnerable: AugmentedError<ApiType>;
      /**
       * New deposit amount would be below the minimum candidacy bond.
       **/
      DepositTooLow: AugmentedError<ApiType>;
      /**
       * The updated deposit amount is equal to the amount already reserved.
       **/
      IdenticalDeposit: AugmentedError<ApiType>;
      /**
       * Could not insert in the candidate list.
       **/
      InsertToCandidateListFailed: AugmentedError<ApiType>;
      /**
       * Deposit amount is too low to take the target's slot in the candidate list.
       **/
      InsufficientBond: AugmentedError<ApiType>;
      /**
       * Cannot lower candidacy bond while occupying a future collator slot in the list.
       **/
      InvalidUnreserve: AugmentedError<ApiType>;
      /**
       * Account has no associated validator ID.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * Account is not a candidate.
       **/
      NotCandidate: AugmentedError<ApiType>;
      /**
       * Account is not an Invulnerable.
       **/
      NotInvulnerable: AugmentedError<ApiType>;
      /**
       * Could not remove from the candidate list.
       **/
      RemoveFromCandidateListFailed: AugmentedError<ApiType>;
      /**
       * The target account to be replaced in the candidate list is not a candidate.
       **/
      TargetIsNotCandidate: AugmentedError<ApiType>;
      /**
       * Leaving would result in too few candidates.
       **/
      TooFewEligibleCollators: AugmentedError<ApiType>;
      /**
       * The pallet has too many candidates.
       **/
      TooManyCandidates: AugmentedError<ApiType>;
      /**
       * There are too many Invulnerables.
       **/
      TooManyInvulnerables: AugmentedError<ApiType>;
      /**
       * Could not update the candidate list.
       **/
      UpdateCandidateListFailed: AugmentedError<ApiType>;
      /**
       * Validator ID is not yet registered.
       **/
      ValidatorNotRegistered: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    communityTreasury: {
      /**
       * The payment has already been attempted.
       **/
      AlreadyAttempted: AugmentedError<ApiType>;
      /**
       * The spend is not yet eligible for payout.
       **/
      EarlyPayout: AugmentedError<ApiType>;
      /**
       * The balance of the asset kind is not convertible to the balance of the native asset.
       **/
      FailedToConvertBalance: AugmentedError<ApiType>;
      /**
       * The payment has neither failed nor succeeded yet.
       **/
      Inconclusive: AugmentedError<ApiType>;
      /**
       * The spend origin is valid but the amount it is allowed to spend is lower than the
       * amount to be spent.
       **/
      InsufficientPermission: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal, bounty or spend at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * The payout was not yet attempted/claimed.
       **/
      NotAttempted: AugmentedError<ApiType>;
      /**
       * There was some issue with the mechanism of payment.
       **/
      PayoutError: AugmentedError<ApiType>;
      /**
       * Proposal has not been approved.
       **/
      ProposalNotApproved: AugmentedError<ApiType>;
      /**
       * The spend has expired and cannot be claimed.
       **/
      SpendExpired: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    loAuthorityList: {
      /**
       * The LO is already in the list.
       **/
      AlreadyExists: AugmentedError<ApiType>;
      /**
       * The base url is too long
       **/
      BaseUrlTooLong: AugmentedError<ApiType>;
      /**
       * LO cannot change region
       **/
      CannotChangeRegion: AugmentedError<ApiType>;
      /**
       * Guest cannot update
       **/
      GuestCannotUpdate: AugmentedError<ApiType>;
      /**
       * Trying to add a guest with another guest as host
       **/
      GuestOfGuest: AugmentedError<ApiType>;
      /**
       * Host cannot convert itself into a guest
       **/
      HostCannotConvert: AugmentedError<ApiType>;
      /**
       * The host has at least one guest and cannot become a guest or be removed
       **/
      HostHasGuest: AugmentedError<ApiType>;
      /**
       * Trying to add a guest with unknown host
       **/
      HostNotFound: AugmentedError<ApiType>;
      /**
       * The LO is not in the list.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * The Peer ID is already assigned to another LO.
       **/
      PeerIdAlreadyInUse: AugmentedError<ApiType>;
      /**
       * The PeerId is too long
       **/
      PeerIdTooLong: AugmentedError<ApiType>;
      /**
       * There are too much nodes
       **/
      TooManyNodes: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    logionLoc: {
      /**
       * There are too much LOCs linked to account
       **/
      AccountLocsTooMuchData: AugmentedError<ApiType>;
      /**
       * The provided Polkadot account has no closed, non-void identity LOC
       **/
      AccountNotIdentified: AugmentedError<ApiType>;
      /**
       * Occurs when trying to close an already closed LOC
       **/
      AlreadyClosed: AugmentedError<ApiType>;
      /**
       * The LOC ID has already been used.
       **/
      AlreadyExists: AugmentedError<ApiType>;
      /**
       * Issuer has already been nominated by the owner
       **/
      AlreadyNominated: AugmentedError<ApiType>;
      /**
       * The sponsorship to be withdrawn has already been used
       **/
      AlreadyUsed: AugmentedError<ApiType>;
      /**
       * Occurs when trying to void a LOC already void
       **/
      AlreadyVoid: AugmentedError<ApiType>;
      /**
       * Invalid token issuance
       **/
      BadTokenIssuance: AugmentedError<ApiType>;
      /**
       * The token record cannot be added because either the collection is in a wrong state
       * or the submitter is not an issuer or the requester
       **/
      CannotAddRecord: AugmentedError<ApiType>;
      /**
       * There is still at least one Item (Metadata, Link or File) unacknowledged by LOC owner
       **/
      CannotCloseUnacknowledgedByOwner: AugmentedError<ApiType>;
      /**
       * There is still at least one Item (Metadata, Link or File) unacknowledged by verified issuer
       **/
      CannotCloseUnacknowledgedByVerifiedIssuer: AugmentedError<ApiType>;
      /**
       * The sponsorship cannot be used for creating the new LOC
       **/
      CannotLinkToSponsorship: AugmentedError<ApiType>;
      /**
       * Occurs when trying to mutate a closed LOC
       **/
      CannotMutate: AugmentedError<ApiType>;
      /**
       * Occurs when trying to mutate a void LOC
       **/
      CannotMutateVoid: AugmentedError<ApiType>;
      /**
       * The submitter of added item cannot contribute to this LOC
       **/
      CannotSubmit: AugmentedError<ApiType>;
      /**
       * Cannot attach files to this item because the Collection LOC does not allow it
       **/
      CannotUpload: AugmentedError<ApiType>;
      /**
       * A collection LOC must be limited in time and/or quantity of items
       **/
      CollectionHasNoLimit: AugmentedError<ApiType>;
      /**
       * An item with same identifier already exists in the collection
       **/
      CollectionItemAlreadyExists: AugmentedError<ApiType>;
      /**
       * There are too much files in the Collection Item
       **/
      CollectionItemFilesTooMuchData: AugmentedError<ApiType>;
      /**
       * There are too much terms and conditions in the Collection Item
       **/
      CollectionItemTCsTooMuchData: AugmentedError<ApiType>;
      /**
       * Collection Item cannot be added to given collection because some fields contain too many bytes
       **/
      CollectionItemTooMuchData: AugmentedError<ApiType>;
      /**
       * The collection limits have been reached
       **/
      CollectionLimitsReached: AugmentedError<ApiType>;
      /**
       * Cannot attach same file multiple times
       **/
      DuplicateFile: AugmentedError<ApiType>;
      /**
       * Cannot add several files with same hash to LOC
       **/
      DuplicateLocFile: AugmentedError<ApiType>;
      /**
       * Cannot add several links with same target to LOC
       **/
      DuplicateLocLink: AugmentedError<ApiType>;
      /**
       * Cannot add several metadata items with same name to LOC
       **/
      DuplicateLocMetadata: AugmentedError<ApiType>;
      /**
       * File cannot be added to given LOC because submitted data are invalid
       **/
      FileInvalid: AugmentedError<ApiType>;
      /**
       * The requester has not enough funds to import file
       **/
      InsufficientFunds: AugmentedError<ApiType>;
      /**
       * Given identity LOC does not exist or is invalid
       **/
      InvalidIdentityLoc: AugmentedError<ApiType>;
      /**
       * Submitter is not consistent with caller
       **/
      InvalidSubmitter: AugmentedError<ApiType>;
      /**
       * Target Item (Metadata or File) is already acknowledged
       **/
      ItemAlreadyAcknowledged: AugmentedError<ApiType>;
      /**
       * Target Item (Metadata or File) could not be found in LOC
       **/
      ItemNotFound: AugmentedError<ApiType>;
      /**
       * Occurs when trying to link to a non-existent LOC
       **/
      LinkedLocNotFound: AugmentedError<ApiType>;
      /**
       * There are too much files in the LOC
       **/
      LocFilesTooMuchData: AugmentedError<ApiType>;
      /**
       * Link cannot be added to given LOC because submitted data are invalid
       **/
      LocLinkInvalid: AugmentedError<ApiType>;
      /**
       * There are too much links in the LOC
       **/
      LocLinksTooMuchData: AugmentedError<ApiType>;
      /**
       * There are too much metadata in the LOC
       **/
      LocMetadataTooMuchData: AugmentedError<ApiType>;
      /**
       * Metadata Item cannot be added to given LOC because submitted data are invalid
       **/
      MetadataItemInvalid: AugmentedError<ApiType>;
      /**
       * Collection items with restricted delivery require at least one associated file
       **/
      MissingFiles: AugmentedError<ApiType>;
      /**
       * Collection items with restricted delivery require an underlying token to be defined
       **/
      MissingToken: AugmentedError<ApiType>;
      /**
       * Must attach at least one file
       **/
      MustUpload: AugmentedError<ApiType>;
      /**
       * Target LOC does not exist
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Issuer is not nominated by the owner
       **/
      NotNominated: AugmentedError<ApiType>;
      /**
       * Occurs when trying to void a LOC by replacing it with a LOC already replacing another LOC
       **/
      ReplacerLocAlreadyReplacing: AugmentedError<ApiType>;
      /**
       * Occurs when trying to void a LOC by replacing it with an already void LOC
       **/
      ReplacerLocAlreadyVoid: AugmentedError<ApiType>;
      /**
       * Occurs when trying to replace void LOC with a non-existent LOC
       **/
      ReplacerLocNotFound: AugmentedError<ApiType>;
      /**
       * Occurs when trying to void a LOC by replacing it with a LOC of a different type
       **/
      ReplacerLocWrongType: AugmentedError<ApiType>;
      /**
       * TermsAndConditions LOC not closed
       **/
      TermsAndConditionsLocNotClosed: AugmentedError<ApiType>;
      /**
       * TermsAndConditions LOC does not exist
       **/
      TermsAndConditionsLocNotFound: AugmentedError<ApiType>;
      /**
       * TermsAndConditions LOC is void
       **/
      TermsAndConditionsLocVoid: AugmentedError<ApiType>;
      /**
       * A token record with the same identifier already exists
       **/
      TokensRecordAlreadyExists: AugmentedError<ApiType>;
      /**
       * Token Record cannot be added because some fields contain too many bytes
       **/
      TokensRecordTooMuchData: AugmentedError<ApiType>;
      /**
       * Unauthorized LOC operation
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * Unexpected requester given LOC type
       **/
      UnexpectedRequester: AugmentedError<ApiType>;
      /**
       * Item cannot be added to given collection, it may be missing or limits are reached
       **/
      WrongCollectionLoc: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    logionTreasury: {
      /**
       * The payment has already been attempted.
       **/
      AlreadyAttempted: AugmentedError<ApiType>;
      /**
       * The spend is not yet eligible for payout.
       **/
      EarlyPayout: AugmentedError<ApiType>;
      /**
       * The balance of the asset kind is not convertible to the balance of the native asset.
       **/
      FailedToConvertBalance: AugmentedError<ApiType>;
      /**
       * The payment has neither failed nor succeeded yet.
       **/
      Inconclusive: AugmentedError<ApiType>;
      /**
       * The spend origin is valid but the amount it is allowed to spend is lower than the
       * amount to be spent.
       **/
      InsufficientPermission: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal, bounty or spend at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * The payout was not yet attempted/claimed.
       **/
      NotAttempted: AugmentedError<ApiType>;
      /**
       * There was some issue with the mechanism of payment.
       **/
      PayoutError: AugmentedError<ApiType>;
      /**
       * Proposal has not been approved.
       **/
      ProposalNotApproved: AugmentedError<ApiType>;
      /**
       * The spend has expired and cannot be claimed.
       **/
      SpendExpired: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    messageQueue: {
      /**
       * The message was already processed and cannot be processed again.
       **/
      AlreadyProcessed: AugmentedError<ApiType>;
      /**
       * There is temporarily not enough weight to continue servicing messages.
       **/
      InsufficientWeight: AugmentedError<ApiType>;
      /**
       * The referenced message could not be found.
       **/
      NoMessage: AugmentedError<ApiType>;
      /**
       * Page to be reaped does not exist.
       **/
      NoPage: AugmentedError<ApiType>;
      /**
       * Page is not reapable because it has items remaining to be processed and is not old
       * enough.
       **/
      NotReapable: AugmentedError<ApiType>;
      /**
       * The message is queued for future execution.
       **/
      Queued: AugmentedError<ApiType>;
      /**
       * The queue is paused and no message can be executed from it.
       * 
       * This can change at any time and may resolve in the future by re-trying.
       **/
      QueuePaused: AugmentedError<ApiType>;
      /**
       * Another call is in progress and needs to finish before this call can happen.
       **/
      RecursiveDisallowed: AugmentedError<ApiType>;
      /**
       * This message is temporarily unprocessable.
       * 
       * Such errors are expected, but not guaranteed, to resolve themselves eventually through
       * retrying.
       **/
      TemporarilyUnprocessable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    parachainSystem: {
      /**
       * The inherent which supplies the host configuration did not run this block.
       **/
      HostConfigurationNotAvailable: AugmentedError<ApiType>;
      /**
       * No code upgrade has been authorized.
       **/
      NothingAuthorized: AugmentedError<ApiType>;
      /**
       * No validation function upgrade is currently scheduled.
       **/
      NotScheduled: AugmentedError<ApiType>;
      /**
       * Attempt to upgrade validation function while existing upgrade pending.
       **/
      OverlappingUpgrades: AugmentedError<ApiType>;
      /**
       * Polkadot currently prohibits this parachain from upgrading its validation function.
       **/
      ProhibitedByPolkadot: AugmentedError<ApiType>;
      /**
       * The supplied validation function has compiled into a blob larger than Polkadot is
       * willing to run.
       **/
      TooBig: AugmentedError<ApiType>;
      /**
       * The given code upgrade has not been authorized.
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * The inherent which supplies the validation data did not run this block.
       **/
      ValidationDataNotAvailable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    polkadotXcm: {
      /**
       * The given account is not an identifiable sovereign account for any location.
       **/
      AccountNotSovereign: AugmentedError<ApiType>;
      /**
       * The location is invalid since it already has a subscription from us.
       **/
      AlreadySubscribed: AugmentedError<ApiType>;
      /**
       * The given location could not be used (e.g. because it cannot be expressed in the
       * desired version of XCM).
       **/
      BadLocation: AugmentedError<ApiType>;
      /**
       * The version of the `Versioned` value used is not able to be interpreted.
       **/
      BadVersion: AugmentedError<ApiType>;
      /**
       * Could not check-out the assets for teleportation to the destination chain.
       **/
      CannotCheckOutTeleport: AugmentedError<ApiType>;
      /**
       * Could not re-anchor the assets to declare the fees for the destination chain.
       **/
      CannotReanchor: AugmentedError<ApiType>;
      /**
       * The destination `Location` provided cannot be inverted.
       **/
      DestinationNotInvertible: AugmentedError<ApiType>;
      /**
       * The assets to be sent are empty.
       **/
      Empty: AugmentedError<ApiType>;
      /**
       * The operation required fees to be paid which the initiator could not meet.
       **/
      FeesNotMet: AugmentedError<ApiType>;
      /**
       * The message execution fails the filter.
       **/
      Filtered: AugmentedError<ApiType>;
      /**
       * The unlock operation cannot succeed because there are still consumers of the lock.
       **/
      InUse: AugmentedError<ApiType>;
      /**
       * Invalid non-concrete asset.
       **/
      InvalidAssetNotConcrete: AugmentedError<ApiType>;
      /**
       * Invalid asset, reserve chain could not be determined for it.
       **/
      InvalidAssetUnknownReserve: AugmentedError<ApiType>;
      /**
       * Invalid asset, do not support remote asset reserves with different fees reserves.
       **/
      InvalidAssetUnsupportedReserve: AugmentedError<ApiType>;
      /**
       * Origin is invalid for sending.
       **/
      InvalidOrigin: AugmentedError<ApiType>;
      /**
       * Local XCM execution incomplete.
       **/
      LocalExecutionIncomplete: AugmentedError<ApiType>;
      /**
       * A remote lock with the corresponding data could not be found.
       **/
      LockNotFound: AugmentedError<ApiType>;
      /**
       * The owner does not own (all) of the asset that they wish to do the operation on.
       **/
      LowBalance: AugmentedError<ApiType>;
      /**
       * The referenced subscription could not be found.
       **/
      NoSubscription: AugmentedError<ApiType>;
      /**
       * There was some other issue (i.e. not to do with routing) in sending the message.
       * Perhaps a lack of space for buffering the message.
       **/
      SendFailure: AugmentedError<ApiType>;
      /**
       * Too many assets have been attempted for transfer.
       **/
      TooManyAssets: AugmentedError<ApiType>;
      /**
       * The asset owner has too many locks on the asset.
       **/
      TooManyLocks: AugmentedError<ApiType>;
      /**
       * Too many assets with different reserve locations have been attempted for transfer.
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Could not decode XCM.
       **/
      UnableToDecode: AugmentedError<ApiType>;
      /**
       * The desired destination was unreachable, generally because there is a no way of routing
       * to it.
       **/
      Unreachable: AugmentedError<ApiType>;
      /**
       * The message's weight could not be determined.
       **/
      UnweighableMessage: AugmentedError<ApiType>;
      /**
       * XCM encoded length is too large.
       * Returned when an XCM encoded length is larger than `MaxXcmEncodedSize`.
       **/
      XcmTooLarge: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    recovery: {
      /**
       * This account is already set up for recovery
       **/
      AlreadyProxy: AugmentedError<ApiType>;
      /**
       * This account is already set up for recovery
       **/
      AlreadyRecoverable: AugmentedError<ApiType>;
      /**
       * A recovery process has already started for this account
       **/
      AlreadyStarted: AugmentedError<ApiType>;
      /**
       * This user has already vouched for this recovery
       **/
      AlreadyVouched: AugmentedError<ApiType>;
      /**
       * Some internal state is broken.
       **/
      BadState: AugmentedError<ApiType>;
      /**
       * The friend must wait until the delay period to vouch for this recovery
       **/
      DelayPeriod: AugmentedError<ApiType>;
      /**
       * Friends list must be less than max friends
       **/
      MaxFriends: AugmentedError<ApiType>;
      /**
       * User is not allowed to make a call on behalf of this account
       **/
      NotAllowed: AugmentedError<ApiType>;
      /**
       * Friends list must be greater than zero and threshold
       **/
      NotEnoughFriends: AugmentedError<ApiType>;
      /**
       * This account is not a friend who can vouch
       **/
      NotFriend: AugmentedError<ApiType>;
      /**
       * This account is not set up for recovery
       **/
      NotRecoverable: AugmentedError<ApiType>;
      /**
       * Friends list must be sorted and free of duplicates
       **/
      NotSorted: AugmentedError<ApiType>;
      /**
       * A recovery process has not started for this rescuer
       **/
      NotStarted: AugmentedError<ApiType>;
      /**
       * There are still active recovery attempts that need to be closed
       **/
      StillActive: AugmentedError<ApiType>;
      /**
       * The threshold for recovering this account has not been met
       **/
      Threshold: AugmentedError<ApiType>;
      /**
       * Threshold must be greater than zero
       **/
      ZeroThreshold: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    session: {
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Key setting account is not live, so it's impossible to associate keys.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account.
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * A multi-block migration is ongoing and prevents the current code from being replaced.
       **/
      MultiBlockMigrationsOngoing: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * No upgrade authorized.
       **/
      NothingAuthorized: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * The submitted code is not authorized.
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vault: {
      /**
       * The set of signatories is invalid (size <> from 2 or does not contain only legal officers on transfer creation).
       **/
      InvalidSignatories: AugmentedError<ApiType>;
      /**
       * The transfer initiator is a legal officer.
       **/
      WrongInitiator: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    verifiedRecovery: {
      /**
       * The set of legal officers is invalid (size <> from 2).
       **/
      InvalidLegalOfficers: AugmentedError<ApiType>;
      /**
       * One or both legal officers in the friends list did not yet close an Identity LOC for the account.
       **/
      MissingIdentityLoc: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vesting: {
      /**
       * Amount being transferred is too low to create a vesting schedule.
       **/
      AmountLow: AugmentedError<ApiType>;
      /**
       * The account already has `MaxVestingSchedules` count of schedules and thus
       * cannot add another one. Consider merging existing schedules in order to add another.
       **/
      AtMaxVestingSchedules: AugmentedError<ApiType>;
      /**
       * Failed to create a new schedule because some parameter was invalid.
       **/
      InvalidScheduleParams: AugmentedError<ApiType>;
      /**
       * The account given is not vesting.
       **/
      NotVesting: AugmentedError<ApiType>;
      /**
       * An index was out of bounds of the vesting schedules.
       **/
      ScheduleIndexOutOfBounds: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vote: {
      /**
       * User has already voted on given vote.
       **/
      AlreadyVoted: AugmentedError<ApiType>;
      /**
       * Given LOC is not valid (not found, or not closed or void) or does not belong to vote requester.
       **/
      InvalidLoc: AugmentedError<ApiType>;
      /**
       * User is not allowed to vote on given vote.
       **/
      NotAllowed: AugmentedError<ApiType>;
      /**
       * There are too much ballots in the vote
       **/
      TooMuchBallots: AugmentedError<ApiType>;
      /**
       * Given vote does not exist.
       **/
      VoteNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xcmpQueue: {
      /**
       * The execution is already resumed.
       **/
      AlreadyResumed: AugmentedError<ApiType>;
      /**
       * The execution is already suspended.
       **/
      AlreadySuspended: AugmentedError<ApiType>;
      /**
       * Setting the queue config failed since one of its values was invalid.
       **/
      BadQueueConfig: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
