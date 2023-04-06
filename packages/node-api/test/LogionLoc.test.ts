import { mockPolkadotApi, DEFAULT_ITEM, DEFAULT_LOC } from "./__mocks__/PolkadotApiMock.js";
mockPolkadotApi();
const { ApiPromise } = await import('@polkadot/api');

const {
    createPolkadotTransactionLoc,
    addMetadata,
    getLegalOfficerCase,
    addFile,
    addCollectionItem,
    getCollectionItem,
    UUID,
} = await import('../src/index.js');
import {
    Adapters,
    AnyAccountId,
    ItemFile,
    ItemToken,
    LogionNodeApiClass,
    TermsAndConditionsElement
} from "../src/index.js";

describe("LogionLoc", () => {

    it("submits createPolkadotTransactionLoc extrinsic", () => {
        const api = new ApiPromise();
        const requester = "requester";
        const locId = new UUID();

        createPolkadotTransactionLoc({
            api,
            locId,
            requester,
        });

        expect(api.tx.logionLoc.createPolkadotTransactionLoc).toHaveBeenCalledWith(locId.toHexString(), requester);
    });

    it("submits addMetadata extrinsic", () => {
        const api = new ApiPromise();
        const item = {
            name: "a_name",
            value: "a_value",
            submitter: "owner",
        };
        const locId = new UUID();

        addMetadata({
            api,
            locId,
            item,
        });

        expect(api.tx.logionLoc.addMetadata).toHaveBeenCalledWith(locId.toHexString(), jasmine.objectContaining({
            name: item.name,
            value: item.value
        }));
    });

    it("fetches Logion Legal Officer Case", async () => {
        const api = new ApiPromise();
        const locId = new UUID();

        const loc = await getLegalOfficerCase({
            api,
            locId
        });

        expect(loc!.owner).toEqual(DEFAULT_LOC.owner);
        expect(loc!.requesterAddress?.address).toEqual(DEFAULT_LOC.requesterAddress?.address);
        expect(loc!.metadata).toEqual(DEFAULT_LOC.metadata);
        expect(loc!.files).toEqual(DEFAULT_LOC.files);
        loc!.links.forEach((link, index) => {
            expect(link.id.toString()).toBe(DEFAULT_LOC.links[index].id.toString());
            expect(link.nature).toBe(DEFAULT_LOC.links[index].nature);
        });
        expect(loc!.closed).toEqual(DEFAULT_LOC.closed);
        expect(loc!.locType).toEqual(DEFAULT_LOC.locType);
        expect(loc!.collectionCanUpload).toBe(DEFAULT_LOC.collectionCanUpload);
    });

    it("submits addFile extrinsic", () => {
        const api = new ApiPromise();
        const hash = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
        const nature = "file-nature";
        const submitter = "submitter";
        const locId = new UUID();
        const size = BigInt(128000);
        addFile({
            api,
            locId,
            hash,
            nature,
            submitter,
            size,
        });

        expect(api.tx.logionLoc.addFile).toHaveBeenCalledWith(locId.toHexString(), {
            hash_: hash,
            nature: "file-nature",
            submitter,
            size_: size,
        });
    });

    it("fetches collection item", async () => {
        const api = new ApiPromise();
        const locId = new UUID();
        const itemId = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";

        const item = await getCollectionItem({
            api,
            locId,
            itemId,
        });

        expect(item!.id).toEqual(DEFAULT_ITEM.id);
        expect(item!.description).toEqual(DEFAULT_ITEM.description);
        expect(item!.files).toEqual(jasmine.arrayContaining(DEFAULT_ITEM.files));
        expect(item!.token).toEqual(DEFAULT_ITEM.token);
        expect(item!.restrictedDelivery).toEqual(DEFAULT_ITEM.restrictedDelivery);
        expect(item!.termsAndConditions).toEqual(DEFAULT_ITEM.termsAndConditions);
    });

    it("adds collection items without restricted delivery", () => {
        const api = new ApiPromise();
        const collectionId = new UUID();
        const itemId = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
        const itemDescription = "Some description";
        const itemFiles: ItemFile[] = [
            {
                name: "artwork.png",
                contentType: "image/png",
                size: BigInt(256000),
                hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
            }
        ];

        addCollectionItem({
            api,
            collectionId,
            itemId,
            itemDescription,
            itemFiles,
            itemToken: undefined,
            restrictedDelivery: false,
        });

        expect(api.tx.logionLoc.addCollectionItem).toHaveBeenCalledWith(
            collectionId.toHexString(),
            itemId,
            itemDescription,
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: itemFiles[0].name,
                    contentType: itemFiles[0].contentType,
                    size_: itemFiles[0].size,
                    hash_: itemFiles[0].hash,
                })
            ]),
            null,
            false,
        );
    });

    it("adds collection items with License", () => {
        const api = new ApiPromise();
        const collectionId = new UUID();
        const itemId = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
        const itemDescription = "Some description";
        const itemFiles: ItemFile[] = [
            {
                name: "artwork.png",
                contentType: "image/png",
                size: BigInt(256000),
                hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
            }
        ];

        const termsAndConditions: TermsAndConditionsElement[] = [{
            tcType: "Logion",
            tcLocId: new UUID(),
            details: "ITEM-A, ITEM-B, ITEM-C"
        }]
        addCollectionItem({
            api,
            collectionId,
            itemId,
            itemDescription,
            itemFiles,
            itemToken: undefined,
            restrictedDelivery: false,
            termsAndConditions,
        });

        expect(api.tx.logionLoc.addCollectionItemWithTermsAndConditions).toHaveBeenCalledWith(
            collectionId.toHexString(),
            itemId,
            itemDescription,
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: itemFiles[0].name,
                    contentType: itemFiles[0].contentType,
                    size_: itemFiles[0].size,
                    hash_: itemFiles[0].hash,
                })
            ]),
            null,
            false,
            jasmine.objectContaining([{
                tcType: termsAndConditions[0].tcType,
                tcLoc: termsAndConditions[0].tcLocId.toHexString(),
                details: termsAndConditions[0].details
            }])
        );
    });

    it("adds collection items with restricted delivery", () => {
        const api = new ApiPromise();
        const collectionId = new UUID();
        const itemId = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
        const itemDescription = "Some description";
        const itemFiles: ItemFile[] = [
            {
                name: "artwork.png",
                contentType: "image/png",
                size: BigInt(256000),
                hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
            }
        ];
        const itemToken: ItemToken = {
            type: "ethereum_erc721",
            id: '{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","token":"4391"}',
        };

        addCollectionItem({
            api,
            collectionId,
            itemId,
            itemDescription,
            itemFiles,
            itemToken,
            restrictedDelivery: true,
        });

        expect(api.tx.logionLoc.addCollectionItem).toHaveBeenCalledWith(
            collectionId.toHexString(),
            itemId,
            itemDescription,
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: itemFiles[0].name,
                    contentType: itemFiles[0].contentType,
                    size_: itemFiles[0].size,
                    hash_: itemFiles[0].hash,
                })
            ]),
            jasmine.objectContaining({
                tokenType: itemToken.type,
                tokenId: itemToken.id,
            }),
            true,
        );
    });

    it("submits createPolkadotTransactionLoc extrinsic", async () => {
        const api = new ApiPromise();
        const logionApi = new LogionNodeApiClass(api);
        const requester = "0x900edc98db53508e6742723988b872dd08cd09c2";
        const locId = new UUID();

        const requesterAccount = new AnyAccountId(api, requester, "ethereum").toValidAccountId().toOtherAccountId();
        logionApi.polkadot.tx.logionLoc.createOtherIdentityLoc(Adapters.toLocId(locId), logionApi.adapters.toPalletLogionLocOtherAccountId(requesterAccount));

        expect(api.tx.logionLoc.createOtherIdentityLoc).toHaveBeenCalledWith(locId.toHexString(), jasmine.objectContaining({}));
    });
});
