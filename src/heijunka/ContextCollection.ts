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
        if (this.active.indexOf(context.id) >= 0) {
            return this;
        }
        return new ContextCollection(this.contexts, [...this.active, context.id]);
    }

    public deactivate(context: Context): ContextCollection {
        if (this.active.indexOf(context.id) === -1) {
            return this;
        }
        const currentlyActive = [...this.active];
        currentlyActive.splice(currentlyActive.indexOf(context.id), 1);
        return new ContextCollection(this.contexts, currentlyActive);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public isImplicitlyActive(context: Context): boolean {
        return this.active.length === 0;
    }

    public isExplicitlyActive(context: Context): boolean {
        return this.active.some(a => a === context.id);
    }

    public isIdActive(id: string, context: Context | undefined = undefined): boolean {
        if (this.contexts.idObjects.length === 0) {
            return true;
        }
        let contextsToSearch: Context[];
        if (typeof context === 'undefined') {
            contextsToSearch = this.getContexts();
        } else {
            contextsToSearch = [this.get(context.id)];
        }
        return contextsToSearch.some(aContext => {
            if (this.isImplicitlyActive(aContext)) {
                return true;
            } else if (this.isExplicitlyActive(aContext)) {
                return aContext.contains(id)
            }
            return false;
        })
    }

    private replace(updatedContext: Context): ContextCollection {
        return new ContextCollection(this.contexts.replace(updatedContext.id, updatedContext), this.active);
    }
}
