import { AnyJson } from "@polkadot/types-codec/types/helpers.js";
import { IKeyringPair } from "@polkadot/types/types/interfaces.js";
import { Adapters, LogionNodeApiClass, UUID } from "../src/index.js";
import { REQUESTER, setup, signAndSend } from "./Util.js";

export async function createVote() {
    const { alice, api } = await setup();
    const locId = await createClosedLoc({ alice, api });

    const submittable = api.polkadot.tx.vote.createVoteForAllLegalOfficers(api.adapters.toLocId(locId));
    const result = await signAndSend(alice, submittable);
    const events = Adapters.getExtrinsicEvents(result);
    const voteCreated = events.find(event => event.name === "VoteCreated" && event.section === "vote");
    const eventData = voteCreated?.data as AnyJson[];
    expect(eventData[0] as string).toBe("1");
}

async function createClosedLoc(args: { alice: IKeyringPair, api: LogionNodeApiClass}): Promise<UUID> {
    const { alice, api } = args;

    const locId = new UUID();
    await signAndSend(alice, api.polkadot.tx.logionLoc.createPolkadotTransactionLoc(api.adapters.toLocId(locId), REQUESTER));
    await signAndSend(alice, api.polkadot.tx.logionLoc.close(api.adapters.toLocId(locId)));

    return locId;
}
