import { Property } from './Property';

export class Project {
    readonly name: Property<string>;
    readonly id: string;

    constructor(id: string, name: string, createdAt: Date) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        this.name = new Property<string>(name, createdAt);
        this.id = id;
    }

    updateName(newName: string, updatedAt: Date) : Project {
        const updatedNameProperty = this.name.update(newName,updatedAt);
        if (updatedNameProperty.value === this.name.value) {
            return this;
        }
        return new Project(this.id,newName,updatedAt);
    }
}
