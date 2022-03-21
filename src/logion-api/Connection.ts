import './interfaces/augment-api';
import './interfaces/augment-types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import * as definitions from './interfaces/definitions';

export interface NodeMetadata {
    peerId: string
}

export interface Node {
    socket: string;
    peerId: string;
}

export interface ConfigType {
    APP_NAME: string,
    DEVELOPMENT_KEYRING: boolean,
    PROVIDER_SOCKET?: string,
    RPC: object,
    directory: string,
    edgeNodes: Node[],
}

export async function buildApi(config: ConfigType): Promise<ApiPromise> {
    const providerSocket = config.PROVIDER_SOCKET;
    const provider = buildProvider(providerSocket, config);
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    return await ApiPromise.create({ provider, types, rpc: { ...jsonrpc, ...config.RPC } });
}

function buildProvider(providerSocket: string | undefined, config: ConfigType): WsProvider {
    if(providerSocket !== undefined) {
        return new WsProvider(providerSocket);
    } else {
        const sockets = config.edgeNodes.map(node => node.socket);
        sockets.sort(() => Math.random() - 0.5);
        return new WsProvider(sockets, 100);
    }
}
