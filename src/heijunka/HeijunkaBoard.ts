import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { StateModel } from './StateModel';
import { State } from './State';
import { StateTransition, TransitionType } from './StateTransition';

export class HeijunkaBoard {
    readonly projects: Array<Project>;
    readonly kanbanCards: Array<KanbanCard>;
    readonly stateModel: StateModel;
    readonly availableStateModels: StateModel[];

    static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard([], undefined, [], []);
    }

    private constructor(projects: Array<Project>, stateModel: StateModel, kanbanCards: Array<KanbanCard>, availableStateModels: Array<StateModel>) {
        this.projects = projects;
        this.stateModel = stateModel;
        this.kanbanCards = kanbanCards;
        this.availableStateModels = availableStateModels;
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
        return new HeijunkaBoard(newProjects, this.stateModel, this.kanbanCards, this.availableStateModels);
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
        return new HeijunkaBoard(this.projects, this.stateModel, newKanbanCards, this.availableStateModels);
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
            return new HeijunkaBoard(newProjects, this.stateModel, this.kanbanCards, this.availableStateModels);
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
        const renameCard = (aCard: KanbanCard) => aCard.rename(renameTo, renameAt);
        const differentName = (aCard: KanbanCard, anotherCard: KanbanCard) => aCard.name.value !== anotherCard.name.value;
        return this.replaceKanbanCard(id, renameCard, differentName);
    }

    public completedState(aKanbanCard: string, aState: string, completedAt: Date): HeijunkaBoard {
        const transition = StateTransition.completedState(aState, completedAt);
        return this.addStateTransition(transition, aKanbanCard);
    }

    public inProgressInState(aKanbanCard: string, aState: string, inProgressAt: Date): HeijunkaBoard {
        const transition = StateTransition.inProgressInState(aState, inProgressAt);
        return this.addStateTransition(transition, aKanbanCard);
    }

    private addStateTransition(aTransition: StateTransition, aKanbanCard: string): HeijunkaBoard {
        const addTransition = (aCard: KanbanCard) => aCard.transitToNewState(aTransition);
        const differentEntriesInHistory = (aCard: KanbanCard, anotherCard: KanbanCard) => aCard.history.transitions.length !== anotherCard.history.transitions.length;
        return this.replaceKanbanCard(aKanbanCard, addTransition, differentEntriesInHistory);
    }

    private replaceKanbanCard(id: string, replaceKanbanCard: { (aCard: KanbanCard): KanbanCard }, hasModified: { (before: KanbanCard, after: KanbanCard): boolean }): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (!this.hasKanbanCard(id)) {
            throw new Error('unknown kanban card with id ' + id);
        }
        let didModify = true;
        const newKanbanCards: KanbanCard[] = [];
        this.kanbanCards.forEach(aKanbanCard => {
            if (aKanbanCard.id === id) {
                const replacedKanbanCard = replaceKanbanCard(aKanbanCard);
                didModify = hasModified(aKanbanCard, replacedKanbanCard);
                newKanbanCards.push(replacedKanbanCard);
            } else {
                newKanbanCards.push(aKanbanCard);
            }
        })
        if (didModify) {
            return new HeijunkaBoard(this.projects, this.stateModel, newKanbanCards, this.availableStateModels);
        } else {
            return this;
        }
    }

    public findKanbanCards(options?: { project?: Project, states?: State[], transitionType?: TransitionType }): KanbanCard[] {
        let kanbanCards: KanbanCard[] = [...this.kanbanCards];
        const hasStateTransition = function (kanbanCard: KanbanCard): boolean {
            return kanbanCard.history.currentStateTransition() !== undefined;
        };
        if (typeof options !== 'undefined') {
            if (typeof options.project !== 'undefined') {
                kanbanCards = kanbanCards.filter(aCard => aCard.project === options.project.id)
            }
            if (typeof options.states !== 'undefined') {
                kanbanCards = kanbanCards.filter(hasStateTransition)
                    .filter(aCard => { const aCardState = aCard.history.currentStateTransition().state; return options.states.some(anOption => aCardState === anOption.id) });
            }
            if (typeof options.transitionType !== 'undefined') {
                kanbanCards = kanbanCards.filter(hasStateTransition)
                    .filter(aCard => options.transitionType == aCard.history.currentStateTransition().type);
            }
        }

        return kanbanCards;
    }

    public getKanbanCard(id: string): KanbanCard {
        const aCard = this.kanbanCards.find(aKanbanCard => aKanbanCard.id === id);

        if (aCard === undefined) {
            throw new Error('no kanban card available with id ' + id);
        } else {
            return aCard;
        }
    }

    public getProject(id: string): Project {
        const aProject = this.projects.find(project => project.id === id);

        if (aProject === undefined) {
            throw new Error('no project available with id ' + id);
        } else {
            return aProject;
        }
    }

    public setStateModel(aStateModelUUID: string): HeijunkaBoard {
        throw new Error('test me');
        return new HeijunkaBoard(this.projects, this.availableStateModels.find(stateModel => stateModel.id === aStateModelUUID), this.kanbanCards, this.availableStateModels);
    }

    public addStateModel(aStateModel: StateModel): HeijunkaBoard {
        throw new Error('test me: aStatemodel defined, no other state model available with same name');
        return new HeijunkaBoard(this.projects, this.stateModel, this.kanbanCards, [...this.availableStateModels, aStateModel]);
    }

    public hasStateModel(aStateModelId: string): boolean {
        throw new Error('test me');
        return this.availableStateModels.some(stateModel => stateModel.id === aStateModelId);
    }
}
