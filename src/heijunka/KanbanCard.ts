import { Property } from './Property';
import { StateHistory } from './StateHistory';
import { StateTransition } from './StateTransition';

export class KanbanCard {
    readonly id: string;
    readonly project: string;
    readonly history: StateHistory;
    private readonly properties: Map<string, Property<string>>;

    private constructor(id: string, project: string, history: StateHistory, properties: Map<string, Property<string>>) {
        this.id = id;
        this.project = project;
        this.history = history;
        this.properties = properties;
    }

    static create(id: string, project: string): KanbanCard {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof project === "undefined") {
            throw new Error('project cannot be undefined');
        }
        const properties = new Map<string, Property<string>>();
        return new KanbanCard(id, project, StateHistory.emptyHistory(), properties);
    }

    initializeProperty(propertyName: string, initialPropertyValue: string, initializedAt: Date): KanbanCard {
        const newProperty = new Property<string>(initialPropertyValue, initializedAt);
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, newProperty)
        return new KanbanCard(this.id, this.project, this.history, updatedProperties);
    }

    updateProperty(propertyName: string, newPropertyValue: string, updatedAt: Date): KanbanCard {
        const updatedProperty = this.properties.get(propertyName).update(newPropertyValue, updatedAt);
        if (updatedProperty.value === this.properties.get(propertyName).value) {
            return this;
        }
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, updatedProperty)

        return new KanbanCard(this.id, this.project, this.history, updatedProperties);
    }

    valueOfProperty(propertyName: string): string {
        return this.properties.get(propertyName).value;
    }

    transitToNewState(aStateTransition: StateTransition): KanbanCard {
        if (typeof aStateTransition === "undefined") {
            throw new Error('aStateTransition cannot be undefined');
        }
        const updatedHistory = this.history.add(aStateTransition);
        if (updatedHistory.transitions.length == this.history.transitions.length) {
            return this;
        }
        return new KanbanCard(this.id, this.project, updatedHistory, this.properties);
    }
}
