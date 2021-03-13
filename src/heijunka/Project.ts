import { ReadOnlyProperties } from './ReadOnlyProperties';

export class Project {
    readonly id: string;
    readonly stateModelId: string;
    private readonly properties: ReadOnlyProperties;

    constructor(id: string, stateModelId: string, properties: ReadOnlyProperties) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof stateModelId === "undefined") {
            throw new Error('stateModelId cannot be undefined');
        }
        this.stateModelId = stateModelId;
        this.id = id;
        this.properties = properties;
    }

    initializeProperty(propertyName: string, initialPropertyValue: string, initializedAt: Date): Project {
        return new Project(this.id, this.stateModelId, this.properties.initialize(propertyName,initialPropertyValue,initializedAt));
    }

    updateProperty(propertyName: string, newPropertyValue: string, updatedAt: Date): Project {
        const updatedProperties = this.properties.update(propertyName,newPropertyValue,updatedAt);
        if ( updatedProperties.valueOf(propertyName) === this.properties.valueOf(propertyName)) {
            return this;
        }
        return new Project(this.id, this.stateModelId, updatedProperties);
    }

    valueOfProperty(propertyName: string): string {
        return this.properties.valueOf(propertyName);
    }
}
