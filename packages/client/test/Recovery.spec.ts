import type { Option } from '@polkadot/types-codec';
import type { ActiveRecovery, RecoveryConfig } from '@polkadot/types/interfaces/recovery';
import type { AccountId } from '@polkadot/types/interfaces/runtime';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { DateTime } from 'luxon';
import { It, Mock } from 'moq.ts';

import { CreateProtectionRequest, FetchAllResult, ProtectionRequest } from '../src/RecoveryClient';
import { AuthenticatedSharedState } from '../src/SharedClient';
import {
    AcceptedProtection,
    ActiveProtection,
    ClaimedRecovery,
    getInitialState,
    NoProtection,
    PendingProtection,
    PendingRecovery
} from '../src/Recovery';
import {
    ALICE,
    BOB,
    buildTestAuthenticatedSharedSate,
    LOGION_CLIENT_CONFIG,
    mockOption,
    mockEmptyOption
} from './Utils';
import { Token } from '../src/Http';
import { TestConfigFactory } from './TestConfigFactory';
import { LegalOfficer, PostalAddress, UserIdentity } from '../src/Types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosFactory } from '../src/AxiosFactory';
import { Signer } from '../src/Signer';
import { PrefixedNumber, PICO } from "@logion/node-api/dist/numbers";
import { Call } from '@polkadot/types/interfaces';

describe("Recovery's getInitialState", () => {

    it("builds an initial no protection state", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, NoProtection);
    });

    it("builds an initial active state", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedAliceRequest(),
                buildAcceptedBobRequest()
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.address)
            },
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, ActiveProtection);
    });

    it("builds an initial claimed recovery", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedAliceRecoveryRequest(),
                buildAcceptedBobRecoveryRequest(),
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.address)
            },
            recoveredAddress: RECOVERED_ADDRESS,
        };
        await testGetInitialState(data, ClaimedRecovery);
    });

    it("builds an initial accepted protection", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedAliceRequest(),
                buildAcceptedBobRequest()
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, AcceptedProtection);
    });

    it("builds an initial pending protection if both requests pending", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [
                buildPendingAliceRecoveryRequest(),
                buildPendingBobRecoveryRequest(),
            ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, PendingProtection);
    });

    it("builds an initial pending protection if one request pending", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [
                buildPendingBobRecoveryRequest()
            ],
            acceptedProtectionRequests: [
                buildAcceptedAliceRecoveryRequest()
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, PendingProtection);
    });

    it("builds an initial pending recovery", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedAliceRecoveryRequest(),
                buildAcceptedBobRecoveryRequest(),
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, AcceptedProtection);
    });

    it("builds an initial claimed recovery", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedAliceRecoveryRequest(),
                buildAcceptedBobRecoveryRequest(),
            ],
            rejectedProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.address)
            },
            recoveredAddress: RECOVERED_ADDRESS,
        };
        await testGetInitialState(data, ClaimedRecovery);
    });
});

async function testGetInitialState(data: FetchAllResult, expectedStateClass: any) {
    const sharedState = await buildSharedState();
    const state = getInitialState(data, sharedState);
    expect(state).toBeInstanceOf(expectedStateClass);
}

const legalOfficers: LegalOfficer[] = [ ALICE, BOB ];

async function buildSharedState(): Promise<AuthenticatedSharedState> {
    const currentAddress = ALICE.address;
    const token: Token = {
        value: "",
        expirationDateTime: DateTime.now().plus({hours: 1})
    };
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultAxiosInstanceFactory();
            factory.setupDefaultNetworkState();
            factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);
            factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        },
        currentAddress,
        token,
        legalOfficers
    );
}

interface PartialProtectionRequest {
    id: string,
    requesterAddress: string,
    userIdentity: UserIdentity,
    userPostalAddress: PostalAddress,
    createdOn: string,
    legalOfficerAddress: string,
    otherLegalOfficerAddress: string,
}

function buildPartialAliceRequest(): PartialProtectionRequest {
    return {
        id: "alice-request",
        createdOn: DateTime.now().minus({hours: 1}).toISO(),
        legalOfficerAddress: ALICE.address,
        otherLegalOfficerAddress: BOB.address,
        requesterAddress: REQUESTER,
        userIdentity: {} as UserIdentity,
        userPostalAddress: {} as PostalAddress,
    };
}

