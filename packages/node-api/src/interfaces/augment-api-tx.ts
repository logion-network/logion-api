// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, U8aFixed, Vec, WrapperKeepOpaque, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { LogionNodeRuntimeOpaqueSessionKeys, PalletAssetsDestroyWitness, PalletLogionLocFile, PalletLogionLocLocLink, PalletLogionLocMetadataItem, PalletMultisigTimepoint, SpCoreVoid, SpFinalityGrandpaEquivocationProof } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/submittable' {
  export interface AugmentedSubmittables<ApiType extends ApiTypes> {
    assets: {
      /**
       * Approve an amount of asset for transfer by a delegated third-party account.
       * 
       * Origin must be Signed.
       * 
       * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
       * for the purpose of holding the approval. If some non-zero amount of assets is already
       * approved from signing account to `delegate`, then it is topped up or unreserved to
       * meet the right value.
       * 
       * NOTE: The signing account does not need to own `amount` of assets at the point of
       * making this call.
       * 
       * - `id`: The identifier of the asset.
       * - `delegate`: The account to delegate permission to transfer asset.
       * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
       * already an approval in place, then this acts additively.
       * 
       * Emits `ApprovedTransfer` on success.
       * 
       * Weight: `O(1)`
       **/
      approveTransfer: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, Compact<u128>]>;
      /**
       * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
       * 
       * Origin must be Signed and the sender should be the Manager of the asset `id`.
       * 
       * Bails with `NoAccount` if the `who` is already dead.
       * 
       * - `id`: The identifier of the asset to have some amount burned.
       * - `who`: The account to be debited from.
       * - `amount`: The maximum amount by which `who`'s balance should be reduced.
       * 
       * Emits `Burned` with the actual amount burned. If this takes the balance to below the
       * minimum for the asset, then the amount burned is increased to take it to zero.
       * 
       * Weight: `O(1)`
       * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
       **/
      burn: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, Compact<u128>]>;
      /**
       * Cancel all of some asset approved for delegated transfer by a third-party account.
       * 
       * Origin must be Signed and there must be an approval in place between signer and
       * `delegate`.
       * 
       * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
       * 
       * - `id`: The identifier of the asset.
       * - `delegate`: The account delegated permission to transfer asset.
       * 
       * Emits `ApprovalCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      cancelApproval: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress]>;
      /**
       * Clear the metadata for an asset.
       * 
       * Origin must be Signed and the sender should be the Owner of the asset `id`.
       * 
       * Any deposit is freed for the asset owner.
       * 
       * - `id`: The identifier of the asset to clear.
       * 
       * Emits `MetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearMetadata: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Issue a new class of fungible assets from a public origin.
       * 
       * This new asset class has no assets initially and its owner is the origin.
       * 
       * The origin must be Signed and the sender must have sufficient funds free.
       * 
       * Funds of sender are reserved by `AssetDeposit`.
       * 
       * Parameters:
       * - `id`: The identifier of the new asset. This must not be currently in use to identify
       * an existing asset.
       * - `admin`: The admin of this class of assets. The admin is the initial address of each
       * member of the asset class's admin team.
       * - `min_balance`: The minimum balance of this new asset that any single account must
       * have. If an account's balance is reduced below this, then it collapses to zero.
       * 
       * Emits `Created` event when successful.
       * 
       * Weight: `O(1)`
       **/
      create: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, minBalance: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, u128]>;
      /**
       * Destroy a class of fungible assets.
       * 
       * The origin must conform to `ForceOrigin` or must be Signed and the sender must be the
       * owner of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be destroyed. This must identify an existing
       * asset.
       * 
       * Emits `Destroyed` event when successful.
       * 
       * NOTE: It can be helpful to first freeze an asset before destroying it so that you
       * can provide accurate witness information and prevent users from manipulating state
       * in a way that can make it harder to destroy.
       * 
       * Weight: `O(c + p + a)` where:
       * - `c = (witness.accounts - witness.sufficients)`
       * - `s = witness.sufficients`
       * - `a = witness.approvals`
       **/
      destroy: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, witness: PalletAssetsDestroyWitness | { accounts?: any; sufficients?: any; approvals?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, PalletAssetsDestroyWitness]>;
      /**
       * Alter the attributes of a given asset.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * - `id`: The identifier of the asset.
       * - `owner`: The new Owner of this asset.
       * - `issuer`: The new Issuer of this asset.
       * - `admin`: The new Admin of this asset.
       * - `freezer`: The new Freezer of this asset.
       * - `min_balance`: The minimum balance of this new asset that any single account must
       * have. If an account's balance is reduced below this, then it collapses to zero.
       * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
       * value to account for the state bloat associated with its balance storage. If set to
       * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
       * an ED in the Balances pallet or whatever else is used to control user-account state
       * growth).
       * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
       * instructions.
       * 
       * Emits `AssetStatusChanged` with the identity of the asset.
       * 
       * Weight: `O(1)`
       **/
      forceAssetStatus: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, issuer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, freezer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, minBalance: Compact<u128> | AnyNumber | Uint8Array, isSufficient: bool | boolean | Uint8Array, isFrozen: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, MultiAddress, MultiAddress, MultiAddress, Compact<u128>, bool, bool]>;
      /**
       * Cancel all of some asset approved for delegated transfer by a third-party account.
       * 
       * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
       * account of the asset `id`.
       * 
       * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
       * 
       * - `id`: The identifier of the asset.
       * - `delegate`: The account delegated permission to transfer asset.
       * 
       * Emits `ApprovalCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      forceCancelApproval: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, MultiAddress]>;
      /**
       * Clear the metadata for an asset.
       * 
       * Origin must be ForceOrigin.
       * 
       * Any deposit is returned.
       * 
       * - `id`: The identifier of the asset to clear.
       * 
       * Emits `MetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      forceClearMetadata: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Issue a new class of fungible assets from a privileged origin.
       * 
       * This new asset class has no assets initially.
       * 
       * The origin must conform to `ForceOrigin`.
       * 
       * Unlike `create`, no funds are reserved.
       * 
       * - `id`: The identifier of the new asset. This must not be currently in use to identify
       * an existing asset.
       * - `owner`: The owner of this class of assets. The owner has full superuser permissions
       * over this asset, but may later change and configure the permissions using
       * `transfer_ownership` and `set_team`.
       * - `min_balance`: The minimum balance of this new asset that any single account must
       * have. If an account's balance is reduced below this, then it collapses to zero.
       * 
       * Emits `ForceCreated` event when successful.
       * 
       * Weight: `O(1)`
       **/
      forceCreate: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, isSufficient: bool | boolean | Uint8Array, minBalance: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, bool, Compact<u128>]>;
      /**
       * Force the metadata for an asset to some value.
       * 
       * Origin must be ForceOrigin.
       * 
       * Any deposit is left alone.
       * 
       * - `id`: The identifier of the asset to update.
       * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
       * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
       * - `decimals`: The number of decimals this asset uses to represent one unit.
       * 
       * Emits `MetadataSet`.
       * 
       * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
       **/
      forceSetMetadata: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array, symbol: Bytes | string | Uint8Array, decimals: u8 | AnyNumber | Uint8Array, isFrozen: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, Bytes, Bytes, u8, bool]>;
      /**
       * Move some assets from one account to another.
       * 
       * Origin must be Signed and the sender should be the Admin of the asset `id`.
       * 
       * - `id`: The identifier of the asset to have some amount transferred.
       * - `source`: The account to be debited.
       * - `dest`: The account to be credited.
       * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
       * `dest`'s balance increased. The amount actually transferred may be slightly greater in
       * the case that the transfer would otherwise take the `source` balance above zero but
       * below the minimum balance. Must be greater than zero.
       * 
       * Emits `Transferred` with the actual amount transferred. If this takes the source balance
       * to below the minimum for the asset, then the amount transferred is increased to take it
       * to zero.
       * 
       * Weight: `O(1)`
       * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
       * `dest`.
       **/
      forceTransfer: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Disallow further unprivileged transfers from an account.
       * 
       * Origin must be Signed and the sender should be the Freezer of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be frozen.
       * - `who`: The account to be frozen.
       * 
       * Emits `Frozen`.
       * 
       * Weight: `O(1)`
       **/
      freeze: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress]>;
      /**
       * Disallow further unprivileged transfers for the asset class.
       * 
       * Origin must be Signed and the sender should be the Freezer of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be frozen.
       * 
       * Emits `Frozen`.
       * 
       * Weight: `O(1)`
       **/
      freezeAsset: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Mint assets of a particular class.
       * 
       * The origin must be Signed and the sender must be the Issuer of the asset `id`.
       * 
       * - `id`: The identifier of the asset to have some amount minted.
       * - `beneficiary`: The account to be credited with the minted assets.
       * - `amount`: The amount of the asset to be minted.
       * 
       * Emits `Issued` event when successful.
       * 
       * Weight: `O(1)`
       * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
       **/
      mint: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, Compact<u128>]>;
      /**
       * Return the deposit (if any) of an asset account.
       * 
       * The origin must be Signed.
       * 
       * - `id`: The identifier of the asset for the account to be created.
       * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
       * 
       * Emits `Refunded` event when successful.
       **/
      refund: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, allowBurn: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, bool]>;
      /**
       * Set the metadata for an asset.
       * 
       * Origin must be Signed and the sender should be the Owner of the asset `id`.
       * 
       * Funds of sender are reserved according to the formula:
       * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
       * account any already reserved funds.
       * 
       * - `id`: The identifier of the asset to update.
       * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
       * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
       * - `decimals`: The number of decimals this asset uses to represent one unit.
       * 
       * Emits `MetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setMetadata: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array, symbol: Bytes | string | Uint8Array, decimals: u8 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, Bytes, Bytes, u8]>;
      /**
       * Change the Issuer, Admin and Freezer of an asset.
       * 
       * Origin must be Signed and the sender should be the Owner of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be frozen.
       * - `issuer`: The new Issuer of this asset.
       * - `admin`: The new Admin of this asset.
       * - `freezer`: The new Freezer of this asset.
       * 
       * Emits `TeamChanged`.
       * 
       * Weight: `O(1)`
       **/
      setTeam: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, issuer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, freezer: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, MultiAddress, MultiAddress]>;
      /**
       * Allow unprivileged transfers from an account again.
       * 
       * Origin must be Signed and the sender should be the Admin of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be frozen.
       * - `who`: The account to be unfrozen.
       * 
       * Emits `Thawed`.
       * 
       * Weight: `O(1)`
       **/
      thaw: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress]>;
      /**
       * Allow unprivileged transfers for the asset again.
       * 
       * Origin must be Signed and the sender should be the Admin of the asset `id`.
       * 
       * - `id`: The identifier of the asset to be thawed.
       * 
       * Emits `Thawed`.
       * 
       * Weight: `O(1)`
       **/
      thawAsset: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Create an asset account for non-provider assets.
       * 
       * A deposit will be taken from the signer account.
       * 
       * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
       * to be taken.
       * - `id`: The identifier of the asset for the account to be created.
       * 
       * Emits `Touched` event when successful.
       **/
      touch: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Move some assets from the sender account to another.
       * 
       * Origin must be Signed.
       * 
       * - `id`: The identifier of the asset to have some amount transferred.
       * - `target`: The account to be credited.
       * - `amount`: The amount by which the sender's balance of assets should be reduced and
       * `target`'s balance increased. The amount actually transferred may be slightly greater in
       * the case that the transfer would otherwise take the sender balance above zero but below
       * the minimum balance. Must be greater than zero.
       * 
       * Emits `Transferred` with the actual amount transferred. If this takes the source balance
       * to below the minimum for the asset, then the amount transferred is increased to take it
       * to zero.
       * 
       * Weight: `O(1)`
       * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
       * `target`.
       **/
      transfer: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, target: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, Compact<u128>]>;
      /**
       * Transfer some asset balance from a previously delegated account to some third-party
       * account.
       * 
       * Origin must be Signed and there must be an approval in place by the `owner` to the
       * signer.
       * 
       * If the entire amount approved for transfer is transferred, then any deposit previously
       * reserved by `approve_transfer` is unreserved.
       * 
       * - `id`: The identifier of the asset.
       * - `owner`: The account which previously approved for a transfer of at least `amount` and
       * from which the asset balance will be withdrawn.
       * - `destination`: The account to which the asset balance of `amount` will be transferred.
       * - `amount`: The amount of assets to transfer.
       * 
       * Emits `TransferredApproved` on success.
       * 
       * Weight: `O(1)`
       **/
      transferApproved: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, destination: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Move some assets from the sender account to another, keeping the sender account alive.
       * 
       * Origin must be Signed.
       * 
       * - `id`: The identifier of the asset to have some amount transferred.
       * - `target`: The account to be credited.
       * - `amount`: The amount by which the sender's balance of assets should be reduced and
       * `target`'s balance increased. The amount actually transferred may be slightly greater in
       * the case that the transfer would otherwise take the sender balance above zero but below
       * the minimum balance. Must be greater than zero.
       * 
       * Emits `Transferred` with the actual amount transferred. If this takes the source balance
       * to below the minimum for the asset, then the amount transferred is increased to take it
       * to zero.
       * 
       * Weight: `O(1)`
       * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
       * `target`.
       **/
      transferKeepAlive: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, target: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress, Compact<u128>]>;
      /**
       * Change the Owner of an asset.
       * 
       * Origin must be Signed and the sender should be the Owner of the asset `id`.
       * 
       * - `id`: The identifier of the asset.
       * - `owner`: The new Owner of this asset.
       * 
       * Emits `OwnerChanged`.
       * 
       * Weight: `O(1)`
       **/
      transferOwnership: AugmentedSubmittable<(id: Compact<u64> | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>, MultiAddress]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    balances: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is not
       * assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Set the balances of a given account.
       * 
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also alter the total issuance of the system (`TotalIssuance`) appropriately.
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * 
       * The dispatch origin for this call is `root`.
       **/
      setBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, newReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u128>]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for input config
       * types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex
       * computation.
       * 
       * Related functions:
       * 
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
       * that the transfer will not kill the origin account.
       * ---------------------------------
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Transfer the entire transferable balance from the caller account.
       * 
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true). # <weight>
       * - O(1). Just like transfer, but reading the user's transferable balance first.
       * #</weight>
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * [`transfer`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has
       * stalled. This will trigger a forced authority set change at the beginning
       * of the next session, to be enacted `delay` blocks after that. The delay
       * should be high enough to safely assume that the block signalling the
       * forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
       * will start the new authority set using the given finalized block as base.
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       * 
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    loAuthorityList: {
      /**
       * Adds a new LO to the list
       **/
      addLegalOfficer: AugmentedSubmittable<(legalOfficerId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Removes a LO from the list
       **/
      removeLegalOfficer: AugmentedSubmittable<(legalOfficerId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    logionLoc: {
      /**
       * Adds an item to a collection
       **/
      addCollectionItem: AugmentedSubmittable<(collectionLocId: Compact<u128> | AnyNumber | Uint8Array, itemId: H256 | string | Uint8Array, itemDescription: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, H256, Bytes]>;
      /**
       * Add file to LOC
       **/
      addFile: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, file: PalletLogionLocFile | { hash_?: any; nature?: any; submitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocFile]>;
      /**
       * Add a link to LOC
       **/
      addLink: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, link: PalletLogionLocLocLink | { id?: any; nature?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocLocLink]>;
      /**
       * Add LOC metadata
       **/
      addMetadata: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, item: PalletLogionLocMetadataItem | { name?: any; value?: any; submitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, PalletLogionLocMetadataItem]>;
      /**
       * Close LOC.
       **/
      close: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Creates a new Collection LOC
       **/
      createCollectionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterAccountId: AccountId32 | string | Uint8Array, collectionLastBlockSubmission: Option<u32> | null | object | string | Uint8Array, collectionMaxSize: Option<u32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32, Option<u32>, Option<u32>]>;
      /**
       * Creates a new logion Identity LOC i.e. a LOC describing a real identity not yet linked to an AccountId
       **/
      createLogionIdentityLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Creates a new logion Transaction LOC i.e. a LOC requested with a logion Identity LOC
       **/
      createLogionTransactionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterLocId: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, u128]>;
      /**
       * Creates a new Polkadot Identity LOC i.e. a LOC linking a real identity to an AccountId.
       **/
      createPolkadotIdentityLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterAccountId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32]>;
      /**
       * Creates a new Polkadot Transaction LOC i.e. a LOC requested with an AccountId
       **/
      createPolkadotTransactionLoc: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, requesterAccountId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32]>;
      /**
       * Make a LOC void.
       **/
      makeVoid: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Make a LOC void and provide a replacer.
       **/
      makeVoidAndReplace: AugmentedSubmittable<(locId: Compact<u128> | AnyNumber | Uint8Array, replacerLocId: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    multisig: {
      /**
       * Register approval for a dispatch to be made from a deterministic composite account if
       * approved by a total of `threshold - 1` of `other_signatories`.
       * 
       * Payment: `DepositBase` will be reserved if this is the first approval, plus
       * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
       * is cancelled.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
       * not the first approval, then it must be `Some`, with the timepoint (block number and
       * transaction index) of the first approval transaction.
       * - `call_hash`: The hash of the call to be executed.
       * 
       * NOTE: If this is the final approval, you will want to use `as_multi` instead.
       * 
       * # <weight>
       * - `O(S)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One encode & hash, both of complexity `O(S)`.
       * - Up to one binary search and insert (`O(logS + S)`).
       * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
       * - One event.
       * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
       * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
       * ----------------------------------
       * - DB Weight:
       * - Read: Multisig Storage, [Caller Account]
       * - Write: Multisig Storage, [Caller Account]
       * # </weight>
       **/
      approveAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | object | string | Uint8Array, callHash: U8aFixed | string | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, U8aFixed, u64]>;
      /**
       * Register approval for a dispatch to be made from a deterministic composite account if
       * approved by a total of `threshold - 1` of `other_signatories`.
       * 
       * If there are enough, then dispatch the call.
       * 
       * Payment: `DepositBase` will be reserved if this is the first approval, plus
       * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
       * is cancelled.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
       * not the first approval, then it must be `Some`, with the timepoint (block number and
       * transaction index) of the first approval transaction.
       * - `call`: The call to be executed.
       * 
       * NOTE: Unless this is the final approval, you will generally want to use
       * `approve_as_multi` instead, since it only requires a hash of the call.
       * 
       * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
       * on success, result is `Ok` and the result from the interior call, if it was executed,
       * may be found in the deposited `MultisigExecuted` event.
       * 
       * # <weight>
       * - `O(S + Z + Call)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
       * - One encode & hash, both of complexity `O(S)`.
       * - Up to one binary search and insert (`O(logS + S)`).
       * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
       * - One event.
       * - The weight of the `call`.
       * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
       * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
       * -------------------------------
       * - DB Weight:
       * - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
       * - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
       * - Plus Call Weight
       * # </weight>
       **/
      asMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | object | string | Uint8Array, call: WrapperKeepOpaque<Call> | object | string | Uint8Array, storeCall: bool | boolean | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, WrapperKeepOpaque<Call>, bool, u64]>;
      /**
       * Immediately dispatch a multi-signature call using a single approval from the caller.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * - `other_signatories`: The accounts (other than the sender) who are part of the
       * multi-signature, but do not participate in the approval process.
       * - `call`: The call to be executed.
       * 
       * Result is equivalent to the dispatched result.
       * 
       * # <weight>
       * O(Z + C) where Z is the length of the call and C its execution weight.
       * -------------------------------
       * - DB Weight: None
       * - Plus Call Weight
       * # </weight>
       **/
      asMultiThreshold1: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Call]>;
      /**
       * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
       * for this operation will be unreserved on success.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `timepoint`: The timepoint (block number and transaction index) of the first approval
       * transaction for this dispatch.
       * - `call_hash`: The hash of the call to be executed.
       * 
       * # <weight>
       * - `O(S)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One encode & hash, both of complexity `O(S)`.
       * - One event.
       * - I/O: 1 read `O(S)`, one remove.
       * - Storage: removes one item.
       * ----------------------------------
       * - DB Weight:
       * - Read: Multisig Storage, [Caller Account], Refund Account, Calls
       * - Write: Multisig Storage, [Caller Account], Refund Account, Calls
       * # </weight>
       **/
      cancelAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, PalletMultisigTimepoint, U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    nodeAuthorization: {
      /**
       * Add additional connections to a given node.
       * 
       * - `node`: identifier of the node.
       * - `connections`: additonal nodes from which the connections are allowed.
       **/
      addConnections: AugmentedSubmittable<(node: Bytes | string | Uint8Array, connections: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Bytes, Vec<Bytes>]>;
      /**
       * Add a node to the set of well known nodes. If the node is already claimed, the owner
       * will be updated and keep the existing additional connection unchanged.
       * 
       * May only be called from `T::AddOrigin`.
       * 
       * - `node`: identifier of the node.
       **/
      addWellKnownNode: AugmentedSubmittable<(node: Bytes | string | Uint8Array, owner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, AccountId32]>;
      /**
       * A given node can be claimed by anyone. The owner should be the first to know its
       * PeerId, so claim it right away!
       * 
       * - `node`: identifier of the node.
       **/
      claimNode: AugmentedSubmittable<(node: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * A claim can be removed by its owner and get back the reservation. The additional
       * connections are also removed. You can't remove a claim on well known nodes, as it
       * needs to reach consensus among the network participants.
       * 
       * - `node`: identifier of the node.
       **/
      removeClaim: AugmentedSubmittable<(node: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Remove additional connections of a given node.
       * 
       * - `node`: identifier of the node.
       * - `connections`: additonal nodes from which the connections are not allowed anymore.
       **/
      removeConnections: AugmentedSubmittable<(node: Bytes | string | Uint8Array, connections: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Bytes, Vec<Bytes>]>;
      /**
       * Remove a node from the set of well known nodes. The ownership and additional
       * connections of the node will also be removed.
       * 
       * May only be called from `T::RemoveOrigin`.
       * 
       * - `node`: identifier of the node.
       **/
      removeWellKnownNode: AugmentedSubmittable<(node: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Reset all the well known nodes. This will not remove the ownership and additional
       * connections for the removed nodes. The node owner can perform further cleaning if
       * they decide to leave the network.
       * 
       * May only be called from `T::ResetOrigin`.
       * 
       * - `nodes`: the new nodes for the allow list.
       **/
      resetWellKnownNodes: AugmentedSubmittable<(nodes: Vec<ITuple<[Bytes, AccountId32]>> | ([Bytes | string | Uint8Array, AccountId32 | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, AccountId32]>>]>;
      /**
       * Swap a well known node to another. Both the ownership and additional connections
       * stay untouched.
       * 
       * May only be called from `T::SwapOrigin`.
       * 
       * - `remove`: the node which will be moved out from the list.
       * - `add`: the node which will be put in the list.
       **/
      swapWellKnownNode: AugmentedSubmittable<(remove: Bytes | string | Uint8Array, add: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes]>;
      /**
       * A node can be transferred to a new owner.
       * 
       * - `node`: identifier of the node.
       * - `owner`: new owner of the node.
       **/
      transferNode: AugmentedSubmittable<(node: Bytes | string | Uint8Array, owner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    recovery: {
      /**
       * Send a call through a recovered account.
       * 
       * The dispatch origin for this call must be _Signed_ and registered to
       * be able to make calls on behalf of the recovered account.
       * 
       * Parameters:
       * - `account`: The recovered account you want to make a call on-behalf-of.
       * - `call`: The call you want to make with the recovered account.
       **/
      asRecovered: AugmentedSubmittable<(account: AccountId32 | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Call]>;
      /**
       * Cancel the ability to use `as_recovered` for `account`.
       * 
       * The dispatch origin for this call must be _Signed_ and registered to
       * be able to make calls on behalf of the recovered account.
       * 
       * Parameters:
       * - `account`: The recovered account you are able to call on-behalf-of.
       **/
      cancelRecovered: AugmentedSubmittable<(account: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Allow a successful rescuer to claim their recovered account.
       * 
       * The dispatch origin for this call must be _Signed_ and must be a "rescuer"
       * who has successfully completed the account recovery process: collected
       * `threshold` or more vouches, waited `delay_period` blocks since initiation.
       * 
       * Parameters:
       * - `account`: The lost account that you want to claim has been successfully recovered by
       * you.
       **/
      claimRecovery: AugmentedSubmittable<(account: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * As the controller of a recoverable account, close an active recovery
       * process for your account.
       * 
       * Payment: By calling this function, the recoverable account will receive
       * the recovery deposit `RecoveryDeposit` placed by the rescuer.
       * 
       * The dispatch origin for this call must be _Signed_ and must be a
       * recoverable account with an active recovery process for it.
       * 
       * Parameters:
       * - `rescuer`: The account trying to rescue this recoverable account.
       **/
      closeRecovery: AugmentedSubmittable<(rescuer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Create a recovery configuration for your account. This makes your account recoverable.
       * 
       * Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
       * will be reserved for storing the recovery configuration. This deposit is returned
       * in full when the user calls `remove_recovery`.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * Parameters:
       * - `friends`: A list of friends you trust to vouch for recovery attempts. Should be
       * ordered and contain no duplicate values.
       * - `threshold`: The number of friends that must vouch for a recovery attempt before the
       * account can be recovered. Should be less than or equal to the length of the list of
       * friends.
       * - `delay_period`: The number of blocks after a recovery attempt is initialized that
       * needs to pass before the account can be recovered.
       **/
      createRecovery: AugmentedSubmittable<(friends: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], threshold: u16 | AnyNumber | Uint8Array, delayPeriod: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, u16, u32]>;
      /**
       * Initiate the process for recovering a recoverable account.
       * 
       * Payment: `RecoveryDeposit` balance will be reserved for initiating the
       * recovery process. This deposit will always be repatriated to the account
       * trying to be recovered. See `close_recovery`.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * Parameters:
       * - `account`: The lost account that you want to recover. This account needs to be
       * recoverable (i.e. have a recovery configuration).
       **/
      initiateRecovery: AugmentedSubmittable<(account: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Remove the recovery process for your account. Recovered accounts are still accessible.
       * 
       * NOTE: The user must make sure to call `close_recovery` on all active
       * recovery attempts before calling this function else it will fail.
       * 
       * Payment: By calling this function the recoverable account will unreserve
       * their recovery configuration deposit.
       * (`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
       * 
       * The dispatch origin for this call must be _Signed_ and must be a
       * recoverable account (i.e. has a recovery configuration).
       **/
      removeRecovery: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Allow ROOT to bypass the recovery process and set an a rescuer account
       * for a lost account directly.
       * 
       * The dispatch origin for this call must be _ROOT_.
       * 
       * Parameters:
       * - `lost`: The "lost account" to be recovered.
       * - `rescuer`: The "rescuer account" which can call as the lost account.
       **/
      setRecovered: AugmentedSubmittable<(lost: AccountId32 | string | Uint8Array, rescuer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Allow a "friend" of a recoverable account to vouch for an active recovery
       * process for that account.
       * 
       * The dispatch origin for this call must be _Signed_ and must be a "friend"
       * for the recoverable account.
       * 
       * Parameters:
       * - `lost`: The lost account that you want to recover.
       * - `rescuer`: The account trying to rescue the lost account that you want to vouch for.
       * 
       * The combination of these two parameters must point to an active recovery
       * process.
       **/
      vouchRecovery: AugmentedSubmittable<(lost: AccountId32 | string | Uint8Array, rescuer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      /**
       * Removes any session key(s) of the function caller.
       * 
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be Signed and the account must be either be
       * convertible to a validator ID using the chain's typical addressing system (this usually
       * means being a controller account) or directly convertible into a validator ID (which
       * usually means being a stash account).
       * 
       * # <weight>
       * - Complexity: `O(1)` in number of key types. Actual cost depends on the number of length
       * of `T::Keys::key_ids()` which is fixed.
       * - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
       * - DbWrites: `NextKeys`, `origin account`
       * - DbWrites per key id: `KeyOwner`
       * # </weight>
       **/
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Sets the session key(s) of the function caller to `keys`.
       * Allows an account to set its session key prior to becoming a validator.
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be signed.
       * 
       * # <weight>
       * - Complexity: `O(1)`. Actual cost depends on the number of length of
       * `T::Keys::key_ids()` which is fixed.
       * - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
       * - DbWrites: `origin account`, `NextKeys`
       * - DbReads per key id: `KeyOwner`
       * - DbWrites per key id: `KeyOwner`
       * # </weight>
       **/
      setKeys: AugmentedSubmittable<(keys: LogionNodeRuntimeOpaqueSessionKeys | { aura?: any; grandpa?: any } | string | Uint8Array, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [LogionNodeRuntimeOpaqueSessionKeys, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Perbill]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * # <weight>
       * - `O(1)`
       * # </weight>
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       * 
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
       * expensive).
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very
       * expensive. We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full
       * block. # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * 
       * The dispatch origin for this call must be `Inherent`.
       * 
       * # <weight>
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    validatorSet: {
      /**
       * Add a new validator.
       * 
       * New validator's session keys should be set in Session pallet before
       * calling this.
       * 
       * The origin can be configured using the `AddRemoveOrigin` type in the
       * host runtime. Can also be set to sudo/root.
       **/
      addValidator: AugmentedSubmittable<(validatorId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Add an approved validator again when it comes back online.
       * 
       * For this call, the dispatch origin must be the validator itself.
       **/
      addValidatorAgain: AugmentedSubmittable<(validatorId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Remove a validator.
       * 
       * The origin can be configured using the `AddRemoveOrigin` type in the
       * host runtime. Can also be set to sudo/root.
       **/
      removeValidator: AugmentedSubmittable<(validatorId: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    vault: {
      /**
       * Approves a vault transfer.
       **/
      approveCall: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: WrapperKeepOpaque<Call> | object | string | Uint8Array, timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, WrapperKeepOpaque<Call>, PalletMultisigTimepoint, u64]>;
      /**
       * Create a vault transfer. The creator must not be a legal officer.
       **/
      requestCall: AugmentedSubmittable<(legalOfficers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], callHash: U8aFixed | string | Uint8Array, maxWeight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, U8aFixed, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    verifiedRecovery: {
      /**
       * Create a recovery configuration for your account. The legal officers must all have closed their Identity LOC.
       **/
      createRecovery: AugmentedSubmittable<(legalOfficers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
