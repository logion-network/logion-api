import { ALICE, BOB } from "./Utils.js";
import { LegalOfficer, LegalOfficerClass, AxiosFactory } from "../src/index.js";
import { Mock, It, Times } from "moq.ts";
import { AxiosInstance, AxiosResponse } from "axios";

describe("Workload", () => {

    const aliceToken = "alice-token";
    const bobToken = "bob-token";

    beforeEach(() => {
        LegalOfficerClass.flushWorkloadCache();
    })

    function setupAxios(legalOfficer: LegalOfficer, token: string, workload: number):
        { axiosFactory: Mock<AxiosFactory>, axiosInstance: Mock<AxiosInstance> } {

        const axiosFactory = new Mock<AxiosFactory>();
        const axiosInstance = new Mock<AxiosInstance>();
        const workloads: Record<string, number> = {};
        workloads[legalOfficer.address] = workload;
        axiosInstance.setup(instance => instance.put(
            `/api/workload`,
            It.Is<{ legalOfficerAddresses: string[] }>(params => params.legalOfficerAddresses.includes(legalOfficer.address)))
        )
            .returns(Promise.resolve({ data: { workloads } } as AxiosResponse));
        axiosFactory.setup(instance => instance.buildAxiosInstance(legalOfficer.node, token))
            .returns(axiosInstance.object());
        return { axiosFactory, axiosInstance }
    }

    it("fetches once when called twice in a row", async () => {

        const { axiosFactory, axiosInstance } = setupAxios(ALICE, aliceToken, 42);
        const alice = new LegalOfficerClass({
            legalOfficer: ALICE,
            token: aliceToken,
            axiosFactory: axiosFactory.object()
        });

        expect(await alice.getWorkload()).toEqual(42);
        expect(await alice.getWorkload()).toEqual(42);

        axiosInstance.verify(instance => instance.put(`/api/workload`, It.IsAny()), Times.Once())
    })

    it("fetches again after cache expiration", async () => {

        const { axiosFactory, axiosInstance } = setupAxios(ALICE, aliceToken, 42);
        const alice = new LegalOfficerClass({
            legalOfficer: ALICE,
            token: aliceToken,
            axiosFactory: axiosFactory.object()
        });

        LegalOfficerClass.workloadCacheTtlMs = 0;

        expect(await alice.getWorkload()).toEqual(42);
        expect(await alice.getWorkload()).toEqual(42);

        axiosInstance.verify(instance => instance.put(`/api/workload`, It.IsAny()), Times.Exactly(2))
    })

    it("fetches twice for LLOs on DISTINCT nodes", async () => {

        const aliceAxios = setupAxios(ALICE, aliceToken, 42);
        const alice = new LegalOfficerClass({
            legalOfficer: ALICE,
            token: aliceToken,
            axiosFactory: aliceAxios.axiosFactory.object()
        });
        expect(await alice.getWorkload()).toEqual(42);
        aliceAxios.axiosInstance.verify(instance => instance.put(`/api/workload`, It.IsAny()), Times.Once())

        const bobAxios = setupAxios(BOB, bobToken, 24);
        const bob = new LegalOfficerClass({
            legalOfficer: BOB,
            token: bobToken,
            axiosFactory: bobAxios.axiosFactory.object()
        });
        expect(await bob.getWorkload()).toEqual(24);
        bobAxios.axiosInstance.verify(instance => instance.put(`/api/workload`, It.IsAny()), Times.Once())
    })

    it("fetches once for LLOs on SAME node", async () => {

        const sameNode = ALICE.node;
        const axiosFactory = new Mock<AxiosFactory>();
        const axiosInstance = new Mock<AxiosInstance>();
        const workloads: Record<string, number> = {};
        workloads[ALICE.address] = 42;
        workloads[BOB.address] = 24;
        axiosInstance.setup(instance => instance.put(
            `/api/workload`,
            It.Is<{ legalOfficerAddresses: string[] }>(params => params.legalOfficerAddresses.includes(ALICE.address) && params.legalOfficerAddresses.includes(BOB.address)))
        )
            .returns(Promise.resolve({ data: { workloads } } as AxiosResponse));
        axiosFactory.setup(instance => instance.buildAxiosInstance(sameNode, aliceToken))
            .returns(axiosInstance.object());
        axiosFactory.setup(instance => instance.buildAxiosInstance(sameNode, bobToken))
            .returns(axiosInstance.object());

        const alice = new LegalOfficerClass({
            legalOfficer: {
                ...ALICE,
                node: sameNode
            },
            token: aliceToken,
            axiosFactory: axiosFactory.object()
        });
        const bob = new LegalOfficerClass({
            legalOfficer: {
                ...BOB,
                node: sameNode
            },
            token: bobToken,
            axiosFactory: axiosFactory.object()
        });
        expect(await alice.getWorkload()).toEqual(42);
        expect(await bob.getWorkload()).toEqual(24);
        axiosInstance.verify(instance => instance.put(`/api/workload`, It.IsAny()), Times.Once())
    })
})
