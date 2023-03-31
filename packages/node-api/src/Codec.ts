/**
 * @deprecated use @polkadot/util's stringToHex
 */
export function toHex(source: string) {
    // utf8 to latin1
    const sanitized = unescape(encodeURIComponent(source));
    let hex = '0x';
    for (let i = 0; i < sanitized.length; i++) {
        hex += sanitized.charCodeAt(i).toString(16);
    }
    return hex;
}

export function fromHex(hex: string) {
    if(!hex.startsWith("0x")) {
        throw new Error('Given string does not look like hexadecimal data, "0x" prefix is missing');
    }
    let sanitized = '';
    for (let i = 2; i < hex.length; i+=2) {
        sanitized += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return decodeURIComponent(escape(sanitized));
}
