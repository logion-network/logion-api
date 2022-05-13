import { buildMessage, FullSigner, signerCallback, SignParameters, SignRawParameters } from '@logion/client/dist/Signer';
import { web3FromAddress } from '@polkadot/extension-dapp';

export class ExtensionSigner implements FullSigner {

    async signRaw(parameters: SignRawParameters): Promise<string> {
        const extension = await web3FromAddress(parameters.signerId);
        const message = buildMessage(parameters);
        const result = await extension.signer.signRaw!({
            address: parameters.signerId,
            type: "bytes",
            data: message
        });
        return result.signature;
    }

    async signAndSend(parameters: SignParameters): Promise<void> {
        const extension = await web3FromAddress(parameters.signerId);
        const registry = parameters.submittable.registry;
        const next = parameters.callback;
        return new Promise(async (resolve, reject) => {
            try {
                const unsub = await parameters.submittable.signAndSend(parameters.signerId, {
                    signer: extension.signer
                }, (result) => {
                    signerCallback({
                        result,
                        unsub,
                        reject,
                        resolve,
                        registry,
                        next,
                    })
                  });
              } catch(e) {
                reject(e);
              }
        });
    }
}
