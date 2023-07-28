import { CollectionItem, LogionNodeApiClass, UUID } from "@logion/node-api";
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
    LegalOfficerClass,
    requireDefined,
} from "../src/index.js";
import { buildValidAccountId, mockCodecWithToBigInt, mockCodecWithToHex } from "./Utils.js";

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

    setupNodeApiMock(config: LogionClientConfig): Mock<LogionNodeApiClass> {
        const nodeApi = buildLogionNodeApiMock();
        this._componentFactory.setup(instance => instance.buildNodeApi(config.rpcEndpoints))
            .returns(Promise.resolve(nodeApi.object()));
        return nodeApi;
    }

    setupDirectoryClientMock(config: LogionClientConfig): Mock<DirectoryClient> {
        const directoryClient = new Mock<DirectoryClient>();
        this._componentFactory.setup(instance => instance.buildDirectoryClient(It.IsAny(), config.directoryEndpoint, It.IsAny()))
            .returns(directoryClient.object());
        return directoryClient;
    }

    setupAuthenticatedDirectoryClientMock(config: LogionClientConfig, token: string): Mock<DirectoryClient> {
        const directoryClient = new Mock<DirectoryClient>();
        this._componentFactory.setup(instance => instance.buildDirectoryClient(It.IsAny(), config.directoryEndpoint, It.IsAny(), token))
            .returns(directoryClient.object());
        return directoryClient;
    }

    setupAuthenticationClientMock(config: LogionClientConfig, legalOfficers: LegalOfficer[]): Mock<AuthenticationClient> {
        const authenticationClient = new Mock<AuthenticationClient>();
        this._componentFactory.setup(instance => instance.buildAuthenticationClient(
            It.IsAny(),
            config.directoryEndpoint,
            It.Is<LegalOfficerClass[]>(value => legalOfficers.map(lo => lo.address).every(item => value.map(lo => lo.address).includes(item))), It.IsAny()
        )).returns(authenticationClient.object());
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

export function buildLogionNodeApiMock(): Mock<LogionNodeApiClass> {
    const nodeApi = new Mock<LogionNodeApiClass>();
    nodeApi.setup(instance => instance.polkadot.isConnected).returns(true);

    nodeApi.setup(instance => instance.queries.getValidAccountId).returns((address, type) => requireDefined(buildValidAccountId(address, type)));
    nodeApi.setup(instance => instance.queries.isValidAccountId).returns(() => true);
    nodeApi.setup(instance => instance.adapters.toLocId).returns(uuid => mockCodecWithToBigInt(BigInt(uuid.toDecimalString())));
    nodeApi.setup(instance => instance.adapters.newTokensRecordFileVec).returns(_files => mockCodecWithToHex(""));
    nodeApi.setup(instance => instance.adapters.toPalletLogionLocLocLink).returns(_link => mockCodecWithToHex(""));
    nodeApi.setup(instance => instance.adapters.toH256).returns(hash => mockCodecWithToHex(hash.toHex()));
    nodeApi.setup(instance => instance.adapters.toCollectionItemToken).returns(_token => ({} as any));
    nodeApi.setup(instance => instance.adapters.toCollectionItemFile).returns(_file => ({} as any));
    nodeApi.setup(instance => instance.adapters.toTermsAndConditionsElement).returns(_element => ({} as any));

    return nodeApi;
}
