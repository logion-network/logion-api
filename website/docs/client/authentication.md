---
sidebar_position: 1
description: How to authenticate a Polkadot account to logion network.
---

# Authentication

## Authenticate with ad-hoc keyring

```typescript
import { LogionClient, KeyringSigner } from '@logion/client';
import { Keyring } from '@polkadot/api';

const keyring = new Keyring();
keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a"); // Alice
const signer = new KeyringSigner(keyring);

const client = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
});

// Authenticate Alice
const authenticatedClient = await client.authenticate([
    "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" ],
    signer
);
```
Now you can use authenticatedClient to interact with the network.

## Authenticate with Polkadot{.js}

In order to connect a webapp to logion-network, it is recommended to use [polkadot{.js} app](../extension/polkadot-js.md) extension.
