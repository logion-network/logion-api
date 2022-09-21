# Logion Crossmint SDK

This project provides some utility classes enabling the use of the
[Crossmint wallet](https://github.com/Crossmint/embed)
with a [logion client](https://github.com/logion-network/logion-api/tree/main/packages/client#readme).

Note that only message signature is supported. So you will be able to authenticate and interact
with logion off-chain services, but not submit extrinsics to the logion chain.

## Usage

Install package `@logion/crossmint` with your favorite package manager and start siging content using the extension.

```typescript
import { CrossmintSigner } from '@logion/crossmint';

const crossmint = new CrossmintEVMWalletAdapter({
    apiKey: "YOUR_API_KEY",
    chain: BlockchainTypes.ETHEREUM, // Only Ethereum is supported for the moment
});
  
const address = await crossmint.connect();
if(!address) {
    throw new Error("Unable to connect to Crossmint");
}

const client = LogionClient.create(...);
const signer = new CrossmintSigner(crossmint);
let authenticatedClient = await client.authenticate([ address ], signer);
```
