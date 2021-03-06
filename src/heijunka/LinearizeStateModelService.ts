import { State } from './State';
import { StateModel } from './StateModel';

export class LinearizeStateModelService {
    public linearize(aStateModel: StateModel): State[] {
        const stateStillToLinearize = [...aStateModel.tempGetStates()];
        const linearizedStates = [aStateModel.initialState()];
        stateStillToLinearize.splice(stateStillToLinearize.indexOf(aStateModel.initialState()), 1);
        while (stateStillToLinearize.length > 0) {
            const lastState: State = linearizedStates[linearizedStates.length - 1];
            const successors = aStateModel.successors(lastState);
            successors.forEach(aState => {
                const alreadyLinearized = linearizedStates.indexOf(aState) > -1;
                if (!alreadyLinearized) {
                    linearizedStates.push(aState);
                    stateStillToLinearize.splice(stateStillToLinearize.indexOf(aState), 1);
                }
            })
            const atLeastOneStateWasJustLinearized = lastState.id !== linearizedStates[linearizedStates.length - 1].id;
            if (!atLeastOneStateWasJustLinearized) {
                const aState = stateStillToLinearize[0];
                linearizedStates.push(aState);
                stateStillToLinearize.splice(stateStillToLinearize.indexOf(aState), 1);
            }
        }
        return linearizedStates;
    }
}
