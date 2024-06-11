import { buildTestConfig, LOGION_CLIENT_CONFIG, ALICE } from "./Utils.js";
import { LegalOfficerClass, LogionClient, LogionClientConfig } from "../src/index.js";
import { Mock, It } from "moq.ts";
import { AxiosInstance, AxiosResponse } from "axios";
import { BackendRecoveryRequest, RecoveryInfo } from "../src/RecoveryReviewClient.js";
import { RecoveryReviewApi } from "../src/RecoveryReview.js";

describe("RecoveryReview", () => {

    let recoveryReview: RecoveryReviewApi;
    let axios: Mock<AxiosInstance>;

    beforeEach(async () => {
        axios = new Mock<AxiosInstance>();
        const config = setupConfig(axios);
        const client = (await LogionClient.create(config)).withCurrentAccount(ALICE.account);
        recoveryReview = client.recoveryReview;
    })

    it("fetches pending requests", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        expect(pendingRequests.length).toBe(2);
        expect(pendingRequests[0].data).toEqual(recoveryRequests[0]);
        expect(pendingRequests[1].data).toEqual(recoveryRequests[1]);
    })

    it("fetches history", async () => {
        const recoveryRequestsHistory = (await recoveryReview.fetchRecoveryRequests()).reviewedRequests;
        expect(recoveryRequestsHistory.length).toBe(2);
        expect(recoveryRequestsHistory[0].data).toEqual(recoveryRequests[2]);
        expect(recoveryRequestsHistory[1].data).toEqual(recoveryRequests[3]);
    })

    it("fetches pending account recovery info", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        const recoveryInfo = await pendingRequests[0].fetchRecoveryInfo();
        expect(recoveryInfo).toEqual(accountRecovery);
    })

    it("fetches pending secret recovery info", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        const recoveryInfo = await pendingRequests[1].fetchRecoveryInfo();
        expect(recoveryInfo).toEqual(secretRecovery);
    })

    it("accepts pending account recovery request", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        await pendingRequests[0].accept();
    })

    it("accepts pending secret recovery request", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        await pendingRequests[1].accept();
    })

    it("rejects pending account recovery request", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        await pendingRequests[0].reject({ rejectReason: "Because" });
    })

    it("rejects pending secret recovery request", async () => {
        const pendingRequests = (await recoveryReview.fetchRecoveryRequests()).pendingRequests;
        await pendingRequests[1].reject({ rejectReason: "Because" });
    })
})

function setupConfig(axios: Mock<AxiosInstance>): LogionClientConfig {
    return buildTestConfig(testConfigFactory => {
        testConfigFactory.setupDefaultNetworkState();
        const axiosFactory = testConfigFactory.setupAxiosFactoryMock();
        axiosFactory.setup(instance => instance.buildAxiosInstance(It.IsAny<string>(), It.IsAny()))
            .returns(axios.object());
        setupBackend(axios);
        testConfigFactory.setupNodeApiMock(LOGION_CLIENT_CONFIG);
        const directoryClient = testConfigFactory.setupDirectoryClientMock(LOGION_CLIENT_CONFIG);
        directoryClient.setup(instance => instance.getLegalOfficers()).returns(Promise.resolve([
            new LegalOfficerClass({
                legalOfficer: ALICE,
                axiosFactory: axiosFactory.object(),
            })
        ]));
    });
}

const userIdentity = {
    email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
};
const userPostalAddress = {
    line1: "Line1",
        line2: "Line2",
        postalCode: "PostalCode",
        city: "City",
        country: "Country",
}


const recoveryRequests: BackendRecoveryRequest[] = [
    {
        id: "7f21c683-8b25-44bb-ac9f-dd49c67d5964",
        type: "ACCOUNT",
        status: "PENDING",
        userIdentity,
        userPostalAddress,
        rejectReason: "",
        createdOn: "2024-01-01",
    },
    {
        id: "8a19316f-d9b8-49f5-be21-854ca705f3e8",
        type: "SECRET",
        status: "PENDING",
        userIdentity,
        userPostalAddress,
        rejectReason: "",
        createdOn: "2024-01-01",
    },
    {
        id: "f4fa9e16-fff4-4474-bf1c-74e6761b4a88",
        type: "ACCOUNT",
        status: "ACCEPTED",
        userIdentity,
        userPostalAddress,
        rejectReason: "",
        createdOn: "2024-01-01",
    },
    {
        id: "6e319608-8bdc-4fd9-8e4d-70db935a98bb",
        type: "SECRET",
        status: "REJECTED",
        userIdentity,
        userPostalAddress,
        rejectReason: "",
        createdOn: "2024-01-01",
    },
];

const accountRecovery: RecoveryInfo = {
    type: "ACCOUNT",
    identity1: { userIdentity, userPostalAddress },
    identity2: { userIdentity, userPostalAddress },
    accountRecovery: {
        address1: "5GHPpJNeW52U6ZgiCdvKf6MjjuApUmRKWUQRbwAFuPJWCFfy",
        address2: "5EjdssjxtwGTFAGsgi2kYM7P1EYQvCvqMKE6fU9Le79Tatd4",
    }
}

const secretRecovery: RecoveryInfo = {
    type: "SECRET",
    identity1: { userIdentity, userPostalAddress },
    identity2: { userIdentity, userPostalAddress },
}

function setupBackend(axios: Mock<AxiosInstance>) {
    const fetchResponse = new Mock<AxiosResponse<{ requests:BackendRecoveryRequest[]}>>();
    fetchResponse.setup(instance => instance.data)
        .returns({ requests: recoveryRequests });
    axios.setup(instance => instance.put("/api/recovery-requests"))
        .returns(Promise.resolve(fetchResponse.object()));

    const accountRecoveryResponse = new Mock<AxiosResponse<RecoveryInfo>>();
    accountRecoveryResponse.setup(instance => instance.data).returns(accountRecovery);
    axios.setup(instance => instance.put(`/api/account-recovery/${ recoveryRequests[0].id }/recovery-info`))
        .returns(Promise.resolve(accountRecoveryResponse.object()))

    const secretRecoveryResponse = new Mock<AxiosResponse<RecoveryInfo>>();
    secretRecoveryResponse.setup(instance => instance.data).returns(secretRecovery);
    axios.setup(instance => instance.put(`/api/secret-recovery/${ recoveryRequests[1].id }/recovery-info`))
        .returns(Promise.resolve(secretRecoveryResponse.object()))

    const response = new Mock<AxiosResponse<void>>();
    axios.setup(instance => instance.post(`/api/account-recovery/${ recoveryRequests[0].id }/accept`))
        .returns(Promise.resolve(response.object()))
    axios.setup(instance => instance.post(`/api/secret-recovery/${ recoveryRequests[1].id }/accept`))
        .returns(Promise.resolve(response.object()))
    axios.setup(instance => instance.post(`/api/account-recovery/${ recoveryRequests[0].id }/reject`, { rejectReason: "Because" }))
        .returns(Promise.resolve(response.object()))
    axios.setup(instance => instance.post(`/api/secret-recovery/${ recoveryRequests[1].id }/reject`, { rejectReason: "Because" }))
        .returns(Promise.resolve(response.object()))
}
