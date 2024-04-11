import { ApiPromise } from "@polkadot/api";
import { CollectionItem, Hash, LegalOfficerCase, Lgnt, LogionNodeApiClass, Numbers, UUID, ValidAccountId } from "../src/index.js";
import {
    POLKADOT_API_CREATE_TYPE,
    mockBool,
    mockParaRuntimeVersion,
} from "./Util.js";
import { DEFAULT_LEGAL_OFFICER, TEST_WALLET_USER, TEST_WALLET_USER2 } from "./TestData.js";
import { BN } from "bn.js";

describe("Queries", () => {

    it("Getting account data", async () => {
        const accountId = TEST_WALLET_USER;
        const api = mockPolkadotApiWithAccountData(accountId);

        const logionApi = new LogionNodeApiClass(api);
        const data = await logionApi.queries.getAccountData(accountId);

        expect(data.available).toBe(32n);
        expect(data.reserved).toBe(10n);
    });

    it("Getting balances", async () => {
        const accountId = TEST_WALLET_USER;
        const api = mockPolkadotApiWithAccountData(accountId);

        const logionApi = new LogionNodeApiClass(api);
        const data = await logionApi.queries.getCoinBalances(accountId);

        expect(data[0].total).toEqual(new Numbers.PrefixedNumber("42", Numbers.ATTO));
        expect(data[0].available).toEqual(new Numbers.PrefixedNumber("32", Numbers.ATTO));
        expect(data[0].reserved).toEqual(new Numbers.PrefixedNumber("10", Numbers.ATTO));
        expect(data[0].coin.id).toBe("lgnt");
        expect(data[0].level).toBe(0.42000000000000004);

        expect(data[1].total).toEqual(new Numbers.PrefixedNumber("0", Numbers.NONE));
        expect(data[1].available).toEqual(new Numbers.PrefixedNumber("0", Numbers.NONE));
        expect(data[1].reserved).toEqual(new Numbers.PrefixedNumber("0", Numbers.NONE));
        expect(data[1].coin.id).toBe("dot");
        expect(data[1].level).toBe(1);
    });

    it("fetches Logion Legal Officer Case", async () => {
        const api = mockPolkadotApiForLogionLoc();
        const locId = new UUID();

        const logionApi = new LogionNodeApiClass(api);
        const loc = await logionApi.queries.getLegalOfficerCase(locId);

        expect(loc!.owner).toEqual(DEFAULT_LOC.owner);
        expect(loc!.requesterAccountId).toEqual(DEFAULT_LOC.requesterAccountId);
        expect(loc!.metadata).toEqual(DEFAULT_LOC.metadata);
        expect(loc!.files).toEqual(DEFAULT_LOC.files);
        loc!.links.forEach((link, index) => {
            expect(link.id.toString()).toBe(DEFAULT_LOC.links[index].id.toString());
            expect(link.nature).toEqual(DEFAULT_LOC.links[index].nature);
        });
        expect(loc!.closed).toEqual(DEFAULT_LOC.closed);
        expect(loc!.locType).toEqual(DEFAULT_LOC.locType);
        expect(loc!.collectionCanUpload).toBe(DEFAULT_LOC.collectionCanUpload);
    });

    it("fetches collection item", async () => {
        const api = mockPolkadotApiForLogionLoc();
        const locId = new UUID();
        const itemId = Hash.fromHex("0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2");

        const logionApi = new LogionNodeApiClass(api);
        const item = await logionApi.queries.getCollectionItem(locId, itemId);

        expect(item!.id).toEqual(DEFAULT_ITEM.id);
        expect(item!.description).toEqual(DEFAULT_ITEM.description);
        expect(item!.files).toEqual(jasmine.arrayContaining(DEFAULT_ITEM.files));
        expect(item!.token).toEqual(DEFAULT_ITEM.token);
        expect(item!.restrictedDelivery).toEqual(DEFAULT_ITEM.restrictedDelivery);
        expect(item!.termsAndConditions).toEqual(DEFAULT_ITEM.termsAndConditions);
    });

    it("fetches recovery config", async () => {
        const accountId = TEST_WALLET_USER;
        const recoveryConfig = {
            isEmpty: false,
            isNone: false,
            unwrap: () => ({
                friends: {
                    toArray: () => [
                        { toString: () => DEFAULT_LEGAL_OFFICER.address }
                    ]
                }
            })
        };
        const recoverable = (targetAccountId: string) => targetAccountId === accountId.address ? Promise.resolve(recoveryConfig) : Promise.reject();
        const api = mockPolkadotApiForRecovery(recoverable);

        const logionApi = new LogionNodeApiClass(api);
        const config = await logionApi.queries.getRecoveryConfig(accountId);

        expect(config).toBeDefined();
        expect(config!.legalOfficers).toEqual([ DEFAULT_LEGAL_OFFICER ]);
    });

    it("fetches active recovery", async () => {
        const accountToRecover = TEST_WALLET_USER;
        const recoveringAccount = TEST_WALLET_USER2;
        const activeRecovery = {
            isEmpty: false,
            isNone: false,
            unwrap: () => ({
                friends: {
                    toArray: () => [
                        { toString: () => DEFAULT_LEGAL_OFFICER.address }
                    ]
                }
            })
        };
        const activeRecoveries = (source: string, dest: string) =>
                (source === accountToRecover.address && dest === recoveringAccount.address)
                    ? Promise.resolve(activeRecovery)
                    : Promise.reject();
        const api = mockPolkadotApiForRecovery(undefined, activeRecoveries);
        const logionApi = new LogionNodeApiClass(api);
        const recovery = await logionApi.queries.getActiveRecovery(accountToRecover, recoveringAccount);
        expect(recovery).toBeDefined()
        expect(recovery!.legalOfficers).toEqual([ DEFAULT_LEGAL_OFFICER ])
    });
})

