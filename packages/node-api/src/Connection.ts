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
import { Vault } from './VaultClass.js';
import { LocBatch } from './LocBatch.js';
import { UUID } from './UUID.js';
import { LegalOfficerCase, VerifiedIssuerType } from './Types.js';

/**
 * @deprecated use LogionNodeApiClass
 */
export type LogionNodeApi = ApiPromise;

/**
 * @deprecated use buildApiClass()
 */
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
        this.fees = new FeesEstimator(api, this.adapters);
        this.queries = new Queries(api, this.adapters);
    }

    readonly polkadot: ApiPromise;
    readonly adapters: Adapters;
    readonly fees: FeesEstimator;
    readonly queries: Queries;
    readonly time = {
        now: () => ChainTime.now(this.polkadot),
    }

    vault(requester: string, legalOfficers: string[]) {
        return new Vault(this.polkadot, requester, legalOfficers);
    }

    readonly batch = {
        /**
         * Builds a LocBatch instance.
         * 
         * @param ids The LOCs to consider.
         * @param locs DEPRECATED - this parameter will be removed
         * @param availableVerifiedIssuers DEPRECATED - this parameter will be removed
         * @returns a LocBatch instance
         */
        locs: (ids: UUID[], locs?: Record<string, LegalOfficerCase>, availableVerifiedIssuers?: Record<string, VerifiedIssuerType[]>) => new LocBatch({
            api: this.polkadot,
            adapters: this.adapters,
            locIds: ids,
            locs,
            availableVerifiedIssuers,
        }),
    }
}

export async function buildApiClass(endpoint: string | string[]): Promise<LogionNodeApiClass> {
    const provider = buildProvider(endpoint);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    const api = await ApiPromise.create({
        provider,
        types,
        rpc: jsonrpc,
        runtime: definitions.runtime.runtime,
    });
    return new LogionNodeApiClass(api);
}
