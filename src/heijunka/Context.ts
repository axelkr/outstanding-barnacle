import { IdObject } from './IdObject';

export class Context extends IdObject {
    readonly name: string;
    private idsInContext: string[] = [];

    constructor(id: string, name: string, idsInContext: string[] = []) {
        super(id);
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        this.name = name;
        this.idsInContext = idsInContext;
    }

    public add(id: string): Context {
        const indexOfId = this.idsInContext.findIndex(x => x === id);
        if (indexOfId > -1) {
            return this;
        }
        return new Context(this.id, this.name, [... this.idsInContext, id]);
    }

    public remove(id: string): Context {
        const indexOfId = this.idsInContext.findIndex(x => x === id);
        if (indexOfId === -1) {
            return this;
        }
        const newIndices = [...this.idsInContext];
        newIndices.splice(indexOfId, 1);
        return new Context(this.id, this.name, newIndices);
    }

    public contains(id: string): boolean {
        const indexOfId = this.idsInContext.findIndex(x => x === id);
        return indexOfId >= 0;
    }
}
