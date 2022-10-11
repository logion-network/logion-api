import { getBalances, NONE, PrefixedNumber, transferSubmittable } from "../src";
import { REQUESTER, setup, signAndSend } from "./Util";

export async function transferTokens() {
    const { alice, api } = await setup();

    const transferExtrinsic = transferSubmittable({
        api,
        amount: new PrefixedNumber("1", NONE),
        destination: REQUESTER,
    });
    await signAndSend(alice, transferExtrinsic);

    const balances = await getBalances({
        api,
        accountId: REQUESTER,
    });
    const logionTokenBalance = balances.find(balance => balance.coin.id === 'lgnt');
    expect(logionTokenBalance?.available.coefficient.toNumber()).toBe(1);
    expect(logionTokenBalance?.available.prefix.tenExponent).toBe(0);
}
