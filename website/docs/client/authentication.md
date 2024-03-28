---
sidebar_position: 2
description: How to authenticate a Polkadot account to logion network.
---

# Authentication

Below example shows how to use an embedded signer in order to authenticate `client`. This approach is not recommended in production,
a [browser extension](/docs/category/extension) should be used instead.

```typescript
import { Keyring } from '@polkadot/api';

const keyring = new Keyring();
const keypair = keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a"); // Alice
const signer = new KeyringSigner(keyring);

// Authenticate Alice
let authenticatedClient = await client.authenticate(
    [ keypair.address ],
    signer
);

// Later on, refresh the session (session's TTL is 1 hour)
authenticatedClient = await authenticatedClient.refreshTokens(DateTime.now());
```
