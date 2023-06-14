import { UUID, MetadataItemParams, FileParams } from "../src/index.js";
import { ALICE, REQUESTER, setup, signAndSend } from "./Util.js";
import { IKeyringPair } from "@polkadot/types/types";

export async function createTransactionLocTest() {
    const { requester, api } = await setup();

    const createLocExtrinsic = api.polkadot.tx.logionLoc.createPolkadotTransactionLoc(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        ALICE,
    );
    await signAndSend(requester, createLocExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.owner).toBe(ALICE);
    expect(loc?.requesterAddress?.address).toBe(REQUESTER);
    expect(loc?.requesterAddress?.type).toBe("Polkadot");
    expect(loc?.closed).toBe(false);
    expect(loc?.locType).toBe("Transaction");
}

export async function addMetadataToTransactionLocTestAsLLO() {
    const { alice, api } = await setup();
    await addMetadataToTransactionLocTest(
        alice,
        {
            name: "0x3794097220b25a099e23755c53f7f673b60885d101bd67873070d887419a0603", // "Some name",
            value: "0xcc68b65c670cea83c4b9e110822af132258d882b7bc79c3f3645bdec06131e71", // "Some value",
            submitter: api.queries.getValidAccountId(ALICE, "Polkadot"),
        },
        true,
        0
    );
}

export async function addMetadataToTransactionLocTestAsRequester() {
    const { api, requester } = await setup();
    await addMetadataToTransactionLocTest(
        requester,
        {
            name: REQUESTER_METADATA_NAME,
            value: "0xbcb90db0ba3340c794a7d75982598a1ce1468a7a69e1f960d99c203d36af5c85", // "Some other value",
            submitter: api.queries.getValidAccountId(REQUESTER, "Polkadot"),
        },
        false,
        1
    );
}

async function addMetadataToTransactionLocTest(who: IKeyringPair, item: MetadataItemParams, expectedAcknowledged: boolean, index: number) {
    const { api } = await setup();
    const { name, value, submitter } = item
    const addMetadataExtrinsic = api.polkadot.tx.logionLoc.addMetadata(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        api.adapters.toPalletLogionLocMetadataItem({
            name,
            value,
            submitter,
        }),
    );
    await signAndSend(who, addMetadataExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.metadata.length).toBe(index + 1);
    expect(loc?.metadata[index].name).toBe(name);
    expect(loc?.metadata[index].value).toBe(value);
    expect(loc?.metadata[index].submitter.address).toBe(submitter.address);
    expect(loc?.metadata[index].submitter.type).toBe(submitter.type);
    expect(loc?.metadata[index].acknowledged).toBe(expectedAcknowledged);
}

export async function acknowledgeMetadata() {
    const { alice, api } = await setup();
    const acknowledgeMetadataExtrinsic = api.polkadot.tx.logionLoc.acknowledgeMetadata(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        REQUESTER_METADATA_NAME,
    );
    await signAndSend(alice, acknowledgeMetadataExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.metadata[0].acknowledged).toBeTrue();
    expect(loc?.metadata[1].acknowledged).toBeTrue();
}

export async function addFileToTransactionLocTestAsLLO() {
    const { alice, api } = await setup();

    await addFileToTransactionLocTest(
        alice,
        {
            hash: "0x46d9bb04725470dc8483395f635805e9da5e105c7b2b90935b895a0f4f364d80",
            nature: "0xf85455e7f9269c18b042ced52395324f78d482502049c80456581054fa9cb852", // "Some nature",
            submitter: api.queries.getValidAccountId(ALICE, "Polkadot"),
            size: BigInt(456),
        },
        true,
        0);
}

export async function addFileToTransactionLocTestAsRequester() {
    const { requester, api } = await setup();

    await addFileToTransactionLocTest(
        requester,
        {
            hash: REQUESTER_FILE_HASH,
            nature: "0x043f4d83c1e3fa7146fd182ad01577f3df3151a30ec0952c1e06ce2361eee5dc", // "Some other nature",
            submitter: api.queries.getValidAccountId(REQUESTER, "Polkadot"),
            size: BigInt(123),
        },
        false,
        1);
}

async function addFileToTransactionLocTest(who: IKeyringPair, file: FileParams, expectedAcknowledged: boolean, index: number) {
    const { api } = await setup();

    const { hash, nature, size, submitter } = file;

    const addFileExtrinsic = api.polkadot.tx.logionLoc.addFile(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        api.adapters.toPalletLogionLocFile({
            hash,
            nature,
            submitter,
            size,
        }),
    );
    await signAndSend(who, addFileExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.files.length).toBe(index + 1);
    expect(loc?.files[index].hash).toBe(hash);
    expect(loc?.files[index].nature).toBe(nature);
    expect(loc?.files[index].submitter.address).toBe(submitter.address);
    expect(loc?.files[index].submitter.type).toBe(submitter.type);
    expect(loc?.files[index].size).toBe(size);
    expect(loc?.files[index].acknowledged).toBe(expectedAcknowledged);
}

export async function acknowledgeFile() {
    const { alice, api } = await setup();
    const acknowledgeFileExtrinsic = api.polkadot.tx.logionLoc.acknowledgeFile(
        api.adapters.toLocId(TRANSACTION_LOC_ID),
        REQUESTER_FILE_HASH,
    );
    await signAndSend(alice, acknowledgeFileExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(TRANSACTION_LOC_ID);
    expect(loc?.files[0].acknowledged).toBeTrue();
    expect(loc?.files[1].acknowledged).toBeTrue();
}


const TRANSACTION_LOC_ID = new UUID("c1dc4b62-714b-4001-ae55-1b54ad61dd93");
const REQUESTER_METADATA_NAME = "0xee99a660b04af4cfd0569fe63e011c919ea66ff7d6ede6d104b03a57540446e5" // "Some other name";
const REQUESTER_FILE_HASH = "0xb741477ee8b0f12dbf1094487c3832145911f6e55ced5dbe57c3248a18f0461b";
