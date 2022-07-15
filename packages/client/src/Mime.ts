import mimeDb from 'mime-db';

export class MimeType {

    static from(mimeType: string): MimeType {
        return new MimeType(mimeType);
    }

    constructor(mimeType: string) {
        if(!isValidMime(mimeType)) {
            throw new Error(`Unknown mime type: ${mimeType}`);
        }
        this._mimeType = mimeType;
    }

    private _mimeType: string;

    get mimeType() {
        return this._mimeType;
    }
}

export function isValidMime(mimeType: string): boolean {
    const parametersIndex = mimeType.indexOf(";");
    let simpleType;
    if(parametersIndex !== -1) {
        simpleType = mimeType.slice(0, parametersIndex).trimEnd();
    } else {
        simpleType = mimeType;
    }
    return simpleType in mimeDb;
}
