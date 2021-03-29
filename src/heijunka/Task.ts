import { IdObject } from './IdObject';
import { ReadOnlyProperties } from './ReadOnlyProperties';

export enum TaskProperties {
    DESCRIPTION = "description",
    DONE = 'done'
  }

export class Task extends IdObject {
    private readonly parentId: string;
    private readonly properties: ReadOnlyProperties;
    readonly createdAt: Date;

    private constructor(id: string, parentId:string, createdAt: Date, properties: ReadOnlyProperties) {
        super(id);
        this.parentId = parentId;
        this.properties = properties;
        this.createdAt = createdAt;
    }

    public static create(id: string, parentId: string, createdAt :Date, description:string ): Task {
        const properties = new ReadOnlyProperties()
            .initialize(TaskProperties.DESCRIPTION,description,createdAt)
            .initialize(TaskProperties.DONE,'',createdAt);
        return new Task(id,parentId,createdAt,properties);
    }

    public description(): string {
        return this.properties.valueOf(TaskProperties.DESCRIPTION);
    }

    public parent(): string {
        return this.parentId;
    }

    public updateDescription(newDescription: string,updatedAt: Date): Task {
        return this.updateProperty(TaskProperties.DESCRIPTION,newDescription,updatedAt);
    }
    
    public markAsDone(doneAt: Date): Task {
        return this.updateProperty(TaskProperties.DONE,doneAt.toUTCString(),doneAt);
    }

    private updateProperty(propertyName:string, newValue:string, updatedAt: Date): Task {
        const updatedProperties = this.properties.update(propertyName, newValue, updatedAt);
        if (updatedProperties.valueOf(propertyName) === this.properties.valueOf(propertyName)) {
            return this;
        }
        return new Task(this.id, this.parentId, this.createdAt, updatedProperties);
    }
}
