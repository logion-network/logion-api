import { ClosedIdentityLoc, waitFor } from "@logion/client";
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

    // TODO should not be needed
    closedIdentityLoc = await waitFor<ClosedIdentityLoc>({
        predicate: state => state.data().secrets.length > 0,
        producer: async prev => prev ? await prev.refresh() as ClosedIdentityLoc : closedIdentityLoc,
    });

    let data = closedIdentityLoc.data();
    console.log(data)
    expect(data.secrets.length).toBe(1);
    expect(data.secrets[0].name).toBe(name);
    expect(data.secrets[0].value).toBe(value);

    console.log("removing")
    closedIdentityLoc = await closedIdentityLoc.removeSecret(name);

    // TODO should not be needed
    closedIdentityLoc = await waitFor<ClosedIdentityLoc>({
        predicate: state => state.data().secrets.length === 0,
        producer: async prev => prev ? await prev.refresh() as ClosedIdentityLoc : closedIdentityLoc,
    });

    data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(0);
}
