import { Hash as Hasher } from 'fast-sha256';
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

export async function newLogionClient(env: Environment | EnvironmentString): Promise<LogionClient> {
    return await LogionClient.create(createConfig(env, () => new BrowserAxiosFileUploader()))
}

export class BrowserFile extends File {

    constructor(file: Blob, name: string) {
        super(name, MimeType.from(file.type));
        this.file = file;
    }

    private file: Blob;

    async getHashAndSize(): Promise<HashAndSize> {
        const unknownStream: any = this.file.stream(); // eslint-disable-line @typescript-eslint/no-explicit-any
        const reader = unknownStream.getReader();
        const digest = new Hasher();
        let size = 0n;
        let chunk: {done: boolean, value: Buffer} = await reader.read();
        while(!chunk.done) {
            size = size + BigInt(chunk.value.length);
            digest.update(chunk.value);
            chunk = await reader.read();
        }
        return {
            hash: Hash.fromDigest(digest),
            size,
        };
    }

    getBlob(): Blob {
        return this.file;
    }
}

export class BrowserAxiosFileUploader extends AxiosFileUploader {

    override buildFormData(): FormDataLike {
        return new FormData();
    }

    override toFormDataValue(file: File): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
        if(file instanceof BrowserFile) {
            return Promise.resolve(file.getBlob());
        } else {
            return Promise.reject(new Error("Unsupported file type"));
        }
    }
}
