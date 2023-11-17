import { Hash } from "@logion/node-api";
import { requireDefined } from './assertions.js';
import { File, HashAndSize } from "./ComponentFactory.js";
import { MimeType } from "./Mime.js";

const HASH_OF_EMPTY = Hash.of("");

export interface FileDescription {
    name: string;
    hash: Hash;
    size: bigint;
    mimeType: MimeType;
}

export class HashOrContent {

    static fromDescription(description: FileDescription): HashOrContent {
        return new HashOrContent({ description });
    }

    static fromContent(content: File): HashOrContent {
        return new HashOrContent({ content });
    }

    static async fromContentFinalized(fileContent: File): Promise<HashOrContent> {
        const content = new HashOrContent({ content: fileContent });
        await content.finalize();
        return content;
    }

    constructor(parameters: { content?: File, description?: FileDescription }) {
        this._content = parameters.content;
        this.finalized = parameters.content === undefined;

        if(parameters.content) {
            this._name = parameters.content.name;
            this._mimeType = parameters.content.mimeType;
        } else if(parameters.description) {
            this._hash = parameters.description?.hash;
            this._name = parameters.description.name;
            this._mimeType = parameters.description.mimeType;
            this._size = parameters.description.size;
        } else {
            throw new Error("Either content or file description must be provided");
        }
    }

    private _hash?: Hash;

    private _content?: File;

    private finalized: boolean;

    private _size?: bigint;

    private _mimeType: MimeType;

    private _name: string;

    get hasContent() {
        return this._content !== undefined;
    }

    get contentHash(): Hash {
        this.ensureFinalized();
        return this._hash || HASH_OF_EMPTY;
    }

    private ensureFinalized() {
        if(!this.finalized) {
            throw new Error("Call finalize() first");
        }
    }

    async finalize() {
        if(!this.finalized && this.hasContent) {
            let hashAndSize;
            if(this._hash) {
                hashAndSize = await this.hashContent();
                if(!hashAndSize.hash.equalTo(this._hash)) {
                    throw new Error("Provided hash does not match content");
                }
            } else {
                hashAndSize = await this.hashContent();
            }
            this._hash = hashAndSize.hash;
            this._size = hashAndSize.size;
            this.finalized = true;
        }
    }

    private async hashContent(): Promise<HashAndSize> {
        return this.content.getHashAndSize();
    }

    get content() {
        return requireDefined(this._content, () => new Error("Not finalized"));
    }

    get size() {
        return requireDefined(this._size, () => new Error("Not finalized"));
    }

    get mimeType() {
        return this._mimeType;
    }

    get name() {
        return this._name;
    }
}

export class HashString {

    static fromValue(value: string): HashString {
        return new HashString(Hash.of(value), value);
    }

    constructor(hash: Hash, value?: string) {
        this.hash = hash;
        this.value = value;
    }

    readonly hash: Hash;
    readonly value?: string;

    private static isValidValue(hash: Hash, value?: string): value is string {
        return value !== undefined && Hash.of(value).equalTo(hash);
    }

    isValidValue(): boolean {
        return HashString.isValidValue(this.hash, this.value);
    }

    validValue(): string {
        if(HashString.isValidValue(this.hash, this.value)) {
            return this.value;
        } else {
            throw new Error("Invalid value");
        }
    }
}
