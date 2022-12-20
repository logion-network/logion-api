import { AxiosInstance, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { It, Mock } from 'moq.ts';

import { AccountTokens, AuthenticationClient } from "../src/index.js";
import { AxiosFactory } from "../src/index.js";
import { Token } from "../src/index.js";
import { RawSigner, SignRawParameters } from "../src/index.js";
import { LegalOfficer } from "../src/index.js";
import { ALICE, buildAliceTokens, DIRECTORY_ENDPOINT } from "./Utils.js";

describe("AuthenticationClient", () => {

    it("authenticates with directory if no legal officer", async () => {
        await testAuthentication([], DIRECTORY_ENDPOINT);
    });

    it("authenticates with first legal officer if given", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        await testAuthentication(legalOfficers, ALICE.node);
    });

    it("refreshes tokens", async () => {
        const legalOfficers: LegalOfficer[] = [ ALICE ];
        const axiosFactory = new Mock<AxiosFactory>();
        const axiosInstance = new Mock<AxiosInstance>();
        const tokens = buildAliceTokens(DateTime.now().plus({hours: 1}));
        const token = tokens.get(ALICE.address)!.value;
        axiosFactory.setup(instance => instance.buildAxiosInstance(ALICE.node)).returns(axiosInstance.object());

        const refreshResponse = new Mock<AxiosResponse<any, any>>();
        const newToken = "new-token";
        refreshResponse.setup(instance => instance.data).returns({
            tokens: {
                [ALICE.address]: {
                    value: newToken,
                    expiredOn: DateTime.now().plus({hours: 2}).toISO()
                }
            }
        });
        axiosInstance.setup(instance => instance.put('/api/auth/refresh', It.Is<any>(body =>
            body.tokens[ALICE.address] === token
        ))).returns(Promise.resolve(refreshResponse.object()));

        const client = new AuthenticationClient(DIRECTORY_ENDPOINT, legalOfficers, axiosFactory.object());

        const refreshedTokens = await client.refresh(tokens);

        expect(refreshedTokens.get(ALICE.address)).toEqual(jasmine.objectContaining({
            value: newToken
        }));
    });
});

async function testAuthentication(legalOfficers: LegalOfficer[], expectedEndpoint: string) {
    const axiosFactory = new Mock<AxiosFactory>();
    const axiosInstance = new Mock<AxiosInstance>();
    axiosFactory.setup(instance => instance.buildAxiosInstance(expectedEndpoint)).returns(axiosInstance.object());

    const addresses = [ "some-address" ];
    const sessionId = "session-id";
    setupSignIn(axiosInstance, addresses, sessionId);

    const client = new AuthenticationClient(DIRECTORY_ENDPOINT, legalOfficers, axiosFactory.object());
    const signer = new Mock<RawSigner>();
    const signature = "signature";
    const signatures = [ signature ];
    setupSignatures(signer, addresses, sessionId, signatures);

    setupAuthenticate(axiosInstance, addresses, sessionId, signatures);

    const tokens = await client.authenticate(addresses, signer.object());

    expect(tokens.get("some-address")).toEqual(jasmine.objectContaining({
        value: "some-address-token"
    }));
}

function setupSignIn(axiosInstance: Mock<AxiosInstance>, addresses: string[], sessionId: string) {

    const signInResponse = new Mock<AxiosResponse<any, any>>();
    signInResponse.setup(instance => instance.data).returns({
        sessionId
    });
    axiosInstance.setup(instance => instance.post('/api/auth/sign-in', It.Is<any>(body =>
        body.addresses === addresses
    ))).returns(Promise.resolve(signInResponse.object()));
}

function setupSignatures(signer: Mock<RawSigner>, addresses: string[], sessionId: string, signatures: string[]) {
    for(let i = 0; i < addresses.length; ++i) {
        signer.setup(instance => instance.signRaw(It.Is<SignRawParameters>(params =>
            params.resource === "authentication"
            && params.signerId === addresses[i]
            && params.operation === "login"
            && params.attributes[0] === sessionId
        ))).returns(Promise.resolve({ signature: signatures[i], type: "POLKADOT"}));
    }
}

