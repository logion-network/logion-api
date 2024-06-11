import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { DateTime } from 'luxon';
import { It, Mock } from 'moq.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

import { CreateProtectionRequest, FetchAllResult, AccountRecoveryRequest } from '../src/AccountRecoveryClient';
import {
    SharedState,
    AcceptedRecovery,
    ActiveProtection,
    ClaimedRecovery,
    getInitialState,
    NoProtection,
    PendingRecovery,
    ActiveRecovery,
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
    REQUESTER_ID_LOC_ALICE,
    REQUESTER_ID_LOC_BOB,
} from './Utils.js';
import { TestConfigFactory } from './TestConfigFactory.js';
import { AxiosFactory } from '../src/AxiosFactory.js';
import { UUID } from "@logion/node-api";

describe("Recovery's getInitialState", () => {

    it("builds an initial no protection state", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            recoveryConfig: undefined,
            recoveredAccount: undefined,
        };
        await testGetInitialState(data, NoProtection);
    });

    it("builds an initial active state", async () => {
        const data: FetchAllResult = {
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            recoveryConfig: {
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.account)
            },
            recoveredAccount: undefined,
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
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.account)
            },
            recoveredAccount: RECOVERED_ADDRESS,
        };
        await testGetInitialState(data, ClaimedRecovery);
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
            recoveredAccount: undefined,
        };
        await testGetInitialState(data, PendingRecovery);
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
            recoveredAccount: undefined,
        };
        await testGetInitialState(data, PendingRecovery);
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
            recoveredAccount: undefined,
        };
        await testGetInitialState(data, AcceptedRecovery);
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
                legalOfficers: legalOfficers.map(legalOfficer => legalOfficer.account)
            },
            recoveredAccount: RECOVERED_ADDRESS,
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

