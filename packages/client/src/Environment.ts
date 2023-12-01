import { LogionClientConfig } from "./SharedClient.js";
import { FileUploader } from "./ComponentFactory.js";

export enum Environment {
    DEV = 'DEV',
    TEST = 'TEST',
    MVP = 'MVP',
}

const endpoints: Record<Environment, Omit<LogionClientConfig, 'buildFileUploader'>> = {
    DEV: {
        rpcEndpoints: [ "wss://dev-rpc01.logion.network" ],
        directoryEndpoint: "https://dev-directory.logion.network",
    },
    TEST: {
        rpcEndpoints: [ "wss://test-rpc01.logion.network" ],
        directoryEndpoint: "https://test-directory.logion.network",
    },
    MVP: {
        rpcEndpoints: [ "wss://rpc01.logion.network", "wss://rpc02.logion.network" ],
        directoryEndpoint: "https://directory.logion.network",
    }
}

export type EnvironmentString = keyof typeof Environment;

export function validEnvironmentOrThrow(environmentString: EnvironmentString): Environment {
    const env = Environment[environmentString];
    if (env) {
        return env
    } else {
        throw Error(`Invalid environment: [${ environmentString }]`);
    }
}

export function createLogionClientConfig(env: Environment, buildFileUploader: () => FileUploader): LogionClientConfig {
    return {
        ...endpoints[env],
        buildFileUploader
    }
}

