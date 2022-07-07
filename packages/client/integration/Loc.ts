import { Hash } from 'fast-sha256';

import { State, TEST_LOGION_CLIENT_CONFIG, NEW_ADDRESS, initRequesterBalance } from "./Utils";
import { LegalOfficer, LogionClient, FullSigner } from "../src";
import { AxiosFactory } from "../src/AxiosFactory";
import { UUID, buildApi } from "@logion/node-api";
import { LocRequestStatus } from "../src/LocClient";
import { OpenLoc, PendingRequest, LocData, ClosedCollectionLoc } from "../src/Loc";

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

    await legalOfficer.openCollectionLoc(pendingRequest.locId, false);

    let openLoc = await pendingRequest.refresh() as OpenLoc;
    await legalOfficer.closeLoc(openLoc.locId);

    let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;
    expect(closedLoc).toBeInstanceOf(ClosedCollectionLoc);

    const itemId = hash("first-collection-item");
    const itemDescription = "First collection item";
    closedLoc = await closedLoc.addCollectionItem({
        itemId,
        itemDescription,
        signer: state.signer
    });

    const item = await closedLoc.getCollectionItem({ itemId });
    expect(item!.id).toBe(itemId);
    expect(item!.description).toBe(itemDescription);
}

function hash(data: string): string {
    let digest = new Hash();
    const bytes = new TextEncoder().encode(data);
    digest.update(bytes);
    return '0x' + Buffer.from(digest.digest()).toString('hex');
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

    const firstItemId = hash("first-collection-item");
    const firstItemDescription = "First collection item";
    const firstFileContent = "test";
    const firstFileHash = hash(firstFileContent);
    closedLoc = await closedLoc.addCollectionItem({
        itemId: firstItemId,
        itemDescription: firstItemDescription,
        signer: state.signer,
        itemFiles: [
            {
                name: "test.txt",
                contentType: "text/plain",
                hash: firstFileHash,
                size: 4n,
                content: Buffer.from(firstFileContent)
            }
        ]
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
        })
    ]));

    const secondItemId = hash("second-collection-item");
    const secondItemDescription = "Second collection item";
    const secondFileContent = "test2";
    const secondFileHash = hash(secondFileContent);
    closedLoc = await closedLoc.addCollectionItem({
        itemId: secondItemId,
        itemDescription: secondItemDescription,
        signer: state.signer,
        itemFiles: [
            {
                name: "test2.txt",
                contentType: "text/plain",
                hash: secondFileHash,
                size: 5n,
            }
        ]
    });

    closedLoc = await closedLoc.uploadCollectionItemFile({
        itemId: secondItemId,
        itemFile: {
            name: "test2.txt",
            contentType: "text/plain",
            hash: secondFileHash,
            size: 5n,
            content: secondFileContent
        }
    });
}
