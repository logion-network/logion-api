import { SignParameters, SignAndSendFunction, BaseSigner, TypedSignature, SignatureType, SignAndSendStrategy } from '@logion/client';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { META_MASK_NAME } from "./Extension";

export class ExtensionSigner extends BaseSigner {

    constructor(signAndSendStrategy?: SignAndSendStrategy) {
        super(signAndSendStrategy);
    }

    async signToHex(signerId: string, message: string): Promise<TypedSignature> {
        const extension = await web3FromAddress(signerId);
        if(!extension.signer.signRaw) {
            throw new Error("Web3 extension does not support bytes signing");
        }
        const result = await extension.signer.signRaw({
            address: signerId,
            type: "bytes",
            data: message
        });
        const type: SignatureType = extension.name === META_MASK_NAME ? "ETHEREUM" : "POLKADOT"
        return { signature: result.signature, type };
    }

    async buildSignAndSendFunction(parameters: SignParameters): Promise<SignAndSendFunction> {
        const extension = await web3FromAddress(parameters.signerId);
        return statusCallback => parameters.submittable.signAndSend(parameters.signerId, {
            signer: extension.signer
        }, statusCallback);
    }
}
