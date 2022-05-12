import { DateTime } from "luxon";
import { AccountTokens } from "../src/AuthenticationClient";
import { Token } from "../src/Http";
import { AuthenticatedSharedState, LogionClientConfig, SharedState } from "../src/SharedClient";
import { LegalOfficer, PostalAddress, UserIdentity } from "../src/Types";
import { TestConfigFactory } from "./TestConfigFactory";
import { Option } from "@polkadot/types-codec";
import type { Codec } from '@polkadot/types-codec/types';

export const ALICE: LegalOfficer = {
    name: "Alice",
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    additionalDetails: "",
    logoUrl: "https://alice.logion.network/logo.png",
    node: "https://alice.logion.network",
    postalAddress: {} as PostalAddress,
    userIdentity: {} as UserIdentity,
};

export const BOB: LegalOfficer = {
    name: "Bob",
    address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    additionalDetails: "",
    logoUrl: "https://bob.logion.network/logo.png",
    node: "https://bob.logion.network",
    postalAddress: {} as PostalAddress,
    userIdentity: {} as UserIdentity,
};

export const DIRECTORY_ENDPOINT = "https://directory.logion.network";

export function buildAliceTokens(expirationDateTime: DateTime): AccountTokens {
    return new AccountTokens({
        [ALICE.address]: {
            value: "alice token",
            expirationDateTime
        }
    });
}

export function buildAliceAndBobTokens(expirationDateTime: DateTime): AccountTokens {
    return new AccountTokens({
        [ALICE.address]: {
            value: "alice token",
            expirationDateTime
        },
        [BOB.address]: {
            value: "bob token",
            expirationDateTime
        },
    });
}

export const LOGION_CLIENT_CONFIG: LogionClientConfig = {
    rpcEndpoints: [ "wss://rpc.logion.network" ],
    directoryEndpoint: DIRECTORY_ENDPOINT,
}

export function buildTestConfig(setupComponentFactory: (factory: TestConfigFactory) => void): LogionClientConfig {
    const testConfigFactory = new TestConfigFactory();
    setupComponentFactory(testConfigFactory);
    return testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
}

export async function buildTestSharedSate(setupComponentFactory: (factory: TestConfigFactory) => void): Promise<SharedState> {
    const config = buildTestConfig(setupComponentFactory);
    return buildSharedStateUsingTestConfig(config);
}

export async function buildSharedStateUsingTestConfig(config: LogionClientConfig): Promise<SharedState> {
    const componentFactory = (config as any).__componentFactory;
    const axiosFactory = componentFactory.buildAxiosFactory();
    const directoryClient = componentFactory.buildDirectoryClient(config.directoryEndpoint, axiosFactory);
    const networkState = componentFactory.buildNetworkState();
    const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
    return {
        config,
        componentFactory,
        axiosFactory,
        directoryClient,
        networkState,
        nodeApi,
    };
}

export async function buildAuthenticatedSharedStateUsingTestConfig(
    config: LogionClientConfig,
    currentAddress: string,
    token: Token,
    legalOfficers: LegalOfficer[],
): Promise<AuthenticatedSharedState> {
    const sharedState = await buildSharedStateUsingTestConfig(config);
    return {
        ...sharedState,
        currentAddress,
        token,
        legalOfficers,
    };
}

export async function buildTestAuthenticatedSharedSate(
    setupComponentFactory: (factory: TestConfigFactory) => void,
    currentAddress: string,
    token: Token,
    legalOfficers: LegalOfficer[],
): Promise<AuthenticatedSharedState> {
    const config = buildTestConfig(setupComponentFactory);
    return buildAuthenticatedSharedStateUsingTestConfig(config, currentAddress, token, legalOfficers);
}

export function mockEmptyOption<T extends Codec>(): Option<T> {
    return {
        isEmpty: true,
        isNone: true,
    } as unknown as Option<T>;
}

export function mockOption<T extends Codec>(value: Partial<T>): Option<T> {
    return {
        isEmpty: false,
        isNone: false,
        unwrap(): T {
            return value as T;
        },
    } as unknown as Option<T>;
}
