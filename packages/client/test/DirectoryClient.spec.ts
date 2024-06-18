import { LogionNodeApiClass, Region, ValidAccountId } from "@logion/node-api";
import { AxiosInstance, AxiosResponse } from "axios";
import { Mock } from "moq.ts";
import { AccountId32 } from "@polkadot/types/interfaces/types.js";
import type { Bytes } from '@polkadot/types-codec';
import { PalletLoAuthorityListLegalOfficerData, PalletLoAuthorityListHostData, PalletLoAuthorityListGuestData, LogionRuntimeRegion } from "@polkadot/types/lookup";
import { AxiosFactory, LegalOfficerClient } from "../src/index.js";
import { EMPTY_POSTAL_ADDRESS, EMPTY_USER_IDENTITY, mockCodecWithToString, mockCodecWithToUtf8, mockOption, mockStorageKey } from "./Utils.js";

describe("LegalOfficerClient", () => {

    it("handles guest LLOs", async () => {
        const api = mockApi();
        const axiosFactory = mockAxiosFactory();
        const client = new LegalOfficerClient(api, axiosFactory);

        const legalOfficers = await client.getLegalOfficers();

        expect(legalOfficers.length).toBe(3);

        expect(legalOfficers[0].node).toBe(BASE_URLS[0]);
        expect(legalOfficers[0].account).toEqual(ValidAccountId.polkadot(HOST_ADDRESSES[0]));
        expect(legalOfficers[0].region).toBe(REGION_TYPE);
        expect(legalOfficers[0].nodeId).toBe(PEER_IDS[0]);

        expect(legalOfficers[1].node).toBe(BASE_URLS[0]);
        expect(legalOfficers[1].account).toEqual(ValidAccountId.polkadot(GUEST_ADDRESS));
        expect(legalOfficers[1].region).toBe(REGION_TYPE);
        expect(legalOfficers[1].nodeId).toBe(PEER_IDS[0]);

        expect(legalOfficers[2].node).toBe(BASE_URLS[1]);
        expect(legalOfficers[2].account).toEqual(ValidAccountId.polkadot(HOST_ADDRESSES[1]));
        expect(legalOfficers[2].region).toBe(REGION_TYPE);
        expect(legalOfficers[2].nodeId).toBe(PEER_IDS[1]);
    });
});

function mockApi(): LogionNodeApiClass {
    const api = new Mock<LogionNodeApiClass>();
    api.setup(instance => instance.polkadot.query.loAuthorityList.legalOfficerSet.entries()).returnsAsync([
        [
            mockStorageKey([mockCodecWithToString<AccountId32>(HOST_ADDRESSES[0])]),
            mockOption<PalletLoAuthorityListLegalOfficerData>(mockHost(BASE_URLS[0], PEER_IDS[0])),
        ],
        [
            mockStorageKey([mockCodecWithToString<AccountId32>(HOST_ADDRESSES[1])]),
            mockOption<PalletLoAuthorityListLegalOfficerData>(mockHost(BASE_URLS[1], PEER_IDS[1])),
        ],
        [
            mockStorageKey([mockCodecWithToString<AccountId32>(GUEST_ADDRESS)]),
            mockOption<PalletLoAuthorityListLegalOfficerData>(mockGuest(HOST_ADDRESSES[0])),
        ]
    ]);
    api.setup(instance => instance.adapters.fromLogionRuntimeRegion(REGION)).returns("Europe");
    return api.object();
}

const HOST_ADDRESSES = [ "vQvWaxNDdzuX5N3qSvGMtjdHcQdw1TAcPNgx4S1Utd3MTxYeN", "vQx5kESPn8dWyX4KxMCKqUyCaWUwtui1isX6PVNcZh2Ghjitr" ];
const GUEST_ADDRESS = "vQvZF2YMgKuQhzfF7T3xDjHjuEmcPSUVEoUDPy1mzuSXzFgca";
const REGION_TYPE: Region = "Europe";
const REGION = mockCodecWithToString<LogionRuntimeRegion>(REGION_TYPE);

function mockAxiosFactory(): AxiosFactory {
    const axios0 = mockAxios([ HOST_ADDRESSES[0], GUEST_ADDRESS ]);
    const axios1 = mockAxios([ HOST_ADDRESSES[1] ]);
    const factory = new Mock<AxiosFactory>();
    factory.setup(instance => instance.buildAxiosInstance(BASE_URLS[0], undefined)).returns(axios0);
    factory.setup(instance => instance.buildAxiosInstance(BASE_URLS[1], undefined)).returns(axios1);
    return factory.object();
}

function mockAxios(addresses: string[]): AxiosInstance {
    const axios = new Mock<AxiosInstance>();
    const response = new Mock<AxiosResponse>();
    const legalOfficers = addresses.map(address => (        {
            address,
            additionalDetails: "",
            postalAddress: EMPTY_POSTAL_ADDRESS,
            userIdentity: EMPTY_USER_IDENTITY,
        }
    ))
    response.setup(instance => instance.data.legalOfficers).returns(legalOfficers);
    axios.setup(instance => instance.get("/api/legal-officer")).returnsAsync(response.object());
    return axios.object();
}

function mockHost(baseUrl: string, peerId: string): PalletLoAuthorityListLegalOfficerData {
    const host = new Mock<PalletLoAuthorityListLegalOfficerData>();
    host.setup(instance => instance.isHost).returns(true);
    const hostData = new Mock<PalletLoAuthorityListHostData>();
    hostData.setup(instance => instance.baseUrl)
        .returns(mockOption<Bytes>(mockCodecWithToUtf8<Bytes>(baseUrl)));
    hostData.setup(instance => instance.nodeId)
        .returns(mockOption<Bytes>(mockCodecWithToString<Bytes>(peerId)));
    hostData.setup(instance => instance.region)
        .returns(REGION);
    host.setup(instance => instance.asHost).returns(hostData.object());
    return host.object();
}

const BASE_URLS = [ "https://test-node01.logion.network", "https://test-node02.logion.network" ];
const PEER_IDS = [ "12D3KooWJvyP3VJYymTqG7eH4PM5rN4T2agk5cdNCfNymAqwqcvZ", "12D3KooWBmAwcd4PJNJvfV89HwE48nwkRmAgo8Vy3uQEyNNHBox2" ];

function mockGuest(hostAddress: string): PalletLoAuthorityListLegalOfficerData {
    const guest = new Mock<PalletLoAuthorityListLegalOfficerData>();
    guest.setup(instance => instance.isHost).returns(false);
    const guestData = new Mock<PalletLoAuthorityListGuestData>();
    guestData.setup(instance => instance.hostId).returns(mockCodecWithToString(hostAddress));
    guest.setup(instance => instance.asGuest).returns(guestData.object());
    return guest.object();
}
