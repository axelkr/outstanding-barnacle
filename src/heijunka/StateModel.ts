import { State } from './State';

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

    public static Kanban() : StateModel {
        const states : State[] = [];
        states.push(new State('Backlog','Backlog'));
        states.push(new State('Doing','Doing'));
        states.push(new State('Done','Done'));
        return new StateModel('Kanban',states);
    }
}
