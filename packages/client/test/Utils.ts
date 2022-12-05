import { DateTime } from "luxon";
import { Option, Vec, bool } from "@polkadot/types-codec";
import type { Codec } from '@polkadot/types-codec/types';

import { AccountTokens } from "../src";
import { LegalOfficerEndpoint, LogionClientConfig, SharedState } from "../src/SharedClient";
import { LegalOfficer, UserIdentity, LegalOfficerPostalAddress } from "../src";
import { TestConfigFactory } from "./TestConfigFactory";
import { SuccessfulSubmission } from "../src";
import { It } from "moq.ts";

export const ALICE: LegalOfficer = {
    name: "Alice",
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    additionalDetails: "",
    logoUrl: "https://alice.logion.network/logo.png",
    node: "https://alice.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWBmAwcd4PJNJvfV89HwE48nwkRmAgo8Vy3uQEyNNHBox2",
};

export const BOB: LegalOfficer = {
    name: "Bob",
    address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    additionalDetails: "",
    logoUrl: "https://bob.logion.network/logo.png",
    node: "https://bob.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWQYV9dGMFoRzNStwpXztXaBUjtPqi6aU76ZgUriHhKust",
};

export const CHARLIE: LegalOfficer = {
    name: "Charlie",
    address: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    additionalDetails: "",
    logoUrl: "https://charlie.logion.network/logo.png",
    node: "https://charlie.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWJvyP3VJYymTqG7eH4PM5rN4T2agk5cdNCfNymAqwqcvZ",
};

export const LEGAL_OFFICERS = [ ALICE, BOB, CHARLIE ];

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

export async function buildAuthenticatedSharedStateUsingTestConfig(
    config: LogionClientConfig,
    currentAddress: string | undefined,
    legalOfficers: LegalOfficer[],
    tokens: AccountTokens,
): Promise<SharedState> {
    const componentFactory = (config as any).__componentFactory;
    const axiosFactory = componentFactory.buildAxiosFactory();
    const directoryClient = componentFactory.buildDirectoryClient(config.directoryEndpoint, axiosFactory);
    const nodesUp: LegalOfficerEndpoint[] = legalOfficers.map(legalOfficer => ({ url: legalOfficer.node, legalOfficer: legalOfficer.address }));
    const networkState = componentFactory.buildNetworkState(nodesUp, []);
    const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
    return {
        config,
        componentFactory,
        axiosFactory,
        directoryClient,
        networkState,
        nodeApi,
        currentAddress,
        legalOfficers,
        allLegalOfficers: legalOfficers,
        tokens,
    };
}

export async function buildTestAuthenticatedSharedSate(
    setupComponentFactory: (factory: TestConfigFactory) => void,
    currentAddress: string | undefined,
    legalOfficers: LegalOfficer[],
    tokens: AccountTokens,
): Promise<SharedState> {
    const config = buildTestConfig(setupComponentFactory);
    return buildAuthenticatedSharedStateUsingTestConfig(config, currentAddress, legalOfficers, tokens);
}

export function mockEmptyOption<T extends Codec>(): Option<T> {
    return {
        isSome: false,
        isEmpty: true,
        isNone: true,
    } as unknown as Option<T>;
}

export function mockOption<T extends Codec>(value: Partial<T>): Option<T> {
    return {
        isSome: true,
        isEmpty: false,
        isNone: false,
        unwrap: () => (value as T),
    } as unknown as Option<T>;
}

export const SUCCESSFUL_SUBMISSION: SuccessfulSubmission = {
    block: "0x1234567890abcdef",
    index: 1,
};

export const RECOVERED_ADDRESS = "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb";

export const REQUESTER = "5EBxoSssqNo23FvsDeUxjyQScnfEiGxJaNwuwqBH2Twe35BX";

export function itSpies<T>(): T {
    return It.Is<T>(value => { console.log(value); return false });
}

export function mockCodecWithToString<T extends Codec>(value: string): T {
    return ({
        toString: () => value,
    }) as T;
}

export function mockVec<T extends Codec>(items: T[]): Vec<T> {
    return ({
        toArray: () => items,
        map: items.map,
    }) as Vec<T>;
}

export function mockBool(value: boolean): bool {
    return ({
        isTrue: value,
        isFalse: !value,
    }) as bool;
}

export function mockCodecWithToUtf8<T extends Codec & { toUtf8: () => string }>(value: string): T {
    return ({
        toUtf8: () => value,
    }) as T;
}

export function mockCodecWithToHex<T extends Codec & { toHex: () => string }>(value: string): T {
    return ({
        toHex: () => value,
    }) as T;
}
