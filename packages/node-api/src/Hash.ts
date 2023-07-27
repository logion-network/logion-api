import { Hash as Hasher } from 'fast-sha256';
import { HexString } from "@polkadot/util/types";
import { stringToU8a } from '@polkadot/util';

export type Hash = HexString;

export function hashString(data: string): Hash {
    const digest = new Hasher();
    const bytes = stringToU8a(data);
    digest.update(bytes);
    return digestToHex(digest);
}

export function digestToHex(digest: Hasher): Hash {
    return `0x${ Buffer.from(digest.digest()).toString('hex') }`;
}
