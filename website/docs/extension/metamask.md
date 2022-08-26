---
sidebar_position: 2
---

# metamask

![metamask](/img/metamask.png)

Allows to sign a message with an ethereum account using [MetaMask](https://metamask.io/) browser extension (for [chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) or [firefox](https://addons.mozilla.org/firefox/addon/ether-metamask/))).


## List all available accounts

```typescript
import { enableMetaMask, allMetamaskAccounts } from "@logion/extension";

const enabled = await enableMetaMask("MyLogionWebApp")

const accounts = await allMetamaskAccounts();
accounts.forEach(account => console.log("Detected MetaMask accounts: %s", account.address));
```

## Authenticate the selected account 
The selected account can be [authenticated](/docs/client/authentication.md):

```typescript
const authenticatedClient = await client.authenticate([ accounts[0].address ], signer);
```

## Use JWT token

Once authenticated, the returned JWT token can be used (for instance to claim an asset linked to your ethereum account):

```typescript
const jwtToken = authenticatedClient.tokens.get(address);
```

