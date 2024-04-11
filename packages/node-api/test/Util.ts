import type { Codec } from '@polkadot/types-codec/types';
import { AnyAccountId, EXPECTED_PARA_VERSION, EXPECTED_SOLO_VERSION, EXPECTED_SPEC_NAME, ValidAccountId } from '../src/index.js';
import { bool } from "@polkadot/types-codec";

export function mockCodecWithToString<T extends Codec>(value: string): T {
    return ({
        toString: () => value,
    }) as T;
}

export function mockCodecWithToBigInt<T>(value: bigint): T {
    return ({
        toBigInt: () => value,
    }) as T;
}

export const POLKADOT_API_CREATE_TYPE = (_type: string, ...args: any[]) => args;

export function mockBool(value: boolean): bool {
    return ({
        isTrue: value,
        isFalse: !value,
    }) as bool;
}

export function mockSoloRuntimeVersion() {
    return {
        specName: {
            toString: () => EXPECTED_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => EXPECTED_SOLO_VERSION,
        },
    };
}

export function mockParaRuntimeVersion() {
    return {
        specName: {
            toString: () => EXPECTED_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => EXPECTED_PARA_VERSION,
        },
    };
}

export function mockRuntimeVersionUnexpectedSpecName() {
    return {
        specName: {
            toString: () => "not-logion",
        },
        specVersion: {
            toBigInt: () => EXPECTED_PARA_VERSION,
        },
    };
}

export function mockRuntimeVersionUnexpectedSpecVersion() {
    return {
        specName: {
            toString: () => EXPECTED_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => 42n,
        },
    };
}
