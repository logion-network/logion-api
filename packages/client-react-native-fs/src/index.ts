import { File, FileUploadParameters, FileUploader, HashAndSize } from "@logion/client";
import { Hash } from "@logion/node-api";
import RNFS from "react-native-fs";

export class ReactNativeFsFile extends File {

    constructor(path: string) {
        super();
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

export class ReactNativeFileUploader implements FileUploader {

    async upload(parameters: FileUploadParameters): Promise<void> {
        const files: RNFS.UploadFileItem[] = parameters.files.map(file => ({
            name: file.field,
            filename: file.name,
            filepath: this.getFilePath(file.file),
            filetype: undefined as unknown as string,
        }));
        const fields: Record<string, string> = {};
        parameters.fields.forEach(field => fields[field.name] = field.value);
        const result = await RNFS.uploadFiles({
            files,
            toUrl: parameters.endpoint,
            fields,
            headers: parameters.headers,
        }).promise;
        if(result.statusCode < 200 || result.statusCode >= 300) {
            throw new Error(`Upload failed with error ${ result.statusCode }`);
        }
    }

    private getFilePath(file: File): string {
        if(file instanceof ReactNativeFsFile) {
            return file.getPath();
        } else {
            throw new Error("Unexpected file type");
        }
    }
}
