import { RootAggregate } from '../heijunka/RootAggregate';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class KanbanCardCompletedStateCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'CompletedState');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.kanbanCards.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    return root.updateKanbanCards(root.kanbanCards.completedState(objectEvent.object, objectEvent.payload.get('state'), objectEvent.time));
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard, idState: string): ObjectEvent {
    const payload = new Map([['state', idState]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
