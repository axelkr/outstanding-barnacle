import { IdObject } from './IdObject';
import { ReadOnlyProperties } from './ReadOnlyProperties';

export class Project extends IdObject {
    readonly stateModelId: string;
    readonly isReadonly: boolean;
    private readonly properties: ReadOnlyProperties;

    private constructor(id: string, stateModelId: string, properties: ReadOnlyProperties, isReadonly: boolean) {
        super(id);
        if (typeof stateModelId === "undefined") {
            throw new Error('stateModelId cannot be undefined');
        }
        this.stateModelId = stateModelId;
        this.properties = properties;
        this.isReadonly = isReadonly;
    }

    static create(id: string, stateModelId: string, isReadonly = false): Project {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof stateModelId === "undefined") {
            throw new Error('stateModelId cannot be undefined');
        }
        const properties = new ReadOnlyProperties();
        return new Project(id, stateModelId, properties, isReadonly);
    }

    initializeProperty(propertyName: string, initialPropertyValue: string, initializedAt: Date): Project {
        return new Project(this.id, this.stateModelId, this.properties.initialize(propertyName, initialPropertyValue, initializedAt), this.isReadonly);
    }

    updateProperty(propertyName: string, newPropertyValue: string, updatedAt: Date): Project {
        const updatedProperties = this.properties.update(propertyName, newPropertyValue, updatedAt);
        if (updatedProperties.valueOf(propertyName) === this.properties.valueOf(propertyName)) {
            return this;
        }
        return new Project(this.id, this.stateModelId, updatedProperties, this.isReadonly);
    }

    valueOfProperty(propertyName: string): string {
        return this.properties.valueOf(propertyName);
    }
}
