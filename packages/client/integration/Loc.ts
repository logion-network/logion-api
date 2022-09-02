import { UUID, buildApi } from "@logion/node-api";
import { LegalOfficer, LogionClient, FullSigner, HashOrContent, hashString, ItemFileWithContent, MimeType } from "../src";

import { AxiosFactory } from "../src/AxiosFactory";
import { LocRequestStatus } from "../src/LocClient";
import { OpenLoc, PendingRequest, LocData, ClosedCollectionLoc } from "../src/Loc";

import { State, TEST_LOGION_CLIENT_CONFIG, NEW_ADDRESS, initRequesterBalance } from "./Utils";
import { ItemTokenWithRestrictedType } from "../src/Token";

const USER_ADDRESS = NEW_ADDRESS;

export async function requestTransactionLoc(state: State) {

    const { alice } = state;
    const client = state.client.withCurrentAddress(USER_ADDRESS);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    const pendingRequest = await locsState.requestTransactionLoc({
        legalOfficer: alice,
        description: "This is a Transaction LOC",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
    })

    expect(pendingRequest).toBeInstanceOf(PendingRequest)

    locsState = pendingRequest.locsState();
    checkData(locsState.pendingRequests["Transaction"][0].data(), "REQUESTED")
    checkData(pendingRequest.data(), "REQUESTED")

    await legalOfficer.openTransactionLoc(pendingRequest.locId);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    expect(openLoc).toBeInstanceOf(OpenLoc)

    locsState = await locsState.refresh();
    checkData(locsState.openLocs["Transaction"][0].data(), "OPEN");
    checkData(openLoc.data(), "OPEN");

    openLoc = await openLoc.addMetadata({
        name: "Some name",
        value: "Some value"
    });
    expect(openLoc.data().metadata[0].name).toBe("Some name");
    expect(openLoc.data().metadata[0].value).toBe("Some value");
    expect(openLoc.data().metadata[0].addedOn).toBeUndefined();

    const addFileResult = await openLoc.addFile({
        fileName: "test.txt",
        nature: "Some file nature",
        file: Buffer.from("test"),
    });
    openLoc = addFileResult.state;
    const hash = addFileResult.hash;
    expect(hash).toBe("0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");

    const checkResult = await openLoc.checkHash(hash);
    expect(checkResult.file).toBeDefined();
    expect(checkResult.metadataItem).not.toBeDefined();
    expect(checkResult.collectionItem).not.toBeDefined();
}

function checkData(data: LocData, locRequestStatus: LocRequestStatus) {
    expect(data.userIdentity?.phoneNumber).toEqual("+1234");
    expect(data.description).toEqual("This is a Transaction LOC");
    expect(data.status).toEqual(locRequestStatus);
}

class LegalOfficerWorker {

    legalOfficer: LegalOfficer;
    state: State;

    constructor(legalOfficer: LegalOfficer, state: State) {
        this.legalOfficer = legalOfficer;
        this.state = state;
    }

    async openTransactionLoc(id: UUID) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.createPolkadotTransactionLoc(id.toDecimalString(), USER_ADDRESS)
        });

        const axios = await this.buildLegalOfficerAxios(this.state.client, this.state.signer, this.legalOfficer);
        await axios.post(`/api/loc-request/${ id.toString() }/accept`);
    }

    async openCollectionLoc(id: UUID, withUpload: boolean) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.createCollectionLoc(id.toDecimalString(), USER_ADDRESS, null, "100", withUpload)
        });

        const axios = await this.buildLegalOfficerAxios(this.state.client, this.state.signer, this.legalOfficer);
        await axios.post(`/api/loc-request/${ id.toString() }/accept`);
    }

    async closeLoc(id: UUID) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.close(id.toDecimalString())
        });

        const axios = await this.buildLegalOfficerAxios(this.state.client, this.state.signer, this.legalOfficer);
        await axios.post(`/api/loc-request/${ id.toString() }/close`);
    }

    async buildLegalOfficerAxios(
        client: LogionClient,
        signer: FullSigner,
        legalOfficer: LegalOfficer,
    ) {
        const authenticatedClient = await client.authenticate([ legalOfficer.address ], signer);
        const token = authenticatedClient.tokens.get(legalOfficer.address)!;
        const axiosFactory = new AxiosFactory();
        return axiosFactory.buildAxiosInstance(legalOfficer.node, token.value);
    }
}

