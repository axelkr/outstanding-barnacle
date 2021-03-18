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
        newTransitions.sort((a, b) => a.occurredAt.valueOf() - b.occurredAt.valueOf());
        return new StateHistory(newTransitions);
    }

    atDate(aDate: Date): StateTransition | undefined {
        if (typeof aDate === "undefined") {
            throw new Error('parameter aDate cannot be undefined.');
        }
        
        if (this.transitions.length === 0) {
            return undefined;
        }
        let lastTransition: StateTransition | undefined = undefined;
        let nextIndex = 0;
        while (nextIndex < this.transitions.length && this.transitions[nextIndex].occurredAt < aDate) {
            lastTransition = this.transitions[nextIndex];
            nextIndex = nextIndex + 1;
        }
        return lastTransition;
    }

    currentStateTransition(): StateTransition | undefined {
        if (this.transitions.length === 0) {
            return undefined;
        } else {
            return this.transitions[this.transitions.length - 1];
        }
    }
}