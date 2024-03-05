# Logion Client SDK (Expo)

This project provides a JS/TypeScript SDK enabling an [Expo](https://expo.dev)
application to interact with a logion network.

## Installation

Use your favorite package manager (e.g. yarn) and add `@logion/client` and `@logion/client-expo` packages to your project.
you will also need to install some peer dependencies: `buffer`, `expo-file-system` and `expo-crypto`.

You may have to setup `buffer` by adding the following line as soon as possible in your code:

```js
global.Buffer = Buffer;
```

## Usage

Instantiate the Logion client using `newLogionClient` function. For example, to connect to our test environment use:

```typescript
import { Environment } from "@logion/client";
import { newLogionClient } from '@logion/client-expo';

const client = await newLogionClient(Environment.TEST);
```

See [here](../client/README.md) for instructions about how to use the client.

Each time you need to pass a file to the client (e.g. when creating a collection item or a tokens record),
pass an instance of `ExpoFile`. The constructor expects 3 arguments:

- the [URI](https://docs.expo.dev/versions/latest/sdk/filesystem/#api) of the file,
- its name (e.g. `my-document.pdf`),
- its MIME type (e.g. `application/pdf`).

Here is an example:

```typescript
// ...
import { MimeType } from "@logion/client";
import { ExpoFile } from '@logion/client-expo';
// ...

const fileName = "file.txt";
const file = new ExpoFile(`${FileSystem.cacheDirectory}/${fileName}`, fileName, MimeType.from("text/plain"));
```
