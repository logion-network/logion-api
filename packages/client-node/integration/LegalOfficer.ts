import { ALICE, State } from "./Utils.js";

export async function backendConfig(state: State) {
    const { client, requesterAccount } = state;

    const authenticatedClient = client.withCurrentAddress(requesterAccount);
    const alice = authenticatedClient.getLegalOfficer(ALICE);
    const config = await alice.getConfig();

    expect(config.features.iDenfy).toBe(false);
    expect(config.features.vote).toBe(false);
}

export async function workload(state: State, ...legalOfficerAddresses: string[]) {
    const { client, requesterAccount } = state;

    const authenticatedClient = client.withCurrentAddress(requesterAccount);
    for (const address of legalOfficerAddresses) {
        const legalOfficer = authenticatedClient.getLegalOfficer(address);
        const workload = await legalOfficer.getWorkload();
        expect(workload).toBe(0);
    }
}
