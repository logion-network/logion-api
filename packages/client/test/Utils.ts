import { DateTime } from "luxon";
import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { Option, Vec, bool } from "@polkadot/types-codec";
import type { Codec } from '@polkadot/types-codec/types';

import {
    AccountTokens,
    LegalOfficerEndpoint,
    LogionClientConfig,
    SharedState,
    LegalOfficer,
    UserIdentity,
    LegalOfficerPostalAddress,
    SuccessfulSubmission,
    LegalOfficerClass,
    Signer,
    SignParameters,
    FileUploader,
    HashAndSize,
    File,
    MimeType,
    FileDescription
} from "../src/index.js";
import { TestConfigFactory } from "./TestConfigFactory.js";
import { It, Mock } from "moq.ts";
import { AccountType, AnyAccountId, Hash, LogionNodeApiClass, UUID, ValidAccountId } from "@logion/node-api";

export const ALICE: LegalOfficer = {
    name: "Alice",
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    additionalDetails: "",
    node: "https://alice.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWBmAwcd4PJNJvfV89HwE48nwkRmAgo8Vy3uQEyNNHBox2",
    region: "Europe",
};

export const BOB: LegalOfficer = {
    name: "Bob",
    address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    additionalDetails: "",
    node: "https://bob.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWQYV9dGMFoRzNStwpXztXaBUjtPqi6aU76ZgUriHhKust",
    region: "Europe",
};

export const CHARLIE: LegalOfficer = {
    name: "Charlie",
    address: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    additionalDetails: "",
    node: "https://charlie.logion.network",
    postalAddress: {} as LegalOfficerPostalAddress,
    userIdentity: {} as UserIdentity,
    nodeId: "12D3KooWJvyP3VJYymTqG7eH4PM5rN4T2agk5cdNCfNymAqwqcvZ",
    region: "Europe",
};

export const LEGAL_OFFICERS = [ ALICE, BOB, CHARLIE ];

export const DIRECTORY_ENDPOINT = "https://directory.logion.network";

export function buildAliceTokens(api: LogionNodeApiClass, expirationDateTime: DateTime): AccountTokens {
    return new AccountTokens(api, {
        [`Polkadot:${ALICE.address}`]: {
            value: "alice token",
            expirationDateTime
        }
    });
}

export function buildAliceAndBobTokens(api: LogionNodeApiClass, expirationDateTime: DateTime): AccountTokens {
    return new AccountTokens(api, {
        [`Polkadot:${ALICE.address}`]: {
            value: "alice token",
            expirationDateTime
        },
        [`Polkadot:${BOB.address}`]: {
            value: "bob token",
            expirationDateTime
        },
    });
}

export const CREATIVE_COMMONS_LOC_ID = new UUID();
export const LOGION_CLASSIFICATION_LOC_ID = new UUID();

export const LOGION_CLIENT_CONFIG: LogionClientConfig = {
    rpcEndpoints: [ "wss://rpc.logion.network" ],
    directoryEndpoint: DIRECTORY_ENDPOINT,
    buildFileUploader: () => new Mock<FileUploader>().object(),
    creativeCommonsLoc: CREATIVE_COMMONS_LOC_ID,
    logionClassificationLoc: LOGION_CLASSIFICATION_LOC_ID,
}

export function buildTestConfig(setupComponentFactory: (factory: TestConfigFactory) => void): LogionClientConfig {
    const testConfigFactory = new TestConfigFactory();
    setupComponentFactory(testConfigFactory);
    return testConfigFactory.buildTestConfig(LOGION_CLIENT_CONFIG);
}

export interface SharedStateWithLegalOfficerClasses extends SharedState {
    legalOfficerClasses: LegalOfficerClass[];
}

