import { AxiosInstance, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { It, Mock } from 'moq.ts';

import { AccountTokens, AuthenticationClient, LegalOfficer, LegalOfficerClass } from "../src/index.js";
import { AxiosFactory } from "../src/index.js";
import { Token } from "../src/index.js";
import { RawSigner, SignRawParameters } from "../src/index.js";
import { ALICE, buildAliceTokens, buildSimpleNodeApi, buildValidPolkadotAccountId, DIRECTORY_ENDPOINT } from "./Utils.js";
import { ValidAccountId } from "@logion/node-api";

describe("AuthenticationClient", () => {

    it("authenticates with directory if no legal officer", async () => {
        await testAuthentication([], DIRECTORY_ENDPOINT);
    });

    it("authenticates with first legal officer if given", async () => {
        const legalOfficers = [ ALICE ];
        await testAuthentication(legalOfficers, ALICE.node);
    });

    it("refreshes tokens", async () => {
        const axiosFactory = new Mock<AxiosFactory>();
        const api = buildSimpleNodeApi();
        const tokens = buildAliceTokens(api, DateTime.now().plus({hours: 1}));
        const alice = buildValidPolkadotAccountId(ALICE.address)!;
        const token = tokens.get(alice)!.value;
        const legalOfficers = [ new LegalOfficerClass({ legalOfficer: ALICE, axiosFactory: axiosFactory.object(), token }) ];

        const axiosInstance = new Mock<AxiosInstance>();
        axiosFactory.setup(instance => instance.buildAxiosInstance(ALICE.node, token)).returns(axiosInstance.object());

        const refreshResponse = new Mock<AxiosResponse<any, any>>();
        const newToken = "new-token";
        refreshResponse.setup(instance => instance.data).returns({
            tokens: {
                [alice.toKey() || ""]: {
                    value: newToken,
                    expiredOn: DateTime.now().plus({hours: 2}).toISO()
                }
            }
        });
        axiosInstance.setup(instance => instance.put('/api/auth/refresh', It.Is<any>(body =>
            body.tokens[alice.toKey()] === token
        ))).returns(Promise.resolve(refreshResponse.object()));

        const client = new AuthenticationClient(api, DIRECTORY_ENDPOINT, legalOfficers, axiosFactory.object());

        const refreshedTokens = await client.refresh(tokens);

        expect(refreshedTokens.get(alice)).toEqual(jasmine.objectContaining({
            value: newToken
        }));
    });
});

async function testAuthentication(legalOfficers: LegalOfficer[], expectedEndpoint: string) {
    const axiosFactory = new Mock<AxiosFactory>();
    const axiosInstance = new Mock<AxiosInstance>();
    if(legalOfficers.length > 0) {
        axiosFactory.setup(instance => instance.buildAxiosInstance(expectedEndpoint, undefined)) // with node
            .returns(axiosInstance.object());
    } else {
        axiosFactory.setup(instance => instance.buildAxiosInstance(expectedEndpoint)) // with directory
            .returns(axiosInstance.object());
    }

    const addresses = [ buildValidPolkadotAccountId("some-address")! ];
    const sessionId = "session-id";
    setupSignIn(axiosInstance, addresses, sessionId);

    const api = buildSimpleNodeApi();
    const client = new AuthenticationClient(api, DIRECTORY_ENDPOINT, legalOfficers.map(legalOfficer => new LegalOfficerClass({
        legalOfficer,
        axiosFactory: axiosFactory.object(),
    })), axiosFactory.object());
    const signer = new Mock<RawSigner>();
    const signature = "signature";
    const signatures = [ signature ];
    setupSignatures(signer, addresses, sessionId, signatures);

    setupAuthenticate(axiosInstance, addresses, sessionId, signatures);

    const tokens = await client.authenticate(addresses, signer.object());

    expect(tokens.get(addresses[0])).toEqual(jasmine.objectContaining({
        value: "some-address-token"
    }));
}

function setupSignIn(axiosInstance: Mock<AxiosInstance>, addresses: ValidAccountId[], sessionId: string) {

    const signInResponse = new Mock<AxiosResponse<any, any>>();
    signInResponse.setup(instance => instance.data).returns({
        sessionId
    });
    axiosInstance.setup(instance => instance.post('/api/auth/sign-in', It.Is<any>(body =>
        body.addresses === addresses
    ))).returns(Promise.resolve(signInResponse.object()));
}

function setupSignatures(signer: Mock<RawSigner>, addresses: ValidAccountId[], sessionId: string, signatures: string[]) {
    for(let i = 0; i < addresses.length; ++i) {
        signer.setup(instance => instance.signRaw(It.Is<SignRawParameters>(params =>
            params.resource === "authentication"
            && params.signerId === addresses[i]
            && params.operation === "login"
            && params.attributes[0] === sessionId
        ))).returns(Promise.resolve({ signature: signatures[i], type: "POLKADOT"}));
    }
}

function setupAuthenticate(axiosInstance: Mock<AxiosInstance>, accounts: ValidAccountId[], sessionId: string, signatures: string[]) {
    const authenticateResponse = new Mock<AxiosResponse<any, any>>();
    const tokens: any = {};
    for(const account of accounts) {
        tokens[`Polkadot:${account.address}`] = {
            value: `${account.address}-token`,
            expiredOn: DateTime.now().plus({hours: 1}).toISO()
        };
    }
    authenticateResponse.setup(instance => instance.data).returns({
        tokens
    });
    axiosInstance.setup(instance => instance.post(`/api/auth/${sessionId}/authenticate`, It.Is<any>(body =>
        bodyIncludesSignatures(body, accounts, signatures)
    ))).returns(Promise.resolve(authenticateResponse.object()));
}

function bodyIncludesSignatures(body: any, addresses: ValidAccountId[], signatures: string[]): boolean {
    for(let i = 0; i < addresses.length; ++i) {
        const address = addresses[i].toKey();
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

    const ADDRESS_WITH_VALID_TOKEN = buildValidPolkadotAccountId("1")!;

    const ADDRESS_WITH_EXPIRED_TOKEN = buildValidPolkadotAccountId("2")!;

    const addresses = [
        ADDRESS_WITH_VALID_TOKEN,
        ADDRESS_WITH_EXPIRED_TOKEN,
    ];

    const tokensRecord: Record<string, Token> = {
        [ADDRESS_WITH_VALID_TOKEN.toKey()]: {
            value: "token-valid",
            expirationDateTime: now.plus({hours: 1})
        },
        [ADDRESS_WITH_EXPIRED_TOKEN.toKey()]: {
            value: "token-expired",
            expirationDateTime: now.plus({hours: -1})
        }
    };

    const OTHER_ADDRESS = buildValidPolkadotAccountId("3")!;

    const otherTokensRecord: Record<string, Token> = {
        [OTHER_ADDRESS.toKey()]: {
            value: "token-3",
            expirationDateTime: now.plus({hours: 1})
        }
    };

    it("exposes tokens", () => {
        const api = buildSimpleNodeApi();
        const tokens = new AccountTokens(api, tokensRecord);
        expect(tokens.length).toBe(2);
        expect(tokens.addresses).toEqual(addresses);
        expect(tokens.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN.toKey()]);
        expect(tokens.get(ADDRESS_WITH_EXPIRED_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_EXPIRED_TOKEN.toKey()]);
    });

    it("merges", () => {
        const api = buildSimpleNodeApi();
        const merged = new AccountTokens(api, tokensRecord).merge(new AccountTokens(api, otherTokensRecord));

        expect(merged.length).toBe(3);

        expect(merged.addresses).toContain(ADDRESS_WITH_VALID_TOKEN);
        expect(merged.addresses).toContain(ADDRESS_WITH_EXPIRED_TOKEN);
        expect(merged.addresses).toContain(OTHER_ADDRESS);

        expect(merged.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN.toKey()]);
        expect(merged.get(ADDRESS_WITH_EXPIRED_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_EXPIRED_TOKEN.toKey()]);
        expect(merged.get(OTHER_ADDRESS)).toEqual(otherTokensRecord[OTHER_ADDRESS.toKey()]);
    });

    it("cleanUps", () => {
        const api = buildSimpleNodeApi();
        const tokens = new AccountTokens(api, tokensRecord).cleanUp(now);
        expect(tokens.length).toBe(1);
        expect(tokens.addresses).toContain(ADDRESS_WITH_VALID_TOKEN);
        expect(tokens.get(ADDRESS_WITH_VALID_TOKEN)).toEqual(tokensRecord[ADDRESS_WITH_VALID_TOKEN.toKey()]);
    });

    it("detects same tokens deeply", () => {
        const api = buildSimpleNodeApi();
        const tokens = new AccountTokens(api, tokensRecord);
        const otherTokens = new AccountTokens(buildSimpleNodeApi(), tokensRecord);
        expect(tokens.equals(otherTokens)).toBe(true);
    });

    it("detects different tokens", () => {
        const api = buildSimpleNodeApi();
        const tokens = new AccountTokens(api, tokensRecord);
        const otherTokens = new AccountTokens(buildSimpleNodeApi(), otherTokensRecord);
        expect(tokens.equals(otherTokens)).toBe(false);
    });
});
