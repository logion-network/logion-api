import { Lgnt, Adapters, TypesJsonObject, ValidAccountId } from "../src/index.js";
import { setup, signAndSend } from "./Util.js";

export async function transferTokens() {
    const { alice, requester, api } = await setup();

    const transferred = Lgnt.from(20000n);
    const transferExtrinsic = api.polkadot.tx.balances.transferAllowDeath(
        requester.address,
        transferred.canonical,
    );
    const result = await signAndSend(alice, transferExtrinsic);

    const events = Adapters.getExtrinsicEvents(result);
    const transferEvent = events.find(event => event.section === "balances" && event.name === "Transfer");
    expect(transferEvent).toBeDefined();
    const data = transferEvent?.data as TypesJsonObject;
    expect(data?.from as string).toBe(alice.address);
    expect(data?.to as string).toBe(requester.address);

    const balance = await api.queries.getAccountData(ValidAccountId.polkadot(requester.address));
    expect(balance?.available).toEqual(transferred);
}
