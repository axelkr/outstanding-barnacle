import { Context } from './Context';
import { IdObjectCollection } from './IdObjectCollection';

export class ContextCollection {
    private contexts: IdObjectCollection<Context>;
    private active: string[];

    private constructor(contexts: IdObjectCollection<Context>, active: string[]) {
        this.contexts = contexts;
        this.active = active;
    }

    public static createEmptyCollection(): ContextCollection {
        return new ContextCollection(new IdObjectCollection<Context>([]), []);
    }

    public add(aContext: Context): ContextCollection {
        const updatedContexts = this.contexts.add(aContext);
        const noChange = (updatedContexts === this.contexts);
        if (noChange) {
            return this;
        }
        return new ContextCollection(updatedContexts, this.active);
    }

    public has(id: string): boolean {
        return this.contexts.has(id);
    }

    public getContexts(): Context[] {
        return this.contexts.idObjects;
    }

    public get(id: string): Context {
        return this.contexts.get(id);
    }

    public setContext(context: Context, id: string): ContextCollection {
        const updatedContext = context.add(id);
        return this.replace(updatedContext);
    }

    public unsetContext(context: Context, id: string): ContextCollection {
        const updatedContext = context.remove(id);
        return this.replace(updatedContext);
    }

    public activate(context: Context): ContextCollection {
        throw new Error('not implemented');
    }

    public deactivate(context: Context): ContextCollection {
        throw new Error('not implemented');
    }

    public isImplicitlyActive(context: Context): boolean {
        throw new Error('not implemented');
    }

    public isExplicitlyActive(context: Context): boolean {
        throw new Error('not implemented');
    }

    public isIdActive(id: string, context: Context | undefined = undefined): boolean {
        throw new Error('not implemented');
    }

    private replace(updatedContext: Context): ContextCollection {
        return new ContextCollection(this.contexts.replace(updatedContext.id, updatedContext), this.active);
    }
}
