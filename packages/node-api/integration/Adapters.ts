import { UUID, MetadataItemParams } from "../src/index.js";
import { setup } from "./Util.js";

export async function toPalletLogionLocOtherAccountId() {
    const { api } = await setup();

    const ethereumAddress = "0x900Edc98db53508e6742723988B872dD08CD09c2";
    const otherAccountId = api.queries.getValidAccountId(ethereumAddress, "Ethereum").toOtherAccountId();
    const adapted = api.adapters.toPalletLogionLocOtherAccountId(otherAccountId);
    expect(adapted.isEthereum).toBe(true);
    expect(adapted.asEthereum.toHex()).toBe(ethereumAddress.toLowerCase());
}

export async function toSponsorshipId() {
    const { api } = await setup();

    const sponsorshipId = new UUID();
    const compactSponsorshipId = api.adapters.toSponsorshipId(sponsorshipId);
    expect(compactSponsorshipId.toBigInt().toString()).toBe(sponsorshipId.toDecimalString());
}

export async function toPalletLogionLocMetadataItem() {
    const { api } = await setup();

    const sponsorshipId = new UUID();
    const compactSponsorshipId = api.adapters.toSponsorshipId(sponsorshipId);
    expect(compactSponsorshipId.toBigInt().toString()).toBe(sponsorshipId.toDecimalString());

    const validPolkadotAccountId = api.queries.getValidAccountId(polkadotAddress, "Polkadot");

    const submitter = validPolkadotAccountId;
    const item: MetadataItemParams = {
        name: "0x6bccbb4801b2d1f5abb5b0f0540add342716edf347721911f7b12d00af715ec0", // "a_name",
        value: "0xba3781303cb841808fee0d46e315d6f76367b1842d38c26d8946bc6456920498", // "a_value",
        submitter,
    };
    const palletItem = api.adapters.toPalletLogionLocMetadataItem(item);

    expect(palletItem.name.toHex()).toBe(item.name);
    expect(palletItem.value.toHex()).toBe(item.value);
    expect(palletItem.submitter.asPolkadot.toString()).toBe(polkadotAddress);
}

const polkadotAddress = "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb";

export async function toPalletLogionLocFile() {
    const { api } = await setup();

    const validPolkadotAccountId = api.queries.getValidAccountId(polkadotAddress, "Polkadot");

    const submitter = validPolkadotAccountId;
    const hash = "0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2";
    const nature = "0x8d9661f02e30e4d9c0aa5542c4fe4b2e517ff0f42e0b3551cd79c7bc66005c28" // "file-nature";
    const size = BigInt(128000);
    const palletFile = api.adapters.toPalletLogionLocFile({
        hash,
        nature,
        size,
        submitter,
    });
    expect(palletFile.hash_.toHex()).toBe(hash);
    expect(palletFile.nature.toHex()).toBe(nature);
    expect(palletFile.size_.toBigInt()).toBe(size);
    expect(palletFile.submitter.asPolkadot.toString()).toBe(polkadotAddress);
}
