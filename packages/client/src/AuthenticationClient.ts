import { AxiosInstance } from "axios";
import { DateTime } from "luxon";
import { AxiosFactory } from "./AxiosFactory";
import { fromIsoString, toIsoString } from "./DateTimeUtil";

import { Token } from "./Http";
import { RawSigner } from "./Signer";
import { LegalOfficer } from "./Types";

interface AuthenticationSignature {
    signature: string;
    signedOn: string;
}

type AuthenticationResponse = Record<string, { value: string, expiredOn: string }>;

export class AuthenticationClient {

    constructor(directoryEndpoint: string, legalOfficers: LegalOfficer[], axiosFactory: AxiosFactory) {
        this.directoryEndpoint = directoryEndpoint;
        this.legalOfficers = legalOfficers;
        this.axiosFactory = axiosFactory;
    }

    private directoryEndpoint: string;

    private legalOfficers: LegalOfficer[];

    private axiosFactory: AxiosFactory;

    async authenticate(addresses: string[], signer: RawSigner): Promise<AccountTokens> {
        if(this.legalOfficers.length === 0) {
            return await this.authenticateWithAxios(this.axiosFactory.buildAxiosInstance(this.directoryEndpoint), addresses, signer);
        } else {
            try {
                return this.doWithFirstAvailableNode(axios => this.authenticateWithAxios(axios, addresses, signer))
            } catch (error) {
                throw new Error(`Unable to authenticate: ${error}`);
            }
        }
    }

    private async doWithFirstAvailableNode<T>(axiosConsumer: (axios: AxiosInstance) => Promise<T>): Promise<T> {
        for(let i = 0; i < this.legalOfficers.length; ++i) {
            const legalOfficer = this.legalOfficers[i];
            try {
                const axios = this.axiosFactory.buildAxiosInstance(legalOfficer.node);
                return axiosConsumer(axios);
            } catch(error) {
                console.log(error);
            }
        }
        throw new Error("Unable to find an available node");
    }

    private async authenticateWithAxios(axios: AxiosInstance, addresses: string[], signer: RawSigner): Promise<AccountTokens> {
        const signInResponse = await axios.post("/api/auth/sign-in", { addresses });
        const sessionId = signInResponse.data.sessionId;
        const attributes = [ sessionId ];

        const signatures: Record<string, AuthenticationSignature> = {};
        for(const address of addresses) {
            const signedOn = DateTime.now();
            const signature = await signer.signRaw({
                signerId: address,
                resource: 'authentication',
                operation: 'login',
                signedOn,
                attributes,
            });
            signatures[address] = {
                signature,
                signedOn: toIsoString(signedOn)
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
        return new AccountTokens(tokens);
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
                tokens[address] = tokenValue;
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

    constructor(initialState: Record<string, Token>) {
        this.store = { ...initialState };
    }

    private store: Record<string, Token>;

    get(address: string): Token | undefined {
        return this.store[address];
    }

    merge(tokens: AccountTokens): AccountTokens {
        const newStore = { ...this.store };
        for(const address of tokens.addresses) {
            newStore[address] = tokens.store[address];
        }
        return new AccountTokens(newStore);
    }

    get addresses(): string[] {
        return Object.keys(this.store);
    }

    cleanUp(now: DateTime): AccountTokens {
        const newStore: Record<string, Token> = {};
        for(const address of this.addresses) {
            const token = this.get(address);
            if(token && token.expirationDateTime > now) {
                newStore[address] = token;
            }
        }
        return new AccountTokens(newStore);
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

    isAuthenticated(now: DateTime, address: string | undefined): boolean {
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
            const expiration = this.store[address].expirationDateTime;
            if(earliest === undefined || earliest > expiration) {
                earliest = expiration;
            }
        }
        return earliest;
    }
}
