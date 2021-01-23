import { State } from './State';

export enum TransitionType {
    inProgress = 'In Progress',
    completed = 'Completed',
}
 
export class StateTransition {
    readonly state : State;
    readonly type : TransitionType;
    readonly occurredAt : Date;

    private constructor(state:State,type:TransitionType,occurredAt:Date) {
        if (typeof state === "undefined") {
            throw new Error('parameter state cannot be undefined.');
        }
        if (typeof type === "undefined") {
            throw new Error('parameter type cannot be undefined.');
        }
        if (typeof occurredAt === "undefined") {
            throw new Error('parameter occurredAt cannot be undefined.');
        }
    }

    public static completedState(state:State,occurredAt:Date) : StateTransition {
        return new StateTransition(state,TransitionType.completed,occurredAt);
    }

    public static inProgressInState(state:State,occurredAt:Date) : StateTransition {
        return new StateTransition(state,TransitionType.inProgress,occurredAt);
    }
}