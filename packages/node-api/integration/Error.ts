import { IKeyringPair } from "@polkadot/types/types";
import { Adapters, Hash, TypesErrorMetadata, UUID } from "../src/index.js";
import { setup, signAndSend } from "./Util.js";
import { SubmittableExtrinsic } from '@polkadot/api/promise/types.js';

export async function badOriginError() {
    const { requester, api } = await setup();
    const extrinsic = api.polkadot.tx.logionLoc.createLogionIdentityLoc(
        Adapters.toLocId(new UUID()),
    );
    await testError(requester, extrinsic, {
        pallet: "dispatch",
        error: "BadOrigin",
        details: "A bad origin."
    });
}

async function testError(signer: IKeyringPair, extrinsic: SubmittableExtrinsic, expectedError: TypesErrorMetadata) {
    try {
        await signAndSend(signer, extrinsic);
        expect(false).toBe(true);
    } catch(error) {
        expect(error).toEqual(expectedError);
    }
}

export async function moduleError() {
    const { requester, api } = await setup();
    const extrinsic = api.polkadot.tx.logionLoc.addCollectionItem(
        Adapters.toLocId(new UUID()),
        api.adapters.toH256(Hash.fromHex("0x7276a810a301404a4720ea01f0d7fa5cf3bba2450f142fc7cbd76ed0a9baa5c3")),
        "",
        [],
        null,
        false,
        [],
    );
    await testError(requester, extrinsic, {
        pallet: "logionLoc",
        error: "WrongCollectionLoc",
        details: "Item cannot be added to given collection, it may be missing or limits are reached"
    });
}
