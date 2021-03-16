import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { State } from './State';
import { StateTransition, TransitionType } from './StateTransition';

export class HeijunkaBoard {
    readonly kanbanCards: Array<KanbanCard>;

    static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard([]);
    }

    private constructor(kanbanCards: Array<KanbanCard>) {
        this.kanbanCards = kanbanCards;
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
        return new HeijunkaBoard(newKanbanCards);
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
            return new HeijunkaBoard(newKanbanCards);
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
}
