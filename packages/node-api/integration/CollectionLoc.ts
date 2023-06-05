import { UUID, Adapters } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function createCollectionLocLimitedInSizeTest() {
    const { api, alice } = await setup();
    const createExtrinsic = api.polkadot.tx.logionLoc.createCollectionLoc(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        REQUESTER,
        null,
        100,
        false
    );
    await signAndSend(alice, createExtrinsic);
    const loc = await api.queries.getLegalOfficerCase(COLLECTION_LOC_ID);
    expect(loc?.locType).toBe("Collection");
    expect(loc?.collectionMaxSize).toBe(100);

    const map = await api.batch.locs([ COLLECTION_LOC_ID ]).getLocs();
    expect(map[COLLECTION_LOC_ID.toDecimalString()]).toBeDefined();
}

export async function closeCollectionLocTest() {
    const { api, alice } = await setup();
    const closeExtrinsic = api.polkadot.tx.logionLoc.close(
        api.adapters.toLocId(COLLECTION_LOC_ID)
    );
    await signAndSend(alice, closeExtrinsic);
    const loc = await api.queries.getLegalOfficerCase(COLLECTION_LOC_ID);
    expect(loc?.closed).toBe(true);
}

export async function addCollectionItemTest() {
    const { api, requester } = await setup();
    
    const item1Id = "0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9";
    const addItem1Extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        item1Id,
        "Item 1",
        [],
        null,
        false,
    );
    await signAndSend(requester, addItem1Extrinsic);

    const item2Id = "0x95307d8ad3f1404a0633015b923753ac0734fec44043fe02120f9661072f05f3";
    const tokenId = "0x900Edc98db53508e6742723988B872dD08CD09c2";
    const addItem2Extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        api.adapters.toLocId(COLLECTION_LOC_ID),
        item2Id,
        "Item 2",
        [],
        Adapters.toCollectionItemToken({
            id: tokenId,
            type: "owner",
        }),
        false,
    );
    await signAndSend(requester, addItem2Extrinsic);

    const items = await api.queries.getCollectionItems(COLLECTION_LOC_ID);
    expect(items.length).toBe(2);

    const item1 = await api.queries.getCollectionItem(COLLECTION_LOC_ID, item1Id);
    expect(item1?.id).toBe(item1Id);

    const item2 = await api.queries.getCollectionItem(COLLECTION_LOC_ID, item2Id);
    expect(item2?.id).toBe(item2Id);
}

const COLLECTION_LOC_ID = new UUID("3a07d3ae-a18d-43a4-8439-9c33532b7ff3");
