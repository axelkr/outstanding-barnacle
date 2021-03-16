import { StateModel } from './StateModel';
import { IdObjectCollection} from './IdObjectCollection';

export class StateModelCollection {
    private stateModels : IdObjectCollection<StateModel>;

    private constructor(stateModels:IdObjectCollection<StateModel>) {
        this.stateModels = stateModels;
    }

    public static createEmptyCollection(): StateModelCollection {
        return new StateModelCollection(new IdObjectCollection<StateModel>([]));
    }

    public add(aStateModel: StateModel): StateModelCollection {
        const updatedStateModels = this.stateModels.add(aStateModel);
        const noChange = (updatedStateModels === this.stateModels);
        if (noChange) {
            return this;
        }
        
        const anotherStateModelWithSameNameExists = this.stateModels.idObjects.some(aAvailableStateModel => aAvailableStateModel.name === aStateModel.name);
        if (anotherStateModelWithSameNameExists) {
            throw new Error('another state model with name '+aStateModel.name+" already exists");
        }
        
        return new StateModelCollection(updatedStateModels);
    }

    public has(aStateModelId: string): boolean {
        return this.stateModels.has(aStateModelId);
    }

    public get(aStateModelId: string): StateModel {
        return this.stateModels.get(aStateModelId);
    }
}
