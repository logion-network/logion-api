import {
    AxiosFileUploader,
    createLogionClientConfig as createConfig,
    Environment,
    File,
    FormDataLike,
    HashAndSize,
    LogionClientConfig,
    MimeType,
} from "@logion/client";
import { Hash } from "@logion/node-api";
import { Hash as Hasher } from 'fast-sha256';
import FormData from "form-data";
import fs from "fs";

export function createLogionClientConfig(env: Environment): LogionClientConfig {
    return createConfig(env, () => new NodeAxiosFileUploader())
}

export class NodeFile extends File {

    constructor(path: string, name: string, mimeType: MimeType) {
        super(name, mimeType);
        this.path = path;
    }

    private path: string;

    async getHashAndSize(): Promise<HashAndSize> {
        const stream = this.getStream();
        return new Promise<HashAndSize>((resolve, reject) => {
            const digest = new Hasher();
            let size = 0n;
            stream.on("data", data => {
                size = size + BigInt(data.length);
                digest.update(data);
            });
            stream.on("end", () => resolve({
                hash: Hash.fromDigest(digest),
                size
            }));
            stream.on("error", reject);
        });
    }

    getStream(): NodeJS.ReadableStream {
        return fs.createReadStream(this.path);
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

    override toFormDataValue(file: File): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
        if(file instanceof NodeFile) {
            return Promise.resolve(file.getStream());
        } else {
            return Promise.reject(new Error("Unsupported file type"));
        }
    }
}
