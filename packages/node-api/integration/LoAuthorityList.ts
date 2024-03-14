import { ALICE, DAVE, FERDIE, setup, signAndSend } from "./Util.js";

export async function addGuestLegalOfficer() {
    const { alice, api } = await setup();
    const extrinsic = api.polkadot.tx.loAuthorityList.addLegalOfficer(DAVE, {
        Guest: ALICE,
    });
    const sudoExtrinsic = api.polkadot.tx.sudo.sudo(extrinsic);
    const result = await signAndSend(alice, sudoExtrinsic);
    expect(result.dispatchError).not.toBeDefined();
    const entry = await api.polkadot.query.loAuthorityList.legalOfficerSet(DAVE);
    expect(entry.isSome).toBe(true);
    const host = entry.unwrap().asGuest;
    expect(host.hostId.toString()).toBe(ALICE);
}

export async function updateHostLegalOfficer() {
    const { alice, api } = await setup();
    const nodeId = "12D3KooWBmAwcd4PJNJvfV89HwE48nwkRmAgo8Vy3uQEyNNHBox2";
    const region = "Europe";
    const data = api.adapters.toPalletLoAuthorityListLegalOfficerDataHost({
        nodeId,
        region,
    });
    const extrinsic = api.polkadot.tx.loAuthorityList.updateLegalOfficer(ALICE, data);
    const sudoExtrinsic = api.polkadot.tx.sudo.sudo(extrinsic);
    const result = await signAndSend(alice, sudoExtrinsic);
    expect(result.dispatchError).not.toBeDefined();

    const entry = await api.polkadot.query.loAuthorityList.legalOfficerSet(ALICE);
    expect(entry.isSome).toBe(true);
    const hostData = entry.unwrap().asHost;
    expect(hostData.region.isEurope).toBe(true);
    expect(api.adapters.fromLogionNodeRuntimeRegion(hostData.region)).toBe(region);

    const host = await api.queries.getLegalOfficerData(ALICE);
    expect(host.isHost).toBe(true);
    expect(host.guests?.length).toBe(1);
    expect(host.hostAddress).toBeUndefined();
    expect(host.hostData?.nodeId).toBe(nodeId);
    expect(host.hostData?.region).toBe(region);
}

export async function getAvailableRegions() {
    const { api } = await setup();
    const defaultRegion = api.queries.getDefaultRegion();
    const regions = api.queries.getAvailableRegions();
    expect(regions).toContain(defaultRegion);
}

export async function importHost() {
    const { api, alice } = await setup();
    const nodeId = "12D3KooWDh3ZkezHgdC1A7MB32m43HHsGPDy1aGoA3svhN4Z8qYt";
    const baseUrl = "https://some-node.logion.network";
    const region = "Europe";
    const params = api.adapters.toPalletLoAuthorityListHostDataParam({
        nodeId,
        baseUrl,
        region,
    });
    const extrinsic = api.polkadot.tx.loAuthorityList.importHostLegalOfficer(FERDIE, params);
    const sudoExtrinsic = api.polkadot.tx.sudo.sudo(extrinsic);
    await signAndSend(alice, sudoExtrinsic);

    const host = await api.queries.getLegalOfficerData(FERDIE);
    expect(host.hostData?.nodeId).toBe(nodeId);
    expect(host.hostData?.baseUrl).toBe(baseUrl);
    expect(host.hostData?.region).toBe(region);
}
