# Logion MultiverX SDK

This project provides some utility classes enabling the use of the
[MultiversX wallet](hhttps://github.com/multiversx/mx-sdk-js-extension-provider)
with a [logion client](https://github.com/logion-network/logion-api/tree/main/packages/client#readme).

Note that only message signature is supported. So you will be able to authenticate and interact
with logion off-chain services, but not submit extrinsics to the logion chain.

## Usage

Install package `@logion/multiversx` with your favorite package manager and start siging content using the extension.

```typescript
import { MultiversxSigner } from '@logion/multiversx';

const signer = new MultiversxSigner();
const address = await signer.login();

const client = LogionClient.create(...);
const account = client.api.queries.getValidAccountId(address, "Bech32");

let authenticatedClient = await client.authenticate([ account ], signer);
```
