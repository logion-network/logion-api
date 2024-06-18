import { LogionNodeApiClass } from "@logion/node-api";
import { IMock, IPresetBuilder, It, Mock, Times } from "moq.ts";
import { IExpression } from "moq.ts/lib/reflector/expression-reflector";
import {
    AuthenticationClient,
    AxiosFactory,
    ComponentFactory,
    LegalOfficerClient,
    LogionClientConfig,
    LegalOfficer,
    LegalOfficerClass,
    requireDefined,
    CoreComponentFactoryInstance,
    FileUploader,
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
        this._componentFactory.setup(instance => instance.buildAxiosFactory).returns(CoreComponentFactoryInstance.buildAxiosFactory);
    }

    setupDefaultNetworkState() {
        this._componentFactory.setup(instance => instance.buildNetworkState).returns(CoreComponentFactoryInstance.buildNetworkState);
    }

    setupNodeApiMock(config: LogionClientConfig): Mock<LogionNodeApiClass> {
        const nodeApi = buildLogionNodeApiMock();
        this._componentFactory.setup(instance => instance.buildNodeApi(config.rpcEndpoints))
            .returns(Promise.resolve(nodeApi.object()));
        return nodeApi;
    }

    setupLegalOfficerClientMock(): Mock<LegalOfficerClient> {
        const legalOfficerClient = new Mock<LegalOfficerClient>();
        this._componentFactory.setup(instance => instance.buildLegalOfficerClient(It.IsAny(), It.IsAny()))
            .returns(legalOfficerClient.object());
        return legalOfficerClient;
    }

    setupAuthenticatedLegalOfficerClientMock(token: string): Mock<LegalOfficerClient> {
        const legalOfficerClient = new Mock<LegalOfficerClient>();
        this._componentFactory.setup(instance => instance.buildLegalOfficerClient(It.IsAny(), It.IsAny(), token))
            .returns(legalOfficerClient.object());
        return legalOfficerClient;
    }

    setupAuthenticationClientMock(legalOfficers: LegalOfficer[]): Mock<AuthenticationClient> {
        const authenticationClient = new Mock<AuthenticationClient>();
        this._componentFactory.setup(instance => instance.buildAuthenticationClient(
            It.IsAny(),
            It.Is<LegalOfficerClass[]>(value => legalOfficers.map(lo => lo.account).every(item => value.map(lo => lo.account.address).includes(item.address)))
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

    setupFileUploaderMock(): Mock<FileUploader> {
        const uploader = new Mock<FileUploader>();
        uploader.setup(instance => instance.upload(It.IsAny())).returns(Promise.resolve());
        this._componentFactory.setup(instance => instance.buildFileUploader()).returns(uploader.object());
        return uploader;
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
    nodeApi.setup(instance => instance.adapters.toPalletLogionLocLocLinkParams).returns(_link => mockCodecWithToHex(""));
    nodeApi.setup(instance => instance.adapters.toH256).returns(hash => mockCodecWithToHex(hash.toHex()));
    nodeApi.setup(instance => instance.adapters.toCollectionItemToken).returns(_token => ({} as any));
    nodeApi.setup(instance => instance.adapters.toCollectionItemFile).returns(_file => ({} as any));
    nodeApi.setup(instance => instance.adapters.toTermsAndConditionsElement).returns(_element => ({} as any));
    nodeApi.setup(instance => instance.batching.batchAll).returns((submittables: any[]) => submittables[0]);

    return nodeApi;
}
