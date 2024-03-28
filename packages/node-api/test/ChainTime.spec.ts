import { ApiPromise } from "@polkadot/api";
import { ChainTime } from "../src/index.js";

describe("ChainTime", () => {

    it("creates now", async () => {
        const api = buildPolkadotApiForTime();
        const chainTime = await ChainTime.now(api);
        expect(chainTime.currentTime).toBeDefined();
        expect(chainTime.currentBlock).toBe(CURRENT_BLOCK_NUMBER.toBigInt());
    })

    it("creates chain time by date in the future", async () => {
        const api = buildPolkadotApiForTime();
        const nowTime = await ChainTime.now(api);
        const blocksInFuture = 3;
        const msInFuture = EXPECTED_BLOCK_TIME_IN_MS * blocksInFuture;

        const atTime = await nowTime.atDate(new Date(nowTime.currentTime + msInFuture));

        expect(atTime !== nowTime).toBe(true);
        expect(atTime.currentTime).toBe(nowTime.currentTime + msInFuture);
        expect(atTime.currentBlock).toBe(nowTime.currentBlock + BigInt(blocksInFuture));
    })

    const EXPECTED_BLOCK_TIME_IN_MS = 6000;

    it("creates chain time by date in the past", async () => {
        const api = buildPolkadotApiForTime();
        const nowTime = await ChainTime.now(api);
        const blocksInPast = 3;
        const msInPast = EXPECTED_BLOCK_TIME_IN_MS * blocksInPast;

        const atTime = await nowTime.atDate(new Date(nowTime.currentTime - msInPast));

        expect(atTime !== nowTime).toBe(true);
        expect(atTime.currentTime).toBe(nowTime.currentTime - msInPast);
        expect(atTime.currentBlock).toBe(nowTime.currentBlock - BigInt(blocksInPast));
    })

    it("creates chain time by block in the future", async () => {
        const api = buildPolkadotApiForTime();
        const nowTime = await ChainTime.now(api);
        const blocksInFuture = BigInt(3);

        const atTime = await nowTime.atBlock(nowTime.currentBlock + blocksInFuture);

        expect(atTime !== nowTime).toBe(true);
        expect(atTime.currentTime).toBe(nowTime.currentTime + Number(blocksInFuture * BigInt(EXPECTED_BLOCK_TIME_IN_MS)));
        expect(atTime.currentBlock).toBe(nowTime.currentBlock + blocksInFuture);
    })

    it("creates chain time by block in the past", async () => {
        const api = buildPolkadotApiForTime();
        const nowTime = await ChainTime.now(api);
        const blocksInPast = BigInt(3);

        const atTime = await nowTime.atBlock(nowTime.currentBlock - blocksInPast);

        expect(atTime !== nowTime).toBe(true);
        expect(atTime.currentTime).toBe(nowTime.currentTime - Number(blocksInPast * BigInt(EXPECTED_BLOCK_TIME_IN_MS)));
        expect(atTime.currentBlock).toBe(nowTime.currentBlock - BigInt(blocksInPast));
    })
})

function buildPolkadotApiForTime() {
    return {
        call: {
            auraApi: {
                slotDuration: () => Promise.resolve({
                    toBigInt: () => 6000n
                }),
            }
        },

        rpc: {
            chain: {
                getBlock: () => CURRENT_BLOCK,
            }
        }
    } as unknown as ApiPromise;
}

export const CURRENT_BLOCK_NUMBER = {
    toBigInt: () => BigInt(42)
};

export const CURRENT_BLOCK = {
    block: {
        header: {
            number: CURRENT_BLOCK_NUMBER
        }
    }
};
