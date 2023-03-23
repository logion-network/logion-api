import { createPolkadotTransactionLoc, UUID, getLegalOfficerCase, addFile } from "../src/index.js";
import { ALICE, REQUESTER, setup, signAndSend } from "./Util.js";

export async function createTransactionLocTest() {
    const { alice, api } = await setup();

    const createLocExtrinsic = createPolkadotTransactionLoc({
        api,
        locId: TRANSACTION_LOC_ID,
        requester: REQUESTER,
    });
    await signAndSend(alice, createLocExtrinsic);

    const loc = await getLegalOfficerCase({
        api,
        locId: TRANSACTION_LOC_ID,
    });
    expect(loc?.owner).toBe(ALICE);
    expect(loc?.requesterAddress).toBe(REQUESTER);
    expect(loc?.closed).toBe(false);
    expect(loc?.locType).toBe("Transaction");
}

export async function addFileToTransactionLocTest() {
    const { alice, api } = await setup();

    const hash = "0x46d9bb04725470dc8483395f635805e9da5e105c7b2b90935b895a0f4f364d80";
    const nature = "Some nature";
    const size = BigInt(456);
    const addFileExtrinsic = addFile({
        api,
        locId: TRANSACTION_LOC_ID,
        hash,
        nature,
        submitter: ALICE,
        size,
    });
    await signAndSend(alice, addFileExtrinsic);

    const loc = await getLegalOfficerCase({
        api,
        locId: TRANSACTION_LOC_ID,
    });
    expect(loc?.files.length).toBe(1);
    expect(loc?.files[0].hash).toBe(hash);
    expect(loc?.files[0].nature).toBe(nature);
    expect(loc?.files[0].submitter).toBe(ALICE);
    expect(loc?.files[0].size).toBe(size);
}

const TRANSACTION_LOC_ID = new UUID("c1dc4b62-714b-4001-ae55-1b54ad61dd93");
