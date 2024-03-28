---
sidebar_position: 1
description: The basics about the Logion client.
---

# Introduction

Each Logion node runs

* a Substrate service for block production,
* IPFS/IPFS cluster services running a private IPFS network,
* a private database service,
* a logion off-chain service exposing a REST API.

In addition to the Logion nodes, a Logion network also includes

* RPC nodes for accessing the chain,
* a directory service exposing the identity data of the Logion Legal Officer.

Logion's client interacts with the Logion chain (throught RPC nodes), the REST API exposed by each node of the network and the directory.
The other services are publicly accessible.

The client's purpose is to merge data coming from the chain and the nodes
and expose a unified view. In order to access private data, the client has to be authenticated (see [here](./authentication.md)).

The client is able to run in several environments:

- a browser,
- a Node.JS application,
- a React Native based mobile app.

In function of the envrironment, the client will be instantiated differently (see below).

Another key concept is data caching. The client needs to interact with many data sources over the network. In order to
optimize the use of bandwith, data are cached and retrieved only when needed. The client relies on "states" to handle
the different caches. A state is an immutable object, when the developer calls a mutating method on the state, a new
state instance is returned and the previous state is discarded.

Examples of how to work with states are given further in the documentation, see for instance [here](../client/loc.md).

There are several Logion networks:

- DEV: the network used for testing new developments, very unstable, should not be used unless part of the Logion developers team.
- TEST: a stable sandbox network that can be leveraged by developers to test their own developments using the Logion platform.
- MVP: Logion's production environment. Be sure to test your developments first in TEST before interacting with MVP.

The network to connect to is chosen at client instantiation, see below for examples.

## Instantiate the client in the browser

```typescript
import { Environment } from "@logion/client";
import { newLogionClient } from '@logion/client-browser';

const client = await newLogionClient(Environment.TEST);
```

## Instantiate the client in a Node.JS application

```typescript
import { Environment } from "@logion/client";
import { newLogionClient } from '@logion/client-node';

const client = await newLogionClient(Environment.TEST);
```

## Instantiate the client in a React Native mobile app

The SDK currently supports 2 "frameworks":

- [Expo](https://expo.dev/)
- [React Native FS](https://github.com/itinance/react-native-fs)

For Expo:

```typescript
import { Environment } from "@logion/client";
import { newLogionClient } from '@logion/client-expo';

const client = await newLogionClient(Environment.TEST);
```

For React Native FS:

```typescript
import { Environment } from "@logion/client";
import { newLogionClient } from '@logion/client-react-native-fs';

const client = await newLogionClient(Environment.TEST);
```

Make sure to check the README of both packages for further instructions about how to
integrate the Logion SDK in those environments.