export async function buildAuthenticatedSharedStateUsingTestConfig(
    config: LogionClientConfig,
    currentAddress: ValidAccountId | undefined,
    legalOfficers: LegalOfficer[],
    tokens: AccountTokens,
): Promise<SharedStateWithLegalOfficerClasses> {
    const componentFactory = (config as any).__componentFactory;
    const axiosFactory = componentFactory.buildAxiosFactory();
    const directoryClient = componentFactory.buildDirectoryClient(config.directoryEndpoint, axiosFactory);
    const nodesUp: LegalOfficerEndpoint[] = legalOfficers.map(legalOfficer => ({ url: legalOfficer.node, legalOfficer: legalOfficer.address }));
    const networkState = componentFactory.buildNetworkState(nodesUp, []);
    const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
    const legalOfficerClasses = legalOfficers.map(legalOfficer => new LegalOfficerClass({
        legalOfficer,
        axiosFactory,
        token: tokens.get(currentAddress)?.value,
    }));
    return {
        config,
        componentFactory,
        axiosFactory,
        directoryClient,
        networkState,
        nodeApi,
        currentAddress,
        legalOfficers: legalOfficerClasses,
        allLegalOfficers: legalOfficerClasses,
        tokens,
        legalOfficerClasses,
    };
}

export async function buildTestAuthenticatedSharedSate(
    setupComponentFactory: (factory: TestConfigFactory) => void,
    currentAddress: ValidAccountId | undefined,
    legalOfficers: LegalOfficer[],
    tokens: AccountTokens,
): Promise<SharedStateWithLegalOfficerClasses> {
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
    events: [],
};

export const RECOVERED_ADDRESS = buildValidPolkadotAccountId("5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb")!;

export const REQUESTER = buildValidPolkadotAccountId("5EBxoSssqNo23FvsDeUxjyQScnfEiGxJaNwuwqBH2Twe35BX")!;

export const REQUESTER_ID_LOC_ALICE = "354b4c13-aad5-477e-8ad3-b834e880db65";
export const REQUESTER_ID_LOC_BOB = "feeb0877-3068-4e05-a4a7-65bf37b84eb5";

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

export function mockCodecWithToBigInt<T extends Codec & { toBigInt: () => bigint }>(value: bigint): T {
    return ({
        toBigInt: () => value,
    }) as T;
}

export function doBuildValidPolkadotAccountId(address: string): ValidAccountId {
    const accountId = buildValidAccountId(address, "Polkadot");
    if(!accountId) {
        throw new Error();
    }
    return accountId;
}

export function buildValidPolkadotAccountId(address: string | undefined): ValidAccountId | undefined {
    return buildValidAccountId(address, "Polkadot");
}

export function buildValidAccountId(address: string | undefined, type: AccountType): ValidAccountId | undefined {
    if(address) {
        const api = buildSimpleNodeApi();
        return new AnyAccountId(api.polkadot, address, type).toValidAccountId();
    } else {
        return undefined;
    }
}

export function buildSimpleNodeApi(): LogionNodeApiClass {
    const api = {
        createType: () => undefined,
        runtimeVersion: {
            specName: { toString: () => "logion" },
            specVersion: { toBigInt: () => 3000n },
        },
    } as unknown as ApiPromise;
    return new LogionNodeApiClass(api);
}

export function ItIsUuid(expected: UUID): UUID {
    return It.Is<UUID>(uuid => uuid.toString() === expected.toString());
}

export function mockSigner(args: {
    signerId: string,
    submittable: SubmittableExtrinsic,
}): Mock<Signer> {
    const signer = new Mock<Signer>();
    signer.setup(instance => instance.signAndSend(It.Is<SignParameters>(params =>
        params.signerId === args.signerId
        && params.submittable === args.submittable))
    ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));
    return signer;
}

export const MOCK_FILE_HASH = Hash.fromHex("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");

export const MOCK_FILE_DESCRIPTION: FileDescription = {
    name: "test.txt",
    hash: MOCK_FILE_HASH,
    mimeType: MimeType.from("text/plain"),
    size: 4n,
};

export class MockFile extends File {

    constructor() {
        super(MOCK_FILE_DESCRIPTION.name, MOCK_FILE_DESCRIPTION.mimeType);
    }

    async getHashAndSize(): Promise<HashAndSize> {
        return {
            hash: MOCK_FILE_HASH,
            size: 4n,
        }
    }
}

export const MOCK_FILE = new MockFile();
