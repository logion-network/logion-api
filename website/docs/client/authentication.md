---
sidebar_position: 2
description: How to authenticate a Polkadot account to logion network.
---

# Authentication

Below example shows how to use an embedded signer in order to authenticate `client`. This approach is not recommended in production,
a [browser extension](/docs/category/extension) should be used instead.

```typescript
import { ValidAccountId } from '@logion/node-api';
import { Keyring } from '@polkadot/api';

const keyring = new Keyring();
const keypair = keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a"); // Alice
const accountId = ValidAccountId.polkadot(keypair.address);
const signer = new KeyringSigner(keyring);

// Authenticate Alice
let authenticatedClient = await client.authenticate(
    [ accountId ],
    signer
);

// Select current account (required if several accounts are authenticated)
authenticatedClient = authenticatedClient.withCurrentAccount(accountId);

// Later on, refresh the session (session's TTL is 1 hour)
authenticatedClient = await authenticatedClient.refreshTokens(DateTime.now());
```