function mockPolkadotApiWithAccountData(accountId: ValidAccountId) {
    return {
        runtimeVersion: mockParaRuntimeVersion(),
        query: {
            system: {
                account: (id: string) => id === accountId.address ? {
                    data: {
                        free: {
                            toBigInt: () => 32n,
                            add: () => new BN("42"),
                        },
                        reserved: {
                            toBigInt: () => 10n
                        }
                    }
                }: undefined,
            }
        }
    } as unknown as ApiPromise;
}

function mockPolkadotApiForLogionLoc() {
    return {
        runtimeVersion: mockParaRuntimeVersion(),
        query: {
            logionLoc: {
                locMap: () => Promise.resolve({
                    isSome: true,
                    unwrap: () => ({
                        owner: DEFAULT_LOC.owner.address,
                        requester: {
                            isAccount: true,
                            isLoc: false,
                            isOtherAccount: false,
                            asAccount: {
                                toString: () => DEFAULT_LOC.requesterAccountId?.address,
                            },
                            asLoc: {
                                toString: () => undefined
                            }
                        },
                        metadata: {
                            toArray: () => DEFAULT_LOC.metadata.map(item => ({
                                name: {
                                    toHex: () => item.name.toHex()
                                },
                                value: {
                                    toHex: () => item.value.toHex()
                                },
                                submitter: {
                                    isPolkadot: true,
                                    asPolkadot: {
                                        toString: () => item.submitter.address
                                    }
                                },
                                acknowledgedByOwner: mockBool(item.acknowledgedByOwner),
                                acknowledgedByVerifiedIssuer: mockBool(item.acknowledgedByVerifiedIssuer),
                            }))
                        },
                        files: {
                            toArray: () => DEFAULT_LOC.files.map(file => ({
                                hash_: {
                                    toHex: () => file.hash.toHex()
                                },
                                nature: {
                                    toHex: () => file.nature.toHex()
                                },
                                submitter: {
                                    isPolkadot: true,
                                    asPolkadot: {
                                        toString: () => file.submitter.address
                                    }
                                },
                                size_: {
                                    toBigInt: () => file.size
                                },
                                acknowledgedByOwner: mockBool(file.acknowledgedByOwner),
                                acknowledgedByVerifiedIssuer: mockBool(file.acknowledgedByVerifiedIssuer),
                            }))
                        },
                        links: {
                            toArray: () => DEFAULT_LOC.links.map(link => ({
                                id: {
                                    toString: () => link.id.toDecimalString()
                                },
                                nature: {
                                    toHex: () => link.nature.toHex()
                                },
                                submitter: {
                                    isPolkadot: true,
                                    asPolkadot: {
                                        toString: () => link.submitter.address
                                    }
                                },
                                acknowledgedByOwner: mockBool(link.acknowledgedByOwner),
                                acknowledgedByVerifiedIssuer: mockBool(link.acknowledgedByVerifiedIssuer),
                            }))
                        },
                        closed: mockBool(DEFAULT_LOC.closed),
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
                        collectionCanUpload: mockBool(DEFAULT_LOC.collectionCanUpload),
                        seal: {
                            isSome: DEFAULT_LOC.seal !== undefined,
                            unwrap: () => ({
                                toHex: () => DEFAULT_LOC.seal
                            })
                        },
                        sponsorshipId: {
                            isSome: DEFAULT_LOC.sponsorshipId !== undefined,
                            isNone: DEFAULT_LOC.sponsorshipId === undefined,
                        },
                        valueFee: {
                            toBigInt: () => DEFAULT_LOC.valueFee,
                        },
                        collectionItemFee: {
                            toBigInt: () => DEFAULT_LOC.collectionItemFee,
                        },
                        tokensRecordFee: {
                            toBigInt: () => DEFAULT_LOC.tokensRecordFee,
                        },
                        legalFee: {
                            toBigInt: () => DEFAULT_LOC.valueFee,
                        }
                    })
                }),
                collectionItemsMap: () => Promise.resolve({
                    isSome: true,
                    unwrap: () => ({
                        description: { toHex: () =>  DEFAULT_ITEM.description.toHex() },
                        files: DEFAULT_ITEM.files.map(item => ({
                            name: { toHex: () => item.name.toHex() },
                            contentType: { toHex: () => item.contentType.toHex() },
                            hash_: { toHex: () => item.hash.toHex() },
                            size_: { toBigInt: () => item.size },
                        })),
                        restrictedDelivery: mockBool(DEFAULT_ITEM.restrictedDelivery),
                        termsAndConditions: DEFAULT_ITEM.termsAndConditions.map(tc => ({
                            tcType: { toHex: () => tc.tcType.toHex() },
                            tcLocId: { toString: () => tc.tcLocId.toDecimalString() },
                            details: { toHex: () => tc.details.toHex() },
                        })),
                        tokenIssuance: { toBigInt: () => DEFAULT_ITEM.token?.issuance || 0n }
                    })
                }),
            }
        },
        createType: POLKADOT_API_CREATE_TYPE,
    } as unknown as ApiPromise;
}

