import { AxiosFactory } from "./AxiosFactory";
import { ComponentFactory } from "./ComponentFactory";
import { DirectoryClient } from "./DirectoryClient";

export interface LogionClientConfig {
    rpcEndpoints: string[];
    directoryEndpoint: string;
}

export interface SharedState {
    config: LogionClientConfig;
    componentFactory: ComponentFactory;
    axiosFactory: AxiosFactory;
    directoryClient: DirectoryClient;
}
