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
        rpcEndpoints: [ "wss://dev-para-rpc01.logion.network" ],
        directoryEndpoint: "https://dev-directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("229858905135790300364920790577257842944"),
        creativeCommonsLoc: UUID.fromDecimalStringOrThrow("238252136510269500314784833180701623867"),
    },
    TEST: {
        rpcEndpoints: [ "wss://test-para-rpc01.logion.network" ],
        directoryEndpoint: "https://test-directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("116468287775993067124760331735250695835"),
    },
    MVP: {
        rpcEndpoints: [
            "wss://para-rpc01.logion.network",
            "wss://para-rpc02.logion.network",
        ],
        directoryEndpoint: "https://directory.logion.network",
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("85815882149698756717105061322008904805"),
    }
}

export type EnvironmentString = keyof typeof Environment;

export function createLogionClientConfig(env: Environment | EnvironmentString, buildFileUploader: () => FileUploader): LogionClientConfig {
    const config = configs[env];
    if (!config) {
        throw Error(`Invalid environment: [${ env }]`);
    }
    return {
        ...config,
        buildFileUploader
    }
}

