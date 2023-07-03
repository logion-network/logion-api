import {
    ItemTokenWithRestrictedType,
    TokenType,
    validateToken,
    isTokenType,
    isTokenCompatibleWith, NetworkType
} from "../src/index.js";
import { buildLogionNodeApiMock } from "./TestConfigFactory.js";

const ercNonFungibleTypes: TokenType[] = [
    "ethereum_erc721",
    "ethereum_erc1155",
    "goerli_erc721",
    "goerli_erc1155",
    "polygon_erc721",
    "polygon_erc1155",
    "polygon_mumbai_erc721",
    "polygon_mumbai_erc1155"
];

const ercFungibleTypes: TokenType[] = [
    "ethereum_erc20",
    "goerli_erc20",
    "polygon_erc20",
    "polygon_mumbai_erc20"
];

const otherTypes: TokenType[] = [
    "owner",
    "singular_kusama"
];

const esdtTypes: TokenType[] = [
    "multiversx_devnet_esdt",
    "multiversx_testnet_esdt",
    "multiversx_esdt",
]

const allTypes: TokenType[] = [
    ...ercNonFungibleTypes,
    ...ercFungibleTypes,
    ...esdtTypes,
    ...otherTypes,
];

describe("Token", () => {

    describe("validateToken", () => {

        it("invalidates token with unexpected type", () => {
            testInvalid({
                type: "ethereum_erc42" as TokenType,
                id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}',
                issuance: 1n,
            }, "unsupported token type 'ethereum_erc42'");
        });

        for (const type of ercNonFungibleTypes) {
            it(`validates valid ${ type } token`, () => testNonFungibleErcValidToken(type));
            it(`invalidates ${ type } token with non-JSON id`, () => testErcInvalidIdType(type));
            it(`invalidates ${ type } token with missing id field`, () => testErcInvalidIdMissingId(type));
            it(`invalidates ${ type } token with missing contract field`, () => testErcInvalidIdMissingContract(type));
            it(`invalidates ${ type } token with wrongly typed contract field`, () => testErcInvalidIdContractIsNotString(type));
            it(`invalidates ${ type } token with wrongly typed id field`, () => testErcInvalidIdIdIsNotString(type));
            it(`${ type } is ETHEREUM-compatible`, () => testIsTokenCompatibleWith(type, 'ETHEREUM'))
            it(`${ type } is NOT POLKADOT-compatible`, () => testIsTokenNotCompatibleWith(type, 'POLKADOT'))
        }

        for (const type of ercFungibleTypes) {
            it(`validates valid ${ type } token`, () => testFungibleErcValidToken(type));
            it(`invalidates ${ type } token with non-JSON id`, () => testErcInvalidIdType(type));
            it(`invalidates ${ type } token with missing contract field`, () => testErcInvalidIdMissingContract(type));
            it(`invalidates ${ type } token with wrongly typed contract field`, () => testErcInvalidIdContractIsNotString(type));
            it(`checks that ${ type } is ETHEREUM-compatible`, () => testIsTokenCompatibleWith(type, 'ETHEREUM'))
            it(`checks that ${ type } is NOT POLKADOT-compatible`, () => testIsTokenNotCompatibleWith(type, 'POLKADOT'))
        }

        it(`checks that owner is compatible with all network type`, () => {
            testIsTokenCompatibleWith('owner', 'POLKADOT');
            testIsTokenCompatibleWith('owner', 'ETHEREUM');
            testIsTokenCompatibleWith('owner', 'MULTIVERSX');
        });

        it(`checks that singular_kusama is NOT ETHEREUM- and MULTIVERSX-compatible`, () => {
            testIsTokenNotCompatibleWith('singular_kusama', 'ETHEREUM');
            testIsTokenNotCompatibleWith('singular_kusama', 'MULTIVERSX');
        });

        it(`checks that singular_kusama is POLKADOT-compatible`, () =>
            testIsTokenCompatibleWith('singular_kusama', 'POLKADOT')
        );

        it("validates valid owner token with Ethereum address", () => {
            testValid({
                type: "owner",
                id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea84',
                issuance: 1n,
            });
        });

        it("validates valid owner token with Polkadot address", () => {
            testValid({
                type: "owner",
                id: "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb",
                issuance: 1n,
            });
        });

        it("validates valid owner token with MultiversX address", () => {
            testValid({
                type: "owner",
                id: "erd1gram9hstfmfze9hcxeume8tspsed2gful2cr4ra6fefn7hl7lfeqm9ka0x",
                issuance: 1n,
            });
        });

        it("invalidates owner token with non-hex ID", () => {
            testInvalid({
                type: "owner",
                id: 'some random string',
                issuance: 1n,
            }, "token ID must be a valid Ethereum, Polkadot or MultiversX address");
        });

        it("invalidates owner token with hex ID but wrong length", () => {
            testInvalid({
                type: "owner",
                id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea8',
                issuance: 1n,
            }, "token ID must be a valid Ethereum, Polkadot or MultiversX address");
        });

        it("validates valid singular_kusama token", () => {
            testValid({
                type: "singular_kusama",
                issuance: 1n,
                id: VALID_SINGULAR_KUSAMA_TOKEN_ID,
            });
        });

        it("invalidates singular_kusama token with invalid ID", () => {
            testInvalid({
                type: "singular_kusama",
                id: INVALID_SINGULAR_KUSAMA_TOKEN_ID,
                issuance: 1n,
            }, "token ID must be a valid Singular Kusama ID");
        });

        it("validates valid Multiversx tokens", () => {
            const validESDTIds = [ VALID_MULTIVERSX_FT_ID, VALID_MULTIVERSX_SFT_ID, VALID_MULTIVERSX_NFT_ID ];
            validESDTIds.forEach(validESDTId =>
                testValid({
                    type: "multiversx_esdt",
                    issuance: 1n,
                    id: validESDTId,
                })
            )
        });

    });

    describe("isTokenType", () => {
        for (const type of allTypes) {
            it(`returns true given '${type}'`, () => {
                expect(isTokenType(type)).toBe(true);
            });
        }
    });
});

