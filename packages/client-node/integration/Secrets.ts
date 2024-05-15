import { ClosedIdentityLoc } from "@logion/client";
import { State } from "./Utils";

export async function recoverableSecrets(state: State) {
    const { requesterAccount } = state;

    const client = state.client.withCurrentAccount(requesterAccount);
    let locsState = await client.locsState();

    let closedIdentityLoc = locsState.closedLocs.Identity[0] as ClosedIdentityLoc;
    expect(closedIdentityLoc).toBeInstanceOf(ClosedIdentityLoc);
    const name = "Key";
    const value = "Encrypted key";

    closedIdentityLoc = await closedIdentityLoc.addSecret({
        name,
        value,
    });
    expect(closedIdentityLoc).toBeInstanceOf(ClosedIdentityLoc);

    let data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(1);
    expect(data.secrets[0].name).toBe(name);
    expect(data.secrets[0].value).toBe(value);

    closedIdentityLoc = await closedIdentityLoc.removeSecret(name);

    data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(0);
}
