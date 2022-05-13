# Logion Client SDK

This project provides a JS/TypeScript SDK enabling an application to interact with a logion network.

## Installation

Use your favorite package manager (e.g. yarn) and install package `@logion/client` in your JavaScript/TypeScript project.

## Usage

Below a TypeScript example:

```typescript
import { LogionClient } from '@logion/client';

const client = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
});

const authenticated = await client.authenticate([ "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" ], signer);

// Use authenticated to interact with the network
```
