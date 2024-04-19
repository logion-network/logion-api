import { State } from "./Utils.js";
export async function backendConfig(state: State) {
    const { client, requesterAccount, alice } = state;

    const authenticatedClient = client.withCurrentAccount(requesterAccount);
    const llo = authenticatedClient.getLegalOfficer(alice.account);
    const config = await llo.getConfig();
    expect(config.features.iDenfy).toBe(false);
    expect(config.features.vote).toBe(false);
}

export async function workload(state: State) {
    const { client, requesterAccount, alice, bob } = state;

    const authenticatedClient = client.withCurrentAccount(requesterAccount);
    for (const account of [ alice.account, bob.account ]) {
        const legalOfficer = authenticatedClient.getLegalOfficer(account);
        const workload = await legalOfficer.getWorkload();
        expect(workload).toBe(0);
    }
}
