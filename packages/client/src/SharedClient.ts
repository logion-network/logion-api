import { LogionNodeApi } from "@logion/node-api";
import { AccountTokens } from "./AuthenticationClient";

import { AxiosFactory } from "./AxiosFactory";
import { ComponentFactory } from "./ComponentFactory";
import { DirectoryClient } from "./DirectoryClient";
import { Endpoint } from "./Http";
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
    legalOfficers: LegalOfficer[];
    tokens: AccountTokens;
    currentAddress?: string;
}
