import { Property } from './Property';

export class Project {
    readonly name: Property<string>;
    readonly id: string;
    readonly stateModelId: string;

    constructor(id: string, stateModelId: string, name: string, createdAt: Date) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof stateModelId === "undefined") {
            throw new Error('stateModelId cannot be undefined');
        }
        this.name = new Property<string>(name, createdAt);
        this.stateModelId = stateModelId;
        this.id = id;
    }

    rename(newName: string, updatedAt: Date) : Project {
        const updatedNameProperty = this.name.update(newName,updatedAt);
        if (updatedNameProperty.value === this.name.value) {
            return this;
        }
        return new Project(this.id,this.stateModelId,newName,updatedAt);
    }
}
