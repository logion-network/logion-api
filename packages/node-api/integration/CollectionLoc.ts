import { UUID, Hash, Lgnt } from "../src/index.js";
import { setup, signAndSend } from "./Util.js";

export async function createCollectionLocLimitedInSizeTest() {
    const { api, requester, alice } = await setup();
    const collectionMaxSize = 100;
    const valueFee = Lgnt.fromCanonical(100n);
    const legalFee = Lgnt.fromCanonical(200n);
    const collectionItemFee = Lgnt.fromCanonical(50n);
    const tokensRecordFee = Lgnt.fromCanonical(30n);
    const createExtrinsic = api.polkadot.tx.logionLoc.createCollectionLoc(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        alice.address,
        null,
        collectionMaxSize,
        false,
        valueFee.canonical,
        legalFee.canonical,
        collectionItemFee.canonical,
        tokensRecordFee.canonical,
        api.adapters.emptyPalletLogionLocItemsParams(),
    );
    await signAndSend(requester, createExtrinsic);
    const loc = await api.queries.getLegalOfficerCase(COLLECTION_LOC_ID);
    expect(loc?.locType).toBe("Collection");
    expect(loc?.collectionMaxSize).toBe(collectionMaxSize);
    expect(loc?.valueFee).toEqual(valueFee);
    expect(loc?.legalFee).toEqual(legalFee);
    expect(loc?.collectionItemFee).toEqual(collectionItemFee);
    expect(loc?.tokensRecordFee).toEqual(tokensRecordFee);

    const map = await api.batch.locs([ COLLECTION_LOC_ID ]).getLocs();
    expect(map[COLLECTION_LOC_ID.toDecimalString()]).toBeDefined();
}

export async function closeCollectionLocTest() {
    const { api, alice } = await setup();
    const closeExtrinsic = api.polkadot.tx.logionLoc.close(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        null,
        false,
    );
    await signAndSend(alice, closeExtrinsic);
    const loc = await api.queries.getLegalOfficerCase(COLLECTION_LOC_ID);
    expect(loc?.closed).toBe(true);
}

export async function addCollectionItemTest() {
    const { api, requester } = await setup();

    const item1Id = Hash.fromHex("0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9");
    const addItem1Extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        item1Id.bytes,
        Hash.of("Item 1").bytes,
        [],
        null,
        false,
        [],
    );
    await signAndSend(requester, addItem1Extrinsic);

    const item2Id = Hash.fromHex("0x95307d8ad3f1404a0633015b923753ac0734fec44043fe02120f9661072f05f3");
    const tokenId = Hash.of("0x900Edc98db53508e6742723988B872dD08CD09c2");
    const addItem2Extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        item2Id.bytes,
        Hash.of("Item 2").bytes,
        [],
        api.adapters.toCollectionItemToken({
            id: tokenId,
            type: Hash.of("owner"),
            issuance: 1n,
        }),
        false,
        [],
    );
    await signAndSend(requester, addItem2Extrinsic);

    const item3Id = Hash.fromHex("0x9ab7b28cd982c19262caa8ed7d8e33c53600c5f733a4961307a33b33f2c5a54f");
    const item3TokenId = Hash.of("5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb");
    const addItem3Extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        item3Id.bytes,
        Hash.of("Item 3").bytes,
        [],
        api.adapters.toCollectionItemToken({
            id: item3TokenId,
            type: Hash.of("owner"),
            issuance: 1n,
        }),
        false,
        [],
    );
    await signAndSend(requester, addItem3Extrinsic);

    const items = await api.queries.getCollectionItems(COLLECTION_LOC_ID);
    expect(items.length).toBe(3);

    const item1 = await api.queries.getCollectionItem(COLLECTION_LOC_ID, item1Id);
    expect(item1?.id).toBe(item1Id);
    expect(item1?.token).toBeUndefined();

    const item2 = await api.queries.getCollectionItem(COLLECTION_LOC_ID, item2Id);
    expect(item2?.id).toBe(item2Id);
    expect(item2?.token?.issuance).toBe(1n);

    const item3 = await api.queries.getCollectionItem(COLLECTION_LOC_ID, item3Id);
    expect(item3?.id).toBe(item3Id);
    expect(item3?.token?.issuance).toBe(1n);
}

const COLLECTION_LOC_ID = new UUID("3a07d3ae-a18d-43a4-8439-9c33532b7ff3");
