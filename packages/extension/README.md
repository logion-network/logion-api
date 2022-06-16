# Logion Extension SDK

This project provides some utility classes enabling the use the
[Polkadot JS extension](https://github.com/polkadot-js/extension#readme)
with a [logion client](https://github.com/logion-network/logion-api/tree/main/packages/client#readme).

## Usage

Install package `@logion/extension` with your favorite package manager and start siging content using the extension.

```typescript
import { enableExtensions, ExtensionSigner } from '@logion/extension';

const client = LogionClient.create(...); // Create your logion client

const register = await enableExtensions("Your app name");
const signer = new ExtensionSigner();
register((accounts: InjectedAccount[]) => {
    const addresses = accounts.map(account => account.address);
    const authenticated = await client.authenticate(addresses, signer); // This will enable authentication by signing with the extension
    // Use authenticated to use logion features
});
```
