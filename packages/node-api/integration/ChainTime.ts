import { setup } from "./Util.js";

export async function handleTime() {
    const { api } = await setup();
    const time = await api.time.now();
    const block = time.currentBlock;
    const nextTime = await time.atBlock(block + 1n);
    expect(nextTime.currentTime - time.currentTime).toBe(Number(time.slotDuration));
}