function testNonFungibleErcValidToken(type: TokenType) {
    testValid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":"4391"}',
        issuance: 1n,
    });
}

function testValid(token: ItemTokenWithRestrictedType) {
    const api = buildLogionNodeApiMock();
    api.setup(instance => instance.queries.isValidAccountId).returns(() => token.id.startsWith("5"));
    const result = validateToken(api.object(), token);
    expect(result.valid).toBe(true);
    expect(result.error).not.toBeDefined();
}

function testErcInvalidIdType(type: TokenType) {
    testInvalid({
        type,
        id: 'some-non-json-id',
        issuance: 1n,
    }, "token ID is not a valid JSON object");
}

function testInvalid(token: ItemTokenWithRestrictedType, message: string) {
    const api = buildLogionNodeApiMock();
    api.setup(instance => instance.queries.isValidAccountId).returns(() => false);
    const result = validateToken(api.object(), token);
    expect(result.valid).toBe(false);
    expect(result.error).toBe(message);
}

function testErcInvalidIdMissingId(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5"}',
        issuance: 1n,
    }, "token ID is missing the 'id' field");
}

function testErcInvalidIdMissingContract(type: TokenType) {
    testInvalid({
        type,
        id: '{"id":"4391"}',
        issuance: 1n,
    }, "token ID is missing the 'contract' field");
}

function testErcInvalidIdContractIsNotString(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":12345,"id":"4391"}',
        issuance: 1n,
    }, "token ID's 'contract' field is not a string");
}

function testErcInvalidIdIdIsNotString(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}',
        issuance: 1n,
    }, "token ID's 'id' field is not a string");
}

const VALID_SINGULAR_KUSAMA_TOKEN_ID = "15057162-acba02847598b67746-DSTEST1-LUXEMBOURG_HOUSE-00000001";

const INVALID_SINGULAR_KUSAMA_TOKEN_ID = "*15057162-acba02847598b67746-DSTEST1-LUXEMBOURG_HOUSE-00000001";

const VALID_MULTIVERSX_FT_ID = "LR001-5c0eb8";
const VALID_MULTIVERSX_SFT_ID = "LRCOLL001-e42371-01";
const VALID_MULTIVERSX_NFT_ID = "LNFT001-1bc5a0-01";

function testFungibleErcValidToken(type: TokenType) {
    testValid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5"}',
        issuance: 1n,
    });
}

function testIsTokenCompatibleWith(type: TokenType, networkType: NetworkType) {
    const result = isTokenCompatibleWith(type, networkType)
    expect(result).toBeTrue();
}

function testIsTokenNotCompatibleWith(type: TokenType, networkType: NetworkType) {
    const result = isTokenCompatibleWith(type, networkType)
    expect(result).toBeFalse();
}
