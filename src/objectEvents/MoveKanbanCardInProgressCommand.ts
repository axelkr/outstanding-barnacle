import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardInProgressCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'InProgress');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.inProgressInState(objectEvent.object, objectEvent.payload.get('newState'), objectEvent.time);
  }

  createEvent(topic: string, kanbanCard: KanbanCard, idNewState: string): ObjectEvent {
    const payload = new Map([['newState', idNewState]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
