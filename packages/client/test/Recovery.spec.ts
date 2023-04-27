import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { DateTime } from 'luxon';
import { It, Mock } from 'moq.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

import { CreateProtectionRequest, FetchAllResult, ProtectionRequest } from '../src/RecoveryClient.js';
import {
    SharedState,
    AcceptedProtection,
    ActiveProtection,
    ClaimedRecovery,
    getInitialState,
    NoProtection,
    PendingProtection,
    PendingRecovery,
    RejectedProtection,
    LegalOfficer,
    PostalAddress,
    UserIdentity,
    Signer,
    AccountTokens,
} from '../src/index.js';
import {
    ALICE,
    BOB,
    buildTestAuthenticatedSharedSate,
    LOGION_CLIENT_CONFIG,
    SUCCESSFUL_SUBMISSION,
    REQUESTER,
    RECOVERED_ADDRESS,
    buildSimpleNodeApi,
    buildValidPolkadotAccountId,
} from './Utils.js';
import { TestConfigFactory } from './TestConfigFactory.js';
import { AxiosFactory } from '../src/AxiosFactory.js';

describe("Recovery's getInitialState", () => {

    it("builds an initial no protection state", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.address)
            },
            recoveredAddress: RECOVERED_ADDRESS.address,
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
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
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
            cancelledProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.address)
            },
            recoveredAddress: RECOVERED_ADDRESS.address,
        };
        await testGetInitialState(data, ClaimedRecovery);
    });

    it("builds an initial rejected protection", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [
                buildAcceptedBobRequest(),
            ],
            rejectedProtectionRequests: [
                buildRejectedAliceRequest(),
            ],
            cancelledProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAddress: undefined,
        };
        await testGetInitialState(data, RejectedProtection);
    });

});

async function testGetInitialState(data: FetchAllResult, expectedStateClass: any) {
    const sharedState = await buildSharedState();
    const state = getInitialState(data, sharedState);
    expect(state).toBeInstanceOf(expectedStateClass);
}

const legalOfficers: LegalOfficer[] = [ ALICE, BOB ];

async function buildSharedState(): Promise<SharedState> {
    const currentAddress = buildValidPolkadotAccountId(ALICE.address)!;
    const token = "some-token";
    const tokens = new AccountTokens(
        buildSimpleNodeApi(),
        {
            [`Polkadot:${ALICE.address}`]: {
                value: token,
                expirationDateTime: DateTime.now().plus({hours: 1})
            }
        }
    );
    return await buildTestAuthenticatedSharedSate(
        (factory: TestConfigFactory) => {
            factory.setupDefaultAxiosInstanceFactory();
            factory.setupDefaultNetworkState();
            factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);
            factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        },
        currentAddress,
        legalOfficers,
        tokens,
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
        requesterAddress: REQUESTER.address,
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
        requesterAddress: REQUESTER.address,
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

function buildRejectedAliceRequest(): ProtectionRequest {
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
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildAcceptedBobRecoveryRequest(): ProtectionRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'ACCEPTED',
        isRecovery: true,
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

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
        addressToRecover: RECOVERED_ADDRESS.address,
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
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

describe("NoProtection", () => {

    it("requests protection", async () => {
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);
                factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const axiosFactory = factory.setupAxiosFactoryMock();
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialAliceRequest(),
                    currentAddress.address,
                    ALICE,
                    BOB,
                    token,
                    null
                );
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialBobRequest(),
                    currentAddress.address,
                    BOB,
                    ALICE,
                    token,
                    null
                );
            },
            currentAddress,
            legalOfficers,
            tokens,
        );
        const state = new NoProtection(sharedState);

        const nextState = await state.requestProtection({legalOfficer1: sharedState.legalOfficerClasses[0], legalOfficer2: sharedState.legalOfficerClasses[1], userIdentity: {} as UserIdentity, postalAddress: {} as PostalAddress});

        expect(nextState).toBeInstanceOf(PendingProtection);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(false);
    });

    it("requests recovery", async () => {
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getActiveRecovery(RECOVERED_ADDRESS.address, currentAddress.address))
                    .returns(Promise.resolve(undefined));

                nodeApi.setup(instance => instance.queries.getRecoveryConfig(RECOVERED_ADDRESS.address))
                    .returns(Promise.resolve({ legalOfficers: [ ALICE.address, BOB.address ] }));

                const submittable = new Mock<SubmittableExtrinsic>();
                nodeApi.setup(instance => instance.polkadot.tx.recovery.initiateRecovery(RECOVERED_ADDRESS.address))
                    .returns(submittable.object());

                const axiosFactory = factory.setupAxiosFactoryMock();
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialAliceRequest(),
                    currentAddress.address,
                    ALICE,
                    BOB,
                    token,
                    RECOVERED_ADDRESS.address,
                );
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialBobRequest(),
                    currentAddress.address,
                    BOB,
                    ALICE,
                    token,
                    RECOVERED_ADDRESS.address,
                );
            },
            currentAddress,
            legalOfficers,
            tokens,
        );
        const state = new NoProtection(sharedState);
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string }>(params => params.signerId === currentAddress.address)))
            .returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.requestRecovery({
            legalOfficer1: sharedState.legalOfficerClasses[0],
            legalOfficer2: sharedState.legalOfficerClasses[1],
            userIdentity: {} as UserIdentity,
            postalAddress: {} as PostalAddress,
            signer: signer.object(),
            recoveredAddress: RECOVERED_ADDRESS.address
        });

        expect(nextState).toBeInstanceOf(PendingProtection);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
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
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const axiosFactory = factory.setupAxiosFactoryMock();
                const aliceAxios = new Mock<AxiosInstance>();
                axiosFactory.setup(instance => instance.buildAxiosInstance(ALICE.node, token)).returns(aliceAxios.object());
                const bobAxios = new Mock<AxiosInstance>();
                axiosFactory.setup(instance => instance.buildAxiosInstance(BOB.node, token)).returns(bobAxios.object());

                setupFetchProtectionRequests(aliceAxios, [ aliceRequest ], [], []);
                setupFetchProtectionRequests(bobAxios, [ bobRequest ], [], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAddress.address))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAddress.address))
                    .returns(Promise.resolve(undefined));
            },
            currentAddress,
            legalOfficers,
            tokens,
        );

        const state = new PendingProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [ aliceRequest, bobRequest ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
        });

        const nextState = await state.refresh();

        expect(nextState).toBeInstanceOf(PendingProtection);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(false);
    });

    it("refreshes and becomes accepted", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRequest();
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAddress.address))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAddress.address))
                    .returns(Promise.resolve(undefined));
            },
            currentAddress,
            legalOfficers,
            tokens,
        );

        const state = new PendingProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [ aliceRequest, bobRequest ],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
        });

        const nextState = await state.refresh();

        expect(nextState).toBeInstanceOf(AcceptedProtection);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(false);
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
    axios.setup(instance => instance.put).returns(<T = any, R = AxiosResponse<T, any>>(): Promise<R> => {
        const response = new Mock<AxiosResponse<T, any>>();
        const data: unknown = {
            requests: pending.concat(accepted).concat(rejected)
        };
        response.setup(instance => instance.data).returns(data as T);
        return Promise.resolve(response.object() as unknown as R);
    });
}

