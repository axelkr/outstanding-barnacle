import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { State } from './State';
import { StateTransition, TransitionType } from './StateTransition';

export class KanbanCardCollection {
    private readonly _kanbanCards: Array<KanbanCard>;

    static createEmptyCollection(): KanbanCardCollection {
        return new KanbanCardCollection([]);
    }

    private constructor(kanbanCards: Array<KanbanCard>) {
        this._kanbanCards = kanbanCards;
    }

    public add(aKanbanCard: KanbanCard): KanbanCardCollection {
        if (typeof aKanbanCard === "undefined") {
            throw new Error('parameter aKanbanCard cannot be undefined.');
        }
        if (this.has(aKanbanCard.id)) {
            return this;
        }
        const newKanbanCards = [...this._kanbanCards];
        newKanbanCards.push(aKanbanCard);
        return new KanbanCardCollection(newKanbanCards);
    }

    public has(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this._kanbanCards.some(aKanbanCard => aKanbanCard.id === id);
    }

    public updateProperty(id: string, propertyName: string, updateAt: Date, updateTo: string): KanbanCardCollection {
        const updatePropertyOfCard = (aCard: KanbanCard) => aCard.updateProperty(propertyName, updateTo, updateAt);
        const differentName = (aCard: KanbanCard, anotherCard: KanbanCard) => aCard.valueOfProperty(propertyName) !== anotherCard.valueOfProperty(propertyName);
        return this.replace(id, updatePropertyOfCard, differentName);
    }

    public initializeProperty(id: string, propertyName: string, updateAt: Date, updateTo: string): KanbanCardCollection {
        const initializePropertyOfCard = (aCard: KanbanCard) => aCard.initializeProperty(propertyName, updateTo, updateAt);
        const initializingAlwaysChanges = () => true;
        return this.replace(id, initializePropertyOfCard, initializingAlwaysChanges);
    }

    public completedState(aKanbanCard: string, aState: string, completedAt: Date): KanbanCardCollection {
        const transition = StateTransition.completedState(aState, completedAt);
        return this.addStateTransition(transition, aKanbanCard);
    }

    public inProgressInState(aKanbanCard: string, aState: string, inProgressAt: Date): KanbanCardCollection {
        const transition = StateTransition.inProgressInState(aState, inProgressAt);
        return this.addStateTransition(transition, aKanbanCard);
    }

    private addStateTransition(aTransition: StateTransition, aKanbanCard: string): KanbanCardCollection {
        const addTransition = (aCard: KanbanCard) => aCard.transitToNewState(aTransition);
        const differentEntriesInHistory = (aCard: KanbanCard, anotherCard: KanbanCard) => aCard.history.transitions.length !== anotherCard.history.transitions.length;
        return this.replace(aKanbanCard, addTransition, differentEntriesInHistory);
    }

    private replace(id: string, replaceKanbanCard: { (aCard: KanbanCard): KanbanCard }, hasModified: { (before: KanbanCard, after: KanbanCard): boolean }): KanbanCardCollection {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (!this.has(id)) {
            throw new Error('unknown kanban card with id ' + id);
        }
        let didModify = true;
        const newKanbanCards: KanbanCard[] = [];
        this._kanbanCards.forEach(aKanbanCard => {
            if (aKanbanCard.id === id) {
                const replacedKanbanCard = replaceKanbanCard(aKanbanCard);
                didModify = hasModified(aKanbanCard, replacedKanbanCard);
                newKanbanCards.push(replacedKanbanCard);
            } else {
                newKanbanCards.push(aKanbanCard);
            }
        })
        if (didModify) {
            return new KanbanCardCollection(newKanbanCards);
        } else {
            return this;
        }
    }

    public find(options?: { project?: Project, states?: State[], transitionType?: TransitionType }): KanbanCard[] {
        let kanbanCards: KanbanCard[] = [...this._kanbanCards];
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

    public get(id: string): KanbanCard {
        const aCard = this._kanbanCards.find(aKanbanCard => aKanbanCard.id === id);

        if (aCard === undefined) {
            throw new Error('no kanban card available with id ' + id);
        } else {
            return aCard;
        }
    }

    public getKanbanCards(): KanbanCard[] {
        return this._kanbanCards;
    }
}
