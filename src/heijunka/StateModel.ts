import { IdObject } from './IdObject';
import { State } from './State';

export class StateModel extends IdObject {
    private readonly states: State[];
    private readonly _initialState: State;
    private readonly _trashState: State;
    private readonly _finalStates: State[];
    private readonly _successors: Map<State, State[]> = new Map<State, State[]>();
    readonly name: string;

    constructor(id: string, name: string, states: State[], initialState: State, finalStates: State[], trashState: State) {
        super(id);
        if (typeof states === "undefined") {
            throw new Error('states cannot be undefined');
        }
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        if (typeof initialState === "undefined") {
            throw new Error('initialState cannot be undefined');
        }
        if (typeof trashState === "undefined") {
            throw new Error('trashState cannot be undefined');
        }
        if (typeof finalStates === "undefined") {
            throw new Error('initialState cannot be undefined');
        }

        const initialStateNotPartOfStates = (states.indexOf(initialState) === -1);
        if (initialStateNotPartOfStates) {
            throw new Error('initial state has to be part of the set of states');
        }
        const trashStateNotPartOfStates = (states.indexOf(trashState) === -1);
        if (trashStateNotPartOfStates) {
            throw new Error('trash state has to be part of the set of states');
        }
        finalStates.forEach(aFinalState => {
            const aFinalStateIsPartOfStates = (states.indexOf(aFinalState) > -1);
            if (!aFinalStateIsPartOfStates) {
                throw new Error('each final state has to be part of the set of states');
            }
        })

        const trashStateNotPartOfFinalStates = (finalStates.indexOf(trashState) === -1);
        if (trashStateNotPartOfFinalStates) {
            finalStates.push(trashState);
        }

        this.name = name;
        this.states = states;
        this._initialState = initialState;
        this._trashState = trashState;
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

    public trashState(): State {
        return this._trashState;
    }

    public initialState(): State {
        return this._initialState;
    }

    public finalStates(): State[] {
        return this._finalStates;
    }

    public static serialize(stateModel: StateModel): string {
        let items = new Map<string, string>();
        items = items.set('name', stateModel.name);
        items = items.set('id', stateModel.id);
        items = items.set('initialState', State.serialize(stateModel.initialState()));
        items = items.set('trashState', State.serialize(stateModel.trashState()));
        items = items.set('finalStates', JSON.stringify(stateModel.finalStates().map(x => State.serialize(x))));
        items = items.set('states', JSON.stringify(stateModel.states.map(x => State.serialize(x))));
        const linearizedSuccessorIds: Array<string> = new Array<string>();
        stateModel._successors.forEach((value, key) => {
            value.forEach(aSuccessor => {
                const container = { 'from': key.id, 'to': aSuccessor.id };
                linearizedSuccessorIds.push(JSON.stringify(container));
            })
        })
        items = items.set('successors', JSON.stringify(linearizedSuccessorIds));
        const serialized: string = JSON.stringify(Array.from(items.entries()));
        return serialized;
    }

    public static deserialize(stateModelSerialized: string): StateModel {
        const items: Map<string, string> = new Map<string, string>(JSON.parse(stateModelSerialized));
        const name = items.get('name');
        const id = items.get('id');
        const states: State[] = JSON.parse(items.get('states')).map((x: string) => State.deserialize(x));
        const initialState = states.find(x => x.id === State.deserialize(items.get('initialState')).id);
        const trashState = states.find(x => x.id === State.deserialize(items.get('trashState')).id);
        const linearizedSuccessorIds: Array<string> = JSON.parse(items.get('successors'));

        const finalStates = JSON.parse(items.get('finalStates')).map((x: string) => {
            const idToLookFor = State.deserialize(x).id;
            return states.find(x => x.id === idToLookFor);
        });
        const result = new StateModel(id, name, states, initialState, finalStates, trashState);

        linearizedSuccessorIds.forEach((value) => {
            const container = JSON.parse(value);
            result.setSuccessorOf(result.getState(container.from), result.getState(container.to));
        })
        return result;
    }

    public find(options?: { name?: string }): State[] {
        let states: State[] = [...this.states];

        if (typeof options !== 'undefined') {
            if (typeof options.name !== 'undefined') {
                states = states.filter(aState => aState.name === options.name)
            }
        }

        return states;
    }


    private hasState(state: State): boolean {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        return this.states.some(aState => aState.id == state.id);
    }
}