async function buildSharedState(): Promise<SharedState> {
    const currentAccount = ALICE.account;
    const token = "some-token";
    const tokens = new AccountTokens(
        buildSimpleNodeApi(),
        {
            [`Polkadot:${ALICE.account.address}`]: {
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
        currentAccount,
        legalOfficers,
        tokens,
    );
}

interface PartialProtectionRequest {
    id: string,
    requesterAddress: string,
    requesterIdentityLoc: string,
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
        legalOfficerAddress: ALICE.account.address,
        otherLegalOfficerAddress: BOB.account.address,
        requesterAddress: REQUESTER.address,
        requesterIdentityLoc: REQUESTER_ID_LOC_ALICE,
        userIdentity: {} as UserIdentity,
        userPostalAddress: {} as PostalAddress,
    };
}

function buildPartialBobRequest(): PartialProtectionRequest {
    return {
        id: "bob-request",
        createdOn: DateTime.now().minus({hours: 1}).toISO(),
        legalOfficerAddress: BOB.account.address,
        otherLegalOfficerAddress: ALICE.account.address,
        requesterAddress: REQUESTER.address,
        requesterIdentityLoc: REQUESTER_ID_LOC_BOB,
        userIdentity: {} as UserIdentity,
        userPostalAddress: {} as PostalAddress,
    };
}

function buildAcceptedAliceRecoveryRequest(): AccountRecoveryRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'ACCEPTED',
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildAcceptedBobRecoveryRequest(): AccountRecoveryRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'ACCEPTED',
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildPendingAliceRecoveryRequest(): AccountRecoveryRequest {
    return {
        ...buildPartialAliceRequest(),
        status: 'PENDING',
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

function buildPendingBobRecoveryRequest(): AccountRecoveryRequest {
    return {
        ...buildPartialBobRequest(),
        status: 'PENDING',
        addressToRecover: RECOVERED_ADDRESS.address,
        decision: {
            decisionOn: DateTime.now().minus({minutes: 1}).toISO(),
            rejectReason: null,
        },
    };
}

describe("NoProtection", () => {

    it("activates protection", async () => {
        const currentAccount = REQUESTER;
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
                setupFetchProtectionRequests(aliceAxios, [], [], []);
                setupFetchProtectionRequests(bobAxios, [], [], []);

                factory.setupDefaultNetworkState();
                factory.setupAuthenticatedDirectoryClientMock(LOGION_CLIENT_CONFIG, token);

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAccount))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAccount))
                    .returns(Promise.resolve(undefined));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.account.address);
                nodeApi.setup(instance => instance.polkadot.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAccount,
            legalOfficers,
            tokens,
        );
        const state = new NoProtection(sharedState);
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAccount.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve({ block: "hash", index: 1, events: [] }));

        const nextState = await state.activateProtection({
            payload: {
                legalOfficer1: sharedState.legalOfficerClasses[0],
                legalOfficer2: sharedState.legalOfficerClasses[1],
                requesterIdentityLoc1: new UUID(REQUESTER_ID_LOC_ALICE),
                requesterIdentityLoc2: new UUID(REQUESTER_ID_LOC_BOB),
            },
            signer: signer.object()
        });

        expect(nextState).toBeInstanceOf(ActiveProtection);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(false);
    });

    it("requests recovery", async () => {
        const currentAccount = REQUESTER;
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
                nodeApi.setup(instance => instance.queries.getActiveRecovery(RECOVERED_ADDRESS, currentAccount))
                    .returns(Promise.resolve(undefined));

                nodeApi.setup(instance => instance.queries.getRecoveryConfig(RECOVERED_ADDRESS))
                    .returns(Promise.resolve({ legalOfficers: [ ALICE.account, BOB.account ] }));

                const submittable = new Mock<SubmittableExtrinsic>();
                nodeApi.setup(instance => instance.polkadot.tx.recovery.initiateRecovery(RECOVERED_ADDRESS.address))
                    .returns(submittable.object());

                const axiosFactory = factory.setupAxiosFactoryMock();
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialAliceRequest(),
                    ALICE,
                    BOB,
                    token,
                    RECOVERED_ADDRESS.address,
                );
                setupCreateProtectionRequest(
                    axiosFactory,
                    buildPartialBobRequest(),
                    BOB,
                    ALICE,
                    token,
                    RECOVERED_ADDRESS.address,
                );
            },
            currentAccount,
            legalOfficers,
            tokens,
        );
        const state = new NoProtection(sharedState);
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string }>(params => params.signerId === currentAccount.address)))
            .returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.requestRecovery({
            payload : {
                legalOfficer1: sharedState.legalOfficerClasses[0],
                legalOfficer2: sharedState.legalOfficerClasses[1],
                requesterIdentityLoc1: new UUID(REQUESTER_ID_LOC_ALICE),
                requesterIdentityLoc2: new UUID(REQUESTER_ID_LOC_BOB),
                recoveredAccount: RECOVERED_ADDRESS,
            },
            signer: signer.object(),
        });

        expect(nextState).toBeInstanceOf(PendingRecovery);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });
});

function setupCreateProtectionRequest(
    axiosFactory: Mock<AxiosFactory>,
    partialProtectionRequest: PartialProtectionRequest,
    legalOfficer: LegalOfficer,
    otherLegalOfficer: LegalOfficer,
    token: string,
    addressToRecover: string,
) {
    const axios = new Mock<AxiosInstance>();
    const request: AccountRecoveryRequest = {
        ...partialProtectionRequest,
        status: 'PENDING',
        addressToRecover: addressToRecover,
        decision: {
            decisionOn: null,
            rejectReason: null,
        },
    }
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns(request);
    axios.setup(instance => instance.post("/api/account-recovery", It.Is<CreateProtectionRequest>(body =>
        body.otherLegalOfficerAddress === otherLegalOfficer.account.address
        && addressToRecover !== null
    ))).returns(Promise.resolve(response.object()));
    axiosFactory.setup(instance => instance.buildAxiosInstance(legalOfficer.node, token))
        .returns(axios.object());
}

