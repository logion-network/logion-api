import { AxiosInstance } from 'axios';
import { DateTime } from 'luxon';

import { AxiosFactory } from './AxiosFactory';
import { LegalOfficerEndpoint } from "./SharedClient";
import { LegalOfficer } from "./Types";
import { NetworkState } from "./NetworkState";

export interface Token {
    readonly value: string;
    readonly expirationDateTime: DateTime;
}

export interface Endpoint {
    url: string;
}

export type MultiResponse<R> = Record<string, R>;

export interface MultiSourceHttpClientState<E extends Endpoint> {
    nodesUp: E[];
    nodesDown: E[];
}

export function allUp<E extends Endpoint>(endpoints: E[]): MultiSourceHttpClientState<E> {
    return {
        nodesUp: endpoints,
        nodesDown: []
    }
}

export type Query<E, R> = (axios: AxiosInstance, endpoint: E) => Promise<R>;

export class MultiSourceHttpClient<E extends Endpoint, R> {

    constructor(initialState: MultiSourceHttpClientState<E>, axiosFactory: AxiosFactory, token?: string) {
        this.nodesUp = initialState.nodesUp.slice(0);
        this.nodesDown = initialState.nodesDown.slice(0);
        this.token = token;
        this.axiosFactory = axiosFactory;
    }

    private nodesUp: E[];

    private nodesDown: E[];

    private token?: string;

    private axiosFactory: AxiosFactory;

    async fetch(query: Query<E, R>): Promise<MultiResponse<R>> {
        const currentNodesUp = this.nodesUp.slice(0);
        this.nodesUp = [];

        const promises = currentNodesUp.map(node => query(this.axiosFactory.buildAxiosInstance(node.url, this.token), node));
        const allSettled = await Promise.allSettled(promises);
        const multiResponse: MultiResponse<R> = {};
        for(let i = 0; i < allSettled.length; ++i) {
            const promiseResult = allSettled[i];
            if(promiseResult.status === 'fulfilled') {
                multiResponse[currentNodesUp[i].url] = promiseResult.value;
                this.nodesUp.push(currentNodesUp[i]);
            } else {
                this.nodesDown.push(currentNodesUp[i]);
            }
        }
        return multiResponse;
    }

    getState(): MultiSourceHttpClientState<E> {
        return {
            nodesUp: this.nodesUp.slice(0),
            nodesDown: this.nodesDown.slice(0)
        };
    }
}

export function initMultiSourceHttpClientState(networkState: NetworkState<LegalOfficerEndpoint>, legalOfficers?: LegalOfficer[]): MultiSourceHttpClientState<LegalOfficerEndpoint> {
    let initialState: MultiSourceHttpClientState<LegalOfficerEndpoint>;
    if(legalOfficers !== undefined) {
        initialState = {
            nodesUp: legalOfficers.map(legalOfficer => ({
                url: legalOfficer.node,
                legalOfficer: legalOfficer.address
            })),
            nodesDown: [],
        };
    } else {
        initialState = {
            nodesUp: networkState.nodesUp,
            nodesDown: networkState.nodesDown,
        };
    }
    return initialState;
}

export class AnySourceHttpClient<E extends Endpoint, R> {

    constructor(initialState: MultiSourceHttpClientState<E>, axiosFactory: AxiosFactory, token?: string) {
        this.nodesUp = initialState.nodesUp.slice(0);
        this.nodesDown = initialState.nodesDown.slice(0);
        this.token = token;
        this.axiosFactory = axiosFactory;
    }

    private nodesUp: E[];

    private nodesDown: E[];

    private token?: string;

    private axiosFactory: AxiosFactory;

    async fetch(query: Query<E, R>): Promise<R | undefined> {
        while(this.nodesUp.length > 0) {
            const selectedEndpointIndex = this.selectedEndpointIndex();
            const selectedEndpoint = this.nodesUp[selectedEndpointIndex];
            try {
                return await query(this.axiosFactory.buildAxiosInstance(selectedEndpoint.url, this.token), selectedEndpoint);
            } catch(error) {
                this.nodesUp.splice(selectedEndpointIndex, 1);
                this.nodesDown.push(selectedEndpoint);
            }
        }
        return undefined;
    }

    private selectedEndpointIndex(): number {
        return Math.floor(Math.random() * this.nodesUp.length);
    }

    getState(): MultiSourceHttpClientState<E> {
        return {
            nodesUp: this.nodesUp.slice(0),
            nodesDown: this.nodesDown.slice(0)
        };
    }
}

export function aggregateArrays<E>(response: MultiResponse<E[]>): E[] {
    let array: E[] = [];
    for(const key in response) {
        array = array.concat(response[key]);
    }
    return array;
}
