import {
    AxiosFileUploader,
    createLogionClientConfig as createConfig,
    Environment,
    EnvironmentString,
    File,
    FormDataLike,
    HashAndSize,
    LogionClient,
    MimeType,
} from "@logion/client";
import { Hash } from "@logion/node-api";
import { Hash as Hasher } from 'fast-sha256';
import FormData from "form-data";
import fs from "fs";
import { Readable } from "stream";


export async function newLogionClient(env: Environment | EnvironmentString): Promise<LogionClient> {
    return await LogionClient.create(createConfig(env, () => new NodeAxiosFileUploader()))
}

export abstract class NodeStreamFile extends File {

    getHashAndSize(): Promise<HashAndSize> {
        const stream = this.getStream();
        return new Promise<HashAndSize>((resolve, reject) => {
            const digest = new Hasher();
            let size = 0n;
            stream.on("data", (data: Uint8Array) => {
                size = size + BigInt(data.length);
                digest.update(data);
            });
            stream.on("end", () =>
                resolve({
                    hash: Hash.fromDigest(digest),
                    size,
                }),
            );
            stream.on("error", reject);
        });
    }

    abstract getStream(): NodeJS.ReadableStream;
}

export class NodeFile extends NodeStreamFile {

    constructor(path: string, name: string, mimeType: MimeType) {
        super(name, mimeType);
        this.path = path;
    }

    private path: string;

    getStream(): NodeJS.ReadableStream {
        return fs.createReadStream(this.path);
    }
}

export class NodeBufferFile extends NodeStreamFile {

    constructor(content: Buffer, name: string, mimeType: MimeType) {
        super(name, mimeType);
        this.content = content;
    }

    private content: Buffer;

    getStream(): NodeJS.ReadableStream {
        return Readable.from(this.content);
    }
}

export function hashBuffer(buffer: Buffer): Hash {
    const digest = new Hasher();
    digest.update(buffer);
    return Hash.fromDigest(digest);
}

export class NodeAxiosFileUploader extends AxiosFileUploader {

    override buildFormData(): FormDataLike {
        return new FormData();
    }

    override toFormDataValue(file: File): Promise<NodeJS.ReadableStream> {
        if (file instanceof NodeStreamFile) {
            return Promise.resolve(file.getStream());
        } else {
            return Promise.reject(new Error("Unsupported file type"));
        }
    }
}
