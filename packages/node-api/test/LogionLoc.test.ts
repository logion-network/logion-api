jest.mock('@polkadot/api');

import { stringToHex } from '@polkadot/util';
import { ApiPromise } from '@polkadot/api';
import {
    createPolkadotTransactionLoc,
    addMetadata,
    getLegalOfficerCase,
    addFile,
    addCollectionItem,
    getCollectionItem,
} from '../src';
import { UUID } from '../src';
import { DEFAULT_ITEM, DEFAULT_LOC } from './__mocks__/PolkadotApiMock';
import { ItemFile, ItemToken, License } from '../src';

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
            name: stringToHex(item.name),
            value: stringToHex(item.value)
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
        expect(loc!.requesterAddress).toEqual(DEFAULT_LOC.requesterAddress);
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

        addFile({
            api,
            locId,
            hash,
            nature,
            submitter,
        });

        expect(api.tx.logionLoc.addFile).toHaveBeenCalledWith(locId.toHexString(), {
            hash_: hash,
            nature: "0x66696c652d6e6174757265",
            submitter,
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
        expect(item!.license).toEqual(DEFAULT_ITEM.license);
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
                size: 256000n,
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
            stringToHex(itemDescription),
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: stringToHex(itemFiles[0].name),
                    contentType: stringToHex(itemFiles[0].contentType),
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
                size: 256000n,
                hash: "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2",
            }
        ];

        const license: License = {
            type: "Logion",
            licenseLocId: new UUID(),
            details: "ITEM-A, ITEM-B, ITEM-C"
        }
        addCollectionItem({
            api,
            collectionId,
            itemId,
            itemDescription,
            itemFiles,
            itemToken: undefined,
            restrictedDelivery: false,
            license,
        });

        expect(api.tx.logionLoc.addLicensedCollectionItem).toHaveBeenCalledWith(
            collectionId.toHexString(),
            itemId,
            stringToHex(itemDescription),
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: stringToHex(itemFiles[0].name),
                    contentType: stringToHex(itemFiles[0].contentType),
                    size_: itemFiles[0].size,
                    hash_: itemFiles[0].hash,
                })
            ]),
            null,
            false,
            jasmine.objectContaining({
                licenseType: stringToHex(license.type),
                licenseLoc: license.licenseLocId.toHexString(),
                details: stringToHex(license.details)
            })
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
                size: 256000n,
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
            stringToHex(itemDescription),
            jasmine.arrayContaining([
                jasmine.objectContaining({
                    name: stringToHex(itemFiles[0].name),
                    contentType: stringToHex(itemFiles[0].contentType),
                    size_: itemFiles[0].size,
                    hash_: itemFiles[0].hash,
                })
            ]),
            jasmine.objectContaining({
                tokenType: stringToHex(itemToken.type),
                tokenId: stringToHex(itemToken.id),
            }),
            true,
        );
    });
});