function buildPartialBobRequest(): PartialProtectionRequest {
    return {
        id: "bob-request",
        createdOn: DateTime.now().minus({hours: 1}).toISO(),
        legalOfficerAddress: BOB.address,
        otherLegalOfficerAddress: ALICE.address,
        requesterAddress: REQUESTER,
        userIdentity: {} as UserIdentity,
        userPostalAddress: {} as PostalAddress,
    };
}

function buildAcceptedAliceRequest(): ProtectionRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'ACCEPTED',
        isRecovery: false,
        addressToRecover: null,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildAcceptedBobRequest(): ProtectionRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'ACCEPTED',
        isRecovery: false,
        addressToRecover: null,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildAcceptedAliceRecoveryRequest(): ProtectionRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'ACCEPTED',
        isRecovery: true,
        addressToRecover: RECOVERED_ADDRESS,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

const RECOVERED_ADDRESS = "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb";

function buildAcceptedBobRecoveryRequest(): ProtectionRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'ACCEPTED',
        isRecovery: true,
        addressToRecover: RECOVERED_ADDRESS,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

const REQUESTER = "5EBxoSssqNo23FvsDeUxjyQScnfEiGxJaNwuwqBH2Twe35BX";

function buildPendingAliceRequest(): ProtectionRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'PENDING',
        isRecovery: false,
        addressToRecover: null,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildPendingBobRequest(): ProtectionRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'PENDING',
        isRecovery: false,
        addressToRecover: null,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildPendingAliceRecoveryRequest(): ProtectionRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'PENDING',
        isRecovery: true,
        addressToRecover: RECOVERED_ADDRESS,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildPendingBobRecoveryRequest(): ProtectionRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'PENDING',
        isRecovery: true,
        addressToRecover: RECOVERED_ADDRESS,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

describe("NoProtection", () => {

    it("requests protection", async () => {
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);
                factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const axiosFactory = factory.setupAxiosFactoryMock();
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialAliceRequest(),
                    currentAddress,
                    ALICE,
                    BOB,
                    token.value,
                    null
                );
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialBobRequest(),
                    currentAddress,
                    BOB,
                    ALICE,
                    token.value,
                    null
                );
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new NoProtection(sharedState);

        const nextState = await state.requestProtection({legalOfficer1: ALICE, legalOfficer2: BOB, userIdentity: {} as UserIdentity, postalAddress: {} as PostalAddress});

        expect(nextState).toBeInstanceOf(PendingProtection);
    });

    it("requests recovery", async () => {
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.query.recovery.activeRecoveries(RECOVERED_ADDRESS, currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<ActiveRecovery>()));
                const submittable = new Mock<SubmittableExtrinsic>();
                nodeApi.setup(instance => instance.tx.recovery.initiateRecovery(RECOVERED_ADDRESS))
                    .returns(submittable.object());

                const axiosFactory = factory.setupAxiosFactoryMock();
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialAliceRequest(),
                    currentAddress,
                    ALICE,
                    BOB,
                    token.value,
                    RECOVERED_ADDRESS,
                );
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialBobRequest(),
                    currentAddress,
                    BOB,
                    ALICE,
                    token.value,
                    RECOVERED_ADDRESS,
                );
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new NoProtection(sharedState);
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string }>(params => params.signerId === currentAddress))).returns(Promise.resolve());

        const nextState = await state.requestRecovery({
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            userIdentity: {} as UserIdentity,
            postalAddress: {} as PostalAddress,
            signer: signer.object(),
            recoveredAddress: RECOVERED_ADDRESS
        });

        expect(nextState).toBeInstanceOf(PendingProtection);
    });
});

