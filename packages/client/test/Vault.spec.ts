import { PrefixedNumber, ATTO, ValidAccountId, Vault } from '@logion/node-api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces/payment';
import type { Header, BlockNumber } from '@polkadot/types/interfaces/runtime';
import type { IU8a } from '@polkadot/types-codec/types';
import type { Compact } from '@polkadot/types-codec/base';
import { DateTime } from 'luxon';
import { It, Mock } from "moq.ts";

import {
    AccountTokens,
    Signer,
    SignParameters,
    VaultState,
    CreateVaultTransferRequest,
    VaultClient,
    VaultTransferRequest,
    PostalAddress,
    UserIdentity
} from '../src/index.js';
import { TestConfigFactory } from "./TestConfigFactory.js";
import {
    ALICE,
    BOB,
    buildTestAuthenticatedSharedSate,
    LEGAL_OFFICERS,
    LOGION_CLIENT_CONFIG,
    REQUESTER,
    RECOVERED_ADDRESS as RECOVERING_ADDRESS,
    buildSimpleNodeApi
} from "./Utils.js";

describe("Vault", () => {

    const vaultAddress = "5GsjmoJBjbKpjQiUHeVmSHuUvgonLvJUyLSHfbKDRYz4GK3V";

    const destination = BOB.address;

    const amount = "200";

    const expectedPendingRequest: VaultTransferRequest = {
        id: "1",
        amount,
        block: "42",
        createdOn: DateTime.now().toISO(),
        destination,
        index: 1,
        legalOfficerAddress: ALICE.address,
        origin: REQUESTER.address,
        requesterIdentity: {} as UserIdentity,
        requesterPostalAddress: {} as PostalAddress,
        status: "PENDING"
    };
    
    it("creates regular transfer", async () => {
        const currentAddress = REQUESTER;
        const tokens = buildTokens(currentAddress);
        const maxWeight = "100000";
        const transfer = buildTransferSubmittable(vaultAddress, maxWeight);

        const signer = new Mock<Signer>();
        const multisigBlockHash = "0x1234567890abcdef";
        signer.setup(instance => instance.signAndSend(
            It.Is<SignParameters>(param =>
                param.signerId === REQUESTER.address
                && param.submittable === transfer
            )
        )).returns(Promise.resolve({
            block: multisigBlockHash,
            index: 1,
            events: [],
        }));

        const vault = new Mock<Vault>();
        vault.setup(instance => instance.address).returns(vaultAddress);
        vault.setup(instance => instance.tx.transferFromVault(It.IsAny())).returns(Promise.resolve(transfer));

        const client = buildVaultClientForCreation(expectedPendingRequest);

        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
                factory.setupAxiosFactoryMock();

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const blockHeader = new Mock<Header>();
                const blockNumber = new Mock<Compact<BlockNumber>>();
                blockHeader.setup(instance => instance.number).returns(blockNumber.object());
                blockNumber.setup(instance => instance.toString()).returns(expectedPendingRequest.block);
                nodeApi.setup(instance => instance.polkadot.rpc.chain.getHeader(multisigBlockHash)).returns(Promise.resolve(blockHeader.object()));
            },
            currentAddress,
            LEGAL_OFFICERS,
            tokens,
        );
        const pendingVaultTransferRequests: VaultTransferRequest[] = [];
        const cancelledVaultTransferRequests: VaultTransferRequest[] = [];
        const rejectedVaultTransferRequests: VaultTransferRequest[] = [];
        const acceptedVaultTransferRequests: VaultTransferRequest[] = [];
        const state = new VaultState({
            ...sharedState,
            client,
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
            acceptedVaultTransferRequests,
            selectedLegalOfficers: [ ALICE, BOB ],
            isRecovery: false,
            balances: [],
            transactions: [],
            vault: vault.object(),
        });

        const nextState = await state.createVaultTransferRequest({
            legalOfficer: ALICE,
            amount: new PrefixedNumber(amount, ATTO),
            destination,
            signer: signer.object()
        });

        expect(nextState.pendingVaultTransferRequests.length).toBe(1);
        expect(nextState.pendingVaultTransferRequests[0]).toBe(expectedPendingRequest);
    });

    it("creates recovery transfer", async () => {
        const currentAddress = RECOVERING_ADDRESS;
        const tokens = buildTokens(currentAddress);
        const destination = BOB.address;
        const amount = "200";
        const maxWeight = "100000";
        const transfer = buildTransferSubmittable(vaultAddress, maxWeight);

        const asRecovered = new Mock<SubmittableExtrinsic>();
        const signer = new Mock<Signer>();
        const asRecoveredBlockHash = "0x1234567890abcdef";
        signer.setup(instance => instance.signAndSend(
            It.Is<SignParameters>(param =>
                param.signerId === RECOVERING_ADDRESS.address
                && param.submittable === asRecovered.object()
            )
        )).returns(Promise.resolve({
            block: asRecoveredBlockHash,
            index: 1,
            events: [],
        }));

        const vault = new Mock<Vault>();
        vault.setup(instance => instance.address).returns(vaultAddress);
        vault.setup(instance => instance.tx.transferFromVault(It.IsAny())).returns(Promise.resolve(transfer));

        const client = buildVaultClientForCreation(expectedPendingRequest);

        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
                factory.setupAxiosFactoryMock();

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.polkadot.tx.recovery.asRecovered(REQUESTER.address, transfer)).returns(asRecovered.object());

                const blockHeader = new Mock<Header>();
                const blockNumber = new Mock<Compact<BlockNumber>>();
                blockHeader.setup(instance => instance.number).returns(blockNumber.object());
                blockNumber.setup(instance => instance.toString()).returns(expectedPendingRequest.block);
                nodeApi.setup(instance => instance.polkadot.rpc.chain.getHeader(asRecoveredBlockHash)).returns(Promise.resolve(blockHeader.object()));
            },
            currentAddress,
            LEGAL_OFFICERS,
            tokens,
        );
        const pendingVaultTransferRequests: VaultTransferRequest[] = [];
        const cancelledVaultTransferRequests: VaultTransferRequest[] = [];
        const rejectedVaultTransferRequests: VaultTransferRequest[] = [];
        const acceptedVaultTransferRequests: VaultTransferRequest[] = [];
        const state = new VaultState({
            ...sharedState,
            client,
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
            acceptedVaultTransferRequests,
            selectedLegalOfficers: [ ALICE, BOB ],
            isRecovery: true,
            recoveredAddress: REQUESTER.address,
            balances: [],
            transactions: [],
            vault: vault.object(),
        });

        const nextState = await state.createVaultTransferRequest({
            legalOfficer: ALICE,
            amount: new PrefixedNumber(amount, ATTO),
            destination,
            signer: signer.object()
        });

        expect(nextState.pendingVaultTransferRequests.length).toBe(1);
        expect(nextState.pendingVaultTransferRequests[0]).toBe(expectedPendingRequest);
    });

    it("cancels regular transfer", async () => {
        const currentAddress = REQUESTER;
        const tokens = buildTokens(currentAddress);

        const cancel = new Mock<SubmittableExtrinsic>();
        const signer = new Mock<Signer>();
        const multisigBlockHash = "0x1234567890abcdef";
        signer.setup(instance => instance.signAndSend(
            It.Is<SignParameters>(param =>
                param.signerId === REQUESTER.address
                && param.submittable === cancel.object()
            )
        )).returns(Promise.resolve({
            block: multisigBlockHash,
            index: 1,
            events: [],
        }));

        const requestToCancel = expectedPendingRequest;

        const vault = new Mock<Vault>();
        vault.setup(instance => instance.address).returns(vaultAddress);
        vault.setup(instance => instance.tx.cancelVaultTransfer(It.IsAny())).returns(cancel.object());

        const client = buildVaultClientForCancel(requestToCancel);

        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
                factory.setupAxiosFactoryMock();
                factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            },
            currentAddress,
            LEGAL_OFFICERS,
            tokens,
        );
        const pendingVaultTransferRequests: VaultTransferRequest[] = [ requestToCancel ];
        const cancelledVaultTransferRequests: VaultTransferRequest[] = [];
        const rejectedVaultTransferRequests: VaultTransferRequest[] = [];
        const acceptedVaultTransferRequests: VaultTransferRequest[] = [];
        const state = new VaultState({
            ...sharedState,
            client,
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
            acceptedVaultTransferRequests,
            selectedLegalOfficers: [ ALICE, BOB ],
            isRecovery: false,
            balances: [],
            transactions: [],
            vault: vault.object(),
        });

        const nextState = await state.cancelVaultTransferRequest(ALICE, requestToCancel, signer.object());

        expect(nextState.pendingVaultTransferRequests.length).toBe(0);
        expect(nextState.cancelledVaultTransferRequests.length).toBe(1);
        expect(nextState.cancelledVaultTransferRequests[0].status).toBe("CANCELLED");
    });

    it("cancels recovery transfer", async () => {
        const currentAddress = RECOVERING_ADDRESS;
        const tokens = buildTokens(currentAddress);

        const asRecovered = new Mock<SubmittableExtrinsic>();
        const signer = new Mock<Signer>();
        const multisigBlockHash = "0x1234567890abcdef";
        signer.setup(instance => instance.signAndSend(
            It.Is<SignParameters>(param =>
                param.signerId === RECOVERING_ADDRESS.address
                && param.submittable === asRecovered.object()
            )
        )).returns(Promise.resolve({
            block: multisigBlockHash,
            index: 1,
            events: [],
        }));

        const requestToCancel = expectedPendingRequest;

        const vault = new Mock<Vault>();
        vault.setup(instance => instance.address).returns(vaultAddress);
        const cancel = new Mock<SubmittableExtrinsic>();
        vault.setup(instance => instance.tx.cancelVaultTransfer(It.IsAny())).returns(cancel.object());

        const client = buildVaultClientForCancel(requestToCancel);

        const sharedState = await buildTestAuthenticatedSharedSate(
            (factory: TestConfigFactory) => {
                factory.setupDefaultNetworkState();
                factory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
                factory.setupAxiosFactoryMock();

                const nodeApi = factory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                nodeApi.setup(instance => instance.polkadot.tx.recovery.asRecovered(REQUESTER.address, cancel.object())).returns(asRecovered.object());
            },
            currentAddress,
            LEGAL_OFFICERS,
            tokens,
        );
        const pendingVaultTransferRequests: VaultTransferRequest[] = [ requestToCancel ];
        const cancelledVaultTransferRequests: VaultTransferRequest[] = [];
        const rejectedVaultTransferRequests: VaultTransferRequest[] = [];
        const acceptedVaultTransferRequests: VaultTransferRequest[] = [];
        const state = new VaultState({
            ...sharedState,
            client,
            pendingVaultTransferRequests,
            cancelledVaultTransferRequests,
            rejectedVaultTransferRequests,
            acceptedVaultTransferRequests,
            selectedLegalOfficers: [ ALICE, BOB ],
            isRecovery: true,
            recoveredAddress: REQUESTER.address,
            balances: [],
            transactions: [],
            vault: vault.object(),
        });

        const nextState = await state.cancelVaultTransferRequest(ALICE, requestToCancel, signer.object());

        expect(nextState.pendingVaultTransferRequests.length).toBe(0);
        expect(nextState.cancelledVaultTransferRequests.length).toBe(1);
        expect(nextState.cancelledVaultTransferRequests[0].status).toBe("CANCELLED");
    });
});

