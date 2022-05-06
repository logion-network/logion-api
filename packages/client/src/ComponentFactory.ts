import { AuthenticationClient } from "./AuthenticationClient";
import { AxiosFactory } from "./AxiosFactory";
import { DirectoryClient } from "./DirectoryClient";
import { LegalOfficer } from "./Types";

export interface ComponentFactory {
    buildAxiosFactory: () => AxiosFactory;
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => DirectoryClient;
    buildAuthenticationClient: (directoryEndpoint: string, legalOfficers: LegalOfficer[], axiosFactory: AxiosFactory) => AuthenticationClient;
}

export const DefaultComponentFactory = {
    buildAxiosFactory: () => new AxiosFactory(),
    buildDirectoryClient: (directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => new DirectoryClient(directoryEndpoint, axiosFactory, token),
    buildAuthenticationClient: (directoryEndpoint: string, legalOfficers: LegalOfficer[], axiosFactory: AxiosFactory) => new AuthenticationClient(directoryEndpoint, legalOfficers, axiosFactory),
};
