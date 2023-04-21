import { Adapters, AnyAccountId, UUID } from "../src/index.js";
import { setup } from "./Util.js";

export async function adapts() {
    const { api } = await setup();
    const adapters = new Adapters(api);

    const ethereumAddress = "0x900Edc98db53508e6742723988B872dD08CD09c2";
    const otherAccountId = new AnyAccountId(api, ethereumAddress, "Ethereum").toValidAccountId().toOtherAccountId();
    const adapted = adapters.toPalletLogionLocOtherAccountId(otherAccountId);
    expect(adapted.isEthereum).toBe(true);
    expect(adapted.asEthereum.toHex()).toBe(ethereumAddress.toLowerCase());

    const sponsorshipId = new UUID();
    const compactSponsorshipId = adapters.toSponsorshipId(sponsorshipId);
    expect(compactSponsorshipId.toBigInt().toString()).toBe(sponsorshipId.toDecimalString());
}
