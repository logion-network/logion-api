import './interfaces/types-lookup.js';
import './interfaces/augment-api.js';
import './interfaces/augment-types.js';
import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import * as definitions from './interfaces/definitions.js';

export type LogionNodeApi = ApiPromise;

export async function buildApi(endpoint: string | string[]): Promise<LogionNodeApi> {
    const provider = buildProvider(endpoint);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    return await ApiPromise.create({
        provider,
        types,
        rpc: jsonrpc,
    });
}

function buildProvider(endpoint: string | string[]): WsProvider {
    let endpoints: string[];
    if(typeof endpoint === "string") {
        endpoints = [ endpoint ];
    } else {
        endpoints = endpoint;
        endpoints.sort(() => Math.random() - 0.5);
    }
    return new WsProvider(endpoints, 100);
}
