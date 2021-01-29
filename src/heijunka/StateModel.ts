import { State } from './State';

// API of a non-linear model, i.e. a state can have multiple predecessors / successors
// Implementation of a linear model, i.e. successor of states[n] is states[n+1].
// Should allow for easy extension to a non-linear model
export class StateModel {
    readonly states: State[];
    readonly name: string;

    constructor(name: string, states: State[]) {
        if (typeof states === "undefined") {
            throw new Error('states cannot be undefined');
        }
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        this.name = name;
        this.states = states;
    }

    public successors(state: State): State[] {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        if (!this.hasState(state)) {
            throw new Error('unknown state ' + state.name);
        }
        const result: State[] = [];
        const index = this.states.indexOf(state);
        if (index + 1 < this.states.length) {
            result.push(this.states[index + 1]);
        }
        return result;
    }

    public predecessors(state: State): State[] {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        if (!this.hasState(state)) {
            throw new Error('unknown state ' + state.name);
        }
        const result: State[] = [];
        const index = this.states.indexOf(state);
        if (index - 1 >= 0) {
            result.push(this.states[index - 1]);
        }
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
        return this.states[0];
    }

    public static Kanban(): StateModel {
        const states: State[] = [];
        states.push(new State('Backlog', 'Backlog'));
        states.push(new State('Doing', 'Doing'));
        states.push(new State('Done', 'Done'));
        return new StateModel('Kanban', states);
    }

    private hasState(state: State): boolean {
        if (typeof state === "undefined") {
            throw new Error('state cannot be undefined');
        }
        return this.states.some(aState => aState.id == state.id);
    }
}
