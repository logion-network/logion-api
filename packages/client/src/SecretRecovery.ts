import { SharedState } from "./SharedClient.js";
import { CreateSecretRecoveryRequest, SecretRecoveryClient } from "./SecretRecoveryClient.js";

export class SecretRecoveryApi {

    constructor(args: { sharedState: SharedState }) {
        this.client = new SecretRecoveryClient(args);
    }

    private readonly client: SecretRecoveryClient;

    async createSecretRecoveryRequest(params: CreateSecretRecoveryRequest): Promise<void> {
        await this.client.createSecretRecoveryRequest(params);
    }
}
