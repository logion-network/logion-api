import { ALICE } from "../test/Utils.js";
import { State } from "./Utils.js";

export async function backendConfig(state: State) {
    const { client, requesterAccount } = state;

    const authenticatedClient = client.withCurrentAddress(requesterAccount);
    const alice = authenticatedClient.getLegalOfficer(ALICE.address);
    const config = await alice.getConfig();

    expect(config.features.iDenfy).toBe(false);
    expect(config.features.vote).toBe(false);
}
