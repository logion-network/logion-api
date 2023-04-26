import { stringToHex, hexToString } from "@polkadot/util";

/**
 * @deprecated use @polkadot/util's stringToHex
 */
export function toHex(source: string) {
    return stringToHex(source);
}

/**
 * @deprecated use @polkadot/util's hexToString.
 * WARNING: unlike fromHex, hexToString does not throw an error when given hex is not prefixed with "0x".
 * If given string is a valid hex digits sequence, the function will successfully convert to string.
 */
export function fromHex(hex: string) {
    return hexToString(hex);
}
