import { IKeyringPair } from "@polkadot/types/types";
import { setup, signAndSend } from "./Util.js";
import { UUID } from "../src/index.js";

export async function createIdentityLocTest() {
    const { requester, alice, api } = await setup();

    await createIdentityLoc(IDENTITY_LOC_ID, requester, alice);

    const loc = await api.queries.getLegalOfficerCase(IDENTITY_LOC_ID);
    expect(loc?.owner.address).toBe(alice.address);
    expect(loc?.requesterAccountId?.address).toBe(requester.address);
    expect(loc?.requesterAccountId?.type).toBe("Polkadot");
    expect(loc?.closed).toBe(true);
    expect(loc?.locType).toBe("Identity");
}

const IDENTITY_LOC_ID = new UUID("9cecf5ad-f1b3-40de-be62-37b43305bd9d");

export async function createIdentityLoc(locId: UUID, requester: IKeyringPair, legalOfficer: IKeyringPair) {
    const { api } = await setup();

    const createLocExtrinsic = api.polkadot.tx.logionLoc.createPolkadotIdentityLoc(
        api.adapters.toLocId(locId),
        legalOfficer.address,
        0n,
        api.adapters.emptyPalletLogionLocItemsParams(),
    );
    await signAndSend(requester, createLocExtrinsic);

    const closeExtrinsic = api.polkadot.tx.logionLoc.close(
        api.adapters.toLocId(locId),
        null,
        true,
    );
    await signAndSend(legalOfficer, closeExtrinsic);
}
