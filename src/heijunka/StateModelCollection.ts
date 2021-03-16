import { StateModel } from './StateModel';

export class StateModelCollection {
    readonly stateModels: StateModel[];

    constructor(stateModels:StateModel[]=[]) {
        this.stateModels = stateModels;
    }

    public add(aStateModel: StateModel): StateModelCollection {
        if (typeof aStateModel === 'undefined') {
            throw new Error('input aStateModel has to be defined');
        }
        if (this.stateModels.some(stateModel => stateModel.name === aStateModel.name)) {
            throw new Error('state model with same name already defined');
        }
        return new StateModelCollection([...this.stateModels, aStateModel])
    }

    public has(aStateModelId: string): boolean {
        if (typeof aStateModelId === 'undefined') {
            throw new Error('input aStateModelId has to be defined');
        }
        return this.stateModels.some(stateModel => stateModel.id === aStateModelId);
    }

    public get(aStateModelId: string): StateModel {
        if (typeof aStateModelId === 'undefined') {
            throw new Error('input aStateModelId has to be defined');
        }
        if ( ! this.has(aStateModelId)) {
            throw new Error('no state model available with id '+aStateModelId);
        }
        return this.stateModels.find(stateModel => stateModel.id === aStateModelId);
    }
}
