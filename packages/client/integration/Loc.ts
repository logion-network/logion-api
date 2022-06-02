import { State, TEST_LOGION_CLIENT_CONFIG, REQUESTER_ADDRESS } from "./Utils";
import { LegalOfficer, LogionClient, FullSigner } from "../src";
import { AxiosFactory } from "../src/AxiosFactory";
import { UUID, buildApi } from "@logion/node-api";
import { LocData, LocRequestStatus } from "../src/LocClient";
import { OpenLoc, PendingRequest } from "../src/Loc";

const USER_ADDRESS = REQUESTER_ADDRESS;

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

    await legalOfficer.accept(pendingRequest.locId);
    await legalOfficer.createLoc(pendingRequest.locId);

    const openLoc = await pendingRequest.refresh() as OpenLoc;
    expect(openLoc).toBeInstanceOf(OpenLoc)

    locsState = await locsState.refresh();
    checkData(locsState.openLocs["Transaction"][0].data(), "OPEN");
    checkData(openLoc.data(), "OPEN");
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

    async accept(id: UUID) {
        const axios = await this.buildLegalOfficerAxios(this.state.client, this.state.signer, this.legalOfficer);
        await axios.post(`/api/loc-request/${ id.toString() }/accept`);
    }

    async createLoc(id: UUID) {
        const api = await buildApi(TEST_LOGION_CLIENT_CONFIG.rpcEndpoints);
        await this.state.signer.signAndSend({
            signerId: this.legalOfficer.address,
            submittable: api.tx.logionLoc.createPolkadotTransactionLoc(id.toDecimalString(), USER_ADDRESS)
        });
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

