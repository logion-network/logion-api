import { AccountTokens } from "./AuthenticationClient";
import { DirectoryClient } from "./DirectoryClient";
import { LogionClient } from "./LogionClient";
import { getInitialState, ProtectionState } from "./Recovery";
import { RecoveryClient } from "./RecoveryClient";
import { AuthenticatedSharedState, SharedState } from "./SharedClient";
import { LegalOfficer } from "./Types";
import { BalanceState, getBalanceState } from "./Balance";

export class AuthenticatedLogionClient {

    constructor(params: {
        sharedState: SharedState,
        tokens: AccountTokens,
        legalOfficers: LegalOfficer[],
        currentAddress: string,
    }) {
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
            directoryClient,
            token,
            currentAddress: params.currentAddress,
            legalOfficers: params.legalOfficers,
        };

        this._tokens = params.tokens;
    }

    private sharedState: AuthenticatedSharedState;

    get currentAddress(): string {
        return this.sharedState.currentAddress;
    }

    private _tokens: AccountTokens;

    get tokens(): AccountTokens {
        return this._tokens!;
    }

    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    async refreshTokens(): Promise<void> {
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        this._tokens = await client.refresh(this._tokens);
    }

    withCurrentAddress(currentAddress: string): AuthenticatedLogionClient {
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers: this.sharedState.legalOfficers,
            tokens: this._tokens,
            currentAddress
        });
    }

    logout(): LogionClient {
        return new LogionClient(this.sharedState);
    }

    async protectionState(): Promise<ProtectionState> {
        const recoveryClient = new RecoveryClient({
            axiosFactory: this.sharedState.axiosFactory,
            currentAddress: this.currentAddress,
            networkState: this.sharedState.networkState,
            token: this.sharedState.token.value,
            nodeApi: this.sharedState.nodeApi,
        });
        const data = await recoveryClient.fetchAll();
        return getInitialState(data, this.sharedState);
    }

    async balanceState(): Promise<BalanceState> {
        return getBalanceState(this.sharedState);
    }
}
