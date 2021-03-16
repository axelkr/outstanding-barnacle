import { Context } from './Context';
import { ContextCollection } from './ContextCollection';
import { StateModelCollection } from './StateModelCollection';
import { HeijunkaBoard } from './HeijunkaBoard';
import { StateModel } from './StateModel';
import { Project } from './Project';

export class RootAggregate {
    readonly heijunkaBoard: HeijunkaBoard;
    readonly contexts: ContextCollection;
    readonly stateModels:StateModelCollection;

    private constructor(heijunkaBoard: HeijunkaBoard, contexts: ContextCollection, stateModels: StateModelCollection) {
        this.heijunkaBoard = heijunkaBoard;
        this.contexts = contexts;
        this.stateModels = stateModels;
    }

    public static createEmptyRootAggregate(): RootAggregate {
        return new RootAggregate(HeijunkaBoard.createEmptyHeijunkaBoard(), new ContextCollection(), new StateModelCollection());
    }

    public setHeijunkaBoard(heijunkaBoard: HeijunkaBoard): RootAggregate {
        return new RootAggregate(heijunkaBoard, this.contexts, this.stateModels);
    }

    public addContext(aContext: Context): RootAggregate {
        const updatedContextModel = this.contexts.add(aContext);
        const noChange = ( updatedContextModel === this.contexts);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.heijunkaBoard, updatedContextModel, this.stateModels);
    }

    public addStateModel(aStateModel: StateModel): RootAggregate {
        return new RootAggregate(this.heijunkaBoard,this.contexts,this.stateModels.add(aStateModel));
    }

    public getStateModelOf(project: Project): StateModel {
        if (project === undefined) {
            throw new Error('input project has to be defined');
        }
        return this.stateModels.get(project.stateModelId);
    }
}