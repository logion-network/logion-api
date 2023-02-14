import { isHex } from "@polkadot/util";

export interface ItemTokenWithRestrictedType {
    type: TokenType,
    id: string,
}

export type TokenType =
    'ethereum_erc721'
    | 'ethereum_erc1155'
    | 'goerli_erc721'
    | 'goerli_erc1155'
    | 'singular_kusama'
    | 'polygon_erc721'
    | 'polygon_erc1155'
    | 'polygon_mumbai_erc721'
    | 'polygon_mumbai_erc1155'
    | 'owner'
;

export function isTokenType(type: string): type is TokenType {
    return (
        type === 'ethereum_erc721'
        || type === 'ethereum_erc1155'
        || type === 'goerli_erc721'
        || type === 'goerli_erc1155'
        || type === 'singular_kusama'
        || type === 'polygon_erc721'
        || type === 'polygon_erc1155'
        || type === 'polygon_mumbai_erc721'
        || type === 'polygon_mumbai_erc1155'
        || type === 'owner'
    );
}

export interface TokenValidationResult {
    valid: boolean;
    error?: string;
}

export function validateToken(itemToken: ItemTokenWithRestrictedType): TokenValidationResult {
    if(isErcToken(itemToken.type)) {
        let idObject;
        try {
            idObject = JSON.parse(itemToken.id);
        } catch(e) {
            return {
                valid: false,
                error: "token ID is not a valid JSON object",
            };
        }

        const contract = idObject['contract'];
        if(!contract) {
            return {
                valid: false,
                error: "token ID is missing the 'contract' field",
            };
        }
        if(typeof contract !== "string") {
            return {
                valid: false,
                error: "token ID's 'contract' field is not a string",
            };
        }

        const id = idObject['id'];
        if(!id) {
            return {
                valid: false,
                error: "token ID is missing the 'id' field",
            };
        }
        if(typeof id !== "string") {
            return {
                valid: false,
                error: "token ID's 'id' field is not a string",
            };
        }
        
        return { valid: true };
    } else if(itemToken.type === "owner") {
        if(isHex(itemToken.id, ETHEREUM_ADDRESS_LENGTH_IN_BITS)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                error: "token ID must be a valid Ethereum address",
            }
        }
    } else if(itemToken.type === "singular_kusama") {
        if(isSingularKusamaId(itemToken.id)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                error: "token ID must be a valid Singular Kusama ID",
            }
        }
    } else {
        return {
            valid: false,
            error: `unsupported token type '${itemToken.type}'`,
        }
    }
}

export function isErcToken(type: TokenType): boolean {
    return type.includes("erc721") || type.includes("erc1155");
}

const ETHEREUM_ADDRESS_LENGTH_IN_BITS = 20 * 8;

export function isSingularKusamaId(tokenId: string): boolean {
    return /^[0-9a-zA-Z\-_]+$/.test(tokenId);
}
