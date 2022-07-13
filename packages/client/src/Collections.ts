export function findOrThrow<T>(array: T[], predicate: (item: T) => boolean, message?: string): T {
    const legalOfficer = array.find(predicate);
    if(!legalOfficer) {
        throw new Error(message);
    } else {
        return legalOfficer;
    }
}
