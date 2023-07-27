import { v4, parse, stringify, validate } from 'uuid';
import BN from 'bn.js';
import { HexString } from '@polkadot/util/types';

export class UUID {

    constructor(value?: string | Array<number> | Uint8Array) {
        if (value === undefined) {
            this.bytes = parse(v4())
        } else if (typeof value === 'string') {
            this.bytes = parse(value);
        } else {
            this.bytes = [ ...value ];
            stringify(this.bytes);
        }
    }

    static fromAnyString(value: string): UUID | undefined {
        if (validate(value)) {
            return new UUID(value);
        } else {
            return this.fromDecimalString(value)
        }
    }

    static fromDecimalString(value: string): UUID | undefined {
        try {
            return UUID.fromDecimalStringOrThrow(value);
        } catch (error) {
            return undefined;
        }
    }

    static fromDecimalStringOrThrow(value: string): UUID {
        if (!/^\d+$/.test(value)) {
            throw new Error(`Unexpected format: ${value}`);
        }
        const numbers = new BN(value, 10).toArray(undefined, 16);
        return new UUID(numbers);
    }

    private bytes: ArrayLike<number>;

    toString(): string {
        return stringify(this.bytes);
    }

    toHexString(): HexString {
        return `0x${ this.toString().replace(/-/g, "") }`;
    }

    toDecimalString(): string {
        const hexString = this.toString().replace(/-/g, "");
        return new BN(hexString, 16).toString(10);
    }
}

export function toDecimalString(value: string): string {
    return new UUID(value).toDecimalString();
}
