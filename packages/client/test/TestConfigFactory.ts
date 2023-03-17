import { LogionNodeApi } from "@logion/node-api";
import FormData from "form-data";
import { IMock, IPresetBuilder, It, Mock, Times } from "moq.ts";
import { IExpression } from "moq.ts/lib/reflector/expression-reflector";
import {
    AuthenticationClient,
    AxiosFactory,
    ComponentFactory,
    DefaultComponentFactory,
    DirectoryClient,
    LogionClientConfig,
    LegalOfficer,
    LegalOfficerClass
} from "../src/index.js";

export class TestConfigFactory {

    constructor() {
        this._componentFactory = new Mock<ComponentFactory>();
    }

    private _componentFactory: Mock<ComponentFactory>;

    get componentFactory() {
        return this._componentFactory.object();
    }

    setupDefaultAxiosInstanceFactory() {
        this._componentFactory.setup(instance => instance.buildAxiosFactory).returns(DefaultComponentFactory.buildAxiosFactory);
    }

    setupDefaultNetworkState() {
        this._componentFactory.setup(instance => instance.buildNetworkState).returns(DefaultComponentFactory.buildNetworkState);
    }

    setupNodeApiMock(config: LogionClientConfig): Mock<LogionNodeApi> {
        const nodeApi = new Mock<LogionNodeApi>();
        nodeApi.setup(instance => instance.isConnected).returns(true);
        this._componentFactory.setup(instance => instance.buildNodeApi(config.rpcEndpoints))
            .returns(Promise.resolve(nodeApi.object()));
        return nodeApi;
    }

    setupDirectoryClientMock(config: LogionClientConfig): Mock<DirectoryClient> {
        const directoryClient = new Mock<DirectoryClient>();
        this._componentFactory.setup(instance => instance.buildDirectoryClient(config.directoryEndpoint, It.IsAny()))
            .returns(directoryClient.object());
        return directoryClient;
    }

    setupAuthenticatedDirectoryClientMock(config: LogionClientConfig, token: string): Mock<DirectoryClient> {
        const directoryClient = new Mock<DirectoryClient>();
        this._componentFactory.setup(instance => instance.buildDirectoryClient(config.directoryEndpoint, It.IsAny(), token))
            .returns(directoryClient.object());
        return directoryClient;
    }

    setupAuthenticationClientMock(config: LogionClientConfig, legalOfficers: LegalOfficer[]): Mock<AuthenticationClient> {
        const authenticationClient = new Mock<AuthenticationClient>();
        this._componentFactory.setup(instance => instance.buildAuthenticationClient(config.directoryEndpoint,
                It.Is<LegalOfficerClass[]>(value => legalOfficers.map(lo => lo.address).every(item => value.map(lo => lo.address).includes(item))), It.IsAny()))
            .returns(authenticationClient.object());
        return authenticationClient;
    }

    setupAxiosFactoryMock(): Mock<AxiosFactory> {
        const factory = new Mock<AxiosFactory>();
        this._componentFactory.setup(instance => instance.buildAxiosFactory()).returns(factory.object());
        return factory;
    }

    setupComponentFactory<E extends IExpression<ComponentFactory>, R = E extends (...args: any[]) => infer M ? M : any>(expression: E): IPresetBuilder<ComponentFactory, R> {
        return this._componentFactory.setup(expression);
    }

    buildTestConfig(config: LogionClientConfig): LogionClientConfig {
        const testConfig = {
            ...config,
            __componentFactory: this._componentFactory.object(),
        };
        return testConfig;
    }

    verifyComponentFactory<E extends IExpression<ComponentFactory>>(expression: E, times?: Times): IMock<ComponentFactory> {
        return this._componentFactory.verify(expression, times);
    }

    setupDefaultFormDataFactory() {
        this._componentFactory.setup(instance => instance.buildFormData()).returns(new FormData());
    }

    buildLegalOfficerClasses(legalOfficers: LegalOfficer[]) {
        return legalOfficers.map(legalOfficer => new LegalOfficerClass({
            legalOfficer,
            axiosFactory: this._componentFactory.object().buildAxiosFactory(),
        }));
    }
}
