export function createdPolkadotType(content: object): any {
    return jasmine.arrayContaining([jasmine.objectContaining(content)]);
}
