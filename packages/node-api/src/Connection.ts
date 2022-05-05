import './interfaces/augment-api';
import './interfaces/augment-types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import * as definitions from './interfaces/definitions';

export async function buildApi(endpoint: string | string[]): Promise<ApiPromise> {
    const provider = buildProvider(endpoint);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    return await ApiPromise.create({ provider, types, rpc: { ...jsonrpc } });
}

function buildProvider(endpoint: string | string[]): WsProvider {
    return new WsProvider(endpoint, 100);
}
