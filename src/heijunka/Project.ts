import { Property } from './Property';

export class Project {
    readonly id: string;
    readonly stateModelId: string;
    private readonly properties: Map<string, Property<string>>;

    constructor(id: string, stateModelId: string, properties: Map<string, Property<string>>) {
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
        const newProperty = new Property<string>(initialPropertyValue, initializedAt);
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, newProperty);
        return new Project(this.id, this.stateModelId, updatedProperties);
    }

    updateProperty(propertyName: string, newPropertyValue: string, updatedAt: Date): Project {
        const updatedProperty = this.properties.get(propertyName).update(newPropertyValue, updatedAt);
        if (updatedProperty.value === this.properties.get(propertyName).value) {
            return this;
        }
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, updatedProperty);

        return new Project(this.id, this.stateModelId, updatedProperties);
    }

    valueOfProperty(propertyName: string): string {
        return this.properties.get(propertyName).value;
    }
}
