import type { Codec } from '@polkadot/types-codec/types';
import { MIN_SUPPORTED_PARA_VERSION, SOLO_VERSION, LOGION_SPEC_NAME, SS58_PREFIX } from '../src/index.js';
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
            toString: () => LOGION_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => SOLO_VERSION,
        },
    };
}

export function mockParaRuntimeVersion() {
    return {
        specName: {
            toString: () => LOGION_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => MIN_SUPPORTED_PARA_VERSION,
        },
    };
}

export function mockRuntimeVersionUnexpectedSpecName() {
    return {
        specName: {
            toString: () => "not-logion",
        },
        specVersion: {
            toBigInt: () => MIN_SUPPORTED_PARA_VERSION,
        },
    };
}

export function mockRuntimeVersionUnexpectedSpecVersion() {
    return {
        specName: {
            toString: () => LOGION_SPEC_NAME,
        },
        specVersion: {
            toBigInt: () => 42n,
        },
    };
}

export function mockParaConsts() {
    return mockConsts(SS58_PREFIX);
}

export function mockConsts(ss58Prefix: number) {
    return {
        system: {
            ss58Prefix: {
                toNumber: () => ss58Prefix,
            }
        }
    };
}
