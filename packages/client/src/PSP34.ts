import { Hash } from "@logion/node-api";

/**
 * This is a rewrite of the function `get_item_id` implemented by Logion Smart Contract:
 * https://github.com/logion-network/logion-ink/blob/41d7aeb1ac746d8a557f0592f82f0bcb206f6e7a/logics/impls/logion.rs#L38-L43
 */

export type TokenIdType = "U8" | "U16" | "U32" | "U64" | "U128" | "Bytes";

export function generatePSP34TokenItemId(nonce: string, tokenId: { value: string, type: TokenIdType }) {

    const idValue = tokenId.type === "Bytes" ?
        Hash.of(tokenId.value).toHex() :
        tokenId.value;
    const itemIdSeed = `${ nonce }:${ tokenId.type }(${ idValue })`;
    return Hash.of(itemIdSeed);
}
