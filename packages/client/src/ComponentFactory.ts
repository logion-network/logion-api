import { LogionNodeApiClass, buildApiClass, Hash } from "@logion/node-api";
import { AuthenticationClient } from "./AuthenticationClient.js";
import { AxiosFactory } from "./AxiosFactory.js";
import { DirectoryClient } from "./DirectoryClient.js";
import { NetworkState } from "./NetworkState.js";
import { LegalOfficerEndpoint } from "./SharedClient.js";
import { LegalOfficerClass } from "./Types.js";
import axios from "axios";
import { newBackendError } from "./Error.js";

export interface HashAndSize {
    hash: Hash;
    size: bigint;
}

export abstract class File {

    abstract getHashAndSize(): Promise<HashAndSize>;
}

export interface FileUploadParameters {
    endpoint: string;
    files: FileToUpload[];
    fields: NameValue[];
    headers: Record<string, string>;
}

export interface FileToUpload {
    file: File;
    name: string;
    field: string;
}

export interface NameValue {
    name: string;
    value: string;
}

export interface FileUploader {
    upload(parameters: FileUploadParameters): Promise<void>;
}

export interface FormDataLike {
    append(name: string, value: any, fileName?: string): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export abstract class AxiosFileUploader implements FileUploader {

    async upload(parameters: FileUploadParameters): Promise<void> {
        const formData = this.buildFormData();
        for(const file of parameters.files) {
            formData.append(file.field, await this.toFormDataValue(file.file), file.name);
        }
        for(const field of parameters.fields) {
            formData.append(field.name, field.value);
        }

        try {
            await axios.post(
                parameters.endpoint,
                formData,
                {
                    headers: parameters.headers,
                }
            );
        } catch(e) {
            throw newBackendError(e);
        }
    }

    abstract buildFormData(): FormDataLike;

    abstract toFormDataValue(file: File): Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface CoreComponentFactory {
    buildAxiosFactory: () => AxiosFactory;
    buildDirectoryClient: (api: LogionNodeApiClass, directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => DirectoryClient;
    buildAuthenticationClient: (api: LogionNodeApiClass, directoryEndpoint: string, legalOfficers: LegalOfficerClass[], axiosFactory: AxiosFactory) => AuthenticationClient;
    buildNetworkState(nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]): NetworkState<LegalOfficerEndpoint>;
    buildNodeApi(rpcEndpoints: string[]): Promise<LogionNodeApiClass>;
}

export const CoreComponentFactoryInstance: CoreComponentFactory = {
    buildAxiosFactory: () => new AxiosFactory(),
    buildDirectoryClient: (api: LogionNodeApiClass, directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) => new DirectoryClient(api, directoryEndpoint, axiosFactory, token),
    buildAuthenticationClient: (api: LogionNodeApiClass, directoryEndpoint: string, legalOfficers: LegalOfficerClass[], axiosFactory: AxiosFactory) => new AuthenticationClient(api, directoryEndpoint, legalOfficers, axiosFactory),
    buildNetworkState: (nodesUp: LegalOfficerEndpoint[], nodesDown: LegalOfficerEndpoint[]) => new NetworkState(nodesUp, nodesDown),
    buildNodeApi: (rpcEndpoints: string[]) => buildApiClass(rpcEndpoints),
};

export interface ComponentFactory extends CoreComponentFactory {
    buildFileUploader: () => FileUploader;
}

export function buildComponentFactory(buildFileUploader: () => FileUploader): ComponentFactory {
    return {
        ...CoreComponentFactoryInstance,
        buildFileUploader,
    };
}
