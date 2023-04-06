import { jest } from '@jest/globals';
import { BN } from "bn.js";
import type { CollectionItem, LegalOfficerCase } from "../../src/index.js";
import { UUID } from "../../src/UUID.js";

export class WsProvider {
    constructor(socket: string) {
    }
}

interface ApiPromiseArgs {
    provider: WsProvider,
    types: any,
    rpc: any,
}

let apiCallbacks: Record<string, () => void> = {};

export let isReadyResolve: (() => void) | null = null;

export let eventsCallback: ((issuedEvents: any) => void) | null = null;

export let newHeadsCallback: ((lastHeader: any) => void) | null = null;

export let queryRecoveryRecoverable = jest.fn();

export function setQueryRecoveryRecoverable(mockFn: any) {
    queryRecoveryRecoverable = mockFn;
}

export let queryRecoveryActiveRecoveries = jest.fn();

export function setQueryRecoveryActiveRecoveries(mockFn: any) {
    queryRecoveryActiveRecoveries = mockFn;
}

export let queryFileStorageFee = jest.fn(() => Promise.resolve())

export function setQueryFileStorageFee(mockFn: any) {
    queryFileStorageFee = mockFn;
}

export let addFile = jest.fn(() => Promise.resolve())

export function setAddFile(mockFn: any) {
    addFile = mockFn;
}

export const DEFAULT_LOC: LegalOfficerCase = {
    owner: "owner",
    requesterAddress: {
        address: "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb",
        type: "polkadot",
        toOtherAccountId: () => { throw new Error() },
    },
    metadata: [
        {
            name: "meta_name",
            value: "meta_value",
            submitter: "owner",
        }
    ],
    files: [
        {
            hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
            nature: "file-nature",
            submitter: "owner",
            size: BigInt(128000),
        }
    ],
    links: [
        {
            id: new UUID("90fcde7e-a255-404e-8b15-32963a4e64c0"),
            nature: "file-nature"
        }
    ],
    closed: false,
    locType: 'Transaction',
    collectionLastBlockSubmission: undefined,
    collectionMaxSize: undefined,
    collectionCanUpload: false,
    seal: "0x917ec227fc39f3eba7dc3546d714f4146bcbeb496a909316723ada32008de3c8",
}

export const CURRENT_BLOCK_NUMBER = {
    toBigInt: () => BigInt(42)
};

export const CURRENT_BLOCK = {
    block: {
        header: {
            number: CURRENT_BLOCK_NUMBER
        }
    }
};

export const DEFAULT_ITEM: CollectionItem = {
    id: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
    description: "Some description",
    files: [
        {
            name: "artwork.png",
            contentType: "image/png",
            size: BigInt(256000),
            hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
        }
    ],
    restrictedDelivery: false,
    termsAndConditions: [],
}

export class ApiPromise {
    assetQueriesBeforeNone: number = 1;

    static create(): Promise<ApiPromise> {
        return Promise.resolve(new ApiPromise());
    }

    consts = {
        timestamp: {
            minimumPeriod: {
                toBigInt: () => BigInt(3000)
            }
        }
    }

    query = {
        system: {
            events: (callback: ((issuedEvents: any) => void)) => { eventsCallback = callback },
            account: () => ({
                data: {
                    free: new BN("42"),
                    reserved: new BN("0")
                }
            }),
        },
        assets: {
            asset: (id: any) => {
                --this.assetQueriesBeforeNone;
                if(this.assetQueriesBeforeNone <= 0) {
                    return {isSome: false}
                } else {
                    return {isSome: true}
                }
            }
        },
        recovery: {
            recoverable: queryRecoveryRecoverable,
            activeRecoveries: queryRecoveryActiveRecoveries,
        },
        logionLoc: {
            locMap: () => Promise.resolve({
                isSome: true,
                unwrap: () => ({
                    owner: DEFAULT_LOC.owner,
                    requester: {
                        isAccount: true,
                        isLoc: false,
                        isOtherAccount: false,
                        asAccount: {
                            toString: () => DEFAULT_LOC.requesterAddress?.address,
                        },
                        asLoc: {
                            toString: () => undefined
                        }
                    },
                    metadata: {
                        toArray: () => DEFAULT_LOC.metadata.map(item => ({
                            name: {
                                toUtf8: () => item.name
                            },
                            value: {
                                toUtf8: () => item.value
                            },
                            submitter: {
                                toString: () => item.submitter
                            }
                        }))
                    },
                    files: {
                        toArray: () => DEFAULT_LOC.files.map(file => ({
                            hash_: {
                                toHex: () => file.hash
                            },
                            nature: {
                                toUtf8: () => file.nature
                            },
                            submitter: {
                                toString: () => file.submitter
                            },
                            size_: {
                                toBigInt: () => file.size
                            },
                        }))
                    },
                    links: {
                        toArray: () => DEFAULT_LOC.links.map(link => ({
                            id: {
                                toString: () => link.id.toDecimalString()
                            },
                            nature: {
                                toUtf8: () => link.nature
                            }
                        }))
                    },
                    closed: {
                        isTrue: DEFAULT_LOC.closed,
                        isFalse: !DEFAULT_LOC.closed,
                    },
                    locType: {
                        isTransaction: DEFAULT_LOC.locType === 'Transaction',
                        isIdentity: DEFAULT_LOC.locType === 'Identity',
                        toString: () => DEFAULT_LOC.locType,
                    },
                    voidInfo: {
                        isSome: false
                    },
                    replacerOf: {
                        isSome: false
                    },
                    collectionLastBlockSubmission: {
                        isSome: false
                    },
                    collectionMaxSize: {
                        isSome: false
                    },
                    collectionCanUpload: {
                        isTrue: DEFAULT_LOC.collectionCanUpload,
                        isFalse: !DEFAULT_LOC.collectionCanUpload,
                    },
                    seal: {
                        isSome: DEFAULT_LOC.seal !== undefined,
                        unwrap: () => ({
                            toHex: () => DEFAULT_LOC.seal
                        })
                    }
                })
            }),
            collectionItemsMap: () => Promise.resolve({
                isSome: true,
                unwrap: () => ({
                    description: { toUtf8: () =>  DEFAULT_ITEM.description },
                    files: DEFAULT_ITEM.files.map(item => ({
                        name: { toUtf8: () => item.name },
                        contentType: { toUtf8: () => item.contentType },
                        hash_: { toHex: () => item.hash },
                        size_: { toBigInt: () => item.size },
                    })),
                    restrictedDelivery: {
                        isTrue: DEFAULT_ITEM.restrictedDelivery,
                        isFalse: !DEFAULT_ITEM.restrictedDelivery,
                    },
                    termsAndConditions: DEFAULT_ITEM.termsAndConditions.map(tc => ({
                        tcType: { toUtf8: () => tc.tcType },
                        tcLocId: { toString: () => tc.tcLocId.toDecimalString() },
                        details: { toUtf8: () => tc.details },
                    })),
                })
            }),
        }
    }

