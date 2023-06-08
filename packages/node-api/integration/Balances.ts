import { Currency, Adapters, TypesJsonObject } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function transferTokens() {
    const { alice, api } = await setup();

    const transferExtrinsic = api.polkadot.tx.balances.transferAllowDeath(
        REQUESTER,
        Currency.toCanonicalAmount(Currency.nLgnt(20000n))
    );
    const result = await signAndSend(alice, transferExtrinsic);

    const events = Adapters.getExtrinsicEvents(result);
    const transferEvent = events.find(event => event.section === "balances" && event.name === "Transfer");
    expect(transferEvent).toBeDefined();
    const data = transferEvent?.data as TypesJsonObject;
    expect(data?.from as string).toBe(alice.address);
    expect(data?.to as string).toBe(REQUESTER);

    const balances = await api.queries.getCoinBalances(REQUESTER);
    const logionTokenBalance = balances.find(balance => balance.coin.id === 'lgnt');
    expect(logionTokenBalance?.available.coefficient.toNumber()).toBe(20);
    expect(logionTokenBalance?.available.prefix.tenExponent).toBe(3);
}
