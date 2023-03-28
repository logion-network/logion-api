/* eslint-disable */
import * as runtimeDefinitions from "@polkadot/types/interfaces/runtime/definitions";
import { runtime } from './runtime.js';

export default {
    types: {
        ...runtimeDefinitions.default.types,
        AssetId: "u64",
    },
    runtime,
};
