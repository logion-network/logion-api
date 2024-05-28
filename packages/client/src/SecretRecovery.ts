import { SharedState } from "./SharedClient.js";
import { CreateSecretRecoveryRequest, DownloadSecretRequest, SecretRecoveryClient } from "./SecretRecoveryClient.js";

export class SecretRecoveryApi {

    constructor(args: { sharedState: SharedState }) {
        this.client = new SecretRecoveryClient(args);
    }

    private readonly client: SecretRecoveryClient;

    async createSecretRecoveryRequest(params: CreateSecretRecoveryRequest): Promise<string> {
        return this.client.createSecretRecoveryRequest(params);
    }

    async downloadSecret(params: DownloadSecretRequest): Promise<string> {
        return await this.client.downloadSecret(params);
    }
}
