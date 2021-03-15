export class Context {
    readonly id: string;
    readonly name :string;

    constructor(id: string, name: string) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        if (typeof name === "undefined") {
            throw new Error('name cannot be undefined');
        }
        this.name = name;
        this.id = id;
    }
}
