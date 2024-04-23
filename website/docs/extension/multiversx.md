---
sidebar_position: 4
---

# MultiversX

![MultiversX](/img/multiversx.png)

This project provides some utility classes enabling the use of
[MultiversX wallet](hhttps://github.com/multiversx/mx-sdk-js-extension-provider)
with the [Logion client](/docs/category/client).

Note that only message signature is supported. So you will be able to authenticate and interact
with logion off-chain services, but not submit extrinsics to the logion chain.

## Usage

Install package `@logion/multiversx` with your favorite package manager and start signing content using the extension.

```typescript
import { MultiversxSigner } from '@logion/multiversx';

const signer = new MultiversxSigner();
const address = await signer.login();

const account = ValidAccountId.bech32(address);

let authenticatedClient = await client.authenticate([ account ], signer);
```
