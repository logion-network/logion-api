import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types.js";
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { Mock } from "moq.ts";
import { Balance } from "../src/interfaces/index.js";
import { DEFAULT_LEGAL_OFFICER } from "./TestData.js";
import { Adapters } from "../src/Adapters.js";
import { POLKADOT_API_CREATE_TYPE, mockCodecWithToString, mockValidAccountId } from "./Util.js";
import { UUID, FeesEstimator } from "../src/index.js";

describe("FeesEstimator", () => {

    const LOC_REQUEST_ID = "9a1575ca-fbe8-4a61-a5b0-357300b7a57d";

    it("estimates fees on file add", async () => {
        const expectedStorageFee = BigInt(100);

        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const queryFileStorageFee = () => Promise.resolve({ toBigInt: () => expectedStorageFee } as Balance );
        const addFile = () => submittable.object();

        const api = mockPolkadotApiForFeesEstimator(queryFileStorageFee, addFile);
        const estimator = new FeesEstimator(api, new Adapters(api));
        const fees = await estimator.estimateAddFile({
            locId: new UUID(LOC_REQUEST_ID),
            hash: "0xf2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2",
            nature: "0xf85455e7f9269c18b042ced52395324f78d482502049c80456581054fa9cb852", // "Some nature",
            submitter: mockValidAccountId(DEFAULT_LEGAL_OFFICER),
            size: BigInt(42),
            origin: DEFAULT_LEGAL_OFFICER,
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBe(expectedStorageFee);
        expect(fees.totalFee).toBe(expectedInclusionFee + expectedStorageFee);
    });

    it("estimates fees without storage", async () => {
        const dispatchInfo = new Mock<RuntimeDispatchInfo>();
        const expectedInclusionFee = BigInt(42);
        dispatchInfo.setup(instance => instance.partialFee).returns(mockCodecWithToString(expectedInclusionFee.toString()));
        const submittable = new Mock<SubmittableExtrinsic>();
        submittable.setup(instance => instance.paymentInfo(DEFAULT_LEGAL_OFFICER)).returns(Promise.resolve(dispatchInfo.object()));

        const api = mockPolkadotApiForFeesEstimator();
        const estimator = new FeesEstimator(api, new Adapters(api));
        const fees = await estimator.estimateWithoutStorage({
            origin: DEFAULT_LEGAL_OFFICER,
            submittable: submittable.object(),
        });

        expect(fees.inclusionFee).toBe(expectedInclusionFee);
        expect(fees.storageFee).toBeUndefined();
        expect(fees.totalFee).toBe(expectedInclusionFee);
    });
});

function mockPolkadotApiForFeesEstimator(queryFileStorageFee?: any, addFile?: any) {
    return {
        tx: {
            logionLoc: {
                addFile,
            },
        },
        call: {
            feesApi: {
                queryFileStorageFee,
            }
        },
        createType: POLKADOT_API_CREATE_TYPE,
    } as unknown as ApiPromise;
}
