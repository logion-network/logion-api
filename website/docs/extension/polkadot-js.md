---
sidebar_position: 1
---

# polkadot{.js}

![polkadot{.js} extension](/img/polkadot.png)

This project provides some utility classes enabling the use the
[Polkadot JS extension](https://github.com/polkadot-js/extension#readme)
with a [logion client](/docs/category/client).

## Usage

Start signing content using the extension.

```typescript
import { enableExtensions, ExtensionSigner } from '@logion/extension';

const client = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
});

const register = await enableExtensions("Your app name");
const signer = new ExtensionSigner();
register(async (accounts: InjectedAccount[]) => {
    const addresses = accounts.map(account => account.address);
    const authenticated = await client.authenticate(addresses, signer); // This will enable authentication by signing with the extension
});
```

You can now use authenticated to use logion features.