describe("AcceptedProtection", () => {

    it("activates protection", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRequest();
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [`Polkadot:${REQUESTER.address}`]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAddress.address))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAddress.address))
                    .returns(Promise.resolve(undefined));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.address);
                nodeApi.setup(instance => instance.polkadot.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAddress,
            legalOfficers,
            tokens,
        );
        const state = new AcceptedProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve({ block: "hash", index: 1, events: [] }));

        const nextState = await state.activate(signer.object());

        expect(nextState).toBeInstanceOf(ActiveProtection);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(false);
    });

    it("activates recovery", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: ProtectionRequest = buildAcceptedBobRecoveryRequest();
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [`Polkadot:${REQUESTER.address}`]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAddress.address))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAddress.address))
                    .returns(Promise.resolve(undefined));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.address);
                nodeApi.setup(instance => instance.polkadot.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAddress,
            legalOfficers,
            tokens,
        );
        const state = new AcceptedProtection({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.activate(signer.object());

        expect(nextState).toBeInstanceOf(PendingRecovery);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });
});

describe("PendingRecovery", () => {

    it("claims", async () => {
        const aliceRequest: ProtectionRequest = buildAcceptedAliceRecoveryRequest();
        aliceRequest.status = "ACTIVATED";
        const bobRequest: ProtectionRequest = buildAcceptedBobRecoveryRequest();
        bobRequest.status = "ACTIVATED";
        const currentAddress = REQUESTER;
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [`Polkadot:${REQUESTER.address}`]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const submittable = new Mock<SubmittableExtrinsic>();
        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                const { aliceAxios, bobAxios } = setupAliceBobAxios(factory, token);
                setupFetchProtectionRequests(aliceAxios, [], [ aliceRequest ], []);
                setupFetchProtectionRequests(bobAxios, [], [ bobRequest ], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const recoveryConfig = {
                    legalOfficers: [
                        ALICE.address,
                        BOB.address
                    ]
                };
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAddress.address))
                    .returns(Promise.resolve(recoveryConfig));
                nodeApi.setup(instance => instance.queries.getProxy(currentAddress.address))
                    .returns(Promise.resolve(RECOVERED_ADDRESS.address));

                nodeApi.setup(instance => instance.polkadot.tx.recovery.claimRecovery(RECOVERED_ADDRESS.address))
                    .returns(submittable.object());
            },
            currentAddress,
            legalOfficers,
            tokens,
        );
        const state = new PendingRecovery({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
            recoveryConfig: {
                legalOfficers: [ ALICE.address, BOB.address ]
            }
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAddress.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.claimRecovery(signer.object());

        expect(nextState).toBeInstanceOf(ClaimedRecovery);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(true);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });
});
