---
sidebar_position: 1
---

# Intro

## Install

Install package [`@logion/extension`](https://www.npmjs.com/package/@logion/extension) with your favorite package manager (recommended).
Note that the extension embeds the [`@logion/client`](https://www.npmjs.com/package/@logion/client).

Alternatively if you don't want to use a Polkadot{.js} and provide your own keyring instead, you can directly use
[`@logion/client`](https://www.npmjs.com/package/@logion/client)


## Architecture

The logion-sdk allows you to create a Typescript application that interacts with the logion network.
Each logion node runs

* a Substrate service,
* IPFS/IPFS cluster services,
* a private database service,
* a logion off-chain service.

![Architecture](/img/architecture.png)
