import { LogionNodeApi } from "@logion/node-api";

import { AxiosFactory } from "./AxiosFactory";
import { ComponentFactory } from "./ComponentFactory";
import { DirectoryClient } from "./DirectoryClient";
import { Endpoint, Token } from "./Http";
import { NetworkState } from "./NetworkState";
import { LegalOfficer } from "./Types";

export interface LogionClientConfig {
    rpcEndpoints: string[];
    directoryEndpoint: string;
}

export interface LegalOfficerEndpoint extends Endpoint {
    legalOfficer: string;
}


export interface SharedState {
    config: LogionClientConfig;
    componentFactory: ComponentFactory;
    axiosFactory: AxiosFactory;
    directoryClient: DirectoryClient;
    networkState: NetworkState<LegalOfficerEndpoint>;
    nodeApi: LogionNodeApi;
}

export interface AuthenticatedSharedState extends SharedState {
    currentAddress: string;
    token: Token;
    legalOfficers: LegalOfficer[];
}
