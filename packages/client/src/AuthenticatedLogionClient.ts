import { AxiosInstance } from "axios";
import { DateTime, DurationLike } from "luxon";
import { AccountTokens } from "./AuthenticationClient";
import { DirectoryClient } from "./DirectoryClient";
import { Token } from "./Http";
import { getInitialState, ProtectionState } from "./Recovery";
import { RecoveryClient } from "./RecoveryClient";
import { AuthenticatedSharedState, SharedState } from "./SharedClient";
import { RawSigner } from "./Signer";
import { LegalOfficer } from "./Types";

export class AuthenticatedLogionClient {

    constructor(params: {
        sharedState: SharedState,
        tokens: AccountTokens,
        legalOfficers: LegalOfficer[],
        currentAddress: string | undefined,
    }) {
        let token: Token | undefined;
        if(params.currentAddress !== undefined) {
            token = params.tokens.get(params.currentAddress);
        }
        const directoryClient = params.sharedState.componentFactory.buildDirectoryClient(
            params.sharedState.config.directoryEndpoint,
            params.sharedState.axiosFactory,
            token?.value
        );
        this.sharedState = {
            ...params.sharedState,
            directoryClient,
            token,
            currentAddress: params.currentAddress,
            legalOfficers: params.legalOfficers,
        };
        this._tokens = params.tokens;
    }

    private sharedState: AuthenticatedSharedState;

    get currentAddress(): string | undefined {
        return this.sharedState.currentAddress;
    }

    private _tokens: AccountTokens;

    get tokens(): AccountTokens {
        return this._tokens!;
    }

    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    get legalOfficers(): LegalOfficer[] {
        return this.sharedState.legalOfficers;
    }

    async refreshTokens(now: DateTime, threshold?: DurationLike): Promise<AuthenticatedLogionClient> {
        let actualThreshold;
        if(threshold !== undefined) {
            actualThreshold = threshold;
        } else {
            actualThreshold = {minutes: 30};
        }
        if(this.tokens.length === 0
                || this.tokens.earliestExpiration()! > now.plus(actualThreshold) ) {
            return this;
        }
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        const tokens = await client.refresh(this._tokens);
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            tokens,
            currentAddress: this.currentAddress,
            legalOfficers: this.legalOfficers
        });
    }

    withCurrentAddress(currentAddress?: string): AuthenticatedLogionClient {
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers: this.sharedState.legalOfficers,
            tokens: this._tokens,
            currentAddress
        });
    }

    logout(): AuthenticatedLogionClient {
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            tokens: new AccountTokens({}),
            legalOfficers: this.legalOfficers,
            currentAddress: undefined,
        });
    }

    async protectionState(): Promise<ProtectionState> {
        if(!this.sharedState.token) {
            throw new Error("Current address was not authenticated");
        }
        const recoveryClient = new RecoveryClient({
            axiosFactory: this.sharedState.axiosFactory,
            currentAddress: this.currentAddress!,
            networkState: this.sharedState.networkState,
            token: this.sharedState.token.value,
            nodeApi: this.sharedState.nodeApi,
        });
        const data = await recoveryClient.fetchAll();
        return getInitialState(data, this.sharedState);
    }

    isTokenValid(now: DateTime): boolean {
        return this.sharedState.token !== undefined && this.sharedState.token.expirationDateTime > now;
    }

    async authenticate(addresses: string[], signer: RawSigner): Promise<AuthenticatedLogionClient> {
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        const newTokens = await client.authenticate(addresses, signer);
        const tokens = this.tokens.merge(newTokens);
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers: this.sharedState.legalOfficers,
            currentAddress: this.sharedState.currentAddress,
            tokens,
        });
    }

    isLegalOfficer(address: string): boolean {
        return this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === address) !== undefined;
    }

    buildAxios(legalOfficer: LegalOfficer): AxiosInstance {
        return this.sharedState.axiosFactory.buildAxiosInstance(legalOfficer.node, this.sharedState.token?.value);
    }
}
