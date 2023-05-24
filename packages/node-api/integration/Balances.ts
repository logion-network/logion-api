import { DispatchError } from '@polkadot/types/interfaces/system/types';
import { Currency, Adapters, TypesJsonObject } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function transferTokens() {
    const { alice, api } = await setup();

    const transferExtrinsic = api.polkadot.tx.balances.transfer(
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

export async function failedTransfer() {
    const { alice, api } = await setup();

    const transferExtrinsic = api.polkadot.tx.balances.transfer(
        REQUESTER,
        Currency.toCanonicalAmount(Currency.nLgnt(1000000n))
    );
    try {
        await signAndSend(alice, transferExtrinsic);
        expect(false).toBe(true);
    } catch(error) {
        const dispatchError = error as DispatchError;
        const errorMetadata = Adapters.getErrorMetadata(dispatchError);
        expect(errorMetadata.pallet).toBe("balances");
        expect(errorMetadata.error).toBe("InsufficientBalance");
        expect(errorMetadata.details).toBe("Balance too low to send value.");
    }
}
