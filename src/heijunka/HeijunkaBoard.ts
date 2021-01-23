import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { StateModel } from './StateModel';

export class HeijunkaBoard {
    readonly projects: Array<Project>;
    readonly kanbanCards: Array<KanbanCard>;
    readonly stateModel: StateModel;

    static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard([], StateModel.Kanban(), []);
    }

    private constructor(projects: Array<Project>, stateModel: StateModel, kanbanCards: Array<KanbanCard>) {
        this.projects = projects;
        this.stateModel = stateModel;
        this.kanbanCards = kanbanCards;
    }

    public addProject(aProject: Project): HeijunkaBoard {
        if (typeof aProject === "undefined") {
            throw new Error('parameter aProject cannot be undefined.');
        }
        if (this.hasProject(aProject.id)) {
            return this;
        }
        const newProjects = [...this.projects];
        newProjects.push(aProject);
        return new HeijunkaBoard(newProjects, this.stateModel, this.kanbanCards);
    }


    public addKanbanCard(aKanbanCard: KanbanCard): HeijunkaBoard {
        if (typeof aKanbanCard === "undefined") {
            throw new Error('parameter aKanbanCard cannot be undefined.');
        }
        if (this.hasKanbanCard(aKanbanCard.id)) {
            return this;
        }
        const newKanbanCards = [...this.kanbanCards];
        newKanbanCards.push(aKanbanCard);
        return new HeijunkaBoard(this.projects, this.stateModel, newKanbanCards);
    }

    public renameProject(id: string, renameAt: Date, renameTo: string): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof renameAt === "undefined") {
            throw new Error('parameter renameAt cannot be undefined.');
        }
        if (typeof renameTo === "undefined") {
            throw new Error('parameter renameTo cannot be undefined.');
        }
        if (!this.hasProject(id)) {
            throw new Error('unknown project with id ' + id);
        }

        let didRename = true;
        const newProjects: Project[] = [];
        this.projects.forEach(aProject => {
            if (aProject.id === id) {
                const renamedProject = aProject.rename(renameTo, renameAt);
                didRename = renamedProject.name.value !== aProject.name.value;
                newProjects.push(renamedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        if (didRename) {
            return new HeijunkaBoard(newProjects, this.stateModel, this.kanbanCards);
        } else {
            return this;
        }
    }

    public hasProject(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this.projects.some(aProject => aProject.id === id);
    }

    public hasKanbanCard(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this.kanbanCards.some(aKanbanCard => aKanbanCard.id === id);
    }

    public renameKanbanCard(id: string, renameAt: Date, renameTo: string): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof renameAt === "undefined") {
            throw new Error('parameter renameAt cannot be undefined.');
        }
        if (typeof renameTo === "undefined") {
            throw new Error('parameter renameTo cannot be undefined.');
        }
        if (!this.hasKanbanCard(id)) {
            throw new Error('unknown kanban card with id ' + id);
        }

        let didRename = true;
        const newKanbanCards: KanbanCard[] = [];
        this.kanbanCards.forEach(aKanbanCard => {
            if (aKanbanCard.id === id) {
                const renamedKanbanCard = aKanbanCard.rename(renameTo, renameAt);
                didRename = renamedKanbanCard.name.value !== aKanbanCard.name.value;
                newKanbanCards.push(renamedKanbanCard);
            } else {
                newKanbanCards.push(aKanbanCard);
            }
        })
        if (didRename) {
            return new HeijunkaBoard(this.projects, this.stateModel, newKanbanCards);
        } else {
            return this;
        }
    }

    public completedState(aKanbanCard: string, aState: string, completedAt: Date): HeijunkaBoard {
        if (typeof aKanbanCard === "undefined") {
            throw new Error('parameter aKanbanCard cannot be undefined.');
        }
        if (typeof aState === "undefined") {
            throw new Error('parameter aState cannot be undefined.');
        }
        if (typeof completedAt === "undefined") {
            throw new Error('parameter completedAt cannot be undefined.');
        }
        return this;

    }

    public inProgressInState(aKanbanCard: string, aState: string, inProgressAt: Date): HeijunkaBoard {
        if (typeof aKanbanCard === "undefined") {
            throw new Error('parameter aKanbanCard cannot be undefined.');
        }
        if (typeof aState === "undefined") {
            throw new Error('parameter aState cannot be undefined.');
        }
        if (typeof inProgressAt === "undefined") {
            throw new Error('parameter inProgressAt cannot be undefined.');
        }
        return this;
    }
}
