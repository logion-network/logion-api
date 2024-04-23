# Logion Client SDK (node)

This project provides a JS/TypeScript SDK enabling an application running in a Node.js environment, to interact with a logion network.

## Installation

Use your favorite package manager (e.g. yarn) and install package `@logion/client-node` in your JavaScript/TypeScript project.

## Usage

See [documentation](https://logion-network.github.io/logion-api/).

## Integration tests

### Pre-requisites

Below steps must be executed only if you did not yet create the `logion-test` network.

- Create `logion-test` network: `docker network create logion-test`
- Get network's gateway IP address: `docker network inspect logion-test | jq '.[0].IPAM.Config[0].Gateway'`
- Set `RPC_WS` variable in `.env` file (see `.env.sample` for an example) with the above IP address

### Running the tests

- Start the Logion chain locally (see [here](https://github.com/logion-network/logion-collator/?tab=readme-ov-file#test-locally))
- In another terminal, run the tests: `yarn integration-test`
- Stop Zombienet
