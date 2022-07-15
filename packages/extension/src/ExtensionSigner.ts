import { SignParameters, SignAndSendFunction, BaseSigner } from '@logion/client';
import { web3FromAddress } from '@polkadot/extension-dapp';

export class ExtensionSigner extends BaseSigner {

    async signToHex(signerId: string, message: string): Promise<string> {
        const extension = await web3FromAddress(signerId);
        if(!extension.signer.signRaw) {
            throw new Error("Web3 extension does not support bytes signing");
        }
        const result = await extension.signer.signRaw({
            address: signerId,
            type: "bytes",
            data: message
        });
        return result.signature;
    }

    async buildSignAndSendFunction(parameters: SignParameters): Promise<SignAndSendFunction> {
        const extension = await web3FromAddress(parameters.signerId);
        return statusCallback => parameters.submittable.signAndSend(parameters.signerId, {
            signer: extension.signer
        }, statusCallback);
    }
}
