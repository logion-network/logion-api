import { AuthenticatedLogionClient } from "./AuthenticatedLogionClient";
import { AccountTokens } from "./AuthenticationClient";
import { ComponentFactory, DefaultComponentFactory } from "./ComponentFactory";
import { LogionClientConfig, SharedState } from "./SharedClient";
import { RawSigner } from "./Signer";
import { LegalOfficer } from "./Types";

export class LogionClient {

    static create(config: LogionClientConfig): LogionClient {
        const componentFactory = getComponentFactory(config);
        const axiosFactory = componentFactory.buildAxiosFactory();
        const sharedState = {
            config,
            componentFactory,
            axiosFactory,
            directoryClient: componentFactory.buildDirectoryClient(config.directoryEndpoint, axiosFactory),
        };
        return new LogionClient(sharedState);
    }

    constructor(sharedState: SharedState) {
        this.sharedState = sharedState;
    }

    private sharedState: SharedState;

    async getLegalOfficers(): Promise<LegalOfficer[]> {
        return this.sharedState.directoryClient.getLegalOfficers();
    }

    async authenticate(addresses: string[], signer: RawSigner): Promise<AuthenticatedLogionClient> {
        const legalOfficers = await this.getLegalOfficers();
        const client = this.sharedState.componentFactory.buildAuthenticationClient(this.sharedState.config.directoryEndpoint, legalOfficers, this.sharedState.axiosFactory);
        const tokens = await client.authenticate(addresses, signer);
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers,
            tokens,
            currentAddress: addresses[0]
        });
    }

    async useTokens(tokens: AccountTokens): Promise<AuthenticatedLogionClient> {
        const legalOfficers = await this.sharedState.directoryClient.getLegalOfficers();
        return new AuthenticatedLogionClient({
            sharedState: this.sharedState,
            legalOfficers,
            tokens,
            currentAddress: tokens.addresses[0],
        });
    }
}

function getComponentFactory(config: LogionClientConfig): ComponentFactory {
    if("__componentFactory" in config) {
        return (config as any)["__componentFactory"];
    } else {
        return DefaultComponentFactory;
    }
}
