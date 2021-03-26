import { IdObject } from './IdObject';

export class IdObjectCollection<T extends IdObject> {
    readonly idObjects: T[];

    constructor(idObjects: T[] = []) {
        this.idObjects = idObjects;
    }

    public add(anIdObject: T): IdObjectCollection<T> {
        if (typeof anIdObject === "undefined") {
            throw new Error('parameter anIdObject cannot be undefined.');
        }
        if (this.has(anIdObject.id)) {
            throw new Error('parameter anIdObject already contained with id ' + anIdObject.id);
        }
        const newIdObjects: Array<T> = [...this.idObjects, anIdObject];
        return new IdObjectCollection<T>(newIdObjects);
    }

    public has(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this.idObjects.some(anIdObject => anIdObject.id === id);
    }

    public get(id: string): T {
        if (typeof id === 'undefined') {
            throw new Error('input id has to be defined');
        }
        if (!this.has(id)) {
            throw new Error('no object available with id ' + id);
        }
        return this.idObjects.find(aIdObject => aIdObject.id === id);
    }

    public replace(id: string, replaceWith: T): IdObjectCollection<T> {
        if (typeof id === 'undefined') {
            throw new Error('input id has to be defined');
        }
        if (typeof replaceWith === 'undefined') {
            throw new Error('input replaceWith has to be defined');
        }
        if (!this.has(id)) {
            return this;
        }
        const newIdObjects: Array<T> = [...this.idObjects];
        newIdObjects[newIdObjects.findIndex(x => x.id === id)] = replaceWith;
        return new IdObjectCollection<T>(newIdObjects);
    }
}
