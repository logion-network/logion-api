import { Numbers, CoinBalance, Currency, Queries, Fees, Lgnt, ValidAccountId } from "@logion/node-api";
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from "luxon";
import { It, Mock, Times } from 'moq.ts';

import {
    buildTestConfig,
    LOGION_CLIENT_CONFIG,
    ALICE,
    BOB,
    buildTestAuthenticatedSharedSate,
    SUCCESSFUL_SUBMISSION,
    buildValidPolkadotAccountId,
    buildSimpleNodeApi
} from "./Utils.js";
import { AccountTokens, LogionClient, Transaction, AxiosFactory, BalanceState, Signer, LegalOfficerClass } from "../src/index.js";

describe("Balance", () => {

    it("gets balances", async () => {
        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([]));

            nodeApi.setup(instance => instance.queries.getCoinBalances(REQUESTER_ADDRESS))
                .returns(Promise.resolve([ COIN_BALANCE ]));
        })
        const client = (await LogionClient.create(config)).withCurrentAccount(REQUESTER_ADDRESS)

        const balanceState = await client.balanceState();

        expect(balanceState.balances.length).toBe(1);
        expect(balanceState.balances[0]).toEqual(COIN_BALANCE);
    })

    it("gets transactions", async () => {

        const transactionBase = (amount: number) => { return {
            pallet: "balances",
            method: "transfer",
            type: "balances.transfer",
            transferValue: amount.toString(),
            fees: {
                inclusion: "100",
                total: "100"
            },
            tip: "0",
            reserved: "0",
            total: (amount + 100).toString(),
            createdOn: "",
            successful: true,
        }}
        const t1: Transaction = {
            ...transactionBase(200000),
            from: REQUESTER_ADDRESS.address,
            id: "t1",
            to: ALICE.account.address,
            transferDirection: "Sent",
            type: "EXTRINSIC",
        }
        const t2: Transaction = {
            ...transactionBase(300000),
            id: "t2",
            from: BOB.account.address,
            to: REQUESTER_ADDRESS.address,
            transferDirection: "Received",
            type: "EXTRINSIC",
        }
        const transactions: Transaction[] = [ t1, t2 ]

        const config = buildTestConfig(testConfigFactory => {
            const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
            testConfigFactory.setupDefaultNetworkState();
            const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            setupFetchTransactions(axiosFactory, transactions, REQUESTER_ADDRESS.address)

            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([ new LegalOfficerClass({
                legalOfficer: ALICE,
                axiosFactory: axiosFactory.object(),
            }) ]));

            nodeApi.setup(instance => instance.queries.getCoinBalances(REQUESTER_ADDRESS))
                .returns(Promise.resolve([ COIN_BALANCE ]));
        })
        const client = (await LogionClient.create(config)).withCurrentAccount(REQUESTER_ADDRESS)

        const balanceState = await client.balanceState();
        expect(balanceState.transactions).toEqual(transactions)
    })

    it("transfers from account", async () => {
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER_ADDRESS.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const amount = Lgnt.fromCanonical(200n);
        const transfer = new Mock<SubmittableExtrinsic>();
        const balances: CoinBalance[] = [
            {
                coin: {
                    id: "lgnt",
                    symbol: "LGNT",
                },
                available: new Numbers.PrefixedNumber("300", Numbers.ATTO),
                total: new Numbers.PrefixedNumber("300", Numbers.ATTO),
                reserved: new Numbers.PrefixedNumber("0", Numbers.ATTO),
                level: 1,
            }
        ];
        const sharedState = await buildTestAuthenticatedSharedSate(
            testConfigFactory => {
                const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
                testConfigFactory.setupDefaultNetworkState();
                const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

                directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([]));

                nodeApi.setup(instance => instance.queries.getCoinBalances(REQUESTER_ADDRESS))
                    .returns(Promise.resolve([ COIN_BALANCE ]));

                nodeApi.setup(instance => instance.polkadot.tx.balances.transferKeepAlive(REQUESTER_ADDRESS.address, "200"))
                    .returns(transfer.object());

                nodeApi.setup(instance => instance.fees.estimateWithoutStorage(It.IsAny()))
                    .returnsAsync(Fees.zero());

                setupFetchTransactions(axiosFactory, [], REQUESTER_ADDRESS.address);
            },
            REQUESTER_ADDRESS,
            [ ALICE, BOB ],
            tokens,
        );

        const balanceState = new BalanceState({
            ...sharedState,
            balances,
            transactions: [],
            isRecovery: false,
        });

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === REQUESTER_ADDRESS.address
            && params.submittable === transfer.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        await balanceState.transfer({
            signer: signer.object(),
            amount,
            destination: REQUESTER_ADDRESS,
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
    })

    it("transfers from recovered account", async () => {
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER_ADDRESS.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const recoveredAddress = ValidAccountId.polkadot("5EBxoSssqNo23FvsDeUxjyQScnfEiGxJaNwuwqBH2Twe35BX");
        const asRecovered = new Mock<SubmittableExtrinsic>();
        const amount = Lgnt.fromCanonical(200n);
        const transfer = new Mock<SubmittableExtrinsic>();
        const balances: CoinBalance[] = [
            {
                coin: {
                    id: "lgnt",
                    symbol: "LGNT",
                },
                available: new Numbers.PrefixedNumber("100", Numbers.ATTO),
                total: new Numbers.PrefixedNumber("100", Numbers.ATTO),
                reserved: new Numbers.PrefixedNumber("0", Numbers.ATTO),
                level: 1,
            }
        ];
        const sharedState = await buildTestAuthenticatedSharedSate(
            testConfigFactory => {
                const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
                testConfigFactory.setupDefaultNetworkState();
                const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

                directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([]));

                nodeApi.setup(instance => instance.queries.getCoinBalances(REQUESTER_ADDRESS))
                    .returns(Promise.resolve([ COIN_BALANCE ]));

                nodeApi.setup(instance => instance.polkadot.tx.balances.transferKeepAlive(REQUESTER_ADDRESS.address, "200"))
                    .returns(transfer.object());

                nodeApi.setup(instance => instance.fees.estimateWithoutStorage(It.IsAny()))
                    .returnsAsync(Fees.zero());

                nodeApi.setup(instance => instance.polkadot.tx.recovery.asRecovered(recoveredAddress.address, transfer.object()))
                    .returns(asRecovered.object());

                nodeApi.setup(instance => instance.queries.getAccountData(recoveredAddress))
                    .returnsAsync({ available: 200n, reserved: 0n, total: 200n });

                setupFetchTransactions(axiosFactory, [], recoveredAddress.address);
            },
            REQUESTER_ADDRESS,
            [ ALICE, BOB ],
            tokens,
        );

        const balanceState = new BalanceState({
            ...sharedState,
            balances,
            transactions: [],
            isRecovery: true,
            recoveredAccount: recoveredAddress,
        });

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: string, submittable: SubmittableExtrinsic }>(params =>
            params.signerId === REQUESTER_ADDRESS.address
            && params.submittable === asRecovered.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        await balanceState.transfer({
            signer: signer.object(),
            amount,
            destination: REQUESTER_ADDRESS,
        });

        signer.verify(instance => instance.signAndSend(It.IsAny()), Times.Once());
    })

    it("fails transferring with insufficient funds", async () => {
        const token = "some-token";
        const tokens = new AccountTokens(
            buildSimpleNodeApi(),
            {
                [REQUESTER_ADDRESS.toKey()]: {
                    value: token,
                    expirationDateTime: DateTime.now().plus({hours: 1})
                }
            }
        );
        const amount = Lgnt.fromCanonical(200n);
        const transfer = new Mock<SubmittableExtrinsic>();
        const balances: CoinBalance[] = [
            {
                coin: {
                    id: "lgnt",
                    symbol: "LGNT",
                },
                available: new Numbers.PrefixedNumber("200", Numbers.ATTO),
                total: new Numbers.PrefixedNumber("200", Numbers.ATTO),
                reserved: new Numbers.PrefixedNumber("0", Numbers.ATTO),
                level: 1,
            }
        ];
        const sharedState = await buildTestAuthenticatedSharedSate(
            testConfigFactory => {
                const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
                testConfigFactory.setupDefaultNetworkState();
                const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
                const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

                directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([]));

                nodeApi.setup(instance => instance.queries.getCoinBalances(REQUESTER_ADDRESS))
                    .returns(Promise.resolve([ COIN_BALANCE ]));

                nodeApi.setup(instance => instance.polkadot.tx.balances.transferKeepAlive(REQUESTER_ADDRESS.address, "200"))
                    .returns(transfer.object());

                nodeApi.setup(instance => instance.fees.estimateWithoutStorage(It.IsAny()))
                    .returnsAsync(new Fees({ inclusionFee: Lgnt.fromCanonical(50n) }));

                setupFetchTransactions(axiosFactory, [], REQUESTER_ADDRESS.address);
            },
            REQUESTER_ADDRESS,
            [ ALICE, BOB ],
            tokens,
        );

        const balanceState = new BalanceState({
            ...sharedState,
            balances,
            transactions: [],
            isRecovery: false,
        });

        const signer = new Mock<Signer>();
        signer.setup(instance => instance.signAndSend(It.Is<{ signerId: ValidAccountId, submittable: SubmittableExtrinsic }>(params =>
            params.signerId.equals(REQUESTER_ADDRESS)
            && params.submittable === transfer.object()))
        ).returns(Promise.resolve(SUCCESSFUL_SUBMISSION));

        await expectAsync(balanceState.transfer({
            signer: signer.object(),
            amount,
            destination: REQUESTER_ADDRESS,
        })).toBeRejectedWithError("Insufficient balance");
    })
})

const REQUESTER_ADDRESS = buildValidPolkadotAccountId("5ERRWWYABvYjyUG2oLCNifkmcCQT44ijPpQNxtwZZFj86Jjd")!;

function setupFetchTransactions(axiosFactory: Mock<AxiosFactory>, transactions: Transaction [], address: string) {
    const axios = new Mock<AxiosInstance>();
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns({
        transactions
    })
    axios.setup(instance => instance.put("/api/transaction", It.Is<{address: string}>(body => body.address === address)))
        .returns(Promise.resolve(response.object()))
    axiosFactory.setup(instance => instance.buildAxiosInstance(It.IsAny<string>(), It.IsAny()))
        .returns(axios.object());
}

const COIN_BALANCE: CoinBalance = {
    coin: Queries.getCoin("lgnt"),
    total: Currency.nLgnt(100n),
    available: Currency.nLgnt(100n),
    reserved: Currency.nLgnt(0n),
    level: 100,
};
