import { ApiPromise } from "@polkadot/api";

export class ChainTime {

    static async now(api: ApiPromise): Promise<ChainTime> {
        const currentBlock = await api.rpc.chain.getBlock();
        const slotDuration = (await api.call.auraApi.slotDuration()).toBigInt();
        return new ChainTime(api, Date.now(), currentBlock.block.header.number.toBigInt(), slotDuration);
    }

    private constructor(api: ApiPromise, now: number, currentBlock: bigint, slotDuration: bigint) {
        this._api = api;
        this._currentTime = now;
        this._currentBlock = currentBlock;
        this._slotDuration = slotDuration;
    }

    private _api: ApiPromise;
    private _currentTime: number;
    private _currentBlock: bigint;
    private _slotDuration: bigint;

    get currentTime(): number {
        return this._currentTime;
    }

    get currentBlock() {
        return this._currentBlock;
    }

    get slotDuration() {
        return this._slotDuration;
    }

    async atDate(date: Date): Promise<ChainTime> {
        const diffInMs = BigInt(date.getTime() - this._currentTime);
        const deltaInBlocks = diffInMs / this.slotDuration;
        const atBlock = this._currentBlock + deltaInBlocks;
        return new ChainTime(this._api, date.getTime(), atBlock, this._slotDuration);
    }

    async atBlock(blockNumber: bigint): Promise<ChainTime> {
        const diffInBlocks = blockNumber - this._currentBlock;
        const deltaInMs = diffInBlocks * this.slotDuration;
        const atTime = this._currentTime + Number(deltaInMs);
        return new ChainTime(this._api, atTime, blockNumber, this._slotDuration);
    }
}
