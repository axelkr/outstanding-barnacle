export class IdObject {
    readonly id: string;

    constructor(id: string) {
        if (typeof id === "undefined") {
            throw new Error('id cannot be undefined');
        }
        this.id = id;
    }
}