function setupCreateProtectionRequest(
    axiosFactory: Mock<AxiosFactory>,
    partialProtectionRequest: PartialProtectionRequest,
    requester: string,
    legalOfficer: LegalOfficer,
    otherLegalOfficer: LegalOfficer,
    token: string,
    addressToRecover: string | null,
) {
    const axios = new Mock<AxiosInstance>();
    const request: ProtectionRequest = {
        ...partialProtectionRequest,
        status: 'PENDING',
        isRecovery: addressToRecover !== null,
        addressToRecover: addressToRecover,
        decision: {
            decisionOn: null,
            rejectReason: null,
        },
    }
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns(request);
    axios.setup(instance => instance.post("/api/protection-request", It.Is<CreateProtectionRequest>(body =>
        body.otherLegalOfficerAddress === otherLegalOfficer.address
        && ((body.isRecovery && addressToRecover !== null) || (!body.isRecovery && addressToRecover === null))
        && body.requesterAddress === requester
    ))).returns(Promise.resolve(response.object()));
    axiosFactory.setup(instance => instance.buildAxiosInstance(legalOfficer.node, token))
        .returns(axios.object());
}

describe("PendingProtection", () => {

    it("refreshes and remains pending", async () => {
        const aliceRequest: ProtectionRequest = buildPendingAliceRequest();
        const bobRequest: ProtectionRequest = buildPendingBobRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const axiosFactory = factory.setupAxiosFactoryMock();
                const aliceAxios = new Mock<AxiosInstance>();
                axiosFactory.setup(instance => instance.buildAxiosInstance(ALICE.node, token.value)).returns(aliceAxios.object());
                const bobAxios = new Mock<AxiosInstance>();
                axiosFactory.setup(instance => instance.buildAxiosInstance(BOB.node, token.value)).returns(bobAxios.object());

                setupFetchProtectionRequests(aliceAxios, [ aliceRequest ], [], []);
                setupFetchProtectionRequests(bobAxios, [ bobRequest ], [], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.query.recovery.recoverable(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<RecoveryConfig>()));
                nodeApi.setup(instance => instance.query.recovery.proxy(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<AccountId>()));
            },
            currentAddress,
            token,
            legalOfficers
        );

        const state = new PendingProtection({
            ...sharedState,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [ aliceRequest, bobRequest ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: []
        });

        const nextState = await state.refresh();

        expect(nextState).toBeInstanceOf(PendingProtection);
    });

    it("refreshes and becomes accepted", async () => {
        const aliceRequest: ProtectionRequest = buildPendingAliceRequest();
        const bobRequest: ProtectionRequest = buildPendingBobRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token.value);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.query.recovery.recoverable(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<RecoveryConfig>()));
                nodeApi.setup(instance => instance.query.recovery.proxy(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<AccountId>()));
            },
            currentAddress,
            token,
            legalOfficers
        );

        const state = new PendingProtection({
            ...sharedState,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [ aliceRequest, bobRequest ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: []
        });

        const nextState = await state.refresh();

        expect(nextState).toBeInstanceOf(AcceptedProtection);
    });
});

function setupAliceBobAxios(factory: TestConfigFactory, token: string): ({
    aliceAxios: Mock<AxiosInstance>,
    bobAxios: Mock<AxiosInstance>,
}) {
    const axiosFactory = factory.setupAxiosFactoryMock();
    const aliceAxios = new Mock<AxiosInstance>();
    axiosFactory.setup(instance => instance.buildAxiosInstance(ALICE.node, token)).returns(aliceAxios.object());
    const bobAxios = new Mock<AxiosInstance>();
    axiosFactory.setup(instance => instance.buildAxiosInstance(BOB.node, token)).returns(bobAxios.object());
    return {
        aliceAxios,
        bobAxios,
    }
}

function setupFetchProtectionRequests(
    axios: Mock<AxiosInstance>,
    pending: ProtectionRequest[],
    accepted: ProtectionRequest[],
    rejected: ProtectionRequest[],
) {
    axios.setup(instance => instance.put).returns(<T = any, R = AxiosResponse<T, any>, D = any>(url: string, body: D): Promise<R> => {
        const anyBody: any = body;
        const response = new Mock<AxiosResponse<T, any>>();
        if(anyBody.statuses!.includes("PENDING")) {
            const data: unknown = {
                requests: pending
            };
            response.setup(instance => instance.data).returns(data as T);
        } else if(anyBody.statuses!.every((status: any) => ["ACCEPTED", "ACTIVATED"].includes(status))) {
            const data: unknown = {
                requests: accepted
            };
            response.setup(instance => instance.data).returns(data as T);
        } else if(anyBody.statuses!.includes("REJECTED")) {
            const data: unknown = {
                requests: rejected
            };
            response.setup(instance => instance.data).returns(data as T);
        }
        const unknownResponse: unknown = response.object();
        return Promise.resolve(unknownResponse as R);
    });
}