describe("PendingRecovery", () => {

    it("refreshes and remains pending", async () => {
        const aliceRequest: AccountRecoveryRequest = buildPendingAliceRecoveryRequest();
        const bobRequest: AccountRecoveryRequest = buildPendingBobRecoveryRequest();
        const currentAccount = REQUESTER;
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
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAccount))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAccount))
                    .returns(Promise.resolve(undefined));
            },
            currentAccount,
            legalOfficers,
            tokens,
        );

        const state = new PendingRecovery({
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

        expect(nextState).toBeInstanceOf(PendingRecovery);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });

    it("refreshes and becomes accepted", async () => {
        const aliceRequest: AccountRecoveryRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: AccountRecoveryRequest = buildAcceptedBobRecoveryRequest();
        const currentAccount = REQUESTER;
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
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAccount))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAccount))
                    .returns(Promise.resolve(undefined));
            },
            currentAccount,
            legalOfficers,
            tokens,
        );

        const state = new PendingRecovery({
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

        expect(nextState).toBeInstanceOf(AcceptedRecovery);
        expect(nextState.protectionParameters.isActive).toBe(false);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
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
    pending: AccountRecoveryRequest[],
    accepted: AccountRecoveryRequest[],
    rejected: AccountRecoveryRequest[],
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

    it("activates recovery", async () => {
        const aliceRequest: AccountRecoveryRequest = buildAcceptedAliceRecoveryRequest();
        const bobRequest: AccountRecoveryRequest = buildAcceptedBobRecoveryRequest();
        const currentAccount = REQUESTER;
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
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAccount))
                    .returns(Promise.resolve(undefined));
                nodeApi.setup(instance => instance.queries.getProxy(currentAccount))
                    .returns(Promise.resolve(undefined));

                const legalOfficersAddresses = legalOfficers.map(legalOfficer => legalOfficer.account.address);
                nodeApi.setup(instance => instance.polkadot.tx.verifiedRecovery.createRecovery(It.Is<string[]>(
                        addresses => addresses.every(address => legalOfficersAddresses.includes(address)))))
                    .returns(submittable.object());
            },
            currentAccount,
            legalOfficers,
            tokens,
        );
        const state = new AcceptedRecovery({
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
            params.signerId === currentAccount.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.activate({ signer: signer.object() });

        expect(nextState).toBeInstanceOf(ActiveRecovery);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(false);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });
});

describe("PendingRecovery", () => {

    it("claims", async () => {
        const aliceRequest: AccountRecoveryRequest = buildAcceptedAliceRecoveryRequest();
        aliceRequest.status = "ACTIVATED";
        const bobRequest: AccountRecoveryRequest = buildAcceptedBobRecoveryRequest();
        bobRequest.status = "ACTIVATED";
        const currentAccount = REQUESTER;
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
                        ALICE.account,
                        BOB.account,
                    ]
                };
                nodeApi.setup(instance => instance.queries.getRecoveryConfig(currentAccount))
                    .returns(Promise.resolve(recoveryConfig));
                nodeApi.setup(instance => instance.queries.getProxy(currentAccount))
                    .returns(Promise.resolve(RECOVERED_ADDRESS));

                nodeApi.setup(instance => instance.polkadot.tx.recovery.claimRecovery(RECOVERED_ADDRESS.address))
                    .returns(submittable.object());
            },
            currentAccount,
            legalOfficers,
            tokens,
        );
        const state = new ActiveRecovery({
            ...sharedState,
            selectedLegalOfficers: sharedState.legalOfficerClasses,
            legalOfficers: sharedState.legalOfficerClasses,
            pendingProtectionRequests: [],
            acceptedProtectionRequests: [ aliceRequest, bobRequest ],
            rejectedProtectionRequests: [],
            cancelledProtectionRequests: [],
            allRequests: [ aliceRequest, bobRequest ],
            recoveryConfig: {
                legalOfficers: [ ALICE.account, BOB.account ]
            }
        });
        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === currentAccount.address
            && params.submittable === submittable.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        const nextState = await state.claimRecovery({ signer: signer.object() });

        expect(nextState).toBeInstanceOf(ClaimedRecovery);
        expect(nextState.protectionParameters.isActive).toBe(true);
        expect(nextState.protectionParameters.isClaimed).toBe(true);
        expect(nextState.protectionParameters.isRecovery).toBe(true);
    });
});
