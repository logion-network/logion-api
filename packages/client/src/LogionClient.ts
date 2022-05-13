import { AxiosInstance } from "axios";
import { DateTime, DurationLike } from "luxon";

import { AccountTokens } from "./AuthenticationClient";
import { BalanceState, getBalanceState } from "./Balance";
import { ComponentFactory, DefaultComponentFactory } from "./ComponentFactory";
import { DirectoryClient } from "./DirectoryClient";
import { Token } from "./Http";
import { getInitialState, ProtectionState } from "./Recovery";
import { RecoveryClient } from "./RecoveryClient";
import { LegalOfficerEndpoint, LogionClientConfig, SharedState } from "./SharedClient";
import { RawSigner } from "./Signer";
import { LegalOfficer } from "./Types";

export class LogionClient {

    static async create(config: LogionClientConfig): Promise<LogionClient> {
        const componentFactory = getComponentFactory(config);
        const axiosFactory = componentFactory.buildAxiosFactory();
        const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
        const directoryClient = componentFactory.buildDirectoryClient(
            config.directoryEndpoint,
            axiosFactory
        );
        const legalOfficers = await directoryClient.getLegalOfficers();
        const nodesUp: LegalOfficerEndpoint[] = legalOfficers.map(legalOfficer => ({ url: legalOfficer.node, legalOfficer: legalOfficer.address }));
        const sharedState: SharedState = {
            config,
            componentFactory,
            axiosFactory,
            directoryClient,
            nodeApi,
            legalOfficers,
            networkState: componentFactory.buildNetworkState(nodesUp, []),
            tokens: new AccountTokens({}),
            currentAddress: undefined,
        };
        return new LogionClient(sharedState);
    }

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedState;

    getLegalOfficers(): LegalOfficer[] {
        return this.sharedState.legalOfficers;
    }

    get currentAddress(): string | undefined {
        return this.sharedState.currentAddress;
    }

    get tokens(): AccountTokens {
        return this.sharedState.tokens;
    }

    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    get legalOfficers(): LegalOfficer[] {
        return this.sharedState.legalOfficers;
    }

    useTokens(tokens: AccountTokens): LogionClient {
        return new LogionClient({
            ...this.sharedState,
            tokens,
        });
    }

    async refreshTokens(now: DateTime, threshold?: DurationLike): Promise<LogionClient> {
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
        const tokens = await client.refresh(this.sharedState.tokens);
        return new LogionClient({
            ...this.sharedState,
            tokens,
        });
    }

    withCurrentAddress(currentAddress?: string): LogionClient {
        let directoryClient: DirectoryClient;
        if(currentAddress !== undefined) {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
                this.sharedState.tokens.get(currentAddress)?.value,
            );
        } else {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
            );
        }
        return new LogionClient({
            ...this.sharedState,
            currentAddress,
            directoryClient,
        });
    }

    logout(): LogionClient {
        const directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
            this.sharedState.config.directoryEndpoint,
            this.sharedState.axiosFactory
        );
        return new LogionClient({
            ...this.sharedState,
            tokens: new AccountTokens({}),
            currentAddress: undefined,
            directoryClient,
        });
    }

    private get token(): Token | undefined {
        if(this.sharedState.currentAddress) {
            return this.sharedState.tokens.get(this.sharedState.currentAddress);
        } else {
            return undefined;
        }
    }

    async protectionState(): Promise<ProtectionState> {
        const token = this.token;
        if(!token) {
            throw new Error("Current address was not authenticated");
        }
        const recoveryClient = new RecoveryClient({
            axiosFactory: this.sharedState.axiosFactory,
            currentAddress: this.currentAddress!,
            networkState: this.sharedState.networkState,
            token: token.value,
            nodeApi: this.sharedState.nodeApi,
        });
        const data = await recoveryClient.fetchAll();
        return getInitialState(data, this.sharedState);
    }

    isTokenValid(now: DateTime): boolean {
        return this.sharedState.tokens.isAuthenticated(now, this.currentAddress);
    }

    async authenticate(addresses: string[], signer: RawSigner): Promise<LogionClient> {
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        const newTokens = await client.authenticate(addresses, signer);
        const tokens = this.tokens.merge(newTokens);

        let currentAddress = this.sharedState.currentAddress;
        if(!currentAddress && addresses.length === 1) {
            currentAddress = addresses[0];
        }

        return this.useTokens(tokens).withCurrentAddress(currentAddress);
    }

    isLegalOfficer(address: string): boolean {
        return this.sharedState.legalOfficers.find(legalOfficer => legalOfficer.address === address) !== undefined;
    }

    buildAxios(legalOfficer: LegalOfficer): AxiosInstance {
        return this.sharedState.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token?.value);
    }

    async balanceState(): Promise<BalanceState> {
        if(!this.sharedState.currentAddress) {
            throw new Error("Current address was not selected");
        }
        return getBalanceState(this.sharedState);
    }
}

function getComponentFactory(config: LogionClientConfig): ComponentFactory {
    if("__componentFactory" in config) {
        return (config as any)["__componentFactory"];
    } else {
        return DefaultComponentFactory;
    }
}
