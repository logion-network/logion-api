import { ItemTokenWithRestrictedType, TokenType, validateToken, isTokenType } from "../src/Token";

describe("validateToken", () => {

    it("validates valid ethereum_erc721 token", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":"4391"}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(true);
        expect(result.error).not.toBeDefined();
    });

    it("invalidates ethereum_erc721 token with non-JSON id", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: 'some-non-json-id'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID is not a valid JSON object");
    });

    it("invalidates ethereum_erc721 token with missing id field", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5"}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID is missing the 'id' field");
    });

    it("invalidates ethereum_erc721 token with missing contract field", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: '{"id":"4391"}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID is missing the 'contract' field");
    });

    it("invalidates ethereum_erc721 token with wrongly typed contract field", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: '{"contract":12345,"id":"4391"}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID's 'contract' field is not a string");
    });

    it("invalidates ethereum_erc721 token with wrongly typed id field", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc721",
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID's 'id' field is not a string");
    });

    it("invalidates token with unexpected type", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "ethereum_erc20" as TokenType,
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","id":4391}'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("unsupported token type 'ethereum_erc20'");
    });

    it("validates valid owner token", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "owner",
            id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea84'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(true);
        expect(result.error).not.toBeDefined();
    });

    it("invalidates owner token with non-hex ID", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "owner",
            id: 'some random string'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID must be a valid Ethereum address");
    });

    it("invalidates owner token with hex ID but wrong length", () => {
        const token: ItemTokenWithRestrictedType = {
            type: "owner",
            id: '0xa6db31d1aee06a3ad7e4e56de3775e80d2f5ea8'
        };
        const result = validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toBe("token ID must be a valid Ethereum address");
    });
});

describe("isTokenType", () => {

    it("returns true given 'ethereum_erc721'", () => {
        expect(isTokenType("ethereum_erc721")).toBe(true);
    });

    it("returns true given 'owner'", () => {
        expect(isTokenType("owner")).toBe(true);
    });
});
