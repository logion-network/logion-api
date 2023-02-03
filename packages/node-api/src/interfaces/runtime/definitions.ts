/* eslint-disable */
import * as runtime from "@polkadot/types/interfaces/runtime/definitions";

export default {
    types: {
        ...runtime.default.types,
        AssetId: "u64",
    }
};
