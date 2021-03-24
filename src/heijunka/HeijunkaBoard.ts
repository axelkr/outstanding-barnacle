import { ContextCollection } from './ContextCollection';
import { StateModelCollection } from './StateModelCollection';
import { ProjectCollection } from './ProjectCollection';
import { KanbanCardCollection } from './KanbanCardCollection';

export class HeijunkaBoard {
    readonly kanbanCards: KanbanCardCollection;
    readonly projects: ProjectCollection;
    readonly contexts: ContextCollection;
    readonly stateModels: StateModelCollection;

    private constructor(kanbanCards: KanbanCardCollection, contexts: ContextCollection, stateModels: StateModelCollection, projects: ProjectCollection) {
        this.kanbanCards = kanbanCards;
        this.contexts = contexts;
        this.stateModels = stateModels;
        this.projects = projects;
    }

    public static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard(KanbanCardCollection.createEmptyCollection(), ContextCollection.createEmptyCollection(),
            StateModelCollection.createEmptyCollection(), ProjectCollection.createEmptyCollection());
    }

    public updateKanbanCards(kanbanCards: KanbanCardCollection): HeijunkaBoard {
        const noChange = (kanbanCards === this.kanbanCards);
        if (noChange) {
            return this;
        }
        return new HeijunkaBoard(kanbanCards, this.contexts, this.stateModels, this.projects);
    }

    public updateContexts(contexts: ContextCollection): HeijunkaBoard {
        const noChange = (contexts === this.contexts);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, contexts, this.stateModels, this.projects);
    }

    public updateStateModels(stateModels: StateModelCollection): HeijunkaBoard {
        const noChange = (stateModels === this.stateModels);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, this.contexts, stateModels, this.projects);
    }

    public updateProjects(projects: ProjectCollection): HeijunkaBoard {
        const noChange = (projects === this.projects);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, this.contexts, this.stateModels, projects);
    }
}