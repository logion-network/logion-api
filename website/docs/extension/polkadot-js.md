---
sidebar_position: 1
---

# Polkadot

![Polkadot extension](/img/polkadot.png)

This project provides some utility classes enabling the use of the
[Polkadot JS extension](https://github.com/polkadot-js/extension#readme)
or other compatible extensions (e.g. [SubWallet](https://www.subwallet.app/))
with the [Logion client](/docs/category/client).

## Usage

Start signing content using the extension.

```typescript
import { getAccounts, ExtensionSigner } from '@logion/extension';
import { ValidAccountId } from "@logion/node-api";

const signer = new ExtensionSigner();
const injectedAccounts = await getAccounts(
    "Your app name",
    [ "polkadot-js", "subwallet-js" ], // A list of extensions
);
const addresses = injectedAccounts.map(account => ValidAccountId.polkadot(account.address));
const authenticated = await client.authenticate(addresses, signer);

// Pass `signer` as an argument when needed
```

:::info
If several accounts are available in the listed extensions, the call to `authenticate`
will require a signature for each one of them.
:::
