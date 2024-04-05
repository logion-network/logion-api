import { LogionNodeApiClass, ValidAccountId } from "@logion/node-api";
import { AxiosInstance } from "axios";
import { DateTime } from "luxon";
import { AxiosFactory } from "./AxiosFactory";
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

    constructor(api: LogionNodeApiClass, directoryEndpoint: string, legalOfficers: LegalOfficerClass[], axiosFactory: AxiosFactory) {
        this.api = api;
        this.directoryEndpoint = directoryEndpoint;
        this.legalOfficers = legalOfficers;
        this.axiosFactory = axiosFactory;
    }

    private api: LogionNodeApiClass;

    private directoryEndpoint: string;

    private legalOfficers: LegalOfficerClass[];

    private axiosFactory: AxiosFactory;

    async authenticate(addresses: ValidAccountId[], signer: RawSigner): Promise<AccountTokens> {
        return this.doWithDirectoryOrFirstAvailableNode(axios => this.authenticateWithAxios(axios, addresses, signer));
    }

    private doWithDirectoryOrFirstAvailableNode<T>(axiosConsumer: (axios: AxiosInstance) => Promise<T>): Promise<T> {
        if(this.legalOfficers.length === 0) {
            return axiosConsumer(this.axiosFactory.buildAxiosInstance(this.directoryEndpoint));
        } else {
            return this.doWithFirstAvailableNode(axiosConsumer);
        }
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
        const attributes = [ sessionId ];

        const signatures: Record<string, AuthenticationSignature> = {};
        for(const validAccountId of validAccountIds) {
            const signedOn = DateTime.now();
            const signature = await signer.signRaw({
                signerId: validAccountId,
                resource: 'authentication',
                operation: 'login',
                signedOn,
                attributes,
            });
            signatures[validAccountId.toKey()] = {
                signature: signature.signature,
                signedOn: toIsoString(signedOn),
                type: signature.type,
            };
        }

        const authenticateResponse = await axios.post(`/api/auth/${sessionId}/authenticate`, {
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
        const address = accountTokens.addresses[0];
        const token = accountTokens.get(address);
        if(!token) {
            throw new Error(`Cannot refresh with address ${address}`);
        }
        const tokens: Record<string, string> = {};
        const addresses = accountTokens.addresses;
        for(let i = 0; i < addresses.length; ++i) {
            const address = addresses[i];
            const tokenValue = accountTokens.get(address)?.value;
            if(tokenValue) {
                tokens[address.toKey()] = tokenValue;
            }
        }

        const authenticateResponse = await this.doWithDirectoryOrFirstAvailableNode(axios =>
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

    get(address?: ValidAccountId): Token | undefined {
        return this.store[address?.toKey() || ""];
    }

    merge(tokens: AccountTokens): AccountTokens {
        const newStore = { ...this.store };
        for(const address of tokens.addresses) {
            newStore[address.toKey()] = tokens.store[address.toKey()];
        }
        return new AccountTokens(tokens.api, newStore);
    }

    get addresses(): ValidAccountId[] {
        return Object.keys(this.store).map(key => ValidAccountId.parseKey(key));
    }

    cleanUp(now: DateTime): AccountTokens {
        const newStore: Record<string, Token> = {};
        for(const address of this.addresses) {
            const token = this.get(address);
            if(token && token.expirationDateTime > now) {
                newStore[address.toKey()] = token;
            }
        }
        return new AccountTokens(this.api, newStore);
    }

    equals(other: AccountTokens): boolean {
        if(this.length !== other.length) {
            return false;
        }
        for(const address of this.addresses) {
            const thisToken = this.get(address);
            const otherToken = other.get(address);
            if((!thisToken || !otherToken)
                || !thisToken.expirationDateTime.equals(otherToken.expirationDateTime)) {
                return false;
            }
        }
        return true;
    }

    get length(): number {
        return this.addresses.length;
    }

    isAuthenticated(now: DateTime, address: ValidAccountId | undefined): boolean {
        if(address === undefined) {
            return false;
        }
        const token = this.get(address);
        if(token === undefined) {
            return false;
        } else {
            return token.expirationDateTime > now;
        }
    }

    earliestExpiration(): DateTime | undefined {
        let earliest: DateTime | undefined;
        for(const address of this.addresses) {
            const expiration = this.store[address.toKey()].expirationDateTime;
            if(earliest === undefined || earliest > expiration) {
                earliest = expiration;
            }
        }
        return earliest;
    }
}
