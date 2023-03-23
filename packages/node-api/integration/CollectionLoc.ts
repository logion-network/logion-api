import { createCollectionLoc, UUID, getLegalOfficerCase, addCollectionItem, closeLoc, getCollectionItem, getCollectionItems, getLegalOfficerCasesMap } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function createCollectionLocLimitedInSizeTest() {
    const { api, alice } = await setup();
    const createExtrinsic = createCollectionLoc({
        api,
        locId: COLLECTION_LOC_ID,
        canUpload: false,
        requester: REQUESTER,
        maxSize: "100",
    });
    await signAndSend(alice, createExtrinsic);
    const loc = await getLegalOfficerCase({
        api,
        locId: COLLECTION_LOC_ID,
    });
    expect(loc?.locType).toBe("Collection");
    expect(loc?.collectionMaxSize).toBe(100);

    const map = await getLegalOfficerCasesMap({ api, locIds: [COLLECTION_LOC_ID]});
    expect(map[COLLECTION_LOC_ID.toDecimalString()]).toBeDefined();
}

export async function closeCollectionLocTest() {
    const { api, alice } = await setup();
    const closeExtrinsic = closeLoc({
        api,
        locId: COLLECTION_LOC_ID,
    });
    await signAndSend(alice, closeExtrinsic);
    const loc = await getLegalOfficerCase({
        api,
        locId: COLLECTION_LOC_ID,
    });
    expect(loc?.closed).toBe(true);
}

export async function addCollectionItemTest() {
    const { api, requester } = await setup();
    
    const item1Id = "0x5b2ef8140cfcf72237f2182b9f5eb05eb643a26f9a823e5e804d5543976a4fb9";
    const addItem1Extrinsic = addCollectionItem({
        api,
        collectionId: COLLECTION_LOC_ID,
        itemId: item1Id,
        itemDescription: "Item 1",
        itemFiles: [],
        restrictedDelivery: false,
    });
    await signAndSend(requester, addItem1Extrinsic);

    const item2Id = "0x95307d8ad3f1404a0633015b923753ac0734fec44043fe02120f9661072f05f3";
    const addItem2Extrinsic = addCollectionItem({
        api,
        collectionId: COLLECTION_LOC_ID,
        itemId: item2Id,
        itemDescription: "Item 2",
        itemFiles: [],
        restrictedDelivery: false,
    });
    await signAndSend(requester, addItem2Extrinsic);

    const items = await getCollectionItems({
        api,
        locId: COLLECTION_LOC_ID,
    })
    expect(items.length).toBe(2);

    const item1 = await getCollectionItem({
        api,
        locId: COLLECTION_LOC_ID,
        itemId: item1Id,
    });
    expect(item1?.id).toBe(item1Id);

    const item2 = await getCollectionItem({
        api,
        locId: COLLECTION_LOC_ID,
        itemId: item2Id,
    });
    expect(item2?.id).toBe(item2Id);
}

const COLLECTION_LOC_ID = new UUID("3a07d3ae-a18d-43a4-8439-9c33532b7ff3");
