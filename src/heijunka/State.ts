export class State {
    readonly name: string;
    readonly id: string;

    constructor(id: string, name: string) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        this.id = id;
        this.name = name;
    }

    public static serialize(state: State): string {
        let items = new Map<string, string>();
        items = items.set('name', state.name);
        items = items.set('id', state.id);
        return JSON.stringify(Array.from(items.entries()));
    }

    public static deserialize(serizalizedState: string): State {
        const items: Map<string, string> = new Map<string, string>(JSON.parse(serizalizedState));
        return new State(items.get('id'), items.get('name'));
    }
}
