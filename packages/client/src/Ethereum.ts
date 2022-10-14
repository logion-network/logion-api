import { hashString } from "./Hash";

/**
 * This is a rewrite of the function `getItemId` implemented by Logion Smart Contract:
 * https://github.com/logion-network/logion-solidity/blob/main/contracts/Logion.sol
 */
export function generateEthereumTokenItemId(nonce: string, tokenId: string) {
    const itemId = `${nonce}${tokenId}`;
    return hashString(itemId);
}
