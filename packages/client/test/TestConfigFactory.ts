import { IMock, IPresetBuilder, Mock, Times } from "moq.ts";
import { IExpression } from "moq.ts/lib/reflector/expression-reflector";

import { ComponentFactory, DefaultComponentFactory } from "../src/ComponentFactory";
import { LogionClientConfig } from "../src/SharedClient";

export class TestConfigFactory {

    constructor() {
        this._componentFactory = new Mock<ComponentFactory>();
    }

    private _componentFactory: Mock<ComponentFactory>;

    setupDefaultAxiosInstanceFactory() {
        this._componentFactory.setup(instance => instance.buildAxiosFactory).returns(DefaultComponentFactory.buildAxiosFactory);
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
}
