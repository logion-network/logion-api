import { Compact, Struct } from '@polkadot/types-codec';

import { NONE, PrefixedNumber, transferSubmittable } from "../src";
import { Weight } from '../src/interfaces';
import { REQUESTER, setup } from "./Util";

export async function queryInfos() {
    const { alice, api } = await setup();

    const transferExtrinsic = transferSubmittable({
        api,
        amount: new PrefixedNumber("1", NONE),
        destination: REQUESTER,
    });
    const dispatchInfo = await transferExtrinsic.paymentInfo(alice);
    expect(dispatchInfo.weight).toBeInstanceOf(Struct);
    const actualWeight = dispatchInfo.weight as unknown as Weight;
    expect(actualWeight.refTime).toBeInstanceOf(Compact);

    const queriedDispatchInfo = await api.call.transactionPaymentApi.queryInfo(transferExtrinsic, 0);
    expect(queriedDispatchInfo.weight).toBeInstanceOf(Struct);
    const actualQueriedWeight = queriedDispatchInfo.weight as unknown as Weight;
    expect(actualQueriedWeight.refTime).toBeInstanceOf(Compact);

    expect(actualWeight.refTime.toString()).toBe(actualQueriedWeight.refTime.toString());
}
