import { Hash } from 'fast-sha256';
import { FileLike } from './ComponentFactory';

export function hashString(data: string): string {
    const digest = new Hash();
    const bytes = new TextEncoder().encode(data);
    digest.update(bytes);
    return digestToHex(digest);
}

function digestToHex(digest: Hash): string {
    return '0x' + Buffer.from(digest.digest()).toString('hex');
}

export interface HashAndSize {
    hash: string;
    size: bigint;
}

export async function hashBlob(file: Blob): Promise<HashAndSize> {
    const unknownStream: any = file.stream(); // eslint-disable-line @typescript-eslint/no-explicit-any
    const reader = unknownStream.getReader();
    const digest = new Hash();
    let size = 0n;
    let chunk: {done: boolean, value: Buffer} = await reader.read();
    while(!chunk.done) {
        size = size + BigInt(chunk.value.length);
        digest.update(chunk.value);
        chunk = await reader.read();
    }
    return {
        hash: digestToHex(digest),
        size,
    };
}

export function hashBuffer(buffer: Buffer): string {
    const digest = new Hash();
    digest.update(buffer);
    return digestToHex(digest);
}

export async function hashStream(stream: NodeJS.ReadableStream): Promise<HashAndSize> {
    return new Promise<HashAndSize>((resolve, reject) => {
        const digest = new Hash();
        let size = 0n;
        stream.on("data", data => {
            size = size + BigInt(data.length);
            digest.update(data);
        });
        stream.on("end", () => resolve({
            hash: digestToHex(digest),
            size
        }));
        stream.on("error", reject);
    });
}

export function validHash(hash: string): boolean {
    return hash.startsWith("0x")
        && hash.length === 66
        && hash.slice(2).search(/[^0-9a-f]/) === -1;
}

export class HashOrContent {

    static fromHash(hash: string): HashOrContent {
        return new HashOrContent({ hash });
    }

    static fromContent(content: FileLike): HashOrContent {
        return new HashOrContent({ content });
    }

    static async fromContentFinalized(fileContent: FileLike): Promise<HashOrContent> {
        const content = new HashOrContent({ content: fileContent });
        await content.finalize();
        return content;
    }

    constructor(parameters: { hash?: string, content?: FileLike }) {
        if(!parameters.hash && !parameters.content) {
            throw new Error("Either of hash or content must be defined");
        }
        if(parameters.hash && !validHash(parameters.hash)) {
            throw new Error(`Invalid hash ${parameters.hash}: must be a 66 digits string prefixed with 0x with the reminder composed of hexadecimal digits only`);
        }
        this._hash = parameters.hash;
        this._content = parameters.content;
        this.finalized = parameters.content === undefined;
    }

    private _hash?: string;

    private _content?: FileLike;

    private finalized: boolean;

    private _size?: bigint;

    get hasContent() {
        return this._content !== undefined;
    }

    get contentHash(): string {
        this.ensureFinalized();
        return this._hash || "";
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
                if(hashAndSize.hash !== this._hash) {
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
        if(isBlob(this._content)) {
            return hashBlob(this._content as Blob);
        } else if(isBuffer(this._content)) {
            const buffer = this._content as Buffer;
            return {
                hash: await hashBuffer(buffer),
                size: BigInt(buffer.length)
            };
        } else if(typeof this._content === "string") {
            return hashStream(await buildStream(this._content as string));
        } else {
            throw new Error(`Unsupported content type: ${ typeof this._content }`);
        }
    }

    get content() {
        if(!this._content) {
            throw new Error("No content available");
        }
        this.ensureFinalized();
        return this._content;
    }

    get size() {
        if(!this._content) {
            throw new Error("No content available to compute the size of");
        }
        this.ensureFinalized();
        return this._size;
    }
}

function isBlob(obj: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return obj
        && obj.stream
        && typeof obj.stream === 'function';
}

function isBuffer(obj: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return obj
        && obj.constructor
        && typeof obj.constructor.isBuffer === 'function'
        && obj.constructor.isBuffer(obj);
}

async function buildStream(path: string): Promise<NodeJS.ReadableStream> {
    const fs = await import('fs');
    return fs.createReadStream(path);
}
