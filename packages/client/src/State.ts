/**
 * A State instance is a state in the "state machine" sense. It comes
 * with some behavior and state transition methods. A state transition
 * method returns an instance of the next state given the
 * executed operation, which discards current object.
 * 
 * This class should be extended by client class. It provides method
 * enabling the client class to query if it was already discarded
 * or not as well as methods actually discarding the state.
 */
export class State {

    constructor() {
        this._discarded = false;
    }

    private _discarded: boolean;

    /**
     * @description True if this state was discarded
     */
    get discarded(): boolean {
        return this._discarded;
    }

    /**
     * @description Throws an error if this state was discarded.
     * This should be called by all public methods of client class.
     */
    protected ensureCurrent() {
        if(this._discarded) {
            throw new Error("State was discarded");
        }
    }

    /**
     * @description Discards current state. One must discard the state only
     * if the state transition was successfully executed. It may be safer to
     * use `discardOnSuccess`.
     */
    protected discard() {
        this.ensureCurrent();
        this._discarded = true;
    }

    /**
     * @descripiton Discards current state only if given state transition logic
     * executed successfully (i.e. without throwing an error).
     * @param action The state transition logic producing next state
     * @returns Next state if state transition logic execution did not throw
     */
    protected async discardOnSuccess<T extends State>(action: () => Promise<T>): Promise<T> {
        this.ensureCurrent();
        try {
            return await action();
        } finally {
            this.discard();
        }
    }

    /**
     * @descripiton Same as `discardOnSuccess` but with a synchronous action.
     * @param action The state transition logic producing next state
     * @returns Next state if state transition logic execution did not throw
     */
     protected syncDiscardOnSuccess<T extends State>(action: () => T): T {
        this.ensureCurrent();
        try {
            return action();
        } finally {
            this.discard();
        }
    }
}
