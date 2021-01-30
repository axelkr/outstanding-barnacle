import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class KanbanCardCompletedStateCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'CompletedState');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.completedState(objectEvent.object, objectEvent.payload.get('state'), objectEvent.time);
  }

  createEvent(topic: string, kanbanCard: KanbanCard, idState: string): ObjectEvent {
    const payload = new Map([['state', idState]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
