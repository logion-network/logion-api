import { ItemTokenWithRestrictedType, TokenType, validateToken, isTokenType } from "../src/Token";

describe("validateToken", () => {

    it("invalidates token with unexpected type", () => {
        testInvalid({
            type: "ethereum_erc20" as TokenType,
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}'
        }, "unsupported token type 'ethereum_erc20'");
    });

    it("validates valid ethereum_erc721 token", () => testErcValidToken("ethereum_erc721"));
    it("invalidates ethereum_erc721 token with non-JSON id", () => testErcInvalidIdType("ethereum_erc721"));
    it("invalidates ethereum_erc721 token with missing id field", () => testErcInvalidIdMisingId("ethereum_erc721"));
    it("invalidates ethereum_erc721 token with missing contract field", () => testErcInvalidIdMissingContract("ethereum_erc721"));
    it("invalidates ethereum_erc721 token with wrongly typed contract field", () => testErcInvalidIdContractIsNotString("ethereum_erc721"));
    it("invalidates ethereum_erc721 token with wrongly typed id field", () => testErcInvalidIdIdIsNotString("ethereum_erc721"));

    it("validates valid ethereum_erc1155 token", () => testErcValidToken("ethereum_erc1155"));
    it("invalidates ethereum_erc1155 token with non-JSON id", () => testErcInvalidIdType("ethereum_erc1155"));
    it("invalidates ethereum_erc1155 token with missing id field", () => testErcInvalidIdMisingId("ethereum_erc1155"));
    it("invalidates ethereum_erc1155 token with missing contract field", () => testErcInvalidIdMissingContract("ethereum_erc1155"));
    it("invalidates ethereum_erc1155 token with wrongly typed contract field", () => testErcInvalidIdContractIsNotString("ethereum_erc1155"));
    it("invalidates ethereum_erc1155 token with wrongly typed id field", () => testErcInvalidIdIdIsNotString("ethereum_erc1155"));

    it("validates valid goerli_erc721 token", () => testErcValidToken("goerli_erc721"));
    it("invalidates goerli_erc721 token with non-JSON id", () => testErcInvalidIdType("goerli_erc721"));
    it("invalidates goerli_erc721 token with missing id field", () => testErcInvalidIdMisingId("goerli_erc721"));
    it("invalidates goerli_erc721 token with missing contract field", () => testErcInvalidIdMissingContract("goerli_erc721"));
    it("invalidates goerli_erc721 token with wrongly typed contract field", () => testErcInvalidIdContractIsNotString("goerli_erc721"));
    it("invalidates goerli_erc721 token with wrongly typed id field", () => testErcInvalidIdIdIsNotString("goerli_erc721"));

    it("validates valid goerli_erc1155 token", () => testErcValidToken("goerli_erc1155"));
    it("invalidates goerli_erc1155 token with non-JSON id", () => testErcInvalidIdType("goerli_erc1155"));
    it("invalidates goerli_erc1155 token with missing id field", () => testErcInvalidIdMisingId("goerli_erc1155"));
    it("invalidates goerli_erc1155 token with missing contract field", () => testErcInvalidIdMissingContract("goerli_erc1155"));
    it("invalidates goerli_erc1155 token with wrongly typed contract field", () => testErcInvalidIdContractIsNotString("goerli_erc1155"));
    it("invalidates goerli_erc1155 token with wrongly typed id field", () => testErcInvalidIdIdIsNotString("goerli_erc1155"));

    it("validates valid owner token", () => {
        testValid({
            type: "owner",
            id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea84'
        });
    });

    it("invalidates owner token with non-hex ID", () => {
        testInvalid({
            type: "owner",
            id: 'some random string'
        }, "token ID must be a valid Ethereum address");
    });

    it("invalidates owner token with hex ID but wrong length", () => {
        testInvalid({
            type: "owner",
            id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea8'
        }, "token ID must be a valid Ethereum address");
    });

    it("validates valid singular_kusama token", () => {
        testValid({
            type: "singular_kusama",
            id: VALID_SINGULAR_KUSAMA_TOKEN_ID,
        });
    });

    it("invalidates singular_kusama token with invalid ID", () => {
        testInvalid({
            type: "singular_kusama",
            id: INVALID_SINGULAR_KUSAMA_TOKEN_ID
        }, "token ID must be a valid Singular Kusama ID");
    });
});

function testErcValidToken(type: TokenType) {
    testValid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":"4391"}'
    });
}

function testValid(token: ItemTokenWithRestrictedType) {
    const result = validateToken(token);
    expect(result.valid).toBe(true);
    expect(result.error).not.toBeDefined();
}

function testErcInvalidIdType(type: TokenType) {
    testInvalid({
        type,
        id: 'some-non-json-id'
    }, "token ID is not a valid JSON object");
}

function testInvalid(token: ItemTokenWithRestrictedType, message: string) {
    const result = validateToken(token);
    expect(result.valid).toBe(false);
    expect(result.error).toBe(message);
}

function testErcInvalidIdMisingId(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5"}'
    }, "token ID is missing the 'id' field");
}

function testErcInvalidIdMissingContract(type: TokenType) {
    testInvalid({
        type,
        id: '{"id":"4391"}'
    }, "token ID is missing the 'contract' field");
}

function testErcInvalidIdContractIsNotString(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":12345,"id":"4391"}'
    }, "token ID's 'contract' field is not a string");
}

function testErcInvalidIdIdIsNotString(type: TokenType) {
    testInvalid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}'
    }, "token ID's 'id' field is not a string");
}

const VALID_SINGULAR_KUSAMA_TOKEN_ID = "15057162-acba02847598b67746-DSTEST1-LUXEMBOURG_HOUSE-00000001";

const INVALID_SINGULAR_KUSAMA_TOKEN_ID = "*15057162-acba02847598b67746-DSTEST1-LUXEMBOURG_HOUSE-00000001";

describe("isTokenType", () => {

    it("returns true given 'ethereum_erc721'", () => {
        expect(isTokenType("ethereum_erc721")).toBe(true);
    });

    it("returns true given 'ethereum_erc1155'", () => {
        expect(isTokenType("ethereum_erc1155")).toBe(true);
    });

    it("returns true given 'goerli_erc721'", () => {
        expect(isTokenType("goerli_erc721")).toBe(true);
    });

    it("returns true given 'goerli_erc1155'", () => {
        expect(isTokenType("goerli_erc1155")).toBe(true);
    });

    it("returns true given 'owner'", () => {
        expect(isTokenType("owner")).toBe(true);
    });

    it("returns true given 'singular_kusama'", () => {
        expect(isTokenType("singular_kusama")).toBe(true);
    });
});
