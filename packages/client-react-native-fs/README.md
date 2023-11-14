# Logion Client SDK (React Native FS)

This project provides a JS/TypeScript SDK enabling a React Native application
using [react-native-fs](https://github.com/itinance/react-native-fs)
to interact with a logion network.

## Installation

Use your favorite package manager (e.g. yarn) and install package `@logion/client-react-native-fs` in your React Native project.

## Usage

This module provides `ReactNativeFsFile` and `ReactNativeFileUploader` classes.

An instance of `ReactNativeFileUploader` (use the zero-argument constructor) must be provided to `LogionClient.create(...)`.

`ReactNativeFsFile` instances (the constructor takes takes a single string argument, the path) must be passed to SDK whenever needed.

See [core client](../client/README.md).
