import { LogionNodeApiClass, Region, ValidAccountId } from "@logion/node-api";
import { AxiosInstance, AxiosResponse } from "axios";
import { Mock } from "moq.ts";
import { AccountId32 } from "@polkadot/types/interfaces/types.js";
import type { Bytes } from '@polkadot/types-codec';
import { PalletLoAuthorityListLegalOfficerData, PalletLoAuthorityListHostData, PalletLoAuthorityListGuestData, LogionRuntimeRegion } from "@polkadot/types/lookup";
import { AxiosFactory, DirectoryClient, DirectoryLegalOfficer } from "../src/index.js";
import { EMPTY_POSTAL_ADDRESS, EMPTY_USER_IDENTITY, mockCodecWithToString, mockCodecWithToUtf8, mockOption, mockStorageKey } from "./Utils.js";

describe("DirectoryClient", () => {

    it("handles guest LLOs", async () => {
        const api = mockApi();
        const axiosFactory = mockAxiosFactory();
        const client = new DirectoryClient(api, ENDPOINT, axiosFactory);

        const legalOfficers = await client.getLegalOfficers();

        expect(legalOfficers.length).toBe(2);

        expect(legalOfficers[0].node).toBe(BASE_URL);
        expect(legalOfficers[0].account).toEqual(ValidAccountId.polkadot(HOST_ADDRESS));
        expect(legalOfficers[0].region).toBe(REGION_TYPE);
        expect(legalOfficers[0].nodeId).toBe(PEER_ID);

        expect(legalOfficers[1].node).toBe(BASE_URL);
        expect(legalOfficers[1].account).toEqual(ValidAccountId.polkadot(GUEST_ADDRESS));
        expect(legalOfficers[1].region).toBe(REGION_TYPE);
        expect(legalOfficers[1].nodeId).toBe(PEER_ID);
    });
});

const ENDPOINT = "https://test-directory.logion.network";

function mockApi(): LogionNodeApiClass {
    const api = new Mock<LogionNodeApiClass>();
    api.setup(instance => instance.polkadot.query.loAuthorityList.legalOfficerSet.entries()).returnsAsync([
        [
            mockStorageKey([mockCodecWithToString<AccountId32>(HOST_ADDRESS)]),
            mockOption<PalletLoAuthorityListLegalOfficerData>(mockHost()),
        ],
        [
            mockStorageKey([mockCodecWithToString<AccountId32>(GUEST_ADDRESS)]),
            mockOption<PalletLoAuthorityListLegalOfficerData>(mockGuest()),
        ]
    ]);
    api.setup(instance => instance.adapters.fromLogionRuntimeRegion(REGION)).returns("Europe");
    return api.object();
}

const HOST_ADDRESS = "vQvWaxNDdzuX5N3qSvGMtjdHcQdw1TAcPNgx4S1Utd3MTxYeN";
const GUEST_ADDRESS = "vQvZF2YMgKuQhzfF7T3xDjHjuEmcPSUVEoUDPy1mzuSXzFgca";
const REGION_TYPE: Region = "Europe";
const REGION = mockCodecWithToString<LogionRuntimeRegion>(REGION_TYPE);

function mockAxiosFactory(): AxiosFactory {
    const axios = mockAxios();
    const factory = new Mock<AxiosFactory>();
    factory.setup(instance => instance.buildAxiosInstance(ENDPOINT, undefined)).returns(axios);
    return factory.object();
}

function mockAxios(): AxiosInstance {
    const axios = new Mock<AxiosInstance>();
    const response = new Mock<AxiosResponse>();
    const legalOfficers: DirectoryLegalOfficer[] = [
        {
            address: HOST_ADDRESS,
            additionalDetails: "",
            postalAddress: EMPTY_POSTAL_ADDRESS,
            userIdentity: EMPTY_USER_IDENTITY,
        },
        {
            address: GUEST_ADDRESS,
            additionalDetails: "",
            postalAddress: EMPTY_POSTAL_ADDRESS,
            userIdentity: EMPTY_USER_IDENTITY,
        },
    ];
    response.setup(instance => instance.data.legalOfficers).returns(legalOfficers);
    axios.setup(instance => instance.get("/api/legal-officer")).returnsAsync(response.object());
    return axios.object();
}

function mockHost(): PalletLoAuthorityListLegalOfficerData {
    const host = new Mock<PalletLoAuthorityListLegalOfficerData>();
    host.setup(instance => instance.isHost).returns(true);
    const hostData = new Mock<PalletLoAuthorityListHostData>();
    hostData.setup(instance => instance.baseUrl)
        .returns(mockOption<Bytes>(mockCodecWithToUtf8<Bytes>(BASE_URL)));
    hostData.setup(instance => instance.nodeId)
        .returns(mockOption<Bytes>(mockCodecWithToString<Bytes>(PEER_ID)));
    hostData.setup(instance => instance.region)
        .returns(REGION);
    host.setup(instance => instance.asHost).returns(hostData.object());
    return host.object();
}

const BASE_URL = "https://test-node.logion.network";
const PEER_ID = "12D3KooWJvyP3VJYymTqG7eH4PM5rN4T2agk5cdNCfNymAqwqcvZ";

function mockGuest(): PalletLoAuthorityListLegalOfficerData {
    const guest = new Mock<PalletLoAuthorityListLegalOfficerData>();
    guest.setup(instance => instance.isHost).returns(false);
    const guestData = new Mock<PalletLoAuthorityListGuestData>();
    guestData.setup(instance => instance.hostId).returns(mockCodecWithToString(HOST_ADDRESS));
    guest.setup(instance => instance.asGuest).returns(guestData.object());
    return guest.object();
}
