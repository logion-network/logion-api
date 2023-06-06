import { AnyJson } from "@polkadot/types-codec/types/helpers.js";
import { IKeyringPair } from "@polkadot/types/types/interfaces.js";
import { Adapters, LogionNodeApiClass, UUID } from "../src/index.js";
import { REQUESTER, setup, signAndSend, ALICE } from "./Util.js";

export async function createVote() {
    const { alice, requester, api } = await setup();
    const locId = await createClosedLoc({ alice, requester, api });

    const submittable = api.polkadot.tx.vote.createVoteForAllLegalOfficers(api.adapters.toLocId(locId));
    const result = await signAndSend(alice, submittable);
    const events = Adapters.getExtrinsicEvents(result);
    const voteCreated = events.find(event => event.name === "VoteCreated" && event.section === "vote");
    const eventData = voteCreated?.data as AnyJson[];
    expect(eventData[0] as string).toBe("1");
}

async function createClosedLoc(args: { alice: IKeyringPair, requester: IKeyringPair, api: LogionNodeApiClass}): Promise<UUID> {
    const { alice, requester, api } = args;

    const locId = new UUID();
    await signAndSend(requester, api.polkadot.tx.logionLoc.createPolkadotTransactionLoc(api.adapters.toLocId(locId), ALICE));
    await signAndSend(alice, api.polkadot.tx.logionLoc.close(api.adapters.toLocId(locId)));

    return locId;
}
