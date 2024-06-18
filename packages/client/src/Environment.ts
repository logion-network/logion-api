import { LogionClientConfig } from "./SharedClient.js";
import { FileUploader } from "./ComponentFactory.js";
import { UUID } from "@logion/node-api";

export enum Environment {
    TEST = 'TEST',
    MVP = 'MVP',
}

const configs: Record<Environment, Omit<LogionClientConfig, 'buildFileUploader'>> = {
    TEST: {
        rpcEndpoints: [ "wss://test-para-rpc01.logion.network" ],
        logionClassificationLoc: UUID.fromDecimalStringOrThrow("116468287775993067124760331735250695835"),
    },
    MVP: {
        rpcEndpoints: [
            "wss://para-rpc01.logion.network",
            "wss://para-rpc02.logion.network",
        ],
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

