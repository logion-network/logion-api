import { AxiosInstance } from "axios";
import { DateTime, DurationLike } from "luxon";
import { getRecoveryConfig, isValidAccountId } from "@logion/node-api";

import { AccountTokens } from "./AuthenticationClient";
import { BalanceState, getBalanceState } from "./Balance";
import { ComponentFactory, DefaultComponentFactory } from "./ComponentFactory";
import { DirectoryClient } from "./DirectoryClient";
import { Token } from "./Http";
import { getInitialState, ProtectionState } from "./Recovery";
import { RecoveryClient } from "./RecoveryClient";
import { authenticatedCurrentAddress, LegalOfficerEndpoint, LogionClientConfig, SharedState } from "./SharedClient";
import { RawSigner } from "./Signer";
import { LegalOfficer } from "./Types";
import { LocsState } from "./Loc";
import { PublicApi } from "./Public";
import { FetchAllLocsParams } from "./LocClient";

export class LogionClient {

    static async create(config: LogionClientConfig): Promise<LogionClient> {
        const componentFactory = getComponentFactory(config);
        const axiosFactory = componentFactory.buildAxiosFactory();
        const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
        const directoryClient = componentFactory.buildDirectoryClient(
            config.directoryEndpoint,
            axiosFactory
        );
        const allLegalOfficers = await directoryClient.getLegalOfficers();
        const legalOfficers = allLegalOfficers.filter(legalOfficer => legalOfficer.node);
        const nodesUp: LegalOfficerEndpoint[] = legalOfficers.map(legalOfficer => ({ url: legalOfficer.node, legalOfficer: legalOfficer.address }));
        const sharedState: SharedState = {
            config,
            componentFactory,
            axiosFactory,
            directoryClient,
            nodeApi,
            legalOfficers,
            allLegalOfficers,
            networkState: componentFactory.buildNetworkState(nodesUp, []),
            tokens: new AccountTokens({}),
            currentAddress: undefined,
        };
        return new LogionClient(sharedState);
    }

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
        this._public = new PublicApi({ sharedState });
    }

    private sharedState: SharedState;

    private _public: PublicApi;

    get config(): LogionClientConfig {
        return this.sharedState.config;
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

    get allLegalOfficers(): LegalOfficer[] {
        return this.sharedState.allLegalOfficers;
    }

    useTokens(tokens: AccountTokens): LogionClient {
        this.ensureConnected();
        return new LogionClient({
            ...this.sharedState,
            tokens,
        });
    }

    private ensureConnected() {
        if(!this.sharedState.nodeApi.isConnected) {
            throw new Error("Client was disconnected");
        }
    }

    async refreshTokens(now: DateTime, threshold?: DurationLike): Promise<LogionClient> {
        this.ensureConnected();
        let actualThreshold;
        if(threshold !== undefined) {
            actualThreshold = threshold;
        } else {
            actualThreshold = {minutes: 30};
        }
        const earliestExpiration = this.tokens.earliestExpiration();
        if(this.tokens.length === 0
                || !earliestExpiration
                || earliestExpiration > now.plus(actualThreshold) ) {
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
        this.ensureConnected();
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
        this.ensureConnected();
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
        this.ensureConnected();
        const { currentAddress, token } = authenticatedCurrentAddress(this.sharedState);
        const recoveryClient = new RecoveryClient({
            axiosFactory: this.sharedState.axiosFactory,
            currentAddress,
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
        this.ensureConnected();
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
        this.ensureConnected();
        return this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.address === address) !== undefined;
    }

    async isRegisteredLegalOfficer(address: string): Promise<boolean> {
        this.ensureConnected();
        const option = await this.sharedState.nodeApi.query.loAuthorityList.legalOfficerSet(address);
        return option.isSome;
    }

    buildAxios(legalOfficer: LegalOfficer): AxiosInstance {
        this.ensureConnected();
        if(!legalOfficer.node) {
            throw new Error("Legal officer has currently no node");
        }
        return this.sharedState.axiosFactory.buildAxiosInstance(legalOfficer.node, this.token?.value);
    }

    async balanceState(): Promise<BalanceState> {
        this.ensureConnected();
        if(!this.sharedState.currentAddress) {
            throw new Error("Current address was not selected");
        }
        return getBalanceState({
            ...this.sharedState,
            isRecovery: false,
        });
    }

    async isProtected(address: string): Promise<boolean> {
        this.ensureConnected();
        const config = await getRecoveryConfig({
            api: this.sharedState.nodeApi,
            accountId: address
        });
        return config !== undefined;
    }

    isValidAddress(address: string): boolean {
        return isValidAccountId(this.sharedState.nodeApi, address);
    }

    async locsState(params?: FetchAllLocsParams): Promise<LocsState> {
        this.ensureConnected();
        return LocsState.getInitialLocsState(this.sharedState, params);
    }

    get public(): PublicApi {
        this.ensureConnected();
        return this._public;
    }

    async disconnect() {
        if(this.sharedState.nodeApi.isConnected) {
            return this.sharedState.nodeApi.disconnect();
        }
    }
}

function getComponentFactory(config: LogionClientConfig): ComponentFactory {
    let componentFactory: ComponentFactory;
    if("__componentFactory" in config) {
        componentFactory = (config as any)["__componentFactory"]; // eslint-disable-line @typescript-eslint/no-explicit-any
    } else {
        componentFactory = DefaultComponentFactory;
    }

    if(config.formDataLikeFactory !== undefined) {
        componentFactory.buildFormData = config.formDataLikeFactory;
    }

    return componentFactory
}
