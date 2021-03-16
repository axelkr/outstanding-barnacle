import { ContextCollection } from './ContextCollection';
import { StateModelCollection } from './StateModelCollection';
import { ProjectCollection } from './ProjectCollection';
import { KanbanCardCollection } from './KanbanCardCollection';
import { StateModel } from './StateModel';
import { Project } from './Project';

export class RootAggregate {
    readonly kanbanCards: KanbanCardCollection;
    readonly projects: ProjectCollection;
    readonly contexts: ContextCollection;
    readonly stateModels:StateModelCollection;

    private constructor(kanbanCards: KanbanCardCollection, contexts: ContextCollection, stateModels: StateModelCollection, projects: ProjectCollection) {
        this.kanbanCards = kanbanCards;
        this.contexts = contexts;
        this.stateModels = stateModels;
        this.projects = projects;
    }

    public static createEmptyRootAggregate(): RootAggregate {
        return new RootAggregate(KanbanCardCollection.createEmptyCollection(), ContextCollection.createEmptyCollection(), 
        StateModelCollection.createEmptyCollection(), new ProjectCollection());
    }

    public updateKanbanCards(kanbanCards: KanbanCardCollection): RootAggregate {
        const noChange = ( kanbanCards === this.kanbanCards);
        if ( noChange) {
            return this;
        }
        return new RootAggregate(kanbanCards, this.contexts, this.stateModels,this.projects);
    }

    public updateContexts(contexts: ContextCollection): RootAggregate {
        const noChange = ( contexts === this.contexts);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.kanbanCards, contexts, this.stateModels,this.projects);
    }
    
    public updateStateModels(stateModels: StateModelCollection): RootAggregate {
        const noChange = ( stateModels === this.stateModels);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.kanbanCards, this.contexts, stateModels,this.projects);
    }
    
    public updateProjects(projects: ProjectCollection): RootAggregate {
        const noChange = ( projects === this.projects);
        if (noChange) {
            return;
        }
        return new RootAggregate(this.kanbanCards, this.contexts, this.stateModels, projects);
    }

    public getStateModelOf(project: Project): StateModel {
        if (project === undefined) {
            throw new Error('input project has to be defined');
        }
        return this.stateModels.get(project.stateModelId);
    }
}