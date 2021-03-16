import { Context } from './Context';
import { HeijunkaBoard } from './HeijunkaBoard';
import { StateModel } from './StateModel';

export class RootAggregate {
    readonly heijunkaBoard: HeijunkaBoard;
    readonly contexts: Context[];
    readonly stateModels: StateModel[];

    private constructor(heijunkaBoard: HeijunkaBoard, contexts: Context[], stateModels: StateModel[]) {
        this.heijunkaBoard = heijunkaBoard;
        this.contexts = contexts;
        this.stateModels = stateModels;
    }

    public static createEmptyRootAggregate(): RootAggregate {
        return new RootAggregate(HeijunkaBoard.createEmptyHeijunkaBoard(), [], []);
    }

    public setHeijunkaBoard(heijunkaBoard: HeijunkaBoard): RootAggregate {
        return new RootAggregate(heijunkaBoard,this.contexts,this.stateModels);
    }
}