export class Property<A> {
    private value: A;
    private setAt: Date;

    constructor(initialValue:A, setAt:Date) {
        if ( typeof initialValue === "undefined") {
            throw new Error('initial value cannot be undefined');
        }
        if ( typeof setAt === "undefined") {
            throw new Error('initial date cannot be undefined');
        }
        this.value = initialValue;
        this.setAt = setAt;
    }

    public get() : A {
        return this.value; 
    }

    public update(newValue:A, setAt:Date) {
        if ( typeof newValue === "undefined") {
            throw new Error('new value cannot be undefined');
        }
        if ( typeof setAt === "undefined") {
            throw new Error('date of new value cannot be undefined');
        }

        if (this.setAt > setAt) {
            return;
        }
        this.setAt = setAt;
        this.value = newValue;
    }
}