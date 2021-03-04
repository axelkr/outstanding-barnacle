import { State } from './State';

export class StateModel {
    private readonly states: State[];
    private readonly _initialState: State;
    private readonly _finalStates: State[];
    private readonly _successors: Map<State, State[]> = new Map<State, State[]>();
    readonly name: string;

    constructor(name: string, states: State[], initialState: State, finalStates: State[]) {
        if (typeof states === "undefined") {
            throw new Error('states cannot be undefined');
        }
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        if (typeof initialState === "undefined") {
            throw new Error('initialState cannot be undefined');
        }
        if (typeof finalStates === "undefined") {
            throw new Error('initialState cannot be undefined');
        }

        const initialStateNotPartOfStates = (states.indexOf(initialState) === -1);
        if (initialStateNotPartOfStates) {
            throw new Error('initial state has to be part of the set of states');
        }
        finalStates.forEach(aFinalState => {
            const aFinalStateIsPartOfStates = (states.indexOf(aFinalState) > -1);
            if (!aFinalStateIsPartOfStates) {
                throw new Error('each final state has to be part of the set of states');
            }
        })

        this.name = name;
        this.states = states;
        this._initialState = initialState;
        this._finalStates = finalStates;

        this.states.forEach(aState => {
            this._successors.set(aState, []);
        })
    }

    public setSuccessorOf(fromState: State, toState: State): void {
        const currentStates = this._successors.get(fromState);
        currentStates.push(toState);
        this._successors.set(fromState, currentStates);
    }

    public successors(state: State): State[] {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        if (!this.hasState(state)) {
            throw new Error('unknown state ' + state.name);
        }
        return this._successors.get(state);
    }

    public predecessors(state: State): State[] {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        if (!this.hasState(state)) {
            throw new Error('unknown state ' + state.name);
        }
        const result: State[] = [];
        this._successors.forEach((successors, key) => {
            if (successors.indexOf(state) >= 0) {
                result.push(key);
            }
        });
        return result;
    }

    public getState(id: string): State {
        const aState = this.states.find(aState => aState.id == id);
        if (typeof aState === "undefined") {
            throw new Error('unknown state with id ' + id);
        }
        return aState;
    }

    public initialState(): State {
        return this._initialState;
    }

    public finalStates(): State[] {
        return this._finalStates;
    }

    private hasState(state: State): boolean {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        return this.states.some(aState => aState.id == state.id);
    }
}
