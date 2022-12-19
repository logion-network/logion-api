import { arrayEquals } from "./Collections";
import { Endpoint } from "./Http";

export class NetworkState<E extends Endpoint> {

    static allUp<E extends Endpoint>(nodesUp: E[]): NetworkState<E> {
        return new NetworkState(nodesUp, []);
    }

    constructor(nodesUp: E[], nodesDown: E[]) {
        this._nodesUp = nodesUp;
        this._nodesDown = nodesDown;
    }

    private _nodesUp: E[];

    get nodesUp(): E[] {
        return this._nodesUp;
    }

    private _nodesDown: E[];

    get nodesDown(): E[] {
        return this._nodesDown;
    }

    update(params: { nodesUp: E[], nodesDown: E[] }) {
        this._nodesUp = params.nodesUp;
        this._nodesDown = params.nodesDown;
    }

    equals(otherState: NetworkState<E>): boolean {
        return arrayEquals(this._nodesUp.map(endpoint => endpoint.url), otherState._nodesUp.map(endpoint => endpoint.url))
            && arrayEquals(this._nodesDown.map(endpoint => endpoint.url), otherState._nodesDown.map(endpoint => endpoint.url));
    }
}
