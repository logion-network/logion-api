/* eslint-disable */
import * as payment from "@polkadot/types/interfaces/payment/definitions";

export default {
    types: {
        ...payment.default.types,
        RuntimeDispatchInfoV1: {
            weight: 'WeightV1',
            class: 'DispatchClass',
            partialFee: 'Balance'
        }
    }
};
