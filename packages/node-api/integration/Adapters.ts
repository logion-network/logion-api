import { UUID, MetadataItemParams, Hash, ItemToken, ItemFile, TermsAndConditionsElement } from "../src/index.js";
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
        name: Hash.of("a_name"),
        value: Hash.of("a_value"),
        submitter,
    };
    const palletItem = api.adapters.toPalletLogionLocMetadataItem(item);

    expect(palletItem.name.toHex()).toBe(item.name.toHex());
    expect(palletItem.value.toHex()).toBe(item.value.toHex());
    expect(palletItem.submitter.asPolkadot.toString()).toBe(polkadotAddress);
}

const polkadotAddress = "5FniDvPw22DMW1TLee9N8zBjzwKXaKB2DcvZZCQU5tjmv1kb";

export async function toPalletLogionLocFile() {
    const { api } = await setup();

    const validPolkadotAccountId = api.queries.getValidAccountId(polkadotAddress, "Polkadot");

    const submitter = validPolkadotAccountId;
    const hash = Hash.fromHex("0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2");
    const nature = Hash.of("file-nature");
    const size = BigInt(128000);
    const palletFile = api.adapters.toPalletLogionLocFile({
        hash,
        nature,
        size,
        submitter,
    });
    expect(palletFile.hash_.toHex()).toBe(hash.toHex());
    expect(palletFile.nature.toHex()).toBe(nature.toHex());
    expect(palletFile.size_.toBigInt()).toBe(size);
    expect(palletFile.submitter.asPolkadot.toString()).toBe(polkadotAddress);
}

export async function toCollectionItemToken() {
    const { api } = await setup();

    const itemToken: ItemToken = {
        type: Hash.of("ethereum_erc721"),
        id: Hash.of('{"contract":"0x765df6da33c1ec1f83be42db171d7ee334a46df5","token":"4391"}'),
        issuance: 100n,
    };
    const adapted = api.adapters.toCollectionItemToken(itemToken);
    expect(adapted?.tokenId.toHex()).toBe(itemToken.id.toHex());
    expect(adapted?.tokenType.toHex()).toBe(itemToken.type.toHex());
    expect(adapted?.tokenIssuance).toBe(itemToken.issuance);
}

export async function toCollectionItemFile() {
    const { api } = await setup();

    const itemFile: ItemFile = {
        name: Hash.of("artwork.png"),
        contentType: Hash.of("image/png"),
        size: BigInt(256000),
        hash: Hash.fromHex("0x91820202c3d0fea0c494b53e3352f1934bc177484e3f41ca2c4bca4572d71cd2"),
    };
    const adapted = api.adapters.toCollectionItemFile(itemFile);
    expect(adapted.contentType.toHex()).toBe(itemFile.contentType.toHex());
    expect(adapted.hash_.toHex()).toBe(itemFile.hash.toHex());
    expect(adapted.size_).toBe(itemFile.size);
    expect(adapted.name.toHex()).toBe(itemFile.name.toHex());
}

export async function toTermsAndConditionsElement() {
    const { api } = await setup();

    const termsAndConditions: TermsAndConditionsElement = {
        tcType: Hash.of("Logion"),
        tcLocId: new UUID(),
        details: Hash.of("ITEM-A, ITEM-B, ITEM-C"),
    };
    const adapted = api.adapters.toTermsAndConditionsElement(termsAndConditions);
    expect(adapted.tcType.toHex()).toBe(termsAndConditions.tcType.toHex());
    expect(adapted.tcLoc).toBe(termsAndConditions.tcLocId.toHexString());
    expect(adapted.details.toHex()).toBe(termsAndConditions.details.toHex());
}
