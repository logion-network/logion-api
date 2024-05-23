import { AxiosInstance } from "axios";
import { DateTime, DurationLike } from "luxon";
import { LogionNodeApiClass, UUID, ValidAccountId } from "@logion/node-api";

import { AccountTokens } from "./AuthenticationClient.js";
import { BalanceState, getBalanceState } from "./Balance.js";
import { ComponentFactory, buildComponentFactory } from "./ComponentFactory.js";
import { DirectoryClient } from "./DirectoryClient.js";
import { initMultiSourceHttpClientState, MultiSourceHttpClient, Token } from "./Http.js";
import { getInitialState, ProtectionState } from "./AccountRecovery.js";
import { AccountRecoveryClient } from "./AccountRecoveryClient.js";
import { authenticatedCurrentAccount, LegalOfficerEndpoint, LogionClientConfig, SharedState } from "./SharedClient.js";
import { RawSigner } from "./Signer.js";
import { LegalOfficer, LegalOfficerClass } from "./Types.js";
import { LocsState } from "./Loc.js";
import { PublicApi } from "./Public.js";
import { FetchAllLocsParams } from "./LocClient.js";
import { NetworkState } from "./NetworkState.js";
import { VoterApi } from "./Voter.js";
import { SponsorshipState, SponsorshipApi } from "./Sponsorship.js";
import { requireDefined } from "./assertions.js";
import { InvitedContributorApi } from "./InvitedContributor.js";
import { SecretRecoveryApi } from "./SecretRecovery.js";
import { RecoveryReviewApi } from "./RecoveryReview.js";

/**
 * An instance of LogionClient is connected to a Logion network and
 * interacts with all its components (including the blockchain).
 *
 * It features:
 * - Access to LGNT balance, transactions and transfer
 * - LOC management
 * - Account protection and recovery
 * - A vault (multisig)
 */
export class LogionClient {

