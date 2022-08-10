import { isHex } from "@polkadot/util";

export interface ItemTokenWithRestrictedType {
    type: TokenType,
    id: string,
}

export type TokenType = 'ethereum_erc721' | 'owner';

export function isTokenType(type: string): type is TokenType {
    return type === 'ethereum_erc721' || type === 'owner';
}

export interface TokenValidationResult {
    valid: boolean;
    error?: string;
}

export function validateToken(itemToken: ItemTokenWithRestrictedType): TokenValidationResult {
    if(itemToken.type === "ethereum_erc721") {
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
    } else {
        return {
            valid: false,
            error: `unsupported token type '${itemToken.type}'`,
        }
    }
}

const ETHEREUM_ADDRESS_LENGTH_IN_BITS = 20 * 8;
