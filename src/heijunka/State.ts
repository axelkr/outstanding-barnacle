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
}
