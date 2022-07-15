import { LogionNodeApi, buildApi } from "@logion/node-api";
import { AuthenticationClient } from "./AuthenticationClient";
import { AxiosFactory } from "./AxiosFactory";
import { DirectoryClient } from "./DirectoryClient";
import { NetworkState } from "./NetworkState";
import { LegalOfficerEndpoint } from "./SharedClient";
import { LegalOfficer } from "./Types";

export interface FormDataLike {
    append(name: string, value: any, fileName?: string): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type FileLike = File | Blob | Buffer | string; // string is the path to the file

export interface ComponentFactory {
    buildAxiosFactory: () => AxiosFactory;
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => DirectoryClient;
    buildAuthenticationClient: (directoryEndpoint: string, legalOfficers: LegalOfficer[], axiosFactory: AxiosFactory) => AuthenticationClient;
    buildNetworkState(nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]): NetworkState<LegalOfficerEndpoint>;
    buildNodeApi(rpcEndpoints: string[]): Promise<LogionNodeApi>;
    buildFormData: () => FormDataLike;
}

export const DefaultComponentFactory: ComponentFactory = {
    buildAxiosFactory: () => new AxiosFactory(),
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => new DirectoryClient(directoryEndpoint, axiosFactory, token),
    buildAuthenticationClient: (directoryEndpoint: string, legalOfficers: LegalOfficer[], axiosFactory: AxiosFactory) => new AuthenticationClient(directoryEndpoint, legalOfficers, axiosFactory),
    buildNetworkState: (nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]) => new NetworkState(nodesUp, nodesDown),
    buildNodeApi: (rpcEndpoints: string[]) => buildApi(rpcEndpoints),
    buildFormData: () => new FormData(),
};
