import { AxiosInstance } from "axios";
import { DateTime, DurationLike } from "luxon";
import { LogionNodeApiClass, UUID, ValidAccountId } from "@logion/node-api";

import { AccountTokens } from "./AuthenticationClient.js";
import { BalanceState, getBalanceState } from "./Balance.js";
import { ComponentFactory, DefaultComponentFactory } from "./ComponentFactory.js";
import { DirectoryClient } from "./DirectoryClient.js";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, Token } from "./Http.js";
import { getInitialState, ProtectionState } from "./Recovery.js";
import { RecoveryClient } from "./RecoveryClient.js";
import { authenticatedCurrentAddress, LegalOfficerEndpoint, LogionClientConfig, SharedState } from "./SharedClient.js";
import { RawSigner } from "./Signer.js";
import { LegalOfficer, LegalOfficerClass } from "./Types.js";
import { LocsState } from "./Loc.js";
import { PublicApi } from "./Public.js";
import { FetchAllLocsParams } from "./LocClient.js";
import { NetworkState } from "./NetworkState.js";
import { VoterApi } from "./Voter.js";
import { SponsorshipState, SponsorshipApi } from "./Sponsorship.js";
import { requireDefined } from "./assertions.js";

export class LogionClient {

    static async create(config: LogionClientConfig): Promise<LogionClient> {
        const componentFactory = getComponentFactory(config);
        const axiosFactory = componentFactory.buildAxiosFactory();
        const nodeApi = await componentFactory.buildNodeApi(config.rpcEndpoints);
        const directoryClient = componentFactory.buildDirectoryClient(
            nodeApi,
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
            tokens: new AccountTokens(nodeApi, {}),
            currentAddress: undefined,
        };
        return new LogionClient(sharedState);
    }

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
        this._public = new PublicApi({ sharedState });
        this._voter = new VoterApi({ sharedState, logionClient: this });
    }

    private sharedState: SharedState;

    private _public: PublicApi;

    private _voter: VoterApi;

    get config(): LogionClientConfig {
        return this.sharedState.config;
    }

    get currentAddress(): ValidAccountId | undefined {
        return this.sharedState.currentAddress;
    }

    get tokens(): AccountTokens {
        return this.sharedState.tokens;
    }

    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    get legalOfficers(): LegalOfficerClass[] {
        return this.sharedState.legalOfficers;
    }

    get allLegalOfficers(): LegalOfficerClass[] {
        return this.sharedState.allLegalOfficers;
    }

    get logionApi(): LogionNodeApiClass {
        return this.sharedState.nodeApi;
    }

    useTokens(tokens: AccountTokens): LogionClient {
        this.ensureConnected();
        return new LogionClient({
            ...this.sharedState,
            tokens,
        });
    }

    private ensureConnected() {
        if(!this.sharedState.nodeApi.polkadot.isConnected) {
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
            this.sharedState.nodeApi,
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        const tokens = await client.refresh(this.sharedState.tokens);
        const token = tokens.get(this.currentAddress)?.value;
        const sharedState = this.refreshLegalOfficers(this.sharedState, token);
        return new LogionClient({
            ...sharedState,
            tokens,
        });
    }

    private refreshLegalOfficers(sharedState: SharedState, token?: string): SharedState {
        const allLegalOfficers = sharedState.allLegalOfficers.map(legalOfficer => legalOfficer.withToken(token));
        const legalOfficers = sharedState.legalOfficers.map(legalOfficer => legalOfficer.withToken(token));
        return {
            ...sharedState,
            allLegalOfficers,
            legalOfficers,
        };
    }

    withCurrentAddress(currentAddress?: ValidAccountId): LogionClient {
        this.ensureConnected();
        let directoryClient: DirectoryClient;
        if(currentAddress !== undefined) {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.nodeApi,
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
                this.sharedState.tokens.get(currentAddress)?.value,
            );
        } else {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.nodeApi,
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
            );
        }
        const token = this.sharedState.tokens.get(currentAddress)?.value;
        const sharedState = this.refreshLegalOfficers(this.sharedState, token);
        return new LogionClient({
            ...sharedState,
            currentAddress,
            directoryClient,
        });
    }

    logout(): LogionClient {
        this.ensureConnected();
        const directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
            this.sharedState.nodeApi,
            this.sharedState.config.directoryEndpoint,
            this.sharedState.axiosFactory
        );
        return new LogionClient({
            ...this.sharedState,
            tokens: new AccountTokens(this.sharedState.nodeApi, {}),
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
            currentAddress: currentAddress.address,
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

    async authenticate(addresses: ValidAccountId[], signer: RawSigner): Promise<LogionClient> {
        this.ensureConnected();
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.nodeApi,
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

    getLegalOfficer(address: string): LegalOfficerClass {
        const legalOfficer = this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.address === address);
        if(!legalOfficer) {
            throw new Error(`No legal officer with address ${address}`);
        }
        return legalOfficer;
    }

    async isRegisteredLegalOfficer(address: string): Promise<boolean> {
        this.ensureConnected();
        const option = await this.sharedState.nodeApi.polkadot.query.loAuthorityList.legalOfficerSet(address);
        return option.isSome;
    }

    /**
     * Builds an axios instance enabling direct access to a legal officer's node REST API.
     * 
     * @param legalOfficer The legal officer
     * @returns The axios instance
     * @deprecated use LegalOfficerClass.buildAxiosToNode() instead
     */
    buildAxios(legalOfficer: LegalOfficer): AxiosInstance {
        this.ensureConnected();
        if(legalOfficer instanceof LegalOfficerClass) {
            return legalOfficer.buildAxiosToNode();
        } else {
            const legalOfficerClass = new LegalOfficerClass({
                legalOfficer,
                axiosFactory: this.sharedState.axiosFactory,
                token: this.token?.value,
            })
            return legalOfficerClass.buildAxiosToNode();
        }
    }

    buildMultiSourceHttpClient(): MultiSourceHttpClient<LegalOfficerEndpoint> {
        const initialState = initMultiSourceHttpClientState(this.sharedState.networkState, this.sharedState.legalOfficers);
        const token = this.sharedState.tokens.get(this.sharedState.currentAddress);
        if(!token) {
            throw new Error("Authentication required");
        }

        return new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.sharedState.axiosFactory,
            token.value,
        );
    }

    updateNetworkState(multiSourceClient: MultiSourceHttpClient<LegalOfficerEndpoint>): LogionClient {
        const { nodesUp, nodesDown } = multiSourceClient.getState();
        const networkState = this.sharedState.componentFactory.buildNetworkState(nodesUp, nodesDown);
        if(networkState.equals(this.sharedState.networkState)) {
            return this;
        } else {
            this.sharedState.networkState.update({ nodesUp, nodesDown }); // To stay backward compatible, see RecoveryClient, LocClient and VaultClient

            // Future code should use returned client so that LogionClient becomes immutable (i.e. NetworkState.update() can be removed)
            const unavailableNodesSet = new Set(nodesDown.map(endpoint => endpoint.url));
            const legalOfficers = this.sharedState.legalOfficers.filter(legalOfficer => legalOfficer.node && !unavailableNodesSet.has(legalOfficer.node));
            const sharedState: SharedState = {
                ...this.sharedState,
                legalOfficers,
                networkState,
            };
            return new LogionClient(sharedState);
        }
    }

    get networkState(): NetworkState<LegalOfficerEndpoint> {
        return this.sharedState.networkState;
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
        const config = await this.sharedState.nodeApi.queries.getRecoveryConfig(address);
        return config !== undefined;
    }

    isValidAddress(address: string): boolean {
        return this.sharedState.nodeApi.queries.isValidAccountId(address, "Polkadot");
    }

    async locsState(params?: FetchAllLocsParams): Promise<LocsState> {
        this.ensureConnected();
        return LocsState.getInitialLocsState(this.sharedState, this, params);
    }

    get public(): PublicApi {
        this.ensureConnected();
        return this._public;
    }

    get voter(): VoterApi {
        this.ensureConnected();
        return this._voter;
    }

    async disconnect() {
        if(this.sharedState.nodeApi.polkadot.isConnected) {
            return this.sharedState.nodeApi.polkadot.disconnect();
        }
    }

    get sponsorship(): SponsorshipApi {
        this.ensureConnected();
        return new SponsorshipApi({
            api: this.sharedState.nodeApi,
            signerId: requireDefined(this.currentAddress?.address),
        });
    }

    sponsorshipState(sponsorshipId: UUID): Promise<SponsorshipState> {
        return SponsorshipState.getState({
            sharedState: this.sharedState,
            client: this,
            id: sponsorshipId,
        });
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
