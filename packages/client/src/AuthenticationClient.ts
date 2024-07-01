import { LogionNodeApiClass, ValidAccountId } from "@logion/node-api";
import { AxiosInstance } from "axios";
import { DateTime } from "luxon";
import { fromIsoString, toIsoString } from "./DateTimeUtil.js";

import { Token } from "./Http";
import { RawSigner, SignatureType } from "./Signer";
import { LegalOfficerClass } from "./Types";

interface AuthenticationSignature {
    signature: string;
    signedOn: string;
    type: SignatureType;
}

type AuthenticationResponse = Record<string, { value: string, expiredOn: string }>;

export class AuthenticationClient {

    constructor(api: LogionNodeApiClass, legalOfficers: LegalOfficerClass[]) {
        this.api = api;
        this.legalOfficers = legalOfficers;
    }

    private api: LogionNodeApiClass;

    private legalOfficers: LegalOfficerClass[];

    async authenticate(addresses: ValidAccountId[], signer: RawSigner): Promise<AccountTokens> {
        return this.doWithFirstAvailableNode(axios => this.authenticateWithAxios(axios, addresses, signer));
    }

    private doWithFirstAvailableNode<T>(axiosConsumer: (axios: AxiosInstance) => Promise<T>): Promise<T> {
        for(let i = 0; i < this.legalOfficers.length; ++i) {
            const legalOfficer = this.legalOfficers[i];
            try {
                const axios = legalOfficer.buildAxiosToNode();
                return axiosConsumer(axios);
            } catch(error) {
                console.log(error);
            }
        }
        throw new Error("Unable to find an available node");
    }

    private async authenticateWithAxios(axios: AxiosInstance, validAccountIds: ValidAccountId[], signer: RawSigner): Promise<AccountTokens> {
        const addresses = validAccountIds.map(validAccountId => validAccountId.toKey());
        const signInResponse = await axios.post("/api/auth/sign-in", { addresses });
        const sessionId = signInResponse.data.sessionId;

        const signatures: Record<string, AuthenticationSignature> = {};
        for(const validAccountId of validAccountIds) {
            const signedOn = DateTime.now();
            const signature = await signer.signRaw({
                signerId: validAccountId,
                signedOn,
                sessionId,
            });
            signatures[validAccountId.toKey()] = {
                signature: signature.signature,
                signedOn: toIsoString(signedOn),
                type: signature.type,
            };
        }

        const authenticateResponse = await axios.post(`/api/auth/${sessionId}/authenticate/v2`, {
            signatures
        });
        const authenticatedAddresses: AuthenticationResponse = authenticateResponse.data.tokens;
        return this.buildAccountTokens(authenticatedAddresses);
    }

    private buildAccountTokens(authenticatedAddresses: AuthenticationResponse): AccountTokens {
        const tokens: Record<string, Token> = {};
        for(const authenticatedAddress of Object.keys(authenticatedAddresses)) {
            tokens[authenticatedAddress] = {
                value: authenticatedAddresses[authenticatedAddress].value,
                expirationDateTime: fromIsoString(authenticatedAddresses[authenticatedAddress].expiredOn)
            }
        }
        return new AccountTokens(this.api, tokens);
    }

    async refresh(accountTokens: AccountTokens): Promise<AccountTokens> {
        const account = accountTokens.accounts[0];
        const token = accountTokens.get(account);
        if(!token) {
            throw new Error(`Cannot refresh with address ${account.address}`);
        }
        const tokens: Record<string, string> = {};
        const accounts = accountTokens.accounts;
        for(let i = 0; i < accounts.length; ++i) {
            const account = accounts[i];
            const tokenValue = accountTokens.get(account)?.value;
            if(tokenValue) {
                tokens[account.toKey()] = tokenValue;
            }
        }

        const authenticateResponse = await this.doWithFirstAvailableNode(axios =>
            axios.put(`/api/auth/refresh`, {
                tokens
            })
        )
        const authenticatedAddresses: AuthenticationResponse = authenticateResponse.data.tokens;
        return this.buildAccountTokens(authenticatedAddresses);
    }
}

export class AccountTokens {

    constructor(api: LogionNodeApiClass, initialState: Record<string, Token>) {
        this.api = api;
        this.store = { ...initialState };
    }

    private api: LogionNodeApiClass;

    private store: Record<string, Token>;

    get(account?: ValidAccountId): Token | undefined {
        return this.store[account?.toKey() || ""];
    }

    merge(tokens: AccountTokens): AccountTokens {
        const newStore = { ...this.store };
        for(const account of tokens.accounts) {
            newStore[account.toKey()] = tokens.store[account.toKey()];
        }
        return new AccountTokens(tokens.api, newStore);
    }

    get accounts(): ValidAccountId[] {
        return Object.keys(this.store).map(key => ValidAccountId.parseKey(key));
    }

    cleanUp(now: DateTime): AccountTokens {
        const newStore: Record<string, Token> = {};
        for(const account of this.accounts) {
            const token = this.get(account);
            if(token && token.expirationDateTime > now) {
                newStore[account.toKey()] = token;
            }
        }
        return new AccountTokens(this.api, newStore);
    }

    equals(other: AccountTokens): boolean {
        if(this.length !== other.length) {
            return false;
        }
        for(const account of this.accounts) {
            const thisToken = this.get(account);
            const otherToken = other.get(account);
            if((!thisToken || !otherToken)
                || !thisToken.expirationDateTime.equals(otherToken.expirationDateTime)) {
                return false;
            }
        }
        return true;
    }

    get length(): number {
        return this.accounts.length;
    }

    isAuthenticated(now: DateTime, account: ValidAccountId | undefined): boolean {
        if(account === undefined) {
            return false;
        }
        const token = this.get(account);
        if(token === undefined) {
            return false;
        } else {
            return token.expirationDateTime > now;
        }
    }

    earliestExpiration(): DateTime | undefined {
        let earliest: DateTime | undefined;
        for(const address of this.accounts) {
            const expiration = this.store[address.toKey()].expirationDateTime;
            if(earliest === undefined || earliest > expiration) {
                earliest = expiration;
            }
        }
        return earliest;
    }
}
