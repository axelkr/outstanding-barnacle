import { Property } from './Property';

export class ReadOnlyProperties {
    private readonly properties: Map<string, Property<string>>;

    constructor(properties: Map<string, Property<string>> = new Map<string, Property<string>>()) {
        this.properties = properties;
    }

    initialize(propertyName: string, initialPropertyValue: string, initializedAt: Date): ReadOnlyProperties {
        const newProperty = new Property<string>(initialPropertyValue, initializedAt);
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, newProperty);
        return new ReadOnlyProperties(updatedProperties);
    }

    update(propertyName: string, newPropertyValue: string, updatedAt: Date): ReadOnlyProperties {
        const updatedProperty = this.properties.get(propertyName).update(newPropertyValue, updatedAt);
        if (updatedProperty.value === this.properties.get(propertyName).value) {
            return this;
        }
        const updatedProperties = new Map<string, Property<string>>(this.properties);
        updatedProperties.set(propertyName, updatedProperty);

        return new ReadOnlyProperties(updatedProperties);
    }

    valueOf(propertyName: string): string {
        return this.properties.get(propertyName).value;
    }
}
