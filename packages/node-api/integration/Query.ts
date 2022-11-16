import { Compact, Struct, u64 } from '@polkadot/types-codec';

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

    const queriedDispatchInfo = await api.rpc.payment.queryInfo(transferExtrinsic.toHex());
    expect(queriedDispatchInfo.weight).toBeInstanceOf(u64);
}
