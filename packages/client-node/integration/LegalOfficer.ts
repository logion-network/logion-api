import { State } from "./Utils.js";
import { LegalOfficer, CreateOrUpdateLegalOfficer } from "@logion/client";
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

export async function updateLegalOfficer(state: State) {
    const { client, alice } = state;
    const updatedAlice: CreateOrUpdateLegalOfficer = {
        userIdentity: {
            firstName: "Alice",
            lastName: "updated-last-name",
            email: "updated-email-address@logion.network",
            phoneNumber: "updated-phone-number",
        },
        postalAddress: {
            company: "updated-company",
            line1: "updated-line1",
            line2: "updated-line2",
            postalCode: "updated-postal-code",
            city: "updated-city",
            country: "updated-country",
        },
        account: alice.account,
        additionalDetails: "Some new details",
    } as LegalOfficer;
    const aliceClient = client.withCurrentAccount(alice.account);
    await aliceClient.legalOfficerClient.createOrUpdate(updatedAlice);
    const legalOfficers = await client.legalOfficerClient.getLegalOfficers();
    const legalOfficer = legalOfficers.find(legalOfficer => legalOfficer.account.equals(alice.account))
    expect(legalOfficer?.userIdentity).toEqual(updatedAlice.userIdentity);
    expect(legalOfficer?.postalAddress).toEqual(updatedAlice.postalAddress);
    expect(legalOfficer?.additionalDetails).toEqual(updatedAlice.additionalDetails);
}