function setupAuthenticate(axiosInstance: Mock<AxiosInstance>, addresses: string[], sessionId: string, signatures: string[]) {
    const authenticateResponse = new Mock<AxiosResponse<any, any>>();
    const tokens: any = {};
    for(const address of addresses) {
        tokens[address] = {
            value: `${address}-token`,
            expiredOn: DateTime.now().plus({hours: 1}).toISO()
        };
    }
    authenticateResponse.setup(instance => instance.data).returns({
        tokens
    });
    axiosInstance.setup(instance => instance.post(`/api/auth/${sessionId}/authenticate`, It.Is<any>(body =>
        bodyIncludesSignatures(body, addresses, signatures)
    ))).returns(Promise.resolve(authenticateResponse.object()));
}

function bodyIncludesSignatures(body: any, addresses: string[], signatures: string[]): boolean {
    for(let i = 0; i < addresses.length; ++i) {
        const address = addresses[i];
        if(body.signatures[address].signature !== signatures[i] || body.signatures[address].signedOn === undefined) {
            return false;
        }
        if(body.signatures[address].type !== "POLKADOT") {
            return false;
        }
    }
    return true;
}

describe("AccountTokens", () => {

    const now = DateTime.now();

    const ADDRESS_WITH_VALID_TOKEN = "1";

    const ADDRESS_WITH_EXPIRED_TOKEN = "2";

    const addresses = [ ADDRESS_WITH_VALID_TOKEN, ADDRESS_WITH_EXPIRED_TOKEN ];

    const tokensRecord: Record<string, Token> = {
        "1": {
            value: "token-valid",
            expirationDateTime: now.plus({hours: 1})
        },
        "2": {
            value: "token-expired",
            expirationDateTime: now.plus({hours: -1})
        }
    };

    const otherTokensRecord: Record<string, Token> = {
        "3": {
            value: "token-3",
            expirationDateTime: now.plus({hours: 1})
        }
    };

    it("exposes tokens", () => {
        const tokens = new AccountTokens(tokensRecord);
        expect(tokens.length).toBe(2);
        expect(tokens.addresses).toEqual(addresses);
        expect(tokens.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN]);
        expect(tokens.get(ADDRESS_WITH_EXPIRED_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_EXPIRED_TOKEN]);
    });

    it("merges", () => {
        const merged = new AccountTokens(tokensRecord).merge(new AccountTokens(otherTokensRecord));

        expect(merged.length).toBe(3);

        expect(merged.addresses).toContain(ADDRESS_WITH_VALID_TOKEN);
        expect(merged.addresses).toContain(ADDRESS_WITH_EXPIRED_TOKEN);
        expect(merged.addresses).toContain("3");

        expect(merged.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN]);
        expect(merged.get(ADDRESS_WITH_EXPIRED_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_EXPIRED_TOKEN]);
        expect(merged.get("3")).toEqual(otherTokensRecord["3"]);
    });

    it("cleanUps", () => {
        const tokens = new AccountTokens(tokensRecord).cleanUp(now);
        expect(tokens.length).toBe(1);
        expect(tokens.addresses).toContain(ADDRESS_WITH_VALID_TOKEN);
        expect(tokens.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN]);
    });

    it("detects same tokens deeply", () => {
        const tokens = new AccountTokens(tokensRecord);
        const otherTokens = new AccountTokens(tokensRecord);
        expect(tokens.equals(otherTokens)).toBe(true);
    });

    it("detects different tokens", () => {
        const tokens = new AccountTokens(tokensRecord);
        const otherTokens = new AccountTokens(otherTokensRecord);
        expect(tokens.equals(otherTokens)).toBe(false);
    });
});