describe("AcceptedProtection", () => {

    it("activates protection", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token.value);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.query.recovery.recoverable(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<RecoveryConfig>()));
                nodeApi.setup(instance => instance.query.recovery.proxy(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<AccountId>()));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.address);
                nodeApi.setup(instance => instance.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new AcceptedProtection({
            ...sharedState,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: []
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve());

        const nextState = await state.activate(signer.object());

        expect(nextState).toBeInstanceOf(ActiveProtection);
    });

    it("activates recovery", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRecoveryRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token.value);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.query.recovery.recoverable(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<RecoveryConfig>()));
                nodeApi.setup(instance => instance.query.recovery.proxy(currentAddress))
                    .returns(Promise.resolve(mockEmptyOption<AccountId>()));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.address);
                nodeApi.setup(instance => instance.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new AcceptedProtection({
            ...sharedState,
            recoveredAddress: RECOVERED_ADDRESS,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: []
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve());

        const nextState = await state.activate(signer.object());

        expect(nextState).toBeInstanceOf(PendingRecovery);
    });
});

describe("PendingRecovery", () => {

    it("claims", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRecoveryRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token.value);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const recoveryConfig = mockOption<RecoveryConfig>({
                    friends: [
                        ALICE.address,
                        BOB.address
                    ]
                } as unknown as RecoveryConfig)
                nodeApi.setup(instance => instance.query.recovery.recoverable(currentAddress))
                    .returns(Promise.resolve(recoveryConfig as Option<RecoveryConfig>));
                const proxy = mockOption<AccountId>(RECOVERED_ADDRESS as unknown as AccountId)
                nodeApi.setup(instance => instance.query.recovery.proxy(currentAddress))
                    .returns(Promise.resolve(proxy as Option<AccountId>));

                nodeApi.setup(instance => instance.tx.recovery.claimRecovery(RECOVERED_ADDRESS))
                    .returns(submittable.object());
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new PendingRecovery({
            ...sharedState,
            recoveredAddress: RECOVERED_ADDRESS,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: []
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve());

        const nextState = await state.claimRecovery(signer.object());

        expect(nextState).toBeInstanceOf(ClaimedRecovery);
    });
});

describe("ClaimedRecovery", () => {
    it("transfers from recovered account", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRecoveryRequest();
        const currentAddress = REQUESTER;
        const token: Token = {
            value: "some-token",
            expirationDateTime: DateTime.now().plus({hours: 1})
        };
        const asRecoveredSubmittable = new Mock<SubmittableExtrinsic>();
        const transferSubmittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token.value);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token.value);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const call = new Mock<Call>();
                nodeApi.setup(instance => instance.tx.recovery.asRecovered(RECOVERED_ADDRESS, call.object()))
                    .returns(asRecoveredSubmittable.object());
                nodeApi.setup(instance => instance.tx.balances.transfer(currentAddress, 10000000))
                    .returns(transferSubmittable.object())
                nodeApi.setup(instance => instance.createType('Call', transferSubmittable.object()))
                    .returns(call.object())
            },
            currentAddress,
            token,
            legalOfficers
        );
        const state = new ClaimedRecovery({
            ...sharedState,
            recoveredAddress: RECOVERED_ADDRESS,
            legalOfficer1: ALICE,
            legalOfficer2: BOB,
            legalOfficers,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: []
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress
            && params.submittable === asRecoveredSubmittable.object()))
        ).returns(Promise.resolve());

        const nextState = await state.transferRecoveredAccount(signer.object(), {
            destination: currentAddress,
            amount: new PrefixedNumber("10", PICO)
        });

        expect(nextState).toBeInstanceOf(ClaimedRecovery);

    })
})
