import { buildTestConfig, LOGION_CLIENT_CONFIG, ALICE, BOB } from "./Utils";
import { LogionClient } from "../src";
import { AccountInfo } from "@polkadot/types/interfaces/system/types";
import { Transaction } from "../src/TransactionClient";
import { It, Mock } from 'moq.ts';
import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosFactory } from "../src/AxiosFactory";
import { ATTO } from "@logion/node-api/dist/numbers";

const REQUESTER_ADDRESS = "5ERRWWYABvYjyUG2oLCNifkmcCQT44ijPpQNxtwZZFj86Jjd";

describe("Balance", () => {

    it("gets balances", async () => {

        const config = buildTestConfig(testConfigFactory => {
            testConfigFactory.setupDefaultAxiosInstanceFactory();
            testConfigFactory.setupDefaultNetworkState();
            const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([]));

            const accountInfo = mockAccountInfo(100n);
            nodeApi.setup(instance => instance.query.system.account(REQUESTER_ADDRESS))
                .returns(Promise.resolve(accountInfo))
        })
        const client = (await LogionClient.create(config)).withCurrentAddress(REQUESTER_ADDRESS)

        const balanceState = await client.balanceState();

        expect(balanceState.balances[0].available.coefficient.toNumber()).toEqual(100)
        expect(balanceState.balances[0].available.prefix).toEqual(ATTO)
        expect(balanceState.balances[0].balance.coefficient.toNumber()).toEqual(100)
        expect(balanceState.balances[0].balance.prefix).toEqual(ATTO)

    })

    it("gets transactions", async () => {

        const transactionBase = (amount: number) => { return {
            pallet: "balances",
            method: "transfer",
            type: "balances.transfer",
            transferValue: amount.toString(),
            fee: "100",
            tip: "0",
            reserved: "0",
            total: (amount + 100).toString(),
            createdOn: "",
            successful: true,
        }}
        const t1: Transaction = {
            ...transactionBase(200000),
            from: REQUESTER_ADDRESS,
            id: "t1",
            to: ALICE.address,
            transferDirection: "Sent",
        }
        const t2: Transaction = {
            ...transactionBase(300000),
            id: "t2",
            from: BOB.address,
            to: REQUESTER_ADDRESS,
            transferDirection: "Received",
        }
        const transactions: Transaction[] = [ t1, t2 ]

        const config = buildTestConfig(testConfigFactory => {
            const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
            testConfigFactory.setupDefaultNetworkState();
            const nodeApi = testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
            const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);

            setupFetchTransactions(axiosFactory, transactions)

            directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([ ALICE ]));

            const accountInfo = mockAccountInfo(100n);
            nodeApi.setup(instance => instance.query.system.account(REQUESTER_ADDRESS))
                .returns(Promise.resolve(accountInfo))
        })
        const client = (await LogionClient.create(config)).withCurrentAddress(REQUESTER_ADDRESS)

        const balanceState = await client.balanceState();
        expect(balanceState.transactions).toEqual(transactions)
    })
})

function setupFetchTransactions(axiosFactory: Mock<AxiosFactory>, transactions: Transaction []) {
    const axios = new Mock<AxiosInstance>();
    const response = new Mock<AxiosResponse<any>>();
    response.setup(instance => instance.data).returns({
        transactions
    })
    axios.setup(instance => instance.put("/api/transaction", It.Is<{address: string}>(body => body.address === REQUESTER_ADDRESS)))
        .returns(Promise.resolve(response.object()))
    axiosFactory.setup(instance => instance.buildAxiosInstance(It.IsAny<string>(), It.IsAny()))
        .returns(axios.object());
}

function mockAccountInfo(free: bigint): AccountInfo {
    const accountInfo = {
        data: {
            free: {
                toString: () => free.toString(),
                add: () => free.toString()
            },
            reserved: {
                toString: () => "0",
            }
        }
    }
    return accountInfo as unknown as AccountInfo;
}
