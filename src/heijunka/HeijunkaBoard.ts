import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { StateModel } from './StateModel';
import { State } from './State';
import { StateTransition, TransitionType } from './StateTransition';

export class HeijunkaBoard {
    readonly projects: Array<Project>;
    readonly kanbanCards: Array<KanbanCard>;
    readonly stateModels: StateModel[];

    static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard([], [], []);
    }

    private constructor(projects: Array<Project>, kanbanCards: Array<KanbanCard>, stateModels: Array<StateModel>) {
        this.projects = projects;
        this.kanbanCards = kanbanCards;
        this.stateModels = stateModels;
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
        return new HeijunkaBoard(newProjects, this.kanbanCards, this.stateModels);
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
        return new HeijunkaBoard(this.projects, newKanbanCards, this.stateModels);
    }

    public initializePropertyOfProject(id: string, propertyName: string, updateAt: Date, updateTo: string): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof updateAt === "undefined") {
            throw new Error('parameter updateAt cannot be undefined.');
        }
        if (typeof updateTo === "undefined") {
            throw new Error('parameter updateTo cannot be undefined.');
        }
        if (!this.hasProject(id)) {
            throw new Error('unknown project with id ' + id);
        }

        const newProjects: Project[] = [];
        this.projects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.initializeProperty(propertyName, updateTo, updateAt);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        return new HeijunkaBoard(newProjects, this.kanbanCards, this.stateModels);
    }

    public updatePropertyOfProject(id: string, propertyName: string, updateAt: Date, updateTo: string): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof updateAt === "undefined") {
            throw new Error('parameter updateAt cannot be undefined.');
        }
        if (typeof updateTo === "undefined") {
            throw new Error('parameter updateTo cannot be undefined.');
        }
        if (!this.hasProject(id)) {
            throw new Error('unknown project with id ' + id);
        }

        let didUpdate = true;
        const newProjects: Project[] = [];
        this.projects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.updateProperty(propertyName, updateTo, updateAt);
                didUpdate = updatedProject.valueOfProperty(propertyName) !== aProject.valueOfProperty(propertyName);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        if (didUpdate) {
            return new HeijunkaBoard(newProjects, this.kanbanCards, this.stateModels);
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

    public updatePropertyKanbanCard(id: string, propertyName: string, updateAt: Date, updateTo: string): HeijunkaBoard {
        const updatePropertyOfCard = (aCard: KanbanCard) => aCard.updateProperty(propertyName, updateTo, updateAt);
        const differentName = (aCard: KanbanCard, anotherCard: KanbanCard) => aCard.valueOfProperty(propertyName) !== anotherCard.valueOfProperty(propertyName);
        return this.replaceKanbanCard(id, updatePropertyOfCard, differentName);
    }

    public initializePropertyKanbanCard(id: string, propertyName: string, updateAt: Date, updateTo: string): HeijunkaBoard {
        const initializePropertyOfCard = (aCard: KanbanCard) => aCard.initializeProperty(propertyName, updateTo, updateAt);
        const initializingAlwaysChanges = () => true;
        return this.replaceKanbanCard(id, initializePropertyOfCard, initializingAlwaysChanges);
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
            return new HeijunkaBoard(this.projects, newKanbanCards, this.stateModels);
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

    public addStateModel(aStateModel: StateModel): HeijunkaBoard {
        if (typeof aStateModel === 'undefined') {
            throw new Error('input aStateModel has to be defined');
        }
        if (this.stateModels.some(stateModel => stateModel.name === aStateModel.name)) {
            throw new Error('state model with same name already defined');
        }
        return new HeijunkaBoard(this.projects, this.kanbanCards, [...this.stateModels, aStateModel]);
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
