import mimeDb, { MimeEntry } from 'mime-db';

export class MimeType {

    static from(mimeType: string): MimeType {
        return new MimeType(mimeType);
    }

    constructor(mimeType: string) {
        const entry = getMimeDbEntry(mimeType);
        if(!entry) {
            throw new Error(`Unknown mime type: ${mimeType}`);
        }
        this._mimeType = mimeType;
        this._entry = entry;
    }

    private _mimeType: string;

    private _entry: MimeEntry;

    get mimeType() {
        return this._mimeType;
    }

    get extensions(): ReadonlyArray<string> {
        return this._entry.extensions || [];
    }
}

export function isValidMime(mimeType: string): boolean {
    return getMimeDbEntry(mimeType) !== undefined;
}

function getMimeDbEntry(mimeType: string): MimeEntry | undefined {
    const parametersIndex = mimeType.indexOf(";");
    let simpleType;
    if(parametersIndex !== -1) {
        simpleType = mimeType.slice(0, parametersIndex).trimEnd();
    } else {
        simpleType = mimeType;
    }
    return mimeDb[simpleType];
}
