import { Signer, SignCallback, toBlockchainSubmission, BlockchainSubmissionParams } from "../src/index.js";
import { Mock } from "moq.ts";

describe("LocClient", () => {

    it("toBlockchainSubmission", () => {
        const signer = new Mock<Signer>().object();
        const callback = new Mock<SignCallback>().object();
        const someParams = {
            a: 123,
            b: "b",
        }
        const params: BlockchainSubmissionParams = {
            signer,
            callback,
            ...someParams,
        }
        const result = toBlockchainSubmission(params);
        expect(result.signer).toBe(signer);
        expect(result.callback).toBe(callback);
        expect(result.payload).toEqual(someParams);
    })
})
