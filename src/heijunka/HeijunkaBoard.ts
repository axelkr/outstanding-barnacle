import { ContextCollection } from './ContextCollection';
import { StateModelCollection } from './StateModelCollection';
import { ProjectCollection } from './ProjectCollection';
import { KanbanCardCollection } from './KanbanCardCollection';
import { TaskCollection } from './TaskCollection';

export class HeijunkaBoard {
    readonly kanbanCards: KanbanCardCollection;
    readonly projects: ProjectCollection;
    readonly contexts: ContextCollection;
    readonly stateModels: StateModelCollection;
    readonly tasks: TaskCollection;

    private constructor(kanbanCards: KanbanCardCollection, contexts: ContextCollection, stateModels: StateModelCollection, 
        projects: ProjectCollection, tasks:TaskCollection) {
        this.kanbanCards = kanbanCards;
        this.contexts = contexts;
        this.stateModels = stateModels;
        this.projects = projects;
        this.tasks = tasks;
    }

    public static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard(KanbanCardCollection.createEmptyCollection(), ContextCollection.createEmptyCollection(),
            StateModelCollection.createEmptyCollection(), ProjectCollection.createEmptyCollection(),
            TaskCollection.createEmptyCollection());
    }

    public updateKanbanCards(kanbanCards: KanbanCardCollection): HeijunkaBoard {
        const noChange = (kanbanCards === this.kanbanCards);
        if (noChange) {
            return this;
        }
        return new HeijunkaBoard(kanbanCards, this.contexts, this.stateModels, this.projects, this.tasks);
    }

    public updateContexts(contexts: ContextCollection): HeijunkaBoard {
        const noChange = (contexts === this.contexts);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, contexts, this.stateModels, this.projects, this.tasks);
    }

    public updateStateModels(stateModels: StateModelCollection): HeijunkaBoard {
        const noChange = (stateModels === this.stateModels);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, this.contexts, stateModels, this.projects, this.tasks);
    }

    public updateProjects(projects: ProjectCollection): HeijunkaBoard {
        const noChange = (projects === this.projects);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, this.contexts, this.stateModels, projects, this.tasks);
    }

    public updateTasks(tasks: TaskCollection): HeijunkaBoard {
        const noChange = (tasks === this.tasks);
        if (noChange) {
            return;
        }
        return new HeijunkaBoard(this.kanbanCards, this.contexts, this.stateModels, this.projects, tasks);
    }
}