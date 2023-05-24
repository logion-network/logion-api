import { UUID } from "../src/index.js";
import { setup } from "./Util.js";

export async function adapts() {
    const { api } = await setup();

    const ethereumAddress = "0x900Edc98db53508e6742723988B872dD08CD09c2";
    const otherAccountId = api.queries.getValidAccountId(ethereumAddress, "Ethereum").toOtherAccountId();
    const adapted = api.adapters.toPalletLogionLocOtherAccountId(otherAccountId);
    expect(adapted.isEthereum).toBe(true);
    expect(adapted.asEthereum.toHex()).toBe(ethereumAddress.toLowerCase());

    const sponsorshipId = new UUID();
    const compactSponsorshipId = api.adapters.toSponsorshipId(sponsorshipId);
    expect(compactSponsorshipId.toBigInt().toString()).toBe(sponsorshipId.toDecimalString());

    const polkadotAddress = "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb";
    const validPolkadotAccountId = api.queries.getValidAccountId(polkadotAddress, "Polkadot");
    const submitter = validPolkadotAccountId;
    const item = {
        name: "a_name",
        value: "a_value",
        submitter,
    };
    const palletItem = api.adapters.toPalletLogionLocMetadataItem(item);
    expect(palletItem.name.toHex()).toBe("0x615f6e616d65");
    expect(palletItem.value.toHex()).toBe("0x615f76616c7565");
    expect(palletItem.submitter.asPolkadot.toString()).toBe(polkadotAddress);

    const hash = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
    const nature = "file-nature";
    const size = BigInt(128000);
    const palletFile = api.adapters.toPalletLogionLocFile({
        hash,
        nature,
        size,
        submitter,
    });
    expect(palletFile.hash_.toHex()).toBe(hash);
    expect(palletFile.nature.toUtf8()).toBe(nature);
    expect(palletFile.size_.toBigInt()).toBe(size);
    expect(palletFile.submitter.asPolkadot.toString()).toBe(polkadotAddress);
}