export const DEFAULT_LOC: LegalOfficerCase = {
    owner: DEFAULT_LEGAL_OFFICER,
    requesterAccountId: TEST_WALLET_USER,
    metadata: [
        {
            name: Hash.of("meta_name"),
            value: Hash.of("meta_value"),
            submitter: DEFAULT_LEGAL_OFFICER,
            acknowledgedByOwner: true,
            acknowledgedByVerifiedIssuer: false,
        }
    ],
    files: [
        {
            hash: Hash.fromHex("0x8fc334610ff6939e55ea65b472fc107df861790b02542ecdbbfeaa2d17ed5abb"),
            nature: Hash.of("file-nature"),
            submitter: DEFAULT_LEGAL_OFFICER,
            size: BigInt(128000),
            acknowledgedByOwner: true,
            acknowledgedByVerifiedIssuer: false,
        }
    ],
    links: [
        {
            id: new UUID("90fcde7e-a255-404e-8b15-32963a4e64c0"),
            nature: Hash.of("link-nature"),
            submitter: DEFAULT_LEGAL_OFFICER,
            acknowledgedByOwner: true,
            acknowledgedByVerifiedIssuer: false,
        }
    ],
    closed: false,
    locType: 'Transaction',
    collectionLastBlockSubmission: undefined,
    collectionMaxSize: undefined,
    collectionCanUpload: false,
    seal: "0x917ec227fc39f3eba7dc3546d714f4146bcbeb496a909316723ada32008de3c8",
    valueFee: Lgnt.zero(),
    collectionItemFee: Lgnt.zero(),
    tokensRecordFee: Lgnt.zero(),
    legalFee: Lgnt.from(2000n),
}

export const DEFAULT_ITEM: CollectionItem = {
    id: Hash.fromHex("0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2"),
    description: Hash.of("Some description"),
    files: [
        {
            name: Hash.of("artwork.png"),
            contentType: Hash.of("image/png"),
            size: BigInt(256000),
            hash: Hash.fromHex("0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2"),
        }
    ],
    restrictedDelivery: false,
    termsAndConditions: [],
}

function mockPolkadotApiForRecovery(recoverable?: any, activeRecoveries?: any) {
    return {
        runtimeVersion: mockParaRuntimeVersion(),
        query: {
            recovery: {
                recoverable: recoverable ? recoverable : () => Promise.resolve(),
                activeRecoveries: activeRecoveries ? activeRecoveries : () => Promise.resolve(),
            },
        },
        tx: {
            recovery: {
                initiateRecovery: () => Promise.resolve(),
            },
            verifiedRecovery: {
                createRecovery: () => Promise.resolve(),
            },
        },
    } as unknown as ApiPromise;
}
