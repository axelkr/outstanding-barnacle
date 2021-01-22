export class Property<A> {
    readonly value: A;
    private readonly setAt: Date;

    constructor(initialValue: A, setAt: Date) {
        if (typeof initialValue === "undefined") {
            throw new Error('initial value cannot be undefined');
        }
        if (typeof setAt === "undefined") {
            throw new Error('initial date cannot be undefined');
        }
        this.value = initialValue;
        this.setAt = setAt;
    }

    public update(newValue: A, setAt: Date): Property<A> {
        if (typeof newValue === "undefined") {
            throw new Error('new value cannot be undefined');
        }
        if (typeof setAt === "undefined") {
            throw new Error('date of new value cannot be undefined');
        }

        if (this.setAt > setAt) {
            return this;
        }
        return new Property<A>(newValue,setAt);
    }
}