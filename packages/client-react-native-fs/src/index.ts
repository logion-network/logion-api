import {
    AxiosFileUploader,
    createLogionClientConfig,
    Environment,
    File,
    FormDataLike,
    HashAndSize,
    LogionClientConfig,
    MimeType,
} from "@logion/client";
import { Hash } from "@logion/node-api";
import RNFS from "react-native-fs";

const buildFileUploader = () => new ReactNativeFileUploader();

export const DEV: LogionClientConfig = createLogionClientConfig(Environment.DEV, buildFileUploader);
export const TEST: LogionClientConfig = createLogionClientConfig(Environment.TEST, buildFileUploader);
export const MVP: LogionClientConfig = createLogionClientConfig(Environment.MVP, buildFileUploader);

export class ReactNativeFsFile extends File {

    constructor(path: string, name: string, mimeType: MimeType) {
        super(name, mimeType);
        this.path = path;
    }

    private path: string;

    async getHashAndSize(): Promise<HashAndSize> {
        const stat = await RNFS.stat(this.path);
        const hash = await RNFS.hash(this.path, "sha256");
        return {
            size: BigInt(stat.size),
            hash: Hash.fromHex(`0x${ hash }`),
        };
    }

    getPath(): string {
        return this.path;
    }
}

export class ReactNativeFileUploader extends AxiosFileUploader {

    buildFormData(): FormDataLike {
        return new FormData();
    }

    async toFormDataValue(file: File): Promise<{ uri: string, type: string, name: string }> {
        const reactNativeFile = this.ensureReactNativeFile(file);
        return {
            uri: `file://${ reactNativeFile.getPath() }`,
            type: file.mimeType.mimeType,
            name: file.name,
        };
    }

    private ensureReactNativeFile(file: File): ReactNativeFsFile {
        if(file instanceof ReactNativeFsFile) {
            return file;
        } else {
            throw new Error("Unexpected file type");
        }
    }
}
