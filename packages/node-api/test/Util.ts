import type { Codec } from '@polkadot/types-codec/types';
import { AnyAccountId, ValidAccountId } from '../src/index.js';
import { bool } from "@polkadot/types-codec";

export function createdPolkadotType(content: object): any {
    return jasmine.arrayContaining([jasmine.objectContaining(content)]);
}

export function mockCodecWithToString<T extends Codec>(value: string): T {
    return ({
        toString: () => value,
    }) as T;
}

export function mockValidAccountId(address: string): ValidAccountId {
    const api = {
        createType: (_type: string, ...args: any[]) => args,
    } as any;
    return new AnyAccountId(api, address, "Polkadot").toValidAccountId();
}

export const POLKADOT_API_CREATE_TYPE = (_type: string, ...args: any[]) => args;

export function mockBool(value: boolean): bool {
    return ({
        isTrue: value,
        isFalse: !value,
    }) as bool;
}
