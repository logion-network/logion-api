import { NodeFile } from "../src/index.js";
import {
    State,
    initRequesterBalance,
    TEST_LOGION_CLIENT_CONFIG,
    DIRECT_REQUESTER_ADDRESS,
    findWithLegalOfficerClient,
} from "./Utils.js";
import { ALICE } from "./Utils.js";
import {
    HashOrContent,
    ItemsParams,
    MergedFile,
    AddFileParams,
    MergedMetadataItem,
    AddMetadataParams,
    AddLinkParams,
    MergedLink,
    LocData,
    OpenLoc,
    waitFor,
    MimeType
} from "@logion/client";
import { UUID } from "@logion/node-api";

export async function openIdentityLoc(state: State): Promise<UUID> {
    const { directRequesterAccount, signer, alice, aliceAccount } = state;
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

    const aliceClient = state.client.withCurrentAddress(aliceAccount);
    let aliceOpenLoc = await findWithLegalOfficerClient(aliceClient, openLoc) as OpenLoc;
    aliceOpenLoc = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : aliceOpenLoc.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(true),
    });
    await aliceOpenLoc.legalOfficer.close({ signer, autoAck: true });

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
    await waitFor<OpenLoc>({
        predicate: loc => allItemsHaveAddedOn(loc.data()),
        producer: () => openLoc.refresh() as Promise<OpenLoc>,
    });
    return openLoc.locId;
}

function allItemsHaveAddedOn(loc: LocData) {
    return loc.metadata.find(item => item.addedOn === undefined) === undefined
        && loc.files.find(item => item.addedOn === undefined) === undefined
        && loc.links.find(item => item.addedOn === undefined) === undefined;
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
        collectionItemFee: 7000n,
        tokensRecordFee: 6000n,
        signer
    });
    checkCollectionData(openLoc.data(), items);
}

function checkCollectionData(data: LocData, items: ItemsParams) {
    expect(data.collectionCanUpload).toBeFalse();
    expect(data.collectionMaxSize).toEqual(200);
    expect(data.collectionLastBlockSubmission).toBeUndefined();
    expect(data.fees.valueFee).toEqual(13000n);
    expect(data.fees.collectionItemFee).toEqual(7000n);
    expect(data.fees.tokensRecordFee).toEqual(6000n);

    checkData(data, items);
}

function checkData(data: LocData, items: ItemsParams) {
    expect(data.status).toEqual("OPEN")
    const locType = data.locType;
    expect(data.description).toEqual(`Direct ${ locType }`)
    expect(data.fees.legalFee).toEqual(15n)
    expect(data.template).toEqual("a-template")
    expect(data.requesterLocId).toBeUndefined();
    expect(data.requesterAddress?.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(data.requesterAddress?.type).toEqual("Polkadot");
    expect(data.ownerAddress).toEqual(ALICE);

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
                nature: "Some file nature",
                file: HashOrContent.fromContent(new NodeFile(`integration/${ name }-1.txt`, `${ name }-1.txt`, MimeType.from("text/plain"))),
            },
            {
                nature: "Some other file nature",
                file: HashOrContent.fromContent(new NodeFile(`integration/${ name }-2.txt`, `${ name }-2.txt`, MimeType.from("text/plain"))),
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
    expect(actual.name).toEqual(expected.file.content.name);
    expect(actual.nature.validValue()).toEqual(expected.nature);
    expect(actual.hash).toEqual(expected.file.contentHash);
}

function checkMetadataItem(actual: MergedMetadataItem, expected: AddMetadataParams) {
    expect(actual.status).toEqual("PUBLISHED");
    expect(actual.submitter.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(actual.submitter.type).toEqual("Polkadot");
    expect(actual.name.validValue()).toEqual(expected.name);
    expect(actual.value.validValue()).toEqual(expected.value);
}

function checkLink(actual: MergedLink, expected: AddLinkParams) {
    expect(actual.status).toEqual("PUBLISHED");
    expect(actual.submitter.address).toEqual(DIRECT_REQUESTER_ADDRESS);
    expect(actual.submitter.type).toEqual("Polkadot");
    expect(actual.target.toString()).toEqual(expected.target.toString());
    expect(actual.nature.validValue()).toEqual(expected.nature);
}
