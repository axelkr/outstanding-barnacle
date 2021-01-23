import { Property } from './Property';
import { StateHistory } from './StateHistory';
import { StateTransition } from './StateTransition';

export class KanbanCard {
    readonly name: Property<string>;
    readonly id: string;
    readonly project: string;
    readonly history: StateHistory;

    private constructor(id: string, name: Property<string>, project: string, history:StateHistory) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.history = history;
    }

    static create(id:string,name:string,createdAt:Date,project:string) : KanbanCard {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof project === "undefined") {
            throw new Error('project cannot be undefined');
        }
        const nameProperty = new Property<string>(name, createdAt);
        return new KanbanCard(id,nameProperty,project,StateHistory.emptyHistory());
    }

    rename(newName: string, updatedAt: Date) : KanbanCard {
        const updatedNameProperty = this.name.update(newName,updatedAt);
        if (updatedNameProperty.value === this.name.value) {
            return this;
        }
        return new KanbanCard(this.id,updatedNameProperty, this.project, this.history);
    }

    transitToNewState(aStateTransition:StateTransition) : KanbanCard {
        if (typeof aStateTransition === "undefined") {
            throw new Error('aStateTransition cannot be undefined');
        }
        const updatedHistory = this.history.add(aStateTransition);
        if ( updatedHistory.transitions.length == this.history.transitions.length) {
            return this;
        }
        return new KanbanCard(this.id,this.name,this.project,updatedHistory);
    }
}
