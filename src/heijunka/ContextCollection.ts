import { Context } from './Context';

export class ContextCollection {
    readonly contexts: Context[];

    constructor(contexts:Context[]=[]) {
        this.contexts = contexts;
    }

    public add(aContext: Context): ContextCollection {
        if (typeof aContext === "undefined") {
            throw new Error('parameter aContext cannot be undefined.');
        }
        if (this.hasContext(aContext.id)) {
            return this;
        }
        const newContexts = [...this.contexts];
        newContexts.push(aContext);
        return new ContextCollection(newContexts);
    }

    public hasContext(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this.contexts.some(aContext => aContext.id === id);
    }
}
