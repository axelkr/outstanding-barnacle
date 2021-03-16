import { ContextCollection } from './ContextCollection';
import { StateModelCollection } from './StateModelCollection';
import { ProjectCollection } from './ProjectCollection';
import { HeijunkaBoard } from './HeijunkaBoard';
import { StateModel } from './StateModel';
import { Project } from './Project';

export class RootAggregate {
    readonly heijunkaBoard: HeijunkaBoard;
    readonly projects: ProjectCollection;
    readonly contexts: ContextCollection;
    readonly stateModels:StateModelCollection;

    private constructor(heijunkaBoard: HeijunkaBoard, contexts: ContextCollection, stateModels: StateModelCollection, projects: ProjectCollection) {
        this.heijunkaBoard = heijunkaBoard;
        this.contexts = contexts;
        this.stateModels = stateModels;
        this.projects = projects;
    }

    public static createEmptyRootAggregate(): RootAggregate {
        return new RootAggregate(HeijunkaBoard.createEmptyHeijunkaBoard(), ContextCollection.createEmptyCollection(), StateModelCollection.createEmptyCollection(), new ProjectCollection());
    }

    public updateHeijunkaBoard(heijunkaBoard: HeijunkaBoard): RootAggregate {
        const noChange = ( heijunkaBoard === this.heijunkaBoard);
        if ( noChange) {
            return this;
        }
        return new RootAggregate(heijunkaBoard, this.contexts, this.stateModels,this.projects);
    }

    public updateContexts(contexts: ContextCollection): RootAggregate {
        const noChange = ( contexts === this.contexts);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.heijunkaBoard, contexts, this.stateModels,this.projects);
    }
    
    public updateStateModels(stateModels: StateModelCollection): RootAggregate {
        const noChange = ( stateModels === this.stateModels);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.heijunkaBoard, this.contexts, stateModels,this.projects);
    }
    
    public updateProjects(projects: ProjectCollection): RootAggregate {
        const noChange = ( projects === this.projects);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.heijunkaBoard, this.contexts, this.stateModels, projects);
    }


    public getStateModelOf(project: Project): StateModel {
        if (project === undefined) {
            throw new Error('input project has to be defined');
        }
        return this.stateModels.get(project.stateModelId);
    }
}