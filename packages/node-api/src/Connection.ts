import './interfaces/types-lookup.js';
import './interfaces/augment-api.js';
import './interfaces/augment-types.js';
import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import * as definitions from './interfaces/definitions.js';
import { Adapters } from './Adapters.js';
import { FeesEstimator } from './FeesEstimator.js';
import { Queries } from './Queries.js';
import { ChainTime } from './ChainTime.js';

export type LogionNodeApi = ApiPromise;

export async function buildApi(endpoint: string | string[]): Promise<LogionNodeApi> {
    const provider = buildProvider(endpoint);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    return await ApiPromise.create({
        provider,
        types,
        rpc: jsonrpc,
        runtime: definitions.runtime.runtime,
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

export class LogionNodeApiClass {

    constructor(api: ApiPromise) {
        this.polkadot = api;
        this.adapters = new Adapters(api);
        this.fees = new FeesEstimator(api);
        this.queries = new Queries(api, this.adapters);
    }

    readonly polkadot: ApiPromise;
    readonly adapters: Adapters;
    readonly fees: FeesEstimator;
    readonly queries: Queries;
    readonly time = {
        now: () => ChainTime.now(this.polkadot),
    }
}

export async function buildApiClass(endpoint: string | string[]): Promise<LogionNodeApiClass> {
    const provider = buildProvider(endpoint);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    const api = await ApiPromise.create({
        provider,
        types,
        rpc: jsonrpc,
    });
    return new LogionNodeApiClass(api);
}
