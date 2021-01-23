import { Property } from './Property';

export class KanbanCard {
    readonly name: Property<string>;
    readonly id: string;
    readonly project: string;

    constructor(id: string, name: string, createdAt: Date, project: string) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof project === "undefined") {
            throw new Error('project cannot be undefined');
        }
        this.name = new Property<string>(name, createdAt);
        this.id = id;
        this.project = project;
    }

    rename(newName: string, updatedAt: Date) : KanbanCard {
        const updatedNameProperty = this.name.update(newName,updatedAt);
        if (updatedNameProperty.value === this.name.value) {
            return this;
        }
        return new KanbanCard(this.id,newName,updatedAt, this.project);
    }
}
