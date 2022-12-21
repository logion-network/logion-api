import { DispatchError } from '@polkadot/types/interfaces/system/types';
import { getExtrinsicEvents, getBalances, NONE, EXA, PrefixedNumber, transferSubmittable, getErrorMetadata } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function transferTokens() {
    const { alice, api } = await setup();

    const transferExtrinsic = transferSubmittable({
        api,
        amount: new PrefixedNumber("1", NONE),
        destination: REQUESTER,
    });
    const result = await signAndSend(alice, transferExtrinsic);

    const events = getExtrinsicEvents(result);
    const transferEvent = events.find(event => event.section === "balances" && event.name === "Transfer");
    expect(transferEvent).toBeDefined();
    const data = transferEvent?.data;
    expect(data?.from as string).toBe(alice.address);
    expect(data?.to as string).toBe(REQUESTER);

    const balances = await getBalances({
        api,
        accountId: REQUESTER,
    });
    const logionTokenBalance = balances.find(balance => balance.coin.id === 'lgnt');
    expect(logionTokenBalance?.available.coefficient.toNumber()).toBe(1);
    expect(logionTokenBalance?.available.prefix.tenExponent).toBe(0);
}

export async function failedTransfer() {
    const { alice, api } = await setup();

    const transferExtrinsic = transferSubmittable({
        api,
        amount: new PrefixedNumber("1", EXA),
        destination: REQUESTER,
    });
    try {
        await signAndSend(alice, transferExtrinsic);
        expect(false).toBe(true);
    } catch(error) {
        const dispatchError = error as DispatchError;
        const errorMetadata = getErrorMetadata(dispatchError);
        expect(errorMetadata.pallet).toBe("balances");
        expect(errorMetadata.error).toBe("InsufficientBalance");
        expect(errorMetadata.details).toBe("Balance too low to send value.");
    }
}
