import { AccountTokens } from "./AuthenticationClient";
import { DirectoryClient } from "./DirectoryClient";
import { LogionClient } from "./LogionClient";
import { SharedState } from "./SharedClient";
import { LegalOfficer } from "./Types";

export class AuthenticatedLogionClient {

    constructor(params: {
        sharedState: SharedState,
        tokens: AccountTokens,
        legalOfficers: LegalOfficer[],
        currentAddress: string,
    }) {
        this._currentAddress = params.currentAddress;
        const token = params.tokens.get(params.currentAddress);
        if(token === undefined) {
            throw new Error(`Address ${params.currentAddress} is not authenticated`);
        }

        const directoryClient = params.sharedState.componentFactory.buildDirectoryClient(
            params.sharedState.config.directoryEndpoint,
            params.sharedState.axiosFactory,
            token.value
        );
        this.sharedState = {
            ...params.sharedState,
            directoryClient
        };

        this._tokens = params.tokens;
        this.legalOfficers = params.legalOfficers;
    }

    private sharedState: SharedState;

    private _currentAddress: string;

    get currentAddress(): string {
        return this._currentAddress;
    }

    private _tokens: AccountTokens;

    get tokens(): AccountTokens {
        return this._tokens!;
    }

    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    private legalOfficers: LegalOfficer[];

    async refreshTokens(): Promise<void> {
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.config.directoryEndpoint,
            this.legalOfficers,
            this.sharedState.axiosFactory
        );
        this._tokens = await client.refresh(this._tokens);
    }

    withCurrentAddress(currentAddress: string): AuthenticatedLogionClient {
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers: this.legalOfficers,
            tokens: this._tokens,
            currentAddress
        });
    }

    logout(): LogionClient {
        return new LogionClient(this.sharedState);
    }
}
