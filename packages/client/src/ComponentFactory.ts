import { LogionNodeApiClass, buildApiClass } from "@logion/node-api";
import { AuthenticationClient } from "./AuthenticationClient.js";
import { AxiosFactory } from "./AxiosFactory.js";
import { DirectoryClient } from "./DirectoryClient.js";
import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { LegalOfficerClass } from "./Types.js";

export interface FormDataLike {
    append(name: string, value: any, fileName?: string): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type FileLike = File | Blob | Buffer | string; // string is the path to the file

export type UploadableData = File | Blob | Buffer | NodeJS.ReadableStream;

export interface ComponentFactory {
    buildAxiosFactory: () => AxiosFactory;
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => DirectoryClient;
    buildAuthenticationClient: (api: LogionNodeApiClass, directoryEndpoint: string, legalOfficers: LegalOfficerClass[], axiosFactory: AxiosFactory) => AuthenticationClient;
    buildNetworkState(nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]): NetworkState<LegalOfficerEndpoint>;
    buildNodeApi(rpcEndpoints: string[]): Promise<LogionNodeApiClass>;
    buildFormData: () => FormDataLike;
}

export const DefaultComponentFactory: ComponentFactory = {
    buildAxiosFactory: () => new AxiosFactory(),
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => new DirectoryClient(directoryEndpoint, axiosFactory, token),
    buildAuthenticationClient: (api: LogionNodeApiClass, directoryEndpoint: string, legalOfficers: LegalOfficerClass[], axiosFactory: AxiosFactory) => new AuthenticationClient(api, directoryEndpoint, legalOfficers, axiosFactory),
    buildNetworkState: (nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]) => new NetworkState(nodesUp, nodesDown),
    buildNodeApi: (rpcEndpoints: string[]) => buildApiClass(rpcEndpoints),
    buildFormData: () => new FormData(),
};
