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

    private _nextState: State | undefined;

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
    ensureCurrent() {
        if(this._discarded) {
            throw new Error("State was discarded");
        }
    }

    /**
     * @description Discards current state. One must discard the state only
     * if the state transition was successfully executed. It may be safer to
     * use `discardOnSuccess`.
     */
    discard(next: State | undefined) {
        this.ensureCurrent();
        this._discarded = true;
        this._nextState = next;
    }

    /**
     * @descripiton Discards current state only if given state transition logic
     * executed successfully (i.e. without throwing an error).
     * @param action The state transition logic producing next state
     * @returns Next state if state transition logic execution did not throw
     */
    async discardOnSuccess<T extends State, U extends State = T>(action: (current: T) => Promise<U>): Promise<U> {
        const current = this.getCurrentStateOrThrow();
        let next: U | undefined;
        try {
            next = await action(current as T);
            return next;
        } finally {
            if(next !== undefined) {
                current.discard(next);
            }
        }
    }

    /**
     * @descripiton Same as `discardOnSuccess` but with a synchronous action.
     * @param action The state transition logic producing next state
     * @returns Next state if state transition logic execution did not throw
     */
    syncDiscardOnSuccess<T extends State, U extends State = T>(action: (current: T) => U): U {
        const current = this.getCurrentStateOrThrow();
        let next: U | undefined;
        try {
            next = action(current as T);
            return next;
        } finally {
            if(next !== undefined) {
                current.discard(next);
            }
        }
    }

    /**
     * @description If the state has been discarded, provides the replacing current state if any.
     * @returns This state if not discareded or the current state or undefined when there is no current state.
     */
    getCurrentState(): State | undefined {
        if(this.discarded) {
            let next: State | undefined = this._nextState;
            while(next && next.discarded) {
                next = next._nextState;
            }
            return next;
        } else {
            return this;
        }
    }

    getCurrentStateOrThrow(): State {
        const currentState = this.getCurrentState();
        if(currentState) {
            return currentState;
        } else {
            throw new Error("State was discarded without replacement");
        }
    }

    /**
     * @descripiton Finalizes (i.e. replaces with no new state) current state only if given state transition logic
     * executed successfully (i.e. without throwing an error).
     * @param action The state transition logic producing next state
     * @returns Next state if state transition logic execution did not throw
     */
    async finalizeOnSuccess<T extends State>(action: (current: T) => Promise<void>): Promise<void> {
        const current = this.getCurrentStateOrThrow();
        try {
            await action(current as T);
        } finally {
            current.discard(undefined);
        }
    }
}
