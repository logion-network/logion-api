import {
    Environment,
    EnvironmentString,
    createLogionClientConfig,
    FileUploader
} from "../src/index.js";
import { Mock } from 'moq.ts';

describe("Environment", () => {

    const fileUploader = new Mock<FileUploader>().object();

    it("creates config from environment", () => {
        const config = createLogionClientConfig(Environment.TEST, () => fileUploader);
        expect(config.directoryEndpoint).toEqual("https://test-directory.logion.network");
        expect(config.rpcEndpoints).toEqual([ "wss://test-para-rpc01.logion.network" ]);
    })

    it("creates config from environment string", () => {
        const config = createLogionClientConfig("TEST", () => fileUploader);
        expect(config.directoryEndpoint).toEqual("https://test-directory.logion.network");
        expect(config.rpcEndpoints).toEqual([ "wss://test-para-rpc01.logion.network" ]);
    })

    it("fails to create config from unknown environment", () => {
        expect(() => createLogionClientConfig("Unknown" as EnvironmentString, () => fileUploader))
            .toThrowError("Invalid environment: [Unknown]");
    })
})
