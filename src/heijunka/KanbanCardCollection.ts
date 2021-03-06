import { Project } from './Project';
import { KanbanCard } from './KanbanCard';
import { State } from './State';
import { StateTransition, TransitionType } from './StateTransition';
import { IdObjectCollection } from './IdObjectCollection';

export class KanbanCardCollection {
    private readonly kanbanCards: IdObjectCollection<KanbanCard>;

    static createEmptyCollection(): KanbanCardCollection {
        return new KanbanCardCollection(new IdObjectCollection<KanbanCard>());
    }

    private constructor(kanbanCards: IdObjectCollection<KanbanCard>) {
        this.kanbanCards = kanbanCards;
    }

    public add(aKanbanCard: KanbanCard): KanbanCardCollection {
        return new KanbanCardCollection(this.kanbanCards.add(aKanbanCard));
    }

    public has(id: string): boolean {
        return this.kanbanCards.has(id);
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
        this.kanbanCards.idObjects.forEach(aKanbanCard => {
            if (aKanbanCard.id === id) {
                const replacedKanbanCard = replaceKanbanCard(aKanbanCard);
                didModify = hasModified(aKanbanCard, replacedKanbanCard);
                newKanbanCards.push(replacedKanbanCard);
            } else {
                newKanbanCards.push(aKanbanCard);
            }
        })
        if (didModify) {
            return new KanbanCardCollection(new IdObjectCollection<KanbanCard>(newKanbanCards));
        }
        return this;
    }

    public find(options?: { project?: Project, states?: State[], transitionType?: TransitionType }): KanbanCard[] {
        let kanbanCards: KanbanCard[] = [...this.kanbanCards.idObjects];
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
        return this.kanbanCards.get(id);
    }

    public getKanbanCards(): KanbanCard[] {
        return this.kanbanCards.idObjects;
    }
}
