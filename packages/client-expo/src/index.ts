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
import * as Crypto from 'expo-crypto';
import * as FileSystem from "expo-file-system";

export async function newLogionClient(env: Environment | EnvironmentString): Promise<LogionClient> {
    return await LogionClient.create(createConfig(env, () => new ExpoFileUploader()))
}

export class ExpoFile extends File {

    constructor(uri: string, name: string, mimeType: MimeType) {
        super(name, mimeType);
        this.uri = uri;
    }

    private uri: string;

    async getHashAndSize(): Promise<HashAndSize> {
        const fileInfo = await FileSystem.getInfoAsync(this.uri);
        if(!fileInfo.exists) {
            throw new Error("File does not exist");
        } else {
            const base64Data = await FileSystem.readAsStringAsync(this.uri, { encoding: FileSystem.EncodingType.Base64 });
            const binaryData = Buffer.from(base64Data, 'base64');
            const hash = await Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, binaryData);
            return {
                size: BigInt(fileInfo.size),
                hash: new Hash(new Uint8Array(hash)),
            };
        }
    }

    getPath(): string {
        return this.uri;
    }
}

export class ExpoFileUploader extends AxiosFileUploader {

    buildFormData(): FormDataLike {
        return new FormData();
    }

    async toFormDataValue(file: File): Promise<{ uri: string, type: string, name: string }> {
        const reactNativeFile = this.ensureExpo(file);
        return {
            uri: `file://${ reactNativeFile.getPath() }`,
            type: file.mimeType.mimeType,
            name: file.name,
        };
    }

    private ensureExpo(file: File): ExpoFile {
        if(file instanceof ExpoFile) {
            return file;
        } else {
            throw new Error("Unexpected file type");
        }
    }
}