    rpc = {
        chain: {
            subscribeNewHeads: (callback: ((lastHeader: any) => void)) => newHeadsCallback = callback,
            getBlock: (hash?: any) => {
                if(hash === undefined) {
                    return CURRENT_BLOCK;
                } else {
                    return { block: chain[hash.value] }
                }
            }
        },
        system: {
            name: () => Promise.resolve("Mock node"),
            localPeerId: () => Promise.resolve("Mock peer ID"),
        },
    }

    chain = {
        head: chain[TOTAL_BLOCKS - 1],
        chain
    }

    tx = {
        assets: {
            create: () => {},
            setMetadata: () => {},
            mint: () => {},
        },
        recovery: {
            initiateRecovery: jest.fn(() => Promise.resolve()),
        },
        logionLoc: {
            createPolkadotTransactionLoc: jest.fn(() => Promise.resolve()),
            createPolkadotIdentityLoc: jest.fn(() => Promise.resolve()),
            createLogionTransactionLoc: jest.fn(() => Promise.resolve()),
            createLogionIdentityLoc: jest.fn(() => Promise.resolve()),
            createOtherIdentityLoc: jest.fn(() => Promise.resolve()),
            addMetadata: jest.fn(() => Promise.resolve()),
            addFile,
            addLink: jest.fn(() => Promise.resolve()),
            addCollectionItem: jest.fn(() => Promise.resolve()),
            addCollectionItemWithTermsAndConditions: jest.fn(() => Promise.resolve()),
        },
        verifiedRecovery: {
            createRecovery: jest.fn(() => Promise.resolve()),
        },
    }
    call = {
        feesApi: {
            queryFileStorageFee,
        }
    }

    createType = () => ({});
}

export function triggerEvent(eventName: string) {
    apiCallbacks[eventName]();
}

export const TOTAL_BLOCKS = 1000;

export const chain = buildChain(TOTAL_BLOCKS);

export const apiMock: unknown = new ApiPromise();

function buildChain(blocks: number): any[] {
    const chain: any[] = [];
    let blockTime = new Date().valueOf();
    for(let blockNumber = blocks - 1; blockNumber >= 0; --blockNumber) {
        chain[blockNumber] = buildBlockMock(blockNumber, blockTime);
        blockTime -= 6000;
    }
    return chain;
}

function buildBlockMock(blockNumber: number, blockTime: number): object {
    const block = {
        header: {
            number: mockCompact(blockNumber),
            parentHash: blockNumber > 1 ? hashMock(blockNumber - 1) : hashMock(0),
        },
        extrinsics: [
            {
                method: {
                    section: "timestamp",
                    method: "set",
                    args: String(blockTime)
                }
            }
        ],
        hash: hashMock(blockNumber)
    };

    if(blockNumber % 2 === 0) {
        block.extrinsics.push({
            method: {
                section: "balances",
                method: "transfer",
                args: ""
            }
        });
    }

    return block;
}

export function hashMock(blockNumber: number): unknown {
    return {
        value: blockNumber,
        toString: () => blockNumber.toString()
    };
}

class SubmittableMock {
    signatureType: 'KEYRING' | 'INJECTED' | null = null;
    readonly unsubscriber: () => void = () => {};

    signAndSend(arg1: any, arg2: any, arg3: any) {
        if(arg3 !== undefined) {
            this.signatureType = 'INJECTED';
        } else {
            this.signatureType = 'KEYRING';
        }
        return Promise.resolve(this.unsubscriber);
    }
}

export function mockSubmittable(): any {
    return new SubmittableMock();
}

export function blockMock(body: object): object {
    return {
        ...body
    };
}

export function extrinsicsMock(size: number): any[] {
    const extrinsics: any = [];
    for(let i = 0; i < size; ++i) {
        extrinsics.push({});
    }
    return extrinsics;
}

export function teardown() {
    apiCallbacks = {};
    isReadyResolve = null;
    eventsCallback = null;
    newHeadsCallback = null;
}

export function mockVec(array: any[]): any {
    return {
        toArray: () => array
    };
}

export function mockCompact(number: number): any {
    return {
        toNumber: () => number
    };
}

export function mockSigner(signRaw: (parameters: object) => Promise<string>) {
    return {
        signRaw
    };
}

export function mockPolkadotApi() {
    jest.unstable_mockModule("@polkadot/api", () => ({
        WsProvider,
        ApiPromise,
    }));
}
