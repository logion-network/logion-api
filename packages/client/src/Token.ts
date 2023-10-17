import { LogionNodeApiClass, AnyAccountId } from "@logion/node-api";
import { isHex } from "@polkadot/util";

export interface ItemTokenWithRestrictedType {
    type: TokenType,
    id: string,
    issuance: bigint;
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
    | 'ethereum_erc20'
    | 'goerli_erc20'
    | 'polygon_erc20'
    | 'polygon_mumbai_erc20'
    | 'owner'
    | 'multiversx_devnet_esdt'
    | 'multiversx_testnet_esdt'
    | 'multiversx_esdt'
    | 'astar_psp34'
    | 'astar_shiden_psp34'
    | 'astar_shibuya_psp34'
    ;

export type NetworkType = 'ETHEREUM' | 'POLKADOT' | 'MULTIVERSX';

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
        || type === 'ethereum_erc20'
        || type === 'goerli_erc20'
        || type === 'polygon_erc20'
        || type === 'polygon_mumbai_erc20'
        || type === 'owner'
        || type === 'multiversx_devnet_esdt'
        || type === 'multiversx_testnet_esdt'
        || type === 'multiversx_esdt'
        || type === 'astar_psp34'
        || type === 'astar_shiden_psp34'
        || type === 'astar_shibuya_psp34'
    );
}

export function isTokenCompatibleWith(type: TokenType, networkType: NetworkType): boolean {
    if (type === 'owner') {
        return true;
    }
    if (networkType === 'ETHEREUM') {
        return type.startsWith("ethereum")
            || type.startsWith("goerli")
            || type.startsWith("polygon");
    } else if (networkType === 'MULTIVERSX') {
        return type.startsWith("multiversx");
    } else {
        return type === "singular_kusama"
            || type.startsWith("astar");
    }
}

export interface TokenValidationResult {
    valid: boolean;
    error?: string;
}

export function validateToken(api: LogionNodeApiClass, itemToken: ItemTokenWithRestrictedType): TokenValidationResult {
    if(isErcNft(itemToken.type)) {
        const { result, idObject } = validateErcToken(itemToken);
        if(result.valid) {
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
        } else {
            return result;
        }
    } else if(itemToken.type.includes("erc20")) {
        return validateErcToken(itemToken).result;
    } else if(itemToken.type === "owner") {
        if (
            isHex(itemToken.id, ETHEREUM_ADDRESS_LENGTH_IN_BITS) ||
            AnyAccountId.isValidBech32Address(itemToken.id, "erd1") ||
            api.queries.isValidAccountId(itemToken.id)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                error: "token ID must be a valid Ethereum, Polkadot or MultiversX address",
            }
        }
    } else if(itemToken.type === "singular_kusama") {
        if (isSingularKusamaId(itemToken.id)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                error: "token ID must be a valid Singular Kusama ID",
            }
        }
    } else if (itemToken.type.startsWith("multiversx")) {
        if (isMultiversxESDTId(itemToken.id)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                error: "token ID must be a valid MultiversX ESDT ID",
            }
        }
    } else if (itemToken.type.includes("psp34")) {
        return validatePsp34TokenId(itemToken.id);
    } else {
        return {
            valid: false,
            error: `unsupported token type '${ itemToken.type }'`,
        }
    }
}

export function isErcNft(type: TokenType): boolean {
    return type.includes("erc721") || type.includes("erc1155");
}

const ETHEREUM_ADDRESS_LENGTH_IN_BITS = 20 * 8;

export function validateErcToken(itemToken: ItemTokenWithRestrictedType): { result: TokenValidationResult, idObject?: any } { // eslint-disable-line @typescript-eslint/no-explicit-any
    let idObject;
    try {
        idObject = JSON.parse(itemToken.id);
    } catch(e) {
        return {
            result: {
                valid: false,
                error: "token ID is not a valid JSON object",
            }
        };
    }

    const contract = idObject['contract'];
    if(!contract) {
        return {
            result: {
                valid: false,
                error: "token ID is missing the 'contract' field",
            }
        };
    }
    if(typeof contract !== "string") {
        return {
            result: {
                valid: false,
                error: "token ID's 'contract' field is not a string",
            }
        };
    }

    return {
        result: { valid: true },
        idObject
    };
}

export function isSingularKusamaId(tokenId: string): boolean {
    return /^[0-9a-zA-Z\-_]+$/.test(tokenId);
}

export function isMultiversxESDTId(tokenId: string): boolean {
    return /^[0-9A-Z]+-[0-9a-f]{6}(-[0-9a-f]+)?$/.test(tokenId);
}

export function validatePsp34TokenId(tokenId: string): TokenValidationResult {
    try {
        const idObject = JSON.parse(tokenId);
        if(typeof idObject !== "object") {
            return {
                valid: false,
                error: "token ID is not a JSON dictionnary",
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
        if(typeof id !== "object") {
            return {
                valid: false,
                error: "token ID's 'id' field is not an object",
            };
        }
        if(Object.keys(idObject.id).length !== 1) {
            return {
                valid: false,
                error: "token ID's 'id' object has wrong schema, should contain exactly one field with key being one of U8, U16, U32, U64, U128 or Bytes",
            };
        }
        if(!isAnyNumber(idObject.id.U8)
            && !isAnyNumber(idObject.id.U16)
            && !isAnyNumber(idObject.id.U32)
            && !isAnyNumber(idObject.id.U64)
            && !isAnyNumber(idObject.id.U128)
            && !isHex(idObject.id.Bytes)) {
            return {
                valid: false,
                error: "token ID's 'id' object has an invalid value for U8, U16, U32, U64, U128 or Bytes",
            };
        }

        return { valid: true };
    } catch(e) {
        return {
            valid: false,
            error: "token ID is not valid JSON",
        };
    }
}

function isAnyNumber(value: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof value === "number"
        || (typeof value === "string" && /[0-9]+/.test(value))
    ;
}
