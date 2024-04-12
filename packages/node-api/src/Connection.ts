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
import { LegalOfficerCase, VerifiedIssuerType, SS58_PREFIX, ValidAccountId } from './Types.js';
import { Batching } from "./Batching.js";
import { Lgnt } from "./Currency.js"

export type ChainType = "Solo" | "Para";

export const EXPECTED_SPEC_NAME = "logion";

export const EXPECTED_SOLO_VERSION = 164n;

export const EXPECTED_PARA_VERSION = 3000n;

/**
 * A Logion chain client. An instance of this class provides
 * direct access to the Polkadot API but also to Logion-specific
 * features and helpers.
 */
export class LogionNodeApiClass {

    /**
     * Creates a connected Logion chain client.
     * @param endpoint the URL(s) of the RPCs to connect to.
     * @returns A promise resolving to a connected Logion chain client.
     */
    static async connect(endpoint: string | string[]): Promise<LogionNodeApiClass> {
        const provider = LogionNodeApiClass.buildProvider(endpoint);
        const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
        const api = await ApiPromise.create({
            provider,
            types,
            rpc: jsonrpc,
            runtime: definitions.runtime.runtime,
        });

        const logionApi = new LogionNodeApiClass(api);

        const chainDecimals = (await api.rpc.system.properties()).tokenDecimals.unwrap()[0].toNumber();
        if (chainDecimals !== Lgnt.DECIMALS) {
            throw new Error(`Chain Decimals ${ chainDecimals } differs from public constant Lgnt.DECIMALS = ${ Lgnt.DECIMALS }`);
        }

        return logionApi;
    }

    private static buildProvider(endpoint: string | string[]): WsProvider {
        let endpoints: string[];
        if(typeof endpoint === "string") {
            endpoints = [ endpoint ];
        } else {
            endpoints = endpoint;
            endpoints.sort(() => Math.random() - 0.5);
        }
        return new WsProvider(endpoints, 100);
    }

    constructor(api: ApiPromise) {
        this.polkadot = api;
        this.chainType = this.detectChainType();
        if(this.chainType !== "Para") {
            throw new Error(`This version of the SDK does not have support for chain type ${ this.chainType }`);
        }
        const chainPrefix = api.consts.system.ss58Prefix.toNumber();
        if (chainPrefix !== SS58_PREFIX) {
            throw new Error(`Chain Prefix ${ chainPrefix } differs from public constant SS58_PREFIX = ${ SS58_PREFIX }`);
        }
        this.adapters = new Adapters(api);
        this.fees = new FeesEstimator(api);
        this.queries = new Queries(api, this.adapters);
        this.batching = new Batching(api);
    }

    readonly polkadot: ApiPromise;
    readonly chainType: ChainType;

    private detectChainType(): ChainType {
        const chainSpecName = this.polkadot.runtimeVersion.specName.toString();
        if(chainSpecName !== EXPECTED_SPEC_NAME) {
            throw new Error(`Unexpected chain '${chainSpecName}'`);
        }

        const chainSpecVersion = this.polkadot.runtimeVersion.specVersion.toBigInt();
        if(chainSpecVersion === EXPECTED_SOLO_VERSION) {
            return "Solo";
        } else if(chainSpecVersion === EXPECTED_PARA_VERSION) {
            return "Para";
        } else {
            throw new Error(`Unsupported runtime version '${chainSpecVersion}'`);
        }
    }

    readonly adapters: Adapters;
    readonly fees: FeesEstimator;
    readonly queries: Queries;
    readonly batching: Batching;
    readonly time = {
        now: () => ChainTime.now(this.polkadot),
    }

    vault(requester: ValidAccountId, legalOfficers: ValidAccountId[]) {
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

/**
 * Builds a connected interface to the Logion chain.
 * @param endpoint the URL(s) of the RPCs to connect to
 * @returns A connected Logion chain client
 * @deprecated Use `LogionNodeApiClass.connect(endpoint)` instead
 */
export async function buildApiClass(endpoint: string | string[]): Promise<LogionNodeApiClass> {
    return LogionNodeApiClass.connect(endpoint);
}