export async function collectionLoc(state: State) {

    const { alice } = state;
    const client = state.client.withCurrentAddress(USER_ADDRESS);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, USER_ADDRESS);

    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficer: alice,
        description: "This is a Collection LOC",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
    });

    locsState = pendingRequest.locsState();
    expect(locsState.pendingRequests["Collection"][0].data().status).toBe("REQUESTED");

    const locId = pendingRequest.locId;
    await legalOfficer.openCollectionLoc(locId, false);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    await legalOfficer.closeLoc(locId);

    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;
    expect(closedLoc).toBeInstanceOf(ClosedCollectionLoc);

    const itemId = hashString("first-collection-item");
    const itemDescription = "First collection item";
    closedLoc = await closedLoc.addCollectionItem({
        itemId,
        itemDescription,
        signer: state.signer
    });

    const item = await closedLoc.getCollectionItem({ itemId });
    expect(item!.id).toBe(itemId);
    expect(item!.description).toBe(itemDescription);

    const publicApi = state.client.public;
    const publicLoc = await publicApi.findLocById({ locId });
    expect(publicLoc).toBeDefined();

    const checkResult = await publicLoc?.checkHash(itemId);
    expect(checkResult?.collectionItem).toBeDefined();
    expect(checkResult?.file).not.toBeDefined();
    expect(checkResult?.metadataItem).not.toBeDefined();
}

export async function collectionLocWithUpload(state: State) {

    const { alice } = state;
    const client = state.client.withCurrentAddress(USER_ADDRESS);
    let locsState = await client.locsState();

    const legalOfficer = new LegalOfficerWorker(alice, state);

    await initRequesterBalance(TEST_LOGION_CLIENT_CONFIG, state.signer, USER_ADDRESS);

    const pendingRequest = await locsState.requestCollectionLoc({
        legalOfficer: alice,
        description: "This is a Collection LOC with upload",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
    });

    await legalOfficer.openCollectionLoc(pendingRequest.locId, true);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    await legalOfficer.closeLoc(openLoc.locId);
    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;

    const firstItemId = hashString("first-collection-item");
    const firstItemDescription = "First collection item";
    const firstFileContent = "test";
    const firstFileHash = hashString(firstFileContent);
    const firstItemToken: ItemTokenWithRestrictedType = {
        type: "ethereum_erc721",
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":"4391"}'
    };
    closedLoc = await closedLoc.addCollectionItem({
        itemId: firstItemId,
        itemDescription: firstItemDescription,
        signer: state.signer,
        itemFiles: [
            new ItemFileWithContent({
                name: "test.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromContent(Buffer.from(firstFileContent)), // Let SDK compute hash and size
            })
        ],
        itemToken: firstItemToken,
        restrictedDelivery: true,
    });

    const firstItem = await closedLoc.getCollectionItem({ itemId: firstItemId });
    expect(firstItem!.id).toBe(firstItemId);
    expect(firstItem!.description).toBe(firstItemDescription);
    expect(firstItem!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            name: "test.txt",
            contentType: "text/plain",
            hash: firstFileHash,
            size: 4n,
            uploaded: true,
        })
    ]));
    expect(firstItem!.token).toEqual(firstItemToken);
    expect(firstItem!.restrictedDelivery).toBe(true);

    const secondItemId = hashString("second-collection-item");
    const secondItemDescription = "Second collection item";
    const secondFileContent = "test2";
    const secondFileHash = hashString(secondFileContent);
    closedLoc = await closedLoc.addCollectionItem({
        itemId: secondItemId,
        itemDescription: secondItemDescription,
        signer: state.signer,
        itemFiles: [
            new ItemFileWithContent({
                name: "test2.txt",
                contentType: MimeType.from("text/plain"),
                hashOrContent: HashOrContent.fromHash(secondFileHash), // No content, must upload later
                size: 5n, // No content, must provide size
            })
        ]
    });

    const secondItemNoUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemNoUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: false,
        })
    ]));

    closedLoc = await closedLoc.uploadCollectionItemFile({
        itemId: secondItemId,
        itemFile: new ItemFileWithContent({
            name: "test2.txt",
            contentType: MimeType.from("text/plain"),
            hashOrContent: new HashOrContent({ hash: secondFileHash, content: Buffer.from(secondFileContent) }), // Provide both hash and content to double-check
            size: 5n, // Provide size to double-check with content
        })
    });

    const secondItemWithUpload = await closedLoc.getCollectionItem({ itemId: secondItemId });
    expect(secondItemWithUpload!.files).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({
            uploaded: true,
        })
    ]));
}
