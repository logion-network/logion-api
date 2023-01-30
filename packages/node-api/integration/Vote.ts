import { AnyJson } from "@polkadot/types-codec/types/helpers";
import { IKeyringPair } from "@polkadot/types/types/interfaces";
import { getExtrinsicEvents, LogionNodeApi, UUID } from "../src";
import { REQUESTER, setup, signAndSend } from "./Util";

export async function createVote() {
    const { alice, api } = await setup();
    const locId = await createClosedLoc({ alice, api });

    const submittable = api.tx.vote.createVoteForAllLegalOfficers(locId.toDecimalString());
    const result = await signAndSend(alice, submittable);
    const events = getExtrinsicEvents(result);
    const voteCreated = events.find(event => event.name === "VoteCreated" && event.section === "vote");
    const eventData = voteCreated?.data as AnyJson[];
    expect(eventData[0] as string).toBe("1");
}

async function createClosedLoc(args: { alice: IKeyringPair, api: LogionNodeApi}): Promise<UUID> {
    const { alice, api } = args;

    const locId = new UUID();
    await signAndSend(alice, api.tx.logionLoc.createPolkadotTransactionLoc(locId.toDecimalString(), REQUESTER));
    await signAndSend(alice, api.tx.logionLoc.close(locId.toDecimalString()));

    return locId;
}
