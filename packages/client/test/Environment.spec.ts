import {
    Environment,
    validEnvironmentOrThrow,
    EnvironmentString,
    createLogionClientConfig,
    FileUploader
} from "../src/index.js";
import { Mock } from 'moq.ts';

describe("Environment", () => {

    it("determines env from string", () => {
        const envAsString = 'DEV';
        expect(validEnvironmentOrThrow(envAsString as EnvironmentString))
            .toBe(Environment.DEV);
    })

    it("fails to determine env from invalid string", () => {
        const envAsString = 'Unknown';
        expect(() => validEnvironmentOrThrow(envAsString as EnvironmentString))
            .toThrowError("Invalid environment: [Unknown]");
    })

    it("creates config from environment", () => {
        const fileUploader = new Mock<FileUploader>().object();
        const config = createLogionClientConfig(Environment.TEST, () => fileUploader);
        expect(config.directoryEndpoint).toEqual("https://test-directory.logion.network");
        expect(config.rpcEndpoints).toEqual([ "wss://test-rpc01.logion.network" ]);
    })
})
