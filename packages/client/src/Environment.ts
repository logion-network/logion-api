import { LogionClientConfig } from "./SharedClient.js";
import { FileUploader } from "./ComponentFactory.js";
import { UUID } from "@logion/node-api";

export enum Environment {
    DEV = 'DEV',
    TEST = 'TEST',
    MVP = 'MVP',
}

const configs: Record<Environment, Omit<LogionClientConfig, 'buildFileUploader'>> = {
    DEV: {
        rpcEndpoints: [ "wss://dev-rpc01.logion.network" ],
        directoryEndpoint: "https://dev-directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("229858905135790300364920790577257842944"),
        creativeCommonsLoc: UUID.fromDecimalStringOrThrow("238252136510269500314784833180701623867"),
    },
    TEST: {
        rpcEndpoints: [ "wss://test-rpc01.logion.network" ],
        directoryEndpoint: "https://test-directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("282936933702588204161845152150370047407"),
    },
    MVP: {
        rpcEndpoints: [ "wss://rpc01.logion.network", "wss://rpc02.logion.network" ],
        directoryEndpoint: "https://directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("85815882149698756717105061322008904805"),
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
        ...configs[env],
        buildFileUploader
    }
}

