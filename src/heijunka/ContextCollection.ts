import { Context } from './Context';
import { IdObjectCollection} from './IdObjectCollection';

export class ContextCollection {
    private contexts : IdObjectCollection<Context>;

    private constructor(contexts: IdObjectCollection<Context>) {
        this.contexts = contexts;
    }

    public static createEmptyCollection(): ContextCollection {
        return new ContextCollection(new IdObjectCollection<Context>([]));
    }

    public add(aContext: Context): ContextCollection {
        const updatedContexts = this.contexts.add(aContext);
        const noChange = (updatedContexts === this.contexts);
        if (noChange) {
            return this;
        }
        return new ContextCollection(updatedContexts);
    }

    public has(id: string): boolean {
        return this.contexts.has(id);
    }

    public getContexts(): Context[] {
        return this.contexts.idObjects;
    }
}