function buildTokens(currentAddress: ValidAccountId): AccountTokens {
    const token = "some-token";
    return new AccountTokens(
        buildSimpleNodeApi(),
        {
            [`Polkadot:${currentAddress.address}`]: {
                value: token,
                expirationDateTime: DateTime.now().plus({hours: 1})
            }
        }
    );
}

function buildTransferSubmittable(vaultAddress: string, weight: string): SubmittableExtrinsic {
    const transfer = new Mock<SubmittableExtrinsic>();
    transfer.setup(instance => instance.paymentInfo(vaultAddress)).returns(Promise.resolve({
        weight: {
            refTime: weight,
        },
    } as unknown as RuntimeDispatchInfo));
    const transferHash = {} as IU8a;
    transfer.setup(instance => instance.method.hash).returns(transferHash);
    return transfer.object();
}

function buildVaultClientForCreation(expectedPendingRequest: VaultTransferRequest): VaultClient {
    const client = new Mock<VaultClient>();
    client.setup(instance => instance.createVaultTransferRequest(ALICE, It.Is<CreateVaultTransferRequest>(request =>
        request.destination === expectedPendingRequest.destination
        && request.block === expectedPendingRequest.block
        && request.amount === expectedPendingRequest.amount
        && request.index === expectedPendingRequest.index
        && request.origin === expectedPendingRequest.origin
    ))).returns(Promise.resolve(expectedPendingRequest));
    return client.object();
}

function buildVaultClientForCancel(requestToCancel: VaultTransferRequest): VaultClient {
    const client = new Mock<VaultClient>();
    client.setup(instance => instance.cancelVaultTransferRequest(ALICE, It.Is<VaultTransferRequest>(request =>
        request.destination === requestToCancel.destination
        && request.block === requestToCancel.block
        && request.amount === requestToCancel.amount
        && request.index === requestToCancel.index
        && request.origin === requestToCancel.origin
    ))).returns(Promise.resolve());
    return client.object();
}
