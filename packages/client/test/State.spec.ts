import { State } from "../src/index.js";

describe("State", () => {

    it("can be discarded", () => {
        const first = new FirstState();
        const intermediate = new IntermediateState();
        first.discardWith(intermediate);
        const current = new CurrentState();
        intermediate.discardWith(current);

        expect(first.discarded).toBe(true);
        expect(intermediate.discarded).toBe(true);
        expect(current.discarded).toBe(false);

        expect(first.getCurrentState()).toBe(current);
        expect(intermediate.getCurrentState()).toBe(current);
        expect(current.getCurrentState()).toBe(current);
    });
});

class FirstState extends State {

    discardWith(nextState: IntermediateState | undefined) {
        this.discard(nextState);
    }
}

class IntermediateState extends State {

    discardWith(nextState: CurrentState | undefined) {
        this.discard(nextState);
    }
}

class CurrentState extends State {

}
