import { StateTransition } from './StateTransition';

export class StateHistory {
    readonly transitions: StateTransition[];

    private constructor(transitions: StateTransition[]) {
        this.transitions = transitions;
    }

    static emptyHistory(): StateHistory {
        return new StateHistory([]);
    }

    add(aNewTransition: StateTransition): StateHistory {
        if (typeof aNewTransition === "undefined") {
            throw new Error('parameter aNewTransition cannot be undefined.');
        }
        if (this.transitions.some(aTransition => aTransition.state == aNewTransition.state && aTransition.occurredAt === aNewTransition.occurredAt)) {
            return this;
        }
        const newTransitions = [...this.transitions];
        newTransitions.push(aNewTransition);
        return new StateHistory(newTransitions);
    }
}