import { setup, ALICE, REQUESTER, signAndSend } from "./Util.js";
import { UUID } from "../src/index.js";

export async function createIdentityLocTest() {
    const { requester, alice, api } = await setup();

    const createLocExtrinsic = api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
        api.adapters.toLocId(IDENTITY_LOC_ID),
        ALICE,
        0n,
        api.adapters.emptyPalletLogionLocItemsParams(),
    );
    await signAndSend(requester, createLocExtrinsic);

    const closeExtrinsic = api.polkadot.tx.logionLoc.close(
        api.adapters.toLocId(IDENTITY_LOC_ID),
        null,
        true,
    );
    await signAndSend(alice, closeExtrinsic);

    const loc = await api.queries.getLegalOfficerCase(IDENTITY_LOC_ID);
    expect(loc?.owner).toBe(ALICE);
    expect(loc?.requesterAddress?.address).toBe(REQUESTER);
    expect(loc?.requesterAddress?.type).toBe("Polkadot");
    expect(loc?.closed).toBe(true);
    expect(loc?.locType).toBe("Identity");
}

const IDENTITY_LOC_ID = new UUID("9cecf5ad-f1b3-40de-be62-37b43305bd9d");
