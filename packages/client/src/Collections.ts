export function findOrThrow<T>(array: T[], predicate: (item: T) => boolean, message?: string): T {
    const legalOfficer = array.find(predicate);
    if(!legalOfficer) {
        throw new Error(message);
    } else {
        return legalOfficer;
    }
}

export function arrayEquals<T>(array1: T[], array2: T[]): boolean {
    if(array1.length !== array2.length) {
        return false;
    } else {
        return array1.every((item, index) => item === array2[index]);
    }
}
