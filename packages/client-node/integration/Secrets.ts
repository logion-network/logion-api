import { ClosedIdentityLoc, CreateSecretRecoveryRequest } from "@logion/client";
import { State } from "./Utils";
import { UUID } from "@logion/node-api";

const secretToKeep = "Key";

export async function recoverableSecrets(state: State) {
    const requesterIdentityLocId = await addSecrets(state);
    await createRecoveryRequest(state, requesterIdentityLocId);
}

async function addSecrets(state: State): Promise<UUID> {
    const { requesterAccount } = state;

    const client = state.client.withCurrentAccount(requesterAccount);
    let locsState = await client.locsState();

    let closedIdentityLoc = locsState.closedLocs.Identity[0] as ClosedIdentityLoc;
    expect(closedIdentityLoc).toBeInstanceOf(ClosedIdentityLoc);
    const value = "Encrypted key";

    closedIdentityLoc = await closedIdentityLoc.addSecret({
        name: secretToKeep,
        value,
    });
    const secretToRemove = "secret-to-remove";
    closedIdentityLoc = await closedIdentityLoc.addSecret({
        name: secretToRemove,
        value,
    });

    expect(closedIdentityLoc).toBeInstanceOf(ClosedIdentityLoc);

    let data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(2);

    closedIdentityLoc = await closedIdentityLoc.removeSecret(secretToRemove);

    data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(1);
    expect(data.secrets[0].name).toBe(secretToKeep);
    expect(data.secrets[0].value).toBe(value);

    return closedIdentityLoc.locId;
}

async function createRecoveryRequest(state: State, requesterIdentityLocId: UUID) {
    const request: CreateSecretRecoveryRequest = {
        requesterIdentityLocId,
        secretName: secretToKeep,
        challenge: "my-personal-challenge",
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            line1: "Line1",
            line2: "Line2",
            postalCode: "PostalCode",
            city: "City",
            country: "Country",
        }
    }
    await state.client.secretRecovery.createSecretRecoveryRequest(request);
}
