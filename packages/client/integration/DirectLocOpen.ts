import {
    State,
    initRequesterBalance,
    TEST_LOGION_CLIENT_CONFIG,
    LegalOfficerWorker,
    DIRECT_REQUESTER_ADDRESS,
} from "./Utils.js";
import { ALICE } from "../test/Utils.js";
import {
    HashOrContent,
    ItemsParams,
    MergedFile,
    AddFileParams,
    MergedMetadataItem,
    AddMetadataParams,
    AddLinkParams,
    MergedLink,
    LocData
} from "../src/index.js";
import { UUID } from "@logion/node-api";

export async function openIdentityLoc(state: State): Promise<UUID> {
    const { directRequesterAccount, signer, alice } = state;
    const client = state.client.withCurrentAddress(directRequesterAccount);
    let locsState = await client.locsState();

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, signer, directRequesterAccount.address);

    const items = provideItems("identity", []);
    const openLoc = await locsState.openIdentityLoc({
        description: "Direct Identity",
        legalOfficerAddress: alice.address,
        template: "a-template",
        legalFee: 15n,
        files: items.files,
        metadata: items.metadata,
        links: items.links,
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            line1: "Peace Street",
            line2: "2nd floor",
            postalCode: "10000",
            city: "MyCity",
            country: "Wonderland"
        },
        signer
    });
    checkData(openLoc.data(), items);

    const legalOfficer = new LegalOfficerWorker(alice, state);
    await legalOfficer.acknowledgeMetadata(openLoc.locId, items.metadata);
    await legalOfficer.acknowledgeFiles(openLoc.locId, items.files);
    await legalOfficer.closeLoc(openLoc.locId);

    return openLoc.locId;
}

export async function openTransactionLoc(state: State, linkedLoc: UUID): Promise<UUID> {
    const { directRequesterAccount, signer, alice } = state;
    const client = state.client.withCurrentAddress(directRequesterAccount);
    let locsState = await client.locsState();
    const items = provideItems("transaction", [ linkedLoc ]);
    const openLoc = await locsState.openTransactionLoc({
        description: "Direct Transaction",
        legalOfficerAddress: alice.address,
        template: "a-template",
        legalFee: 15n,
        files: items.files,
        metadata: items.metadata,
        links: items.links,
        signer,
    });
    checkData(openLoc.data(), items);
    return openLoc.locId;
}

export async function openCollectionLoc(state: State, linkedLoc1: UUID, linkedLoc2: UUID): Promise<void> {
    const { directRequesterAccount, signer, alice } = state;
    const client = state.client.withCurrentAddress(directRequesterAccount);
    let locsState = await client.locsState();
    const items = provideItems("collection", [ linkedLoc1, linkedLoc2 ]);
    const openLoc = await locsState.openCollectionLoc({
        description: "Direct Collection",
        legalOfficerAddress: alice.address,
        template: "a-template",
        legalFee: 15n,
        files: items.files,
        metadata: items.metadata,
        links: items.links,
        collectionCanUpload: false,
        collectionMaxSize: 200,
        valueFee: 13000n,
        signer
    });
    checkCollectionData(openLoc.data(), items);
}

function checkCollectionData(data: LocData, items: ItemsParams) {
    expect(data.collectionCanUpload).toBeFalse();
    expect(data.collectionMaxSize).toEqual(200);
    expect(data.collectionLastBlockSubmission).toBeUndefined();
    expect(data.valueFee).toEqual(13000n);

    checkData(data, items);
}

function checkData(data: LocData, items: ItemsParams) {
    expect(data.status).toEqual("OPEN")
    const locType = data.locType;
    expect(data.description).toEqual(`Direct ${ locType }`)
    expect(data.legalFee).toEqual(15n)
    expect(data.template).toEqual("a-template")
    expect(data.requesterLocId).toBeUndefined();
    expect(data.requesterAddress?.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(data.requesterAddress?.type).toEqual("Polkadot");
    expect(data.ownerAddress).toEqual(ALICE.address);

    expect(data.files.length).toEqual(items.files.length);
    expect(data.metadata.length).toEqual(items.metadata.length);
    expect(data.links.length).toEqual(items.links.length);
    for (let i = 0; i < items.files.length ; i++) {
        checkFile(data.files[i], items.files[i]);
    }
    for (let i = 0; i < items.metadata.length ; i++) {
        checkMetadataItem(data.metadata[i], items.metadata[i]);
    }
    for (let i = 0; i < items.links.length ; i++) {
        checkLink(data.links[i], items.links[i]);
    }

}

function provideItems(name: string, linkedLocs: UUID[]): ItemsParams {
    const links: AddLinkParams [] = linkedLocs.map(target => ({ target, nature: "Some link nature" }));
    return {
        files: [
            {
                fileName: `${ name }-1.txt`,
                nature: "Some file nature",
                file: HashOrContent.fromContent(Buffer.from(name + "1")),
            },
            {
                fileName: `${ name }-2.txt`,
                nature: "Some other file nature",
                file: HashOrContent.fromContent(Buffer.from(name + "2")),
            },
        ],
        metadata: [
            {
                name: name + "1",
                value: name + "1",
            },
            {
                name: name + "2",
                value: name + "2",
            },
            {
                name: name + "3",
                value: name + "3",
            },
        ],
        links
    }
}

function checkFile(actual: MergedFile, expected: AddFileParams) {
    expect(actual.status).toEqual("PUBLISHED");
    expect(actual.submitter.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(actual.submitter.type).toEqual("Polkadot");
    expect(actual.name).toEqual(expected.fileName);
    expect(actual.nature).toEqual(expected.nature);
    expect(actual.hash).toEqual(expected.file.contentHash);
}

function checkMetadataItem(actual: MergedMetadataItem, expected: AddMetadataParams) {
    expect(actual.status).toEqual("PUBLISHED");
    expect(actual.submitter.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(actual.submitter.type).toEqual("Polkadot");
    expect(actual.name).toEqual(expected.name);
    expect(actual.value).toEqual(expected.value);
}

function checkLink(actual: MergedLink, expected: AddLinkParams) {
    expect(actual.status).toEqual("PUBLISHED");
    expect(actual.submitter.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(actual.submitter.type).toEqual("Polkadot");
    expect(actual.target).toEqual(expected.target.toString());
    expect(actual.nature).toEqual(expected.nature);
}
