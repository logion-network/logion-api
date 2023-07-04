import { BaseSigner, SignAndSendFunction, TypedSignature } from "@logion/client";
import { ValidAccountId } from "@logion/node-api";
import { SignableMessage } from "@multiversx/sdk-core";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";

export class MultiversxSigner extends BaseSigner {

    constructor() {
        super();
        this.provider = ExtensionProvider.getInstance();
    }

    private readonly provider: ExtensionProvider;

    async login(): Promise<string> {
        if (await this.provider.init()) {
            return await this.provider.login();
        } else {
            throw new Error("No MultiversX account available");
        }
    }

    async signToHex(_signerId: ValidAccountId, message: string): Promise<TypedSignature> {
        const signableMessage = new SignableMessage({
            message: Buffer.from(message.substring(2), "hex")
        });
        const signedMessage = await this.provider.signMessage(signableMessage);
        const signature = '0x' + signedMessage.getSignature().toString('hex');
        return { signature, type: "MULTIVERSX" }
    }

    buildSignAndSendFunction(): Promise<SignAndSendFunction> {
        throw new Error("Cannot sign and send extrinsics with MultiversX signer");
    }

}
