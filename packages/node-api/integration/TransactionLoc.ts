import { UUID } from "../src/index.js";
import { ALICE, REQUESTER, setup, signAndSend } from "./Util.js";

export async function createTransactionLocTest() {
    const { alice, api } = await setup();

    const createLocExtrinsic = api.polkadot.tx.logionLoc.createPolkadotTransactionLoc(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        REQUESTER,
    );
    await signAndSend(alice, createLocExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.owner).toBe(ALICE);
    expect(loc?.requesterAddress?.address).toBe(REQUESTER);
    expect(loc?.requesterAddress?.type).toBe("Polkadot");
    expect(loc?.closed).toBe(false);
    expect(loc?.locType).toBe("Transaction");
}

export async function addMetadataToTransactionLocTest() {
    const { alice, api } = await setup();

    const name = "Some name";
    const value = "Some value";
    const addMetadataExtrinsic = api.polkadot.tx.logionLoc.addMetadata(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        api.adapters.toPalletLogionLocMetadataItem({
            name,
            value,
            submitter: api.queries.getValidAccountId(ALICE, "Polkadot"),
        }),
    );
    await signAndSend(alice, addMetadataExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.metadata.length).toBe(1);
    expect(loc?.metadata[0].name).toBe(name);
    expect(loc?.metadata[0].value).toBe(value);
    expect(loc?.metadata[0].submitter.address).toBe(ALICE);
    expect(loc?.metadata[0].submitter.type).toBe("Polkadot");
}

export async function addFileToTransactionLocTest() {
    const { alice, api } = await setup();

    const hash = "0x46d9bb04725470dc8483395f635805e9da5e105c7b2b90935b895a0f4f364d80";
    const nature = "Some nature";
    const size = BigInt(456);
    const addFileExtrinsic = api.polkadot.tx.logionLoc.addFile(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        api.adapters.toPalletLogionLocFile({
            hash,
            nature,
            submitter: api.queries.getValidAccountId(ALICE, "Polkadot"),
            size,
        }),
    );
    await signAndSend(alice, addFileExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.files.length).toBe(1);
    expect(loc?.files[0].hash).toBe(hash);
    expect(loc?.files[0].nature).toBe(nature);
    expect(loc?.files[0].submitter.address).toBe(ALICE);
    expect(loc?.files[0].submitter.type).toBe("Polkadot");
    expect(loc?.files[0].size).toBe(size);
}

const TRANSACTION_LOC_ID = new UUID("c1dc4b62-714b-4001-ae55-1b54ad61dd93");
