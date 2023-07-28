import { Hash as Digest } from 'fast-sha256';
import { HexString } from "@polkadot/util/types";
import { stringToU8a } from '@polkadot/util';

export class Hash {

    static fromHex(hex: HexString): Hash {
        if(!Hash.isValidHexHash(hex)) {
            throw new Error("Invalid hex string, must start with '0x' followed by 64 hexadecimal digits");
        }
        return new Hash(new Uint8Array(Buffer.from(hex.substring(2), 'hex')));
    }

    static fromDigest(digest: Digest): Hash {
        const bytes = digest.digest();
        return new Hash(bytes);
    }

    static of(data: string): Hash {
        const digest = new Digest();
        const bytes = stringToU8a(data);
        digest.update(bytes);
        return Hash.fromDigest(digest);
    }

    static isValidHexHash(hash: HexString): boolean {
        return hash.startsWith("0x")
            && hash.length === 66
            && hash.slice(2).search(/[^0-9a-f]/) === -1;
    }

    static isValidBytes(bytes: Uint8Array): boolean {
        return bytes.length == 32;
    }

    constructor(bytes: Uint8Array) {
        if(!Hash.isValidBytes(bytes)) {
            throw new Error(`Array must be 32 bytes long, got ${ bytes.length }`);
        }
        this._bytes = bytes;
    }

    private _bytes: Uint8Array;

    get bytes(): Uint8Array {
        return this._bytes;
    }

    toHex(): HexString {
        return `0x${ Buffer.from(this._bytes).toString('hex') }`;
    }

    equalTo(other: Hash): boolean {
        return this.toHex() === other.toHex();
    }
}
