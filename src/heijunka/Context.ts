import { IdObject } from './IdObject';

export class Context extends IdObject {
    readonly name: string;

    constructor(id: string, name: string) {
        super(id);
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        this.name = name;
    }
}