    /**
     * Instantiates a connected client.
     *
     * @param config Parameters of a connection to the Logion network.
     * @returns A connected client.
     */
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
        const nodesUp: LegalOfficerEndpoint[] = legalOfficers.map(legalOfficer => ({ url: legalOfficer.node, legalOfficer: legalOfficer.account.address }));
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
            currentAccount: undefined,
        };
        return new LogionClient(sharedState);
    }

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
        this._public = new PublicApi({ sharedState });
        this._voter = new VoterApi({ sharedState, logionClient: this });
        this._invitedContributor = new InvitedContributorApi({ sharedState, logionClient: this })
        this._secretRecovery = new SecretRecoveryApi({ sharedState });
    }

    private sharedState: SharedState;

    private _public: PublicApi;

    private _voter: VoterApi;

    private readonly _invitedContributor: InvitedContributorApi;

    private readonly _secretRecovery: SecretRecoveryApi;

    private _recoveryReviewApi: RecoveryReviewApi | undefined;

    /**
     * The configuration of this client.
     */
    get config(): LogionClientConfig {
        return this.sharedState.config;
    }

    /**
     * The current account used to query data and sign extrinsics.
     */
    get currentAccount(): ValidAccountId | undefined {
        return this.sharedState.currentAccount;
    }

    /**
     * The current account if authenticated (see {@link authenticate}). Throws an error otherwise.
     */
    get authenticatedCurrentAccount(): ValidAccountId {
        const address = this.currentAccount;
        if(!address) {
            throw new Error("Not authenticated");
        }
        return address;
    }

    /**
     * The JWT tokens attached to authenticated accounts.
     */
    get tokens(): AccountTokens {
        return this.sharedState.tokens;
    }

    /**
     * An instance of Directory client.
     */
    get directoryClient(): DirectoryClient {
        return this.sharedState.directoryClient;
    }

    /**
     * The available legal officers.
     */
    get legalOfficers(): LegalOfficerClass[] {
        return this.sharedState.legalOfficers;
    }

    /**
     * All legal officers, including the inactive (i.e. not attached to any node) ones.
     */
    get allLegalOfficers(): LegalOfficerClass[] {
        return this.sharedState.allLegalOfficers;
    }

    /**
     * An instance of Logion chain's client.
     */
    get logionApi(): LogionNodeApiClass {
        return this.sharedState.nodeApi;
    }

    /**
     * Overrides current tokens.
     *
     * @param tokens The new tokens.
     * @returns A copy of this client, but using the new tokens.
     */
    useTokens(tokens: AccountTokens): LogionClient {
        this.ensureConnected();
        const token = tokens.get(this.currentAccount)?.value;
        const sharedState = this.refreshLegalOfficers(this.sharedState, token);
        return new LogionClient({
            ...sharedState,
            tokens,
        });
    }

    private ensureConnected() {
        if(!this.sharedState.nodeApi.polkadot.isConnected) {
            throw new Error("Client was disconnected");
        }
    }

    /**
     * Postpones the expiration of valid (see {@link isTokenValid}) JWT tokens.
     *
     * @param now Current time, used to check if tokens are still valid or not.
     * @param threshold If at least one token's expiration falls between now and (now + threshold), then tokens are refreshed. Otherwise, they are not.
     * @returns An authenticated client using refreshed tokens or this if no refresh occured.
     */
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
        return this.useTokens(tokens);
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

    /**
     * Sets current account.
     *
     * @param currentAccount The account to use as current.
     * @returns A client instance with provided current account.
     */
    withCurrentAccount(currentAccount?: ValidAccountId): LogionClient {
        this.ensureConnected();
        let directoryClient: DirectoryClient;
        if(currentAccount !== undefined) {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.nodeApi,
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
                this.sharedState.tokens.get(currentAccount)?.value,
            );
        } else {
            directoryClient = this.sharedState.componentFactory.buildDirectoryClient(
                this.sharedState.nodeApi,
                this.sharedState.config.directoryEndpoint,
                this.sharedState.axiosFactory,
            );
        }
        const token = this.sharedState.tokens.get(currentAccount)?.value;
        const sharedState = this.refreshLegalOfficers(this.sharedState, token);
        return new LogionClient({
            ...sharedState,
            currentAccount,
            directoryClient,
        });
    }

    /**
     * Clears all authentication data (i.e. JWT tokens).
     * @returns A client instance with no authentication data.
     */
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
            currentAccount: undefined,
            directoryClient,
        });
    }

    private get token(): Token | undefined {
        if(this.sharedState.currentAccount) {
            return this.sharedState.tokens.get(this.sharedState.currentAccount);
        } else {
            return undefined;
        }
    }

    /**
     * The protection state attached to current address.
     * @returns An instance of {@link ProtectionState}
     */
    async protectionState(): Promise<ProtectionState> {
        this.ensureConnected();
        const { currentAccount, token } = authenticatedCurrentAccount(this.sharedState);
        const recoveryClient = new AccountRecoveryClient({
            axiosFactory: this.sharedState.axiosFactory,
            currentAccount,
            networkState: this.sharedState.networkState,
            token: token.value,
            nodeApi: this.sharedState.nodeApi,
        });
        const data = await recoveryClient.fetchAll();
        return getInitialState(data, this.sharedState);
    }

    /**
     * Checks if the authentication token attached to current address is still valid (i.e. did not expire).
     * @param now Current time.
     * @returns True if the token did not yet expire, false if it did.
     */
    isTokenValid(now: DateTime): boolean {
        return this.sharedState.tokens.isAuthenticated(now, this.currentAccount);
    }

    /**
     * Authenticates the set of provided addresses. Authentication consists in getting
     * a JWT token for each address. A valid JWT token is sent back by a Logion node
     * if the client was able to sign a random challenge, hence proving that provided
     * signer is indeed able to sign using provided addresses.
     *
     * Note that the signer may be able to sign for more addresses than the once provided.
     * A call to this method will merge the retrieved tokens with the ones already available.
     * Older tokens are replaced.
     *
     * @param accounts The addresses for which an authentication token must be retrieved.
     * @param signer The signer that will sign the challenge.
     * @returns An instance of client with retrived JWT tokens.
     */
    async authenticate(accounts: ValidAccountId[], signer: RawSigner): Promise<LogionClient> {
        this.ensureConnected();
        const client = this.sharedState.componentFactory.buildAuthenticationClient(
            this.sharedState.nodeApi,
            this.sharedState.config.directoryEndpoint,
            this.sharedState.legalOfficers,
            this.sharedState.axiosFactory
        );
        const newTokens = await client.authenticate(accounts, signer);
        const tokens = this.tokens.merge(newTokens);

        let currentAccount = this.sharedState.currentAccount;
        if(!currentAccount && accounts.length === 1) {
            currentAccount = accounts[0];
        }

        return this.useTokens(tokens).withCurrentAccount(currentAccount);
    }

    /**
     * Tells if a given address is associated with a legal officer.
     * @param accountId An SS58 Polkadot address.
     * @returns True if the provided address is linked to a legal officer, false otherwise.
     */
    isLegalOfficer(accountId: ValidAccountId): boolean {
        this.ensureConnected();
        return this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.account.equals(accountId)) !== undefined;
    }

    /**
     * Gets the {@link LegalOfficerClass} associated with provided account. Will throw an error
     * if no legal officer is linked to the account.
     * @param accountId A Polkadot account.
     * @returns An instance of {@link LegalOfficerClass}
     */
    getLegalOfficer(accountId: ValidAccountId): LegalOfficerClass {
        const legalOfficer = this.sharedState.allLegalOfficers.find(legalOfficer => legalOfficer.account.equals(accountId));
        if(!legalOfficer) {
            throw new Error(`No legal officer with address ${accountId}`);
        }
        return legalOfficer;
    }

    /**
     * Queries Logion blockchain to check if a given address is attached to a legal officer.
     * @param accountId A Polkadot account.
     * @returns True if provided account is attached to a legal officer.
     */
    async isRegisteredLegalOfficer(accountId: ValidAccountId): Promise<boolean> {
        this.ensureConnected();
        const option = await this.sharedState.nodeApi.polkadot.query.loAuthorityList.legalOfficerSet(accountId.address);
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

    /**
     * Builds an instance of {@link MultiSourceHttpClient} that will connect to all
     * legal officer nodes.
     * @returns An instance of {@link MultiSourceHttpClient}
     */
    buildMultiSourceHttpClient(): MultiSourceHttpClient<LegalOfficerEndpoint> {
        const initialState = initMultiSourceHttpClientState(this.sharedState.networkState, this.sharedState.legalOfficers);
        const token = this.sharedState.tokens.get(this.sharedState.currentAccount);
        if(!token) {
            throw new Error("Authentication required");
        }

        return new MultiSourceHttpClient<LegalOfficerEndpoint>(
            initialState,
            this.sharedState.axiosFactory,
            token.value,
        );
    }

    /**
     * Updates network state given the an instance of {@link MultiSourceHttpClient} that interacted
     * with the Logion network.
     * @param multiSourceClient an instance of {@link MultiSourceHttpClient}.
     * @returns An instance of {@link LogionClient} with an updated network state.
     */
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

    /**
     * Logion network's state (nodes up and down).
     */
    get networkState(): NetworkState<LegalOfficerEndpoint> {
        return this.sharedState.networkState;
    }

    /**
     * Builds a new instance of {@link BalanceState} for to current address.
     * @returns An instance of {@link BalanceState}
     */
    async balanceState(): Promise<BalanceState> {
        this.ensureConnected();
        if(!this.sharedState.currentAccount) {
            throw new Error("Current address was not selected");
        }
        return getBalanceState({
            ...this.sharedState,
            isRecovery: false,
        });
    }

    /**
     * Queries the blockchain to tell if provided address is protected (see {@link ProtectionState}).
     * @param accountId An SS58 Polkadot address.
     * @returns True if the address is protected, false otherwise.
     */
    async isProtected(accountId: ValidAccountId): Promise<boolean> {
        this.ensureConnected();
        const config = await this.sharedState.nodeApi.queries.getRecoveryConfig(accountId);
        return config !== undefined;
    }

    /**
     * Tells if provided address is a valid Polkadot address.
     * @param address A string that may or may not represent a valid Polkadot address.
     * @returns True if the address is valid, false otherwise.
     */
    isValidAddress(address: string): boolean {
        return this.sharedState.nodeApi.queries.isValidAccountId(address, "Polkadot");
    }

    /**
     * An instance of {@link LocsState} for current address.
     * @param params Some optional spec to further control which LOCs will be fetched. Leave undefined unless you now what you do.
     * @returns An instance of {@link LocsState}
     */
    async locsState(params?: FetchAllLocsParams): Promise<LocsState> {
        this.ensureConnected();
        return LocsState.getInitialLocsState(this.sharedState, this, params);
    }

    /**
     * Queries which do not require authentication.
     * @returns An instance of {@link PublicApi}
     */
    get public(): PublicApi {
        this.ensureConnected();
        return this._public;
    }

    /**
     * Voters tools.
     * @returns An instance of {@link VoterApi}
     */
    get voter(): VoterApi {
        this.ensureConnected();
        return this._voter;
    }

    /**
     * Invited contributors tools.
     * @returns An instance of {@link InvitedContributorApi}
     */
    get invitedContributor(): InvitedContributorApi {
        this.ensureConnected();
        return this._invitedContributor;
    }

    /**
     * Secret Recovery tools (for regular user)
     * @returns An instance of {@link SecretRecoveryApi}
     */
    get secretRecovery(): SecretRecoveryApi {
        this.ensureConnected();
        return this._secretRecovery;
    }

    /**
     * Recovery review tools (for legal officer)
     * @returns An instance of {@link RecoveryReviewApi}
     */
    get recoveryReview(): RecoveryReviewApi {
        if (this._recoveryReviewApi === undefined) {
            this.ensureConnected();
            this._recoveryReviewApi = new RecoveryReviewApi({ sharedState: this.sharedState });
        }
        return this._recoveryReviewApi;
    }

    /**
     * Disconnects the client from the Logion blockchain.
     * @returns
     */
    async disconnect() {
        if(this.sharedState.nodeApi.polkadot.isConnected) {
            return this.sharedState.nodeApi.polkadot.disconnect();
        }
    }

    /**
     * Sponsors tools.
     * @returns An instance of {@link SponsorshipApi}
     */
    get sponsorship(): SponsorshipApi {
        this.ensureConnected();
        return new SponsorshipApi({
            api: this.sharedState.nodeApi,
            signerId: requireDefined(this.currentAccount),
        });
    }

    /**
     * Sponsorship state.
     * @returns An instance of {@link SponsorshipState}
     */
    sponsorshipState(sponsorshipId: UUID): Promise<SponsorshipState> {
        return SponsorshipState.getState({
            sharedState: this.sharedState,
            client: this,
            id: sponsorshipId,
        });
    }
}

function getComponentFactory(config: LogionClientConfig): ComponentFactory {
    if("__componentFactory" in config) {
        return (config as any)["__componentFactory"]; // eslint-disable-line @typescript-eslint/no-explicit-any
    } else {
        return buildComponentFactory(config.buildFileUploader);
    }
}
