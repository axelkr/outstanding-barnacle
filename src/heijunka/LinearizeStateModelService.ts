import { State } from './State';
import { StateModel } from './StateModel';

export class LinearizeStateModelService {
    public linearize(aStateModel: StateModel): State[] {
        const linearizedStates = [aStateModel.initialState()];
        let linearizedOneNode = true;
        while (linearizedOneNode) {
            linearizedOneNode = false;
            linearizedStates.forEach(linearizedState => {
                const successors = aStateModel.successors(linearizedState);
                successors.forEach(aState => {
                    const alreadyLinearized = linearizedStates.indexOf(aState) > -1;
                    if (!alreadyLinearized) {
                        linearizedStates.push(aState);
                        linearizedOneNode = true;
                    }
                })
            })

        }
        return linearizedStates;
    }
}
