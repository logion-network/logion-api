/* eslint-disable */
import * as session from "@polkadot/types/interfaces/session/definitions";

export default {
    types: {
        ...session.default.types,
        Keys: "SessionKeys2"
    }
};
