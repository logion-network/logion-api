---
sidebar_position: 2
---

# MetaMask

![metamask](/img/metamask.png)

Allows to sign a message with an ethereum account using [MetaMask](https://metamask.io/) browser extension (for [chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) or [firefox](https://addons.mozilla.org/firefox/addon/ether-metamask/)).

:::warning
In order to authenticate, `eth_sign` requests must be enabled in MetaMask in advanced settings.
This is considered a dangerous feature as it enables an attacker to make you sign almost anything.
:::

## List all available accounts

```typescript
import { enableMetaMask, allMetamaskAccounts } from "@logion/extension";

if(await enableMetaMask("MyLogionWebApp")) {
    const accounts = await allMetamaskAccounts();
    const authenticated = await client.authenticate(addresses, signer);
    ...
}
```

:::info
If several accounts are available, the call to `authenticate`
will require a signature for each one of them.
:::
