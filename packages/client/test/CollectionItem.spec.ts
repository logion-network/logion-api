import { UUID } from "@logion/node-api";
import { It, Mock } from "moq.ts";

import {
    CheckCertifiedCopyResult,
    CheckResultType,
    CollectionItem,
    GetDeliveriesRequest,
    LocClient,
    UploadableCollectionItem,
    TermsAndConditionsElement
} from "../src";

const locId = new UUID("eff6da24-1364-4594-965a-3b31f1e1df25");
const collectionItemId = "0x7411e1c74c64430ea9700cc695be6685";
const originalHash = "0xf2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2";
const copyHash = "0x72685ddcbec5052f9db2523252407990c24bb94d43b478d1a22411e612f3b650";
const otherHash = "7d6fd7774f0d87624da6dcf16d0d3d104c3191e771fbe2f39c86aed4b2bf1a0f";
const oldCopyHash = "ab03c34f1ece08211fe2a8039fd6424199b3f5d7b55ff13b1134b364776c45c5";

describe("CollectionItem checkCertifiedCopy", () => {

    it("detects that latest copy hash comes from certified copy", async () => {
        const item = given(true);
        const result = await item.checkCertifiedCopy(copyHash);
        thenResultFully(result, CheckResultType.POSITIVE);
    });

    it("detects that old copy hash comes from certified copy", async () => {
        const item = given(true);
        const result = await item.checkCertifiedCopy(oldCopyHash);
        thenPositiveAndLatest(result, CheckResultType.NEGATIVE);
    });

    it("detects non certified copy", async () => {
        const item = given(true);
        const result = await item.checkCertifiedCopy(otherHash);
        thenResultFully(result, CheckResultType.NEGATIVE);
    });

    it("detects that latest copy hash comes from certified copy in unprivileged mode", async () => {
        const item = given(false);
        const result = await item.checkCertifiedCopy(copyHash);
        thenResultFully(result, CheckResultType.POSITIVE);
    });

    it("detects old copy as non certified in unprivileged mode", async () => {
        const item = given(false);
        const result = await item.checkCertifiedCopy(oldCopyHash);
        thenResultFully(result, CheckResultType.NEGATIVE);
    });

    it("detects non certified copy in unprivileged mode", async () => {
        const item = given(false);
        const result = await item.checkCertifiedCopy(otherHash);
        thenResultFully(result, CheckResultType.NEGATIVE);
    });
});

describe("CollectionItem checkHash", () => {

    it("succeeds to check original hash", () => {
        const item = given(false);
        const result = item.checkHash(originalHash);
        expect(result.collectionItemFile?.hash).toEqual(originalHash);
    })

    it("fails to check copy hash", () => {
        const item = given(false);
        const result = item.checkHash(copyHash);
        expect(result.collectionItemFile).toBeUndefined();
    })
});

function given(privileged: boolean, tc?: TermsAndConditionsElement[]): CollectionItem {
    const clientItem: UploadableCollectionItem = {
        id: collectionItemId,
        description: "Some description",
        addedOn: "2022-08-31T13:29:00.000Z",
        files: [
            {
                hash: originalHash,
                contentType: "text/plain",
                name: "test.txt",
                size: BigInt(4),
                uploaded: true,
            }
        ],
        token: {
            type: "owner",
            id: "0x900edc98db53508e6742723988b872dd08cd09c2",
        },
        restrictedDelivery: true,
        termsAndConditions: tc || [],
    };

    const locClient = new Mock<LocClient>();
    if (privileged) {
        locClient.setup(instance => instance.getDeliveries(It.Is<GetDeliveriesRequest>(args =>
            args.locId === locId
            && args.itemId === collectionItemId
        ))).returnsAsync({
            "0x72685ddcbec5052f9db2523252407990c24bb94d43b478d1a22411e612f3b650": [
                {
                    copyHash: copyHash,
                    owner: "0x900edc98db53508e6742723988b872dd08cd09c2",
                    generatedOn: "2022-08-25T07:27:46.128Z",
                    belongsToCurrentOwner: true,
                },
                {
                    copyHash: oldCopyHash,
                    owner: "0x900edc98db53508e6742723988b872dd08cd09c2",
                    generatedOn: "2022-08-24T07:27:46.128Z",
                    belongsToCurrentOwner: true,
                }
            ]
        });
    } else {
        locClient.setup(instance => instance.getDeliveries(It.Is<GetDeliveriesRequest>(args =>
            args.locId === locId
            && args.itemId === collectionItemId
        ))).returnsAsync({
            "0x72685ddcbec5052f9db2523252407990c24bb94d43b478d1a22411e612f3b650": [
                {
                    copyHash: copyHash,
                    owner: "0x900edc98db53508e6742723988b872dd08cd09c2",
                    generatedOn: "2022-08-25T07:27:46.128Z",
                    belongsToCurrentOwner: true,
                }
            ]
        });
    }
    return new CollectionItem({
        locId,
        clientItem,
        locClient: locClient.object(),
    });
}

function thenResultFully(result: CheckCertifiedCopyResult, expected: CheckResultType) {
    expect(result.summary).toBe(expected);
    expect(result.latest).toBe(expected);
    expect(result.logionOrigin).toBe(expected);
    expect(result.nftOwnership).toBe(expected);
}

function thenPositiveAndLatest(result: CheckCertifiedCopyResult, expected: CheckResultType) {
    expect(result.summary).toBe(expected);
    expect(result.latest).toBe(expected);
    expect(result.logionOrigin).toBe(CheckResultType.POSITIVE);
    expect(result.nftOwnership).toBe(CheckResultType.POSITIVE);
}
