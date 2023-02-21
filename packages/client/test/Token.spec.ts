import { ItemTokenWithRestrictedType, TokenType, validateToken, isTokenType } from "../src/index.js";

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

const ercFongibleTypes: TokenType[] = [
    "ethereum_erc20",
    "goerli_erc20",
    "polygon_erc20",
    "polygon_mumbai_erc20"
];

const otherTypes: TokenType[] = [
    "owner",
    "singular_kusama"
];

const allTypes: TokenType[] = [
    ...ercNonFungibleTypes,
    ...ercFongibleTypes,
    ...otherTypes,
];

describe("validateToken", () => {

    it("invalidates token with unexpected type", () => {
        testInvalid({
            type: "ethereum_erc42" as TokenType,
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}'
        }, "unsupported token type 'ethereum_erc42'");
    });

    for (const type of ercNonFungibleTypes) {
        it(`validates valid ${ type } token`, () => testNonFungibleErcValidToken(type));
        it(`invalidates ${ type } token with non-JSON id`, () => testErcInvalidIdType(type));
        it(`invalidates ${ type } token with missing id field`, () => testErcInvalidIdMisingId(type));
        it(`invalidates ${ type } token with missing contract field`, () => testErcInvalidIdMissingContract(type));
        it(`invalidates ${ type } token with wrongly typed contract field`, () => testErcInvalidIdContractIsNotString(type));
        it(`invalidates ${ type } token with wrongly typed id field`, () => testErcInvalidIdIdIsNotString(type));
    }

    for (const type of ercFongibleTypes) {
        it(`validates valid ${ type } token`, () => testFungibleErcValidToken(type));
        it(`invalidates ${ type } token with non-JSON id`, () => testErcInvalidIdType(type));
        it(`invalidates ${ type } token with missing contract field`, () => testErcInvalidIdMissingContract(type));
        it(`invalidates ${ type } token with wrongly typed contract field`, () => testErcInvalidIdContractIsNotString(type));
    }

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

function testNonFungibleErcValidToken(type: TokenType) {
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

function testFungibleErcValidToken(type: TokenType) {
    testValid({
        type,
        id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5"}'
    });
}

describe("isTokenType", () => {

    for (const type of allTypes) {
        it(`returns true given '${type}'`, () => {
            expect(isTokenType(type)).toBe(true);
        });
    }
});
