import { Context } from './Context';
import { ContextCollection } from './ContextCollection';
import { HeijunkaBoard } from './HeijunkaBoard';
import { StateModel } from './StateModel';
import { Project } from './Project';

export class RootAggregate {
    readonly heijunkaBoard: HeijunkaBoard;
    readonly contexts: ContextCollection;
    readonly stateModels: StateModel[];

    private constructor(heijunkaBoard: HeijunkaBoard, contexts: ContextCollection, stateModels: StateModel[]) {
        this.heijunkaBoard = heijunkaBoard;
        this.contexts = contexts;
        this.stateModels = stateModels;
    }

    public static createEmptyRootAggregate(): RootAggregate {
        return new RootAggregate(HeijunkaBoard.createEmptyHeijunkaBoard(), new ContextCollection(), []);
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
        if (typeof aStateModel === 'undefined') {
            throw new Error('input aStateModel has to be defined');
        }
        if (this.stateModels.some(stateModel => stateModel.name === aStateModel.name)) {
            throw new Error('state model with same name already defined');
        }
        return new RootAggregate(this.heijunkaBoard, this.contexts, [...this.stateModels, aStateModel])
    }

    public hasStateModel(aStateModelId: string): boolean {
        if (typeof aStateModelId === 'undefined') {
            throw new Error('input aStateModelId has to be defined');
        }
        return this.stateModels.some(stateModel => stateModel.id === aStateModelId);
    }

    public getStateModelOf(project: Project): StateModel {
        if (project === undefined) {
            throw new Error('input project has to be defined');
        }
        return this.stateModels.find(aStateModel => aStateModel.id === project.stateModelId);
    }
}