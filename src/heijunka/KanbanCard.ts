import { StateHistory } from './StateHistory';
import { StateTransition } from './StateTransition';
import { ReadOnlyProperties } from './ReadOnlyProperties';
import { IdObject } from './IdObject';

export class KanbanCard extends IdObject {
    readonly project: string;
    readonly history: StateHistory;
    private readonly properties: ReadOnlyProperties;

    private constructor(id: string, project: string, history: StateHistory, properties: ReadOnlyProperties) {
        super(id);
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
        const properties = new ReadOnlyProperties();
        return new KanbanCard(id, project, StateHistory.emptyHistory(), properties);
    }

    initializeProperty(propertyName: string, initialPropertyValue: string, initializedAt: Date): KanbanCard {
        return new KanbanCard(this.id, this.project, this.history, this.properties.initialize(propertyName, initialPropertyValue, initializedAt));
    }

    updateProperty(propertyName: string, newPropertyValue: string, updatedAt: Date): KanbanCard {
        const updatedProperties = this.properties.update(propertyName, newPropertyValue, updatedAt);
        if (updatedProperties.valueOf(propertyName) === this.properties.valueOf(propertyName)) {
            return this;
        }
        return new KanbanCard(this.id, this.project, this.history, updatedProperties);
    }

    valueOfProperty(propertyName: string): string {
        if (this.properties.has(propertyName)) {
            return this.properties.valueOf(propertyName);
        }
        return undefined;
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
